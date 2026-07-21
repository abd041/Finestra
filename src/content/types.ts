export type Locale = "nl" | "en";

export type ServiceCard = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  specs: { label: string; value: string }[];
};

export type Feature = {
  title: string;
  description: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type Testimonial = {
  title: string;
  quote: string;
  name: string;
  role: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type ServiceDetail = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  whenApplies: string;
  process: ProcessStep[];
};

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  image: string;
};

export type Dictionary = {
  meta: {
    siteName: string;
    defaultTitle: string;
    defaultDescription: string;
  };
  nav: {
    home: string;
    services: string;
    projects: string;
    about: string;
    contact: string;
    cta: string;
  };
  footer: {
    tagline: string;
    company: string;
    explore: string;
    legal: string;
    terms: string;
    privacy: string;
    rights: string;
  };
  common: {
    learnMore: string;
    contactUs: string;
    phone: string;
    whatsapp: string;
    email: string;
    before: string;
    after: string;
    whenApplies: string;
    process: string;
    openMenu: string;
    closeMenu: string;
    primaryNav: string;
    language: string;
    heroLabel: string;
    compareSlider: string;
    skipToContent: string;
    dragToCompare: string;
  };
  a11y: {
    testimonials: string;
    showTestimonial: string;
    galleryPrev: string;
    galleryNext: string;
    close: string;
  };
  mediaAlts: {
    hero: string;
    founder: string;
    servicesBanner: string;
    projectsBanner: string;
    aboutBanner: string;
    contactBanner: string;
    craftsman: string;
  };
  home: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    heroCta: string;
    heroPills: string[];
    introEyebrow: string;
    introTitle: string;
    introBody: string;
    introBodySecondary: string;
    introLink: string;
    servicesEyebrow: string;
    servicesTitle: string;
    servicesCta: string;
    featuresEyebrow: string;
    featuresTitle: string;
    featuresBody: string;
    founderQuote: string;
    founderName: string;
    founderRole: string;
    statsEyebrow: string;
    statsTitle: string;
    beforeAfterEyebrow: string;
    beforeAfterTitle: string;
    beforeAfterBody: string;
    beforeAfterCta: string;
    testimonialsEyebrow: string;
    testimonialsTitle: string;
    testimonialsBody: string;
    faqEyebrow: string;
    faqTitle: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaBody: string;
  };
  servicesPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    faqEyebrow: string;
    faqTitle: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaBody: string;
    galleryLabel: string;
  };
  projectsPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    galleryEyebrow: string;
    galleryTitle: string;
    galleryBody: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaBody: string;
  };
  aboutPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    missionTitle: string;
    missionBody: string;
    missionEyebrow: string;
    storyTitle: string;
    storyEyebrow: string;
    storyBody: string[];
    pills: string[];
    missionImageAlt: string;
    spotlightTitle: string;
    spotlightBody: string;
    valuesTitle: string;
    valuesBody: string;
    valuesEyebrow: string;
    founderTitle: string;
    founderQuote: string;
    founderName: string;
    founderRole: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaBody: string;
  };
  contactPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    formTitle: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    vessel: string;
    vesselPlaceholder: string;
    service: string;
    servicePlaceholder: string;
    message: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    errorNameRequired: string;
    errorEmailInvalid: string;
    errorMessageRequired: string;
    infoEyebrow: string;
    infoTitle: string;
    infoBody: string;
    addressLabel: string;
    companyLabel: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaBody: string;
  };
  privacyPage: {
    title: string;
    updated: string;
    sections: { heading: string; body: string }[];
  };
  serviceCards: ServiceCard[];
  features: Feature[];
  stats: Stat[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  serviceDetails: ServiceDetail[];
  gallery: GalleryItem[];
};
