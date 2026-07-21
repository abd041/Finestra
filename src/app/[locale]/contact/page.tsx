import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { MapPin, Smartphone, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { CTABanner } from "@/components/shared/CTABanner";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageBanner } from "@/components/shared/PageBanner";
import { FadeIn } from "@/components/motion/FadeIn";
import { offset } from "@/components/motion/tokens";
import { getDictionary, isLocale, type Locale } from "@/content";
import { media, siteConfig } from "@/lib/media";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

function ContactRow({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <li className="flex items-center gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#ececec] text-[#111]">
        <Icon className="size-[18px]" strokeWidth={1.6} aria-hidden="true" />
      </span>
      <div className="min-w-0 text-[0.95rem] leading-snug text-[#111]">
        {children}
      </div>
    </li>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    title: dict.meta.contactTitle,
    description: dict.meta.contactDescription,
    path: "/contact",
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const c = dict.contactPage;

  const address = [
    siteConfig.addressLine1,
    siteConfig.addressLine2,
    siteConfig.country,
  ].join(", ");

  const phoneHref = siteConfig.hasPhone
    ? siteConfig.phoneHref
    : siteConfig.hasWhatsapp
      ? siteConfig.whatsappHref
      : undefined;
  const phoneLabel = siteConfig.hasPhone
    ? siteConfig.phoneDisplay
    : siteConfig.hasWhatsapp
      ? dict.common.whatsapp
      : null;

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

      <section className="bg-white py-20 md:py-28">
        <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <FadeIn direction="left" distance={offset.lateral}>
            <div className="max-w-[28rem]">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-[#111]">
                {c.infoEyebrow}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2.15rem,4vw,3.35rem)] font-medium leading-[1.1] tracking-[-0.03em] text-[#111]">
                {c.infoTitle}
              </h2>

              <ul className="mt-14 space-y-5 md:mt-16">
                <ContactRow icon={MapPin}>{address}</ContactRow>

                {phoneLabel && phoneHref && (
                  <ContactRow icon={Smartphone}>
                    <a
                      href={phoneHref}
                      {...(!siteConfig.hasPhone
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      className="transition hover:opacity-70"
                    >
                      {phoneLabel}
                    </a>
                  </ContactRow>
                )}

                <ContactRow icon={Mail}>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="transition hover:opacity-70"
                  >
                    {siteConfig.email}
                  </a>
                </ContactRow>
              </ul>
            </div>
          </FadeIn>

          <FadeIn direction="right" distance={offset.lateral}>
            <ContactForm locale={locale} dict={dict} />
          </FadeIn>
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
