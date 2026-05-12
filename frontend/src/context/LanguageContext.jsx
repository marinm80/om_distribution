import { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../i18n/config';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language || 'es');

  const toggleLanguage = (lang) => {
    const newLang = lang || (language === 'es' ? 'en' : 'es');
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
  };

  useEffect(() => {
    const handleLangChange = (lang) => setLanguage(lang);
    i18n.on('languageChanged', handleLangChange);
    return () => i18n.off('languageChanged', handleLangChange);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
