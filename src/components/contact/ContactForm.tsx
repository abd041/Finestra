"use client";

import { FormEvent, useId, useState, type ReactNode } from "react";
import type { Dictionary, Locale } from "@/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const fieldClass = cn(
  "type-field h-auto w-full rounded-[50px] border-0 bg-white px-5 py-[14px] text-[var(--paragraph)] shadow-none",
  "placeholder:text-[var(--paragraph)]/50",
  "focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]/30"
);

const labelClass = "type-body text-black";

export function ContactForm({ locale, dict }: Props) {
  const t = dict.contactPage;
  const baseId = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [service, setService] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const vessel = String(data.get("vessel") || "").trim();
    const selectedService = service || String(data.get("service") || "").trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = t.errorNameRequired;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = t.errorEmailInvalid;
    }
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("idle");
      const firstKey = nextErrors.name ? "name" : nextErrors.email ? "email" : null;
      if (firstKey) {
        window.requestAnimationFrame(() => {
          document.getElementById(`${baseId}-${firstKey}`)?.focus();
        });
      }
      return;
    }

    const messageParts = [
      vessel ? `${t.vessel}: ${vessel}` : null,
      selectedService ? `${t.service}: ${selectedService}` : null,
      "Enquiry submitted via the website contact form.",
    ].filter(Boolean);

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          vessel: vessel || undefined,
          service: selectedService || undefined,
          message: messageParts.join("\n"),
          locale,
          website: data.get("website"),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
      setService("");
      setFieldErrors({});
    } catch {
      setStatus("error");
    }
  }

  const nameErrorId = `${baseId}-name-error`;
  const emailErrorId = `${baseId}-email-error`;

  return (
    <Card
      id="enquiry"
      className="gap-0 rounded-[4px] border-0 bg-[var(--light-gray)] py-0 shadow-none ring-0"
    >
      <CardContent className="p-8 sm:p-9 md:p-[2.75rem]">
        <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
            <Field
              label={t.name}
              htmlFor={`${baseId}-name`}
              error={fieldErrors.name}
              errorId={nameErrorId}
            >
              <Input
                id={`${baseId}-name`}
                name="name"
                required
                autoComplete="name"
                placeholder={t.namePlaceholder}
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? nameErrorId : undefined}
                className={fieldClass}
              />
            </Field>

            <Field label={t.phone} htmlFor={`${baseId}-phone`}>
              <Input
                id={`${baseId}-phone`}
                name="phone"
                autoComplete="tel"
                placeholder={t.phonePlaceholder}
                className={fieldClass}
              />
            </Field>

            <Field
              label={t.email}
              htmlFor={`${baseId}-email`}
              error={fieldErrors.email}
              errorId={emailErrorId}
            >
              <Input
                id={`${baseId}-email`}
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder={t.emailPlaceholder}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? emailErrorId : undefined}
                className={fieldClass}
              />
            </Field>

            <Field label={t.vessel} htmlFor={`${baseId}-vessel`}>
              <Input
                id={`${baseId}-vessel`}
                name="vessel"
                autoComplete="organization"
                placeholder={t.vesselPlaceholder}
                className={fieldClass}
              />
            </Field>
          </div>

          <Field label={t.service} htmlFor={`${baseId}-service`}>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger
                id={`${baseId}-service`}
                className={cn(
                  fieldClass,
                  "flex items-center justify-between gap-2 pr-5",
                  "data-[size=default]:h-[52px] data-placeholder:text-[#c0c0c0]",
                  "[&_svg]:size-[18px] [&_svg]:stroke-[1.75] [&_svg]:text-black"
                )}
              >
                <SelectValue placeholder={t.servicePlaceholder} />
              </SelectTrigger>
              <SelectContent
                position="popper"
                sideOffset={8}
                className="max-h-72 w-[var(--radix-select-trigger-width)] rounded-[4px]"
              >
                {dict.serviceCards.map((s) => (
                  <SelectItem key={s.id} value={s.title}>
                    {s.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="hidden" name="service" value={service} />
          </Field>

          {/* Honeypot — visually hidden, not aria-hidden (focusable control) */}
          <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
            <label htmlFor={`${baseId}-website`}>
              Website
              <input
                id={`${baseId}-website`}
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="h-px w-px"
              />
            </label>
          </div>

          <Button
            type="submit"
            disabled={status === "sending"}
            aria-busy={status === "sending"}
            className="mt-1 h-[52px] w-full"
          >
            {status === "sending" ? t.sending : t.submit}
          </Button>

          <div aria-live="polite" aria-atomic="true" role="status" className="min-h-[1.5rem]">
            {status === "success" && <p className="form-success">{t.success}</p>}
            {status === "error" && <p className="form-error-banner">{t.error}</p>}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  htmlFor,
  children,
  error,
  errorId,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
  error?: string;
  errorId?: string;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <Label htmlFor={htmlFor} className={labelClass}>
        {label}
      </Label>
      {children}
      {error && errorId && (
        <span id={errorId} className="form-field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
