import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useFunctionalSkills — FS Maths + English tracking per learner.
   ELE-933 (K1).
   ========================================================================== */

export type FsSubject = 'maths' | 'english';
export type FsLevel = 'entry_1' | 'entry_2' | 'entry_3' | 'level_1' | 'level_2';
export type FsStatus =
  | 'exempt'
  | 'not_started'
  | 'in_progress'
  | 'pending_results'
  | 'passed'
  | 'failed'
  | 'resit';

export interface FsRecord {
  id: string;
  college_id: string;
  student_id: string;
  subject: FsSubject;
  level: FsLevel | null;
  status: FsStatus;
  exemption_reason: string | null;
  awarding_body: string | null;
  exam_date: string | null;
  result_date: string | null;
  result_score: number | null;
  certificate_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface FsGatewayStatus {
  student_id: string;
  college_id: string;
  name: string;
  maths_status: FsStatus;
  english_status: FsStatus;
  maths_level: FsLevel;
  english_level: FsLevel;
  fs_gateway_clear: boolean;
  latest_exam_date: string | null;
}

export function useFunctionalSkills(studentId: string | null | undefined) {
  const [records, setRecords] = useState<FsRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    if (!studentId) {
      setRecords([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: qErr } = await supabase
        .from('college_functional_skills')
        .select('*')
        .eq('student_id', studentId);
      if (qErr) throw qErr;
      setRecords((data ?? []) as FsRecord[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  const upsert = useCallback(
    async (subject: FsSubject, patch: Partial<FsRecord>) => {
      if (!studentId) return;
      const existing = records.find((r) => r.subject === subject);
      if (existing) {
        const { error: updErr } = await supabase
          .from('college_functional_skills')
          .update(patch)
          .eq('id', existing.id);
        if (updErr) throw updErr;
      } else {
        // Need college_id from student
        const { data: s } = await supabase
          .from('college_students')
          .select('college_id')
          .eq('id', studentId)
          .maybeSingle();
        const collegeId = (s as { college_id?: string } | null)?.college_id;
        if (!collegeId) throw new Error('Student college not resolved');
        const { error: insErr } = await supabase.from('college_functional_skills').insert({
          college_id: collegeId,
          student_id: studentId,
          subject,
          ...patch,
        });
        if (insErr) throw insErr;
      }
      await fetchAll();
    },
    [studentId, records, fetchAll]
  );

  return { records, loading, error, upsert, refetch: fetchAll };
}

export function useFsGatewayCohort(cohortId: string | null | undefined) {
  const [rows, setRows] = useState<FsGatewayStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    if (!cohortId) {
      setRows([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Get student ids from cohort first
      const { data: students } = await supabase
        .from('college_students')
        .select('id')
        .eq('cohort_id', cohortId);
      const ids = (students ?? []).map((s: any) => s.id);
      if (ids.length === 0) {
        setRows([]);
        return;
      }
      const { data, error: qErr } = await supabase
        .from('college_fs_gateway_status')
        .select('*')
        .in('student_id', ids);
      if (qErr) throw qErr;
      setRows((data ?? []) as FsGatewayStatus[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [cohortId]);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  return { rows, loading, error, refetch: fetchAll };
}
