import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTABanner } from "@/components/shared/CTABanner";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageBanner } from "@/components/shared/PageBanner";
import { ServiceSection } from "@/components/services/ServiceSection";
import { getDictionary, isLocale, type Locale } from "@/content";
import { localePath } from "@/lib/i18n";
import { media } from "@/lib/media";
import { breadcrumbJsonLd, buildPageMetadata, faqJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

const serviceMedia = [
  {
    image: media.services.polishing,
    before: media.glassBefore,
    after: media.glassAfter,
    showBeforeAfter: true,
  },
  {
    image: media.services.grinding,
    before: media.glassBefore,
    after: media.glassAfter,
    showBeforeAfter: true,
  },
  {
    image: media.services.film,
    before: media.glassBefore,
    after: media.glassAfter,
    showBeforeAfter: true,
  },
  {
    image: media.services.coating,
    before: media.glassBefore,
    after: media.glassAfter,
    showBeforeAfter: true,
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    title: dict.nav.services,
    description: dict.servicesPage.subtitle,
    path: "/services",
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <JsonLd
        data={[
          faqJsonLd(dict.faqs),
          breadcrumbJsonLd(
            [
              { name: dict.nav.home, path: "/" },
              { name: dict.nav.services, path: "/services" },
            ],
            locale
          ),
        ]}
      />
      <PageBanner
        eyebrow={dict.servicesPage.eyebrow}
        title={dict.servicesPage.title}
        subtitle={dict.servicesPage.subtitle}
        image={media.banners.services}
        imageAlt={dict.mediaAlts.servicesBanner}
        pricing
      />
      {dict.serviceDetails.map((service, i) => {
        const card = dict.serviceCards.find((c) => c.id === service.id);
        const assets = serviceMedia[i];
        return (
          <ServiceSection
            key={service.id}
            service={service}
            whenLabel={dict.common.whenApplies}
            processLabel={dict.common.process}
            beforeLabel={dict.common.before}
            afterLabel={dict.common.after}
            galleryLabel={dict.servicesPage.galleryLabel}
            reverse={i % 2 === 1}
            image={assets.image}
            beforeImage={assets.before}
            afterImage={assets.after}
            showBeforeAfter={assets.showBeforeAfter}
            specs={card?.specs ?? []}
          />
        );
      })}
      <FAQAccordion
        eyebrow={dict.servicesPage.faqEyebrow}
        title={dict.servicesPage.faqTitle}
        items={dict.faqs}
      />
      <CTABanner
        eyebrow={dict.servicesPage.ctaEyebrow}
        title={dict.servicesPage.ctaTitle}
        body={dict.servicesPage.ctaBody}
        ctaLabel={dict.common.contactUs}
        ctaHref={localePath(locale, "/contact")}
        phoneLabel={dict.common.phone}
        whatsappLabel={dict.common.whatsapp}
      />
    </>
  );
}
