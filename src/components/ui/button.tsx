import type { ButtonHTMLAttributes, ReactNode } from "react";
import { DESIGN_COMPONENT_NAMES } from "@/lib/design-contract";
import { Azulejo } from "@/components/ui/azulejo";
import { NavButtonIcon } from "@/components/ui/nav-button-icon";

type ButtonVariant = "primary" | "secondary" | "ghost" | "light";
type ButtonSize = "base" | "sm";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  isLoading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: boolean | "nav";
};

const sizeClasses: Record<ButtonSize, string> = {
  base: "h-[50px] px-7 text-[13px] tracking-[1.6px]",
  sm: "h-10 px-5 text-[10.5px] tracking-[1.6px] min-[621px]:h-[42px] min-[621px]:text-[11.5px]",
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
  size = "base",
  icon = false,
  disabled,
  ...props
}: ButtonProps) {
  const iconTone = variant === "primary" || variant === "light" ? "white" : "action";
  const isDisabled = disabled || isLoading;
  return (
    <button
      {...props}
      disabled={isDisabled}
      className={[
        DESIGN_COMPONENT_NAMES.button.base,
        DESIGN_COMPONENT_NAMES.button[variant],
        isLoading ? DESIGN_COMPONENT_NAMES.button.loading : "",
        isDisabled ? DESIGN_COMPONENT_NAMES.button.disabled : "",
        "inline-flex items-center justify-center rounded-full font-semibold uppercase transition-colors",
        sizeClasses[size],
        icon || isLoading ? "group gap-2.5" : "",
        "outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5bcaeb]",
        isDisabled ? "cursor-not-allowed border-transparent bg-[#b9c6ce] text-white" : variantClasses[variant],
        className,
      ].join(" ")}
    >
      {children}
      {(icon === true || isLoading) ? (
        <Azulejo
          tone={isDisabled ? "white" : iconTone}
          size={13}
          className={isLoading ? "cb-btn-tick" : "transition-transform duration-[450ms] ease-[cubic-bezier(.7,0,.2,1)] group-hover:rotate-90"}
        />
      ) : null}
      {icon === "nav" && !isLoading ? <NavButtonIcon /> : null}
    </button>
  );
}
