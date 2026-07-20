"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max drift as fraction of element height (default ~5%) */
  intensity?: number;
};

/**
 * Subtle scroll-linked vertical drift. Disabled when prefers-reduced-motion.
 */
export function ParallaxMedia({ children, className = "", intensity = 0.05 }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;

    const update = () => {
      const rect = frame.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      /* 0 when top hits bottom of viewport, 1 when bottom hits top */
      const progress = (viewH - rect.top) / (viewH + rect.height);
      const clamped = Math.min(1, Math.max(0, progress));
      const shift = (clamped - 0.5) * 2 * intensity * 100;
      inner.style.transform = `translate3d(0, ${shift}%, 0) scale(1.08)`;
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [intensity]);

  return (
    <div ref={frameRef} className={`parallax-frame overflow-hidden ${className}`.trim()}>
      <div ref={innerRef} className="parallax-inner relative h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
