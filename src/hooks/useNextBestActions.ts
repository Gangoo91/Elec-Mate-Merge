/**
 * useNextBestActions — "what should I do next", straight from the ranked engine.
 *
 * The card in the app and the learning push are the same decision rendered
 * twice, so both read `get_next_best_actions`. Building the ranking here as
 * well would guarantee the push and the screen eventually disagreed about what
 * the learner should do — which is worse than either being slightly wrong.
 *
 * The engine returns candidates already ordered. The top one is the answer; the
 * rest exist so the card can offer an alternative without a second round trip.
 */

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/** The kinds the engine can return. Kept in step with the SQL function. */
export type NextActionKind =
  | 'finish_section'
  | 'mock_followup'
  | 'streak_risk'
  | 'weak_topic'
  | 'resume'
  | 'daily_goal'
  | 'xp_rival'
  | 'first_step';

export interface NextAction {
  kind: NextActionKind;
  /** 0–100, already adjusted for staleness and how recently we nudged this. */
  score: number;
  /** The action, phrased as the thing to do. */
  title: string;
  /** Why we are suggesting it. This is the part that earns the tap. */
  reason: string;
  route: string;
  payload: Record<string, unknown>;
}

export function useNextBestActions(limit = 4) {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: ['next-best-actions', user?.id, limit],
    enabled: !!user?.id,
    // Recomputing on every focus would make the card change under the
    // learner's thumb. An hour is well inside the cadence of the signals.
    staleTime: 60 * 60 * 1000,
    queryFn: async (): Promise<NextAction[]> => {
      // Cast because `src/integrations/supabase/types.ts` is generated and does
      // not know this function yet. Regenerating it is a 30,000-line diff for
      // one signature; the repo already takes this route for the same reason.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any).rpc('get_next_best_actions', {
        p_user_id: user!.id,
        p_limit: limit,
      });
      if (error) throw error;
      return ((data ?? []) as NextAction[]).map((row) => ({
        ...row,
        score: Number(row.score),
        payload: (row.payload ?? {}) as Record<string, unknown>,
      }));
    },
  });

  const actions = query.data ?? [];

  return {
    /** The single most useful thing this learner could do right now. */
    top: actions[0] ?? null,
    /** The runners-up, so the card can offer a way out without another query. */
    alternatives: actions.slice(1),
    actions,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

export default useNextBestActions;
