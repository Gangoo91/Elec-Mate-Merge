/* ==========================================================================
   useHoursStatementBasis — ELE-2044. What the end-of-programme hours
   statement compares: eligible ACTUAL hours against PLANNED hours.

   Funding rules 2026/27 paras 96–98 (2025/26 92–94): a statement signed by the
   employer and apprentice is needed when the actual off-the-job hours
   delivered are fewer than the hours planned, in the evidence pack within 12
   weeks of completion.

   ELE-2037 (does app-tracked learning count as off-the-job?) is undecided, so
   "actual" is VERIFIED hours (college-verified + employer-attested). App time
   is returned as its own figure and never added in.
   ========================================================================== */
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface HoursStatementBasis {
  planned_hours: number | null;
  planned_source: string | null;
  verified_hours: number;
  employer_attested_hours: number | null;
  college_verified_hours: number | null;
  app_tracked_hours: number;
  shortfall_hours: number | null;
  end_date: string | null;
  ended: boolean;
  statement_due_by: string | null;
  elapsed_pct: number | null;
  planned_by_now: number | null;
  warn_80: boolean;
  statement_needed: boolean;
}

export function useHoursStatementBasis(userId: string | null | undefined) {
  const [data, setData] = useState<HoursStatementBasis | null>(null);
  const refresh = useCallback(async () => {
    if (!userId) return;
    const { data: d, error } = await supabase.rpc(
      'get_hours_statement_basis' as never,
      { p_user: userId } as never
    );
    if (!error) setData((d as unknown as HoursStatementBasis | null) ?? null);
  }, [userId]);
  useEffect(() => {
    void refresh();
  }, [refresh]);
  return { data, refresh };
}

export const PLANNED_SOURCE_LABEL: Record<string, string> = {
  training_plan: 'the training plan in force',
  learner_record: 'the learner record',
  course: 'the course',
  self_set: 'the learner',
};
