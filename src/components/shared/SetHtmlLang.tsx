"use client";

import { useEffect } from "react";
import type { Locale } from "@/content";

export function SetHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
