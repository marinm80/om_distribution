import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { Package, Truck, TrendingUp } from 'lucide-react';

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
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const pillars = [
    {
      icon: <Package size={28} strokeWidth={1.8} className="text-emerald-600" />,
      title: t('about.pillar1_title'),
      description: t('about.pillar1_desc'),
    },
    {
      icon: <Truck size={28} strokeWidth={1.8} className="text-emerald-600" />,
      title: t('about.pillar2_title'),
      description: t('about.pillar2_desc'),
    },
    {
      icon: <TrendingUp size={28} strokeWidth={1.8} className="text-emerald-600" />,
      title: t('about.pillar3_title'),
      description: t('about.pillar3_desc'),
    },
  ];

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
              {t('about.heading')}
            </h2>
            <div className="mt-4 h-1.5 w-20 rounded-full bg-emerald-600" />
          </motion.div>

          {/* Pillars */}
          <div className="flex flex-col gap-10 md:gap-12">
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={itemVariants}
                className="flex items-start gap-6"
              >
                {/* Icon */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                  {pillar.icon}
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-xl font-light text-text-dark">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-base leading-relaxed text-text-body">
                    {pillar.description}
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
