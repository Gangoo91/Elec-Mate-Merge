/**
 * A learner's own history for one mock exam paper.
 *
 * Reads back what recordMockExamAttempt writes. Until the in-app papers
 * started logging attempts there was nothing to read, so every sitting began
 * from a blank screen with no sense of whether you were improving — the single
 * most useful thing a revision tool can tell you.
 *
 * Own rows only: the SELECT policy on seo_mock_attempts is
 * `user_id = auth.uid()`, so the anonymous public-exam rows are never visible
 * here and a signed-out learner simply gets an empty history.
 */
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface MockExamHistory {
  attempts: number;
  /** Highest percentage scored on this paper. */
  best: number | null;
  /** Most recent percentage. */
  last: number | null;
  /** Whether the most recent attempt was a pass. */
  lastPassed: boolean | null;
  loading: boolean;
}

const EMPTY: MockExamHistory = {
  attempts: 0,
  best: null,
  last: null,
  lastPassed: null,
  loading: false,
};

export function useMockExamHistory(examSlug: string, userId: string | null): MockExamHistory {
  const [state, setState] = useState<MockExamHistory>({ ...EMPTY, loading: Boolean(userId) });

  useEffect(() => {
    if (!userId || !examSlug) {
      setState(EMPTY);
      return;
    }
    let cancelled = false;
    setState((s) => ({ ...s, loading: true }));

    void (async () => {
      // `source`/`user_id` post-date the generated Supabase types, so the
      // query builder can't see them. Cast at the boundary; drop when types
      // are regenerated. See src/lib/mockExamTelemetry.ts for the writer.
      const { data, error } = await (
        supabase.from('seo_mock_attempts') as unknown as {
          select: (cols: string) => {
            eq: (
              c: string,
              v: string
            ) => {
              eq: (
                c: string,
                v: string
              ) => {
                order: (
                  c: string,
                  o: { ascending: boolean }
                ) => {
                  limit: (
                    n: number
                  ) => Promise<{
                    data: { percentage: number; passed: boolean }[] | null;
                    error: unknown;
                  }>;
                };
              };
            };
          };
        }
      )
        .select('percentage,passed,created_at')
        .eq('user_id', userId)
        .eq('exam_slug', examSlug)
        .order('created_at', { ascending: false })
        .limit(50);

      if (cancelled) return;
      if (error || !data || data.length === 0) {
        setState(EMPTY);
        return;
      }
      setState({
        attempts: data.length,
        best: Math.max(...data.map((r) => r.percentage)),
        last: data[0].percentage,
        lastPassed: data[0].passed,
        loading: false,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [examSlug, userId]);

  return state;
}
