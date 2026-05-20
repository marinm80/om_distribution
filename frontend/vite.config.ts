import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// @tailwindcss/vite is the official Tailwind v4 integration for Vite.
// It replaces the old PostCSS plugin + tailwind.config.js approach:
//   - No postcss.config.js needed
//   - No tailwind.config.js needed
//   - Theme customization lives in src/index.css under the @theme block
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
