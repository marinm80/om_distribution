/**
 * ====================================================================
 * PROYECTO: OM Distribution: Plataforma Web para Distribuidora de Alimentos (React + Node/Express + MySQL)
 * AUTOR: Rafael Marín
 * PORTFOLIO: https://github.com/marinm80
 * DESCRIPCIÓN: Desarrollado como proyecto práctico de nivel profesional.
 * ====================================================================
 */
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { PORTFOLIO_URL } from '../../config/branding';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="OM Distribution" className="h-12 w-auto rounded" />
              <h3 className="text-2xl font-bold text-white">OM Distribution</h3>
            </div>
            <p className="text-gray-400">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#home" className="hover:text-white transition-colors">{t('nav.home')}</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">{t('nav.products')}</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">{t('nav.process')}</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('nav.contact')}</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3 text-white">
                <span className="font-medium">Contact: Marcos Gomez</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-emerald-500" />
                <a href="tel:+14137661380" className="hover:text-white transition-colors">(413) 766-1380</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-emerald-500" />
                <a href="mailto:marinm80@hotmail.com" className="hover:text-white transition-colors">marinm80@hotmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-emerald-500 mt-1" />
                <span>Springfield, Massachusetts, USA</span>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div className="h-48 rounded-lg overflow-hidden bg-gray-800 grayscale">
            <iframe
              title="Google Maps"
              src="https://maps.google.com/maps?q=Springfield,%20Massachusetts,%20USA&t=&z=11&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} OM Distribution. {t('footer.rights')}</p>
          <p className="mt-1 text-gray-600">{t('footer.founder')}</p>
          <p className="mt-3 text-gray-400">
            {t('branding.footerCredit')}{' '}
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              {t('branding.viewPortfolio')} ↗
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
