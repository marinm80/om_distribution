import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// Stats — 2x2 grid (4-col on md+) of animated counters on a warm peach background.
//
// Each stat number animates from 0 to its target value when the section scrolls
// into view, using framer-motion's useInView hook to trigger the count-up.
// The section has rounded-t-[48px] top corners to create a soft visual transition
// from the section above.

// ── Stat data ──
// Each entry defines the numeric target, optional prefix/suffix, display color,
// and a human-readable label shown beneath the number.
const STATS = [
  { value: 500, prefix: '+',  suffix: '',  color: '#006b2c', label: 'Clients Served' },
  { value: 10,  prefix: '+',  suffix: '',  color: '#9d4300', label: 'Years Experience' },
  { value: 1000, prefix: '+', suffix: '',  color: '#006b2c', label: 'Daily Deliveries' },
  { value: 50,  prefix: '',   suffix: '+', color: '#9d4300', label: 'Categories' },
];

// ── CountUp — animates a number from 0 → target ──
// Starts only when `start` is true (i.e., section is in view).
// Uses requestAnimationFrame for smooth 60fps animation over `duration` ms.
const CountUp = ({ target, prefix, suffix, start, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Do nothing until the section scrolls into view
    if (!start) return;

    let startTimestamp = null;
    let rafId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a decelerating feel
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafId);
  }, [start, target, duration]);

  // Format large numbers with comma separators (e.g. 1,000)
  const formatted = count.toLocaleString('en-US');

  return (
    <span>
      {prefix}{formatted}{suffix}
    </span>
  );
};

// ── Animation variants ──
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const Stats = () => {
  const sectionRef = useRef(null);

  // Trigger count-up when at least 30% of the section is visible.
  // `once: true` ensures the animation only fires on the first scroll-in.
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="rounded-t-[48px] bg-[#fcf2eb] px-6 py-16"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4"
      >
        {STATS.map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="flex flex-col items-center text-center"
          >
            {/* Animated number */}
            <span
              className="text-3xl font-light tracking-tight"
              style={{ color: stat.color }}
            >
              <CountUp
                target={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                start={isInView}
              />
            </span>

            {/* Label */}
            <span className="mt-1 text-sm text-[#3e4a3d]">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Stats;
