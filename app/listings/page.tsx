import { getListings } from "@/lib/queries";
import { ListingCard } from "@/components/cards/listing-card";
import { prisma } from "@/lib/prisma";
import { AdSlot } from "@/components/ads/ad-slot";
import { AdPlacementKey } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function ListingsPage({
  searchParams
}: {
  searchParams: {
    game?: string;
    category?: string;
    platform?: string;
    page?: string;
    q?: string;
    language?: string;
    country?: string;
    contact?: string;
    online?: string;
  };
}) {
  const page = Number(searchParams.page ?? 1);
  const { items, total } = await getListings({
    game: searchParams.game,
    category: searchParams.category,
    platform: searchParams.platform,
    query: searchParams.q,
    language: searchParams.language,
    country: searchParams.country,
    contactPreference: searchParams.contact,
    isOnline: searchParams.online === "true",
    page
  });
  const games = await prisma.game.findMany({ where: { isActive: true } });
  const categories = await prisma.category.findMany({ where: { isActive: true } });

  return (
    <div className="grid gap-8 md:grid-cols-[260px_1fr]">
      <aside className="space-y-4 rounded-2xl border border-border bg-card/60 p-4">
        <div className="text-sm font-semibold">Фильтры</div>
        <form className="space-y-3 text-sm">
          <div>
            <label className="text-xs text-muted-foreground">Поиск</label>
            <input
              name="q"
              defaultValue={searchParams.q ?? ""}
              className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2"
              placeholder="Найти по названию"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Игра</label>
            <select name="game" defaultValue={searchParams.game ?? ""} className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2">
              <option value="">Все игры</option>
              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Категория</label>
            <select name="category" defaultValue={searchParams.category ?? ""} className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2">
              <option value="">Все категории</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Платформа</label>
            <select name="platform" defaultValue={searchParams.platform ?? ""} className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2">
              <option value="">Любая</option>
              <option value="PC">PC</option>
              <option value="PS">PS</option>
              <option value="Xbox">Xbox</option>
              <option value="Mobile">Mobile</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Язык</label>
            <input
              name="language"
              defaultValue={searchParams.language ?? ""}
              className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2"
              placeholder="Русский"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Страна</label>
            <input
              name="country"
              defaultValue={searchParams.country ?? ""}
              className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2"
              placeholder="Казахстан"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Связь</label>
            <select name="contact" defaultValue={searchParams.contact ?? ""} className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2">
              <option value="">Любая</option>
              <option value="TELEGRAM">Telegram</option>
              <option value="DISCORD">Discord</option>
              <option value="BOTH">Оба</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input type="checkbox" name="online" value="true" defaultChecked={searchParams.online === "true"} />
            Онлайн сейчас
          </label>
          <button type="submit" className="w-full rounded-md bg-primary px-3 py-2 text-white">
            Применить
          </button>
        </form>
        <AdSlot placementKey={AdPlacementKey.CATALOG_SIDEBAR} />
      </aside>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Каталог объявлений</h1>
          <div className="text-sm text-muted-foreground">Найдено: {total}</div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((listing) => (
            <ListingCard
              key={listing.id}
              id={listing.id}
              title={listing.title}
              price={listing.price}
              currency={listing.currency}
              game={listing.game.title}
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
