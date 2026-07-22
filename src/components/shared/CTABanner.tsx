import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { duration } from "@/components/motion/tokens";
import { media, siteConfig } from "@/lib/media";
import { Button } from "@/components/ui/button";

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

/**
 * Bluewake "Ready to make waves" CTA — full-bleed image,
 * centered white copy, white pill button.
 */
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
    <section
      className="relative isolate overflow-hidden"
      aria-labelledby="cta-banner-title"
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
        <div
          className="absolute inset-0 bg-black/55"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/35"
          aria-hidden="true"
        />
      </div>

      <div className="container relative z-10 flex min-h-[min(85vh,780px)] flex-col items-center justify-center py-28 text-center md:py-36 lg:min-h-[680px] lg:py-40">
        {/* Single wrapper — no nested FadeIn (avoids double motion) */}
        <FadeIn
          className="flex w-full max-w-[920px] flex-col items-center rounded-[4px] px-4 py-10 md:px-8 md:py-12"
          durationSec={duration.medium}
        >
          {eyebrow && (
            <p className="type-label text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
              {eyebrow}
            </p>
          )}
          <h2
            id="cta-banner-title"
            className="mt-5 max-w-[18ch] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]"
          >
            {title}
          </h2>
          {body && (
            <p className="type-body-lg mt-5 max-w-xl text-white/90 [text-shadow:0_1px_14px_rgba(0,0,0,0.35)]">
              {body}
            </p>
          )}

          <Button
            asChild
            variant="secondary"
            className="mt-9"
          >
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>

          <div className="type-small mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-white/90">
            {siteConfig.hasPhone && (
              <a
                href={siteConfig.phoneHref}
                className="transition hover:text-white"
              >
                <span className="type-label mr-2 text-white/75">
                  {phoneLabel}
                </span>
                {siteConfig.phoneDisplay}
              </a>
            )}
            {siteConfig.hasWhatsapp && (
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                {whatsappLabel}
              </a>
            )}
            <a
              href={`mailto:${siteConfig.email}`}
              className="transition hover:text-white"
            >
              {siteConfig.email}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
