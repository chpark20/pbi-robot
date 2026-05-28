import { create } from "zustand";
import { persist } from "zustand/middleware";
import { uid } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────
export type Locale = "ko" | "en";

export interface ToastMessage {
  id: string;
  type: "success" | "error";
  message: string;
}

interface UIState {
  // ── Locale (persisted) ────────────────────────────────────
  locale: Locale;
  setLocale: (locale: Locale) => void;

  // ── Mobile Menu ───────────────────────────────────────────
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;

  // ── Toast Notifications ───────────────────────────────────
  toasts: ToastMessage[];
  showToast: (type: "success" | "error", message: string) => void;
  hideToast: (id: string) => void;
  clearToasts: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // ── Locale ────────────────────────────────────────────
      locale: "ko",
      setLocale: (locale) => set({ locale }),

      // ── Mobile Menu ───────────────────────────────────────
      isMobileMenuOpen: false,
      openMobileMenu: () => set({ isMobileMenuOpen: true }),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),
      toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

      // ── Toast ─────────────────────────────────────────────
      toasts: [],
      showToast: (type, message) =>
        set((state) => ({
          toasts: [...state.toasts, { id: uid(), type, message }],
        })),
      hideToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        })),
      clearToasts: () => set({ toasts: [] }),
    }),
    {
      name: "pbi-robot-ui",
      // Only persist locale preference — never persist transient UI state
      partialize: (state) => ({ locale: state.locale }),
    }
  )
);
