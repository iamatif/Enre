import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X, ChevronDown, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onOpenRegisterModal: () => void;
}

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
        isScrolled ? 'h-16 shadow-md bg-[#1b1c1c]' : 'h-20 bg-transparent'
      }`}
    >
      <div className="w-full max-w-[1280px] px-6 md:px-16 flex justify-between items-center">
        {/* Brand Logotype */}
        <div className="flex items-center gap-10">
          <Link
            to={lang === 'AR' ? '/ar' : '/'}
            className="font-serif-headline text-white tracking-[0.2em] uppercase font-semibold hover:opacity-90 transition-opacity" style={{ fontSize: 'clamp(1.25rem, 1rem + 1vw, 1.5rem)' }}
          >
            THE CANOPIES
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

          {/* Register Interest CTA Button */}
          <button
            onClick={onOpenRegisterModal}
            className="hidden sm:block border border-white bg-transparent text-white px-6 py-2.5 font-semibold hover:bg-white hover:text-black transition-all uppercase tracking-[0.15em] shadow-sm active:opacity-90" style={{ fontSize: 'clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)' }}
          >
            {t('nav.registerNow')}
          </button>

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
              href="tel:+97180025327"
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
