/**
 * useOnboarding — ELE-2088, 10 Oct 2026.
 *
 * One guided onboarding per learner: eligibility and residency
 * self-declarations and an ID upload by the learner, employment details, the
 * apprenticeship agreement and the contract for services by the employer
 * (personal link, no account), the ID check by the college, and the initial
 * assessment, prior learning and training plan pulled in from Student 360.
 * The checklist is worked out in the database (_onboarding_state); every
 * item carries its 2026/27 funding-rule paragraph from college_funding_rule_refs.
 */
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';

export type OnbStatus = 'done' | 'due' | 'waiting' | 'to_check' | 'to_do';
export type OnbKey =
  | 'eligibility'
  | 'residency'
  | 'id_rtw'
  | 'employer_eligibility'
  | 'agreement'
  | 'contract_for_services'
  | 'initial_assessment'
  | 'prior_learning'
  | 'training_plan';

export interface OnbRecord {
  signer_name: string;
  role: string;
  signer_title?: string | null;
  signer_company?: string | null;
  signed_at: string;
  method: 'signed_in' | 'personal_link';
  signature_hash: string;
  statement: string;
  category?: string | null;
  document_type?: string | null;
  permission_until?: string | null;
  line_manager?: string | null;
  reference?: string | null;
  signed_on?: string | null;
}

export interface OnbUpload {
  id: string;
  document_type: string | null;
  file_name: string | null;
  file_path: string;
  signed_at: string;
  signer_name: string;
}

export interface OnbSignature {
  role: 'apprentice' | 'employer';
  signer_name: string;
  signer_company?: string | null;
  signed_at: string;
  signature_hash: string;
  method: string;
}

export interface OnbItem {
  key: OnbKey;
  rule_key: string;
  who: string;
  title: string;
  status: OnbStatus;
  waiting_on: string | null;
  detail?: string | null;
  link?: 'starting-point' | 'training-plan';
  para: string | null;
  para_note: string | null;
  record?: OnbRecord | null;
  uploads?: OnbUpload[];
  signatures?: OnbSignature[];
  version?: number;
  agreement_hash?: string | null;
  issued_at?: string | null;
}

export interface AgreementContent {
  apprentice_name: string | null;
  place_of_work: string | null;
  standard: string | null;
  level: string | null;
  start_date: string | null;
  end_date: string | null;
  practical_start: string | null;
  practical_end: string | null;
  otj_hours: number | null;
  practical_duration_months?: number | null;
}

export interface OnboardingData {
  started: boolean;
  onboarding_id: string | null;
  ready: boolean;
  ready_at: string | null;
  rules_year: string | null;
  done: number;
  total: number;
  items: OnbItem[];
  can_edit: boolean;
  learner: { id: string; name: string; has_account: boolean; employer: string | null };
  agreement: {
    content: AgreementContent;
    version: number;
    hash: string | null;
    issued_at: string | null;
    missing: string[];
  } | null;
  links: { apprentice?: string; employer?: string } | null;
}

const rpc = async <T>(fn: string, args: Record<string, unknown>): Promise<T> => {
  const { data, error } = await supabase.rpc(fn as never, args as never);
  if (error) throw new Error(error.message);
  return data as unknown as T;
};

export const onboardingLink = (token: string) =>
  `${typeof window !== 'undefined' && window.location.origin.startsWith('http') ? window.location.origin : 'https://elec-mate.com'}/start/${token}`;

export function useOnboarding(studentId: string | null | undefined) {
  const [data, setData] = useState<OnboardingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!studentId) {
      setLoading(false);
      return;
    }
    try {
      setData(await rpc<OnboardingData>('get_onboarding', { p_student: studentId }));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export const startOnboarding = (studentId: string) =>
  rpc<{ ok: boolean; id: string }>('start_onboarding', { p_student: studentId });

export const saveOnboardingAgreement = (
  studentId: string,
  content: AgreementContent,
  issue: boolean
) =>
  rpc<{ ok?: boolean; error?: string; missing?: string[]; version?: number }>(
    'save_onboarding_agreement',
    { p_student: studentId, p_content: content, p_issue: issue }
  );

export const confirmOnboardingIdSeen = (
  studentId: string,
  documentType: string,
  permissionUntil: string | null,
  name: string | null
) =>
  rpc<{ ok?: boolean; error?: string }>('confirm_onboarding_id_seen', {
    p_student: studentId,
    p_document_type: documentType,
    p_permission_until: permissionUntil,
    p_name: name,
  });

export const verifyOnboarding = (studentId: string) =>
  rpc<{ records: number; signatures_intact: boolean; agreement_unchanged?: boolean }>(
    'verify_onboarding',
    { p_student: studentId }
  );

/* ── The college list ─────────────────────────────────────────────── */

export interface OnboardingListRow {
  student_id: string;
  name: string;
  start_date: string | null;
  status: string | null;
  cohort_id: string | null;
  cohort: string | null;
  employer: string | null;
  started: boolean;
  ready: boolean;
  done: number;
  total: number;
  waiting: Array<{ key: OnbKey; title: string; waiting_on: string | null }>;
}

export function useCollegeOnboardingList(collegeId: string | null | undefined) {
  const [rows, setRows] = useState<OnboardingListRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const reload = useCallback(async () => {
    if (!collegeId) return;
    try {
      setRows(await rpc<OnboardingListRow[]>('list_college_onboarding', { p_college: collegeId }));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  }, [collegeId]);
  useEffect(() => {
    void reload();
  }, [reload]);
  return { rows, error, reload, loading: !rows && !error };
}

/* ── The personal link (/start/:token) ─────────────────────────────── */

export interface LinkStep {
  key: OnbKey;
  title: string;
  para: string | null;
  done: boolean;
  open: boolean;
}

export interface LinkView {
  error?: string;
  role: 'apprentice' | 'employer';
  details: {
    learner: string;
    college: string | null;
    employer: string | null;
    start_date: string | null;
    expected_end_date: string | null;
    course: string | null;
    has_date_of_birth: boolean;
  };
  needs_sign_in: boolean;
  signed_in_as_learner: boolean;
  steps: LinkStep[];
  agreement: {
    content: AgreementContent;
    version: number;
    hash: string;
    issued_at: string;
  } | null;
  statements: {
    residency: Record<'uk_3yrs' | 'non_uk_3yrs' | 'euss' | 'other', string>;
  };
  ready: boolean;
}

export const getOnboardingForLink = (token: string) =>
  rpc<LinkView>('get_onboarding_for_link', { p_token: token });

export const previewOnboardingStatement = (
  token: string,
  item: string,
  answers: Record<string, unknown>
) =>
  rpc<string | null>('preview_onboarding_statement', {
    p_token: token,
    p_item: item,
    p_answers: answers,
  });

export const submitOnboardingStep = (
  token: string,
  item: string,
  answers: Record<string, unknown>
) =>
  rpc<{ ok?: boolean; error?: string; needs_sign_in?: boolean }>('submit_onboarding_step', {
    p_token: token,
    p_item: item,
    p_answers: answers,
    p_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
  });

/** Uploads the ID copy through the edge function (private bucket, token-checked). */
export async function uploadOnboardingId(args: {
  token: string;
  file: File;
  documentType: string;
  signerName: string;
}): Promise<void> {
  const form = new FormData();
  form.append('token', args.token);
  form.append('document_type', args.documentType);
  form.append('signer_name', args.signerName);
  form.append('file', args.file);
  const { data: s } = await supabase.auth.getSession();
  const res = await fetch(`${SUPABASE_URL}/functions/v1/college-onboarding-upload`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${s.session?.access_token ?? SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: form,
  });
  const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
  if (!res.ok || !body.ok) throw new Error(body.error ?? 'Could not upload. Try again.');
}

export const ID_DOCUMENT_TYPES = [
  'UK or Irish passport',
  'Passport from another country with a visa or eVisa',
  'EU Settlement Scheme status',
  'Biometric residence permit or eVisa share code',
  'UK birth certificate with National Insurance letter',
  'Other document',
] as const;

export const RESIDENCY_LABEL: Record<string, string> = {
  uk_3yrs: 'UK national, 3 years resident',
  non_uk_3yrs: 'Not a UK national, 3 years resident with permission',
  euss: 'EEA or Swiss national with EU Settlement Scheme status',
  other: 'Another Annex A category',
};
