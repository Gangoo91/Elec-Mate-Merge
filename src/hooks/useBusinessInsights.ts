/**
 * The extra data the Business Hub's insights panel needs beyond quotes and
 * invoices — money going OUT, and hours worked.
 *
 * Insights used to be built from quotes and invoices alone, so it could show
 * revenue but never profit, and it could show what a job was billed at but
 * never what it earned per hour. Those are the two numbers a sole trader
 * actually runs the business on.
 *
 * Note `sole_trader_expenses` has no expense_date column — `created_at` is the
 * only date on the row, so that is what buckets it.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ExpenseRow {
  amount: number;
  category: string | null;
  at: Date;
}

export interface HoursRow {
  seconds: number;
  rate: number | null;
  at: Date;
}

export interface BusinessInsightsData {
  expenses: ExpenseRow[];
  hours: HoursRow[];
  isLoading: boolean;
}

export function useBusinessInsights(): BusinessInsightsData {
  const { data: expenses = [], isLoading: expensesLoading } = useQuery({
    queryKey: ['business-insights', 'expenses'],
    queryFn: async (): Promise<ExpenseRow[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];
      const { data, error } = await supabase
        .from('sole_trader_expenses')
        .select('amount, category, created_at')
        .eq('user_id', user.id);
      if (error) throw error;
      return (data ?? []).map((r) => ({
        amount: Number(r.amount) || 0,
        category: r.category,
        at: new Date(r.created_at),
      }));
    },
    staleTime: 60_000,
  });

  const { data: hours = [], isLoading: hoursLoading } = useQuery({
    queryKey: ['business-insights', 'hours'],
    queryFn: async (): Promise<HoursRow[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];
      // Only completed sessions carry a duration; a running timer has none.
      const { data, error } = await supabase
        .from('time_sessions')
        .select('duration_seconds, hourly_rate, started_at')
        .eq('user_id', user.id)
        .not('duration_seconds', 'is', null);
      if (error) throw error;
      return (data ?? []).map((r) => ({
        seconds: Number(r.duration_seconds) || 0,
        rate: r.hourly_rate == null ? null : Number(r.hourly_rate),
        at: new Date(r.started_at),
      }));
    },
    staleTime: 60_000,
  });

  return { expenses, hours, isLoading: expensesLoading || hoursLoading };
}
