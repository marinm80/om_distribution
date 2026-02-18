import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

// Accordion — expandable FAQ list using Framer Motion for smooth animations.
//
// Only one item can be open at a time (controlled by openId). Clicking an open
// item closes it; clicking a closed item opens it and closes the previous one.
//
// AnimatePresence keeps the exiting panel in the DOM long enough for the exit
// animation (height: auto → 0) to complete before unmounting. Without it, the
// panel disappears instantly on close.
//
// The height: 0 → 'auto' animation requires Framer Motion's layout animation.
// Do not use max-height CSS transitions here — they produce a visible delay before
// the animation starts when the max-height is much larger than the content.
//
// aria-expanded on the button communicates state to screen readers.
// Keyboard navigation (Tab + Enter/Space) works via native <button> semantics.
//
// Used in: FAQ section (src/data/faq.js provides the items array)
// Framer Motion v12: import { motion, AnimatePresence } from 'framer-motion'

export const Accordion = ({ items }) => {
  const [openId, setOpenId] = useState(null);

  const toggleItem = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
            aria-expanded={openId === item.id}
          >
            <span className="font-semibold text-text-primary pr-4">
              {item.question}
            </span>
            {/* +/− icon signals expand/collapse state visually */}
            <span className="text-2xl text-primary flex-shrink-0">
              {openId === item.id ? '−' : '+'}
            </span>
          </button>

          <AnimatePresence>
            {openId === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className="px-6 pb-4 text-text-secondary">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,
};
