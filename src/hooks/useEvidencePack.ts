import { useCallback, useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   Evidence pack (ELE-1908) — the funding evidence a college must hold for
   each apprentice, worked out live from the record.

   Source: Apprenticeship funding rules 2025/26, paras 309–318 and every
   "Evidence requirements" box that applies to an employed apprentice. The
   checklist is computed in the database (get_learner_evidence_pack); the
   college can add its own requirements (college_evidence_requirements),
   which appear on every matching learner's pack.

   Documents go to the private bucket college-learner-evidence under
   <college_id>/<student_id>/…, and are never overwritten (para 312): a new
   version supersedes the old one, and both are kept.
   ========================================================================== */

const db = supabase as unknown as SupabaseClient;
export const EVIDENCE_BUCKET = 'college-learner-evidence';

export type ItemStatus = 'ok' | 'missing' | 'attention' | 'due' | 'not_yet_due' | 'not_applicable';
export type ItemGroup = 'start' | 'during' | 'end';

export type EvidenceKind =
  | 'id_residency'
  | 'eligibility_declaration'
  | 'employment_contract'
  | 'employer_declaration'
  | 'apprenticeship_agreement'
  | 'training_plan'
  | 'initial_assessment'
  | 'rpl_summary'
  | 'fs_decision'
  | 'fs_exemption'
  | 'learning_support_plan'
  | 'care_leaver_info'
  | 'care_leaver_la_letter'
  | 'contract_for_services'
  | 'wage_confirmation'
  | 'epao_agreement'
  | 'epa_employment_statement'
  | 'epa_result'
  | 'epa_certificate'
  | 'break_return_revision'
  | 'custom'
  | 'other';

export const KIND_LABEL: Record<EvidenceKind, string> = {
  id_residency: 'Identity and residency',
  eligibility_declaration: 'Eligibility declaration',
  employment_contract: 'Contract of employment',
  employer_declaration: 'Employer declaration of employment',
  apprenticeship_agreement: 'Apprenticeship agreement',
  training_plan: 'Training plan',
  initial_assessment: 'Initial assessment',
  rpl_summary: 'Prior learning summary',
  fs_decision: 'English and maths decision',
  fs_exemption: 'English and maths exemption',
  learning_support_plan: 'Learning support plan',
  care_leaver_info: 'Care leavers’ bursary information',
  care_leaver_la_letter: 'Local authority care leaver letter',
  contract_for_services: 'Contract for services',
  wage_confirmation: 'Wage statement',
  epao_agreement: 'Assessment organisation agreement',
  epa_employment_statement: 'Employed until assessment statement',
  epa_result: 'Assessment result',
  epa_certificate: 'Assessment certificate',
  break_return_revision: 'Revised plan after a break',
  custom: 'College requirement',
  other: 'Other document',
};

/** Who needs to have signed each kind, for the signature prompts. */
export const KIND_SIGNERS: Partial<Record<EvidenceKind, Array<'apprentice' | 'employer' | 'provider'>>> = {
  apprenticeship_agreement: ['apprentice', 'employer'],
  training_plan: ['apprentice', 'employer', 'provider'],
  eligibility_declaration: ['apprentice'],
  employer_declaration: ['employer'],
  epa_employment_statement: ['employer', 'provider'],
  contract_for_services: ['employer', 'provider'],
  learning_support_plan: ['apprentice'],
  break_return_revision: ['apprentice', 'employer', 'provider'],
};

/** What a document of each kind should show, as a hint when filing it. */
export const KIND_HINT: Partial<Record<EvidenceKind, string>> = {
  id_residency: 'Say which documents you saw (for example, UK passport). Para 29.8 asks you to record the type.',
  eligibility_declaration: 'The apprentice confirms they are not on another funded programme and that their details are correct.',
  employment_contract: 'An extract showing the employer, the job and that it runs past the end-point assessment.',
  apprenticeship_agreement: 'The complete agreement, signed by the employer and the apprentice (not one person for both).',
  training_plan: 'Signed and dated by the apprentice, employer and college. Keep every earlier version.',
  initial_assessment: 'Skills scan, prior-learning check and how content, price and hours were adjusted, agreed with the employer.',
  wage_confirmation: 'A copy of the employment terms or a written statement about wages.',
  contract_for_services: 'Signed by the employer and college, with the statement that the employer pays no contribution.',
  epa_employment_statement: 'Signed by the employer and college: the apprentice stays employed until the assessment is complete.',
};

export interface EvidenceRow {
  id: string;
  kind: EvidenceKind;
  title: string | null;
  file_path: string | null;
  file_name: string | null;
  file_hash: string | null;
  document_date: string | null;
  valid_from: string | null;
  valid_to: string | null;
  evidence_type_seen: string | null;
  signatures: Array<{ role: string; name: string; signed_on?: string | null }>;
  notes: string | null;
  requirement_id: string | null;
  version: number;
  supersedes_id: string | null;
  superseded_at: string | null;
  uploaded_by_name: string | null;
  created_at: string;
}

export interface PackItem {
  key: string;
  group: ItemGroup;
  title: string;
  para: string;
  status: ItemStatus;
  detail: string;
  kind?: EvidenceKind;
  requirement_id?: string;
  custom?: boolean;
  field?: boolean;
  employer_level?: boolean;
  link?: 'reviews' | 'otj' | 'episodes';
  due_date?: string | null;
  evidence?: EvidenceRow[];
  months?: Array<{ month: string; minutes: number }>;
}

export interface LearnerPack {
  learner: {
    id: string;
    name: string;
    uln: string | null;
    status: string | null;
    start_date: string | null;
    expected_end_date: string | null;
    date_of_birth: string | null;
    ni_number: string | null;
    weekly_contracted_hours: number | null;
    delivery_model: 'day_release' | 'block_release' | 'front_loaded' | null;
    learning_actual_end_date: string | null;
    employer_id: string | null;
    college_id: string;
    course: string | null;
    cohort: string | null;
    employer: string | null;
  };
  generated_at: string;
  items: PackItem[];
  counts: Partial<Record<ItemStatus, number>>;
  episodes: Array<{
    id: string;
    kind: 'start' | 'break' | 'return' | 'employer_change' | 'withdrawal' | 'completion';
    effective_date: string;
    last_evidenced_learning_date: string | null;
    reason: string | null;
    created_at: string;
  }>;
  history: EvidenceRow[];
}

export interface BoardRow {
  student_id: string;
  name: string;
  cohort: string | null;
  cohort_id: string | null;
  items: Array<{ key: string; title: string; status: ItemStatus; detail: string; due_date: string | null }> | null;
  /** Every item's status for this learner, by item key. */
  statuses: Record<string, ItemStatus> | null;
  /** The items on this learner's pack (custom ones vary by cohort/course). */
  catalog: Array<{ key: string; title: string; group: ItemGroup; custom: boolean }> | null;
  counts: Partial<Record<ItemStatus, number>>;
}

export interface CollegeRequirement {
  id: string;
  college_id: string;
  title: string;
  description: string | null;
  stage: ItemGroup;
  cohort_id: string | null;
  course_id: string | null;
  renew_months: number | null;
  due_within_days: number | null;
  needs_signature_from: string[];
  active: boolean;
  created_at: string;
}

async function rpc<T>(fn: string, args?: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.rpc(fn as never, (args ?? {}) as never);
  if (error) throw new Error(error.message);
  return data as unknown as T;
}

export function useEvidenceBoard(collegeId: string | null | undefined) {
  const [rows, setRows] = useState<BoardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await rpc<{ rows: BoardRow[] }>('get_evidence_pack_board', { p_college: collegeId ?? null });
      setRows(res?.rows ?? []);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [collegeId]);
  useEffect(() => {
    void load();
  }, [load]);
  return { rows, loading, error, reload: load };
}

export function useLearnerPack(studentId: string | null | undefined) {
  const [pack, setPack] = useState<LearnerPack | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => {
    if (!studentId) return;
    setError(null);
    try {
      setPack(await rpc<LearnerPack>('get_learner_evidence_pack', { p_student: studentId }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [studentId]);
  useEffect(() => {
    void load();
  }, [load]);
  return { pack, loading, error, reload: load };
}

async function sha256(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, '0')).join('');
}

export interface FileEvidenceInput {
  collegeId: string;
  studentId: string | null;
  employerId?: string | null;
  kind: EvidenceKind;
  requirementId?: string | null;
  title?: string | null;
  file?: File | null;
  documentDate?: string | null;
  validTo?: string | null;
  evidenceTypeSeen?: string | null;
  signatures: Array<{ role: string; name: string; signed_on?: string | null }>;
  notes?: string | null;
  structured?: Record<string, unknown>;
  supersedesId?: string | null;
}

/** File a document. The file's SHA-256 is kept so it can be shown unaltered (para 312). */
export async function fileEvidence(input: FileEvidenceInput) {
  let filePath: string | null = null;
  let fileHash: string | null = null;
  if (input.file) {
    const safe = input.file.name.replace(/[^\w.\-]+/g, '_').slice(-80);
    filePath = `${input.collegeId}/${input.studentId ?? `employer-${input.employerId}`}/${crypto.randomUUID()}-${safe}`;
    fileHash = await sha256(input.file);
    const { error: upErr } = await supabase.storage
      .from(EVIDENCE_BUCKET)
      .upload(filePath, input.file, { upsert: false, contentType: input.file.type || undefined });
    if (upErr) throw new Error(upErr.message);
  }
  const { error } = await db.from('college_learner_evidence').insert({
    college_id: input.collegeId,
    student_id: input.studentId,
    employer_id: input.employerId ?? null,
    kind: input.kind,
    requirement_id: input.requirementId ?? null,
    title: input.title ?? null,
    file_path: filePath,
    file_name: input.file?.name ?? null,
    file_hash: fileHash,
    document_date: input.documentDate ?? null,
    valid_to: input.validTo ?? null,
    evidence_type_seen: input.evidenceTypeSeen ?? null,
    signatures: input.signatures,
    notes: input.notes ?? null,
    structured: input.structured ?? {},
    supersedes_id: input.supersedesId ?? null,
  });
  if (error) {
    // The record failed, so the upload has nothing pointing at it.
    if (filePath) await supabase.storage.from(EVIDENCE_BUCKET).remove([filePath]);
    throw new Error(error.message);
  }
}

export async function openEvidenceFile(path: string) {
  const { data, error } = await supabase.storage.from(EVIDENCE_BUCKET).createSignedUrl(path, 120);
  if (error || !data?.signedUrl) throw new Error(error?.message ?? 'Could not open the file');
  return data.signedUrl;
}

export async function markEvidenceVerified(id: string) {
  const { error } = await db.from('college_learner_evidence').update({ verified_at: new Date().toISOString() }).eq('id', id);
  if (error) throw new Error(error.message);
}

export async function updateLearnerFacts(
  studentId: string,
  patch: Partial<{
    uln: string | null;
    ni_number: string | null;
    date_of_birth: string | null;
    weekly_contracted_hours: number | null;
    delivery_model: string | null;
    start_date: string | null;
    expected_end_date: string | null;
  }>
) {
  const { error } = await db.from('college_students').update(patch).eq('id', studentId);
  if (error) throw new Error(error.message);
}

export async function addEpisode(input: {
  collegeId: string;
  studentId: string;
  kind: LearnerPack['episodes'][number]['kind'];
  effectiveDate: string;
  lastEvidencedLearningDate?: string | null;
  reason?: string | null;
}) {
  const { error } = await db.from('college_learner_episodes').insert({
    college_id: input.collegeId,
    student_id: input.studentId,
    kind: input.kind,
    effective_date: input.effectiveDate,
    last_evidenced_learning_date: input.lastEvidencedLearningDate ?? null,
    reason: input.reason ?? null,
  });
  if (error) throw new Error(error.message);
}

export function useCollegeRequirements(collegeId: string | null | undefined) {
  const [rows, setRows] = useState<CollegeRequirement[]>([]);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    if (!collegeId) return;
    const { data } = await db
      .from('college_evidence_requirements')
      .select('*')
      .eq('college_id', collegeId)
      .order('active', { ascending: false })
      .order('created_at');
    setRows((data ?? []) as CollegeRequirement[]);
    setLoading(false);
  }, [collegeId]);
  useEffect(() => {
    void load();
  }, [load]);
  return { rows, loading, reload: load };
}

export async function saveRequirement(
  collegeId: string,
  r: Partial<CollegeRequirement> & { title: string; stage: ItemGroup }
) {
  const row = {
    college_id: collegeId,
    title: r.title.trim(),
    description: r.description?.trim() || null,
    stage: r.stage,
    cohort_id: r.cohort_id ?? null,
    course_id: r.course_id ?? null,
    renew_months: r.renew_months ?? null,
    due_within_days: r.due_within_days ?? null,
    needs_signature_from: r.needs_signature_from ?? [],
    active: r.active ?? true,
  };
  const q = r.id
    ? db.from('college_evidence_requirements').update(row).eq('id', r.id)
    : db.from('college_evidence_requirements').insert(row);
  const { error } = await q;
  if (error) throw new Error(error.message);
}

export const STATUS_LABEL: Record<ItemStatus, string> = {
  ok: 'In place',
  missing: 'Missing',
  attention: 'Needs action',
  due: 'Due',
  not_yet_due: 'Not yet due',
  not_applicable: 'Not needed',
};

export const STATUS_PILL: Record<ItemStatus, string> = {
  ok: 'bg-emerald-500 text-black',
  missing: 'bg-red-500 text-white',
  attention: 'bg-orange-500 text-black',
  due: 'bg-white text-black',
  not_yet_due: 'border border-white/[0.2] text-white',
  not_applicable: 'border border-white/[0.2] text-white',
};

/** Items that count towards "complete": everything due now. */
export const isApplicable = (s: ItemStatus) => s !== 'not_yet_due' && s !== 'not_applicable';
export const isGap = (s: ItemStatus) => s === 'missing' || s === 'attention' || s === 'due';
