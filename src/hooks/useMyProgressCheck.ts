import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * The apprentice's own "focus areas" — the learning-relevant slice of their
 * college risk signals, surfaced back to them supportively. Reads the
 * get_my_progress_check() RPC, which is SECURITY DEFINER + scoped to auth.uid()
 * and STRIPS pastoral/safeguarding factors, so the learner only ever sees their
 * own learning nudges (OTJ, observations, evidence, EPA) — never a risk label,
 * never a safeguarding concern. Closes the college → apprentice loop.
 */
export interface ProgressFocus {
  key?: string;
  label: string;
  detail?: string;
  severity?: number;
}

export function useMyProgressCheck(): { focus: ProgressFocus[]; loading: boolean } {
  const [focus, setFocus] = useState<ProgressFocus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { data, error } = await supabase.rpc('get_my_progress_check');
      if (cancelled) return;
      if (!error && Array.isArray(data)) setFocus(data as ProgressFocus[]);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { focus, loading };
}
