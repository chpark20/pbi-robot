/**
 * Merge class names — lightweight cn() without external deps.
 * Filters out falsy values and joins with a space.
 */
export function cn(
  ...inputs: (string | undefined | null | false | 0)[]
): string {
  return inputs.filter(Boolean).join(" ");
}

/** Format a date string to locale-aware display */
export function formatDate(
  dateStr: string,
  locale: string = "ko"
): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === "ko" ? "ko-KR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Generate a random unique id (client-side only) */
export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}
