import Link from "next/link";
import type { Dictionary, Locale } from "@/content";
import { localePath } from "@/lib/i18n";
import { siteConfig } from "@/lib/media";
import { LanguageSwitcher } from "./LanguageSwitcher";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ locale, dict }: Props) {
  const navigate = [
    { href: localePath(locale, "/"), label: dict.nav.home },
    { href: localePath(locale, "/services"), label: dict.nav.services },
    { href: localePath(locale, "/projects"), label: dict.nav.projects },
    { href: localePath(locale, "/about"), label: dict.nav.about },
    { href: localePath(locale, "/contact"), label: dict.nav.contact },
  ];

  return (
    <footer className="site-footer surface-dark" role="contentinfo">
      <div className="container">
        {/* Primary */}
        <div className="grid gap-12 border-b border-white/10 py-14 md:gap-14 md:py-16 lg:grid-cols-[1.35fr_0.85fr_0.95fr_0.75fr] lg:gap-12">
          <div className="max-w-md">
            <Link href={localePath(locale, "/")} className="inline-block group">
              <p className="font-display text-[1.75rem] leading-none tracking-[-0.03em] text-white transition group-hover:opacity-90">
                Finestra
              </p>
              <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/45">
                International
              </p>
            </Link>
            <p className="mt-7 text-[0.95rem] leading-relaxed text-white/55 md:text-[1rem] md:leading-[1.7]">
              {dict.footer.tagline}
            </p>
            <Link
              href={localePath(locale, "/contact")}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:gap-3"
            >
              {dict.common.contactUs}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div>
            <p className="mb-6 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/40">
              {dict.footer.explore}
            </p>
            <ul className="space-y-3.5">
              {navigate.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.95rem] text-white/65 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-6 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/40">
              {dict.nav.contact}
            </p>
            <ul className="space-y-4 text-[0.95rem]">
              {siteConfig.hasPhone && (
                <li>
                  <a
                    href={siteConfig.phoneHref}
                    className="group block text-white/65 transition hover:text-white"
                  >
                    <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/35">
                      {dict.common.phone}
                    </span>
                    <span className="mt-1 block font-display text-lg tracking-[-0.02em] text-white">
                      {siteConfig.phoneDisplay}
                    </span>
                  </a>
                </li>
              )}
              {siteConfig.hasWhatsapp && (
                <li>
                  <a
                    href={siteConfig.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/65 transition hover:text-white"
                  >
                    {dict.common.whatsapp}
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-white/65 transition hover:text-white"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="pt-1 text-white/45 leading-relaxed">
                <span className="block text-white/65">{siteConfig.addressLine1}</span>
                <span className="block">
                  {siteConfig.addressLine2}
                </span>
                <span className="block">{siteConfig.country}</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-6 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/40">
              {dict.footer.legal}
            </p>
            <ul className="space-y-3.5">
              {siteConfig.hasTerms && (
                <li>
                  <a
                    href="/docs/terms.pdf"
                    className="text-[0.95rem] text-white/65 transition hover:text-white"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {dict.footer.terms}
                  </a>
                </li>
              )}
              <li>
                <Link
                  href={localePath(locale, "/privacy")}
                  className="text-[0.95rem] text-white/65 transition hover:text-white"
                >
                  {dict.footer.privacy}
                </Link>
              </li>
              <li className="pt-4 text-sm leading-relaxed text-white/35">
                KvK {siteConfig.kvk}
                <br />
                BTW {siteConfig.btw}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-white/40">
            {dict.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <LanguageSwitcher
              locale={locale}
              label={dict.common.language}
              tone="dark"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
