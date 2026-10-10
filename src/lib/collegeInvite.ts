/* ==========================================================================
   collegeInvite — shared helpers for the college join flow.

   CollegeJoinPage (logged-in redeem), PendingCollegeInviteRedeemer
   (post-signup redeem) and CollegeInviteAccept (typed code) all call
   redeemCollegeInvite so the behaviour is identical.

   A college JOIN code (8 chars, from the tutor, redeemed here) and a college
   DISCOUNT code (applied at sign-up via ?offer=) are two different things in
   the data. Since ELE-1899 a join code typed or linked at sign-up also
   applies the discount Elec-Mate has linked to that college
   (college_signup_offers, via describe_join_code), so a learner needs one code.
   ========================================================================== */

import { supabase } from '@/integrations/supabase/client';

/** localStorage key holding a college invite code awaiting an authenticated user. */
export const PENDING_INVITE_KEY = 'pendingCollegeInviteCode';

/** Machine codes `accept_college_invite` returns in `error`. */
export type InviteErrorCode =
  | 'invite_not_found'
  | 'invite_inactive'
  | 'invite_expired'
  | 'invite_full'
  | 'already_in_other_college'
  | 'no_course_on_invite'
  | 'not_authenticated'
  | 'invite_type_unknown'
  | 'invalid_code';

export interface RedeemResult {
  success?: boolean;
  college_name?: string;
  invite_type?: 'student' | 'staff' | string;
  role?: string;
  linked?: boolean;
  already_member?: boolean;
  cohort_name?: string | null;
  course_name?: string | null;
  qualification_title?: string | null;
  tutor_name?: string | null;
  student_id?: string | null;
  /** Set alongside `already_in_other_college`. */
  other_college_name?: string | null;
  error?: InviteErrorCode | string;
  /** Human-readable UK English from the RPC — show as-is. */
  message?: string;
}

/**
 * Redeem a college invite code for the currently-authenticated user.
 * Wraps the accept_college_invite RPC and normalises its jsonb response.
 * Returns success:false (never throws) so callers can branch simply.
 */
/** "ab12 cd34", " AB12-CD34 " → "AB12CD34": codes are read out, typed on phones and pasted from WhatsApp. */
export function cleanJoinCode(code: string | null | undefined): string {
  return (code ?? '').replace(/[\s\-–—]/g, '').toUpperCase();
}

export async function redeemCollegeInvite(code: string): Promise<RedeemResult> {
  const trimmed = cleanJoinCode(code);
  if (!trimmed || trimmed.length < 4) {
    return { success: false, error: 'invalid_code', message: 'Enter the 8-character code your tutor gave you.' };
  }
  try {
    const { data, error } = await supabase.rpc('accept_college_invite', {
      p_invite_code: trimmed,
    });
    if (error) return { success: false, error: error.message, message: error.message };
    const res = (data ?? {}) as RedeemResult;
    if (res.error) return { ...res, success: false };
    return { ...res, success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to redeem invite code',
    };
  }
}

/**
 * Where to send someone after a successful join. Students never get
 * profiles.college_id, so the staff hub guard would bounce them — learners
 * go to their own college plan.
 */
export function postJoinPath(inviteType?: string): string {
  return inviteType === 'staff' ? '/college' : '/apprentice/college-plan';
}

/** "Northgate College · L2 2025-A" — the toast / confirmation line after a join. */
export function joinedLine(res: RedeemResult): string {
  const college = res.college_name ?? 'your college';
  return res.cohort_name ? `${college} · ${res.cohort_name}` : college;
}

const TERMINAL_CODES: ReadonlySet<string> = new Set<InviteErrorCode>([
  'invite_not_found',
  'invite_inactive',
  'invite_expired',
  'invite_full',
  'already_in_other_college',
  'no_course_on_invite',
  'invite_type_unknown',
  'invalid_code',
]);

/**
 * Terminal errors mean the stashed code will never work — drop it so we stop
 * retrying. Only transport/network failures (and `not_authenticated`, which
 * is a session that has not settled yet) keep the code for a later attempt.
 */
export function isTerminalInviteError(error?: string): boolean {
  if (!error) return false;
  const e = error.trim().toLowerCase();
  if (TERMINAL_CODES.has(e)) return true;
  // Older RPC builds returned prose instead of a code.
  return (
    e.includes('invalid') ||
    e.includes('expired') ||
    e.includes('not found') ||
    e.includes('no longer active') ||
    e.includes('not linked to a course')
  );
}

/* ── ELE-1899: what a join code is, signed out (sign-up page, /college/join) ── */

export interface JoinCodeInfo {
  valid: boolean;
  code: string;
  invite_type: 'student' | 'staff' | string;
  college_name: string;
  cohort_name: string | null;
  course_name: string | null;
  apprentice_offer: string | null;
  electrician_offer: string | null;
}

export async function describeJoinCode(code: string): Promise<JoinCodeInfo | null> {
  const c = cleanJoinCode(code);
  if (!/^[A-Z0-9]{4,16}$/.test(c)) return null;
  const { data, error } = await supabase.rpc('describe_join_code' as never, { p_code: c } as never);
  if (error) return null;
  const d = data as JoinCodeInfo | null;
  return d?.valid ? d : null;
}

/** The discount a join code carries for the chosen plan (falls back to the other plan's; describe-offer finds the sibling). */
export function joinOfferFor(info: JoinCodeInfo, plan: 'electrician' | 'apprentice' | null): string | null {
  return plan === 'electrician'
    ? (info.electrician_offer ?? info.apprentice_offer)
    : (info.apprentice_offer ?? info.electrician_offer);
}

/** "Northgate Technical College · Year 2 — Sept 2026 intake" */
export function joinLine(info: JoinCodeInfo): string {
  return [info.college_name, info.cohort_name].filter(Boolean).join(' · ');
}

/* ── ELE-1882: move to a new college, record and all ── */

export interface CollegeMoveCounts {
  decisions: number;
  witness_statements: number;
  otj_entries: number;
  otj_verified_hours: number;
  evidence_items: number;
  audit_events: number;
}

export interface CollegeMovePreview {
  error?: string;
  message?: string;
  to_college_id?: string;
  to_college_name?: string;
  to_cohort_name?: string | null;
  from?: { college_id: string; college_name: string | null; status: string; student_id: string }[];
  moving?: boolean;
  carried?: CollegeMoveCounts;
  links_ending?: { name: string | null; role: string }[];
  links_kept?: number;
  shares_kept?: number;
  witness_requests_kept?: number;
}

export interface CollegeMoveResult extends RedeemResult {
  moved?: boolean;
  move_id?: string;
  from_college_name?: string | null;
  to_college_name?: string | null;
  carried?: CollegeMoveCounts;
}

type MoveRpc = (
  fn: string,
  args: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;
const moveRpc = supabase.rpc.bind(supabase) as unknown as MoveRpc;

/** What a move to the college behind this code would do. Changes nothing. */
export async function previewCollegeMove(code: string): Promise<CollegeMovePreview> {
  const { data, error } = await moveRpc('preview_college_move', { p_invite_code: cleanJoinCode(code) });
  if (error) return { error: 'network', message: 'Could not reach Elec-Mate. Check your connection.' };
  return (data ?? {}) as CollegeMovePreview;
}

/** Leave the current college and join the new one, in one step. */
export async function moveToNewCollege(code: string): Promise<CollegeMoveResult> {
  const { data, error } = await moveRpc('move_to_new_college', { p_invite_code: cleanJoinCode(code) });
  if (error) return { success: false, error: 'network', message: 'Could not reach Elec-Mate. Nothing has changed.' };
  const res = (data ?? {}) as CollegeMoveResult;
  return res.error ? { ...res, success: false } : { ...res, success: true };
}
