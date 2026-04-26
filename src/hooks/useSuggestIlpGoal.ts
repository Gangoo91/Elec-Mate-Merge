import { useCallback, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { GoalCategory, GoalPriority } from '@/hooks/useStudentIlp';

/* ==========================================================================
   useSuggestIlpGoal — calls ai-suggest-ilp-goal in any of three modes:
     fresh   → 2-3 proposals from cross-hub data
     refine  → rewrite a tutor's rough draft as a SMART goal
     from_ac → goal mapped to a specific weak AC
   ========================================================================== */

export type SuggestMode = 'fresh' | 'refine' | 'from_ac';

export interface IlpGoalProposal {
  title: string;
  description: string;
  acceptance_criteria?: string;
  target_date?: string;
  category: GoalCategory;
  priority: GoalPriority;
  ac_link?: string;
  rationale?: string;
}

export interface SuggestMeta {
  role: string | null;
  staff_name: string | null;
  mode: SuggestMode;
  weak_units_count: number;
  partial_observations_count: number;
}

export interface UseSuggestIlpGoal {
  status: 'idle' | 'loading' | 'done' | 'error';
  proposals: IlpGoalProposal[];
  meta: SuggestMeta | null;
  error: string | null;
  suggest: (input: {
    collegeStudentId: string;
    mode: SuggestMode;
    draft?: string;
    ac_code?: string;
    unit_code?: string;
    count?: number;
  }) => Promise<void>;
  reset: () => void;
}

export function useSuggestIlpGoal(): UseSuggestIlpGoal {
  const [status, setStatus] = useState<UseSuggestIlpGoal['status']>('idle');
  const [proposals, setProposals] = useState<IlpGoalProposal[]>([]);
  const [meta, setMeta] = useState<SuggestMeta | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setStatus('idle');
    setProposals([]);
    setMeta(null);
    setError(null);
  }, []);

  const suggest = useCallback<UseSuggestIlpGoal['suggest']>(async (input) => {
    reset();
    setStatus('loading');
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      if (!token) throw new Error('Not signed in');
      const res = await fetch(
        'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/ai-suggest-ilp-goal',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            college_student_id: input.collegeStudentId,
            mode: input.mode,
            draft: input.draft,
            ac_code: input.ac_code,
            unit_code: input.unit_code,
            count: input.count,
          }),
        }
      );
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text.slice(0, 240)}`);
      }
      const json = (await res.json()) as { proposals: IlpGoalProposal[]; meta: SuggestMeta };
      setProposals(json.proposals);
      setMeta(json.meta);
      setStatus('done');
    } catch (e) {
      setError((e as Error).message ?? 'Could not suggest goal');
      setStatus('error');
    }
  }, [reset]);

  return { status, proposals, meta, error, suggest, reset };
}
