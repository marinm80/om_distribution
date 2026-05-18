# OM Distribution — Technical Project Guide
**PERN Stack Bilingual Landing Page**
**Version**: 1.1.0 | **Author**: Antigravity Agent Team

---

## 1. Project Overview
OM Distribution is a high-performance landing page designed for a food distribution company in the United States. The project focuses on two core pillars: **Bilingual Content (EN/ES)** and **Technical Excellence** using the PERN stack.

### Key Objectives
- Showcase a premium product catalog with smooth interactions.
- Capture B2B leads through a secured contact system.
- Provide a robust administrative backend for content management.
- Ensure high performance (p95 < 300ms) and SEO optimization.

---

## 2. Technical Architecture

### 2.1 Backend (Node.js + Express)
The backend follows a strict **4-Layer Repository Pattern** to ensure separation of concerns and testability:
1. **Routes**: Definition of API endpoints and middleware application.
2. **Controllers**: Request validation and response formatting.
3. **Services**: Core business logic (e.g., Auth logic, Data transformations).
4. **Repositories**: Raw SQL execution via PostgreSQL native driver.

### 2.2 Frontend (React 19 + Vite 7)
- **Styling**: Tailwind CSS v4 with a custom-defined design system in `index.css`.
- **State Management**: React Context API for language and session state.
- **Internationalization**: `i18next` with a custom `LanguageProvider` for real-time switching between English and Spanish.
- **Animations**: `Framer Motion` for reveal effects and `Swiper.js` for touch-optimized carousels.

---

## 3. Data Model (PostgreSQL)

The database `om_markets` uses a bilingual schema strategy where localized fields coexist in the same table.

| Table | Description | Key Fields |
|-------|-------------|------------|
| `users` | Admin accounts | `email`, `password` (bcrypt), `role` |
| `refresh_tokens` | Security rotation | `token`, `user_id`, `expires_at` |
| `categories` | Product groups | `name_en`, `name_es` |
| `products` | Item catalog | `name_en`, `name_es`, `description_en`, `description_es`, `image_url`, `is_active`, `show_on_landing` |
| `testimonials` | Social proof | `author_name`, `content_en`, `content_es`, `rating` |
| `contacts` | B2B Leads | `full_name`, `email`, `message`, `company_name` |

---

## 4. Admin Dashboard Guide

### 4.1 Product Management
- **Add Product**: Click the "Add Product" button. You must provide names in both English and Spanish.
- **Images**: You have two options:
  1. **URL**: Paste a link to an image hosted online.
  2. **Subir Archivo**: Select a file from your computer. It will be uploaded to `/uploads/` and saved automatically.
- **Visibility**: 
  - `Active`: If off, the product is hidden everywhere.
  - `Show on Landing`: If on, the product appears in the home page carousel.

### 4.2 Catalog Generation (PDF)
- **Format**: The "Download Catalog" button generates a professional PDF in **Landscape (Horizontal)** orientation with **one product per page**.
- **Layout**: Each page features the product name at the top (centered), followed by the image (centered), and finally the description.
- **Filtering**: If you filter by category in the dashboard, the PDF will only include products from that category.

### 4.3 Mass Import (Excel)
- **Template**: Download the XLSX template to see the required format.
- **Columns**: Ensure you match the columns exactly (`name_en`, `name_es`, `description_en`, `description_es`, `image_url`, `category_id`).
- **Import**: Drag and drop the filled Excel file into the import area.

---

## 5. Development & Deployment

### Commands
- **Dev Backend**: `cd backend && npm run dev` (Port 5000)
- **Dev Frontend**: `cd frontend && npm run dev` (Port 5173)
- **Build**: `npm run build`

### Troubleshooting "Product Creation"
If a product fails to create, the system will now show a detailed **Database Error** message. Common issues include:
- Missing mandatory fields (Name EN/ES).
- Invalid Category ID.
- Image file too large (>5MB).

---

## 6. Conclusion
This project demonstrates a production-ready implementation of a modern landing page, combining the robustness of a structured PERN backend with the fluidity of a high-end React frontend.

---
*© 2026 OM Distribution. Internal Documentation.*
