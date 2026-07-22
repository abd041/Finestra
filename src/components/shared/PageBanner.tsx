import Image from "next/image";
import { FadeInItem } from "@/components/motion/FadeInItem";
import { Stagger } from "@/components/motion/Stagger";
import { duration, offset, staggerDelay } from "@/components/motion/tokens";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
  compact?: boolean;
  /** Pricing-style taller banner with larger type (Bluewake pricing) */
  pricing?: boolean;
  priority?: boolean;
};

export function PageBanner({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  compact,
  pricing,
  priority = true,
}: Props) {
  const minHeight = pricing
    ? "min-h-[72vh] md:min-h-[78vh]"
    : compact
      ? "min-h-[48vh]"
      : "min-h-[62vh]";

  return (
    <section
      className={`relative flex items-end overflow-hidden surface-dark ${minHeight}`}
      aria-label={title}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority={priority}
        sizes="100vw"
        className="banner-kenburns object-cover object-center"
        quality={80}
      />
      <div
        className={`absolute inset-0 ${
          pricing
            ? "bg-gradient-to-r from-black/55 via-black/20 to-transparent"
            : "bg-gradient-to-r from-black/55 via-black/25 to-black/20"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
      <div className="container relative z-10 pt-36 pb-12 md:pb-16">
        <Stagger trigger="mount" stagger={staggerDelay.loose} className="max-w-4xl">
          <FadeInItem distance={offset.sm} durationSec={duration.default}>
            <p className="eyebrow !text-white/70">{eyebrow}</p>
          </FadeInItem>
          <FadeInItem distance={offset.default} durationSec={duration.hero}>
            <h1 className="text-white">{title}</h1>
          </FadeInItem>
          {subtitle && (
            <FadeInItem distance={offset.sm} durationSec={duration.default}>
              <p className="type-body-lg mt-5 max-w-2xl text-white/80">
                {subtitle}
              </p>
            </FadeInItem>
          )}
        </Stagger>
      </div>
    </section>
  );
}
