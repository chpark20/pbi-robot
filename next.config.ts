import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/pbi-robot",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    // Limit concurrent page-generation workers to reduce peak memory usage
    cpus: 4,
  },
};

export default withNextIntl(nextConfig);
