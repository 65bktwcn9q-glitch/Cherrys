import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ListingCard } from "@/components/cards/listing-card";
import { AdSlot } from "@/components/ads/ad-slot";
import { AdPlacementKey } from "@prisma/client";

export const revalidate = 1800;

export default async function GamePage({ params }: { params: { slug: string } }) {
  const game = await prisma.game.findUnique({
    where: { slug: params.slug },
    include: {
      listings: {
        where: { status: "ACTIVE" },
        take: 6,
        include: { category: true, user: true, images: { take: 1 } }
      }
    }
  });

  if (!game) return notFound();

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-border">
        <div className="relative h-48">
          <Image src={game.coverUrl} alt={game.title} fill className="object-cover" sizes="100vw" />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-semibold">{game.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{game.shortDescription}</p>
        </div>
      </section>

      <AdSlot placementKey={AdPlacementKey.GAME_TOP} />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Объявления по игре</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {game.listings.map((listing) => (
            <ListingCard
              key={listing.id}
              id={listing.id}
              title={listing.title}
              price={listing.price}
              currency={listing.currency}
              game={game.title}
              category={listing.category.title}
              coverUrl={listing.images[0]?.url ?? null}
              seller={listing.user.username}
              createdAt={listing.createdAt}
              snippet={listing.snippet}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
