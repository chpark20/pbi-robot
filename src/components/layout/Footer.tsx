import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";

// ── KakaoTalk brand icon (simplified inline SVG) ──────────────
function KakaoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 3C6.48 3 2 6.72 2 11.25c0 2.89 1.63 5.44 4.1 7.03L5.04 22l4.5-2.73c.81.16 1.61.23 2.46.23 5.52 0 10-3.72 10-8.25S17.52 3 12 3z" />
    </svg>
  );
}

// ── YouTube brand icon (inline SVG) ──────────────────────────
function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.96-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  );
}

// ── WeChat brand icon (simplified inline SVG) ─────────────────
function WeChatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M8.69 2C4.46 2 1 5.05 1 8.75c0 1.96.88 3.74 2.29 4.99L2 17l3.15-1.69A8.64 8.64 0 0 0 8.69 16c.18 0 .37-.01.55-.02A5.95 5.95 0 0 1 9 14c0-3.31 2.91-6 6.5-6l.19.01C14.96 4.73 12.07 2 8.69 2z" />
      <path d="M15.5 9C12.46 9 10 11.24 10 14s2.46 5 5.5 5c.81 0 1.57-.17 2.26-.48L21 20l-1-2.97A4.97 4.97 0 0 0 21 14c0-2.76-2.46-5-5.5-5z" />
    </svg>
  );
}

// ── SNS channel icon switcher ─────────────────────────────────
function SnsIcon({ channel }: { channel: string }) {
  if (channel === "kakao")   return <KakaoIcon   className="w-6 h-6 text-[#FAE100]" />;
  if (channel === "wechat")  return <WeChatIcon  className="w-6 h-6 text-[#07C160]" />;
  return <YouTubeIcon className="w-6 h-6 text-[#FF0000]" />;
}

// ── Footer ────────────────────────────────────────────────────
export default function Footer() {
  const t   = useTranslations("footer");
  const nav = useTranslations("navigation");
  const year = new Date().getFullYear();

  const snsItems = [
    { key: "kakao",   qr: "/images/sns/qr-kakaotalk.png", name: t("sns.kakaoName"),   alt: t("sns.kakaoAlt")   },
    { key: "wechat",  qr: "/images/sns/qr-wechat.png",    name: t("sns.wechatName"),  alt: t("sns.wechatAlt")  },
    { key: "youtube", qr: "/images/sns/qr-youtube.png",   name: t("sns.youtubeName"), alt: t("sns.youtubeAlt") },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* ── Top grid ── */}
      <div className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — Company + SNS QR codes */}
          <div className="lg:col-span-1">
            <p className="text-white text-xl font-bold mb-3">{t("company")}</p>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              {t("tagline")}
            </p>

            {/* SNS QR section */}
            <div>
              <p className="text-gray-400 text-sm mb-3">{t("snsTitle")}</p>
              <div className="grid grid-cols-3 gap-3">
                {snsItems.map(({ key, qr, name, alt }) => (
                  <div key={key} className="flex flex-col items-center gap-2">
                    {/* Brand icon */}
                    <div className="w-8 h-8 flex items-center justify-center">
                      <SnsIcon channel={key} />
                    </div>
                    {/* QR code image */}
                    <Image
                      src={qr}
                      alt={alt}
                      width={120}
                      height={120}
                      unoptimized
                      className="w-20 h-20 sm:w-[120px] sm:h-[120px] rounded-md border border-gray-700"
                    />
                    {/* Channel name */}
                    <p className="text-xs text-center text-gray-500">{name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2 — Products */}
          <div>
            <p className="text-white font-semibold mb-4">{nav("products")}</p>
            <ul className="space-y-2 text-sm">
              {[
                { label: "수영장 청소 로봇", href: "/products?cat=pool" },
                { label: "벽면 청소 로봇",   href: "/products?cat=wall" },
                { label: "교육용 로봇",       href: "/products?cat=edu"  },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-gray-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Quick links */}
          <div>
            <p className="text-white font-semibold mb-4">링크</p>
            <ul className="space-y-2 text-sm">
              {(
                [
                  ["about",   "/about"  ],
                  ["news",    "/news"   ],
                  ["faq",     "/faq"    ],
                  ["contact", "/contact"],
                ] as const
              ).map(([key, href]) => (
                <li key={key}>
                  <Link href={href} className="text-gray-400 hover:text-white transition-colors">
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <p className="text-white font-semibold mb-4">{nav("contact")}</p>
            <ul className="space-y-3 text-sm">

              {/* Address — HQ + Branch */}
              <li className="text-gray-400">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-gray-500" />
                  <div>
                    <p className="text-sm leading-relaxed">
                      <span className="font-medium text-gray-300">({t("hqLabel")})</span>{" "}
                      {t("hqAddress")}
                    </p>
                    <p className="text-sm leading-relaxed mt-1">
                      <span className="font-medium text-gray-300">({t("branchLabel")})</span>{" "}
                      {t("branchAddress")}
                    </p>
                  </div>
                </div>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 shrink-0 text-gray-500" />
                <a href={`tel:${t("phone")}`} className="hover:text-white transition-colors">
                  {t("phone")}
                </a>
              </li>

              {/* Email */}
              <li>
                <p className="text-xs text-gray-500 mb-1">{t("consultLabel")}</p>
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail className="w-4 h-4 shrink-0 text-gray-500" />
                  <a href={`mailto:${t("email")}`} className="hover:text-white transition-colors">
                    {t("email")}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-800">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>{t("copyright", { year })}</p>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-gray-300 transition-colors">
              {t("links.privacy")}
            </a>
            <a href="/terms" className="hover:text-gray-300 transition-colors">
              {t("links.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
