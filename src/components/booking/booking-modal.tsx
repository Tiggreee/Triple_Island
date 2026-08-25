"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { REAL_VILLAS } from "@/lib/villas-data";
import { trackEvent } from "@/lib/analytics";
import { Azulejo } from "@/components/ui/azulejo";
import {
  UNITS,
  CALENDAR_MONTHS,
  MONTH_NAMES,
  iso,
  fmtDate,
  seasonOf,
  bookedFor,
  partialFor,
  rateFor,
  nights as nightsBetween,
  minNights,
  nextBusyAfter,
  rangeHasBusy,
} from "@/lib/availability";

type Step = 1 | 2 | 3 | 4;

type BookingModalProps = {
  initialVillaSlug: string;
  onClose: () => void;
};

function money(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

export function BookingModal({ initialVillaSlug, onClose }: BookingModalProps) {
  const initialUnit = Math.max(0, REAL_VILLAS.findIndex((v) => v.slug === initialVillaSlug));
  const [step, setStep] = useState<Step>(1);
  const [guests, setGuests] = useState(2);
  const [unit, setUnit] = useState(initialUnit);
  const [mi, setMi] = useState(0);
  const [ci, setCi] = useState<string | null>(null);
  const [co, setCo] = useState<string | null>(null);
  const [warn, setWarn] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    flexible: "",
    heard: "",
    trip: "",
    consent: false,
  });

  const active = UNITS[unit];
  const cameFrom = UNITS[initialUnit];
  const [year, month] = CALENDAR_MONTHS[mi];
  const today = new Date();
  const todayIso = iso(today.getFullYear(), today.getMonth(), today.getDate());

  useEffect(() => {
    trackEvent("stepper_inicio", { unit: UNITS[initialUnit].name });
  }, [initialUnit]);

  const nightCount = nightsBetween(ci, co);
  const min = minNights(ci);
  const nightlyRate = (ci && rateFor(unit, ci)) || active.from;
  const estimatedTotal = nightCount > 0 ? nightlyRate * nightCount : 0;
  const datesValid = Boolean(ci && co && nightCount >= min);
  const limit = ci && !co ? nextBusyAfter(unit, ci, year, month) : null;

  function tap(s: string) {
    setWarn(null);
    if (!ci || co) {
      setCi(s);
      setCo(null);
      return;
    }
    if (s > ci) {
      const clash = rangeHasBusy(unit, ci, s, year, month);
      if (clash) {
        setCi(s);
        setCo(null);
        setWarn(
          `${active.name} is booked on ${fmtDate(clash)}. A stay can't run across a booked night — we moved your check-in to ${fmtDate(s)}. Pick a check-out before the next booked night, or ask us about combining two villas.`,
        );
        return;
      }
      setCo(s);
      return;
    }
    setCi(s);
  }

  function dayClass(o: { sel: boolean; inRange: boolean; booked: boolean; part: boolean; far: boolean; past: boolean; peak: boolean }): string {
    if (o.sel) return "bg-primary text-white";
    if (o.inRange) return "bg-primary/15 text-foreground";
    if (o.booked && !o.part) return "cursor-not-allowed text-muted/40 line-through";
    if (o.part) return "cursor-not-allowed text-muted/60 [background:repeating-linear-gradient(45deg,transparent,transparent_3px,#78787830_3px,#78787830_6px)]";
    if (o.past || o.far) return "cursor-not-allowed text-muted/30";
    if (o.peak) return "bg-accent/10 text-foreground hover:bg-accent/20";
    return "text-foreground hover:bg-primary/10";
  }

  const cells = useMemo(() => {
    const offset = (new Date(year, month, 1).getDay() + 6) % 7;
    const days = new Date(year, month + 1, 0).getDate();
    const out: { key: string; day: number | null; s: string | null }[] = [];
    for (let k = 0; k < offset; k++) out.push({ key: `blank-${k}`, day: null, s: null });
    for (let d = 1; d <= days; d++) out.push({ key: iso(year, month, d), day: d, s: iso(year, month, d) });
    return out;
  }, [year, month]);

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
        ci && co ? `${fmtDate(ci)} → ${fmtDate(co)}, ${ci.slice(0, 4)} (${nightCount} nights)` : "Dates flexible / to confirm";
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          message: `Villa: ${active.name}\nGuests: ${guests}\nDates: ${dateSummary}\nPhone: ${form.phone}${form.flexible ? `\nDates flexible: ${form.flexible}` : ""}${form.heard ? `\nHeard about us: ${form.heard}` : ""}\n\n${form.trip}`,
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
      trackEvent("stepper_completado", { unit: active.name, guests, nights: nightCount });
    } catch {
      setSubmitError("Something went wrong sending your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function advance() {
    if (step === 2) trackEvent("stepper_fechas_seleccionadas", { unit: active.name, nights: nightCount });
    setStep((s) => (s + 1) as Step);
  }

  function back() {
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s));
  }

  const steps: { n: Step; label: string }[] = [
    { n: 1, label: "Guests" },
    { n: 2, label: "Dates" },
    { n: 3, label: "Details" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4" onClick={onClose}>
      <div
        className="flex max-h-[90vh] w-full max-w-[640px] flex-col overflow-hidden rounded-2xl bg-[#f8f5ef] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-[#e6dfd3] bg-white p-5">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
            <Image src={active.photo} alt={active.name} fill sizes="48px" className="object-cover" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Your stay</p>
            {step < 4 ? <p className="text-xs text-muted">No payment, no card · we reply within 24 hours</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-[#8f96a0] hover:bg-[#f3efe7] hover:text-foreground"
          >
            &times;
          </button>
        </div>

        {step < 4 ? (
          <div className="flex items-center justify-center gap-2 border-b border-[#e6dfd3] bg-[#f3eee5] px-5 py-3">
            {steps.map((s, i) => {
              const state = step === s.n ? "active" : step > s.n ? "done" : "pending";
              return (
                <div key={s.n} className="flex items-center gap-2">
                  <span
                    className={`flex items-center gap-2 text-[11px] uppercase tracking-[1px] ${
                      state === "active" ? "text-primary" : state === "done" ? "text-brand" : "text-[#9f978a]"
                    }`}
                  >
                    <span className="relative flex h-8 w-8 items-center justify-center">
                      <Azulejo
                        variant="ring"
                        tone={state === "active" ? "action" : state === "done" ? "teal" : "muted"}
                        size={32}
                        className="absolute inset-0 m-auto"
                      />
                      <b className="relative text-[11px] font-semibold">{s.n}</b>
                    </span>
                    {s.label}
                  </span>
                  {i < steps.length - 1 ? <span className="h-px w-6 bg-[#ddd3c2]" /> : null}
                </div>
              );
            })}
          </div>
        ) : null}

        <div className="flex-1 overflow-y-auto p-5">
          {step === 1 ? (
            <div className="space-y-5">
              <p className="text-xs text-muted">
                You were looking at <b className="text-foreground">{cameFrom.name}</b> — {cameFrom.suites} suites, up to{" "}
                {cameFrom.guests} guests.
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
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-primary text-lg text-primary hover:bg-primary/10"
                >
                  &minus;
                </button>
                <span className="text-3xl font-light text-foreground">{guests}</span>
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.min(28, g + 1))}
                  aria-label="Add guest"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-primary text-lg text-primary hover:bg-primary/10"
                >
                  +
                </button>
              </div>
              <p className="text-center text-xs text-muted">guests · {UNITS.filter((v) => !v.pair && v.guests >= guests).length} of the 4 houses fit</p>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {UNITS.map((v, i) =>
                  v.pair ? null : (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => setUnit(i)}
                      className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${unit === i ? "border-primary bg-[#eaf3fb]" : "border-[#ded6c9] bg-white hover:bg-[#f3efe7]"}`}
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                        <Image src={v.photo} alt={v.name} fill sizes="48px" className="object-cover" />
                      </div>
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-[0.5px] text-foreground">{v.name}</span>
                        <span className="block text-[11px] text-muted">
                          {v.suites} suites · up to {v.guests} · from {money(v.from)}
                        </span>
                      </span>
                    </button>
                  ),
                )}
              </div>

              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[1px] text-muted">Combined villas · two houses, one contract</p>
                {UNITS.map((v, i) =>
                  v.pair ? (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => setUnit(i)}
                      className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${unit === i ? "border-primary bg-[#eaf3fb]" : "border-[#ded6c9] bg-white hover:bg-[#f3efe7]"}`}
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                        <Image src={v.photo} alt={v.name} fill sizes="48px" className="object-cover" />
                      </div>
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-[0.5px] text-foreground">{v.name}</span>
                        <span className="block text-[11px] text-muted">
                          {v.suites} suites · up to {v.guests} · from {money(v.from)}
                          {v.quote ? " · combined rate on request" : ""}
                        </span>
                      </span>
                    </button>
                  ) : null,
                )}
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <strong className="text-sm text-foreground">
                  {MONTH_NAMES[month]} {year}
                </strong>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setMi((v) => Math.max(0, v - 1))}
                    disabled={mi <= 0}
                    aria-label="Previous month"
                    className="rounded-full border border-border px-2 py-1 text-xs text-foreground hover:bg-background disabled:text-muted/40 disabled:hover:bg-transparent"
                  >
                    &lsaquo;
                  </button>
                  <button
                    type="button"
                    onClick={() => setMi((v) => Math.min(CALENDAR_MONTHS.length - 1, v + 1))}
                    disabled={mi >= CALENDAR_MONTHS.length - 1}
                    aria-label="Next month"
                    className="rounded-full border border-border px-2 py-1 text-xs text-foreground hover:bg-background disabled:text-muted/40 disabled:hover:bg-transparent"
                  >
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
                {cells.map((c) => {
                  if (c.s === null) return <span key={c.key} />;
                  const s = c.s;
                  const booked = bookedFor(unit, s);
                  const part = partialFor(unit, s);
                  const peak = Boolean(seasonOf(s));
                  const r = rateFor(unit, s);
                  const sel = s === ci || s === co;
                  const inRange = Boolean(ci && co && s > ci && s < co);
                  const far = Boolean(ci && !co && limit && s > limit);
                  const past = s < todayIso;
                  const disabled = booked || far || past;
                  const label = past
                    ? `${c.day} ${MONTH_NAMES[month]}, in the past`
                    : booked
                      ? part
                        ? `${c.day} ${MONTH_NAMES[month]}, booked at ${part}`
                        : `${c.day} ${MONTH_NAMES[month]}, booked`
                      : far
                        ? `${c.day} ${MONTH_NAMES[month]}, beyond the next booked night`
                        : undefined;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      disabled={disabled}
                      aria-label={label}
                      title={label}
                      onClick={() => tap(s)}
                      className={`flex aspect-square flex-col items-center justify-center rounded-lg text-xs transition ${dayClass({ sel, inRange, booked, part: Boolean(part), far, past, peak })}`}
                    >
                      <span>{c.day}</span>
                      {r ? <span className="text-[9px]">{(r / 1000).toFixed(1)}k</span> : null}
                    </button>
                  );
                })}
              </div>
              <p className={`text-[11px] ${warn ? "text-danger" : "text-muted"}`}>
                {warn ? (
                  warn
                ) : active.pair ? (
                  <>
                    A night is open only when <b>{UNITS[active.pair[0]].name}</b> and <b>{UNITS[active.pair[1]].name}</b> are
                    both free. Striped nights are booked at one of the two.
                  </>
                ) : ci && !co && limit ? (
                  `Check-in ${fmtDate(ci)}. ${active.name} is booked from ${fmtDate(limit)}, so your check-out must be before then.`
                ) : (
                  "Struck-through dates are already booked. Amber dates carry a peak-season rate."
                )}
              </p>
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="grid gap-1 text-xs text-foreground">
                  Are your dates flexible?
                  <select
                    value={form.flexible}
                    onChange={(e) => setForm((f) => ({ ...f, flexible: e.target.value }))}
                    className="rounded-lg border border-border bg-surface px-3 py-2 text-base text-foreground"
                  >
                    <option value="">Select one</option>
                    <option>Dates are firm</option>
                    <option>Can shift a few days</option>
                    <option>Fully flexible</option>
                  </select>
                </label>
                <label className="grid gap-1 text-xs text-foreground">
                  How did you hear about us?
                  <select
                    value={form.heard}
                    onChange={(e) => setForm((f) => ({ ...f, heard: e.target.value }))}
                    className="rounded-lg border border-border bg-surface px-3 py-2 text-base text-foreground"
                  >
                    <option value="">Select one</option>
                    <option>Instagram</option>
                    <option>Google</option>
                    <option>Friend or past guest</option>
                    <option>Travel agent</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>
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
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full px-4 py-3 text-[11px] font-semibold uppercase tracking-[1.4px] text-muted transition hover:text-foreground"
                >
                  <span aria-hidden="true">‹</span> Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[1.6px] text-white hover:bg-primary-dark disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Send Inquiry"}
                </button>
              </div>
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
                  <Image src={active.photo} alt={active.name} fill sizes="48px" className="object-cover" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-foreground">
                    {active.name} <span className="font-normal text-muted">· {guests} guests</span>
                  </p>
                  {ci && co ? (
                    <p className="text-muted">
                      {fmtDate(ci)} &rarr; {fmtDate(co)} · {nightCount} nights · {ci.slice(0, 4)}
                    </p>
                  ) : null}
                  {estimatedTotal > 0 ? (
                    <p className="mt-1 font-semibold text-foreground">from {money(estimatedTotal)} + 21% tax</p>
                  ) : null}
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
          <div className="flex items-center justify-between gap-3 border-t border-[#e6dfd3] bg-white p-5">
            <div className="flex min-w-0 items-center gap-3">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[1.4px] text-muted transition hover:text-foreground"
                >
                  <span aria-hidden="true">‹</span> Back
                </button>
              ) : null}
              <p className={`text-xs ${step === 2 && ci && co && nightCount < min ? "text-danger" : "text-muted"}`}>
              {step === 2 && ci && co ? (
                nightCount < min ? (
                  <>
                    <b>
                      {nightCount} night{nightCount > 1 ? "s" : ""} selected
                    </b>{" "}
                    · {min}-night minimum this season — extend your check-out
                  </>
                ) : (
                  <>
                    <b className="text-foreground">
                      {fmtDate(ci)} → {fmtDate(co)} · {nightCount} nights
                    </b>{" "}
                    · {active.name} · from {money(nightlyRate * nightCount)} + 21% tax
                  </>
                )
              ) : step === 2 && ci ? (
                <>
                  <b className="text-foreground">Check-in {fmtDate(ci)}</b> · now pick your check-out
                </>
              ) : (
                <>
                  <b className="text-foreground">{active.name}</b> · {guests} guests{step === 1 ? " · pick your nights" : ""}
                </>
              )}
            </p>
            </div>
            <button
              type="button"
              disabled={step === 2 && !datesValid}
              onClick={advance}
              className="shrink-0 rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[1.6px] text-white hover:bg-primary-dark disabled:opacity-40"
            >
              {step === 1 ? "See available dates" : "Continue"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function useBookingModal(initialVillaSlug: string, initialOpen = false) {
  const [open, setOpen] = useState(initialOpen);
  const modal = useMemo(
    () => (open ? <BookingModal initialVillaSlug={initialVillaSlug} onClose={() => setOpen(false)} /> : null),
    [open, initialVillaSlug],
  );
  return { open: () => setOpen(true), modal };
}
