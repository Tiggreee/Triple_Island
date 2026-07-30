import type { InputHTMLAttributes } from "react";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function Checkbox({ className = "", ...props }: CheckboxProps) {
  return (
    <input
      {...props}
      type="checkbox"
      className={[
        "h-4 w-4 rounded border-border text-primary",
        "focus:ring-2 focus:ring-primary/30",
        className,
      ].join(" ")}
    />
  );
}
