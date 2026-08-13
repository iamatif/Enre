import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import alifNoonLogo from '../../assets/Alif-Noon-Logo-Header-Logo.gif';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const socials = [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/alifnoonproperties',
      icon: <Facebook className="w-4 h-4" />,
    },
    {
      label: 'TikTok',
      href: 'https://www.tiktok.com/@realestateuae?_t=8kzi3KmATAo&_r=1',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/alifnoonproperties/?hl=en',
      icon: <Instagram className="w-4 h-4" />,
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/971521642020',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      ),
    },
  ];

  const contacts = [
    {
      icon: <MapPin className="w-4 h-4" />,
      content: <span>{t('footer.address')}</span>,
    },
    {
      icon: <Phone className="w-4 h-4" />,
      content: (
        <a href="tel:+971521642020" className="hover:text-[#d4af7a] transition-colors">
          {t('footer.phone')}
        </a>
      ),
    },
    {
      icon: <Mail className="w-4 h-4" />,
      content: (
        <a href="mailto:leads@alifnoon.ae" className="hover:text-[#d4af7a] transition-colors">
          {t('footer.email')}
        </a>
      ),
    },
  ];

  return (
    <footer className="relative w-full bg-[#121212] text-white pt-20 pb-8 px-6 md:px-16 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#a67c52] to-transparent" />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(166,124,82,0.16), transparent)' }}
      />
      <div className="relative max-w-[1200px] mx-auto">
        <div className="flex flex-col items-center text-center gap-8 pb-14">
          <img
            src={alifNoonLogo}
            alt="Alif Noon Logo"
            className="h-28 md:h-36 w-auto drop-shadow-[0_0_30px_rgba(166,124,82,0.35)]"
          />
          <div>
            <span className="inline-block w-10 h-px bg-[#a67c52] mb-5" />
            <h3
              className="uppercase font-semibold text-[#d4af7a] tracking-[0.35em]"
              style={{ fontSize: 'clamp(0.8125rem, 0.75rem + 0.2vw, 0.875rem)' }}
            >
              {t('footer.brandTagline')}
            </h3>
            <p
              className="text-white/70 leading-loose max-w-2xl mx-auto mt-4"
              style={{ fontSize: 'clamp(0.8125rem, 0.75rem + 0.2vw, 0.875rem)' }}
            >
              {t('footer.brandDesc')}
            </p>
          </div>

          <div
            className="pt-2 flex flex-col md:flex-row md:items-center gap-4 md:gap-10 text-white/80"
            style={{ fontSize: 'clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)' }}
          >
            {contacts.map((c, i) => (
              <div key={i} className="flex items-start justify-center gap-2.5 md:items-center">
                <span className="text-[#a67c52] mt-0.5 md:mt-0">{c.icon}</span>
                {c.content}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-1">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/15 text-white/80 hover:text-[#121212] hover:bg-[#d4af7a] hover:border-[#d4af7a] transition-all duration-300"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 text-center tracking-wider uppercase">
          <p className="text-[13px] text-white/60">{t('footer.copyright')}</p>
          <p className="mt-1.5 text-[10px] tracking-[0.3em] text-white/35">{t('footer.copyrightSub')}</p>
        </div>
      </div>
    </footer>
  );
};
