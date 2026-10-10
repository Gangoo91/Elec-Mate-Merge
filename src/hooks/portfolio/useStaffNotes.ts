/**
 * useStaffNotes — private assessor notes on evidence and criteria (batch 2,
 * 10 Oct 2026). portfolio_staff_notes: read by assessors, tutors, IQA and
 * EQA; never the learner or an employer (RLS, _can_read_staff_notes). Notes
 * are append-only: a correction is a new note.
 *
 * Mount it only on staff screens. For anyone else RLS returns nothing, so a
 * mistaken mount shows no notes rather than leaking them.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface StaffNote {
  id: string;
  learner_id: string;
  portfolio_item_ids: string[];
  /** 'UNIT:AC' */
  criteria: string[];
  decision_id: string | null;
  body: string;
  author_id: string;
  author_name: string | null;
  author_role: string | null;
  created_at: string;
}

export const staffNoteKey = (unit: string, ac: string) => `${unit}:${ac}`;

export function useStaffNotes(learnerId: string | null | undefined, enabled = true) {
  const [notes, setNotes] = useState<StaffNote[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!learnerId || !enabled) {
      setNotes([]);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('portfolio_staff_notes' as never)
      .select(
        'id, learner_id, portfolio_item_ids, criteria, decision_id, body, author_id, author_name, author_role, created_at'
      )
      .eq('learner_id', learnerId)
      .order('created_at', { ascending: false })
      .limit(500);
    setLoading(false);
    if (!error) setNotes((data ?? []) as unknown as StaffNote[]);
  }, [learnerId, enabled]);

  useEffect(() => {
    void load();
  }, [load]);

  const byCriterion = useMemo(() => {
    const m = new Map<string, StaffNote[]>();
    for (const n of notes) for (const k of n.criteria ?? []) m.set(k, [...(m.get(k) ?? []), n]);
    return m;
  }, [notes]);
  const byItem = useMemo(() => {
    const m = new Map<string, StaffNote[]>();
    for (const n of notes)
      for (const id of n.portfolio_item_ids ?? []) m.set(id, [...(m.get(id) ?? []), n]);
    return m;
  }, [notes]);

  const add = useCallback(
    async (args: {
      body: string;
      criteria?: string[];
      itemIds?: string[];
      decisionId?: string | null;
    }) => {
      if (!learnerId) throw new Error('No learner');
      const body = args.body.trim();
      if (!body) return;
      const { error } = await supabase.from('portfolio_staff_notes' as never).insert({
        learner_id: learnerId,
        body,
        criteria: args.criteria ?? [],
        portfolio_item_ids: args.itemIds ?? [],
        decision_id: args.decisionId ?? null,
      } as never);
      if (error) throw new Error(error.message);
      await load();
    },
    [learnerId, load]
  );

  return { notes, byCriterion, byItem, loading, add, refresh: load };
}
