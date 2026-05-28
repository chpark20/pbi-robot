"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export default function ShareButton() {
  const t = useTranslations("news.share");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for environments without clipboard API
      const dummy = document.createElement("input");
      dummy.value = window.location.href;
      document.body.appendChild(dummy);
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={t("copy")}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors",
        copied
          ? "border-emerald-400 text-emerald-600 bg-emerald-50"
          : "border-gray-300 text-text-body hover:border-primary hover:text-primary"
      )}
    >
      {copied ? (
        <Check className="w-4 h-4" />
      ) : (
        <Link2 className="w-4 h-4" />
      )}
      {copied ? t("copied") : t("copy")}
    </button>
  );
}
