/**
 * Right-to-work checks (ELE-2061).
 *
 * The law, checked 10 Oct 2026:
 * - Home Office, Employer's guide to right to work checks (1 October 2026):
 *   https://www.gov.uk/government/publications/right-to-work-checks-employers-guide
 *   Check before work starts, follow up before time-limited permission ends,
 *   keep a copy for the employment plus two years.
 * - Border Security, Asylum and Immigration Act 2025 s.48 brings worker's
 *   contracts and individual sub-contractors into scope from 1 Oct 2026:
 *   https://www.legislation.gov.uk/ukpga/2025/31/section/48
 *
 * Status (rtw_team_status) is visible to everyone who books people on jobs.
 * The check records and the evidence are owner/admin only (RLS).
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useActingFirmId } from '@/hooks/useJobProfit';
import type { PillTone } from '@/components/employer/pageParts/PageParts';

export const RTW_BUCKET = 'rtw-evidence';

export type RtwStatus = 'checked' | 'due' | 'overdue' | 'missing' | 'not_required';
export type RtwCheckType = 'manual' | 'online' | 'idsp' | 'ecs' | 'not_required';

export interface RtwStatusRow {
  roster_id: string;
  name: string;
  team_role: string | null;
  status: RtwStatus;
  reason: string | null;
  checked_on: string | null;
  check_type: RtwCheckType | null;
  follow_up_due: string | null;
  submitted_at: string | null;
}

export interface RtwCheck {
  id: string;
  employer_id: string;
  roster_id: string | null;
  person_name: string | null;
  check_type: RtwCheckType;
  checked_on: string;
  checked_by: string | null;
  checked_by_name: string | null;
  documents_seen: string | null;
  share_code: string | null;
  permission: 'unlimited' | 'time_limited' | null;
  permission_expires_on: string | null;
  follow_up_due: string | null;
  restrictions: string | null;
  not_required_reason: string | null;
  evidence_paths: string[];
  notes: string | null;
  created_at: string;
}

export interface RtwSubmission {
  id: string;
  roster_id: string | null;
  share_code: string | null;
  date_of_birth: string | null;
  document_paths: string[];
  note: string | null;
  status: 'submitted' | 'used' | 'dismissed';
  submitted_at: string;
}

export interface HrSettings {
  employer_id: string;
  rtw_enforcement: 'warn' | 'block';
  default_probation_months: number | null;
  retention_overrides: Record<string, number>;
  /** gb = England, Scotland, Wales; ni = Northern Ireland; null = from the postcode. */
  employment_law?: EmploymentLaw | null;
}

export type EmploymentLaw = 'gb' | 'ni';

export const RTW_STATUS_LABEL: Record<RtwStatus, string> = {
  checked: 'Checked',
  due: 'Due',
  overdue: 'Overdue',
  missing: 'Missing',
  not_required: 'Not required',
};

export const RTW_STATUS_TONE: Record<RtwStatus, PillTone> = {
  checked: 'green',
  due: 'volt',
  overdue: 'red',
  missing: 'red',
  not_required: 'neutral',
};

export const RTW_CHECK_TYPE_LABEL: Record<RtwCheckType, string> = {
  manual: 'Manual document check',
  online: 'Home Office online check (share code)',
  idsp: 'Digital ID check (IDSP)',
  ecs: 'Employer Checking Service',
  not_required: 'Not required',
};

/** Statuses that warn (or, in block mode, stop) assigning and booking. Approving and paying only warn. */
export const rtwBlocks = (s: RtwStatus | undefined) => s === 'missing' || s === 'overdue';

const asRpc = (name: string) => name as never;

export function useRtwTeamStatus() {
  const { data: firm } = useActingFirmId();
  return useQuery({
    queryKey: ['rtw-team-status', firm],
    enabled: !!firm,
    staleTime: 60_000,
    queryFn: async (): Promise<RtwStatusRow[]> => {
      const { data, error } = await supabase.rpc(asRpc('rtw_team_status'), {
        p_firm: firm,
      } as never);
      if (error) throw error;
      return (data as unknown as RtwStatusRow[]) ?? [];
    },
  });
}

/** Map of roster id to status, for list rows. */
export function useRtwStatusMap() {
  const q = useRtwTeamStatus();
  const map = new Map<string, RtwStatusRow>();
  for (const r of q.data ?? []) map.set(r.roster_id, r);
  return { ...q, map };
}

export function useRtwChecks(rosterId: string | null | undefined, enabled = true) {
  return useQuery({
    queryKey: ['rtw-checks', rosterId],
    enabled: !!rosterId && enabled,
    queryFn: async (): Promise<RtwCheck[]> => {
      const { data, error } = await supabase
        .from('employer_rtw_checks' as never)
        .select('*')
        .eq('roster_id', rosterId!)
        .order('checked_on', { ascending: false })
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data as unknown as RtwCheck[]) ?? [];
    },
  });
}

export function useRtwSubmissions(rosterId: string | null | undefined, enabled = true) {
  return useQuery({
    queryKey: ['rtw-submissions', rosterId],
    enabled: !!rosterId && enabled,
    queryFn: async (): Promise<RtwSubmission[]> => {
      const { data, error } = await supabase
        .from('employer_rtw_submissions' as never)
        .select('*')
        .eq('roster_id', rosterId!)
        .order('submitted_at', { ascending: false });
      if (error) throw error;
      return (data as unknown as RtwSubmission[]) ?? [];
    },
  });
}

/** All waiting submissions for the firm (owner/admin; RLS returns none otherwise). */
export function useWaitingRtwSubmissions() {
  const { data: firm } = useActingFirmId();
  return useQuery({
    queryKey: ['rtw-submissions', 'waiting', firm],
    enabled: !!firm,
    queryFn: async (): Promise<RtwSubmission[]> => {
      const { data, error } = await supabase
        .from('employer_rtw_submissions' as never)
        .select('*')
        .eq('employer_id', firm!)
        .eq('status', 'submitted')
        .order('submitted_at', { ascending: false });
      if (error) throw error;
      return (data as unknown as RtwSubmission[]) ?? [];
    },
  });
}

const invalidateRtw = (qc: ReturnType<typeof useQueryClient>) => {
  qc.invalidateQueries({ queryKey: ['rtw-team-status'] });
  qc.invalidateQueries({ queryKey: ['rtw-checks'] });
  qc.invalidateQueries({ queryKey: ['rtw-submissions'] });
  qc.invalidateQueries({ queryKey: ['hr-retention-queue'] });
};

export interface SaveRtwCheckInput {
  rosterId: string;
  personName: string;
  checkType: RtwCheckType;
  checkedOn: string;
  checkedByName: string | null;
  documentsSeen: string | null;
  shareCode: string | null;
  permission: 'unlimited' | 'time_limited' | null;
  permissionExpiresOn: string | null;
  followUpDue: string | null;
  restrictions: string | null;
  notRequiredReason: string | null;
  notes: string | null;
  files: File[];
  submissionId?: string | null;
}

export function useSaveRtwCheck() {
  const qc = useQueryClient();
  const { data: firm } = useActingFirmId();
  return useMutation({
    mutationFn: async (input: SaveRtwCheckInput) => {
      if (!firm) throw new Error('No firm');
      const paths: string[] = [];
      for (const f of input.files) {
        const ext = (f.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
        const path = `${firm}/${input.rosterId}/${crypto.randomUUID()}.${ext || 'jpg'}`;
        const { error } = await supabase.storage
          .from(RTW_BUCKET)
          .upload(path, f, { contentType: f.type || undefined, upsert: false });
        if (error) {
          if (paths.length) await supabase.storage.from(RTW_BUCKET).remove(paths);
          throw new Error(`Upload failed: ${error.message}`);
        }
        paths.push(path);
      }
      const { data, error } = await supabase
        .from('employer_rtw_checks' as never)
        .insert({
          employer_id: firm,
          roster_id: input.rosterId,
          person_name: input.personName,
          check_type: input.checkType,
          checked_on: input.checkedOn,
          checked_by_name: input.checkedByName,
          documents_seen: input.documentsSeen,
          share_code: input.shareCode,
          permission: input.permission,
          permission_expires_on: input.permissionExpiresOn,
          follow_up_due: input.followUpDue,
          restrictions: input.restrictions,
          not_required_reason: input.notRequiredReason,
          notes: input.notes,
          evidence_paths: paths,
        } as never)
        .select('id')
        .single();
      if (error) {
        if (paths.length) await supabase.storage.from(RTW_BUCKET).remove(paths);
        throw error;
      }
      if (input.submissionId) {
        await supabase
          .from('employer_rtw_submissions' as never)
          .update({ status: 'used', reviewed_at: new Date().toISOString() } as never)
          .eq('id', input.submissionId);
      }
      return data as unknown as { id: string };
    },
    onSuccess: () => invalidateRtw(qc),
  });
}

/**
 * How the firm engages a subcontractor (ELE-2061, gap 3C #32). A genuine
 * limited company or LLP engaged as a business is outside the Right to Work
 * Scheme (Home Office employer's guide, 1 Oct 2026, Example 6; BSAIA 2025
 * s.48 covers an individual sub-contractor, someone who contracts with you
 * themselves). Read from the trading name unless the owner or an admin set it.
 */
export interface RtwEngagement {
  engaged_as: 'company' | 'individual';
  source: 'set' | 'name' | null;
  from?: string;
  set_at?: string;
}

export function useRtwEngagement(rosterId: string | null | undefined, enabled = true) {
  return useQuery({
    queryKey: ['rtw-engagement', rosterId],
    enabled: enabled && !!rosterId,
    queryFn: async (): Promise<RtwEngagement | null> => {
      const { data, error } = await supabase.rpc(asRpc('rtw_engagement'), {
        p_roster_id: rosterId,
      } as never);
      if (error) throw error;
      return (data as unknown as RtwEngagement | null) ?? null;
    },
  });
}

export function useSetRtwEngagement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      rosterId,
      engagedAs,
    }: {
      rosterId: string;
      engagedAs: 'company' | 'individual' | null;
    }) => {
      const { error } = await supabase.rpc(asRpc('rtw_set_engagement'), {
        p_roster_id: rosterId,
        p_engaged_as: engagedAs,
      } as never);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidateRtw(qc);
      qc.invalidateQueries({ queryKey: ['rtw-engagement'] });
    },
  });
}

export function useDismissRtwSubmission() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('employer_rtw_submissions' as never)
        .update({ status: 'dismissed', reviewed_at: new Date().toISOString() } as never)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => invalidateRtw(qc),
  });
}

/** Open a private evidence file in a new tab (signed for five minutes). */
export async function openRtwEvidence(path: string) {
  const { data, error } = await supabase.storage.from(RTW_BUCKET).createSignedUrl(path, 300);
  if (error || !data?.signedUrl) throw error ?? new Error('No link');
  window.open(data.signedUrl, '_blank', 'noopener');
}

export function useHrSettings() {
  const { data: firm } = useActingFirmId();
  return useQuery({
    queryKey: ['hr-settings', firm],
    enabled: !!firm,
    queryFn: async (): Promise<HrSettings> => {
      const { data, error } = await supabase
        .from('employer_hr_settings' as never)
        .select('*')
        .eq('employer_id', firm!)
        .maybeSingle();
      if (error) throw error;
      const row = data as unknown as HrSettings | null;
      return (
        row ?? {
          employer_id: firm!,
          rtw_enforcement: 'warn',
          default_probation_months: null,
          retention_overrides: {},
          employment_law: null,
        }
      );
    },
  });
}

/**
 * Which unfair dismissal rules apply (ELE-2075): the firm's setting, else the
 * company postcode (BT = Northern Ireland). law is null when neither tells us,
 * and the screens then say so instead of guessing.
 */
export function useEmploymentLaw() {
  const { data: firm } = useActingFirmId();
  return useQuery({
    queryKey: ['hr-employment-law', firm],
    enabled: !!firm,
    staleTime: 5 * 60_000,
    queryFn: async (): Promise<{
      law: EmploymentLaw | null;
      source: 'setting' | 'postcode' | null;
    }> => {
      const { data, error } = await supabase.rpc(asRpc('hr_employment_law'), {
        p_firm: firm,
      } as never);
      if (error) throw error;
      const r = data as unknown as {
        law: EmploymentLaw | null;
        source: 'setting' | 'postcode' | null;
      };
      return { law: r?.law ?? null, source: r?.source ?? null };
    },
  });
}

export function useSaveHrSettings() {
  const qc = useQueryClient();
  const { data: firm } = useActingFirmId();
  return useMutation({
    mutationFn: async (patch: Partial<Omit<HrSettings, 'employer_id'>>) => {
      if (!firm) throw new Error('No firm');
      const { error } = await supabase
        .from('employer_hr_settings' as never)
        .upsert({ employer_id: firm, ...patch, updated_at: new Date().toISOString() } as never, {
          onConflict: 'employer_id',
        });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['hr-settings'] });
      qc.invalidateQueries({ queryKey: ['hr-retention-queue'] });
      qc.invalidateQueries({ queryKey: ['hr-employment-law'] });
      qc.invalidateQueries({ queryKey: ['hr-people'] });
    },
  });
}

/* ── The worker's side ─────────────────────────────────────────────── */

export interface MyRtwRow {
  roster_id: string;
  employer_id: string;
  firm_name: string;
  status: RtwStatus;
  follow_up_due: string | null;
  last_submitted_at: string | null;
}

export function useMyRtwStatus() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['my-rtw-status', user?.id],
    enabled: !!user,
    staleTime: 60_000,
    queryFn: async (): Promise<MyRtwRow[]> => {
      const { data, error } = await supabase.rpc(asRpc('my_rtw_status'));
      if (error) throw error;
      return (data as unknown as MyRtwRow[]) ?? [];
    },
  });
}

/** The firm has no valid check and nothing was sent in the last 60 days. */
export const myRtwSentRecently = (r: MyRtwRow) =>
  !!r.last_submitted_at && Date.now() - new Date(r.last_submitted_at).getTime() < 60 * 864e5;
export const myRtwNeedsAction = (r: MyRtwRow) =>
  (r.status === 'missing' || r.status === 'overdue' || r.status === 'due') && !myRtwSentRecently(r);

export const SHARE_CODE_RE = /^W[A-Z0-9]{8}$/;
export const normaliseShareCode = (s: string) => s.toUpperCase().replace(/[^A-Z0-9]/g, '');

async function removeUnsent(paths: string[]) {
  if (paths.length === 0) return;
  try {
    await supabase.storage.from(RTW_BUCKET).remove(paths);
  } catch {
    // The office sweep in Records to review picks up anything left.
  }
}

export function useSubmitMyRtw() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      row: MyRtwRow;
      shareCode: string | null;
      dateOfBirth: string | null;
      note: string | null;
      files: File[];
    }) => {
      const paths: string[] = [];
      for (const f of input.files) {
        const ext = (f.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
        const path = `${input.row.employer_id}/${input.row.roster_id}/worker/${crypto.randomUUID()}.${ext || 'jpg'}`;
        const { error } = await supabase.storage
          .from(RTW_BUCKET)
          .upload(path, f, { contentType: f.type || undefined, upsert: false });
        if (error) {
          await removeUnsent(paths);
          throw new Error(`Upload failed: ${error.message}`);
        }
        paths.push(path);
      }
      const { data, error } = await supabase.rpc(asRpc('rtw_submit_my_documents'), {
        p_roster_id: input.row.roster_id,
        p_share_code: input.shareCode,
        p_date_of_birth: input.dateOfBirth,
        p_document_paths: paths,
        p_note: input.note,
      } as never);
      if (error) {
        // Nothing was saved, so the copies must not stay behind. Workers may
        // delete their own uploads that no submission points at (policy
        // "rtw evidence worker delete own unsent"); anything left is listed
        // for the owner under Records to review.
        await removeUnsent(paths);
        const m = error.message || '';
        throw new Error(
          m.includes('share_code_format')
            ? 'That is not a right to work share code. It has 9 characters and starts with W.'
            : m.includes('nothing_to_send')
              ? 'Add a share code or a photo of your documents.'
              : m.includes('date_of_birth')
                ? 'Check your date of birth.'
                : 'Not sent. Please try again.'
        );
      }
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['my-rtw-status'] }),
  });
}
