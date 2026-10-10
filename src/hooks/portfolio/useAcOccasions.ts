/**
 * useAcOccasions — how many separate assessed occasions each criterion has,
 * against the number its qualification needs (get_portfolio_ac_occasions).
 *
 * City & Guilds 5357-03 performance units must be "assessed on a minimum of
 * two occasions" (handbook v2.8, p.14). The rule is data
 * (qualification_occasion_rules); a criterion with no rule needs one.
 *
 * An occasion is a distinct day of work behind an assessor's pass for that
 * criterion (current or since replaced, not one the IQA rejected). Two items
 * from the same day are one occasion.
 *
 * This is a separate read. It never changes the per-criterion state from
 * get_portfolio_ac_state, or any "every criterion passed" figure.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { AcState, AcStateRow } from '@/hooks/portfolio/usePortfolioAcState';

export interface AcOccasionRow {
  unit_code: string;
  ac_code: string;
  required: number;
  occasions: number;
  occasion_days: string[];
  item_ids: string[];
  rule_ref: string | null;
  rule_note: string | null;
}

/** red = nothing yet, amber = under way or 1 of 2, green = met. */
export type OccasionTone = 'none' | 'partial' | 'met';

export const occasionKey = (unit: string, ac: string) => `${unit}|${ac}`;

const PASSED = new Set<AcState>(['passed', 'iqa_confirmed']);
const NOTHING = new Set<AcState>(['not_started', 'suggested']);

/**
 * The one colour rule for the gap grid. Green only when the criterion is
 * passed now AND has the occasions it needs; a suggestion is not evidence.
 */
export function occasionTone(state: AcState, occ?: AcOccasionRow | null): OccasionTone {
  const required = occ?.required ?? 1;
  const held = occ?.occasions ?? 0;
  // A one-occasion criterion is met by its pass alone.
  if (PASSED.has(state) && (required <= 1 || held >= required)) return 'met';
  if (NOTHING.has(state) && held === 0) return 'none';
  return 'partial';
}

/** Solid marks: no translucent yellow anywhere. */
export const TONE_MARK: Record<OccasionTone, string> = {
  none: 'bg-red-500',
  partial: 'bg-amber-400',
  met: 'bg-emerald-500',
};

export const TONE_LABEL: Record<OccasionTone, string> = {
  none: 'Nothing yet',
  partial: 'Under way',
  met: 'Met',
};

/** "1 of 2" where the rule needs more than one occasion; null otherwise. */
export function occasionCounter(occ?: AcOccasionRow | null): string | null {
  if (!occ || occ.required <= 1) return null;
  return `${Math.min(occ.occasions, occ.required)} of ${occ.required}`;
}

type Rpc = (
  fn: string,
  params: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;
const rpc = supabase.rpc.bind(supabase) as unknown as Rpc;

/**
 * @param refreshKey anything that changes when decisions change (pass the
 *        usePortfolioAcState rows array: it updates live on every decision).
 */
export function useAcOccasions(learnerId: string | null | undefined, refreshKey?: unknown) {
  const [rows, setRows] = useState<AcOccasionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const seq = useRef(0);

  const load = useCallback(async () => {
    const mine = ++seq.current;
    if (!learnerId) {
      setRows([]);
      setLoading(false);
      return;
    }
    const { data, error: e } = await rpc('get_portfolio_ac_occasions', { p_user_id: learnerId });
    if (mine !== seq.current) return;
    setLoading(false);
    if (e) {
      setError(e.message);
      return;
    }
    setError(null);
    setRows((data as AcOccasionRow[]) ?? []);
  }, [learnerId]);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  const byKey = useMemo(() => {
    const m = new Map<string, AcOccasionRow>();
    for (const r of rows) m.set(occasionKey(r.unit_code, r.ac_code), r);
    return m;
  }, [rows]);

  /** Items an assessor has passed (the database locks these against edits). */
  const assessedItemIds = useMemo(() => {
    const s = new Set<string>();
    for (const r of rows) for (const id of r.item_ids ?? []) s.add(id);
    return s;
  }, [rows]);

  return { rows, byKey, assessedItemIds, loading, error, refresh: load };
}

export type AcOccasions = ReturnType<typeof useAcOccasions>;

/**
 * The separate readiness check (never folded into "every criterion passed"):
 * criteria whose rule needs more than one occasion, and how many have them.
 */
export function occasionsCheck(acRows: AcStateRow[], byKey: Map<string, AcOccasionRow>) {
  let needing = 0;
  let met = 0;
  for (const r of acRows) {
    const o = byKey.get(occasionKey(r.unit_code, r.ac_code));
    if (!o || o.required <= 1) continue;
    needing += 1;
    if (o.occasions >= o.required) met += 1;
  }
  return { needing, met, short: needing - met };
}
