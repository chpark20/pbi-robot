"use client";

/**
 * useMotionSafe — Returns animation variants respecting
 * the user's `prefers-reduced-motion: reduce` preference.
 *
 * When motion is reduced, returns an empty variants object so
 * Framer Motion renders without transitions.
 *
 * @example
 *   const variants = useMotionSafe(fadeInUp);
 *   <motion.div variants={variants} initial="hidden" animate="visible" />
 */

import { useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

export function useMotionSafe<T extends Variants>(full: T): T | Record<string, never> {
  const prefersReduced = useReducedMotion();
  return prefersReduced ? {} : full;
}
