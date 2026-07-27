/**
 * Fire Alarm Log Book (ELE-1396) — BS 5839-1:2025 Clause 48.2 digital log.
 *
 * One log book per building, entries for every Annex H record type.
 * The weekly call point rotation is DERIVED from the last recorded
 * weekly_test entry (single source of truth) rather than a stored pointer,
 * so edits and deletions never desynchronise the rotation.
 *
 * Tables are newer than the generated types — same `supabase as any`
 * pattern as useJobCostEntries until the next types.ts regen.
 */
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';
import { realtimeChannelName } from '@/lib/realtimeChannel';

export interface CallPoint {
  number: string;
  zone: string;
  location: string;
}

export type LogEntryType =
  | 'weekly_test'
  | 'fault'
  | 'false_alarm'
  | 'service'
  | 'battery'
  | 'panel_event'
  | 'variation'
  | 'fire_event'
  | 'drill'
  | 'monthly_check';

export const ENTRY_TYPE_LABELS: Record<LogEntryType, string> = {
  weekly_test: 'Weekly call point test',
  monthly_check: 'Monthly check',
  fault: 'Fault',
  false_alarm: 'False alarm',
  fire_event: 'Fire event',
  drill: 'Fire drill',
  service: 'Service visit',
  battery: 'Battery change',
  panel_event: 'Panel event',
  variation: 'Agreed variation',
};

/** BS 5839-1 clause 30 false alarm categories. */
export const FALSE_ALARM_CATEGORIES = [
  'Unwanted (equipment)',
  'Good intent',
  'Malicious',
  'Accidental damage',
];

export interface FireAlarmLogBook {
  id: string;
  user_id: string;
  building_name: string;
  building_address: string;
  system_category: string;
  panel_make: string;
  panel_model: string;
  panel_location: string;
  call_points: CallPoint[];
  weekly_test_day: string;
  weekly_reminder_enabled: boolean;
  service_interval_months: number;
  service_reminder_enabled: boolean;
  last_service_date: string | null;
  battery_interval_months: number | null;
  last_battery_date: string | null;
  battery_reminder_enabled: boolean;
  responsible_person: string;
  notes: string;
  detector_count: number | null;
  arc_connected: boolean;
  arc_phone: string;
  servicing_org: string;
  servicing_org_phone: string;
  installation_date: string | null;
  acceptance_date: string | null;
  commissioning_cert_ref: string;
  share_token: string;
  share_enabled: boolean;
  responsible_email: string;
  archived_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface FireAlarmLogEntry {
  id: string;
  log_book_id: string;
  user_id: string;
  entry_type: LogEntryType;
  entry_date: string;
  data: Record<string, string>;
  tester_name: string;
  resolved: boolean | null;
  resolved_date: string | null;
  created_at: string;
  /** True while the entry is queued locally, waiting for signal. */
  pending?: boolean;
}

// ── Offline queue — panel rooms and basements rarely have signal. Entries
// queue locally and sync the moment the connection returns. ──
const QUEUE_KEY = 'fa-log-entry-queue';

interface QueuedEntry {
  qid: string;
  log_book_id: string;
  user_id: string;
  entry_type: LogEntryType;
  entry_date: string;
  data: Record<string, string>;
  tester_name: string;
  resolved?: boolean | null;
  resolved_date?: string | null;
  queued_at: string;
}

function readQueue(): QueuedEntry[] {
  return storageGetJSONSync<QueuedEntry[]>(QUEUE_KEY, []);
}

function writeQueue(q: QueuedEntry[]): void {
  storageSetJSONSync(QUEUE_KEY, q);
}

function isNetworkError(e: unknown): boolean {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return true;
  const msg = e instanceof Error ? e.message : String(e);
  return /fetch|network|timeout|connection/i.test(msg);
}

/** Push queued entries to the database. Returns true if anything synced. */
async function flushQueue(): Promise<boolean> {
  const queue = readQueue();
  if (!queue.length) return false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;
  let changed = false;
  const remaining: QueuedEntry[] = [];
  for (const item of queue) {
    const { qid: _qid, queued_at: _queuedAt, ...row } = item;
    try {
      const { error } = await db.from('fire_alarm_log_entries').insert(row);
      if (error) throw error;
      changed = true;
      // Service/battery entries roll the book's "last done" dates, same as
      // the online path in addEntry.
      if (row.entry_type === 'service') {
        await db
          .from('fire_alarm_log_books')
          .update({ last_service_date: row.entry_date })
          .eq('id', row.log_book_id);
      } else if (row.entry_type === 'battery') {
        await db
          .from('fire_alarm_log_books')
          .update({ last_battery_date: row.entry_date })
          .eq('id', row.log_book_id);
      }
    } catch (e) {
      if (isNetworkError(e)) {
        // Still offline — keep it queued
        remaining.push(item);
      } else {
        // Rejected by the database (constraint/RLS) — retrying forever would
        // wedge the queue. Drop it and log; the user re-logs if needed.
        console.warn('Dropping unsyncable queued log entry:', e);
        changed = true;
      }
    }
  }
  writeQueue(remaining);
  return changed;
}

function queuedForBook(bookId: string): FireAlarmLogEntry[] {
  return readQueue()
    .filter((q) => q.log_book_id === bookId)
    .map((q) => ({
      id: q.qid,
      log_book_id: q.log_book_id,
      user_id: q.user_id,
      entry_type: q.entry_type,
      entry_date: q.entry_date,
      data: q.data,
      tester_name: q.tester_name,
      resolved: q.resolved ?? null,
      resolved_date: q.resolved_date ?? null,
      created_at: q.queued_at,
      pending: true,
    }));
}

export interface LogBookStatus {
  lastWeeklyTest: string | null;
  daysSinceTest: number | null;
  openFaults: number;
  serviceDue: string | null;
  serviceOverdue: boolean;
  /** Last 8 weeks (oldest first): was a weekly test logged in that Mon-Sun week? */
  weeklyRecord: boolean[];
  testedThisWeek: boolean;
  /** Annex F: false alarms per 100 automatic detectors over the last 12 months. */
  falseAlarmRate: number | null;
  falseAlarms12mo: number;
  /** >4 per 100 detectors/yr triggers a preliminary investigation (Annex F). */
  falseAlarmInvestigationDue: boolean;
  /** Call point rotation: how many of the listed call points were tested in the last 12 months. */
  callPointsCovered12mo: number;
}

/**
 * Local-timezone ISO date (yyyy-mm-dd). NEVER use toISOString().slice for
 * dates here — it renders the UTC day, which is yesterday during BST for
 * times before 01:00 and silently breaks week-bucket comparisons.
 */
export function localIsoDate(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Days between an ISO date and today (positive = in the past). */
function daysAgo(iso: string | null): number | null {
  if (!iso) return null;
  const then = new Date(iso + 'T00:00:00');
  return Math.floor((Date.now() - then.getTime()) / 86_400_000);
}

function addMonths(iso: string, months: number): string {
  const d = new Date(iso + 'T00:00:00');
  d.setMonth(d.getMonth() + months);
  return localIsoDate(d);
}

/** Local ISO date of the Monday starting the week containing `d`. */
export function weekStart(d: Date): string {
  const copy = new Date(d);
  const day = (copy.getDay() + 6) % 7; // Mon=0
  copy.setDate(copy.getDate() - day);
  return localIsoDate(copy);
}

export function computeStatus(
  book: FireAlarmLogBook,
  entries: (Pick<FireAlarmLogEntry, 'entry_type' | 'entry_date' | 'resolved'> &
    Partial<Pick<FireAlarmLogEntry, 'data'>>)[]
): LogBookStatus {
  const weekly = entries
    .filter((e) => e.entry_type === 'weekly_test')
    .sort((a, b) => b.entry_date.localeCompare(a.entry_date));
  const lastWeeklyTest = weekly[0]?.entry_date ?? null;
  const openFaults = entries.filter((e) => e.entry_type === 'fault' && e.resolved !== true).length;
  const serviceDue = book.last_service_date
    ? addMonths(book.last_service_date, book.service_interval_months)
    : null;

  const yearAgo = new Date();
  yearAgo.setFullYear(yearAgo.getFullYear() - 1);
  const yearAgoIso = localIsoDate(yearAgo);

  const falseAlarms12mo = entries.filter(
    (e) => e.entry_type === 'false_alarm' && e.entry_date >= yearAgoIso
  ).length;
  const falseAlarmRate =
    book.detector_count && book.detector_count > 0
      ? Math.round((100 * falseAlarms12mo * 10) / book.detector_count) / 10
      : null;

  const testedPoints = new Set(
    weekly
      .filter((e) => e.entry_date >= yearAgoIso)
      .map((e) => (e as { data?: Record<string, string> }).data?.call_point)
      .filter(Boolean)
  );
  const callPointsCovered12mo = (book.call_points ?? []).filter((cp) =>
    testedPoints.has(cp.number)
  ).length;

  const testDates = new Set(weekly.map((e) => weekStart(new Date(e.entry_date + 'T00:00:00'))));
  const weeklyRecord: boolean[] = [];
  for (let i = 7; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i * 7);
    weeklyRecord.push(testDates.has(weekStart(d)));
  }

  return {
    lastWeeklyTest,
    daysSinceTest: daysAgo(lastWeeklyTest),
    openFaults,
    serviceDue,
    serviceOverdue: !!serviceDue && serviceDue < localIsoDate(),
    weeklyRecord,
    testedThisWeek: weeklyRecord[7],
    falseAlarmRate,
    falseAlarms12mo,
    falseAlarmInvestigationDue: falseAlarmRate !== null && falseAlarmRate > 4,
    callPointsCovered12mo,
  };
}

/**
 * The next call point in the BS 5839-1 weekly rotation: the one after the
 * most recently tested call point in list order (wrapping), or the first in
 * the list when nothing has been tested yet.
 */
export function nextCallPoint(
  book: FireAlarmLogBook,
  entries: Pick<FireAlarmLogEntry, 'entry_type' | 'entry_date' | 'data' | 'created_at'>[]
): CallPoint | null {
  const points = book.call_points;
  if (!points?.length) return null;
  const lastTest = entries
    .filter((e) => e.entry_type === 'weekly_test' && e.data?.call_point)
    .sort(
      (a, b) =>
        b.entry_date.localeCompare(a.entry_date) || b.created_at.localeCompare(a.created_at)
    )[0];
  if (!lastTest) return points[0];
  const lastIndex = points.findIndex((p) => p.number === lastTest.data.call_point);
  return points[(lastIndex + 1) % points.length];
}

export function useFireAlarmLogBooks() {
  const { user } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;
  const [books, setBooks] = useState<FireAlarmLogBook[]>([]);
  const [statuses, setStatuses] = useState<Record<string, LogBookStatus>>({});
  const [entriesByBook, setEntriesByBook] = useState<Record<string, FireAlarmLogEntry[]>>({});
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      await flushQueue().catch(() => {});
      const { data: bookRows, error } = await db
        .from('fire_alarm_log_books')
        .select('*')
        .is('archived_at', null)
        .order('building_name');
      if (error) throw error;
      const list = (bookRows ?? []) as FireAlarmLogBook[];
      setBooks(list);

      if (list.length) {
        // Status needs 12 months of history plus any still-open fault,
        // however old — not the whole multi-year record.
        const cutoffDate = new Date();
        cutoffDate.setMonth(cutoffDate.getMonth() - 13);
        const cutoff = localIsoDate(cutoffDate);
        const { data: entryRows } = await db
          .from('fire_alarm_log_entries')
          .select('log_book_id, entry_type, entry_date, resolved, data, created_at')
          .in(
            'log_book_id',
            list.map((b) => b.id)
          )
          .or(`entry_date.gte.${cutoff},and(entry_type.eq.fault,resolved.not.is.true)`);
        const byBook = new Map<string, FireAlarmLogEntry[]>();
        for (const e of (entryRows ?? []) as FireAlarmLogEntry[]) {
          const arr = byBook.get(e.log_book_id) ?? [];
          arr.push(e);
          byBook.set(e.log_book_id, arr);
        }
        const next: Record<string, LogBookStatus> = {};
        const nextEntries: Record<string, FireAlarmLogEntry[]> = {};
        for (const b of list) {
          const merged = [...queuedForBook(b.id), ...(byBook.get(b.id) ?? [])];
          next[b.id] = computeStatus(b, merged);
          nextEntries[b.id] = merged;
        }
        setStatuses(next);
        setEntriesByBook(nextEntries);
      } else {
        setStatuses({});
        setEntriesByBook({});
      }
    } finally {
      setLoading(false);
    }
  }, [user?.id, db]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createBook = useCallback(
    async (fields: Partial<FireAlarmLogBook> & { building_name: string }) => {
      if (!user?.id) throw new Error('Not signed in');
      const { data, error } = await db
        .from('fire_alarm_log_books')
        .insert({ ...fields, user_id: user.id })
        .select()
        .single();
      if (error) throw error;
      await refresh();
      return data as FireAlarmLogBook;
    },
    [user?.id, db, refresh]
  );

  return { books, statuses, entriesByBook, loading, refresh, createBook };
}

export function useFireAlarmLogBook(bookId: string | undefined) {
  const { user } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;
  const [book, setBook] = useState<FireAlarmLogBook | null>(null);
  const [entries, setEntries] = useState<FireAlarmLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user?.id || !bookId) return;
    setLoading(true);
    try {
      await flushQueue();
      const [{ data: b }, { data: e }] = await Promise.all([
        db.from('fire_alarm_log_books').select('*').eq('id', bookId).maybeSingle(),
        db
          .from('fire_alarm_log_entries')
          .select('*')
          .eq('log_book_id', bookId)
          .order('entry_date', { ascending: false })
          .order('created_at', { ascending: false }),
      ]);
      setBook((b as FireAlarmLogBook) ?? null);
      setEntries([...queuedForBook(bookId), ...((e ?? []) as FireAlarmLogEntry[])]);
    } catch {
      // Offline: show the local queue over whatever we last had
      setEntries((prev) => {
        const persisted = prev.filter((x) => !x.pending);
        return [...queuedForBook(bookId), ...persisted];
      });
    } finally {
      setLoading(false);
    }
  }, [user?.id, bookId, db]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Sync the queue the moment the connection returns
  useEffect(() => {
    const onOnline = () => {
      flushQueue().then((changed) => {
        if (changed) refresh();
      });
    };
    window.addEventListener('online', onOnline);
    return () => window.removeEventListener('online', onOnline);
  }, [refresh]);

  // Live updates — entries logged via the responsible person's share link
  // appear without a reload while the building page is open.
  useEffect(() => {
    if (!bookId) return;
    const channel = supabase
      .channel(realtimeChannelName(`fa-log-${bookId}`))
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'fire_alarm_log_entries',
          filter: `log_book_id=eq.${bookId}`,
        },
        () => refresh()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [bookId, refresh]);

  const updateBook = useCallback(
    async (fields: Partial<FireAlarmLogBook>) => {
      if (!bookId) return;
      const { error } = await db.from('fire_alarm_log_books').update(fields).eq('id', bookId);
      if (error) throw error;
      await refresh();
    },
    [bookId, db, refresh]
  );

  const addEntry = useCallback(
    async (
      entry: Pick<FireAlarmLogEntry, 'entry_type' | 'entry_date' | 'data' | 'tester_name'> &
        Partial<Pick<FireAlarmLogEntry, 'resolved' | 'resolved_date'>>
    ) => {
      if (!user?.id || !bookId) throw new Error('Not signed in');
      try {
        const { error } = await db.from('fire_alarm_log_entries').insert({
          ...entry,
          log_book_id: bookId,
          user_id: user.id,
        });
        if (error) throw error;
      } catch (e) {
        if (!isNetworkError(e)) throw e;
        // No signal at the panel — queue it and show it as pending
        const queue = readQueue();
        queue.push({
          qid: crypto.randomUUID(),
          log_book_id: bookId,
          user_id: user.id,
          entry_type: entry.entry_type,
          entry_date: entry.entry_date,
          data: entry.data,
          tester_name: entry.tester_name,
          resolved: entry.resolved ?? null,
          resolved_date: entry.resolved_date ?? null,
          queued_at: new Date().toISOString(),
        });
        writeQueue(queue);
        setEntries((prev) => [...queuedForBook(bookId), ...prev.filter((x) => !x.pending)]);
        return;
      }

      // Service and battery entries roll the book's "last done" dates forward
      // so reminders track reality without a second manual step.
      if (entry.entry_type === 'service') {
        await db
          .from('fire_alarm_log_books')
          .update({ last_service_date: entry.entry_date })
          .eq('id', bookId);
      } else if (entry.entry_type === 'battery') {
        await db
          .from('fire_alarm_log_books')
          .update({ last_battery_date: entry.entry_date })
          .eq('id', bookId);
      }
      await refresh();
    },
    [user?.id, bookId, db, refresh]
  );

  const resolveFault = useCallback(
    async (entryId: string, resolvedDate: string) => {
      const { error } = await db
        .from('fire_alarm_log_entries')
        .update({ resolved: true, resolved_date: resolvedDate })
        .eq('id', entryId);
      if (error) throw error;
      await refresh();
    },
    [db, refresh]
  );

  const deleteEntry = useCallback(
    async (entryId: string) => {
      const queue = readQueue();
      if (queue.some((q) => q.qid === entryId)) {
        writeQueue(queue.filter((q) => q.qid !== entryId));
        await refresh();
        return;
      }
      const { error } = await db.from('fire_alarm_log_entries').delete().eq('id', entryId);
      if (error) throw error;
      await refresh();
    },
    [db, refresh]
  );

  const archiveBook = useCallback(async () => {
    if (!bookId) return;
    const { error } = await db
      .from('fire_alarm_log_books')
      .update({ archived_at: new Date().toISOString() })
      .eq('id', bookId);
    if (error) throw error;
  }, [bookId, db]);

  return { book, entries, loading, refresh, updateBook, addEntry, resolveFault, deleteEntry, archiveBook };
}
