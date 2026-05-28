// Next.js 16+ uses "proxy" instead of "middleware"
// This replaces src/middleware.ts for locale detection and routing.
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - _next (Next.js static files)
  // - api (API routes)
  // - static files with extensions (e.g. .ico, .png)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
