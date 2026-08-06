import type { ReactNode } from "react";
import { DESIGN_COMPONENT_NAMES } from "@/lib/design-contract";

type BadgeProps = {
  children: ReactNode;
};

export function Badge({ children }: BadgeProps) {
  return (
    <span
      className={[
        DESIGN_COMPONENT_NAMES.badge.base,
        "inline-flex items-center rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground",
      ].join(" ")}
    >
      {children}
    </span>
  );
}
