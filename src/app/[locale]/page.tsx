import { notFound } from "next/navigation";
import { BeforeAfter } from "@/components/shared/BeforeAfter";
import { CTABanner } from "@/components/shared/CTABanner";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { JsonLd } from "@/components/shared/JsonLd";
import { Stats } from "@/components/shared/Stats";
import { Testimonials } from "@/components/shared/Testimonials";
import { FeatureRow, ServiceGrid } from "@/components/home/ServiceGrid";
import { Hero } from "@/components/home/Hero";
import { IntroSplit } from "@/components/home/IntroSplit";
import { getDictionary, isLocale, type Locale } from "@/content";
import { localePath } from "@/lib/i18n";
import { media } from "@/lib/media";
import { faqJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <JsonLd data={faqJsonLd(dict.faqs)} />
      <Hero
        locale={locale}
        eyebrow={dict.home.heroEyebrow}
        title={dict.home.heroTitle}
        subtitle={dict.home.heroSubtitle}
        cta={dict.home.heroCta}
        pills={dict.home.heroPills}
        label={dict.common.heroLabel}
        imageAlt={dict.mediaAlts.hero}
      />
      <IntroSplit
        locale={locale}
        eyebrow={dict.home.introEyebrow}
        title={dict.home.introTitle}
        body={dict.home.introBody}
        bodySecondary={dict.home.introBodySecondary}
        linkLabel={dict.home.introLink}
        founderTitle={dict.aboutPage.founderTitle}
        founderName={dict.home.founderName}
        siteName={dict.meta.siteName}
        imageAlt={dict.mediaAlts.founder}
      />
      <ServiceGrid
        locale={locale}
        eyebrow={dict.home.servicesEyebrow}
        title={dict.home.servicesTitle}
        cards={dict.serviceCards}
        learnMore={dict.common.learnMore}
        viewAll={dict.home.servicesCta}
      />
      <FeatureRow
        eyebrow={dict.home.featuresEyebrow}
        title={dict.home.featuresTitle}
        body={dict.home.featuresBody}
        features={dict.features}
        founderQuote={dict.home.founderQuote}
        founderName={dict.home.founderName}
        founderRole={dict.home.founderRole}
        founderImage={media.patrick}
      />
      <Stats eyebrow={dict.home.statsEyebrow} title={dict.home.statsTitle} stats={dict.stats} />
      <BeforeAfter
        eyebrow={dict.home.beforeAfterEyebrow}
        title={dict.home.beforeAfterTitle}
        body={dict.home.beforeAfterBody}
        beforeLabel={dict.common.before}
        afterLabel={dict.common.after}
        beforeImage={media.glassBefore}
        afterImage={media.glassAfter}
        sliderLabel={dict.common.compareSlider}
        dragHint={dict.common.dragToCompare}
        ctaLabel={dict.home.beforeAfterCta}
        ctaHref={localePath(locale, "/projects")}
      />
      <Testimonials
        eyebrow={dict.home.testimonialsEyebrow}
        title={dict.home.testimonialsTitle}
        body={dict.home.testimonialsBody}
        items={dict.testimonials}
        groupLabel={dict.a11y.testimonials}
      />
      <FAQAccordion eyebrow={dict.home.faqEyebrow} title={dict.home.faqTitle} items={dict.faqs} />
      <CTABanner
        eyebrow={dict.home.ctaEyebrow}
        title={dict.home.ctaTitle}
        body={dict.home.ctaBody}
        ctaLabel={dict.common.contactUs}
        ctaHref={localePath(locale, "/contact")}
        phoneLabel={dict.common.phone}
        whatsappLabel={dict.common.whatsapp}
      />
    </>
  );
}
