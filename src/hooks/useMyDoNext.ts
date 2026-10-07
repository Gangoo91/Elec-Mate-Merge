/**
 * useMyDoNext — the learner's one ranked "Do next" list (ELE-1896).
 *
 * Reads get_my_do_next(): every source that asks something of the learner
 * (assessment plan items, referred criteria, returned and proposed hours,
 * quizzes, ILP goals, tutor messages, portfolio comments, progress reviews,
 * witness requests, the next class), ranked on the server by the cost of
 * leaving it — 'now' (overdue, referred, returned, a review to sign), then
 * 'soon' (due within a week, waiting on a reply), then 'later'. One server
 * list so web and native always agree; each item carries its own deep link.
 *
 * Also returns `suggestion`, the one thing that would help most this week,
 * for the empty state.
 *
 * Refreshes when the tab regains focus and when evidence changes elsewhere
 * (the portfolio's change event). The last result is kept in memory so moving
 * between Today, the hub and the college area does not flash a skeleton.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { PORTFOLIO_CHANGED_EVENT } from '@/hooks/portfolio/usePortfolio';

export type DoNextUrgency = 'now' | 'soon' | 'later';

export type DoNextKind =
  | 'plan'
  | 'referred'
  | 'otj_returned'
  | 'hours_confirm'
  | 'quiz'
  | 'quiz_marked'
  | 'goal_blocked'
  | 'goal_overdue'
  | 'goal_new'
  | 'goal_comment'
  | 'goal_due'
  | 'message'
  | 'comment'
  | 'review_sign'
  | 'review_input'
  | 'witness'
  | 'observation'
  | 'lesson'
  // Client-side extras a page may add (e.g. revision on Today).
  | 'revision';

export interface DoNextItem {
  key: string;
  kind: DoNextKind;
  id: string;
  title: string;
  detail: string | null;
  /** yyyy-mm-dd, London. */
  due: string | null;
  urgency: DoNextUrgency;
  /** One verb. */
  action: string;
  href: string;
}

export interface DoNextSuggestion {
  kind: 'choose_course' | 'otj_pace' | 'coverage_gap' | 'mock';
  title: string;
  detail: string;
  action: string;
  href: string;
}

export interface DoNextData {
  generated_at: string;
  today: string;
  has_college: boolean;
  has_course: boolean;
  counts: { now: number; soon: number; later: number; total: number };
  items: DoNextItem[];
  suggestion: DoNextSuggestion | null;
}

/** Fire after anything that might clear an item (confirming hours, signing…). */
export const DO_NEXT_CHANGED_EVENT = 'elecmate:do-next-changed';
export const notifyDoNextChanged = () => window.dispatchEvent(new Event(DO_NEXT_CHANGED_EVENT));

type Rpc = (fn: string) => Promise<{ data: unknown; error: { message: string } | null }>;
// Bound: a bare supabase.rpc loses `this`.
const rpc = supabase.rpc.bind(supabase) as unknown as Rpc;

// Last result per user, so a second screen renders instantly.
const cache = new Map<string, DoNextData>();

export function useMyDoNext() {
  const { user } = useAuth();
  const uid = user?.id ?? null;
  const [data, setData] = useState<DoNextData | null>(() => (uid ? (cache.get(uid) ?? null) : null));
  const [loading, setLoading] = useState(() => !(uid && cache.has(uid)));
  const [error, setError] = useState<string | null>(null);
  const seq = useRef(0);

  const load = useCallback(async () => {
    if (!uid) {
      setData(null);
      setLoading(false);
      return;
    }
    const mine = ++seq.current;
    const { data: res, error: e } = await rpc('get_my_do_next');
    if (mine !== seq.current) return;
    setLoading(false);
    if (e) {
      setError(e.message);
      return;
    }
    setError(null);
    const next = res as DoNextData;
    cache.set(uid, next);
    setData(next);
  }, [uid]);

  useEffect(() => {
    if (uid && !cache.has(uid)) setLoading(true);
    void load();
  }, [load, uid]);

  useEffect(() => {
    const reload = () => void load();
    const onVisible = () => {
      if (document.visibilityState === 'visible') reload();
    };
    window.addEventListener(PORTFOLIO_CHANGED_EVENT, reload);
    window.addEventListener(DO_NEXT_CHANGED_EVENT, reload);
    window.addEventListener('focus', reload);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.removeEventListener(PORTFOLIO_CHANGED_EVENT, reload);
      window.removeEventListener(DO_NEXT_CHANGED_EVENT, reload);
      window.removeEventListener('focus', reload);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [load]);

  return { data, items: data?.items ?? [], loading, error, refresh: load };
}
