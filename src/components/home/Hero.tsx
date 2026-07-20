import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/content";
import { localePath } from "@/lib/i18n";
import { media } from "@/lib/media";

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
    <section className="relative min-h-[100svh] overflow-hidden surface-dark" aria-label={label}>
      <Image
        src={media.hero}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="hero-kenburns object-cover object-center"
        quality={75}
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070d14]/72 via-[#070d14]/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070d14]/85 via-transparent to-[#070d14]/25" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,transparent_0%,rgba(7,13,20,0.35)_100%)]" />
      <div className="hero-ambient pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-sheen pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container relative z-10 flex min-h-[100svh] items-end pb-20 pt-36 md:pb-28">
        <div className="max-w-4xl">
          <p
            className="eyebrow !mb-5 !text-white/70 motion-safe-fade"
            style={{ animationDelay: "40ms" }}
          >
            {eyebrow}
          </p>
          <h1 className="hero-title-mask max-w-[14ch] text-[clamp(3rem,7.5vw,6rem)] leading-[0.98] tracking-[-0.04em] text-white">
            {title}
          </h1>
          <p
            className="mt-7 max-w-xl text-lg text-white/78 motion-safe-fade md:text-xl"
            style={{ animationDelay: "280ms" }}
          >
            {subtitle}
          </p>
          <div className="mt-11 motion-safe-fade" style={{ animationDelay: "400ms" }}>
            <Link href={localePath(locale, "/contact")} className="btn btn-primary">
              {cta}
            </Link>
          </div>
          <div
            className="dot-row mt-11 !text-white/65 motion-safe-fade"
            style={{ animationDelay: "520ms" }}
          >
            {pills.map((pill) => (
              <span key={pill}>{pill}</span>
            ))}
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 motion-safe-fade md:block"
        style={{ animationDelay: "700ms" }}
        aria-hidden="true"
      >
        <div className="scroll-hint mx-auto" />
      </div>
    </section>
  );
}
