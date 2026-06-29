import { useState, useEffect, useMemo, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  computeProjectFinancials,
  type ProjectFinancials,
} from '@/utils/projectFinancials';

/**
 * Batched financials for a set of completed projects.
 *
 * Pulls expenses / invoices / quotes in three user-scoped, project-id-batched
 * queries (one `.in(...)` each, not per-project), then folds each project's
 * primitives through `computeProjectFinancials` — the single source of truth —
 * so every figure (revenue, materials, profit, margin) matches the project
 * detail hero and pipeline cards exactly.
 *
 * Time is intentionally omitted (totalSeconds: 0); a sole trader's own labour
 * isn't a cash cost, so it doesn't change profit — only effectiveHourly, which
 * the completed-projects view doesn't surface.
 */

export interface CompletedFinancialsTotals {
  /** Σ revenue across the completed projects (value delivered). */
  revenue: number;
  /** Σ materials/expenses logged (spend). */
  spend: number;
  /** Σ grossProfit (revenue − materials). */
  profit: number;
  /** How many projects are in the set. */
  count: number;
}

interface SumRow {
  project_id: string | null;
  value: number;
}

const EMPTY_TOTALS: CompletedFinancialsTotals = {
  revenue: 0,
  spend: 0,
  profit: 0,
  count: 0,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const s = () => supabase as any;

/** Sum a column per project_id, scoped to the current user + the given ids. */
async function sumPerProject(
  table: string,
  amountCol: string,
  userId: string,
  ids: string[],
  extra?: (q: ReturnType<typeof s>) => ReturnType<typeof s>
): Promise<Map<string, number>> {
  let query = s()
    .from(table)
    .select(`project_id, ${amountCol}`)
    .eq('user_id', userId)
    .in('project_id', ids);
  if (extra) query = extra(query);

  const { data, error } = await query;
  if (error) throw error;

  const map = new Map<string, number>();
  for (const row of (data || []) as SumRow[]) {
    const pid = row.project_id;
    if (!pid) continue;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const amount = Number((row as any)[amountCol]) || 0;
    map.set(pid, (map.get(pid) || 0) + amount);
  }
  return map;
}

export function useCompletedProjectsFinancials(
  projectIds: string[],
  estimatedValues: Record<string, number | undefined>
) {
  const [byProject, setByProject] = useState<Map<string, ProjectFinancials>>(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const reqRef = useRef(0);

  // Stable key so we only refetch when the actual id set changes, not on every
  // render (the parent passes a fresh array each time).
  const idsKey = useMemo(() => [...projectIds].sort().join(','), [projectIds]);

  useEffect(() => {
    const ids = idsKey ? idsKey.split(',') : [];
    const reqId = ++reqRef.current;

    // Guard empty — don't query with an empty .in(), just clear.
    if (ids.length === 0) {
      setByProject(new Map());
      setIsLoading(false);
      return;
    }

    const run = async () => {
      setIsLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          if (reqRef.current === reqId) setByProject(new Map());
          return;
        }

        const [expenses, invoices, quotes] = await Promise.all([
          sumPerProject('sole_trader_expenses', 'amount', user.id, ids),
          sumPerProject('invoices', 'total', user.id, ids),
          // Match the project-detail rule: only quotes not yet raised as
          // invoices count toward the revenue fallback (avoid double-count).
          sumPerProject('quotes', 'total', user.id, ids, (q) =>
            q.eq('invoice_raised', false)
          ),
        ]);

        if (reqRef.current !== reqId) return; // stale response, drop it

        const next = new Map<string, ProjectFinancials>();
        for (const id of ids) {
          next.set(
            id,
            computeProjectFinancials({
              invoiceTotal: invoices.get(id) || 0,
              quoteTotal: quotes.get(id) || 0,
              estimatedValue: estimatedValues[id] ?? null,
              expenses: expenses.get(id) || 0,
              totalSeconds: 0,
            })
          );
        }
        setByProject(next);
      } catch (err) {
        console.error('Failed to load completed-project financials:', err);
        if (reqRef.current === reqId) setByProject(new Map());
      } finally {
        if (reqRef.current === reqId) setIsLoading(false);
      }
    };

    run();
    // estimatedValues is read inside but keyed by id; idsKey covers the set.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  const totals = useMemo<CompletedFinancialsTotals>(() => {
    if (byProject.size === 0) return EMPTY_TOTALS;
    let revenue = 0;
    let spend = 0;
    let profit = 0;
    for (const fin of byProject.values()) {
      revenue += fin.revenue;
      spend += fin.materials;
      profit += fin.grossProfit;
    }
    return { revenue, spend, profit, count: byProject.size };
  }, [byProject]);

  return { byProject, totals, isLoading };
}
