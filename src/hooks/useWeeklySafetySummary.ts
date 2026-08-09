import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type HudsonLevel =
  | 'insufficient_data'
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

  /**
   * How many independent signals the score is built on.
   *
   * Compliance starts at 30 and Outcomes at 10 and both deduct, so an account
   * with no data at all scores 40 — which used to be published as "critical".
   * Coverage is what separates "no evidence" from "evidence of a problem".
   */
  coverage: {
    scored: number;
    total: number;
    minimum: number;
    missing: string[];
  };
  /** False → show coverage and a first action, never a band. */
  hasEnoughEvidence: boolean;
  /** Days the activity dimensions are measured over (90). */
  windowDays: number;
  /** The single thing to do next, or null when nothing is outstanding. */
  nextAction: { label: string; view: string | null } | null;

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
