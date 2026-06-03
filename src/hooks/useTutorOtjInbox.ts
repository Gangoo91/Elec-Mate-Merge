import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

/* ==========================================================================
   useTutorOtjInbox — cohort-level OTJ verification inbox.

   Lists every pending apprentice_submitted OTJ entry for learners that the
   signed-in tutor (or assessor / IQA) is assigned to via
   college_student_assignments. Includes verify / reject actions and bulk
   refresh. Realtime — when a learner submits a new OTJ entry it appears
   here without refresh.

   The `scope` argument lets staff toggle "assigned to me" (default) vs
   "everyone in my college" — helpful for heads of department.
   ========================================================================== */

export type InboxScope = 'mine' | 'college';

/**
 * Server-side verify/reject — the edge fn updates college_otj_entries
 * AND fires the apprentice push in one round-trip. Returns null on
 * success or an error message for the toast.
 */
async function callOtjStatusEdgeFn(
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
}

export interface TutorOtjInbox {
  rows: InboxRow[];
  loading: boolean;
  error: string | null;
  staffCollegeId: string | null;
  scope: InboxScope;
  setScope: (s: InboxScope) => void;
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
  const [scope, setScope] = useState<InboxScope>('mine');
  const [rows, setRows] = useState<InboxRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      if (scope === 'mine') {
        const { data: assignments, error: aErr } = await supabase
          .from('college_student_assignments')
          .select('student_id')
          .or(`tutor_id.eq.${tutorUid},assessor_id.eq.${tutorUid},iqa_id.eq.${tutorUid}`);
        if (aErr) throw aErr;
        const studentIds = ((assignments ?? []) as Array<{ student_id: string }>).map(
          (r) => r.student_id
        );
        if (studentIds.length === 0) {
          setRows([]);
          setLoading(false);
          return;
        }
        // student_id on assignments is college_students.id — but
        // college_otj_entries.student_id is auth.uid. Resolve.
        const { data: students } = await supabase
          .from('college_students')
          .select('user_id')
          .in('id', studentIds);
        studentAuthUids = ((students ?? []) as Array<{ user_id: string | null }>)
          .map((r) => r.user_id)
          .filter((u): u is string => Boolean(u));
      } else {
        // College-wide: pull every college_students.user_id in this college
        if (!staffCollegeId) {
          setRows([]);
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

      if (studentAuthUids.length === 0) {
        setRows([]);
        setLoading(false);
        return;
      }

      // 2. Pull pending apprentice_submitted entries for those students.
      const { data: entries, error: eErr } = await supabase
        .from('college_otj_entries')
        .select(
          'id, student_id, activity_date, activity_type, title, description, duration_minutes, unit_codes, evidence_url, evidence_urls, source_kind, verification_status, created_at'
        )
        .in('student_id', studentAuthUids)
        .eq('source_kind', 'apprentice_submitted')
        .eq('verification_status', 'pending')
        .order('created_at', { ascending: true })
        .limit(200);
      if (eErr) throw eErr;

      const entryRows = (entries ?? []) as Array<{
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
          .select('id, user_id, name, cohort_id, qualification_id')
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
        qualification_id: string | null;
      }>;

      const nameByUid = new Map<string, string>();
      const csIdByUid = new Map<string, string>();
      const cohortIdByUid = new Map<string, string | null>();
      const qualByUid = new Map<string, string | null>();
      for (const row of csRows) {
        if (row.name) nameByUid.set(row.user_id, row.name);
        csIdByUid.set(row.user_id, row.id);
        cohortIdByUid.set(row.user_id, row.cohort_id ?? null);
        qualByUid.set(row.user_id, row.qualification_id);
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
  }, [tutorUid, scope, staffCollegeId]);

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
      verify,
      reject,
      bulkVerify,
      bulkReject,
      fetchAll,
    ]
  );
}
