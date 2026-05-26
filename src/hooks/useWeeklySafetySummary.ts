import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type HudsonLevel =
  | 'critical'
  | 'reactive'
  | 'calculative'
  | 'proactive'
  | 'generative';

export type ScoreCategory =
  | 'compliance'
  | 'activity'
  | 'proactive'
  | 'quality'
  | 'outcomes';

export interface ScoreDeduction {
  category: ScoreCategory;
  label: string;
  points: number;
  action: string;
}

export interface ScoreGain {
  category: ScoreCategory;
  label: string;
  points: number;
}

export interface ScoreRecommendation {
  label: string;
  pointGain: number;
  effort: 'low' | 'medium' | 'high';
  category: ScoreCategory;
}

export interface ScoreHardCap {
  reason: string;
  cap: number;
  deadline?: string;
}

export interface WeeklySummary {
  // New 5-dimension shape
  safetyScore: number;
  hudsonLevel: HudsonLevel;
  dimensions: {
    compliance: number;
    activity: number;
    proactive: number;
    quality: number;
    outcomes: number;
  };
  dimensionMax: {
    compliance: number;
    activity: number;
    proactive: number;
    quality: number;
    outcomes: number;
  };
  deductions: ScoreDeduction[];
  gains: ScoreGain[];
  recommendations: ScoreRecommendation[];
  hardCap: ScoreHardCap | null;
  trend: 'improving' | 'declining' | 'stable';
  trendDelta: number;
  previousScore: number;

  // Legacy fields kept for back-compat
  period: { start: string; end: string };
  nearMisses: { total: number; followedUp: number; open: number };
  inspections: { total: number; passed: number; failed: number; passRate: number };
  accidents: { total: number; riddorReportable: number };
  equipment: { overdue: number; dueSoon: number; total: number };
  coshh: { overdueReviews: number; upcomingReviews: number };
  permits: { active: number; expired: number };
  observations: { total: number; positive: number };
  highlights: string[];
  actionItems: string[];
}

export function useWeeklySafetySummary() {
  return useQuery({
    queryKey: ['weekly-safety-summary'],
    queryFn: async (): Promise<WeeklySummary> => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const res = await supabase.functions.invoke('weekly-safety-summary', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (res.error) throw res.error;
      return res.data as WeeklySummary;
    },
    staleTime: 300_000,
  });
}
