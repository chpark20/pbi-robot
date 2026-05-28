import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getProductBySlug, getProducts, getAllSlugs } from "@/data/products";
import type { Locale } from "@/types";
import ProductDetailClient from "./ProductDetailClient";
import JsonLd, { buildProductSchema } from "@/components/seo/JsonLd";
import { buildAlternates } from "@/lib/metadata";

interface ProductDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug, locale as Locale);
  if (!product) return {};
  return {
    title: product.name,
    description: product.tagline,
    alternates: buildAlternates(`/products/${slug}`),
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: product.images[0]?.src
        ? [{ url: product.images[0].src, width: 1200, height: 630 }]
        : [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.tagline,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = getProductBySlug(slug, locale as Locale);
  if (!product) notFound();

  // Related: same category, exclude self, max 3
  const related = getProducts(locale as Locale)
    .filter((p) => p.category === product.category && p.slug !== slug)
    .slice(0, 3);

  const t = await getTranslations({ locale, namespace: "products.detail" });

  return (
    <>
      <JsonLd schema={buildProductSchema(product)} />
      <ProductDetailClient
        product={product}
        related={related}
        locale={locale as Locale}
        labels={{
          features: t("features"),
          specs: t("specs"),
          gallery: t("gallery"),
          related: t("related"),
          ctaHeading: t("ctaBanner.heading"),
          ctaSub: t("ctaBanner.subheading"),
          ctaBtn: t("ctaBanner.cta"),
          akerfTitle: t("akerfSection.title"),
          akerfDesc: t("akerfSection.description"),
          akerfStep1: t("akerfSection.step1"),
          akerfStep2: t("akerfSection.step2"),
          akerfStep3: t("akerfSection.step3"),
          hiwonderTitle: t("hiwonderSection.title"),
          hiwonderDesc: t("hiwonderSection.description"),
          hiwonderCurriculum: t("hiwonderSection.curriculumTitle"),
          hiwonderL1: t("hiwonderSection.level1"),
          hiwonderL2: t("hiwonderSection.level2"),
          hiwonderL3: t("hiwonderSection.level3"),
          hiwonderL4: t("hiwonderSection.level4"),
        }}
      />
    </>
  );
}
