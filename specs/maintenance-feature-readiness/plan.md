# Maintenance and feature readiness - Architecture Plan

## Data Model Checkpoint

Status: approved by user on 2026-07-15

Proposed model for approval:

1. Add `product_categories` with composite key `(product_id, category_id)`, cascading foreign keys, and `created_at`.
2. Backfill one relation per existing `products.category_id`.
3. Retain `products.category_id` as the primary/legacy category during this release so production rollback remains possible; the application writes the first selected category there and all selected categories to the junction table.
4. Do not add or display product prices; the site is an informational catalog.
5. No auth schema change: refresh-token rotation reuses the current `refresh_tokens` table.

Migration file: `backend/database/migrations/004_product_categories.sql`. It will be tested against local MySQL, committed for deployment, and handed off for manual VPS application.

## Architecture

- Product repository owns transactional synchronization of product fields and category relations.
- Product API returns `category_ids` and localized category objects while retaining `category_id`/`category_name` compatibility.
- Admin product form uses multi-select categories.
- Excel import accepts comma-separated `category_ids`; old `category_id` remains supported.
- PDF catalog prints product and category details without prices.
- Auth refresh service invalidates the used refresh token, issues a new pair, stores the new refresh token, and replaces the cookie.
- Login limiter is attached only to the login route; contact keeps its existing limiter.
- Attribution UI uses i18n keys and a shared portfolio URL constant.

## API Contracts

- Product input: existing bilingual fields plus `category_ids?: number[]` and legacy `category_id?: number`.
- Product output: existing fields plus `category_ids` and `categories`.
- `POST /api/auth/refresh`: returns a new access token and sets a rotated refresh cookie; the prior refresh token becomes invalid.

## Folder Structure

- `backend/database/migrations/004_product_categories.sql`
- focused backend tests for product mapping, migration-compatible payloads, login limiting, and token rotation
- focused frontend tests or pure helpers for category import formatting where practical
- shared branding constants/i18n keys plus footer and admin banner changes
- `LICENSE`

## ADR-Lite Decisions

- Additive database migration rather than dropping `products.category_id`, reducing VPS cutover risk.
- Informational catalog rather than introducing commercial pricing data.
- Transactional category synchronization to avoid partial product/category writes.
- Rotate refresh tokens on every refresh without changing cookie-based persistence.
- Apply author headers mechanically only to owned `.ts`/`.tsx` application sources, excluding generated declarations.

## D-09 Testability And AI-TDD By Layer

- Repository tests verify category synchronization with MySQL connections.
- Auth tests verify old-token invalidation, new-token persistence, and replacement cookie attributes.
- Route tests verify the login limiter returns 429.
- Frontend helper tests verify Excel category parsing; build/lint protect UI integration.
- SQL is validated locally with schema inspection and backfill count queries.

## Risks

- The wrong Markdown could be mistaken for the new specification.
- Legacy scripts can appear useful while targeting PostgreSQL or old container names.
- Several scripts contain destructive commands or hardcoded credentials.
- Database-backed tests depend on an available MySQL test database and currently fail with HTTP 500 when it is absent.
- Existing image and workflow changes belong to the user and must not be swept into cleanup.

## Implementation order

1. Create and verify the additive MySQL migration locally.
2. Extend product repository/API contracts transactionally.
3. Correct auth refresh rotation and login rate limiting.
4. Extend the admin form, Excel import/template, filtering, and PDF output.
5. Add bilingual portfolio attribution, author headers, and license.
6. Update operational documentation and produce the VPS SQL handoff.
7. Run regression, security, and requirement-completion audits.
