"use client";

import Script from "next/script";
import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useBookingModal } from "@/components/booking/booking-modal";
import { REAL_VILLAS } from "@/lib/villas-data";

type LeadType = "retiro" | "waitlist";

type SubmitState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const LEAD_COPY: Record<LeadType, { eyebrow: string; title: string; intro: string; placeholder: string }> = {
  retiro: {
    eyebrow: "Host a retreat",
    title: "Retreat inquiry",
    intro: "Tell us about your group and the experience you have in mind — a real person replies within 24 hours.",
    placeholder: "Dates, group size, and the kind of retreat you have in mind",
  },
  waitlist: {
    eyebrow: "Pop-up hotel",
    title: "Join the waitlist",
    intro: "Leave your details and we'll reach out the moment dates open — no commitment.",
    placeholder: "Preferred season, group size, anything else we should know",
  },
};

function LeadForm({ leadType }: { leadType: LeadType }) {
  const copy = LEAD_COPY[leadType];
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref");
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
          <p className="text-xs font-medium uppercase tracking-[2.5px] text-brand">{copy.eyebrow}</p>
          <h1 className="mt-2 text-2xl font-light uppercase tracking-[2px] text-foreground lg:text-3xl">{copy.title}</h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted">{copy.intro}</p>
        </div>

      <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-border bg-surface p-6 sm:grid-cols-2">
        <input type="hidden" name="startedAt" value={startedAt} />
        <input type="hidden" name="leadType" value={leadType} />
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
          Message
          <Textarea
            name="message"
            className="min-h-28"
            placeholder={copy.placeholder}
            defaultValue={reference ? `Interested in: ${reference}\n\n` : undefined}
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

function VillaInquiry() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("villa");
  const initialSlug = REAL_VILLAS.find((v) => v.slug === requested)?.slug ?? REAL_VILLAS[0].slug;
  const { open, modal } = useBookingModal(initialSlug, true);

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-2xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-xs font-medium uppercase tracking-[2.5px] text-brand">Inquiry</p>
      <h1 className="mt-3 text-3xl font-light uppercase tracking-[2px] text-foreground lg:text-4xl">Plan your stay</h1>
      <p className="mt-4 max-w-lg text-sm leading-7 text-muted">
        Pick your group size and dates — no payment, no card. A real person replies within 24 hours with a quote for
        your stay.
      </p>
      <Button variant="primary" className="mt-6" onClick={open}>
        Start your inquiry
      </Button>
      {modal}
    </div>
  );
}

function SolicitudInner() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  if (type === "retiro" || type === "waitlist") {
    return <LeadForm leadType={type} />;
  }
  return <VillaInquiry />;
}

export default function SolicitudPage() {
  return (
    <Suspense fallback={null}>
      <SolicitudInner />
    </Suspense>
  );
}
