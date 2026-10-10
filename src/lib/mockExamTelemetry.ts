/**
 * One recorder for every mock exam result, free or paid.
 *
 * The public /mock-exams papers have been logging attempts and per-question
 * failure rates since launch; the in-app Study Centre papers logged nothing,
 * so half the exam estate was invisible and the two halves could never be
 * compared. Both now write the same rows to the same tables, tagged by
 * `source` so a query can split them or treat them as one dataset.
 *
 * Everything here is fire-and-forget. A telemetry failure must never surface
 * to a learner mid-exam or block the results screen.
 */
import { supabase } from '@/integrations/supabase/client';

export interface TelemetryQuestion {
  /** Bank id. Per-question stats are skipped unless every id is numeric. */
  id?: number | string;
  question: string;
  options: string[];
  /** Index into `options` AS DISPLAYED to the candidate. */
  correctAnswer: number;
  explanation?: string;
  /**
   * Permutation from shuffleAllQuestionOptions:
   * optionOrder[displayedIndex] = index in the bank's original ordering.
   */
  optionOrder?: number[];
  /** Where the question sits in the course — '3.1', 'Section 2', … */
  section?: string;
  topic?: string;
  category?: string;
  /** The question's module, when the bank carries one (Level 3 mixed paper). */
  module?: string;
  /** The paper this question really comes from, when it isn't this one (the
   *  weak-spots mock mixes papers) — so its study link and topic still resolve. */
  sourceSlug?: string;
  /** Where the answer lives (table/regulation), shown in the review. */
  reference?: string;
}

/** One question got wrong or skipped, as the learner saw it (ELE-1815). */
export interface MockReviewItem {
  /** Stable key: hash of the question text — same question, same key, any paper. */
  k: string;
  q: string;
  /** Options as displayed. */
  o: string[];
  /** Correct option index, as displayed. */
  c: number;
  /** What they picked, as displayed; null = skipped. */
  a: number | null;
  e?: string;
  s?: string;
  t?: string;
  r?: string;
  /** Module, when the bank carries one ('Module 3'). */
  m?: string;
  /** Source paper, when it isn't the attempt's own (weak-spots mock). */
  x?: string;
}

/** FNV-1a over the normalised question text. Short, stable, no crypto needed. */
export function questionKey(text: string): string {
  const norm = text.toLowerCase().replace(/\s+/g, ' ').trim();
  let h = 0x811c9dc5;
  for (let i = 0; i < norm.length; i++) {
    h ^= norm.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return `q${h.toString(16).padStart(8, '0')}${norm.length.toString(36)}`;
}

const clip = (v: unknown, n: number): string | undefined =>
  typeof v === 'string' && v.trim() ? v.trim().slice(0, n) : undefined;

export interface RecordMockAttemptArgs {
  /** Stable identifier for this paper. Max 100 chars (RLS bound). */
  examSlug: string;
  topicSlug?: string | null;
  source: 'seo' | 'in_app';
  /** Human-readable paper name — used to label the revision pile entries. */
  examName: string;
  questions: TelemetryQuestion[];
  /** Chosen option index per question as displayed; null/undefined/-1 = skipped. */
  answers: (number | null | undefined)[];
  /** Epoch ms when the paper was started. */
  startedAt: number | null;
  finishedAt?: number;
  /** Percentage needed to pass. Defaults to 60. */
  passThreshold?: number;
  /** Signed-in learner, when there is one. Anonymous SEO attempts pass null. */
  userId?: string | null;
  /** Attach user-agent/referrer hints. Only meaningful for the public papers. */
  includeBrowserHints?: boolean;
  /** Where to take this paper again. Defaults to the current page. */
  retakePath?: string;
  /** Section code → topic name, when the bank keys sections ('3.1' → 'AC Theory'). */
  sectionTopics?: Record<string, string>;
}

/** RLS rejects anything under 30s, so short attempts are dropped client-side. */
const MIN_ATTEMPT_SECONDS = 30;
/** The stats RPC ignores batches larger than this. */
const MAX_STATS_QUESTIONS = 60;

const isSkipped = (a: number | null | undefined): boolean =>
  a === null || a === undefined || a === -1;

export function recordMockExamAttempt(args: RecordMockAttemptArgs): void {
  const {
    examSlug,
    topicSlug = null,
    source,
    examName,
    questions,
    answers,
    startedAt,
    finishedAt = Date.now(),
    passThreshold = 60,
    userId = null,
    includeBrowserHints = false,
    retakePath = typeof window !== 'undefined' ? window.location.pathname : undefined,
    sectionTopics,
  } = args;

  if (typeof window === 'undefined') return;
  if (!examSlug || questions.length === 0) return;

  // Mock misses used to be copied into the per-browser revision pile
  // (missedQuestions.ts). Since ELE-1815 every signed-in attempt carries its
  // own review snapshot and the pile is worked out server-side from those, on
  // every device — the local pile is left to the lesson quizzes.

  if (!startedAt) return;
  const timeSec = Math.round((finishedAt - startedAt) / 1000);
  // Misclicks and bots, not attempts. Matches the RLS lower bound exactly so
  // the insert can never be rejected for being too quick.
  if (timeSec < MIN_ATTEMPT_SECONDS) return;

  const correct = questions.reduce(
    (n, q, i) => (!isSkipped(answers[i]) && answers[i] === q.correctAnswer ? n + 1 : n),
    0
  );
  const percentage = Math.round((correct / questions.length) * 100);

  // What was served and what was missed, so the next paper can prefer unseen
  // questions and bring back the ones still being got wrong (ELE-1808).
  // A paper mixed from other papers (the weak-spots mock) numbers its
  // questions per sitting, so its ids mean nothing across attempts — no
  // id-based stats for it, or "others miss this" pools unrelated questions.
  const mixedPaper = questions.some((q) => q.sourceSlug);
  const allNumeric = !mixedPaper && questions.every((q) => typeof q.id === 'number');
  const servedIds = allNumeric ? questions.map((q) => q.id as number) : null;
  const missedIds = allNumeric
    ? questions
        .filter((q, i) => !isSkipped(answers[i]) && answers[i] !== q.correctAnswer)
        .map((q) => q.id as number)
    : null;

  const payload = {
    exam_slug: examSlug.slice(0, 100),
    topic_slug: topicSlug,
    source,
    user_id: userId,
    score: correct,
    total_questions: questions.length,
    percentage,
    time_taken_seconds: timeSec,
    passed: percentage >= passThreshold,
    user_agent_hint: includeBrowserHints ? (navigator.userAgent?.slice(0, 500) ?? null) : null,
    referrer: includeBrowserHints ? document.referrer?.slice(0, 1000) || null : null,
    // Bounded at 100 by a table constraint; the papers are at most 60.
    question_ids: servedIds && servedIds.length <= 100 ? servedIds : null,
    wrong_ids: missedIds && missedIds.length <= 100 ? missedIds : null,
    // ELE-1815 — what you need to go back into this attempt later. Signed-in
    // only (the RLS check rejects a review without a user).
    exam_name: clip(examName, 200) ?? null,
    retake_path: retakePath && retakePath.startsWith('/') ? retakePath.slice(0, 300) : null,
    served_keys:
      userId && questions.length <= 100 ? questions.map((q) => questionKey(q.question)) : null,
    review:
      userId && questions.length <= 100 ? buildReview(questions, answers, sectionTopics) : null,
    // Per-topic asked/right, so strength is a percentage of what was asked.
    topic_stats: userId ? buildTopicStats(questions, answers, sectionTopics) : null,
    pass_mark: Math.round(passThreshold),
  };

  // `source` and `user_id` were added to seo_mock_attempts in the migration
  // that unified the free and in-app datasets. src/integrations/supabase/
  // types.ts is generated and still predates them, so the inferred Insert type
  // rejects both keys. Cast here rather than hand-editing generated output;
  // drop it the next time types are regenerated.
  // Signed in: read the new row's id back (allowed by the own-rows SELECT
  // policy) so the results screen can say "saved" only when it was, and
  // "Drill the N you missed" can open exactly this attempt. Anonymous public
  // attempts have no SELECT policy, so they insert without reading back.
  const insert = supabase.from('seo_mock_attempts').insert(payload as never);
  void (userId ? insert.select('id').single() : insert).then(({ data, error }) => {
    if (error) {
      if (import.meta.env.DEV) console.warn('[mock attempt insert failed]', error.message);
      return;
    }
    const id = (data as { id?: string } | null)?.id;
    if (id) setLastSaved({ id, examSlug, at: Date.now() });
    // The server awards mock XP on insert (trg_xp_on_mock_attempt); show it.
    if (id && typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('elecmate:xp-check'));
  });

  // ── Per-question aggregates ───────────────────────────────────────────
  // Counters only, no PII. Powers "how many others miss this one" in review.
  if (questions.length > MAX_STATS_QUESTIONS) return;
  const numericIds = !mixedPaper && questions.every((q) => typeof q.id === 'number');
  if (!numericIds) return;

  const shownIds = questions.map((q) => q.id as number);
  const wrongIds = questions
    .filter((q, i) => !isSkipped(answers[i]) && answers[i] !== q.correctAnswer)
    .map((q) => q.id as number);

  // Map the clicked index back to the bank's ORIGINAL option ordering.
  // Options reshuffle every attempt, so a raw displayed index means a
  // different answer each time — recording it would fill the table with
  // noise that looks like data. -1 marks "no reliable mapping"; the RPC
  // discards those rather than counting them as a pick.
  const chosen = questions.map((q, i) => {
    const displayed = answers[i];
    if (isSkipped(displayed)) return -1;
    const order = q.optionOrder;
    if (Array.isArray(order) && typeof order[displayed as number] === 'number') {
      return order[displayed as number] as number;
    }
    return -1;
  });

  void supabase
    .rpc('log_mock_question_results', {
      p_exam_slug: examSlug.slice(0, 80),
      p_shown_ids: shownIds,
      p_wrong_ids: wrongIds,
      p_chosen: chosen,
    })
    .then(({ error }) => {
      if (error && import.meta.env.DEV) {
        console.warn('[log_mock_question_results failed]', error.message);
      }
    });
}

/** Every question got wrong or skipped, self-contained for review later. */
function buildReview(
  questions: TelemetryQuestion[],
  answers: (number | null | undefined)[],
  sectionTopics?: Record<string, string>
): MockReviewItem[] {
  const out: MockReviewItem[] = [];
  questions.forEach((q, i) => {
    const a = answers[i];
    const skipped = isSkipped(a);
    if (!skipped && a === q.correctAnswer) return;
    const section = clip(q.section, 40);
    out.push({
      k: questionKey(q.question),
      q: q.question.slice(0, 1200),
      o: q.options.slice(0, 8).map((o) => String(o).slice(0, 400)),
      c: q.correctAnswer,
      a: skipped ? null : (a as number),
      e: clip(q.explanation, 1500),
      s: section,
      // Topic maps are keyed either by the full section ('3.2') or by its
      // leading number ('3' — module 5's bank).
      t:
        clip(q.topic, 120) ??
        (section && sectionTopics
          ? clip(sectionTopics[section] ?? sectionTopics[section.split('.')[0]], 120)
          : undefined),
      r: clip(q.reference, 200),
      m: clip(q.module, 40),
      x: clip(q.sourceSlug, 100),
    });
  });
  return out;
}

// ── The attempt just saved (ELE-1815) ─────────────────────────────────────
// A tiny store, so the results screen and its "Drill the N you missed" button
// know whether — and as which row — the attempt they're showing was saved.

export interface SavedAttempt {
  id: string;
  examSlug: string;
  /** Epoch ms when the insert came back. */
  at: number;
}

let lastSaved: SavedAttempt | null = null;
const listeners = new Set<() => void>();

function setLastSaved(v: SavedAttempt) {
  lastSaved = v;
  listeners.forEach((fn) => fn());
}

export function getLastSavedAttempt(): SavedAttempt | null {
  return lastSaved;
}

/** Put back the attempt a results screen was showing before a reload, so its
 *  "saved" line and Drill button come back with it (see useExamAttempt). */
export function restoreLastSavedAttempt(v: { id: string; examSlug: string }) {
  setLastSaved({ id: v.id, examSlug: v.examSlug, at: Date.now() });
}

export function subscribeLastSavedAttempt(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Where "Drill the N you missed" goes: this attempt's misses if it was saved
 *  in the last 3 hours, otherwise the whole revision pile. Learners sit on the
 *  results screen for a long while (Andrzej, 7 Oct: over an hour), and 15
 *  minutes quietly widened the drill to everything. */
export function drillMissedPath(): string {
  const s = lastSaved;
  if (s && Date.now() - s.at < 3 * 60 * 60 * 1000)
    return `/study-centre/mock-exams/revise?attempt=${s.id}`;
  return '/study-centre/mock-exams/revise';
}

/** Topic → asked / got right (+ where it lives, for its study link). */
function buildTopicStats(
  questions: TelemetryQuestion[],
  answers: (number | null | undefined)[],
  sectionTopics?: Record<string, string>
): Record<string, { n: number; a: number; r: number; s?: string; m?: string; x?: string }> | null {
  const out: Record<
    string,
    { n: number; a: number; r: number; s?: string; m?: string; x?: string }
  > = {};
  questions.forEach((q, i) => {
    const section = clip(q.section, 40);
    const topic =
      clip(q.topic, 120) ??
      (section && sectionTopics
        ? clip(sectionTopics[section] ?? sectionTopics[section.split('.')[0]], 120)
        : undefined);
    if (!topic) return;
    const cur = out[topic] ?? {
      n: 0,
      a: 0,
      r: 0,
      s: section,
      m: clip(q.module, 40),
      x: clip(q.sourceSlug, 100),
    };
    cur.n += 1;
    // Answered, not just asked: an abandoned paper's skips aren't knowledge.
    if (!isSkipped(answers[i])) cur.a += 1;
    if (!isSkipped(answers[i]) && answers[i] === q.correctAnswer) cur.r += 1;
    out[topic] = cur;
  });
  const keys = Object.keys(out);
  if (!keys.length || keys.length > 60) return null;
  return out;
}
