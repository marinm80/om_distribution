# API Reference

Base URL: `/api`

All protected endpoints require `Authorization: Bearer <accessToken>` header.

---

## Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/login` | — | Login, returns accessToken + sets refresh cookie |
| POST | `/auth/refresh` | cookie | Rotate refresh token, returns new accessToken |
| POST | `/auth/logout` | — | Clears refresh token cookie |
| POST | `/auth/forgot-password` | — | Send password reset email |

---

## Products

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/products` | — | All products (`?lang=es\|en`) |
| GET | `/products/landing` | — | Active + show_on_landing products only |
| GET | `/products/:id` | — | Single product |
| POST | `/products` | admin | Create product |
| PATCH | `/products/:id` | admin | Update product |
| PATCH | `/products/:id/toggle` | admin | Toggle `is_active` or `show_on_landing` |
| DELETE | `/products/:id` | admin | Delete product |
| POST | `/products/bulk` | admin | Bulk import array of products |

---

## Categories

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/categories` | — | All categories |
| POST | `/categories` | admin | Create category |
| PATCH | `/categories/:id` | admin | Update category |
| DELETE | `/categories/:id` | admin | Delete category |

---

## Upload

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/upload/image` | admin | Upload product image (multipart/form-data, field: `image`, max 5MB) |

Returns: `{ data: { url: "https://host/uploads/filename.jpg" } }`

---

## Proxy

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/proxy/image?url=...` | — | Server-side proxy for external images (bypasses CORS). Blocks private IPs. |

---

## Testimonials

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/testimonials` | — | All testimonials (`?lang=es\|en`) |
| POST | `/testimonials` | admin | Create testimonial |
| DELETE | `/testimonials/:id` | admin | Delete testimonial |

---

## Contact

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/contact` | — | Submit contact form (rate-limited) |
| GET | `/contact` | admin | List all contact submissions |

---

## Users

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/users` | admin | List users |
| POST | `/users` | admin | Create user |
| PATCH | `/users/:id` | admin | Update user |
| DELETE | `/users/:id` | admin | Delete user |

---

## Health

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/health` | — | Returns `{ success: true, data: { db: "connected" } }` |
