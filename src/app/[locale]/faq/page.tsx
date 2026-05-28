import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getFAQ } from "@/data/faq";
import type { Locale } from "@/types";
import FAQClient from "./FAQClient";
import JsonLd, { buildFAQSchema } from "@/components/seo/JsonLd";
import { buildAlternates } from "@/lib/metadata";

interface FAQPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: FAQPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq.page" });
  const isKo = locale === "ko";
  return {
    title: t("title"),
    description: isKo
      ? "PBI Robot 제품 구매, 기술 지원, A/S에 관한 자주 묻는 질문을 확인하세요."
      : "Find answers to frequently asked questions about PBI Robot products, purchase, and support.",
    alternates: buildAlternates("/faq"),
  };
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "faq.page" });
  const items = getFAQ(locale as Locale);

  // Build FAQ JSON-LD schema (use first 10 items to keep schema manageable)
  const faqSchema = buildFAQSchema(items.slice(0, 10));

  return (
    <>
      <JsonLd schema={faqSchema} />
      <main className="flex flex-col flex-1">
        {/* ── Page hero ───────────────────────────────── */}
        <section className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white py-16">
          <div className="container max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{t("heading")}</h1>
            <p className="text-white/60 text-lg">{t("subheading")}</p>
          </div>
        </section>

        {/* ── FAQ content ─────────────────────────────── */}
        <section className="container max-w-4xl py-16">
          <FAQClient items={items} />
        </section>
      </main>
    </>
  );
}
