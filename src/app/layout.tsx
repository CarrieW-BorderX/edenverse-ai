import type { Metadata } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";
import { locales, type Locale } from "@/lib/i18n";
import "./globals.css";

const satoshi = localFont({
  src: [
    { path: "../../public/fonts/satoshi/Satoshi-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/satoshi/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/satoshi/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/satoshi/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Edenverse AI",
  description:
    "Edenverse AI builds advanced robotics solutions for industrial automation, education, and mission-critical safety.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") ?? "/";
  const segment = pathname.split("/")[1];
  const lang: Locale = locales.includes(segment as Locale) ? (segment as Locale) : "en";

  return (
    <html lang={lang} className={`${satoshi.variable} ${satoshi.className}`}>
      <head>
        <link
          rel="preconnect"
          href="https://cdn.shopify.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
