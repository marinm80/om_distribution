# Script maintenance audit

## Decision rules

- Keep: referenced by current documentation or supported runtime operations and compatible with the active MySQL stack.
- Replace: useful intent, but the implementation is unsafe, obsolete, or belongs in a SQL migration.
- Delete: one-off repair or conversion utility with no supported caller.
- Hold: user-owned/untracked or insufficient evidence; do not modify until clarified.

## Inventory

| Path | Evidence | Proposed disposition |
|---|---|---|
| `backend/scripts/mysql_db.py` | Documented verify/import/backup entrypoint; active MySQL workflow | Keep |
| `backend/scripts/README.md` | Documents `mysql_db.py` and environment-only credentials | Keep and update after cleanup |
| `scripts/migrate-to-docker.sh` | Compatibility wrapper only; calls `mysql_db.py`; no other references | Deleted; wrapper documentation removed |
| `backend/scripts/add-product-flags.js` | One-off PostgreSQL migration; flags already exist in current dumps/schema | Deleted; future changes belong in SQL migrations |
| `backend/scripts/convert-pg-to-mysql.js` | Converts retired PostgreSQL dump to MySQL; only old repair batches called it | Deleted |
| `backend/scripts/create-admin.js` | Uses old PostgreSQL pool and embeds a fixed admin password | Deleted |
| `backend/scripts/download-images.js` | Uses PostgreSQL and performs database mutation outside migrations | Deleted |
| `backend/scripts/set-pass.js` | Embeds password hash, root password, email, and obsolete container name | Deleted |
| `backend/scripts/update-images.js` | Embeds MySQL root password/container and mutates product rows | Deleted; future data updates use SQL migrations |
| `run_fix.bat` | Drops the database and runs obsolete conversion with hardcoded root password | Deleted |
| `run_fix2.bat` | Drops the database and runs obsolete conversion with hardcoded root password | Deleted |
| `frontend/scratch/fixFramer.cjs` | One-off source rewrite; target TypeScript fixes are already present | Deleted |
| `docs/generate_pdf.py` | Documentation artifact generator, not application runtime | Hold pending confirmation of its output/use |
| `backend/scripts/variables.txt` | New untracked user-owned file; contents may be sensitive | Hold; preserve and do not print or commit |

## Non-script maintenance observations

- `.github/workflows/ci.yml` is already deleted in the user's worktree; preserve that deletion without claiming ownership.
- Product upload changes and new images are user-owned and out of scope.
- Legacy PostgreSQL dumps and historical full MySQL dumps need a separate data-retention decision; they are not removed as part of script cleanup.
- Frontend lint and both production builds pass at baseline.
- Backend integration tests have one passing validation case and four database-dependent HTTP 500 failures when no test database is available.

## Cleanup verification

- Removed scripts had no package-script or supported runtime callers.
- The retained maintenance surface is `backend/scripts/mysql_db.py` plus its README.
- User-owned `backend/scripts/variables.txt` remains untracked and untouched.
