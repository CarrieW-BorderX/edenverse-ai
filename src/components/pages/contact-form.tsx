"use client";

import { useState } from "react";
import type { SiteContent } from "@/data/site-content";

type ContactFormCopy = SiteContent["contact"]["form"];

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactForm({ copy }: { copy: ContactFormCopy }) {
  const [state, setState] = useState<SubmitState>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");

    const formData = new FormData(event.currentTarget);
    const body = new URLSearchParams();
    body.append("form-name", "contact");
    formData.forEach((value, key) => {
      body.append(key, value.toString());
    });

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.status}`);
      }
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="contact-form-feedback" role="status" aria-live="polite">
        <h3 className="feature-panel-title">{copy.successTitle}</h3>
        <p className="section-copy">{copy.successBody}</p>
      </div>
    );
  }

  return (
    <form
      className="contact-form-layout"
      name="contact"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="contact-honeypot" aria-hidden="true">
        <label>
          Do not fill this out
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <label className="contact-field">
        <span>{copy.nameLabel}</span>
        <input
          type="text"
          name="name"
          placeholder={copy.namePlaceholder}
          required
        />
      </label>
      <label className="contact-field">
        <span>{copy.emailLabel}</span>
        <input
          type="email"
          name="email"
          placeholder={copy.emailPlaceholder}
          required
        />
      </label>
      <label className="contact-field contact-field-full">
        <span>{copy.messageLabel}</span>
        <textarea
          name="message"
          rows={6}
          placeholder={copy.messagePlaceholder}
          required
        />
      </label>
      {state === "error" ? (
        <p className="contact-form-error" role="alert">
          {copy.errorMessage}
        </p>
      ) : null}
      <button
        className="primary-button"
        type="submit"
        disabled={state === "submitting"}
      >
        {state === "submitting" ? copy.submittingLabel : copy.submitLabel}
      </button>
    </form>
  );
}
