import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { hashValue } from "@/lib/hash";

const schema = z.object({
  adId: z.string().min(1),
  placementKey: z.string().min(1),
  pagePath: z.string().min(1),
  listingId: z.string().optional(),
  gameId: z.string().optional()
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  const sessionKey = `ad-${parsed.data.adId}-${hashValue(ip)}`;
  const limiter = rateLimit(sessionKey, 1, 1000 * 60 * 30);
  if (!limiter.success) {
    return NextResponse.json({ ok: true });
  }

  await prisma.adEvent.create({
    data: {
      adId: parsed.data.adId,
      type: "IMPRESSION",
      listingId: parsed.data.listingId,
      gameId: parsed.data.gameId,
      pagePath: parsed.data.pagePath,
      ipHash: hashValue(ip),
      userAgentHash: hashValue(request.headers.get("user-agent") ?? "unknown")
    }
  });

  await prisma.adStatsDaily.upsert({
    where: { adId_date: { adId: parsed.data.adId, date: new Date().toISOString().slice(0, 10) } },
    update: { impressions: { increment: 1 } },
    create: {
      adId: parsed.data.adId,
      date: new Date().toISOString().slice(0, 10),
      impressions: 1,
      clicks: 0
    }
  });

  return NextResponse.json({ ok: true });
}
