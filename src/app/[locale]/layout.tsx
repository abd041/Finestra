import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/shared/JsonLd";
import { SetHtmlLang } from "@/components/shared/SetHtmlLang";
import { SkipLink } from "@/components/shared/SkipLink";
import { getDictionary, isLocale, locales, type Locale } from "@/content";
import { organizationJsonLd, buildPageMetadata } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    title: dict.meta.defaultTitle,
    description: dict.meta.defaultDescription,
    path: "",
  });
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(locale)};`,
        }}
      />
      <SetHtmlLang locale={locale} />
      <JsonLd data={organizationJsonLd(dict.meta.defaultDescription, locale)} />
      <SkipLink label={dict.common.skipToContent} />
      <div className="flex min-h-full flex-col">
        <Header locale={locale} dict={dict} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} dict={dict} />
      </div>
    </>
  );
}
