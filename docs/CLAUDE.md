# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the `frontend/` directory:

```bash
npm run dev      # Start dev server (Vite HMR)
npm run build    # Production build
npm run preview  # Preview production build locally
npm run lint     # ESLint check
```

No test suite is configured yet.

## Project Docs

| File | Purpose |
|---|---|
| `docs/prompt.md` | Full product spec: all 12 sections, visual design, typography, color palette, folder structure, tech decisions |
| `docs/PLAN.md` | Phase-by-phase development plan (Phases 1–8) with per-phase checklists |
| `docs/SECURITY.md` | Security requirements: validation rules, DOMPurify, reCAPTCHA v3, honeypot, security headers |

When in doubt about design decisions, content, or expected behavior, check `docs/prompt.md` first.

## Current Phase

**Phase 1** (setup & configuration). Do not start Phase 2 until explicitly instructed.

## Architecture

**React 19 + Vite** single-page landing page. No global state library — state is local to each component or section. The project will grow toward a backend, not toward complex frontend state.

### State Management

No Redux. Each component manages its own state with `useState` / `useReducer`.

Cross-section state (when needed) goes in a shared parent or a custom hook in `src/hooks/`.

### Custom Hooks (`src/hooks/`)

| Hook | Purpose |
|---|---|
| `useContactForm` | Form state + Formspree submission + DOMPurify sanitization |

Future hooks planned: `useInView` (scroll reveal), `useCountUp` (Stats counter).

### Component Structure

```
src/components/
  ui/          # Reusable primitives: Button, Input, Textarea, Accordion
  layout/      # Navbar, Footer (not yet implemented)
  sections/    # Hero, About, Stats, Categories, ProductGallery, WhyChooseUs,
               # Testimonials, FAQ, Contact (not yet implemented)
  carousel/    # Swiper-based carousels (not yet implemented)
```

### Static Data

`src/data/` holds `products.js` (8 products, 4 categories), `testimonials.js`, and `faq.js`. No API — data is static and imported directly into section components.

### Styling

TailwindCSS v4 with custom theme defined in the `@theme` block in `src/index.css` (no `tailwind.config.js`). Use the `primary`, `secondary`, `accent`, `font-sans`, `font-heading` tokens defined there. Full color palette and typography scale are in `docs/prompt.md`.

### Key Libraries

| Library | Usage |
|---|---|
| Framer Motion | Scroll reveals, accordion expand/collapse, section transitions |
| Swiper | Product gallery carousel and testimonials carousel |
| DOMPurify | Sanitize contact form inputs (used inside `useContactForm`) |
| react-google-recaptcha-v3 | Invisible bot protection on contact form |

## Security

Contact form requirements are fully specified in `docs/SECURITY.md`. Logic lives in `src/hooks/useContactForm.js`: honeypot check, DOMPurify on all inputs, Formspree fetch via `VITE_FORMSPREE_ENDPOINT`. Never use `dangerouslySetInnerHTML`.
