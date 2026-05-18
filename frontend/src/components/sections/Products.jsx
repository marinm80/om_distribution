import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { getLandingProducts } from '../../services/api';
import SectionWrapper from '../layout/SectionWrapper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Products = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getLandingProducts(language);
        setProducts(response.data.data.products);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [language]);

  if (loading) return <div className="h-96 flex items-center justify-center">Loading...</div>;

  return (
    <SectionWrapper id="products" className="bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('nav.products')}</h2>
        <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
      </div>

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
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100 h-full flex flex-col">
              <div className="h-64 overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  {product.category_name}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  {product.description}
                </p>
                <button className="mt-6 w-full py-3 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all">
                  Request Quote
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </SectionWrapper>
  );
};

export default Products;
