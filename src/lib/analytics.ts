"use client";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const CONSENT_KEY = "cocob_consent";

export const CONSENT_CHANGED_EVENT = "cocob:consent-changed";

type Consent = { analytics: boolean; marketing: boolean };

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

export function analyticsAllowed(): boolean {
  return Boolean(GA_ID) && readConsent()?.analytics === true;
}

let initialized = false;

// Loads GA4 only when a Measurement ID is configured AND the visitor granted
// analytics consent. No ID or no consent = no script, no cookies, no calls.
export function loadAnalytics(): void {
  if (initialized || typeof window === "undefined") return;
  if (!GA_ID || !analyticsAllowed()) return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });
}

export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function" || !analyticsAllowed()) return;
  window.gtag("event", name, params ?? {});
}
