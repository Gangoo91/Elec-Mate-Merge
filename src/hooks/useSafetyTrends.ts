import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface WeeklyNearMissData {
  week: string;
  count: number;
}

export interface InspectionResultData {
  title: string;
  passed: number;
  failed: number;
}

export interface ToolUsageData {
  tool: string;
  count: number;
  colour: string;
}

export interface SafetyTrends {
  nearMissWeekly: WeeklyNearMissData[];
  inspectionResults: InspectionResultData[];
  toolUsage: ToolUsageData[];
  weekOverWeekChange: number;
}

export function useSafetyTrends() {
  return useQuery({
    queryKey: ["safety-trends"],
    queryFn: async (): Promise<SafetyTrends> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const now = new Date();
      const twelveWeeksAgo = new Date(
        now.getTime() - 12 * 7 * 24 * 60 * 60 * 1000
      ).toISOString();

      const [nearMissRes, inspectionsRes, ramsRes, photosRes, briefingsRes, permitsRes] =
        await Promise.all([
          // Near-miss reports (last 12 weeks)
          supabase
            .from("near_miss_reports")
            .select("incident_date")
            .eq("user_id", user.id)
            .gte("incident_date", twelveWeeksAgo.split("T")[0])
            .order("incident_date", { ascending: true }),
          // Inspections (last 10)
          supabase
            .from("inspection_records")
            .select("template_title, overall_result, date")
            .eq("user_id", user.id)
            .order("date", { ascending: false })
            .limit(10),
          // RAMS count (all time)
          supabase
            .from("rams_documents")
            .select("id", { count: "exact", head: true })
            .eq("user_id", user.id),
          // Photos count (all time)
          supabase
            .from("safety_photos")
            .select("id", { count: "exact", head: true })
            .eq("user_id", user.id),
          // Briefings count (all time)
          supabase
            .from("team_briefings")
            .select("id", { count: "exact", head: true })
            .eq("user_id", user.id),
          // Permits count (all time)
          supabase
            .from("permits_to_work")
            .select("id", { count: "exact", head: true })
            .eq("user_id", user.id),
        ]);

      // Group near misses by week
      const weeklyMap = new Map<string, number>();
      for (let i = 11; i >= 0; i--) {
        const weekStart = new Date(
          now.getTime() - i * 7 * 24 * 60 * 60 * 1000
        );
        const weekLabel = `W${12 - i}`;
        weeklyMap.set(weekLabel, 0);
      }

      (nearMissRes.data ?? []).forEach((nm) => {
        const date = new Date(nm.incident_date);
        const weeksAgo = Math.floor(
          (now.getTime() - date.getTime()) / (7 * 24 * 60 * 60 * 1000)
        );
        const weekLabel = `W${12 - Math.min(weeksAgo, 11)}`;
        weeklyMap.set(weekLabel, (weeklyMap.get(weekLabel) ?? 0) + 1);
      });

      const nearMissWeekly: WeeklyNearMissData[] = Array.from(
        weeklyMap.entries()
      ).map(([week, count]) => ({ week, count }));

      // Group inspections by result
      const inspections = inspectionsRes.data ?? [];
      const inspectionResults: InspectionResultData[] = [];
      const titleMap = new Map<
        string,
        { passed: number; failed: number }
      >();

      inspections.forEach((insp) => {
        const title = insp.template_title || "Inspection";
        if (!titleMap.has(title)) {
          titleMap.set(title, { passed: 0, failed: 0 });
        }
        const entry = titleMap.get(title)!;
        if (insp.overall_result === "pass") entry.passed++;
        else entry.failed++;
      });

      titleMap.forEach((counts, title) => {
        inspectionResults.push({ title, ...counts });
      });

      // Tool usage
      const toolUsage: ToolUsageData[] = [
        {
          tool: "RAMS",
          count: ramsRes.count ?? 0,
          colour: "#f97316",
        },
        {
          tool: "Photos",
          count: photosRes.count ?? 0,
          colour: "#10b981",
        },
        {
          tool: "Briefings",
          count: briefingsRes.count ?? 0,
          colour: "#a855f7",
        },
        {
          tool: "Permits",
          count: permitsRes.count ?? 0,
          colour: "#f59e0b",
        },
      ];

      // Week-over-week change (compare this week vs last week near misses)
      const thisWeekCount =
        nearMissWeekly[nearMissWeekly.length - 1]?.count ?? 0;
      const lastWeekCount =
        nearMissWeekly[nearMissWeekly.length - 2]?.count ?? 0;
      const weekOverWeekChange = thisWeekCount - lastWeekCount;

      return {
        nearMissWeekly,
        inspectionResults,
        toolUsage,
        weekOverWeekChange,
      };
    },
    staleTime: 120_000,
  });
}
