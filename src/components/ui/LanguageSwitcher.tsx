"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/uiStore";
import type { Locale } from "@/types";

export interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const setLocale = useUIStore((s) => s.setLocale);

  const handleChange = (locale: Locale) => {
    setLocale(locale); // sync Zustand preference
    router.replace(pathname, { locale });
  };

  return (
    <div
      className={cn("flex items-center gap-0.5 text-sm font-semibold", className)}
      role="group"
      aria-label="Language switcher"
    >
      {(["ko", "en"] as Locale[]).map((locale, i) => (
        <span key={locale} className="flex items-center">
          {i > 0 && (
            <span className="mx-1 text-text-sub font-normal select-none">|</span>
          )}
          <button
            onClick={() => handleChange(locale)}
            aria-pressed={currentLocale === locale}
            className={cn(
              "px-1 py-0.5 rounded transition-colors",
              currentLocale === locale
                ? "text-primary"
                : "text-text-sub hover:text-text-body"
            )}
          >
            {locale.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
