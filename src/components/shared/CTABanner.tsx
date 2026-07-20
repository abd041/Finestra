import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { media, siteConfig } from "@/lib/media";

type Props = {
  eyebrow?: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  phoneLabel: string;
  whatsappLabel: string;
  image?: string;
  imageAlt?: string;
};

export function CTABanner({
  eyebrow,
  title,
  body,
  ctaLabel,
  ctaHref,
  phoneLabel,
  whatsappLabel,
  image = media.cta,
  imageAlt = "Crystal-clear restored yacht glass",
}: Props) {
  return (
    <section className="section" aria-labelledby="cta-banner-title">
      <div className="container">
        <div className="relative overflow-hidden rounded-[var(--radius-panel)] shadow-[var(--shadow-lg)] lg:grid lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal variant="scale" className="relative min-h-[280px] surface-dark sm:min-h-[340px] lg:min-h-[480px]">
            <div className="media-frame absolute inset-0 overflow-hidden">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="cta-kenburns object-cover"
                sizes="(max-width:1024px) 100vw, 55vw"
                quality={85}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-navy/20 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent" />
          </Reveal>

          <Reveal variant="right" delay={120}>
            <div className="relative flex h-full flex-col justify-center bg-white px-8 py-12 md:px-12 md:py-16 lg:px-14 lg:py-20">
              {eyebrow && <p className="eyebrow eyebrow-caps !mb-4">{eyebrow}</p>}
              <h2
                id="cta-banner-title"
                className="max-w-[14ch] text-[clamp(2.15rem,3.8vw,3.35rem)] leading-[1.05] tracking-[-0.04em] text-ink"
              >
                {title}
              </h2>
              <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-muted md:text-lg">
                {body}
              </p>

              <div className="mt-10 flex flex-col gap-4">
                <Link href={ctaHref} className="btn btn-dark w-full sm:w-auto sm:self-start">
                  {ctaLabel}
                  <span aria-hidden="true">→</span>
                </Link>

                <div className="flex flex-col gap-2.5 border-t border-[var(--line)] pt-6">
                  {siteConfig.hasPhone && (
                    <a
                      href={siteConfig.phoneHref}
                      className="group inline-flex items-baseline gap-2 text-ink transition hover:opacity-70"
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                        {phoneLabel}
                      </span>
                      <span className="font-display text-xl tracking-[-0.02em] md:text-2xl">
                        {siteConfig.phoneDisplay}
                      </span>
                    </a>
                  )}
                  {siteConfig.hasWhatsapp && (
                    <a
                      href={siteConfig.whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="link-arrow text-[0.98rem]"
                    >
                      {whatsappLabel}
                      <span aria-hidden="true">→</span>
                    </a>
                  )}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm text-muted transition hover:text-ink"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
