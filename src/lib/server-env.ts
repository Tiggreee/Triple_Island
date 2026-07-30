type RequiredServerEnvKey =
  | "WORDPRESS_API_URL"
  | "HUBSPOT_PORTAL_ID"
  | "HUBSPOT_FORM_ID"
  | "HUBSPOT_ACCESS_TOKEN"
  | "AI_PROVIDER"
  | "AI_API_KEY";

const requiredServerEnvKeys: RequiredServerEnvKey[] = [
  "WORDPRESS_API_URL",
  "HUBSPOT_PORTAL_ID",
  "HUBSPOT_FORM_ID",
  "HUBSPOT_ACCESS_TOKEN",
  "AI_PROVIDER",
  "AI_API_KEY",
];

export function getMissingServerEnv(): RequiredServerEnvKey[] {
  return requiredServerEnvKeys.filter((key) => !process.env[key]);
}

export function hasServerEnvConfig() {
  return getMissingServerEnv().length === 0;
}
