#!/usr/bin/env bash
set -euo pipefail

# Backward-compatible wrapper for the current MySQL migration flow.
# The project previously used PostgreSQL; the active backend now uses MySQL.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

exec python3 "$PROJECT_ROOT/backend/scripts/mysql_db.py" import "${1:-backend/database/mysql_backup.sql}"
