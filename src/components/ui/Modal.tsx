"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { overlayVariant, scaleIn } from "@/lib/animations";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Image src for lightbox mode */
  src?: string;
  /** Image alt text */
  alt?: string;
  /** Custom content (if not lightbox) */
  children?: React.ReactNode;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  src,
  alt = "",
  children,
  className,
}: ModalProps) {
  // Close on ESC key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={overlayVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/80 z-50"
            onClick={onClose}
          />

          {/* Content */}
          <motion.div
            key="modal"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-[min(90vw,900px)] max-h-[85vh]",
              className
            )}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-10 right-0 text-white/80 hover:text-white transition-colors p-1"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox image */}
            {src ? (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="bg-white rounded-lg overflow-auto max-h-[85vh] p-6">
                {children}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
