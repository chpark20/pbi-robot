"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/uiStore";

// ─────────────────────────────────────────────────────────────
//  Zod schema (inline custom resolver — no @hookform/resolvers needed)
// ─────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, "nameRequired"),
  email: z.string().email("emailInvalid"),
  phone: z.string().optional(),
  inquiryType: z.enum(["product", "support", "partnership", "other"]),
  title: z.string().min(5, "titleRequired"),
  message: z.string().min(20, "messageRequired"),
  privacyConsent: z
    .boolean()
    .refine((v) => v === true, { message: "privacyRequired" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// Custom resolver: converts zod issues → react-hook-form errors
function zodResolver<T extends z.ZodType>(schema: T) {
  return async (values: unknown) => {
    const result = schema.safeParse(values);
    if (result.success) {
      return { values: result.data, errors: {} };
    }
    const errors: Record<string, { type: string; message: string }> = {};
    for (const issue of result.error.issues) {
      const path = (issue.path.join(".") || issue.path[0]?.toString()) ?? "";
      if (path && !errors[path]) {
        errors[path] = { type: issue.code, message: issue.message };
      }
    }
    return { values: {}, errors };
  };
}

// ─────────────────────────────────────────────────────────────
//  Field wrapper
// ─────────────────────────────────────────────────────────────
function Field({
  label,
  badge,
  error,
  children,
}: {
  label: string;
  badge?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-2 text-sm font-medium text-text-title">
        {label}
        {badge && (
          <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-text-sub font-normal">
            {badge}
          </span>
        )}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-red-500 mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Input / Textarea base styles
// ─────────────────────────────────────────────────────────────
const inputCls = (hasError: boolean) =>
  cn(
    "w-full px-4 py-3 rounded-lg border text-text-body text-sm bg-white",
    "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors",
    hasError ? "border-red-400 bg-red-50/40" : "border-gray-300"
  );

// ─────────────────────────────────────────────────────────────
//  ContactClient
// ─────────────────────────────────────────────────────────────
export default function ContactClient() {
  const t = useTranslations("contact");
  const f = useTranslations("contact.form");
  const { showToast } = useUIStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { privacyConsent: false },
  });

  const onSubmit = async (data: ContactFormValues) => {
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    const endpoint = formspreeId
      ? `https://formspree.io/f/${formspreeId}`
      : null;

    try {
      if (!endpoint) {
        // No Formspree ID configured — simulate success in dev
        await new Promise((r) => setTimeout(r, 800));
        showToast("success", f("success"));
        reset();
        return;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        showToast("success", f("success"));
        reset();
      } else {
        showToast("error", f("error"));
      }
    } catch {
      showToast("error", f("error"));
    }
  };

  // Helper: translate error message key (stored in message field)
  const err = (key: keyof ContactFormValues) => {
    const msg = errors[key]?.message;
    if (!msg) return undefined;
    // If msg is a translation key, look it up; otherwise return as-is
    try {
      return f(msg as Parameters<typeof f>[0]);
    } catch {
      return msg;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
      {/* ═══════════════════════════════════════
          Left: Form (60%)
      ═══════════════════════════════════════ */}
      <div className="lg:col-span-3">
        <h2 className="text-2xl font-bold text-text-title mb-8">
          {t("page.heading")}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          {/* Row: name + email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label={f("name")} badge={f("required")} error={err("name")}>
              <input
                type="text"
                autoComplete="name"
                placeholder={f("namePlaceholder")}
                className={inputCls(!!errors.name)}
                {...register("name")}
              />
            </Field>

            <Field label={f("email")} badge={f("required")} error={err("email")}>
              <input
                type="email"
                autoComplete="email"
                placeholder={f("emailPlaceholder")}
                className={inputCls(!!errors.email)}
                {...register("email")}
              />
            </Field>
          </div>

          {/* Row: phone + inquiryType */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label={f("phone")} badge={f("optional")}>
              <input
                type="tel"
                autoComplete="tel"
                placeholder={f("phonePlaceholder")}
                className={inputCls(!!errors.phone)}
                {...register("phone")}
              />
            </Field>

            <Field
              label={f("inquiryType")}
              badge={f("required")}
              error={err("inquiryType")}
            >
              <select
                className={cn(inputCls(!!errors.inquiryType), "cursor-pointer")}
                {...register("inquiryType")}
              >
                <option value="" disabled>
                  {f("inquiryTypePlaceholder")}
                </option>
                {(
                  ["product", "support", "partnership", "other"] as const
                ).map((type) => (
                  <option key={type} value={type}>
                    {f(`inquiryTypes.${type}`)}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          {/* Subject */}
          <Field label={f("title")} badge={f("required")} error={err("title")}>
            <input
              type="text"
              placeholder={f("titlePlaceholder")}
              className={inputCls(!!errors.title)}
              {...register("title")}
            />
          </Field>

          {/* Message */}
          <Field
            label={f("message")}
            badge={f("required")}
            error={err("message")}
          >
            <textarea
              rows={6}
              placeholder={f("messagePlaceholder")}
              className={cn(inputCls(!!errors.message), "resize-none")}
              {...register("message")}
            />
          </Field>

          {/* Privacy consent */}
          <div className="flex flex-col gap-1">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className={cn(
                  "mt-0.5 w-4 h-4 rounded border-gray-300 text-primary",
                  "focus:ring-2 focus:ring-primary/30 cursor-pointer",
                  errors.privacyConsent ? "border-red-400" : ""
                )}
                {...register("privacyConsent")}
              />
              <span className="text-sm text-text-body leading-snug group-hover:text-text-title transition-colors">
                {f("privacyConsent")}{" "}
                <span className="text-xs text-text-sub ml-1">
                  ({f("required")})
                </span>
              </span>
            </label>
            {errors.privacyConsent && (
              <p role="alert" className="text-xs text-red-500 ml-7">
                {err("privacyConsent")}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "inline-flex items-center gap-2 justify-center",
              "px-8 py-3.5 rounded-lg bg-primary text-white font-semibold text-sm",
              "hover:bg-accent transition-colors",
              "disabled:opacity-60 disabled:cursor-not-allowed"
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {f("submitting")}
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {f("submit")}
              </>
            )}
          </button>
        </form>
      </div>

      {/* ═══════════════════════════════════════
          Right: Company Info (40%)
      ═══════════════════════════════════════ */}
      <aside className="lg:col-span-2">
        <div className="sticky top-24">
          <h2 className="text-xl font-bold text-text-title mb-6">
            {t("info.title")}
          </h2>

          <div className="space-y-5 mb-8">
            {[
              { Icon: MapPin,  text: t("info.address") },
              { Icon: Phone,   text: t("info.phone") },
              { Icon: Mail,    text: t("info.email") },
              { Icon: Clock,   text: t("info.hours") },
            ].map(({ Icon, text }, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-text-body leading-relaxed pt-1.5">
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="aspect-video rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200 overflow-hidden">
            <div className="text-center text-text-sub text-sm">
              <span className="text-3xl block mb-2">🗺</span>
              {t("info.mapTitle")}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
