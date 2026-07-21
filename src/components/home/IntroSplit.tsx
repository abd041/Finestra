import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/content";
import { localePath } from "@/lib/i18n";
import { media } from "@/lib/media";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";

type Props = {
  locale: Locale;
  eyebrow: string;
  title: string;
  body: string;
  bodySecondary: string;
  linkLabel: string;
  founderTitle: string;
  founderName: string;
  siteName: string;
  imageAlt: string;
};

export function IntroSplit({
  locale,
  eyebrow,
  title,
  body,
  bodySecondary,
  linkLabel,
  founderTitle,
  founderName,
  siteName,
  imageAlt,
}: Props) {
  return (
    <section className="section surface-sand" aria-labelledby="home-intro-title">
      <div className="container grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-20">
        <div className="order-2 lg:order-1">
          <Reveal variant="left">
            <p className="eyebrow eyebrow-caps !mb-4">{eyebrow}</p>
            <h2
              id="home-intro-title"
              className="max-w-[15ch] text-[clamp(2.35rem,4.8vw,4rem)] leading-[1.02] tracking-[-0.04em] text-ink"
            >
              {title}
            </h2>
          </Reveal>

          <Reveal variant="left" delay={90}>
            <p className="mt-8 max-w-xl text-[1.05rem] leading-[1.75] text-ink/80 md:text-lg md:leading-[1.7]">
              {body}
            </p>
          </Reveal>

          <Reveal variant="left" delay={160}>
            <div className="mt-8 max-w-xl border-l-2 border-ink/10 pl-5 md:pl-6">
              <p className="text-[0.95rem] leading-relaxed text-muted-foreground md:text-[1rem] md:leading-[1.75]">
                {bodySecondary}
              </p>
            </div>
          </Reveal>

          <Reveal variant="left" delay={230}>
            <Button variant="link" asChild className="mt-10 h-auto px-0 text-[1.02rem]">
              <Link href={localePath(locale, "/about")}>
                {linkLabel}
                <span aria-hidden="true">→</span>
              </Link>
            </Button>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={120} className="order-1 lg:order-2">
          <div className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-[8px] bg-white shadow-[var(--shadow-lg)] lg:mx-0 lg:max-w-none">
            <div className="group relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
              <Image
                src={media.patrick}
                alt={imageAlt}
                fill
                className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                sizes="(max-width:1024px) 100vw, 42vw"
              />
            </div>
            <div className="bg-navy px-6 py-5 text-white md:px-7 md:py-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/55">
                {founderTitle}
              </p>
              <p className="mt-1.5 font-display text-[1.65rem] leading-none tracking-[-0.03em] md:text-[1.85rem]">
                {founderName}
              </p>
              <p className="mt-2 text-sm text-white/65">{siteName}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
