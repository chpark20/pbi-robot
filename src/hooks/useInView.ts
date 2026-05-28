"use client";
import { useState, useEffect, type RefObject } from "react";

interface UseInViewOptions extends IntersectionObserverInit {
  /** Fire only once when first entering the viewport (default: true) */
  once?: boolean;
}

/**
 * Returns true when the element attached to `ref` enters the viewport.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const isInView = useInView(ref, { once: true, threshold: 0.2 });
 */
export function useInView(
  ref: RefObject<Element | null>,
  options: UseInViewOptions = {}
): boolean {
  const { once = true, threshold = 0.1, rootMargin = "0px", root } = options;
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin, root }
    );

    observer.observe(element);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, once, threshold, rootMargin]);

  return isInView;
}
