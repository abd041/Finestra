import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MissionStory } from "@/components/about/MissionStory";
import { FeatureRow } from "@/components/home/ServiceGrid";
import { CTABanner } from "@/components/shared/CTABanner";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageBanner } from "@/components/shared/PageBanner";
import { Reveal } from "@/components/shared/Reveal";
import { Stats } from "@/components/shared/Stats";
import { Testimonials } from "@/components/shared/Testimonials";
import { getDictionary, isLocale, type Locale } from "@/content";
import { localePath } from "@/lib/i18n";
import { media } from "@/lib/media";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    title: dict.nav.about,
    description: dict.aboutPage.subtitle,
    path: "/about",
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const a = dict.aboutPage;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: dict.nav.home, path: "/" },
            { name: dict.nav.about, path: "/about" },
          ],
          locale
        )}
      />
      <PageBanner
        eyebrow={a.eyebrow}
        title={a.title}
        subtitle={a.subtitle}
        image={media.banners.about}
        imageAlt={dict.mediaAlts.aboutBanner}
        pricing
      />

      <MissionStory
        missionEyebrow={a.missionEyebrow}
        missionTitle={a.missionTitle}
        missionBody={a.missionBody}
        storyEyebrow={a.storyEyebrow}
        storyTitle={a.storyTitle}
        storyBody={a.storyBody}
        pills={a.pills}
        imageAlt={dict.mediaAlts.craftsman}
      />

      <Stats eyebrow={dict.home.statsEyebrow} title={dict.home.statsTitle} stats={dict.stats} />

      {/* Single Patrick spotlight (replaces Bluewake multi-person team grid) */}
      <section className="section surface-sand">
        <div className="container">
          <Reveal>
            <div className="section-head max-w-2xl">
              <h2 className="text-[clamp(2.1rem,4vw,3.4rem)] text-ink">{a.spotlightTitle}</h2>
              <p className="mt-5 text-muted-foreground md:text-lg">{a.spotlightBody}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="grid overflow-hidden rounded-[var(--radius-panel)] bg-white shadow-[var(--shadow-md)] lg:grid-cols-[1.1fr_0.9fr]">
              <div className="media-frame relative min-h-[360px] aspect-[4/5] lg:aspect-auto lg:min-h-[520px]">
                <Image
                  src={media.patrick}
                  alt={dict.mediaAlts.founder}
                  fill
                  className="media-zoom object-cover object-top"
                  sizes="(max-width:1024px) 100vw, 55vw"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
                <p className="eyebrow">{a.founderTitle}</p>
                <p className="font-display text-[clamp(2rem,3.5vw,3rem)] text-ink">{a.founderName}</p>
                <p className="mt-2 text-muted-foreground">{a.founderRole}</p>
                <blockquote className="mt-8 border-t border-[var(--line)] pt-8 font-display text-[clamp(1.25rem,2.4vw,1.75rem)] leading-snug text-ink">
                  “{a.founderQuote}”
                </blockquote>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FeatureRow
        eyebrow={a.valuesEyebrow}
        title={a.valuesTitle}
        body={a.valuesBody}
        features={dict.features}
      />

      <Testimonials
        eyebrow={dict.home.testimonialsEyebrow}
        title={dict.home.testimonialsTitle}
        body={dict.home.testimonialsBody}
        items={dict.testimonials}
        groupLabel={dict.a11y.testimonials}
        showLabel={dict.a11y.showTestimonial}
      />

      <CTABanner
        eyebrow={a.ctaEyebrow}
        title={a.ctaTitle}
        body={a.ctaBody}
        ctaLabel={dict.common.contactUs}
        ctaHref={localePath(locale, "/contact")}
        phoneLabel={dict.common.phone}
        whatsappLabel={dict.common.whatsapp}
      />
    </>
  );
}
