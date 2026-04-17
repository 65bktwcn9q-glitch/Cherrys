import { supabaseServer } from "@/lib/supabase-server";

export const REPORT_THRESHOLDS = {
  flagged: 1,
  hidden: 3,
  banned: 10
};

export async function applyModerationStatus(targetUser: string) {
  const { count } = await supabaseServer
    .from("reports")
    .select("id", { count: "exact", head: true })
    .eq("target_user", targetUser);

  const reportsCount = count ?? 0;
  const patch = {
    flagged: reportsCount >= REPORT_THRESHOLDS.flagged,
    hidden: reportsCount >= REPORT_THRESHOLDS.hidden,
    banned: reportsCount >= REPORT_THRESHOLDS.banned
  };

  await supabaseServer.from("users").update(patch).eq("id", targetUser);
  return patch;
}
