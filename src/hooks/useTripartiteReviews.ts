import { useCallback, useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

// college_review_actions and the v2 review columns post-date the generated
// types; reads and writes here go through an untyped handle.
const db = supabase as unknown as SupabaseClient;

/* ==========================================================================
   Tripartite progress reviews (ELE-1880) — the college, apprentice and
   employer, at least every 3 calendar months.

   Source: Apprenticeship funding rules 2025/26, paras 97–98 and the evidence
   box on p.55. The database does the rules (tripartite_reviews_v2):
     - tripartite_due_by: end of the calendar month 3 months after the last
       review (or the start), or the learner's agreed frequency (97.1)
     - sign_off_tripartite_review: refuses until the employer was asked
       (97.2.1), every earlier action is checked (98.1), the plan question is
       answered (98.4) and an action is agreed (98.6); then freezes the record
       and signs for the college
     - the apprentice and employer sign through their own RPCs; once signed
       off a review never changes

   The employer's link token is never selectable from the table; staff fetch
   it with getEmployerReviewLink.
   ========================================================================== */

export type ReviewMode = 'in_person' | 'video' | 'phone' | 'email';
export type EmployerAttendance = 'attended' | 'contributed' | 'invited_no_response';
export type PlanChange = 'none' | 'minor' | 'content' | 'end_date' | 'otj_release';
export type ActionOwner = 'apprentice' | 'employer' | 'college';
export type ActionStatus = 'open' | 'done' | 'not_done' | 'dropped';
export type ProgressView = 'ahead' | 'on_track' | 'behind';

export const MODE_LABEL: Record<ReviewMode, string> = {
  in_person: 'In person',
  video: 'Video call',
  phone: 'Phone',
  email: 'By email',
};

export const ATTENDANCE_LABEL: Record<EmployerAttendance, string> = {
  attended: 'Attended',
  contributed: 'Contributed, did not attend',
  invited_no_response: 'Invited, no reply',
};

export const PLAN_CHANGE_LABEL: Record<PlanChange, string> = {
  none: 'No change',
  minor: 'Small change',
  content: 'Content added or removed',
  end_date: 'End date changed',
  otj_release: 'Off-the-job release changed',
};

/** Para 98.4.1: these changes need the employer to re-sign the training plan. */
export const PLAN_CHANGE_NEEDS_EMPLOYER: PlanChange[] = ['content', 'end_date', 'otj_release'];

export const OWNER_LABEL: Record<ActionOwner, string> = {
  apprentice: 'Apprentice',
  employer: 'Employer',
  college: 'College',
};

export const PROGRESS_LABEL: Record<ProgressView, string> = {
  ahead: 'Ahead',
  on_track: 'On track',
  behind: 'Behind',
};

export interface ReviewInput {
  progress: ProgressView;
  going_well?: string;
  focus_next?: string;
  concerns?: string;
  name?: string;
  role?: string;
  at?: string;
  via?: string;
}

export interface ReviewOutcomes {
  summary?: string;
  progress_notes?: string;
  training_notes?: string;
  evidence_notes?: string;
  otj_review?: string;
  plan_change?: PlanChange;
  ilp_updates?: string;
  concerns?: string;
  learning_support?: { applies?: boolean; discussed?: boolean; employer_consent?: boolean; note?: string };
  wellbeing_check?: string;
  safeguarding_check?: string;
}

export interface ReviewSignatures {
  tutor_signed_at?: string;
  tutor_name?: string;
  student_signed_at?: string;
  student_name?: string;
  student_signed_via?: 'app' | 'paper';
  employer_signed_at?: string;
  employer_name?: string;
  employer_role?: string;
  employer_signed_via?: string;
}

export interface ContactLogEntry {
  kind: 'invite' | 'reminder' | 'summary' | 'shared_link';
  at: string;
  to?: string | null;
  by?: string;
}

export interface TripartiteReview {
  id: string;
  college_id: string;
  student_id: string;
  tutor_staff_id: string | null;
  employer_id: string | null;
  employer_contact_name: string | null;
  employer_contact_email: string | null;
  scheduled_at: string | null;
  duration_minutes: number | null;
  location: string | null;
  meeting_url: string | null;
  mode: ReviewMode | null;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  held_on: string | null;
  outcomes: ReviewOutcomes;
  signatures: ReviewSignatures;
  employer_attendance: EmployerAttendance | null;
  employer_invited_at: string | null;
  employer_viewed_at: string | null;
  employer_contact_log: ContactLogEntry[];
  employer_input: ReviewInput | null;
  learner_input: ReviewInput | null;
  snapshot: { prefill?: ReviewPrefill; employer_must_sign?: boolean } | null;
  locked_at: string | null;
  shared_at: string | null;
  completed_at: string | null;
  cancelled_reason: string | null;
  created_at: string;
}

export interface ReviewAction {
  id: string;
  review_id: string;
  student_id: string;
  college_id: string;
  action: string;
  owner_party: ActionOwner;
  due_date: string | null;
  status: ActionStatus;
  outcome_note: string | null;
  closed_in_review_id: string | null;
  position: number;
}

export interface ReviewPrefill {
  learner: {
    name: string;
    start_date: string | null;
    expected_end_date: string | null;
    course: string | null;
    cohort: string | null;
    employer: string | null;
    progress_percent: number;
    has_account?: boolean;
  };
  since: string;
  previous_review_id: string | null;
  due_by: string | null;
  otj: {
    counted_hours: number;
    required_hours: number | null;
    planned_to_date_hours: number | null;
    pending_hours: number;
    app_learning_hours: number;
    risk: string;
    weekly_needed_hours: number | null;
    slippage_hours: number;
  } | null;
  training_since: Array<{ type: string; hours: number }>;
  hours_since: number;
  attendance_since: { sessions: number; percent: number | null } | null;
  evidence_since: { signed_off: number; awaiting_assessment: number; witness_statements: number };
  open_actions: Array<{
    id: string;
    action: string;
    owner_party: ActionOwner;
    due_date: string | null;
    status: ActionStatus;
    outcome_note: string | null;
    closed_in_review_id: string | null;
  }>;
  goals: Array<{ title: string; status: string; target_date: string | null }>;
  support_needs: boolean;
}

export type BoardState = 'overdue' | 'write_up' | 'due_soon' | 'scheduled' | 'late' | 'signatures' | 'ok';

export interface ReviewBoardRow {
  student_id: string;
  user_id: string | null;
  name: string;
  cohort: string | null;
  employer: string | null;
  last_held_on: string | null;
  due_by: string | null;
  frequency_months: number;
  /** The next review to hold: the earliest one not yet signed off. */
  next: {
    id: string;
    scheduled_at: string | null;
    employer_input: boolean;
    learner_input: boolean;
    employer_invited: boolean;
  } | null;
  /** The latest signed-off review still missing a needed signature. */
  to_sign: {
    id: string;
    learner_signed: boolean;
    employer_signed: boolean;
    employer_must_sign: boolean;
  } | null;
  employer_attended: number;
  reviews_done: number;
  state: BoardState;
}

/** Which review a board row opens. */
export const boardRowReviewId = (r: ReviewBoardRow) =>
  r.state === 'signatures' ? r.to_sign?.id ?? null : r.next?.id ?? null;

// Every column except employer_token (not selectable; see the migration).
const REVIEW_COLUMNS =
  'id, college_id, student_id, tutor_staff_id, employer_id, employer_contact_name, employer_contact_email, ' +
  'scheduled_at, duration_minutes, location, meeting_url, mode, status, held_on, outcomes, signatures, ' +
  'employer_attendance, employer_invited_at, employer_viewed_at, employer_contact_log, employer_input, ' +
  'learner_input, snapshot, locked_at, shared_at, completed_at, cancelled_reason, created_at';

type RpcResult = { success?: boolean; error?: string; employer_must_sign?: boolean };

async function rpc<T>(fn: string, args?: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.rpc(fn as never, (args ?? {}) as never);
  if (error) throw new Error(error.message);
  return data as unknown as T;
}

/* ── College ────────────────────────────────────────────────────────────── */

export function useReviewBoard(collegeId?: string | null) {
  const [rows, setRows] = useState<ReviewBoardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await rpc<{ rows: ReviewBoardRow[] }>('get_review_board', { p_college: collegeId ?? null });
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

export function useStudentReviews(studentId: string | null | undefined) {
  const [reviews, setReviews] = useState<TripartiteReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => {
    if (!studentId) return;
    setError(null);
    const { data, error: e } = await db
      .from('college_tripartite_reviews')
      .select(REVIEW_COLUMNS)
      .eq('student_id', studentId)
      .neq('status', 'cancelled')
      .order('scheduled_at', { ascending: false, nullsFirst: true });
    if (e) setError(e.message);
    else setReviews((data ?? []) as unknown as TripartiteReview[]);
    setLoading(false);
  }, [studentId]);
  useEffect(() => {
    setLoading(true);
    void load();
  }, [load]);
  return { reviews, loading, error, reload: load };
}

export async function fetchReview(id: string): Promise<TripartiteReview | null> {
  const { data, error } = await db
    .from('college_tripartite_reviews')
    .select(REVIEW_COLUMNS)
    .eq('id', id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as unknown as TripartiteReview) ?? null;
}

export async function fetchReviewActions(reviewId: string): Promise<ReviewAction[]> {
  const { data, error } = await db
    .from('college_review_actions')
    .select(
      'id, review_id, student_id, college_id, action, owner_party, due_date, status, outcome_note, closed_in_review_id, position'
    )
    .eq('review_id', reviewId)
    .order('position')
    .order('created_at');
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as ReviewAction[];
}

export const fetchReviewPrefill = (reviewId: string) =>
  rpc<ReviewPrefill>('get_tripartite_prefill', { p_review: reviewId });

export interface ScheduleInput {
  college_id: string;
  student_id: string;
  tutor_staff_id: string | null;
  employer_id: string | null;
  employer_contact_name: string | null;
  employer_contact_email: string | null;
  scheduled_at: string;
  mode: ReviewMode;
  location: string | null;
  meeting_url: string | null;
}

export async function scheduleReview(input: ScheduleInput): Promise<string> {
  const { data: u } = await supabase.auth.getUser();
  const { data, error } = await db
    .from('college_tripartite_reviews')
    .insert({ ...input, status: 'scheduled', duration_minutes: 45, created_by: u.user?.id ?? null } )
    .select('id')
    .single();
  if (error) throw new Error(error.message);
  return (data as { id: string }).id;
}

export async function updateReview(
  id: string,
  patch: Partial<
    Pick<
      TripartiteReview,
      | 'scheduled_at'
      | 'mode'
      | 'location'
      | 'meeting_url'
      | 'outcomes'
      | 'employer_attendance'
      | 'employer_id'
      | 'employer_contact_name'
      | 'employer_contact_email'
      | 'status'
      | 'cancelled_reason'
    >
  >
) {
  const { error } = await db
    .from('college_tripartite_reviews')
    .update(patch )
    .eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deleteReview(id: string) {
  const { error } = await db.from('college_tripartite_reviews').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export async function addReviewAction(
  review: Pick<TripartiteReview, 'id' | 'college_id' | 'student_id'>,
  action: string,
  owner: ActionOwner,
  dueDate: string | null,
  position: number
) {
  const { error } = await db.from('college_review_actions').insert({
    review_id: review.id,
    college_id: review.college_id,
    student_id: review.student_id,
    action: action.trim(),
    owner_party: owner,
    due_date: dueDate,
    position,
  } );
  if (error) throw new Error(error.message);
}

export async function removeReviewAction(id: string) {
  const { error } = await db.from('college_review_actions').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

/** 98.1 — record what happened to an earlier review's action, in this review. */
export async function checkEarlierAction(
  actionId: string,
  reviewId: string,
  status: ActionStatus,
  note: string | null
) {
  const { error } = await db
    .from('college_review_actions')
    .update({
      status,
      outcome_note: note,
      closed_in_review_id: status === 'open' ? null : reviewId,
      closed_at: status === 'open' ? null : new Date().toISOString(),
    } )
    .eq('id', actionId);
  if (error) throw new Error(error.message);
}

export const recordPaperLearnerSignature = (id: string, signedOn: string, note: string) =>
  rpc<RpcResult>('record_paper_learner_signature', { p_review: id, p_signed_on: signedOn, p_note: note });

/** Today's date in the UK, as yyyy-mm-dd. */
export const londonToday = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/London' });
/** A timestamp's date in the UK, as yyyy-mm-dd. */
export const londonDate = (iso: string | null | undefined) =>
  iso ? new Date(iso).toLocaleDateString('en-CA', { timeZone: 'Europe/London' }) : null;

/** The college's employers, to pick from when scheduling. */
export async function fetchCollegeEmployers(collegeId: string) {
  const { data, error } = await supabase
    .from('college_employers')
    .select('id, company_name, contact_name, contact_email')
    .eq('college_id', collegeId)
    .order('company_name');
  if (error) throw new Error(error.message);
  return (data ?? []) as Array<{ id: string; company_name: string; contact_name: string | null; contact_email: string | null }>;
}

export async function linkLearnerEmployer(studentId: string, employerId: string) {
  const { error } = await supabase.from('college_students').update({ employer_id: employerId }).eq('id', studentId);
  if (error) throw new Error(error.message);
}

/** Add or correct the employer contact's email on the record and this review. */
export async function setEmployerEmail(reviewId: string, employerId: string | null, email: string) {
  if (employerId) {
    const { error } = await supabase.from('college_employers').update({ contact_email: email }).eq('id', employerId);
    if (error) throw new Error(error.message);
  }
  await updateReview(reviewId, { employer_contact_email: email });
}

export const signOffReview = (id: string, heldOn: string | null) =>
  rpc<RpcResult>('sign_off_tripartite_review', { p_review: id, p_held_on: heldOn });

export const getEmployerReviewLink = async (id: string) => {
  const token = await rpc<string>('get_tripartite_employer_link', { p_review: id });
  return reviewLink(token);
};

export const logEmployerContact = (
  id: string,
  kind: ContactLogEntry['kind'],
  to: string | null
) => rpc<RpcResult>('log_tripartite_employer_contact', { p_review: id, p_kind: kind, p_to: to });

/** The employer's page. Always the public domain, so a link copied from a
 *  preview build still works for the person who receives it. */
export const reviewLink = (token: string) => `https://elec-mate.com/review/${token}`;

/** Email the employer their link through Elec-Mate (invite, reminder or summary). */
export async function emailEmployer(
  reviewId: string,
  kind: 'invite' | 'reminder' | 'summary',
  to?: string
): Promise<RpcResult> {
  const { data, error } = await supabase.functions.invoke('college-review-mail', {
    body: { action: kind, review_id: reviewId, to: to ?? null },
  });
  if (error) return { error: error.message };
  return data as RpcResult;
}

/** College employer record for a learner: link an existing one or add one. */
export async function ensureLearnerEmployer(
  collegeId: string,
  studentId: string,
  company: string,
  contactName: string,
  contactEmail: string
): Promise<string> {
  const { data, error } = await supabase
    .from('college_employers')
    .insert({
      college_id: collegeId,
      company_name: company.trim(),
      contact_name: contactName.trim() || null,
      contact_email: contactEmail.trim() || null,
    } )
    .select('id')
    .single();
  if (error) throw new Error(error.message);
  const id = (data as { id: string }).id;
  const { error: e2 } = await supabase
    .from('college_students')
    .update({ employer_id: id })
    .eq('id', studentId);
  if (e2) {
    await supabase.from('college_employers').delete().eq('id', id);
    throw new Error(e2.message);
  }
  return id;
}

/* ── Apprentice ─────────────────────────────────────────────────────────── */

export interface MyReview {
  id: string;
  scheduled_at: string | null;
  held_on: string | null;
  mode: ReviewMode | null;
  location: string | null;
  meeting_url: string | null;
  status: TripartiteReview['status'];
  locked: boolean;
  tutor_name: string | null;
  learner_input: ReviewInput | null;
  summary: {
    summary: string | null;
    progress: string | null;
    otj: string | null;
    plan_note: string | null;
    concerns: string | null;
    checked_actions: Array<{ action: string; owner_party: ActionOwner; status: ActionStatus; outcome_note: string | null }>;
    agreed_actions: Array<{ action: string; owner_party: ActionOwner; due_date: string | null }>;
  } | null;
  signatures: {
    tutor_name: string | null;
    tutor_signed_at: string | null;
    student_signed_at: string | null;
    employer_name: string | null;
    employer_signed_at: string | null;
  };
}

export interface MyReviews {
  due_by: string | null;
  reviews: MyReview[];
  open_actions: Array<{ action: string; owner_party: ActionOwner; due_date: string | null }>;
}

export function useMyReviews() {
  const [data, setData] = useState<MyReviews | null>(null);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    try {
      setData(await rpc<MyReviews>('get_my_tripartite_reviews'));
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);
  return { data, loading, reload: load };
}

export const submitLearnerReviewInput = (id: string, input: ReviewInput) =>
  rpc<RpcResult>('submit_tripartite_learner_input', { p_review: id, p_input: input });

export const signReviewAsLearner = (id: string) =>
  rpc<RpcResult>('sign_tripartite_review_learner', { p_review: id });

/* ── Employer Hub ───────────────────────────────────────────────────────── */

export interface EmployerApprenticeReview {
  student_user_id: string;
  name: string;
  due_by: string | null;
  last_held_on: string | null;
  review: {
    id: string;
    token: string;
    scheduled_at: string | null;
    held_on: string | null;
    mode: ReviewMode | null;
    status: string;
    locked: boolean;
    employer_input: boolean;
    employer_signed: boolean;
  } | null;
}

export function useEmployerApprenticeReviews() {
  const [rows, setRows] = useState<EmployerApprenticeReview[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    rpc<EmployerApprenticeReview[]>('get_employer_apprentice_reviews')
      .then((r) => setRows(r ?? []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, []);
  return { rows, loading };
}

/* ── Formatting ─────────────────────────────────────────────────────────── */

export const fmtReviewDate = (iso: string | null | undefined, withTime = false) => {
  if (!iso) return '';
  const d = iso.length === 10 ? new Date(`${iso}T12:00:00`) : new Date(iso);
  return d.toLocaleDateString('en-GB', {
    weekday: withTime ? 'short' : undefined,
    day: 'numeric',
    month: 'short',
    year: withTime ? undefined : 'numeric',
    ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}),
  });
};

export const daysUntil = (iso: string | null | undefined) => {
  if (!iso) return null;
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const d = new Date(`${iso.slice(0, 10)}T12:00:00`);
  return Math.round((d.getTime() - today.getTime()) / 86400000);
};
