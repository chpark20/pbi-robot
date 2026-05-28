// ─────────────────────────────────────────────
//  Locale
// ─────────────────────────────────────────────
export type Locale = "ko" | "en";

/** Bilingual string used in static data files */
export interface L10n {
  ko: string;
  en: string;
}

// ─────────────────────────────────────────────
//  Product
// ─────────────────────────────────────────────
export type ProductCategory = "pool" | "wall" | "edu";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductImage {
  src: string;
  alt: string;
  isPrimary?: boolean;
}

export interface ProductFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  specs: ProductSpec[];
  images: ProductImage[];
  features: ProductFeature[];
}

// ─────────────────────────────────────────────
//  News
// ─────────────────────────────────────────────
export type NewsCategory = "press" | "award" | "exhibition";

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  date: string; // ISO 8601 format: "YYYY-MM-DD"
  category: NewsCategory;
  thumbnail: string;
  summary: string;
  content: string;
}

// ─────────────────────────────────────────────
//  FAQ
// ─────────────────────────────────────────────
export type FAQCategory = "product" | "purchase" | "support" | "other";

export interface FAQItem {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
}

// ─────────────────────────────────────────────
//  Navigation
// ─────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// ─────────────────────────────────────────────
//  Contact Form
// ─────────────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
}
