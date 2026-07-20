import Image from "next/image";

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
            ? "bg-gradient-to-r from-[#070d14]/78 via-[#070d14]/40 to-transparent"
            : "bg-gradient-to-r from-[#070d14]/88 via-[#070d14]/55 to-[#070d14]/25"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070d14]/88 via-transparent to-[#070d14]/15" />
      <div className="container relative z-10 pt-36 pb-12 md:pb-16">
        <p className="eyebrow !text-white/70 motion-safe-fade">{eyebrow}</p>
        <h1
          className={`max-w-4xl text-white motion-safe-fade ${
            pricing
              ? "text-[clamp(2.8rem,6.5vw,5.25rem)] leading-[1.02]"
              : "text-[clamp(2.4rem,5.5vw,4.5rem)]"
          }`}
          style={{ animationDelay: "80ms" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={`mt-5 max-w-2xl text-white/80 motion-safe-fade ${
              pricing ? "text-lg md:text-xl" : "text-lg"
            }`}
            style={{ animationDelay: "160ms" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
