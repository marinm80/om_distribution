import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const features = [
  {
    title: 'Unmatched Quality',
    description:
      'We source only the finest produce and goods, ensuring every delivery meets strict standards.',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#16A34A"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'On-Time Delivery',
    description:
      'Precision logistics that respects your schedule. Freshness waits for no one.',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#16A34A"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Farm-Fresh',
    description:
      'Direct partnerships with local and global farmers for peak nutritional value.',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#16A34A"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 17 3.5s1.5 2.5-.5 6.5c2.5-.5 4-.5 4-.5s-1 3.5-5.5 6c-1.2.7-2.5 1.2-4 1.5" />
        <path d="M11 20c0 0-3-2-3-8" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="about" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Heading block */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-light tracking-tight text-text-dark">
              Who we are
            </h2>
            <div className="mt-4 h-1.5 w-20 rounded-full bg-brown" />
          </motion.div>

          {/* Features */}
          <div className="flex flex-col gap-10 md:gap-12">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="flex items-start gap-6"
              >
                {/* Icon */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-warm-bg-alt">
                  {feature.icon}
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-xl font-light text-text-dark">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-base leading-relaxed text-text-body">
                    {feature.description}
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
