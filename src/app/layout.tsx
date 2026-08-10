import type { Metadata } from "next";
import Link from "next/link";
import { Raleway } from "next/font/google";
import "./globals.css";
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
          <header className="border-b border-border py-4">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <p className="text-lg font-semibold tracking-tight text-foreground">Coco B</p>
              <nav aria-label="Main" className="flex flex-wrap items-center gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-1.5 text-sm font-medium text-muted transition hover:bg-surface hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </div>
        <ChatWidget />
      </body>
    </html>
  );
}
