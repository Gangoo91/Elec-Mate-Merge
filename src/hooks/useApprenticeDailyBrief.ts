import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useApprenticeDailyBrief — lazy "today's focus" for an apprentice.
   ELE-900 (B5). Calls ai-apprentice-today which caches per (user_id, date)
   so no LLM cost on second visit the same day.
   ========================================================================== */

export type ActionKind =
  | 'open_quiz'
  | 'open_otj'
  | 'open_portfolio'
  | 'open_ac'
  | 'open_epa_brief'
  | 'open_reflection';

export interface DailyBullet {
  title: string;
  why: string;
  action_label: string;
  action_kind: ActionKind;
  action_target?: string;
}

export interface DailyBrief {
  id: string;
  user_id: string;
  iso_date: string;
  generated_at: string;
  greeting: string | null;
  headline: string | null;
  bullets: DailyBullet[];
  encouragement: string | null;
}

export function useApprenticeDailyBrief() {
  const [brief, setBrief] = useState<DailyBrief | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (force = false) => {
    if (force) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const { data, error: invErr } = await supabase.functions.invoke('ai-apprentice-today', {
        body: { force },
      });
      if (invErr) throw invErr;
      const r = (data as { brief?: DailyBrief }).brief ?? null;
      setBrief(r);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { brief, loading, refreshing, error, refresh: () => load(true) };
}
