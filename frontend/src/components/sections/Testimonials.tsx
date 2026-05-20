import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { getTestimonials } from '../../services/api';
import SectionWrapper from '../layout/SectionWrapper';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../../types';

interface LandingTestimonial extends Testimonial {
}

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [testimonials, setTestimonials] = useState<LandingTestimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await getTestimonials(language);
        setTestimonials(response.data.data.testimonials);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      }
    };
    fetchTestimonials();
  }, [language]);

  return (
    <SectionWrapper id="testimonials">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('nav.testimonials')}</h2>
        <div className="w-20 h-1.5 bg-accent mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testi) => (
          <div key={testi.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative">
            <Quote className="absolute top-6 right-8 text-accent/10" size={48} />
            
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={testi.rating && i < testi.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                />
              ))}
            </div>

            <p className="text-gray-700 italic mb-8 leading-relaxed">
              "{testi.content}"
            </p>

            <div className="flex items-center gap-4">
              <img 
                src={testi.image_url} 
                alt={testi.author_name} 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-bold text-gray-900">{testi.author_name}</h4>
                <p className="text-xs text-gray-500 uppercase tracking-widest">{testi.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Testimonials;
