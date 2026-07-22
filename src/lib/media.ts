export const media = {
  hero: "/images/hero-yacht.jpg",
  heroVideo: "/hero-video.mp4",
  patrick: "/images/patrick-smid.jpg",
  craftsman: "/images/craftsman-work.jpg",
  cta: "/images/cta-restore.jpg",
  glassBefore: "/images/glass-before.jpg",
  glassAfter: "/images/glass-after.jpg",
  og: "/images/og-share.jpg",
  services: {
    polishing: "/images/service-polish.jpg",
    grinding: "/images/service-grinding.jpg",
    film: "/images/service-film.jpg",
    coating: "/images/service-coating.jpg",
  },
  banners: {
    services: "/images/banner-yacht.jpg",
    projects: "/images/projects-hero.jpg",
    about: "/images/craftsman-work.jpg",
    contact: "/images/hero-yacht.jpg",
  },
} as const;

const phoneDisplay = process.env.NEXT_PUBLIC_PHONE_DISPLAY?.trim() || "";
const phoneHref = process.env.NEXT_PUBLIC_PHONE_HREF?.trim() || "";
const whatsappHref = process.env.NEXT_PUBLIC_WHATSAPP_HREF?.trim() || "";
const termsEnabled = process.env.NEXT_PUBLIC_TERMS_PDF === "true";

export const siteConfig = {
  name: "Finestra International",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://finestra-international.com",
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@finestra-international.nl",
  phoneDisplay,
  phoneHref,
  whatsappHref,
  hasPhone: Boolean(phoneHref && phoneDisplay),
  hasWhatsapp: Boolean(whatsappHref),
  hasTerms: termsEnabled,
  addressLine1: "Groenendries 45",
  addressLine2: "4635 SB Huijbergen",
  country: "The Netherlands",
  kvk: "60485418",
  btw: "NL126798230B01",
};
