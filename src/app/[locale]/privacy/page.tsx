import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/shared/JsonLd";
import { getDictionary, isLocale, type Locale } from "@/content";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    title: dict.meta.privacyTitle,
    description: dict.meta.privacyDescription,
    path: "/privacy",
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const p = dict.privacyPage;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: dict.nav.home, path: "/" },
            { name: dict.footer.privacy, path: "/privacy" },
          ],
          locale
        )}
      />
      <section className="section pt-36">
        <div className="container max-w-3xl">
          <h1 className="text-[clamp(2.2rem,4vw,3.4rem)] text-ink">{p.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{p.updated}</p>
          <div className="mt-12 space-y-10">
            {p.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-2xl text-ink">
                  {section.heading}
                </h2>
                <p className="mt-3 text-muted-foreground">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
