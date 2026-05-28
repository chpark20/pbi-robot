"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
// Lazy-load Modal — not needed on initial render, reduces JS parse time
const Modal = dynamic(() => import("@/components/ui/Modal"), { ssr: false });
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { ResolvedProduct } from "@/data/products";
import type { Locale, ProductCategory } from "@/types";

// ── Icon map from lucide-react ────────────────────────────────
import {
  Eye, Navigation, Zap, Smartphone, Sun, Camera, Droplets, BatteryCharging,
  Wind, Layers, BarChart2, Droplet, Cpu, Map, BookOpen, Puzzle,
  Weight, Brush, AlertTriangle, RefreshCw, Package, Sliders, Battery, Leaf,
  Magnet, Move, Video, Shield, LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Eye, Navigation, Zap, Smartphone, Sun, Camera, Droplets, BatteryCharging,
  Wind, Layers, BarChart2, Droplet, Cpu, Map, BookOpen, Puzzle,
  Weight, Brush, AlertTriangle, RefreshCw, Package, Sliders, Battery, Leaf,
  Magnet, Move, Video, Shield,
};

const CATEGORY_GRADIENT: Record<ProductCategory, string> = {
  pool: "from-blue-500 to-cyan-400",
  wall: "from-teal-500 to-emerald-400",
  edu: "from-violet-500 to-purple-400",
};

interface Labels {
  features: string;
  specs: string;
  gallery: string;
  related: string;
  ctaHeading: string;
  ctaSub: string;
  ctaBtn: string;
  akerfTitle: string;
  akerfDesc: string;
  akerfStep1: string;
  akerfStep2: string;
  akerfStep3: string;
  hiwonderTitle: string;
  hiwonderDesc: string;
  hiwonderCurriculum: string;
  hiwonderL1: string;
  hiwonderL2: string;
  hiwonderL3: string;
  hiwonderL4: string;
}

interface ProductDetailClientProps {
  product: ResolvedProduct;
  related: ResolvedProduct[];
  locale: Locale;
  labels: Labels;
}

export default function ProductDetailClient({
  product,
  related,
  labels,
}: ProductDetailClientProps) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="flex flex-col">
      {/* ══ 1. Hero ══ */}
      <section
        className={cn(
          "relative py-20 bg-gradient-to-br text-white overflow-hidden",
          CATEGORY_GRADIENT[product.category]
        )}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <Badge
              label={product.category.toUpperCase()}
              variant={product.category}
              className="mb-4 bg-white/20 text-white border-white/30"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl text-white/80">{product.tagline}</p>
          </div>
          {/* Main image placeholder */}
          <div className="w-full md:w-96 aspect-square rounded-xl bg-white/10 flex items-center justify-center">
            <span className="text-white/30 text-7xl font-black select-none">
              {product.slug.split("-")[0].toUpperCase()}
            </span>
          </div>
        </div>
      </section>

      {/* ══ 2. Description + Features ══ */}
      <section className="py-16 bg-bg-page">
        <div className="container max-w-5xl">
          <p className="text-text-body text-lg leading-relaxed mb-12">
            {product.description}
          </p>

          <h2 className="text-2xl font-bold text-text-title mb-8">
            {labels.features}
          </h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {product.features.map((f, i) => {
              const Icon = ICON_MAP[f.icon ?? ""] ?? Zap;
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="p-6 bg-bg-section rounded-lg border border-gray-100"
                >
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-text-title mb-2">{f.title}</h3>
                  <p className="text-sm text-text-body leading-relaxed">{f.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══ 3. Technical Specs ══ */}
      <section className="py-16 bg-bg-section">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-bold text-text-title mb-8">{labels.specs}</h2>
          <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
            <table className="w-full text-sm">
              <tbody>
                {product.specs.map((spec, i) => (
                  <tr
                    key={i}
                    className={cn(
                      "grid grid-cols-2 border-b last:border-b-0",
                      i % 2 === 0 ? "bg-white" : "bg-gray-50"
                    )}
                  >
                    <td className="px-6 py-4 font-medium text-text-title border-r border-gray-200">
                      {spec.label}
                    </td>
                    <td className="px-6 py-4 text-text-body">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══ 4. Gallery ══ */}
      {product.images.length > 0 && (
        <section className="py-16 bg-bg-page">
          <div className="container max-w-5xl">
            <h2 className="text-2xl font-bold text-text-title mb-8">{labels.gallery}</h2>
            {/* Main image */}
            <div
              className="aspect-video bg-gray-100 rounded-xl mb-4 cursor-zoom-in overflow-hidden flex items-center justify-center"
              onClick={() => setLightboxSrc(product.images[activeImg].src)}
            >
              <div
                className={cn(
                  "w-full h-full bg-gradient-to-br flex items-center justify-center",
                  CATEGORY_GRADIENT[product.category]
                )}
              >
                <span className="text-white/20 text-8xl font-black select-none">
                  {product.slug.split("-")[0].toUpperCase()}
                </span>
              </div>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-3 flex-wrap">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "w-20 h-14 rounded-md border-2 overflow-hidden flex items-center justify-center",
                    "bg-gradient-to-br",
                    CATEGORY_GRADIENT[product.category],
                    activeImg === i ? "border-primary" : "border-transparent"
                  )}
                >
                  <span className="text-white/50 text-xs font-bold">{i + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ 5. Akerf — Mechanism Diagram ══ */}
      {product.slug === "akerf" && (
        <section className="py-16 bg-bg-section">
          <div className="container max-w-4xl">
            <h2 className="text-2xl font-bold text-text-title mb-3">
              {labels.akerfTitle}
            </h2>
            <p className="text-text-body mb-10">{labels.akerfDesc}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { step: "01", text: labels.akerfStep1, color: "bg-red-50 border-red-200 text-red-700" },
                { step: "02", text: labels.akerfStep2, color: "bg-orange-50 border-orange-200 text-orange-700" },
                { step: "03", text: labels.akerfStep3, color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
              ].map((item) => (
                <div
                  key={item.step}
                  className={cn(
                    "rounded-lg border p-6 flex flex-col items-center text-center gap-3",
                    item.color
                  )}
                >
                  <span className="text-3xl font-black opacity-30">{item.step}</span>
                  <p className="text-sm font-medium leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ 6. HiWonder — ROS2 + Curriculum ══ */}
      {product.slug === "hiwonder" && (
        <section className="py-16 bg-bg-section">
          <div className="container max-w-4xl">
            <h2 className="text-2xl font-bold text-text-title mb-3">
              {labels.hiwonderTitle}
            </h2>
            <p className="text-text-body mb-10">{labels.hiwonderDesc}</p>

            {/* ROS2 diagram (text-based) */}
            <div className="bg-gray-900 text-green-400 rounded-xl p-6 font-mono text-sm mb-10 overflow-x-auto">
              <pre>{`ROS2 Architecture — HiWonder EDU
─────────────────────────────────
[Sensors]         [Navigation]
  LiDAR ─────────▶  Nav2 / SLAM
  Camera ─────────▶  YOLO v9
  IMU ────────────▶  EKF Fusion
          │
          ▼
[ROS2 Core]
  /cmd_vel  /scan  /odom
          │
          ▼
[Actuators]
  Wheels  Camera Pan/Tilt  Arm`}</pre>
            </div>

            {/* Curriculum */}
            <h3 className="text-xl font-bold text-text-title mb-6">
              {labels.hiwonderCurriculum}
            </h3>
            <div className="space-y-3">
              {[
                labels.hiwonderL1,
                labels.hiwonderL2,
                labels.hiwonderL3,
                labels.hiwonderL4,
              ].map((level, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-lg bg-white border border-gray-200"
                >
                  <span className="w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-text-body font-medium">{level}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ 7. Related products ══ */}
      {related.length > 0 && (
        <section className="py-16 bg-bg-page">
          <div className="container">
            <h2 className="text-2xl font-bold text-text-title mb-8">
              {labels.related}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`} className="group block">
                  <div className="rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div
                      className={cn(
                        "aspect-video bg-gradient-to-br flex items-center justify-center",
                        CATEGORY_GRADIENT[p.category]
                      )}
                    >
                      <span className="text-white/20 text-5xl font-black">
                        {p.slug.split("-")[0].toUpperCase()}
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-text-title">{p.name}</p>
                      <p className="text-sm text-text-sub mt-1 line-clamp-1">{p.tagline}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ 8. CTA Banner ══ */}
      <section className="py-16 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-3">{labels.ctaHeading}</h2>
          <p className="text-white/70 mb-8 text-lg">{labels.ctaSub}</p>
          <Link href="/contact">
            <Button
              variant="outline"
              size="lg"
              className="border-white/60 text-white hover:bg-white/10 hover:border-white"
            >
              {labels.ctaBtn}
            </Button>
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      <Modal
        isOpen={lightboxSrc !== null}
        onClose={() => setLightboxSrc(null)}
        src={lightboxSrc ?? ""}
        alt={product.name}
      />
    </div>
  );
}
