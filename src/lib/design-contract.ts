export const DESIGN_TOKEN_PREFIX = "cb";

export const DESIGN_COLOR_TOKENS = {
  "cb-color-background": "#f6f5f2",
  "cb-color-foreground": "#1f2a30",
  "cb-color-primary": "#0d9488",
  "cb-color-surface": "#ffffff",
  "cb-color-muted": "#6b7280",
  "cb-color-accent": "#e2725b",
  "cb-color-border": "#d7dbdd",
} as const;

export const DESIGN_SPACING_TOKENS = {
  "cb-space-2": "0.5rem",
  "cb-space-3": "0.75rem",
  "cb-space-4": "1rem",
  "cb-space-6": "1.5rem",
  "cb-space-8": "2rem",
} as const;

export const DESIGN_RADIUS_TOKENS = {
  "cb-radius-sm": "0.375rem",
  "cb-radius-md": "0.5rem",
  "cb-radius-lg": "0.75rem",
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
