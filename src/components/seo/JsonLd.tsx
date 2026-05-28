/**
 * JsonLd — inject structured data (JSON-LD) script tags.
 * Server component safe; renders a <script type="application/ld+json"> tag.
 */
interface JsonLdProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

export default function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is safe structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─────────────────────────────────────────────────────────────
//  Schema builders
// ─────────────────────────────────────────────────────────────

export function buildOrganizationSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PBI Robot",
    url: `https://pbikorea.github.io/${locale}`,
    logo: "https://pbikorea.github.io/images/logo.png",
    description:
      locale === "ko"
        ? "AI 수영장 청소 로봇, 벽면 청소 로봇, 교육용 로봇 개발·판매"
        : "AI pool cleaning robots, wall cleaning robots, and educational robots",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        locale === "ko"
          ? "서울특별시 강남구 테헤란로 123"
          : "123 Teheran-ro, Gangnam-gu",
      addressLocality: locale === "ko" ? "서울" : "Seoul",
      addressCountry: "KR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+82-2-1234-5678",
      contactType: "customer service",
      availableLanguage: ["Korean", "English"],
    },
    sameAs: [
      "https://linkedin.com/company/pbi-robot",
      "https://youtube.com/@pbirobot",
      "https://twitter.com/pbirobot",
    ],
  };
}

export function buildProductSchema(product: {
  name: string;
  description: string;
  tagline: string;
  category: string;
  slug: string;
  images: { src: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "PBI Robot",
    },
    category: product.category,
    url: `https://pbikorea.github.io/ko/products/${product.slug}`,
    image:
      product.images[0]?.src
        ? `https://pbikorea.github.io${product.images[0].src}`
        : undefined,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "KRW",
      seller: {
        "@type": "Organization",
        name: "PBI Robot",
      },
    },
  };
}

export function buildFAQSchema(
  items: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildWebSiteSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PBI Robot",
    url: `https://pbikorea.github.io/${locale}`,
    potentialAction: {
      "@type": "SearchAction",
      target: `https://pbikorea.github.io/${locale}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
