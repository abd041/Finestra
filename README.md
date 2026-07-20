# Finestra International

Next.js website for Finestra International — glass polishing, grinding, protective film and coating. Design adapted from the Bluewake template style. Dutch (primary) + English.

## Stack

- Next.js (App Router)
- Tailwind CSS
- nodemailer (contact form)
- Vercel-ready

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/nl`.

## Routes

| Path | Page |
|------|------|
| `/nl`, `/en` | Home |
| `/nl/services`, `/en/services` | Services |
| `/nl/projects`, `/en/projects` | Projects gallery |
| `/nl/about`, `/en/about` | About Finestra |
| `/nl/contact`, `/en/contact` | Contact + form |
| `/nl/privacy`, `/en/privacy` | Privacy Policy |
| `/docs/terms.pdf` | Terms & Conditions (shown in footer only when `NEXT_PUBLIC_TERMS_PDF=true`) |

## Content

NL/EN copy lives in `src/content/nl.ts` and `src/content/en.ts`. Update marketing claims, testimonials, and stats with client-approved text before launch.

## Contact form (SMTP)

Required in `.env.local` / Vercel env:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `CONTACT_TO_EMAIL`

Optional public contact channels (omit until confirmed):

- `NEXT_PUBLIC_PHONE_DISPLAY`
- `NEXT_PUBLIC_PHONE_HREF`
- `NEXT_PUBLIC_WHATSAPP_HREF`
- `NEXT_PUBLIC_CONTACT_EMAIL`

## Pre-launch checklist

1. Replace `public/docs/terms.pdf` with the official client PDF, then set `NEXT_PUBLIC_TERMS_PDF=true`
2. Configure SMTP and test `/api/contact`
3. Confirm phone / WhatsApp / email env values
4. Replace low-resolution `patrick-smid.jpg` with a high-res portrait when available
5. Supply real before/after assets for grinding, film, and coating if those sections should show BA pairs

## Out of scope

- CMS / database / admin
- Project detail pages
- Photography / image editing beyond provided assets
- Ongoing maintenance
