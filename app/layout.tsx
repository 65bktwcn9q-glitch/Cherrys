import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "HotRank — Telegram Mini App",
  description:
    "HotRank is a video-first social ranking and dating mini app for Telegram with city leaderboards, moderation, and monetization.",
  metadataBase: new URL("https://hotrank.vercel.app")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
