import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useMemo } from 'react';

/**
 * Expense-claim breakdowns for Reports.
 *
 * Money totals (invoiced, cash in, outstanding, costs, gross profit, margin,
 * per-job profitability) are NOT computed here any more — they come from the
 * shared finance model (src/hooks/useFinanceModel.ts →
 * get_finance_summary / get_finance_monthly / get_job_finance). The old
 * client-side profitability returned £0 for any firm without job_financials
 * rows and counted drafts as revenue (ELE-1992).
 */

export interface ExpenseCategorySummary {
  category: string;
  total: number;
  count: number;
  percentage: number;
}

export interface ExpensePipeline {
  pendingCount: number;
  pendingAmount: number;
  approvedUnpaid: number;
}

interface ExpenseRow {
  id: string;
  amount: number | null;
  category: string | null;
  status: string | null;
  submitted_date: string | null;
}

function useExpenseClaims() {
  return useQuery({
    queryKey: ['finance-reports', 'expenses'],
    queryFn: async (): Promise<ExpenseRow[]> => {
      const { data, error } = await supabase
        .from('employer_expense_claims')
        .select('id, amount, category, status, submitted_date')
        .order('submitted_date', { ascending: false });
      if (error) throw error;
      return (data || []) as ExpenseRow[];
    },
  });
}

/** Approved and paid claims by category — the same claims the P&L counts. */
export function useExpensesByCategory(from: string | null, to: string | null) {
  const { data: expenses = [], isLoading, error } = useExpenseClaims();

  const categories = useMemo((): ExpenseCategorySummary[] => {
    const map: Record<string, { total: number; count: number }> = {};
    let grand = 0;
    expenses
      .filter((e) => ['approved', 'paid'].includes((e.status || '').toLowerCase()))
      .filter((e) => {
        const d = (e.submitted_date || '').slice(0, 10);
        return (!from || d >= from) && (!to || d <= to);
      })
      .forEach((e) => {
        const amount = Number(e.amount || 0);
        const cat = e.category || 'Other';
        grand += amount;
        map[cat] = map[cat] || { total: 0, count: 0 };
        map[cat].total += amount;
        map[cat].count += 1;
      });
    return Object.entries(map)
      .map(([category, v]) => ({
        category,
        total: v.total,
        count: v.count,
        percentage: grand > 0 ? (v.total / grand) * 100 : 0,
      }))
      .sort((a, b) => b.total - a.total);
  }, [expenses, from, to]);

  return { data: categories, isLoading, error };
}

/** Claims waiting on a decision or a payment (not costs yet / not paid yet). */
export function useExpensePipeline() {
  const { data: expenses = [], isLoading, error } = useExpenseClaims();
  const data = useMemo((): ExpensePipeline => {
    const pending = expenses.filter((e) => (e.status || '').toLowerCase() === 'pending');
    return {
      pendingCount: pending.length,
      pendingAmount: pending.reduce((s, e) => s + Number(e.amount || 0), 0),
      approvedUnpaid: expenses
        .filter((e) => (e.status || '').toLowerCase() === 'approved')
        .reduce((s, e) => s + Number(e.amount || 0), 0),
    };
  }, [expenses]);
  return { data, isLoading, error };
}
