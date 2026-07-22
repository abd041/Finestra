import Image from "next/image";
import type { ServiceDetail } from "@/content/types";
import { FadeIn } from "@/components/motion/FadeIn";
import { FadeInItem } from "@/components/motion/FadeInItem";
import { Stagger } from "@/components/motion/Stagger";
import { duration, offset, staggerDelay } from "@/components/motion/tokens";

type Spec = { label: string; value: string };

type Props = {
  service: ServiceDetail;
  whenLabel: string;
  processLabel: string;
  beforeLabel: string;
  afterLabel: string;
  galleryLabel: string;
  reverse?: boolean;
  image: string;
  beforeImage: string;
  afterImage: string;
  specs: Spec[];
  showBeforeAfter?: boolean;
};

export function ServiceSection({
  service,
  whenLabel,
  processLabel,
  reverse,
  image,
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  galleryLabel,
  specs,
  showBeforeAfter = true,
}: Props) {
  return (
    <section
      id={service.id}
      className={`section scroll-mt-28 ${reverse ? "surface-sand" : ""}`}
      aria-labelledby={`${service.id}-title`}
    >
      <div className="container">
        <FadeIn distance={offset.sm}>
          <div className="max-w-4xl">
            <p className="eyebrow">{service.tagline}</p>
            <h2 id={`${service.id}-title`} className="text-ink">
              {service.title}
            </h2>
            <dl className="mt-10 grid grid-cols-2 gap-4 border-y border-[var(--line)] py-7 sm:gap-6 md:grid-cols-4 md:gap-8">
              {specs.map((spec) => (
                <div key={spec.label} className="min-w-0">
                  <dt className="type-label text-muted-foreground">
                    {spec.label}
                  </dt>
                  <dd className="type-h3 mt-2 break-words text-ink">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="type-body-lg mt-8 max-w-3xl text-muted-foreground">
              {service.description}
            </p>
          </div>
        </FadeIn>

        <div
          className={`mt-12 grid items-start gap-10 lg:grid-cols-2 lg:gap-14 ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <FadeIn direction="scale" durationSec={duration.medium}>
            <div className="media-frame relative aspect-[4/5] overflow-hidden rounded-[4px] md:aspect-[5/6]">
              <Image
                src={image}
                alt={service.title}
                fill
                className="media-zoom object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>

          <FadeIn distance={offset.sm}>
            <div>
              <p className="type-label text-muted-foreground">
                {processLabel}
              </p>
              <ul className="mt-8 space-y-0 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {service.process.map((step, i) => (
                  <li key={step.title} className="flex gap-5 py-6">
                    <span
                      className="type-small mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="type-h5 text-ink">{step.title}</p>
                      <p className="type-body mt-1.5 text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-[4px] bg-[var(--light-gray)] px-7 py-8 md:px-8">
                <p className="type-label text-muted-foreground">
                  {whenLabel}
                </p>
                <p className="type-body-lg mt-3 text-ink">{service.whenApplies}</p>
              </div>
            </div>
          </FadeIn>
        </div>

        {showBeforeAfter && beforeImage && afterImage && (
          <div className="mt-12 md:mt-14">
            <FadeIn distance={offset.sm}>
              <p className="eyebrow">{galleryLabel}</p>
              <h3 className="max-w-xl text-ink">
                {beforeLabel} &amp; {afterLabel}
              </h3>
            </FadeIn>
            <Stagger
              className="mt-10 grid gap-5 md:grid-cols-2"
              stagger={staggerDelay.default}
            >
              <FadeInItem distance={offset.sm}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] md:aspect-[5/4]">
                  <Image
                    src={beforeImage}
                    alt={`${beforeLabel} — ${service.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                  <span className="type-label absolute left-4 top-4 rounded-full bg-black/90 px-3.5 py-1.5 text-white">
                    {beforeLabel}
                  </span>
                </div>
              </FadeInItem>
              <FadeInItem distance={offset.sm}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] md:aspect-[5/4] md:mt-10">
                  <Image
                    src={afterImage}
                    alt={`${afterLabel} — ${service.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                  <span className="type-label absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-black">
                    {afterLabel}
                  </span>
                </div>
              </FadeInItem>
            </Stagger>
          </div>
        )}
      </div>
    </section>
  );
}
