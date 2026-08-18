import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { ChatWidget } from "@/components/chat/chat-widget";
import { CookieConsent } from "@/components/cookie-consent";
import { SiteHeader } from "@/components/site-header";

// The real reference build (cocobislanewsite.netlify.app) loads Raleway
// 200–700 — confirmed from its stylesheet, not Inter as previously assumed.
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cocob-web.whitetree-e39b7f21.eastus2.azurecontainerapps.io"),
  title: {
    default: "Coco B Isla — Villas de lujo y retiros en Isla Mujeres",
    template: "%s | Coco B Isla",
  },
  description:
    "Villas privadas frente al mar, hoteles boutique y retiros de bienestar en la costa oeste de Isla Mujeres, a un ferry de Cancún. Bodas, yoga, wellness y experiencias a medida.",
  keywords: [
    "villas Isla Mujeres",
    "retiros de yoga México",
    "villa de lujo Caribe",
    "bodas Isla Mujeres",
    "Coco B Isla",
  ],
  openGraph: {
    title: "Coco B Isla — Villas de lujo y retiros en Isla Mujeres",
    description:
      "Villas privadas frente al mar y retiros de bienestar en Isla Mujeres, México. Servicio excepcional para experiencias excepcionales.",
    locale: "es_MX",
    type: "website",
  },
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
        <CookieConsent />
      </body>
    </html>
  );
}
