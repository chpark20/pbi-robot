import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getNewsBySlug, getAllNewsSlugs, getNews } from "@/data/news";
import type { Locale } from "@/types";
import { formatDate } from "@/lib/utils";
import { buildAlternates } from "@/lib/metadata";
import Badge from "@/components/ui/Badge";
import ShareButton from "./ShareButton";

interface NewsDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllNewsSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = getNewsBySlug(slug, locale as Locale);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
    alternates: buildAlternates(`/news/${slug}`),
    openGraph: {
      title: item.title,
      description: item.summary,
      type: "article",
      publishedTime: item.date,
      images: item.thumbnail
        ? [{ url: item.thumbnail, width: 1200, height: 630 }]
        : [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.summary,
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const item = getNewsBySlug(slug, locale as Locale);
  if (!item) notFound();

  const t = await getTranslations({ locale, namespace: "news" });
  const dateStr = formatDate(item.date, locale);

  // Related: same category, exclude self, max 3
  const allNews = getNews(locale as Locale);
  const related = allNews
    .filter((n) => n.category === item.category && n.slug !== slug)
    .slice(0, 3);

  return (
    <main className="flex flex-col flex-1">
      <article className="container py-16 max-w-3xl">

        {/* ── Back link ───────────────────────────────── */}
        <Link
          href="/news"
          className="inline-flex items-center text-sm text-text-sub hover:text-primary transition-colors mb-8"
        >
          {t("backToList")}
        </Link>

        {/* ── Header ──────────────────────────────────── */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Badge
              label={t(`filter.${item.category}`)}
              variant={item.category}
            />
            <time dateTime={item.date} className="text-sm text-text-sub">
              {t("detail.publishedOn")} {dateStr}
            </time>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-title leading-tight">
            {item.title}
          </h1>
        </header>

        {/* ── Thumbnail ───────────────────────────────── */}
        <div
          className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mb-10 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-gray-400 text-5xl select-none">📰</span>
        </div>

        {/* ── Summary ─────────────────────────────────── */}
        <p className="text-text-body text-lg leading-relaxed mb-8 font-medium border-l-4 border-primary pl-4">
          {item.summary}
        </p>

        {/* ── Content ─────────────────────────────────── */}
        <div className="prose prose-gray max-w-none">
          {item.content.split("\n\n").map((para, i) => (
            <p key={i} className="text-text-body leading-relaxed mb-4">
              {para}
            </p>
          ))}
        </div>

        {/* ── Share ───────────────────────────────────── */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex items-center gap-3">
          <span className="text-sm text-text-sub font-medium">
            {t("share.button")}
          </span>
          <ShareButton />
        </div>
      </article>

      {/* ── Related news ────────────────────────────── */}
      {related.length > 0 && (
        <section aria-label={t("related.title")} className="bg-bg-section py-16">
          <div className="container max-w-3xl">
            <h2 className="text-xl font-bold text-text-title mb-8">
              {t("related.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/news/${rel.slug}`}
                  className="group block"
                >
                  <article className="rounded-lg border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow bg-white">
                    <div
                      className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <span className="text-3xl select-none">📰</span>
                    </div>
                    <div className="p-4">
                      <Badge
                        label={t(`filter.${rel.category}`)}
                        variant={rel.category}
                        className="mb-2"
                      />
                      <h3 className="text-sm font-semibold text-text-title line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                        {rel.title}
                      </h3>
                      <time
                        dateTime={rel.date}
                        className="text-xs text-text-sub mt-2 block"
                      >
                        {formatDate(rel.date, locale as Locale)}
                      </time>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
