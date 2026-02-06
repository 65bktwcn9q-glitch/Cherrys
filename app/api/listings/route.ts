import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  title: z.string().min(6),
  description: z.string().min(20),
  price: z.number().min(1),
  currency: z.string().min(1),
  platform: z.string().min(1),
  language: z.string().min(1),
  country: z.string().optional(),
  gameId: z.string().min(1),
  categoryId: z.string().min(1),
  telegram: z.string().optional(),
  discord: z.string().optional(),
  tags: z.string().optional(),
  isOnline: z.boolean().optional(),
  images: z.array(z.string().url()).max(6).optional()
});

export async function POST(request: NextRequest) {
  const limiter = rateLimit(`listing:${request.ip ?? "anon"}`, 3, 1000 * 60 * 10);
  if (!limiter.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const payload = await request.json();
  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const user = await prisma.user.findFirst();
  if (!user) {
    return NextResponse.json({ error: "No demo user" }, { status: 500 });
  }

  const snippet = parsed.data.description.slice(0, 160);
  const listing = await prisma.listing.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      snippet,
      price: parsed.data.price,
      currency: parsed.data.currency,
      platform: parsed.data.platform,
      language: parsed.data.language,
      country: parsed.data.country,
      tags: parsed.data.tags ? parsed.data.tags.split(",").map((tag) => tag.trim()) : [],
      contactPreference:
        parsed.data.telegram && parsed.data.discord
          ? "BOTH"
          : parsed.data.telegram
            ? "TELEGRAM"
            : "DISCORD",
      isOnline: parsed.data.isOnline ?? false,
      status: "PENDING",
      userId: user.id,
      gameId: parsed.data.gameId,
      categoryId: parsed.data.categoryId,
      images: {
        create: parsed.data.images?.map((url, index) => ({ url, sortOrder: index })) ?? []
      }
    }
  });

  if (parsed.data.telegram || parsed.data.discord) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        telegram: parsed.data.telegram ?? user.telegram,
        discord: parsed.data.discord ?? user.discord
      }
    });
  }

  return NextResponse.json({ ok: true, id: listing.id });
}
