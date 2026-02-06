import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { hashValue } from "@/lib/hash";

export async function GET(request: NextRequest, { params }: { params: { adId: string } }) {
  const ad = await prisma.adPlacement.findUnique({ where: { id: params.adId } });
  if (!ad || !ad.linkUrl) {
    return NextResponse.redirect(new URL("/advertise", request.url));
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  const sessionKey = `ad-click-${params.adId}-${hashValue(ip)}`;
  const limiter = rateLimit(sessionKey, 5, 1000 * 60 * 30);

  if (limiter.success) {
    await prisma.adEvent.create({
      data: {
        adId: params.adId,
        type: "CLICK",
        pagePath: request.nextUrl.pathname,
        ipHash: hashValue(ip),
        userAgentHash: hashValue(request.headers.get("user-agent") ?? "unknown")
      }
    });

    await prisma.adStatsDaily.upsert({
      where: { adId_date: { adId: params.adId, date: new Date().toISOString().slice(0, 10) } },
      update: { clicks: { increment: 1 } },
      create: {
        adId: params.adId,
        date: new Date().toISOString().slice(0, 10),
        impressions: 0,
        clicks: 1
      }
    });
  }

  return NextResponse.redirect(ad.linkUrl);
}
