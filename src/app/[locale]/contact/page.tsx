import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { buildAlternates } from "@/lib/metadata";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.page" });
  const isKo = locale === "ko";
  return {
    title: t("title"),
    description: isKo
      ? "PBI Robot에 제품 구매, 기술 지원, 파트너십 등을 문의하세요. 영업일 2일 이내 답변 드립니다."
      : "Contact PBI Robot for product purchases, technical support, or partnership inquiries. We reply within 2 business days.",
    alternates: buildAlternates("/contact"),
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "contact.page" });

  return (
    <main className="flex flex-col flex-1">
      {/* ── Page hero ───────────────────────────────── */}
      <section className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white py-16">
        <div className="container max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{t("heading")}</h1>
          <p className="text-white/60 text-lg">{t("subheading")}</p>
        </div>
      </section>

      {/* ── Form + Info ─────────────────────────────── */}
      <section className="container max-w-5xl py-16">
        <ContactClient />
      </section>
    </main>
  );
}
