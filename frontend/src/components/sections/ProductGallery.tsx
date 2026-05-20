import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { products } from '../../data/products';

// ProductGallery — horizontal Swiper carousel of product cards.
//
// The carousel is edge-to-edge (no horizontal padding) for a modern feel,
// while the heading row is padded normally. Custom pagination dots sit
// to the right of the heading on desktop.
//
// Swiper config:
//   - Responsive slidesPerView (1.15 / 2.5 / 3.5)
//   - Autoplay with pause on hover
//   - Clickable pagination dots
//   - Infinite loop

const ProductGallery = () => {
  return (
    <section id="products" className="w-full py-24">
      {/* ── Heading row — padded, with pagination dots on the right ── */}
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-10 flex items-end justify-between"
        >
          <h2 className="text-3xl font-light tracking-tight text-[#1f1b17]">
            Our Products
          </h2>

          {/* Swiper pagination dots are injected here via the container class */}
          <div className="product-gallery-pagination flex gap-1.5" />
        </motion.div>
      </div>

      {/* ── Product carousel — full-width with inner padding via slides ── */}
      <div className="mx-auto max-w-5xl px-3">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1.15}
          spaceBetween={16}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            el: '.product-gallery-pagination',
            bulletClass: 'product-dot',
            bulletActiveClass: 'product-dot-active',
          }}
          breakpoints={{
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 },
          }}
          className="pb-2"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="rounded-2xl bg-white p-4 shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                {/* Product image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full rounded-xl object-cover"
                  loading="lazy"
                />

                {/* Product name */}
                <h3 className="mt-3 text-xl font-semibold text-[#1f1b17]">
                  {product.name}
                </h3>

                {/* Short description */}
                <p className="mt-1 text-sm leading-relaxed text-[#3e4a3d]">
                  {product.description}
                </p>

                {/* Quote link */}
                <a
                  href="#contact"
                  className="mt-3 inline-block text-sm font-medium text-[#006b2c] transition-colors duration-200 hover:text-[#004d1f]"
                >
                  Request a Quote &rarr;
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ── Custom pagination dot styles ── */}
      <style>{`
        .product-dot {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: #d6cfc8;
          cursor: pointer;
          transition: background-color 0.2s ease, width 0.2s ease;
        }
        .product-dot-active {
          background-color: #006b2c;
          width: 20px;
        }
      `}</style>
    </section>
  );
};

export default ProductGallery;
