import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { timeline, team, coreValues } from "@/data/about";
import type { Locale } from "@/types";
import { buildAlternates } from "@/lib/metadata";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.page" });
  const isKo = locale === "ko";
  return {
    title: t("title"),
    description: isKo
      ? "PBI Robot의 비전, 미션, 핵심 가치, 연혁, 팀을 소개합니다."
      : "Discover PBI Robot's vision, mission, core values, history, and team.",
    alternates: buildAlternates("/about"),
    openGraph: {
      images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const loc = locale as Locale;

  const resolvedTimeline = timeline.map((e) => ({
    year: e.year,
    month: e.month,
    title: e.title[loc],
    description: e.description[loc],
  }));

  const resolvedTeam = team.map((m) => ({
    name: m.name[loc],
    role: m.role[loc],
    bio: m.bio[loc],
    image: m.image,
  }));

  const resolvedValues = coreValues.map((v) => ({
    icon: v.icon,
    title: v.title[loc],
    description: v.description[loc],
  }));

  return (
    <AboutClient
      locale={loc}
      timeline={resolvedTimeline}
      team={resolvedTeam}
      coreValues={resolvedValues}
    />
  );
}
