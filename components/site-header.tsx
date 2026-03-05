import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B0F1A]/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="text-xl font-semibold">
          <span className="gradient-text">HyperGate</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
          <a href="#apps">Приложения</a>
          <a href="#plans">Тарифы</a>
          <Link href="/rules">Правила</Link>
          <Link href="/terms">Условия</Link>
        </nav>
      </div>
    </header>
  );
}
