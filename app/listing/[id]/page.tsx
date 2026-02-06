import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getListingById } from "@/lib/queries";
import { Badge } from "@/components/ui/badge";
import { AdSlot } from "@/components/ads/ad-slot";
import { AdPlacementKey } from "@prisma/client";

export const revalidate = 600;

export default async function ListingPage({ params }: { params: { id: string } }) {
  const listing = await getListingById(params.id);
  if (!listing) return notFound();

  return (
    <div className="space-y-8">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {listing.images.length ? (
              listing.images.map((image) => (
                <div key={image.id} className="relative h-52 overflow-hidden rounded-2xl">
                  <Image src={image.url} alt={listing.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-border bg-secondary/40 p-8 text-center text-sm text-muted-foreground">
                Изображения не загружены
              </div>
            )}
          </div>
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge>{listing.game.title}</Badge>
              <Badge>{listing.category.title}</Badge>
              <span>{listing.platform}</span>
              <span>{listing.language}</span>
              {listing.country ? <span>{listing.country}</span> : null}
            </div>
            <h1 className="text-3xl font-semibold">{listing.title}</h1>
            <p className="text-muted-foreground whitespace-pre-line">{listing.description}</p>
          </div>
        </div>
        <aside className="space-y-4 rounded-2xl border border-border bg-card/70 p-6">
          <div>
            <div className="text-sm text-muted-foreground">Цена</div>
            <div className="text-3xl font-semibold">
              {listing.price} {listing.currency}
            </div>
          </div>
          <div className="rounded-xl border border-border/60 p-4">
            <div className="text-sm text-muted-foreground">Продавец</div>
            <div className="mt-2 text-lg font-semibold">{listing.user.displayName ?? listing.user.username}</div>
            <div className="text-xs text-muted-foreground">Подтверждений: {listing.confirmations.length}</div>
            {listing.isOnline ? <div className="mt-1 text-xs text-green-400">Онлайн сейчас</div> : null}
            <div className="mt-3 space-y-2 text-sm">
              {listing.user.telegram ? (
                <Link href={`https://t.me/${listing.user.telegram.replace("@", "")}`} className="text-primary">
                  Написать в Telegram
                </Link>
              ) : null}
              {listing.user.discord ? (
                <span className="block">Discord: {listing.user.discord}</span>
              ) : null}
            </div>
          </div>
          <div className="rounded-xl bg-secondary/50 p-4 text-xs text-muted-foreground">
            CherryPlay не является стороной сделки, не хранит деньги и не гарантирует результат услуг.
          </div>
        </aside>
      </section>

      <AdSlot placementKey={AdPlacementKey.LISTING_BOTTOM} />

      <section className="rounded-2xl border border-border bg-card/60 p-6">
        <div className="text-sm font-semibold">Пожаловаться</div>
        <p className="mt-2 text-sm text-muted-foreground">
          Если объявление нарушает правила, отправьте жалобу. Модераторы рассмотрят её в течение 24 часов.
        </p>
        <Link href="/rules" className="mt-3 inline-block text-sm text-primary">
          Ознакомиться с правилами
        </Link>
      </section>
    </div>
  );
}
