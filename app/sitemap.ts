import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const SITE_URL = "https://hypergate.example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}`, lastModified: new Date() },
    { url: `${SITE_URL}/listings`, lastModified: new Date() },
    { url: `${SITE_URL}/rules`, lastModified: new Date() },
    { url: `${SITE_URL}/terms`, lastModified: new Date() },
    { url: `${SITE_URL}/privacy`, lastModified: new Date() }
  ];

  if (!process.env.DATABASE_URL) {
    return baseEntries;
  }

  try {
    const [games, listings] = await Promise.all([
      prisma.game.findMany({ select: { slug: true } }),
      prisma.listing.findMany({ select: { id: true } })
    ]);

    return [
      ...baseEntries,
      ...games.map((game) => ({ url: `${SITE_URL}/games/${game.slug}`, lastModified: new Date() })),
      ...listings.map((listing) => ({ url: `${SITE_URL}/listing/${listing.id}`, lastModified: new Date() }))
    ];
  } catch {
    return baseEntries;
  }
}
