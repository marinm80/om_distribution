# OM Distribution — Technical Project Guide
**PERN Stack Bilingual Landing Page + Admin Dashboard**
**Version**: 2.0.0 | **Last Updated**: May 2026

---

## 1. Project Overview

OM Distribution is a production-ready web application for a confectionery & snacks distribution company. It combines a bilingual public landing page with a full-featured admin dashboard for content management, product catalog generation, and lead tracking.

### Key Features
- Bilingual landing page (EN/ES) with product carousel, testimonials, and B2B contact form
- Admin dashboard: product CRUD, bulk Excel import, PDF catalog generator
- JWT auth with access + refresh token rotation
- Docker deployment behind Nginx Proxy Manager

---

## 2. Technical Architecture

### Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS v4 |
| Backend | Node.js + Express |
| Database | PostgreSQL 15 |
| Auth | JWT (access token + refresh token rotation) |
| Reverse Proxy | Nginx Proxy Manager |
| Containers | Docker + Docker Compose |

### 2.1 Backend — 4-Layer Repository Pattern

```
Routes → Controllers → Repositories → PostgreSQL
```

1. **Routes** — endpoint definitions and middleware application
2. **Controllers** — request handling and response formatting
3. **Repositories** — raw SQL execution via `pg` pool
4. **Middlewares** — JWT auth (`protect`), error handler, rate limiter

### 2.2 Frontend — Structure

```
src/
  App.jsx                  # Router — admin pages are lazy-loaded chunks
  pages/admin/             # Admin dashboard
  components/sections/     # Landing page sections
  services/                # api.js, adminApi.js (Axios)
  context/                 # AuthContext, LanguageContext
```

**Code splitting**: All admin pages (including heavy deps jsPDF ~500KB, xlsx ~300KB) are loaded via `React.lazy()` so the public landing page bundle stays lean. Visitors never download admin code.

### 2.3 Docker Services

```
om-frontend   → React app via Nginx (proxy_network)
om-backend    → Express API, port 5000 (proxy_network + om_internal_net)
om-db         → PostgreSQL (om_internal_net only — not exposed publicly)
```

**Volumes**:
- `postgres_data` — database persistence
- `uploads_data` — product images at `/app/public/uploads`

---

## 3. Data Model (PostgreSQL — `om_markets`)

Bilingual schema: localized fields coexist in the same table (`name_en`, `name_es`).

| Table | Description | Key Fields |
|---|---|---|
| `users` | Admin accounts | `email`, `password` (bcrypt), `role` |
| `refresh_tokens` | Security rotation | `token`, `user_id`, `expires_at` |
| `categories` | Product groups | `name_en`, `name_es` |
| `products` | Item catalog | `name_en/es`, `description_en/es`, `image_url`, `is_active`, `show_on_landing`, `category_id` |
| `testimonials` | Social proof | `author_name`, `content_en/es`, `rating` |
| `contacts` | B2B leads | `full_name`, `email`, `message`, `company_name` |

### Performance Indexes (migration 003)

```sql
idx_products_is_active
idx_products_show_on_landing
idx_products_category_id
idx_products_active_landing  -- composite
idx_refresh_tokens_token
idx_refresh_tokens_user_id
```

---

## 4. Environment Variables

### Backend (`.env`)

```
DATABASE_URL=postgresql://user:pass@host:5432/om_markets
JWT_SECRET=...
JWT_REFRESH_SECRET=...
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

### Frontend (Docker build arg)

```
VITE_API_URL=https://api.yourdomain.com/api
```

`VITE_API_URL` is baked into the frontend image at build time. If not set, it defaults to `http://localhost:5000/api` (local dev only).

---

## 5. Image Handling

### Upload flow
1. Admin uploads file → `POST /api/upload/image` (max 5MB, image/* only)
2. Stored in `public/uploads/` with unique filename
3. Full URL returned: `{protocol}://{host}/uploads/{filename}`
4. URL saved to `products.image_url`

### Serving images
- `/uploads/*` — served via `express.static` with `Access-Control-Allow-Origin: *`
- `helmet` configured with `crossOriginResourcePolicy: false` to allow cross-origin canvas reads

### External images
- Proxied server-side via `GET /api/proxy/image?url=...`
- Prevents browser CORS issues with external CDNs
- Blocks private/loopback IPs (SSRF protection)

---

## 6. Admin Dashboard Guide

### 6.1 Product Management

- **Add/Edit Product**: Name required in both EN and ES.
- **Image options**:
  - Paste an external URL → proxied automatically in the PDF
  - Upload a file → stored in `/uploads/`, used directly
- **Visibility toggles**:
  - `Active` — if off, hidden everywhere
  - `Show on Landing` — if on, appears in the homepage carousel

### 6.2 PDF Catalog Generation

- Click **PDF** in the Products page (filter by category first if needed)
- Format: Landscape A4, one product per page
- Layout per page: header bar (logo + category), product name, image (150×95mm), description, footer with page count
- **Images are pre-fetched in parallel** before rendering begins, which keeps generation fast even for large catalogs (tested with 129 products)
- Output: `OM_Catalog_YYYY-MM-DD.pdf`

### 6.3 Bulk Import (Excel)

1. Download the XLSX template from the Products page
2. Fill columns: `name_en`, `name_es`, `description_en`, `description_es`, `image_url`, `category_id`
3. Upload the file — products are inserted in a single DB transaction

---

## 7. Auth Flow

```
POST /api/auth/login
  → returns accessToken (JSON) + sets refreshToken cookie (httpOnly)

Protected request
  → Authorization: Bearer <accessToken>

accessToken expires
  → POST /api/auth/refresh (sends cookie automatically)
  → returns new accessToken + rotates refresh token

POST /api/auth/logout
  → clears refresh token cookie
```

---

## 8. Development Setup

### Local (no Docker)

```bash
# Backend
cd backend && npm install
# configure backend/.env (see Section 4)
npm run dev          # port 5000

# Frontend
cd frontend && npm install
npm run dev          # port 5173
```

Run DB migrations once:
```bash
psql -U postgres -d om_markets -f backend/database/001_initial_schema.sql
psql -U postgres -d om_markets -f backend/database/002_seed_data.sql
psql -U postgres -d om_markets -f backend/database/003_indexes.sql
```

### Production (Docker)

```bash
# Create .env at project root with all variables from Section 4
docker compose up -d --build
```

---

## 9. API Summary

Full reference: `backend/docs/api.md`

| Group | Base Path | Auth |
|---|---|---|
| Auth | `/api/auth` | — / cookie |
| Products | `/api/products` | public GET, admin write |
| Categories | `/api/categories` | public GET, admin write |
| Upload | `/api/upload` | admin |
| Proxy | `/api/proxy` | — |
| Testimonials | `/api/testimonials` | public GET, admin write |
| Contact | `/api/contact` | public POST, admin GET |
| Users | `/api/users` | admin |
| Health | `/api/health` | — |

---

*© 2026 OM Distribution. Internal Documentation.*
