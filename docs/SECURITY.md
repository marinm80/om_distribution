# 🔒 Seguridad Informática – OM Distribution

> **Documento de referencia.** Esta especificación será abordada en una **fase de planificación dedicada** a seguridad antes de la implementación.

---

## 1. Frontend (React)

### 1.1 Sanitización de inputs
- Limpiar todos los campos del formulario antes de enviar.  
- Usar librerías como **DOMPurify** para sanitizar texto y prevenir inyección de HTML/scripts.  

### 1.2 Prevención de XSS
- React escapa valores en JSX por defecto, pero **nunca usar `dangerouslySetInnerHTML`** con datos del usuario.  
- Validar que ningún componente renderice HTML sin sanitizar.  

### 1.3 Validación estricta en frontend
| Campo | Reglas |
|-------|--------|
| Email | Regex de formato + longitud máxima (254 chars) |
| Teléfono | Solo dígitos, paréntesis, guiones y espacios |
| Nombre | Sin caracteres especiales peligrosos (`<`, `>`, `"`, `'`, `;`) |
| Textarea | Longitud máxima (ej. 1000 chars) + sanitización |

### 1.4 Rate limiting visual
- Deshabilitar el botón de envío después del click para evitar envíos duplicados.  
- Mostrar estado loading y reactivar solo tras respuesta.  

### 1.5 Google reCAPTCHA v3
- Integración invisible en el formulario de contacto para prevenir bots y spam.  
- Usar **react-google-recaptcha-v3**.  

### 1.6 Variables de entorno
- Nunca exponer API keys, tokens o credenciales en el código fuente.  
- Usar archivos `.env` con prefijo `VITE_` (si se usa Vite) y agregarlos a `.gitignore`.  

### 1.7 Dependencias seguras
- Ejecutar `npm audit` periódicamente.  
- Mantener paquetes actualizados.  
- Evitar dependencias abandonadas o con vulnerabilidades conocidas.  

---

## 2. Backend / Infraestructura

> ⚠️ React por sí solo **no puede garantizar seguridad completa** — las siguientes medidas son imprescindibles en el backend o servicio que reciba los datos del formulario.

### 2.1 HTTPS obligatorio
- Toda la comunicación debe ir cifrada con TLS/SSL.  
- Tanto el sitio como el endpoint del formulario.  

### 2.2 Validación server-side
- Re-validar **TODOS** los campos en el backend.  
- Nunca confiar solo en la validación del frontend (el usuario puede saltarla).  

### 2.3 Protección CSRF
- Si se usa un backend propio, implementar tokens CSRF en el formulario.  
- Si se usa un servicio externo (Formspree, EmailJS, Netlify Forms), verificar que el servicio lo maneje.  

### 2.4 Rate limiting en el servidor
- Limitar envíos por IP (ej. máx 5 envíos por minuto).  
- Prevenir abuso y ataques de fuerza bruta.  

### 2.5 Headers de seguridad HTTP
Configurar en Vercel/Netlify:

| Header | Propósito |
|--------|-----------|
| `Content-Security-Policy` (CSP) | Restringir orígenes de scripts, estilos e imágenes |
| `X-Content-Type-Options: nosniff` | Prevenir MIME sniffing |
| `X-Frame-Options: DENY` | Prevenir clickjacking |
| `Strict-Transport-Security` (HSTS) | Forzar HTTPS |
| `Referrer-Policy: strict-origin-when-cross-origin` | Controlar información del referrer |

### 2.6 Honeypot field
- Campo oculto invisible en el formulario (ej. `<input name="website" hidden />`).  
- Si llega con valor, es un bot → rechazar el envío.  
- Solución simple y complementaria a reCAPTCHA.  

### 2.7 Sanitización en backend
- Escapar/limpiar datos antes de guardar en base de datos o incluir en emails.  
- Prevenir SQL injection y email injection.  

---

## 3. Servicio de formulario recomendado (temporal)

Si no se tiene backend propio inicialmente, usar un servicio seguro:

| Servicio | Características |
|----------|----------------|
| **Formspree** | HTTPS, spam filter, reCAPTCHA integrado |
| **EmailJS** | Envío de emails directo desde frontend con templates |
| **Netlify Forms** | Formularios nativos con honeypot y spam filter incluidos |

**Roadmap:** Migrar a un **backend propio (Node.js/Express)** con RTK Query para manejo completo de seguridad y datos.

---

## 4. Checklist de implementación

- [ ] Sanitización de inputs con DOMPurify  
- [ ] Validación de todos los campos (frontend)  
- [ ] Integración de reCAPTCHA v3  
- [ ] Honeypot field en el formulario  
- [ ] Variables sensibles en `.env` + `.gitignore`  
- [ ] `npm audit` sin vulnerabilidades críticas  
- [ ] HTTPS habilitado en producción  
- [ ] Headers de seguridad configurados en hosting  
- [ ] Validación server-side implementada  
- [ ] Rate limiting en el endpoint del formulario  
- [ ] Protección CSRF activa  
- [ ] Sanitización de datos en backend  

---

> 📅 **Nota:** Este documento será revisado y expandido durante la fase de planificación de seguridad del proyecto.
