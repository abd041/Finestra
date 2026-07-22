"use client";

import { useEffect } from "react";

/** Keeps <html lang> in sync on client navigations without rendering a <script>. */
export function HtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
