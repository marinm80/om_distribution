/**
 * ====================================================================
 * PROYECTO: OM Distribution: Plataforma Web para Distribuidora de Alimentos (React + Node/Express + MySQL)
 * AUTOR: Rafael Marín
 * PORTFOLIO: https://github.com/marinm80
 * DESCRIPCIÓN: Desarrollado como proyecto práctico de nivel profesional.
 * ====================================================================
 */
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { getLandingProducts } from '../../services/api';
import SectionWrapper from '../layout/SectionWrapper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { PackageSearch, RefreshCw } from 'lucide-react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Product } from '../../types';

interface LandingProduct extends Omit<Product, 'name' | 'description'> {
  name?: string;
  description?: string;
  category_name?: string;
}

const Products: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [products, setProducts] = useState<LandingProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<LandingProduct | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setHasError(false);

    try {
      const response = await getLandingProducts(language);
      setProducts(response.data.data.products);
    } catch {
      setProducts([]);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProduct(null);
    };
    if (selectedProduct) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [selectedProduct]);

  const openModal = useCallback((product: LandingProduct) => {
    setSelectedProduct(product);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  return (
    <SectionWrapper id="products" className="bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('nav.products')}</h2>
        <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
      </div>

      {loading ? (
        <div aria-busy="true" aria-live="polite">
          <p className="sr-only">{t('products.loading')}</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="h-64 animate-pulse bg-gray-200 motion-reduce:animate-none" />
                <div className="space-y-3 p-6">
                  <div className="h-3 w-20 animate-pulse rounded bg-gray-200 motion-reduce:animate-none" />
                  <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200 motion-reduce:animate-none" />
                  <div className="h-4 w-full animate-pulse rounded bg-gray-100 motion-reduce:animate-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : hasError || products.length === 0 ? (
        <div
          role={hasError ? 'alert' : 'status'}
          className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <PackageSearch size={28} aria-hidden="true" />
          </div>
          <h3 className="mt-6 text-2xl font-bold text-gray-950">
            {t(hasError ? 'products.errorTitle' : 'products.emptyTitle')}
          </h3>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-600">
            {t(hasError ? 'products.errorDescription' : 'products.emptyDescription')}
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            {hasError && (
              <button
                type="button"
                onClick={fetchProducts}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-bold text-gray-800 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-600/20"
              >
                <RefreshCw size={18} aria-hidden="true" />
                {t('products.retry')}
              </button>
            )}
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 font-bold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-600/30"
            >
              {t('products.contact')}
            </a>
          </div>
        </div>
      ) : (
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="pb-16"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="!h-auto">
            <div
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100 h-full flex flex-col"
            >
              <div
                className="h-64 overflow-hidden bg-gray-50 flex items-center justify-center"
              >
                <button
                  type="button"
                  aria-label={t('products.openDetails', { name: product.name })}
                  className="h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-emerald-600/30"
                  onClick={() => openModal(product)}
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-contain p-2 transform hover:scale-110 transition-transform duration-500"
                  />
                </button>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  {product.categories?.map(category => category.name).join(' / ') || product.category_name}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow line-clamp-3">
                  {product.description}
                </p>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); openModal(product); }}
                  className="mt-6 w-full py-3 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  {t('products.viewDetails', 'View Details')}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)' }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-dialog-title"
        >
          <div
            className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'modalFadeIn 0.3s ease-out' }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white shadow-lg transition-all"
              aria-label={t('products.closeDetails')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="md:flex">
              {/* Image */}
              <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-8 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none min-h-[300px]">
                <img
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                  className="max-w-full max-h-[400px] object-contain drop-shadow-lg"
                />
              </div>

              {/* Details */}
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <span className="inline-block text-xs font-bold text-primary uppercase tracking-wider mb-3 bg-primary/10 px-3 py-1 rounded-full w-fit">
                  {selectedProduct.categories?.map(category => category.name).join(' / ') || selectedProduct.category_name}
                </span>
                <h2 id="product-dialog-title" className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                  {selectedProduct.name}
                </h2>
                <div className="w-12 h-1 bg-primary rounded-full mb-4" />
                <p className="text-gray-600 leading-relaxed mb-6">
                  {selectedProduct.description}
                </p>
                <a
                  href="#contact"
                  onClick={closeModal}
                  className="w-full py-3.5 bg-primary text-white text-center rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 inline-block"
                >
                  {t('products.requestInformation')}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </SectionWrapper>
  );
};

export default Products;
