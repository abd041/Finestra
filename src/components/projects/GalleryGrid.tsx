"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { GalleryItem } from "@/content/types";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

type Props = {
  items: GalleryItem[];
  eyebrow?: string;
  title?: string;
  body?: string;
  closeLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
};

/**
 * Bluewake mosaic on a 4-col grid:
 * row pattern 2-1-1 / 1-2-1 / 1-1-2 (wide + two portraits)
 */
const spans = [
  "md:col-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-1",
  "md:col-span-1",
];

export function GalleryGrid({
  items,
  eyebrow,
  title,
  body,
  closeLabel = "Close",
  prevLabel = "Previous image",
  nextLabel = "Next image",
}: Props) {
  const [active, setActive] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const titleId = useId();
  const headingId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  const activeItem = active !== null ? items[active] : null;

  const close = useCallback(() => {
    setVisible(false);
    window.setTimeout(() => {
      setActive(null);
      lastFocusRef.current?.focus();
    }, 220);
  }, []);

  const go = useCallback(
    (delta: number) => {
      setActive((i) => {
        if (i === null) return 0;
        return (i + delta + items.length) % items.length;
      });
    },
    [items.length]
  );

  const openAt = useCallback((index: number) => {
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    setActive(index);
    setVisible(true);
  }, []);

  useEffect(() => {
    if (active === null || !visible) return;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 40);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [active, visible, close, go]);

  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby={headingId}>
      <div className="container">
        <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-end md:gap-16 lg:mb-20 lg:gap-24">
          <Reveal variant="left">
            <div>
              {eyebrow && (
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#111]">
                  {eyebrow}
                </p>
              )}
              {title && (
                <h2
                  id={headingId}
                  className="mt-4 max-w-[16ch] font-display text-[clamp(2rem,4vw,3.35rem)] font-medium leading-[1.08] tracking-[-0.035em] text-[#111]"
                >
                  {title}
                </h2>
              )}
            </div>
          </Reveal>
          {body && (
            <Reveal delay={90} variant="right">
              <p className="max-w-sm text-[0.98rem] leading-[1.7] text-[#6b7280] md:justify-self-end md:text-right">
                {body}
              </p>
            </Reveal>
          )}
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 md:grid-cols-4 md:gap-3 lg:gap-3.5">
          {items.map((galleryItem, i) => {
            const span = spans[i % spans.length];
            const isWide = span.includes("col-span-2");

            return (
              <Reveal
                key={galleryItem.id}
                delay={(i % 6) * 40}
                className={cn(span)}
              >
                <button
                  type="button"
                  onClick={() => openAt(i)}
                  aria-label={`${galleryItem.title} — ${galleryItem.category}`}
                  className={cn(
                    "group relative block w-full overflow-hidden rounded-none bg-[#0b1520] text-left",
                    "h-[240px] sm:h-[260px] md:h-[300px] lg:h-[340px]",
                    "cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111]"
                  )}
                >
                  <Image
                    src={galleryItem.image}
                    alt={galleryItem.title}
                    fill
                    className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.05] group-focus-visible:scale-[1.05]"
                    sizes={
                      isWide
                        ? "(max-width:768px) 100vw, 50vw"
                        : "(max-width:768px) 100vw, 25vw"
                    }
                  />
                  <span
                    className="pointer-events-none absolute inset-0 bg-transparent transition-colors duration-400 group-hover:bg-[#070d14]/10 group-focus-visible:bg-[#070d14]/10"
                    aria-hidden="true"
                  />
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      {activeItem && (
        <div
          ref={dialogRef}
          className={cn(
            "fixed inset-0 z-[80] flex items-center justify-center bg-[#070d14]/92 p-3 backdrop-blur-md md:p-8",
            !visible && "opacity-0"
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            className="absolute right-4 top-4 z-20 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 md:right-8 md:top-8"
            onClick={close}
          >
            {closeLabel}
          </button>

          <button
            type="button"
            aria-label={prevLabel}
            className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 md:left-8 md:h-14 md:w-14"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 md:right-8 md:h-14 md:w-14"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
          >
            <span aria-hidden="true">→</span>
          </button>

          <div
            className="relative w-full max-w-5xl overflow-hidden bg-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-none bg-[#0b1520] shadow-[var(--shadow-lg)]">
              <Image
                key={activeItem.id}
                src={activeItem.image}
                alt={activeItem.title}
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 90vw"
                priority
              />
            </div>
            <div className="mt-5 flex items-end justify-between gap-6 px-1 text-white">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/50">
                  {activeItem.category}
                </p>
                <h3
                  id={titleId}
                  className="mt-2 font-display text-[clamp(1.35rem,2.5vw,1.85rem)] leading-tight tracking-[-0.03em]"
                >
                  {activeItem.title}
                </h3>
              </div>
              <p className="shrink-0 pb-1 text-sm text-white/45">
                {active !== null
                  ? `${String(active + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`
                  : null}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
