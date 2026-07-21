import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { FadeInItem } from "@/components/motion/FadeInItem";
import { Stagger } from "@/components/motion/Stagger";
import { duration, offset, staggerDelay } from "@/components/motion/tokens";
import { ParallaxMedia } from "@/components/shared/ParallaxMedia";
import { media } from "@/lib/media";

type Props = {
  missionEyebrow: string;
  missionTitle: string;
  missionBody: string;
  storyEyebrow: string;
  storyTitle: string;
  storyBody: string[];
  pills: string[];
  imageAlt: string;
};

export function MissionStory({
  missionEyebrow,
  missionTitle,
  missionBody,
  storyEyebrow,
  storyTitle,
  storyBody,
  pills,
  imageAlt,
}: Props) {
  const [lead, ...rest] = storyBody;

  return (
    <section className="section bg-white" aria-labelledby="about-mission-title">
      <div className="container">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-20">
          <Stagger stagger={staggerDelay.loose}>
            <FadeInItem direction="left" distance={offset.lateral}>
              <p className="eyebrow eyebrow-caps !mb-4">{missionEyebrow}</p>
              <h2
                id="about-mission-title"
                className="max-w-[14ch] text-[clamp(2.25rem,4.5vw,3.6rem)] leading-[1.05] tracking-[-0.04em] text-ink"
              >
                {missionTitle}
              </h2>
            </FadeInItem>

            <FadeInItem direction="left" distance={offset.lateral}>
              <p className="mt-7 max-w-xl text-[1.08rem] leading-[1.75] text-ink/80 md:text-lg md:leading-[1.7]">
                {missionBody}
              </p>
            </FadeInItem>

            <FadeInItem direction="left" distance={offset.lateral}>
              <ul className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {pills.map((pill, i) => (
                  <li
                    key={pill}
                    className="flex items-baseline gap-5 py-5 md:gap-6 md:py-6"
                  >
                    <span className="font-display text-sm tracking-[-0.02em] text-ink/35">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[1.2rem] leading-snug tracking-[-0.02em] text-ink md:text-[1.35rem]">
                      {pill}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeInItem>
          </Stagger>

          <FadeIn direction="scale" durationSec={duration.slow}>
            <div className="relative">
              <div
                className="pointer-events-none absolute -inset-3 rounded-[calc(0.75rem+0.65rem)] border border-[var(--line)] md:-inset-4"
                aria-hidden="true"
              />
              <div className="group relative aspect-[4/5] overflow-hidden rounded-[0.75rem] bg-navy shadow-[var(--shadow-md)] md:aspect-[5/6]">
                <ParallaxMedia className="absolute inset-0" intensity={0.04}>
                  <Image
                    src={media.craftsman}
                    alt={imageAlt}
                    fill
                    className="media-zoom object-cover"
                    sizes="(max-width:1024px) 100vw, 42vw"
                  />
                </ParallaxMedia>
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="mt-14 border-t border-[var(--line)] pt-14 md:mt-16 md:pt-16 lg:mt-20 lg:pt-20">
          <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <FadeIn direction="left" distance={offset.lateral}>
              <p className="eyebrow eyebrow-caps !mb-4">{storyEyebrow}</p>
              <h3
                id="about-story-title"
                className="max-w-[12ch] text-[clamp(1.85rem,3.5vw,2.75rem)] leading-[1.08] tracking-[-0.035em] text-ink"
              >
                {storyTitle}
              </h3>
            </FadeIn>

            <Stagger
              className="max-w-2xl"
              stagger={staggerDelay.default}
            >
              {lead && (
                <FadeInItem direction="right" distance={offset.lateral}>
                  <p className="border-l-2 border-ink/15 pl-5 text-[1.08rem] leading-[1.75] text-ink md:pl-6 md:text-lg md:leading-[1.7]">
                    {lead}
                  </p>
                </FadeInItem>
              )}
              {rest.map((para) => (
                <FadeInItem key={para.slice(0, 48)} distance={offset.sm}>
                  <p className="mt-5 text-[1rem] leading-relaxed text-muted-foreground md:mt-6 md:text-[1.05rem] md:leading-[1.75]">
                    {para}
                  </p>
                </FadeInItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
