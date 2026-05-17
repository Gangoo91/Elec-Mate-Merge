import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

/* ==========================================================================
   useStudentOtjVerification — tutor-side hook for verifying or rejecting
   apprentice-submitted OTJ entries on Student 360.

   Reads college_otj_entries for the given studentUserId (auth.users.id ==
   college_otj_entries.student_id), buckets by source_kind, and exposes:
     - pending_apprentice: entries needing tutor sign-off
     - rejected_apprentice: returned entries the apprentice should resubmit
     - by_source_kind: minute totals per source kind (for tri-source pane)
     - verify(id) / reject(id, rationale)
   ========================================================================== */

export type VerificationStatus =
  | 'pending'
  | 'verified'
  | 'rejected'
  | 'verified_by_employer';

export type SourceKind =
  | 'in_app'
  | 'apprentice_submitted'
  | 'tutor_recorded'
  | 'employer_attested';

export interface OtjEntryRow {
  id: string;
  activity_date: string;
  activity_type: string;
  title: string;
  description: string | null;
  duration_minutes: number;
  source_kind: SourceKind;
  verification_status: VerificationStatus;
  verification_rationale: string | null;
  verified_at: string | null;
  recorded_by_name_snapshot: string | null;
  evidence_url: string | null;
  evidence_urls: string[] | null;
  unit_codes: string[] | null;
  created_at: string | null;
  attested_by_name: string | null;
  attestation_email: string | null;
  attestation_comment: string | null;
}

export interface OtjVerificationStats {
  verified_minutes: number;
  pending_minutes: number;
  rejected_minutes: number;
  this_week_minutes: number;
  total_minutes: number;
  by_source_kind: Record<
    SourceKind,
    { minutes: number; entries: number; verified_minutes: number }
  >;
}

const ZERO_STATS: OtjVerificationStats = {
  verified_minutes: 0,
  pending_minutes: 0,
  rejected_minutes: 0,
  this_week_minutes: 0,
  total_minutes: 0,
  by_source_kind: {
    in_app: { minutes: 0, entries: 0, verified_minutes: 0 },
    apprentice_submitted: { minutes: 0, entries: 0, verified_minutes: 0 },
    tutor_recorded: { minutes: 0, entries: 0, verified_minutes: 0 },
    employer_attested: { minutes: 0, entries: 0, verified_minutes: 0 },
  },
};

/**
 * POST to the notify-otj-status edge fn — it handles the UPDATE and the
 * apprentice push in one server-side step. Returns null on success, or
 * a human-readable error string for the toast.
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

function startOfThisWeekIso(): string {
  const now = new Date();
  const dayUtc = now.getUTCDay();
  const diffToMonday = (dayUtc + 6) % 7;
  const monday = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() - diffToMonday,
      0,
      0,
      0,
      0
    )
  );
  return monday.toISOString();
}

export interface StudentOtjVerification {
  rows: OtjEntryRow[];
  pending_apprentice: OtjEntryRow[];
  rejected_apprentice: OtjEntryRow[];
  stats: OtjVerificationStats;
  loading: boolean;
  error: string | null;
  verify: (id: string) => Promise<void>;
  reject: (id: string, rationale: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useStudentOtjVerification(
  studentUserId: string | null
): StudentOtjVerification {
  const [rows, setRows] = useState<OtjEntryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchAll = useCallback(async () => {
    if (!studentUserId) {
      setRows([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('college_otj_entries')
      .select(
        'id, activity_date, activity_type, title, description, duration_minutes, source_kind, verification_status, verification_rationale, verified_at, recorded_by_name_snapshot, evidence_url, evidence_urls, unit_codes, created_at, attested_by_name, attestation_email, attestation_comment'
      )
      .eq('student_id', studentUserId)
      .order('activity_date', { ascending: false })
      .limit(200);
    if (err) setError(err.message);
    setRows((data ?? []) as OtjEntryRow[]);
    setLoading(false);
  }, [studentUserId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Realtime — keeps the verification panel current as the apprentice
  // submits / resubmits.
  useEffect(() => {
    if (!studentUserId) return;
    const chan = supabase
      .channel(`student_otj_verify:${studentUserId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'college_otj_entries',
          filter: `student_id=eq.${studentUserId}`,
        },
        () => fetchAll()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(chan);
    };
  }, [studentUserId, fetchAll]);

  const verify = useCallback(
    async (id: string) => {
      // Optimistic — flip status locally so the row drops out of pending.
      setRows((prev) =>
        prev.map((r) =>
          r.id === id
            ? {
                ...r,
                verification_status: 'verified' as VerificationStatus,
                verified_at: new Date().toISOString(),
                verification_rationale: null,
              }
            : r
        )
      );
      // Call the edge fn — it handles the UPDATE + push notification.
      const errMsg = await callOtjStatusEdgeFn(id, 'verify');
      if (errMsg) {
        setError(errMsg);
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
      setRows((prev) =>
        prev.map((r) =>
          r.id === id
            ? {
                ...r,
                verification_status: 'rejected' as VerificationStatus,
                verification_rationale: trimmed,
                verified_at: null,
              }
            : r
        )
      );
      const errMsg = await callOtjStatusEdgeFn(id, 'reject', trimmed);
      if (errMsg) {
        setError(errMsg);
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

  const stats = useMemo<OtjVerificationStats>(() => {
    if (rows.length === 0) return ZERO_STATS;
    const sinceWeek = startOfThisWeekIso();
    const stats: OtjVerificationStats = {
      verified_minutes: 0,
      pending_minutes: 0,
      rejected_minutes: 0,
      this_week_minutes: 0,
      total_minutes: 0,
      by_source_kind: {
        in_app: { minutes: 0, entries: 0, verified_minutes: 0 },
        apprentice_submitted: { minutes: 0, entries: 0, verified_minutes: 0 },
        tutor_recorded: { minutes: 0, entries: 0, verified_minutes: 0 },
        employer_attested: { minutes: 0, entries: 0, verified_minutes: 0 },
      },
    };
    for (const r of rows) {
      const m = r.duration_minutes ?? 0;
      stats.total_minutes += m;
      const kindBucket = stats.by_source_kind[r.source_kind];
      if (kindBucket) {
        kindBucket.minutes += m;
        kindBucket.entries += 1;
      }
      if (
        r.verification_status === 'verified' ||
        r.verification_status === 'verified_by_employer'
      ) {
        stats.verified_minutes += m;
        if (kindBucket) kindBucket.verified_minutes += m;
      } else if (r.verification_status === 'pending') {
        stats.pending_minutes += m;
      } else if (r.verification_status === 'rejected') {
        stats.rejected_minutes += m;
      }
      const at = r.activity_date ? `${r.activity_date}T12:00:00Z` : null;
      if (at && at >= sinceWeek) stats.this_week_minutes += m;
    }
    return stats;
  }, [rows]);

  const pending_apprentice = useMemo(
    () =>
      rows.filter(
        (r) =>
          r.source_kind === 'apprentice_submitted' &&
          r.verification_status === 'pending'
      ),
    [rows]
  );

  const rejected_apprentice = useMemo(
    () =>
      rows.filter(
        (r) =>
          r.source_kind === 'apprentice_submitted' &&
          r.verification_status === 'rejected'
      ),
    [rows]
  );

  return useMemo(
    () => ({
      rows,
      pending_apprentice,
      rejected_apprentice,
      stats,
      loading,
      error,
      verify,
      reject,
      refresh: fetchAll,
    }),
    [rows, pending_apprentice, rejected_apprentice, stats, loading, error, verify, reject, fetchAll]
  );
}
