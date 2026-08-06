# The Canopies at Yas Point / Enre Residence — Luxury Real Estate Landing Page

A bilingual (English / Arabic) luxury real estate landing page for **The Canopies at Yas Point** on Yas Island, Abu Dhabi, built as a Vite + React + TypeScript single-page application with Tailwind CSS.

## Tech Stack

- [Vite 6](https://vite.dev/) — build tool & dev server
- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [React Router 7](https://reactrouter.com/) — routing (`/` and `/ar` for Arabic)
- [EmailJS](https://www.emailjs.com/) — lead-capture form submissions
- [lucide-react](https://lucide.dev/) — icons
- [motion](https://motion.dev/) — animations
- [react-phone-number-input](https://www.npmjs.com/package/react-phone-number-input) — phone field

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:3000)
npm run dev

# Production build (outputs to dist/)
npm run build

# Preview the production build
npm run preview

# Lint / typecheck
npm run lint
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Typecheck with `tsc --noEmit` |
| `npm run clean` | Remove `dist/` and `server.js` |
| `npm run optimize:gallery` | Optimize gallery images (`scripts/optimize-gallery.mjs`) |

## Project Structure

```
src/
├── components/          # Header, Footer, Hero, WhatsApp button, scroll-to-top
├── context/
│   └── LanguageContext.tsx  # EN/AR language & RTL/LTR direction provider
├── pages/
│   └── HomePage.tsx         # Single landing page (English + Arabic routes)
├── services/
│   └── emailjs.ts           # EmailJS lead-capture integration
├── translations.ts          # All EN/AR copy
├── App.tsx                  # Router, language provider, layout
└── main.tsx                 # App entry point
```

## Customization

- **Copy & translations**: edit `src/translations.ts` (EN and AR blocks).
- **Phone number**: displayed via `nav.phone` and `footer.phone` in `src/translations.ts`; `tel:` and WhatsApp (`wa.me`) links live in `src/components/Header.tsx`, `src/components/Footer.tsx`, and `src/components/WhatsAppButton.tsx`.
- **Email / EmailJS**: lead forms send via EmailJS using the service/template IDs in `src/services/emailjs.ts`.
- **SEO & meta tags**: `index.html`.
- **Branding assets**: `assets/logo-white.png`, `assets/logo-black.png`, brochures/floor-plan PDFs in `assets/`.

## Deployment

Deployed on Vercel — see `vercel.json` (Vite framework preset, build output `dist/`). Any static host works since it's a client-rendered SPA.
