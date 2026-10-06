import { supabase } from '@/integrations/supabase/client';
import { toFinanceSummary, type FinanceSummary } from '@/lib/financeDefinitions';

/**
 * Accounts for the Employer Hub — the P&L and the ledger.
 *
 * Both come from the shared finance model (src/lib/financeDefinitions.ts and
 * supabase/migrations/20261007140000_finance_model_core.sql), so Accounts,
 * Reports and Job financials report the same numbers for the same period:
 *
 * - P&L = get_finance_summary(from, to): invoiced, cash in, costs by type,
 *   gross profit (invoiced less costs) and margin.
 * - Ledger = get_employer_ledger(from, to): money in = invoices PAID in the
 *   period; money out = the same cost lines the P&L totals (labour as one line
 *   per worker). Its money out always equals the P&L's total costs.
 *
 * Labour (approved hours × rate, overtime per worker per day) is computed in
 * SQL with the same rule as payCalculations.ts, so job labour sums to firm
 * labour. Everything is scoped server-side through my_employer_scope().
 */

export interface LedgerEntry {
  entry_date: string;
  direction: 'in' | 'out';
  category: string;
  reference: string | null;
  counterparty: string | null;
  amount: number;
  source_id: string;
}

const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;

export async function getLedger(from: string | null, to: string | null): Promise<LedgerEntry[]> {
  const { data, error } = await rpc('get_employer_ledger', {
    // The ledger needs bounds; "all time" spans the whole book.
    p_from: from ?? '2000-01-01',
    p_to: to ?? '2100-12-31',
  });
  if (error) throw new Error(error.message);
  return ((data ?? []) as LedgerEntry[]).map((r) => ({ ...r, amount: Number(r.amount) || 0 }));
}

export async function getProfitAndLoss(
  from: string | null,
  to: string | null
): Promise<FinanceSummary> {
  const { data, error } = await rpc('get_finance_summary', { p_from: from, p_to: to });
  if (error) throw new Error(error.message);
  return toFinanceSummary(((data as Record<string, unknown>[] | null) ?? [])[0]);
}
