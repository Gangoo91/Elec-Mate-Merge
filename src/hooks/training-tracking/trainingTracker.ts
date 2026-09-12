/**
 * Off-the-job training tracker — ONE shared instance for the whole app.
 *
 * ⚠️ Why this is a module singleton and not state inside a hook.
 *
 * Until September 2026 every component calling `useAutomatedTraining` got its
 * own timer, its own window listeners and its own writer. Five components did,
 * two of them mounted app-wide (`TrainingActivityMonitor` in `App.tsx`, and
 * `RecordingIndicator` twice in `Header`). That caused all of the following:
 *
 *   - the header's "Recording" dot read an isolated copy of the state that
 *     nothing ever set, so it never appeared;
 *   - each instance attached its own mousemove/scroll listeners and called
 *     setState from them, so the app re-rendered on every mouse movement;
 *   - each of those renders re-ran an effect whose cleanup saved a time entry,
 *     and every save was floored at five minutes by `Math.max(5, …)`.
 *
 * One second of study became five minutes of logged training. The result was
 * 5,753 phantom rows and 479.5 fabricated hours across 51 learners; one banked
 * 43.4 "hours" inside an eleven-minute window (ELE-1724).
 *
 * These hours are not cosmetic. They flow into the evidence pack a learner
 * hands their tutor or an EPA gateway, so the bar here is the same as for a
 * certificate: never record time that was not spent.
 *
 * The rules this file keeps:
 *   1. One timer, one listener set, one writer, for the whole app.
 *   2. Time is accrued by the clock and only by the clock. A render can never
 *      add a second, and never writes.
 *   3. A saved entry is whole minutes that actually elapsed. No minimum, no
 *      rounding up. Under a minute is not worth a row.
 *   4. Activity listeners update a timestamp. They never call setState.
 *   5. Time that cannot be written now is stashed, never guessed at later.
 */
import { supabase } from '@/integrations/supabase/client';
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';

/** How often the clock ticks. */
const TICK_MS = 1000;
/**
 * A gap larger than this between ticks means the tab was suspended — laptop
 * closed, phone locked, or Chrome freezing a background tab. Those seconds
 * were not study and are not credited.
 */
const MAX_CREDITED_GAP_MS = 10_000;
/**
 * No pointer, key, scroll or touch for this long and the clock stops crediting.
 * Reading a long page without touching anything is normal study, so this is
 * deliberately more generous than the one minute the old code used.
 */
const INACTIVITY_MS = 5 * 60 * 1000;
/** Write a checkpoint this often so a crash cannot lose a long session. */
const CHECKPOINT_MS = 15 * 60 * 1000;
/** Whole minutes only — below one there is nothing meaningful to record. */
const MIN_SAVE_SECONDS = 60;

const AUTO_NOTE = 'Auto-tracked training time';

/**
 * Where unwritten time waits if the tab closes mid-session.
 *
 * A closing page cannot finish an async insert, so the seconds are stashed
 * synchronously here and written on the next visit. Nothing is ever
 * reconstructed or estimated: only seconds the clock actually counted.
 */
const PENDING_KEY = 'elecmate.otj.pending';

interface PendingEntry {
  activity: string;
  seconds: number;
  /** The day the time was spent, not the day it gets written. */
  date: string;
}

export interface TrainingTrackerStatus {
  isTracking: boolean;
  currentActivity: string | null;
  isSaving: boolean;
}

type Listener = () => void;

let status: TrainingTrackerStatus = {
  isTracking: false,
  currentActivity: null,
  isSaving: false,
};

/** Seconds credited to the session on screen. */
let sessionSeconds = 0;
/** Seconds credited but not yet written to the database. */
let unsavedSeconds = 0;
/** Sub-second remainder, carried so the clock does not drift. */
let carryMs = 0;
let msSinceCheckpoint = 0;
/** The day the current session's unsaved seconds belong to. */
let sessionDate = todayIso();

let tickHandle: number | null = null;
let lastTickAt = 0;
let lastActivityAt = 0;
let listenersAttached = false;
/** Guards against two stops racing to bank the same session. */
let stopInFlight: Promise<number> | null = null;

/**
 * Status changes are rare; clock ticks happen every second. They are separate
 * channels so the header's recording dot does not re-render the app once a
 * second just because something, somewhere, wants to show a running clock.
 */
const statusListeners = new Set<Listener>();
const tickListeners = new Set<Listener>();

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

const emit = (set: Set<Listener>) => {
  for (const listener of set) listener();
};

const setStatus = (next: Partial<TrainingTrackerStatus>) => {
  const merged = { ...status, ...next };
  if (
    merged.isTracking === status.isTracking &&
    merged.currentActivity === status.currentActivity &&
    merged.isSaving === status.isSaving
  ) {
    return;
  }
  status = merged;
  emit(statusListeners);
};

/* ── writing ───────────────────────────────────────────────────────────── */

const insertEntry = async (entry: PendingEntry): Promise<boolean> => {
  const minutes = Math.floor(entry.seconds / 60);
  if (minutes < 1) return false;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { error } = await supabase.from('time_entries').insert({
    user_id: user.id,
    date: entry.date,
    duration: minutes,
    activity: entry.activity,
    notes: AUTO_NOTE,
    /**
     * True, because it is: the app logged this without the learner asking.
     * The old writer hardcoded `false`, which disguised auto-tracked time as
     * a manual entry and let it past the duplicate guard in
     * `useApprenticeOtj`.
     *
     * 🔴 By design this EXCLUDES these rows from off-the-job totals.
     * Unattended app activity carries no start time, no working-hours
     * evidence and no sign-off, so it cannot be claimed as off-the-job
     * training. Under-counting is the safe direction — see ELE-1711.
     */
    is_automatic: true,
  });

  if (error) {
    console.error('[trainingTracker] failed to save training time', error);
    return false;
  }
  return true;
};

/**
 * Write the whole minutes banked so far. Returns the minutes written.
 *
 * The seconds are deducted BEFORE the await, so a checkpoint landing at the
 * same moment as a stop cannot write the same time twice. They go back if the
 * write fails, so the next checkpoint retries rather than losing the session.
 */
const flush = async (): Promise<number> => {
  const activity = status.currentActivity;
  if (!activity || unsavedSeconds < MIN_SAVE_SECONDS) return 0;

  const minutes = Math.floor(unsavedSeconds / 60);
  const claimedSeconds = minutes * 60;
  const entry: PendingEntry = { activity, seconds: claimedSeconds, date: sessionDate };
  unsavedSeconds -= claimedSeconds;
  setStatus({ isSaving: true });

  try {
    const saved = await insertEntry(entry);
    if (!saved) {
      unsavedSeconds += claimedSeconds;
      return 0;
    }
    return minutes;
  } catch (error) {
    unsavedSeconds += claimedSeconds;
    console.error('[trainingTracker] failed to save training time', error);
    return 0;
  } finally {
    setStatus({ isSaving: false });
  }
};

/**
 * Hand the unwritten seconds to storage. Synchronous on purpose: this runs
 * while the page is being torn down, where an async insert would be killed
 * before it reached the network.
 */
const stashPending = () => {
  const activity = status.currentActivity;
  if (!activity || unsavedSeconds < MIN_SAVE_SECONDS) return;

  const existing = storageGetJSONSync<PendingEntry | null>(PENDING_KEY, null);
  // A stash from the same activity and day is topped up rather than replaced,
  // so closing the tab twice in a session cannot discard the first half.
  const seconds =
    existing && existing.activity === activity && existing.date === sessionDate
      ? existing.seconds + unsavedSeconds
      : unsavedSeconds;

  if (storageSetJSONSync<PendingEntry>(PENDING_KEY, { activity, seconds, date: sessionDate })) {
    unsavedSeconds = 0;
  }
};

/** Write anything a previous visit could not. Safe to call on every mount. */
const recoverPending = async (): Promise<number> => {
  const pending = storageGetJSONSync<PendingEntry | null>(PENDING_KEY, null);
  if (!pending?.activity || !pending.date || !(pending.seconds >= MIN_SAVE_SECONDS)) {
    if (pending) storageRemoveSync(PENDING_KEY);
    return 0;
  }

  // Clear first: a write that fails is better lost than written twice, because
  // a duplicated entry inflates a learner's hours and that is the whole bug
  // this file exists to stop.
  storageRemoveSync(PENDING_KEY);

  try {
    const saved = await insertEntry(pending);
    return saved ? Math.floor(pending.seconds / 60) : 0;
  } catch (error) {
    console.error('[trainingTracker] failed to recover stashed training time', error);
    return 0;
  }
};

/* ── activity + visibility ─────────────────────────────────────────────── */

const ACTIVITY_EVENTS = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'] as const;

/** Deliberately a bare assignment: no state, so no render. */
const noteActivity = () => {
  lastActivityAt = Date.now();
};

const handleVisibilityChange = () => {
  if (document.visibilityState === 'hidden') {
    // The page is alive, just not on screen, so an async write still lands.
    void flush();
  } else {
    // Returning resets the clock's reference point, so the time away is not
    // credited, and counts as activity.
    lastTickAt = Date.now();
    noteActivity();
  }
};

const handlePageHide = () => {
  stashPending();
};

const attachListeners = () => {
  if (listenersAttached || typeof window === 'undefined') return;
  for (const event of ACTIVITY_EVENTS) {
    window.addEventListener(event, noteActivity, { passive: true });
  }
  window.addEventListener('pagehide', handlePageHide);
  document.addEventListener('visibilitychange', handleVisibilityChange);
  listenersAttached = true;
};

const detachListeners = () => {
  if (!listenersAttached || typeof window === 'undefined') return;
  for (const event of ACTIVITY_EVENTS) {
    window.removeEventListener(event, noteActivity);
  }
  window.removeEventListener('pagehide', handlePageHide);
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  listenersAttached = false;
};

/* ── the clock ─────────────────────────────────────────────────────────── */

const tick = () => {
  const now = Date.now();
  const elapsed = now - lastTickAt;
  lastTickAt = now;

  // Suspended tab, or a clock jump. Not study time.
  if (elapsed <= 0 || elapsed > MAX_CREDITED_GAP_MS) return;
  // Nobody is there.
  if (now - lastActivityAt > INACTIVITY_MS) return;

  carryMs += elapsed;
  const seconds = Math.floor(carryMs / 1000);
  if (seconds > 0) {
    carryMs -= seconds * 1000;
    sessionSeconds += seconds;
    unsavedSeconds += seconds;
    emit(tickListeners);
  }

  msSinceCheckpoint += elapsed;
  if (msSinceCheckpoint >= CHECKPOINT_MS) {
    msSinceCheckpoint = 0;
    void flush();
  }
};

const startClock = () => {
  if (tickHandle !== null) return;
  lastTickAt = Date.now();
  noteActivity();
  tickHandle = window.setInterval(tick, TICK_MS);
};

const stopClock = () => {
  if (tickHandle === null) return;
  window.clearInterval(tickHandle);
  tickHandle = null;
};

const resetSession = () => {
  sessionSeconds = 0;
  carryMs = 0;
  msSinceCheckpoint = 0;
  sessionDate = todayIso();
};

/* ── public API — stable references, safe in any dependency array ──────── */

export const trainingTracker = {
  /**
   * Begin, or switch, tracking. Switching activity banks the time earned under
   * the previous label first, so hours are never relabelled. Whole minutes are
   * written; anything under a minute is dropped rather than carried, because
   * carrying it would attribute one activity's time to another.
   */
  start(activity: string) {
    if (status.isTracking && status.currentActivity === activity) return;

    if (status.currentActivity && status.currentActivity !== activity) {
      void flush();
      unsavedSeconds = 0;
      resetSession();
    }

    setStatus({ isTracking: true, currentActivity: activity });
    attachListeners();
    startClock();
  },

  /** Stop the clock but keep the session, so it can be resumed. */
  pause() {
    if (!status.isTracking) return;
    stopClock();
    setStatus({ isTracking: false });
  },

  resume() {
    if (status.isTracking || !status.currentActivity) return;
    setStatus({ isTracking: true });
    startClock();
  },

  /** Stop, bank whatever whole minutes were earned, and clear the session. */
  stop(): Promise<number> {
    if (stopInFlight) return stopInFlight;
    if (!status.isTracking && !status.currentActivity) return Promise.resolve(0);

    stopClock();
    stopInFlight = (async () => {
      try {
        const minutes = await flush();
        detachListeners();
        unsavedSeconds = 0;
        resetSession();
        setStatus({ isTracking: false, currentActivity: null });
        return minutes;
      } finally {
        stopInFlight = null;
      }
    })();
    return stopInFlight;
  },

  /**
   * Write time a previous visit stashed when the tab closed. Call once per
   * app load, after the learner is known to be signed in.
   */
  recoverPending,

  getStatus: (): TrainingTrackerStatus => status,
  getSessionSeconds: (): number => sessionSeconds,

  subscribeStatus(listener: Listener) {
    statusListeners.add(listener);
    return () => {
      statusListeners.delete(listener);
    };
  },

  subscribeTick(listener: Listener) {
    tickListeners.add(listener);
    return () => {
      tickListeners.delete(listener);
    };
  },
};
