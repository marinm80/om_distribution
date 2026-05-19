# Architecture

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS v4 |
| Backend | Node.js + Express |
| Database | PostgreSQL 15 |
| Auth | JWT (access token + refresh token rotation) |
| Reverse Proxy | Nginx Proxy Manager |
| Container | Docker + Docker Compose |

## Services (docker-compose)

```
om-frontend   → React app served by Nginx (port 80)
om-backend    → Express API (port 5000)
om-db         → PostgreSQL (internal network only)
```

### Networks
- `proxy_network` — external, connects with Nginx Proxy Manager (AWS)
- `om_internal_net` — private bridge between backend and DB

### Volumes
- `postgres_data` — PostgreSQL data
- `uploads_data` — product images (`/app/public/uploads`)

## Request Flow

```
Browser → Nginx Proxy Manager → om-frontend (static)
                              → om-backend  (API /api/*)
                              → om-backend  (images /uploads/*)
```

## Frontend Structure

```
src/
  App.jsx                  # Router — admin pages are lazy-loaded
  pages/admin/             # Admin dashboard (code-split chunk)
  components/sections/     # Landing page sections
  components/layout/       # Navbar, Footer
  services/                # API clients (api.js, adminApi.js)
  context/                 # AuthContext, LanguageContext
```

### Code Splitting
All admin pages (including heavy deps jsPDF ~500KB, xlsx ~300KB) are loaded via `React.lazy()` so the landing page bundle stays lean.

## Backend Structure

```
src/
  app.js                   # Express setup, CORS, middlewares
  routes/                  # auth, products, categories, upload, proxy
  controllers/             # Request handlers
  repositories/            # SQL queries (ProductRepository, etc.)
  middlewares/             # auth (JWT protect), error handler, rate limiter
  config/                  # pool.js (pg connection), env validation
```

## Auth Flow

1. Login → returns `accessToken` (short-lived) + sets `refreshToken` cookie (httpOnly)
2. Protected routes validate Bearer token via `protect` middleware
3. On 401 → frontend calls `/api/auth/refresh` using the cookie
4. Refresh token is rotated on every use

## Image Handling

- **Upload**: `POST /api/upload/image` → stored in `public/uploads/`, URL returned as `{protocol}://{host}/uploads/{filename}`
- **Serve**: `GET /uploads/{filename}` — Express static with `Access-Control-Allow-Origin: *`
- **External proxy**: `GET /api/proxy/image?url=...` — server-side fetch to bypass browser CORS on external CDN images
