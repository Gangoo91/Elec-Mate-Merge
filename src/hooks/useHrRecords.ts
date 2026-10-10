/**
 * Probation, qualifying period and the data retention schedule (ELE-2075).
 *
 * Checked 10 Oct 2026:
 * - Unfair dismissal qualifying period in England, Scotland and Wales is
 *   2 years, falling to 6 months for dismissals from 1 January 2027
 *   (Employment Rights Act 2025 s.25, extent E+W+S):
 *   https://www.gov.uk/dismiss-staff/eligibility-to-claim-unfair-dismissal
 * - Northern Ireland stays at 1 year (Employment Rights (NI) Order 1996
 *   art.140): https://www.legislation.gov.uk/nisi/1996/1919/article/140 and
 *   https://www.nidirect.gov.uk/articles/what-do-if-you-are-unfairly-dismissed
 * - Fire and rehire protections start January 2027 (ERA 2025 s.28):
 *   https://www.legislation.gov.uk/ukpga/2025/36/section/28
 * - Retention periods and their sources come from hr_retention_schedule().
 *
 * Everything here is owner/admin only (can_see_firm_money); the RPCs return
 * nothing to anyone else.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addMonths, format, parseISO } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useActingFirmId } from '@/hooks/useJobProfit';
import { RTW_BUCKET, type EmploymentLaw } from '@/hooks/useRightToWork';

const asRpc = (name: string) => name as never;

export interface HrPerson {
  roster_id: string;
  name: string;
  team_role: string | null;
  status: string | null;
  start_date: string | null;
  start_is_join_date: boolean;
  probation_end_date: string | null;
  probation_review_date: string | null;
  probation_outcome: 'passed' | 'extended' | 'ended' | null;
  probation_outcome_on: string | null;
  probation_notes: string | null;
  qualifying_date: string | null;
  left_on: string | null;
}

export const PROBATION_OUTCOME_LABEL: Record<NonNullable<HrPerson['probation_outcome']>, string> = {
  passed: 'Passed',
  extended: 'Extended',
  ended: 'Ended',
};

/**
 * Same rule as hr_qualifying_date(start, law) in SQL.
 * gb: 2 years before 1 Jan 2027, 6 months for dismissals from that date.
 * ni: 1 year. Unknown law: null (never guess).
 */
export function qualifyingDate(
  start: string | null | undefined,
  law: EmploymentLaw | null | undefined
): string | null {
  if (!start || !law) return null;
  const s = parseISO(start);
  if (law === 'ni') return format(addMonths(s, 12), 'yyyy-MM-dd');
  const twoYears = addMonths(s, 24);
  const cutover = parseISO('2027-01-01');
  if (twoYears < cutover) return format(twoYears, 'yyyy-MM-dd');
  const six = addMonths(s, 6);
  return format(six > cutover ? six : cutover, 'yyyy-MM-dd');
}

export function useHrPeople() {
  const { data: firm } = useActingFirmId();
  return useQuery({
    queryKey: ['hr-people', firm],
    enabled: !!firm,
    queryFn: async (): Promise<HrPerson[]> => {
      const { data, error } = await supabase.rpc(asRpc('hr_people'), { p_firm: firm } as never);
      if (error) throw error;
      return (data as unknown as HrPerson[]) ?? [];
    },
  });
}

export interface SavePersonHrInput {
  rosterId: string;
  start_date?: string | null;
  probation_end_date?: string | null;
  probation_review_date?: string | null;
  probation_outcome?: HrPerson['probation_outcome'];
  probation_outcome_on?: string | null;
  probation_notes?: string | null;
  left_on?: string | null;
}

export function useSavePersonHr() {
  const qc = useQueryClient();
  const { data: firm } = useActingFirmId();
  return useMutation({
    mutationFn: async ({ rosterId, ...patch }: SavePersonHrInput) => {
      if (!firm) throw new Error('No firm');
      const { error } = await supabase.from('employer_person_hr' as never).upsert(
        {
          roster_id: rosterId,
          employer_id: firm,
          ...patch,
          updated_at: new Date().toISOString(),
        } as never,
        { onConflict: 'roster_id' }
      );
      if (error) {
        // The leaving date is checked in the database (20261010294300).
        if (String(error.message).includes('left_on_')) throw new Error(leaverError(error.message));
        throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['hr-people'] });
      qc.invalidateQueries({ queryKey: ['hr-retention-queue'] });
    },
  });
}

/**
 * Archive with the real leaving date (ELE-2075, gap 3C #30). Every archive
 * path uses this, so the retention periods always start from the day they
 * left. Owner, admins and office managers (my_employer_scope); a date already
 * recorded can only be changed by the owner or an admin.
 */
export function useMarkLeaver() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ rosterId, leftOn }: { rosterId: string; leftOn: string }) => {
      const { error } = await supabase.rpc(asRpc('hr_mark_leaver'), {
        p_roster_id: rosterId,
        p_left_on: leftOn,
      } as never);
      if (error) throw new Error(leaverError(error.message));
      // The paid seat count changed. Best-effort, as in updateEmployee.
      supabase.functions.invoke('manage-employer-seats').catch(() => {});
    },
    onSettled: () => invalidatePeople(qc),
  });
}

/** Back on the team: Active again and the leaving date cleared. */
export function useRestoreLeaver() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (rosterId: string) => {
      const { error } = await supabase.rpc(asRpc('hr_restore_leaver'), {
        p_roster_id: rosterId,
      } as never);
      if (error) throw new Error(leaverError(error.message));
      supabase.functions.invoke('manage-employer-seats').catch(() => {});
    },
    onSettled: () => invalidatePeople(qc),
  });
}

function leaverError(m: string): string {
  if (m.includes('left_on_future')) return 'The leaving date cannot be after today.';
  if (m.includes('left_on_required')) return 'Add the date they left.';
  if (m.includes('left_on_invalid')) return 'Check the leaving date.';
  if (m.includes('left_on_before_start')) return 'The leaving date is before they joined.';
  if (m.includes('left_on_before_last_timesheet')) {
    const d = m.split('left_on_before_last_timesheet:')[1]?.slice(0, 10);
    return d
      ? `They have a timesheet on ${d}, so the leaving date cannot be earlier.`
      : 'They have a timesheet after that date.';
  }
  if (m.includes('left_on_owner_admin_only'))
    return 'A leaving date is already recorded. Only the owner or an admin can change it.';
  if (m.includes('not_found')) return 'Only the owner, an admin or the office can do this.';
  return 'Please try again.';
}

function invalidatePeople(qc: ReturnType<typeof useQueryClient>) {
  qc.invalidateQueries({ queryKey: ['employees'] });
  qc.invalidateQueries({ queryKey: ['employer-employees'] });
  qc.invalidateQueries({ queryKey: ['hr-people'] });
  qc.invalidateQueries({ queryKey: ['hr-retention-queue'] });
  qc.invalidateQueries({ queryKey: ['rtw-team-status'] });
}

export interface RetentionRule {
  record_type: string;
  label: string;
  months: number;
  counted_from: 'leaving' | 'record' | 'decision' | 'tax_year' | 'last_pay';
  basis: 'statutory' | 'suggested';
  at_end: string;
  source_url: string;
}

export function useRetentionSchedule() {
  return useQuery({
    queryKey: ['hr-retention-schedule'],
    staleTime: Infinity,
    queryFn: async (): Promise<RetentionRule[]> => {
      const { data, error } = await supabase.rpc(asRpc('hr_retention_schedule'));
      if (error) throw error;
      return (data as unknown as RetentionRule[]) ?? [];
    },
  });
}

export interface RetentionLeaver {
  roster_id: string;
  name: string;
  /** Null until someone enters the real leaving date. */
  left_on: string | null;
  needs_left_on: boolean;
  contact_on_file: boolean;
  rtw_records: number;
  rtw_until: string | null;
  name_until: string | null;
  name_removed: boolean;
  sickness_records: number;
  /** Sickness records already past 3 years after their tax year. */
  sickness_due: number;
  sickness_until: string | null;
  dob_on_file: boolean;
  dob_until: string | null;
  signatures: number;
  signatures_until: string | null;
  /** What the law still needs kept, worked out from their actual records. */
  keep: LeaverKeep | null;
  ready: LeaverPart[];
}

export type LeaverPart = 'contact' | 'rtw' | 'sickness' | 'dob' | 'signatures' | 'name';

export interface LeaverKeep {
  timesheets: number;
  timesheets_until: string | null;
  holiday: number;
  holiday_until: string | null;
  sickness: number;
  sickness_until: string | null;
  fit_notes: number;
  cis: number;
  cis_until: string | null;
  accident: number;
  accident_until: string | null;
  name_until: string | null;
}

export interface RetentionQueue {
  months: { rtw: number; hr_file: number; cvs: number };
  leavers: RetentionLeaver[];
  applications: Array<{ id: string; vacancy: string | null; decided_on: string }>;
  /** rtw-evidence files no check or submission points at (failed deletes or saves). */
  orphan_files: string[];
  /** fit-notes files whose sickness records were removed, still to delete. */
  fit_note_files: string[];
}

export function useRetentionQueue(enabled = true) {
  const { data: firm } = useActingFirmId();
  return useQuery({
    queryKey: ['hr-retention-queue', firm],
    enabled: !!firm && enabled,
    queryFn: async (): Promise<RetentionQueue | null> => {
      const { data, error } = await supabase.rpc(asRpc('hr_retention_queue'), {
        p_firm: firm,
      } as never);
      if (error) throw error;
      const q = data as unknown as RetentionQueue & { error?: string };
      return q?.error ? null : q;
    },
  });
}

export function useAnonymiseLeaver() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ rosterId, parts }: { rosterId: string; parts: string[] }) => {
      const { data, error } = await supabase.rpc(asRpc('hr_anonymise_leaver'), {
        p_roster_id: rosterId,
        p_parts: parts,
      } as never);
      if (error) throw error;
      const res = data as unknown as {
        done: string[];
        paths: string[];
        fit_note_paths?: string[];
      };
      // The rows are gone; now the private copies. If any will not delete,
      // say so: they stay listed under Records to review (orphan_files and
      // fit_note_files) until a retry removes them.
      let left = 0;
      if (res.paths?.length) left += await removeFiles(RTW_BUCKET, res.paths);
      if (res.fit_note_paths?.length) left += await removeFiles(FIT_NOTE_BUCKET, res.fit_note_paths);
      if (left > 0) throw new Error(`files_left:${left}`);
      return res;
    },
    // Settled, not success: a file that would not delete still means the rows went.
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['hr-retention-queue'] });
      qc.invalidateQueries({ queryKey: ['hr-people'] });
      qc.invalidateQueries({ queryKey: ['employees'] });
      qc.invalidateQueries({ queryKey: ['employer-employees'] });
    },
  });
}

const FIT_NOTE_BUCKET = 'fit-notes';

/** Remove files from a private bucket. Returns how many could not be removed. */
async function removeFiles(bucket: string, paths: string[]): Promise<number> {
  try {
    const { data, error } = await supabase.storage.from(bucket).remove(paths);
    if (error) return paths.length;
    return Math.max(0, paths.length - (data?.length ?? 0));
  } catch {
    return paths.length;
  }
}

/** Delete right-to-work files that no record points at any more. */
export function useRemoveOrphanRtwFiles() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (paths: string[]) => {
      const left = await removeFiles(RTW_BUCKET, paths);
      if (left > 0) throw new Error(`files_left:${left}`);
      return paths.length;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['hr-retention-queue'] }),
  });
}

/** Delete fit notes whose sickness records were removed at the end of their period. */
export function useRemoveFitNoteFiles() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (paths: string[]) => {
      const left = await removeFiles(FIT_NOTE_BUCKET, paths);
      if (left > 0) throw new Error(`files_left:${left}`);
      return paths.length;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['hr-retention-queue'] }),
  });
}

/**
 * Unsuccessful applicants. Clears the name, contact details, cover letter and
 * the link to the CV. The CV file itself is the applicant's own saved CV in
 * their Elec-Mate account (user_cvs), not a copy the firm holds, so it is not
 * deleted here: removing the link ends the firm's access to it.
 */
export function useAnonymiseApplications() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (ids: string[]) => {
      const { data, error } = await supabase.rpc(asRpc('hr_anonymise_applications'), {
        p_ids: ids,
      } as never);
      if (error) throw error;
      return (data as unknown as number) ?? 0;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['hr-retention-queue'] });
      qc.invalidateQueries({ queryKey: ['vacancy-applications'] });
    },
  });
}
