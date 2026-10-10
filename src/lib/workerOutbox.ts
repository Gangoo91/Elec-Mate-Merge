import { openDB, type IDBPDatabase } from 'idb';
import { supabase } from '@/integrations/supabase/client';
import { queryClient } from '@/lib/queryClient';
import { isOfflineError } from '@/lib/workerOfflineCache';
import { compressImageForUpload } from '@/utils/imageUploadUtils';
import { workerSafetyRow, type WorkerSafetyPayload } from '@/lib/safetyIncidentRows';

/* ==========================================================================
   workerOutbox — Worker Tools works in a basement (ELE-1828).

   The worker actions that happen where there is no signal (clock in / out, a
   past day, a snag or safety report with photos, a progress note with photos,
   a task tick, a pack sign-off) are written to THIS PHONE first (IndexedDB,
   photos as compressed blobs) and then sent, oldest first. Same shape as the
   college register outbox (ELE-1887), which is attendance-only; this one is
   the worker's. The certificate sync queue (utils/syncQueue) is untouched.

   Never duplicates. Every op carries a client-generated id that IS the row's
   primary key (or, for updates, a guarded update that is a no-op the second
   time). A retry after a send that landed but whose answer never came back
   (the app killed mid-sync, the lift doors closing) hits the primary key and
   is recognised as "already there". Photo files go to a path made from the
   op id, so a re-upload finds the file already stored.

   Never silently loses anything. Only a definite answer from the server takes
   an op out of the queue. A refusal or a conflict (the office approved the day
   or changed the task meanwhile) becomes a note the worker sees, with what
   they did kept so it can be tried again; nothing overwrites the office.

   Original times. Clock times, the sign-off time, a task's completed time and
   a report's created time are the phone's, taken when the worker tapped.
   ========================================================================== */

export type OutboxKind =
  | 'clock_in'
  | 'clock_out'
  | 'timesheet'
  | 'snag'
  | 'incident'
  | 'progress_note'
  | 'task_status'
  | 'pack_signoff'
  | 'checklist_item'
  /** ELE-2068: "Job done" on site, one op for the whole flow. */
  | 'job_done'
  /** ELE-2071: a receipt or supplier bill photographed (or a PDF) to read later. */
  | 'receipt'
  /** Gap #3: a certificate started from the job with no signal (matched to the job later). */
  | 'cert_start'
  /** Gap #3 / #21: an expense claim (photo receipt) made with no signal. */
  | 'expense'
  /** Gap #3 / #21: a mileage claim made with no signal. */
  | 'mileage';

export interface OutboxPhoto {
  blob: Blob;
  type: string;
  ext: string;
}

export interface OutboxOp {
  /** Client-generated; the row id the op creates. The idempotency key. */
  id: string;
  seq: number;
  kind: OutboxKind;
  userId: string;
  /** What the worker sees: "Done · Fit RCBO board". */
  label: string;
  /** Second line, usually the job: "Smith Road rewire". */
  detail?: string | null;
  jobId?: string | null;
  payload: Record<string, unknown>;
  photos?: OutboxPhoto[];
  /** When the worker tapped (phone time). */
  queued_at: string;
  attempts: number;
  last_error?: string | null;
}

/** An op the server would not take, kept so the worker is told and can retry. */
export interface OutboxNote extends OutboxOp {
  reason: string;
  /** The office changed the record meanwhile (vs a plain refusal). */
  conflict: boolean;
  noted_at: string;
}

export interface OutboxState {
  /** Waiting to send, for the signed-in worker, oldest first. */
  pending: OutboxOp[];
  notes: OutboxNote[];
  syncing: boolean;
  online: boolean;
  lastSentAt: string | null;
  /** False until the phone's copy has been read. */
  ready: boolean;
  /** IndexedDB unavailable: ops live in memory only until sent. */
  memoryOnly: boolean;
}

export class OutboxRefusedError extends Error {
  conflict: boolean;
  constructor(reason: string, conflict: boolean) {
    super(reason);
    this.name = 'OutboxRefusedError';
    this.conflict = conflict;
  }
}

/* ---- storage ------------------------------------------------------------ */

const DB_NAME = 'elec-mate-worker-outbox';
const OPS = 'ops';
const NOTES = 'notes';
const RETRY_MS = 20_000;

let dbPromise: Promise<IDBPDatabase> | null = null;
let memoryOnly = false;

function db(): Promise<IDBPDatabase> {
  if (typeof indexedDB === 'undefined') {
    return Promise.reject(new Error('IndexedDB is not available'));
  }
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(d) {
        if (!d.objectStoreNames.contains(OPS)) d.createObjectStore(OPS, { keyPath: 'id' });
        if (!d.objectStoreNames.contains(NOTES)) d.createObjectStore(NOTES, { keyPath: 'id' });
      },
    }).catch((e) => {
      dbPromise = null;
      throw e;
    });
  }
  return dbPromise;
}

let ops: OutboxOp[] = [];
let notes: OutboxNote[] = [];
let ready = false;
let loading: Promise<void> | null = null;
let currentUid: string | null = null;
let syncing = false;
let lastSentAt: string | null = null;

function load(): Promise<void> {
  if (!loading) {
    loading = (async () => {
      try {
        // WebKit's IndexedDB can hang on open (never resolving). Don't let that
        // freeze every clock-in and task tick: give up after 4s and run from
        // memory, as when IndexedDB is missing.
        const d = await Promise.race([
          db(),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('IndexedDB open timed out')), 4_000)
          ),
        ]);
        const [o, n] = await Promise.all([d.getAll(OPS), d.getAll(NOTES)]);
        // Anything queued in memory before the read finished stays.
        const have = new Set(ops.map((x) => x.id));
        ops = [...(o as OutboxOp[]).filter((x) => !have.has(x.id)), ...ops].sort(
          (a, b) => a.seq - b.seq
        );
        notes = n as OutboxNote[];
      } catch {
        memoryOnly = true;
      }
      ready = true;
      emit();
    })();
  }
  return loading;
}

async function putOp(op: OutboxOp) {
  if (memoryOnly) return;
  try {
    await (await db()).put(OPS, op);
  } catch {
    memoryOnly = true;
  }
}
async function deleteOp(id: string) {
  if (memoryOnly) return;
  try {
    await (await db()).delete(OPS, id);
  } catch {
    /* in memory it is gone; the next start would resend, which is idempotent */
  }
}
async function putNote(n: OutboxNote) {
  if (memoryOnly) return;
  try {
    await (await db()).put(NOTES, n);
  } catch {
    /* ignore */
  }
}
async function deleteNote(id: string) {
  if (memoryOnly) return;
  try {
    await (await db()).delete(NOTES, id);
  } catch {
    /* ignore */
  }
}

/* ---- subscribers -------------------------------------------------------- */

type Listener = () => void;
const listeners = new Set<Listener>();
let snapshot: OutboxState | null = null;

function isOnline() {
  return typeof navigator === 'undefined' ? true : navigator.onLine !== false;
}

export function getOutboxState(): OutboxState {
  if (!snapshot) {
    snapshot = {
      pending: ops.filter((o) => o.userId === currentUid),
      notes: notes
        .filter((n) => n.userId === currentUid)
        .sort((a, b) => b.noted_at.localeCompare(a.noted_at)),
      syncing,
      online: isOnline(),
      lastSentAt,
      ready,
      memoryOnly,
    };
  }
  return snapshot;
}
function emit() {
  snapshot = null;
  listeners.forEach((l) => l());
}
export function subscribeOutbox(l: Listener): () => void {
  listeners.add(l);
  start();
  return () => {
    listeners.delete(l);
  };
}

/** Resolves once the phone's copy of the queue has been read. */
export function outboxReady(): Promise<void> {
  start();
  return load();
}

/** Pending ops for the signed-in worker (after outboxReady()). */
export function pendingOps(kind?: OutboxKind): OutboxOp[] {
  return ops.filter((o) => o.userId === currentUid && (!kind || o.kind === kind));
}

/* ---- queueing ----------------------------------------------------------- */

export interface QueueInput {
  /** Optional: pass when the caller needs the id first (the row id). */
  id?: string;
  kind: OutboxKind;
  label: string;
  detail?: string | null;
  jobId?: string | null;
  payload: Record<string, unknown>;
  photos?: OutboxPhoto[];
  /** Defaults to now. */
  queued_at?: string;
}

/** Shorten at a word, never mid-word: "isolated and locked off…". */
export function clipWords(text: string, max = 64): string {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const at = cut.lastIndexOf(' ');
  return `${(at > max * 0.5 ? cut.slice(0, at) : cut).replace(/[\s,.;:—-]+$/, '')}…`;
}

export function newClientId(): string {
  const c = typeof crypto !== 'undefined' ? crypto : undefined;
  if (c && 'randomUUID' in c) return c.randomUUID();
  // RFC 4122 v4 fallback for old WebViews.
  const b = new Uint8Array(16);
  if (c) c.getRandomValues(b);
  else for (let i = 0; i < 16; i++) b[i] = Math.floor(Math.random() * 256);
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

/** Compress a photo on the phone and hold it for the outbox (10MB cap, images only). */
export async function holdPhoto(file: File): Promise<OutboxPhoto> {
  if (!file.type.startsWith('image/') && !/\.(heic|heif)$/i.test(file.name)) {
    throw new Error('Only images can be attached');
  }
  const small = await compressImageForUpload(file).catch(() => file);
  if (small.size > 10 * 1024 * 1024) throw new Error('Photo too large (10MB max)');
  const type = small.type || 'image/jpeg';
  const ext = type === 'image/png' ? 'png' : type === 'image/webp' ? 'webp' : 'jpg';
  return { blob: small, type, ext };
}

async function resolveUid(): Promise<string | null> {
  try {
    const { data } = await supabase.auth.getSession();
    const uid = data.session?.user?.id ?? null;
    if (uid && uid !== currentUid) {
      currentUid = uid;
      emit();
    }
    return uid ?? currentUid;
  } catch {
    return currentUid;
  }
}

/** Write to the phone. Resolves once it is stored. Starts a send. */
export async function enqueue(input: QueueInput): Promise<OutboxOp> {
  await load();
  const uid = await resolveUid();
  if (!uid) throw new Error('Sign in again to save this');
  const op: OutboxOp = {
    id: input.id ?? newClientId(),
    seq: Date.now() * 1000 + (seqBump++ % 1000),
    kind: input.kind,
    userId: uid,
    label: input.label,
    detail: input.detail ?? null,
    jobId: input.jobId ?? null,
    payload: input.payload,
    photos: input.photos,
    queued_at: input.queued_at ?? new Date().toISOString(),
    attempts: 0,
    last_error: null,
  };
  await putOp(op);
  ops = [...ops.filter((o) => o.id !== op.id), op].sort((a, b) => a.seq - b.seq);
  emit();
  void flushOutbox();
  return op;
}
let seqBump = 0;

export type SubmitResult = 'sent' | 'queued';

/**
 * Queue an action and wait (briefly) to hear how it went:
 *  'sent'   — it reached the server.
 *  'queued' — no signal (or slow); it is on the phone and will send itself.
 * Throws OutboxRefusedError when the server said no; the worker is still on
 * the form, so that op is not kept as a note.
 */
export async function submitWorkerAction(
  input: QueueInput,
  waitMs = 10_000
): Promise<{ result: SubmitResult; op: OutboxOp }> {
  const op = await enqueue(input);
  if (!isOnline()) return { result: 'queued', op };
  const outcome = await new Promise<SubmitResult | OutboxRefusedError>((resolve) => {
    const timer = setTimeout(() => {
      waiters.delete(op.id);
      resolve('queued');
    }, waitMs);
    waiters.set(op.id, (r) => {
      clearTimeout(timer);
      waiters.delete(op.id);
      resolve(r);
    });
    // The op may have been settled before the waiter was registered.
    if (!ops.some((o) => o.id === op.id)) {
      const note = notes.find((n) => n.id === op.id);
      waiters.get(op.id)?.(note ? new OutboxRefusedError(note.reason, note.conflict) : 'sent');
    }
  });
  if (outcome instanceof OutboxRefusedError) {
    await dismissNote(op.id);
    throw outcome;
  }
  return { result: outcome, op };
}

const waiters = new Map<string, (r: SubmitResult | OutboxRefusedError) => void>();

/** Drop a waiting op the worker cancelled before it went (e.g. cancel clock-in). */
export async function cancelPending(id: string): Promise<boolean> {
  await load();
  if (!ops.some((o) => o.id === id)) return false;
  ops = ops.filter((o) => o.id !== id);
  await deleteOp(id);
  emit();
  return true;
}

export async function dismissNote(id: string) {
  notes = notes.filter((n) => n.id !== id);
  await deleteNote(id);
  emit();
}

/** Put a refused / conflicted op back in the queue to try again. */
export async function retryNote(id: string) {
  const n = notes.find((x) => x.id === id);
  if (!n) return;
  const { reason: _r, conflict: _c, noted_at: _t, ...op } = n;
  void _r;
  void _c;
  void _t;
  const base = Date.now() * 1000;
  const again: OutboxOp = { ...op, attempts: 0, last_error: null, seq: base };
  // A clock-out held behind this clock-in goes straight after it.
  const followers = notes
    .filter(
      (x) => n.kind === 'clock_in' && x.kind === 'clock_out' && x.payload.timesheetId === n.id
    )
    .map((x, i): OutboxOp => {
      const { reason: _a, conflict: _b, noted_at: _d, ...rest } = x;
      void _a;
      void _b;
      void _d;
      return { ...rest, attempts: 0, last_error: null, seq: base + 1 + i };
    });
  for (const o of [again, ...followers]) {
    await putOp(o);
    ops = [...ops.filter((x) => x.id !== o.id), o].sort((a, b) => a.seq - b.seq);
    await dismissNote(o.id);
  }
  void flushOutbox();
}

/* ---- sending ------------------------------------------------------------ */

type PgErr = { message?: string; code?: string; details?: string; statusCode?: string } | null;

/** A definite answer from the database, not a dropped connection. */
function isRefusal(e: unknown): boolean {
  const err = e as PgErr;
  if (!err) return false;
  if (isOfflineError(err)) return false;
  const code = String(err.code ?? '').trim();
  const status = String(err.statusCode ?? '').trim();
  if (!code && !status) return false;
  // Gateway / expired sign-in: retry (the session refreshes, the op goes up).
  if (
    /^PGRST00/.test(code) ||
    /^PGRST3/.test(code) ||
    /^5\d\d$/.test(code) ||
    /^5\d\d$/.test(status)
  )
    return false;
  if (status === '401' || (status === '403' && /jwt|token/i.test(err.message ?? ''))) return false;
  return true;
}

class Conflict extends Error {}
/** Can't go until an earlier refused item is sorted (kept, with Try again). */
class Held extends Error {}

const duplicatePk = (e: PgErr) =>
  !!e && e.code === '23505' && /_pkey/.test(`${e.message ?? ''} ${e.details ?? ''}`);

/** Insert a row by its client id; a second send of the same id is "already there". */
async function insertOnce(table: string, row: Record<string, unknown>) {
  const { error } = await supabase.from(table as never).insert(row as never);
  if (!error || duplicatePk(error)) return;
  throw error;
}

/** Upload held photos to paths made from the op id, so a resend finds them stored. */
async function uploadPhotos(
  op: OutboxOp,
  folder: 'issues' | 'notes' | 'checklists' | 'jobdone'
): Promise<string[]> {
  const paths: string[] = [];
  for (const [i, p] of (op.photos ?? []).entries()) {
    const path = `${op.userId}/${folder}/${op.jobId}/${op.id}-${i}.${p.ext}`;
    const { error } = await supabase.storage
      .from('visual-uploads')
      .upload(path, p.blob, { contentType: p.type });
    if (error) {
      const e = error as unknown as { statusCode?: string; message?: string };
      const exists = e.statusCode === '409' || /already exists|duplicate/i.test(e.message ?? '');
      if (!exists) throw error;
    }
    paths.push(path);
  }
  return paths;
}

const sameInstant = (a?: string | null, b?: string | null) =>
  !!a && !!b && Math.abs(new Date(a).getTime() - new Date(b).getTime()) < 1000;

/** Never in the future (a phone clock running fast), never before it was queued. */
const phoneTime = (iso: string) => {
  const t = new Date(iso).getTime();
  return new Date(Math.min(t, Date.now())).toISOString();
};

const SENDERS: Record<OutboxKind, (op: OutboxOp) => Promise<void>> = {
  /**
   * ELE-2068 "Job done": photos first (paths made from the op id, so a resend
   * finds them stored), then ONE call. complete_job_on_site takes the op id as
   * the completion's id: a resend after a lost answer gets the first result
   * back and nothing is done twice. Completion checks answered in the flow are
   * queued before this op, so the server's checks gate sees them first.
   */
  async job_done(op) {
    const p = op.payload as { jobId: string; payload: Record<string, unknown> };
    const held = await uploadPhotos(op, 'jobdone');
    const payload = {
      ...p.payload,
      photos: [...(((p.payload.photos as string[]) ?? []) as string[]), ...held],
      completed_at: phoneTime(op.queued_at),
    };
    const { data, error } = await supabase.rpc(
      'complete_job_on_site' as never,
      { p_id: op.id, p_job: p.jobId, p_payload: payload } as never
    );
    if (error) throw error;
    // Gap #3: the firm sends the customer's summary automatically and it is
    // ready: ask the sender now (it sends a queued message once; if it can't
    // be reached, the firm's 5-minute dispatcher sends it).
    const cm = (data as { customer_message?: { id?: string; status?: string } } | null)
      ?.customer_message;
    if (cm?.id && cm.status === 'queued') {
      void supabase.functions
        .invoke('job-done-customer-message', { body: { message_id: cm.id } })
        .catch(() => undefined);
    }
  },

  /**
   * Gap #3: "Start a certificate" with no signal. The phone opened the form
   * with the job's details; this records the start at the phone's time so the
   * finished certificate still matches this job, and links one that has
   * already synced. The op id is the start's id, so a resend changes nothing.
   */
  async cert_start(op) {
    const p = op.payload as { jobId: string; reportType: string };
    const { error } = await supabase.rpc(
      'note_cert_start_offline' as never,
      {
        p_id: op.id,
        p_job: p.jobId,
        p_report_type: p.reportType,
        p_started_at: phoneTime(op.queued_at),
      } as never
    );
    if (error) throw error;
  },

  /**
   * Gap #3 / #21: an expense claim made with no signal. The receipt photo goes
   * to the worker's receipts folder at a path made from the op id, and the
   * claim row's id IS the op id, so a resend is "already there".
   */
  async expense(op) {
    const p = op.payload as { employeeId: string; row: Record<string, unknown> };
    let receiptUrl: string | null = null;
    const file = op.photos?.[0];
    if (file) {
      const path = `receipts/worker/${p.employeeId}/${op.id}.${file.ext}`;
      const { error: upErr } = await supabase.storage
        .from('expense-receipts')
        .upload(path, file.blob, { contentType: file.type });
      if (upErr) {
        const e = upErr as unknown as { statusCode?: string; message?: string };
        const exists = e.statusCode === '409' || /already exists|duplicate/i.test(e.message ?? '');
        if (!exists) throw upErr;
      }
      receiptUrl = supabase.storage.from('expense-receipts').getPublicUrl(path).data.publicUrl;
    }
    await insertOnce('employer_expense_claims', {
      ...p.row,
      id: op.id,
      employee_id: p.employeeId,
      status: 'Pending',
      submitted_date: phoneTime(op.queued_at).slice(0, 10),
      receipt_url: receiptUrl,
    });
  },

  /** Gap #3 / #21: a mileage claim made with no signal (id = op id, once). */
  async mileage(op) {
    const p = op.payload as { params: Record<string, unknown> };
    const { error } = await supabase.rpc(
      'submit_my_mileage_claim_once' as never,
      { ...p.params, p_id: op.id } as never
    );
    if (error) throw error;
  },

  /**
   * ELE-2071: a receipt or bill. The file goes to the private expense-receipts
   * bucket at a path made from the op id, then capture_receipt records it
   * (id = op id, so a resend is "already there"). Reading it with AI happens
   * later, online, and nothing is posted until the person confirms.
   */
  async receipt(op) {
    const p = op.payload as {
      firmId: string;
      source: 'worker' | 'office';
      jobId?: string | null;
      note?: string | null;
      hash?: string | null;
      fileName?: string | null;
    };
    const file = op.photos?.[0];
    if (!file) throw new Conflict('The receipt photo was lost on this phone. Take it again.');
    const path = `captures/${op.userId}/${op.id}.${file.ext}`;
    const { error: upErr } = await supabase.storage
      .from('expense-receipts')
      .upload(path, file.blob, { contentType: file.type });
    if (upErr) {
      const e = upErr as unknown as { statusCode?: string; message?: string };
      const exists = e.statusCode === '409' || /already exists|duplicate/i.test(e.message ?? '');
      if (!exists) throw upErr;
    }
    const { error } = await supabase.rpc(
      'capture_receipt' as never,
      {
        p_id: op.id,
        p_firm: p.firmId,
        p_path: path,
        p_mime: file.type,
        p_hash: p.hash ?? null,
        p_source: p.source,
        p_job: p.jobId ?? null,
        p_note: p.note ?? null,
        p_file_name: p.fileName ?? null,
        p_captured_at: phoneTime(op.queued_at),
      } as never
    );
    if (error) throw error;
  },

  /**
   * A pre-start / completion checklist answer (ELE-1826's record_my_checklist_item).
   * The RPC keeps one answer per item and person, so a resend replaces the same
   * row instead of adding one. It is queued before the clock-in it unlocks, so
   * the server's clock-in gate sees it first.
   */
  async checklist_item(op) {
    const p = op.payload as { params: Record<string, unknown> };
    const held = await uploadPhotos(op, 'checklists');
    const params = { ...p.params } as Record<string, unknown>;
    if (held.length > 0) params.p_photos = [...((params.p_photos as string[]) ?? []), ...held];
    const { error } = await supabase.rpc('record_my_checklist_item' as never, params as never);
    if (error) throw error;
  },

  async clock_in(op) {
    const row = { ...(op.payload.row as Record<string, unknown>), id: op.id };
    const { error } = await supabase.from('employer_timesheets').insert(row as never);
    if (!error || duplicatePk(error)) return;
    if (error.code === '23505') {
      throw new Conflict(
        'You were already clocked in on another phone or by the office, so this clock-in was not added. Check your timesheet.'
      );
    }
    throw error;
  },

  async clock_out(op) {
    const p = op.payload as {
      timesheetId: string;
      values: Record<string, unknown> & { clock_out: string };
    };
    const { data, error } = await supabase
      .from('employer_timesheets')
      .update(p.values as never)
      .eq('id', p.timesheetId)
      .eq('status', 'Pending')
      .select('id');
    if (error) throw error;
    if (data && data.length > 0) return;
    // Nothing updated: already sent with these times, or the office moved on.
    const { data: row, error: readErr } = await supabase
      .from('employer_timesheets')
      .select('clock_out, status')
      .eq('id', p.timesheetId)
      .maybeSingle();
    if (readErr) throw readErr;
    if (row && sameInstant((row as { clock_out?: string }).clock_out, p.values.clock_out)) return;
    if (!row && notes.some((n) => n.kind === 'clock_in' && n.id === p.timesheetId)) {
      throw new Held(
        'Your clock-in for this shift did not go through, so this clock-out is kept with it. Sort out the clock-in, tap Try again on it, and this goes straight after.'
      );
    }
    throw new Conflict(
      row
        ? `The office ${String((row as { status?: string }).status ?? 'changed').toLowerCase() === 'approved' ? 'approved' : 'changed'} this day while you were offline, so your clock-out was not saved over it. Tell the office the time you finished.`
        : 'This day was removed while you were offline, so your clock-out could not be saved. Tell the office the time you finished.'
    );
  },

  async timesheet(op) {
    await insertOnce('employer_timesheets', { ...(op.payload.row as object), id: op.id });
  },

  async snag(op) {
    const p = op.payload as {
      jobId: string;
      employeeId: string;
      severity: string;
      description: string;
      location?: string | null;
    };
    const photos = await uploadPhotos(op, 'issues');
    const { data: job, error: jobError } = await supabase
      .from('employer_jobs')
      .select('user_id')
      .eq('id', p.jobId)
      .maybeSingle();
    if (jobError) throw jobError;
    if (!job)
      throw new Conflict('This job is no longer on your list, so the snag could not be added.');
    await insertOnce('job_issues', {
      id: op.id,
      job_id: p.jobId,
      user_id: (job as { user_id: string }).user_id,
      title: p.description.slice(0, 80),
      description: p.description,
      issue_type: 'Snag',
      severity: p.severity,
      status: 'Open',
      reported_by: p.employeeId,
      location: p.location || null,
      photos: photos.length > 0 ? photos : null,
      created_at: phoneTime(op.queued_at),
    });
  },

  async incident(op) {
    // ELE-2031: a report queued by this build is the worker's own Site Safety
    // record (near_miss_reports / accident_records) filed against the job.
    // One queued by an older build (no `target`) still goes to
    // employer_incidents exactly as it did, so nothing on a phone is lost.
    if ((op.payload as { target?: string }).target) {
      const p = op.payload as unknown as WorkerSafetyPayload;
      const photos = await uploadPhotos(op, 'issues');
      const { table, row } = workerSafetyRow(p, {
        id: op.id,
        userId: op.userId,
        createdAt: phoneTime(op.queued_at),
        photos,
      });
      try {
        await insertOnce(table, row);
      } catch (e) {
        // The job is no longer theirs (safety_set_employer_scope refuses it).
        if ((e as PgErr)?.code === '42501' || (e as PgErr)?.code === '23503')
          throw new Conflict(
            'This job is no longer on your list, so the report could not be filed against it. Tell the office.'
          );
        throw e;
      }
      return;
    }
    const p = op.payload as {
      jobId: string;
      employeeId: string;
      severity: string;
      description: string;
      location?: string | null;
      incidentType: string;
    };
    const photos = await uploadPhotos(op, 'issues');
    const { data: job, error: jobError } = await supabase
      .from('employer_jobs')
      .select('user_id')
      .eq('id', p.jobId)
      .maybeSingle();
    if (jobError) throw jobError;
    if (!job)
      throw new Conflict('This job is no longer on your list, so the report could not be added.');
    await insertOnce('employer_incidents', {
      id: op.id,
      employer_id: (job as { user_id: string }).user_id,
      job_id: p.jobId,
      title: p.description.slice(0, 80),
      description: p.description,
      incident_type: p.incidentType,
      severity: p.severity,
      status: 'open',
      reported_by: p.employeeId,
      location: p.location || null,
      photos: photos.length > 0 ? photos : null,
      created_at: phoneTime(op.queued_at),
    });
  },

  async progress_note(op) {
    const p = op.payload as {
      jobId: string;
      authorName: string;
      content: string;
      /** Photos already uploaded before the signal went. */
      paths: string[];
    };
    const held = await uploadPhotos(op, 'notes');
    await insertOnce('employer_job_comments', {
      id: op.id,
      job_id: p.jobId,
      author_name: p.authorName,
      comment_type: 'progress',
      content: p.content,
      photos: [...(p.paths ?? []), ...held],
      created_at: phoneTime(op.queued_at),
    });
  },

  async task_status(op) {
    const p = op.payload as { taskId: string; status: string; from: string };
    const values: Record<string, unknown> = { status: p.status };
    if (p.status === 'Done') values.completed_at = phoneTime(op.queued_at);
    const { data, error } = await supabase
      .from('employer_job_tasks')
      .update(values as never)
      .eq('id', p.taskId)
      .eq('status', p.from)
      .select('id');
    if (error) throw error;
    if (data && data.length > 0) return;
    const { data: row, error: readErr } = await supabase
      .from('employer_job_tasks')
      .select('status')
      .eq('id', p.taskId)
      .maybeSingle();
    if (readErr) throw readErr;
    const now = (row as { status?: string } | null)?.status;
    if (now === p.status) return; // already there
    throw new Conflict(
      row
        ? `This task was changed to “${now === 'Todo' ? 'To do' : now}” while you were offline, so your change was not applied over it.`
        : 'This task was removed or taken off you while you were offline.'
    );
  },

  async pack_signoff(op) {
    const p = op.payload as {
      ackId: string;
      acknowledged_at: string;
      signature_data: string;
      device_info: string;
      /** ELE-2010: where it was signed, when the phone said. Older ops have none. */
      location?: string | null;
    };
    const { data, error } = await supabase
      .from('employer_job_pack_acknowledgements')
      .update({
        acknowledged_at: phoneTime(p.acknowledged_at),
        signature_data: p.signature_data,
        device_info: p.device_info,
        ...(p.location ? { location: p.location } : {}),
      } as never)
      .eq('id', p.ackId)
      .is('acknowledged_at', null)
      .select('id');
    if (error) throw error;
    if (data && data.length > 0) return;
    const { data: row, error: readErr } = await supabase
      .from('employer_job_pack_acknowledgements')
      .select('acknowledged_at')
      .eq('id', p.ackId)
      .maybeSingle();
    if (readErr) throw readErr;
    const at = (row as { acknowledged_at?: string | null } | null)?.acknowledged_at;
    if (at && sameInstant(at, phoneTime(p.acknowledged_at))) return; // ours, already landed
    throw new Conflict(
      at
        ? 'This pack was already signed, so your signature was not saved over it.'
        : 'This pack is no longer on your list, so it could not be signed.'
    );
  },
};

/** What to refresh once an op has landed. */
const INVALIDATE: Record<OutboxKind, unknown[][]> = {
  clock_in: [['timesheets'], ['todays-hours']],
  clock_out: [['timesheets'], ['todays-hours']],
  timesheet: [['timesheets'], ['todays-hours']],
  snag: [['snag-reports']],
  incident: [['my-incident-reports'], ['near-miss-reports'], ['accident-records']],
  progress_note: [['progress-notes'], ['my-job-detail']],
  task_status: [['my-tasks'], ['job-tasks']],
  pack_signoff: [['my-pack-signoffs'], ['my-job-packs'], ['my-job-detail']],
  checklist_item: [['my-job-detail'], ['job-checklists'], ['my-job-checklists']],
  job_done: [['my-job-detail'], ['my-jobs'], ['job-done-context'], ['progress-notes']],
  receipt: [['receipt-captures']],
  cert_start: [['job-done-context'], ['my-job-detail']],
  expense: [['my_expense_claims'], ['expense_claims']],
  mileage: [['my_expense_claims'], ['expense_claims'], ['mileage-quote']],
};

let flushing: Promise<void> | null = null;
let retryTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleRetry() {
  if (retryTimer || pendingOps().length === 0) return;
  retryTimer = setTimeout(() => {
    retryTimer = null;
    void flushOutbox();
  }, RETRY_MS);
}

async function runFlush() {
  await load();
  const uid = await resolveUid();
  if (!uid) return;
  if (!ops.some((o) => o.userId === uid)) return;
  syncing = true;
  emit();
  try {
    for (;;) {
      // Re-read each time: a new tap may have been queued while sending.
      const op = ops.filter((o) => o.userId === uid).sort((a, b) => a.seq - b.seq)[0];
      if (!op) break;
      if (!isOnline()) {
        waiters.get(op.id)?.('queued');
        break;
      }
      try {
        await SENDERS[op.kind](op);
        ops = ops.filter((o) => o.id !== op.id);
        await deleteOp(op.id);
        lastSentAt = new Date().toISOString();
        emit();
        waiters.get(op.id)?.('sent');
        INVALIDATE[op.kind].forEach((queryKey) => queryClient.invalidateQueries({ queryKey }));
      } catch (e) {
        const conflict = e instanceof Conflict;
        const held = e instanceof Held;
        const unexpected = !conflict && !held && !(e as PgErr)?.code && !isOfflineError(e);
        const attempts = op.attempts + 1;
        if (conflict || held || isRefusal(e) || (unexpected && attempts >= 5)) {
          // Our own database rules (P0001) speak plain English already.
          const reason =
            conflict || held
              ? (e as Error).message
              : (e as PgErr)?.code === 'P0001' && (e as PgErr)?.message
                ? String((e as PgErr)?.message)
                : `The server would not take this: ${(e as PgErr)?.message ?? 'unknown reason'}`;
          const note: OutboxNote = {
            ...op,
            attempts,
            reason,
            conflict,
            noted_at: new Date().toISOString(),
          };
          notes = [...notes.filter((n) => n.id !== op.id), note];
          await putNote(note);
          ops = ops.filter((o) => o.id !== op.id);
          await deleteOp(op.id);
          emit();
          waiters.get(op.id)?.(new OutboxRefusedError(reason, conflict));
          continue; // the next op does not depend on this one going
        }
        // No signal (or a flaky one): keep it, in order, and stop here.
        const kept = { ...op, attempts, last_error: (e as PgErr)?.message ?? String(e) };
        ops = ops.map((o) => (o.id === op.id ? kept : o));
        await putOp(kept);
        emit();
        waiters.get(op.id)?.('queued');
        break;
      }
    }
  } finally {
    syncing = false;
    emit();
  }
}

/** Send everything waiting. Safe to call any time; concurrent calls share one send. */
export function flushOutbox(): Promise<void> {
  if (flushing) return flushing;
  const run = () => runFlush();
  flushing = (async () => {
    // One sender across tabs. Duplicates are already impossible (client ids),
    // this just saves the second tab a wasted round trip.
    const locks = typeof navigator !== 'undefined' ? navigator.locks : undefined;
    if (locks?.request) {
      await locks.request('elec-mate-worker-outbox', { ifAvailable: true }, async (lock) => {
        if (lock) await run();
      });
    } else {
      await run();
    }
  })()
    .catch(() => undefined)
    .finally(() => {
      flushing = null;
      scheduleRetry();
    });
  return flushing;
}

/* ---- start-up ----------------------------------------------------------- */

let started = false;
function start() {
  if (started || typeof window === 'undefined') return;
  started = true;
  window.addEventListener('online', () => {
    emit();
    void flushOutbox();
  });
  window.addEventListener('offline', emit);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') void flushOutbox();
  });
  try {
    supabase.auth.onAuthStateChange((_event, session) => {
      const uid = session?.user?.id ?? null;
      if (uid !== currentUid) {
        currentUid = uid;
        emit();
        if (uid) void flushOutbox();
      }
    });
  } catch {
    /* ignore */
  }
  void load().then(() => flushOutbox());
}

/** Send anything left from a closed app as soon as this module loads. */
start();
