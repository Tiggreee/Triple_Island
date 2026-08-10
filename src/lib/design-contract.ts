export const DESIGN_TOKEN_PREFIX = "cb";

// Read directly from the live reference build's own :root custom properties
// (cocobislanewsite.netlify.app/villas) — not frequency-guessed from compiled
// CSS. Keep this file and globals.css in sync; they drifted apart once
// already (globals.css kept rendering placeholder colors for a while).
export const DESIGN_COLOR_TOKENS = {
  "cb-color-background": "#fbf8f3", // --sand
  "cb-color-foreground": "#1c1c1c", // --ink
  "cb-color-primary": "#246a94", // --action — CTAs
  "cb-color-primary-dark": "#1b5273", // --action-dark — button hover
  "cb-color-brand": "#107480", // --teal — logo/favicon mark
  "cb-color-surface": "#ffffff",
  "cb-color-muted": "#4a4a4a", // --body
  "cb-color-accent": "#8a5a12", // --high — price/badge highlight
  "cb-color-border": "#e3dbce", // --line
  "cb-color-danger": "#a32b1c",
} as const;

export const DESIGN_SPACING_TOKENS = {
  "cb-space-2": "0.5rem",
  "cb-space-3": "0.75rem",
  "cb-space-4": "1rem",
  "cb-space-6": "1.5rem",
  "cb-space-8": "2rem",
} as const;

export const DESIGN_RADIUS_TOKENS = {
  "cb-radius-sm": "0.5rem",
  "cb-radius-md": "0.75rem",
  "cb-radius-lg": "0.875rem", // 14px — card corners
  "cb-radius-pill": "999px", // buttons/badges
} as const;

export const DESIGN_COMPONENT_NAMES = {
  button: {
    base: "cb-btn",
    primary: "cb-btn-primary",
    secondary: "cb-btn-secondary",
    ghost: "cb-btn-ghost",
    loading: "cb-btn-loading",
    disabled: "cb-btn-disabled",
  },
  input: {
    base: "cb-input",
    default: "cb-input-default",
    error: "cb-input-error",
  },
  select: {
    base: "cb-select",
    default: "cb-select-default",
    error: "cb-select-error",
  },
  textarea: {
    base: "cb-textarea",
    default: "cb-textarea-default",
    error: "cb-textarea-error",
  },
  checkbox: {
    base: "cb-checkbox",
  },
  badge: {
    base: "cb-badge",
  },
  card: {
    base: "cb-card",
  },
  drawer: {
    base: "cb-drawer",
  },
  section: {
    base: "cb-section",
  },
} as const;

export type DesignColorTokenName = keyof typeof DESIGN_COLOR_TOKENS;
export type DesignSpacingTokenName = keyof typeof DESIGN_SPACING_TOKENS;
export type DesignRadiusTokenName = keyof typeof DESIGN_RADIUS_TOKENS;
