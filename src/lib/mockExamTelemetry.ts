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
import { recordMiss } from '@/lib/missedQuestions';

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
}

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
  } = args;

  if (typeof window === 'undefined') return;
  if (!examSlug || questions.length === 0) return;

  // ── Personal revision pile ────────────────────────────────────────────
  // Signed-in learners only — the public papers are also served to anonymous
  // visitors, who have nowhere to put a missed question.
  if (userId) {
    questions.forEach((q, i) => {
      const answer = answers[i];
      if (isSkipped(answer)) return;
      if (answer === q.correctAnswer) return;
      recordMiss(
        userId,
        {
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: typeof q.explanation === 'string' ? q.explanation : undefined,
        },
        examName
      );
    });
  }

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
  };

  // `source` and `user_id` were added to seo_mock_attempts in the migration
  // that unified the free and in-app datasets. src/integrations/supabase/
  // types.ts is generated and still predates them, so the inferred Insert type
  // rejects both keys. Cast here rather than hand-editing generated output;
  // drop it the next time types are regenerated.
  void supabase
    .from('seo_mock_attempts')
    .insert(payload as never)
    .then(({ error }) => {
      if (error && import.meta.env.DEV) {
        console.warn('[mock attempt insert failed]', error.message);
      }
    });

  // ── Per-question aggregates ───────────────────────────────────────────
  // Counters only, no PII. Powers "how many others miss this one" in review.
  if (questions.length > MAX_STATS_QUESTIONS) return;
  const numericIds = questions.every((q) => typeof q.id === 'number');
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
