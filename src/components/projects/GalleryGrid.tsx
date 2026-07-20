"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { GalleryItem } from "@/content/types";
import { Reveal } from "@/components/shared/Reveal";

type Props = {
  items: GalleryItem[];
  eyebrow?: string;
  title?: string;
  body?: string;
  closeLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
};

/** Varying widths, shared row height: 2-1-1 / 1-2-1 / 1-1-2 */
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
    <section className="section bg-white" aria-labelledby={headingId}>
      <div className="container">
        <div className="section-head grid gap-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.75fr)] md:items-end md:gap-12 lg:gap-16">
          <Reveal variant="left">
            <div>
              {eyebrow && (
                <p className="eyebrow eyebrow-caps !mb-4">{eyebrow}</p>
              )}
              {title && (
                <h2
                  id={headingId}
                  className="max-w-xl text-[clamp(2.15rem,4.2vw,3.5rem)] leading-[1.05] tracking-[-0.04em] text-ink"
                >
                  {title}
                </h2>
              )}
            </div>
          </Reveal>
          {body && (
            <Reveal delay={90} variant="right">
              <p className="max-w-md text-[1.05rem] leading-relaxed text-muted md:justify-self-end md:text-right">
                {body}
              </p>
            </Reveal>
          )}
        </div>

        <div className="gallery-mosaic grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 md:gap-4">
          {items.map((galleryItem, i) => (
            <Reveal
              key={galleryItem.id}
              delay={(i % 6) * 45}
              className={spans[i % spans.length]}
            >
              <button
                type="button"
                onClick={() => openAt(i)}
                aria-label={`${galleryItem.title} — ${galleryItem.category}`}
                className="gallery-tile group relative block w-full overflow-hidden text-left"
              >
                <Image
                  src={galleryItem.image}
                  alt={galleryItem.title}
                  fill
                  className="gallery-tile-image object-cover"
                  sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 50vw"
                />
                <span className="gallery-tile-hover" aria-hidden="true" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {activeItem && (
        <div
          ref={dialogRef}
          className={`lightbox-backdrop fixed inset-0 z-[80] flex items-center justify-center bg-[#070d14]/92 p-3 backdrop-blur-md md:p-8 ${
            visible ? "" : "opacity-0"
          }`}
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
            className="lightbox-panel relative w-full max-w-5xl overflow-hidden bg-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[0.75rem] bg-[#0b1520] shadow-[var(--shadow-lg)]">
              <Image
                key={activeItem.id}
                src={activeItem.image}
                alt={activeItem.title}
                fill
                className="lightbox-image object-cover"
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
