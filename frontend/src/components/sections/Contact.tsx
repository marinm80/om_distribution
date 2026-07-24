/**
 * ====================================================================
 * PROYECTO: OM Distribution: Plataforma Web para Distribuidora de Alimentos (React + Node/Express + MySQL)
 * AUTOR: Rafael Marín
 * PORTFOLIO: https://github.com/marinm80
 * DESCRIPCIÓN: Desarrollado como proyecto práctico de nivel profesional.
 * ====================================================================
 */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { submitContact } from '../../services/api';
import SectionWrapper from '../layout/SectionWrapper';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company_name: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await submitContact(formData);
      setStatus('success');
      setFormData({ full_name: '', email: '', phone: '', company_name: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <SectionWrapper id="contact" className="bg-gray-900 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            {t('contact.title')}
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            {t('contact.subtitle')}
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                <CheckCircle size={24} />
              </div>
              <p className="text-gray-300 font-medium">{t('contact.proofProducts')}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
                <CheckCircle size={24} />
              </div>
              <p className="text-gray-300 font-medium">{t('contact.proofCoverage')}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-10 text-gray-900 shadow-2xl">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
                role="status"
                aria-live="polite"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{t('contact.success')}</h3>
                <p className="text-gray-500">{t('contact.successFollowUp')}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" aria-busy={status === 'loading'}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-sm font-bold text-gray-700 ml-1">{t('contact.name')} *</label>
                    <input
                      id="contact-name"
                      required
                      type="text"
                      name="full_name"
                      autoComplete="name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder={t('contact.namePlaceholder')}
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-sm font-bold text-gray-700 ml-1">{t('contact.email')} *</label>
                    <input
                      id="contact-email"
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.emailPlaceholder')}
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="contact-phone" className="text-sm font-bold text-gray-700 ml-1">{t('contact.phone')}</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('contact.phonePlaceholder')}
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-company" className="text-sm font-bold text-gray-700 ml-1">{t('contact.company')}</label>
                    <input
                      id="contact-company"
                      type="text"
                      name="company_name"
                      autoComplete="organization"
                      value={formData.company_name}
                      onChange={handleChange}
                      placeholder={t('contact.companyPlaceholder')}
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-sm font-bold text-gray-700 ml-1">{t('contact.message')} *</label>
                  <textarea
                    id="contact-message"
                    required
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.messagePlaceholder')}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none"
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
                      <div>
                        <p className="font-bold">{t('contact.errorTitle')}</p>
                        <p className="mt-1 leading-6">
                          {t('contact.errorDescription')}{' '}
                          <a href="tel:+14137661380" className="font-bold underline underline-offset-2">
                            (413) 766-1380
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-primary-dark transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-70"
                >
                  {status === 'loading' ? t('contact.sending') : t('contact.send')}
                  <Send size={18} />
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
