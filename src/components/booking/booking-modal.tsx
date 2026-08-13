"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { REAL_VILLAS } from "@/lib/villas-data";

type Step = 1 | 2 | 3 | 4;

type DemoDay = {
  day: number;
  status: "busy" | "half" | "far" | "peak" | "open";
  price?: number;
};

// August 2026 occupancy — this is the real reference prototype's data, sourced from an
// actual PMS snapshot at build time (per the handoff docs: "Los datos de agosto 2026 son
// ocupación real del PMS, no un mock"). It's frozen, not live — see the Sirvoy integration
// note in memory for why this can't sync automatically yet.
const AUGUST_2026: DemoDay[] = [
  { day: 1, status: "open" },
  { day: 2, status: "busy" },
  { day: 3, status: "busy" },
  { day: 4, status: "busy" },
  { day: 5, status: "busy" },
  { day: 6, status: "busy" },
  { day: 7, status: "open" },
  { day: 8, status: "open" },
  { day: 9, status: "open" },
  { day: 10, status: "open" },
  { day: 11, status: "open" },
  { day: 12, status: "open" },
  { day: 13, status: "open" },
  { day: 14, status: "open" },
  { day: 15, status: "open" },
  { day: 16, status: "open" },
  { day: 17, status: "open" },
  { day: 18, status: "open" },
  { day: 19, status: "open" },
  { day: 20, status: "half" },
  { day: 21, status: "half" },
  { day: 22, status: "half" },
  { day: 23, status: "far" },
  { day: 24, status: "far" },
  { day: 25, status: "peak", price: 3700 },
  { day: 26, status: "peak", price: 3700 },
  { day: 27, status: "open" },
  { day: 28, status: "open" },
  { day: 29, status: "open" },
  { day: 30, status: "open" },
  { day: 31, status: "open" },
];

// Monday-first weekday index for August 1, 2026 (a Saturday) — 5 blank leading cells.
const LEADING_BLANKS = 5;

type BookingModalProps = {
  initialVillaSlug: string;
  onClose: () => void;
};

export function BookingModal({ initialVillaSlug, onClose }: BookingModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [guests, setGuests] = useState(2);
  const [villaSlug, setVillaSlug] = useState(initialVillaSlug);
  const [range, setRange] = useState<{ start: number | null; end: number | null }>({ start: null, end: null });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    trip: "",
    consent: false,
  });

  const villa = REAL_VILLAS.find((v) => v.slug === villaSlug) ?? REAL_VILLAS[0];
  const showMixChip = guests > 14;

  const nights = range.start && range.end ? range.end - range.start : 0;
  const estimatedTotal = nights > 0 ? nights * villa.priceFrom : 0;

  function pickDay(day: number) {
    const info = AUGUST_2026.find((d) => d.day === day);
    if (!info || info.status === "busy") return;

    if (!range.start || (range.start && range.end)) {
      setRange({ start: day, end: null });
      return;
    }
    if (day <= range.start) {
      setRange({ start: day, end: null });
      return;
    }
    // no busy day may fall inside the range
    const hasBusyBetween = AUGUST_2026.some((d) => d.day > range.start! && d.day < day && d.status === "busy");
    if (hasBusyBetween) {
      setRange({ start: day, end: null });
      return;
    }
    setRange({ start: range.start, end: day });
  }

  function cellClass(d: DemoDay) {
    const isSel = d.day === range.start || d.day === range.end;
    const isInRange = range.start && range.end && d.day > range.start && d.day < range.end;
    if (isSel) return "bg-primary text-white";
    if (isInRange) return "bg-primary/15 text-foreground";
    if (d.status === "busy") return "cursor-not-allowed text-muted/40 line-through";
    if (d.status === "half") return "cursor-not-allowed text-muted/50 bg-accent/10";
    if (d.status === "peak") return "bg-accent/10 text-foreground hover:bg-accent/20";
    return "text-foreground hover:bg-primary/10";
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const phoneValid = form.phone.replace(/\D/g, "").length >= 10;
  const errors = {
    firstName: touched.firstName && !form.firstName.trim() ? "Please enter your first name." : null,
    lastName: touched.lastName && !form.lastName.trim() ? "Please enter your last name." : null,
    email: touched.email && !emailValid ? "Check the address — the @ or the domain is missing." : null,
    phone: touched.phone && !phoneValid ? "Please enter at least 10 digits." : null,
  };
  const formValid = form.firstName.trim() && form.lastName.trim() && emailValid && phoneValid && form.consent;

  async function submitInquiry(event: FormEvent) {
    event.preventDefault();
    setTouched({ firstName: true, lastName: true, email: true, phone: true });
    if (!formValid) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const dateSummary =
        range.start && range.end
          ? `Aug ${range.start}–${range.end}, 2026 (${nights} nights)`
          : "Dates flexible / to confirm";
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          message: `Villa: ${villa.name}\nGuests: ${guests}\nDates: ${dateSummary}\nPhone: ${form.phone}\n\n${form.trip}`,
          leadType: "solicitud",
          website: "",
          startedAt: Date.now(),
        }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setSubmitError(data.error ?? "Something went wrong sending your request.");
        setSubmitting(false);
        return;
      }
      setStep(4);
    } catch {
      setSubmitError("Something went wrong sending your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const steps: { n: Step; label: string }[] = [
    { n: 1, label: "Guests" },
    { n: 2, label: "Dates" },
    { n: 3, label: "Details" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-[640px] overflow-y-auto rounded-2xl bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border p-5">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
            <Image src={villa.photo} alt={villa.name} fill sizes="48px" className="object-cover" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Your stay</p>
            {step < 4 ? <p className="text-xs text-muted">No payment, no card · we reply within 24 hours</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-muted hover:bg-background hover:text-foreground"
          >
            &times;
          </button>
        </div>

        {step < 4 ? (
          <div className="flex items-center justify-center gap-2 border-b border-border px-5 py-3">
            {steps.map((s, i) => (
              <div key={s.n} className="flex items-center gap-2">
                <span
                  className={`flex items-center gap-1.5 text-[11px] uppercase tracking-[1px] ${step === s.n ? "text-primary" : step > s.n ? "text-muted" : "text-muted/50"}`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${step >= s.n ? "bg-primary text-white" : "border border-border"}`}
                  >
                    {s.n}
                  </span>
                  {s.label}
                </span>
                {i < steps.length - 1 ? <span className="h-px w-6 bg-border" /> : null}
              </div>
            ))}
          </div>
        ) : null}

        <div className="p-5">
          {step === 1 ? (
            <div className="space-y-5">
              <p className="text-xs text-muted">
                You were looking at <b className="text-foreground">{villa.name}</b> — {villa.suites} suites, up to{" "}
                {villa.guests} guests.
              </p>
              <h3 className="text-lg font-light uppercase tracking-[1.5px] text-foreground">How many of you?</h3>
              <p className="text-sm text-muted">
                We use this to filter which houses fit — and, for larger groups, which villas combine.
              </p>
              <div className="flex items-center justify-center gap-6">
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  aria-label="Remove guest"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-lg text-foreground hover:bg-background"
                >
                  &minus;
                </button>
                <span className="text-3xl font-light text-foreground">{guests}</span>
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.min(28, g + 1))}
                  aria-label="Add guest"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-lg text-foreground hover:bg-background"
                >
                  +
                </button>
              </div>
              <p className="text-center text-xs text-muted">guests</p>

              {showMixChip ? (
                <p className="rounded-xl bg-accent/10 p-3 text-xs leading-5 text-foreground">
                  <b>Groups of 15+</b> — we combine two side-by-side villas under a single contract.
                </p>
              ) : null}

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {REAL_VILLAS.map((v) => (
                  <button
                    key={v.slug}
                    type="button"
                    onClick={() => setVillaSlug(v.slug)}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${v.slug === villaSlug ? "border-primary bg-primary/5" : "border-border hover:bg-background"}`}
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                      <Image src={v.photo} alt={v.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.5px] text-foreground">{v.name}</span>
                      <span className="block text-[11px] text-muted">
                        {v.suites} suites · up to {v.guests} · from ${v.priceFrom.toLocaleString("en-US")}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <strong className="text-sm text-foreground">August 2026</strong>
                <div className="flex gap-1">
                  <button type="button" disabled aria-label="Previous month" className="rounded-full border border-border px-2 py-1 text-xs text-muted/40">
                    &lsaquo;
                  </button>
                  <button type="button" disabled aria-label="Next month" className="rounded-full border border-border px-2 py-1 text-xs text-muted/40">
                    &rsaquo;
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-muted">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <span key={`${d}-${i}`}>{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: LEADING_BLANKS }, (_, i) => (
                  <span key={`blank-${i}`} />
                ))}
                {AUGUST_2026.map((d) => (
                  <button
                    key={d.day}
                    type="button"
                    disabled={d.status === "busy" || d.status === "half"}
                    onClick={() => pickDay(d.day)}
                    className={`flex aspect-square flex-col items-center justify-center rounded-lg text-xs transition ${cellClass(d)}`}
                  >
                    <span>{d.day}</span>
                    {d.status === "peak" && d.price ? <span className="text-[9px]">{(d.price / 1000).toFixed(1)}k</span> : null}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-muted">
                Struck-through dates are already booked. Amber dates carry a peak-season rate.
              </p>
              {range.start ? (
                <p className="text-sm text-foreground">
                  {range.end
                    ? `Aug ${range.start} → Aug ${range.end} · ${nights} nights · ~$${estimatedTotal.toLocaleString("en-US")} estimated`
                    : `Aug ${range.start} selected — pick your check-out`}
                </p>
              ) : null}
            </div>
          ) : null}

          {step === 3 ? (
            <form onSubmit={submitInquiry} className="space-y-4">
              <p className="text-sm text-muted">Almost there — just your details. No payment and no card at this stage.</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="grid gap-1 text-xs text-foreground">
                  First name *
                  <input
                    value={form.firstName}
                    onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                    onBlur={() => setTouched((t) => ({ ...t, firstName: true }))}
                    className="rounded-lg border border-border px-3 py-2 text-base text-foreground"
                  />
                  {errors.firstName ? <span className="text-[11px] text-danger">{errors.firstName}</span> : null}
                </label>
                <label className="grid gap-1 text-xs text-foreground">
                  Last name *
                  <input
                    value={form.lastName}
                    onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                    onBlur={() => setTouched((t) => ({ ...t, lastName: true }))}
                    className="rounded-lg border border-border px-3 py-2 text-base text-foreground"
                  />
                  {errors.lastName ? <span className="text-[11px] text-danger">{errors.lastName}</span> : null}
                </label>
              </div>
              <label className="grid gap-1 text-xs text-foreground">
                Email *
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  className="rounded-lg border border-border px-3 py-2 text-base text-foreground"
                />
                {errors.email ? <span className="text-[11px] text-danger">{errors.email}</span> : null}
              </label>
              <label className="grid gap-1 text-xs text-foreground">
                Phone *
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                  placeholder="33 1234 5678"
                  className="rounded-lg border border-border px-3 py-2 text-base text-foreground"
                />
                {errors.phone ? <span className="text-[11px] text-danger">{errors.phone}</span> : null}
              </label>
              <label className="grid gap-1 text-xs text-foreground">
                Tell us about the trip
                <textarea
                  value={form.trip}
                  onChange={(e) => setForm((f) => ({ ...f, trip: e.target.value }))}
                  placeholder="My mother's birthday — 6 adults and 4 children, we'd love a private chef."
                  className="min-h-20 rounded-lg border border-border px-3 py-2 text-base text-foreground"
                />
                <span className="text-[11px] text-muted">Optional, but it lets us send a full quote in the first reply.</span>
              </label>
              <label className="flex items-start gap-2 text-xs text-muted">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                  className="mt-0.5"
                />
                I agree to be contacted by Coco B Isla by email or WhatsApp about this inquiry. *
              </label>
              {submitError ? <p className="text-xs text-danger">{submitError}</p> : null}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[1.6px] text-white hover:bg-primary-dark disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          ) : null}

          {step === 4 ? (
            <div className="space-y-5 text-center">
              <h3 className="text-xl font-light uppercase tracking-[2px] text-foreground">Inquiry received</h3>
              <p className="mx-auto max-w-xs text-sm text-muted">
                We&rsquo;ll get back to you within 24 hours, to the email and WhatsApp you gave us.
              </p>
              <div className="mx-auto flex max-w-sm items-center gap-3 rounded-xl border border-border p-4 text-left">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                  <Image src={villa.photo} alt={villa.name} fill sizes="48px" className="object-cover" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-foreground">
                    {villa.name} <span className="font-normal text-muted">· {guests} guests</span>
                  </p>
                  {range.start && range.end ? (
                    <p className="text-muted">
                      Aug {range.start} &rarr; Aug {range.end} · {nights} nights · 2026
                    </p>
                  ) : null}
                  {estimatedTotal > 0 ? <p className="mt-1 font-semibold text-foreground">~${estimatedTotal.toLocaleString("en-US")} estimated</p> : null}
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-primary px-6 py-3 text-xs font-semibold uppercase tracking-[1.6px] text-primary hover:bg-primary/5"
              >
                Back to the villas
              </button>
            </div>
          ) : null}
        </div>

        {step < 3 ? (
          <div className="flex items-center justify-between border-t border-border p-5">
            <p className="text-xs text-muted">
              <b className="text-foreground">{villa.name}</b> · {guests} guests
              {step === 1 ? " · pick your nights" : ""}
            </p>
            <button
              type="button"
              disabled={step === 2 && !(range.start && range.end)}
              onClick={() => setStep((s) => (s + 1) as Step)}
              className="rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[1.6px] text-white hover:bg-primary-dark disabled:opacity-40"
            >
              {step === 1 ? "See available dates" : "Continue"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function useBookingModal(initialVillaSlug: string) {
  const [open, setOpen] = useState(false);
  const modal = useMemo(
    () => (open ? <BookingModal initialVillaSlug={initialVillaSlug} onClose={() => setOpen(false)} /> : null),
    [open, initialVillaSlug],
  );
  return { open: () => setOpen(true), modal };
}
