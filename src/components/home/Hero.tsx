"use client";

import Link from "next/link";
import type { Locale } from "@/content";
import { localePath } from "@/lib/i18n";
import { media } from "@/lib/media";
import { Button } from "@/components/ui/button";

type Props = {
  locale: Locale;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  pills: string[];
  label: string;
  imageAlt: string;
};

export function Hero({
  locale,
  eyebrow,
  title,
  subtitle,
  cta,
  pills,
  label,
}: Props) {
  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-navy"
      aria-label={label}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={media.hero}
        aria-hidden="true"
      >
        <source src={media.heroVideo} type="video/mp4" />
      </video>

      {/* Strong left scrim so white copy stays readable over bright water/yacht */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#070d14]/88 via-[#070d14]/55 to-[#070d14]/15"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#070d14]/80 via-[#070d14]/25 to-[#070d14]/45"
        aria-hidden="true"
      />

      <div className="container relative z-10 flex min-h-[100svh] items-end pb-20 pt-36 md:pb-28">
        <div className="max-w-3xl">
          <p
            className="eyebrow eyebrow-caps !mb-5 !text-white/80 motion-safe-fade"
            style={{ animationDelay: "40ms" }}
          >
            {eyebrow}
          </p>
          <h1 className="hero-title-mask max-w-[14ch] text-[clamp(2.75rem,6.8vw,5.25rem)] leading-[1.02] tracking-[-0.04em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
            {title}
          </h1>
          <p
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/90 motion-safe-fade md:text-xl [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]"
            style={{ animationDelay: "280ms" }}
          >
            {subtitle}
          </p>
          <div className="mt-11 motion-safe-fade" style={{ animationDelay: "400ms" }}>
            <Button variant="hero" size="lg" asChild>
              <Link href={localePath(locale, "/contact")}>{cta}</Link>
            </Button>
          </div>
          <div
            className="dot-row mt-11 !text-white/75 motion-safe-fade"
            style={{ animationDelay: "520ms" }}
          >
            {pills.map((pill) => (
              <span key={pill}>{pill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
