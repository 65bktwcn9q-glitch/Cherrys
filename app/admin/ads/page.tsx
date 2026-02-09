import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminAdsPage() {
  const ads = await prisma.adPlacement.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Управление рекламой</h1>
      <div className="rounded-2xl border border-border bg-card/60 p-6">
        <div className="text-sm text-muted-foreground">Всего рекламных блоков: {ads.length}</div>
        <div className="mt-4 space-y-3">
          {ads.map((ad) => (
            <div key={ad.id} className="rounded-xl border border-border/60 p-4">
              <div className="font-semibold">{ad.title}</div>
              <div className="text-xs text-muted-foreground">Placement: {ad.placementKey}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
