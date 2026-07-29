import React, { useState, useRef, useCallback, useEffect } from "react";
import { Hero } from "../components/Hero";
import { useLanguage } from "../context/LanguageContext";
import { sendLeadEmail } from "../services/emailjs";
import {
  ArrowRight,
  Phone,
  Mail,
  ChevronRight,
  CheckCircle2,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import keyHighlightsBg from "../../assets/key0highlights.webp";
import icon1 from "../../assets/canopies_highlights_icon_1.webp";
import icon2 from "../../assets/canopies_highlights_icon_2.webp";
import icon3 from "../../assets/canopies_highlights_icon_3.webp";
import icon4 from "../../assets/canopies_highlights_icon_4.webp";
import icon5 from "../../assets/canopies_highlights_icon_5.webp";
import icon6 from "../../assets/canopies_highlights_icon_6.webp";
import icon7 from "../../assets/canopies_highlights_icon_7.webp";
import icon8 from "../../assets/canopies_highlights_icon_8.webp";
import gallery1 from "../../assets/gallery/canopies_gallery_slide_1.webp";
import gallery2 from "../../assets/gallery/canopies_gallery_slide_2.webp";
import gallery3 from "../../assets/gallery/canopies_gallery_slide_3.webp";
import gallery4 from "../../assets/gallery/canopies_gallery_slide_4.webp";
import gallery5 from "../../assets/gallery/canopies_gallery_slide_5.webp";
import gallery6 from "../../assets/gallery/canopies_gallery_slide_6.webp";
import gallery7 from "../../assets/gallery/canopies_gallery_slide_7.webp";
import gallery8 from "../../assets/gallery/canopies_gallery_slide_8.webp";
import gallery9 from "../../assets/gallery/canopies_gallery_slide_9.webp";

interface HomePageProps {
  onOpenRegisterModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenRegisterModal,
}) => {
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<
    string | null
  >(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [highlightSlide, setHighlightSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [phoneValue, setPhoneValue] = useState<string | undefined>(undefined);
  const { t, lang } = useLanguage();

  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const sliderSlides = [
    {
      taglineKey: 'home.slideTagline1',
      headingKey: 'home.slideHeading1',
      descKey: 'home.slideDesc1',
    },
    {
      taglineKey: 'home.slideTagline2',
      headingKey: 'home.slideHeading2',
      descKey: 'home.slideDesc2',
      placesKey: 'home.slidePlaces2',
    },
    {
      taglineKey: 'home.slideTagline3',
      headingKey: 'home.slideHeading3',
      descKey: 'home.slideDesc3',
    },
  ];

  const highlights = [
    { icon: icon1, alt: t('home.highlight1'), key: 'home.highlight1', wide: true },
    { icon: icon2, alt: t('home.highlight2'), key: 'home.highlight2', wide: false },
    { icon: icon3, alt: t('home.highlight3'), key: 'home.highlight3', wide: false },
    { icon: icon4, alt: t('home.highlight4'), key: 'home.highlight4', wide: false },
    { icon: icon5, alt: t('home.highlight5'), key: 'home.highlight5', wide: false },
    { icon: icon6, alt: t('home.highlight6'), key: 'home.highlight6', wide: false },
    { icon: icon7, alt: t('home.highlight7'), key: 'home.highlight7', wide: false },
    { icon: icon8, alt: t('home.highlight8'), key: 'home.highlight8', wide: false },
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDragging: false, startX: 0, currentX: 0, moved: false });

  const getMaxSlide = useCallback(() =>
    window.innerWidth < 768 ? highlights.length - 1 : Math.ceil(highlights.length / 2) - 1,
  []);

  const handleDragStart = useCallback((clientX: number) => {
    dragState.current = { isDragging: true, startX: clientX, currentX: clientX, moved: false };
  }, []);

  const handleDragMove = useCallback((clientX: number) => {
    if (!dragState.current.isDragging) return;
    dragState.current.currentX = clientX;
    const diff = clientX - dragState.current.startX;
    if (Math.abs(diff) > 5) dragState.current.moved = true;
    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
      trackRef.current.style.transform = `translateX(calc(-100% * var(--hl-slide) + ${diff}px))`;
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!dragState.current.isDragging) return;
    const { startX, currentX, moved } = dragState.current;
    dragState.current.isDragging = false;
    const diff = currentX - startX;
    if (moved && Math.abs(diff) > 50) {
      const direction = diff > 0 ? -1 : 1;
      setHighlightSlide(prev => {
        const max = getMaxSlide();
        const next = prev + direction;
        if (next < 0) return max;
        if (next > max) return 0;
        return next;
      });
    }
    if (trackRef.current) {
      trackRef.current.style.transition = '';
      trackRef.current.style.transform = '';
    }
  }, [getMaxSlide]);

  const trackRef2 = useRef<HTMLDivElement>(null);
  const dragState2 = useRef({ isDragging: false, startX: 0, currentX: 0, moved: false });

  const handleDragStart2 = useCallback((clientX: number) => {
    dragState2.current = { isDragging: true, startX: clientX, currentX: clientX, moved: false };
  }, []);

  const handleDragMove2 = useCallback((clientX: number) => {
    if (!dragState2.current.isDragging) return;
    dragState2.current.currentX = clientX;
    const diff = clientX - dragState2.current.startX;
    if (Math.abs(diff) > 5) dragState2.current.moved = true;
    if (trackRef2.current) {
      trackRef2.current.style.transition = 'none';
      trackRef2.current.style.transform = `translateX(calc(-100% * var(--slide) + ${diff}px))`;
    }
  }, []);

  const handleDragEnd2 = useCallback(() => {
    if (!dragState2.current.isDragging) return;
    const { startX, currentX, moved } = dragState2.current;
    dragState2.current.isDragging = false;
    const diff = currentX - startX;
    if (moved && Math.abs(diff) > 50) {
      const direction = diff > 0 ? -1 : 1;
      setCurrentSlide(prev => {
        const max = sliderSlides.length - 1;
        const next = prev + direction;
        if (next < 0) return max;
        if (next > max) return 0;
        return next;
      });
    }
    if (trackRef2.current) {
      trackRef2.current.style.transition = '';
      trackRef2.current.style.transform = '';
    }
  }, []);

  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryAnimRef = useRef<number>(0);
  const galleryOffsetRef = useRef(0);
  const galleryPausedRef = useRef(false);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    const speed = 1.2;
    let lastTime = performance.now();

    const animate = (now: number) => {
      if (!galleryPausedRef.current) {
        galleryOffsetRef.current += speed * (now - lastTime) / 16;
        const first = el.children[0] as HTMLElement | undefined;
        const mid = el.children[9] as HTMLElement | undefined;
        const copyWidth = first && mid ? mid.offsetLeft - first.offsetLeft : el.scrollWidth / 2;
        if (galleryOffsetRef.current >= copyWidth) {
          galleryOffsetRef.current = 0;
        }
        el.style.transform = `translate3d(${-galleryOffsetRef.current}px, 0, 0)`;
      }
      lastTime = now;
      galleryAnimRef.current = requestAnimationFrame(animate);
    };

    galleryAnimRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(galleryAnimRef.current);
  }, []);

  return (
    <div className="min-h-screen">
      <Hero onOpenRegisterModal={onOpenRegisterModal} />

      {/* About Us / Philosophy Section */}
      <section id="about" className="py-24 md:py-36 px-6 md:px-16 bg-[#f5f3f3]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span
            className="font-semibold text-[#79542e] uppercase tracking-[0.25em] block mb-2"
            style={{
              fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)",
            }}
          >
            {t('home.philosophyLabel')}
          </span>
          <h2
            className="font-serif-headline text-[#79542e]"
            style={{ fontSize: "clamp(1.75rem, 1.25rem + 2vw, 2.25rem)" }}
          >
            {t('home.philosophyTitle')}
          </h2>
          <div
            className="space-y-6 text-[#5f5e5e] font-normal leading-relaxed"
            style={{ fontSize: "clamp(1rem, 0.875rem + 0.5vw, 1.125rem)" }}
          >
            <p dangerouslySetInnerHTML={{ __html: t('home.philosophyDesc1') }} />
            <p dangerouslySetInnerHTML={{ __html: t('home.philosophyDesc2') }} />
          </div>
          <div className="pt-8">
            <button
              onClick={onOpenRegisterModal}
              className="inline-block border border-[#1b1c1c] px-10 py-4 font-semibold text-[#1b1c1c] hover:bg-[#1b1c1c] hover:text-white transition-all uppercase tracking-[0.2em]"
              style={{
                fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)",
              }}
            >
              {t('home.contactRegister')}
            </button>
          </div>
        </div>
      </section>

      {/* Exclusivity Defined (6 Points) */}
      <section className="py-24 bg-white px-6 md:px-16 border-y border-[#e4e2e2]">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-16 text-center">
            <span
              className="font-semibold text-[#79542e] uppercase tracking-[0.25em] block mb-2"
              style={{
                fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)",
              }}
            >
              {t('home.exclusivityTitle')}
            </span>
            <h2
              className="font-serif-headline text-[#1b1c1c]"
              style={{ fontSize: "clamp(1.75rem, 1.25rem + 2vw, 2.25rem)" }}
            >
              {t('home.propertyDetailsTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-12">
            <div className="space-y-3 text-center">
              <h3
                className="font-serif-headline text-[#1b1c1c]"
                style={{
                  fontSize: "clamp(1.125rem, 0.9375rem + 0.75vw, 1.25rem)",
                }}
              >
                {t('home.estimatedHandover')}
              </h3>
              <span
                className="font-serif-headline text-[#79542e] font-bold block"
                style={{ fontSize: "clamp(1.25rem, 1.125rem + 0.5vw, 1.5rem)" }}
              >
                {t('home.estimatedHandoverValue')}
              </span>
            </div>

            <div className="space-y-3 text-center">
              <h3
                className="font-serif-headline text-[#1b1c1c]"
                style={{
                  fontSize: "clamp(1.125rem, 0.9375rem + 0.75vw, 1.25rem)",
                }}
              >
                {t('home.pricesStartFrom')}
              </h3>
              <span
                className="font-serif-headline text-[#79542e] font-bold block"
                style={{ fontSize: "clamp(1.25rem, 1.125rem + 0.5vw, 1.5rem)" }}
              >
                {t('home.pricesStartFromValue')}
              </span>
            </div>

            <div className="space-y-3 text-center">
              <h3
                className="font-serif-headline text-[#1b1c1c]"
                style={{
                  fontSize: "clamp(1.125rem, 0.9375rem + 0.75vw, 1.25rem)",
                }}
              >
                {t('home.averageSize')}
              </h3>
              <span
                className="font-serif-headline text-[#79542e] font-bold block"
                style={{ fontSize: "clamp(1.25rem, 1.125rem + 0.5vw, 1.5rem)" }}
              >
                {t('home.averageSizeValue')}
              </span>
            </div>

            <div className="space-y-3 text-center">
              <h3
                className="font-serif-headline text-[#1b1c1c]"
                style={{
                  fontSize: "clamp(1.125rem, 0.9375rem + 0.75vw, 1.25rem)",
                }}
              >
                {t('home.totalUnits')}
              </h3>
              <span
                className="font-serif-headline text-[#79542e] font-bold block"
                style={{ fontSize: "clamp(1.25rem, 1.125rem + 0.5vw, 1.5rem)" }}
              >
                {t('home.totalUnitsValue')}
              </span>
            </div>

            <div className="space-y-3 text-center">
              <h3
                className="font-serif-headline text-[#1b1c1c]"
                style={{
                  fontSize: "clamp(1.125rem, 0.9375rem + 0.75vw, 1.25rem)",
                }}
              >
                {t('home.typeOfUnits')}
              </h3>
              <span
                className="font-serif-headline text-[#79542e] font-bold block"
                style={{ fontSize: "clamp(1.25rem, 1.125rem + 0.5vw, 1.5rem)" }}
                dangerouslySetInnerHTML={{ __html: t('home.typeOfUnitsValue') }}
              />
            </div>

            <div className="space-y-3 text-center">
              <h3
                className="font-serif-headline text-[#1b1c1c]"
                style={{
                  fontSize: "clamp(1.125rem, 0.9375rem + 0.75vw, 1.25rem)",
                }}
              >
                {t('home.paymentPlan')}
              </h3>
              <span
                className="font-serif-headline text-[#79542e] font-bold block"
                style={{ fontSize: "clamp(1.25rem, 1.125rem + 0.5vw, 1.5rem)" }}
                dangerouslySetInnerHTML={{ __html: t('home.paymentPlanValue') }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights Section */}
      <section className="relative py-28 overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={keyHighlightsBg}
            alt={t('home.highlightsTitle')}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/50" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <span
              className="font-semibold text-white/70 uppercase tracking-[0.25em] block mb-2"
              style={{
                fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)",
              }}
            >
              {t('home.collectionLabel')}
            </span>
            <h2
              className="font-serif-headline text-white"
              style={{ fontSize: "clamp(1.75rem, 1.25rem + 2vw, 2.25rem)" }}
            >
              {t('home.highlightsTitle')}
            </h2>
            <div className="w-20 h-0.5 bg-[#a67c52] mx-auto mt-6" />
          </div>

          {/* Desktop grid */}
          <div className="hidden lg:grid grid-cols-4 gap-x-6 gap-y-12 text-center">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className={`${item.wide ? 'w-34' : 'w-14'} h-14 mb-4 overflow-hidden`}>
                  <img src={item.icon} alt={item.alt} className="w-full h-full object-contain" />
                </div>
                <p
                  className="text-white"
                  style={{ fontSize: "clamp(0.875rem, 0.75rem + 0.5vw, 1rem)" }}
                  dangerouslySetInnerHTML={{ __html: t(item.key) }}
                />
              </div>
            ))}
          </div>

          {/* Mobile/Tablet slider */}
              <div className="lg:hidden select-none">
            <div className="relative overflow-hidden" dir="ltr">
              <div
                ref={trackRef}
                className="flex highlights-track cursor-grab active:cursor-grabbing"
                style={{ '--hl-slide': highlightSlide } as React.CSSProperties}
                onMouseDown={(e) => handleDragStart(e.clientX)}
                onMouseMove={(e) => handleDragMove(e.clientX)}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
                onTouchEnd={handleDragEnd}
              >
                {highlights.map((item, idx) => (
                  <div key={idx} className="w-full md:w-1/2 flex-shrink-0 px-6 md:px-8">
                    <div className="flex flex-col items-center">
                      <div className={`${item.wide ? 'w-34' : 'w-14'} h-14 mb-4 overflow-hidden`}>
                        <img src={item.icon} alt={item.alt} className="w-full h-full object-contain" />
                      </div>
                      <p
                        className="text-white text-center"
                        style={{ fontSize: "clamp(0.875rem, 0.75rem + 0.5vw, 1rem)" }}
                        dangerouslySetInnerHTML={{ __html: t(item.key) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation arrows - tablet+ only */}
            <div className="hidden md:flex items-center justify-center gap-4 mt-10">
              <button
                onClick={() => setHighlightSlide(prev => {
                  const max = window.innerWidth < 768 ? highlights.length - 1 : Math.ceil(highlights.length / 2) - 1;
                  return prev === 0 ? max : prev - 1;
                })}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/25 transition-all"
                aria-label="Previous highlights"
              >
                &#8592;
              </button>
              <button
                onClick={() => setHighlightSlide(prev => {
                  const max = window.innerWidth < 768 ? highlights.length - 1 : Math.ceil(highlights.length / 2) - 1;
                  return prev >= max ? 0 : prev + 1;
                })}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/25 transition-all"
                aria-label="Next highlights"
              >
                &#8594;
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {/* Mobile dots */}
              <div className="flex md:hidden gap-2">
                {highlights.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setHighlightSlide(idx)}
                    className="p-2 rounded-full transition-all"
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    <span className={`block w-2 h-2 rounded-full transition-all ${
                      highlightSlide === idx ? "bg-white w-4" : "bg-white/30"
                    }`} />
                  </button>
                ))}
              </div>
              {/* Tablet dots */}
              <div className="hidden md:flex gap-2">
                {Array.from({ length: Math.ceil(highlights.length / 2) }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setHighlightSlide(idx * 2)}
                    className="p-2 rounded-full transition-all"
                    aria-label={`Go to slide group ${idx + 1}`}
                  >
                    <span className={`block w-2 h-2 rounded-full transition-all ${
                      Math.floor(highlightSlide / 2) === idx ? "bg-white w-4" : "bg-white/30"
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slider Section */}
      <section className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <span
              className="font-semibold text-[#79542e] uppercase tracking-[0.25em] block mb-2"
              style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
            >
              {t('home.discoverLabel')}
            </span>
            <h2
              className="font-serif-headline text-[#1b1c1c]"
              style={{ fontSize: "clamp(1.75rem, 1.25rem + 2vw, 2.25rem)" }}
            >
              {t('home.discoverSectionTitle')}
            </h2>
            <p
              className="text-[#5f5e5e] max-w-2xl mx-auto leading-relaxed"
              style={{ fontSize: "clamp(0.8125rem, 0.75rem + 0.2vw, 0.875rem)" }}
            >
              {t('home.sliderDesc')}
            </p>
          </div>

          <div className="relative flex items-center gap-6">
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? sliderSlides.length - 1 : prev - 1))}
              className="hidden md:flex w-12 h-12 rounded-full bg-[#e9e8e7] items-center justify-center text-[#79542e] hover:bg-[#79542e] hover:text-white transition-all flex-shrink-0"
              aria-label="Previous slide"
            >
              &#8592;
            </button>

            <div className="flex-1 overflow-hidden select-none" dir="ltr">
              <div
                ref={trackRef2}
                className="slider-track flex cursor-grab active:cursor-grabbing"
                style={{ '--slide': currentSlide } as React.CSSProperties}
                onMouseDown={(e) => handleDragStart2(e.clientX)}
                onMouseMove={(e) => handleDragMove2(e.clientX)}
                onMouseUp={handleDragEnd2}
                onMouseLeave={handleDragEnd2}
                onTouchStart={(e) => handleDragStart2(e.touches[0].clientX)}
                onTouchMove={(e) => handleDragMove2(e.touches[0].clientX)}
                onTouchEnd={handleDragEnd2}
              >
                {sliderSlides.map((slide, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 px-2">
                    <div className="bg-[#f5f3f3] px-6 py-10 md:px-10 md:py-14 border border-[#d4c4b7]/50 flex flex-col justify-center items-center text-center h-[400px]">
                      {slide.taglineKey && (
                        <span
                          className="font-semibold text-[#79542e] tracking-[0.25em] block mb-3"
                          style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
                        >
                          {t(slide.taglineKey)}
                        </span>
                      )}
                      <h3 className="text-[#1b1c1c] mb-6 leading-tight font-semibold font-body text-lg md:text-xl lg:text-2xl">
                        {t(slide.headingKey)}
                      </h3>
                      <p
                        className="text-[#5f5e5e] leading-relaxed mb-6 max-w-lg"
                        style={{ fontSize: "clamp(0.8125rem, 0.75rem + 0.2vw, 0.875rem)" }}
                      >
                        {t(slide.descKey)}
                      </p>
                      {slide.placesKey && (
                        <p
                          className="text-[#79542e] font-semibold leading-relaxed max-w-lg"
                          style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
                        >
                          {t(slide.placesKey)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setCurrentSlide((prev) => (prev >= sliderSlides.length - 1 ? 0 : prev + 1))}
              className="hidden md:flex w-12 h-12 rounded-full bg-[#e9e8e7] items-center justify-center text-[#79542e] hover:bg-[#79542e] hover:text-white transition-all flex-shrink-0"
              aria-label="Next slide"
            >
              &#8594;
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {sliderSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className="p-2 rounded-full transition-colors"
                aria-label={`Go to slide ${idx + 1}`}
              >
                <span className={`block w-2.5 h-2.5 rounded-full transition-colors ${
                  currentSlide === idx ? "bg-[#79542e]" : "bg-[#d4c4b7]"
                }`} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-[#1b1c1c] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 mb-12">
          <span
            className="font-semibold text-[#c49a6e] uppercase tracking-[0.25em] block mb-2"
            style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
          >
            {t('home.galleryLabel')}
          </span>
          <h2
            className="font-serif-headline text-white"
            style={{ fontSize: "clamp(1.75rem, 1.25rem + 2vw, 2.25rem)" }}
          >
            {t('home.galleryTitle')}
          </h2>
          <div className="w-16 h-1 bg-[#a67c52] mt-4" />
        </div>

        {/* Marquee slider */}
        <div className="relative w-full overflow-hidden" dir="ltr">
          <div
            ref={galleryRef}
            className="flex gap-4"
            style={{ width: 'max-content' }}
            onMouseEnter={() => { galleryPausedRef.current = true; }}
            onMouseLeave={() => { galleryPausedRef.current = false; }}
          >
            {[gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9, gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9].map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedGalleryImage(img)}
                className="w-[320px] md:w-[400px] aspect-[1365/1700] flex-shrink-0 cursor-pointer overflow-hidden group border border-white/10"
              >
                <img
                  src={img}
                  alt={`${t('home.galleryTitle')} ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Amenities Section */}
      <section className="py-24 px-6 md:px-16 bg-[#f5f3f3]">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-16 text-center">
            <span
              className="font-semibold text-[#79542e] uppercase tracking-[0.25em] block mb-2"
              style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
            >
              {t('home.amenitiesLabel')}
            </span>
            <h2
              className="font-serif-headline text-[#1b1c1c]"
              style={{ fontSize: "clamp(1.75rem, 1.25rem + 2vw, 2.25rem)" }}
            >
              {t('home.amenitiesSectionTitle')}
            </h2>
            <p
              className="text-[#5f5e5e] mt-4 max-w-2xl mx-auto leading-relaxed"
              style={{ fontSize: "clamp(0.8125rem, 0.75rem + 0.2vw, 0.875rem)" }}
            >
              {t('home.amenitiesSectionDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, idx) => { const nameKey = `home.amenity${n}Name`; const descKey = `home.amenity${n}Desc`; return (
              <div
                key={idx}
                className="border-b border-[#d4c4b7]/50"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="font-serif-headline text-[#79542e] font-bold"
                      style={{ fontSize: "clamp(1rem, 0.875rem + 0.5vw, 1.125rem)" }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className="font-serif-headline text-[#1b1c1c] group-hover:text-[#79542e] transition-colors"
                      style={{ fontSize: "clamp(1.125rem, 0.9375rem + 0.75vw, 1.25rem)" }}
                    >
                      {t(nameKey)}
                    </h3>
                  </div>
                  <span
                    className={`text-[#79542e] text-2xl font-light transition-transform duration-300 ${
                      openFaq === idx ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === idx ? "max-h-40 pb-5" : "max-h-0"
                  }`}
                >
                  <p
                    className="text-[#5f5e5e] leading-relaxed pl-12"
                    style={{ fontSize: "clamp(0.8125rem, 0.75rem + 0.2vw, 0.875rem)" }}
                  >
                    {t(descKey)}
                  </p>
                </div>
              </div>
            ); })}
          </div>
        </div>
      </section>

      {/* Inline Registration Contact Form Section */}
      <section
        id="contact"
        className="py-24 md:py-32 px-6 md:px-16 bg-[#fbf9f8] border-t border-[#e4e2e2]"
      >
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <span
              className="font-semibold text-[#79542e] uppercase tracking-[0.25em] block mb-2"
              style={{
                fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)",
              }}
            >
              {t('home.contactLabel')}
            </span>
            <h2
              className="font-serif-headline text-[#79542e]"
              style={{ fontSize: "clamp(1.75rem, 1.25rem + 2vw, 2.25rem)" }}
            >
              {t('home.contactTitle')}
            </h2>
            <p
              className="text-[#5f5e5e] leading-relaxed"
              style={{
                fontSize: "clamp(0.8125rem, 0.75rem + 0.2vw, 0.875rem)",
              }}
            >
              {t('home.contactDesc')}
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex gap-4 items-center">
                <div className="bg-[#e9e8e7] p-3 text-[#79542e]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-[#5f5e5e] uppercase tracking-widest">
                    {t('home.contactDirectLine')}
                  </p>
                  <p
                    className="font-bold text-[#1b1c1c]"
                    style={{
                      fontSize: "clamp(0.875rem, 0.8125rem + 0.25vw, 1rem)",
                    }}
                  >
                    {t('footer.phone')}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="bg-[#e9e8e7] p-3 text-[#79542e]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-[#5f5e5e] uppercase tracking-widest">
                    {t('home.contactConciergeEmail')}
                  </p>
                  <p
                    className="font-bold text-[#1b1c1c]"
                    style={{
                      fontSize: "clamp(0.875rem, 0.8125rem + 0.25vw, 1rem)",
                    }}
                  >
                    {t('footer.email')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 border border-[#d4c4b7] shadow-lg">
            <form
              ref={formRef}
              onSubmit={async (e) => {
                e.preventDefault();
                if (submitting) return;
                setSubmitting(true);
                setSubmitStatus('idle');
                const f = e.currentTarget.elements as HTMLFormControlsCollection & {
                  firstName: HTMLInputElement;
                  lastName: HTMLInputElement;
                  email: HTMLInputElement;
                  city: HTMLSelectElement;
                  reason: HTMLSelectElement;
                  consentUpdates: HTMLInputElement;
                  consentPrivacy: HTMLInputElement;
                };
                try {
                  await sendLeadEmail({
                    firstName: f.firstName.value,
                    lastName: f.lastName.value,
                    email: f.email.value,
                    phone: phoneValue ?? '',
                    city: f.city.value,
                    reason: f.reason.value,
                    consentUpdates: f.consentUpdates.checked,
                    consentPrivacy: f.consentPrivacy.checked,
                  });
                  setSubmitStatus('success');
                  f.firstName.value = '';
                  f.lastName.value = '';
                  f.email.value = '';
                  setPhoneValue(undefined);
                  f.city.value = '';
                  f.reason.value = '';
                  f.consentUpdates.checked = false;
                  f.consentPrivacy.checked = false;
                } catch {
                  setSubmitStatus('error');
                } finally {
                  setSubmitting(false);
                }
              }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold uppercase text-[#79542e] tracking-widest">
                    {t('home.contactFirstName')}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder={t('home.contactFirstNamePlaceholder')}
                    className="w-full bg-[#f5f3f3] border-b border-[#d4c4b7] focus:border-[#79542e] outline-none py-2.5 px-3 text-[#1b1c1c]"
                    style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold uppercase text-[#79542e] tracking-widest">
                    {t('home.contactLastName')}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    placeholder={t('home.contactLastNamePlaceholder')}
                    className="w-full bg-[#f5f3f3] border-b border-[#d4c4b7] focus:border-[#79542e] outline-none py-2.5 px-3 text-[#1b1c1c]"
                    style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-semibold uppercase text-[#79542e] tracking-widest">
                  {t('home.contactEmailLabel')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={t('home.contactEmailPlaceholder')}
                  className="w-full bg-[#f5f3f3] border-b border-[#d4c4b7] focus:border-[#79542e] outline-none py-2.5 px-3 text-[#1b1c1c]"
                  style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-semibold uppercase text-[#79542e] tracking-widest">
                  {t('home.contactPhoneLabel')}
                  </label>
                  <PhoneInput
                  defaultCountry="AE"
                  value={phoneValue}
                  onChange={setPhoneValue}
                  international
                  countryCallingCodeEditable={false}
                  placeholder="50 000 0000"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="city" className="text-[10px] font-semibold uppercase text-[#79542e] tracking-widest">
                  {t('home.contactCityLabel')}
                </label>
                <select
                  id="city"
                  name="city"
                  required
                  className="w-full bg-[#f5f3f3] border-b border-[#d4c4b7] focus:border-[#79542e] outline-none py-2.5 px-3 text-[#1b1c1c] appearance-none cursor-pointer"
                  style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
                  defaultValue=""
                >
                  <option value="" disabled>{t('home.contactCityPlaceholder')}</option>
                  <option value="dubai">{t('home.cityDubai')}</option>
                  <option value="abu-dhabi">{t('home.cityAbuDhabi')}</option>
                  <option value="sharjah">{t('home.citySharjah')}</option>
                  <option value="ajman">{t('home.cityAjman')}</option>
                  <option value="ras-al-khaimah">{t('home.cityRasAlKhaimah')}</option>
                  <option value="fujairah">{t('home.cityFujairah')}</option>
                  <option value="umm-al-quwain">{t('home.cityUmmAlQuwain')}</option>
                  <option value="other">{t('home.cityOther')}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="reason" className="text-[10px] font-semibold uppercase text-[#79542e] tracking-widest">
                  {t('home.contactReasonLabel')}
                </label>
                <select
                  id="reason"
                  name="reason"
                  required
                  className="w-full bg-[#f5f3f3] border-b border-[#d4c4b7] focus:border-[#79542e] outline-none py-2.5 px-3 text-[#1b1c1c] appearance-none cursor-pointer"
                  style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
                  defaultValue=""
                >
                  <option value="" disabled>{t('home.contactReasonPlaceholder')}</option>
                  <option value="invest">{t('home.reasonInvest')}</option>
                  <option value="live">{t('home.reasonLive')}</option>
                </select>
              </div>

              <div className="space-y-4 pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="consentUpdates"
                    className="mt-1 w-4 h-4 accent-[#a67c52] border-[#d4c4b7] cursor-pointer"
                  />
                  <span
                    className="text-[#5f5e5e] leading-relaxed group-hover:text-[#1b1c1c] transition-colors"
                    style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
                  >
                    {t('home.contactConsentUpdates')}
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="consentPrivacy"
                    required
                    className="mt-1 w-4 h-4 accent-[#a67c52] border-[#d4c4b7] cursor-pointer"
                  />
                  <span
                    className="text-[#5f5e5e] leading-relaxed group-hover:text-[#1b1c1c] transition-colors"
                    style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
                  >
                    {t('home.contactConsentPrivacy')}
                  </span>
                </label>
              </div>

              {submitStatus === 'success' && (
                <p className="text-green-700 text-sm text-center font-semibold">
                  {t('home.contactSuccess')}
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600 text-sm text-center font-semibold">
                  {t('home.contactError')}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#79542e] text-white py-4 font-semibold uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-md disabled:opacity-60"
                style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
              >
                {submitting ? t('home.contactSending') : t('home.contactRegister')}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Gallery Lightbox Modal */}
      {selectedGalleryImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedGalleryImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img
              src={selectedGalleryImage}
              alt={t('home.galleryTitle')}
              className="max-h-[85vh] w-auto mx-auto object-contain"
            />
            <button
              onClick={() => setSelectedGalleryImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-[#a67c52] uppercase tracking-widest font-semibold"
              style={{
                fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)",
              }}
            >
              {t('home.closeLightbox')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
