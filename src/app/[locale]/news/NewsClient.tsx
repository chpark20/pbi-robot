"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Badge from "@/components/ui/Badge";
import Pagination from "@/components/ui/Pagination";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import type { ResolvedNewsItem } from "@/data/news";
import type { NewsCategory, Locale } from "@/types";

const ITEMS_PER_PAGE = 6;
const ALL = "all" as const;
type FilterCategory = typeof ALL | NewsCategory;

const FILTER_TABS: FilterCategory[] = [ALL, "press", "award", "exhibition"];

interface NewsClientProps {
  items: ResolvedNewsItem[];
  locale: Locale;
}

export default function NewsClient({ items, locale }: NewsClientProps) {
  const t = useTranslations("news");
  const [filter, setFilter] = useState<FilterCategory>(ALL);
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      filter === ALL ? items : items.filter((i) => i.category === filter),
    [items, filter]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleFilter = (cat: FilterCategory) => {
    setFilter(cat);
    setPage(1);
  };

  return (
    <div>
      {/* ── Category filter ─────────────────────────── */}
      <div
        role="tablist"
        aria-label="News category filter"
        className="flex gap-2 flex-wrap mb-10"
      >
        {FILTER_TABS.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={filter === cat}
            onClick={() => handleFilter(cat)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              filter === cat
                ? "bg-primary text-white"
                : "border border-gray-300 text-text-body hover:border-primary hover:text-primary"
            )}
          >
            {t(`filter.${cat}`)}
          </button>
        ))}
      </div>

      {/* ── News grid ───────────────────────────────── */}
      <AnimatePresence mode="wait">
        {paginated.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-text-sub text-center py-20"
          >
            {t("empty")}
          </motion.p>
        ) : (
          <motion.div
            key={`${filter}-${page}`}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {paginated.map((item) => (
              <motion.div key={item.id} variants={fadeInUp}>
                <Link href={`/news/${item.slug}`} className="group block h-full">
                  <article className="flex flex-col h-full rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow bg-white">
                    {/* Thumbnail */}
                    <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center flex-shrink-0">
                      <span className="text-4xl select-none">📰</span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-5">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <Badge
                          label={t(`filter.${item.category}`)}
                          variant={item.category}
                        />
                        <time
                          dateTime={item.date}
                          className="text-xs text-text-sub"
                        >
                          {formatDate(item.date, locale)}
                        </time>
                      </div>
                      <h3 className="font-semibold text-text-title text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-text-body leading-relaxed line-clamp-3 flex-1">
                        {item.summary}
                      </p>
                      <span className="mt-4 text-xs text-primary font-semibold">
                        {t("readMore")} →
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Pagination ──────────────────────────────── */}
      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
