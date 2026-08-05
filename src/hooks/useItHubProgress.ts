import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Progress for the Inspection & Testing hub — stored per test in
 * `learning_progress`.
 *
 * That table already existed and nothing wrote to it from here, so working
 * through the hub recorded nothing at all: no resume, no sense of how far you
 * had got, nothing to come back to. `module` holds the step key from
 * `itLearningPath`, which is why those keys must never be renamed.
 *
 * There is no unique index on (user_id, course, module), so this reads the row
 * before deciding between insert and update rather than upserting. A migration
 * to add one would be tidier; it is not worth a schema change to this hook.
 *
 * Every call is `await` inside try/catch. Supabase query builders are
 * thenables, not Promises — attaching `.catch()` makes the request never fire
 * at all, silently, which is exactly the failure this hook must not have.
 */

const COURSE = 'inspection-testing';

export interface ItHubProgress {
  /** step key -> completion percentage (0-100). */
  completion: Record<string, number>;
  /** True once the first read has settled, success or not. */
  loaded: boolean;
  /** Mark a step complete (100) or reset it (0). */
  setStepComplete: (stepKey: string, complete: boolean) => Promise<void>;
  /** Steps at 100. */
  completedCount: number;
}

export const useItHubProgress = (totalSteps: number): ItHubProgress => {
  const [completion, setCompletion] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const { data: auth } = await supabase.auth.getUser();
        const uid = auth?.user?.id ?? null;
        if (cancelled) return;
        setUserId(uid);

        if (!uid) {
          setLoaded(true);
          return;
        }

        const { data, error } = await supabase
          .from('learning_progress')
          .select('module, completion_percentage')
          .eq('user_id', uid)
          .eq('course', COURSE);

        if (cancelled) return;
        if (error) throw error;

        const next: Record<string, number> = {};
        for (const row of data ?? []) {
          if (row.module) next[row.module] = Number(row.completion_percentage ?? 0);
        }
        setCompletion(next);
      } catch (error) {
        // A progress read failing must never stop someone learning — the hub
        // renders unmarked rather than erroring.
        console.warn('[ItHubProgress] could not load progress', error);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const setStepComplete = useCallback(
    async (stepKey: string, complete: boolean) => {
      const pct = complete ? 100 : 0;

      // Optimistic: the tick responds immediately. If the write fails the
      // local state still reflects the intent, and the next load corrects it.
      setCompletion((prev) => ({ ...prev, [stepKey]: pct }));

      if (!userId) return;

      try {
        const { data: existing, error: readError } = await supabase
          .from('learning_progress')
          .select('id')
          .eq('user_id', userId)
          .eq('course', COURSE)
          .eq('module', stepKey)
          .maybeSingle();

        if (readError) throw readError;

        const now = new Date().toISOString();

        if (existing?.id) {
          const { error } = await supabase
            .from('learning_progress')
            .update({ completion_percentage: pct, last_accessed: now, updated_at: now })
            .eq('id', existing.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('learning_progress').insert({
            user_id: userId,
            course: COURSE,
            module: stepKey,
            completion_percentage: pct,
            last_accessed: now,
          });
          if (error) throw error;
        }
      } catch (error) {
        console.warn('[ItHubProgress] could not save progress', error);
      }
    },
    [userId]
  );

  const completedCount = Object.values(completion).filter((v) => v >= 100).length;

  return {
    completion,
    loaded,
    setStepComplete,
    completedCount: Math.min(completedCount, totalSteps),
  };
};

export default useItHubProgress;
