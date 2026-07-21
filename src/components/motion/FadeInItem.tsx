"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import {
  duration,
  makeFadeVariants,
  offset,
  type FadeDirection,
} from "./tokens";

type Props = {
  children: ReactNode;
  className?: string;
  direction?: FadeDirection;
  distance?: number;
  durationSec?: number;
  as?: "div" | "li" | "article";
};

const motionTags = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
} as const;

/**
 * Child of `<Stagger>` — inherits stagger timing from the parent.
 * Exit stays snappy via shared fade variants.
 */
export function FadeInItem({
  children,
  className,
  direction = "up",
  distance = offset.default,
  durationSec = duration.default,
  as = "div",
}: Props) {
  const Tag = motionTags[as];
  const variants = makeFadeVariants(direction, {
    distance,
    durationSec,
  });

  return (
    <Tag className={className} variants={variants}>
      {children}
    </Tag>
  );
}
