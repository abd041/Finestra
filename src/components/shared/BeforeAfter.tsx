"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Reveal } from "./Reveal";

type Props = {
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  eyebrow: string;
  title: string;
  body: string;
  sliderLabel: string;
  dragHint?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function BeforeAfter({
  beforeLabel,
  afterLabel,
  beforeImage,
  afterImage,
  eyebrow,
  title,
  body,
  sliderLabel,
  dragHint = "Drag to compare",
  ctaLabel,
  ctaHref,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(58);
  const [active, setActive] = useState(false);
  const dragging = useRef(false);
  const demoPlayed = useRef(false);
  const demoRaf = useRef(0);
  const labelId = useId();

  const stopDemo = useCallback(() => {
    if (demoRaf.current) {
      cancelAnimationFrame(demoRaf.current);
      demoRaf.current = 0;
    }
    demoPlayed.current = true;
  }, []);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(96, Math.max(4, next)));
  }, []);

  const startDrag = useCallback(
    (clientX: number, pointerId?: number, target?: HTMLElement) => {
      stopDemo();
      dragging.current = true;
      setActive(true);
      updateFromClientX(clientX);
      if (pointerId !== undefined && target?.setPointerCapture) {
        try {
          target.setPointerCapture(pointerId);
        } catch {
          /* ignore capture errors */
        }
      }
    },
    [stopDemo, updateFromClientX]
  );

  const endDrag = useCallback(() => {
    dragging.current = false;
    setActive(false);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      updateFromClientX(e.clientX);
    };
    const onUp = () => endDrag();

    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [endDrag, updateFromClientX]);

  /* One-time demo scrub — cancelled as soon as the user interacts */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || demoPlayed.current) return;
        demoPlayed.current = true;
        observer.disconnect();

        const start = 72;
        const end = 38;
        const duration = 1400;
        const t0 = performance.now() + 350;

        const tick = (now: number) => {
          if (dragging.current) {
            demoRaf.current = 0;
            return;
          }
          if (now < t0) {
            demoRaf.current = requestAnimationFrame(tick);
            return;
          }
          const p = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setPosition(start + (end - start) * eased);
          if (p < 1) demoRaf.current = requestAnimationFrame(tick);
          else demoRaf.current = 0;
        };

        demoRaf.current = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (demoRaf.current) cancelAnimationFrame(demoRaf.current);
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    stopDemo();
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(4, p - 3));
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(96, p + 3));
    }
    if (e.key === "Home") {
      e.preventDefault();
      setPosition(4);
    }
    if (e.key === "End") {
      e.preventDefault();
      setPosition(96);
    }
  };

  return (
    <section className="section" aria-labelledby={labelId}>
      <div className="container grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 xl:gap-20">
        <div>
          <Reveal variant="left">
            <p className="eyebrow eyebrow-caps !mb-4">{eyebrow}</p>
            <h2
              id={labelId}
              className="max-w-[14ch] text-[clamp(2.35rem,4.6vw,3.9rem)] leading-[1.02] tracking-[-0.04em] text-ink"
            >
              {title}
            </h2>
          </Reveal>
          <Reveal variant="left" delay={80}>
            <p className="mt-7 max-w-md text-[1.05rem] leading-relaxed text-muted md:text-lg md:leading-[1.7]">
              {body}
            </p>
          </Reveal>
          {ctaLabel && ctaHref && (
            <Reveal variant="left" delay={140}>
              <Link href={ctaHref} className="link-arrow mt-10 inline-flex text-[1.02rem]">
                {ctaLabel}
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          )}
        </div>

        <Reveal variant="scale" delay={120}>
          <div className="relative mx-auto w-full max-w-[640px] lg:mx-0 lg:max-w-none">
            <div
              className="pointer-events-none absolute -inset-3 rounded-[calc(var(--radius-panel)+0.75rem)] border border-[var(--line)] md:-inset-4"
              aria-hidden="true"
            />

            <div
              ref={containerRef}
              className={`ba-frame relative min-h-[300px] aspect-[5/4] cursor-ew-resize overflow-hidden rounded-[var(--radius-panel)] bg-sand shadow-[var(--shadow-lg)] select-none touch-none md:min-h-[440px] md:aspect-[4/3] ${
                active ? "ba-frame-active" : ""
              }`}
              onPointerDown={(e) => {
                if (e.button !== 0 && e.pointerType === "mouse") return;
                startDrag(e.clientX, e.pointerId, e.currentTarget);
              }}
            >
              <Image
                src={afterImage}
                alt={`${afterLabel}: polished optically clear yacht glass`}
                fill
                draggable={false}
                className="pointer-events-none object-cover"
                sizes="(max-width:1024px) 100vw, 55vw"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
              >
                <Image
                  src={beforeImage}
                  alt={`${beforeLabel}: scratched and hazed yacht glass`}
                  fill
                  draggable={false}
                  className="pointer-events-none object-cover"
                  sizes="(max-width:1024px) 100vw, 55vw"
                />
              </div>

              <div
                className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white/90 shadow-[0_0_20px_rgba(0,0,0,0.35)]"
                style={{ left: `${position}%` }}
              >
                <button
                  type="button"
                  className="ba-handle pointer-events-auto absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-white/80 bg-white text-ink shadow-[0_12px_40px_rgba(10,15,20,0.28)] transition-[box-shadow,background-color] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                  role="slider"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(position)}
                  aria-valuetext={`${Math.round(position)} percent ${beforeLabel}`}
                  aria-label={sliderLabel}
                  onKeyDown={onKeyDown}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    startDrag(e.clientX, e.pointerId, containerRef.current ?? undefined);
                  }}
                >
                  <span className="flex items-center gap-0.5" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M8.5 3.5 5 7l3.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M5.5 3.5 9 7l-3.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </div>

              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-between p-5 md:p-6">
                <span className="rounded-full bg-navy/80 px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                  {beforeLabel}
                </span>
                <span className="rounded-full bg-white/90 px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink backdrop-blur-sm">
                  {afterLabel}
                </span>
              </div>

              <p className="pointer-events-none absolute inset-x-0 bottom-5 z-20 text-center text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white/80 drop-shadow md:bottom-6">
                {dragHint}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
