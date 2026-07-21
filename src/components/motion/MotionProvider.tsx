"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { duration, easeOut } from "./tokens";

type Props = {
  children: ReactNode;
};

/**
 * Site-wide Motion defaults + respect prefers-reduced-motion.
 */
export function MotionProvider({ children }: Props) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: duration.default, ease: easeOut }}
    >
      {children}
    </MotionConfig>
  );
}
