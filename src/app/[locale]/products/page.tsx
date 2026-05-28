import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";
import { getProducts } from "@/data/products";
import type { Locale } from "@/types";
import { buildAlternates } from "@/lib/metadata";

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProductsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products.page" });
  const isKo = locale === "ko";
  return {
    title: t("title"),
    description: isKo
      ? "AI 수영장 청소 로봇 AquaSense, 건물 외벽 청소 SORA, 교육용 HiWonder 전 제품 라인업"
      : "AI pool cleaning AquaSense, building facade SORA, educational HiWonder — full product lineup",
    alternates: buildAlternates("/products"),
    openGraph: {
      images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const products = getProducts(locale as Locale);

  return <ProductsClient products={products} />;
}
