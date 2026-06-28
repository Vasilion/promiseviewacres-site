"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { contactSchema } from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<string, string>>;

const inputClass =
  "w-full rounded-xl border border-earth/15 bg-cream px-4 py-3 text-earth placeholder:text-earth/40 transition-colors focus:border-evergreen focus:outline-none focus:ring-2 focus:ring-evergreen/30";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      subject: String(fd.get("subject") || ""),
      message: String(fd.get("message") || ""),
      company: String(fd.get("company") || ""), // honeypot
    };

    // Client-side validation mirrors the server schema.
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setServerError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("success");
    } catch {
      setServerError(
        "We couldn't reach the server. Please check your connection and try again."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-evergreen/20 bg-linen p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-evergreen text-cream">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-2xl text-earth">Thank you!</h3>
        <p className="mt-2 text-earth/75">
          Your message is on its way. We&apos;ll get back to you as soon as we
          can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-evergreen hover:text-evergreen-deep"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="text-left">
      {/* Honeypot — visually hidden, off-screen, not tab-focusable */}
      <div aria-hidden className="absolute -left-[9999px]" tabIndex={-1}>
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
          />
        </Field>
        <Field label="Email" name="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field label="Phone" name="phone" optional error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(optional)"
            className={inputClass}
          />
        </Field>
        <Field label="Subject" name="subject" optional error={errors.subject}>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="What's this about?"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message" name="message" error={errors.message}>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Tell us a little about what's on your heart…"
            className={`${inputClass} resize-y`}
          />
        </Field>
      </div>

      {serverError && (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-evergreen px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-cream transition-colors hover:bg-evergreen-deep disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  optional,
  error,
  children,
}: {
  label: string;
  name: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-earth/80"
      >
        {label}
        {optional && <span className="ml-1 text-earth/40">(optional)</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}
