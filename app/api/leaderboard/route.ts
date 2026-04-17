import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  const scope = req.nextUrl.searchParams.get("scope") ?? "city";
  const city = req.nextUrl.searchParams.get("city");
  const country = req.nextUrl.searchParams.get("country");

  let query = supabaseServer
    .from("users")
    .select("id, username, avatar, city, country, rank_points, activity_points")
    .eq("banned", false)
    .order("rank_points", { ascending: false })
    .limit(100);

  if (scope === "city" && city) query = query.eq("city", city);
  if (scope === "country" && country) query = query.eq("country", country);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ leaderboard: data });
}
