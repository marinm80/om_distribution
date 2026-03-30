import { motion } from 'framer-motion';

// Hero — full-width opening section with a large image card, headline overlay,
// subtitle text, and two stacked CTA buttons (side-by-side on md+).
//
// The image card uses rounded-[48px] corners with a dark gradient overlay.
// A yellow "EST. 2014" badge and white heading sit on the bottom-left of the image.
// Below the card: a subtitle paragraph and two pill-shaped action buttons.
//
// Framer Motion handles a simple fade-in + slide-up animation on mount.

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const Hero = () => {
  return (
    <section id="hero" className="w-full px-6 pt-8 pb-12 md:pt-12 md:pb-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-5xl"
      >
        {/* ── Image Card with overlay ── */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-[48px] shadow-2xl"
        >
          {/* Hero image — fresh produce from Unsplash */}
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop"
            alt="Fresh produce assortment including colorful fruits and vegetables"
            className="h-[360px] w-full object-cover md:h-[480px]"
            loading="eager"
          />

          {/* Dark gradient overlay — transparent top → black/60 bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />

          {/* Overlay content — badge + heading pinned to bottom-left */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 md:p-10">
            {/* Yellow pill badge */}
            <span className="w-fit rounded-full bg-[#ffe083] px-3 py-1 text-xs font-semibold text-[#231b00]">
              EST. 2014
            </span>

            {/* Main heading */}
            <h1 className="max-w-lg text-4xl font-light tracking-tight text-white md:text-5xl">
              Quality Food Distribution You Can Trust
            </h1>
          </div>
        </motion.div>

        {/* ── Subtitle ── */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-lg leading-relaxed text-[#3e4a3d] md:mt-8 md:text-xl"
        >
          Delivering freshness and reliability across the US with a focus on
          premium sourcing and logistics excellence.
        </motion.p>

        {/* ── CTA Buttons — stacked on mobile, side-by-side on md+ ── */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-col gap-3 md:mt-8 md:flex-row md:gap-4"
        >
          {/* Primary CTA — gradient green */}
          <a
            href="#contact"
            className="block w-full rounded-full bg-gradient-to-r from-[#006b2c] to-[#00873a] py-4 text-center text-base font-semibold text-white shadow-md transition-shadow duration-300 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#006b2c] focus-visible:ring-offset-2 md:w-auto md:flex-1"
          >
            Get a Quote
          </a>

          {/* Secondary CTA — warm neutral */}
          <a
            href="#products"
            className="block w-full rounded-full bg-[#eae1da] py-4 text-center text-base font-semibold text-[#1f1b17] transition-colors duration-300 hover:bg-[#ddd3cb] focus-visible:ring-2 focus-visible:ring-[#1f1b17] focus-visible:ring-offset-2 md:w-auto md:flex-1"
          >
            View Products
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
