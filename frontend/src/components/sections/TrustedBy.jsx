import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const logos = [
  { name: 'Brand A', width: 'w-24' },
  { name: 'Brand B', width: 'w-20' },
  { name: 'Brand C', width: 'w-28' },
  { name: 'Brand D', width: 'w-22' },
  { name: 'Brand E', width: 'w-24' },
  { name: 'Brand F', width: 'w-20' },
];

function LogoPlaceholder({ name, width }) {
  return (
    <div
      className={`${width} flex h-10 shrink-0 items-center justify-center rounded-lg bg-[#d6cec8] transition-opacity duration-300`}
      aria-label={name}
    >
      <span className="select-none text-[10px] font-medium tracking-wide text-[#a09488] opacity-0">
        {name}
      </span>
    </div>
  );
}

function MarqueeRow() {
  return (
    <div className="flex items-center gap-12">
      {logos.map((logo) => (
        <div
          key={logo.name}
          className="opacity-40 transition-opacity duration-300 hover:opacity-100"
        >
          <LogoPlaceholder name={logo.name} width={logo.width} />
        </div>
      ))}
    </div>
  );
}

export default function TrustedBy() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-40px' });

  return (
    <section id="trusted" className="bg-warm-bg-alt py-12">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          ref={sectionRef}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-center text-xs uppercase tracking-widest text-text-muted"
        >
          Trusted by industry leaders
        </motion.p>

        {/* Marquee container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative overflow-hidden"
        >
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-warm-bg-alt to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-warm-bg-alt to-transparent" />

          {/* Scrolling track */}
          <div className="marquee-track flex w-max items-center gap-12">
            <MarqueeRow />
            <MarqueeRow />
          </div>
        </motion.div>
      </div>

      {/* Marquee keyframes */}
      <style>{`
        .marquee-track {
          animation: marquee 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
