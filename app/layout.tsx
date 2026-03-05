import "./globals.css";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "HyperGate VPN — Открой интернет без ограничений",
  description: "Премиальный VPN-сервис с высокой скоростью, защищенным подключением и серверами по всему миру.",
  metadataBase: new URL("https://hypergate.example.com")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground" style={{ fontFamily: "Inter, 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(59,167,255,0.14),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(123,92,255,0.15),transparent_45%),#0B0F1A]">
          <SiteHeader />
          <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10 md:px-8">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
