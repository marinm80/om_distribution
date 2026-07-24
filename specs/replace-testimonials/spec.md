# Replace fake testimonials with an honest process section - Functional Spec

## Problem

The public landing page presents seeded testimonials as customer endorsements even though they are not verified customer statements. The same feature is exposed through the administrator dashboard, API, TypeScript types, MySQL schema, and seed data. Removing only the visible cards would leave the unsupported content available and able to return later.

The vacated section must continue to support the landing page's trust and conversion goals without inventing customers, ratings, certifications, delivery promises, financial terms, or performance metrics.

## Scope

- Remove testimonials from public navigation, landing content, footer links, administrator navigation, administrator routes, dashboard metrics, frontend API clients, backend routes/controllers/repositories, and active types.
- Replace the public section with a bilingual "How it works" section based only on OM Distribution's real onsite service workflow.
- Preserve the current page theme, green accent, content order, responsive behavior, and contact conversion path.
- Remove active fake testimonial seed data so new environments cannot recreate it.
- Deliver an approved, numbered MySQL migration that drops the `testimonials` table from existing environments.
- Update current project documentation and requirements so testimonials are no longer presented as a feature.

## Out Of Scope

- Adding real customer endorsements, ratings, reviews, logos, or partner claims.
- Inventing service areas, order minimums, payment terms, delivery times, certifications, product availability, or performance statistics.
- Reusing the existing FAQ content, which is explicitly marked as placeholder and contains unverified claims.
- Changing products, categories, contacts, users, authentication, uploads, Docker, Coolify, or unrelated user-owned worktree changes.
- Applying a destructive migration to production automatically.

## Actors

- Public visitor: understands OM Distribution's onsite assessment, ordering, delivery, and merchandising service.
- Business prospect: understands how OM reviews the business's display and inventory needs before preparing the order.
- Administrator: manages products, categories, contacts, and users without a testimonial feature.
- Server operator: reviews and applies the approved table-removal migration.

## User Stories

- As a visitor, I want to understand the real service process without relying on unverifiable social proof.
- As a business prospect, I want to know how OM reviews my needs, prepares the merchandise, delivers it, and maintains the display.
- As an administrator, I do not want fake testimonials or controls that can recreate them.
- As an operator, I want the removal represented as a reviewable migration before production changes.

## BDD Scenarios

```gherkin
Feature: Replace fake testimonials with an honest process section

  Scenario: Visitor sees the factual OM service process
    Given the visitor is on the public landing page
    When the visitor reaches the section after the product catalog
    Then the page presents onsite review, order preparation, truck delivery, and display organization and replenishment
    And no testimonial, rating, customer quote, or invented customer identity is shown

  Scenario: Visitor switches language
    Given the visitor is viewing the process section
    When the visitor changes between English and Spanish
    Then the heading, supporting copy, stages, and navigation label use the selected language

  Scenario: Administrator cannot manage testimonials
    Given an authenticated administrator is using the dashboard
    Then testimonial navigation, routes, counts, and CRUD controls are absent

  Scenario: Existing environment removes testimonial storage
    Given the operator approved the destructive migration
    When the numbered MySQL migration is applied
    Then the testimonials table and its fake rows no longer exist
    And unrelated tables and data remain unchanged
```

## Acceptance Criteria

- The landing page contains no customer quotes, ratings, testimonial cards, or testimonial API request.
- The replacement section describes only the onsite review, order preparation, truck delivery, display organization, replacement of old or expired products, and replenishment workflow confirmed by the user.
- Public navigation and footer link to `#process`, with bilingual labels.
- The replacement uses a targeted evolution of the existing visual system, not a full redesign.
- The layout is one column on mobile and an asymmetric heading/process composition from tablet upward.
- Motion is limited to entrance hierarchy, honors reduced-motion preference, and introduces no perpetual animation.
- The administrator sidebar, route, page, client methods, dashboard metric, and backend endpoint for testimonials are removed.
- Active MySQL initialization and seed paths cannot recreate fake testimonials.
- The destructive migration is finalized only after the user's explicit approval on 2026-07-24 and is not applied to production automatically.
- Frontend lint/build and backend test/build pass after implementation.
- A final runtime search finds no active testimonial feature or fake endorsement content.
