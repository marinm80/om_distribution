/**
 * ====================================================================
 * PROYECTO: OM Distribution: Plataforma Web para Distribuidora de Alimentos (React + Node/Express + MySQL)
 * AUTOR: Rafael Marín
 * PORTFOLIO: https://github.com/marinm80
 * DESCRIPCIÓN: Desarrollado como proyecto práctico de nivel profesional.
 * ====================================================================
 */
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Package, Truck, Globe2 } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gray-950">
      {/* Background Image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/90 via-gray-900/80 to-gray-950/70 z-10" />
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1920"
          alt={t('hero.imageAlt')}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Accent gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl z-5" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl z-5" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: 'easeOut' }}
          >
            <motion.img
              src="/logo.jpg"
              alt="OM Distribution Corporation"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
              className="mb-8 w-56 sm:w-72 rounded-lg bg-white/95 p-2 shadow-2xl shadow-black/30 ring-1 ring-white/20"
            />

            {/* Badge */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse motion-reduce:animate-none" />
              <span className="text-emerald-300 text-sm font-medium tracking-wide">{t('hero.regionLabel')}</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-xl">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#products"
                className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all transform hover:scale-[1.02] shadow-lg shadow-emerald-600/25"
              >
                {t('hero.cta')}
                <ArrowRight size={20} />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 bg-white/5 backdrop-blur-md text-white font-bold rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                {t('nav.contact')}
              </a>
            </div>
          </motion.div>

          {/* Right — Feature Cards */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex flex-col gap-5"
          >
            {[
              {
                icon: <Package size={24} className="text-emerald-400" />,
                title: '130+',
                subtitle: t('hero.features.productsTitle'),
                desc: t('hero.features.productsDescription'),
              },
              {
                icon: <Truck size={24} className="text-amber-400" />,
                title: t('hero.features.deliveryTitle'),
                subtitle: t('hero.features.deliverySubtitle'),
                desc: t('hero.features.deliveryDescription'),
              },
              {
                icon: <Globe2 size={24} className="text-blue-400" />,
                title: t('hero.features.coverageTitle'),
                subtitle: t('hero.features.coverageSubtitle'),
                desc: t('hero.features.coverageDescription'),
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.5 + i * 0.15 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all group cursor-default"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 shrink-0">
                  {card.icon}
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-white">{card.title}</span>
                    <span className="text-sm text-gray-400">{card.subtitle}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={shouldReduceMotion ? undefined : { y: [0, 10, 0] }}
        transition={shouldReduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
