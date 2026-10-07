/**
 * Team comms (ELE-1959) — threads between the office and the team.
 *
 * Every write goes through a SECURITY DEFINER RPC that scopes the caller:
 * the office is my_employer_scope() (owner, admins, office managers); a worker
 * is an ACTIVE roster row (my_employee_ids()). Reads of replies use RLS on
 * employer_communication_replies. Attachments live in the PRIVATE `team-comms`
 * bucket and are only ever opened through short-lived signed URLs.
 *
 * The RPCs postdate the generated types, hence the `as never` casts at the
 * boundary — each result is narrowed once here.
 */
import { supabase } from '@/integrations/supabase/client';
import { compressImageForUpload, isImageFile } from '@/utils/imageUploadUtils';

export type CommsType = 'announcement' | 'message' | 'alert';
export type CommsPriority = 'low' | 'normal' | 'high' | 'urgent';
export type CommsAudience = 'all' | 'job' | 'people';

export interface CommsAttachment {
  path: string;
  name: string;
  mime: string | null;
  size: number | null;
}

export interface OfficeThreadSummary {
  id: string;
  type: CommsType;
  title: string;
  content: string;
  priority: CommsPriority;
  is_pinned: boolean;
  requires_acknowledgement: boolean;
  attachments: CommsAttachment[] | null;
  created_at: string;
  sent_by_name: string | null;
  target_audience: string;
  job_id: string | null;
  job_title: string | null;
  recipients_total: number;
  read_count: number;
  ack_count: number;
  reply_count: number;
  unread_replies: number;
  last_reply_body: string | null;
  last_reply_author: string | null;
  last_reply_kind: 'office' | 'worker' | null;
  last_reply_at: string | null;
  office_seen_at: string | null;
  employer_read_at: string | null;
  last_chased_at: string | null;
  chase_count: number;
}

export interface WorkerThreadSummary {
  id: string;
  employee_id: string;
  type: CommsType;
  title: string;
  content: string;
  priority: CommsPriority;
  is_pinned: boolean;
  requires_acknowledgement: boolean;
  attachments: CommsAttachment[] | null;
  created_at: string;
  sent_by_name: string | null;
  job_title: string | null;
  read_at: string | null;
  acknowledged_at: string | null;
  last_seen_at: string | null;
  reply_count: number;
  unread_replies: number;
  last_reply_body: string | null;
  last_reply_kind: 'office' | 'worker' | null;
  last_reply_at: string | null;
}

export interface CommsReply {
  id: string;
  communication_id: string;
  thread_employee_id: string | null;
  author_user_id: string;
  author_employee_id: string | null;
  author_kind: 'office' | 'worker';
  author_name: string | null;
  body: string;
  attachments: CommsAttachment[];
  created_at: string;
}

export interface CommsRecipient {
  employee_id: string;
  name: string;
  status: string | null;
  /** False = on the roster but not signed in to the app yet (no push, no bell). */
  has_app: boolean;
  read_at: string | null;
  acknowledged_at: string | null;
  last_seen_at: string | null;
}

export interface CommsMessageMeta {
  id: string;
  office_seen_at: string | null;
  requires_acknowledgement: boolean;
}

export interface JobOption {
  job_id: string;
  title: string;
  status: string | null;
  crew: number;
}

/** The DB raises with a plain-English message; surface it as-is. */
const fail = (error: { message?: string } | null, fallback: string): never => {
  throw new Error(error?.message || fallback);
};

export async function getOfficeInbox(): Promise<OfficeThreadSummary[]> {
  const { data, error } = await supabase.rpc('comms_office_inbox' as never);
  if (error) fail(error, 'Could not load messages');
  return (data as unknown as OfficeThreadSummary[]) ?? [];
}

export async function getMyInbox(): Promise<WorkerThreadSummary[]> {
  const { data, error } = await supabase.rpc('comms_my_inbox' as never);
  if (error) fail(error, 'Could not load messages');
  return (data as unknown as WorkerThreadSummary[]) ?? [];
}

export async function getJobOptions(): Promise<JobOption[]> {
  const { data, error } = await supabase.rpc('comms_job_options' as never);
  if (error) fail(error, 'Could not load jobs');
  return (data as unknown as JobOption[]) ?? [];
}

/** Replies the caller may see (RLS: office sees all; a worker their own + to-everyone). */
export async function getReplies(communicationId: string): Promise<CommsReply[]> {
  const { data, error } = await supabase
    .from('employer_communication_replies' as never)
    .select(
      'id, communication_id, thread_employee_id, author_user_id, author_employee_id, author_kind, author_name, body, attachments, created_at'
    )
    .eq('communication_id', communicationId)
    .order('created_at', { ascending: true })
    .limit(500);
  if (error) fail(error, 'Could not load replies');
  return (data as unknown as CommsReply[]) ?? [];
}

export async function getMessageMeta(communicationId: string): Promise<CommsMessageMeta | null> {
  const { data, error } = await supabase
    .from('employer_communications')
    .select('id, office_seen_at, requires_acknowledgement' as never)
    .eq('id', communicationId)
    .maybeSingle();
  if (error) fail(error, 'Could not load the message');
  return (data as unknown as CommsMessageMeta | null) ?? null;
}

/** Office only — who it went to, who has read / acknowledged / last looked. */
export async function getRecipients(communicationId: string): Promise<CommsRecipient[]> {
  const { data, error } = await supabase
    .from('employer_communication_recipients')
    .select(
      'employee_id, read_at, acknowledged_at, last_seen_at, employee:employer_employees(name, status, user_id)' as never
    )
    .eq('communication_id', communicationId);
  if (error) fail(error, 'Could not load who it went to');
  type Row = {
    employee_id: string;
    read_at: string | null;
    acknowledged_at: string | null;
    last_seen_at: string | null;
    employee: { name: string | null; status: string | null; user_id: string | null } | null;
  };
  return ((data as unknown as Row[]) ?? [])
    .map((r) => ({
      employee_id: r.employee_id,
      name: r.employee?.name || 'Team member',
      status: r.employee?.status ?? null,
      has_app: !!r.employee?.user_id,
      read_at: r.read_at,
      acknowledged_at: r.acknowledged_at,
      last_seen_at: r.last_seen_at,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export interface SendInput {
  title: string;
  body: string;
  type: CommsType;
  priority: CommsPriority;
  audience: CommsAudience;
  jobId?: string | null;
  employeeIds?: string[];
  requiresAck: boolean;
  pinned: boolean;
  attachments: CommsAttachment[];
}

export async function sendMessage(input: SendInput): Promise<string> {
  const { data, error } = await supabase.rpc(
    'comms_send' as never,
    {
      p_title: input.title,
      p_body: input.body,
      p_type: input.type,
      p_priority: input.priority,
      p_audience: input.audience,
      p_job_id: input.audience === 'job' ? (input.jobId ?? null) : null,
      p_employee_ids: input.audience === 'people' ? (input.employeeIds ?? []) : null,
      p_requires_ack: input.requiresAck,
      p_pinned: input.pinned,
      p_attachments: input.attachments.map((a) => ({ path: a.path, name: a.name })),
    } as never
  );
  if (error) fail(error, 'Message not sent');
  return data as unknown as string;
}

export async function sendReply(input: {
  communicationId: string;
  body: string;
  attachments: CommsAttachment[];
  toEmployeeId?: string | null;
  /** Which hat: a manager can also be on the roster. */
  as: 'office' | 'worker';
}): Promise<string> {
  const { data, error } = await supabase.rpc(
    'comms_reply' as never,
    {
      p_comm: input.communicationId,
      p_body: input.body,
      p_attachments: input.attachments.map((a) => ({ path: a.path, name: a.name })),
      p_to_employee: input.as === 'office' ? (input.toEmployeeId ?? null) : null,
      p_as: input.as,
    } as never
  );
  if (error) fail(error, 'Reply not sent');
  return data as unknown as string;
}

export async function markSeen(communicationId: string, as: 'office' | 'worker'): Promise<void> {
  const { error } = await supabase.rpc(
    'comms_mark_seen' as never,
    { p_comm: communicationId, p_as: as } as never
  );
  if (error) fail(error, 'Could not update');
}

export async function acknowledge(communicationId: string): Promise<string> {
  const { data, error } = await supabase.rpc(
    'comms_acknowledge' as never,
    { p_comm: communicationId } as never
  );
  if (error) fail(error, 'Could not acknowledge');
  return data as unknown as string;
}

/** Returns how many people were chased. Throws the DB's "already chased at…" message. */
export async function chase(communicationId: string): Promise<number> {
  const { data, error } = await supabase.rpc('comms_chase' as never, { p_comm: communicationId } as never);
  if (error) fail(error, 'Could not chase');
  return (data as unknown as number) ?? 0;
}

/* ── Attachments ─────────────────────────────────────────────────────────── */

const BUCKET = 'team-comms';
export const MAX_ATTACHMENTS = 6;
const MAX_BYTES = 15 * 1024 * 1024;
const ALLOWED = /^(image\/(jpeg|png|webp|heic|heif|gif)|application\/pdf)$/;

const safeName = (name: string) =>
  name
    .normalize('NFKD')
    .replace(/[^\w.-]+/g, '-')
    .replace(/-+/g, '-')
    .slice(-80) || 'file';

/**
 * Upload into <firm>/<my uid>/… — the only folder the storage policy lets the
 * caller write to, and the only paths comms_send / comms_reply will accept.
 */
export async function uploadAttachment(firmId: string, file: File): Promise<CommsAttachment> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Sign in first');

  const lower = file.name.toLowerCase();
  const isHeic = lower.endsWith('.heic') || lower.endsWith('.heif');
  let toSend = file;
  if (isImageFile(file) || isHeic) {
    try {
      toSend = await compressImageForUpload(file);
    } catch {
      toSend = file;
    }
  }
  const mime = toSend.type || (isHeic ? 'image/heic' : '');
  if (!ALLOWED.test(mime)) throw new Error('Photos and PDFs only');
  if (toSend.size > MAX_BYTES) throw new Error('That file is over 15 MB');

  const name = file.name || 'Attachment';
  const path = `${firmId}/${user.id}/${crypto.randomUUID()}-${safeName(toSend.name || name)}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, toSend, { contentType: mime, upsert: false });
  if (error) fail(error, 'Upload failed');
  return { path, name, mime, size: toSend.size };
}

/** Remove an upload that was never sent (the policy refuses once it is attached). */
export async function discardAttachment(path: string): Promise<void> {
  await supabase.storage.from(BUCKET).remove([path]);
}

/** Signed URLs, 30 minutes. Never a public URL. */
export async function signAttachments(paths: string[]): Promise<Record<string, string>> {
  if (paths.length === 0) return {};
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrls(paths, 60 * 30);
  if (error) return {};
  const out: Record<string, string> = {};
  (data ?? []).forEach((row) => {
    if (row.path && row.signedUrl) out[row.path] = row.signedUrl;
  });
  return out;
}

export const isImageAttachment = (a: CommsAttachment) =>
  (a.mime ?? '').startsWith('image/') || /\.(jpe?g|png|webp|gif|heic|heif)$/i.test(a.name);
