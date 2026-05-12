# Plan: OM Distribution Landing Page

> Slug: `landing-om-distribution` · Generado: 2026-05-12 · Basado en: spec.md, tech-spec.md
> **ESTE DOCUMENTO REQUIERE REVISIÓN HUMANA ANTES DE PASAR A TASK-DECOMPOSER**

## Resumen ejecutivo
Implementación de una Landing Page bilingüe (EN/ES) con arquitectura PERN. El backend utilizará el **Repository Pattern** para desacoplar la lógica de negocio de las consultas SQL puras (`pg`). El frontend será una SPA en React 19 con **Context API** para i18n y autenticación, optimizada para performance (p95 < 300ms) y accesibilidad (WCAG AA).

## Stack final
- **Lenguaje**: JavaScript (ES6+).
- **Framework**: Express (Backend) / React 19 + Vite (Frontend).
- **BD**: PostgreSQL 16 (Driver `pg` nativo).
- **Librerías nuevas**: `i18next`, `react-i18next`, `framer-motion`, `swiper`, `morgan`, `cors`.
- **Servicios externos**: Docker (Local dev), Unsplash (Imágenes stock).

## Decisiones arquitectónicas (ADRs)

### D-01: Gestión de Idiomas (i18n)
- **Contexto**: Se requiere soporte para Inglés y Español en todo el contenido (estático y dinámico).
- **Opciones**: 
  a) Tablas separadas por idioma.
  b) Columnas `{campo}_en` y `{campo}_es` en la misma tabla.
  c) JSONB para campos traducibles.
- **Decisión**: b) Columnas `{campo}_en` y `{campo}_es`.
- **Razón**: Simplicidad en las consultas SQL y mejor performance para un volumen de datos bajo/medio (Landing).
- **Trade-offs**: Menos flexible si se agregan muchos idiomas (3+), pero ideal para bilingüe.

### D-02: Autenticación y Persistencia de Sesión
- **Contexto**: JWT con refresh tokens para seguridad según `CLAUDE.md`.
- **Opciones**: 
  a) JWT en LocalStorage.
  b) JWT en HttpOnly Cookies.
- **Decisión**: b) HttpOnly Cookies para Refresh Tokens y JSON en body para Access Tokens.
- **Razón**: Mayor seguridad contra ataques XSS.
- **Trade-offs**: Requiere configuración de CORS y Credentials en el frontend.

### D-03: Arquitectura de Repositorio
- **Contexto**: Seguir la convención del proyecto `om_distribution`.
- **Decisión**: Separación estricta en 4 capas (`Route → Controller → Service → Repository`).
- **Razón**: Mantenibilidad y facilidad de testing unitario en la capa de servicios.

## Modelo de datos

### Tablas nuevas
- `users`: `id` (UUID), `email` (UNIQUE), `password`, `role` (ADMIN/USER), `created_at`.
- `refresh_tokens`: `id`, `token`, `user_id` (FK), `expires_at`, `created_at`.
- `categories`: `id` (SERIAL), `name_en`, `name_es`, `created_at`.
- `products`: `id` (SERIAL), `name_en`, `name_es`, `description_en`, `description_es`, `image_url`, `category_id` (FK), `created_at`.
- `testimonials`: `id` (SERIAL), `author_name`, `content_en`, `content_es`, `rating`, `role_en`, `role_es`, `image_url`, `created_at`.
- `contacts`: `id` (SERIAL), `full_name`, `email`, `phone`, `company_name`, `message`, `created_at`.

### Migraciones esperadas
- `001_initial_schema.sql`: Creación de todas las tablas y relaciones.
- `002_seed_data.sql`: Datos iniciales para categorías, productos y testimonios.

## Contratos de API

### POST /api/contact
- Auth requerida: No.
- Rate limit: 5 req/min por IP.
- Response 201: `{ "success": true, "message": "Contact saved" }`

### GET /api/products
- Auth requerida: No.
- Query params: `lang` (en/es).
- Response 200: Lista de productos mapeada al idioma solicitado.

### POST /api/auth/login
- Request body: `{ "email", "password" }`.
- Response 200: `{ "accessToken" }` + Set-Cookie: `refreshToken`.

## Componentes frontend
- `LanguageProvider.jsx`: Contexto global para i18n.
- `Navbar.jsx`: Selector de idioma + scroll suave.
- `ProductCarousel.jsx`: Swiper integrado con datos bilingües.
- `ContactForm.jsx`: Validación con Zod y sanitización con DOMPurify.

## Estrategia de testing
- **Unit**: Servicios de backend y hooks de frontend (useContactForm).
- **Integration**: Repositorios de backend contra la BD `om_markets`.
- **E2E**: Flujo de envío de formulario (fase posterior).

## Despliegue
- Variables de entorno: `DATABASE_URL`, `JWT_SECRET`, `VITE_API_URL`.
- Docker: Usar `docker exec` para aplicar el esquema SQL inicial en `om_markets`.

## Riesgos identificados
- **R-01**: Problemas de CORS al usar HttpOnly Cookies si el frontend y backend están en dominios distintos (solucionado con configuración de `cors`).
- **R-02**: Latencia en la carga de imágenes si no se optimizan (se usará WebP).

## Estimación gruesa
- Esfuerzo total estimado: 24 horas de desarrollo.
- Granularidad esperada: ~15 tareas atómicas (T-NN).

---
**ESTE PLAN REQUIERE REVISIÓN HUMANA ANTES DE PROCEDER A TASK-DECOMPOSER.**
