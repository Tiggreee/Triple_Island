import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  isLoading?: boolean;
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:opacity-90",
  secondary: "bg-surface text-foreground border border-border hover:bg-background",
  ghost: "bg-transparent text-foreground hover:bg-background",
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
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition",
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
