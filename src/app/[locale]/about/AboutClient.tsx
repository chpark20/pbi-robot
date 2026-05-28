"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Lightbulb, Heart, Globe, Target, Rocket, LucideIcon } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

const ICON_MAP: Record<string, LucideIcon> = {
  Lightbulb, Heart, Globe, Target, Rocket,
};

interface ResolvedTimelineEvent {
  year: number;
  month?: number;
  title: string;
  description: string;
}

interface ResolvedTeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface ResolvedCoreValue {
  icon: string;
  title: string;
  description: string;
}

interface AboutClientProps {
  locale: Locale;
  timeline: ResolvedTimelineEvent[];
  team: ResolvedTeamMember[];
  coreValues: ResolvedCoreValue[];
}

export default function AboutClient({
  locale,
  timeline,
  team,
  coreValues,
}: AboutClientProps) {
  const t = useTranslations("about");

  return (
    <div className="flex flex-col">
      {/* ══ 1. Hero ══ */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" />
        <div className="relative container text-center py-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            {t("page.hero.heading")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-white/70 max-w-2xl mx-auto"
          >
            {t("page.hero.subheading")}
          </motion.p>
        </div>
      </section>

      {/* ══ 2. Vision & Mission ══ */}
      <VisionSection />

      {/* ══ 3. Core Values ══ */}
      <CoreValuesSection values={coreValues} />

      {/* ══ 4. Timeline ══ */}
      <TimelineSection events={timeline} />

      {/* ══ 5. Team ══ */}
      <TeamSection members={team} />

      {/* ══ 6. Location ══ */}
      <LocationSection />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Vision Section
// ─────────────────────────────────────────────────────────────
function VisionSection() {
  const t = useTranslations("about.vision");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-bg-section">
      <div className="container max-w-5xl">
        <motion.h2
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-3xl font-bold text-text-title text-center mb-12"
        >
          {t("title")}
        </motion.h2>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {(["vision", "mission"] as const).map((key) => (
            <motion.div
              key={key}
              variants={fadeInUp}
              className="bg-white rounded-xl border border-gray-200 p-8"
            >
              <span className="inline-block px-3 py-1 rounded-md bg-primary/10 text-primary text-xs font-semibold mb-4">
                {t(`${key}.label`)}
              </span>
              <h3 className="text-xl font-bold text-text-title mb-3">
                {t(`${key}.title`)}
              </h3>
              <p className="text-text-body leading-relaxed">{t(`${key}.description`)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  Core Values
// ─────────────────────────────────────────────────────────────
function CoreValuesSection({ values }: { values: ResolvedCoreValue[] }) {
  const t = useTranslations("about.values");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-bg-page">
      <div className="container max-w-4xl">
        <motion.h2
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-3xl font-bold text-text-title text-center mb-12"
        >
          {t("title")}
        </motion.h2>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {values.map((v, i) => {
            const Icon = ICON_MAP[v.icon] ?? Lightbulb;
            return (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="text-center p-6 rounded-xl bg-bg-section border border-gray-100"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-text-title mb-2">{v.title}</h3>
                <p className="text-sm text-text-body leading-relaxed">{v.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  Timeline Section
// ─────────────────────────────────────────────────────────────
function TimelineSection({ events }: { events: ResolvedTimelineEvent[] }) {
  const t = useTranslations("about.history");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 bg-bg-section">
      <div className="container max-w-4xl">
        <motion.h2
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-3xl font-bold text-text-title text-center mb-14"
        >
          {t("title")}
        </motion.h2>

        <div className="relative">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="flex flex-col gap-8"
          >
            {events.map((event, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className={cn(
                    "relative flex items-start gap-6",
                    // Desktop: alternate left/right
                    "md:w-[calc(50%-2rem)]",
                    isLeft ? "md:ml-0 md:mr-auto md:pr-8" : "md:ml-auto md:mr-0 md:pl-8"
                  )}
                >
                  {/* Year badge */}
                  <div
                    className={cn(
                      "hidden md:flex absolute top-1 w-10 h-10 rounded-full bg-primary text-white",
                      "text-sm font-bold items-center justify-center z-10",
                      isLeft
                        ? "right-[-1.25rem] translate-x-1/2"
                        : "left-[-1.25rem] -translate-x-1/2"
                    )}
                  >
                    {String(event.year).slice(2)}
                  </div>

                  {/* Mobile year badge */}
                  <div className="md:hidden flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    {event.year}
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-primary">
                        {event.year}
                        {event.month ? `.${String(event.month).padStart(2, "0")}` : ""}
                      </span>
                    </div>
                    <h3 className="font-bold text-text-title mb-2">{event.title}</h3>
                    <p className="text-sm text-text-body leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  Team Section
// ─────────────────────────────────────────────────────────────
function TeamSection({ members }: { members: ResolvedTeamMember[] }) {
  const t = useTranslations("about.team");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, threshold: 0.15 });

  return (
    <section ref={ref} className="py-20 bg-bg-page">
      <div className="container">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-text-title mb-2">
            {t("title")}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-text-body">
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {members.map((member, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="text-center"
            >
              {/* Avatar placeholder */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {member.name.charAt(0)}
                </span>
              </div>
              <h3 className="font-bold text-text-title">{member.name}</h3>
              <p className="text-xs text-primary font-semibold mt-1 mb-2">{member.role}</p>
              <p className="text-xs text-text-sub leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  Location Section
// ─────────────────────────────────────────────────────────────
function LocationSection() {
  const t = useTranslations("about.location");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-bg-section">
      <div className="container max-w-5xl">
        <motion.h2
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-3xl font-bold text-text-title mb-10"
        >
          {t("title")}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Map placeholder */}
          <div className="aspect-video md:aspect-auto md:h-72 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-text-sub text-sm">🗺 {t("mapTitle")}</span>
          </div>

          {/* Contact info */}
          <div className="flex flex-col justify-center gap-4 text-sm">
            {[
              { icon: "📍", text: t("address") },
              { icon: "📞", text: t("phone") },
              { icon: "✉️", text: t("email") },
              { icon: "🕐", text: t("hours") },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-lg shrink-0">{item.icon}</span>
                <span className="text-text-body">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
