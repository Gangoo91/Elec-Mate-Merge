/**
 * useRemoteSignToken — generic remote sign-off for any Site Safety document.
 *
 * One polymorphic `safety_signing_tokens` table backs every module's remote
 * sign-off. The signature is captured ON the token row (via SECURITY DEFINER
 * RPCs), so the owner's module reads the token rows for its record to display
 * who signed remotely. No per-module table, RPC or public page needed.
 *
 * Public signing page: /safety-sign/:token  (PublicSafetySign.tsx)
 */

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/** Shape rendered by the public signing page. Keep it presentational + safe. */
export interface SignSummary {
  title: string;
  subtitle?: string;
  /** Label/value rows shown as the document summary. */
  lines?: { label: string; value: string }[];
  /** Bulleted detail sections (e.g. hazards, controls, precautions). */
  sections?: { heading: string; items: string[] }[];
  /** The confirmation statement the signer is agreeing to. */
  statement?: string;
}

export interface SafetySignatureRow {
  id: string;
  document_type: string;
  record_id: string;
  role: string;
  public_token: string;
  summary: SignSummary;
  created_at: string;
  expires_at: string;
  signed_name: string | null;
  signed_signature: string | null;
  signed_at: string | null;
}

/** Create (or reuse an existing unsigned) signing token; returns the public token. */
export async function createSafetySignToken(args: {
  documentType: string;
  recordId: string;
  role?: string;
  summary: SignSummary;
}): Promise<string | null> {
  const role = args.role ?? 'signatory';
  const { data: existing } = await supabase
    .from('safety_signing_tokens')
    .select('public_token, signed_signature')
    .eq('document_type', args.documentType)
    .eq('record_id', args.recordId)
    .eq('role', role)
    .is('signed_signature', null)
    .maybeSingle();
  if (existing?.public_token) return existing.public_token as string;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const token = crypto.randomUUID();
  const { error } = await supabase.from('safety_signing_tokens').insert({
    document_type: args.documentType,
    record_id: args.recordId,
    role,
    public_token: token,
    user_id: user.id,
    summary: args.summary as unknown as Record<string, unknown>,
  });
  if (error) return null;
  return token;
}

export function buildSignUrl(token: string): string {
  return `${window.location.origin}/safety-sign/${token}`;
}

/** Owner-side: all remote-sign tokens for a record (to display who signed). */
export function useRecordSignatures(documentType: string, recordId: string | null) {
  return useQuery({
    queryKey: ['safety-signing-tokens', documentType, recordId],
    enabled: !!recordId,
    queryFn: async (): Promise<SafetySignatureRow[]> => {
      if (!recordId) return [];
      const { data, error } = await supabase
        .from('safety_signing_tokens')
        .select('*')
        .eq('document_type', documentType)
        .eq('record_id', recordId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as SafetySignatureRow[];
    },
  });
}
