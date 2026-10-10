/**
 * useEvidenceAttempts — the attempt history of one piece of evidence (batch
 * 2, 10 Oct 2026). Every time it was sent for assessment, and every decision
 * that cited it, including decisions a later one has replaced: decisions are
 * append-only (superseded, never edited), so nothing here is reconstructed.
 *
 * Reads portfolio_submission_items / portfolio_submissions (when it was sent)
 * and portfolio_assessment_decisions (evidence_item_ids contains the item).
 * RLS: the learner reads their own; staff who can assess them read theirs.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AttemptDecision {
  id: string;
  unit_code: string;
  ac_code: string;
  decision: 'passed' | 'referred' | 'not_yet';
  feedback: string | null;
  assessor_name: string | null;
  decided_at: string;
  superseded_at: string | null;
  method: string | null;
  iqa_verdict: string | null;
  countersign_required: boolean | null;
  countersigned_at: string | null;
  countersigned_by_name: string | null;
}

/** One decision event: the criteria one assessor decided the same way at the same moment. */
export interface DecisionGroup {
  key: string;
  at: string;
  decision: AttemptDecision['decision'];
  assessor_name: string | null;
  feedback: string | null;
  criteria: string[];
  /** Every decision in the group has been replaced by a later one. */
  replaced: boolean;
  countersignPending: boolean;
  countersignedBy: string | null;
}

export interface Attempt {
  n: number;
  sentAt: string | null;
  decisions: DecisionGroup[];
  current: boolean;
}

function groupDecisions(rows: AttemptDecision[]): DecisionGroup[] {
  const groups = new Map<string, DecisionGroup>();
  for (const d of rows) {
    // Criteria decided together land within a second of each other.
    const k = `${d.assessor_name ?? ''}|${d.decision}|${d.decided_at.slice(0, 16)}|${d.feedback ?? ''}`;
    const g = groups.get(k);
    const pending = !!d.countersign_required && !d.countersigned_at && !d.superseded_at;
    if (g) {
      g.criteria.push(`${d.unit_code} AC ${d.ac_code}`);
      g.replaced = g.replaced && !!d.superseded_at;
      g.countersignPending = g.countersignPending || pending;
      g.countersignedBy = g.countersignedBy ?? d.countersigned_by_name;
    } else {
      groups.set(k, {
        key: d.id,
        at: d.decided_at,
        decision: d.decision,
        assessor_name: d.assessor_name,
        feedback: d.feedback,
        criteria: [`${d.unit_code} AC ${d.ac_code}`],
        replaced: !!d.superseded_at,
        countersignPending: pending,
        countersignedBy: d.countersigned_at ? d.countersigned_by_name : null,
      });
    }
  }
  return [...groups.values()].sort((a, b) => a.at.localeCompare(b.at));
}

export function useEvidenceAttempts(
  learnerId: string | null | undefined,
  itemId: string | null | undefined
) {
  const [sends, setSends] = useState<string[]>([]);
  const [decisions, setDecisions] = useState<AttemptDecision[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!learnerId || !itemId) {
      setSends([]);
      setDecisions([]);
      return;
    }
    setLoading(true);
    const [links, decs] = await Promise.all([
      supabase
        .from('portfolio_submission_items' as never)
        .select('submission_id, added_at')
        .eq('portfolio_item_id', itemId)
        .limit(100),
      supabase
        .from('portfolio_assessment_decisions' as never)
        .select(
          'id, unit_code, ac_code, decision, feedback, assessor_name, decided_at, superseded_at, method, iqa_verdict, countersign_required, countersigned_at, countersigned_by_name'
        )
        .eq('learner_id', learnerId)
        .contains('evidence_item_ids', [itemId] as never)
        .order('decided_at', { ascending: true })
        .limit(300),
    ]);
    const subIds = (
      (links.data ?? []) as unknown as { submission_id: string; added_at: string | null }[]
    ).map((l) => l.submission_id);
    let sentTimes: string[] = [];
    if (subIds.length) {
      const { data } = await supabase
        .from('portfolio_submissions')
        .select('id, submitted_at, created_at')
        .in('id', subIds);
      sentTimes = ((data ?? []) as { submitted_at: string | null; created_at: string }[])
        .map((s) => s.submitted_at ?? s.created_at)
        .filter(Boolean)
        .sort();
    }
    setSends(sentTimes);
    setDecisions(((decs.data ?? []) as unknown as AttemptDecision[]) ?? []);
    setLoading(false);
  }, [learnerId, itemId]);

  useEffect(() => {
    void load();
  }, [load]);

  const attempts = useMemo<Attempt[]>(() => {
    const groups = groupDecisions(decisions);
    if (sends.length === 0) {
      return groups.length ? [{ n: 1, sentAt: null, decisions: groups, current: true }] : [];
    }
    const out: Attempt[] = sends.map((at, i) => ({
      n: i + 1,
      sentAt: at,
      decisions: [],
      current: i === sends.length - 1,
    }));
    for (const g of groups) {
      // The attempt a decision answers: the last send before it (or the first).
      let idx = 0;
      for (let i = 0; i < sends.length; i++) if (sends[i] <= g.at) idx = i;
      out[idx].decisions.push(g);
    }
    return out;
  }, [sends, decisions]);

  return {
    attempts,
    loading,
    refresh: load,
    hasHistory: attempts.length > 1 || decisions.some((d) => !!d.superseded_at),
  };
}
