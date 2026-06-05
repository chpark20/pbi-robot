"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import MarqueeSlider from "@/components/sections/MarqueeSlider";
import { useInView } from "@/hooks/useInView";
import { staggerContainer, fadeInUp, fadeIn } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { ResolvedProduct } from "@/data/products";
import type { ResolvedNewsItem } from "@/data/news";
import type { Locale, ProductCategory } from "@/types";

// ── Typewriter hook ───────────────────────────────────────────
function useTypewriter(texts: string[], speed = 90, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    if (!deleting && display === current) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    const delay = deleting ? speed / 2 : speed;
    const t = setTimeout(() => {
      setDisplay((d) =>
        deleting ? d.slice(0, -1) : current.slice(0, d.length + 1)
      );
      if (deleting && display.length === 1) {
        setDeleting(false);
        setIdx((i) => (i + 1) % texts.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [display, deleting, idx, texts, speed, pause]);

  return display;
}

// ── Category data ─────────────────────────────────────────────
const CATEGORY_META: Record<
  "pool" | "wall" | "edu",
  { gradientClass: string; catKey: ProductCategory }
> = {
  pool: { gradientClass: "from-blue-600 to-cyan-500", catKey: "pool" },
  wall: { gradientClass: "from-teal-600 to-emerald-500", catKey: "wall" },
  edu: { gradientClass: "from-violet-600 to-purple-500", catKey: "edu" },
};

const PARTNER_ITEMS = [
  { id: "p1", label: "ISO 9001:2015" },
  { id: "p2", label: "CE Certified" },
  { id: "p3", label: "KC 인증" },
  { id: "p4", label: "한국로봇산업협회" },
  { id: "p5", label: "KOTRA 수출유망기업" },
  { id: "p6", label: "기술혁신형 중소기업(Inno-Biz)" },
  { id: "p7", label: "벤처기업 확인" },
];

// ── Props ─────────────────────────────────────────────────────
interface HomeClientProps {
  locale: Locale;
  products: ResolvedProduct[];
  news: ResolvedNewsItem[];
}

// ─────────────────────────────────────────────────────────────
//  Main Component
// ─────────────────────────────────────────────────────────────
export default function HomeClient({ locale, products, news }: HomeClientProps) {
  const t = useTranslations("home");
  const typingTexts = [
    t("hero.typingText1"),
    t("hero.typingText2"),
    t("hero.typingText3"),
  ];
  const typed = useTypewriter(typingTexts);

  // ── Hero ─────────────────────────────────────────────────
  return (
    <div className="flex flex-col">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-slate-900" />
        {/* Decorative blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />

        {/* Content */}
        <div className="relative z-10 container text-center text-white px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            {/* Main heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="block">{t("hero.heading1")}</span>
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {t("hero.heading2")}
              </span>
            </motion.h1>

            {/* Typing text */}
            <motion.p
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-white/80 h-8 min-w-[12rem]"
            >
              {typed}
              <span className="animate-pulse text-cyan-400">|</span>
            </motion.p>

          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 text-xs"
        >
          <span>{t("hero.scrollHint")}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════ PRODUCT HIGHLIGHTS ═══════════ */}
      <ProductHighlightSection products={products} locale={locale} />

      {/* ═══════════ PARTNER & CERTIFICATIONS ═══════════ */}
      <PartnerSection />

      {/* ═══════════ LATEST NEWS ═══════════ */}
      <LatestNewsSection news={news} locale={locale} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Product Highlight Section
// ─────────────────────────────────────────────────────────────
function ProductHighlightSection({
  products,
  locale,
}: {
  products: ResolvedProduct[];
  locale: Locale;
}) {
  const t = useTranslations("home.productsHighlight");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.15 });

  const poolProduct = products.find((p) => p.category === "pool");
  const wallProduct = products.find((p) => p.slug === "akerf");
  const eduProduct = products.find((p) => p.category === "edu");

  const cards = [
    { key: "pool" as const, product: poolProduct, href: `/${locale}/products?category=pool` },
    { key: "wall" as const, product: wallProduct, href: `/${locale}/products/akerf` },
    { key: "edu" as const, product: eduProduct, href: `/${locale}/products/hiwonder` },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-bg-section py-20 lg:py-28"
    >
      <div className="container">
        {/* Heading */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-text-title mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-text-body text-lg">
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cards.map(({ key, product, href }) => {
            const meta = CATEGORY_META[key];
            return (
              <motion.div key={key} variants={fadeInUp}>
                <a href={href} className="group block">
                  <div className="rounded-lg overflow-hidden border border-gray-200 bg-bg-card hover:shadow-lg transition-shadow duration-300">
                    {/* Image placeholder with gradient */}
                    <div
                      className={cn(
                        "relative aspect-video bg-gradient-to-br flex items-center justify-center",
                        meta.gradientClass
                      )}
                    >
                      <span className="text-white/80 text-5xl font-bold opacity-30 select-none">
                        {key.toUpperCase()}
                      </span>
                      {product && (
                        <div className="absolute bottom-4 left-4">
                          <Badge
                            label={product.name}
                            variant={meta.catKey}
                          />
                        </div>
                      )}
                    </div>

                    {/* Text */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-text-title mb-2">
                        {t(`${key}.title`)}
                      </h3>
                      <p className="text-sm text-text-body mb-4 leading-relaxed">
                        {t(`${key}.description`)}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                        {t(`${key}.cta`)}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  Partner Section
// ─────────────────────────────────────────────────────────────
function PartnerSection() {
  const t = useTranslations("home.stats");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });

  return (
    <section ref={sectionRef} className="py-12 bg-primary text-white">
      <div className="container">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <p className="text-center text-white/60 text-sm mb-6">
            {t("partnerTitle")}
          </p>
          <MarqueeSlider
            items={PARTNER_ITEMS}
            speed={25}
            className="opacity-90"
          />
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  Latest News Section
// ─────────────────────────────────────────────────────────────
function LatestNewsSection({
  news,
  locale,
}: {
  news: ResolvedNewsItem[];
  locale: Locale;
}) {
  const t = useTranslations("home.latestNews");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.15 });

  return (
    <section ref={sectionRef} className="py-20 bg-bg-page">
      <div className="container">
        {/* Heading */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-text-title mb-2"
            >
              {t("title")}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-text-body">
              {t("subtitle")}
            </motion.p>
          </div>
          <motion.div variants={fadeInUp}>
            <Link
              href="/news"
              className="inline-flex items-center gap-1 text-primary font-semibold hover:gap-2 transition-all text-sm"
            >
              {t("viewAll")} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* News grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {news.map((item) => (
            <motion.div key={item.id} variants={fadeInUp}>
              <Card
                title={item.title}
                description={item.summary}
                badge={{ label: item.category, variant: item.category }}
                href={`/news/${item.slug}`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
