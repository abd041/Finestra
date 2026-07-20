import Image from "next/image";
import { Reveal } from "@/components/shared/Reveal";
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
          <div>
            <Reveal variant="left">
              <p className="eyebrow eyebrow-caps !mb-4">{missionEyebrow}</p>
              <h2
                id="about-mission-title"
                className="max-w-[14ch] text-[clamp(2.25rem,4.5vw,3.6rem)] leading-[1.05] tracking-[-0.04em] text-ink"
              >
                {missionTitle}
              </h2>
            </Reveal>

            <Reveal variant="left" delay={80}>
              <p className="mt-7 max-w-xl text-[1.08rem] leading-[1.75] text-ink/80 md:text-lg md:leading-[1.7]">
                {missionBody}
              </p>
            </Reveal>

            <Reveal variant="left" delay={140}>
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
            </Reveal>
          </div>

          <Reveal variant="scale" delay={100}>
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
          </Reveal>
        </div>

        <div className="mt-14 border-t border-[var(--line)] pt-14 md:mt-16 md:pt-16 lg:mt-20 lg:pt-20">
          <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal variant="left">
              <p className="eyebrow eyebrow-caps !mb-4">{storyEyebrow}</p>
              <h3
                id="about-story-title"
                className="max-w-[12ch] text-[clamp(1.85rem,3.5vw,2.75rem)] leading-[1.08] tracking-[-0.035em] text-ink"
              >
                {storyTitle}
              </h3>
            </Reveal>

            <div className="max-w-2xl">
              {lead && (
                <Reveal variant="right" delay={60}>
                  <p className="border-l-2 border-ink/15 pl-5 text-[1.08rem] leading-[1.75] text-ink md:pl-6 md:text-lg md:leading-[1.7]">
                    {lead}
                  </p>
                </Reveal>
              )}
              <div className="mt-8 space-y-5 text-[1rem] leading-relaxed text-muted md:mt-9 md:space-y-6 md:text-[1.05rem] md:leading-[1.75]">
                {rest.map((para, i) => (
                  <Reveal key={para.slice(0, 48)} delay={90 + i * 50}>
                    <p>{para}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
