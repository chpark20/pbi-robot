"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useScrollY } from "@/hooks/useScrollY";
import { useUIStore } from "@/store/uiStore";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

// ── Nav item data ─────────────────────────────────────────────
const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
  { key: "news", href: "/news" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
] as const;

// ── Helper: is this nav item active? ─────────────────────────
function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

// ── Mobile Drawer ─────────────────────────────────────────────
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  t: ReturnType<typeof useTranslations>;
  pathname: string;
  locale: Locale;
}

function MobileDrawer({ isOpen, onClose, t, pathname, locale }: DrawerProps) {
  const router = useRouter();

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const handleLocaleChange = (next: Locale) => {
    router.replace(pathname, { locale: next });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.aside
            id="mobile-drawer"
            key="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl md:hidden"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
              <Link
                href="/"
                onClick={onClose}
                className="text-xl font-bold text-primary"
              >
                PBI Robot
              </Link>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 rounded-md text-text-sub hover:text-text-title hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col flex-1 overflow-y-auto py-2">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center px-6 py-4 text-base border-b border-gray-50 transition-colors",
                      isActive(item.href, pathname)
                        ? "text-primary font-semibold bg-primary/5"
                        : "text-text-body hover:text-text-title hover:bg-gray-50"
                    )}
                  >
                    {t(item.key)}
                    {isActive(item.href, pathname) && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Language switcher at the bottom */}
            <div className="px-6 py-5 border-t border-gray-100 flex items-center gap-3">
              {(["ko", "en"] as Locale[]).map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-semibold transition-colors",
                    locale === loc
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-text-body hover:bg-gray-200"
                  )}
                >
                  {loc.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Header ────────────────────────────────────────────────────
export default function Header() {
  const t = useTranslations("navigation");
  const scrollY = useScrollY();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const { isMobileMenuOpen, openMobileMenu, closeMobileMenu } = useUIStore();

  const isScrolled = scrollY > 80;

  // Close drawer on route change
  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  return (
    <>
      {/* Skip-to-content for keyboard / screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:text-sm focus:font-semibold"
      >
        {currentLocale === "ko" ? "본문으로 건너뛰기" : "Skip to main content"}
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container flex items-center justify-between h-16">
          {/* ── Logo ── */}
          <Link
            href="/"
            className="text-xl font-bold text-primary hover:opacity-80 transition-opacity"
          >
            PBI Robot
          </Link>

          {/* ── Desktop GNB ── */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href, pathname);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors rounded-sm",
                    "hover:text-text-title focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                    active ? "text-primary" : "text-text-body"
                  )}
                >
                  {t(item.key)}
                  {/* Active underline */}
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Right controls ── */}
          <div className="flex items-center gap-3">
            {/* Language switcher — desktop */}
            <LanguageSwitcher className="hidden md:flex" />

            {/* Hamburger — mobile */}
            <button
              onClick={openMobileMenu}
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-drawer"
              className="md:hidden p-2 rounded-md text-text-body hover:text-text-title hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (rendered outside header for correct z-index stacking) */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        t={t}
        pathname={pathname}
        locale={currentLocale}
      />
    </>
  );
}
