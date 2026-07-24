# Replace fake testimonials with an honest process section - Tasks

## T-001: Approve factual scope, data model, and design direction

- Specialist: SDD supervisor
- Design-Skill: `design-taste-frontend`, `ui-ux-pro-max`
- Model: `gpt-5.5`
- Reasoning: high
- Depends On: none
- Expected Files: all files under `specs/replace-testimonials/`
- BDD / Acceptance Criteria: the specification contains only the real OM workflow and records explicit approval to drop the table.
- RED: generic catalog and inquiry copy did not describe the actual onsite service.
- GREEN: the user-confirmed onsite review, preparation, truck delivery, and merchandising workflow is documented.
- REFACTOR: remove pending language and align all checkpoints.
- Verification: inspect `.state.json`, `spec.md`, `design-brief.md`, and `plan.md`.
- Done: completed.

## T-002: Replace the public testimonial section

- Specialist: React frontend
- Design-Skill: `impeccable`, `design-taste-frontend`, `ui-ux-pro-max`, `imagegen`
- Model: `gpt-5.5`
- Reasoning: medium
- Depends On: T-001
- Expected Files: `Process.tsx`, process WebP assets, `App.tsx`, `Navbar.tsx`, `Footer.tsx`, locale JSON, `SectionWrapper.tsx`
- BDD / Acceptance Criteria: the landing page shows the approved bilingual process at `#process` and no endorsement content.
- RED: public source and runtime contain testimonial cards and an API request.
- GREEN: semantic ordered content and original imagery render in English and Spanish with an asymmetric responsive layout.
- REFACTOR: remove unused public testimonial data and types.
- Verification: frontend lint/build plus browser smoke test.
- Done: no testimonial UI or request, AA contrast, reduced motion, and responsive rendering at 375, 768, 1024, and 1440 pixels.

## T-003: Remove administrator testimonial surfaces

- Specialist: React frontend
- Design-Skill: `impeccable` audit for dashboard consistency
- Model: `gpt-5.5`
- Reasoning: medium
- Depends On: T-001
- Expected Files: admin routes/layout/dashboard/API client/types and deleted `TestimonialsPage.tsx`
- BDD / Acceptance Criteria: administrators cannot navigate to or manage testimonials and dashboard metrics remain truthful.
- RED: sidebar, route, CRUD page, client methods, and count exist.
- GREEN: all testimonial controls and the unsupported metric are absent.
- REFACTOR: rebalance the stats grid to three columns.
- Verification: frontend lint/build and focused source search.
- Done: no reachable admin testimonial surface remains.

## T-004: Remove backend testimonial runtime

- Specialist: Node backend
- Design-Skill: none
- Model: `gpt-5.5`
- Reasoning: high
- Depends On: T-001
- Expected Files: `app.ts`, dashboard route, tests, and deleted testimonial route/controller/repository
- BDD / Acceptance Criteria: `/api/testimonials` is not registered and dashboard stats do not query or return testimonials.
- RED: endpoint and dashboard table query are present.
- GREEN: endpoint returns 404 and existing backend types compile without testimonial modules.
- REFACTOR: keep the dashboard query batch concise.
- Verification: backend tests and build.
- Done: backend has no runtime import or query against `testimonials`.

## T-005: Remove testimonial persistence

- Specialist: database implementation
- Design-Skill: none
- Model: `gpt-5.5`
- Reasoning: high
- Depends On: T-001, T-004
- Expected Files: active schema/seed/init SQL, sanitized project dumps, and `005_remove_testimonials.sql`
- BDD / Acceptance Criteria: clean and existing environments cannot retain or recreate the fake testimonial table.
- RED: table definitions and fake rows are present in SQL sources.
- GREEN: the approved idempotent migration drops only `testimonials`, and initialization sources no longer create it.
- REFACTOR: include a post-migration verification query and operator notes.
- Verification: SQL source search plus local MySQL application when a configured local server is available.
- Done: no project SQL source recreates testimonial data; the idempotent migration passed locally and in production after a verified backup.

## T-006: Design review and final verification

- Specialist: SDD supervisor
- Design-Skill: `impeccable` audit, critique, polish; `browser:control-in-app-browser`
- Model: `gpt-5.5`
- Reasoning: high
- Depends On: T-002, T-003, T-004, T-005
- Expected Files: `design-review.md`, final SDD state
- BDD / Acceptance Criteria: the page remains coherent, usable, bilingual, responsive, and free of fake endorsements.
- RED: capture mechanical detector and browser findings.
- GREEN: resolve critical findings and document remaining non-blocking observations.
- REFACTOR: apply only scoped visual improvements supported by the audit.
- Verification: detector, lint, tests, builds, focused source searches, desktop/mobile browser checks.
- Done: all critical findings resolved and `.state.json.phase` set to `done`.
