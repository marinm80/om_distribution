# OM Distribution — Backend API

Este es el motor de la plataforma de **OM Distribution**, construido con Node.js, Express y PostgreSQL.

## 🏗️ Arquitectura de Capas (Repository Pattern)

Para garantizar la mantenibilidad y escalabilidad, el backend se divide en 4 capas claras:

1.  **Routes**: Define los puntos de entrada y aplica middlewares de seguridad (`protect`, `restrictTo`, `rateLimit`).
2.  **Controllers**: Orquestan la lógica de la petición, validan los datos de entrada y envían las respuestas estandarizadas.
3.  **Services**: Contienen la lógica de negocio pura (ej: generación de tokens, procesamiento de archivos).
4.  **Repositories**: Es la única capa que interactúa directamente con la base de datos mediante queries SQL optimizadas.

## 🔒 Seguridad

- **Autenticación**: Basada en JWT (JSON Web Tokens).
- **Refresh Token Rotation**: Los refresh tokens se almacenan en la base de datos y se envían al cliente mediante **HttpOnly Cookies**, mitigando ataques XSS.
- **Autorización**: Roles diferenciados (`admin`, `seller`).
- **Seguridad de Cabeceras**: Implementación de **Helmet.js**.
- **CORS**: Configurado específicamente para el dominio del frontend.
- **Rate Limiting**: Protección contra ataques de fuerza bruta en login y spam en formularios de contacto.

## 📂 Gestión de Archivos

El sistema utiliza **Multer** para gestionar la subida de imágenes de productos.
- **Ruta de almacenamiento**: `public/uploads/`
- **Servicio estático**: Las imágenes se sirven en `http://localhost:5000/uploads/[filename]`

## 🛠️ Instalación y Uso

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Configurar variables de entorno (`.env`):
   ```env
   DATABASE_URL=postgres://usuario:password@localhost:5432/om_markets
   JWT_SECRET=tu_secreto_super_seguro
   JWT_REFRESH_SECRET=tu_otro_secreto
   PORT=5000
   NODE_ENV=development
   ```

3. Iniciar servidor:
   ```bash
   npm run dev
   ```

## 🧪 Testing

Se utiliza **Jest** y **Supertest** para pruebas de integración de los endpoints principales.
```bash
npm run test
```

---
© 2026 OM Distribution.
