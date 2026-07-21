"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import {
  staggerDelay,
  viewportOnce,
  viewportReplay,
} from "./tokens";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger between children (seconds) */
  stagger?: number;
  /** Delay before first child (seconds) */
  delayChildren?: number;
  once?: boolean;
  /**
   * `view` — whileInView (default)
   * `mount` — animate once on first paint (Hero)
   */
  trigger?: "view" | "mount";
  as?: "div" | "ul" | "ol" | "section";
};

const motionTags = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  section: motion.section,
} as const;

export function Stagger({
  children,
  className,
  stagger = staggerDelay.default,
  delayChildren = 0,
  once = false,
  trigger = "view",
  as = "div",
}: Props) {
  const Tag = motionTags[as];
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };

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
