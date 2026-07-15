/**
 * ====================================================================
 * PROYECTO: OM Distribution: Plataforma Web para Distribuidora de Alimentos (React + Node/Express + MySQL)
 * AUTOR: Rafael Marín
 * PORTFOLIO: https://github.com/marinm80
 * DESCRIPCIÓN: Desarrollado como proyecto práctico de nivel profesional.
 * ====================================================================
 */
import { motion, Variants } from 'framer-motion';
import { categories } from '../../data/products';

// Categories — a grid showcase of product categories with an offset layout
// on mobile (2 cols, right column shifted down) and a flat 4-column grid on
// desktop. Each card displays a category image and name.
//
// Framer Motion handles scroll-triggered fade-in with staggered children.

// Animation variants — container orchestrates staggered reveal
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const Categories = () => {
  return (
    <section id="categories" className="w-full px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* ── Section heading ── */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-10 text-3xl font-light tracking-tight text-[#1f1b17]"
        >
          Explore Categories
        </motion.h2>

        {/* ── Category grid ──
            Mobile: 2 columns with offset (right column pushed down via mt-8)
            Desktop (md+): flat 4-column grid, no offset */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
        >
          {categories.map((category, index) => {
            // On mobile, odd-indexed cards (right column) get a top offset
            const isRightColumn = index % 2 !== 0;

            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                className={`rounded-2xl bg-white p-4 shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg ${
                  isRightColumn ? 'mt-8 md:mt-0' : ''
                }`}
              >
                {/* Category image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-32 w-full rounded-xl object-cover"
                  loading="lazy"
                />

                {/* Category name */}
                <h3 className="mt-3 text-xl font-semibold text-[#1f1b17]">
                  {category.name}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
