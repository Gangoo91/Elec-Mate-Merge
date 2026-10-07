/**
 * useOtjProposals — ELE-1876 "hours stamped once".
 *
 * Off-the-job time the app already knows about (a register marked Present, a
 * day marked "College" in the site diary, site diary training that never
 * reached the hours record) comes back as PROPOSED hours. The apprentice
 * confirms, changes or turns each one down with a reason; confirming writes
 * one college_otj_entries row, so get_otj_summary stays the single figure.
 *
 * Tracked app learning is never proposed: it already counts as it is recorded.
 * Quizzes and mocks ('app_quiz', one per day) ARE proposed: their own timings,
 * minus any tracker time, go on the hours only when the apprentice confirms.
 *
 * All writes go through definer RPCs (the table is read-only to clients):
 *   get_otj_proposals()            refreshes from the sources, then lists
 *   confirm_otj_proposal(...)      → verified (own register, known length) or pending
 *   reject_otj_proposal(id, why)   reason required
 *   reopen_otj_proposal(id)        put a turned-down one back
 */
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type OtjProposalSource = 'register' | 'college_day' | 'diary' | 'app_quiz';
export type OtjProposalStatus = 'proposed' | 'confirmed' | 'rejected';

export interface OtjProposal {
  id: string;
  source: OtjProposalSource;
  activity_date: string;
  proposed_minutes: number | null;
  confirmed_minutes: number | null;
  activity_type: string;
  title: string;
  detail: string | null;
  attested_by_name: string | null;
  status: OtjProposalStatus;
  reject_reason: string | null;
  decided_at: string | null;
  otj_entry_id: string | null;
  /** college_otj_entries.verification_status of the entry it became. */
  entry_status: string | null;
  /** Other hours already on the record for that day. */
  same_day_minutes: number;
}

export interface ConfirmResult {
  error?: string;
  success?: boolean;
  entry_id?: string;
  status?: string;
  minutes?: number;
  verified?: boolean;
}

/** "From your register" — the words in front of every proposal. */
export const PROPOSAL_SOURCE_LABEL: Record<OtjProposalSource, string> = {
  register: 'From your register',
  college_day: 'From your site diary (college day)',
  diary: 'From your site diary',
  app_quiz: 'From your quizzes and mocks in the app',
};

export function fmtProposalMinutes(m: number | null | undefined): string {
  if (!m || m <= 0) return '';
  const h = Math.floor(m / 60);
  const r = m % 60;
  if (!h) return `${r}m`;
  return r ? `${h}h ${r}m` : `${h}h`;
}

export function fmtProposalDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'Europe/London',
  });
}

/** "From your register on Tue 6 Oct, 3h" */
export function proposalProvenance(p: OtjProposal): string {
  const mins = p.status === 'confirmed' ? p.confirmed_minutes : p.proposed_minutes;
  const len = fmtProposalMinutes(mins);
  return `${PROPOSAL_SOURCE_LABEL[p.source]} on ${fmtProposalDate(p.activity_date)}${len ? `, ${len}` : ''}`;
}

export async function fetchOtjProposals(): Promise<OtjProposal[]> {
  const { data, error } = await supabase.rpc('get_otj_proposals' as never);
  if (error) throw error;
  return ((data as unknown as OtjProposal[] | null) ?? []).map((p) => ({
    ...p,
    same_day_minutes: Number(p.same_day_minutes ?? 0),
  }));
}

export async function confirmOtjProposal(args: {
  id: string;
  minutes?: number | null;
  inWorkingHours?: boolean | null;
  outsideHoursCompensated?: boolean | null;
  note?: string | null;
}): Promise<ConfirmResult> {
  const { data, error } = await supabase.rpc(
    'confirm_otj_proposal' as never,
    {
      p_id: args.id,
      p_minutes: args.minutes ?? null,
      p_in_working_hours: args.inWorkingHours ?? null,
      p_outside_hours_compensated: args.outsideHoursCompensated ?? null,
      p_note: args.note ?? null,
    } as never
  );
  if (error) return { error: error.message };
  return (data as unknown as ConfirmResult) ?? {};
}

export async function rejectOtjProposal(id: string, reason: string): Promise<ConfirmResult> {
  const { data, error } = await supabase.rpc(
    'reject_otj_proposal' as never,
    { p_id: id, p_reason: reason } as never
  );
  if (error) return { error: error.message };
  return (data as unknown as ConfirmResult) ?? {};
}

export async function reopenOtjProposal(id: string): Promise<ConfirmResult> {
  const { data, error } = await supabase.rpc('reopen_otj_proposal' as never, { p_id: id } as never);
  if (error) return { error: error.message };
  return (data as unknown as ConfirmResult) ?? {};
}

export function useOtjProposals(userId: string | null | undefined) {
  const [proposals, setProposals] = useState<OtjProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!userId) {
      setProposals([]);
      setLoading(false);
      return;
    }
    try {
      setError(null);
      setProposals(await fetchOtjProposals());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const open = proposals.filter((p) => p.status === 'proposed');
  return { proposals, open, loading, error, refresh };
}

/* ── Tutor side ─────────────────────────────────────────────────────────── */

export interface ConfirmedHoursRow {
  proposal_id: string;
  user_id: string;
  college_student_id: string;
  learner_name: string | null;
  cohort_id: string | null;
  source: OtjProposalSource;
  activity_date: string;
  title: string;
  detail: string | null;
  proposed_minutes: number | null;
  confirmed_minutes: number | null;
  status: OtjProposalStatus;
  reject_reason: string | null;
  decided_at: string | null;
  otj_entry_id: string | null;
  entry_status: string | null;
}

export async function fetchCollegeConfirmedHours(days = 30): Promise<ConfirmedHoursRow[]> {
  const { data, error } = await supabase.rpc(
    'get_college_confirmed_hours' as never,
    { p_days: days, p_user: null } as never
  );
  if (error) throw error;
  return (data as unknown as ConfirmedHoursRow[] | null) ?? [];
}
