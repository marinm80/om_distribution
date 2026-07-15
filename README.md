# OM Distribution

Plataforma bilingüe para una distribuidora de alimentos, con catálogo público y panel administrativo. El sistema usa React, Express y MySQL, y está preparado para desplegar frontend, backend y base de datos como recursos separados en Coolify.

## Estado

Versión funcional con:

- CRUD de productos, categorías, testimonios, contactos y usuarios.
- Múltiples categorías por producto.
- Importación de productos desde Excel y catálogo PDF informativo.
- Autenticación JWT con rotación de refresh token en cookie HttpOnly.
- Límite de intentos de inicio de sesión.
- Interfaz bilingüe inglés/español y branding de portfolio.

## Stack

| Capa | Tecnología |
| --- | --- |
| Frontend | React 19, TypeScript, Vite 7, Tailwind CSS 4 |
| Backend | Node.js 20, Express 4, TypeScript |
| Base de datos | MySQL 8 (`mysql2`) |
| Auth | Access JWT y refresh token rotativo en cookie HttpOnly |
| Reportes | jsPDF y XLSX |

## Desarrollo local

```powershell
docker-compose up -d om-mysql-db

cd backend
npm install
npm run dev

cd ..\frontend
npm install
npm run dev
```

Configura `backend/.env` a partir de `backend/.env.example`. El frontend usa `http://localhost:5000/api` por defecto; puede sobrescribirse con `VITE_API_URL`.

## Cambios de base de datos

Los cambios de esquema se guardan exclusivamente en [`backend/database/migrations`](./backend/database/migrations). Para la versión actual debe aplicarse:

```text
backend/database/migrations/004_product_categories.sql
```

La migración es aditiva e idempotente: crea `product_categories` y copia las categorías existentes sin eliminar `products.category_id`.

Consulta [`docs/deploy.md`](./docs/deploy.md) para el orden exacto de backup, migración, verificación y despliegue en el VPS.

## Verificación

```powershell
cd backend
npm test -- --runInBand
npm run build

cd ..\frontend
npm run lint
npm run build
```

## Documentación

- [Configuración local](./docs/setup.md)
- [Release en VPS/Coolify](./docs/deploy.md)
- [Migraciones SQL](./backend/database/migrations/README.md)
- [Especificación de esta actualización](./specs/maintenance-feature-readiness/spec.md)

## Licencia

Copyright © 2026 Rafael Marín. Todos los derechos reservados. Consulta [`LICENSE`](./LICENSE).
