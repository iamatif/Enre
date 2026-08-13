import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { LanguageProvider } from './context/LanguageContext';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ScrollPopup } from './components/ScrollPopup';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function useScrollToContact() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const prefix = pathname.startsWith('/ar') ? '/ar' : '';
  return () => {
    const isHome = pathname === '/' || pathname === '/ar';
    if (!isHome) {
      navigate(`${prefix}/#contact`);
    } else {
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };
}

function AppInner() {
  const scrollToContact = useScrollToContact();

  return (
    <>
      <Header onOpenRegisterModal={scrollToContact} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onOpenRegisterModal={scrollToContact} />} />
          <Route path="/ar" element={<HomePage onOpenRegisterModal={scrollToContact} />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ScrollToTop />
        <div className={`min-h-screen flex flex-col bg-[#fbf9f8] text-[#1b1c1c]`}>
          <AppInner />
          <ScrollToTopButton />
          <WhatsAppButton />
          <ScrollPopup />
        </div>
      </LanguageProvider>
    </BrowserRouter>
  );
}
