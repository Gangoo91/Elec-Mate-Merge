import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useMarkingQueue } from '@/hooks/useMarkingQueue';
import { sharedFetch } from '@/lib/sharedFetch';
import { useCollegeScope } from '@/components/college/scope/useCollegeScope';

/* ==========================================================================
   useUnifiedInbox — everything a college tutor has to act on, in one list.

   Rebuilt 6 Oct 2026 (Andrew: "everything will come through this"). The old
   hook read four sources in the browser while the home page read others, so
   the inbox said 3 and the home said 10, and evidence, app learning,
   progress reviews and check-ins never reached the inbox.

   Now one server function, get_college_inbox, returns every kind with the
   learner, cohort, "mine", how long it has waited, urgency, the button verb
   and the exact link that opens it. Quiz marking (derived per answer) is
   merged in from useMarkingQueue. The home page reads the same hook, so the
   two always agree.

   ELE-1886: `items` follow the one College Hub scope (masthead switch: Mine,
   My cohorts, Whole college), so the bell, the home and the inbox count the
   same rows. Items about no learner (an IQA sample) are the caller's own and
   always count. `allItems` is the unscoped list.
   ========================================================================== */

export type InboxKind =
  | 'hours'
  | 'app_learning'
  | 'evidence'
  | 'comment'
  | 'message'
  | 'iqa'
  | 'review'
  | 'checkin'
  | 'marking';

export const INBOX_KIND_LABEL: Record<InboxKind, string> = {
  hours: 'Hours',
  app_learning: 'App learning',
  evidence: 'Evidence',
  comment: 'Comment',
  message: 'Message',
  iqa: 'IQA',
  review: 'Review',
  checkin: 'Check-in',
  marking: 'Marking',
};

/** The order kinds are shown in, by cost of delay. */
export const INBOX_KIND_ORDER: InboxKind[] = [
  'hours',
  'evidence',
  'message',
  'comment',
  'review',
  'marking',
  'app_learning',
  'iqa',
  'checkin',
];

export interface InboxItem {
  /** `${kind}:${source_id}` — stable list key and read-state key. */
  key: string;
  kind: InboxKind;
  sourceId: string;
  /** The learner, when the item is about one. */
  learner: string | null;
  studentId: string | null;
  /** The learner's auth uid, when known and studentId is not (quiz marking). */
  userId?: string | null;
  cohort: string | null;
  /** In one of the caller's own cohorts. */
  mine: boolean;
  /** What it is, e.g. "Evidence submitted". */
  title: string;
  /** Supporting line: the entry, the message, the reason. */
  body: string;
  /** Kept for older consumers: cohort or count. */
  context: string | null;
  occurred_at: string;
  waitingDays: number;
  urgent: boolean;
  /** Button verb: Verify, Assess, Reply, Book… */
  action: string;
  href: string;
  unread: boolean;
}

export interface InboxStats {
  total: number;
  unread: number;
  urgent: number;
  mine: number;
  byKind: Record<InboxKind, number>;
  /** Back-compat counts used by older screens. */
  portfolio: number;
  otj: number;
  iqa: number;
  message: number;
}

type ServerItem = {
  key: string;
  kind: Exclude<InboxKind, 'marking'>;
  source_id: string;
  student_id: string | null;
  learner: string | null;
  cohort: string | null;
  mine: boolean;
  title: string;
  detail: string | null;
  occurred_at: string;
  waiting_days: number;
  urgent: boolean;
  seen: boolean;
  action: string;
  href: string;
};

export function useUnifiedInbox() {
  const channelId = useId();
  const [server, setServer] = useState<ServerItem[]>([]);
  const [staffId, setStaffId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { items: markingItems } = useMarkingQueue();

  const fetch = useCallback(async (force = false) => {
    setError(null);
    try {
      // ELE-1912: the bell, the overview and the inbox page mount this hook
      // together — they share one call; realtime changes always refetch.
      const { data: sess } = await supabase.auth.getSession();
      const res = await sharedFetch(
        `college_inbox:${sess.session?.user.id ?? 'anon'}`,
        async () => {
          const { data, error: e } = await supabase.rpc('get_college_inbox' as never, { p_college: null } as never);
          if (e) throw e;
          return data as unknown as { items: ServerItem[]; staff_id: string | null } | null;
        },
        { force }
      );
      setServer(res?.items ?? []);
      setStaffId(res?.staff_id ?? null);
    } catch (err) {
      setError((err as Error).message ?? 'Could not load the inbox');
      setServer([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  // Live: any source changing refreshes the list.
  useEffect(() => {
    const tables = [
      'portfolio_comments',
      'portfolio_submissions',
      'college_otj_entries',
      'college_iqa_samples',
      'student_message_threads',
      'college_tripartite_reviews',
      'student_risk_scores',
    ];
    let ch = supabase.channel(`unified_inbox:${channelId}`);
    for (const t of tables) {
      ch = ch.on('postgres_changes', { event: '*', schema: 'public', table: t }, () => void fetch(true));
    }
    ch.subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [fetch, channelId]);

  const scope = useCollegeScope();
  const allItems: InboxItem[] = useMemo(() => {
    const out: InboxItem[] = server.map((s) => ({
      key: s.key,
      kind: s.kind,
      sourceId: s.source_id,
      learner: s.learner,
      studentId: s.student_id,
      cohort: s.cohort,
      mine: !!s.mine,
      title: s.title,
      body: s.detail ?? '',
      context: s.cohort,
      occurred_at: s.occurred_at,
      waitingDays: s.waiting_days ?? 0,
      urgent: !!s.urgent,
      action: s.action,
      href: s.href,
      unread: !s.seen,
    }));
    const now = Date.now();
    for (const m of markingItems) {
      // Needs a human mark: pre-scored and waiting, or not scored yet (if the
      // scoring never ran, it must still reach the tutor). ELE-1895.
      if (m.status !== 'awaiting_review' && m.status !== 'awaiting_ai') continue;
      const nToMark = m.status === 'awaiting_review' ? m.n_awaiting_review : m.n_awaiting_ai + m.n_awaiting_review;
      const waiting = m.submitted_at ? Math.max(0, Math.floor((now - Date.parse(m.submitted_at)) / 86_400_000)) : 0;
      out.push({
        key: `marking:${m.attempt_id}`,
        kind: 'marking',
        sourceId: m.attempt_id,
        learner: m.student_name,
        studentId: null,
        userId: m.student_id,
        cohort: m.cohort_name,
        mine: true,
        title: m.quiz_title,
        body:
          m.status === 'awaiting_review'
            ? `${nToMark} written ${nToMark === 1 ? 'answer' : 'answers'} to sign off`
            : `${nToMark} written ${nToMark === 1 ? 'answer' : 'answers'} to mark`,
        context: m.cohort_name,
        occurred_at: m.submitted_at ?? new Date().toISOString(),
        waitingDays: waiting,
        urgent: waiting >= 7,
        action: 'Mark',
        href: `/college/marking?attempt=${m.attempt_id}`,
        unread: true,
      });
    }
    // Urgent first, then longest waiting.
    return out.sort(
      (a, b) => Number(b.urgent) - Number(a.urgent) || b.waitingDays - a.waitingDays || a.key.localeCompare(b.key)
    );
  }, [server, markingItems]);

  const items: InboxItem[] = useMemo(
    () =>
      scope.set
        ? allItems.filter(
            (i) =>
              (!i.studentId && !i.userId && !i.cohort) ||
              scope.inScope({ studentId: i.studentId, userId: i.userId ?? null, cohortName: i.cohort })
          )
        : allItems,
    [allItems, scope]
  );

  const stats: InboxStats = useMemo(() => {
    const byKind = Object.fromEntries(INBOX_KIND_ORDER.map((k) => [k, 0])) as Record<InboxKind, number>;
    for (const i of items) byKind[i.kind] += 1;
    return {
      total: items.length,
      unread: items.filter((i) => i.unread).length,
      urgent: items.filter((i) => i.urgent).length,
      mine: items.filter((i) => i.mine).length,
      byKind,
      portfolio: byKind.comment + byKind.evidence,
      otj: byKind.hours + byKind.app_learning,
      iqa: byKind.iqa,
      message: byKind.message,
    };
  }, [items]);

  /** Mark items as seen (the unread dot); doing the work is what clears them. */
  const markSeen = useCallback(
    async (keys: string[]) => {
      if (!staffId || keys.length === 0) return 0;
      const now = new Date().toISOString();
      const rows = keys.map((k) => {
        const i = k.indexOf(':');
        return { staff_id: staffId, source: k.slice(0, i), source_id: k.slice(i + 1), read_at: now };
      });
      const { error: upErr } = await supabase
        .from('college_inbox_read_states')
        .upsert(rows as never, { onConflict: 'staff_id,source,source_id' });
      if (upErr) throw upErr;
      await fetch(true);
      return rows.length;
    },
    [staffId, fetch]
  );

  const markAllAsRead = useCallback(
    () => markSeen(items.filter((i) => i.unread && i.kind !== 'marking').map((i) => i.key)),
    [items, markSeen]
  );

  const refresh = useCallback(() => fetch(true), [fetch]);

  return { items, allItems, stats, loading: loading || !scope.ready, error, refresh, markSeen, markAllAsRead };
}
