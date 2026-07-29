import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Language, translations } from '../translations';

interface LanguageContextType {
  lang: Language;
  dir: 'ltr' | 'rtl';
  toggleLang: () => void;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getLangFromPath(pathname: string): Language {
  return pathname.startsWith('/ar') ? 'AR' : 'EN';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [lang, setLangState] = useState<Language>(() => getLangFromPath(pathname));

  const dir = useMemo<'ltr' | 'rtl'>(() => (lang === 'AR' ? 'rtl' : 'ltr'), [lang]);

  useEffect(() => {
    const urlLang = getLangFromPath(pathname);
    if (urlLang !== lang) {
      setLangState(urlLang);
    }
  }, [pathname]);

  useEffect(() => {
    document.documentElement.lang = lang === 'AR' ? 'ar' : 'en';
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = useCallback(
    (newLang: Language) => {
      if (newLang === 'AR') {
        navigate('/ar');
      } else {
        navigate('/');
      }
    },
    [navigate]
  );

  const toggleLang = useCallback(() => {
    setLang(lang === 'EN' ? 'AR' : 'EN');
  }, [lang, setLang]);

  const t = useCallback(
    (key: string): string => {
      return translations[lang]?.[key] ?? key;
    },
    [lang]
  );

  const value = useMemo(
    () => ({ lang, dir, toggleLang, setLang, t }),
    [lang, dir, toggleLang, setLang, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      <div dir={dir}>{children}</div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
