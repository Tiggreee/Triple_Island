import type { TextareaHTMLAttributes } from "react";
import { DESIGN_COMPONENT_NAMES } from "@/lib/design-contract";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
};

export function Textarea({ className = "", hasError = false, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={[
        DESIGN_COMPONENT_NAMES.textarea.base,
        hasError ? DESIGN_COMPONENT_NAMES.textarea.error : DESIGN_COMPONENT_NAMES.textarea.default,
        "w-full rounded-md border bg-surface px-3 py-2 text-base text-foreground",
        "focus:outline-none focus:ring-2 focus:ring-primary/30",
        hasError ? "border-accent" : "border-border",
        className,
      ].join(" ")}
    />
  );
}
