"use client";

import { FormEvent, useId, useState } from "react";
import type { Dictionary, Locale } from "@/content";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const fieldClass =
  "rounded-2xl border border-[var(--line)] bg-sand/40 px-4 py-3.5 outline-none transition focus:border-ink/30 focus:bg-white focus:ring-2 focus:ring-ink/10 aria-[invalid=true]:border-error/50 aria-[invalid=true]:bg-error/[0.03]";

export function ContactForm({ locale, dict }: Props) {
  const t = dict.contactPage;
  const baseId = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = t.errorNameRequired;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = t.errorEmailInvalid;
    }
    if (!message) nextErrors.message = t.errorMessageRequired;
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("idle");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: data.get("phone"),
          service: data.get("service"),
          message,
          locale,
          website: data.get("website"),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
      setFieldErrors({});
    } catch {
      setStatus("error");
    }
  }

  const nameErrorId = `${baseId}-name-error`;
  const emailErrorId = `${baseId}-email-error`;
  const messageErrorId = `${baseId}-message-error`;

  return (
    <form
      id="enquiry"
      onSubmit={onSubmit}
      noValidate
      className="relative rounded-[var(--radius-panel)] bg-sand p-8 shadow-[var(--shadow-sm)] md:p-10 lg:p-12"
    >
      <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] text-ink">{t.formTitle}</h2>
      <div className="mt-9 grid gap-5">
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-ink">{t.name}</span>
          <input
            name="name"
            required
            autoComplete="name"
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? nameErrorId : undefined}
            className={fieldClass}
          />
          {fieldErrors.name && (
            <span id={nameErrorId} className="form-field-error" role="alert">
              {fieldErrors.name}
            </span>
          )}
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-ink">{t.email}</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? emailErrorId : undefined}
            className={fieldClass}
          />
          {fieldErrors.email && (
            <span id={emailErrorId} className="form-field-error" role="alert">
              {fieldErrors.email}
            </span>
          )}
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-ink">{t.phone}</span>
          <input name="phone" autoComplete="tel" className={fieldClass} />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-ink">{t.service}</span>
          <select name="service" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              {t.servicePlaceholder}
            </option>
            {dict.serviceCards.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-ink">{t.message}</span>
          <textarea
            name="message"
            required
            rows={5}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? messageErrorId : undefined}
            className={`resize-y ${fieldClass}`}
          />
          {fieldErrors.message && (
            <span id={messageErrorId} className="form-field-error" role="alert">
              {fieldErrors.message}
            </span>
          )}
        </label>
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-dark mt-8 w-full sm:w-auto disabled:cursor-wait disabled:opacity-70"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
      >
        {status === "sending" ? t.sending : t.submit}
      </button>

      <div className="mt-4 min-h-[1.5rem]" aria-live="polite" aria-atomic="true" role="status">
        {status === "success" && <p className="form-success">{t.success}</p>}
        {status === "error" && <p className="form-error-banner">{t.error}</p>}
      </div>
    </form>
  );
}
