import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/* ==========================================================================
   useApprenticeThisWeek — fetches the apprentice's mate-tutor weekly coaching
   brief. Cache lives one row per ISO week in apprentice_weekly_briefs;
   missing rows trigger generation via the ai-apprentice-this-week edge fn.
   ========================================================================== */

export type ThisWeekActionKind =
  | 'open_quiz'
  | 'open_portfolio'
  | 'add_reflection'
  | 'submit_otj'
  | 'open_brief'
  | 'open_simulator'
  | 'edit_ilp'
  | 'message_tutor';

export interface ThisWeekBullet {
  title: string;
  why: string;
  action_label: string;
  action_kind: ThisWeekActionKind;
  action_href: string;
}

export interface ThisWeekBrief {
  greeting: string;
  headline: string;
  bullets: ThisWeekBullet[];
  encouragement: string;
  generated_at: string;
  iso_week: string;
}

function isoWeekKey(d: Date = new Date()): string {
  const target = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const dayNum = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((target.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return `${target.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

export function useApprenticeThisWeek() {
  const { user } = useAuth();
  const [brief, setBrief] = useState<ThisWeekBrief | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrGenerate = useCallback(
    async (force = false) => {
      if (!user) {
        setLoading(false);
        return;
      }
      setError(null);
      const week = isoWeekKey();

      // 1. Try cache (RLS lets the apprentice read their own row)
      if (!force) {
        const { data: row } = await supabase
          .from('apprentice_weekly_briefs')
          .select('greeting, headline, bullets, encouragement, generated_at, iso_week')
          .eq('user_id', user.id)
          .eq('iso_week', week)
          .maybeSingle();
        if (row) {
          setBrief(row as ThisWeekBrief);
          setLoading(false);
          return;
        }
      }

      // 2. Generate via edge fn
      setGenerating(true);
      try {
        const { data: session } = await supabase.auth.getSession();
        const token = session.session?.access_token;
        if (!token) throw new Error('Not signed in');
        const url = `${(import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? ''}/functions/v1/ai-apprentice-this-week`;
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(force ? { force: true } : {}),
        });
        if (!res.ok) {
          const t = await res.text().catch(() => '');
          throw new Error(t.slice(0, 200) || `request_${res.status}`);
        }
        const json = (await res.json()) as { brief: ThisWeekBrief };
        setBrief(json.brief);
      } catch (e) {
        setError((e as Error).message ?? 'Generation failed');
      } finally {
        setGenerating(false);
        setLoading(false);
      }
    },
    [user]
  );

  useEffect(() => {
    fetchOrGenerate(false);
  }, [fetchOrGenerate]);

  const regenerate = useCallback(() => fetchOrGenerate(true), [fetchOrGenerate]);

  return { brief, loading, generating, error, regenerate };
}
