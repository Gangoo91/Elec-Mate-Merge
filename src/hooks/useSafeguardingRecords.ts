import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/* ==========================================================================
   useSafeguardingRecords (ELE-2043): the lead's decision, rationale and
   referrals on each concern, the open children's social care case flag, and
   child protection file transfers with a recorded receipt.

   Keeping children safe in education 2026: para 74 (decisions and the reasons
   for them, in writing), 78 (LADO), 150 (child protection file transferred
   within 5 days, secure transit, confirmation of receipt), 151 (Channel),
   218 (the DSL holds the fact that a child has a social worker).

   Every table here is readable only by _safeguarding_reader (designated leads
   and deputies, or the no-lead fallback). The learner's own tutor can read the
   concern note itself but none of these records. Writes go through RPCs.
   ========================================================================== */

export type SgDecision =
  'no_further_action' | 'monitor' | 'early_help' | 'referral_made' | 'escalated';

export const SG_DECISION_LABEL: Record<SgDecision, string> = {
  no_further_action: 'No further action',
  monitor: 'Monitor in college',
  early_help: 'Early help',
  referral_made: 'Referral made',
  escalated: 'Escalated',
};

export type CscCaseType =
  'child_in_need' | 'child_protection_plan' | 'looked_after' | 'early_help' | 'other';

export const CSC_CASE_LABEL: Record<CscCaseType, string> = {
  child_in_need: 'Child in need',
  child_protection_plan: 'Child protection plan',
  looked_after: 'Looked after',
  early_help: 'Early help',
  other: 'Other',
};

export type CpMethod = 'secure_email' | 'secure_portal' | 'in_person' | 'recorded_delivery';
export const CP_METHOD_LABEL: Record<CpMethod, string> = {
  secure_email: 'Secure email',
  secure_portal: 'Secure portal',
  in_person: 'By hand',
  recorded_delivery: 'Recorded delivery',
};

export type ReceiptHow = 'email_confirmation' | 'signed_slip' | 'portal_confirmation' | 'in_app';
export const RECEIPT_HOW_LABEL: Record<ReceiptHow, string> = {
  email_confirmation: 'Email confirmation',
  signed_slip: 'Signed receipt slip',
  portal_confirmation: 'Portal confirmation',
  in_app: 'Confirmed in Elec-Mate',
};

export interface SgDecisionRow {
  id: string;
  note_id: string;
  student_id: string;
  decision: SgDecision;
  rationale: string;
  la_referral_on: string | null;
  la_name: string | null;
  la_reference: string | null;
  lado_referral_on: string | null;
  lado_reference: string | null;
  channel_referral_on: string | null;
  channel_reference: string | null;
  decided_by_name: string | null;
  decided_at: string;
  superseded_at: string | null;
}

export interface SgLearnerStatus {
  student_id: string;
  open_csc_case: boolean;
  case_type: CscCaseType | null;
  local_authority: string | null;
  social_worker: string | null;
  since: string | null;
  updated_by_name: string | null;
  updated_at: string;
}

export interface CpTransfer {
  id: string;
  student_id: string;
  college_id: string;
  left_on: string | null;
  due_by: string | null;
  to_provider_name: string;
  to_college_id: string | null;
  to_dsl_name: string | null;
  to_dsl_contact: string | null;
  method: CpMethod;
  sent_at: string;
  sent_by_name: string | null;
  notes?: string | null;
  receipt_at: string | null;
  receipt_by_name: string | null;
  receipt_by_role: string | null;
  receipt_how: ReceiptHow | null;
  receipt_note: string | null;
  receipt_recorded_name: string | null;
}

export interface CpOutgoing {
  student_id: string;
  student_name: string;
  date_of_birth: string | null;
  status: string;
  left_on: string | null;
  due_by: string | null;
  overdue: boolean;
  concerns: number;
  suggested_provider: string | null;
  suggested_college_id: string | null;
  transfer: CpTransfer | null;
}

export interface CpIncoming {
  transfer: CpTransfer;
  student_name: string;
  from_college: string | null;
}

interface RecordsData {
  decisions: SgDecisionRow[];
  statuses: SgLearnerStatus[];
  outgoing: CpOutgoing[];
  incoming: CpIncoming[];
}

const KEY = 'safeguarding-records';

export function useSafeguardingRecords(enabled: boolean) {
  const { user, profile } = useAuth();
  const collegeId = profile?.college_id ?? null;
  const qc = useQueryClient();

  const query = useQuery<RecordsData>({
    queryKey: [KEY, user?.id, collegeId],
    enabled: enabled && !!user?.id && !!collegeId,
    queryFn: async () => {
      const [d, s, t] = await Promise.all([
        supabase
          .from('college_safeguarding_decisions' as never)
          .select('*')
          .order('decided_at', { ascending: false }),
        supabase.from('college_safeguarding_learner_status' as never).select('*'),
        supabase.rpc('list_cp_file_transfers' as never, { p_college: collegeId } as never),
      ]);
      if (d.error) throw d.error;
      if (s.error) throw s.error;
      if (t.error) throw t.error;
      const tr = (t.data ?? {}) as { outgoing?: CpOutgoing[]; incoming?: CpIncoming[] };
      return {
        decisions: (d.data ?? []) as unknown as SgDecisionRow[],
        statuses: (s.data ?? []) as unknown as SgLearnerStatus[],
        outgoing: tr.outgoing ?? [],
        incoming: tr.incoming ?? [],
      };
    },
  });

  const refresh = useCallback(() => qc.invalidateQueries({ queryKey: [KEY] }), [qc]);

  const data = query.data;
  const currentByNote = new Map<string, SgDecisionRow>();
  const historyByNote = new Map<string, SgDecisionRow[]>();
  for (const r of data?.decisions ?? []) {
    if (!r.superseded_at) currentByNote.set(r.note_id, r);
    else historyByNote.set(r.note_id, [...(historyByNote.get(r.note_id) ?? []), r]);
  }
  const statusByStudent = new Map<string, SgLearnerStatus>();
  for (const s of data?.statuses ?? []) statusByStudent.set(s.student_id, s);

  return {
    loading: query.isLoading,
    collegeId,
    currentByNote,
    historyByNote,
    statusByStudent,
    outgoing: data?.outgoing ?? [],
    incoming: data?.incoming ?? [],
    refresh,
  };
}

const errText = (e: unknown) =>
  e && typeof e === 'object' && 'message' in e
    ? String((e as { message: string }).message)
    : 'Please try again.';

export async function saveSafeguardingDecision(args: {
  noteId: string;
  decision: SgDecision;
  rationale: string;
  laOn?: string | null;
  laName?: string | null;
  laRef?: string | null;
  ladoOn?: string | null;
  ladoRef?: string | null;
  channelOn?: string | null;
  channelRef?: string | null;
}): Promise<{ error?: string }> {
  const { error } = await supabase.rpc(
    'save_safeguarding_decision' as never,
    {
      p_note_id: args.noteId,
      p_decision: args.decision,
      p_rationale: args.rationale,
      p_la_referral_on: args.laOn || null,
      p_la_name: args.laName || null,
      p_la_reference: args.laRef || null,
      p_lado_referral_on: args.ladoOn || null,
      p_lado_reference: args.ladoRef || null,
      p_channel_referral_on: args.channelOn || null,
      p_channel_reference: args.channelRef || null,
    } as never
  );
  return error ? { error: errText(error) } : {};
}

export async function setSafeguardingLearnerStatus(args: {
  studentId: string;
  open: boolean;
  caseType?: CscCaseType | null;
  localAuthority?: string | null;
  socialWorker?: string | null;
  since?: string | null;
}): Promise<{ error?: string }> {
  const { error } = await supabase.rpc(
    'set_safeguarding_learner_status' as never,
    {
      p_student: args.studentId,
      p_open: args.open,
      p_case_type: args.open ? (args.caseType ?? null) : null,
      p_local_authority: args.localAuthority || null,
      p_social_worker: args.socialWorker || null,
      p_since: args.since || null,
    } as never
  );
  return error ? { error: errText(error) } : {};
}

export async function recordCpFileSent(args: {
  studentId: string;
  toProvider: string;
  method: CpMethod;
  sentAt: string;
  toDslName?: string;
  toDslContact?: string;
  toCollegeId?: string | null;
  notes?: string;
}): Promise<{ error?: string }> {
  const { error } = await supabase.rpc(
    'record_cp_file_sent' as never,
    {
      p_student: args.studentId,
      p_to_provider: args.toProvider,
      p_method: args.method,
      p_sent_at: args.sentAt,
      p_to_dsl_name: args.toDslName || null,
      p_to_dsl_contact: args.toDslContact || null,
      p_to_college_id: args.toCollegeId || null,
      p_notes: args.notes || null,
    } as never
  );
  return error ? { error: errText(error) } : {};
}

export async function recordCpFileReceipt(args: {
  transferId: string;
  byName: string;
  byRole?: string;
  how: ReceiptHow;
  receivedAt: string;
  note?: string;
}): Promise<{ error?: string }> {
  const { error } = await supabase.rpc(
    'record_cp_file_receipt' as never,
    {
      p_transfer: args.transferId,
      p_by_name: args.byName,
      p_by_role: args.byRole || null,
      p_how: args.how,
      p_received_at: args.receivedAt,
      p_note: args.note || null,
    } as never
  );
  return error ? { error: errText(error) } : {};
}

export interface SgInspectionExport {
  college: string | null;
  generated_at: string;
  generated_by: string | null;
  leads: Array<{ name: string; role: string; prevent_lead: boolean }>;
  concerns: Array<Record<string, string | number | null>>;
  open_csc_cases: Array<Record<string, string | null>>;
  transfers: Array<Record<string, string | null>>;
}

export async function fetchSafeguardingInspectionExport(
  collegeId: string
): Promise<{ data?: SgInspectionExport; error?: string }> {
  const { data, error } = await supabase.rpc(
    'get_safeguarding_inspection_export' as never,
    { p_college: collegeId } as never
  );
  if (error) return { error: errText(error) };
  return { data: data as unknown as SgInspectionExport };
}
