"use client";

import { useEffect } from "react";
import { CONSENT_CHANGED_EVENT, loadAnalytics } from "@/lib/analytics";

// Bridges cookie consent and GA4: loads analytics on mount for returning
// visitors who already opted in, and again the moment consent changes.
export function AnalyticsLoader() {
  useEffect(() => {
    loadAnalytics();
    const onConsentChange = () => loadAnalytics();
    window.addEventListener(CONSENT_CHANGED_EVENT, onConsentChange);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onConsentChange);
  }, []);

  return null;
}
