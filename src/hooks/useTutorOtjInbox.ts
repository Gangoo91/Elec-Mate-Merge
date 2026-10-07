import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { narrowIfCollege, useCollegeScope } from '@/components/college/scope/useCollegeScope';

/* ==========================================================================
   useTutorOtjInbox — cohort-level OTJ verification inbox.

   Lists every pending apprentice_submitted OTJ entry for learners that the
   signed-in tutor (or assessor / IQA) is assigned to via
   college_student_assignments. Includes verify / reject actions and bulk
   refresh. Realtime — when a learner submits a new OTJ entry it appears
   here without refresh.

   Scope (ELE-1886) is the ONE College Hub setting from the masthead:
   Mine, My cohorts or Whole college (useCollegeScope). `scope` here is
   'mine' for either narrowed level. When the narrowed level has no
   learners at all the hook falls back to the whole college and sets
   `fellBackToCollege` so the page can say why (same pattern as TutorToday).

   Id spaces: college_student_assignments.student_id and
   college_otj_entries.student_id are BOTH the learner's auth uid
   (= college_students.user_id). college_students.id is a different key
   and is only needed for the Student 360 deep-link.
   ========================================================================== */

export type InboxScope = 'mine' | 'college';

/**
 * Server-side verify/reject — the edge fn updates college_otj_entries
 * AND fires the apprentice push in one round-trip. Returns null on
 * success or an error message for the toast.
 */
export async function callOtjStatusEdgeFn(
  otjEntryId: string,
  action: 'verify' | 'reject',
  rationale?: string
): Promise<string | null> {
  try {
    const { data: session } = await supabase.auth.getSession();
    const token = session.session?.access_token;
    if (!token) return 'Not signed in';
    const url = `${(import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? ''}/functions/v1/notify-otj-status`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        otj_entry_id: otjEntryId,
        action,
        ...(rationale ? { rationale } : {}),
      }),
    });
    if (!res.ok) {
      try {
        const j = await res.json();
        return (j as { error?: string; detail?: string }).detail ?? (j as { error?: string }).error ?? `request_${res.status}`;
      } catch {
        return `request_${res.status}`;
      }
    }
    return null;
  } catch (e) {
    return (e as Error).message;
  }
}

export interface InboxRow {
  id: string;
  student_id: string; // auth.users.id (college_otj_entries.student_id)
  /** college_students.id — what /college/students/:id expects. */
  college_student_row_id: string | null;
  student_name: string | null;
  cohort_name: string | null;
  qualification_id: string | null;
  activity_date: string;
  activity_type: string;
  title: string;
  description: string | null;
  duration_minutes: number;
  unit_codes: string[] | null;
  evidence_url: string | null;
  evidence_urls: string[] | null;
  source_kind: string;
  verification_status: string;
  created_at: string | null;
  /** The learner's answer when they added it (funding rules 77.1 / 79.6.1).
   *  Null on entries made before the question existed. */
  in_working_hours: boolean | null;
  outside_hours_compensated: boolean | null;
}

export interface TutorOtjInbox {
  rows: InboxRow[];
  loading: boolean;
  error: string | null;
  staffCollegeId: string | null;
  scope: InboxScope;
  setScope: (s: InboxScope) => void;
  /** The scope the rows were actually fetched with (differs from `scope`
      when 'mine' had no assignments and the hook widened to the college). */
  effectiveScope: InboxScope;
  /** True when scope is 'mine' but the tutor has no assignments, so the
      rows shown are every learner at the college. */
  fellBackToCollege: boolean;
  verify: (id: string) => Promise<void>;
  reject: (id: string, rationale: string) => Promise<void>;
  bulkVerify: (ids: string[]) => Promise<{ ok: number; failed: number }>;
  bulkReject: (ids: string[], rationale: string) => Promise<{ ok: number; failed: number }>;
  refresh: () => Promise<void>;
}

export function useTutorOtjInbox(): TutorOtjInbox {
  const { user } = useAuth();
  const { toast } = useToast();
  const tutorUid = user?.id ?? null;

  const [staffCollegeId, setStaffCollegeId] = useState<string | null>(null);
  // ELE-1886: the ONE College Hub scope (masthead switch), not a local toggle.
  const collegeScope = useCollegeScope();
  const level = collegeScope.level;
  const scopeSet = collegeScope.set;
  const scopeKey = scopeSet ? Array.from(scopeSet.userIds).sort().join(',') : '';
  const scope: InboxScope = level === 'college' ? 'college' : 'mine';
  const { setLevel } = collegeScope;
  const setScope = useCallback(
    (s: InboxScope) => (s === 'college' ? setLevel('college') : narrowIfCollege(setLevel, level)),
    [setLevel, level]
  );
  const [rows, setRows] = useState<InboxRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fellBackToCollege, setFellBackToCollege] = useState(false);

  // Resolve which college this staff member belongs to so we can scope
  // the realtime subscription + the "everyone in my college" query path.
  useEffect(() => {
    let cancelled = false;
    if (!tutorUid) {
      setStaffCollegeId(null);
      return;
    }
    (async () => {
      const { data } = await supabase
        .from('college_staff')
        .select('college_id')
        .eq('user_id', tutorUid)
        .maybeSingle();
      if (!cancelled) {
        setStaffCollegeId((data?.college_id as string | undefined) ?? null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [tutorUid]);

  const fetchAll = useCallback(async () => {
    if (!tutorUid) {
      setRows([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // 1. Resolve which student auth uids are in scope.
      let studentAuthUids: string[] = [];
      let useCollegeWide = scope === 'college';
      let fellBack = false;

      if (scope === 'mine') {
        // Mine or My cohorts: the learners the shared scope resolved (auth
        // uids, the key college_otj_entries uses).
        if (!collegeScope.ready) return;
        studentAuthUids = scopeKey ? scopeKey.split(',') : [];
        if (studentAuthUids.length === 0) {
          // Nothing assigned to this tutor yet: widen to the whole college
          // rather than show an empty inbox (TutorToday does the same).
          useCollegeWide = true;
          fellBack = true;
        }
      }

      if (useCollegeWide) {
        // College-wide: pull every college_students.user_id in this college
        if (!staffCollegeId) {
          setRows([]);
          setFellBackToCollege(fellBack);
          setLoading(false);
          return;
        }
        const { data: students } = await supabase
          .from('college_students')
          .select('user_id')
          .eq('college_id', staffCollegeId);
        studentAuthUids = ((students ?? []) as Array<{ user_id: string | null }>)
          .map((r) => r.user_id)
          .filter((u): u is string => Boolean(u));
      }
      setFellBackToCollege(fellBack);

      if (studentAuthUids.length === 0) {
        setRows([]);
        setLoading(false);
        return;
      }

      // 2. Pull pending apprentice_submitted entries for those students.
      const { data: entries, error: eErr } = await supabase
        .from('college_otj_entries')
        .select(
          'id, student_id, activity_date, activity_type, title, description, duration_minutes, unit_codes, evidence_url, evidence_urls, source_kind, verification_status, created_at, in_working_hours, outside_hours_compensated'
        )
        .in('student_id', studentAuthUids)
        .eq('source_kind', 'apprentice_submitted')
        .eq('verification_status', 'pending')
        .order('created_at', { ascending: true })
        .limit(200);
      if (eErr) throw eErr;

      // in_working_hours / outside_hours_compensated are newer than the
      // generated types, hence the unknown hop.
      const entryRows = (entries ?? []) as unknown as Array<{
        id: string;
        student_id: string;
        activity_date: string;
        activity_type: string;
        title: string;
        description: string | null;
        duration_minutes: number;
        unit_codes: string[] | null;
        evidence_url: string | null;
        evidence_urls: string[] | null;
        source_kind: string;
        verification_status: string;
        created_at: string | null;
        in_working_hours: boolean | null;
        outside_hours_compensated: boolean | null;
      }>;

      if (entryRows.length === 0) {
        setRows([]);
        setLoading(false);
        return;
      }

      // 3. Hydrate learner names + cohort names + the college_students.id
      // (needed for the Student 360 deep-link) in two round-trips. We avoid
      // the nested select on college_cohorts because the FK relationship
      // isn't always reflected in PostgREST embeddings — the explicit
      // lookup is more robust.
      const ids = Array.from(new Set(entryRows.map((r) => r.student_id)));
      const [csRes, profilesRes] = await Promise.all([
        supabase
          .from('college_students')
          // college_students has no qualification_id column. Asking for one
          // failed the whole query, so every inbox row lost its Student 360
          // link, its cohort and its college name. The qualification comes
          // from the learner's course instead.
          .select('id, user_id, name, cohort_id, course_id')
          .in('user_id', ids),
        supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', ids),
      ]);

      const csRows = (csRes.data ?? []) as Array<{
        id: string;
        user_id: string;
        name: string | null;
        cohort_id: string | null;
        course_id: string | null;
      }>;
      const courseIds = Array.from(
        new Set(csRows.map((r) => r.course_id).filter((c): c is string => Boolean(c)))
      );
      const qualByCourse = new Map<string, string | null>();
      if (courseIds.length > 0) {
        const { data: courses } = await supabase
          .from('college_courses')
          .select('id, qualification_id')
          .in('id', courseIds);
        for (const c of (courses ?? []) as Array<{ id: string; qualification_id: string | null }>) {
          qualByCourse.set(c.id, c.qualification_id);
        }
      }

      const nameByUid = new Map<string, string>();
      const csIdByUid = new Map<string, string>();
      const cohortIdByUid = new Map<string, string | null>();
      const qualByUid = new Map<string, string | null>();
      for (const row of csRows) {
        if (row.name) nameByUid.set(row.user_id, row.name);
        csIdByUid.set(row.user_id, row.id);
        cohortIdByUid.set(row.user_id, row.cohort_id ?? null);
        qualByUid.set(row.user_id, row.course_id ? (qualByCourse.get(row.course_id) ?? null) : null);
      }
      for (const p of (profilesRes.data ?? []) as Array<{ id: string; full_name: string | null }>) {
        if (!nameByUid.has(p.id) && p.full_name) nameByUid.set(p.id, p.full_name);
      }

      // Resolve cohort names in a second batch.
      const cohortIds = Array.from(
        new Set(csRows.map((r) => r.cohort_id).filter((c): c is string => Boolean(c)))
      );
      const cohortNameById = new Map<string, string>();
      if (cohortIds.length > 0) {
        const { data: cohorts } = await supabase
          .from('college_cohorts')
          .select('id, name')
          .in('id', cohortIds);
        for (const c of (cohorts ?? []) as Array<{ id: string; name: string | null }>) {
          if (c.name) cohortNameById.set(c.id, c.name);
        }
      }

      const hydrated: InboxRow[] = entryRows.map((r) => {
        const cohortId = cohortIdByUid.get(r.student_id) ?? null;
        return {
          id: r.id,
          student_id: r.student_id,
          college_student_row_id: csIdByUid.get(r.student_id) ?? null,
          student_name: nameByUid.get(r.student_id) ?? null,
          cohort_name: cohortId ? (cohortNameById.get(cohortId) ?? null) : null,
          qualification_id: qualByUid.get(r.student_id) ?? null,
          activity_date: r.activity_date,
          activity_type: r.activity_type,
          title: r.title,
          description: r.description,
          duration_minutes: r.duration_minutes,
          unit_codes: r.unit_codes,
          evidence_url: r.evidence_url,
          evidence_urls: r.evidence_urls,
          in_working_hours: r.in_working_hours ?? null,
          outside_hours_compensated: r.outside_hours_compensated ?? null,
          source_kind: r.source_kind,
          verification_status: r.verification_status,
          created_at: r.created_at,
        };
      });

      setRows(hydrated);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [tutorUid, scope, staffCollegeId, scopeKey, collegeScope.ready]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Realtime — any new apprentice_submitted insert in this college bumps
  // the inbox. Filter is broad on purpose: a verify on one row shouldn't
  // need to know which staff is watching.
  useEffect(() => {
    if (!staffCollegeId) return;
    const chan = supabase
      .channel(realtimeChannelName(`tutor_otj_inbox:${staffCollegeId}`))
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'college_otj_entries',
          filter: `college_id=eq.${staffCollegeId}`,
        },
        () => fetchAll()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(chan);
    };
  }, [staffCollegeId, fetchAll]);

  const verify = useCallback(
    async (id: string) => {
      // Optimistic — drop the row immediately so the inbox shrinks.
      setRows((prev) => prev.filter((r) => r.id !== id));
      const errMsg = await callOtjStatusEdgeFn(id, 'verify');
      if (errMsg) {
        toast({
          title: 'Could not verify',
          description: errMsg,
          variant: 'destructive',
        });
        await fetchAll();
      }
    },
    [fetchAll, toast]
  );

  const reject = useCallback(
    async (id: string, rationale: string) => {
      const trimmed = rationale.trim();
      if (!trimmed) return;
      setRows((prev) => prev.filter((r) => r.id !== id));
      const errMsg = await callOtjStatusEdgeFn(id, 'reject', trimmed);
      if (errMsg) {
        toast({
          title: 'Could not return for more info',
          description: errMsg,
          variant: 'destructive',
        });
        await fetchAll();
      }
    },
    [fetchAll, toast]
  );

  // Bulk verify — iterates sequentially so the per-row edge fn is hit one
  // at a time. Rows drop optimistically as each succeeds. Returns counts
  // so the caller can toast a single summary.
  const bulkVerify = useCallback(
    async (ids: string[]) => {
      let ok = 0;
      let failed = 0;
      for (const id of ids) {
        setRows((prev) => prev.filter((r) => r.id !== id));
        const errMsg = await callOtjStatusEdgeFn(id, 'verify');
        if (errMsg) failed += 1;
        else ok += 1;
      }
      if (failed > 0) await fetchAll();
      return { ok, failed };
    },
    [fetchAll]
  );

  // Bulk reject — same loop with a shared rationale. Empty rationale =
  // no-op (every reject needs a reason so the apprentice knows what to fix).
  const bulkReject = useCallback(
    async (ids: string[], rationale: string) => {
      const trimmed = rationale.trim();
      if (!trimmed) return { ok: 0, failed: ids.length };
      let ok = 0;
      let failed = 0;
      for (const id of ids) {
        setRows((prev) => prev.filter((r) => r.id !== id));
        const errMsg = await callOtjStatusEdgeFn(id, 'reject', trimmed);
        if (errMsg) failed += 1;
        else ok += 1;
      }
      if (failed > 0) await fetchAll();
      return { ok, failed };
    },
    [fetchAll]
  );

  return useMemo(
    () => ({
      rows,
      loading,
      error,
      staffCollegeId,
      scope,
      setScope,
      effectiveScope: scope === 'mine' && fellBackToCollege ? 'college' : scope,
      fellBackToCollege: scope === 'mine' && fellBackToCollege,
      verify,
      reject,
      bulkVerify,
      bulkReject,
      refresh: fetchAll,
    }),
    [
      rows,
      loading,
      error,
      staffCollegeId,
      scope,
      setScope,
      fellBackToCollege,
      verify,
      reject,
      bulkVerify,
      bulkReject,
      fetchAll,
    ]
  );
}
