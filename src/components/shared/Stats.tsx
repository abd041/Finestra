"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Stat } from "@/content/types";
import { FadeIn } from "@/components/motion/FadeIn";
import { offset } from "@/components/motion/tokens";

type Props = {
  eyebrow: string;
  title: string;
  stats: Stat[];
};

function parseStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: Number(match[1]), suffix: match[2] || "" };
}

export function Stats({ eyebrow, title, stats }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const targets = useMemo(() => stats.map((s) => parseStat(s.value).num), [stats]);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState(() => targets);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) setVisible(true);
    };
    check();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || animatedRef.current) return;
    animatedRef.current = true;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const id = requestAnimationFrame(() => setCounts(targets));
      return () => cancelAnimationFrame(id);
    }

    const zeroId = requestAnimationFrame(() => setCounts(targets.map(() => 0)));
    const durationMs = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(targets.map((t) => Math.round(t * eased)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(zeroId);
      cancelAnimationFrame(raf);
    };
  }, [visible, targets]);

  return (
    <section
      className="section surface-dark overflow-hidden"
      ref={ref}
      aria-labelledby="stats-title"
    >
      <div className="container relative">
        <div
          className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-white/[0.03] blur-3xl md:h-96 md:w-96"
          aria-hidden="true"
        />

        {/* Wrapper only — counters stay one-shot via animatedRef */}
        <FadeIn distance={offset.sm}>
          <div className="section-head max-w-3xl">
            <p className="eyebrow eyebrow-caps !mb-4 !text-white/70">{eyebrow}</p>
            <h2
              id="stats-title"
              className="max-w-[16ch] text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.02] tracking-[-0.04em] text-white"
            >
              {title}
            </h2>
          </div>

          <div className="mt-10 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-3 sm:gap-0 sm:pt-12 md:mt-12">
            {stats.map((stat, i) => {
              const { suffix } = parseStat(stat.value);
              return (
                <div
                  key={stat.label}
                  className={`relative text-center sm:px-8 lg:px-12 ${
                    i > 0 ? "sm:border-l sm:border-white/10" : ""
                  }`}
                >
                  <p
                    className="font-display text-[clamp(3.25rem,7vw,5.5rem)] leading-none tracking-[-0.05em] text-white"
                    aria-label={`${stat.value} ${stat.label}`}
                  >
                    <span aria-hidden="true">
                      {counts[i]}
                      <span className="text-white/55">{suffix}</span>
                    </span>
                  </p>
                  <div
                    className="stat-rule mx-auto mt-5 h-px w-10 bg-white/25 sm:mx-auto"
                    aria-hidden="true"
                  />
                  <p className="mt-5 text-[0.8rem] font-medium uppercase tracking-[0.16em] text-white/70">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
