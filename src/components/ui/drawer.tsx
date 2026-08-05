import type { ReactNode } from "react";
import { DESIGN_COMPONENT_NAMES } from "@/lib/design-contract";

type DrawerProps = {
  open: boolean;
  title: string;
  children: ReactNode;
};

export function Drawer({ open, title, children }: DrawerProps) {
  if (!open) {
    return null;
  }

  return (
    <aside
      className={[
        DESIGN_COMPONENT_NAMES.drawer.base,
        "rounded-lg border border-border bg-surface p-4 shadow-sm",
      ].join(" ")}
    >
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <div className="mt-2 text-sm text-muted">{children}</div>
    </aside>
  );
}
