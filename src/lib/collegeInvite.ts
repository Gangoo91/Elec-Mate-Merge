/* ==========================================================================
   collegeInvite — shared helpers for the one-tap college join flow.

   Both CollegeJoinPage (logged-in redeem) and PendingCollegeInviteRedeemer
   (post-signup redeem) call redeemCollegeInvite so the behaviour is identical.
   ========================================================================== */

import { supabase } from '@/integrations/supabase/client';

/** localStorage key holding a college invite code awaiting an authenticated user. */
export const PENDING_INVITE_KEY = 'pendingCollegeInviteCode';

export interface RedeemResult {
  success?: boolean;
  college_name?: string;
  invite_type?: string; // 'staff' | 'student'
  role?: string;
  linked?: boolean;
  error?: string;
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
    return { success: false, error: 'invalid_code', message: 'Invalid invite code.' };
  }
  try {
    const { data, error } = await supabase.rpc('accept_college_invite', {
      p_invite_code: trimmed,
    });
    if (error) return { success: false, error: error.message };
    const res = (data ?? {}) as RedeemResult;
    if (res.error) return { success: false, error: res.error, message: res.message };
    return { ...res, success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to redeem invite code',
    };
  }
}

/**
 * Terminal errors mean the stashed code will never work — drop it so we stop
 * retrying. Transient/network errors keep the code for a later attempt.
 */
export function isTerminalInviteError(error?: string): boolean {
  if (!error) return false;
  const e = error.toLowerCase();
  return (
    e.includes('invalid') ||
    e.includes('expired') ||
    e.includes('no_course_on_invite') ||
    e.includes('not linked to a course')
  );
}
