import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ModerationPage() {
  const listings = await prisma.listing.findMany({
    where: { status: "PENDING" },
    include: { user: true, game: true }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Модерация объявлений</h1>
      <div className="space-y-4">
        {listings.map((listing) => (
          <div key={listing.id} className="rounded-2xl border border-border bg-card/60 p-4">
            <div className="font-semibold">{listing.title}</div>
            <div className="text-xs text-muted-foreground">
              {listing.game.title} · @{listing.user.username}
            </div>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{listing.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
