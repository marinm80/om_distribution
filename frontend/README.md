# OM Distribution — Frontend Application

Esta es la interfaz de usuario de **OM Distribution**, una Single Page Application (SPA) de alto rendimiento construida con React y Vite.

## 🚀 Características Principales

- **Diseño Premium**: Interfaz moderna con Tailwind CSS v4, animaciones suaves (Framer Motion) y carousels optimizados (Swiper).
- **Internacionalización (i18n)**: Soporte completo para Inglés y Español con detección automática de idioma.
- **Admin Dashboard**: Panel de control protegido para gestionar el catálogo de productos, categorías y mensajes de contacto.
- **Gestión de Medios**: Selector dual para imágenes (URL externa o subida de archivo local).
- **Reportes**: Generación de catálogos en PDF directamente desde el navegador.

## 🛠️ Tecnologías Utilizadas

- **Core**: React 19, Vite 7.
- **Estilos**: Tailwind CSS v4.
- **Estado**: React Context API para Autenticación e Idioma.
- **Rutas**: React Router Dom 7.
- **PDF**: jsPDF con autoTable.
- **Excel**: XLSX para procesamiento de archivos masivos.

## 📦 Instalación

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Configurar entorno:
   Asegúrate de que el backend esté corriendo en `http://localhost:5000`.

3. Iniciar desarrollo:
   ```bash
   npm run dev
   ```

4. Construir para producción:
   ```bash
   npm run build
   ```

## 📂 Estructura de Carpetas

- `src/components`: Componentes atómicos y secciones de la página.
- `src/context`: Proveedores de estado global.
- `src/pages`: Vistas principales y panel administrativo.
- `src/services`: Clientes Axios para comunicación con la API.
- `src/i18n`: Diccionarios de traducción.

---
© 2026 OM Distribution.
