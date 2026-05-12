import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">OM Distribution</h3>
            <p className="text-gray-400">
              Premium quality food distribution for restaurants, hotels, and grocery stores.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#home" className="hover:text-white transition-colors">{t('nav.home')}</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">{t('nav.products')}</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">{t('nav.testimonials')}</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <span>info@omdistribution.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-1" />
                <span>123 Logistics Way, Suite 100, Miami, FL 33101</span>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div className="h-48 rounded-lg overflow-hidden bg-gray-800 grayscale">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114964.53925916665!2d-80.31185994276135!3d25.78239073306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b0a538b99415%3A0x302f81647a74426d!2sMiami%2C%20FL!5e0!3m2!1sen!2sus!4v1715440000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} OM Distribution. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
