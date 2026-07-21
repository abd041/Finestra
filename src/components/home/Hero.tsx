import Link from "next/link";
import type { Locale } from "@/content";
import { localePath } from "@/lib/i18n";
import { media } from "@/lib/media";
import { FadeInItem } from "@/components/motion/FadeInItem";
import { Stagger } from "@/components/motion/Stagger";
import { duration, offset, staggerDelay } from "@/components/motion/tokens";
import { Button } from "@/components/ui/button";
import { HeroVideo } from "./HeroVideo";

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
  imageAlt,
}: Props) {
  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-navy"
      aria-label={label}
    >
      <HeroVideo poster={media.hero} imageAlt={imageAlt} src={media.heroVideo} />

      <div
        className="absolute inset-0 bg-gradient-to-r from-[#070d14]/88 via-[#070d14]/55 to-[#070d14]/15"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#070d14]/80 via-[#070d14]/25 to-[#070d14]/45"
        aria-hidden="true"
      />

      <div className="container relative z-10 flex min-h-[100svh] items-end pb-20 pt-36 md:pb-28">
        <Stagger
          trigger="mount"
          className="max-w-3xl"
          stagger={staggerDelay.loose}
        >
          <FadeInItem distance={offset.sm} durationSec={duration.default}>
            <p className="eyebrow eyebrow-caps !mb-5 !text-white/80">{eyebrow}</p>
          </FadeInItem>
          <FadeInItem distance={offset.default} durationSec={duration.hero}>
            <h1 className="max-w-[14ch] text-[clamp(2.75rem,6.8vw,5.25rem)] leading-[1.02] tracking-[-0.04em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
              {title}
            </h1>
          </FadeInItem>
          <FadeInItem distance={offset.sm} durationSec={duration.default}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
              {subtitle}
            </p>
          </FadeInItem>
          <FadeInItem distance={offset.sm} durationSec={duration.default}>
            <div className="mt-11">
              <Button variant="hero" size="lg" asChild>
                <Link href={localePath(locale, "/contact")}>{cta}</Link>
              </Button>
            </div>
          </FadeInItem>
          <FadeInItem distance={offset.sm} durationSec={duration.fast}>
            <div className="dot-row mt-11 !text-white/75">
              {pills.map((pill) => (
                <span key={pill}>{pill}</span>
              ))}
            </div>
          </FadeInItem>
        </Stagger>
      </div>
    </section>
  );
}
