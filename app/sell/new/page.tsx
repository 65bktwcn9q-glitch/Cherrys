import { ListingForm } from "@/components/forms/listing-form";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function SellPage() {
  const [games, categories] = await Promise.all([
    prisma.game.findMany({ where: { isActive: true } }),
    prisma.category.findMany({ where: { isActive: true } })
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Создание объявления</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Перед публикацией объявления проходят модерацию. Убедитесь, что контент не нарушает правила игр и законы.
        </p>
      </div>
      <ListingForm
        games={games.map((game) => ({ id: game.id, title: game.title }))}
        categories={categories.map((category) => ({ id: category.id, title: category.title }))}
      />
    </div>
  );
}
