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
          className="absolute inset-0 bg-[#070d14]/55"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#070d14]/75 via-[#070d14]/35 to-[#070d14]/40"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(85vh,780px)] w-[min(920px,calc(100%-2rem))] flex-col items-center justify-center py-28 text-center md:py-36 lg:min-h-[680px] lg:py-40">
        {/* Single wrapper — no nested FadeIn (avoids double motion) */}
        <FadeIn
          className="flex w-full flex-col items-center"
          durationSec={duration.medium}
        >
          {eyebrow && (
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
              {eyebrow}
            </p>
          )}
          <h2
            id="cta-banner-title"
            className="mt-5 max-w-[18ch] font-display text-[clamp(2rem,4.5vw,3.35rem)] font-medium leading-[1.1] tracking-[-0.035em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]"
          >
            {title}
          </h2>
          {body && (
            <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-white/90 md:text-lg [text-shadow:0_1px_14px_rgba(0,0,0,0.35)]">
              {body}
            </p>
          )}

          <Button
            asChild
            size="lg"
            className="mt-9 h-12 rounded-full border border-transparent bg-white px-8 text-[0.95rem] font-semibold text-black transition-[background-color,color,border-color,box-shadow] duration-300 hover:border-white hover:bg-white/10 hover:text-white hover:shadow-none"
          >
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/90">
            {siteConfig.hasPhone && (
              <a
                href={siteConfig.phoneHref}
                className="transition hover:text-white"
              >
                <span className="mr-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/75">
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
