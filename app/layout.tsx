import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "CherryPlay — маркетплейс игровых услуг",
  description: "Покупайте и продавайте игровые услуги и цифровые товары без посредников.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "CherryPlay — маркетплейс игровых услуг",
    description: "Найди буст, коучинг и услуги напрямую у продавцов.",
    url: "https://example.com",
    siteName: "CherryPlay",
    images: ["/og.png"],
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider>
          <div className="grid-bg min-h-screen">
            <SiteHeader />
            <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10 md:px-8">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
