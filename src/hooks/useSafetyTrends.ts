import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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

export interface AccidentSeverityData {
  severity: string;
  count: number;
  colour: string;
}

export interface SafetyScoreBreakdown {
  factor: string;
  score: number;
  maxScore: number;
  status: 'good' | 'warning' | 'critical';
}

export interface SafetyTrends {
  nearMissWeekly: WeeklyNearMissData[];
  inspectionResults: InspectionResultData[];
  toolUsage: ToolUsageData[];
  accidentSeverity: AccidentSeverityData[];
  nearMissFollowUpRate: number;
  weekOverWeekChange: number;
  scoreBreakdown: SafetyScoreBreakdown[];
}

export function useSafetyTrends() {
  return useQuery({
    queryKey: ['safety-trends'],
    queryFn: async (): Promise<SafetyTrends> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const now = new Date();
      const twelveWeeksAgo = new Date(now.getTime() - 12 * 7 * 24 * 60 * 60 * 1000).toISOString();

      const twelveMonthsAgo = new Date(
        now.getTime() - 365 * 24 * 60 * 60 * 1000
      ).toISOString();

      const [
        nearMissRes,
        inspectionsRes,
        ramsRes,
        photosRes,
        briefingsRes,
        permitsRes,
        accidentsRes,
        nearMissFollowUpRes,
        nearMissTotalRes,
        coshhOverdueRes,
        equipmentOverdueRes,
        lastAccidentRes,
      ] = await Promise.all([
        // Near-miss reports (last 12 weeks)
        supabase
          .from('near_miss_reports')
          .select('incident_date')
          .eq('user_id', user.id)
          .gte('incident_date', twelveWeeksAgo.split('T')[0])
          .order('incident_date', { ascending: true }),
        // Inspections (last 10)
        supabase
          .from('inspection_records')
          .select('template_title, overall_result, date')
          .eq('user_id', user.id)
          .order('date', { ascending: false })
          .limit(10),
        // RAMS count (all time)
        supabase
          .from('rams_documents')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id),
        // Photos count (all time)
        supabase
          .from('safety_photos')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id),
        // Briefings count (all time)
        supabase
          .from('team_briefings')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id),
        // Permits count (all time)
        supabase
          .from('permits_to_work')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id),
        // Accidents (last 12 months) for severity distribution
        supabase
          .from('accident_records')
          .select('severity')
          .eq('user_id', user.id)
          .gte('incident_date', twelveMonthsAgo.split('T')[0]),
        // Near misses with follow-up completed
        supabase
          .from('near_miss_reports')
          .select('id, follow_up_required, status')
          .eq('user_id', user.id)
          .eq('follow_up_required', true),
        // Total near misses requiring follow-up
        supabase
          .from('near_miss_reports')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('follow_up_required', true),
        // COSHH overdue
        supabase
          .from('coshh_assessments')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .lt('review_date', now.toISOString().split('T')[0]),
        // Equipment overdue
        supabase
          .from('safety_equipment')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('status', 'overdue'),
        // Days since last accident
        supabase
          .from('accident_records')
          .select('incident_date')
          .eq('user_id', user.id)
          .order('incident_date', { ascending: false })
          .limit(1),
      ]);

      // Group near misses by week
      const weeklyMap = new Map<string, number>();
      for (let i = 11; i >= 0; i--) {
        const weekStart = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
        const weekLabel = `W${12 - i}`;
        weeklyMap.set(weekLabel, 0);
      }

      (nearMissRes.data ?? []).forEach((nm) => {
        const date = new Date(nm.incident_date);
        const weeksAgo = Math.floor((now.getTime() - date.getTime()) / (7 * 24 * 60 * 60 * 1000));
        const weekLabel = `W${12 - Math.min(weeksAgo, 11)}`;
        weeklyMap.set(weekLabel, (weeklyMap.get(weekLabel) ?? 0) + 1);
      });

      const nearMissWeekly: WeeklyNearMissData[] = Array.from(weeklyMap.entries()).map(
        ([week, count]) => ({ week, count })
      );

      // Group inspections by result
      const inspections = inspectionsRes.data ?? [];
      const inspectionResults: InspectionResultData[] = [];
      const titleMap = new Map<string, { passed: number; failed: number }>();

      inspections.forEach((insp) => {
        const title = insp.template_title || 'Inspection';
        if (!titleMap.has(title)) {
          titleMap.set(title, { passed: 0, failed: 0 });
        }
        const entry = titleMap.get(title)!;
        if (insp.overall_result === 'pass') entry.passed++;
        else entry.failed++;
      });

      titleMap.forEach((counts, title) => {
        inspectionResults.push({ title, ...counts });
      });

      // Tool usage
      const toolUsage: ToolUsageData[] = [
        {
          tool: 'RAMS',
          count: ramsRes.count ?? 0,
          colour: '#f97316',
        },
        {
          tool: 'Photos',
          count: photosRes.count ?? 0,
          colour: '#10b981',
        },
        {
          tool: 'Briefings',
          count: briefingsRes.count ?? 0,
          colour: '#a855f7',
        },
        {
          tool: 'Permits',
          count: permitsRes.count ?? 0,
          colour: '#f59e0b',
        },
      ];

      // Week-over-week change (compare this week vs last week near misses)
      const thisWeekCount = nearMissWeekly[nearMissWeekly.length - 1]?.count ?? 0;
      const lastWeekCount = nearMissWeekly[nearMissWeekly.length - 2]?.count ?? 0;
      const weekOverWeekChange = thisWeekCount - lastWeekCount;

      // Accident severity distribution
      const severityCounts = new Map<string, number>();
      (accidentsRes.data ?? []).forEach((a) => {
        const sev = a.severity || 'unknown';
        severityCounts.set(sev, (severityCounts.get(sev) ?? 0) + 1);
      });

      const severityColours: Record<string, string> = {
        minor: '#4ade80',
        moderate: '#fbbf24',
        major: '#f97316',
        critical: '#ef4444',
        fatal: '#991b1b',
        unknown: '#6b7280',
      };

      const accidentSeverity: AccidentSeverityData[] = [
        'minor',
        'moderate',
        'major',
        'critical',
        'fatal',
      ]
        .filter((s) => severityCounts.has(s))
        .map((s) => ({
          severity: s.charAt(0).toUpperCase() + s.slice(1),
          count: severityCounts.get(s) ?? 0,
          colour: severityColours[s] ?? '#6b7280',
        }));

      // Near-miss follow-up rate
      const followUpRequired = nearMissTotalRes.count ?? 0;
      const followUpCompleted = (nearMissFollowUpRes.data ?? []).filter(
        (nm) => nm.status === 'closed'
      ).length;
      const nearMissFollowUpRate =
        followUpRequired > 0 ? Math.round((followUpCompleted / followUpRequired) * 100) : 100;

      // Safety score breakdown (weighted factors)
      const daysSinceAccident = lastAccidentRes.data?.[0]?.incident_date
        ? Math.floor(
            (now.getTime() - new Date(lastAccidentRes.data[0].incident_date).getTime()) / 86400000
          )
        : 365;

      const inspectionPassRate =
        inspections.length > 0
          ? inspections.filter((i) => i.overall_result === 'pass').length / inspections.length
          : 1;

      const scoreBreakdown: SafetyScoreBreakdown[] = [
        {
          factor: 'Days since accident',
          score: Math.min(Math.round((daysSinceAccident / 90) * 25), 25),
          maxScore: 25,
          status: daysSinceAccident >= 90 ? 'good' : daysSinceAccident >= 30 ? 'warning' : 'critical',
        },
        {
          factor: 'Near-miss follow-up',
          score: Math.round((nearMissFollowUpRate / 100) * 20),
          maxScore: 20,
          status: nearMissFollowUpRate >= 80 ? 'good' : nearMissFollowUpRate >= 50 ? 'warning' : 'critical',
        },
        {
          factor: 'Inspection pass rate',
          score: Math.round(inspectionPassRate * 20),
          maxScore: 20,
          status: inspectionPassRate >= 0.8 ? 'good' : inspectionPassRate >= 0.5 ? 'warning' : 'critical',
        },
        {
          factor: 'Equipment compliance',
          score: (equipmentOverdueRes.count ?? 0) === 0 ? 15 : Math.max(0, 15 - (equipmentOverdueRes.count ?? 0) * 5),
          maxScore: 15,
          status: (equipmentOverdueRes.count ?? 0) === 0 ? 'good' : (equipmentOverdueRes.count ?? 0) <= 2 ? 'warning' : 'critical',
        },
        {
          factor: 'COSHH compliance',
          score: (coshhOverdueRes.count ?? 0) === 0 ? 10 : Math.max(0, 10 - (coshhOverdueRes.count ?? 0) * 3),
          maxScore: 10,
          status: (coshhOverdueRes.count ?? 0) === 0 ? 'good' : (coshhOverdueRes.count ?? 0) <= 2 ? 'warning' : 'critical',
        },
        {
          factor: 'Permit compliance',
          score: (permitsRes.count ?? 0) > 0 ? 10 : 5,
          maxScore: 10,
          status: (permitsRes.count ?? 0) > 0 ? 'good' : 'warning',
        },
      ];

      return {
        nearMissWeekly,
        inspectionResults,
        toolUsage,
        accidentSeverity,
        nearMissFollowUpRate,
        weekOverWeekChange,
        scoreBreakdown,
      };
    },
    staleTime: 120_000,
  });
}
