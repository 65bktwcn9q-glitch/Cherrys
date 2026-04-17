import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.toLowerCase() ?? "";

  const { data, error } = await supabaseServer.from("cities").select("city,country").limit(15);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const filtered = data.filter(
    (item) => item.city.toLowerCase().includes(q) || item.country.toLowerCase().includes(q)
  );

  return NextResponse.json({ cities: filtered });
}
