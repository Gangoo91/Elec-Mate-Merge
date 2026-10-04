/**
 * What a learner was shown, and still gets wrong, on their recent sittings of
 * one paper (ELE-1808).
 *
 * Reads the question_ids / wrong_ids that mockExamTelemetry records on each
 * attempt. `missedIds` are questions got wrong and NOT got right on any later
 * sitting — answering one correctly takes it off the list.
 *
 * Fire-and-forget like the other exam hooks: until it loads, or if it fails,
 * both sets are empty and the paper is simply drawn without history.
 */
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const SITTINGS = 3;

export interface RecentPaperIds {
  recentIds: number[];
  missedIds: number[];
}

const EMPTY: RecentPaperIds = { recentIds: [], missedIds: [] };

/** Newest first. Exported for the check script. */
export function summariseAttempts(
  attempts: { question_ids: number[] | null; wrong_ids: number[] | null }[]
): RecentPaperIds {
  const recent = new Set<number>();
  const missed = new Set<number>();
  const rightSince = new Set<number>();
  for (const a of attempts) {
    const served = a.question_ids ?? [];
    const wrong = new Set(a.wrong_ids ?? []);
    served.forEach((id) => recent.add(id));
    wrong.forEach((id) => {
      if (!rightSince.has(id)) missed.add(id);
    });
    served.forEach((id) => {
      if (!wrong.has(id)) rightSince.add(id);
    });
  }
  return { recentIds: [...recent], missedIds: [...missed] };
}

export function useRecentPaperIds(examSlug: string, userId: string | null): RecentPaperIds {
  const [ids, setIds] = useState<RecentPaperIds>(EMPTY);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    void supabase
      .from('seo_mock_attempts')
      .select('question_ids,wrong_ids')
      .eq('exam_slug', examSlug)
      .eq('user_id', userId)
      .not('question_ids', 'is', null)
      .order('created_at', { ascending: false })
      .limit(SITTINGS)
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        setIds(summariseAttempts(data));
      });
    return () => {
      cancelled = true;
    };
  }, [examSlug, userId]);

  return ids;
}
