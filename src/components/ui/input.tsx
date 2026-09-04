import type { InputHTMLAttributes } from "react";
import { DESIGN_COMPONENT_NAMES } from "@/lib/design-contract";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export function Input({ className = "", hasError = false, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={[
        DESIGN_COMPONENT_NAMES.input.base,
        hasError ? DESIGN_COMPONENT_NAMES.input.error : DESIGN_COMPONENT_NAMES.input.default,
        "min-h-12 w-full rounded-[11px] border px-3 py-2 text-base text-foreground",
        "focus:outline-none focus:ring-2 focus:ring-primary/30",
        hasError ? "border-danger bg-[#fdf7f6]" : "border-border bg-surface",
        className,
      ].join(" ")}
    />
  );
}
