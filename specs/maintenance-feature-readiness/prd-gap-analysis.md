# PRD 1.2 completion analysis

Authoritative source: `Proyecto_09_OM_Distribution/PRD.md`, version 1.2.0 dated 2026-07-15.

| Requirement | Current evidence | Status | Planned action |
|---|---|---|---|
| RF-01 bilingual UI/data | i18next plus bilingual DB fields and language queries | Implemented | Regression verification |
| RF-02 public products | landing endpoint and product sections | Implemented | Extend output with categories |
| RF-03 contact | contact UI/API | Implemented | Preserve |
| RF-04 animations/carousels | Framer Motion and Swiper dependencies/components | Implemented | Preserve |
| RF-05 responsive UI | responsive Tailwind layouts | Implemented | Smoke verification |
| RF-06 JWT + refresh cookie + rotation | transactional token replacement and HttpOnly cookie rotation | Implemented | Covered by focused auth test |
| RF-07 login rate limiting | dedicated login limiter, five failed attempts per 15 minutes | Implemented | Integration test verifies 429 on sixth failure |
| RF-08 product CRUD | bilingual product data, image, categories and active state; prices excluded by product decision | Implemented | Covered by repository integration test and builds |
| RF-09 one-or-more categories | junction table, backfill, transactional writes and multi-select | Implemented | Legacy `category_id` retained as primary compatibility field |
| RF-10 media upload/external URL | Multer upload plus URL/proxy behavior | Implemented | Preserve |
| RF-11 informational PDF | landscape PDF prints product details and multiple category labels without prices | Implemented | Frontend build passed |
| RF-12 Excel bulk import | template/import/bulk endpoint include category IDs | Implemented | Frontend and backend builds passed |
| RNF-03 CORS whitelist | `FRONTEND_URL` origin with credentials | Implemented | Preserve |
| RNF-04 TypeScript full stack | frontend/backend TypeScript builds | Implemented | Preserve |
| RNF-05 four-layer backend | routes/controllers/repositories/middlewares largely present | Implemented with auth/category exceptions | Avoid unrelated refactor |
| Branding source headers | required MySQL stack header in 65 owned source files | Implemented | Automated source check passed |
| Dashboard demo banner | bilingual banner links safely to portfolio | Implemented | Frontend lint/build passed |
| Public footer credit | bilingual credit links safely to portfolio | Implemented | Frontend lint/build passed |
| All Rights Reserved license | root `LICENSE` matches the PRD restrictions | Implemented | File inspection passed |

## Documentation drift

- The PRD still lists `docker-compose.prod.yml`, but the repository intentionally removed it and deploys through Coolify. Do not recreate it during feature work.
- The PRD now names the active React + Node/Express + MySQL stack and contains no PostgreSQL, `psql`, or PERN references.
- PDF generation is client-side in the current application and documented in `docs/catalog-pdf.md`; no server PDF service is introduced.
