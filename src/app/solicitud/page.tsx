"use client";

import Script from "next/script";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type SubmitState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function SolicitudPage() {
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const [startedAt] = useState(() => new Date().valueOf());

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState({ status: "loading" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      leadType: String(formData.get("leadType") ?? "solicitud"),
      website: String(formData.get("website") ?? ""),
      startedAt: Number(formData.get("startedAt") ?? 0),
      turnstileToken: String(formData.get("cf-turnstile-response") ?? ""),
    };

    const response = await fetch("/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as { ok?: boolean; error?: string; message?: string };

    if (!response.ok || !data.ok) {
      setSubmitState({
        status: "error",
        message: data.error ?? "Something went wrong sending your request.",
      });
      return;
    }

    form.reset();
    setSubmitState({
      status: "success",
      message: data.message ?? "Request sent — we'll reply within 24 hours.",
    });
  }

  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 py-16 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl space-y-8">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[2.5px] text-muted">Get in touch</p>
          <h1 className="mt-2 text-2xl font-light uppercase tracking-[2px] text-foreground lg:text-3xl">Request a Reservation</h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted">
            Tell us your dates and group size — a real person replies within 24 hours.
          </p>
        </div>

      <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-border bg-surface p-6 sm:grid-cols-2">
        <input type="hidden" name="startedAt" value={startedAt} />
        <div className="absolute left-[-9999px] h-0 overflow-hidden opacity-0" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <label className="grid gap-1 text-sm text-foreground">
          Name
          <Input type="text" name="name" placeholder="Full name" required />
        </label>

        <label className="grid gap-1 text-sm text-foreground">
          Email
          <Input type="email" name="email" placeholder="you@example.com" required />
        </label>

        <label className="grid gap-1 text-sm text-foreground sm:col-span-2">
          What are you inquiring about?
          <Select name="leadType" defaultValue="solicitud" required>
            <option value="solicitud">Villa &amp; Wedding Request</option>
            <option value="retiro">Retreat Host Questionnaire</option>
            <option value="waitlist">Pop-up Hotel Waitlist</option>
          </Select>
        </label>

        <label className="grid gap-1 text-sm text-foreground sm:col-span-2">
          Message
          <Textarea
            name="message"
            className="min-h-28"
            placeholder="Dates, group size and what you have in mind"
            required
          />
        </label>

        <Button type="submit" disabled={submitState.status === "loading"} className="sm:col-span-2">
          {submitState.status === "loading" ? "Sending..." : "Send Request"}
        </Button>

        {turnstileSiteKey && (
          <div className="cf-turnstile sm:col-span-2" data-sitekey={turnstileSiteKey} />
        )}

        {submitState.status === "success" && (
          <p className="text-sm text-primary sm:col-span-2">{submitState.message}</p>
        )}

        {submitState.status === "error" && (
          <p className="text-sm text-accent sm:col-span-2">{submitState.message}</p>
        )}
      </form>

      {turnstileSiteKey && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      )}
      </section>
    </div>
  );
}
