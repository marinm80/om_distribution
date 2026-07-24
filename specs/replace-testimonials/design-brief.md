# Replace testimonials - Approved Design Brief

Status: approved by the user on 2026-07-24

## Design Read

This is a targeted redesign of a B2B food-distribution landing page for independent supermarkets, mini markets, and some neighborhood bodegas. The visual language remains sober, direct, and trust-first, using the existing Tailwind system and green brand accent.

## Dials

- `DESIGN_VARIANCE: 5`: asymmetric enough to avoid another equal-card grid while remaining professional.
- `MOTION_INTENSITY: 3`: entrance hierarchy only, with a static reduced-motion fallback.
- `VISUAL_DENSITY: 4`: four concise actions with enough context and imagery to be useful.

## Approved Section

Labels:

- English navigation: `How it works`
- Spanish navigation: `Cómo funciona`
- Anchor: `#process`

English flow:

1. `Review the display`: OM assesses the products, condition, and availability needed at the client's business.
2. `Prepare the order`: The requested merchandise is organized according to the needs identified onsite.
3. `Deliver the merchandise`: OM's truck takes the confirmed order directly to the business.
4. `Organize and replenish`: OM arranges the display, replaces old or expired products, and replenishes inventory to maintain availability.

Spanish flow:

1. `Revisamos el stand`: OM evalúa los productos, su condición y la disponibilidad necesaria en el negocio del cliente.
2. `Preparamos el pedido`: Se organiza la mercancía solicitada según las necesidades identificadas en el lugar.
3. `Entregamos la mercancía`: El camión de OM lleva el pedido confirmado directamente al negocio.
4. `Organizamos y reponemos`: OM organiza el stand, reemplaza productos viejos o vencidos y repone inventario para mantener la disponibilidad.

## Imagery

- Combine two original AI-generated placeholders with two real delivery photographs supplied by the user.
- Scenes must resemble independent supermarkets, mini markets, and neighborhood bodegas rather than gourmet stores or oversized distribution centers.
- Generated packaging, vehicles, clothing, and storefronts remain generic and unbranded.
- User-supplied delivery photographs may contain the real product brands OM distributes. They must not show a customer endorsement or identify a private customer.
- Images are optimized to WebP and have bilingual alternative text.

## Layout

- Mobile: one-column heading, image mosaic, and four vertically separated actions.
- Tablet and desktop: editorial image mosaic in the left column and a semantic ordered process in the wider right column.
- Use negative space and sparse separators instead of four boxed cards.
- Preserve the existing light theme and green accent.
- Do not use ratings, quotes, avatars, logos, fake metrics, badges, or decorative trust claims.

## Motion And Accessibility

- Reveal the content once as it enters the viewport.
- Animation communicates reading order only.
- Disable transforms under `prefers-reduced-motion`.
- Use semantic ordered-list markup.
- Load non-critical images lazily and reserve their aspect ratio to avoid layout shift.
- Body copy stays within a readable measure.

## Copy Constraints

- The section may state that OM works to maintain availability because the user confirmed this as part of the service. It must not promise uninterrupted inventory or a specific delivery time.
- No minimum order, payment term, certification, price, or geographic claim.
- No customer identity, endorsement, quote, star rating, or partner logo.
- No em dash or en dash in new visible copy.
