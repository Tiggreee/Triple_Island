import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
};

export function Textarea({ className = "", hasError = false, ...props }: TextareaProps) {
  return (
    <textarea
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
