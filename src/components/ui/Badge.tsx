import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/types";

// ── Types ─────────────────────────────────────────────────────
export type BadgeVariant =
  | ProductCategory
  | "default"
  | "press"
  | "award"
  | "exhibition"
  | "update"
  | "event";

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

// ── Styles ────────────────────────────────────────────────────
const variantStyles: Record<BadgeVariant, string> = {
  default:    "bg-gray-100 text-text-body",
  pool:       "bg-blue-100 text-blue-700",
  wall:       "bg-emerald-100 text-emerald-700",
  edu:        "bg-violet-100 text-violet-700",
  press:      "bg-orange-100 text-orange-700",
  award:      "bg-amber-100 text-amber-700",
  exhibition: "bg-pink-100 text-pink-700",
  update:     "bg-sky-100 text-sky-700",
  event:      "bg-pink-100 text-pink-700",
};

// ── Component ─────────────────────────────────────────────────
export default function Badge({
  label,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-semibold",
        variantStyles[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
