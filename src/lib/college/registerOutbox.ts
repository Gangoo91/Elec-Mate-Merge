import { supabase } from '@/integrations/supabase/client';
import { ATTENDANCE_CONFLICT, type RegisterSession } from '@/lib/college/attendanceSession';

/* ==========================================================================
   registerOutbox — the register never loses a mark (ELE-1887).

   Every tap is written to this device first (localStorage), then sent. A
   classroom with no signal keeps working: the mark shows "Saved on this
   device, will sync" and goes up when the connection comes back (the
   browser's online event, a retry every 20 seconds while anything waits,
   and whenever a register opens). Nothing is dropped on a network failure.

   One entry per learner per date per session: a later tap replaces an
   earlier unsent one, so the last thing the tutor tapped is what lands.
   status null means "remove the mark" (undo).

   Only a definite refusal from the server (a Postgres or PostgREST error
   code, e.g. permission) takes an entry out, and it is kept in a "refused"
   list the register shows, so even then the tutor is told, never silent.

   After marks for a lesson land, the lesson is recorded as taught
   (record_lesson_delivery); after the last mark for a lesson and day is
   removed, undo_lesson_delivery takes it back. Per-learner "taught" is kept
   by a database trigger on college_attendance (present learners only).
   ========================================================================== */

export type RegisterStatus = 'Present' | 'Late' | 'Absent' | 'Authorised';

export interface OutboxEntry {
  key: string;
  student_id: string;
  cohort_id: string;
  date: string;
  session: RegisterSession;
  status: RegisterStatus | null;
  notes: string | null;
  lesson_plan_id: string | null;
  recorded_by: string | null;
  /** Bumped on every change, so a send only clears the entry it actually sent. */
  rev: number;
  queued_at: string;
  attempts: number;
  last_error?: string | null;
}

export interface RefusedEntry extends OutboxEntry {
  refused_at: string;
  reason: string;
}

const KEY = 'college-register-outbox:v1';
const REFUSED_KEY = 'college-register-refused:v1';
const ROSTER_KEY = (cohortId: string) => `college-register-roster:v1:${cohortId}`;
const RETRY_MS = 20_000;

export const outboxKey = (student_id: string, date: string, session: string) =>
  `${student_id}|${date}|${session}`;

/* ---- storage ------------------------------------------------------------ */

let memory: OutboxEntry[] | null = null;
let memoryRefused: RefusedEntry[] | null = null;

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or blocked: the in-memory copy still holds it for this session.
  }
}

function load(): OutboxEntry[] {
  if (!memory) memory = readJson<OutboxEntry[]>(KEY, []);
  return memory;
}
function save(list: OutboxEntry[]) {
  memory = list;
  writeJson(KEY, list);
  emit();
}
function loadRefused(): RefusedEntry[] {
  if (!memoryRefused) memoryRefused = readJson<RefusedEntry[]>(REFUSED_KEY, []);
  return memoryRefused;
}
function saveRefused(list: RefusedEntry[]) {
  memoryRefused = list;
  writeJson(REFUSED_KEY, list);
  emit();
}

/* ---- subscribers -------------------------------------------------------- */

export interface OutboxState {
  pending: OutboxEntry[];
  refused: RefusedEntry[];
  syncing: boolean;
  /** Last time a send succeeded, ISO. */
  lastSyncedAt: string | null;
  online: boolean;
}

type Listener = (s: OutboxState) => void;
const listeners = new Set<Listener>();
let syncing = false;
let lastSyncedAt: string | null = null;

export function getOutboxState(): OutboxState {
  return {
    pending: load(),
    refused: loadRefused(),
    syncing,
    lastSyncedAt,
    online: typeof navigator === 'undefined' ? true : navigator.onLine !== false,
  };
}
function emit() {
  const s = getOutboxState();
  listeners.forEach((l) => l(s));
}
export function subscribeOutbox(l: Listener): () => void {
  listeners.add(l);
  ensureStarted();
  return () => {
    listeners.delete(l);
  };
}

/* ---- queueing ----------------------------------------------------------- */

export type QueueInput = Omit<OutboxEntry, 'key' | 'rev' | 'queued_at' | 'attempts' | 'last_error'>;

/** Write marks to this device. Call flushOutbox() after (queueMarks does it for you). */
export function queueMarks(inputs: QueueInput[]): void {
  if (inputs.length === 0) return;
  const list = [...load()];
  const now = new Date().toISOString();
  for (const i of inputs) {
    const key = outboxKey(i.student_id, i.date, i.session);
    const idx = list.findIndex((e) => e.key === key);
    const prev = idx >= 0 ? list[idx] : null;
    const entry: OutboxEntry = {
      ...i,
      key,
      rev: (prev?.rev ?? 0) + 1,
      queued_at: prev?.queued_at ?? now,
      attempts: 0,
      last_error: null,
      // A lesson link survives a later plain tap for the same session.
      lesson_plan_id: i.lesson_plan_id ?? prev?.lesson_plan_id ?? null,
    };
    if (idx >= 0) list[idx] = entry;
    else list.push(entry);
  }
  save(list);
  void flushOutbox();
}

export function dismissRefused(): void {
  saveRefused([]);
}

/* ---- sending ------------------------------------------------------------ */

type PgErr = { message?: string; code?: string; details?: string } | null;

/** A definite answer from the database, not a dropped connection. */
function isRefusal(e: PgErr): boolean {
  if (!e) return false;
  const code = (e.code ?? '').trim();
  if (!code) return false;
  if (/fetch|network|load failed|timeout|aborted/i.test(e.message ?? '')) return false;
  // 5xx-ish / gateway codes from PostgREST are worth retrying.
  // Expired sign-in (PGRST3xx) is retried: the session refreshes and the mark goes up.
  if (
    /^PGRST00/.test(code) ||
    /^PGRST3/.test(code) ||
    code === '503' ||
    code === '502' ||
    code === '504'
  )
    return false;
  return true;
}

/** Lesson + date pairs already recorded as taught this session, to save a round trip per tap. */
const deliveredThisSession = new Set<string>();

let flushing: Promise<void> | null = null;
let retryTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleRetry() {
  if (retryTimer || load().length === 0) return;
  retryTimer = setTimeout(() => {
    retryTimer = null;
    void flushOutbox();
  }, RETRY_MS);
}

/** Send everything waiting. Safe to call any time; concurrent calls share one send. */
export function flushOutbox(): Promise<void> {
  if (flushing) return flushing;
  flushing = (async () => {
    const batch = load().slice();
    if (batch.length === 0) return;
    syncing = true;
    emit();
    const sent: OutboxEntry[] = [];
    const refused: Array<{ e: OutboxEntry; reason: string }> = [];
    let networkFailed = false;
    let lastErr: string | null = null;

    // Upserts, grouped so a group never carries a missing lesson_plan_id
    // that PostgREST would turn into null on a row that already has one.
    const upserts = batch.filter((e) => e.status !== null);
    const groups = [
      upserts.filter((e) => e.lesson_plan_id),
      upserts.filter((e) => !e.lesson_plan_id),
    ];
    for (const group of groups) {
      if (group.length === 0 || networkFailed) continue;
      const { error } = await supabase.from('college_attendance').upsert(
        group.map((e) => ({
          student_id: e.student_id,
          cohort_id: e.cohort_id,
          date: e.date,
          session: e.session,
          status: e.status,
          notes: e.notes,
          recorded_by: e.recorded_by,
          ...(e.lesson_plan_id ? { lesson_plan_id: e.lesson_plan_id } : {}),
        })) as never,
        { onConflict: ATTENDANCE_CONFLICT }
      );
      if (!error) sent.push(...group);
      else if (isRefusal(error)) {
        // Try one by one so one bad row does not hold the rest back.
        for (const e of group) {
          const one = await supabase.from('college_attendance').upsert(
            [
              {
                student_id: e.student_id,
                cohort_id: e.cohort_id,
                date: e.date,
                session: e.session,
                status: e.status,
                notes: e.notes,
                recorded_by: e.recorded_by,
                ...(e.lesson_plan_id ? { lesson_plan_id: e.lesson_plan_id } : {}),
              },
            ] as never,
            { onConflict: ATTENDANCE_CONFLICT }
          );
          if (!one.error) sent.push(e);
          else if (isRefusal(one.error))
            refused.push({ e, reason: one.error.message ?? 'Refused' });
          else {
            networkFailed = true;
            lastErr = one.error.message ?? null;
            break;
          }
        }
      } else {
        networkFailed = true;
        lastErr = error.message ?? null;
      }
    }

    // Removals (undo), by learner + date + session so they work for marks
    // that were taken offline and never had an id on this device.
    const removals = batch.filter((e) => e.status === null);
    if (!networkFailed && removals.length > 0) {
      const bySlot = new Map<string, OutboxEntry[]>();
      for (const e of removals) {
        const k = `${e.date}|${e.session}`;
        bySlot.set(k, [...(bySlot.get(k) ?? []), e]);
      }
      for (const group of bySlot.values()) {
        const { error } = await supabase
          .from('college_attendance')
          .delete()
          .in(
            'student_id',
            group.map((e) => e.student_id)
          )
          .eq('date', group[0].date)
          .eq('session', group[0].session);
        if (!error) sent.push(...group);
        else if (isRefusal(error))
          group.forEach((e) => refused.push({ e, reason: error.message ?? 'Refused' }));
        else {
          networkFailed = true;
          lastErr = error.message ?? null;
          break;
        }
      }
    }

    // Clear what was sent, unless it was changed again while sending.
    const sentRev = new Map(sent.map((e) => [e.key, e.rev]));
    const refusedRev = new Map(refused.map(({ e }) => [e.key, e.rev]));
    const left = load()
      .filter((e) => sentRev.get(e.key) !== e.rev && refusedRev.get(e.key) !== e.rev)
      .map((e) =>
        networkFailed && batch.some((b) => b.key === e.key && b.rev === e.rev)
          ? { ...e, attempts: e.attempts + 1, last_error: lastErr }
          : e
      );
    save(left);
    if (refused.length > 0) {
      const now = new Date().toISOString();
      saveRefused(
        [
          ...loadRefused(),
          ...refused.map(({ e, reason }) => ({ ...e, reason, refused_at: now })),
        ].slice(-50)
      );
    }
    if (sent.length > 0) lastSyncedAt = new Date().toISOString();

    // Lessons: record as taught once marks for them have landed; take it
    // back when the last mark for that lesson and day is removed.
    const taught = new Set<string>();
    const untaught = new Set<string>();
    for (const e of sent) {
      if (!e.lesson_plan_id) continue;
      const k = `${e.lesson_plan_id}|${e.date}`;
      if (e.status) taught.add(k);
      else untaught.add(k);
    }
    for (const k of taught) {
      if (deliveredThisSession.has(k)) continue;
      const [lesson, date] = k.split('|');
      const { error } = await supabase.rpc(
        'record_lesson_delivery' as never,
        { p_lesson: lesson, p_date: date } as never
      );
      if (!error) deliveredThisSession.add(k);
    }
    for (const k of untaught) {
      if (taught.has(k)) continue;
      const [lesson, date] = k.split('|');
      const { data } = await supabase.rpc(
        'undo_lesson_delivery' as never,
        { p_lesson: lesson, p_date: date } as never
      );
      if (data) deliveredThisSession.delete(k);
    }
  })().finally(() => {
    syncing = false;
    flushing = null;
    emit();
    scheduleRetry();
  });
  return flushing;
}

/* ---- roster cache (open a register with no signal) ---------------------- */

export interface CachedRoster {
  saved_at: string;
  students: Array<{ id: string; name: string | null; status: string | null }>;
}
export function cacheRoster(cohortId: string, students: CachedRoster['students']) {
  writeJson(ROSTER_KEY(cohortId), {
    saved_at: new Date().toISOString(),
    students,
  } satisfies CachedRoster);
}
export function cachedRoster(cohortId: string): CachedRoster | null {
  return readJson<CachedRoster | null>(ROSTER_KEY(cohortId), null);
}

/* ---- start-up ----------------------------------------------------------- */

let started = false;
function ensureStarted() {
  if (started || typeof window === 'undefined') return;
  started = true;
  window.addEventListener('online', () => {
    emit();
    void flushOutbox();
  });
  window.addEventListener('offline', emit);
  // Another tab may have queued or sent marks.
  window.addEventListener('storage', (ev) => {
    if (ev.key === KEY) {
      memory = null;
      emit();
    } else if (ev.key === REFUSED_KEY) {
      memoryRefused = null;
      emit();
    }
  });
  if (load().length > 0) void flushOutbox();
}

/** Start syncing as soon as the module loads, so marks left from a closed tab go up. */
ensureStarted();
