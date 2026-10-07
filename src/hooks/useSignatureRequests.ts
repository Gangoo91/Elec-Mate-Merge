import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { getActingEmployerId } from '@/lib/actingEmployer';
import type { DocumentSnapshot, SignableType } from '@/lib/signatures/types';

/**
 * Signatures register (ELE-1993).
 *
 * Every request carries a frozen copy of a real document and is created by
 * `create_signature_request` (server token, server snapshot, firm-scoped).
 * The register is the whole firm's: RLS (my_employer_scope) lets the owner,
 * admins and office managers see every request, not only their own.
 * Signing, declining and revoking are server-side only; the office cannot
 * mark a request signed. The one office path is a PAPER signature: a scan of
 * the signed paper, who signed and when, and a declaration, recorded by
 * record_paper_signature and shown everywhere as "Signed on paper".
 */

/** The firm this user acts for: the owner's id for a co-admin, else their own (ELE-1831). */
const firmId = async (uid: string) => (await getActingEmployerId(uid)) ?? uid;

// Untyped RPC/table access for objects newer than the generated types.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

export type DocumentType =
  | 'Quote'
  | 'Contract'
  | 'Certificate'
  | 'RAMS'
  | 'Timesheet'
  | 'Completion'
  | 'Variation'
  | 'Invoice'
  | 'Handover';
export type SignatureStatus =
  'Pending' | 'Sent' | 'Viewed' | 'Signed' | 'Declined' | 'Expired' | 'Revoked';

export interface SignatureRequest {
  id: string;
  user_id: string;
  job_id?: string | null;
  document_type?: DocumentType | null;
  document_id?: string | null;
  document_title: string;
  signer_name: string;
  signer_email?: string | null;
  signer_phone?: string | null;
  status: SignatureStatus;
  signature_url?: string | null;
  signed_at?: string | null;
  ip_address?: string | null;
  expires_at?: string | null;
  message?: string | null;
  linked_invoice?: string | null;
  access_token?: string | null;
  created_at: string;
  updated_at: string;
  // ELE-1993
  document_snapshot?: DocumentSnapshot | null;
  document_refs?: Record<string, unknown> | null;
  document_hash?: string | null;
  signed_document_hash?: string | null;
  statement_text?: string | null;
  signature_path?: string | null;
  signature_method?: 'drawn' | 'typed' | 'paper' | null;
  signer_user_agent?: string | null;
  first_viewed_at?: string | null;
  last_viewed_at?: string | null;
  view_count?: number;
  last_sent_at?: string | null;
  send_count?: number;
  revoked_at?: string | null;
  declined_at?: string | null;
  decline_reason?: string | null;
  created_by?: string | null;
  created_by_name?: string | null;
  applied_at?: string | null;
  // Paper signature (record_paper_signature)
  paper_path?: string | null;
  paper_sha256?: string | null;
  paper_mime?: string | null;
  paper_size?: number | null;
  paper_signed_on?: string | null;
  paper_declaration?: string | null;
  recorded_by?: string | null;
  recorded_by_name?: string | null;
  recorded_at?: string | null;
  // Joined data
  job?: {
    id: string;
    title: string;
    client?: string;
  } | null;
}

/** The status the office should see (an expired link reads Expired, Viewed reads Opened). */
export type DisplayStatus =
  'Not sent' | 'Sent' | 'Opened' | 'Signed' | 'Declined' | 'Expired' | 'Revoked';

export function displayStatus(s: SignatureRequest): DisplayStatus {
  if (s.status === 'Signed') return 'Signed';
  if (s.status === 'Declined') return 'Declined';
  if (s.status === 'Revoked' || s.revoked_at) return 'Revoked';
  if (s.status === 'Expired' || (s.expires_at && new Date(s.expires_at) <= new Date()))
    return 'Expired';
  if (s.status === 'Viewed' || s.first_viewed_at) return 'Opened';
  if (s.status === 'Sent' || (s.send_count ?? 0) > 0) return 'Sent';
  return 'Not sent';
}

export const isOpenRequest = (s: SignatureRequest) =>
  ['Not sent', 'Sent', 'Opened'].includes(displayStatus(s));

/** When the next chase email is allowed (null = now). */
export function nextChaseAt(s: SignatureRequest): Date | null {
  if (!s.last_sent_at) return null;
  const t = new Date(s.last_sent_at).getTime() + 24 * 60 * 60 * 1000;
  return t > Date.now() ? new Date(t) : null;
}

export const signingUrl = (token: string) => `${window.location.origin}/sign/${token}`;

const SELECT = `*, job:employer_jobs(id, title, client)`;

// Fetch every signature request for the firm (optionally one job)
export function useSignatureRequests(jobId?: string | null) {
  return useQuery({
    queryKey: ['signatureRequests', 'list', jobId ?? 'all'],
    queryFn: async (): Promise<SignatureRequest[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      let q = db
        .from('signature_requests')
        .select(SELECT)
        .eq('user_id', await firmId(user.id))
        .order('created_at', { ascending: false })
        .limit(500);
      if (jobId) q = q.eq('job_id', jobId);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as SignatureRequest[];
    },
  });
}

// Pending requests (kept for older callers)
export function usePendingSignatures() {
  const all = useSignatureRequests();
  return { ...all, data: (all.data ?? []).filter(isOpenRequest) };
}

// Latest signature request linked to a specific document (quote/invoice/etc.)
export function useLatestDocumentSignatureRequest(
  documentType?: DocumentType,
  documentId?: string
) {
  return useQuery({
    queryKey: ['signatureRequests', 'document', documentType, documentId],
    enabled: !!documentType && !!documentId,
    queryFn: async (): Promise<SignatureRequest | null> => {
      const { data, error } = await db
        .from('signature_requests')
        .select('*')
        .eq('document_type', documentType!)
        .eq('document_id', documentId!)
        .neq('status', 'Revoked')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data as SignatureRequest | null;
    },
  });
}

// Stats for the register header
export function useSignatureStats() {
  const all = useSignatureRequests();
  const list = all.data ?? [];
  return {
    ...all,
    data: {
      total: list.length,
      pending: list.filter(isOpenRequest).length,
      signed: list.filter((s) => s.status === 'Signed').length,
      declined: list.filter((s) => s.status === 'Declined').length,
      expired: list.filter((s) => displayStatus(s) === 'Expired').length,
    },
  };
}

export interface CreateSignatureRequestInput {
  document_type: SignableType | DocumentType;
  /** Omit for a variation started from a job or an issue (it is created). */
  document_id?: string | null;
  signer_name: string;
  signer_email?: string | null;
  signer_phone?: string | null;
  message?: string | null;
  /** 1 to 90. */
  expires_in_days?: number;
  /** Older callers pass a date; converted to days. */
  expires_at?: string | null;
  /** Variation: { job_id | issue_id, value, description }. Handover: { report_ids }. */
  options?: Record<string, unknown>;
  /** Ignored: the server names the request from the document. */
  document_title?: string;
  /** Ignored: kept so older callers still compile. */
  status?: string;
  job_id?: string | null;
}

export interface CreatedSignatureRequest {
  id: string;
  access_token: string;
  document_id: string;
  document_title: string;
  emailed: boolean;
  emailError?: string | null;
}

/** Pull the readable message out of a functions.invoke error. */
async function invokeErrorMessage(error: unknown): Promise<string | null> {
  const ctx = (error as { context?: Response })?.context;
  if (ctx && typeof ctx.json === 'function') {
    try {
      const body = await ctx.json();
      if (body?.error) return String(body.error);
    } catch {
      /* not JSON */
    }
  }
  return null;
}

// Create a request on a real document (and email it when there is an address)
export function useCreateSignatureRequest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateSignatureRequestInput): Promise<CreatedSignatureRequest> => {
      const days = input.expires_in_days
        ? input.expires_in_days
        : input.expires_at
          ? Math.max(
              1,
              Math.min(
                90,
                Math.round((new Date(input.expires_at).getTime() - Date.now()) / 86400000)
              )
            )
          : 14;
      const options = { ...(input.options ?? {}) } as Record<string, unknown>;
      if (input.job_id && !options.job_id) options.job_id = input.job_id;

      const { data, error } = await db.rpc('create_signature_request', {
        p_document_type: input.document_type,
        p_document_id: input.document_id ?? null,
        p_signer_name: input.signer_name,
        p_signer_email: input.signer_email || null,
        p_signer_phone: input.signer_phone || null,
        p_message: input.message || null,
        p_expires_in_days: days,
        p_options: options,
      });
      if (error) throw new Error(error.message || 'Could not create the request');
      const created = data as Omit<CreatedSignatureRequest, 'emailed'>;

      let emailed = false;
      let emailError: string | null = null;
      if (input.signer_email) {
        const { error: sendError } = await supabase.functions.invoke('send-signature-request', {
          body: { signatureRequestId: created.id, kind: 'initial' },
        });
        if (sendError) {
          emailError =
            (await invokeErrorMessage(sendError)) ??
            'The request is ready, but the email did not send. Copy the link and send it yourself.';
        } else {
          emailed = true;
        }
      }
      return { ...created, emailed, emailError };
    },
    onSuccess: (data, input) => {
      queryClient.invalidateQueries({ queryKey: ['signatureRequests'] });
      queryClient.invalidateQueries({ queryKey: ['contract-signature-request'] });
      queryClient.invalidateQueries({ queryKey: ['job-financials'] });
      if (data.emailError) {
        toast({
          title: 'Request ready, email not sent',
          description: data.emailError,
          variant: 'destructive',
        });
      } else {
        toast({
          title: data.emailed ? 'Sent for signature' : 'Signing link ready',
          description: data.emailed
            ? `${input.signer_name} has an email with the document and a link to sign.`
            : 'Copy the link and send it to them by text or WhatsApp.',
        });
      }
    },
    onError: (error) => {
      toast({
        title: 'Could not create the request',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

// Chase by email (once a day, five times, enforced server-side)
export function useChaseSignatureRequest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (req: SignatureRequest) => {
      const kind = (req.send_count ?? 0) > 0 || req.status !== 'Pending' ? 'chase' : 'initial';
      const { error } = await supabase.functions.invoke('send-signature-request', {
        body: { signatureRequestId: req.id, kind },
      });
      if (error) {
        throw new Error(
          (await invokeErrorMessage(error)) ?? 'The reminder did not send. Copy the link instead.'
        );
      }
      return req;
    },
    onSuccess: (req) => {
      queryClient.invalidateQueries({ queryKey: ['signatureRequests'] });
      toast({ title: 'Reminder sent', description: `${req.signer_name} has been emailed again.` });
    },
    onError: (error) => {
      toast({ title: 'Not sent', description: error.message, variant: 'destructive' });
    },
  });
}

// Back-compat name
export const useResendSignatureRequest = useChaseSignatureRequest;

export function useRevokeSignatureRequest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await db.rpc('revoke_signature_request', { p_id: id });
      if (error) throw new Error(error.message);
      if (data?.error) throw new Error('This request is already finished.');
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['signatureRequests'] });
      toast({ title: 'Link cancelled', description: 'The signing link no longer works.' });
    },
    onError: (error) => {
      toast({ title: 'Could not cancel', description: error.message, variant: 'destructive' });
    },
  });
}

const APPLY_ERRORS: Record<string, string> = {
  not_signed_variation: 'Only a signed variation can be added to the job value.',
  already_applied: 'This variation is already in the job value.',
  variation_missing: 'The variation has been deleted.',
  variation_rejected: 'The variation was rejected in Job financials.',
  variation_changed: 'The variation price was changed after it was signed. Send it again.',
};

export function useApplySignedVariation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await db.rpc('apply_signed_variation', { p_id: id });
      if (error) throw new Error(error.message);
      if (data?.error)
        throw new Error(APPLY_ERRORS[data.error] ?? 'Could not update the job value.');
      return data as { value: number };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['signatureRequests'] });
      queryClient.invalidateQueries({ queryKey: ['job-financials'] });
      toast({
        title: 'Job value updated',
        description: 'The variation is approved in Job financials.',
      });
    },
    onError: (error) => {
      toast({ title: 'Not updated', description: error.message, variant: 'destructive' });
    },
  });
}

// Delete a request that was never signed (signed ones are evidence and stay)
export function useDeleteSignatureRequest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await db.from('signature_requests').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['signatureRequests'] });
      toast({ title: 'Request removed' });
    },
    onError: (error) => {
      toast({ title: 'Could not remove', description: error.message, variant: 'destructive' });
    },
  });
}

/**
 * The captured signature as a data URL: from the private bucket through a
 * short-lived signed URL, or the legacy data URL on older requests.
 */
export async function loadSignatureImage(
  req: Pick<SignatureRequest, 'signature_path' | 'signature_url'>
): Promise<string | null> {
  if (req.signature_path) {
    const { data, error } = await supabase.storage
      .from('signature-captures')
      .createSignedUrl(req.signature_path, 120);
    if (error || !data?.signedUrl) return null;
    const res = await fetch(data.signedUrl);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise<string | null>((resolve) => {
      const r = new FileReader();
      r.onload = () => resolve(typeof r.result === 'string' ? r.result : null);
      r.onerror = () => resolve(null);
      r.readAsDataURL(blob);
    });
  }
  if (req.signature_url?.startsWith('data:image')) return req.signature_url;
  return null;
}

export function useSignatureImage(req?: SignatureRequest | null) {
  return useQuery({
    queryKey: ['signatureRequests', 'image', req?.id, req?.signature_path],
    enabled: !!req && req.status === 'Signed' && !!(req.signature_path || req.signature_url),
    staleTime: 60_000,
    queryFn: () => loadSignatureImage(req!),
  });
}

export interface SignableCertificate {
  id: string;
  label: string;
  certificate_number: string;
  client_name: string | null;
  installation_address: string | null;
  inspection_date: string | null;
  has_pdf: boolean;
}

export function useSignableCertificates(search: string, enabled = true) {
  return useQuery({
    queryKey: ['signable-certificates', search],
    enabled,
    staleTime: 30_000,
    queryFn: async (): Promise<SignableCertificate[]> => {
      const { data, error } = await db.rpc('list_signable_certificates', {
        p_search: search.trim() || null,
        p_limit: 60,
      });
      if (error) throw error;
      return (data ?? []) as SignableCertificate[];
    },
  });
}

// ---------------------------------------------------------------- paper signatures

export const PAPER_BUCKET = 'signature-paper';
export const PAPER_MAX_BYTES = 15 * 1024 * 1024;
export const PAPER_DECLARATION = "I confirm this is the client's signature on this document.";

export const isPaperSignature = (s?: Pick<SignatureRequest, 'signature_method'> | null) =>
  s?.signature_method === 'paper';

const PAPER_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/heic': 'heic',
  'image/heif': 'heif',
  'image/webp': 'webp',
  'application/pdf': 'pdf',
};

/** The file's type, from its MIME or its name (some phones send none). */
export function paperFileType(file: File): { mime: string; ext: string } | null {
  if (PAPER_EXT[file.type]) return { mime: file.type, ext: PAPER_EXT[file.type] };
  const m = /\.(jpe?g|png|heic|heif|webp|pdf)$/i.exec(file.name);
  if (!m) return null;
  const ext = m[1].toLowerCase() === 'jpeg' ? 'jpg' : m[1].toLowerCase();
  const mime = Object.entries(PAPER_EXT).find(([, e]) => e === ext)?.[0] ?? '';
  return mime ? { mime, ext } : null;
}

/** Lower-case hex SHA-256 of the exact bytes. */
export async function sha256Hex(data: ArrayBuffer | Blob): Promise<string> {
  const buf = data instanceof Blob ? await data.arrayBuffer() : data;
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

const PAPER_ERRORS: Record<string, string> = {
  declaration_required: 'Tick the declaration to confirm it is their signature.',
  name_required: 'Enter the name of the person who signed.',
  date_required: 'Enter the date they signed.',
  date_in_future: 'The date they signed cannot be in the future.',
  date_too_old: 'That date is more than two years ago. Check it.',
  file_required: 'Add a photo or PDF of the signed paper.',
  file_used: 'That scan is already on another signature. Add the file again.',
  document_required: 'Choose the document they signed.',
  signed: 'This has already been signed.',
  declined: 'The client declined this request. Record it from the document instead.',
  revoked: 'This link was cancelled, so it cannot be signed. Record it from the document instead.',
  expired: 'This link has expired. Record it from the document instead.',
  not_open: 'This request is finished.',
  no_document: 'This request has no document attached. Record it from the document instead.',
  changed:
    'The document has changed since this request was made. Record the paper signature from the document so the record matches the version they signed.',
};

export function paperErrorCode(e: unknown): string | null {
  const msg = (e as { message?: string })?.message ?? '';
  const m = /paper:([a-z_]+)/.exec(msg);
  return m ? m[1] : null;
}

export function paperErrorMessage(e: unknown): string {
  const code = paperErrorCode(e);
  if (code && PAPER_ERRORS[code]) return PAPER_ERRORS[code];
  const msg = (e as { message?: string })?.message ?? '';
  if (/not allowed/i.test(msg))
    return 'Only the owner, an admin or the office manager can record a signature.';
  if (/not found for this company/i.test(msg))
    return 'That document was not found for this company.';
  if (/payload too large|exceeded|too large/i.test(msg))
    return 'That file is over 15 MB. Take a photo instead.';
  return msg || 'Could not record the signature. Check your connection and try again.';
}

export interface RecordPaperInput {
  /** An open request (Link ready, Sent or Opened)… */
  requestId?: string | null;
  /** …or straight from a document, built the same way a link would be. */
  documentType?: SignableType | DocumentType | null;
  documentId?: string | null;
  options?: Record<string, unknown>;
  signerName: string;
  /** yyyy-MM-dd, not in the future. */
  signedOn: string;
  file: File;
  declaration: boolean;
}

export interface RecordedPaper {
  id: string;
  document_title: string;
  signed_on: string;
}

/**
 * Upload the scan to the firm's private folder (sha-256 of the exact bytes),
 * then record it. A failed record removes the upload again.
 */
export function useRecordPaperSignature() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: RecordPaperInput): Promise<RecordedPaper> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Sign in first');
      const kind = paperFileType(input.file);
      if (!kind) throw new Error('Use a photo (JPG, PNG, HEIC) or a PDF.');
      if (input.file.size > PAPER_MAX_BYTES)
        throw new Error('That file is over 15 MB. Take a photo instead.');
      if (!input.declaration) throw new Error(PAPER_ERRORS.declaration_required);

      const firm = await firmId(user.id);
      const bytes = await input.file.arrayBuffer();
      const sha = await sha256Hex(bytes);
      const path = `${firm}/${crypto.randomUUID()}.${kind.ext}`;

      const { error: upErr } = await supabase.storage
        .from(PAPER_BUCKET)
        .upload(path, new Blob([bytes], { type: kind.mime }), {
          contentType: kind.mime,
          upsert: false,
        });
      if (upErr) throw new Error(paperErrorMessage(upErr));

      const { data, error } = await db.rpc('record_paper_signature', {
        p_request_id: input.requestId ?? null,
        p_document_type: input.requestId ? null : (input.documentType ?? null),
        p_document_id: input.requestId ? null : (input.documentId ?? null),
        p_options: input.requestId ? null : (input.options ?? {}),
        p_signer_name: input.signerName.trim(),
        p_signed_on: input.signedOn,
        p_file_path: path,
        p_file_sha256: sha,
        p_declaration: input.declaration,
      });
      if (error) {
        await supabase.storage
          .from(PAPER_BUCKET)
          .remove([path])
          .catch(() => undefined);
        const err = new Error(paperErrorMessage(error)) as Error & { code?: string | null };
        err.code = paperErrorCode(error);
        throw err;
      }
      return data as RecordedPaper;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['signatureRequests'] });
      queryClient.invalidateQueries({ queryKey: ['contract-signature-request'] });
      queryClient.invalidateQueries({ queryKey: ['job-financials'] });
    },
  });
}

export interface PaperScan {
  blob: Blob;
  url: string;
  mime: string;
  /** The bytes still match the fingerprint recorded with them. */
  matches: boolean;
}

/** The scan of a paper signature, read through a short-lived signed URL. */
export async function loadPaperScan(
  req: Pick<SignatureRequest, 'paper_path' | 'paper_sha256' | 'paper_mime'>
): Promise<PaperScan | null> {
  if (!req.paper_path) return null;
  const { data, error } = await supabase.storage
    .from(PAPER_BUCKET)
    .createSignedUrl(req.paper_path, 120);
  if (error || !data?.signedUrl) return null;
  const res = await fetch(data.signedUrl);
  if (!res.ok) return null;
  const blob = await res.blob();
  const matches = !!req.paper_sha256 && (await sha256Hex(blob)) === req.paper_sha256;
  return {
    blob,
    url: URL.createObjectURL(blob),
    mime: req.paper_mime || blob.type || '',
    matches,
  };
}

export function usePaperScan(req?: SignatureRequest | null) {
  return useQuery({
    queryKey: ['signatureRequests', 'paper', req?.id, req?.paper_path],
    enabled: !!req?.paper_path,
    staleTime: 60_000,
    queryFn: () => loadPaperScan(req!),
  });
}
