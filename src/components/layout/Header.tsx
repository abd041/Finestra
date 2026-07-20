"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { Dictionary, Locale } from "@/content";
import { localePath } from "@/lib/i18n";
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

export function Header({ locale, dict }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const menuId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const links = [
    { href: localePath(locale, "/"), label: dict.nav.home },
    { href: localePath(locale, "/services"), label: dict.nav.services },
    { href: localePath(locale, "/projects"), label: dict.nav.projects },
    { href: localePath(locale, "/about"), label: dict.nav.about },
    { href: localePath(locale, "/contact"), label: dict.nav.contact },
  ];

  const openMenu = () => {
    setMenuMounted(true);
    setOpen(true);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) return;
    const panel = panelRef.current;
    if (!panel || !menuMounted) return;
    const onEnd = (e: TransitionEvent) => {
      if (e.target !== panel) return;
      setMenuMounted(false);
    };
    panel.addEventListener("transitionend", onEnd);
    return () => panel.removeEventListener("transitionend", onEnd);
  }, [open, menuMounted]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    focusables?.[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        buttonRef.current?.focus();
      }
      if (e.key === "Tab" && focusables && focusables.length > 0) {
        const list = Array.from(focusables);
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [open]);

  const menuLabel = open ? dict.common.closeMenu : dict.common.openMenu;
  const solid = scrolled || open;

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 text-white transition-[background,box-shadow,backdrop-filter,border-color] duration-300 ${
        solid
          ? "border-b border-white/10 bg-[rgba(7,13,20,0.92)] shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container grid h-[var(--header-h)] grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <Link
          href={localePath(locale, "/")}
          className="relative z-10 justify-self-start leading-none"
        >
          <span className="font-display text-[1.35rem] font-medium tracking-[-0.03em] text-white md:text-[1.55rem]">
            Finestra
          </span>
          <span className="mt-1 block text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-white/65">
            International
          </span>
        </Link>

        <nav
          className="hidden items-center justify-center gap-9 lg:flex"
          aria-label={dict.common.primaryNav}
        >
          {links.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`nav-link relative text-[0.95rem] font-medium tracking-[-0.01em] transition-opacity duration-300 ${
                  active ? "opacity-100" : "opacity-70 hover:opacity-100"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-white transition-all duration-300 ${
                    active ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center justify-end gap-3 lg:flex">
          <LanguageSwitcher locale={locale} label={dict.common.language} />
          <Link
            href={localePath(locale, "/contact")}
            className="nav-cta inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f3f5f7]"
          >
            {dict.nav.cta}
          </Link>
        </div>

        <button
          ref={buttonRef}
          type="button"
          className="relative z-10 justify-self-end flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white lg:hidden"
          aria-label={menuLabel}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => (open ? closeMenu() : openMenu())}
        >
          <span className="relative block h-3.5 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-5 bg-white transition duration-300 ${
                open ? "top-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-white transition duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-3 block h-0.5 w-5 bg-white transition duration-300 ${
                open ? "top-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id={menuId}
        ref={panelRef}
        className={`overflow-hidden border-t border-white/10 bg-[rgba(7,13,20,0.98)] backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open ? "max-h-[80vh] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
        aria-hidden={!open}
        {...(!open ? { inert: true as const } : {})}
        hidden={!menuMounted}
      >
        <div className="flex flex-col gap-1 px-5 py-6">
          {links.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`nav-link rounded-xl px-3 py-3 text-lg transition hover:bg-white/5 ${
                  active ? "opacity-100" : "opacity-80"
                }`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
            <LanguageSwitcher locale={locale} label={dict.common.language} />
            <Link
              href={localePath(locale, "/contact")}
              className="nav-cta inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold"
              onClick={closeMenu}
            >
              {dict.nav.cta}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
