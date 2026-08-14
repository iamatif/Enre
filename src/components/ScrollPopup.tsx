import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { sendLeadEmail } from "../services/leadService";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import popupImage from "../../assets/the-grove/VILLA - T5A_Closeup 02_2.jpg.webp";
import { X } from "lucide-react";
import { useSlideModal } from "../utils/useSlideModal";

const SCROLL_THRESHOLD = 0.2;

export const ScrollPopup: React.FC = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [phoneValue, setPhoneValue] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const shownRef = useRef(false);
  const { render, translate, transition, overlayVisible } = useSlideModal(visible);

  useEffect(() => {
    if (sessionStorage.getItem('sobha-popup-shown') === '1') {
      shownRef.current = true;
      return;
    }
    const onScroll = () => {
      if (shownRef.current) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      if (scrollable <= 0) return;
      const progress = doc.scrollTop / scrollable;
      if (progress >= SCROLL_THRESHOLD) {
        shownRef.current = true;
        sessionStorage.setItem('sobha-popup-shown', '1');
        setVisible(true);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setVisible(false);

  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [visible]);

  if (!render) return null;

  return (
    <div className="fixed inset-0 z-[60]" aria-modal="true" role="dialog">
      <div
        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-[550ms] ${
          overlayVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={close}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-4xl bg-[#1b1c1c] shadow-2xl overflow-y-auto transition-transform will-change-transform ${transition} ${translate}`}
          dir="ltr"
        >
          <button
            onClick={close}
            aria-label={t('popup.close')}
            className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="hidden md:block relative min-h-[520px]">
              <img
                src={popupImage}
                alt="Sobha Sanctuary private residence"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span
                  className="font-semibold text-[#c9a86a] uppercase tracking-[0.25em] block mb-2"
                  style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
                >
                  {t('popup.badge')}
                </span>
                <p
                  className="text-white font-serif-headline leading-snug"
                  style={{ fontSize: "clamp(1.5rem, 1.125rem + 1vw, 2rem)" }}
                >
                  {t('popup.title')}
                </p>
              </div>
            </div>

            <div className="p-6 md:p-10">
            <div className="mb-6">
              <span
                className="font-semibold text-[#c9a86a] uppercase tracking-[0.25em] block mb-2"
                style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
              >
                {t('popup.badge')}
              </span>
              <h3
                className="text-white font-serif-headline leading-snug"
                style={{ fontSize: "clamp(1.5rem, 1.125rem + 1vw, 2rem)" }}
              >
                {t('popup.title')}
              </h3>
            </div>

            <p
              className="text-white/60 leading-relaxed mb-8 md:mt-2"
              style={{ fontSize: "clamp(0.8125rem, 0.75rem + 0.2vw, 0.875rem)" }}
            >
              {t('popup.subtitle')}
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (submitting) return;
                setSubmitting(true);
                setSubmitStatus('idle');
                const f = e.currentTarget.elements as HTMLFormControlsCollection & {
                  name: HTMLInputElement;
                  email: HTMLInputElement;
                  country: HTMLSelectElement;
                };
                try {
                  await sendLeadEmail({
                    firstName: f.name.value,
                    lastName: '',
                    email: f.email.value,
                    phone: phoneValue ?? '',
                    city: f.country.value,
                    reason: '',
                    consentUpdates: true,
                    consentPrivacy: true,
                    type: 'Popup Enquiry',
                  });
                  setSubmitStatus('success');
                } catch {
                  setSubmitStatus('error');
                } finally {
                  setSubmitting(false);
                }
              }}
              className="space-y-5"
            >
              <div className="space-y-2">
                <label
                  htmlFor="popup-name"
                  className="text-[10px] font-semibold uppercase text-[#c9a86a] tracking-widest block"
                >
                  {t('popup.name')}
                </label>
                <input
                  id="popup-name"
                  name="name"
                  type="text"
                  required
                  placeholder={t('popup.namePlaceholder')}
                  className="w-full bg-white/5 border-b border-white/20 focus:border-[#c9a86a] outline-none py-2.5 px-3 text-white placeholder-white/35"
                  style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="popup-email"
                  className="text-[10px] font-semibold uppercase text-[#c9a86a] tracking-widest block"
                >
                  {t('popup.email')}
                </label>
                <input
                  id="popup-email"
                  name="email"
                  type="email"
                  required
                  placeholder={t('popup.emailPlaceholder')}
                  className="w-full bg-white/5 border-b border-white/20 focus:border-[#c9a86a] outline-none py-2.5 px-3 text-white placeholder-white/35"
                  style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="popup-phone"
                  className="text-[10px] font-semibold uppercase text-[#c9a86a] tracking-widest block"
                >
                  {t('popup.phone')}
                </label>
                <PhoneInput
                  id="popup-phone"
                  defaultCountry="AE"
                  value={phoneValue}
                  onChange={setPhoneValue}
                  international
                  countryCallingCodeEditable={false}
                  placeholder="50 000 0000"
                  className="popup-phone"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="popup-country"
                  className="text-[10px] font-semibold uppercase text-[#c9a86a] tracking-widest block"
                >
                  {t('popup.country')}
                </label>
                <select
                  id="popup-country"
                  name="country"
                  defaultValue="AE"
                  className="w-full bg-white/5 border-b border-white/20 focus:border-[#c9a86a] outline-none py-2.5 px-3 text-white appearance-none cursor-pointer [&>option]:text-black"
                  style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
                >
                  <option value="AE">{t('popup.countryUAE')}</option>
                  <option value="IN">India</option>
                  <option value="GB">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="PK">Pakistan</option>
                  <option value="SA">Saudi Arabia</option>
                  <option value="QA">Qatar</option>
                  <option value="OM">Oman</option>
                  <option value="KW">Kuwait</option>
                  <option value="BH">Bahrain</option>
                  <option value="EG">Egypt</option>
                  <option value="LB">Lebanon</option>
                  <option value="IQ">Iraq</option>
                  <option value="RU">Russia</option>
                  <option value="CN">China</option>
                </select>
              </div>

              {submitStatus === 'success' && (
                <p className="text-green-500 text-sm text-center font-semibold">
                  {t('popup.success')}
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-500 text-sm text-center font-semibold">
                  {t('popup.error')}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#c9a86a] text-[#1b1c1c] py-4 font-semibold uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-lg disabled:opacity-60"
                style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
              >
                {submitting ? t('popup.submitting') : t('popup.submit')}
              </button>
            </form>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};
