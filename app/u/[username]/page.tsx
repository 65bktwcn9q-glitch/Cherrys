import { prisma } from "@/lib/prisma";
import { ListingCard } from "@/components/cards/listing-card";

export const dynamic = "force-dynamic";

export default async function UserProfilePage({ params }: { params: { username: string } }) {
  const user = await prisma.user.findFirst({
    where: { username: params.username },
    include: {
      listings: {
        where: { status: "ACTIVE" },
        include: { game: true, category: true, images: { take: 1 } }
      }
    }
  });

  if (!user) {
    return (
      <div className="rounded-2xl border border-border bg-card/60 p-6">
        <div className="text-lg font-semibold">Пользователь не найден</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card/70 p-6">
        <h1 className="text-3xl font-semibold">{user.displayName ?? user.username}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{user.bio ?? "Описание пока не заполнено."}</p>
        <div className="mt-4 text-sm text-muted-foreground">
          Telegram: {user.telegram ?? "не указан"} · Discord: {user.discord ?? "не указан"}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {user.listings.map((listing) => (
          <ListingCard
            key={listing.id}
            id={listing.id}
            title={listing.title}
            price={listing.price}
            currency={listing.currency}
            game={listing.game.title}
            category={listing.category.title}
            coverUrl={listing.images[0]?.url ?? null}
            seller={user.username}
            createdAt={listing.createdAt}
            snippet={listing.snippet}
          />
        ))}
      </div>
    </div>
  );
}
