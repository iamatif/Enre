import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X, ChevronDown, PhoneCall, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import logoHeader from '../../assets/logo-header/logo-white-sobha.png';

interface HeaderProps {
  onOpenRegisterModal: () => void;
}

const CALENDLY_URL = '#';

export const Header: React.FC<HeaderProps> = ({
  onOpenRegisterModal,
}) => {
  const { lang, t, setLang, dir } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pfx = lang === 'AR' ? '/ar' : '';
  const isHome = location.pathname === '/' || location.pathname === '/ar';
  const navLinks = [
    { name: t('nav.home'), path: `${pfx}/` },
    { name: lang === 'EN' ? 'Location & About' : 'الموقع والنبذة', path: `${pfx}/about` },
  ];

  const isActive = (path: string) => {
    const stripped = path.replace(/^\/ar/, '') || '/';
    const current = location.pathname.replace(/^\/ar/, '') || '/';
    if (stripped === '/' && current === '/') return true;
    if (stripped !== '/' && current.startsWith(stripped)) return true;
    return false;
  };

  return (
    <header
      id="top-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex justify-center ${
        isScrolled ? 'h-16 shadow-md bg-[#1b1c1c]/85 backdrop-blur-md' : 'h-20 bg-transparent'
      }`}
    >
      <div
        className={`w-full max-w-[1280px] px-6 md:px-16 flex justify-between items-center transition-all duration-500 ${
          isScrolled ? 'pt-2' : 'pt-3 md:pt-4'
        }`}
      >
        {/* Brand Logotype */}
        <div className="flex items-center gap-10">
          <Link
            to={lang === 'AR' ? '/ar' : '/'}
            className="flex items-center hover:opacity-90 transition-opacity leading-tight"
          >
            <img
              src={logoHeader}
              alt="Sobha Logo"
              className={`w-auto transition-all duration-500 ${
                isScrolled ? 'h-7 md:h-9' : 'h-10 md:h-14'
              }`}
            />
          </Link>

          {/* Desktop Nav - hidden on homepage */}
          {!isHome && (
            <nav className="hidden lg:flex gap-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`uppercase tracking-widest font-semibold py-1 transition-all duration-300 relative ${
                    isActive(link.path)
                      ? 'text-white border-b-2 border-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                  style={{ fontSize: 'clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)' }}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-1 sm:gap-2">
            <a
              href="https://www.facebook.com/alifnoonproperties"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-1 sm:p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              <Facebook className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </a>
            <a
              href="https://www.tiktok.com/@realestateuae?_t=8kzi3KmATAo&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="p-1 sm:p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-[18px] sm:h-[18px]">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/alifnoonproperties/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-1 sm:p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              <Instagram className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </a>
            <a
              href="https://wa.me/971521642020"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-1 sm:p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-[18px] sm:h-[18px]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
            </a>
          </div>

          <span className="hidden sm:block w-px h-6 bg-white/20" />

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 font-semibold text-white py-2 px-2 hover:bg-white/10 transition-colors" style={{ fontSize: 'clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)' }}
            >
              <Globe className="w-4 h-4" />
              <span>{lang}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white shadow-lg border border-[#d4c4b7] py-2 min-w-[130px] z-50">
                <button
                  onClick={() => {
                    setLang('EN');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 font-medium hover:bg-[#f5f3f3] ${
                    lang === 'EN' ? 'text-[#79542e] font-bold' : 'text-[#1b1c1c]'
                  }`}
                  style={{ fontSize: 'clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)' }}
                >
                  English (EN)
                </button>
                <button
                  onClick={() => {
                    setLang('AR');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 font-medium hover:bg-[#f5f3f3] ${
                    lang === 'AR' ? 'text-[#79542e] font-bold' : 'text-[#1b1c1c]'
                  }`}
                  style={{ fontSize: 'clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)' }}
                >
                  العربية (AR)
                </button>
              </div>
            )}
          </div>

          {/* Book Appointment CTA Button */}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block border border-white bg-transparent text-white px-6 py-2.5 font-semibold hover:bg-white hover:text-black transition-all uppercase tracking-[0.15em] shadow-sm active:opacity-90" style={{ fontSize: 'clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)' }}
          >
            {t('nav.bookAppointment')}
          </a>

          {/* Mobile Menu Button - hidden on homepage */}
          {!isHome && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer - hidden on homepage */}
      {!isHome && mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 md:top-20 bg-white border-b border-[#d4c4b7] shadow-xl p-6 flex flex-col gap-4 z-40 animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-semibold uppercase tracking-wider py-2 border-b border-[#f5f3f3] ${
                  isActive(link.path) ? 'text-[#79542e]' : 'text-[#1b1c1c]'
                }`}
                style={{ fontSize: 'clamp(0.8125rem, 0.75rem + 0.2vw, 0.875rem)' }}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegisterModal();
              }}
              className="w-full bg-white text-black py-3 font-semibold uppercase tracking-widest text-center hover:bg-white/80 transition-colors" style={{ fontSize: 'clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)' }}
            >
              {t('nav.registerNow')}
            </button>
            <a
              href="tel:+971521642020"
              className="flex items-center justify-center gap-2 border border-white text-white py-2.5 font-semibold uppercase tracking-widest text-center hover:bg-white/10" style={{ fontSize: 'clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)' }}
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t('nav.phone')}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
