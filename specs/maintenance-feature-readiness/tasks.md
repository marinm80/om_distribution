# Maintenance and feature readiness - Tasks

## T-000 - Remove obsolete maintenance scripts

- Specialist: generic / documentation
- Model: gpt-5.4-mini
- Reasoning: medium
- Depends On: none
- Expected Files: obsolete scripts deleted; `backend/scripts/README.md`; `script-audit.md`
- BDD / Acceptance Criteria: unsupported PostgreSQL, hardcoded credential, destructive repair, and one-off rewrite scripts are removed without touching user assets
- RED: reference and credential searches identify the obsolete script surface
- GREEN: only `mysql_db.py` remains as the supported DB maintenance executable
- REFACTOR: document migrations separately from backups/imports
- Verification: backend build, frontend lint/build, reference search, `git diff --check`
- Done: completed; ten scripts removed and builds passed

## T-001 - Add product category relation migration

- Specialist: backend / database
- Model: gpt-5.5
- Reasoning: high
- Depends On: T-000
- Expected Files: `backend/database/migrations/004_product_categories.sql`
- BDD / Acceptance Criteria: existing category assignments are backfilled into a many-to-many relation without adding pricing data
- RED: current schema has no `product_categories` table
- GREEN: migration applies twice locally without data loss; schema/backfill queries pass
- REFACTOR: keep migration additive and production-safe
- Verification: MySQL schema inspection and row-count queries in the local container
- Done: migration applied twice to local MySQL; 131 category relations were backfilled and `missing_backfills` is 0

## T-002 - Extend product API for multiple categories

- Specialist: backend
- Model: gpt-5.5
- Reasoning: high
- Depends On: T-001
- Expected Files: product repository/controller/types and focused tests
- BDD / Acceptance Criteria: create/update/bulk/read operations preserve category IDs transactionally while retaining legacy category fields
- RED: tests fail because current input/output only supports one category
- GREEN: repository/API tests pass with normalized payloads and compatibility fields
- REFACTOR: centralize validation and relation synchronization
- Verification: `cd backend && npm.cmd test -- --runInBand` plus build
- Done: completed; repository/API integration test covers multiple category relations, update compatibility, and cleanup

## T-003 - Rotate refresh tokens and limit login attempts

- Specialist: backend security
- Model: gpt-5.5
- Reasoning: high
- Depends On: T-001
- Expected Files: auth service/routes, rate limiter, repository, security tests
- BDD / Acceptance Criteria: refresh invalidates the used token and replaces its cookie; excessive login requests receive 429
- RED: current refresh only issues access token and login has no limiter
- GREEN: focused auth and route tests pass
- REFACTOR: share secure cookie options and avoid broad API throttling
- Verification: backend test/build and security review
- Done: completed; refresh tokens rotate transactionally, cookies are replaced, and the sixth failed login returns 429 in tests

## T-004 - Add multi-category admin workflows

- Specialist: React frontend
- Model: gpt-5.5
- Reasoning: medium
- Depends On: T-002
- Expected Files: product types/page/helpers/services
- BDD / Acceptance Criteria: admin CRUD, category filtering, Excel template/import, and PDF catalog consistently handle one-or-more categories without prices
- RED: current form/template uses one category select
- GREEN: frontend lint/build and focused helper tests pass
- REFACTOR: extract parsing/formatting helpers from the page
- Verification: `cd frontend && npm.cmd run lint && npm.cmd run build`
- Done: completed; admin CRUD, filtering, Excel import/template, public cards, and PDF output support multiple categories without prices

## T-005 - Add portfolio branding and license

- Specialist: React frontend / documentation
- Model: gpt-5.5
- Reasoning: medium
- Depends On: T-004
- Expected Files: footer, admin layout, i18n, owned source headers, `LICENSE`
- BDD / Acceptance Criteria: bilingual credits and demo banner link safely to the portfolio in a new tab; owned main sources include the PRD header
- RED: branding search finds no required attribution or license
- GREEN: UI/source/license assertions plus frontend build pass
- REFACTOR: share the portfolio URL and keep translations centralized
- Verification: source search, lint, build
- Done: completed; bilingual credits, demo banner, shared portfolio URL, license, and 65 source headers were verified

## T-006 - Document local and VPS migration workflow

- Specialist: documentation / DevOps
- Model: gpt-5.5
- Reasoning: high
- Depends On: T-001, T-005
- Expected Files: README/deploy/database migration docs and SDD state
- BDD / Acceptance Criteria: operator can back up, apply migration 004, verify, deploy, and roll back without hidden scripts or secrets
- RED: current docs do not describe numbered migrations or this release order
- GREEN: canonical commands and SQL handoff are documented without changing Coolify/Docker configuration
- REFACTOR: remove stale PostgreSQL and retired script guidance in touched docs
- Verification: documentation link/path searches
- Done: completed; README, local setup, migration rules, and Coolify/VPS release sequence now use MySQL and migration 004

## T-007 - Completion, security, and regression audit

- Specialist: reviewer / security
- Model: gpt-5.5
- Reasoning: high
- Depends On: T-002, T-003, T-004, T-005, T-006
- Expected Files: tests and final SDD status
- BDD / Acceptance Criteria: every PRD gap and maintenance requirement has direct current-state evidence
- RED: audit lists missing or indirect evidence
- GREEN: relevant builds/tests/local SQL verification pass and unresolved findings are fixed
- REFACTOR: no scope expansion
- Verification: full completion matrix, `git diff --check`, status audit
- Done: completed; backend 8/8 tests and build, frontend lint/build, migration replay, source checks, and diff checks passed
