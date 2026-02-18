# Plan de Desarrollo Frontend - OM Distribution

> **Proyecto:** Landing Page para distribuidora de alimentos en Estados Unidos  
> **Enfoque:** Frontend exclusivo  
> **Fecha de creación:** Febrero 2026  

---

## **Resumen Ejecutivo**

Landing page moderna, limpia y visualmente amigable para OM Distribution. Transmite confianza, frescura y accesibilidad.

**Tecnologías principales:**
- React 18+ con hooks y componentes funcionales
- TailwindCSS 3+ (configuración personalizada)
- Redux Toolkit para estado global
- Framer Motion para animaciones
- Swiper.js para carruseles

---

## **FASE 1: Setup & Configuración (Semana 1)**
**Objetivo:** Tener el proyecto base funcionando y listo para desarrollar

| Hito | Entregable | Prioridad |
|------|-----------|-----------|
| 1.1 | Crear proyecto React + Vite + TailwindCSS configurado | Alta |
| 1.2 | Configurar Redux Toolkit (store, slices base) | Alta |
| 1.3 | Configurar Framer Motion para animaciones | Alta |
| 1.4 | Configurar Swiper.js para carruseles | Alta |
| 1.5 | Setup de carpeta src/ (components, store, assets, data) | Alta |
| 1.6 | Configurar fuentes (Inter/Poppins) en Tailwind | Media |
| 1.7 | Crear variables de colores custom en Tailwind | Media |
| 1.8 | Configuración inicial de seguridad | Alta |

### Checklist Técnico:
- [ ] Vite + React instalados
- [ ] TailwindCSS configurado con colores custom
- [ ] Redux store creado con Provider
- [ ] Framer Motion instalado
- [ ] Swiper.js instalado
- [ ] Estructura de carpetas creada
- [ ] Fuentes importadas desde Google Fonts

### Checklist de Seguridad (Fase 1):
- [ ] Crear archivo `.env` para variables sensibles
- [ ] Agregar `.env` a `.gitignore`
- [ ] Crear `.env.example` con variables de ejemplo (sin valores reales)
- [ ] Configurar DOMPurify para sanitización
- [ ] Establecer reglas de validación base (longitudes máximas, caracteres permitidos)
- [ ] Documentar convención: nunca usar `dangerouslySetInnerHTML`

---

## **FASE 2: Componentes UI Base (Semana 1-2)**
**Objetivo:** Tener una librería de componentes reutilizables

| Hito | Entregable | Ubicación sugerida |
|------|-----------|-------------------|
| 2.1 | Componente `Button` (primary, secondary, variants) | `src/components/ui/Button.jsx` |
| 2.2 | Componente `Card` (producto, testimonio) | `src/components/ui/Card.jsx` |
| 2.3 | Componente `Input` + `Textarea` (con estados de validación) | `src/components/ui/Input.jsx` |
| 2.4 | Componente `Accordion` (para FAQ) | `src/components/ui/Accordion.jsx` |
| 2.5 | Componente `Badge` | `src/components/ui/Badge.jsx` |
| 2.6 | Componente `Section` (wrapper con padding consistente) | `src/components/ui/Section.jsx` |

### Checklist Técnico:
- [ ] Todos los componentes son reutilizables
- [ ] Props bien documentadas
- [ ] Estados de hover, focus y disabled implementados
- [ ] Responsive por defecto

---

## **FASE 3: Layout & Navegación (Semana 2)**
**Objetivo:** Navegación completa y responsive

| Hito | Entregable | Tecnologías |
|------|-----------|-------------|
| 3.1 | Navbar fija con efecto sticky/blur en scroll | React hooks, CSS |
| 3.2 | Menú hamburguesa móvil con drawer animado | Framer Motion |
| 3.3 | Scroll suave entre secciones | Native smooth scroll |
| 3.4 | Footer con 4 columnas + mapa embebido | HTML/CSS |
| 3.5 | Links de navegación activos (sección visible) | Intersection Observer |

### Checklist Técnico:
- [ ] Navbar se vuelve opaca al hacer scroll
- [ ] Menú móvil funciona correctamente
- [ ] Navegación por teclado completa
- [ ] Skip to content link para screen readers

---

## **FASE 4: Secciones Principales (Semana 2-3)**
**Objetivo:** Todo el contenido visual de la landing

| # | Sección | Descripción | Animaciones |
|---|---------|-------------|-------------|
| 4.1 | **Hero** | Imagen de fondo, título, 2 CTAs, overlay oscuro | Fade-in + slide-up |
| 4.2 | **About Us** | Descripción + imagen lateral + 4 iconos | Scroll reveal |
| 4.3 | **Stats** | 4 números grandes con contador animado | Count-up al entrar |
| 4.4 | **Trusted By** | Logos en escala de grises, hover a color, marquee móvil | Marquee infinito |
| 4.5 | **Product Categories** | Grid de 4 categorías con tarjetas | Hover scale |
| 4.6 | **Product Gallery** | Carrusel automático con 8 productos | Swiper.js auto-play |
| 4.7 | **Why Choose Us** | Grid 2x3/3x2 con 6 beneficios + iconos | Scroll reveal |
| 4.8 | **Testimonials** | 3-4 tarjetas de testimonios con avatar | Fade-in |
| 4.9 | **FAQ** | Acordeón expandible con 6 preguntas | Smooth expand |
| 4.10 | **Contact** | Formulario validado + datos de contacto | Form animations |

### Checklist Técnico:
- [ ] Todas las secciones tienen scroll reveal
- [ ] Imágenes placeholder de Unsplash/Pexels
- [ ] Contenido en inglés
- [ ] Botones CTA consistentes
- [ ] Espaciado uniforme (py-16 a py-24)

---

## **FASE 5: Animaciones & Interacciones (Semana 3)**
**Objetivo:** Micro-interacciones y animaciones de scroll

| Hito | Entregable | Implementación |
|------|-----------|----------------|
| 5.1 | Scroll reveal en todas las secciones | Framer Motion + useInView |
| 5.2 | Hover effects en botones y tarjetas | Tailwind + Framer Motion |
| 5.3 | Animación count-up en Stats | Custom hook o librería |
| 5.4 | Acordeón FAQ con animación smooth | Framer Motion AnimatePresence |
| 5.5 | Carrusel pausa en hover | Swiper.js config |

### Checklist Técnico:
- [ ] Animaciones no bloquean el render
- [ ] prefers-reduced-motion respetado
- [ ] Transiciones suaves (300-500ms)

---

## **FASE 6: Formulario de Contacto + Seguridad (Semana 3)**
**Objetivo:** Formulario funcional con validación estricta y medidas de seguridad

| Hito | Entregable | Detalles |
|------|-----------|----------|
| 6.1 | Campos del formulario | Nombre, Email, Teléfono, Empresa, Mensaje |
| 6.2 | Validación frontend estricta | Regex email, longitudes máximas, caracteres peligrosos |
| 6.3 | Sanitización de inputs | DOMPurify para limpiar texto antes de enviar |
| 6.4 | Estados visuales | Bordes rojo/verde según validación |
| 6.5 | Estados de envío | idle → loading → success/error |
| 6.6 | Rate limiting visual | Botón deshabilitado post-click, prevención duplicados |
| 6.7 | Google reCAPTCHA v3 | Integración invisible con react-google-recaptcha-v3 |
| 6.8 | Honeypot field | Campo oculto para detectar bots |
| 6.9 | Integración Redux | contactSlice con thunks |
| 6.10 | Variables de entorno | API keys en .env, nunca en código fuente |

### Checklist Técnico:
- [ ] Validación en tiempo real con regex
- [ ] Longitudes máximas: Email (254), Textarea (1000)
- [ ] Bloqueo de caracteres peligrosos: `<`, `>`, `"`, `'`, `;`
- [ ] DOMPurify instalado y configurado
- [ ] Sanitización antes de cualquier renderizado
- [ ] NUNCA usar `dangerouslySetInnerHTML` con datos de usuario
- [ ] Botón deshabilitado durante envío
- [ ] reCAPTCHA v3 funcionando en modo invisible
- [ ] Honeypot field implementado (hidden input "website")
- [ ] Variables sensibles en `.env` con prefijo `VITE_`
- [ ] `.env` agregado a `.gitignore`
- [ ] Mensajes de error claros
- [ ] Spinner de loading
- [ ] Mensaje de confirmación post-envío
- [ ] Redux devtools configurado

---

## **FASE 7: Optimización & Responsive (Semana 4)**
**Objetivo:** Performance y experiencia móvil perfecta

| Hito | Entregable | Tecnología |
|------|-----------|------------|
| 7.1 | Mobile-first responsive | Tailwind breakpoints |
| 7.2 | Imágenes optimizadas | WebP con fallback |
| 7.3 | Lazy loading | loading="lazy" + intersection observer |
| 7.4 | Accesibilidad | WCAG 2.1 AA compliance |
| 7.5 | Meta tags SEO | title, description, Open Graph |
| 7.6 | Favicon | Logo empresa |

### Checklist Técnico:
- [ ] Contraste mínimo 4.5:1
- [ ] Alt texts en todas las imágenes
- [ ] Focus states visibles
- [ ] Navegación por teclado completa
- [ ] Atributos ARIA correctos

---

## **FASE 8: Testing, Seguridad & Deploy (Semana 4)**
**Objetivo:** Preparar para producción con auditoría de seguridad

| Hito | Entregable | Herramienta |
|------|-----------|-------------|
| 8.1 | Testing manual en dispositivos | Chrome DevTools + físicos |
| 8.2 | Revisión Core Web Vitals | Lighthouse |
| 8.3 | Auditoría de seguridad frontend | npm audit + manual review |
| 8.4 | Revisión de protecciones XSS | Code review |
| 8.5 | Build de producción | Vite build |
| 8.6 | Deploy en Vercel con HTTPS | Vercel CLI/Git |
| 8.7 | Configurar headers de seguridad | Vercel config |
| 8.8 | README.md | Documentación |

### Checklist Técnico:
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] No errores en consola
- [ ] Build sin warnings
- [ ] `npm audit` sin vulnerabilidades críticas
- [ ] Todas las dependencias actualizadas
- [ ] Revisión de que no se usa `dangerouslySetInnerHTML`
- [ ] DOMPurify aplicado en todos los inputs de usuario
- [ ] Validación de campos verificada
- [ ] HTTPS obligatorio en producción
- [ ] Headers de seguridad configurados:
  - [ ] Content-Security-Policy (CSP)
  - [ ] X-Content-Type-Options: nosniff
  - [ ] X-Frame-Options: DENY
  - [ ] Strict-Transport-Security (HSTS)
  - [ ] Referrer-Policy: strict-origin-when-cross-origin

---

## **Estructura de Carpetas**

```
src/
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── sections/         # Hero, About, Products, Stats, FAQ, etc.
│   ├── ui/               # Button, Card, Badge, Accordion, Input
│   └── carousel/         # ProductCarousel, TestimonialCarousel
├── store/
│   ├── store.js          # configureStore + combinación de slices
│   └── slices/
│       ├── productsSlice.js
│       ├── contactSlice.js
│       └── uiSlice.js
├── assets/
│   ├── images/           # Fotos de productos, hero, logos
│   └── icons/            # SVG icons
├── data/
│   ├── products.js       # Array de productos
│   ├── testimonials.js   # Array de testimonios
│   └── faq.js            # Array de preguntas frecuentes
├── styles/
│   └── globals.css       # Tailwind imports + fuentes
├── App.jsx
└── main.jsx
```

---

## **Paleta de Colores (Tailwind)**

| Rol | Color | Hex | Tailwind |
|-----|-------|-----|----------|
| Primario | Verde fresco | `#16A34A` | `green-600` |
| Secundario | Naranja cálido | `#F97316` | `orange-500` |
| Acento | Amarillo suave | `#FACC15` | `yellow-400` |
| Fondo claro | Blanco hueso | `#FAFAF9` | `stone-50` |
| Texto principal | Gris oscuro | `#1C1917` | `stone-900` |
| Texto secundario | Gris medio | `#78716C` | `stone-500` |

---

## **Dependencias por Fase**

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "@reduxjs/toolkit": "^2.x",
    "react-redux": "^9.x",
    "framer-motion": "^11.x",
    "swiper": "^11.x",
    "dompurify": "^3.x",
    "react-google-recaptcha-v3": "^1.x"
  }
}
```

### Dependencias de Seguridad:
- **DOMPurify:** Sanitización de inputs para prevenir XSS
- **react-google-recaptcha-v3:** Protección anti-bot invisible
- **npm audit:** Revisión periódica de vulnerabilidades

---

## **Timeline Estimado**

```
Semana 1: ████░░░░░░ (Fases 1-2)
Semana 2: ░░████░░░░ (Fases 2-3-4)
Semana 3: ░░░░████░░ (Fases 4-5-6)
Semana 4: ░░░░░░████ (Fases 7-8)
```

**Total estimado:** 4 semanas (~20 días hábiles)

---

## **Próximos Pasos**

1. Revisar y aprobar este plan
2. Crear repo en GitHub
3. Comenzar con Fase 1 (Setup)
4. Reuniones de revisión por fase

---

## **Seguridad Frontend – Resumen de Medidas**

Basado en `/docs/SECURITY.md`, las siguientes medidas se implementan en el frontend:

### Validación y Sanitización:
- ✅ Validación estricta con regex (email, teléfono, nombre)
- ✅ Longitudes máximas en todos los campos
- ✅ Bloqueo de caracteres peligrosos (`<`, `>`, `"`, `'`, `;`)
- ✅ DOMPurify para sanitizar texto antes de renderizar/enviar
- ✅ NUNCA usar `dangerouslySetInnerHTML`

### Protección Anti-Bot:
- ✅ Google reCAPTCHA v3 (invisible)
- ✅ Honeypot field (input oculto "website")
- ✅ Rate limiting visual (botón deshabilitado post-click)

### Gestión de Variables Sensibles:
- ✅ API keys en `.env` con prefijo `VITE_`
- ✅ `.env` en `.gitignore`
- ✅ Nunca exponer credenciales en código fuente

### Dependencias:
- ✅ `npm audit` periódico
- ✅ Mantener paquetes actualizados
- ✅ Evitar dependencias abandonadas

> ⚠️ **Nota importante:** React por sí solo no garantiza seguridad completa. El backend debe implementar validación server-side, rate limiting, protección CSRF y sanitización adicional.

---

## **Notas**

- Las fases pueden solaparse ligeramente según avance
- Prioridad: Contenido principal primero, luego refinamientos
- Seguridad frontend integrada en Fases 1, 6 y 8
- Backend y seguridad server-side se abordarán en fase posterior
- Imágenes reales reemplazarán placeholders

---

*Documento creado para el proyecto OM Distribution - Febrero 2026*
