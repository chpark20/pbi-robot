import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const [common, home, products, about, news, faq, contact] = await Promise.all([
    import(`../../messages/${locale}/common.json`).then((m) => m.default),
    import(`../../messages/${locale}/home.json`).then((m) => m.default),
    import(`../../messages/${locale}/products.json`).then((m) => m.default),
    import(`../../messages/${locale}/about.json`).then((m) => m.default),
    import(`../../messages/${locale}/news.json`).then((m) => m.default),
    import(`../../messages/${locale}/faq.json`).then((m) => m.default),
    import(`../../messages/${locale}/contact.json`).then((m) => m.default),
  ]);

  return {
    locale,
    messages: {
      ...common,   // navigation, footer, buttons, meta, pages, common
      home,        // home page sections
      products,    // products page sections
      about,       // about page sections
      news,        // news list + detail sections
      faq,         // faq page sections
      contact,     // contact page sections
    },
  };
});
