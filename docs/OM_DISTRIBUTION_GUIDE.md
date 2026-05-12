# OM Distribution — Technical Project Guide
**PERN Stack Bilingual Landing Page**
**Version**: 1.0.0 | **Author**: SDD Agent Team

---

## 1. Project Overview
OM Distribution is a high-performance landing page designed for a food distribution company in the United States. The project focuses on two core pillars: **Bilingual Content (EN/ES)** and **Technical Excellence** using the PERN stack.

### Key Objectives
- Showcase a premium product catalog with smooth interactions.
- Capture B2B leads through a secured contact system.
- Provide a robust administrative backend for content management.
- Ensure high performance (p95 < 300ms) and SEO optimization.

---

## 2. Technical Architecture

### 2.1 Backend (Node.js + Express)
The backend follows a strict **4-Layer Repository Pattern** to ensure separation of concerns and testability:
1. **Routes**: Definition of API endpoints and middleware application.
2. **Controllers**: Request validation and response formatting.
3. **Services**: Core business logic (e.g., Auth logic, Data transformations).
4. **Repositories**: Raw SQL execution via PostgreSQL native driver.

### 2.2 Frontend (React 19 + Vite 7)
- **Styling**: Tailwind CSS v4 with a custom-defined design system in `index.css`.
- **State Management**: React Context API for language and session state (Lightweight, no Redux overhead).
- **Internationalization**: `i18next` with a custom `LanguageProvider` for real-time switching between English and Spanish.
- **Animations**: `Framer Motion` for reveal effects and `Swiper.js` for touch-optimized carousels.

---

## 3. Data Model (PostgreSQL)

The database `om_markets` uses a bilingual schema strategy where localized fields coexist in the same table, avoiding complex joins or translation tables.

| Table | Description | Key Fields |
|-------|-------------|------------|
| `users` | Admin accounts | `email`, `password` (bcrypt), `role` |
| `refresh_tokens` | Security rotation | `token`, `user_id`, `expires_at` |
| `categories` | Product groups | `name_en`, `name_es` |
| `products` | Item catalog | `name_en`, `name_es`, `description_en`, `description_es`, `image_url` |
| `testimonials` | Social proof | `author_name`, `content_en`, `content_es`, `rating` |
| `contacts` | B2B Leads | `full_name`, `email`, `message`, `company_name` |

---

## 4. Feature Highlights

### 🌍 Real-time Internationalization
The system detects the user's browser language and serves the content accordingly. The API supports a `?lang=` parameter that dynamically selects the correct database columns, ensuring that even dynamic content is fully localized.

### 🔐 Advanced Security
- **JWT + Refresh Tokens**: Access tokens are short-lived (15m), while refresh tokens are stored in `HttpOnly` cookies to prevent XSS.
- **Rate Limiting**: Critical endpoints (Login, Contact) are limited to 5 requests per minute to prevent brute force and spam.
- **Sanitization**: All user inputs are sanitized before storage.

### 🚀 Modern UI/UX
- **Mobile-First Design**: Optimized for all device sizes.
- **Glassmorphism**: Modern aesthetics using backdrop filters.
- **Reveal Animations**: Sections animate as the user scrolls, creating a premium feel.

---

## 5. Development & Deployment

### Commands
- **Dev**: `npm run dev` (Frontend & Backend)
- **Testing**: `npm run test` (Jest + Supertest integration tests)
- **Build**: `npm run build` (Vite optimization)

### Environment Variables
Required variables include `DATABASE_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, and `FRONTEND_URL`.

---

## 6. Conclusion
This project demonstrates a production-ready implementation of a modern landing page, combining the robustness of a structured PERN backend with the fluidity of a high-end React frontend. It is fully documented and tested, following the **Software Design Document (SDD)** protocol.

---
*© 2026 OM Distribution. Internal Documentation.*
