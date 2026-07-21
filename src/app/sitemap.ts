import type { MetadataRoute } from "next";
import { locales } from "@/content";
import { siteConfig } from "@/lib/media";

const paths = ["", "/services", "/projects", "/about", "/contact", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of paths) {
      entries.push({
        url: `${siteConfig.url}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
        alternates: {
          languages: {
            nl: `${siteConfig.url}/nl${path}`,
            en: `${siteConfig.url}/en${path}`,
            "x-default": `${siteConfig.url}/nl${path}`,
          },
        },
      });
    }
  }

  return entries;
}
