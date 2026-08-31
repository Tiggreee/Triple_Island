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
  const isVillasPage = pathname === "/villas";
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
      className={`sticky top-0 z-40 transition-[background-color,border-color,box-shadow] duration-[350ms] ${
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-border bg-[rgba(251,248,243,0.96)] shadow-[0_1px_14px_rgba(28,28,28,0.06)] backdrop-blur-[10px]"
      } ${
        hasHero
          ? isVillasPage
            ? "-mb-[79px] lg:-mb-[141px]"
            : "-mb-[79px] lg:-mb-[119px]"
          : ""
      }`}
    >
      <div
        className={`relative mx-auto flex h-19.5 max-w-295 items-center justify-between gap-3 px-5 transition-[height] duration-[350ms] sm:px-8 lg:px-12 ${
          isVillasPage ? "lg:justify-end" : ""
        } ${
          isVillasPage ? (transparent ? "lg:h-[140px]" : "lg:h-[82px]") : transparent ? "lg:h-29.5" : "lg:h-[74px]"
        }`}
      >
        <Link
          href="/"
          className={`flex shrink-0 items-center gap-2 ${
            isVillasPage ? "lg:absolute lg:left-1/2 lg:top-1/2 lg:[transform:translate(-50%,-44%)]" : ""
          }`}
        >
          <Image
            src={transparent ? "/media/coco/logo-white.png" : "/media/figma/footer-logo.png"}
            alt="Coco B Isla"
            width={82}
            height={69}
            className={`h-13 w-auto drop-shadow-[0_2px_8px_rgba(11,32,40,0.35)] transition-[height] duration-[350ms] ${
              isVillasPage
                ? transparent
                  ? "lg:h-28"
                  : "lg:h-[74px]"
                : transparent
                  ? "lg:h-20.5"
                  : "lg:h-14"
            }`}
          />
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
          <Link href={pathname === "/villas" ? "/solicitud" : "/villas"}>
            <Button
              variant="primary"
              icon
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
