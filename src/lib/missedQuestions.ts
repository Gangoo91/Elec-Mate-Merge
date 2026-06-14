/**
 * missedQuestions — the wrong-answer revision pile.
 *
 * Every question a learner answers wrongly in a mock exam is remembered
 * here (localStorage, per-user). A "Quick revision" session replays the
 * personal missed pile until each question is beaten twice in a row —
 * then it graduates and never comes back.
 *
 * Design notes:
 *   - localStorage (not Supabase) on purpose: this is a private,
 *     device-local study habit, zero new tables, zero latency, and a
 *     wrong answer on a public exam page can be captured with no UI
 *     change. Keyed by uid so shared devices don't cross-pollinate.
 *   - Capped ring of 120 entries — oldest misses fall off first so the
 *     pile stays focused on recent gaps and the JSON stays tiny.
 *   - Questions are keyed by a hash of the question TEXT, not the bank
 *     id — ids collide across the ~25 separate exam banks, text doesn't.
 *   - Defensive parsing throughout: a corrupt blob resets to empty
 *     rather than crashing the exam or the session page.
 */

export interface MissedQuestion {
  /** Stable key — hash of the normalised question text. */
  key: string;
  question: string;
  options: string[];
  /** Index into options. */
  correctAnswer: number;
  explanation?: string;
  /** Where it was missed — exam slug or title (e.g. "Free AM2 Mock Exam"). */
  source: string;
  /** Epoch ms of the most recent miss. */
  missedAt: number;
  /** Total times answered wrongly (exams + revision sessions). */
  timesMissed: number;
  /** Consecutive correct answers in revision — 2 graduates the question. */
  winStreak: number;
}

/** Wins in a row needed before a question leaves the pile. */
export const WINS_TO_GRADUATE = 2;

/** Hard cap on pile size — oldest misses are evicted beyond this. */
const MAX_PILE = 120;

const storageKey = (uid: string) => `missed_questions:${uid}`;

/** djb2 over normalised text — tiny, stable, collision-safe at this scale. */
function hashQuestion(text: string): string {
  const s = text.trim().toLowerCase().replace(/\s+/g, ' ');
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(36);
}

function isValidEntry(e: unknown): e is MissedQuestion {
  if (!e || typeof e !== 'object') return false;
  const m = e as Record<string, unknown>;
  return (
    typeof m.key === 'string' &&
    typeof m.question === 'string' &&
    Array.isArray(m.options) &&
    m.options.length >= 2 &&
    m.options.every((o) => typeof o === 'string') &&
    typeof m.correctAnswer === 'number' &&
    m.correctAnswer >= 0 &&
    m.correctAnswer < m.options.length &&
    typeof m.missedAt === 'number' &&
    typeof m.timesMissed === 'number' &&
    typeof m.winStreak === 'number'
  );
}

function readPile(uid: string): MissedQuestion[] {
  if (typeof window === 'undefined' || !uid) return [];
  try {
    const raw = window.localStorage.getItem(storageKey(uid));
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidEntry);
  } catch {
    return [];
  }
}

function writePile(uid: string, pile: MissedQuestion[]): void {
  if (typeof window === 'undefined' || !uid) return;
  try {
    // Ring cap — evict the OLDEST misses first so the pile tracks
    // recent gaps in knowledge, not ancient history.
    let next = pile;
    if (next.length > MAX_PILE) {
      next = [...next].sort((a, b) => b.missedAt - a.missedAt).slice(0, MAX_PILE);
    }
    window.localStorage.setItem(storageKey(uid), JSON.stringify(next));
  } catch {
    // Quota exceeded / private mode — fail silently, never break the exam.
  }
}

export interface RecordableQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

/**
 * Remember a wrongly answered question. Re-missing an existing entry
 * bumps timesMissed, refreshes missedAt and resets any win streak.
 */
export function recordMiss(uid: string, q: RecordableQuestion, source: string): void {
  if (!uid || !q?.question || !Array.isArray(q.options)) return;
  if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
    return;
  }
  const pile = readPile(uid);
  const key = hashQuestion(q.question);
  const now = Date.now();
  const existing = pile.find((e) => e.key === key);
  if (existing) {
    existing.timesMissed += 1;
    existing.missedAt = now;
    existing.winStreak = 0;
    // Refresh content in case the bank's wording/explanation improved.
    existing.options = [...q.options];
    existing.correctAnswer = q.correctAnswer;
    existing.explanation = q.explanation;
    existing.source = source;
  } else {
    pile.push({
      key,
      question: q.question,
      options: [...q.options],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      source,
      missedAt: now,
      timesMissed: 1,
      winStreak: 0,
    });
  }
  writePile(uid, pile);
}

export type RevisionOutcome =
  /** Correct, and that was the second win in a row — removed from the pile. */
  | 'graduated'
  /** Correct, but needs one more win before it graduates. */
  | 'progressed'
  /** Wrong again — streak reset, timesMissed bumped. */
  | 'missed'
  /** Key not found (already graduated elsewhere / pile cleared). */
  | 'unknown';

/**
 * Record a revision-session answer for a pile entry.
 * Two consecutive correct answers graduate (remove) the question.
 */
export function recordResult(uid: string, key: string, correct: boolean): RevisionOutcome {
  if (!uid || !key) return 'unknown';
  const pile = readPile(uid);
  const idx = pile.findIndex((e) => e.key === key);
  if (idx === -1) return 'unknown';
  const entry = pile[idx];
  if (correct) {
    entry.winStreak += 1;
    if (entry.winStreak >= WINS_TO_GRADUATE) {
      pile.splice(idx, 1);
      writePile(uid, pile);
      return 'graduated';
    }
    writePile(uid, pile);
    return 'progressed';
  }
  entry.winStreak = 0;
  entry.timesMissed += 1;
  entry.missedAt = Date.now();
  writePile(uid, pile);
  return 'missed';
}

/**
 * Build a revision session — up to `max` questions, worst first:
 * highest timesMissed, then oldest missedAt (longest-neglected) as the
 * tiebreaker.
 */
export function getSession(uid: string, max = 12): MissedQuestion[] {
  return readPile(uid)
    .sort((a, b) => b.timesMissed - a.timesMissed || a.missedAt - b.missedAt)
    .slice(0, Math.max(0, max));
}

/** How many questions are waiting in the pile. */
export function getCount(uid: string): number {
  return readPile(uid).length;
}
