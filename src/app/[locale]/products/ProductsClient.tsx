"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Tabs from "@/components/ui/Tabs";
import Badge from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { ResolvedProduct } from "@/data/products";
import type { ProductCategory } from "@/types";

interface ProductsClientProps {
  products: ResolvedProduct[];
}

const ALL_TABS = ["all", "pool", "wall", "edu"] as const;
type FilterTab = (typeof ALL_TABS)[number];

const CATEGORY_COLORS: Record<ProductCategory, string> = {
  pool: "from-blue-500 to-cyan-400",
  wall: "from-teal-500 to-emerald-400",
  edu: "from-violet-500 to-purple-400",
};

export default function ProductsClient({ products }: ProductsClientProps) {
  const t = useTranslations("products");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filtered =
    activeTab === "all"
      ? products
      : products.filter((p) => p.category === activeTab);

  const tabItems = ALL_TABS.map((tab) => ({
    label: t(`filter.${tab}`),
    value: tab,
  }));

  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        {/* Page heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-text-title mb-3">
            {t("page.heading")}
          </h1>
          <p className="text-text-body text-lg max-w-2xl">{t("page.subtitle")}</p>
        </div>

        {/* Tab filter */}
        <div className="mb-10">
          <Tabs
            items={tabItems}
            value={activeTab}
            onChange={(v) => setActiveTab(v as FilterTab)}
          />
        </div>

        {/* Product grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
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
              key={activeTab}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((product) => (
                <motion.div key={product.id} variants={fadeInUp}>
                  <Link href={`/products/${product.slug}`} className="group block">
                    <div className="rounded-lg overflow-hidden border border-gray-200 bg-bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                      {/* Image area */}
                      <div
                        className={cn(
                          "relative aspect-video bg-gradient-to-br flex items-center justify-center overflow-hidden",
                          CATEGORY_COLORS[product.category]
                        )}
                      >
                        <span className="text-white/20 text-6xl font-black select-none uppercase">
                          {product.slug.split("-")[0]}
                        </span>
                        <div className="absolute bottom-3 left-3">
                          <Badge
                            label={product.category.toUpperCase()}
                            variant={product.category}
                          />
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-lg font-bold text-text-title mb-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-text-body mb-4 flex-1 line-clamp-2 leading-relaxed">
                          {product.tagline}
                        </p>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                          {t("card.learnMore")}
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
