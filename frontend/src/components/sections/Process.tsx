import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';

const processImages = [
  '/images/process/review.webp',
  '/images/process/prepare.webp',
  '/images/process/deliver.webp',
  '/images/process/replenish.webp',
] as const;

const Process = () => {
  const { t } = useTranslation();

  return (
    <SectionWrapper id="process" className="bg-[#f5f7f2]">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-20">
        <div className="self-start lg:sticky lg:top-28">
          <h2 className="max-w-[12ch] text-4xl font-bold leading-[1.08] text-gray-950 sm:text-5xl lg:text-6xl">
            {t('process.title')}
          </h2>
          <p className="mt-6 max-w-[58ch] text-lg leading-8 text-gray-600">
            {t('process.subtitle')}
          </p>
          <div className="mt-8 h-1 w-16 rounded-full bg-primary" aria-hidden="true" />
        </div>

        <ol className="border-y border-gray-300/80">
          {processImages.map((image, index) => {
            const item = index + 1;

            return (
              <li
                key={image}
                className="grid grid-cols-[5.75rem_minmax(0,1fr)] gap-5 border-b border-gray-300/80 py-7 last:border-b-0 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-7 lg:py-8"
              >
                <img
                  src={image}
                  alt={t(`process.steps.${item}.alt`)}
                  width="1280"
                  height="853"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] h-auto w-full rounded-2xl object-cover"
                />
                <div className="min-w-0">
                  <span className="text-sm font-bold tabular-nums text-emerald-700" aria-hidden="true">
                    {String(item).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-gray-950 sm:text-2xl">
                    {t(`process.steps.${item}.title`)}
                  </h3>
                  <p className="mt-3 max-w-[60ch] text-base leading-7 text-gray-600">
                    {t(`process.steps.${item}.description`)}
                  </p>
                </div>
              </li>
            );
          })}
          <li className="border-t border-gray-300/80 py-8">
            <div className="rounded-2xl bg-gray-950 px-6 py-7 text-white sm:flex sm:items-center sm:justify-between sm:gap-8">
              <div>
                <h3 className="text-xl font-bold">{t('process.ctaTitle')}</h3>
                <p className="mt-2 max-w-xl leading-7 text-gray-300">{t('process.ctaDescription')}</p>
              </div>
              <a
                href="#contact"
                className="mt-5 inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white transition-colors hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/40 sm:mt-0"
              >
                {t('process.ctaAction')}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
          </li>
        </ol>
      </div>
    </SectionWrapper>
  );
};

export default Process;
