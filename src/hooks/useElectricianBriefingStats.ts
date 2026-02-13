import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ElectricianBriefingStats {
  upcomingCount: number;
  completedThisMonth: number;
  totalCount: number;
}

export function useElectricianBriefingStats() {
  return useQuery({
    queryKey: ["electrician-briefing-stats"],
    queryFn: async (): Promise<ElectricianBriefingStats> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const now = new Date();
      const today = now.toISOString().split("T")[0];
      const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;

      const [upcomingRes, completedRes, totalRes] = await Promise.all([
        // Upcoming: scheduled and date >= today
        supabase
          .from("team_briefings")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("status", "scheduled")
          .gte("briefing_date", today),
        // Completed this month
        supabase
          .from("team_briefings")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("completed", true)
          .gte("briefing_date", monthStart),
        // Total count
        supabase
          .from("team_briefings")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id),
      ]);

      return {
        upcomingCount: upcomingRes.count ?? 0,
        completedThisMonth: completedRes.count ?? 0,
        totalCount: totalRes.count ?? 0,
      };
    },
    staleTime: 60_000,
  });
}
