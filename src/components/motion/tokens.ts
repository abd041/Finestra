import type { Transition, Variants, ViewportOptions } from "motion/react";

/** Shared cubic-bezier — Webflow / Bluewake ease-out */
export const easeOut = [0.22, 1, 0.36, 1] as const;

/**
 * Enter is calm; exit is snappy so fast scroll never lags
 * and upward replay never “pops” through a long reverse.
 */
export const duration = {
  exit: 0.28,
  fast: 0.45,
  default: 0.5,
  medium: 0.55,
  slow: 0.6,
  hero: 0.58,
} as const;

/** Travel distances in px — keep subtle (transform only) */
export const offset = {
  footer: 10,
  sm: 14,
  default: 18,
  lg: 20,
  lateral: 16,
} as const;

export const staggerDelay = {
  tight: 0.045,
  default: 0.055,
  loose: 0.065,
} as const;

/** Shared intentional delays (seconds) — avoid one-off magic numbers */
export const delay = {
  none: 0,
  xs: 0.04,
  sm: 0.06,
  md: 0.08,
} as const;

/**
 * amount 0.2 + mild bottom margin: fires early enough for fast scroll,
 * but not so early that adjacent sections fight for attention.
 */
export const viewportReplay: ViewportOptions = {
  once: false,
  amount: 0.2,
  margin: "0px 0px -6% 0px",
};

export const viewportOnce: ViewportOptions = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -6% 0px",
};

export type FadeDirection = "up" | "left" | "right" | "scale";

export type HiddenState = {
  opacity: number;
  x?: number;
  y?: number;
  scale?: number;
};

export const visibleState = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
} as const;

export function getHiddenState(
  direction: FadeDirection = "up",
  distance?: number
): HiddenState {
  const travel =
    distance ??
    (direction === "left" || direction === "right"
      ? offset.lateral
      : offset.default);

  switch (direction) {
    case "left":
      return { opacity: 0, x: -travel, y: 0 };
    case "right":
      return { opacity: 0, x: travel, y: 0 };
    case "scale":
      return { opacity: 0, scale: 0.985, y: 0 };
    case "up":
    default:
      return { opacity: 0, y: travel };
  }
}

export function makeTransition(
  durationSec: number = duration.default,
  delaySec = 0
): Transition {
  return {
    duration: durationSec,
    delay: delaySec,
    ease: easeOut,
  };
}

/** Enter transition (may include delay). Exit never delays. */
export function makeFadeVariants(
  direction: FadeDirection = "up",
  options: {
    distance?: number;
    durationSec?: number;
    delaySec?: number;
  } = {}
): Variants {
  const {
    distance,
    durationSec = duration.default,
    delaySec = 0,
  } = options;
  const hidden = getHiddenState(direction, distance);

  return {
    hidden: {
      ...hidden,
      transition: makeTransition(duration.exit, 0),
    },
    visible: {
      ...visibleState,
      transition: makeTransition(durationSec, delaySec),
    },
  };
}

export const defaultTransition = makeTransition();
