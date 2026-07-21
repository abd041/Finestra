"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { localePath } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "./LanguageSwitcher";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

function isActivePath(pathname: string, href: string) {
  if (href === `/${pathname.split("/")[1]}` || href.match(/^\/(nl|en)$/)) {
    return pathname === href || pathname === `${href}/`;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={cn(
        "text-[0.9rem] font-medium tracking-[-0.01em] transition-colors",
        active ? "text-ink" : "text-muted-foreground hover:text-ink"
      )}
    >
      {label}
    </Link>
  );
}

export function Header({ locale, dict }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: localePath(locale, "/"), label: dict.nav.home },
    { href: localePath(locale, "/services"), label: dict.nav.services },
    { href: localePath(locale, "/projects"), label: dict.nav.projects },
    { href: localePath(locale, "/about"), label: dict.nav.about },
    { href: localePath(locale, "/contact"), label: dict.nav.contact },
  ];

  const leftLinks = links.slice(0, 3);
  const rightLinks = links.slice(3);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "site-header fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,border-color] duration-300",
        scrolled
          ? "border-b border-border/80 bg-white/95 shadow-[0_8px_30px_rgba(10,15,20,0.06)] backdrop-blur-xl"
          : "border-b border-black/5 bg-white"
      )}
    >
      <div className="container flex h-[var(--header-h)] items-center justify-between gap-4">
        {/* Mobile brand */}
        <Link
          href={localePath(locale, "/")}
          className="relative z-10 leading-none lg:hidden"
        >
          <span className="font-display text-[1.35rem] font-medium tracking-[-0.03em] text-ink">
            Finestra
          </span>
          <span className="mt-0.5 block text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            International
          </span>
        </Link>

        {/* Desktop: Bluewake-style split around centered logo */}
        <div className="hidden w-full items-center lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <nav
            className="flex items-center justify-start gap-6 xl:gap-8"
            aria-label={dict.common.primaryNav}
          >
            {leftLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={isActivePath(pathname, link.href)}
              />
            ))}
          </nav>

          <Link
            href={localePath(locale, "/")}
            className="justify-self-center px-6 text-center leading-none"
          >
            <span className="font-display text-[1.5rem] font-medium tracking-[-0.03em] text-ink">
              Finestra
            </span>
            <span className="mt-0.5 block text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              International
            </span>
          </Link>

          <div className="flex items-center justify-end gap-4 xl:gap-5">
            <nav className="flex items-center gap-6 xl:gap-8" aria-label="Secondary">
              {rightLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  active={isActivePath(pathname, link.href)}
                />
              ))}
            </nav>
            <LanguageSwitcher locale={locale} label={dict.common.language} />
            <Button
              asChild
              size="sm"
              className="bg-ink text-white hover:bg-ink/90"
            >
              <Link href={localePath(locale, "/contact")}>{dict.nav.cta}</Link>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-border lg:hidden"
              aria-label={dict.common.openMenu}
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex w-full max-w-sm flex-col px-0">
            <SheetHeader className="border-b border-border px-6 pb-4 text-left">
              <SheetTitle className="font-display text-2xl tracking-[-0.03em]">
                Finestra
              </SheetTitle>
            </SheetHeader>
            <nav
              className="flex flex-col gap-1 px-3 py-4"
              aria-label={dict.common.primaryNav}
            >
              {links.map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-xl px-3 py-3 text-lg transition-colors",
                      active
                        ? "bg-muted text-ink"
                        : "text-muted-foreground hover:bg-muted/70 hover:text-ink"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-border px-6 py-5">
              <LanguageSwitcher locale={locale} label={dict.common.language} />
              <Button asChild className="bg-ink text-white hover:bg-ink/90">
                <Link
                  href={localePath(locale, "/contact")}
                  onClick={() => setOpen(false)}
                >
                  {dict.nav.cta}
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
