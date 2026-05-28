/**
 * Shared metadata helpers
 * - buildAlternates: hreflang URL pairs for ko/en pages
 * - SITE_URL: canonical base URL
 */

export const SITE_URL = "https://pbikorea.github.io";

/**
 * Build alternates.languages for a given path.
 * Paths should start with "/" and NOT include the locale prefix.
 *
 * @example
 *   buildAlternates("/products/aquasense-2-pro")
 *   // → { languages: { ko: "/ko/products/aquasense-2-pro", en: "/en/products/aquasense-2-pro" } }
 */
export function buildAlternates(path: string) {
  const clean = path === "/" ? "" : path;
  return {
    languages: {
      ko: `/ko${clean}`,
      en: `/en${clean}`,
    },
  };
}

/**
 * Build a minimal OpenGraph image entry from a relative path.
 * Falls back to a default og-image when no thumbnail is provided.
 */
export function buildOgImage(src?: string | null) {
  const resolved = src ?? "/images/og-default.jpg";
  return [{ url: resolved, width: 1200, height: 630 }];
}
