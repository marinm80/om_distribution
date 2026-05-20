import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

import { faqData } from '../../data/faq';
import { Accordion } from '../ui/Accordion';

// FAQ — renders the faqData items through the Accordion component.
//
// Framer Motion handles scroll reveal for the heading and accordion.
// The Accordion component manages its own expand/collapse state internally.

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function FAQ() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="faq" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-light tracking-tight text-[#1f1b17]">
              Common Questions
            </h2>
          </motion.div>

          {/* Accordion */}
          <motion.div variants={itemVariants}>
            <Accordion items={faqData} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
