---
target: frontend/src/App.tsx
mode: dual-assessment
detectorFindings: 0
nielsenScore: 19/32 pre-polish
status: resolved
timestamp: 2026-07-24T15-36-48Z
slug: frontend-src-app-tsx
---
# OM Distribution landing page critique

## Verdict

The replacement is specific in narrative and substantially more credible than the removed testimonial block. The four-step sequence mirrors the confirmed OM Distribution workflow: onsite review, order preparation, delivery, and display replenishment. Its visual language is intentionally documentary, combining two user-supplied delivery photographs with two generated interim images, as explicitly approved by the project owner.

## Evidence

- Assessment A scored the pre-polish experience 19/32 across applicable Nielsen heuristics.
- Assessment B ran the mechanical detector once against `App.tsx`, `Navbar.tsx`, and `Footer.tsx`; it returned no primary or advisory findings.
- Both independent assessments identified the catalog's blank failure state and the contact form's silent failure as the highest-impact defects.
- Browser verification covered desktop, 390px mobile, English, Spanish, direct `#process` navigation, the mobile menu, and the contact failure path.

## Resolved findings

- **P1 — blank catalog on API failure:** replaced with localized loading, empty, and error states, including retry and contact actions.
- **P1 — silent contact failure:** added a persistent localized alert, preserved entered values, and provided a phone fallback.
- **P1 — unassociated form labels:** added stable IDs, `htmlFor`, and autocomplete metadata.
- **P1 — mobile navigation accessibility:** added translated accessible names, disclosure state, controls linkage, and a verified 44 by 44 pixel target.
- **P1 — document language and contrast:** synchronized `<html lang>` with i18next and darkened small process numerals.
- **P2 — incomplete journey handoff:** added a truthful request-a-visit action after the final process step.
- **P2 — mixed-language path:** translated hero operational cards, catalog states, contact proof points, placeholders, status text, and footer labels.
- **P2 — dead social controls:** removed placeholder social links without real destinations.
- **P2 — direct hash navigation:** added a settled post-render hash alignment; browser verification placed `#process` 80 pixels below the fixed header.

## Intentional constraint

The process imagery remains a mixed real/generated set because the project owner explicitly approved that combination while additional real images are prepared. All four assets use the same crop, radius, and ordered presentation. Product images remain under the existing product catalog workflow pending the owner's later Cloudflare URL migration.

## Residual observation

Claims such as “130+,” on-time delivery, and regional coverage predate this change. They were translated but not substantively altered; the owner should periodically confirm that they remain factually current.
