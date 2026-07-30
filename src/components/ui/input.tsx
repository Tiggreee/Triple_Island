import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export function Input({ className = "", hasError = false, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-md border bg-surface px-3 py-2 text-sm text-foreground",
        "focus:outline-none focus:ring-2 focus:ring-primary/30",
        hasError ? "border-accent" : "border-border",
        className,
      ].join(" ")}
    />
  );
}
