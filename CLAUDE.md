# CLAUDE.md — OM Distribution

> Documento centralizado de referencia para Claude Code.
> Cualquier decisión de diseño, arquitectura o implementación debe alinearse con este archivo.

---

## Stack

| Capa       | Tecnología                                    |
|------------|-----------------------------------------------|
| Frontend   | React 19, Vite 7, TailwindCSS v4              |
| Backend    | Node 20, Express 4.x, dotenv 16               |
| Base datos | PostgreSQL 16 (driver nativo `pg` 8.x)        |
| Auth       | JWT (jsonwebtoken 9.x) con refresh tokens     |
| Deploy     | Render (frontend + backend)                   |

---

## Comandos

### Backend (`/backend`)

```bash
npm run dev      # Inicia con nodemon
npm run start    # Producción
npm run test     # Jest --runInBand
```

### Frontend (`/frontend`)

```bash
npm run dev      # Vite HMR
npm run build    # Build de producción
npm run preview  # Preview del build
npm run lint     # ESLint
```

---

## Estructura del Proyecto

```
om_distribution/
├── backend/
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── server.js              # Entry point
│       ├── app.js                 # Express app, middlewares globales, rutas
│       ├── config/
│       │   ├── env.js             # Validación de variables de entorno
│       │   └── pool.js            # Conexión PostgreSQL (ÚNICO archivo que importa pg)
│       ├── routes/                # Definición de rutas (solo router)
│       ├── controllers/           # Manejo de req/res, delega a services
│       ├── services/              # Lógica de negocio
│       ├── repositories/          # Queries SQL (único que importa pool.js)
│       ├── middlewares/
│       │   ├── error.js           # Error handler centralizado
│       │   └── auth.js            # Verificación JWT
│       └── utils/
│           └── AppError.js        # Clase de error operacional
│
├── frontend/
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css              # TailwindCSS v4 con @theme (sin tailwind.config.js)
│       ├── components/
│       │   ├── ui/                # Button, Input, Textarea, Accordion
│       │   ├── layout/            # Navbar, Footer
│       │   ├── sections/          # Hero, About, Stats, Categories, etc.
│       │   └── carousel/          # Componentes Swiper
│       ├── hooks/                 # useContactForm, useInView, useCountUp
│       ├── pages/                 # Vistas (cuando se agregue routing)
│       ├── services/              # Llamadas al API (fetch wrappers)
│       ├── context/               # React Context providers (auth, etc.)
│       ├── utils/                 # Helpers reutilizables
│       ├── data/                  # Datos estáticos (products, testimonials, faq)
│       └── assets/                # Imágenes, SVGs
│
└── docs/
    └── prompt.md                  # Spec completa del producto (diseño, contenido, secciones)
```

---

## Arquitectura

### Patrón: Repository Pattern (4 capas)

```
Route → Controller → Service → Repository
```

| Capa         | Responsabilidad                                    | Regla                                    |
|--------------|----------------------------------------------------|------------------------------------------|
| Route        | Define endpoints, aplica middlewares                | Solo llama al controller                 |
| Controller   | Parsea req, llama al service, envía res             | No contiene lógica de negocio            |
| Service      | Lógica de negocio, validaciones, transformaciones   | No accede a la BD directamente           |
| Repository   | Queries SQL puras                                   | ÚNICO que importa `pool.js`              |

### Estructura de respuesta estándar

Todas las respuestas del API siguen este formato:

```json
{
  "success": true,
  "data": {},
  "message": "Operación exitosa",
  "error": null
}
```

En errores:

```json
{
  "success": false,
  "data": null,
  "message": "Descripción del error",
  "error": "stack trace (solo en development)"
}
```

### Manejo de errores

- Errores operacionales: lanzar `new AppError(message, statusCode)` desde services.
- El middleware `error.js` captura todo y responde con la estructura estándar.
- En producción nunca se expone el stack trace.

---

## Convenciones de Código

### General

- **Siempre** `async/await` — nunca callbacks ni `.then()` chains.
- Nombres de archivos en `camelCase` para modules, `PascalCase` para componentes React.
- Una función por archivo en controllers, services y repositories cuando sea posible.

### Backend

- Rutas en `/src/routes`, nombradas `{recurso}.routes.js`.
- Controllers en `/src/controllers`, nombrados `{recurso}.controller.js`.
- Services en `/src/services`, nombrados `{recurso}.service.js`.
- Repositories en `/src/repositories`, nombrados `{recurso}.repository.js`.
- Variables de entorno **siempre** via `process.env` con validación al inicio en `config/env.js`.

### Frontend

- Componentes funcionales con hooks — no class components.
- Estado local con `useState` / `useReducer`. No Redux.
- Estado compartido entre componentes via Context o custom hooks en `src/hooks/`.
- Estilos con TailwindCSS v4 usando tokens definidos en `@theme` de `index.css`: `primary`, `secondary`, `accent`, `font-sans`, `font-heading`.
- Nunca usar `dangerouslySetInnerHTML`.

### Base de datos

- Nombres de tablas: `snake_case`, plural (`users`, `products`, `order_items`).
- Primary keys: `id` (SERIAL o UUID).
- Timestamps: `created_at` y `updated_at` en toda tabla.
- Foreign keys: `{tabla_singular}_id` (ej. `user_id`, `category_id`).

---

## Variables de Entorno

### Backend (`backend/.env`)

| Variable             | Descripción                          | Requerida |
|----------------------|--------------------------------------|-----------|
| `DATABASE_URL`       | Connection string de PostgreSQL      | Sí        |
| `JWT_SECRET`         | Secret para access tokens            | Sí        |
| `JWT_REFRESH_SECRET` | Secret para refresh tokens           | Sí        |
| `PORT`               | Puerto del servidor (default: 5000)  | No        |
| `NODE_ENV`           | `development` o `production`         | No        |

### Frontend (`frontend/.env`)

| Variable                  | Descripción                     | Requerida |
|---------------------------|---------------------------------|-----------|
| `VITE_API_URL`            | URL base del backend API        | Sí        |
| `VITE_RECAPTCHA_SITE_KEY` | Google reCAPTCHA v3 site key    | Sí        |
| `VITE_FORMSPREE_ENDPOINT` | Endpoint de Formspree           | Sí        |

> Nunca commitear archivos `.env`. Usar `.env.example` como referencia.

---

## Autenticación

### Flujo JWT

```
1. Login → POST /api/auth/login
   ← { accessToken (15min), refreshToken (7d) }

2. Request autenticado → Header: Authorization: Bearer <accessToken>
   → Middleware auth.js verifica y decodifica
   → req.user = { id, email, role }

3. Token expirado → POST /api/auth/refresh
   ← { nuevo accessToken }

4. Logout → POST /api/auth/logout
   → Invalidar refreshToken en BD
```

### Reglas

- Access token: corta duración (15 min), se envía en header `Authorization`.
- Refresh token: larga duración (7 días), almacenado en BD, rotación en cada uso.
- Middleware `auth.js` protege rutas privadas.
- Passwords hasheados con `bcrypt` (salt rounds: 10).

---

## Seguridad

### Frontend

| Medida                  | Implementación                                                     |
|-------------------------|--------------------------------------------------------------------|
| Sanitización de inputs  | DOMPurify en todos los campos antes de enviar                      |
| Prevención XSS          | React escapa JSX por defecto. Nunca `dangerouslySetInnerHTML`      |
| Validación de campos    | Regex email (254 chars max), teléfono (solo dígitos/guiones/espacios), textarea (1000 chars max), nombre (sin `<>"';`) |
| Rate limiting visual    | Botón deshabilitado post-click, reactivar solo tras respuesta      |
| reCAPTCHA v3            | Invisible via `react-google-recaptcha-v3` en formulario de contacto |
| Honeypot                | Campo oculto `name="website"` — si llega con valor, es bot        |
| Variables sensibles     | En `.env` con prefijo `VITE_`, nunca en código fuente              |
| Dependencias            | `npm audit` periódico, mantener paquetes actualizados              |

### Backend

| Medida                  | Implementación                                                     |
|-------------------------|--------------------------------------------------------------------|
| HTTPS                   | Obligatorio en producción (TLS/SSL)                                |
| Validación server-side  | Re-validar TODOS los campos — nunca confiar solo en frontend       |
| CSRF                    | Tokens CSRF en formularios si se usa backend propio                |
| Rate limiting           | Máx 5 envíos por IP por minuto                                     |
| Sanitización BD         | Queries parametrizadas (`$1, $2`) — nunca concatenar strings en SQL |
| Passwords               | bcrypt con salt rounds 10. Nunca almacenar en texto plano          |

### Headers HTTP de Seguridad

Configurar en Render/servidor:

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000; includeSubDomains
Referrer-Policy: strict-origin-when-cross-origin
```

---

## Frontend — Detalle Técnico

### Librerías Clave

| Librería                        | Versión  | Uso                                                |
|---------------------------------|----------|----------------------------------------------------|
| Framer Motion                   | 12.x     | Scroll reveals, accordion, transiciones de sección  |
| Swiper                          | 12.x     | Carrusel de productos y testimonios                 |
| DOMPurify                       | 3.x      | Sanitizar inputs del formulario de contacto         |
| react-google-recaptcha-v3       | 1.x      | Protección bot invisible en formulario              |
| bcryptjs                        | 2.x      | Hash de contraseñas (backend)                       |
| jsonwebtoken                    | 9.x      | Generación y verificación de JWT (backend)          |

### Custom Hooks (`src/hooks/`)

| Hook             | Propósito                                            |
|------------------|------------------------------------------------------|
| `useContactForm` | Estado del form + envío Formspree + sanitización      |
| `useInView`      | Scroll reveal con Intersection Observer (planeado)    |
| `useCountUp`     | Animación de contador en Stats (planeado)             |

### Datos Estáticos (`src/data/`)

Los datos de productos (8), testimonios y FAQ son estáticos e importados directamente. No hay API para esto en la fase actual.

### Estilo Visual

- **Paleta:** `primary` (#16A34A verde), `secondary` (#F97316 naranja), `accent` (#FACC15 amarillo), fondo `stone-50`, texto `stone-900`.
- **Tipografía:** Inter (body, 16px base) + Poppins (headings, bold/semi-bold).
- **Espaciado entre secciones:** `py-16` a `py-24`.
- **Bordes:** `rounded-xl` / `rounded-2xl` en tarjetas.
- **Sombras:** `shadow-md` base, `shadow-lg` en hover.
- **Animaciones:** Fade-in + slide-up al scroll. Count-up en stats. Hover scale en tarjetas (`scale-105`).

### Accesibilidad (WCAG 2.1 AA)

- Contraste mínimo 4.5:1.
- `alt` en todas las imágenes.
- Focus states visibles (`focus-visible:ring-2`).
- Navegación completa por teclado.
- Atributos ARIA en componentes dinámicos.
- Skip to content link.
- `prefers-reduced-motion` respetado.

### Performance

- Imágenes en WebP con fallback. Hero ~200KB, productos ~80KB, logos ~20KB.
- Lazy loading en imágenes below the fold.
- Code splitting con `React.lazy` + `Suspense` si la app crece.
- Fuentes con `font-display: swap`.
- Target: LCP < 2.5s, FID < 100ms, CLS < 0.1.

---

## Plan de Desarrollo

### Fase 1 — Setup & Configuración ✅

- [x] Vite + React + TailwindCSS v4 configurado
- [x] Framer Motion y Swiper instalados
- [x] Estructura de carpetas creada
- [x] Fuentes importadas (Inter/Poppins)
- [x] Colores custom en `@theme`
- [x] DOMPurify configurado
- [x] `.env` + `.gitignore`

### Fase 2 — Componentes UI Base

- [x] Button (primary, secondary, variants)
- [x] Input + Textarea (con estados de validación)
- [x] Accordion (FAQ)
- [ ] Card (producto, testimonio)
- [ ] Badge
- [ ] Section wrapper (padding consistente)

### Fase 3 — Layout & Navegación

- [ ] Navbar sticky con blur en scroll
- [ ] Menú hamburguesa móvil con drawer animado
- [ ] Scroll suave entre secciones
- [ ] Footer con 4 columnas + mapa embebido
- [ ] Links de navegación activos (Intersection Observer)

### Fase 4 — Secciones Principales

- [ ] Hero (imagen fondo, título, 2 CTAs, overlay)
- [ ] About Us (descripción + imagen + 4 iconos)
- [ ] Stats (4 números con count-up)
- [ ] Trusted By (logos grayscale, hover color, marquee)
- [ ] Product Categories (grid 4 tarjetas)
- [ ] Product Gallery (carrusel Swiper autoplay)
- [ ] Why Choose Us (grid 2x3 con iconos)
- [ ] Testimonials (tarjetas con avatar)
- [ ] FAQ (acordeón expandible)
- [ ] Contact (formulario + datos de contacto)

### Fase 5 — Animaciones & Interacciones

- [ ] Scroll reveal en todas las secciones
- [ ] Hover effects en botones y tarjetas
- [ ] Count-up en Stats
- [ ] Acordeón FAQ con AnimatePresence
- [ ] Carrusel pausa en hover

### Fase 6 — Formulario de Contacto

- [ ] Validación frontend estricta (regex, longitudes)
- [ ] Sanitización con DOMPurify
- [ ] Estados: idle → loading → success/error
- [ ] reCAPTCHA v3 invisible
- [ ] Honeypot field
- [ ] Variables de entorno para API keys

### Fase 7 — Optimización & Responsive

- [ ] Mobile-first responsive completo
- [ ] Imágenes WebP optimizadas
- [ ] Lazy loading
- [ ] Accesibilidad WCAG 2.1 AA
- [ ] Meta tags SEO + Open Graph
- [ ] Favicon

### Fase 8 — Testing & Deploy

- [ ] Testing manual cross-device
- [ ] Core Web Vitals en verde
- [ ] `npm audit` limpio
- [ ] Auditoría XSS
- [ ] Build producción sin warnings
- [ ] Headers de seguridad configurados
- [ ] Deploy en Render

### Backend (post-frontend)

- [ ] Setup Express + PostgreSQL
- [ ] Auth completo (register, login, refresh, logout)
- [ ] CRUD productos y categorías
- [ ] Formulario de contacto server-side
- [ ] Rate limiting + CSRF
- [ ] Validación y sanitización server-side

---

## Deploy

- **Plataforma:** Render (frontend static site + backend web service).
- **CI/CD:** Build automático desde `main`.
- **Variables de entorno:** configuradas en el dashboard de Render, nunca en código.
- **HTTPS:** habilitado por defecto en Render.

---

## Referencia

- `docs/prompt.md` — Especificación completa del producto (diseño, contenido, secciones, paleta, tipografía). **Consultar primero ante dudas de diseño o contenido.**
