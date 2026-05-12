# Tech Spec: OM Distribution Landing Page

> Slug: `landing-om-distribution` · Generado: 2026-05-12 · Spec funcional: `spec.md`

## NFRs

### Performance
- Latencia objetivo: p95 < 300ms (carga de catálogo y envío de formulario).
- Throughput esperado: ~10 req/s (fase inicial).
- Picos conocidos: N/A.

### Disponibilidad
- Uptime objetivo: 99.99% (Alta disponibilidad).
- Multi-región: No en fase inicial, pero escalable.
- DR (Disaster Recovery): Respaldos diarios de la BD `om_markets`.

### Compliance
- Regulaciones aplicables: Ninguna estricta (US lead gen).
- Retención de datos: Indefinida para contactos hasta solicitud de borrado.
- Derecho al olvido: Implementado manualmente vía admin/DB.

### Deployment
- Target: Local Development (Docker).
- Containerizado: Sí, usando el contenedor `ec1a48...` para la BD.
- IaC: Ninguno por ahora.

### Observabilidad
- Logs: Básicos en consola (Morgan para HTTP, console.error para errores).
- Trazas: N/A.
- Métricas: N/A.
- SLOs: Tiempo de respuesta del formulario < 2s.

### Testing
- Niveles: Unit + Integration (Backend repositories y Frontend components).
- Cobertura mínima: 70%.
- Herramientas preferidas: Vitest (Frontend), Jest (Backend).

### i18n / a11y
- Idiomas: Inglés (US) y Español (LatAm).
- WCAG: AA (Contraste 4.5:1, etiquetas ARIA, navegación por teclado).
- RTL: No.

### Cache
- CDN: Cloudflare (recomendado para assets estáticos).
- App cache: N/A en fase inicial.
- TTLs / invalidación: Cache de productos manual (revalidación al editar).

### Auth
- Mecanismo: JWT propio con Refresh Tokens (Repository Pattern).
- MFA: No requerido inicialmente.
- Modelo de autorización: RBAC (Visitante, Admin).

### Multi-tenant
- Modelo: Single-tenant.

### Seguridad de datos
- Encriptación at-rest: Por defecto en el almacenamiento del host.
- Encriptación in-transit: HTTPS (SSL/TLS).
- Secret management: Archivo `.env` (backend/frontend).
- PII identificada: Email y Teléfono en tabla `contacts`.

## Restricciones explícitas (lo que NO se puede usar)
- No usar Redux (se usa Context API).
- No usar librerías de componentes pesadas sin justificación (Tailwind nativo preferido).

## Aspiraciones no negociables
- Soporte bilingüe real (i18n).
- Arquitectura de repositorio limpia en el backend.

## TBD (decisiones pendientes que serán resueltas en plan.md)
- Estructura exacta de la tabla `products` para soportar múltiples idiomas.
- Configuración de `react-i18next` en el frontend.
- Esquema de base de datos para la rotación de Refresh Tokens.
