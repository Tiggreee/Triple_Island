import type { ButtonHTMLAttributes, ReactNode } from "react";
import { DESIGN_COMPONENT_NAMES } from "@/lib/design-contract";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  isLoading?: boolean;
  variant?: ButtonVariant;
};

// Matches the real cocobisla.com button: border-black box, off-white fill, uppercase
// tracked label — see the CTAs on the home page (page.tsx). There's only one real
// button treatment on the live site, so primary/secondary/ghost are weight variants
// of that same shape rather than distinct looks.
const variantClasses: Record<ButtonVariant, string> = {
  primary: "border border-black bg-[#f5f5f5] text-black hover:bg-white",
  secondary: "border border-border bg-transparent text-foreground hover:bg-surface",
  ghost: "border-transparent bg-transparent text-foreground hover:bg-surface",
};

export function Button({
  children,
  className = "",
  isLoading = false,
  variant = "primary",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={[
        DESIGN_COMPONENT_NAMES.button.base,
        variant === "primary"
          ? DESIGN_COMPONENT_NAMES.button.primary
          : variant === "secondary"
            ? DESIGN_COMPONENT_NAMES.button.secondary
            : DESIGN_COMPONENT_NAMES.button.ghost,
        isLoading ? DESIGN_COMPONENT_NAMES.button.loading : "",
        disabled || isLoading ? DESIGN_COMPONENT_NAMES.button.disabled : "",
        "inline-flex items-center justify-center px-6 py-4 text-[13.2px] font-medium uppercase leading-tight tracking-[3.179px] transition-colors lg:py-[18px] lg:text-[11.9px] lg:leading-none lg:tracking-[2.86px]",
        "focus:outline-none focus:ring-2 focus:ring-primary/30",
        variantClasses[variant],
        disabled || isLoading ? "cursor-not-allowed opacity-60" : "",
        className,
      ].join(" ")}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
