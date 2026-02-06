import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminGamesPage() {
  const games = await prisma.game.findMany({ orderBy: { title: "asc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Игры</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {games.map((game) => (
          <div key={game.id} className="rounded-2xl border border-border bg-card/60 p-4">
            <div className="font-semibold">{game.title}</div>
            <div className="text-xs text-muted-foreground">{game.slug}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
