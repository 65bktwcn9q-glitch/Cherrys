import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const games = await prisma.game.findMany({ select: { slug: true } });
  const listings = await prisma.listing.findMany({ select: { id: true } });

  return [
    { url: "https://example.com", lastModified: new Date() },
    { url: "https://example.com/listings", lastModified: new Date() },
    ...games.map((game) => ({ url: `https://example.com/games/${game.slug}`, lastModified: new Date() })),
    ...listings.map((listing) => ({ url: `https://example.com/listing/${listing.id}`, lastModified: new Date() }))
  ];
}
