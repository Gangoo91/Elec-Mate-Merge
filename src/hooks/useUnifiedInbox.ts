import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useUnifiedInbox — single inbox feed for the College tutor combining the
   four signals that need their attention: portfolio comments awaiting reply,
   OTJ entries pending verification, IQA samples pending verdict, and unread
   message threads.

   Each row normalises to a common InboxItem shape so the page can render
   one editorial list with filter chips per source. Every item carries a
   server-resolved deep-link href, so the model never writes URLs.

   ELE-940 / [M4] — unified inbox.
   ========================================================================== */

export type InboxKind = 'portfolio' | 'otj' | 'iqa' | 'message';

export interface InboxItem {
  /** Source-prefixed key: `${kind}:${row_id}` so React lists are stable. */
  key: string;
  kind: InboxKind;
  /** Headline — first line of the row. */
  title: string;
  /** Subline — usually the body excerpt or supporting context. */
  body: string;
  /** Right-aligned chip — student name, cohort, or verdict count. */
  context: string | null;
  /** ISO timestamp the item was last actionable. */
  occurred_at: string;
  /** Server-resolved deep-link the click should navigate to. */
  href: string;
  /** Optional unread-style highlight. */
  unread: boolean;
}

export interface InboxStats {
  total: number;
  unread: number;
  portfolio: number;
  otj: number;
  iqa: number;
  message: number;
}

export function useUnifiedInbox() {
  const channelId = useId();
  const [items, setItems] = useState<InboxItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes?.user?.id;
      if (!userId) {
        setItems([]);
        setLoading(false);
        return;
      }

      // Resolve staff record + college (same bootstrap as useTutorToday).
      const { data: staffRow } = await supabase
        .from('college_staff')
        .select('id, college_id')
        .eq('user_id', userId)
        .is('archived_at', null)
        .maybeSingle();
      const collegeId = (staffRow as { college_id?: string | null } | null)?.college_id ?? null;
      if (!collegeId) {
        setItems([]);
        setLoading(false);
        return;
      }

      // Students in this college (used for scoping + name resolution).
      const { data: studentRows } = await supabase
        .from('college_students')
        .select('id, name, user_id, cohort_id')
        .eq('college_id', collegeId);
      const students = (studentRows ?? []) as Array<{
        id: string;
        name: string;
        user_id: string | null;
        cohort_id: string | null;
      }>;
      const studentIds = students.map((s) => s.id);
      const studentByCollegeId = new Map(students.map((s) => [s.id, s]));
      const studentByAuthUid = new Map(
        students.filter((s) => s.user_id).map((s) => [s.user_id as string, s])
      );

      // Cohorts for name lookup.
      const { data: cohortRows } = await supabase
        .from('college_cohorts')
        .select('id, name')
        .eq('college_id', collegeId);
      const cohortNameById = new Map(
        ((cohortRows ?? []) as Array<{ id: string; name: string }>).map((c) => [c.id, c.name])
      );

      // IQA plans for scoping pending samples.
      const { data: planRows } = await supabase
        .from('college_iqa_sampling')
        .select('id')
        .eq('college_id', collegeId);
      const planIds = ((planRows ?? []) as Array<{ id: string }>).map((p) => p.id);

      // Per-staff read-state map so unread badge actually reflects reality.
      // college_inbox_read_states is keyed by (staff_id, source, source_id).
      const staffPk = (staffRow as { id?: string | null } | null)?.id ?? null;
      const readKeys = new Set<string>();
      if (staffPk) {
        const { data: readRows } = await supabase
          .from('college_inbox_read_states')
          .select('source, source_id')
          .eq('staff_id', staffPk)
          .not('read_at', 'is', null);
        for (const r of (readRows ?? []) as Array<{ source: string; source_id: string }>) {
          readKeys.add(`${r.source}:${r.source_id}`);
        }
      }

      // Fan-out queries — wider window than Today (no date cap).
      const [commentsRes, otjRes, iqaRes, conversationsRes] = await Promise.all([
        supabase
          .from('portfolio_comments')
          .select('id, user_id, content, author_role, created_at, evidence_id')
          .eq('requires_action', true)
          .eq('is_resolved', false)
          .order('created_at', { ascending: false })
          .limit(60),
        supabase
          .from('college_otj_entries')
          .select('id, student_id, title, activity_date, duration_minutes, created_at')
          .eq('verification_status', 'pending')
          .order('activity_date', { ascending: false })
          .limit(60),
        planIds.length > 0
          ? supabase
              .from('college_iqa_samples')
              .select(
                'id, sampling_plan_id, observation_id, observation_title_snapshot, otj_id, otj_title_snapshot, sampled_at'
              )
              .in('sampling_plan_id', planIds)
              .eq('verdict', 'pending')
              .order('sampled_at', { ascending: false })
              .limit(40)
          : Promise.resolve({ data: [] as unknown[] }),
        supabase
          .from('college_conversations')
          .select(
            'id, participant_1_id, participant_2_id, student_id, unread_1, unread_2, last_message_preview, last_message_at, status'
          )
          .or(`participant_1_id.eq.${userId},participant_2_id.eq.${userId}`)
          .neq('status', 'archived')
          .order('last_message_at', { ascending: false, nullsFirst: false })
          .limit(40),
      ]);

      const merged: InboxItem[] = [];

      // ─── Portfolio comments (apprentice replies needing action) ───
      // portfolio_comments.user_id is the comment author (apprentice or tutor)
      // — for "needs my attention" we want comments authored by apprentices.
      type CommentRow = {
        id: string;
        user_id: string;
        content: string;
        author_role: string | null;
        created_at: string;
        evidence_id: string | null;
      };
      for (const c of (commentsRes.data ?? []) as CommentRow[]) {
        const author = studentByAuthUid.get(c.user_id);
        if (!author) continue; // not in our college / not from a learner
        if (c.author_role && c.author_role !== 'apprentice' && c.author_role !== 'student')
          continue;
        const cohortName = author.cohort_id ? (cohortNameById.get(author.cohort_id) ?? null) : null;
        merged.push({
          key: `portfolio:${c.id}`,
          kind: 'portfolio',
          title: author.name,
          body: c.content.slice(0, 240),
          context: cohortName,
          occurred_at: c.created_at,
          href: `/college/students/${author.id}#portfolio`,
          unread: !readKeys.has(`portfolio:${c.id}`),
        });
      }

      // ─── OTJ entries pending verification ─────────────────────────
      type OtjRow = {
        id: string;
        student_id: string;
        title: string;
        activity_date: string;
        duration_minutes: number | null;
        created_at: string | null;
      };
      for (const o of (otjRes.data ?? []) as OtjRow[]) {
        const student = studentByCollegeId.get(o.student_id);
        if (!student) continue;
        const cohortName = student.cohort_id
          ? (cohortNameById.get(student.cohort_id) ?? null)
          : null;
        const mins = o.duration_minutes ?? 0;
        const dur =
          mins >= 60
            ? `${Math.round(mins / 60)}h${mins % 60 ? ` ${mins % 60}m` : ''}`
            : mins > 0
              ? `${mins}m`
              : '';
        merged.push({
          key: `otj:${o.id}`,
          kind: 'otj',
          title: o.title,
          body: dur ? `${dur} · ${student.name}` : student.name,
          context: cohortName,
          occurred_at: o.created_at ?? o.activity_date,
          href: `/college/students/${student.id}#otj`,
          unread: !readKeys.has(`otj:${o.id}`),
        });
      }

      // ─── IQA samples pending verdict ──────────────────────────────
      type IqaRow = {
        id: string;
        sampling_plan_id: string;
        observation_id: string | null;
        observation_title_snapshot: string | null;
        otj_id: string | null;
        otj_title_snapshot: string | null;
        sampled_at: string;
      };
      for (const s of (iqaRes.data ?? []) as IqaRow[]) {
        const targetTitle = s.observation_title_snapshot ?? s.otj_title_snapshot ?? 'Sample';
        merged.push({
          key: `iqa:${s.id}`,
          kind: 'iqa',
          title: targetTitle,
          body: 'Awaiting your IQA verdict',
          context: s.observation_id ? 'Observation' : 'OTJ',
          occurred_at: s.sampled_at,
          href: `/college/iqa/sampling/${s.sampling_plan_id}`,
          unread: !readKeys.has(`iqa:${s.id}`),
        });
      }

      // ─── Unread conversation threads ──────────────────────────────
      type ConvRow = {
        id: string;
        participant_1_id: string;
        participant_2_id: string;
        student_id: string | null;
        unread_1: number | null;
        unread_2: number | null;
        last_message_preview: string | null;
        last_message_at: string | null;
        status: string | null;
      };
      for (const c of (conversationsRes.data ?? []) as ConvRow[]) {
        const isP1 = c.participant_1_id === userId;
        const myUnread = isP1 ? (c.unread_1 ?? 0) : (c.unread_2 ?? 0);
        if (myUnread <= 0) continue;
        const otherStudent = c.student_id ? studentByCollegeId.get(c.student_id) : null;
        merged.push({
          key: `message:${c.id}`,
          kind: 'message',
          title: otherStudent?.name ?? 'Conversation',
          body: c.last_message_preview ?? '',
          context: myUnread > 1 ? `${myUnread} unread` : null,
          occurred_at: c.last_message_at ?? new Date().toISOString(),
          href: otherStudent ? `/college/students/${otherStudent.id}#messages` : `/college`,
          unread: !readKeys.has(`message:${c.id}`),
        });
      }

      // Newest first across all sources.
      merged.sort((a, b) => new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime());

      setItems(merged);
    } catch (e) {
      setError((e as Error).message ?? 'Could not load inbox');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  // Realtime — bump the inbox when any of its sources change. Cheap because
  // each change just retriggers fetch() which is already a parallel batch.
  useEffect(() => {
    const ch = supabase
      .channel(`unified_inbox:${channelId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'portfolio_comments' },
        () => void fetch()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'college_otj_entries' },
        () => void fetch()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'college_iqa_samples' },
        () => void fetch()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'college_conversations' },
        () => void fetch()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [fetch, channelId]);

  const stats: InboxStats = useMemo(() => {
    const portfolio = items.filter((i) => i.kind === 'portfolio').length;
    const otj = items.filter((i) => i.kind === 'otj').length;
    const iqa = items.filter((i) => i.kind === 'iqa').length;
    const message = items.filter((i) => i.kind === 'message').length;
    const unread = items.filter((i) => i.unread).length;
    return { total: items.length, unread, portfolio, otj, iqa, message };
  }, [items]);

  // Bulk-mark every currently-unread item as read. Upserts into
  // college_inbox_read_states keyed by (staff_id, source, source_id).
  // Idempotent: marking already-read items just refreshes read_at.
  const markAllAsRead = useCallback(async () => {
    const { data: userRes } = await supabase.auth.getUser();
    const userId = userRes?.user?.id;
    if (!userId) return 0;
    const { data: staffRow } = await supabase
      .from('college_staff')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();
    const staffPk = (staffRow as { id?: string | null } | null)?.id;
    if (!staffPk) return 0;
    const unreadItems = items.filter((i) => i.unread);
    if (unreadItems.length === 0) return 0;
    const now = new Date().toISOString();
    const rows = unreadItems.map((i) => {
      const [source, source_id] = i.key.split(':');
      return { staff_id: staffPk, source, source_id, read_at: now };
    });
    const { error: upsertErr } = await supabase
      .from('college_inbox_read_states')
      .upsert(rows, { onConflict: 'staff_id,source,source_id' });
    if (upsertErr) throw upsertErr;
    await fetch();
    return unreadItems.length;
  }, [items, fetch]);

  return { items, stats, loading, error, refresh: fetch, markAllAsRead };
}
