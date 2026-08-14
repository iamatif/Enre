import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { sendLeadEmail } from "../services/leadService";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import popupImage from "../../assets/the-grove/VILLA - T5A_Closeup 02_2.jpg.webp";
import { X } from "lucide-react";
import { useSlideModal } from "../utils/useSlideModal";

interface DownloadModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  fileUrl: string;
  fileName: string;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  open,
  onClose,
  title,
  subtitle,
  fileUrl,
  fileName,
}) => {
  const { t } = useLanguage();
  const [phoneValue, setPhoneValue] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { render, translate, transition, overlayVisible } = useSlideModal(open);

  if (!render) return null;

  const startDownload = () => {
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = fileName;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitStatus('idle');
    const f = e.currentTarget.elements as HTMLFormControlsCollection & {
      name: HTMLInputElement;
      email: HTMLInputElement;
      country: HTMLSelectElement;
    };
    startDownload();
    try {
      await sendLeadEmail({
        firstName: f.name.value,
        lastName: '',
        email: f.email.value,
        phone: phoneValue ?? '',
        city: f.country.value,
        reason: `Download: ${fileName}`,
        consentUpdates: true,
        consentPrivacy: true,
        type: fileName.includes('Floor') ? 'Floor Plan Download' : 'Brochure Download',
      });
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80]" aria-modal="true" role="dialog">
      <div
        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-[550ms] ${
          overlayVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-4xl bg-[#1b1c1c] shadow-2xl overflow-y-auto transition-transform will-change-transform ${transition} ${translate}`}
          dir="ltr"
        >
          <button
            onClick={onClose}
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
                  {title}
                </p>
              </div>
            </div>

            <div className="p-6 md:p-10">
            <span
              className="font-semibold text-[#c9a86a] uppercase tracking-[0.25em] block mb-2"
              style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
            >
              {t('popup.badge')}
            </span>
            <h3
              className="text-white font-serif-headline leading-snug"
              style={{ fontSize: "clamp(1.375rem, 1rem + 1.25vw, 1.875rem)" }}
            >
              {title}
            </h3>
            <p
              className="text-white/60 leading-relaxed mt-2 mb-8"
              style={{ fontSize: "clamp(0.8125rem, 0.75rem + 0.2vw, 0.875rem)" }}
            >
              {subtitle}
            </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="download-name"
                className="text-[10px] font-semibold uppercase text-[#c9a86a] tracking-widest block"
              >
                {t('popup.name')}
              </label>
              <input
                id="download-name"
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
                htmlFor="download-email"
                className="text-[10px] font-semibold uppercase text-[#c9a86a] tracking-widest block"
              >
                {t('popup.email')}
              </label>
              <input
                id="download-email"
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
                htmlFor="download-phone"
                className="text-[10px] font-semibold uppercase text-[#c9a86a] tracking-widest block"
              >
                {t('popup.phone')}
              </label>
              <PhoneInput
                id="download-phone"
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
                htmlFor="download-country"
                className="text-[10px] font-semibold uppercase text-[#c9a86a] tracking-widest block"
              >
                {t('popup.country')}
              </label>
              <select
                id="download-country"
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
              {submitting ? t('popup.submitting') : t('download.submit')}
            </button>
          </form>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};
