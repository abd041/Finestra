"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/content";
import { switchLocalePath } from "@/lib/i18n";

type Props = {
  locale: Locale;
  label: string;
};

export function LanguageSwitcher({ locale, label }: Props) {
  const pathname = usePathname();

  return (
    <div
      className="flex items-center rounded-full border border-white/25 bg-white/5 p-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em]"
      role="group"
      aria-label={label}
    >
      <Link
        href={switchLocalePath(pathname, "nl")}
        hrefLang="nl"
        className={`lang-pill rounded-full px-2.5 py-1.5 transition ${
          locale === "nl" ? "bg-white" : "hover:opacity-100 opacity-90"
        }`}
        aria-current={locale === "nl" ? "true" : undefined}
        lang="nl"
      >
        NL
      </Link>
      <Link
        href={switchLocalePath(pathname, "en")}
        hrefLang="en"
        className={`lang-pill rounded-full px-2.5 py-1.5 transition ${
          locale === "en" ? "bg-white" : "hover:opacity-100 opacity-90"
        }`}
        aria-current={locale === "en" ? "true" : undefined}
        lang="en"
      >
        EN
      </Link>
    </div>
  );
}
