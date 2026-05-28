"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin progress bar fixed to the top of the page.
 * Tracks window scroll position using Framer Motion's useScroll.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-primary z-[60] origin-left pointer-events-none"
    />
  );
}
