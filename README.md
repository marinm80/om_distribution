# OM Distribution — Distribuidora de Alimentos

Este es el repositorio central de **OM Distribution**, una plataforma moderna para una distribuidora de alimentos en Estados Unidos. El proyecto sigue una arquitectura **PERN** (PostgreSQL, Express, React, Node) y está diseñado bajo estándares profesionales de escalabilidad y rendimiento.

### 🚩 Estado del Proyecto: **Completado (V1.1.0)**
- [x] Arquitectura de 4 Capas (Backend) con Patrón Repositorio.
- [x] Base de Datos Bilingüe (PostgreSQL).
- [x] Dashboard Administrativo robusto para gestión de contenidos.
- [x] Sistema de Medios: Soporte para subida de imágenes locales y URLs externas.
- [x] Generación de Catálogos PDF en formato horizontal (Landscape).
- [x] Importación masiva de productos desde Excel.

---

## 🚀 Stack Tecnológico

| Capa       | Tecnología                                    |
|------------|-----------------------------------------------|
| **Frontend**   | React 19, Vite 7, TailwindCSS v4              |
| **Backend**    | Node 20, Express 4.x, Multer (Uploads)        |
| **Base de datos** | PostgreSQL 16 (driver nativo `pg`)        |
| **Auth**       | JWT con refresh tokens (HttpOnly Cookies)     |
| **Reportes**   | jsPDF (Catálogos), XLSX (Excel Import)       |
| **Animaciones** | Framer Motion 12, Swiper 12                  |

---

## 🛠️ Comandos Rápidos

### Backend (`/backend`)
```bash
npm install      # Instalar dependencias
npm run dev      # Inicia con nodemon (Desarrollo)
npm run start    # Inicia en Producción
npm run test     # Correr tests con Jest
```

### Frontend (`/frontend`)
```bash
npm install      # Instalar dependencias
npm run dev      # Vite HMR (Puerto 5173)
npm run build    # Generar bundle de producción
```

---

## 📂 Estructura del Proyecto

```
om_distribution/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Manejo de peticiones y respuestas
│   │   ├── repositories/     # Capa de acceso a datos (SQL)
│   │   ├── routes/           # Endpoints de la API
│   │   └── middlewares/      # Seguridad, Auth y Errores
│   └── public/uploads/       # Almacenamiento local de imágenes
│
├── frontend/
│   ├── src/
│   │   ├── components/       # UI Reutilizable y Secciones
│   │   ├── context/          # Gestión de estado (Auth, Idioma)
│   │   ├── pages/admin/      # Panel de administración
│   │   └── services/         # Clientes de API (Axios)
│
├── specs/                    # Documentación SDD
└── docs/                     # Guía técnica y manuales
```

---

## 🏛️ Funcionalidades Principales

### 🌍 Bilingüe Nativo (EN/ES)
Todo el sistema está diseñado para ser bilingüe desde la base de datos hasta la interfaz de usuario, permitiendo cambiar de idioma instantáneamente.

### 🔐 Seguridad Avanzada
Implementación de **JWT Rotation** con Refresh Tokens seguros en Cookies HttpOnly y limitación de peticiones (Rate Limiting) para prevenir ataques.

### 📊 Gestión de Catálogo
- **PDF Dinámico**: Generación de catálogos profesionales en horizontal con un producto por página.
- **Subida de Archivos**: Integración con Multer para gestionar fotografías de productos localmente.
- **Excel Bulk Import**: Permite cargar cientos de productos en segundos mediante plantillas Excel.

---

## 📝 Documentación Adicional

Para más detalles técnicos y guías de uso, consulta:
- [Guía Técnica de OM Distribution](./docs/OM_DISTRIBUTION_GUIDE.md)
- [Especificaciones Funcionales](./specs/landing-om-distribution/spec.md)

---

## 📄 Licencia
© 2026 OM Distribution. Todos los derechos reservados.
