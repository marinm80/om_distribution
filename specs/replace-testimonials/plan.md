# Replace fake testimonials with an honest process section - Architecture Plan

## Data Model Checkpoint

Status: approved by the user on 2026-07-24

Approved change:

- Drop the `testimonials` table using migration `005_remove_testimonials.sql`.
- Remove testimonial table creation and fake testimonial insertion from active clean-install schema and seed sources.
- Do not touch products, categories, contacts, users, refresh tokens, or uploads.

Rejected non-destructive alternative:

- Remove all application access but retain the unused table and rows. This lowers migration risk but leaves fake data stored and able to return accidentally.

Decision:

- Remove the table because the user explicitly approved eliminating the fake testimonial feature rather than merely hiding it.

## Architecture

- Replace `Testimonials.tsx` with a static, bilingual `Process.tsx` component.
- Keep process copy in i18n locale files rather than a backend table.
- Replace the testimonial navigation/footer anchor with `#process`.
- Remove the admin page/route/sidebar link, frontend API functions/type, backend route/controller/repository, and dashboard count.
- Remove active schema and seed definitions for testimonials.

## API Contracts

- Delete public/admin testimonial endpoints.
- Dashboard stats stop returning `totalTestimonials`.
- No new API contract is introduced for the static process content.

## Folder Structure

- Add: `frontend/src/components/sections/Process.tsx`
- Modify: App, Navbar, Footer, locale files, admin layout/dashboard, API clients/types.
- Delete: public/admin testimonial components and active backend testimonial files.
- Modify: active MySQL schema/seed/init sources.
- Add: `backend/database/migrations/005_remove_testimonials.sql`.
- Add: four original, optimized process images under `frontend/public/images/process/`.

## ADR-Lite Decisions

- Prefer factual process transparency over unverifiable social proof.
- Keep process copy static because it is part of the product experience, not user-generated data.
- Remove the feature end to end so fake content cannot be recreated from the dashboard or API.
- Preserve the landing information architecture by replacing the block in the same position.
- Use the user-confirmed operating sequence: onsite display review, order preparation, truck delivery, then display organization and replenishment.
- Use original, unbranded imagery depicting independent supermarkets, mini markets, and bodegas.

## D-09 Testability And AI-TDD By Layer

- Static source checks establish the RED baseline for all testimonial surfaces.
- Backend tests cover dashboard stats without testimonial queries.
- Frontend build and browser smoke checks cover the replacement section and both languages.
- SQL is reviewed locally after explicit approval and is not applied to production automatically.

## D-10 Design System

- Preserve the existing light theme, emerald brand accent, amber secondary accent, Outfit/Inter font stack, and `max-w-7xl` content width.
- Use an asymmetric desktop composition with an editorial image mosaic and a wider semantic ordered list.
- Keep body copy at a readable measure and use horizontal separators instead of four repeated cards.
- Use the existing spacing scale: 20 to 32 pixels within groups and 64 to 128 pixels between major sections.
- Use one subtle viewport entrance with an already visible reduced-motion fallback.
- Meet WCAG AA contrast and retain visible keyboard focus treatment.

## D-11 Design Skills Routing

- `design-taste-frontend`: preserve the current OM visual world and avoid generic marketing patterns.
- `ui-ux-pro-max`: validate responsive structure, semantic ordered content, contrast, and reduced motion.
- `impeccable`: implement the section at the craft floor and run final audit, critique, and polish passes.
- `imagegen`: create project-owned, unbranded process placeholders without third-party image licensing.
- `browser:control-in-app-browser`: inspect real desktop and mobile rendering and verify both languages.

## Risks

- Dropping the table is irreversible without restoring a backup.
- Archived database dumps could recreate fake testimonial data if left unchanged, so project-owned MySQL initialization and backup SQL are sanitized as part of this feature.
- Existing FAQ content contains unsupported claims and must not be substituted without a separate content-validation pass.
- A partial removal could leave dead navigation, dashboard queries, or a reachable API endpoint.
- User-owned worktree changes must remain excluded from this feature.
