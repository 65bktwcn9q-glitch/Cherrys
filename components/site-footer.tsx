import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0B0F1A]/90">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-white/70 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="text-base font-semibold text-white">HyperGate VPN</p>
          <p className="mt-2">Премиальная защита и свободный доступ к интернету.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <a href="https://t.me/hypergate_support" target="_blank" rel="noreferrer">
            Support
          </a>
          <a href="#apps">Download Apps</a>
        </div>
      </div>
    </footer>
  );
}
