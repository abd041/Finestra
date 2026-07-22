"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { GalleryItem } from "@/content/types";
import { FadeIn } from "@/components/motion/FadeIn";
import { FadeInItem } from "@/components/motion/FadeInItem";
import { Stagger } from "@/components/motion/Stagger";
import { duration, offset, staggerDelay } from "@/components/motion/tokens";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  items: GalleryItem[];
  eyebrow?: string;
  title?: string;
  body?: string;
  closeLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
  limit?: number;
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
  limit,
}: Props) {
  const [active, setActive] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const titleId = useId();
  const headingId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  const list = limit ? items.slice(0, limit) : items;
  const activeItem = active !== null ? list[active] : null;

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
        return (i + delta + list.length) % list.length;
      });
    },
    [list.length]
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
          <FadeIn direction="left" distance={offset.lateral}>
            <div>
              {eyebrow && (
                <p className="type-label text-[#111]">
                  {eyebrow}
                </p>
              )}
              {title && (
                <h2 id={headingId} className="mt-4 max-w-[16ch] text-[#111]">
                  {title}
                </h2>
              )}
            </div>
          </FadeIn>
          {body && (
            <FadeIn direction="right" distance={offset.lateral}>
              <p className="type-body max-w-sm text-[#6b7280] md:justify-self-end md:text-right">
                {body}
              </p>
            </FadeIn>
          )}
        </div>

        {/* once: true — long mosaics fatigue if every tile re-staggers on scroll-up */}
        <Stagger
          className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 md:gap-2.5"
          stagger={staggerDelay.tight}
          once
        >
          {list.map((galleryItem, i) => {
            const span = spans[i % spans.length];
            const isWide = span.includes("col-span-2");

            return (
              <FadeInItem
                key={galleryItem.id}
                className={cn(
                  "relative h-[400px] w-full min-h-[400px]",
                  span
                )}
                distance={offset.sm}
                durationSec={duration.fast}
              >
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => openAt(i)}
                  aria-label={`${galleryItem.title} — ${galleryItem.category}`}
                  className={cn(
                    "group absolute inset-0 h-auto min-h-0 w-full overflow-hidden rounded-[4px] bg-black p-0 text-left shadow-none",
                    "cursor-zoom-in hover:bg-black focus-visible:ring-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111]",
                    "active:translate-y-0"
                  )}
                >
                  <Image
                    src={galleryItem.image}
                    alt={galleryItem.title}
                    fill
                    className="object-cover motion-safe:transition-transform motion-safe:duration-[1.1s] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-safe:group-hover:scale-[1.05] motion-safe:group-focus-visible:scale-[1.05]"
                    sizes={
                      isWide
                        ? "(max-width:768px) 100vw, 50vw"
                        : "(max-width:768px) 100vw, 25vw"
                    }
                  />
                  <span
                    className="pointer-events-none absolute inset-0 bg-transparent transition-colors duration-400 group-hover:bg-black/10 group-focus-visible:bg-black/10"
                    aria-hidden="true"
                  />
                </Button>
              </FadeInItem>
            );
          })}
        </Stagger>
      </div>

      {activeItem && (
        <div
          ref={dialogRef}
          className={cn(
            "fixed inset-0 z-[80] flex items-center justify-center bg-black/92 p-3 backdrop-blur-md md:p-8",
            !visible && "opacity-0"
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={close}
        >
          <Button
            ref={closeRef}
            type="button"
            variant="ghost"
            className="absolute right-3 top-3 z-20 h-auto rounded-full border border-white/20 bg-white/10 px-4 py-2 type-small text-white shadow-none hover:bg-white/20 hover:text-white sm:right-4 sm:top-4 md:right-8 md:top-8"
            onClick={close}
          >
            {closeLabel}
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={prevLabel}
            className="absolute left-3 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 text-white shadow-none hover:bg-white/20 hover:text-white sm:flex md:left-8 md:h-14 md:w-14"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
          >
            <span aria-hidden="true">←</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={nextLabel}
            className="absolute right-3 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 text-white shadow-none hover:bg-white/20 hover:text-white sm:flex md:right-8 md:h-14 md:w-14"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
          >
            <span aria-hidden="true">→</span>
          </Button>

          <div
            className="relative w-full max-w-5xl overflow-hidden bg-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-none bg-black">
              <Image
                key={activeItem.id}
                src={activeItem.image}
                alt={activeItem.title}
                fill
                className="object-cover motion-safe:transition-opacity"
                sizes="(max-width:1024px) 100vw, 90vw"
                priority
              />
            </div>
            <div className="mt-4 flex flex-col gap-3 px-1 text-white sm:mt-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <div className="min-w-0">
                <p className="type-label text-white/75">
                  {activeItem.category}
                </p>
                <h3 id={titleId} className="mt-2">
                  {activeItem.title}
                </h3>
                <p className="sr-only" aria-live="polite">
                  {active !== null
                    ? `${active + 1} / ${list.length}`
                    : ""}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3 sm:hidden">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={prevLabel}
                  className="h-11 w-11 rounded-full border border-white/20 bg-white/10 text-white shadow-none hover:bg-white/20 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                >
                  <span aria-hidden="true">←</span>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={nextLabel}
                  className="h-11 w-11 rounded-full border border-white/20 bg-white/10 text-white shadow-none hover:bg-white/20 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                >
                  <span aria-hidden="true">→</span>
                </Button>
                <p className="type-small text-white/80">
                  {active !== null
                    ? `${String(active + 1).padStart(2, "0")} / ${String(list.length).padStart(2, "0")}`
                    : null}
                </p>
              </div>
              <p className="type-small hidden shrink-0 pb-1 text-white/80 sm:block">
                {active !== null
                  ? `${String(active + 1).padStart(2, "0")} / ${String(list.length).padStart(2, "0")}`
                  : null}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
