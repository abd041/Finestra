import type { Metadata } from "next";
import type { Locale } from "@/content";
import { siteConfig, media } from "@/lib/media";

type PageMetaInput = {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
};

export function buildPageMetadata({
  locale,
  title,
  description,
  path = "",
}: PageMetaInput): Metadata {
  const cleanPath = path.startsWith("/") ? path : path ? `/${path}` : "";
  const url = `${siteConfig.url}/${locale}${cleanPath}`;
  const ogImage = `${siteConfig.url}${media.og}`;
  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: {
        nl: `${siteConfig.url}/nl${cleanPath}`,
        en: `${siteConfig.url}/en${cleanPath}`,
        "x-default": `${siteConfig.url}/nl${cleanPath}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "nl" ? "nl_NL" : "en_GB",
      alternateLocale: locale === "nl" ? ["en_GB"] : ["nl_NL"],
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1536,
          height: 1024,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function organizationJsonLd(description: string, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    ...(siteConfig.hasPhone
      ? { telephone: siteConfig.phoneHref.replace("tel:", "") }
      : {}),
    description,
    areaServed: "Worldwide",
    image: `${siteConfig.url}${media.og}`,
    logo: `${siteConfig.url}${media.og}`,
    inLanguage: locale === "nl" ? "nl-NL" : "en-GB",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addressLine1,
      addressLocality: "Huijbergen",
      postalCode: "4635 SB",
      addressCountry: "NL",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: siteConfig.email,
      ...(siteConfig.hasPhone
        ? { telephone: siteConfig.phoneHref.replace("tel:", "") }
        : {}),
      availableLanguage: ["nl", "en"],
    },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
  locale: Locale
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}/${locale}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
