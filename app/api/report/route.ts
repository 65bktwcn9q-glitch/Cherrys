import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabase-server";
import { applyModerationStatus } from "@/lib/hotrank/server";

const reportSchema = z.object({
  from_user: z.string().uuid(),
  target_user: z.string().uuid(),
  reason: z.enum(["Nudity / Porn", "Fake profile", "Harassment", "Spam", "Scam"])
});

export async function POST(req: NextRequest) {
  const payload = reportSchema.parse(await req.json());

  const { error } = await supabaseServer.from("reports").insert(payload);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const status = await applyModerationStatus(payload.target_user);
  await supabaseServer.from("moderation_queue").insert({
    user_id: payload.target_user,
    source: "report",
    status: status.banned ? "banned" : status.hidden ? "hidden" : "flagged"
  });

  return NextResponse.json({ ok: true, moderation: status });
}
