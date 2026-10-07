import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useOtjSummary — THE off-the-job figure (ELE-1877).

   One SQL function, get_otj_summary, so the learner, their tutor and their
   employer read the same numbers.

   counted_hours = verified + app learning. Time the app records while an
   apprentice learns (Study Centre, mock exams, flashcards, quizzes, revision,
   videos, the AM2 and EPA simulators) counts towards their hours — Andrew's
   decision, 6 Oct 2026, reversing ELE-1711. It stays labelled by source, and
   a tutor approves it from the cohort hours page, which turns it into
   verified time with their name on it.

   userId: the learner's auth uid. Omit for the signed-in learner.
   ========================================================================== */

export type OtjRisk = 'on_track' | 'slightly_behind' | 'behind' | 'unknown';

export interface OtjSummary {
  user_id: string;
  college_student_id: string | null;
  required_hours: number | null;
  required_source: 'learner_record' | 'course' | 'self_set' | 'not_set';
  start_date: string | null;
  end_date: string | null;
  planned_to_date_hours: number | null;
  /** Verified hours plus app learning not yet approved. The headline figure. */
  counted_hours: number;
  /** Verified by a tutor (including approved app learning) or employer-attested. */
  verified_hours: number;
  /** Part of verified_hours confirmed by the apprentice's firm (ELE-2011). */
  employer_attested_hours?: number;
  /** Part of verified_hours verified by a tutor or assessor (ELE-2011). */
  college_verified_hours?: number;
  /** App learning recorded and counting, not yet approved by a tutor. */
  app_learning_hours: number;
  app_learning_this_week_hours: number;
  app_learning_last_30_days_hours: number;
  /** Site diary / work activities sent to a tutor and waiting. Not counted yet. */
  pending_hours: number;
  rejected_entries: number;
  diary_logged_hours: number;
  /** Null until four weeks into the programme: too early to judge a pace. */
  weekly_pace_hours: number | null;
  forecast_at_end_hours: number | null;
  weekly_needed_hours: number | null;
  risk: OtjRisk;
}

export function useOtjSummary(userId?: string | null) {
  const [data, setData] = useState<OtjSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (userId === null) {
      setData(null);
      setLoading(false);
      return;
    }
    setError(null);
    const { data: row, error: err } = await supabase.rpc(
      'get_otj_summary' as never,
      (userId ? { p_user: userId } : {}) as never
    );
    if (err) {
      setError(err.message);
      setData(null);
    } else {
      setData(row as unknown as OtjSummary);
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    setLoading(true);
    void refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

/* ── Tutor side: the cohort hours page ─────────────────────────────────── */

export interface CollegeOtjRow {
  college_student_id: string;
  user_id: string;
  name: string;
  cohort_id: string | null;
  cohort_name: string | null;
  summary: OtjSummary;
  /** Hours of app learning in the last 30 days, by area. */
  areas_30_days: Record<string, number>;
  unapproved_app_hours: number;
  last_learning_at: string | null;
  /** Latest counted off-the-job activity of any kind. */
  last_training_at: string | null;
  /** Funding rules para 89: some off-the-job training every calendar month. */
  trained_this_month: boolean;
}

export async function fetchCollegeOtj(cohortId?: string | null): Promise<CollegeOtjRow[]> {
  const { data, error } = await supabase.rpc(
    'get_college_otj' as never,
    (cohortId ? { p_cohort: cohortId } : {}) as never
  );
  if (error) throw error;
  return (data as unknown as CollegeOtjRow[]) ?? [];
}

export interface AppLearningDay {
  day: string;
  minutes: number;
  time_entry_ids: string[];
  activities: Array<{ area: string; activity: string; minutes: number }>;
}

export async function fetchLearnerAppDays(userId: string): Promise<AppLearningDay[]> {
  const { data, error } = await supabase.rpc(
    'get_learner_app_days' as never,
    { p_user: userId } as never
  );
  if (error) throw error;
  return (data as unknown as AppLearningDay[]) ?? [];
}

export interface ApproveResult {
  success?: boolean;
  /** The verified in_app entries created, so the decision can be undone. */
  entry_ids?: string[];
  learners?: number;
  entries?: number;
  hours?: number;
  skipped?: number;
  error?: string;
}

/** Approve app learning for one or many learners: everything up to today,
 *  or exactly the given time entries. */
export async function approveAppLearning(
  userIds: string[],
  timeEntryIds?: string[]
): Promise<ApproveResult> {
  const { data, error } = await supabase.rpc(
    'approve_app_learning' as never,
    {
      p_users: userIds,
      ...(timeEntryIds ? { p_time_entry_ids: timeEntryIds } : {}),
    } as never
  );
  if (error) return { error: error.message };
  return data as unknown as ApproveResult;
}

/* ── App learning by day and by area (hub chart, Student 360) ───────────── */

export interface AppLearningBreakdown {
  since: string;
  days: Array<{ day: string; minutes: number }>;
  areas: Array<{ area: string; minutes: number }>;
  approved_minutes: number;
  /** Quiz and mock minutes (timed per attempt, never overlapping tracker time). Included in days/areas/total. */
  quiz_minutes?: number;
  /** Of those, minutes the apprentice has confirmed onto their hours. */
  quiz_confirmed_minutes?: number;
  total_minutes: number;
}

export function useAppLearningBreakdown(userId?: string | null, days = 30) {
  const [data, setData] = useState<AppLearningBreakdown | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (userId === null) {
      setData(null);
      setLoading(false);
      return;
    }
    const { data: row, error } = await supabase.rpc(
      'get_app_learning_breakdown' as never,
      { ...(userId ? { p_user: userId } : {}), p_days: days } as never
    );
    setData(error ? null : (row as unknown as AppLearningBreakdown));
    setLoading(false);
  }, [userId, days]);

  useEffect(() => {
    setLoading(true);
    void refresh();
  }, [refresh]);

  return { data, loading, refresh };
}

/* ── Planned-versus-actual hours statement (ELE-1878, funding rules 92–94) ── */

export interface OtjHoursStatement {
  id: string;
  user_id: string;
  planned_hours: number;
  minimum_hours: number | null;
  rpl_hours: number;
  actual_hours: number;
  verified_hours: number;
  app_learning_hours: number;
  minimum_met: boolean;
  reason: string;
  prepared_by_name: string | null;
  prepared_at: string;
  learner_signed_name: string | null;
  learner_signed_at: string | null;
  employer_signed_name: string | null;
  employer_signed_role: string | null;
  employer_company: string | null;
  employer_signed_at: string | null;
}

/** The learner's current statement (newest, not superseded), or null. */
export function useOtjHoursStatement(userId: string | null | undefined) {
  const [data, setData] = useState<OtjHoursStatement | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!userId) {
      setData(null);
      setLoading(false);
      return;
    }
    const { data: row } = await supabase
      .from('otj_hours_statements' as never)
      // employer_token is not selectable by any client: a learner holding it
      // could sign the employer's half. Staff fetch the link by RPC.
      .select(
        'id, user_id, planned_hours, minimum_hours, rpl_hours, actual_hours, verified_hours, app_learning_hours, minimum_met, reason, prepared_by_name, prepared_at, learner_signed_name, learner_signed_at, employer_signed_name, employer_signed_role, employer_company, employer_signed_at'
      )
      .eq('user_id', userId)
      .is('superseded_at', null)
      .order('prepared_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    setData((row as unknown as OtjHoursStatement | null) ?? null);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { data, loading, refresh };
}

export async function prepareOtjHoursStatement(
  userId: string,
  plannedHours: number,
  reason: string,
  rplHours: number
): Promise<{
  success?: boolean;
  id?: string;
  employer_token?: string;
  minimum_met?: boolean;
  error?: string;
}> {
  const { data, error } = await supabase.rpc(
    'prepare_otj_hours_statement' as never,
    {
      p_user: userId,
      p_planned_hours: plannedHours,
      p_reason: reason,
      p_rpl_hours: rplHours,
    } as never
  );
  if (error) return { error: error.message };
  return data as never;
}

export async function signOtjHoursStatement(
  id: string,
  name: string
): Promise<{ success?: boolean; error?: string }> {
  const { data, error } = await supabase.rpc(
    'sign_otj_hours_statement' as never,
    { p_id: id, p_name: name } as never
  );
  if (error) return { error: error.message };
  return data as never;
}

/** Always the public site: inside the native app window.location.origin is
 *  capacitor://localhost, which an employer cannot open. */
export const otjStatementLink = (token: string) => `https://elec-mate.com/otj-statement/${token}`;

/** Staff only: the employer's signing link for a statement. */
export async function fetchOtjStatementLink(statementId: string): Promise<string | null> {
  const { data, error } = await supabase.rpc(
    'get_otj_statement_employer_link' as never,
    { p_id: statementId } as never
  );
  if (error || !data) return null;
  return otjStatementLink(data as unknown as string);
}

/** Staff: leave app learning out of the count, with a reason the learner sees. */
export async function leaveOutAppLearning(
  userId: string,
  timeEntryIds: string[],
  reason: string
): Promise<{
  success?: boolean;
  days?: number;
  hours?: number;
  entry_ids?: string[];
  error?: string;
}> {
  const { data, error } = await supabase.rpc(
    'leave_out_app_learning' as never,
    { p_user: userId, p_time_entry_ids: timeEntryIds, p_reason: reason } as never
  );
  if (error) return { error: error.message };
  return data as never;
}

/** Tutor's Today screen: app learning waiting for approval at my college. */
export function useAppLearningWaiting(enabled = true) {
  const [data, setData] = useState<{ learners: number; hours: number } | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    void supabase.rpc('get_app_learning_waiting' as never).then(({ data: row, error }) => {
      if (!cancelled && !error) setData(row as unknown as { learners: number; hours: number });
    });
    return () => {
      cancelled = true;
    };
  }, [enabled]);
  return data;
}

/** Undo a tutor's approve or leave-out decision on app learning. */
export async function undoAppLearningDecision(entryIds: string[]): Promise<boolean> {
  if (entryIds.length === 0) return false;
  const { error } = await supabase.rpc(
    'undo_app_learning_decision' as never,
    { p_entry_ids: entryIds } as never
  );
  return !error;
}
