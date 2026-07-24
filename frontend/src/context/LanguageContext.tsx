/**
 * ====================================================================
 * PROYECTO: OM Distribution: Plataforma Web para Distribuidora de Alimentos (React + Node/Express + MySQL)
 * AUTOR: Rafael Marín
 * PORTFOLIO: https://github.com/marinm80
 * DESCRIPCIÓN: Desarrollado como proyecto práctico de nivel profesional.
 * ====================================================================
 */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import i18n from '../i18n/config';

interface LanguageContextType {
  language: string;
  toggleLanguage: (lang?: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language || 'es');

  const toggleLanguage = (lang?: string) => {
    const newLang = lang || (language === 'es' ? 'en' : 'es');
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
  };

  useEffect(() => {
    const handleLangChange = (lang: string) => {
      const normalizedLanguage = lang.split('-')[0];
      setLanguage(normalizedLanguage);
      document.documentElement.lang = normalizedLanguage;
    };

    handleLangChange(i18n.language || 'es');
    i18n.on('languageChanged', handleLangChange);
    return () => i18n.off('languageChanged', handleLangChange);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
