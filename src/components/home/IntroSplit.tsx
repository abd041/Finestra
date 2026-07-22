import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/content";
import { localePath } from "@/lib/i18n";
import { media } from "@/lib/media";
import { FadeIn } from "@/components/motion/FadeIn";
import { FadeInItem } from "@/components/motion/FadeInItem";
import { Stagger } from "@/components/motion/Stagger";
import { duration, offset, staggerDelay } from "@/components/motion/tokens";
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

/** Bluewake about horizontal-block on gray-bg */
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
    <section
      className="section gray-bg"
      aria-labelledby="home-intro-title"
    >
      <div className="container grid items-center gap-[60px] max-[991px]:gap-[60px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-[100px]">
        <Stagger className="order-2 lg:order-1" stagger={staggerDelay.loose}>
          <FadeInItem direction="left" distance={offset.lateral}>
            <p className="eyebrow eyebrow-caps !mb-4">{eyebrow}</p>
            <h2 id="home-intro-title" className="max-w-[15ch] text-black">
              {title}
            </h2>
          </FadeInItem>

          <FadeInItem direction="left" distance={offset.lateral}>
            <p className="type-body-lg mt-8 max-w-xl text-[var(--paragraph)]">
              {body}
            </p>
          </FadeInItem>

          <FadeInItem direction="left" distance={offset.lateral}>
            <div className="mt-8 max-w-xl border-l-2 border-[var(--borders)] pl-5 md:pl-6">
              <p className="type-body text-[var(--paragraph)]">{bodySecondary}</p>
            </div>
          </FadeInItem>

          <FadeInItem direction="left" distance={offset.lateral}>
            <Button variant="link" asChild className="mt-10 h-auto px-0">
              <Link href={localePath(locale, "/about")}>
                {linkLabel}
                <span aria-hidden="true">→</span>
              </Link>
            </Button>
          </FadeInItem>
        </Stagger>

        <FadeIn
          direction="scale"
          durationSec={duration.slow}
          className="order-1 lg:order-2"
        >
          <div className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-[4px] bg-white lg:mx-0 lg:max-w-none">
            <div className="group relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
              <Image
                src={media.patrick}
                alt={imageAlt}
                fill
                className="object-cover object-top"
                sizes="(max-width:1024px) 100vw, 42vw"
              />
            </div>
            <div className="bg-black px-[30px] py-5 text-white">
              <p className="type-label text-white/55">{founderTitle}</p>
              <p className="type-h3 mt-1.5">{founderName}</p>
              <p className="type-small mt-2 text-white/65">{siteName}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
