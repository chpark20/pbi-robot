import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { AppLocale } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ToastContainer from "@/components/ui/Toast";
import { buildAlternates } from "@/lib/metadata";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const isKo = locale === "ko";

  return {
    metadataBase: new URL("https://pbikorea.github.io"),
    title: {
      default: t("defaultTitle"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("defaultDescription"),
    keywords: isKo
      ? ["수영장 청소 로봇", "벽면 청소 로봇", "교육용 로봇", "AI 로봇", "PBI Robot"]
      : ["pool cleaning robot", "wall cleaning robot", "educational robot", "AI robot", "PBI Robot"],
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      locale: t("ogLocale"),
    },
    twitter: {
      card: "summary_large_image",
      site: "@pbirobot",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    alternates: buildAlternates("/"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as AppLocale)) {
    notFound();
  }

  // Enable static rendering for this locale
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full scroll-smooth">
      <head>
        {/* Preconnect to font CDN for faster resource loading */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased bg-bg-page text-text-body">
        <NextIntlClientProvider messages={messages}>
          {/* Top scroll progress bar */}
          <ScrollProgress />

          {/* Sticky header */}
          <Header />

          {/* Main content — padded to clear the fixed header */}
          <main id="main-content" className="flex flex-col flex-1 pt-16">
            {children}
          </main>

          {/* Footer */}
          <Footer />

          {/* Global toast notifications */}
          <ToastContainer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
