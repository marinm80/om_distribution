#!/usr/bin/env python3
"""MySQL maintenance helper for the OM Distribution VPS.

The script talks to the MySQL container through Docker, so it can run from the
VPS without installing a MySQL client on the host.
"""

from __future__ import annotations

import argparse
import os
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path


DEFAULT_CONTAINER = "mysql-database-om"
DEFAULT_DATABASE = "om_markets"
DEFAULT_USER = "om_app"
PROJECT_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_DUMP = PROJECT_ROOT / "backend/database/mysql_backup.sql"
DEFAULT_BACKUP_DIR = PROJECT_ROOT / "backups"


class CommandError(RuntimeError):
    pass


def mysql_password() -> str:
    password = os.environ.get("MYSQL_PWD")
    if not password:
        raise CommandError(
            "MYSQL_PWD is required. Example: "
            "MYSQL_PWD='password' python3 backend/scripts/mysql_db.py verify"
        )
    return password


def docker_env(password: str | None = None) -> dict[str, str]:
    env = os.environ.copy()
    if password is not None:
        env["MYSQL_PWD"] = password
    return env


def run(
    args: list[str],
    *,
    password: str | None = None,
    stdin=None,
    stdout=None,
    check: bool = True,
) -> subprocess.CompletedProcess:
    return subprocess.run(
        args,
        stdin=stdin,
        stdout=stdout,
        stderr=None,
        check=check,
        env=docker_env(password),
    )


def ensure_container_exists(container: str) -> None:
    result = run(
        ["docker", "inspect", container],
        stdout=subprocess.DEVNULL,
        check=False,
    )
    if result.returncode != 0:
        raise CommandError(
            f"Docker container not found: {container}\n"
            "Tip: docker ps --format 'table {{.Names}}\\t{{.Image}}\\t{{.Status}}' | grep -i mysql"
        )


def wait_for_mysql(container: str, user: str, password: str, timeout: int) -> None:
    print("Waiting for MySQL...")
    deadline = time.time() + timeout
    while time.time() < deadline:
        result = run(
            [
                "docker",
                "exec",
                "-e",
                "MYSQL_PWD",
                container,
                "mysqladmin",
                "ping",
                f"-u{user}",
                "--silent",
            ],
            password=password,
            stdout=subprocess.DEVNULL,
            check=False,
        )
        if result.returncode == 0:
            return
        time.sleep(2)
    raise CommandError(f"MySQL did not become ready within {timeout} seconds.")


def mysql_exec_args(container: str, user: str, database: str) -> list[str]:
    return [
        "docker",
        "exec",
        "-i",
        "-e",
        "MYSQL_PWD",
        container,
        "mysql",
        f"-u{user}",
        database,
    ]


def mysqldump_args(container: str, user: str, database: str) -> list[str]:
    return [
        "docker",
        "exec",
        "-e",
        "MYSQL_PWD",
        container,
        "mysqldump",
        "--single-transaction",
        "--routines",
        "--triggers",
        "--set-gtid-purged=OFF",
        f"-u{user}",
        database,
    ]


def resolve_existing_path(path: str) -> Path:
    candidate = Path(path)
    if candidate.is_file():
        return candidate

    project_candidate = PROJECT_ROOT / path
    if project_candidate.is_file():
        return project_candidate

    return candidate


def confirm_import(path: Path, yes: bool) -> None:
    print("This import can replace existing tables if the dump contains DROP TABLE statements.")
    if yes:
        return
    confirmation = input("Continue? Type IMPORT to proceed: ").strip()
    if confirmation != "IMPORT":
        raise CommandError("Aborted.")


def verify(args: argparse.Namespace) -> None:
    password = mysql_password()
    ensure_container_exists(args.container)
    wait_for_mysql(args.container, args.user, password, args.timeout)

    sql = """
SELECT DATABASE() AS database_name, USER() AS mysql_user, VERSION() AS mysql_version;
SHOW TABLES;
SELECT COUNT(*) AS products FROM products;
SELECT COUNT(*) AS categories FROM categories;
SELECT COUNT(*) AS users FROM users;
SELECT COUNT(*) AS contacts FROM contacts;
"""
    run(mysql_exec_args(args.container, args.user, args.database) + ["-e", sql], password=password)


def import_dump(args: argparse.Namespace) -> None:
    password = mysql_password()
    dump_path = resolve_existing_path(args.dump)
    if not dump_path.is_file():
        raise CommandError(f"Dump file not found: {dump_path}")

    ensure_container_exists(args.container)
    print(f"Target container: {args.container}")
    print(f"Target database:  {args.database}")
    print(f"Target user:      {args.user}")
    print(f"Dump file:        {dump_path}")
    print()

    confirm_import(dump_path, args.yes)
    wait_for_mysql(args.container, args.user, password, args.timeout)

    print("Importing dump...")
    with dump_path.open("rb") as dump_file:
        run(mysql_exec_args(args.container, args.user, args.database), password=password, stdin=dump_file)

    print("Import completed.")
    verify(args)


def backup(args: argparse.Namespace) -> None:
    password = mysql_password()
    ensure_container_exists(args.container)
    wait_for_mysql(args.container, args.user, password, args.timeout)

    if args.output:
        output = Path(args.output)
    else:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output = Path(args.backup_dir) / f"{args.database}_{timestamp}.sql"

    output.parent.mkdir(parents=True, exist_ok=True)

    print(f"Creating backup: {output}")
    with output.open("wb") as backup_file:
        run(mysqldump_args(args.container, args.user, args.database), password=password, stdout=backup_file)
    print(f"Backup completed: {output}")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Import, back up, and verify the OM Distribution MySQL database in Docker."
    )
    parser.add_argument("--container", default=os.environ.get("DB_CONTAINER", DEFAULT_CONTAINER))
    parser.add_argument("--database", default=os.environ.get("DB_NAME", DEFAULT_DATABASE))
    parser.add_argument("--user", default=os.environ.get("DB_USER", DEFAULT_USER))
    parser.add_argument("--timeout", type=int, default=60)

    subparsers = parser.add_subparsers(dest="command", required=True)

    import_parser = subparsers.add_parser("import", help="Import a SQL dump into MySQL.")
    import_parser.add_argument("dump", nargs="?", default=str(DEFAULT_DUMP))
    import_parser.add_argument("--yes", action="store_true", help="Skip the IMPORT confirmation prompt.")
    import_parser.set_defaults(func=import_dump)

    backup_parser = subparsers.add_parser("backup", help="Create a mysqldump backup.")
    backup_parser.add_argument("output", nargs="?", help="Output .sql path.")
    backup_parser.add_argument("--backup-dir", default=os.environ.get("BACKUP_DIR", str(DEFAULT_BACKUP_DIR)))
    backup_parser.set_defaults(func=backup)

    verify_parser = subparsers.add_parser("verify", help="Verify connection and basic table counts.")
    verify_parser.set_defaults(func=verify)

    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    try:
        args.func(args)
    except subprocess.CalledProcessError as exc:
        return exc.returncode
    except (CommandError, KeyboardInterrupt) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
