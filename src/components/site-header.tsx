"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/villas", label: "Villas" },
  { href: "/retiros", label: "Retiros" },
  { href: "/solicitud", label: "Solicitud" },
];

const HERO_PAGES = ["/", "/villas"];

export function SiteHeader() {
  const pathname = usePathname();
  const hasHero = HERO_PAGES.includes(pathname);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!hasHero) return;
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasHero]);

  const transparent = hasHero && !scrolled;

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        transparent ? "border-b border-transparent bg-transparent" : "border-b border-border bg-surface"
      } ${hasHero ? "-mb-[78px] lg:-mb-[118px]" : ""}`}
    >
      <div className="mx-auto flex h-[78px] max-w-[1180px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-[118px] lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src={transparent ? "/media/coco/logo-white.png" : "/media/figma/footer-logo.png"}
            alt="Coco B Isla"
            width={82}
            height={69}
            className="h-[52px] w-auto drop-shadow-[0_2px_8px_rgba(11,32,40,0.35)] lg:h-[82px]"
          />
          <span className={`hidden text-sm font-medium uppercase tracking-[1.5px] sm:inline ${transparent ? "text-white" : "text-foreground"}`}>
            Coco B Isla
          </span>
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[1px] transition ${
                  transparent ? "text-white/85 hover:bg-white/10 hover:text-white" : "text-muted hover:bg-background hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href={pathname === "/villas" ? "/solicitud" : "/villas"}>
            <Button
              variant="primary"
              className={`!px-5 !py-2.5 text-[11px] ${transparent ? "!border-white/55 !bg-white/15 backdrop-blur-sm hover:!bg-white/25" : ""}`}
            >
              {pathname === "/villas" ? "Check Availability" : "Explore the Villas"}
            </Button>
          </Link>
        </div>
      </div>
      <nav
        aria-label="Main"
        className={`flex flex-wrap items-center justify-center gap-1 border-t py-2 md:hidden ${
          transparent ? "border-white/20" : "border-border"
        }`}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[1px] transition ${
              transparent ? "text-white/85 hover:bg-white/10 hover:text-white" : "text-muted hover:bg-background hover:text-foreground"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
