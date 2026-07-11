# Server Database Scripts

These scripts are for OM Distribution database maintenance on the VPS.

The main tool is:

```bash
python3 backend/scripts/mysql_db.py --help
```

## Environment

Do not commit real passwords. Export them only in the server shell session:

```bash
export DB_CONTAINER="mysql-database-om"
export DB_NAME="om_markets"
export DB_USER="om_app"
export MYSQL_PWD="your-password"
```

If the Coolify MySQL container has a generated name, get it with:

```bash
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}" | grep -i mysql
```

## Verify

```bash
python3 backend/scripts/mysql_db.py verify
```

## Import

```bash
python3 backend/scripts/mysql_db.py import backend/database/mysql_backup.sql
```

Use this only when you intentionally want to restore/replace tables from a dump.
To skip the confirmation prompt in automation:

```bash
python3 backend/scripts/mysql_db.py import --yes backend/database/mysql_backup.sql
```

## Backup

```bash
python3 backend/scripts/mysql_db.py backup
```

By default backups are written to `backups/`.

You can also choose the output path:

```bash
python3 backend/scripts/mysql_db.py backup backups/manual_before_import.sql
```

## Compatibility Wrapper

The legacy root-level `scripts/migrate-to-docker.sh` calls this Python tool.
