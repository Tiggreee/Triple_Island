import type { ButtonHTMLAttributes, ReactNode } from "react";
import { DESIGN_COMPONENT_NAMES } from "@/lib/design-contract";
import { Azulejo } from "@/components/ui/azulejo";
import { NavButtonIcon } from "@/components/ui/nav-button-icon";

type ButtonVariant = "primary" | "secondary" | "ghost" | "light";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  isLoading?: boolean;
  variant?: ButtonVariant;
  icon?: boolean | "nav";
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "border border-primary bg-primary text-white hover:opacity-90",
  secondary: "border border-primary bg-transparent text-primary hover:bg-primary/5",
  ghost: "border-transparent bg-transparent text-foreground hover:bg-surface",
  light: "border border-white/55 bg-white/15 text-white backdrop-blur-[8px] hover:bg-white/25",
};

export function Button({
  children,
  className = "",
  isLoading = false,
  variant = "primary",
  icon = false,
  disabled,
  ...props
}: ButtonProps) {
  const iconTone = variant === "primary" || variant === "light" ? "white" : "action";
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={[
        DESIGN_COMPONENT_NAMES.button.base,
        DESIGN_COMPONENT_NAMES.button[variant],
        isLoading ? DESIGN_COMPONENT_NAMES.button.loading : "",
        disabled || isLoading ? DESIGN_COMPONENT_NAMES.button.disabled : "",
        "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[1.6px] transition-colors",
        icon ? "group gap-2.5" : "",
        "focus:outline-none focus:ring-2 focus:ring-primary/30",
        variantClasses[variant],
        disabled || isLoading ? "cursor-not-allowed opacity-60" : "",
        className,
      ].join(" ")}
    >
      {isLoading ? "Loading..." : children}
      {icon === true && !isLoading ? (
        <Azulejo
          tone={iconTone}
          size={13}
          className="transition-transform duration-[450ms] ease-[cubic-bezier(.7,0,.2,1)] group-hover:rotate-90"
        />
      ) : null}
      {icon === "nav" && !isLoading ? <NavButtonIcon /> : null}
    </button>
  );
}
