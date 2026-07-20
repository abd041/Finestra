import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/content";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    title: dict.footer.privacy,
    description: dict.privacyPage.sections[0]?.body.slice(0, 155) || dict.meta.defaultDescription,
    path: "/privacy",
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);
  const p = dict.privacyPage;

  return (
    <section className="section pt-36">
      <div className="container max-w-3xl">
        <h1 className="text-[clamp(2.2rem,4vw,3.4rem)] text-ink">{p.title}</h1>
        <p className="mt-3 text-sm text-muted">{p.updated}</p>
        <div className="mt-12 space-y-10">
          {p.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-2xl text-ink">
                {section.heading}
              </h2>
              <p className="mt-3 text-muted">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
