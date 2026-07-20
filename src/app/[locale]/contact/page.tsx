import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact/ContactForm";
import { CTABanner } from "@/components/shared/CTABanner";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageBanner } from "@/components/shared/PageBanner";
import { Reveal } from "@/components/shared/Reveal";
import { getDictionary, isLocale, type Locale } from "@/content";
import { media, siteConfig } from "@/lib/media";
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
    title: dict.nav.contact,
    description: dict.contactPage.subtitle,
    path: "/contact",
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const c = dict.contactPage;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: dict.nav.home, path: "/" },
            { name: dict.nav.contact, path: "/contact" },
          ],
          locale
        )}
      />
      <PageBanner
        eyebrow={c.eyebrow}
        title={c.title}
        subtitle={c.subtitle}
        image={media.banners.contact}
        imageAlt={dict.mediaAlts.contactBanner}
        pricing
      />

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div>
              <h2 className="text-[clamp(2rem,3.5vw,3rem)] text-ink">{c.infoTitle}</h2>
              <p className="mt-5 max-w-md text-muted md:text-lg">{c.infoBody}</p>

              <div className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {siteConfig.hasPhone && (
                  <a href={siteConfig.phoneHref} className="block py-6 transition hover:opacity-70">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      {dict.common.phone}
                    </p>
                    <p className="mt-2 font-display text-2xl text-ink">{siteConfig.phoneDisplay}</p>
                  </a>
                )}
                {siteConfig.hasWhatsapp && (
                  <a
                    href={siteConfig.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="block py-6 transition hover:opacity-70"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      {dict.common.whatsapp}
                    </p>
                    <p className="mt-2 font-display text-2xl text-ink">
                      {siteConfig.hasPhone ? siteConfig.phoneDisplay : dict.common.whatsapp}
                    </p>
                  </a>
                )}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="block py-6 transition hover:opacity-70"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    {dict.common.email}
                  </p>
                  <p className="mt-2 font-display text-xl text-ink md:text-2xl">{siteConfig.email}</p>
                </a>
                <div className="py-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    {c.addressLabel}
                  </p>
                  <p className="mt-3 font-semibold text-ink">Patrick Smid</p>
                  <p className="mt-1 text-muted">{siteConfig.addressLine1}</p>
                  <p className="text-muted">{siteConfig.addressLine2}</p>
                  <p className="text-muted">{siteConfig.country}</p>
                </div>
                <div className="py-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    {c.companyLabel}
                  </p>
                  <p className="mt-3 text-muted">KvK {siteConfig.kvk}</p>
                  <p className="text-muted">BTW {siteConfig.btw}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ContactForm locale={locale} dict={dict} />
          </Reveal>
        </div>
      </section>

      <CTABanner
        eyebrow={c.ctaEyebrow}
        title={c.ctaTitle}
        body={c.ctaBody}
        ctaLabel={dict.common.contactUs}
        ctaHref="#enquiry"
        phoneLabel={dict.common.phone}
        whatsappLabel={dict.common.whatsapp}
      />
    </>
  );
}
