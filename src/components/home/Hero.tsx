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

/** Full-viewport hero — video fills the screen below the framed header */
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
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[var(--light-gray)] px-2 pt-2"
      aria-label={label}
    >
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-[4px]">
        <HeroVideo
          poster={media.hero}
          imageAlt={imageAlt}
          src={media.heroVideo}
        />

        {/* Bluewake .black-overlay ≈ #0003 */}
        <div
          className="absolute inset-0 bg-[var(--black-20)]"
          aria-hidden="true"
        />

        <div className="container relative z-10 flex flex-1 items-end px-[15px] pb-10 pt-28 min-[1280px]:pb-20 min-[1920px]:px-40">
          <Stagger
            trigger="mount"
            className="max-w-3xl"
            stagger={staggerDelay.loose}
          >
            <FadeInItem distance={offset.sm} durationSec={duration.default}>
              <p className="eyebrow eyebrow-caps !mb-4 !text-white">{eyebrow}</p>
            </FadeInItem>
            <FadeInItem distance={offset.default} durationSec={duration.hero}>
              <h1 className="max-w-[14ch] text-white">{title}</h1>
            </FadeInItem>
            <FadeInItem distance={offset.sm} durationSec={duration.default}>
              <p className="type-body-lg mt-5 max-w-xl text-white/90">
                {subtitle}
              </p>
            </FadeInItem>
            <FadeInItem distance={offset.sm} durationSec={duration.default}>
              <div className="mt-8">
                <Button variant="secondary" asChild>
                  <Link href={localePath(locale, "/contact")}>{cta}</Link>
                </Button>
              </div>
            </FadeInItem>
            <FadeInItem distance={offset.sm} durationSec={duration.fast}>
              <div className="dot-row mt-8 !text-white/80">
                {pills.map((pill) => (
                  <span key={pill}>{pill}</span>
                ))}
              </div>
            </FadeInItem>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
