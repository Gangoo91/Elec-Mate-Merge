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
import type { Json } from '@/integrations/supabase/types';
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
  // Reuse an open link only while it is still valid — and refresh what it
  // shows, so the signer sees the record as it is now, not as it was when the
  // link was first made. An expired link is left alone and a new one issued.
  const { data: open } = await supabase
    .from('safety_signing_tokens')
    .select('id, public_token, expires_at')
    .eq('document_type', args.documentType)
    .eq('record_id', args.recordId)
    .eq('role', role)
    .is('signed_signature', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  const existing = open as { id: string; public_token: string; expires_at: string | null } | null;
  if (
    existing?.public_token &&
    (!existing.expires_at || new Date(existing.expires_at).getTime() > Date.now())
  ) {
    await supabase
      .from('safety_signing_tokens')
      .update({ summary: args.summary as unknown as Json })
      .eq('id', existing.id);
    return existing.public_token;
  }

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
    summary: args.summary as unknown as Json,
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
