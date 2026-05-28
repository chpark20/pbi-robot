import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MapPin, Phone, Mail } from "lucide-react";

// ── Inline SVG social icons (lucide-react v1 has no platform icons) ──
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.96-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// ── Social link data ──────────────────────────────────────────
const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/company/pbi-robot", Icon: LinkedInIcon },
  { label: "YouTube", href: "https://youtube.com/@pbirobot", Icon: YouTubeIcon },
  { label: "X (Twitter)", href: "https://twitter.com/pbirobot", Icon: XIcon },
];

// ── Footer ────────────────────────────────────────────────────
export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("navigation");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* ── Top grid ── */}
      <div className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — Company */}
          <div className="lg:col-span-1">
            <p className="text-white text-xl font-bold mb-3">{t("company")}</p>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              {t("tagline")}
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-md bg-gray-800 text-gray-400 hover:bg-primary hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Products */}
          <div>
            <p className="text-white font-semibold mb-4">{nav("products")}</p>
            <ul className="space-y-2 text-sm">
              {[
                { label: "수영장 청소 로봇", href: "/products?cat=pool" },
                { label: "벽면 청소 로봇", href: "/products?cat=wall" },
                { label: "교육용 로봇", href: "/products?cat=edu" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
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
                  ["about", "/about"],
                  ["news", "/news"],
                  ["faq", "/faq"],
                  ["contact", "/contact"],
                ] as const
              ).map(([key, href]) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
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
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-gray-500" />
                <span>{t("address")}</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 shrink-0 text-gray-500" />
                <a href={`tel:${t("phone")}`} className="hover:text-white transition-colors">
                  {t("phone")}
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 shrink-0 text-gray-500" />
                <a href={`mailto:${t("email")}`} className="hover:text-white transition-colors">
                  {t("email")}
                </a>
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
