/**
 * usePortfolioAcState — the one honest per-criterion state (ELE-1862).
 *
 * Reads get_portfolio_ac_state(): for every criterion of the learner's
 * resolved qualification, the state is one of
 *   not_started → claimed (cited on evidence) → submitted (in an open submission)
 *   → referred | not_yet | passed → iqa_confirmed
 * A decision always outranks a claim. Learner (self), college staff who can
 * assess them, and invited independent assessors can all call it.
 *
 * Also exposes recordDecisions (assessors) and setIqaVerdict (IQAs).
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type AcState =
  | 'not_started'
  | 'claimed'
  | 'submitted'
  | 'referred'
  | 'not_yet'
  | 'passed'
  | 'iqa_confirmed'
  | 'iqa_rejected';

export interface AcStateRow {
  unit_code: string;
  unit_title: string | null;
  lo_number: number | null;
  lo_text: string | null;
  ac_code: string;
  ac_text: string | null;
  state: AcState;
  evidence_item_ids: string[];
  decision_id: string | null;
  decision_feedback: string | null;
  decided_at: string | null;
  assessor_name: string | null;
  iqa_verdict: 'confirmed' | 'not_confirmed' | null;
  qualification_code: string;
  assessor_id: string | null;
  iqa_feedback: string | null;
  decision_method: string | null;
}

export interface UnitGroup {
  unit_code: string;
  unit_title: string;
  rows: AcStateRow[];
  counts: Record<AcState, number>;
  passed: number;
  total: number;
}

export const STATE_LABEL: Record<AcState, string> = {
  not_started: 'Not started',
  claimed: 'Evidence added',
  submitted: 'With assessor',
  referred: 'Needs more',
  not_yet: 'Not yet',
  passed: 'Passed',
  iqa_confirmed: 'IQA confirmed',
  iqa_rejected: 'IQA query',
};

/** Chip classes: solid where it matters, neutral otherwise. No translucent yellow. */
export const STATE_CHIP: Record<AcState, string> = {
  not_started: 'border-white/[0.14] bg-white/[0.04] text-white',
  claimed: 'border-white/[0.3] bg-white/[0.08] text-white',
  submitted: 'border-sky-400/40 bg-sky-500/[0.12] text-sky-200',
  referred: 'border-orange-500/40 bg-orange-500/10 text-orange-300',
  not_yet: 'border-orange-500/40 bg-orange-500/10 text-orange-300',
  passed: 'border-emerald-400/40 bg-emerald-500/[0.12] text-emerald-300',
  iqa_confirmed: 'border-emerald-300 bg-emerald-500 text-black',
  iqa_rejected: 'border-orange-500/40 bg-orange-500/10 text-orange-300',
};

const EMPTY_COUNTS = (): Record<AcState, number> => ({
  not_started: 0,
  claimed: 0,
  submitted: 0,
  referred: 0,
  not_yet: 0,
  passed: 0,
  iqa_confirmed: 0,
  iqa_rejected: 0,
});

type Rpc = (
  fn: string,
  params: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;
// Bound: a bare supabase.rpc loses `this` and throws "reading 'rest'".
const rpc = supabase.rpc.bind(supabase) as unknown as Rpc;

export function usePortfolioAcState(learnerId: string | null | undefined) {
  const [rows, setRows] = useState<AcStateRow[]>([]);
  // `loading` is the first load only; later reloads keep the list (and the
  // assessor's scroll position) on screen and set `refreshing` instead.
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const seq = useRef(0);
  const loaded = useRef(false);

  const load = useCallback(async () => {
    const mine = ++seq.current;
    if (!learnerId) {
      setRows([]);
      setLoading(false);
      return;
    }
    if (loaded.current) setRefreshing(true);
    else setLoading(true);
    const { data, error: e } = await rpc('get_portfolio_ac_state', { p_user_id: learnerId });
    if (mine !== seq.current) return; // a newer request (or learner) has superseded this one
    setLoading(false);
    setRefreshing(false);
    if (e) {
      setError(e.message);
      if (!loaded.current) setRows([]);
      return;
    }
    loaded.current = true;
    setError(null);
    setRows((data as AcStateRow[]) ?? []);
  }, [learnerId]);

  useEffect(() => {
    loaded.current = false;
    void load();
  }, [load]);

  const units = useMemo<UnitGroup[]>(() => {
    const map = new Map<string, UnitGroup>();
    for (const r of rows) {
      let g = map.get(r.unit_code);
      if (!g) {
        g = {
          unit_code: r.unit_code,
          unit_title: r.unit_title ?? `Unit ${r.unit_code}`,
          rows: [],
          counts: EMPTY_COUNTS(),
          passed: 0,
          total: 0,
        };
        map.set(r.unit_code, g);
      }
      g.rows.push(r);
      g.counts[r.state] += 1;
      g.total += 1;
      if (r.state === 'passed' || r.state === 'iqa_confirmed') g.passed += 1;
    }
    return [...map.values()];
  }, [rows]);

  const totals = useMemo(() => {
    const c = EMPTY_COUNTS();
    for (const r of rows) c[r.state] += 1;
    return { ...c, total: rows.length, passedAll: c.passed + c.iqa_confirmed };
  }, [rows]);

  const recordDecisions = useCallback(
    async (args: {
      criteria: { unit_code: string; ac_code: string }[];
      decision: 'passed' | 'referred' | 'not_yet';
      feedback?: string;
      evidenceItemIds?: string[];
      submissionId?: string | null;
      method?: string;
      feedbackSource?: 'assessor' | 'ai_draft_confirmed';
    }) => {
      if (!learnerId) throw new Error('No learner');
      const { error: e } = await rpc('record_ac_decisions', {
        p_learner_id: learnerId,
        p_criteria: args.criteria,
        p_decision: args.decision,
        p_feedback: args.feedback?.trim() || null,
        p_evidence_item_ids: args.evidenceItemIds ?? [],
        p_submission_id: args.submissionId ?? null,
        p_method: args.method ?? 'evidence_review',
        p_feedback_source: args.feedbackSource ?? 'assessor',
      });
      if (e) throw new Error(e.message);
      await load();
    },
    [learnerId, load]
  );

  const setIqaVerdict = useCallback(
    async (decisionId: string, verdict: 'confirmed' | 'not_confirmed', feedback?: string) => {
      const { error: e, count } = await supabase
        .from('portfolio_assessment_decisions' as never)
        .update({ iqa_verdict: verdict, iqa_feedback: feedback?.trim() || null } as never, {
          count: 'exact',
        })
        .eq('id', decisionId);
      if (e) throw new Error(e.message);
      if (!count) throw new Error('You are not an IQA for this learner.');
      await load();
    },
    [load]
  );

  return { rows, units, totals, loading, refreshing, error, refresh: load, recordDecisions, setIqaVerdict };
}
