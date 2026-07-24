# Replace fake testimonials with an honest process section - Technical Spec

## Stack

- Frontend remains React 19 + TypeScript + Tailwind CSS 4 + Framer Motion + i18next.
- Backend remains Express 4 + TypeScript.
- Database remains MySQL 8.
- No dependency installation is required.

## Database

- Approved migration: `backend/database/migrations/005_remove_testimonials.sql`.
- Approved statement: `DROP TABLE IF EXISTS testimonials`.
- The destructive change was explicitly approved by the user on 2026-07-24.
- Active schema/seed/init sources must be updated so clean environments do not recreate the table or fake rows.
- No production SQL is executed by this feature implementation.

## Auth And Permissions

- Authentication and role behavior remain unchanged.
- Removing the administrator testimonial route reduces available admin functionality but adds no permission.
- Contact lead access remains restricted as currently implemented.

## Non-Functional Requirements

- Preserve user-owned image changes, local upload assets, deleted CI workflow, and `backend/scripts/variables.txt`.
- New visible copy must be bilingual and free of unverifiable claims.
- WCAG AA contrast, keyboard navigation, and reduced-motion behavior are required.
- Maintain the existing light theme and singular green accent.
- Do not introduce new runtime dependencies or deployment configuration.

## AI-TDD Strategy

- RED: current source searches find public/admin/API/database testimonial surfaces.
- GREEN: focused searches show no active testimonial runtime surface and the process section renders in both languages.
- Backend integration tests must demonstrate dashboard stats no longer depend on `testimonials`.
- Frontend lint/build and backend test/build are mandatory.
- Browser smoke test covers process navigation, English/Spanish copy, responsive layout, and the absence of testimonial UI.

## Commands

- lint: `cd frontend && npm.cmd run lint`
- typecheck: included in the frontend and backend builds
- unit: existing Jest suites
- integration: `cd backend && npm.cmd test -- --runInBand`
- e2e: focused browser smoke test against the local Vite/Express services
- build: `cd backend && npm.cmd run build`; `cd frontend && npm.cmd run build`
- dev: `cd backend && npm.cmd run dev`; `cd frontend && npm.cmd run dev`

## Specialist Hints

- Frontend: replacement section, i18n, navigation, and removal of admin testimonial UI.
- Backend: remove route/controller/repository usage and dashboard count.
- Database: prepare migration only after destructive checkpoint approval.
- Design: targeted landing-page evolution using the existing Tailwind system.
- Review: verify no unsupported customer or operational claims remain.
