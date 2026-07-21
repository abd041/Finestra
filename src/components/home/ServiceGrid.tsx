import Image from "next/image";
import Link from "next/link";
import type { Feature, ServiceCard } from "@/content/types";
import type { Locale } from "@/content";
import { localePath } from "@/lib/i18n";
import { media } from "@/lib/media";
import { FadeIn } from "@/components/motion/FadeIn";
import { FadeInItem } from "@/components/motion/FadeInItem";
import { Stagger } from "@/components/motion/Stagger";
import { duration, offset, staggerDelay } from "@/components/motion/tokens";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type ServiceGridProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  cards: ServiceCard[];
  learnMore: string;
  viewAll: string;
};

/**
 * Bluewake "Discover Our Boats" card pattern — matched to template:
 * stacked header (eyebrow → title → black CTA) + 3-col grid (4th wraps).
 */
export function ServiceGrid({
  locale,
  eyebrow,
  title,
  cards,
  learnMore,
  viewAll,
}: ServiceGridProps) {
  return (
    <section
      className="bg-white py-[clamp(4.5rem,8vw,7rem)]"
      aria-labelledby="home-services-title"
    >
      <div className="mx-auto w-[min(1240px,calc(100%-2rem))] md:w-[min(1240px,calc(100%-3.5rem))]">
        {/* Header — left stacked exactly like Bluewake */}
        <FadeIn distance={offset.sm}>
          <div className="max-w-[34rem]">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink">
              {eyebrow}
            </p>
            <h2
              id="home-services-title"
              className="mt-4 font-display text-[clamp(2.5rem,5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.035em] text-ink"
            >
              {title}
            </h2>
            <Button
              asChild
              className="mt-8 h-11 rounded-full bg-black px-7 text-[0.92rem] font-semibold text-white hover:bg-black/90"
            >
              <Link href={localePath(locale, "/services")}>{viewAll}</Link>
            </Button>
          </div>
        </FadeIn>

        {/* 3 cards / row · 4th on next row */}
        <Stagger
          className="mt-10 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-8"
          stagger={staggerDelay.default}
        >
          {cards.map((card) => (
            <FadeInItem key={card.id} className="flex h-full" distance={offset.default}>
              <Card className="flex h-full w-full flex-col gap-0 overflow-hidden rounded-[8px] border-0 bg-[#f2f2f2] py-0 shadow-none ring-0">
                {/* Image flush — no top / left / right spacing */}
                <div className="group relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#eaeaea]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 45vw, 380px"
                  />
                </div>

                {/* Content keeps side + bottom padding */}
                <CardContent className="flex flex-1 flex-col px-6 pb-6 pt-6 md:px-8 md:pb-8 md:pt-7">
                  <h3 className="shrink-0 font-display text-[1.55rem] font-medium leading-tight tracking-[-0.03em] text-ink md:text-[1.7rem]">
                    {card.title}
                  </h3>

                  <div className="mt-3 flex shrink-0 flex-wrap gap-2 md:mt-3.5">
                    {card.specs.map((spec) => (
                      <Badge
                        key={`${spec.label}-${spec.value}`}
                        className="h-7 rounded-full border-0 bg-[#e4e4e4] px-3 text-[0.74rem] font-medium text-[#333] hover:bg-[#e4e4e4]"
                      >
                        {spec.value}
                      </Badge>
                    ))}
                  </div>

                  <p className="mt-4 shrink-0 text-[0.95rem] leading-[1.65] text-[#666] md:mt-5">
                    {card.description}
                  </p>

                  <div className="mt-auto pt-8">
                    <Button
                      asChild
                      className="h-10 rounded-full border border-transparent bg-black px-5 text-[0.875rem] font-semibold text-white transition-[background-color,color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-black hover:bg-[#f4f4f4] hover:text-black hover:shadow-none"
                    >
                      <Link href={localePath(locale, card.href)}>{learnMore}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </FadeInItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

type FeatureRowProps = {
  eyebrow: string;
  title: string;
  body?: string;
  features: Feature[];
  founderQuote?: string;
  founderName?: string;
  founderRole?: string;
  founderImage?: string;
};

/**
 * Bluewake Founder section pattern:
 * left — eyebrow, title, body, vertical feature list with hairline dividers
 * right — full-bleed portrait with name/role + quote overlay
 */
export function FeatureRow({
  eyebrow,
  title,
  body,
  features,
  founderQuote,
  founderName,
  founderRole,
  founderImage,
}: FeatureRowProps) {
  const showFounder = Boolean(founderQuote && founderName);
  // Bluewake shows 3 value rows beside the founder panel
  const list = showFounder ? features.slice(0, 3) : features;

  return (
    <section className="bg-white py-[clamp(4.5rem,8vw,7rem)]">
      <div className="mx-auto w-[min(1240px,calc(100%-2rem))] md:w-[min(1240px,calc(100%-3.5rem))]">
        <div
          className={`grid items-stretch gap-12 lg:gap-16 xl:gap-20 ${
            showFounder ? "lg:grid-cols-[1fr_1.05fr]" : ""
          }`}
        >
          {/* Left column */}
          <div className="flex flex-col justify-center">
            <FadeIn direction="left" distance={offset.lateral}>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink">
                {eyebrow}
              </p>
              <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(1.85rem,3.2vw,2.65rem)] font-medium leading-[1.12] tracking-[-0.03em] text-ink">
                {title}
              </h2>
              {body && (
                <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-[#666] md:mt-6 md:text-lg">
                  {body}
                </p>
              )}
            </FadeIn>

            {/* Vertical feature list + hairline dividers (Bluewake) */}
            <Stagger
              as="ul"
              className="mt-10 md:mt-12"
              stagger={staggerDelay.default}
            >
              {list.map((feature, i) => (
                <FadeInItem
                  key={feature.title}
                  as="li"
                  distance={offset.sm}
                  durationSec={duration.fast}
                >
                  <div>
                    <Separator className="bg-[#e5e5e5]" />
                    <div className="py-6">
                      <h3 className="font-display text-[1.25rem] font-medium tracking-[-0.02em] text-ink md:text-[1.35rem]">
                        {feature.title}
                      </h3>
                      <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-[#666]">
                        {feature.description}
                      </p>
                    </div>
                    {i === list.length - 1 && <Separator className="bg-[#e5e5e5]" />}
                  </div>
                </FadeInItem>
              ))}
            </Stagger>
          </div>

          {/* Right — full-bleed founder panel */}
          {showFounder && (
            <FadeIn
              direction="scale"
              durationSec={duration.slow}
              className="h-full min-h-[480px] lg:min-h-0"
            >
              <div className="group relative h-full min-h-[520px] overflow-hidden rounded-[8px] lg:min-h-full">
                <Image
                  src={founderImage || media.craftsman}
                  alt={founderName || "Founder"}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                {/* Bluewake-style left scrim for white type */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/88 via-[#0a1628]/45 to-transparent"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/75 via-transparent to-[#0a1628]/25"
                  aria-hidden="true"
                />

                <div className="absolute inset-0 flex flex-col justify-between p-7 text-white md:p-9 lg:p-10">
                  <div>
                    <p className="font-display text-[1.65rem] font-medium tracking-[-0.03em] md:text-[1.85rem]">
                      {founderName}
                    </p>
                    {founderRole && (
                      <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/70">
                        {founderRole}
                      </p>
                    )}
                    {/* Signature-style accent */}
                    <svg
                      className="mt-5 h-8 w-28 text-white/90"
                      viewBox="0 0 120 32"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 22c12-14 28-18 42-10 8 4.5 14 8 22 7 10-1 18-8 28-12 6-2.5 14-4 20-2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M18 26c8-3 16-2 22 1"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        opacity="0.7"
                      />
                    </svg>
                  </div>

                  <blockquote className="max-w-[28ch] font-display text-[clamp(1.25rem,2.4vw,1.75rem)] font-medium leading-[1.35] tracking-[-0.02em] text-white">
                    “{founderQuote}”
                  </blockquote>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
