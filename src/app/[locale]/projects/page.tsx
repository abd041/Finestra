import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GalleryGrid } from "@/components/projects/GalleryGrid";
import { CTABanner } from "@/components/shared/CTABanner";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageBanner } from "@/components/shared/PageBanner";
import { Testimonials } from "@/components/shared/Testimonials";
import { getDictionary, isLocale, type Locale } from "@/content";
import { localePath } from "@/lib/i18n";
import { media } from "@/lib/media";
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
    title: dict.nav.projects,
    description: dict.projectsPage.subtitle,
    path: "/projects",
  });
}

export default async function ProjectsPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: dict.nav.home, path: "/" },
            { name: dict.nav.projects, path: "/projects" },
          ],
          locale
        )}
      />
      <PageBanner
        eyebrow={dict.projectsPage.eyebrow}
        title={dict.projectsPage.title}
        subtitle={dict.projectsPage.subtitle}
        image={media.banners.projects}
        imageAlt={dict.mediaAlts.projectsBanner}
        pricing
      />
      <GalleryGrid
        items={dict.gallery}
        eyebrow={dict.projectsPage.galleryEyebrow}
        title={dict.projectsPage.galleryTitle}
        body={dict.projectsPage.galleryBody}
        closeLabel={dict.a11y.close}
        prevLabel={dict.a11y.galleryPrev}
        nextLabel={dict.a11y.galleryNext}
      />
      <Testimonials
        eyebrow={dict.home.testimonialsEyebrow}
        title={dict.home.testimonialsTitle}
        body={dict.home.testimonialsBody}
        items={dict.testimonials}
        groupLabel={dict.a11y.testimonials}
        showLabel={dict.a11y.showTestimonial}
      />
      <CTABanner
        eyebrow={dict.projectsPage.ctaEyebrow}
        title={dict.projectsPage.ctaTitle}
        body={dict.projectsPage.ctaBody}
        ctaLabel={dict.common.contactUs}
        ctaHref={localePath(locale, "/contact")}
        phoneLabel={dict.common.phone}
        whatsappLabel={dict.common.whatsapp}
      />
    </>
  );
}
