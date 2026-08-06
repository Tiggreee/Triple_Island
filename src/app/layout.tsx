import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/chat/chat-widget";

// cocobisla.com is set entirely in Inter (font family/Font 1 in Figma) —
// weights 300/400/500/700 cover every text style pulled from the design.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
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
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/villas", label: "Villas" },
    { href: "/retiros", label: "Retiros" },
    { href: "/solicitud", label: "Solicitud" },
    { href: "/styleguide", label: "Styleguide" },
  ];

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
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
