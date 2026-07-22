import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist } from "next/font/google";
import { defaultLocale, isLocale } from "@/content";
import { siteConfig } from "@/lib/media";
import { cn } from "@/lib/utils";
import "./globals.css";

/** Bluewake 1:1 — Geist from Google Fonts, weights 400 + 500 only */
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Finestra International",
    template: "%s | Finestra International",
  },
  description:
    "Specialist in glaspolijsten, slijpen, beschermfolie en coating — wereldwijd op locatie.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const headerLocale = headerList.get("x-locale");
  const lang = isLocale(headerLocale || "") ? headerLocale! : defaultLocale;

  return (
    <html
      lang={lang}
      className={cn("no-js h-full font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');`,
          }}
        />
      </head>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
