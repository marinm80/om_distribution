import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.products'), href: '#products' },
    { name: t('nav.testimonials'), href: '#testimonials' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex-shrink-0 flex items-center gap-2">
            <img src="/logo.jpg" alt="OM Distribution" className="h-10 w-auto rounded" />
            <span className={`text-xl font-bold hidden sm:inline ${scrolled ? 'text-primary' : 'text-white'}`}>OM Distribution</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-medium transition-colors hover:text-accent ${scrolled ? 'text-gray-700' : 'text-white'}`}
              >
                {link.name}
              </a>
            ))}
            
            <button
              onClick={() => toggleLanguage()}
              className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all ${scrolled ? 'border-gray-300 text-gray-700 hover:bg-gray-100' : 'border-white/30 text-white hover:bg-white/10'}`}
            >
              <Globe size={18} />
              <span className="uppercase font-bold">{language}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${scrolled ? 'text-gray-700' : 'text-white'}`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    toggleLanguage();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <Globe size={18} />
                  <span>{language === 'es' ? 'Switch to English' : 'Cambiar a Español'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
