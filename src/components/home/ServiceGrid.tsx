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
 * Bluewake boat-card grid: #f8f8f8, 4px radius, 20px pad/gap, 3-col → stack ≤991
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
    <section className="section bg-white" aria-labelledby="home-services-title">
      <div className="container">
        <FadeIn distance={offset.sm}>
          <div className="max-w-[34rem]">
            <p className="type-label text-black">{eyebrow}</p>
            <h2 id="home-services-title" className="mt-4 text-black">
              {title}
            </h2>
            <Button asChild className="mt-8">
              <Link href={localePath(locale, "/services")}>{viewAll}</Link>
            </Button>
          </div>
        </FadeIn>

        <Stagger
          className="mt-10 grid grid-cols-1 items-stretch gap-5 max-[991px]:grid-cols-1 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3"
          stagger={staggerDelay.default}
        >
          {cards.map((card) => (
            <FadeInItem
              key={card.id}
              className="flex h-full"
              distance={offset.default}
            >
              <Card className="flex h-full w-full flex-col gap-0 overflow-hidden rounded-[4px] border-0 bg-[var(--light-gray)] p-5 py-5 shadow-none ring-0">
                <div className="group relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[4px] bg-[var(--gray)]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 45vw, 380px"
                  />
                </div>

                <CardContent className="mt-5 flex flex-1 flex-col gap-[30px] p-0">
                  <div>
                    <h3 className="text-black capitalize">{card.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {card.specs.map((spec) => (
                        <Badge
                          key={`${spec.label}-${spec.value}`}
                          className="type-badge h-auto rounded-[50px] border-0 bg-[var(--gray)] px-3 py-[5px] text-black hover:bg-[var(--gray)]"
                        >
                          {spec.value}
                        </Badge>
                      ))}
                    </div>
                    <p className="type-body mt-4 text-[var(--paragraph)]">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <Button asChild>
                      <Link href={localePath(locale, card.href)}>
                        {learnMore}
                      </Link>
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

/** Bluewake founder / values split */
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
  const list = showFounder ? features.slice(0, 3) : features;

  return (
    <section className="section bg-white">
      <div className="container">
        <div
          className={`grid items-stretch gap-[60px] lg:gap-[100px] ${
            showFounder ? "lg:grid-cols-[1fr_1.05fr]" : ""
          }`}
        >
          <div className="flex flex-col justify-center">
            <FadeIn direction="left" distance={offset.lateral}>
              <p className="type-label text-black">{eyebrow}</p>
              <h2 className="mt-4 max-w-[18ch] text-black">{title}</h2>
              {body && (
                <p className="type-body-lg mt-5 max-w-md text-[var(--paragraph)]">
                  {body}
                </p>
              )}
            </FadeIn>

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
                    <Separator className="bg-[var(--borders)]" />
                    <div className="py-6">
                      <h3 className="type-h5 text-black">{feature.title}</h3>
                      <p className="type-body mt-2 max-w-md text-[var(--paragraph)]">
                        {feature.description}
                      </p>
                    </div>
                    {i === list.length - 1 && (
                      <Separator className="bg-[var(--borders)]" />
                    )}
                  </div>
                </FadeInItem>
              ))}
            </Stagger>
          </div>

          {showFounder && (
            <FadeIn
              direction="scale"
              durationSec={duration.slow}
              className="h-full min-h-[480px] lg:min-h-0"
            >
              <div className="group relative h-full min-h-[520px] overflow-hidden rounded-[4px] lg:min-h-full">
                <Image
                  src={founderImage || media.craftsman}
                  alt={founderName || "Founder"}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0 bg-[var(--black-20)]"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"
                  aria-hidden="true"
                />

                <div className="absolute inset-0 flex flex-col justify-between p-[30px] text-white">
                  <div>
                    <p className="type-h3">{founderName}</p>
                    {founderRole && (
                      <p className="type-label mt-1.5 text-white/70">
                        {founderRole}
                      </p>
                    )}
                  </div>

                  <blockquote className="type-h4 max-w-[28ch] text-white">
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
