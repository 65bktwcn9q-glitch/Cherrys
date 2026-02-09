import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GameCard } from "@/components/cards/game-card";
import { CategoryCard } from "@/components/cards/category-card";
import { ListingCard } from "@/components/cards/listing-card";
import { getHomeData } from "@/lib/queries";
import { AdSlot } from "@/components/ads/ad-slot";
import { AdPlacementKey } from "@prisma/client";

const HeroFloating = dynamic(() => import("@/components/sections/hero-floating").then((mod) => mod.HeroFloating), {
  ssr: false
});

export const revalidate = 600;

export default async function HomePage() {
  const { games, categories, listings } = await getHomeData();

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-indigo-950/80 via-slate-950 to-slate-900 px-6 py-16 md:px-16">
        <HeroFloating />
        <div className="relative z-10 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">маркетплейс игровых услуг</p>
            <h1 className="mt-4 text-4xl font-bold md:text-5xl">
              Продавайте и находите <span className="gradient-text">игровые услуги</span> напрямую
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              CherryPlay — площадка без эскроу. Общайтесь с продавцом в Telegram или Discord и договаривайтесь напрямую.
              Мы не участвуем в оплате и не храним деньги.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/listings">Найти услугу</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/sell/new">Создать объявление</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card/60 p-6 text-sm text-muted-foreground">
            <div className="text-base font-semibold text-foreground">Как мы зарабатываем</div>
            <p className="mt-3">Только реклама. Без комиссий и скрытых сборов.</p>
            <ul className="mt-4 space-y-2">
              <li>• Нативные баннеры в каталоге и на страницах.</li>
              <li>• Прозрачная статистика показов и кликов.</li>
              <li>• Никаких внешних рекламных скриптов.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Популярные игры</h2>
          <Link href="/listings" className="text-sm text-primary">
            Смотреть все
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {games.map((game) => (
            <GameCard key={game.id} slug={game.slug} title={game.title} coverUrl={game.coverUrl} description={game.shortDescription} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Топ-категории</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} title={category.title} icon={category.icon} />
          ))}
        </div>
      </section>

      <AdSlot placementKey={AdPlacementKey.HOME_TOP} />

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Свежие объявления</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {listings.map((listing) => (
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

      <section className="grid gap-6 rounded-3xl border border-border bg-card/60 p-8 md:grid-cols-3">
        {["Создайте объявление", "Получайте отклики", "Договаривайтесь напрямую"].map((step, index) => (
          <div key={step} className="space-y-2">
            <div className="text-sm text-muted-foreground">Шаг {index + 1}</div>
            <div className="text-lg font-semibold">{step}</div>
            <p className="text-sm text-muted-foreground">
              Без комиссий и посредников. Все сделки происходят напрямую между пользователями.
            </p>
          </div>
        ))}
      </section>

      <AdSlot placementKey={AdPlacementKey.HOME_MID} />
    </div>
  );
}
