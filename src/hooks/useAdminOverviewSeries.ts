import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/** One row a day of the metric snapshots; store columns are null before 2026-08-03. */
export interface MetricDay {
  day: string;
  stripe_mrr: number | null;
  rc_mrr: number | null;
  stripe_paying: number | null;
  rc_paying: number | null;
  stripe_trialing: number | null;
  rc_trialing: number | null;
  stripe_churned_paid: number | null;
  rc_churned_paid: number | null;
}

export interface OverviewSeries {
  as_of: string;
  today_date: string;
  signups_daily: Array<{ d: string; n: number }>;
  dau_daily: Array<{ d: string; n: number }>;
  today: TodayUsage;
  /** Yesterday, 00:00 to 23:59 UK, same definitions — the comparison for today. */
  yesterday: TodayUsage;
  metric_daily: MetricDay[];
}

export interface TodayUsage {
    certs: number;
    quotes: number;
    invoices: number;
    mock_exams: number;
    mock_exam_people: number;
    ai_chats: number;
    rams: number;
    site_visits: number;
    study_minutes: number;
    learners: number;
    active_people: number;
    signups: number;
}

export const OVERVIEW_SERIES_KEY = ['admin-overview-series'];

/**
 * Everything on the overview that needs SQL and a UK clock, in one round trip:
 * signups and active people by day, today's usage from 00:00 UK, and the
 * daily metric snapshots the MRR line and sparklines are drawn from.
 */
export function useAdminOverviewSeries() {
  return useQuery<OverviewSeries>({
    queryKey: OVERVIEW_SERIES_KEY,
    queryFn: async () => {
      // The generated Supabase types are regenerated on a schedule and do not
      // know this function yet.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await supabase.rpc('admin_overview_series' as any);
      if (error) throw error;
      return data as unknown as OverviewSeries;
    },
    staleTime: 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
}
