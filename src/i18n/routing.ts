import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ko", "en"] as const,
  defaultLocale: "ko",
});

export type AppLocale = (typeof routing.locales)[number];
