import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Админка</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { href: "/admin/ads", label: "Реклама" },
          { href: "/admin/moderation", label: "Модерация" },
          { href: "/admin/games", label: "Игры" }
        ].map((item) => (
          <Link key={item.href} href={item.href} className="rounded-2xl border border-border bg-card/60 p-6">
            <div className="text-lg font-semibold">{item.label}</div>
            <p className="mt-2 text-sm text-muted-foreground">Управление разделом</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
