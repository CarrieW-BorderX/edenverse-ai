import { NextResponse, type NextRequest } from "next/server";
import { locales } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /en and /en/... to the canonical prefix-free URL
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const canonical = pathname.slice("/en".length) || "/";
    return NextResponse.redirect(new URL(canonical, request.url));
  }

  // Rewrite paths with no locale prefix to /en/... internally (URL stays clean)
  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (!hasLocalePrefix) {
    const rewritten = NextResponse.rewrite(
      new URL(`/en${pathname}`, request.url),
    );
    rewritten.headers.set("x-pathname", pathname);
    return rewritten;
  }

  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: "/((?!_next|.*\\..*).*)",
};