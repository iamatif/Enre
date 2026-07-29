import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import heroBanner from '../../assets/canopies_banner_story_desktop.webp';

interface HeroProps {
  onOpenRegisterModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegisterModal }) => {
  const { t } = useLanguage();
  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('${heroBanner}')`,
          }}
        />
      </div>

      {/* Static Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Hero Content */}
      <div className="relative z-20 h-full max-w-[1280px] mx-auto flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8">
        <span className="text-white/80 font-mono uppercase tracking-[0.3em] mb-3 sm:mb-4 bg-white/10 px-3 sm:px-4 py-1.5 backdrop-blur border border-white/20" style={{ fontSize: 'clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)' }}>
          {t('hero.label')}
        </span>

        <h1 className="text-white font-serif-headline max-w-4xl tracking-tight leading-[1.15]" style={{ fontSize: 'clamp(2.5rem, 1.25rem + 3.5vw, 4.5rem)' }}>
          {t('hero.headline')}
        </h1>

        <p className="text-white/90  mt-4 sm:mt-6 font-semibold capitalize" style={{ fontSize: 'clamp(1.25rem, 1rem + 1vw, 1.5rem)' }}>
          {t('hero.subtitle')}
        </p>

        <p className="text-white/80 mt-3 sm:mt-4 max-w-xl font-normal leading-relaxed px-2" style={{ fontSize: 'clamp(0.875rem, 0.8125rem + 0.25vw, 1rem)' }}>
          {t('hero.tagline')}
        </p>

        <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={onOpenRegisterModal}
            className="bg-[#79542e] text-white px-6 sm:px-10 py-3 sm:py-4 font-semibold hover:brightness-110 transition-all uppercase tracking-[0.2em] shadow-xl active:scale-95" style={{ fontSize: 'clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)' }}
          >
            {t('hero.register')}
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
    </section>
  );
};
