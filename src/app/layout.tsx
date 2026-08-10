import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Raleway } from "next/font/google";
import "./globals.css";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { Button } from "@/components/ui/button";
import { ChatWidget } from "@/components/chat/chat-widget";

// The real reference build (cocobislanewsite.netlify.app) loads Raleway
// 200–700 — confirmed from its stylesheet, not Inter as previously assumed.
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Coco B Platform",
  description: "Unified platform for villas and wellness retreats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // /styleguide is intentionally not listed here — it's an internal reference
  // page, not part of the public nav (see the brief's app/ structure notes).
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/villas", label: "Villas" },
    { href: "/retiros", label: "Retiros" },
    { href: "/solicitud", label: "Solicitud" },
  ];

  return (
    <html lang="en" className={`${raleway.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <div className="flex min-h-screen w-full flex-col">
          <AnnouncementBanner />
          {/* Sizing matches the design tokens: nav-desktop 118px / logo-desktop 82px (this is
              the static "always solid" version — the reference site's scroll-shrink-to-74px
              nav behavior isn't implemented, deliberately, to keep this simple for now). */}
          <header className="border-b border-border bg-surface">
            <div className="mx-auto flex h-[78px] max-w-[1180px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-[118px] lg:px-8">
              <Link href="/" className="flex items-center gap-2 shrink-0">
                <Image
                  src="/media/figma/footer-logo.png"
                  alt="Coco B Isla"
                  width={82}
                  height={69}
                  className="h-[52px] w-auto lg:h-[82px]"
                />
                <span className="hidden text-sm font-medium uppercase tracking-[1.5px] text-foreground sm:inline">
                  Coco B Isla
                </span>
              </Link>
              <div className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
                <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[1px] text-muted transition hover:bg-background hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <Link href="/villas">
                  <Button variant="primary" className="!px-5 !py-2.5 text-[11px]">
                    Explore the Villas
                  </Button>
                </Link>
              </div>
            </div>
            <nav aria-label="Main" className="flex flex-wrap items-center justify-center gap-1 border-t border-border py-2 md:hidden">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[1px] text-muted transition hover:bg-background hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>
          <main className="flex-1">{children}</main>
        </div>
        <ChatWidget />
      </body>
    </html>
  );
}
