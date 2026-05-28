"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, X } from "lucide-react";
import { useUIStore, type ToastMessage } from "@/store/uiStore";
import { toastVariant } from "@/lib/animations";
import { cn } from "@/lib/utils";

// ── Single Toast Item ─────────────────────────────────────────
function ToastItem({ toast }: { toast: ToastMessage }) {
  const hideToast = useUIStore((s) => s.hideToast);

  // Auto-dismiss after 3 s
  useEffect(() => {
    const timer = setTimeout(() => hideToast(toast.id), 3000);
    return () => clearTimeout(timer);
  }, [toast.id, hideToast]);

  const isSuccess = toast.type === "success";

  return (
    <motion.div
      layout
      key={toast.id}
      variants={toastVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        "flex items-start gap-3 min-w-[280px] max-w-sm",
        "rounded-md shadow-lg px-4 py-3 text-sm font-medium",
        isSuccess
          ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
          : "bg-red-50 border border-red-200 text-red-800"
      )}
    >
      {/* Icon */}
      {isSuccess ? (
        <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500 mt-0.5" />
      ) : (
        <XCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
      )}

      {/* Message */}
      <span className="flex-1">{toast.message}</span>

      {/* Close */}
      <button
        onClick={() => hideToast(toast.id)}
        aria-label="Close notification"
        className="shrink-0 opacity-60 hover:opacity-100 transition-opacity mt-0.5"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

// ── Toast Container ───────────────────────────────────────────
/**
 * Fixed-position container that renders all active toasts.
 * Place once inside the root layout.
 */
export default function ToastContainer() {
  const toasts = useUIStore((s) => s.toasts);

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-[70] flex flex-col gap-2 items-end"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}
