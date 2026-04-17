import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabase-server";

const schema = z.object({
  telegram_id: z.string(),
  username: z.string().min(2).max(40),
  age: z.number().min(18).max(99),
  city: z.string().min(2),
  country: z.string().min(2),
  avatar: z.string().url(),
  media: z.array(z.object({ type: z.enum(["image", "video"]), url: z.string().url() })).max(5)
});

export async function POST(req: NextRequest) {
  const data = schema.parse(await req.json());

  const { data: user, error } = await supabaseServer
    .from("users")
    .upsert({ ...data, rank_points: 0, activity_points: 0 }, { onConflict: "telegram_id" })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ user });
}

export async function GET(req: NextRequest) {
  const telegramId = req.nextUrl.searchParams.get("telegram_id");
  if (!telegramId) return NextResponse.json({ error: "telegram_id required" }, { status: 400 });

  const { data, error } = await supabaseServer.from("users").select("*").eq("telegram_id", telegramId).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json({ user: data });
}
