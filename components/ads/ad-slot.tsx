import Link from "next/link";
import Image from "next/image";
import { getActiveAds, pickWeighted } from "@/lib/ad-rotation";
import { AdPlacementKey } from "@prisma/client";
import { AdImpressionTracker } from "@/components/ads/ad-tracker";

export async function AdSlot({ placementKey }: { placementKey: AdPlacementKey }) {
  const ads = await getActiveAds(placementKey);
  if (!ads.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-6 text-center text-sm">
        <div className="font-semibold">Реклама</div>
        <p className="mt-2 text-muted-foreground">Хотите показать баннер здесь?</p>
        <Link href="/advertise" className="mt-3 inline-block text-primary">
          Разместить рекламу
        </Link>
      </div>
    );
  }

  const ad = pickWeighted(ads);
  return (
    <div className="rounded-2xl border border-border bg-card/70 p-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Реклама</span>
        <span>{ad.advertiserName ?? "Спонсор"}</span>
      </div>
      <Link href={`/go/ad/${ad.id}`} className="mt-3 block">
        {ad.imageUrl ? (
          <div className="relative h-36 w-full overflow-hidden rounded-xl">
            <Image src={ad.imageUrl} alt={ad.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
          </div>
        ) : (
          <div className="rounded-xl bg-secondary/60 p-6 text-sm">
            <div className="font-semibold">{ad.title}</div>
            <p className="mt-2 text-muted-foreground">{ad.notes ?? "Нативное размещение"}</p>
          </div>
        )}
      </Link>
      <AdImpressionTracker adId={ad.id} placementKey={placementKey} />
    </div>
  );
}
