export const DESIGN_TOKEN_PREFIX = "cb";

// Pulled from the Coco B Figma file (node 6038:2300) via get_variable_defs —
// cocobisla.com's actual published values, not placeholders.
export const DESIGN_COLOR_TOKENS = {
  "cb-color-background": "#ffffff", // color/white/solid
  "cb-color-foreground": "#16161d", // Woodsmoke
  "cb-color-primary": "#107480", // Surfie Green
  "cb-color-surface": "#ffffff", // color/white/solid
  "cb-color-muted": "#797979", // Boulder
  "cb-color-accent": "#2d818f", // Lochinvar
  "cb-color-border": "#d9d9d9", // Alto
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
