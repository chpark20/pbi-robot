"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Badge, { type BadgeVariant } from "./Badge";

export interface CardProps {
  image?: string;
  title: string;
  description?: string;
  badge?: { label: string; variant?: BadgeVariant };
  href?: string;
  className?: string;
  onClick?: () => void;
}

export default function Card({
  image,
  title,
  description,
  badge,
  href,
  className,
  onClick,
}: CardProps) {
  const Wrapper = href ? "a" : "div";

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.10)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "bg-bg-card border border-gray-200 rounded-lg overflow-hidden",
        "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <Wrapper
        href={href}
        className="flex flex-col h-full no-underline"
      >
        {/* 16:9 image area */}
        {image && (
          <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col gap-2 p-5 flex-1">
          {badge && (
            <Badge label={badge.label} variant={badge.variant} />
          )}
          <h3 className="text-text-title font-semibold leading-snug line-clamp-2">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-text-body leading-relaxed line-clamp-3 flex-1">
              {description}
            </p>
          )}
        </div>
      </Wrapper>
    </motion.div>
  );
}
