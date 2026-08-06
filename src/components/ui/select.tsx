import type { SelectHTMLAttributes } from "react";
import { DESIGN_COMPONENT_NAMES } from "@/lib/design-contract";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  hasError?: boolean;
};

export function Select({ className = "", hasError = false, ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={[
        DESIGN_COMPONENT_NAMES.select.base,
        hasError ? DESIGN_COMPONENT_NAMES.select.error : DESIGN_COMPONENT_NAMES.select.default,
        "w-full rounded-md border bg-surface px-3 py-2 text-sm text-foreground",
        "focus:outline-none focus:ring-2 focus:ring-primary/30",
        hasError ? "border-accent" : "border-border",
        className,
      ].join(" ")}
    />
  );
}
