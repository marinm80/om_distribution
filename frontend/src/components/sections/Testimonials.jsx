import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import { testimonials } from '../../data/testimonials';

// Testimonials — Swiper carousel of client testimonial cards.
//
// Responsive: 1 card on mobile, 2 on md, 3 on lg.
// Autoplay pauses on hover. Each card shows a star rating, quote, avatar, and name.
// Framer Motion handles the heading reveal on scroll.

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < rating ? 'text-yellow-400' : 'text-gray-200'}
          aria-hidden="true"
        >
          &#9733;
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="testimonials" className="px-6 py-24">
      <div className="mx-auto max-w-5xl" ref={sectionRef}>
        {/* Heading */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-12"
        >
          <h2 className="text-3xl font-light tracking-tight text-[#1f1b17]">
            Client Voices
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-md">
                  {/* Stars */}
                  <StarRating rating={t.rating} />

                  {/* Quote */}
                  <p className="mt-4 text-sm italic leading-relaxed text-[#3e4a3d]">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="mt-6 flex items-center gap-3">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="h-12 w-12 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#1f1b17]">
                        {t.name}
                      </p>
                      <p className="text-sm text-[#3e4a3d]">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
