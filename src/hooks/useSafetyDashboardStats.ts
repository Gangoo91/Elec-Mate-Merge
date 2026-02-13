import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSafetyEquipment } from "@/hooks/useSafetyEquipment";
import { useElectricianBriefingStats } from "@/hooks/useElectricianBriefingStats";

export interface SafetyDashboardStats {
  activeRams: number;
  daysSinceLastNearMiss: number | null;
  equipmentDue: number;
  equipmentOverdue: number;
  upcomingBriefings: number;
  completedBriefingsThisMonth: number;
  totalPhotosThisWeek: number;
  totalNearMisses: number;
  equipmentTotal: number;
  activePermits: number;
  coshhOverdueReviews: number;
  recentInspectionsPassed: number;
  recentInspectionsFailed: number;
  accidentCount30Days: number;
}

export interface RecentDocument {
  id: string;
  type: "rams" | "permit" | "inspection" | "coshh" | "accident" | "briefing";
  title: string;
  date: string;
  status?: string;
}

function useComplianceStats() {
  return useQuery({
    queryKey: ["safety-compliance-stats"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const now = new Date();
      const thirtyDaysAgo = new Date(
        now.getTime() - 30 * 24 * 60 * 60 * 1000
      ).toISOString();
      const todayStr = now.toISOString().split("T")[0];

      const sevenDaysAgo = new Date(
        now.getTime() - 7 * 24 * 60 * 60 * 1000
      ).toISOString();

      const [
        permitsRes,
        coshhRes,
        inspectionsRes,
        accidentsRes,
        ramsRes,
        nearMissCountRes,
        nearMissLatestRes,
        photosRes,
      ] = await Promise.all([
        supabase
          .from("permits_to_work")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("status", "active"),
        supabase
          .from("coshh_assessments")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)
          .lt("review_date", todayStr),
        supabase
          .from("inspection_records")
          .select("overall_result")
          .eq("user_id", user.id)
          .gte("date", thirtyDaysAgo.split("T")[0]),
        supabase
          .from("accident_records")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)
          .gte("incident_date", thirtyDaysAgo.split("T")[0]),
        // 1.1 — Live RAMS count (all saved documents)
        supabase
          .from("rams_documents")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id),
        // 1.2a — Total near-miss count
        supabase
          .from("near_miss_reports")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id),
        // 1.2b — Most recent near-miss incident date
        supabase
          .from("near_miss_reports")
          .select("incident_date")
          .eq("user_id", user.id)
          .order("incident_date", { ascending: false })
          .limit(1),
        // 1.3 — Photos taken this week
        supabase
          .from("safety_photos")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)
          .gte("created_at", sevenDaysAgo),
      ]);

      const inspections = inspectionsRes.data ?? [];
      const passed = inspections.filter(
        (i) => i.overall_result === "pass"
      ).length;
      const failed = inspections.filter(
        (i) => i.overall_result === "fail"
      ).length;

      // Calculate days since last near miss
      let daysSinceLastNearMiss: number | null = null;
      const latestNearMiss = nearMissLatestRes.data?.[0];
      if (latestNearMiss?.incident_date) {
        const lastDate = new Date(latestNearMiss.incident_date);
        daysSinceLastNearMiss = Math.floor(
          (now.getTime() - lastDate.getTime()) / 86400000
        );
      }

      return {
        activePermits: permitsRes.count ?? 0,
        coshhOverdueReviews: coshhRes.count ?? 0,
        recentInspectionsPassed: passed,
        recentInspectionsFailed: failed,
        accidentCount30Days: accidentsRes.count ?? 0,
        activeRams: ramsRes.count ?? 0,
        totalNearMisses: nearMissCountRes.count ?? 0,
        daysSinceLastNearMiss,
        totalPhotosThisWeek: photosRes.count ?? 0,
      };
    },
    staleTime: 60_000,
  });
}

export function useRecentDocuments() {
  return useQuery({
    queryKey: ["recent-safety-documents"],
    queryFn: async (): Promise<RecentDocument[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const [
        permitsRes,
        coshhRes,
        inspectionsRes,
        accidentsRes,
        briefingsRes,
        ramsDocsRes,
      ] = await Promise.all([
        supabase
          .from("permits_to_work")
          .select("id, title, created_at, status")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(3),
        supabase
          .from("coshh_assessments")
          .select("id, substance_name, created_at, risk_rating")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(3),
        supabase
          .from("inspection_records")
          .select("id, template_title, date, overall_result")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(3),
        supabase
          .from("accident_records")
          .select("id, injured_name, incident_date, severity")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(3),
        supabase
          .from("team_briefings")
          .select("id, briefing_name, briefing_date, status")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(3),
        // 1.4 — RAMS documents in recent feed
        supabase
          .from("rams_documents")
          .select("id, project_name, created_at, status")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(3),
      ]);

      const docs: RecentDocument[] = [];

      (permitsRes.data ?? []).forEach((p) =>
        docs.push({
          id: p.id,
          type: "permit",
          title: p.title,
          date: p.created_at,
          status: p.status,
        })
      );

      (coshhRes.data ?? []).forEach((c) =>
        docs.push({
          id: c.id,
          type: "coshh",
          title: c.substance_name,
          date: c.created_at,
          status: c.risk_rating,
        })
      );

      (inspectionsRes.data ?? []).forEach((i) =>
        docs.push({
          id: i.id,
          type: "inspection",
          title: i.template_title,
          date: i.date,
          status: i.overall_result,
        })
      );

      (accidentsRes.data ?? []).forEach((a) =>
        docs.push({
          id: a.id,
          type: "accident",
          title: `Accident — ${a.injured_name}`,
          date: a.incident_date,
          status: a.severity,
        })
      );

      (briefingsRes.data ?? []).forEach((b) =>
        docs.push({
          id: b.id,
          type: "briefing",
          title: b.briefing_name ?? "Briefing",
          date: b.briefing_date,
          status: b.status,
        })
      );

      (ramsDocsRes.data ?? []).forEach((r) =>
        docs.push({
          id: r.id,
          type: "rams",
          title: r.project_name,
          date: r.created_at,
          status: r.status,
        })
      );

      // Sort by date descending, return top 6
      docs.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      return docs.slice(0, 6);
    },
    staleTime: 60_000,
  });
}

export function useSafetyDashboardStats() {
  const { stats: equipmentStats, isLoading: equipmentLoading } =
    useSafetyEquipment();
  const { data: briefingStats, isLoading: briefingsLoading } =
    useElectricianBriefingStats();
  const { data: complianceStats, isLoading: complianceLoading } =
    useComplianceStats();

  const stats: SafetyDashboardStats = {
    activeRams: complianceStats?.activeRams ?? 0,
    daysSinceLastNearMiss: complianceStats?.daysSinceLastNearMiss ?? null,
    equipmentDue: equipmentStats?.needsAttention ?? 0,
    equipmentOverdue: equipmentStats?.overdue ?? 0,
    upcomingBriefings: briefingStats?.upcomingCount ?? 0,
    completedBriefingsThisMonth: briefingStats?.completedThisMonth ?? 0,
    totalPhotosThisWeek: complianceStats?.totalPhotosThisWeek ?? 0,
    totalNearMisses: complianceStats?.totalNearMisses ?? 0,
    equipmentTotal: equipmentStats?.total ?? 0,
    activePermits: complianceStats?.activePermits ?? 0,
    coshhOverdueReviews: complianceStats?.coshhOverdueReviews ?? 0,
    recentInspectionsPassed: complianceStats?.recentInspectionsPassed ?? 0,
    recentInspectionsFailed: complianceStats?.recentInspectionsFailed ?? 0,
    accidentCount30Days: complianceStats?.accidentCount30Days ?? 0,
  };

  return {
    stats,
    isLoading: equipmentLoading || briefingsLoading || complianceLoading,
  };
}
