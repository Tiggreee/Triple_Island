"use client";

import { useEffect, useState } from "react";
import { CONSENT_CHANGED_EVENT } from "@/lib/analytics";

type Consent = { analytics: boolean; marketing: boolean };

const STORAGE_KEY = "cocob_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    let hasSavedConsent = false;
    try {
      hasSavedConsent = Boolean(localStorage.getItem(STORAGE_KEY));
    } catch {
      hasSavedConsent = false;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(!hasSavedConsent);
  }, []);

  function save(consent: Consent) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {}
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-[400] border-t border-border bg-surface shadow-[0_-10px_34px_rgba(11,32,40,0.10)]"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-4 px-4 py-5 sm:flex-row sm:items-center sm:px-8">
        <p className="text-[13.5px] leading-6 text-muted">
          <b className="mb-1.5 block text-[11px] uppercase tracking-[2.24px] text-foreground">Your privacy</b>
          We use cookies to keep the site working, to understand how it is used, and to show relevant offers. You
          choose what we may use. Read our{" "}
          <a href="#" onClick={(e) => e.preventDefault()} className="text-primary underline underline-offset-2">
            privacy notice
          </a>
          .
        </p>
        <div className="flex w-full shrink-0 flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:ml-auto">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="self-center text-[12.5px] text-muted underline underline-offset-2 hover:text-primary"
          >
            {expanded ? "Hide options" : "Manage cookies"}
          </button>
          <button
            type="button"
            onClick={() => save({ analytics: false, marketing: false })}
            className="w-full rounded-full border border-primary px-4 py-2 text-[11.5px] font-semibold uppercase tracking-[1.6px] text-primary hover:bg-primary/5 sm:w-auto"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => save({ analytics: true, marketing: true })}
            className="w-full rounded-full bg-primary px-4 py-2 text-[11.5px] font-semibold uppercase tracking-[1.6px] text-white hover:bg-primary-dark sm:w-auto"
          >
            Accept all
          </button>
        </div>
      </div>

      {expanded ? (
        <div className="mx-auto max-w-[1200px] space-y-1 px-4 pb-5 sm:px-8">
          <div className="flex items-start gap-4 border-t border-border py-4">
            <div className="flex-1">
              <b className="text-[13.5px] text-foreground">Strictly necessary</b>
              <span className="mt-0.5 block text-[12.5px] leading-6 text-muted">
                Needed for the site to work — page navigation, the inquiry form and security. Cannot be switched off.
              </span>
            </div>
            <button
              role="switch"
              aria-checked="true"
              aria-label="Strictly necessary cookies, always on"
              disabled
              className="mt-0.5 h-[26px] w-11 shrink-0 rounded-full bg-brand opacity-45"
            />
          </div>
          <div className="flex items-start gap-4 border-t border-border py-4">
            <div className="flex-1">
              <b className="text-[13.5px] text-foreground">Analytics</b>
              <span className="mt-0.5 block text-[12.5px] leading-6 text-muted">
                Anonymous data on which villas and pages are viewed, so we can improve the experience.
              </span>
            </div>
            <button
              role="switch"
              aria-checked={analytics}
              aria-label="Analytics cookies"
              onClick={() => setAnalytics((v) => !v)}
              className={`relative mt-0.5 h-[26px] w-11 shrink-0 rounded-full transition-colors ${analytics ? "bg-primary" : "bg-border"}`}
            >
              <span
                className={`absolute top-[3px] h-5 w-5 rounded-full bg-white shadow transition-transform ${analytics ? "translate-x-[21px]" : "translate-x-[3px]"}`}
              />
            </button>
          </div>
          <div className="flex items-start gap-4 border-t border-border py-4">
            <div className="flex-1">
              <b className="text-[13.5px] text-foreground">Marketing</b>
              <span className="mt-0.5 block text-[12.5px] leading-6 text-muted">
                Lets us show our villas to people with similar travel interests on other sites.
              </span>
            </div>
            <button
              role="switch"
              aria-checked={marketing}
              aria-label="Marketing cookies"
              onClick={() => setMarketing((v) => !v)}
              className={`relative mt-0.5 h-[26px] w-11 shrink-0 rounded-full transition-colors ${marketing ? "bg-primary" : "bg-border"}`}
            >
              <span
                className={`absolute top-[3px] h-5 w-5 rounded-full bg-white shadow transition-transform ${marketing ? "translate-x-[21px]" : "translate-x-[3px]"}`}
              />
            </button>
          </div>
          <div className="flex justify-end pt-3">
            <button
              type="button"
              onClick={() => save({ analytics, marketing })}
              className="rounded-full bg-primary px-4 py-2 text-[11.5px] font-semibold uppercase tracking-[1.6px] text-white hover:bg-primary-dark"
            >
              Save my choices
            </button>
          </div>
        </div>
      ) : null}
    </aside>
  );
}
