import { prisma } from "@/lib/prisma";
import { AdPlacementKey } from "@prisma/client";

export async function getActiveAds(placementKey: AdPlacementKey) {
  const now = new Date();
  return prisma.adPlacement.findMany({
    where: {
      placementKey,
      isActive: true,
      AND: [
        { OR: [{ startAt: null }, { startAt: { lte: now } }] },
        { OR: [{ endAt: null }, { endAt: { gte: now } }] }
      ]
    }
  });
}

export function pickWeighted<T extends { weight: number }>(items: T[]) {
  const total = items.reduce((sum, item) => sum + (item.weight || 1), 0);
  const target = Math.random() * total;
  let current = 0;
  for (const item of items) {
    current += item.weight || 1;
    if (target <= current) return item;
  }
  return items[0];
}
