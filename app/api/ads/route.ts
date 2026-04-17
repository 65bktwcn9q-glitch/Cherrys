import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET() {
  const { data, error } = await supabaseServer.from("ads").select("*").eq("is_active", true);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ads: data });
}
