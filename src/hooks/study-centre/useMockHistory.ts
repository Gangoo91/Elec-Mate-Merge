/**
 * Mock exam history, across every paper (ELE-1815).
 *
 * Andrzej had sat 29 mocks and could see none of them once a results page
 * closed. This reads back what recordMockExamAttempt writes:
 *   - useMockHistory()    — every attempt, light columns, for the history card
 *                           and list (no review snapshots: they're heavy)
 *   - useRevisionPile()   — questions still to revise, worked out from recent
 *                           attempts' review snapshots: a miss stays until a
 *                           later attempt gets it right or a revision round
 *                           clears it (mock_revision_cleared)
 *   - useMockAttempt(id)  — one attempt in full, for the review page
 *
 * Own rows only (RLS `user_id = auth.uid()`).
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase as typedSupabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { MockReviewItem } from '@/lib/mockExamTelemetry';

const supabase = typedSupabase as unknown as SupabaseClient;

export interface MockAttemptRow {
  id: string;
  exam_slug: string;
  exam_name: string | null;
  retake_path: string | null;
  score: number;
  total_questions: number;
  percentage: number;
  passed: boolean;
  time_taken_seconds: number;
  created_at: string;
  /** The paper's pass mark (rows before 7 Oct 2026: null — assume 60). */
  pass_mark?: number | null;
  /** Rows written before 7 Oct 2026 have no review snapshot. */
  has_review?: boolean;
}

export interface MockAttemptFull extends MockAttemptRow {
  user_id?: string;
  review: MockReviewItem[] | null;
  served_keys: string[] | null;
}

/** "level3-module8-mock3" → "Level 3 Mock Exam 3" for rows that predate exam_name. */
export function paperName(row: Pick<MockAttemptRow, 'exam_name' | 'exam_slug'>): string {
  if (row.exam_name) return row.exam_name;
  const s = row.exam_slug;
  const m = s.match(/^level(\d)-module\d+-mock(\d+)$/);
  if (m) return `Level ${m[1]} Mock Exam ${m[2]}`;
  return s
    .replace(/[-_]+/g, ' ')
    .replace(/\b(\w)/g, (c) => c.toUpperCase())
    .replace(/\bAm2\b/, 'AM2');
}

const LIGHT_COLS =
  'id,exam_slug,exam_name,retake_path,score,total_questions,percentage,passed,time_taken_seconds,created_at,pass_mark';

export function useMockHistory(limit = 200, enabled = true) {
  const { user } = useAuth();
  const uid = enabled ? (user?.id ?? null) : null;
  const [rows, setRows] = useState<MockAttemptRow[]>([]);
  const [loading, setLoading] = useState(Boolean(uid));
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!uid) {
      setRows([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error: e } = await supabase
      .from('seo_mock_attempts')
      .select(LIGHT_COLS)
      .eq('user_id', uid)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (e) setError('Couldn’t load your mock exams.');
    else {
      setError(null);
      setRows((data ?? []) as MockAttemptRow[]);
    }
    setLoading(false);
  }, [uid, limit]);

  useEffect(() => {
    void load();
  }, [load]);

  /** Per paper: attempts, best, last, previous (for the trend), newest first. */
  const papers = useMemo(() => {
    const by = new Map<string, MockAttemptRow[]>();
    for (const r of rows) by.set(r.exam_slug, [...(by.get(r.exam_slug) ?? []), r]);
    return [...by.entries()]
      .map(([slug, list]) => ({
        slug,
        name: paperName(list[0]),
        retakePath: list.find((r) => r.retake_path)?.retake_path ?? null,
        attempts: list.length,
        best: Math.max(...list.map((r) => r.percentage)),
        last: list[0],
        previous: list[1] ?? null,
        /** Oldest → newest, for a sparkline. */
        trend: list
          .slice(0, 10)
          .map((r) => r.percentage)
          .reverse(),
      }))
      .sort((a, b) => b.last.created_at.localeCompare(a.last.created_at));
  }, [rows]);

  return { rows, papers, loading, error, refresh: load, signedIn: Boolean(user?.id) };
}

export interface PileItem extends MockReviewItem {
  /** Paper and attempt it was last missed in. */
  attemptId: string;
  examSlug: string;
  paper: string;
  missedAt: string;
  /** How many attempts it has been missed in. */
  misses: number;
  /** Spaced repetition: 0 due now, 1–2 after right answers (3 = learned, never on the pile). */
  step: number;
  /** When it's next due. */
  dueAt: string;
  /** Due now (vs waiting for its next day). */
  due: boolean;
}

/**
 * Questions still to revise, newest miss first — worked out in the database
 * (mock_revision_pile): the client used to pull up to 150 full snapshots on
 * every visit, and read the oldest 150 rather than the newest.
 * `countOnly` for cards that just show the number.
 */
export function useRevisionPile({
  countOnly = false,
  enabled = true,
}: { countOnly?: boolean; enabled?: boolean } = {}) {
  const { user } = useAuth();
  const authUid = user?.id ?? null;
  const uid = enabled ? authUid : null;
  const [items, setItems] = useState<PileItem[]>([]);
  /** Due now. */
  const [count, setCount] = useState(0);
  /** On the pile but waiting for their next day. */
  const [scheduled, setScheduled] = useState(0);
  const [loading, setLoading] = useState(Boolean(uid));

  const load = useCallback(async () => {
    if (!uid) {
      setItems([]);
      setCount(0);
      setLoading(false);
      return;
    }
    setLoading(true);
    if (countOnly) {
      const { data } = await supabase.rpc('mock_revision_pile_count');
      const row = (Array.isArray(data) ? data[0] : data) as {
        due?: number;
        scheduled?: number;
      } | null;
      setCount(row?.due ?? 0);
      setScheduled(row?.scheduled ?? 0);
    } else {
      const { data } = await supabase.rpc('mock_revision_pile', { p_limit: 200 });
      const list = (
        (data ?? []) as {
          question_key: string;
          item: MockReviewItem;
          attempt_id: string;
          exam_slug: string;
          exam_name: string | null;
          missed_at: string;
          misses: number;
          step: number;
          due_at: string;
          due: boolean;
        }[]
      ).map((r) => ({
        ...r.item,
        k: r.question_key,
        attemptId: r.attempt_id,
        examSlug: r.exam_slug,
        paper: paperName({ exam_name: r.exam_name, exam_slug: r.exam_slug }),
        missedAt: r.missed_at,
        misses: r.misses,
        step: r.step,
        dueAt: r.due_at,
        due: r.due,
      }));
      setItems(list);
      setCount(list.filter((i) => i.due).length);
      setScheduled(list.filter((i) => !i.due).length);
    }
    setLoading(false);
  }, [uid, countOnly]);

  useEffect(() => {
    void load();
  }, [load]);

  /**
   * One answer in a revision round, on the server's schedule: right → back in
   * 1, then 3, then 7 days, learned on the third; wrong → due again now.
   * Returns when it's next due (null on failure).
   */
  const answer = useCallback(
    async (key: string, right: boolean) => {
      if (!authUid) return null;
      const { data, error } = await supabase.rpc('mock_revision_answer', {
        p_key: key,
        p_right: right,
      });
      if (error) {
        if (uid) void load();
        return null;
      }
      const row = (Array.isArray(data) ? data[0] : data) as {
        step: number;
        due_at: string;
        mastered: boolean;
      } | null;
      if (row && right) {
        setItems((list) =>
          list.map((i) =>
            i.k === key ? { ...i, step: row.step, dueAt: row.due_at, due: false } : i
          )
        );
        setCount((n) => Math.max(0, n - 1));
      }
      return row;
    },
    [authUid, uid, load]
  );
  /** Kept for callers from before the schedule: one right answer. */
  const clear = useCallback((key: string) => answer(key, true), [answer]);

  return { items, count, scheduled, loading, refresh: load, answer, clear };
}

export interface TopicStat {
  topic: string;
  asked: number;
  /** Answered (asked minus skipped) — accuracy is out of these. */
  answered: number;
  right: number;
  pct: number;
  examSlug: string;
  section: string | null;
  module: string | null;
}

/** Accuracy per topic across every mock in the window (mock_topic_stats). */
export function useTopicStats(days = 120) {
  const { user } = useAuth();
  const uid = user?.id ?? null;
  const [stats, setStats] = useState<TopicStat[]>([]);
  const [loading, setLoading] = useState(Boolean(uid));
  useEffect(() => {
    if (!uid) {
      setStats([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    void supabase.rpc('mock_topic_stats', { p_days: days }).then(({ data }) => {
      if (cancelled) return;
      setStats(
        (
          (data ?? []) as {
            topic: string;
            asked: number;
            answered: number;
            got_right: number;
            exam_slug: string;
            section: string | null;
            module: string | null;
          }[]
        )
          .filter((r) => r.answered > 0)
          .map((r) => ({
            topic: r.topic,
            asked: r.asked,
            answered: r.answered,
            right: r.got_right,
            pct: Math.round((r.got_right / r.answered) * 100),
            examSlug: r.exam_slug,
            section: r.section,
            module: r.module,
          }))
      );
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [uid, days]);
  return { stats, loading };
}

export function useMockAttempt(id: string | undefined) {
  const { user } = useAuth();
  const uid = user?.id ?? null;
  const [row, setRow] = useState<MockAttemptFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!uid || !id) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setRow(null);
    setNotFound(false);
    void supabase
      .from('seo_mock_attempts')
      .select(`${LIGHT_COLS},user_id,review,served_keys,question_ids,wrong_ids`)
      .eq('id', id)
      .eq('user_id', uid)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        setRow((data as MockAttemptFull | null) ?? null);
        setNotFound(!data);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [uid, id]);

  return { row, loading, notFound };
}
