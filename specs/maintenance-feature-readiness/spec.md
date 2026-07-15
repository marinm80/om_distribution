# Maintenance and feature readiness - Functional Spec

## Problem

The repository contains production code, one-off migration utilities, destructive repair scripts, legacy PostgreSQL conversion tooling, operational MySQL tooling, generated assets, and prior user changes in the same worktree. Before adding the next product features, the maintenance surface must be reduced without deleting active operational capabilities or overwriting user-owned changes.

The authoritative updated requirements are in `C:/Users/marin/OneDrive/Documents/programming books/Full Stack/15-Ideas-Proyectos/6_Portafolio_Tecnico/Proyecto_09_OM_Distribution/PRD.md` (version 1.2.0). A code-to-PRD audit found missing or partial behavior in multi-category assignment, login rate limiting, refresh-token rotation, portfolio branding, source attribution, and licensing. Product pricing is explicitly out of scope because the site is an informational catalog.

## Scope

- Inventory executable and script-like files outside dependencies and build output.
- Classify each script as keep, replace, archive, or delete using references, runtime compatibility, credentials risk, and documented usage.
- Remove confirmed one-off or obsolete scripts while preserving user-owned uncommitted files.
- Establish `backend/database/migrations/` as the canonical location for every future SQL schema or data change.
- Record SQL changes as reviewable, idempotent MySQL migration files; never apply them to the server from this task.
- Implement the missing PRD behavior through AI-TDD: one-or-more categories per product, login rate limiting, refresh-token rotation, bilingual portfolio credits, dashboard demo banner, source attribution, and an All Rights Reserved license.
- Update documentation so retained operational scripts and migration execution are unambiguous.

## Out Of Scope

- Applying SQL to the production server.
- Deleting or rewriting uploaded product images.
- Restoring the user-deleted `.github/workflows/ci.yml`.
- Rotating secrets, changing authentication, or changing deployment configuration without a separate approval checkpoint.
- Treating generated database dumps as migrations.
- Adding, editing, importing, exporting, or displaying product prices.

## Actors

- Administrator: manages products, categories, contacts, users, and catalog exports.
- Developer/maintainer: implements features and runs verified maintenance commands.
- Server operator: reviews and manually applies approved SQL migrations to MySQL.
- Public visitor: consumes the landing page and public catalog-facing behavior.

## User Stories

- As a maintainer, I want only supported scripts to remain so future work is not confused by obsolete PostgreSQL or hardcoded repair utilities.
- As a server operator, I want every database modification delivered as a numbered SQL file so I can review and apply it deliberately.
- As a product owner, I want the requirements in the specified Markdown implemented without regressing the existing admin or public application.
- As a contributor, I want existing local changes preserved throughout maintenance.

## BDD Scenarios

```gherkin
Feature: Repository maintenance and feature readiness

  Scenario: Remove an obsolete one-off script safely
    Given a script is not referenced by package commands, documentation, runtime code, or supported operations
    And it targets the retired PostgreSQL workflow or contains hardcoded repair credentials
    When the maintenance cleanup is applied
    Then the script is removed
    And the supported frontend and backend builds still pass

  Scenario: Preserve supported database operations
    Given backend/scripts/mysql_db.py is documented for verify, backup, and import
    When obsolete scripts are removed
    Then mysql_db.py and its documentation remain available

  Scenario: Deliver a database change for manual application
    Given an approved feature requires a MySQL schema or data change
    When the feature is implemented
    Then a numbered idempotent SQL file is added under backend/database/migrations
    And the SQL is not executed against the server
    And the handoff identifies the exact file and execution order

  Scenario: Manage multiple product categories
    Given an administrator creates or edits a product
    When one or more categories are submitted
    Then the API persists the category relations
    And the admin list, Excel import/export flow, public API, and catalog PDF remain consistent without showing prices

  Scenario: Rotate a refresh token
    Given a valid refresh token exists in an HttpOnly cookie
    When the access token is refreshed
    Then the old refresh token is invalidated
    And a new refresh token is stored and returned in a replacement HttpOnly cookie

  Scenario: Limit login attempts
    Given a client repeatedly submits login requests
    When the configured threshold is exceeded within the window
    Then the API returns HTTP 429 without attempting authentication

  Scenario: Show portfolio attribution
    Given the public landing or authenticated dashboard is rendered in English or Spanish
    Then the PRD attribution text is visible in the active language
    And its portfolio link opens https://rafaelmarin.dev in a new tab with noopener and noreferrer

  Scenario: Preserve pre-existing worktree changes
    Given uploads, a workflow deletion, or local files existed before this maintenance task
    When cleanup and feature work are performed
    Then those unrelated changes remain untouched
```

## Acceptance Criteria

- A script audit documents evidence and disposition for every discovered script-like file.
- Confirmed obsolete scripts are removed; retained scripts have a current documented purpose.
- No committed plaintext password, fixed password hash, or hardcoded database root password remains in maintenance scripts.
- `backend/database/migrations/README.md` defines naming, idempotency, review, and server handoff rules.
- Every new database modification is stored under `backend/database/migrations/` and is not applied automatically.
- Existing unrelated Git changes remain present and unmodified.
- Backend TypeScript build, frontend lint, and frontend production build pass after cleanup.
- Database-backed integration tests either pass with a test database or are reported separately as an environment-dependent baseline failure.
- Products can be assigned to one or more categories while existing `products.category_id` data is preserved during migration.
- Catalog PDF remains informational and does not display product prices.
- Excel templates/imports accept a category ID list without breaking existing single-category sheets.
- Login rate limiting is applied specifically to `/api/auth/login`.
- Refresh calls rotate the refresh token and cookie while keeping the 15-minute access-token behavior.
- Dashboard and public footer branding follows the bilingual PRD acceptance text and safe external-link attributes.
- Main frontend/backend source files carry the required author header; generated files and third-party declarations are excluded.
- An All Rights Reserved `LICENSE` file documents the PRD usage restrictions.
