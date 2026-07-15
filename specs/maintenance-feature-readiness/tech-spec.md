# Maintenance and feature readiness - Technical Spec

## Stack

- Frontend: React 19, TypeScript, Vite 7, Tailwind CSS 4.
- Backend: Node.js, Express 4, TypeScript.
- Database: MySQL through `mysql2`; PostgreSQL scripts and dumps are legacy inputs only.
- Deployment: existing Docker/Coolify configuration is unchanged by this maintenance phase.

## Database

- Canonical new migration path: `backend/database/migrations/`.
- File naming: zero-padded sequence plus intent, for example `004_add_product_sku.sql`.
- New migrations must target MySQL, be rerunnable where feasible, and include comments describing prerequisites and rollback considerations.
- Full dumps in `backend/database/mysql_backup.sql`, `backend/database/mysql-init/`, or the repository root are not migrations.
- No migration is executed on production by Codex. The final handoff lists SQL files in order for the user to apply.
- Proposed feature migration `004_product_categories.sql`:
  - create `product_categories(product_id, category_id, created_at)` with a composite primary key and cascading foreign keys;
  - backfill the junction table from existing `products.category_id` values;
  - retain `products.category_id` temporarily as the primary/legacy category for safe production compatibility and rollback.
- The migration will be applied to local MySQL for verification after approval, but never to the VPS by Codex.

## Auth And Permissions

- Existing JWT and role behavior remains unchanged.
- Scripts containing hardcoded admin credentials, fixed password hashes, or root database passwords are removal candidates.
- No secrets may be copied from `backend/scripts/variables.txt` into tracked files or command output.

## Non-Functional Requirements

- Preserve all unrelated worktree modifications.
- Avoid destructive database commands in repository automation.
- Keep one supported database operations entrypoint (`backend/scripts/mysql_db.py`).
- Maintenance must not alter public assets or deployed infrastructure.
- Build and lint results must remain at least as good as baseline.
- Documentation must distinguish migrations, backups, seeds, and repair utilities.

## AI-TDD Strategy

- Maintenance cleanup uses test-after verification because deleting unused scripts has no direct unit boundary; evidence consists of reference searches, syntax/build checks, and Git diff audit.
- Feature implementation uses strict RED -> GREEN -> REFACTOR for product persistence, auth rotation, and public/admin behavior.
- Database migrations receive static SQL review plus disposable-database verification when a local MySQL test target is available; never use production for verification.
- Baseline note: backend integration tests currently return HTTP 500 without their required database service; this is recorded separately from code regressions.

## Commands

- frontend lint: `cd frontend && npm.cmd run lint`
- frontend typecheck/build: `cd frontend && npm.cmd run build`
- backend typecheck/build: `cd backend && npm.cmd run build`
- backend integration: `cd backend && npm.cmd test -- --runInBand`
- script references: `rg -n "<script-name>" -g '!**/node_modules/**' .`
- worktree audit: `git status --short && git diff --check`
- dev backend: `cd backend && npm.cmd run dev`
- dev frontend: `cd frontend && npm.cmd run dev`
- local migration: use the active local MySQL container and apply `backend/database/migrations/004_product_categories.sql`; exact command depends on the available Docker Compose executable.

## Specialist Hints

- Exploration/documentation: read-heavy repository inventory.
- Backend: TypeScript/API work and MySQL migration compatibility.
- Frontend: React/TypeScript behavior from the feature specification.
- Security: required if new work touches auth, uploads, public input, PII, CORS, or secrets.
- DevOps: only if later requirements change Docker, Coolify, or CI/CD, with explicit approval.
