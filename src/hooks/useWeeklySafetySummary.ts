import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface WeeklySummary {
  period: { start: string; end: string };
  nearMisses: { total: number; followedUp: number; open: number };
  inspections: { total: number; passed: number; failed: number; passRate: number };
  accidents: { total: number; riddorReportable: number };
  equipment: { overdue: number; dueSoon: number; total: number };
  coshh: { overdueReviews: number; upcomingReviews: number };
  permits: { active: number; expired: number };
  observations: { total: number; positive: number };
  safetyScore: number;
  trend: 'improving' | 'declining' | 'stable';
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
