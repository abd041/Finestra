"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { Testimonial } from "@/content/types";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  body?: string;
  items: Testimonial[];
  groupLabel: string;
  showLabel: string;
};

const AUTOPLAY_MS = 6000;

export function Testimonials({
  eyebrow,
  title,
  body,
  items,
  groupLabel,
  showLabel,
}: Props) {
  const titleId = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useRef(false);

  const count = items.length;
  /* Triple list so we can loop seamlessly through the middle set */
  const slides = count > 0 ? [...items, ...items, ...items] : [];
  const middleStart = count;

  const [index, setIndex] = useState(middleStart);
  const [offset, setOffset] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  const drag = useRef({
    active: false,
    startX: 0,
    startOffset: 0,
    delta: 0,
    pointerId: -1,
  });

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return { card: 0, gap: 24 };
    const cardEl = track.children[0] as HTMLElement | undefined;
    if (!cardEl) return { card: 0, gap: 24 };
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "24") || 24;
    return { card: cardEl.getBoundingClientRect().width, gap };
  }, []);

  const offsetForIndex = useCallback(
    (i: number) => {
      const { card, gap } = measure();
      const viewport = viewportRef.current;
      if (!viewport || !card) return 0;
      /* Center the active card in the viewport */
      const viewportW = viewport.clientWidth;
      return -(i * (card + gap) - (viewportW - card) / 2);
    },
    [measure]
  );

  const jumpTo = useCallback((i: number, withAnimation: boolean) => {
    setAnimate(withAnimation);
    setIndex(i);
  }, []);

  const normalizeLoop = useCallback(
    (i: number) => {
      if (count === 0) return i;
      if (i < count || i >= count * 2) {
        const normalized = count + (((i % count) + count) % count);
        requestAnimationFrame(() => {
          setAnimate(false);
          setIndex(normalized);
        });
        return normalized;
      }
      return i;
    },
    [count]
  );

  const goToLogical = useCallback(
    (logical: number) => {
      const target = middleStart + (((logical % count) + count) % count);
      jumpTo(target, !reduceMotion.current);
      setProgress(0);
    },
    [count, jumpTo, middleStart]
  );

  const step = useCallback((dir: number) => {
    setAnimate(!reduceMotion.current);
    setProgress(0);
    setIndex((current) => current + dir);
  }, []);

  /* Keep transform aligned on resize + first paint */
  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sync = () => {
      setAnimate(false);
      setOffset(offsetForIndex(index));
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only rebind resize; index sync via jump/step
  }, [offsetForIndex]);

  useEffect(() => {
    if (dragging) return;
    const id = requestAnimationFrame(() => setOffset(offsetForIndex(index)));
    return () => cancelAnimationFrame(id);
  }, [index, offsetForIndex, dragging]);

  /* After animated slide, normalize infinite loop */
  useEffect(() => {
    if (!animate) return;
    const track = trackRef.current;
    if (!track) return;
    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "transform") return;
      normalizeLoop(index);
    };
    track.addEventListener("transitionend", onEnd);
    return () => track.removeEventListener("transitionend", onEnd);
  }, [animate, index, normalizeLoop]);

  /* Autoplay + progress */
  useEffect(() => {
    if (paused || dragging || reduceMotion.current || count < 2) {
      return;
    }
    const started = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - started;
      const p = Math.min(1, elapsed / AUTOPLAY_MS);
      setProgress(p);
      if (p >= 1) {
        step(1);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, dragging, count, index, step]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startOffset: offset,
      delta: 0,
      pointerId: e.pointerId,
    };
    setDragging(true);
    setAnimate(false);
    setPaused(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const delta = e.clientX - drag.current.startX;
    drag.current.delta = delta;
    setOffset(drag.current.startOffset + delta);
  };

  const onPointerUp = () => {
    if (!drag.current.active) return;
    const { delta } = drag.current;
    drag.current.active = false;
    setDragging(false);
    setPaused(false);
    setAnimate(!reduceMotion.current);

    const { card } = measure();
    const threshold = Math.min(120, card * 0.22);
    if (delta > threshold) step(-1);
    else if (delta < -threshold) step(1);
    else {
      setAnimate(!reduceMotion.current);
      setOffset(offsetForIndex(index));
    }
    setProgress(0);
  };

  const logicalIndex = count ? ((index % count) + count) % count : 0;

  return (
    <section
      className="section surface-sand overflow-hidden"
      aria-labelledby={titleId}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        if (!dragging) setPaused(false);
      }}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="container">
        <Reveal variant="left">
          <div className="section-head flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow eyebrow-caps !mb-4">{eyebrow}</p>
              <h2
                id={titleId}
                className="text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.05] tracking-[-0.04em] text-ink"
              >
                {title}
              </h2>
              {body && (
                <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-muted md:text-lg">
                  {body}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3" role="group" aria-label={groupLabel}>
              <button
                type="button"
                aria-label={`${showLabel} previous`}
                onClick={() => step(-1)}
                className="testimonial-nav flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line)] bg-white text-ink md:h-14 md:w-14"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                aria-label={`${showLabel} next`}
                onClick={() => step(1)}
                className="testimonial-nav flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line)] bg-white text-ink md:h-14 md:w-14"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="relative">
        {/* Soft edge fades */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[var(--sand)] to-transparent md:w-20 lg:w-28"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[var(--sand)] to-transparent md:w-20 lg:w-28"
          aria-hidden="true"
        />

        <div
          ref={viewportRef}
          className="testimonial-viewport cursor-grab touch-pan-y active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            ref={trackRef}
            className={`testimonial-track flex gap-5 md:gap-6 ${
              animate && !dragging ? "testimonial-track-animate" : ""
            }`}
            style={{ transform: `translate3d(${offset}px, 0, 0)` }}
            aria-live="polite"
          >
            {slides.map((item, i) => {
              const isActive = i === index;
              const initials = item.name
                .split(" ")
                .map((n) => n[0])
                .filter(Boolean)
                .slice(0, 2)
                .join("");

              return (
                <article
                  key={`${item.name}-${i}`}
                  className={`testimonial-card flex w-[min(82vw,400px)] shrink-0 flex-col rounded-[var(--radius-panel)] bg-white p-8 md:w-[440px] md:p-10 lg:w-[460px] lg:p-11 ${
                    isActive ? "testimonial-card-active" : "testimonial-card-idle"
                  }`}
                  aria-hidden={!isActive}
                >
                  <span
                    className="font-display text-5xl leading-none text-ink/[0.1] md:text-6xl"
                    aria-hidden="true"
                  >
                    “
                  </span>
                  <h3 className="mt-4 font-display text-[clamp(1.55rem,2.5vw,1.95rem)] leading-snug tracking-[-0.03em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-5 flex-1 text-[0.98rem] leading-relaxed text-muted md:text-[1.05rem] md:leading-[1.75]">
                    {item.quote}
                  </p>
                  <div className="mt-10 flex items-center gap-4 border-t border-[var(--line)] pt-6">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sand font-display text-sm text-ink"
                      aria-hidden="true"
                    >
                      {initials}
                    </div>
                    <div>
                      <p className="font-semibold text-ink">{item.name}</p>
                      <p className="mt-0.5 text-sm text-muted">{item.role}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="mt-8 flex flex-col items-center gap-4 md:mt-10">
          <div className="flex items-center gap-2.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${showLabel} ${i + 1}`}
                aria-current={i === logicalIndex ? "true" : undefined}
                onClick={() => goToLogical(i)}
                className={`relative h-2 overflow-hidden rounded-full transition-all duration-300 ${
                  i === logicalIndex ? "w-11 bg-ink/15" : "w-2 bg-ink/20 hover:bg-ink/40"
                }`}
              >
                {i === logicalIndex && (
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-ink"
                    style={{ width: `${Math.max(8, progress * 100)}%` }}
                  />
                )}
              </button>
            ))}
          </div>
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted">
            {String(logicalIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}
