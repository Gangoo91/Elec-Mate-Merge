/**
 * usePortfolioAcState — the one honest per-criterion state (ELE-1862).
 *
 * Reads get_portfolio_ac_state(): for every criterion of the learner's
 * resolved qualification, the state is one of
 *   not_started → suggested (AI only, not a claim) → claimed (learner or
 *   assessor tied evidence to it, ELE-1864) → submitted (in an open
 *   submission) → referred | not_yet | passed → iqa_confirmed
 * A decision always outranks a claim; a suggestion never counts as coverage. Learner (self), college staff who can
 * assess them, and invited independent assessors can all call it.
 *
 * Also exposes recordDecisions (assessors) and setIqaVerdict (IQAs).
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type AcState =
  | 'not_started'
  | 'suggested'
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
  /** Items the AI matched to this criterion that the learner has not claimed. */
  suggested_item_ids: string[];
  /** ELE-1926: 'ai_draft_confirmed' when the feedback began as an AI draft. */
  decision_feedback_source?: 'assessor' | 'ai_draft_confirmed' | null;
  /** ELE-1926: when the assessor confirmed that AI draft by recording the decision. */
  decision_feedback_confirmed_at?: string | null;
  /** ELE-1870: the assessor's qualifications as they stood when they decided. */
  assessor_qualifications?: string[] | null;
  /**
   * Batch 2 (10 Oct): a trainee assessor passed it and a qualified assessor
   * has not countersigned yet. The server reads it as 'submitted' (it does
   * not count); the screens say "Passed, awaiting countersignature".
   */
  countersign_pending?: boolean;
  /** Who countersigned a trainee's pass, and when (null when not needed). */
  countersigned_by_name?: string | null;
  countersigned_at?: string | null;
}

/** The words for a trainee pass that is waiting for a qualified assessor. */
export const COUNTERSIGN_PENDING_LABEL = 'Passed, awaiting countersignature';
/** Neutral, never green: it does not count yet. */
export const COUNTERSIGN_PENDING_CHIP =
  'border-dashed border-emerald-400/60 bg-transparent text-white';

/** The label a row should show: the countersign wait outranks the state's own word. */
export function acRowLabel(
  r: Pick<AcStateRow, 'state' | 'countersign_pending'>,
  labels: Record<AcState, string>
) {
  return r.countersign_pending ? COUNTERSIGN_PENDING_LABEL : labels[r.state];
}
export function acRowChip(r: Pick<AcStateRow, 'state' | 'countersign_pending'>) {
  return r.countersign_pending ? COUNTERSIGN_PENDING_CHIP : STATE_CHIP[r.state];
}

/**
 * ELE-1926: the provenance line shown wherever AI-drafted feedback is read
 * ("Drafted with AI, confirmed by Owen Price on 8 Oct 2026"). Null when the
 * feedback is the assessor's own words.
 */
export function aiProvenanceLine(
  source: string | null | undefined,
  name: string | null | undefined,
  at: string | null | undefined
): string | null {
  if (source !== 'ai_draft_confirmed') return null;
  const day = at
    ? new Date(at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : null;
  return `Drafted with AI, confirmed by ${name || 'the assessor'}${day ? ` on ${day}` : ''}`;
}

export interface UnitGroup {
  unit_code: string;
  unit_title: string;
  rows: AcStateRow[];
  counts: Record<AcState, number>;
  passed: number;
  total: number;
}

/** The six-state legend (ELE-1862), worded for anyone reading the record. */
export const STATE_LABEL: Record<AcState, string> = {
  not_started: 'Not started',
  suggested: 'Suggested (AI)',
  claimed: 'Claimed',
  submitted: 'Submitted',
  referred: 'Needs more',
  not_yet: 'Not yet',
  passed: 'Passed',
  iqa_confirmed: 'IQA confirmed',
  iqa_rejected: 'IQA query',
};

/** The same legend from the learner's side ("Claimed by you"). */
export const LEARNER_STATE_LABEL: Record<AcState, string> = {
  ...STATE_LABEL,
  claimed: 'Claimed by you',
  submitted: 'With your assessor',
};

/** Solid swatch per state, for bars and legends. */
export const STATE_SWATCH: Record<AcState, string> = {
  not_started: 'bg-white/[0.12]',
  suggested: 'bg-white/[0.3]',
  claimed: 'bg-white/[0.7]',
  submitted: 'bg-sky-400',
  referred: 'bg-orange-400',
  not_yet: 'bg-orange-400',
  passed: 'bg-emerald-400',
  iqa_confirmed: 'bg-emerald-300',
  iqa_rejected: 'bg-orange-400',
};

/** Chip classes: solid where it matters, neutral otherwise. No translucent yellow. */
export const STATE_CHIP: Record<AcState, string> = {
  not_started: 'border-white/[0.14] bg-white/[0.04] text-white',
  suggested: 'border-dashed border-white/[0.3] bg-transparent text-white',
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
  suggested: 0,
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
// A fresh channel name per mount: re-using one throws when callbacks are added after subscribe.
let acChannelSeq = 0;

/*
 * ELE-1912: Student 360 mounts this hook from four sections at once, and each
 * asked the server for the same learner's criteria at the same moment (4 ×
 * 240 KB). Calls for the same learner that overlap now share one request.
 * Nothing is cached: a call made after the last one finished goes to the
 * server, so a reload after a decision still reads fresh rows.
 */
const inflight = new Map<string, ReturnType<Rpc>>();
function fetchAcState(learnerId: string): ReturnType<Rpc> {
  const running = inflight.get(learnerId);
  if (running) return running;
  // A Supabase query builder is thenable but has no .finally(): wrap it.
  const p = Promise.all([
    rpc('get_portfolio_ac_state', { p_user_id: learnerId }),
    countersignInfo(learnerId),
  ])
    .then(([res, cs]) => {
      if (res.error || !Array.isArray(res.data) || cs.size === 0) return res;
      const rows = (res.data as AcStateRow[]).map((r) => {
        const c = r.decision_id ? cs.get(r.decision_id) : undefined;
        return c
          ? {
              ...r,
              countersign_pending: !c.countersigned_at,
              countersigned_by_name: c.countersigned_by_name,
              countersigned_at: c.countersigned_at,
            }
          : r;
      });
      return { data: rows, error: null };
    })
    .finally(() => {
      inflight.delete(learnerId);
    }) as ReturnType<Rpc>;
  inflight.set(learnerId, p);
  return p;
}

/**
 * Current trainee passes for this learner, keyed by decision id: waiting for
 * a countersignature, or countersigned (by whom, when). RLS: the learner and
 * anyone who can assess them. A failure here never hides the criteria.
 */
async function countersignInfo(
  learnerId: string
): Promise<Map<string, { countersigned_at: string | null; countersigned_by_name: string | null }>> {
  const { data, error } = await supabase
    .from('portfolio_assessment_decisions' as never)
    .select('id, countersigned_at, countersigned_by_name')
    .eq('learner_id', learnerId)
    .eq('countersign_required' as never, true as never)
    .is('superseded_at', null)
    .limit(1000);
  const m = new Map<
    string,
    { countersigned_at: string | null; countersigned_by_name: string | null }
  >();
  if (error) return m;
  for (const r of (data ?? []) as unknown as {
    id: string;
    countersigned_at: string | null;
    countersigned_by_name: string | null;
  }[]) {
    m.set(r.id, {
      countersigned_at: r.countersigned_at,
      countersigned_by_name: r.countersigned_by_name,
    });
  }
  return m;
}

/** Countersign trainee passes (countersign_decisions). Returns how many were signed. */
export async function countersignDecisions(decisionIds: string[], note?: string): Promise<number> {
  if (decisionIds.length === 0) return 0;
  const { data, error } = await rpc('countersign_decisions', {
    p_decision_ids: decisionIds,
    p_note: note?.trim() || null,
  });
  if (error) throw new Error(error.message);
  window.dispatchEvent(new Event('elecmate:portfolio-changed'));
  return Number((data as { countersigned?: number } | null)?.countersigned ?? 0);
}

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
      setError(null);
      setLoading(false);
      return;
    }
    if (loaded.current) setRefreshing(true);
    else setLoading(true);
    const { data, error: e } = await fetchAcState(learnerId);
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

  // ELE-1868: a decision lands on every open screen within seconds, not on the
  // next refresh. RLS limits the stream to the learner and staff who can assess.
  useEffect(() => {
    if (!learnerId) return;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const channel = supabase
      .channel(`ac-decisions-${learnerId}-${++acChannelSeq}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'portfolio_assessment_decisions',
          filter: `learner_id=eq.${learnerId}`,
        },
        () => {
          // A multi-criteria decision is one insert per criterion: settle, then read once.
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            timer = null;
            void load();
          }, 400);
        }
      )
      .subscribe();
    return () => {
      if (timer) clearTimeout(timer);
      void supabase.removeChannel(channel);
    };
  }, [learnerId, load]);

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
      // A pass can close assessment-plan items and change other portfolio
      // views: tell them now rather than on the next window focus.
      window.dispatchEvent(new Event('elecmate:portfolio-changed')); // PORTFOLIO_CHANGED_EVENT (usePortfolio.ts; literal avoids an import cycle)
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

  return {
    rows,
    units,
    totals,
    loading,
    refreshing,
    error,
    refresh: load,
    recordDecisions,
    setIqaVerdict,
  };
}
