"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import {
  duration,
  makeFadeVariants,
  viewportOnce,
  viewportReplay,
  type FadeDirection,
} from "./tokens";

type MotionTag = "div" | "li" | "section" | "article" | "header" | "footer";

type Props = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds (enter only — exits never delay) */
  delay?: number;
  direction?: FadeDirection;
  /** Override travel distance (px). Defaults from tokens. */
  distance?: number;
  durationSec?: number;
  /**
   * `view` — whileInView with replay (default)
   * `mount` — animate once on first paint (Hero / banners)
   */
  trigger?: "view" | "mount";
  /** When trigger=view, override once (default false for replay) */
  once?: boolean;
  as?: MotionTag;
};

const motionTags = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
} as const;

/**
 * Reduced motion is handled by MotionProvider (`reducedMotion="user"`).
 * Variants use a fast exit + calm enter so scroll never feels sticky.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  distance,
  durationSec = duration.default,
  trigger = "view",
  once = false,
  as = "div",
}: Props) {
  const Tag = motionTags[as];
  const variants = makeFadeVariants(direction, {
    distance,
    durationSec,
    delaySec: delay,
  });

  if (trigger === "mount") {
    return (
      <Tag
        className={className}
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={once ? viewportOnce : viewportReplay}
      variants={variants}
    >
      {children}
    </Tag>
  );
}
