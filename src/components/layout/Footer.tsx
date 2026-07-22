import Link from "next/link";
import type { Dictionary, Locale } from "@/content";
import { FadeIn } from "@/components/motion/FadeIn";
import { duration, offset } from "@/components/motion/tokens";
import { localePath } from "@/lib/i18n";
import { siteConfig } from "@/lib/media";
import { LanguageSwitcher } from "./LanguageSwitcher";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

/** Bluewake light footer — #f8f8f8, paragraph links, accent hover */
export function Footer({ locale, dict }: Props) {
  const navigate = [
    { href: localePath(locale, "/"), label: dict.nav.home },
    { href: localePath(locale, "/services"), label: dict.nav.services },
    { href: localePath(locale, "/projects"), label: dict.nav.projects },
    { href: localePath(locale, "/about"), label: dict.nav.about },
    { href: localePath(locale, "/contact"), label: dict.nav.contact },
  ];

  const linkClass =
    "type-body text-[var(--paragraph)] transition-colors duration-[350ms] hover:text-[var(--accent-blue)]";

  return (
    <footer className="site-footer pt-[var(--section-spacing)]" role="contentinfo">
      <FadeIn as="div" distance={offset.footer} durationSec={duration.fast} once>
        <div className="container">
          <div className="mb-[var(--section-spacing)] flex flex-col gap-[50px] lg:flex-row lg:justify-between">
            <div className="flex max-w-[280px] flex-col gap-[26px]">
              <Link href={localePath(locale, "/")} className="inline-block group">
                <p className="type-h4 normal-case text-black transition group-hover:opacity-90">
                  Finestra
                </p>
                <p className="type-label mt-2 text-[var(--paragraph)]">
                  International
                </p>
              </Link>
              <p className="type-body text-[var(--paragraph)]">
                {dict.footer.tagline}
              </p>
              <Link
                href={localePath(locale, "/contact")}
                className="type-button inline-flex items-center gap-2 text-black transition hover:gap-3 hover:text-[var(--accent-blue)]"
              >
                {dict.common.contactUs}
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="flex flex-col gap-[70px] sm:flex-row">
              <div>
                <p className="type-label mb-4 text-black">{dict.footer.explore}</p>
                <ul className="flex flex-col gap-4">
                  {navigate.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={linkClass}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="type-label mb-4 text-black">{dict.nav.contact}</p>
                <ul className="type-body flex flex-col gap-4">
                  {siteConfig.hasPhone && (
                    <li>
                      <a href={siteConfig.phoneHref} className={linkClass}>
                        {siteConfig.phoneDisplay}
                      </a>
                    </li>
                  )}
                  {siteConfig.hasWhatsapp && (
                    <li>
                      <a
                        href={siteConfig.whatsappHref}
                        target="_blank"
                        rel="noreferrer"
                        className={linkClass}
                      >
                        {dict.common.whatsapp}
                      </a>
                    </li>
                  )}
                  <li>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className={linkClass}
                    >
                      {siteConfig.email}
                    </a>
                  </li>
                  <li className="type-body text-[var(--paragraph)]">
                    <span className="block">{siteConfig.addressLine1}</span>
                    <span className="block">{siteConfig.addressLine2}</span>
                    <span className="block">{siteConfig.country}</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="type-label mb-4 text-black">{dict.footer.legal}</p>
                <ul className="flex flex-col gap-4">
                  {siteConfig.hasTerms && (
                    <li>
                      <a
                        href="/docs/terms.pdf"
                        className={linkClass}
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
                      className={linkClass}
                    >
                      {dict.footer.privacy}
                    </Link>
                  </li>
                  <li className="type-caption pt-2 text-[var(--paragraph)]">
                    KvK {siteConfig.kvk}
                    <br />
                    BTW {siteConfig.btw}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 border-t border-[var(--borders)] py-5 md:flex-row md:items-center md:justify-between">
            <p className="type-caption max-w-xl text-[var(--paragraph)]">
              {dict.footer.rights}
            </p>
            <LanguageSwitcher
              locale={locale}
              label={dict.common.language}
              tone="light"
            />
          </div>
        </div>
      </FadeIn>
    </footer>
  );
}
