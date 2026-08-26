"use client";

import { useEffect } from "react";
import { CONSENT_CHANGED_EVENT, loadAnalytics } from "@/lib/analytics";

export function AnalyticsLoader() {
  useEffect(() => {
    loadAnalytics();
    const onConsentChange = () => loadAnalytics();
    window.addEventListener(CONSENT_CHANGED_EVENT, onConsentChange);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onConsentChange);
  }, []);

  return null;
}
