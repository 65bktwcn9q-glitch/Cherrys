import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("user_id");
  if (!userId) return NextResponse.json({ error: "user_id required" }, { status: 400 });

  const { data, error } = await supabaseServer
    .from("matches")
    .select("*, user1_profile:users!matches_user1_fkey(id,username,avatar), user2_profile:users!matches_user2_fkey(id,username,avatar)")
    .or(`user1.eq.${userId},user2.eq.${userId}`)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ matches: data });
}
