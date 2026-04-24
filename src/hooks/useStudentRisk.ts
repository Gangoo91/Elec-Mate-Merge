import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface RiskFactor {
  key: string;
  label: string;
  severity: number;
  detail?: string;
}

export interface StudentRiskRow {
  student_id: string;
  score: number;
  level: 'low' | 'medium' | 'high' | 'critical';
  factors: RiskFactor[];
  computed_at: string;
}

/**
 * Load current (is_current=true) risk scores for a set of students.
 * Returns a Map<student_id, row> for quick lookup by the calling component.
 */
export function useCurrentRiskForStudents(studentIds: string[]): {
  byStudent: Map<string, StudentRiskRow>;
  loading: boolean;
  refresh: () => Promise<void>;
} {
  const [byStudent, setByStudent] = useState<Map<string, StudentRiskRow>>(new Map());
  const [loading, setLoading] = useState(false);

  const ids = studentIds.slice().sort().join(',');

  const load = useCallback(async () => {
    if (studentIds.length === 0) {
      setByStudent(new Map());
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from('student_risk_scores')
      .select('student_id, score, level, factors, computed_at')
      .in('student_id', studentIds)
      .eq('is_current', true);
    const next = new Map<string, StudentRiskRow>();
    for (const row of (data ?? []) as unknown as StudentRiskRow[]) {
      next.set(row.student_id, row);
    }
    setByStudent(next);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  useEffect(() => {
    load();
  }, [load]);

  return { byStudent, loading, refresh: load };
}

/**
 * Trigger an on-demand recompute of risk scores for the caller's college
 * (or a specific set of students). Returns a loading flag + runner.
 */
/**
 * Trigger a sync that seeds student_ac_coverage rows for every AC in each
 * student's course qualification. Safe to run repeatedly — existing rows are
 * preserved, only missing rows are inserted.
 */
export function useSyncAcCoverage() {
  const [running, setRunning] = useState(false);
  const { toast } = useToast();

  const sync = useCallback(
    async (opts?: { student_ids?: string[] }) => {
      setRunning(true);
      try {
        const session = await supabase.auth.getSession();
        const token = session.data.session?.access_token;
        if (!token) throw new Error('Not signed in');

        const res = await fetch(
          'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/sync-student-ac-coverage',
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ student_ids: opts?.student_ids }),
          }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
        const body = await res.json();
        toast({
          title: 'AC coverage synced',
          description: `${body.seeded ?? 0} new row${body.seeded === 1 ? '' : 's'} seeded across ${body.students ?? 0} learner${body.students === 1 ? '' : 's'}.`,
        });
        return body;
      } catch (e) {
        toast({
          title: 'Could not sync coverage',
          description: (e as Error).message,
          variant: 'destructive',
        });
        throw e;
      } finally {
        setRunning(false);
      }
    },
    [toast]
  );

  return { sync, running };
}

export function useRecomputeRisk() {
  const [running, setRunning] = useState(false);
  const { toast } = useToast();

  const recompute = useCallback(
    async (opts?: { student_ids?: string[] }) => {
      setRunning(true);
      try {
        const session = await supabase.auth.getSession();
        const token = session.data.session?.access_token;
        if (!token) throw new Error('Not signed in');

        const res = await fetch(
          'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/compute-student-risk',
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ student_ids: opts?.student_ids ?? undefined }),
          }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
        const body = await res.json();
        toast({
          title: 'Risk refreshed',
          description: `${body.processed ?? 0} learner${body.processed === 1 ? '' : 's'} scored.`,
        });
        return body;
      } catch (e) {
        toast({
          title: 'Could not refresh risk',
          description: (e as Error).message,
          variant: 'destructive',
        });
        throw e;
      } finally {
        setRunning(false);
      }
    },
    [toast]
  );

  return { recompute, running };
}
