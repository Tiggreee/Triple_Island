export type ServerEnvKey =
  | "WORDPRESS_API_URL"
  | "HUBSPOT_PORTAL_ID"
  | "HUBSPOT_FORM_ID"
  | "HUBSPOT_FORM_ID_SOLICITUD"
  | "HUBSPOT_FORM_ID_RETIRO"
  | "HUBSPOT_FORM_ID_WAITLIST"
  | "HUBSPOT_ACCESS_TOKEN"
  | "AI_PROVIDER"
  | "AI_API_KEY"
  | "AI_MODEL"
  | "TURNSTILE_SECRET_KEY";

const requiredServerEnvKeys: ServerEnvKey[] = [
  "WORDPRESS_API_URL",
  "HUBSPOT_PORTAL_ID",
  "HUBSPOT_FORM_ID",
  "HUBSPOT_ACCESS_TOKEN",
  "AI_PROVIDER",
  "AI_API_KEY",
];

export const hubspotServerEnvKeys: ServerEnvKey[] = [
  "HUBSPOT_PORTAL_ID",
  "HUBSPOT_FORM_ID",
];

export const hubspotMultiFormServerEnvKeys: ServerEnvKey[] = [
  "HUBSPOT_PORTAL_ID",
  "HUBSPOT_FORM_ID_SOLICITUD",
  "HUBSPOT_FORM_ID_RETIRO",
  "HUBSPOT_FORM_ID_WAITLIST",
];

export const aiServerEnvKeys: ServerEnvKey[] = ["AI_PROVIDER", "AI_API_KEY"];

export function getMissingServerEnv(keys: ServerEnvKey[] = requiredServerEnvKeys): ServerEnvKey[] {
  return keys.filter((key) => !process.env[key]);
}

export function isTurnstileEnabled() {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export function hasServerEnvConfig() {
  return getMissingServerEnv().length === 0;
}
