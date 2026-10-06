/**
 * Independent assessor invites (ELE-1870). A learner invites an assessor by
 * link; the assessor signs in (or creates a free account) and accepts. The
 * token survives sign-up via local storage, redeemed by
 * PendingAssessorInviteRedeemer once the user lands in the app.
 */
import { supabase } from '@/integrations/supabase/client';

export const PENDING_ASSESSOR_INVITE_KEY = 'elec-mate-pending-assessor-invite';

export interface AssessorInvitePreview {
  learner_name?: string;
  role?: 'assessor' | 'iqa' | 'epa_assessor' | 'employer';
  assessor_email?: string;
  status?: 'invited' | 'active' | 'revoked';
  expires_at?: string;
  error?: 'invite_not_found' | 'invite_revoked' | 'invite_expired' | 'network';
}

export interface AcceptResult {
  success?: boolean;
  learner_id?: string;
  learner_name?: string;
  already?: boolean;
  error?:
    | 'sign_in_required'
    | 'invite_not_found'
    | 'invite_revoked'
    | 'invite_expired'
    | 'invite_already_used'
    | 'cannot_assess_self'
    | 'wrong_account'
    | 'network';
  invited_email?: string;
}

type Rpc = (fn: string, params: Record<string, unknown>) => Promise<{ data: unknown; error: { message: string } | null }>;
// Bound: a bare supabase.rpc loses `this` and throws "reading 'rest'".
const rpc = supabase.rpc.bind(supabase) as unknown as Rpc;

export const ROLE_LABEL: Record<string, string> = {
  assessor: 'assessor',
  iqa: 'internal quality assurer',
  epa_assessor: 'end-point assessor',
  employer: 'employer',
};

export const INVITE_ERROR_COPY: Record<string, string> = {
  invite_not_found: 'This invite link is not valid. Ask the apprentice to send it again.',
  invite_revoked: 'The apprentice cancelled this invite.',
  invite_expired: 'This invite has expired. Ask the apprentice to send a new one.',
  invite_already_used: 'Someone else has already accepted this invite.',
  wrong_account: 'This invite was sent to a different email address. Sign in with that account to accept it.',
  network: 'Could not reach Elec-Mate. Check your connection and try again.',
  cannot_assess_self: 'You cannot be your own assessor.',
  sign_in_required: 'Sign in to accept this invite.',
};

export async function previewAssessorInvite(token: string): Promise<AssessorInvitePreview> {
  const { data, error } = await rpc('get_assessor_invite', { p_token: token });
  if (error) return { error: 'network' };
  return data as AssessorInvitePreview;
}

export async function acceptAssessorInvite(token: string): Promise<AcceptResult> {
  const { data, error } = await rpc('accept_assessor_invite', { p_token: token });
  // A failed request is not a bad invite: keep the token and let them retry.
  if (error) return { error: 'network' };
  return data as AcceptResult;
}

export const assessorWorkspacePath = (learnerId?: string) =>
  learnerId ? `/assessor?learner=${learnerId}` : '/assessor';
