import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DownloadModal } from './DownloadModal';
import brochurePdf from '../../assets/Enre Residence by Imtiaz-Brochure.pdf';
import floorPlanPdf from '../../assets/Enre Residence by Imtiaz - Floor Plan .pdf';
import paymentPlanPdf from '../../assets/IMTIAZ_Enre Residence-Payment plan.pdf';
import logoWhiteSobha from '../../assets/logo-header/logo-white-sobha.png';

const heroImages = Object.values(
  import.meta.glob('../../assets/hero-bg/*.{jpg,jpeg,png,webp}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
) as string[];

const SLIDE_DURATION = 5000;
const FADE_DURATION = 2000;

const CALENDLY_URL = '#';

interface HeroProps {
  onOpenRegisterModal: () => void;
}

interface DownloadState {
  fileUrl: string;
  fileName: string;
  title: string;
  subtitle: string;
}

export const Hero: React.FC<HeroProps> = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [download, setDownload] = useState<DownloadState | null>(null);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, []);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Slider with Fade */}
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((img, i) => (
          <div
            key={img}
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity ease-in-out"
            style={{
              backgroundImage: `url('${img}')`,
              opacity: i === currentSlide ? 1 : 0,
              transitionDuration: `${FADE_DURATION}ms`,
            }}
          />
        ))}
      </div>

      {/* Static Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/75 via-black/60 to-black/80" />

      {/* Hero Content */}
      <div className="relative z-20 h-full max-w-[1280px] mx-auto flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8">
        <img
          src={logoWhiteSobha}
          alt="Sobha Logo"
          className="h-24 sm:h-32 md:h-44 w-auto drop-shadow-2xl -mb-2"
        />

        <h1 className="hero-heading text-white/95 mt-4 sm:mt-6 tracking-wide" style={{ fontSize: 'clamp(2rem, 1.5rem + 2vw, 3.25rem)' }}>
          A life within
        </h1>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() =>
              setDownload({
                fileUrl: brochurePdf,
                fileName: 'Sobha-Sanctuary-Brochure.pdf',
                title: t('download.brochureTitle'),
                subtitle: t('download.brochureSubtitle'),
              })
            }
            className="bg-[#79542e] text-white px-6 sm:px-10 py-3 sm:py-4 font-semibold hover:brightness-110 transition-all uppercase tracking-[0.2em] shadow-xl active:scale-95 cursor-pointer" style={{ fontSize: 'clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)' }}
          >
            {t('hero.downloadBrochure')}
          </button>
          <button
            type="button"
            onClick={() =>
              setDownload({
                fileUrl: floorPlanPdf,
                fileName: 'Sobha-Sanctuary-Floor-Plan.pdf',
                title: t('download.floorPlanTitle'),
                subtitle: t('download.floorPlanSubtitle'),
              })
            }
            className="border border-white text-white px-6 sm:px-10 py-3 sm:py-4 font-semibold hover:bg-white hover:text-black transition-all uppercase tracking-[0.2em] shadow-xl active:scale-95 cursor-pointer" style={{ fontSize: 'clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)' }}
          >
            {t('hero.downloadFloorPlan')}
          </button>
        </div>

        {/* Scroll Down Indicator */}
        <button
          onClick={scrollToAbout}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer"
        >
          <span className="text-white/70 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-semibold group-hover:text-white transition-colors">
            {t('hero.scroll')}
          </span>
          <div className="scroll-indicator" />
        </button>
      </div>

      <DownloadModal
        open={download !== null}
        onClose={() => setDownload(null)}
        title={download?.title ?? ''}
        subtitle={download?.subtitle ?? ''}
        fileUrl={download?.fileUrl ?? ''}
        fileName={download?.fileName ?? ''}
      />
    </section>
  );
};
