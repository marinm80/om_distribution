import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// WhyChooseUs — 6 benefit cards in a responsive grid (1 col mobile, 2 col md, 3 col lg).
//
// Each card displays an inline SVG icon, a title, and a short description.
// Framer Motion stagger reveal triggers once when the section scrolls into view.

const benefits = [
  {
    title: 'On-time Deliveries',
    description: 'Real-time tracking and 99% punctuality rate.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Farm-fresh',
    description: 'Minimal time between harvest and delivery.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 17 3.5s1.5 2.5-.5 6.5c2.5-.5 4-.5 4-.5s-1 3.5-5.5 6c-1.2.7-2.5 1.2-4 1.5" />
        <path d="M11 20c0 0-3-2-3-8" />
      </svg>
    ),
  },
  {
    title: 'Competitive Price',
    description: 'Direct sourcing means better rates for you.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: 'Personal Service',
    description: 'Dedicated account managers for every client.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 17a4 4 0 0 1-8 0c0-3 2.5-6 4-7 1.5 1 4 4 4 7z" />
        <path d="M21 17a4 4 0 0 1-8 0c0-3 2.5-6 4-7 1.5 1 4 4 4 7z" />
        <path d="M12 7V2" />
        <path d="M8 5l4-3 4 3" />
      </svg>
    ),
  },
  {
    title: 'Wide Coverage',
    description: 'Full logistical network across the lower 48.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: 'USDA Compliant',
    description: 'Meeting the highest federal safety standards.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="why-us" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-light tracking-tight text-[#1f1b17]">
              The OM Advantage
            </h2>
          </motion.div>

          {/* Benefits grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                className="flex items-start gap-4"
              >
                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#006b2c]/10 text-[#006b2c]">
                  {benefit.icon}
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-base font-semibold text-[#1f1b17]">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#3e4a3d]">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
