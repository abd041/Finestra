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
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
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

/** Bluewake .nav-link — hover accent #004b91 */
const navLinkClass = (active: boolean) =>
  cn(
    "type-nav rounded-none bg-transparent px-[15px] py-[10px] shadow-none transition-colors duration-[350ms] hover:bg-transparent focus:bg-transparent focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] data-active:bg-transparent",
    active
      ? "text-black"
      : "text-black hover:text-[var(--accent-blue)]"
  );

export function Header({ locale, dict }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPathname, setMenuPathname] = useState(pathname);

  // Close sheet on navigation (adjust state during render when pathname changes)
  if (pathname !== menuPathname) {
    setMenuPathname(pathname);
    if (open) setOpen(false);
  }

  // Close mobile sheet when resizing to desktop nav (lg) so overlay cannot trap clicks
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const links = [
    { href: localePath(locale, "/"), label: dict.nav.home },
    { href: localePath(locale, "/services"), label: dict.nav.services },
    { href: localePath(locale, "/projects"), label: dict.nav.projects },
    { href: localePath(locale, "/about"), label: dict.nav.about },
    { href: localePath(locale, "/contact"), label: dict.nav.contact },
  ];

  const leftLinks = links.slice(0, 3);
  const rightLinks = links.slice(3);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-[1000] bg-white p-2">
      <div className="flex items-center justify-between gap-4 rounded-t-[4px] border border-[var(--borders)] bg-white px-[15px] py-[15px]">
        <Link
          href={localePath(locale, "/")}
          className="relative z-10 leading-none lg:hidden"
        >
          <span className="type-h5 normal-case text-black">Finestra</span>
          <span className="type-label mt-0.5 block text-[var(--paragraph)]">
            International
          </span>
        </Link>

        <div className="container hidden w-full max-w-none items-center !px-0 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <NavigationMenu
            viewport={false}
            className="max-w-none flex-none justify-start"
            aria-label={dict.common.primaryNav}
          >
            <NavigationMenuList className="gap-0">
              {leftLinks.map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink
                      asChild
                      className={navLinkClass(active)}
                      active={active}
                    >
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <Link
            href={localePath(locale, "/")}
            className="justify-self-center px-6 text-center leading-none"
          >
            <span className="type-h4 normal-case text-black">Finestra</span>
            <span className="type-label mt-0.5 block text-[var(--paragraph)]">
              International
            </span>
          </Link>

          <div className="flex items-center justify-end gap-4 xl:gap-5">
            <NavigationMenu
              viewport={false}
              className="max-w-none flex-none"
              aria-label={`${dict.nav.about}, ${dict.nav.contact}`}
            >
              <NavigationMenuList className="gap-0">
                {rightLinks.map((link) => {
                  const active = isActivePath(pathname, link.href);
                  return (
                    <NavigationMenuItem key={link.href}>
                      <NavigationMenuLink
                        asChild
                        className={navLinkClass(active)}
                        active={active}
                      >
                        <Link
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
            <LanguageSwitcher locale={locale} label={dict.common.language} />
            <Button asChild className="ml-[25px]">
              <Link href={localePath(locale, "/contact")}>{dict.nav.cta}</Link>
            </Button>
          </div>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              aria-label={dict.common.openMenu}
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex w-[320px] max-w-[320px] flex-col border-[var(--borders)] px-0"
            closeLabel={dict.common.closeMenu}
          >
            <SheetHeader className="border-b border-[var(--borders)] px-5 pb-4 text-left">
              <SheetTitle className="type-h4 normal-case">Finestra</SheetTitle>
            </SheetHeader>
            <nav
              className="flex flex-col gap-0 px-5 py-5"
              aria-label={dict.common.primaryNav}
            >
              {links.map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "type-nav block w-full py-[10px] transition-colors hover:text-[var(--accent-blue)]",
                      active ? "text-black" : "text-black"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto flex flex-col gap-5 border-t border-[var(--borders)] px-5 py-5">
              <LanguageSwitcher locale={locale} label={dict.common.language} />
              <Button asChild>
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
