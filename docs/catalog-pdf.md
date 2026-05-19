# PDF Catalog Generation

The catalog is generated entirely client-side in the browser using [jsPDF](https://github.com/parallax/jsPDF).

## How to generate

1. Log in to the admin dashboard at `/admin`
2. Go to **Products**
3. Optionally filter by category
4. Click the **PDF** button

The file is downloaded as `OM_Catalog_YYYY-MM-DD.pdf`.

## Format

- **Orientation**: Landscape A4 (297mm × 210mm)
- **Cover page**: Logo, title, date
- **One page per product**: Header with logo + category, product name, image (150×95mm), description, footer with page number
- **Color scheme**: Dark header (`#1a1a1a`) with teal accent (`#009664`)

## Image loading

All product images are pre-fetched in parallel before building the PDF pages, which significantly reduces generation time for large catalogs (e.g. 129 products).

### URL resolution (`normalizeImageUrl`)

| `image_url` format | Resolved to |
|---|---|
| `/uploads/filename.jpg` or full URL containing `/uploads/` | `{VITE_API_URL base}/uploads/filename.jpg` |
| `https://external-cdn.com/image.jpg` | `{VITE_API_URL}/proxy/image?url=...` (proxied server-side) |

### Why `crossOrigin = 'anonymous'`

jsPDF uses `canvas.toDataURL()` to convert images to Base64. This requires CORS headers on the image response. The `/uploads` route returns `Access-Control-Allow-Origin: *` for this reason.

## Known issues / tips

- **`[Image unavailable]`**: Check the browser console for `[PDF] Image failed for...` errors with the exact URL
- **Logo not showing**: Place `logo.jpg` in `frontend/public/`
- **Slow generation on large catalogs**: Images are fetched in parallel; performance is bounded by the slowest image or server response time
