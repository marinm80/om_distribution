# OM Distribution — Distribuidora de Alimentos

Este es el repositorio central de **OM Distribution**, una landing page moderna para una distribuidora de alimentos en Estados Unidos. El proyecto sigue una arquitectura **PERN** (PostgreSQL, Express, React, Node) y se rige bajo los principios de **SDD** (Software Design Document).

### 🚩 Estado del Proyecto: **Completado (MVP V1.0)**
- [x] Arquitectura de 4 Capas (Backend).
- [x] Base de Datos Bilingüe (om_markets).
- [x] Frontend con i18n (EN/ES) y Animaciones.
- [x] Pruebas de Integración (T-014).
- [x] Documentación de API (T-015).

---

## 🚀 Stack Tecnológico

| Capa       | Tecnología                                    |
|------------|-----------------------------------------------|
| **Frontend**   | React 19, Vite 7, TailwindCSS v4              |
| **Backend**    | Node 20, Express 4.x, dotenv 16               |
| **Base de datos** | PostgreSQL 16 (driver nativo `pg` 8.x) |
| **Auth**       | JWT con refresh tokens (HttpOnly Cookies)     |
| **Estado Global** | React Context API (NO Redux)               |
| **Patrón**     | Repository Pattern                            |
| **Animaciones** | Framer Motion 12                             |
| **Carruseles** | Swiper 12                                     |

---

## 🛠️ Comandos Rápidos

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

## 📂 Estructura del Proyecto

```
om_distribution/
├── backend/
│   ├── src/
│   │   ├── server.js              # Entry point
│   │   ├── app.js                 # Express app, middlewares, rutas
│   │   ├── config/                # env.js, pool.js (Único import de pg)
│   │   ├── routes/                # Definición de rutas
│   │   ├── controllers/           # Manejo de req/res
│   │   ├── services/              # Lógica de negocio
│   │   ├── repositories/          # Queries SQL puras
│   │   └── middlewares/           # auth.js, error.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/            # Navbar, Footer, SectionWrapper
│   │   │   └── sections/          # Hero, Products, Testimonials, Contact
│   │   ├── hooks/                 # useContactForm
│   │   ├── context/               # LanguageContext
│   │   ├── i18n/                  # Configuración i18next (locales EN/ES)
│   │   └── index.css              # TailwindCSS v4 (@theme)
│
├── specs/                         # Documentación SDD (Spec, Plan, Tasks)
└── docs/                          # Prompts y especificaciones originales
```

---

## 🏛️ Arquitectura y Convenciones

### Patrón de Repositorio (4 Capas)
`Route → Controller → Service → Repository`

1.  **Route**: Define endpoints y aplica middlewares.
2.  **Controller**: Parsea la petición y delega al service.
3.  **Service**: Lógica de negocio y validaciones. No toca la BD.
4.  **Repository**: Única capa que ejecuta SQL via `pool.js`.

### Reglas de Oro
- **Base de Datos**: Se utiliza `om_markets`. Soporte bilingüe en tablas (columnas `_en` / `_es`).
- **Código**: `async/await` siempre. Nombres en `camelCase` (módulos) y `PascalCase` (components).
- **Seguridad**: Sanitización básica, JWT Refresh Token Rotation, Rate limiting (5 req/min).
- **Estilo**: Tailwind v4 con tokens en `index.css`. Animaciones suaves con Framer Motion.

---

## 📝 Plan de Desarrollo (SDD)

El proyecto se desarrolló siguiendo el flujo:
1.  **Spec**: Definición funcional en `specs/landing-om-distribution/spec.md`.
2.  **Tech Spec**: Decisiones de infraestructura y modelos.
3.  **Plan**: Arquitectura detallada.
4.  **Tasks**: Tareas atómicas completadas en `specs/landing-om-distribution/tasks.md`.

---

## 📄 Licencia
© 2026 OM Distribution. All rights reserved.
