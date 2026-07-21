"use client";

import { FormEvent, useId, useState, type ReactNode } from "react";
import type { Dictionary, Locale } from "@/content";
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

/** Bluewake reference tokens */
const CARD = "rounded-[1.75rem] bg-[#f5f5f5] p-8 sm:p-9 md:p-[2.75rem]";
const LABEL = "block text-[15px] font-medium leading-none text-black";
const CONTROL =
  "box-border h-[52px] w-full appearance-none rounded-full border-0 bg-white px-6 text-[15px] leading-none text-black outline-none placeholder:text-[#c0c0c0] focus:ring-0";

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
    <div id="enquiry" className={CARD}>
      <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
          <Field
            label={t.name}
            htmlFor={`${baseId}-name`}
            error={fieldErrors.name}
            errorId={nameErrorId}
          >
            <input
              id={`${baseId}-name`}
              name="name"
              required
              autoComplete="name"
              placeholder={t.namePlaceholder}
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? nameErrorId : undefined}
              className={CONTROL}
            />
          </Field>

          <Field label={t.phone} htmlFor={`${baseId}-phone`}>
            <input
              id={`${baseId}-phone`}
              name="phone"
              autoComplete="tel"
              placeholder={t.phonePlaceholder}
              className={CONTROL}
            />
          </Field>

          <Field
            label={t.email}
            htmlFor={`${baseId}-email`}
            error={fieldErrors.email}
            errorId={emailErrorId}
          >
            <input
              id={`${baseId}-email`}
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder={t.emailPlaceholder}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? emailErrorId : undefined}
              className={CONTROL}
            />
          </Field>

          <Field label={t.vessel} htmlFor={`${baseId}-vessel`}>
            <input
              id={`${baseId}-vessel`}
              name="vessel"
              autoComplete="organization"
              placeholder={t.vesselPlaceholder}
              className={CONTROL}
            />
          </Field>
        </div>

        <Field label={t.service} htmlFor={`${baseId}-service`}>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger
              id={`${baseId}-service`}
              className={cn(
                CONTROL,
                "flex items-center justify-between gap-2 pr-5",
                "shadow-none focus-visible:ring-0 data-[size=default]:h-[52px]",
                "data-placeholder:text-[#c0c0c0] [&_svg]:size-[18px] [&_svg]:stroke-[1.75] [&_svg]:text-black"
              )}
            >
              <SelectValue placeholder={t.servicePlaceholder} />
            </SelectTrigger>
            <SelectContent
              position="popper"
              sideOffset={8}
              className="max-h-72 w-[var(--radix-select-trigger-width)] rounded-2xl"
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

        <div className="absolute left-[-9999px]" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          aria-busy={status === "sending"}
          className={cn(
            "mt-1 flex h-[52px] w-full items-center justify-center rounded-full bg-black text-[15px] font-semibold text-white transition-colors",
            "hover:bg-[#1a1a1a] disabled:cursor-not-allowed disabled:opacity-60"
          )}
        >
          {status === "sending" ? t.sending : t.submit}
        </button>

        {(status === "success" || status === "error") && (
          <div aria-live="polite" aria-atomic="true" role="status">
            {status === "success" && <p className="form-success">{t.success}</p>}
            {status === "error" && <p className="form-error-banner">{t.error}</p>}
          </div>
        )}
      </form>
    </div>
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
      <label htmlFor={htmlFor} className={LABEL}>
        {label}
      </label>
      {children}
      {error && errorId && (
        <span id={errorId} className="form-field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
