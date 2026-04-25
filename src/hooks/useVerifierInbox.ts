import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useVerifierInbox — list of records awaiting verification, plus an
   `approve` action that signs them off (sets verified_by/at and recomputes
   status from dates).
   ========================================================================== */

export interface InboxRow {
  id: string;
  college_staff_id: string;
  staff_name: string;
  staff_role: string;
  requirement_code: string;
  requirement_label: string;
  requirement_category: string;
  issued_at: string | null;
  expires_at: string | null;
  reference_no: string | null;
  evidence_path: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface RecordRow {
  id: string;
  college_staff_id: string;
  requirement_code: string;
  issued_at: string | null;
  expires_at: string | null;
  reference_no: string | null;
  evidence_path: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  college_staff: { name: string; role: string } | null;
  compliance_requirement_types: { label: string; category: string } | null;
}

function deriveStatus(expires_at: string | null): 'valid' | 'expiring' | 'expired' {
  if (!expires_at) return 'valid';
  const exp = new Date(expires_at);
  const today = new Date();
  exp.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const days = Math.round((exp.getTime() - today.getTime()) / 86_400_000);
  if (days < 0) return 'expired';
  if (days <= 60) return 'expiring';
  return 'valid';
}

export function useVerifierInbox(enabled: boolean) {
  const [rows, setRows] = useState<InboxRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!enabled) {
      setRows([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    const { data, error: err } = await supabase
      .from('staff_compliance_records')
      .select(
        'id, college_staff_id, requirement_code, issued_at, expires_at, reference_no, evidence_path, notes, created_at, updated_at, college_staff(name, role), compliance_requirement_types(label, category)'
      )
      .eq('status', 'pending_verification')
      .order('updated_at', { ascending: false });

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    const mapped: InboxRow[] = ((data ?? []) as unknown as RecordRow[])
      .filter((r) => r.college_staff !== null) // archived staff filtered by RLS-impl
      .map((r) => ({
        id: r.id,
        college_staff_id: r.college_staff_id,
        staff_name: r.college_staff?.name ?? 'Unknown',
        staff_role: r.college_staff?.role ?? '',
        requirement_code: r.requirement_code,
        requirement_label: r.compliance_requirement_types?.label ?? r.requirement_code,
        requirement_category: r.compliance_requirement_types?.category ?? 'statutory',
        issued_at: r.issued_at,
        expires_at: r.expires_at,
        reference_no: r.reference_no,
        evidence_path: r.evidence_path,
        notes: r.notes,
        created_at: r.created_at,
        updated_at: r.updated_at,
      }));
    setRows(mapped);
    setLoading(false);
  }, [enabled]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  // Realtime — any change to staff_compliance_records refetches
  useEffect(() => {
    if (!enabled) return;
    const channel = supabase
      .channel('verifier_inbox')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'staff_compliance_records' },
        () => fetch()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [enabled, fetch]);

  const approve = useCallback(
    async (recordId: string) => {
      const row = rows.find((r) => r.id === recordId);
      if (!row) throw new Error('Record not found');

      const userRes = await supabase.auth.getUser();
      const userId = userRes.data.user?.id ?? null;
      const status = deriveStatus(row.expires_at);

      const { error: updErr } = await supabase
        .from('staff_compliance_records')
        .update({
          status,
          verified_by: userId,
          verified_at: new Date().toISOString(),
        })
        .eq('id', recordId);
      if (updErr) throw updErr;
    },
    [rows]
  );

  const reject = useCallback(async (recordId: string, reason: string) => {
    // For now, "reject" appends a note and clears the issued/expires dates so
    // the record drops back to status='pending' (data missing). The audit
    // trigger captures the change.
    const userRes = await supabase.auth.getUser();
    const userId = userRes.data.user?.id ?? null;
    const stamp = `\n\n[Returned ${new Date().toISOString().slice(0, 10)} by verifier]: ${reason}`;
    const { data: existing } = await supabase
      .from('staff_compliance_records')
      .select('notes')
      .eq('id', recordId)
      .maybeSingle();
    const existingNotes = (existing?.notes as string | null) ?? '';
    const { error: updErr } = await supabase
      .from('staff_compliance_records')
      .update({
        notes: (existingNotes + stamp).trim(),
        status: 'pending',
        verified_by: null,
        verified_at: null,
        // keep evidence + reference_no so user can amend rather than re-upload
      })
      .eq('id', recordId);
    if (updErr) throw updErr;
    void userId;
  }, []);

  return { rows, loading, error, refresh: fetch, approve, reject };
}
