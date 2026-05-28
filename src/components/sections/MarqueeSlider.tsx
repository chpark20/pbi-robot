"use client";

import { cn } from "@/lib/utils";

export interface MarqueeItem {
  id: string;
  label: string;
}

export interface MarqueeSliderProps {
  items: MarqueeItem[];
  speed?: number; // seconds for one full loop
  className?: string;
}

/**
 * Infinitely scrolling marquee of text/logo items.
 * Uses pure CSS animation — no JS scroll events.
 * Both ends fade out via a mask-image gradient.
 */
export default function MarqueeSlider({
  items,
  speed = 30,
  className,
}: MarqueeSliderProps) {
  // Duplicate items so the loop is seamless
  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        // Fade-out mask on both ends
        "[mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]",
        className
      )}
    >
      <div
        className="flex gap-12 w-max"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="flex items-center justify-center px-6 py-3 bg-white border border-gray-200 rounded-md text-sm font-semibold text-text-sub whitespace-nowrap shadow-sm"
          >
            {item.label}
          </div>
        ))}
      </div>

      {/* Inline keyframe — avoids global CSS pollution */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
