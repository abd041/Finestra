import Image from "next/image";
import Link from "next/link";
import type { Feature, ServiceCard } from "@/content/types";
import type { Locale } from "@/content";
import { localePath } from "@/lib/i18n";
import { media } from "@/lib/media";
import { Reveal } from "@/components/shared/Reveal";

const featureIcons = [
  <svg key="a" viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
    <path
      d="M12 3v18M8 8.5c0-1.7 1.8-3 4-3s4 1.3 4 3-1.8 3-4 3-4 1.3-4 3 1.8 3 4 3 4-1.3 4-3"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>,
  <svg key="b" viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
    <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.7" />
    <path d="M12 8v4.5l3 1.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>,
  <svg key="c" viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
    <path
      d="M12 3.5 19 7v5.2c0 4.1-2.8 7.8-7 8.8-4.2-1-7-4.7-7-8.8V7l7-3.5Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path
      d="m9.2 12.1 1.9 1.9 3.7-3.8"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  <svg key="d" viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
    <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="M3.8 12h16.4M12 3.8c2.4 2.6 2.4 13.8 0 16.4M12 3.8c-2.4 2.6-2.4 13.8 0 16.4"
      stroke="currentColor"
      strokeWidth="1.7"
    />
  </svg>,
];

type ServiceGridProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  cards: ServiceCard[];
  learnMore: string;
  viewAll: string;
};

export function ServiceGrid({
  locale,
  eyebrow,
  title,
  cards,
  learnMore,
  viewAll,
}: ServiceGridProps) {
  return (
    <section className="section" aria-labelledby="home-services-title">
      <div className="container">
        <Reveal>
          <div className="section-head flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow eyebrow-caps !mb-4">{eyebrow}</p>
              <h2
                id="home-services-title"
                className="max-w-[18ch] text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.02] tracking-[-0.04em] text-ink"
              >
                {title}
              </h2>
            </div>
            <Link
              href={localePath(locale, "/services")}
              className="link-arrow shrink-0 self-start text-[1.02rem] md:self-auto md:pb-1"
            >
              {viewAll}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 md:gap-7 lg:gap-8">
          {cards.map((card, i) => {
            const index = String(i + 1).padStart(2, "0");
            return (
              <Reveal key={card.id} delay={i * 90} variant={i % 2 === 0 ? "left" : "right"}>
                <Link
                  href={localePath(locale, card.href)}
                  className="fleet-card group flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] md:min-h-[340px] md:flex-row"
                >
                  <div className="media-frame relative aspect-[5/4] overflow-hidden md:aspect-auto md:w-[44%] md:shrink-0 md:self-stretch">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      className="media-zoom object-cover"
                      sizes="(max-width:768px) 100vw, 28vw"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-7 md:p-8 lg:p-9">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">
                      {index}
                    </p>
                    <h3 className="mt-3 font-display text-[1.65rem] leading-[1.1] tracking-[-0.03em] text-ink md:text-[1.85rem]">
                      {card.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                      {card.description}
                    </p>

                    <dl className="fleet-specs mt-8 space-y-3.5 border-t border-[var(--line)] pt-6">
                      {card.specs.map((spec) => (
                        <div
                          key={spec.label}
                          className="flex items-baseline justify-between gap-6"
                        >
                          <dt className="shrink-0 text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                            {spec.label}
                          </dt>
                          <dd className="text-right font-display text-[1.05rem] leading-none tracking-[-0.02em] text-ink md:text-[1.125rem]">
                            {spec.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <span className="link-arrow mt-7 text-[0.95rem]">
                      {learnMore}
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
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

  return (
    <section className="section">
      <div className="container">
        <div
          className={`grid items-start gap-12 lg:gap-16 ${
            showFounder ? "lg:grid-cols-[1.05fr_0.95fr]" : ""
          }`}
        >
          <div>
            <Reveal variant="left">
              <p className="eyebrow">{eyebrow}</p>
              <h2 className="max-w-xl text-[clamp(2.1rem,4.2vw,3.6rem)] text-ink">{title}</h2>
              {body && <p className="mt-5 max-w-xl text-muted md:text-lg">{body}</p>}
            </Reveal>
            <div
              className={`mt-10 grid gap-8 sm:grid-cols-2 md:mt-12 ${
                showFounder ? "" : "lg:grid-cols-4"
              }`}
            >
              {features.map((feature, i) => (
                <Reveal key={feature.title} delay={80 + i * 70}>
                  <div className="flex gap-4">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand text-ink">
                      {featureIcons[i]}
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-ink">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{feature.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {showFounder && (
            <Reveal variant="scale" delay={140}>
              <div className="overflow-hidden rounded-[var(--radius-panel)] bg-sand shadow-[var(--shadow-md)]">
                <div className="media-frame relative aspect-[5/4]">
                  <Image
                    src={founderImage || media.craftsman}
                    alt={founderName || ""}
                    fill
                    className="media-zoom object-cover object-top"
                    sizes="(max-width:1024px) 100vw, 45vw"
                  />
                </div>
                <div className="p-8 md:p-10">
                  <blockquote className="font-display text-[clamp(1.3rem,2.5vw,1.85rem)] leading-snug text-ink">
                    “{founderQuote}”
                  </blockquote>
                  <p className="mt-7 font-semibold text-ink">{founderName}</p>
                  {founderRole && <p className="text-sm text-muted">{founderRole}</p>}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
