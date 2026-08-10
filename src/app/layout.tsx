import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { ChatWidget } from "@/components/chat/chat-widget";
import { SiteHeader } from "@/components/site-header";

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
  return (
    <html lang="en" className={`${raleway.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <div className="flex min-h-screen w-full flex-col">
          <AnnouncementBanner />
          <SiteHeader />
          <main className="flex-1">{children}</main>
        </div>
        <ChatWidget />
      </body>
    </html>
  );
}
