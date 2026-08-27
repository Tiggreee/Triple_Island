"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const HERO_PAGES = ["/", "/villas"];

export function SiteHeader() {
  const pathname = usePathname();
  const hasHero = HERO_PAGES.includes(pathname);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!hasHero) return;
    function onScroll() {
      const heroHeight = document.getElementById("site-hero")?.offsetHeight ?? 0;
      setScrolled(window.scrollY > heroHeight * 0.62);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [hasHero]);

  const transparent = hasHero && !scrolled;

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-border bg-[rgba(251,248,243,0.96)] shadow-[0_1px_14px_rgba(28,28,28,0.06)] backdrop-blur-[10px]"
      } ${hasHero ? "-mb-19.5 lg:-mb-29.5" : ""}`}
    >
      <div className="mx-auto flex h-19.5 max-w-295 items-center justify-between gap-3 px-4 sm:px-6 lg:h-29.5 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src={transparent ? "/media/coco/logo-white.png" : "/media/figma/footer-logo.png"}
            alt="Coco B Isla"
            width={82}
            height={69}
            className="h-13 w-auto drop-shadow-[0_2px_8px_rgba(11,32,40,0.35)] lg:h-20.5"
          />
          <span className={`hidden text-sm font-medium uppercase tracking-[1.5px] sm:inline ${transparent ? "text-white" : "text-foreground"}`}>
            Coco B Isla
          </span>
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
          <Link href={pathname === "/villas" ? "/solicitud" : "/villas"}>
            <Button
              variant="primary"
              icon="nav"
              className={`px-5! py-2.5! text-[11px] ${transparent ? "border-white/55! bg-white/15! backdrop-blur-sm hover:bg-white/25!" : ""}`}
            >
              {pathname === "/villas" ? "Check Availability" : "Explore the Villas"}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
