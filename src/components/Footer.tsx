import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenRegisterModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRegisterModal }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#1b1c1c] text-white pt-20 pb-6 px-6 md:px-16 border-t border-[#79542e]/30">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-serif-headline text-white tracking-[0.25em] block uppercase font-bold" style={{ fontSize: 'clamp(1.5rem, 1.125rem + 1.5vw, 1.875rem)' }}>
              THE CANOPIES
            </span>
            <p className="text-white/70 leading-relaxed max-w-sm" style={{ fontSize: 'clamp(0.8125rem, 0.75rem + 0.2vw, 0.875rem)' }}>
              {t('footer.brandDesc')}
            </p>
            <div className="pt-2 flex flex-col gap-3 text-white/80" style={{ fontSize: 'clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)' }}>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#a67c52]" />
                <span>{t('footer.address')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#a67c52]" />
                <a href="tel:+97180025327" className="hover:text-[#a67c52] transition-colors">
                  {t('footer.phone')}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#a67c52]" />
                <a href="mailto:sales@thecanopiesyas.ae" className="hover:text-[#a67c52] transition-colors">
                  {t('footer.email')}
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription Column */}
          <div className="lg:col-span-4 lg:col-start-9 space-y-4">
            <h3 className="uppercase tracking-[0.2em] font-semibold text-[#a67c52]" style={{ fontSize: 'clamp(0.9875rem, 1.125rem + 0.4vw, 1.15rem)' }}>
              {t('footer.newsletter')}
            </h3>
            <p className="text-white/70 leading-relaxed" style={{ fontSize: 'clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)' }}>
              {t('footer.newsletterDesc')}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletterPlaceholder')}
                  required
                  className="w-full bg-white/5 border border-white/20 py-3 px-4 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-[#a67c52] transition-colors"
                  style={{ fontSize: 'clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)' }}
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-[#a67c52] text-white hover:brightness-110 transition-all flex items-center justify-center"
                  aria-label={t('footer.subscribe')}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-2 text-emerald-400" style={{ fontSize: 'clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)' }}>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Thank you. You have been added to our private advisory circle.</span>
                </div>
              )}
            </form>
            <div className="pt-2">
              <button
                onClick={onOpenRegisterModal}
                className="w-full bg-[#a67c52] text-white py-3 px-6 font-semibold uppercase tracking-[0.2em] hover:brightness-110 transition-all"
                style={{ fontSize: 'clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)' }}
              >
                {t('footer.registerNow')}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 pb-2 text-center text-[11px] text-white/50 tracking-wider uppercase">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};
