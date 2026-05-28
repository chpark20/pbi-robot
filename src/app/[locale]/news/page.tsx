import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getNews } from "@/data/news";
import type { Locale } from "@/types";
import NewsClient from "./NewsClient";
import { buildAlternates } from "@/lib/metadata";

interface NewsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news.page" });
  const isKo = locale === "ko";
  return {
    title: t("title"),
    description: isKo
      ? "PBI Robot의 보도자료, 수상·인증, 전시·행사 소식을 확인하세요."
      : "Press releases, awards, and exhibition news from PBI Robot.",
    alternates: buildAlternates("/news"),
    openGraph: {
      images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "news.page" });
  const items = getNews(locale as Locale);

  return (
    <main className="flex flex-col flex-1">
      {/* ── Page hero ───────────────────────────────── */}
      <section className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{t("heading")}</h1>
          <p className="text-white/60 text-lg">{t("subheading")}</p>
        </div>
      </section>

      {/* ── News list (filter + grid + pagination) ──── */}
      <section className="container py-16">
        <NewsClient items={items} locale={locale as Locale} />
      </section>
    </main>
  );
}
