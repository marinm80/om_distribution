# MySQL migrations

This directory is the canonical location for every new OM Distribution schema or data change.

## Rules

1. Name files with the next zero-padded sequence and a concise action, for example `004_add_product_sku.sql`.
2. Target the active MySQL database. Do not add PostgreSQL syntax.
3. Prefer idempotent statements and document prerequisites when MySQL cannot express a change idempotently.
4. Include comments describing the purpose, affected tables, verification query, and rollback considerations.
5. Never place passwords, connection strings, or production data dumps in a migration.
6. Do not execute migrations against the server from development automation. Review the SQL, back up the server, and apply it manually in sequence.

Full backups, Docker initialization dumps, and seed snapshots are not migrations and remain outside this directory.
