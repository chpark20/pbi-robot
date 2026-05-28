import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { getProducts } from "@/data/products";
import { getNews } from "@/data/news";
import type { Locale } from "@/types";
import JsonLd, {
  buildOrganizationSchema,
  buildWebSiteSchema,
} from "@/components/seo/JsonLd";
import { buildAlternates } from "@/lib/metadata";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("defaultTitle"),
    description: t("defaultDescription"),
    alternates: buildAlternates("/"),
    openGraph: {
      images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const products = getProducts(locale as Locale);
  const news = getNews(locale as Locale).slice(0, 3);

  return (
    <>
      <JsonLd schema={buildOrganizationSchema(locale)} />
      <JsonLd schema={buildWebSiteSchema(locale)} />
      <HomeClient locale={locale as Locale} products={products} news={news} />
    </>
  );
}
