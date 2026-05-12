# Spec: OM Distribution Landing Page

> Slug: `landing-om-distribution` · Modo de entrada: C · Generado: 2026-05-12

## Historia de usuario
Como **dueño de OM Distribution**, quiero una **landing page profesional y automatizada**, para **generar confianza en clientes de EE.UU., mostrar mi catálogo de productos y centralizar las solicitudes de cotización**.

## Alcance
### Incluye
- **Secciones Públicas**: Hero, About Us, Stats animados, Logos de aliados, Categorías de productos, Galería interactiva (Swiper), Beneficios, Testimonios, FAQ y Contacto.
- **Formulario de Contacto**: Validación frontend, sanitización de datos y persistencia en Base de Datos.
- **Backend**: API REST con arquitectura de repositorio, autenticación JWT y manejo de errores centralizado.
- **Infraestructura**: Conexión a la base de datos PostgreSQL `om_markets`.

### NO incluye (out of scope)
- Pasarela de pagos (Stripe/PayPal) en esta fase.
- Carrito de compras funcional (solo solicitudes de cotización).
- Envío automático de emails (se gestionará via DB inicialmente).
- Panel de administración visual (se definirá en una Spec separada o fase posterior).

## Actores
| Rol | Descripción | Permisos relevantes |
|---|---|---|
| **Visitante** | Cliente potencial que busca información. | Ver catálogo, enviar formulario de contacto. |
| **Administrador** | Dueño de la empresa (TBD). | Gestionar productos, testimonios y ver contactos (vía API/BD). |

## Precondiciones
- El servidor PostgreSQL debe estar corriendo en el contenedor Docker `ec1a48...` con la base de datos `om_markets` creada.
- Node.js y npm instalados.

## Postcondiciones
- El mensaje de contacto se guarda en la tabla `contacts`.
- El visitante recibe una confirmación visual de envío exitoso.

## Flujo principal (caso feliz)
1. El usuario navega por las secciones de la landing.
2. El usuario completa el formulario de contacto en la sección final.
3. El sistema valida los campos (email, teléfono, mensaje).
4. El sistema sanitiza el input y lo envía al backend.
5. El backend guarda el registro en la base de datos `om_markets`.
6. El frontend muestra un mensaje de éxito y limpia el formulario.

## Flujos alternativos
### Alt-1: Error en validación
1. El usuario ingresa un email inválido.
2. El sistema resalta el campo en rojo y bloquea el botón "Send Message".

### Alt-2: Error de servidor
1. El backend no puede conectar con la BD.
2. El sistema muestra un mensaje de "Service Unavailable" y sugiere intentar más tarde, manteniendo los datos del usuario en los campos.

## Reglas de negocio
- **RB-1**: Solo se permiten 5 solicitudes de contacto por IP por minuto (Rate Limiting).
- **RB-2**: Los productos mostrados en la galería deben provenir de la base de datos (dinámico).
- **RB-3**: Las contraseñas del administrador deben estar hasheadas con bcrypt (salt rounds: 10).

## Escenarios BDD (Gherkin)

### Escenario 1: Envío de contacto exitoso
Given un visitante completa todos los campos obligatorios del formulario
And el servidor de base de datos está operativo
When hace clic en "Send Message"
Then el sistema guarda la información en la tabla `contacts`
And muestra el mensaje "Thank you! We will contact you soon."

### Escenario 2: Intento de SPAM (Honeypot)
Given un bot completa el campo oculto `website`
When intenta enviar el formulario
Then el sistema rechaza la petición silenciosamente sin guardar nada en la BD.

## Criterios de aceptación
- [ ] Diseño 100% responsive (Mobile, Tablet, Desktop).
- [ ] Tiempo de carga (LCP) inferior a 2.5 segundos.
- [ ] Formulario de contacto sanitizado y persistente.
- [ ] Conexión exitosa a la BD `om_markets`.

## Métricas de éxito
- Tasa de conversión de visitantes a contactos (solicitudes de cotización).
- Puntuación de Core Web Vitals en verde.

## Preguntas abiertas (TBD)
- **TBD**: ¿Deseas que implementemos la carga de imágenes vía Cloudinary o localmente en esta fase?
- **TBD**: ¿Hay algún rol de "Editor" además del Administrador?
