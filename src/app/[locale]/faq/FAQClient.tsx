"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Minus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { ResolvedFAQItem } from "@/data/faq";
import type { FAQCategory } from "@/types";

const ALL = "all" as const;
type FilterCategory = typeof ALL | FAQCategory;
const TABS: FilterCategory[] = [ALL, "product", "purchase", "support", "other"];

// ─────────────────────────────────────────────────────────────
//  Accordion Item — measures real height via ref
// ─────────────────────────────────────────────────────────────
function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: ResolvedFAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        aria-expanded={isOpen}
        onClick={onToggle}
        className={cn(
          "flex w-full items-start justify-between gap-4 py-5 px-1 text-left",
          "font-medium transition-colors hover:text-primary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded",
          isOpen ? "text-primary" : "text-text-title"
        )}
      >
        <span className="leading-snug pr-2">{item.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 mt-0.5 text-text-sub"
        >
          {isOpen ? (
            <Minus className="w-5 h-5 text-primary" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: contentRef.current?.scrollHeight ?? "auto",
              opacity: 1,
            }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div ref={contentRef} className="pb-5 px-1">
              <p className="text-text-body leading-relaxed whitespace-pre-line">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Main Client Component
// ─────────────────────────────────────────────────────────────
interface FAQClientProps {
  items: ResolvedFAQItem[];
}

export default function FAQClient({ items }: FAQClientProps) {
  const t = useTranslations("faq");
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<FilterCategory>(ALL);
  const [openId, setOpenId] = useState<string | null>(null);

  // Filter by category first, then by search query
  const filtered = useMemo(() => {
    const catFiltered =
      activeCategory === ALL
        ? items
        : items.filter((item) => item.category === activeCategory);

    if (!query.trim()) return catFiltered;

    const q = query.toLowerCase();
    return catFiltered.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [items, activeCategory, query]);

  const handleCategory = (cat: FilterCategory) => {
    setActiveCategory(cat);
    setOpenId(null);
  };

  const handleSearch = (val: string) => {
    setQuery(val);
    setOpenId(null);
  };

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      {/* ── Search ──────────────────────────────────── */}
      <div className="mb-10 max-w-xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-sub pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={t("search.placeholder")}
            className={cn(
              "w-full pl-11 pr-4 py-3 rounded-lg border text-text-body text-sm",
              "border-gray-300 bg-white",
              "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
              "transition-colors"
            )}
          />
        </div>
      </div>

      {/* ── Category tabs ───────────────────────────── */}
      <div
        role="tablist"
        aria-label="FAQ category filter"
        className="flex gap-2 flex-wrap mb-8"
      >
        {TABS.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            onClick={() => handleCategory(cat)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              activeCategory === cat
                ? "bg-primary text-white"
                : "border border-gray-300 text-text-body hover:border-primary hover:text-primary"
            )}
          >
            {t(`categories.${cat}`)}
          </button>
        ))}
      </div>

      {/* ── Accordion list ──────────────────────────── */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-16"
          >
            <p className="text-text-title font-semibold mb-2">
              {t("search.noResults")}
            </p>
            <p className="text-sm text-text-sub">{t("search.noResultsHint")}</p>
          </motion.div>
        ) : (
          <motion.div
            key={`${activeCategory}-${query}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="divide-y divide-gray-200 border-t border-b border-gray-200"
          >
            {filtered.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CTA Banner ──────────────────────────────── */}
      <div className="mt-16 rounded-2xl bg-gradient-to-br from-primary to-accent text-white p-10 text-center">
        <h2 className="text-2xl font-bold mb-3">{t("cta.heading")}</h2>
        <p className="text-white/70 mb-7">{t("cta.sub")}</p>
        <Link
          href="/contact"
          className={cn(
            "inline-flex items-center justify-center px-7 py-3 rounded-lg",
            "bg-white text-primary font-semibold text-sm",
            "hover:bg-white/90 transition-colors"
          )}
        >
          {t("cta.button")}
        </Link>
      </div>
    </div>
  );
}
