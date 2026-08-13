import React, { useState, useRef, useCallback, useEffect } from "react";
import { Hero } from "../components/Hero";
import { DownloadModal } from "../components/DownloadModal";
import TypeTabs from "../components/TypeTabs";
import AmenitiesHighlights from "../components/AmenitiesHighlights";
import { useLanguage } from "../context/LanguageContext";
import { sendLeadEmail } from "../services/leadService";
import {
  Phone,
  Mail,
  Plus,
  Check,
  Calendar,
  Dumbbell,
  Waves,
  Baby,
  Users,
  ShowerHead,
} from "lucide-react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import brochurePdf from "../../assets/Enre Residence by Imtiaz-Brochure.pdf";
const aboutImages = Object.values(
  import.meta.glob('../../assets/about-gallery/*.{png,webp,jpg,jpeg}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
) as string[];
const collectImages = (glob: Record<string, string>): string[] =>
  Object.keys(glob)
    .sort()
    .map((key) => glob[key]);

const galleryExterior = collectImages(
  import.meta.glob("/assets/gallery/optimized/exterior/*.webp", {
    eager: true,
    import: "default",
  })
);
const galleryHeroBg = collectImages(
  import.meta.glob("/assets/hero-bg/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
  })
);
const galleryApartments = collectImages(
  import.meta.glob("/assets/gallery/optimized/apartment/*.webp", {
    eager: true,
    import: "default",
  })
);
const galleryClubHouse = collectImages(
  import.meta.glob("/assets/gallery/optimized/club-house/*.webp", {
    eager: true,
    import: "default",
  })
);
const galleryGym = collectImages(
  import.meta.glob("/assets/gallery/optimized/gym/*.webp", {
    eager: true,
    import: "default",
  })
);
const galleryLobby = collectImages(
  import.meta.glob("/assets/gallery/optimized/lobby/*.webp", {
    eager: true,
    import: "default",
  })
);

const faqTabs = [
  { prefix: "G", titleKey: "home.faqTab3Title", counts: [1, 2, 3, 4, 5] },
  { prefix: "W", titleKey: "home.faqTab4Title", counts: [1, 2, 3, 4, 5] },
  { prefix: "GR", titleKey: "home.faqTab5Title", counts: [1, 2, 3, 4, 5] },
  { prefix: "B", titleKey: "home.faqTab6Title", counts: [1, 2, 3, 4, 5] },
  { prefix: "WD", titleKey: "home.faqTab7Title", counts: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
];

interface HomePageProps {
  onOpenRegisterModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenRegisterModal,
}) => {
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [highlightSlide, setHighlightSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeFaqTab, setActiveFaqTab] = useState(0);
  const [phoneValue, setPhoneValue] = useState<string | undefined>(undefined);
  const [download, setDownload] = useState<{
    fileUrl: string;
    fileName: string;
    title: string;
    subtitle: string;
  } | null>(null);
  const { t, lang } = useLanguage();
  const [aboutSlide, setAboutSlide] = useState(0);

  useEffect(() => {
    if (aboutImages.length <= 1) return;
    const id = setInterval(() => {
      setAboutSlide((prev) => (prev + 1) % aboutImages.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [galleryTab, setGalleryTab] = useState<'exterior' | 'interior'>('exterior');
  const [interiorTab, setInteriorTab] = useState<'apartments' | 'clubHouse' | 'gym' | 'lobby'>('apartments');

  const interiorGalleryTabs = [
    { key: 'apartments' as const, labelKey: 'home.gallerySubApartments' },
    { key: 'clubHouse' as const, labelKey: 'home.gallerySubClubHouse' },
    { key: 'gym' as const, labelKey: 'home.gallerySubGym' },
    { key: 'lobby' as const, labelKey: 'home.gallerySubLobby' },
  ];

  const galleryImagesByInterior: Record<
    'apartments' | 'clubHouse' | 'gym' | 'lobby',
    string[]
  > = {
    apartments: galleryApartments,
    clubHouse: galleryClubHouse,
    gym: galleryGym,
    lobby: galleryLobby,
  };

  const activeGalleryImages =
    galleryTab === 'exterior' ? [...galleryExterior, ...galleryHeroBg] : galleryImagesByInterior[interiorTab];

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const paymentPlanSteps = [
    { valueKey: 'home.paymentPlanStep1Value', labelKey: 'home.paymentPlanStep1Label' },
    { valueKey: 'home.paymentPlanStep2Value', labelKey: 'home.paymentPlanStep2Label' },
    { valueKey: 'home.paymentPlanStep3Value', labelKey: 'home.paymentPlanStep3Label' },
  ];

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
    },
    {
      taglineKey: 'home.slideTagline3',
      headingKey: 'home.slideHeading3',
      descKey: 'home.slideDesc3',
    },
  ];

  const highlights = [
    { icon: Dumbbell, titleKey: 'home.highlight1Title', descKey: 'home.highlight1Desc' },
    { icon: Waves, titleKey: 'home.highlight2Title', descKey: 'home.highlight2Desc' },
    { icon: Baby, titleKey: 'home.highlight3Title', descKey: 'home.highlight3Desc' },
    { icon: Users, titleKey: 'home.highlight4Title', descKey: 'home.highlight4Desc' },
    { icon: ShowerHead, titleKey: 'home.highlight5Title', descKey: 'home.highlight5Desc' },
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
    if (!el || activeGalleryImages.length === 0) return;
    galleryOffsetRef.current = 0;
    const speed = 1.2;
    let lastTime = performance.now();

    const animate = (now: number) => {
      if (!galleryPausedRef.current) {
        galleryOffsetRef.current += speed * (now - lastTime) / 16;
        const copyWidth = el.scrollWidth / 2;
        if (copyWidth > 0 && galleryOffsetRef.current >= copyWidth) {
          galleryOffsetRef.current = 0;
        }
        el.style.transform = `translate3d(${-galleryOffsetRef.current}px, 0, 0)`;
      }
      lastTime = now;
      galleryAnimRef.current = requestAnimationFrame(animate);
    };

    galleryAnimRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(galleryAnimRef.current);
  }, [activeGalleryImages]);

  const handleGalleryPrev = useCallback(() => {
    setSelectedGalleryIndex((prev) => {
      if (prev === null || activeGalleryImages.length === 0) return prev;
      return (prev - 1 + activeGalleryImages.length) % activeGalleryImages.length;
    });
  }, [activeGalleryImages.length]);

  const handleGalleryNext = useCallback(() => {
    setSelectedGalleryIndex((prev) => {
      if (prev === null || activeGalleryImages.length === 0) return prev;
      return (prev + 1) % activeGalleryImages.length;
    });
  }, [activeGalleryImages.length]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (selectedGalleryIndex === null) return;
      if (e.key === 'Escape') setSelectedGalleryIndex(null);
      if (e.key === 'ArrowLeft') handleGalleryPrev();
      if (e.key === 'ArrowRight') handleGalleryNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedGalleryIndex, handleGalleryPrev, handleGalleryNext]);

  return (
    <div className="min-h-screen">
      <Hero onOpenRegisterModal={onOpenRegisterModal} />

      {/* About Project Section */}
      <section id="about" className="py-24 md:py-36 px-6 md:px-16 bg-[#f5f3f3]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image Slider */}
          <div className="relative">
            <div className="relative overflow-hidden">
              <div className="relative w-full" style={{ minHeight: "24rem", aspectRatio: "928/796" }}>
                {aboutImages.map((img, i) => (
                  <div
                    key={img}
                    className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity ease-in-out"
                    style={{
                      backgroundImage: `url('${img}')`,
                      opacity: i === aboutSlide ? 1 : 0,
                      transitionDuration: "2000ms",
                    }}
                  />
                ))}
              </div>
              <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-[#a67c52]/60 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-[#a67c52]/60 pointer-events-none" />
            </div>
          </div>

          {/* Right: Heading + Description + CTA */}
          <div className="space-y-6">
            <div>
              <span
                className="font-semibold text-[#79542e] uppercase tracking-[0.25em] block mb-3"
                style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
              >
                {t('home.aboutProjectLabel')}
              </span>
              <h2
                className="font-serif-headline text-[#1b1c1c] leading-tight"
                style={{ fontSize: "clamp(1.75rem, 1.25rem + 2vw, 2.5rem)" }}
              >
                {t('home.aboutProjectTitle')}
              </h2>
              <div className="w-14 h-0.5 bg-[#79542e] mt-5" />
            </div>

            <div
              className="space-y-5 text-[#5f5e5e] font-normal leading-relaxed"
              style={{ fontSize: "clamp(0.875rem, 0.8125rem + 0.25vw, 1rem)" }}
            >
              <p className="whitespace-pre-line">{t('home.aboutProjectDesc1')}</p>
              <p className="whitespace-pre-line">{t('home.aboutProjectDesc2')}</p>
            </div>

            <div className="pt-4">
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
                className="inline-flex items-center gap-3 bg-[#79542e] text-white px-10 py-4 font-semibold hover:brightness-110 transition-all uppercase tracking-[0.2em] shadow-xl active:scale-95 cursor-pointer"
                style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
              >
                <span>{t('hero.downloadBrochure')}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <TypeTabs />

      <AmenitiesHighlights />

      {/* Flexible Payment Plan Section */}
      <section className="py-20 md:py-24 px-6 md:px-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center">
            <span
              className="font-semibold text-[#79542e] uppercase tracking-[0.25em] block mb-2"
              style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
            >
              {t('home.paymentPlanSectionLabel')}
            </span>
            <h2
              className="font-serif-headline text-[#1b1c1c]"
              style={{ fontSize: "clamp(1.5rem, 1.125rem + 1.5vw, 2rem)" }}
            >
              {t('home.paymentPlanHeading')}
            </h2>
            <p
              className="text-[#5f5e5e] mt-3 max-w-2xl mx-auto leading-relaxed"
              style={{ fontSize: "clamp(0.875rem, 0.8125rem + 0.25vw, 1rem)" }}
            >
              {t('home.paymentPlanSubheading')}
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
              {paymentPlanSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#1b1c1c] text-white flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <span
                    className="font-serif-headline text-[#79542e] font-bold"
                    style={{ fontSize: "clamp(1.75rem, 1.5rem + 0.75vw, 2.25rem)" }}
                  >
                    {t(step.valueKey)}
                  </span>
                  <p
                    className="text-[#5f5e5e] font-semibold uppercase tracking-wider"
                    style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
                  >
                    {t(step.labelKey)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex items-center justify-center gap-2 text-[#1b1c1c] font-semibold uppercase tracking-widest" style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}>
              <Calendar className="w-4 h-4 text-[#79542e]" />
              <span>{t('home.paymentPlanHandover')}</span>
            </div>

            <div className="mt-8">
              <button
                onClick={scrollToContact}
                className="inline-block bg-[#79542e] text-white px-10 py-4 font-semibold hover:brightness-110 transition-all uppercase tracking-[0.2em] shadow-xl active:scale-95"
                style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
              >
                {t('home.paymentPlanCta')}
              </button>
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
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 mb-12 text-center">
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
          <div className="w-16 h-1 bg-[#a67c52] mx-auto mt-4" />

          {/* Main tabs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setGalleryTab('exterior')}
              className={`px-7 py-3 border uppercase tracking-[0.2em] font-semibold transition-all ${
                galleryTab === 'exterior'
                  ? 'bg-[#a67c52] border-[#a67c52] text-white'
                  : 'border-white/20 text-white/60 hover:text-white hover:border-white/50'
              }`}
              style={{ fontSize: "clamp(0.625rem, 0.5625rem + 0.2vw, 0.6875rem)" }}
            >
              {t('home.galleryTabExterior')}
            </button>
            <button
              onClick={() => setGalleryTab('interior')}
              className={`px-7 py-3 border uppercase tracking-[0.2em] font-semibold transition-all ${
                galleryTab === 'interior'
                  ? 'bg-[#a67c52] border-[#a67c52] text-white'
                  : 'border-white/20 text-white/60 hover:text-white hover:border-white/50'
              }`}
              style={{ fontSize: "clamp(0.625rem, 0.5625rem + 0.2vw, 0.6875rem)" }}
            >
              {t('home.galleryTabInterior')}
            </button>
          </div>

          {/* Interior sub-tabs */}
          {galleryTab === 'interior' && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
              {interiorGalleryTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setInteriorTab(tab.key)}
                  className={`px-5 py-2.5 border uppercase tracking-[0.2em] font-semibold transition-all ${
                    interiorTab === tab.key
                      ? 'bg-[#a67c52] border-[#a67c52] text-white'
                      : 'border-white/15 text-white/50 hover:text-white hover:border-white/40'
                  }`}
                  style={{ fontSize: "clamp(0.5625rem, 0.5rem + 0.2vw, 0.625rem)" }}
                >
                  {t(tab.labelKey)}
                </button>
              ))}
            </div>
          )}
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
            {[...activeGalleryImages, ...activeGalleryImages].map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedGalleryIndex(idx % activeGalleryImages.length)}
                className="w-[420px] md:w-[560px] lg:w-[680px] aspect-[4/3] flex-shrink-0 cursor-pointer overflow-hidden group border border-white/10"
              >
                <img
                  src={img}
                  alt={`${t('home.galleryTitle')} ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-16 bg-[#f5f3f3]">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <span
              className="font-semibold text-[#79542e] uppercase tracking-[0.25em] block mb-3"
              style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
            >
              {t('home.faqLabel')}
            </span>
            <h2
              className="font-serif-headline text-[#1b1c1c] faq-heading leading-tight max-w-full"
              style={{ fontSize: "clamp(1.375rem, 1rem + 2.5vw, 2.5rem)" }}
            >
              {t('home.faqTitle')}
            </h2>
            <div className="w-14 h-0.5 bg-[#79542e] mx-auto mt-5" />
          </div>

          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 sm:bg-white sm:border sm:border-[#d4c4b7]/40 sm:rounded-xl sm:p-1.5 sm:shadow-sm w-full sm:w-auto">
              {faqTabs.map((tab, ti) => (
                <button
                  key={tab.prefix}
                  onClick={() => {
                    setActiveFaqTab(ti);
                    setOpenFaq(ti * 100);
                  }}
                  className={`px-6 py-3.5 font-semibold uppercase tracking-widest rounded-lg transition-all duration-300 ${
                    activeFaqTab === ti
                      ? 'bg-[#79542e] text-white shadow-md'
                      : 'bg-[#efe7db] text-[#5f5e5e] hover:text-[#79542e] hover:bg-[#f5e9d8]'
                  }`}
                  style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
                >
                  {t(tab.titleKey)}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            {faqTabs[activeFaqTab].counts.map((n, idx) => {
              const prefix = faqTabs[activeFaqTab].prefix;
              const nameKey = `home.faq${prefix}${n}Question`;
              const descKey = `home.faq${prefix}${n}Answer`;
              const openId = activeFaqTab * 100 + idx;
              return (
                <div
                  key={openId}
                  className={`rounded-xl overflow-hidden transition-all duration-300 ${
                    openFaq === openId
                      ? 'bg-white max-md:bg-[#f5e9d8] border border-[#79542e] shadow-lg'
                      : 'bg-white border border-[#d4c4b7]/40 hover:border-[#a67c52]/60 hover:shadow-md'
                  }`}
                >
                  <h3 className="m-0">
                    <button
                      onClick={() => setOpenFaq(openFaq === openId ? null : openId)}
                      aria-expanded={openFaq === openId}
                      className="w-full flex items-center justify-between gap-4 py-5 px-6 text-left group"
                    >
                      <span className="flex items-center gap-4">
                        <span
                          className="font-serif-headline text-[#79542e] font-bold"
                          style={{ fontSize: "clamp(0.875rem, 0.75rem + 0.4vw, 1.125rem)" }}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="font-serif-headline text-[#1b1c1c] group-hover:text-[#79542e] transition-colors leading-snug faq-question"
                          style={{ fontSize: "clamp(1.0625rem, 0.9375rem + 0.5vw, 1.25rem)" }}
                        >
                          {t(nameKey)}
                        </span>
                      </span>
                      <span
                        className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${
                          openFaq === openId
                            ? 'bg-[#79542e] text-white rotate-45'
                            : 'bg-[#f5e9d8] text-[#79542e]'
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                      </span>
                    </button>
                  </h3>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === openId ? "max-h-[60rem]" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <div className="h-px bg-[#d4c4b7]/40 mb-4 ms-9" />
                      <p
                        className="text-[#5f5e5e] leading-relaxed ms-9 whitespace-pre-line"
                        style={{ fontSize: "clamp(0.8125rem, 0.75rem + 0.2vw, 0.875rem)" }}
                      >
                        {t(descKey)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inline Registration Contact Form Section */}
      <section
        id="contact"
        className="py-24 md:py-32 px-6 md:px-16 bg-[#fbf9f8] border-t border-[#e4e2e2]"
      >
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="lg:sticky lg:top-28 space-y-6">
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

            <div className="relative bg-[#1b1c1c] p-8 shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#c9a86a]/70 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#c9a86a]/70 pointer-events-none" />
              <span
                className="font-semibold text-[#c9a86a] uppercase tracking-[0.25em] block"
                style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
              >
                Starting Prices
              </span>
              <div className="w-10 h-px bg-[#c9a86a] my-4" />
              <p
                className="text-white font-bold leading-snug"
                style={{ fontSize: "clamp(0.9375rem, 0.875rem + 0.25vw, 1.125rem)" }}
              >
                AED 9.32 M* | INR 23.9 CR* | USD 2.55 M* | EUR 2.28 M* | GBP 1.96 M*
              </p>
              <p
                className="text-white/55 mt-3 leading-relaxed"
                style={{ fontSize: "clamp(0.625rem, 0.5625rem + 0.2vw, 0.6875rem)" }}
              >
                Subject to inventory availability* | The global prices may vary as per the exchange rate*
              </p>
            </div>

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
      {selectedGalleryIndex !== null && activeGalleryImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8 animate-in fade-in"
          onClick={() => setSelectedGalleryIndex(null)}
        >
          <button
            onClick={() => setSelectedGalleryIndex(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 text-white/80 hover:text-[#a67c52] uppercase tracking-widest font-semibold"
            style={{
              fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)",
            }}
          >
            {t('home.closeLightbox')}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleGalleryPrev();
            }}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-[#a67c52] hover:text-white text-white flex items-center justify-center transition-all border border-white/20"
            aria-label="Previous image"
          >
            &#8592;
          </button>

          <div
            className="flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeGalleryImages[selectedGalleryIndex]}
              alt={`${t('home.galleryTitle')} ${selectedGalleryIndex + 1}`}
              decoding="async"
              className="max-h-[88vh] md:max-h-[92vh] max-w-[88vw] md:max-w-[94vw] w-auto h-auto mx-auto object-contain"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleGalleryNext();
            }}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-[#a67c52] hover:text-white text-white flex items-center justify-center transition-all border border-white/20"
            aria-label="Next image"
          >
            &#8594;
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm tracking-widest">
            {selectedGalleryIndex + 1} / {activeGalleryImages.length}
          </div>
        </div>
      )}

      <DownloadModal
        open={download !== null}
        onClose={() => setDownload(null)}
        title={download?.title ?? ''}
        subtitle={download?.subtitle ?? ''}
        fileUrl={download?.fileUrl ?? ''}
        fileName={download?.fileName ?? ''}
      />
    </div>
  );
};
