import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useStaffCpdEntries — list, create, delete CPD entries for one staff member.
   Realtime-subscribed so external changes (e.g. another tutor logging on
   their phone) reflect live in the open sheet.
   ========================================================================== */

export interface CpdEntry {
  id: string;
  college_staff_id: string;
  year_covered: number;
  activity_date: string;
  activity_type: string;
  hours: number;
  title: string;
  reflection: string | null;
  evidence_path: string | null;
  created_at: string;
}

export interface NewCpdEntry {
  activity_date: string;
  activity_type: string;
  hours: number;
  title: string;
  reflection?: string | null;
  evidence_path?: string | null;
}

const COLS =
  'id, college_staff_id, year_covered, activity_date, activity_type, hours, title, reflection, evidence_path, created_at';

export function useStaffCpdEntries(staffId: string | null) {
  const [entries, setEntries] = useState<CpdEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!staffId) {
      setEntries([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('staff_cpd_entries')
      .select(COLS)
      .eq('college_staff_id', staffId)
      .order('activity_date', { ascending: false });
    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    setEntries((data ?? []) as CpdEntry[]);
    setLoading(false);
  }, [staffId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    if (!staffId) return;
    const channel = supabase
      .channel(`cpd_entries:${staffId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'staff_cpd_entries',
          filter: `college_staff_id=eq.${staffId}`,
        },
        () => fetch()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [staffId, fetch]);

  const create = useCallback(
    async (entry: NewCpdEntry) => {
      if (!staffId) throw new Error('No staff id');
      const userRes = await supabase.auth.getUser();
      const userId = userRes.data.user?.id ?? null;
      const yearCovered = new Date(entry.activity_date).getFullYear();
      const { error: insErr } = await supabase.from('staff_cpd_entries').insert({
        college_staff_id: staffId,
        year_covered: yearCovered,
        activity_date: entry.activity_date,
        activity_type: entry.activity_type,
        hours: entry.hours,
        title: entry.title,
        reflection: entry.reflection ?? null,
        evidence_path: entry.evidence_path ?? null,
        created_by: userId,
      });
      if (insErr) throw insErr;
    },
    [staffId]
  );

  const remove = useCallback(async (id: string, evidence_path?: string | null) => {
    const { error: delErr } = await supabase.from('staff_cpd_entries').delete().eq('id', id);
    if (delErr) throw delErr;
    if (evidence_path) {
      await supabase.storage.from('compliance-evidence').remove([evidence_path]);
    }
  }, []);

  return { entries, loading, error, refresh: fetch, create, remove };
}
