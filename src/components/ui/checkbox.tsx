import type { InputHTMLAttributes } from "react";
import { DESIGN_COMPONENT_NAMES } from "@/lib/design-contract";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function Checkbox({ className = "", ...props }: CheckboxProps) {
  return (
    <input
      {...props}
      type="checkbox"
      className={[
        DESIGN_COMPONENT_NAMES.checkbox.base,
        "h-4 w-4 rounded border-border text-primary",
        "focus:ring-2 focus:ring-primary/30",
        className,
      ].join(" ")}
    />
  );
}
