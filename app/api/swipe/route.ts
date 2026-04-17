import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabase-server";

const swipeSchema = z.object({
  from_user: z.string().uuid(),
  to_user: z.string().uuid(),
  action: z.enum(["like", "skip"])
});

export async function POST(req: NextRequest) {
  const payload = swipeSchema.parse(await req.json());

  const { error } = await supabaseServer.from("swipes").insert(payload);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  if (payload.action === "like") {
    await supabaseServer.rpc("increment_rank_points", { user_id_input: payload.to_user, by_value: 1 });
  }

  const { data: reverseLike } = await supabaseServer
    .from("swipes")
    .select("id")
    .eq("from_user", payload.to_user)
    .eq("to_user", payload.from_user)
    .eq("action", "like")
    .maybeSingle();

  let match = null;
  if (payload.action === "like" && reverseLike) {
    const { data } = await supabaseServer
      .from("matches")
      .insert({ user1: payload.from_user, user2: payload.to_user })
      .select("*")
      .single();

    await supabaseServer.rpc("increment_rank_points", { user_id_input: payload.from_user, by_value: 5 });
    await supabaseServer.rpc("increment_rank_points", { user_id_input: payload.to_user, by_value: 5 });

    match = data;
  }

  return NextResponse.json({ ok: true, match });
}
