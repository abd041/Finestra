"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/content";
import { switchLocalePath } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Props = {
  locale: Locale;
  label: string;
  tone?: "light" | "dark";
};

export function LanguageSwitcher({ locale, label, tone = "light" }: Props) {
  const pathname = usePathname();
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "flex items-center rounded-full border p-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em]",
        dark
          ? "border-white/25 bg-white/5"
          : "border-border bg-muted/60"
      )}
      role="group"
      aria-label={label}
    >
      <Link
        href={switchLocalePath(pathname, "nl")}
        hrefLang="nl"
        className={cn(
          "lang-pill rounded-full px-2.5 py-1.5 transition",
          locale === "nl"
            ? dark
              ? "bg-white text-ink"
              : "bg-white text-ink shadow-sm"
            : dark
              ? "text-white/75 hover:text-white"
              : "text-muted-foreground hover:text-ink"
        )}
        aria-current={locale === "nl" ? "true" : undefined}
        lang="nl"
      >
        NL
      </Link>
      <Link
        href={switchLocalePath(pathname, "en")}
        hrefLang="en"
        className={cn(
          "lang-pill rounded-full px-2.5 py-1.5 transition",
          locale === "en"
            ? dark
              ? "bg-white text-ink"
              : "bg-white text-ink shadow-sm"
            : dark
              ? "text-white/75 hover:text-white"
              : "text-muted-foreground hover:text-ink"
        )}
        aria-current={locale === "en" ? "true" : undefined}
        lang="en"
      >
        EN
      </Link>
    </div>
  );
}
