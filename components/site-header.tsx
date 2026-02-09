import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="text-xl font-bold">
          <span className="gradient-text">CherryPlay</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/listings">Каталог</Link>
          <Link href="/advertise">Реклама</Link>
          <Link href="/rules">Правила</Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm">
            <Link href="/sell/new">Создать объявление</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
