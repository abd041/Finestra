"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { Testimonial } from "@/content/types";
import { FadeIn } from "@/components/motion/FadeIn";
import { offset } from "@/components/motion/tokens";
import { media } from "@/lib/media";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  body?: string;
  items: Testimonial[];
  groupLabel: string;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");
}

function Stars() {
  return (
    <div className="flex gap-1" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5 fill-current text-[#111] md:h-4 md:w-4"
        >
          <path d="M10 1.5l2.35 4.76 5.25.76-3.8 3.7.9 5.24L10 13.77l-4.7 2.47.9-5.24-3.8-3.7 5.25-.76L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  item,
  className,
  featured,
}: {
  item: Testimonial;
  className?: string;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "flex h-[300px] w-[220px] flex-col rounded-2xl border-0 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)] sm:h-[360px] sm:w-[300px] sm:p-7 md:h-[400px] md:w-[340px] md:p-8",
        featured &&
          "z-[2] sm:h-[380px] sm:w-[320px] md:h-[420px] md:w-[360px] shadow-[0_28px_70px_rgba(15,23,42,0.16)]",
        className
      )}
    >
      <Stars />
      <p className="mt-5 flex-1 text-[0.92rem] leading-[1.7] text-[#374151] md:text-[0.98rem] md:leading-[1.75]">
        {item.quote}
      </p>
      <div className="mt-6 flex items-center gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e8e8e8] font-display text-[0.8rem] text-[#111]"
          aria-hidden="true"
        >
          {initials(item.name)}
        </div>
        <div className="min-w-0 text-left">
          <p className="truncate text-[0.95rem] font-semibold text-[#111]">
            {item.name}
          </p>
          <p className="mt-0.5 truncate text-[0.8rem] text-[#6b7280]">
            {item.role}
          </p>
        </div>
      </div>
    </article>
  );
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Cards fan while the stage is on-screen. Page keeps scrolling —
 * progress is mapped to the card stage center, not the section top
 * (so the open happens when you can actually see it).
 */
export function Testimonials({
  eyebrow,
  title,
  body,
  items,
  groupLabel,
}: Props) {
  const titleId = useId();
  const stageRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  const trio = items.slice(0, 3);
  const left = trio[0];
  const center = trio[1] ?? trio[0];
  const right = trio[2] ?? trio[0];

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = true;
    let current = reduce ? 1 : 0;
    let target = current;
    let spreadMax = 360;

    const apply = (t: number) => {
      const leftX = -t * spreadMax;
      const rightX = t * spreadMax;
      const rot = t * 7;
      const sideScale = 0.96 + t * 0.04;
      const sideY = t * 20;
      const centerY = -t * 10;

      if (leftRef.current) {
        leftRef.current.style.transform = `translate3d(${leftX}px, ${sideY}px, 0) rotate(${-rot}deg) scale(${sideScale})`;
      }
      if (rightRef.current) {
        rightRef.current.style.transform = `translate3d(${rightX}px, ${sideY}px, 0) rotate(${rot}deg) scale(${sideScale})`;
      }
      if (centerRef.current) {
        centerRef.current.style.transform = `translate3d(0, ${centerY}px, 0) scale(${1 + t * 0.015})`;
      }
    };

    const readTarget = () => {
      spreadMax =
        window.innerWidth < 640 ? 180 : window.innerWidth < 1024 ? 280 : 360;

      if (reduce) {
        target = 1;
        return;
      }

      const rect = stage.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const mid = rect.top + rect.height * 0.5;

      // Stacked when cards sit near the bottom of the viewport;
      // fully open when their center reaches ~45% from the top.
      const start = vh * 0.88;
      const end = vh * 0.42;
      const raw = (start - mid) / Math.max(1, start - end);
      target = easeInOutCubic(Math.min(1, Math.max(0, raw)));
    };

    const tick = () => {
      if (!running) return;
      readTarget();
      // Soft follow so the fan eases instead of snapping to scroll
      current += (target - current) * 0.065;
      if (Math.abs(target - current) < 0.00035) current = target;
      apply(current);
      raf = requestAnimationFrame(tick);
    };

    apply(current);
    setReady(true);
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!center) return null;

  return (
    <section
      className="relative overflow-x-clip py-20 md:py-28"
      aria-labelledby={titleId}
      aria-label={groupLabel}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute inset-x-0 bottom-0 h-[55%] overflow-hidden">
          <Image
            src={media.banners.projects}
            alt=""
            fill
            className="object-cover object-[center_60%] opacity-70"
            sizes="100vw"
            quality={70}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2330]/35 via-[#1a2330]/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent" />
        </div>
      </div>

      <FadeIn distance={offset.sm}>
        <div className="relative mx-auto w-[min(900px,calc(100%-2rem))] text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#111]">
            {eyebrow}
          </p>
          <h2
            id={titleId}
            className="mx-auto mt-3 max-w-[22ch] font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.03em] text-[#111]"
          >
            {title}
          </h2>
          {body && (
            <p className="mx-auto mt-4 max-w-xl text-[1rem] leading-relaxed text-[#4b5563]">
              {body}
            </p>
          )}
        </div>
      </FadeIn>

      {/* Stage has no FadeIn — fan owns transform; ready opacity is the only entrance */}
      <div
        ref={stageRef}
        className={cn(
          "relative mx-auto mt-12 flex h-[440px] w-full max-w-[1200px] items-center justify-center transition-opacity duration-500 md:mt-14 md:h-[480px]",
          ready ? "opacity-100" : "opacity-0"
        )}
      >
        {left && (
          <div
            ref={leftRef}
            className="absolute z-[1] will-change-transform"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            <TestimonialCard item={left} />
          </div>
        )}

        {right && (
          <div
            ref={rightRef}
            className="absolute z-[1] will-change-transform"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            <TestimonialCard item={right} />
          </div>
        )}

        <div
          ref={centerRef}
          className="relative z-[2] will-change-transform"
          style={{ transform: "translate3d(0,0,0)" }}
        >
          <TestimonialCard item={center} featured />
        </div>
      </div>
    </section>
  );
}
