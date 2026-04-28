import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/* ==========================================================================
   useTutorThisWeek — fetches the tutor's Monday-morning cohort briefing.
   Mirrors useApprenticeThisWeek but for college staff: cohort-level
   signals, deep-links into tutor surfaces (OTJ inbox, Student 360, etc.).
   ========================================================================== */

export type TutorThisWeekActionKind =
  | 'open_otj_inbox'
  | 'open_student_360'
  | 'draft_one_to_one'
  | 'open_quizzes_dashboard'
  | 'log_observation'
  | 'edit_ilp'
  | 'open_ai_notebook';

export interface TutorThisWeekBullet {
  title: string;
  why: string;
  action_label: string;
  action_kind: TutorThisWeekActionKind;
  action_href: string;
}

export interface TutorThisWeekBrief {
  greeting: string;
  headline: string;
  bullets: TutorThisWeekBullet[];
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

export function useTutorThisWeek() {
  const { user } = useAuth();
  const [brief, setBrief] = useState<TutorThisWeekBrief | null>(null);
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

      if (!force) {
        const { data: row } = await supabase
          .from('tutor_weekly_briefs')
          .select('greeting, headline, bullets, encouragement, generated_at, iso_week')
          .eq('user_id', user.id)
          .eq('iso_week', week)
          .maybeSingle();
        if (row) {
          setBrief(row as TutorThisWeekBrief);
          setLoading(false);
          return;
        }
      }

      setGenerating(true);
      try {
        const { data: session } = await supabase.auth.getSession();
        const token = session.session?.access_token;
        if (!token) throw new Error('Not signed in');
        const url = `${(import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? ''}/functions/v1/ai-tutor-this-week`;
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
        const json = (await res.json()) as { brief: TutorThisWeekBrief };
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
