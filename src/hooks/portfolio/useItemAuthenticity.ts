/**
 * useItemAuthenticity — the assessor's authenticity countersign per evidence
 * item (10 Oct 2026). C&G record forms need the learner AND the assessor to
 * confirm the work is the learner's own. The learner signs when they submit;
 * the assessor confirms "I am satisfied this is the apprentice's own work"
 * when they assess an item (AcDecisionSheet), through
 * confirm_evidence_authenticity. Each row keeps the item's content_hash at
 * that moment, so a later change to the item shows.
 *
 * Read by the learner (own rows) and anyone who can assess them (RLS).
 */
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PORTFOLIO_CHANGED_EVENT } from '@/hooks/portfolio/usePortfolio';

export interface ItemAuthenticity {
  id: string;
  portfolio_item_id: string | null;
  assessor_id: string;
  assessor_name: string | null;
  statement: string;
  item_content_hash: string | null;
  confirmed_at: string;
}

/** Latest confirmation per item, newest first. */
export function useItemAuthenticity(learnerId: string | null | undefined, enabled = true) {
  const [byItem, setByItem] = useState<Map<string, ItemAuthenticity>>(new Map());
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!learnerId || !enabled) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('portfolio_item_authenticity' as never)
      .select(
        'id, portfolio_item_id, assessor_id, assessor_name, statement, item_content_hash, confirmed_at'
      )
      .eq('learner_id', learnerId)
      .order('confirmed_at', { ascending: false })
      .limit(1000);
    setLoading(false);
    if (error) return;
    const m = new Map<string, ItemAuthenticity>();
    for (const r of (data ?? []) as unknown as ItemAuthenticity[]) {
      if (r.portfolio_item_id && !m.has(r.portfolio_item_id)) m.set(r.portfolio_item_id, r);
    }
    setByItem(m);
  }, [learnerId, enabled]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const on = () => void load();
    window.addEventListener(PORTFOLIO_CHANGED_EVENT, on);
    return () => window.removeEventListener(PORTFOLIO_CHANGED_EVENT, on);
  }, [load]);

  return { byItem, loading, reload: load };
}

/** Records the assessor's confirmation on each item (idempotent per version). */
export async function confirmEvidenceAuthenticity(
  learnerId: string,
  itemIds: string[],
  submissionId?: string | null
): Promise<number> {
  if (!itemIds.length) return 0;
  const { data, error } = await supabase.rpc(
    'confirm_evidence_authenticity' as never,
    {
      p_learner: learnerId,
      p_item_ids: itemIds,
      p_submission_id: submissionId ?? null,
    } as never
  );
  if (error) throw new Error(error.message);
  return Number((data as { confirmed?: number } | null)?.confirmed ?? 0);
}
