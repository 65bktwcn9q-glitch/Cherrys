import { prisma } from "@/lib/prisma";

export async function getHomeData() {
  const [games, categories, listings] = await Promise.all([
    prisma.game.findMany({ where: { isActive: true }, take: 6 }),
    prisma.category.findMany({ where: { isActive: true }, take: 7 }),
    prisma.listing.findMany({
      where: { status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
      take: 6,
      include: {
        game: true,
        category: true,
        images: { take: 1 }
      }
    })
  ]);

  return { games, categories, listings };
}

export async function getListingById(id: string) {
  return prisma.listing.findUnique({
    where: { id },
    include: {
      user: true,
      game: true,
      category: true,
      images: true,
      confirmations: { where: { isApproved: true }, take: 5, orderBy: { createdAt: "desc" } }
    }
  });
}

export async function getListings({
  game,
  category,
  platform,
  query,
  language,
  country,
  contactPreference,
  isOnline,
  page = 1,
  perPage = 12
}: {
  game?: string;
  category?: string;
  platform?: string;
  query?: string;
  language?: string;
  country?: string;
  contactPreference?: string;
  isOnline?: boolean;
  page?: number;
  perPage?: number;
}) {
  const where = {
    status: "ACTIVE" as const,
    gameId: game || undefined,
    categoryId: category || undefined,
    platform: platform || undefined,
    title: query ? { contains: query, mode: "insensitive" } : undefined,
    language: language || undefined,
    country: country || undefined,
    contactPreference: contactPreference || undefined,
    isOnline: isOnline ?? undefined
  };

  const [items, total] = await Promise.all([
    prisma.listing.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: perPage,
      skip: (page - 1) * perPage,
      include: {
        game: true,
        category: true,
        images: { take: 1 },
        user: true
      }
    }),
    prisma.listing.count({ where })
  ]);

  return { items, total };
}
