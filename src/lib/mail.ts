import nodemailer from "nodemailer";

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  vessel?: string;
  service?: string;
  message: string;
  locale?: string;
};

export async function sendContactEmail(payload: ContactPayload) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL || user;
  const from = process.env.SMTP_FROM || user;

  if (!host || !user || !pass || !to || !from) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, and CONTACT_TO_EMAIL."
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const subject = `[Finestra International] New enquiry from ${payload.name}`;
  const text = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "—"}`,
    `Vessel / company: ${payload.vessel || "—"}`,
    `Service: ${payload.service || "—"}`,
    `Locale: ${payload.locale || "—"}`,
    "",
    payload.message,
  ].join("\n");

  await transporter.sendMail({
    from,
    to,
    replyTo: payload.email,
    subject,
    text,
  });
}
