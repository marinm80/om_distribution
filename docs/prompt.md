# **🟩 Prompt para Generar una Landing Page – Distribuidora de Alimentos**

Quiero que generes **el diseño completo de una landing page moderna, limpia y visualmente amigable** para una **distribuidora de alimentos ubicada en Estados Unidos**.  
La página debe transmitir **confianza, frescura y accesibilidad** para todo tipo de público.  
El idioma principal del contenido será **inglés**, con posibilidad de soporte bilingüe (español) a futuro.

---

## **🏢 Identidad de la empresa**
- **Nombre placeholder:** *OM Distribution* (o el nombre real cuando se defina).  
- **Slogan sugerido:** *"Quality Food, Delivered Fresh"*.  
- **Logo:** Placeholder con el nombre de la empresa. Incluir espacio para logo real.  
- **Ubicación:** Estados Unidos (mercado local y regional).  
- **Idioma:** Inglés (US).  

---

## **🎯 Objetivo**
Crear una landing page atractiva, clara y fácil de navegar, que presente a la empresa como una distribuidora de alimentos **confiable, profesional y cercana**.

---

## **📌 Secciones obligatorias**

### **1. Navbar / Header**
Barra de navegación fija en la parte superior:
- **Logo** de la empresa (izquierda).  
- **Links de navegación** a las secciones internas (scroll suave):  
  - About Us · Products · Why Us · Testimonials · Contact  
- **Botón CTA** destacado en el navbar: **"Get a Quote"**.  
- **Menú hamburguesa** en móvil con drawer/sidebar animado.  
- **Efecto sticky** con fondo sólido/blur al hacer scroll.  
- Transición de navbar transparente (hero) → opaco (scroll).  

---

### **2. Hero principal**
- Imagen o ilustración de alta calidad relacionada con alimentos frescos o distribución.  
- Título fuerte y claro (ejemplo: *"Quality Food Distribution You Can Trust"*).  
- Subtítulo corto explicando el valor de la empresa.  
- Botón CTA primario: **"Get a Quote"** + Botón secundario: **"View Products"**.  
- Imagen de fondo con overlay oscuro semitransparente para legibilidad del texto.

---

### **3. Sobre la empresa (About Us)**
- Breve descripción de quiénes somos.  
- Enfoque en:
  - Quality  
  - Freshness  
  - On-time Delivery  
  - Customer Service  
- Diseño visual amigable con iconos o imágenes suaves.  
- Imagen lateral del equipo, almacén o flota de distribución.  

---

### **4. Cifras / Estadísticas (Stats)**
Barra o sección con números clave que generen confianza:  
- **+500** Clients Served  
- **+10** Years of Experience  
- **+1,000** Daily Deliveries  
- **50+** Product Categories  

**Estilo:**  
- Números grandes y llamativos con animación de contador (count-up al entrar en viewport).  
- Fondo de color sólido o imagen con overlay para contrastar.  
- Disposición en fila (4 columnas en desktop, 2x2 en móvil).  

---

### **5. Logos de Marcas / Aliados (Trusted By)**
Barra horizontal con logos de clientes, marcas distribuidas o aliados comerciales:  
- Mínimo 5–8 logos en escala de grises.  
- Efecto hover: logo a color.  
- Scroll automático infinito (marquee) en móvil.  
- Título: *"Trusted by Leading Brands"* o *"Our Partners"*.  

---

### **6. Productos o categorías**
Crear tarjetas o bloques con:
- Imagen representativa  
- Nombre de la categoría  
- Breve descripción  

Ejemplos:
- Granos  
- Carnes  
- Vegetales  
- Productos empacados  

---

### **7. Galería de Productos (Carrusel rotativo)**
Sección visual destacada con un **carrusel/slider automático** que rote las imágenes de los diferentes productos disponibles.

**Comportamiento:**
- Rotación automática cada 4–5 segundos.  
- Navegación manual con flechas izquierda/derecha.  
- Indicadores de posición (dots) en la parte inferior.  
- Transición suave entre imágenes (fade o slide).  
- Pausa automática al hacer hover o interactuar.  
- Diseño responsive: 1 imagen en móvil, 2–3 en tablet, 4 en desktop.  

**Cada slide debe mostrar:**
- Imagen de alta calidad del producto.  
- Nombre del producto superpuesto con fondo semitransparente.  
- Categoría a la que pertenece (ej. "Granos", "Carnes", "Vegetales").  
- Botón o enlace opcional: **"Ver más"** o **"Solicitar cotización"**.  

**Productos de ejemplo para la galería:**
- Arroz premium  
- Frijoles negros  
- Pechuga de pollo  
- Aceite vegetal  
- Tomates frescos  
- Harina de trigo  
- Azúcar refinada  
- Pasta seca  

**Estilo visual:**
- Fondo neutro o degradado suave para resaltar las imágenes.  
- Bordes redondeados en las tarjetas de producto.  
- Sombra sutil para dar profundidad.  
- Título de sección: *"Nuestros Productos"* o *"Lo que Distribuimos"*.  

**Implementación técnica sugerida:**
- Componente React reutilizable (`ProductGallery` o `ProductCarousel`).  
- Uso de librería como **Swiper.js** o **Embla Carousel** (compatible con React).  
- Soporte para lazy loading de imágenes.  
- Accesibilidad: navegación por teclado y atributos ARIA.  

---

### **8. Beneficios / Por qué elegirnos (Why Choose Us)**
Lista con iconos animados (aparecen al hacer scroll):
- On-time Deliveries  
- Farm-fresh Products  
- Competitive Pricing  
- Personalized Service  
- Wide Coverage Area  
- USDA Compliant  

**Estilo:** Grid de 2x3 o 3x2. Cada beneficio con icono, título y descripción de 1 línea.  

---

### **9. Testimonios (Testimonials)**
- 3–4 testimonios cortos de clientes satisfechos.  
- Cada testimonio incluye: foto de avatar, nombre, cargo/empresa y texto.  
- Diseño limpio tipo tarjeta con comillas decorativas.  
- Posible carrusel si hay más de 3.  
- Estrellas de rating (★★★★★) opcionales.

---

### **10. FAQ (Preguntas Frecuentes)**
Sección de acordeón expandible con preguntas comunes:
- *What areas do you deliver to?*  
- *What is the minimum order quantity?*  
- *What payment methods do you accept?*  
- *How do I request a custom quote?*  
- *Do you offer same-day delivery?*  
- *Are your products USDA certified?*  

**Estilo:** Acordeón con animación de expand/collapse. Icono +/− a la derecha.  

---

### **11. CTA final + Formulario de Contacto**
Bloque dividido en dos columnas:

**Columna izquierda:** Texto motivador invitando a contactar, con datos directos:  
- Phone: *+1 (XXX) XXX-XXXX*  
- Email: *info@omdistribution.com*  
- Business Hours: *Mon–Fri 7:00 AM – 6:00 PM EST*  

**Columna derecha:** Formulario de contacto con campos:  
- Full Name (required)  
- Email (required, validación de formato)  
- Phone (optional)  
- Company Name (optional)  
- Message / Order Details (textarea, required)  
- Botón: **"Send Message"** o **"Request a Quote"**  

**Validaciones:**  
- Validación en frontend (campos requeridos, formato email).  
- Feedback visual: bordes rojos en error, verdes en válido.  
- Estado de envío: loading → success/error message.  

---

### **12. Footer**
Debe incluir:

**Columna 1 – Empresa:**  
- Logo + nombre  
- Breve descripción (1–2 líneas)  

**Columna 2 – Links rápidos:**  
- About Us  
- Products  
- Contact  
- FAQ  

**Columna 3 – Contacto:**  
- Phone: *+1 (XXX) XXX-XXXX*  
- Email: *info@omdistribution.com*  
- Address: *123 Main St, City, State, ZIP*  

**Columna 4 – Redes Sociales:**  
- Facebook, Instagram, LinkedIn (iconos con hover effect)  

**Mapa embebido:**  
- Google Maps embed mostrando la ubicación de la empresa.  
- Dimensiones: 100% width, ~250px height.  

**Barra inferior:**  
- © 2026 OM Distribution. All rights reserved.  
- Links opcionales: Privacy Policy | Terms of Service  

---

## **🎨 Estilo visual**

### Paleta de colores (Tailwind tokens):
| Rol | Color | Hex | Tailwind |
|-----|-------|-----|----------|
| Primario | Verde fresco | `#16A34A` | `green-600` |
| Secundario | Naranja cálido | `#F97316` | `orange-500` |
| Acento | Amarillo suave | `#FACC15` | `yellow-400` |
| Fondo claro | Blanco hueso | `#FAFAF9` | `stone-50` |
| Texto principal | Gris oscuro | `#1C1917` | `stone-900` |
| Texto secundario | Gris medio | `#78716C` | `stone-500` |

### Tipografía:
- **Headings:** `Inter` o `Poppins` (bold, semi-bold).  
- **Body:** `Inter` (regular, 16px base).  
- **Tamaños:** h1: 3rem, h2: 2.25rem, h3: 1.5rem, body: 1rem, small: 0.875rem.  
- Importar desde Google Fonts.  

### Principios generales:
- Amigable, limpio y moderno.  
- Mucho espacio en blanco (`py-16` a `py-24` entre secciones).  
- Bordes redondeados en tarjetas (`rounded-xl` o `rounded-2xl`).  
- Sombras sutiles (`shadow-md`, `shadow-lg` en hover).  
- Diseño **fully responsive** (mobile-first).  

### Animaciones y micro-interacciones:
- **Scroll reveal:** Elementos aparecen con fade-in + slide-up al entrar al viewport (usar `Intersection Observer` o librería como `framer-motion`).  
- **Hover en tarjetas:** Escala sutil (`scale-105`) + sombra expandida.  
- **Hover en botones:** Cambio de tono + leve elevación.  
- **Counter animation:** Números en la sección de estadísticas animan de 0 al valor final.  
- **Smooth scroll:** Navegación entre secciones con scroll suave.

---

## **🛠️ Tecnologías**
Estructura pensada para:
- **React 18+** (con hooks y componentes funcionales).  
- **Redux Toolkit (RTK)** para manejo de estado global.  
- **TailwindCSS 3+** (configuración personalizada de colores y fuentes).  
- **Framer Motion** o **AOS** para animaciones de scroll.  
- **Swiper.js** o **Embla Carousel** para carruseles.  
- **React Hook Form** o validación nativa para el formulario.  
- Componentes reutilizables y código limpio.  

### Manejo de estado con RTK:
Usar **Redux Toolkit** para centralizar el estado de la aplicación:

**Slices sugeridos:**
- `productsSlice` — Lista de productos, categoría activa, filtros, estado de carga.  
- `contactSlice` — Datos del formulario, estado de envío (idle/loading/success/error).  
- `uiSlice` — Estado del menú móvil (abierto/cerrado), sección activa en el navbar, modal visibility.  

**Configuración:**
- Store centralizado con `configureStore()`.  
- `createSlice()` para cada dominio de estado.  
- `createAsyncThunk()` para llamadas asíncronas (envío de formulario, carga de productos si viene de API).  
- **RTK Query** (opcional) si a futuro se conecta a un backend/API REST.  
- `Provider` envolviendo `<App />` en el entry point.  

**Ejemplo de uso:**
```js
// store/slices/productsSlice.js
const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [], activeCategory: 'all', status: 'idle' },
  reducers: {
    setActiveCategory: (state, action) => { state.activeCategory = action.payload },
  },
});
```  

### Estructura de carpetas sugerida:
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
│       ├── productsSlice.js   # Estado de productos y filtros
│       ├── contactSlice.js    # Estado del formulario de contacto
│       └── uiSlice.js         # Estado de UI (menú, modales, sección activa)
├── assets/
│   ├── images/           # Fotos de productos, hero, logos
│   └── icons/            # SVG icons
├── data/
│   ├── products.js       # Array de productos para el carrusel
│   ├── testimonials.js   # Array de testimonios
│   └── faq.js            # Array de preguntas frecuentes
├── styles/
│   └── globals.css       # Tailwind imports + fuentes
├── App.jsx
└── main.jsx
```

---

## **� SEO y Meta Tags**
- `<title>`: *OM Distribution – Quality Food Distribution in the US*  
- `<meta name="description">`: *Reliable food distribution services. Fresh products, on-time delivery, competitive prices.*  
- **Open Graph tags** para compartir en redes sociales (og:title, og:description, og:image).  
- **Favicon** con el logo de la empresa.  
- HTML semántico: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`.  
- Atributo `lang="en"` en el `<html>`.  

---

## **♿ Accesibilidad (A11y)**
- Contraste mínimo de **4.5:1** entre texto y fondo (WCAG AA).  
- Todos los `<img>` con atributo `alt` descriptivo.  
- Focus states visibles en todos los elementos interactivos (`focus-visible:ring-2`).  
- Navegación completa por teclado (Tab, Enter, Escape).  
- Atributos ARIA en componentes dinámicos (carrusel, acordeón, menú móvil).  
- Skip to content link oculto para screen readers.  

---

## **⚡ Performance**
- **Imágenes** en formato **WebP** con fallback a JPG/PNG.  
- **Lazy loading** en todas las imágenes below the fold (`loading="lazy"`).  
- **Code splitting** si la app crece (React.lazy + Suspense).  
- Tamaño máximo de imágenes: hero ~200KB, productos ~80KB, logos ~20KB.  
- Fuentes con `font-display: swap` para evitar FOIT.  
- Objetivo: **Core Web Vitals** en verde (LCP < 2.5s, FID < 100ms, CLS < 0.1).  

---

## **🔒 Seguridad Informática**
> 📄 Documentación completa en **[docs/SECURITY.md](docs/SECURITY.md)**.  
> Se abordará en una **fase de planificación dedicada** con implementación por etapas (frontend → backend → infraestructura).  

Puntos clave cubiertos: sanitización de inputs, prevención de XSS, reCAPTCHA v3, validación server-side, headers de seguridad HTTP (CSP, HSTS), protección CSRF, rate limiting y honeypot fields.

---

## **🖼️ Fuente de imágenes**
Mientras no se dispongan de fotos reales, usar imágenes de stock de:
- **Unsplash** (unsplash.com) – gratuitas, alta calidad.  
- **Pexels** (pexels.com) – gratuitas, libre de atribución.  
- Tamaño recomendado: hero 1920x1080, productos 600x400, avatares 150x150.  
- Placeholders: usar `via.placeholder.com` o componentes skeleton durante carga.  

---

## **🚀 Deployment**
- Plataforma sugerida: **Vercel** o **Netlify** (deploy automático desde GitHub).  
- Dominio personalizado cuando esté disponible.  
- Variables de entorno para: API keys de mapa, endpoint de formulario, etc.  
- CI/CD: Build automático en cada push a `main`.  

---

## **📦 Entrega esperada**
Genera:
- El código completo en **JSX + TailwindCSS**, organizado por componentes.  
- Texto final (en inglés) para cada sección.  
- Estructura de carpetas siguiendo la especificación.  
- Imágenes placeholder integradas desde Unsplash/Pexels.  
- Carrusel funcional con datos de ejemplo.  
- Formulario con validaciones frontend.  
- Navbar responsive con menú móvil.  
- Footer completo con mapa embebido.  
- Animaciones de scroll configuradas.  
- Archivo `README.md` con instrucciones de instalación y ejecución.

