"use client";

import { type ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// ── Styles ────────────────────────────────────────────────────
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary/40",
  secondary:
    "bg-gray-100 text-text-title hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-gray-300",
  outline:
    "border border-primary text-primary hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary/30",
  ghost:
    "text-text-body hover:bg-gray-100 hover:text-text-title focus-visible:ring-2 focus-visible:ring-gray-200",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm rounded-sm gap-1.5",
  md: "h-10 px-5 text-sm rounded-md gap-2",
  lg: "h-12 px-8 text-base rounded-md gap-2.5",
};

// ── Component ─────────────────────────────────────────────────
export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  leftIcon,
  rightIcon,
  children,
  className,
  onClick,
  type = "button",
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      whileTap={isDisabled ? undefined : { scale: 0.97 }}
      whileHover={isDisabled ? undefined : { scale: 1.01 }}
      transition={{ duration: 0.12 }}
      className={cn(
        "inline-flex items-center justify-center font-medium",
        "transition-colors focus-visible:outline-none",
        "disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...(rest as object)}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
}
