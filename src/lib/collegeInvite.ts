/* ==========================================================================
   collegeInvite — shared helpers for the college join flow.

   CollegeJoinPage (logged-in redeem), PendingCollegeInviteRedeemer
   (post-signup redeem) and CollegeInviteAccept (typed code) all call
   redeemCollegeInvite so the behaviour is identical.

   A college JOIN code (8 chars, from the tutor, redeemed here) and a college
   DISCOUNT code (applied at sign-up via ?offer=) are two different things and
   nothing connects them. Copy on every surface says so.
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
export async function redeemCollegeInvite(code: string): Promise<RedeemResult> {
  const trimmed = (code ?? '').trim().toUpperCase();
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
