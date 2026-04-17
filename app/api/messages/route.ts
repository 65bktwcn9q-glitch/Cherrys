import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabase-server";

const messageSchema = z.object({
  match_id: z.string().uuid(),
  sender_id: z.string().uuid(),
  text: z.string().min(1).max(2000)
});

export async function GET(req: NextRequest) {
  const matchId = req.nextUrl.searchParams.get("match_id");
  if (!matchId) return NextResponse.json({ error: "match_id required" }, { status: 400 });

  const { data, error } = await supabaseServer
    .from("messages")
    .select("*")
    .eq("match_id", matchId)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ messages: data });
}

export async function POST(req: NextRequest) {
  const payload = messageSchema.parse(await req.json());

  const { data, error } = await supabaseServer.from("messages").insert(payload).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  await supabaseServer.rpc("increment_rank_points", { user_id_input: payload.sender_id, by_value: 2 });

  return NextResponse.json({ message: data });
}
