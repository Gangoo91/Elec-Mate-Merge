/**
 * SEOMockExam — public, SEO-friendly mock exam component.
 *
 * Three states sharing one tight surface:
 *   1. PRE-START  — what crawlers index + what visitors see first.
 *                   No nested H1/eyebrow chrome — the H1 lives on the
 *                   wrapper page (<PublicMockExamPage>). This component
 *                   contributes: spec rows, Start button, sample
 *                   questions (as <details> so they're indexable but
 *                   don't dominate the viewport).
 *   2. ACTIVE     — question + options, sticky timer strip on mobile,
 *                   sticky thumb-reachable nav, sidebar grid on desktop.
 *   3. RESULTS    — score + retake (secondary), the breakdown-by-email
 *                   capture, weak areas, per-topic breakdown, the "Come to
 *                   Elec-Mate" conversion block, then the full answer review.
 *
 * Results order is deliberate and was changed 2026-08-05 off live data:
 * 2,789 people completed an exam in 28 days and 36 signed up. The retake
 * button was primary and sat above a 25-item review list, with the offer
 * dead last — so on mobile nobody ever reached it. Small ask (email) at
 * peak emotion, evidence, bigger ask (trial), then the free value. Don't
 * push the review back above the conversion block.
 *
 * Design language (2026-08-05 pass) — matches the house rules:
 *   - NO icons, NO emoji. State is carried by type weight, size and the
 *     word itself ("Pass" / "Not yet"), plus control-primitive geometry
 *     (progress bars, option letters, meters). Never decoration.
 *   - All text is text-white. Hierarchy comes from size/weight/tracking,
 *     never from low-opacity greys.
 *   - Mobile is flat and edge-to-edge: panels are `-mx-4` with border-y
 *     only, gaining rounding and side borders at sm:.
 *   - Hairline rules (white/12) separate; ONE yellow accent per zone. No
 *     gradients, no glow, no pills.
 *
 * Phase 1 option shuffle is wired here — per-attempt salt so retakes
 * feel fresh; fixed salt for the SSR sample questions so crawl HTML is
 * consistent across crawls.
 */
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { shuffleAllQuestionOptions, createShuffleSalt } from '@/utils/shuffleOptions';
import { supabase } from '@/integrations/supabase/client';
import { recordMiss } from '@/lib/missedQuestions';
import { EmailCaptureForm } from '@/components/landing/EmailCaptureForm';
import { PANEL, LABEL } from '@/components/seo/seoSurface';
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';

/**
 * In-progress attempt, persisted so a reload does not wipe the paper.
 *
 * 🔴 WHY. Everything about a live attempt sat in `useState` and nothing else,
 * so ANY reload lost the lot — every answer, the flags and the timer, with no
 * warning. That is not hypothetical: the stale-chunk error boundary
 * (`category: chunk`, ~94 events in 30 days, all on `analytics-events`)
 * deliberately force-reloads the page to recover, and iOS evicts backgrounded
 * tabs routinely. A 60-question timed paper could vanish at question 55.
 *
 * The drawn questions are stored too, not just the answers. Questions are drawn
 * stratified and the options reshuffled with a per-attempt salt, so redrawing on
 * resume would hand back a DIFFERENT paper and every stored answer index would
 * point at the wrong option.
 */
interface SavedAttempt {
  /** Bumped when the shape changes, so an old payload is discarded not misread. */
  v: 1;
  questions: SEOMockExamQuestion[];
  answers: (number | null)[];
  current: number;
  flagged: number[];
  attempt: number;
  startedAt: number;
  /**
   * Wall-clock end, not "seconds remaining".
   *
   * Storing the remaining seconds would let anyone top the clock back up by
   * refreshing, which makes a timed paper meaningless. The trade-off is
   * deliberate: leave for longer than the limit and the attempt is gone.
   */
  deadline: number;
}

const resumeKey = (pathname: string) => `mockExam:progress:${pathname}`;

export interface SEOMockExamQuestion {
  id: number | string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  topic?: string;
  section?: string;
  category?: string;
  /**
   * Banks carry extra per-exam fields (difficulty, reference, unit…) and this
   * type is handed straight to `shuffleAllQuestionOptions`, whose
   * `ShuffleableQuestion` constraint declares an index signature. Without a
   * matching one here the generic constraint fails and TS silently widens the
   * result, which then makes every rendered `q.explanation` an `unknown` and
   * unassignable to ReactNode. Pre-existing; fixed 2026-08-05.
   */
  [key: string]: unknown;
}

interface SEOMockExamProps {
  /** Plain exam name — only used inside aria-labels + the conversion block;
   * NOT rendered as a heading (H1 lives on the wrapper page). */
  examName: string;
  /** The full question bank — must contain at least `questionsPerExam` entries. */
  questionBank: SEOMockExamQuestion[];
  /**
   * Ids of the 3 questions to show as samples in the crawlable HTML. Needed
   * where several exams share one bank — without it every such page renders
   * the same three questions. Ids not present in the bank are ignored; an
   * empty or absent list falls back to the first three.
   */
  sampleQuestionIds?: Array<number | string>;
  /** How many questions the user gets per attempt. Default 25. */
  questionsPerExam?: number;
  /** Time limit per attempt (minutes). Default 30. */
  timeLimitMinutes?: number;
  /** Pass threshold (%). Default 70. */
  passThreshold?: number;
  /** Override the difficulty profile for this exam's draw. Defaults to
   *  DEFAULT_DIFFICULTY_MIX; only set it where the bank's tags have been
   *  validated against measured wrong-rates. */
  difficultyMix?: Record<string, number>;
  /** Sign-up CTA shown in the conversion block AFTER results. */
  signupCta?: { label: string; href: string; subline?: string };
  /**
   * Fired when an attempt is submitted. The wrapper page uses this to reveal
   * the sticky mobile CTA only once the exam is done — showing it mid-exam
   * would pester someone during the 13 minutes that make this page valuable.
   */
  onSubmitted?: () => void;
  /**
   * Fired when an attempt starts. The wrapper page uses this to hide the
   * page furniture (topic nav, FAQ, related exams) for the duration — a
   * timed exam should not be sitting next to a list of links out.
   */
  onStarted?: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Share of each attempt drawn from each difficulty tier.
 *
 * Why this exists: the draw used to be `shuffle(bank).slice(0, n)`, uniformly
 * at random. The 2391 bank is 96 basic / 162 intermediate / 42 advanced, so a
 * candidate could be handed a soft 30 and pass comfortably, or an unusually
 * hard 30 and fail — the same score meant different things on different
 * attempts. Live data showed the consequence: an 82% pass rate on 2391 and 29
 * AM2 questions that essentially nobody ever got wrong.
 *
 * A fixed mix makes the score comparable between attempts, which now matters
 * more than it used to because we email people their result and invite them
 * to retake. It also stops the mock being materially easier than the real
 * assessment, which is what makes a pass here worth anything.
 */
/**
 * Difficulty profile for a drawn paper.
 *
 * CALIBRATED FROM LIVE DATA (2026-08-06). The 2391 bank's author-assigned
 * difficulty tags were badly over-rated: re-tagging 280 questions against their
 * measured wrong-rates moved 44 "intermediate" down to basic and 33 "advanced"
 * down to intermediate. Honest measured means for that bank are now
 * basic 11.8% wrong, intermediate 31.3%, advanced 57.8%.
 *
 * Why these weights: the exam was passing 82.6% of 1,968 candidates with a mean
 * score of 77.4%, finished in 13.6 of the 90 minutes allowed. People sat it,
 * were told they were fine, and left — a mock that flatters nobody into revising.
 * A 20/50/30 mix on the corrected tags models to a 64.6% mean, which overshoots
 * into demoralising. 30/50/20 models to ~69% — a paper that sits right on the
 * 70% pass mark, so roughly half pass and the rest get a reason to prepare.
 *
 * It also eases repetition: the genuinely-advanced pool is only 36 questions, so
 * drawing 9 per paper (30%) recycles them hard across retakes; 6 does not.
 *
 * Per-exam override via the `difficultyMix` prop — other banks' tags have not
 * been validated against measured data yet, so they keep this default until they
 * have the attempt volume to re-tag. See project_mock_exam_quality memory.
 */
const DEFAULT_DIFFICULTY_MIX: Record<string, number> = {
  basic: 0.3,
  intermediate: 0.5,
  advanced: 0.2,
};

/**
 * Draw `count` questions with a consistent difficulty profile.
 *
 * Degrades safely: banks with no `difficulty` on their questions (or too few
 * in a tier to fill its quota) fall back to filling from whatever is left, so
 * every exam still gets a full paper. Never returns duplicates.
 */
function drawStratified(
  bank: SEOMockExamQuestion[],
  count: number,
  mix: Record<string, number> = DEFAULT_DIFFICULTY_MIX
): SEOMockExamQuestion[] {
  const tiers = new Map<string, SEOMockExamQuestion[]>();
  bank.forEach((q) => {
    const tier = typeof q.difficulty === 'string' ? q.difficulty : '';
    if (!tier || !(tier in mix)) return;
    const list = tiers.get(tier) ?? [];
    list.push(q);
    tiers.set(tier, list);
  });

  // No usable difficulty metadata — behave exactly as before.
  if (tiers.size === 0) return shuffle(bank).slice(0, count);

  const picked: SEOMockExamQuestion[] = [];
  const takenIds = new Set<SEOMockExamQuestion['id']>();
  Object.entries(mix).forEach(([tier, share]) => {
    const want = Math.round(count * share);
    shuffle(tiers.get(tier) ?? [])
      .slice(0, want)
      .forEach((q) => {
        picked.push(q);
        takenIds.add(q.id);
      });
  });

  // Top up (or trim) to the exact paper length from everything not yet used.
  if (picked.length < count) {
    shuffle(bank.filter((q) => !takenIds.has(q.id)))
      .slice(0, count - picked.length)
      .forEach((q) => picked.push(q));
  }
  return shuffle(picked).slice(0, count);
}

/** Two-digit row number — the house spec-row signature. */
function RowNumber({ n }: { n: number }) {
  return (
    <span className="shrink-0 text-[11px] font-semibold tabular-nums text-white pt-[3px] w-5">
      {String(n).padStart(2, '0')}
    </span>
  );
}

export function SEOMockExam({
  examName,
  questionBank,
  sampleQuestionIds,
  questionsPerExam = 25,
  timeLimitMinutes = 30,
  passThreshold = 70,
  difficultyMix,
  signupCta,
  onSubmitted,
  onStarted,
}: SEOMockExamProps) {
  const location = useLocation();
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /**
   * ELE-1503 — stand down any fixed bottom bar while a question is on screen.
   *
   * The free public exams render inside PublicPageLayout, whose logged-out sticky
   * mobile CTA is `fixed bottom-0 z-50 sm:hidden` — mobile, logged out, which is
   * exactly who sits these. It covered the Next button, so the exam looked frozen:
   * two users reported "can't get to the next question" five days apart.
   *
   * Same mechanism the Study Centre papers use — each toggles `body.exam-active` — so there is
   * one way of doing this rather than two. Driven off state, not the URL, so no
   * exam route can be missed. Only while ANSWERING — once results are up the
   * page wants its CTA back.
   */
  useEffect(() => {
    const answering = started && !submitted;
    if (!answering) return;
    document.body.classList.add('exam-active');
    return () => document.body.classList.remove('exam-active');
  }, [started, submitted]);
  const [questions, setQuestions] = useState<SEOMockExamQuestion[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(timeLimitMinutes * 60);
  const [attempt, setAttempt] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);
  // Synchronous re-entry guard — `submitted` state can't stop a double-tap
  // (or a timer-expiry + click race) calling submit twice before React
  // re-renders, which would record every missed question twice and insert
  // a duplicate attempt row.
  const submitGuardRef = useRef(false);

  /** Questions the candidate marked to come back to. Real papers let you do
   *  this, and without it people either guess early or lose their place. */
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  /** Shown when Submit is pressed with questions still blank. Submitting by
   *  accident scores every blank as wrong, which is how you end up with a 0%. */
  const [confirmingSubmit, setConfirmingSubmit] = useState(false);
  /** True when this attempt was restored from a previous session. */
  const [resumed, setResumed] = useState(false);
  /**
   * How often everyone else gets each question wrong, keyed by question id.
   * Pulled from `seo_mock_question_stats` (public-read) after submitting, and
   * shown on the review rows. It is the one thing on this page a competitor
   * cannot copy — it comes from ~55,000 real answers on our own exams — and it
   * turns "you got this wrong" into "so does everyone, here is why".
   */
  const [failureRates, setFailureRates] = useState<Record<string, number>>({});

  /**
   * 3 sample questions rendered server-side for SEO. Picked deterministically
   * and shuffled with a fixed salt so crawl HTML is identical between crawls.
   *
   * `sampleQuestionIds` exists because the default — the first three in the
   * bank — is wrong when several exams share one bank. The three C&G 2391
   * pages (2391-52, 2391-50 Initial Verification, 2391-51 Periodic) all draw
   * from the same 326-question bank and so all three rendered the SAME three
   * sample questions. Those are the only questions a crawler ever sees, since
   * the rest sit behind the start button, so the pages looked near-identical
   * where it mattered most. Worse, the default three happen to be periodic /
   * EICR questions, which were being shown on the Initial Verification page.
   */
  const sampleQuestions = useMemo(() => {
    const chosen = sampleQuestionIds?.length
      ? sampleQuestionIds
          .map((id) => questionBank.find((q) => q.id === id))
          .filter((q): q is SEOMockExamQuestion => Boolean(q))
      : [];
    const picked = chosen.length ? chosen : questionBank.slice(0, Math.min(3, questionBank.length));
    return shuffleAllQuestionOptions(picked, 0);
  }, [questionBank, sampleQuestionIds]);

  const start = useCallback(() => {
    // A fresh attempt supersedes any saved one — otherwise a stale paper could
    // be restored over the top on the next mount.
    storageRemoveSync(resumeKey(location.pathname));
    setResumed(false);
    const picked = shuffleAllQuestionOptions(
      drawStratified(questionBank, questionsPerExam, difficultyMix),
      createShuffleSalt()
    );
    setQuestions(picked);
    setAnswers(new Array(picked.length).fill(null));
    submitGuardRef.current = false;
    setCurrent(0);
    setSecondsLeft(timeLimitMinutes * 60);
    setSubmitted(false);
    setStarted(true);
    setAttempt((n) => n + 1);
    setStartedAt(Date.now());
    setFinishedAt(null);
    onStarted?.();
    // Scroll the exam into view so the user lands at the first question
    // rather than scrolling back to the now-hidden hero. scrollIntoView is
    // no good here: the app nav (4rem) AND the exam's own sticky status
    // strip both overlay the top of the container, so block:'start' buries
    // the question stem behind them. Offset manually instead.
    requestAnimationFrame(() => {
      const el = document.getElementById('mock-exam');
      if (!el) return;
      const STICKY_OFFSET = 116; // 4rem app nav + ~44px status strip + breathing room
      const top = el.getBoundingClientRect().top + window.scrollY - STICKY_OFFSET;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    });
  }, [
    questionBank,
    questionsPerExam,
    timeLimitMinutes,
    difficultyMix,
    onStarted,
    location.pathname,
  ]);

  /**
   * Restore an unfinished attempt on mount.
   *
   * Runs once, before the user can interact. An expired attempt is discarded
   * rather than auto-submitted: silently posting a score for a paper someone
   * walked away from would put a bogus row in `seo_mock_attempts` and skew the
   * pass-rate calibration.
   */
  useEffect(() => {
    const saved = storageGetJSONSync<SavedAttempt | null>(resumeKey(location.pathname), null);
    if (!saved || saved.v !== 1 || !saved.questions?.length) return;
    const remaining = Math.ceil((saved.deadline - Date.now()) / 1000);
    if (remaining <= 0) {
      storageRemoveSync(resumeKey(location.pathname));
      return;
    }
    setQuestions(saved.questions);
    setAnswers(saved.answers);
    setCurrent(saved.current);
    setFlagged(new Set(saved.flagged));
    setAttempt(saved.attempt);
    setStartedAt(saved.startedAt);
    setSecondsLeft(remaining);
    submitGuardRef.current = false;
    setStarted(true);
    setResumed(true);
    onStarted?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Persist while the attempt is live. Deliberately NOT throttled — the writes
   * are small and only fire on answer/navigation changes, and losing the last
   * answer before a crash is exactly the failure this exists to prevent.
   */
  useEffect(() => {
    if (!started || submitted || !questions.length || startedAt === null) return;
    storageSetJSONSync<SavedAttempt>(resumeKey(location.pathname), {
      v: 1,
      questions,
      answers,
      current,
      flagged: [...flagged],
      attempt,
      startedAt,
      deadline: startedAt + timeLimitMinutes * 60_000,
    });
  }, [
    started,
    submitted,
    questions,
    answers,
    current,
    flagged,
    attempt,
    startedAt,
    timeLimitMinutes,
    location.pathname,
  ]);

  const submit = useCallback(() => {
    if (submitGuardRef.current) return;
    submitGuardRef.current = true;
    // The attempt is over — drop the saved copy so a later visit starts clean
    // rather than resuming a paper that has already been marked.
    storageRemoveSync(resumeKey(location.pathname));
    setResumed(false);
    setSubmitted(true);
    setStarted(false);
    setConfirmingSubmit(false);
    const finished = Date.now();
    setFinishedAt(finished);

    // Pull the real-world failure rate for the questions just sat, so the
    // review rows can say how many other people miss each one. Public-read
    // table, fire-and-forget: if it fails the review simply omits the line.
    const ids = questions.map((q) => q.id);
    if (ids.length > 0) {
      void supabase
        .from('seo_mock_question_stats')
        .select('question_id,times_shown,times_wrong')
        .eq('exam_slug', location.pathname.split('/').filter(Boolean)[1] ?? '')
        .in('question_id', ids as (string | number)[])
        .then(({ data }) => {
          if (!data) return;
          const map: Record<string, number> = {};
          data.forEach((r: { question_id: number; times_shown: number; times_wrong: number }) => {
            // Ignore thin samples — a 1-of-2 wrong rate is noise, not insight.
            if (r.times_shown >= 25) {
              map[String(r.question_id)] = Math.round((100 * r.times_wrong) / r.times_shown);
            }
          });
          setFailureRates(map);
        });
    }
    onSubmitted?.();

    // Anonymous attempt logging — fire-and-forget, never blocks UI. Used
    // to surface social-proof stats ("X attempts this week") on these
    // landing pages once we have meaningful volume. RLS enforces sane
    // bounds; here we additionally gate sub-30-second attempts so
    // misclicks + obvious bots don't pollute the dataset.
    if (typeof window === 'undefined' || !startedAt) return;

    // Wrong-answer capture — signed-in learners only (this page is also
    // public/anonymous). Each answered-but-wrong question lands in the
    // personal missed pile that powers /apprentice/revision. Fire-and-
    // forget; zero UI change to the exam flow.
    const missed = questions.filter(
      (q, i) => answers[i] !== null && answers[i] !== q.correctAnswer
    );
    if (missed.length > 0) {
      void supabase.auth.getSession().then(({ data }) => {
        const uid = data.session?.user?.id;
        if (!uid) return;
        missed.forEach((q) =>
          recordMiss(
            uid,
            {
              question: q.question,
              options: q.options,
              correctAnswer: q.correctAnswer,
              explanation: q.explanation,
            },
            examName
          )
        );
      });
    }

    const timeSec = Math.round((finished - startedAt) / 1000);
    if (timeSec < 30 || questions.length === 0) return;
    const finalCorrect = questions.reduce(
      (n, q, i) => (answers[i] !== null && answers[i] === q.correctAnswer ? n + 1 : n),
      0
    );
    const finalPct = Math.round((finalCorrect / questions.length) * 100);
    // Path is /mock-exams/<exam>[/<topic>]
    const parts = location.pathname.split('/').filter(Boolean);
    const examSlugPart = parts[1];
    const topicSlug = parts[2] ?? null;
    if (!examSlugPart) return;
    const payload = {
      exam_slug: examSlugPart,
      topic_slug: topicSlug,
      score: finalCorrect,
      total_questions: questions.length,
      percentage: finalPct,
      time_taken_seconds: timeSec,
      passed: finalPct >= passThreshold,
      user_agent_hint: navigator.userAgent?.slice(0, 500) ?? null,
      referrer: document.referrer?.slice(0, 1000) || null,
    };
    void supabase
      .from('seo_mock_attempts')
      .insert(payload)
      .then(({ error }) => {
        if (error && import.meta.env.DEV) {
          // Don't surface to users — silent. Dev-only console for visibility.
          console.warn('[seo_mock_attempts insert failed]', error.message);
        }
      });
    // Per-question aggregates (counters only, no PII) — powers the
    // "questions electricians actually fail" first-party data content.
    const shownIds = questions.map((q) => q.id);
    const wrongIds = questions.filter((q, i) => answers[i] !== q.correctAnswer).map((q) => q.id);

    // WHICH option they picked, mapped back to the bank's ORIGINAL ordering.
    //
    // This mapping is the whole point. Options are reshuffled every attempt
    // (per-attempt salt), so the index the candidate clicked is meaningless
    // across attempts — "option 1" is a different answer each time. shuffle
    // Options() reports its permutation as `optionOrder`, where
    // optionOrder[displayedIndex] = originalIndex. Send anything else and the
    // table fills with noise that looks like data.
    //
    // -1 marks a skipped question; the RPC discards those rather than counting
    // them as a pick.
    const chosen = questions.map((q, i) => {
      const displayed = answers[i];
      if (displayed === null || displayed === undefined) return -1;
      const order = q.optionOrder;
      if (Array.isArray(order) && typeof order[displayed] === 'number') {
        return order[displayed] as number;
      }
      return -1; // no mapping available — record nothing rather than something wrong
    });

    void supabase
      .rpc('log_mock_question_results', {
        p_exam_slug: examSlugPart,
        p_shown_ids: shownIds,
        p_wrong_ids: wrongIds,
        p_chosen: chosen,
      })
      .then(({ error }) => {
        if (error && import.meta.env.DEV) {
          console.warn('[log_mock_question_results failed]', error.message);
        }
      });
  }, [startedAt, questions, answers, passThreshold, location.pathname, examName, onSubmitted]);

  useEffect(() => {
    if (!started || submitted) return;
    if (secondsLeft <= 0) {
      submit();
      return;
    }
    const t = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [started, submitted, secondsLeft, submit]);

  const correctCount = useMemo(
    () =>
      questions.reduce(
        (n, q, i) => (answers[i] !== null && answers[i] === q.correctAnswer ? n + 1 : n),
        0
      ),
    [questions, answers]
  );
  const percent = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
  const passed = percent >= passThreshold;
  const passMarkAbs = Math.ceil((questionsPerExam * passThreshold) / 100);

  const categoryBreakdown = useMemo(() => {
    const bucketKey = (q: SEOMockExamQuestion) => q.category || q.topic || '';
    const buckets = new Map<string, { correct: number; total: number }>();
    let hasAny = false;
    questions.forEach((q, i) => {
      const k = bucketKey(q);
      if (!k) return;
      hasAny = true;
      const b = buckets.get(k) ?? { correct: 0, total: 0 };
      b.total += 1;
      if (answers[i] !== null && answers[i] === q.correctAnswer) b.correct += 1;
      buckets.set(k, b);
    });
    if (!hasAny) return [];
    return [...buckets.entries()]
      .map(([name, v]) => ({
        name,
        correct: v.correct,
        total: v.total,
        percent: Math.round((v.correct / v.total) * 100),
      }))
      .sort((a, b) => a.percent - b.percent);
  }, [questions, answers]);

  const weakAreas = useMemo(
    () => categoryBreakdown.filter((c) => c.total >= 2 && c.percent < 60),
    [categoryBreakdown]
  );

  // Every question they got wrong or skipped, flattened for the breakdown
  // email. The edge function caps this at 10 and bounds every string, so
  // sending the lot here is safe — `missedTotal` carries the real count so
  // the email can say "and N more".
  const missedForEmail = useMemo(
    () =>
      questions
        .filter((q, i) => answers[i] !== q.correctAnswer)
        .map((q) => ({
          question: q.question,
          correctAnswer: q.options[q.correctAnswer],
          explanation: q.explanation,
        })),
    [questions, answers]
  );

  // Path is /mock-exams/<exam>[/<topic>] — the slug the email links back to.
  const examSlug = useMemo(
    () => location.pathname.split('/').filter(Boolean).slice(1).join('/'),
    [location.pathname]
  );

  const timeTakenSec = startedAt && finishedAt ? Math.round((finishedAt - startedAt) / 1000) : 0;
  const formatDuration = (s: number) => {
    const mm = Math.floor(s / 60);
    const ss = s % 60;
    return `${mm}m ${String(ss).padStart(2, '0')}s`;
  };

  const answeredCount = answers.filter((a) => a !== null).length;
  const progressPct = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;
  const mmss = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, '0')}`;
  const lowTime = secondsLeft < 300;
  const unanswered = questions.length - answeredCount;

  const toggleFlag = useCallback((i: number) => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }, []);

  /** Submit, but stop first if anything is still blank. */
  const requestSubmit = useCallback(() => {
    if (unanswered > 0) {
      setConfirmingSubmit(true);
      return;
    }
    submit();
  }, [unanswered, submit]);

  /**
   * Keyboard control. A candidate working through 30 questions on a laptop
   * should not have to reach for the mouse on every one: A–D picks an answer,
   * arrows move, F flags. Ignored while focus is in a field so the email
   * capture on the results screen still types normally.
   */
  useEffect(() => {
    if (!started) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const q = questions[current];
      if (!q) return;
      const key = e.key.toLowerCase();
      const letter = 'abcdefgh'.indexOf(key);
      if (letter >= 0 && letter < q.options.length) {
        e.preventDefault();
        setAnswers((prev) => {
          const a = [...prev];
          a[current] = letter;
          return a;
        });
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrent((c) => Math.min(questions.length - 1, c + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrent((c) => Math.max(0, c - 1));
      } else if (key === 'f') {
        e.preventDefault();
        toggleFlag(current);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [started, current, questions, toggleFlag]);

  const specRows: Array<[string, string]> = [
    ['Questions', String(questionsPerExam)],
    ['Time limit', `${timeLimitMinutes} min`],
    ['Pass mark', `${passThreshold}% · ${passMarkAbs}/${questionsPerExam}`],
    ['Question bank', String(questionBank.length)],
  ];

  return (
    <>
      {/* ============================ PRE-START ============================ */}
      {/* No max-width here: the wrapper page puts this beside the H1 in a
          two-column grid before the exam starts, so the column already sets
          the measure. Constraining again would strand the spec rows. */}
      {!started && !submitted && (
        <div className="space-y-9">
          {/* Spec rows — hairline table, flat on mobile. Replaces the old
              inline dot-separated stats line. */}
          <dl className={`${PANEL} divide-y divide-white/[0.08]`} aria-label="Exam at a glance">
            {specRows.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 px-4 py-3 sm:px-5">
                <dt className="text-[13.5px] text-white">{k}</dt>
                <dd className="text-[14px] font-semibold tabular-nums text-white">{v}</dd>
              </div>
            ))}
          </dl>

          {/* The CTA. The whole page's job. Full-width thumb target on phones. */}
          <div>
            <button
              type="button"
              onClick={start}
              className="h-14 w-full touch-manipulation rounded-xl bg-elec-yellow px-8 text-[16px] font-bold tracking-[-0.01em] text-black transition-colors hover:brightness-95 active:scale-[0.995] sm:w-auto"
              aria-label={`Start ${examName}`}
            >
              Start the mock exam
            </button>
            <p className="mt-3 text-[13.5px] leading-relaxed text-white">
              {/* Only promise a fresh paper when the bank is actually bigger
                  than the paper. Some topic banks hold exactly one exam's
                  worth, and "different questions each time" would be a lie
                  the visitor catches on their second attempt. */}
              {questionBank.length > questionsPerExam
                ? 'Free, no sign-up. Retake as many times as you like — different questions each time.'
                : 'Free, no sign-up. Retake as many times as you like — the questions are reshuffled, with the answer order changed.'}
            </p>
          </div>

          {/* Sample questions — numbered spec rows. <details> is native and
              indexable when the expanded HTML is in the source. */}
          <section aria-labelledby="sample-q-heading">
            <h2 id="sample-q-heading" className={`${LABEL} mb-3 text-white`}>
              Sample questions
            </h2>
            <ol className={`${PANEL} divide-y divide-white/[0.08]`}>
              {sampleQuestions.map((q, idx) => (
                <li key={q.id}>
                  <details className="group">
                    <summary className="flex cursor-pointer list-none touch-manipulation items-start gap-3 px-4 py-3.5 sm:px-5">
                      <RowNumber n={idx + 1} />
                      <span className="flex-1 text-[15px] font-medium leading-snug text-white">
                        {q.question}
                      </span>
                      <span
                        aria-hidden
                        className="mt-[7px] h-[7px] w-[7px] shrink-0 rotate-45 border-b border-r border-white transition-transform group-open:-rotate-[135deg]"
                      />
                    </summary>
                    <div className="px-4 pb-4 pl-[2.9rem] sm:px-5 sm:pb-5 sm:pl-[3.1rem]">
                      <ul className="space-y-1.5">
                        {q.options.map((opt, i) => (
                          <li
                            key={i}
                            className={`rounded-lg px-3 py-2 text-[13.5px] leading-snug text-white ${
                              i === q.correctAnswer
                                ? 'border border-emerald-400/40 bg-emerald-400/[0.08]'
                                : 'border border-white/[0.08]'
                            }`}
                          >
                            <span className="mr-2 font-semibold">
                              {String.fromCharCode(65 + i)}
                            </span>
                            {opt}
                          </li>
                        ))}
                      </ul>
                      {q.explanation && (
                        <p className="mt-3 text-[13.5px] leading-relaxed text-white">
                          <span className="font-semibold">Why: </span>
                          {q.explanation}
                        </p>
                      )}
                    </div>
                  </details>
                </li>
              ))}
            </ol>
          </section>
        </div>
      )}

      {/* ============================= ACTIVE ============================== */}
      {started && questions.length > 0 && (
        <div id="mock-exam" className="lg:grid lg:grid-cols-[1fr_17rem] lg:items-start lg:gap-8">
          {/* Mobile sticky status strip — flat, no card chrome. */}
          <div className="sticky top-[3.75rem] z-20 -mx-4 border-b border-white/[0.12] bg-elec-dark/95 backdrop-blur-md lg:hidden">
            <div className="flex items-center justify-between gap-4 px-4 py-2.5">
              <span
                className={`text-[15px] font-bold tabular-nums tracking-[-0.01em] text-white ${
                  lowTime ? 'text-orange-300' : ''
                }`}
              >
                {mmss}
              </span>
              <span className="text-[13px] tabular-nums text-white">
                {current + 1} of {questions.length}
              </span>
              <button
                type="button"
                onClick={requestSubmit}
                className="touch-manipulation text-[13px] font-semibold text-elec-yellow"
              >
                Submit
              </button>
            </div>
            <div className="h-px w-full bg-white/[0.12]">
              <div
                className="h-px bg-elec-yellow transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Question column */}
          <div className="pb-24 pt-6 lg:rounded-2xl lg:border lg:border-white/[0.08] lg:bg-[hsl(0_0%_9%)] lg:p-8 lg:pb-8 lg:pt-8">
            {/* Say so when the paper came back from a previous session — landing
                mid-exam with answers already filled in is alarming otherwise. */}
            {resumed && (
              <p className="mb-4 border-l-2 border-elec-yellow bg-elec-yellow/[0.08] px-3 py-2 text-[13px] leading-relaxed text-white">
                <span className="font-semibold">Picked up where you left off.</span> Your answers
                and remaining time were restored — the clock kept running.
              </p>
            )}
            <div className="mb-5 hidden items-baseline justify-between lg:flex">
              <p className={`${LABEL} text-white`}>
                Question {current + 1} of {questions.length}
              </p>
              <p className="text-[13px] tabular-nums text-white">{answeredCount} answered</p>
            </div>
            <h2 className="sr-only">Question {current + 1}</h2>
            <p className="text-[18px] font-semibold leading-[1.35] tracking-[-0.015em] text-white sm:text-[20px] lg:text-[22px]">
              {questions[current].question}
            </p>
            <ul className="mt-6 space-y-2.5">
              {questions[current].options.map((opt, i) => {
                const selected = answers[current] === i;
                return (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => {
                        const a = [...answers];
                        a[current] = i;
                        setAnswers(a);
                      }}
                      aria-pressed={selected}
                      className={`flex min-h-[60px] w-full touch-manipulation items-start gap-3.5 rounded-xl px-4 py-3.5 text-left transition-colors active:scale-[0.995] lg:min-h-[64px] lg:px-5 ${
                        selected
                          ? 'border border-elec-yellow bg-elec-yellow/[0.14]'
                          : 'border border-white/[0.08] bg-[hsl(0_0%_11%)] hover:bg-[hsl(0_0%_13%)]'
                      }`}
                    >
                      <span
                        className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[12.5px] font-bold ${
                          selected ? 'bg-elec-yellow text-black' : 'bg-[hsl(0_0%_16%)] text-white'
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="pt-[3px] text-[15px] leading-snug text-white lg:text-[16px]">
                        {opt}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Flag for review + keyboard hint */}
            <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/[0.12] pt-4">
              <button
                type="button"
                onClick={() => toggleFlag(current)}
                aria-pressed={flagged.has(current)}
                className={`h-11 touch-manipulation rounded-xl border px-4 text-[13.5px] font-medium transition-colors ${
                  flagged.has(current)
                    ? 'border-amber-300 bg-amber-300/[0.10] text-amber-300'
                    : 'border-white/[0.08] bg-[hsl(0_0%_13%)] text-white hover:bg-[hsl(0_0%_16%)]'
                }`}
              >
                {flagged.has(current) ? 'Flagged for review' : 'Flag for review'}
              </button>
              <p className="hidden text-[12.5px] text-white lg:block">
                Keys: A–D to answer · ← → to move · F to flag
              </p>
            </div>

            {/* Desktop nav — mobile gets the sticky bar below instead */}
            <div className="mt-8 hidden items-center justify-between gap-3 border-t border-white/[0.12] pt-6 lg:flex">
              <button
                type="button"
                onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                disabled={current === 0}
                className="h-12 touch-manipulation rounded-xl border border-white/[0.08] bg-[hsl(0_0%_13%)] px-5 text-[15px] font-medium text-white transition-colors hover:bg-[hsl(0_0%_16%)] disabled:pointer-events-none disabled:opacity-30"
              >
                Previous
              </button>
              {current < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}
                  className="h-12 touch-manipulation rounded-xl bg-elec-yellow px-6 text-[15px] font-bold text-black transition-colors hover:brightness-95"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={requestSubmit}
                  className="h-12 touch-manipulation rounded-xl bg-elec-yellow px-6 text-[15px] font-bold text-black transition-colors hover:brightness-95"
                >
                  Submit answers
                </button>
              )}
            </div>
          </div>

          {/* Mobile sticky nav — thumb-reachable, flat strip per house rules.
              ELE-1503: this was z-30 while PublicPageLayout's logged-out sticky
              CTA is z-50, so the CTA was painted straight over Next and the exam
              looked frozen. The CTA now stands down during an exam (see the
              body.exam-active effect above); z-40 is belt and braces so a stray
              z-30/z-35 element can't do the same thing again. Deliberately NOT
              z-50 — tying with the CTA would just hand the decision to DOM order,
              which is what caused this in the first place. */}
          <div
            data-exam-nav
            className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.12] bg-elec-dark/95 backdrop-blur-md lg:hidden"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          >
            <div className="flex items-center gap-3 px-4 py-3">
              <button
                type="button"
                onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                disabled={current === 0}
                className="h-12 touch-manipulation rounded-xl border border-white/[0.08] bg-[hsl(0_0%_13%)] px-5 text-[15px] font-medium text-white disabled:pointer-events-none disabled:opacity-30"
              >
                Back
              </button>
              {current < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}
                  className="h-12 flex-1 touch-manipulation rounded-xl bg-elec-yellow text-[15px] font-bold text-black"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={requestSubmit}
                  className="h-12 flex-1 touch-manipulation rounded-xl bg-elec-yellow text-[15px] font-bold text-black"
                >
                  Submit answers
                </button>
              )}
            </div>
          </div>

          {/* Unanswered guard. Submitting with blanks scores every one wrong,
              which is how people ended up with 0% results they did not intend. */}
          {confirmingSubmit && (
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="confirm-submit-heading"
              className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6"
            >
              <div className="w-full max-w-md border-t border-white/[0.14] bg-[#0e0e0e] p-6 sm:rounded-2xl sm:border">
                <h2
                  id="confirm-submit-heading"
                  className="text-[19px] font-bold tracking-[-0.015em] text-white"
                >
                  {unanswered} question{unanswered === 1 ? '' : 's'} still blank
                </h2>
                <p className="mt-2 text-[14.5px] leading-relaxed text-white">
                  Blank answers are marked wrong. You have{' '}
                  <span className="font-semibold tabular-nums">{mmss}</span> left — go back and
                  finish them, or submit as it stands.
                </p>
                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={() => {
                      const firstBlank = answers.findIndex((a) => a === null);
                      if (firstBlank >= 0) setCurrent(firstBlank);
                      setConfirmingSubmit(false);
                    }}
                    className="h-12 flex-1 touch-manipulation rounded-xl bg-elec-yellow text-[15px] font-bold text-black"
                  >
                    Go to first blank
                  </button>
                  <button
                    type="button"
                    onClick={submit}
                    className="h-12 flex-1 touch-manipulation rounded-xl border border-white/25 text-[15px] font-medium text-white hover:bg-white/[0.06]"
                  >
                    Submit anyway
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Desktop sidebar — timer, progress, question grid */}
          <aside className="sticky top-[5rem] hidden self-start lg:block">
            <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_9%)] p-5">
              <p className={`${LABEL} text-white`}>Time remaining</p>
              <p
                className={`mt-2 text-[38px] font-bold leading-none tabular-nums tracking-[-0.03em] ${
                  lowTime ? 'text-orange-300' : 'text-white'
                }`}
              >
                {mmss}
              </p>
              <div className="mt-4 h-px w-full bg-white/[0.12]">
                <div
                  className="h-px bg-elec-yellow transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="mt-2.5 text-[12.5px] tabular-nums text-white">
                {answeredCount} of {questions.length} answered
              </p>

              <div className="mt-6 grid grid-cols-5 gap-1.5">
                {questions.map((_, i) => {
                  const isAnswered = answers[i] !== null;
                  const isCurrent = i === current;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrent(i)}
                      className={`h-9 touch-manipulation rounded-md text-[12px] font-semibold tabular-nums transition-colors ${
                        isCurrent
                          ? 'bg-elec-yellow text-black'
                          : flagged.has(i)
                            ? 'border border-amber-300 text-amber-300'
                            : isAnswered
                              ? 'border border-white/25 bg-[hsl(0_0%_18%)] text-white'
                              : 'border border-white/[0.08] bg-[hsl(0_0%_13%)] text-white hover:bg-[hsl(0_0%_16%)]'
                      }`}
                      aria-label={`Go to question ${i + 1}${isAnswered ? ' (answered)' : ''}${
                        flagged.has(i) ? ' (flagged)' : ''
                      }`}
                      aria-current={isCurrent ? 'true' : undefined}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={requestSubmit}
                className="mt-5 h-11 w-full touch-manipulation rounded-xl border border-white/[0.08] bg-[hsl(0_0%_13%)] text-[13.5px] font-semibold text-white transition-colors hover:bg-[hsl(0_0%_16%)]"
              >
                Submit early
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ============================= RESULTS ============================= */}
      {submitted && (
        <div className="space-y-10">
          {/* Score — big tabular figure, verdict as a word. No badge, no icon. */}
          <div className={`${PANEL} px-4 py-6 sm:px-7 sm:py-7`} role="status" aria-live="polite">
            <p
              className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                passed ? 'text-emerald-300' : 'text-orange-300'
              }`}
            >
              {passed ? 'Pass' : 'Not yet'}
            </p>
            <p className="mt-2 text-[64px] font-bold leading-[0.9] tabular-nums tracking-[-0.045em] text-white sm:text-[76px]">
              {percent}
              <span className="text-[32px] tracking-[-0.02em] sm:text-[38px]">%</span>
            </p>

            {/* Score meter with the pass mark marked on it — control primitive,
                not decoration: it shows how far off the pass they are. */}
            <div className="relative mt-5 h-1 w-full bg-white/[0.14]">
              <div
                className={`h-1 ${passed ? 'bg-emerald-400' : 'bg-orange-400'}`}
                style={{ width: `${percent}%` }}
              />
              <span
                aria-hidden
                className="absolute -top-1 h-3 w-px bg-white"
                style={{ left: `${passThreshold}%` }}
              />
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-white">
              {correctCount} of {questions.length} correct · {formatDuration(timeTakenSec)} · pass
              mark {passThreshold}%
            </p>

            {/* Secondary, deliberately. Retaking is free and unlimited and
                people do it happily — it doesn't need to be the loudest
                thing on the page, and when it was, it ate the conversion. */}
            <button
              type="button"
              onClick={start}
              className="mt-6 h-11 w-full touch-manipulation rounded-xl border border-white/[0.08] bg-[hsl(0_0%_13%)] px-5 text-[14px] font-semibold text-white transition-colors hover:bg-[hsl(0_0%_16%)] sm:w-auto"
            >
              Try again with fresh questions
            </button>
          </div>

          {/* Breakdown by email — the low-friction ask, placed at the exact
              moment they care most. Deliberately does NOT gate the on-page
              result: everything below is visible whether they hand over an
              email or not, so the "free, no sign-up" promise in the page
              copy stays true. */}
          <section
            aria-labelledby="breakdown-email-heading"
            className={`${PANEL} px-4 py-6 sm:px-7`}
          >
            <h2
              id="breakdown-email-heading"
              className="text-[19px] font-bold leading-snug tracking-[-0.015em] text-white sm:text-[21px]"
            >
              {missedForEmail.length > 0
                ? `Want the ${missedForEmail.length} you got wrong, explained?`
                : 'Want this result saved to read later?'}
            </h2>
            <p className="mt-2 max-w-[52ch] text-[14.5px] leading-relaxed text-white">
              {missedForEmail.length > 0
                ? 'We’ll email your score, your weak topics, and every question you missed with the right answer and the reasoning behind it.'
                : 'We’ll email your score and the full topic breakdown so you can come back to it before the real thing.'}
            </p>
            <div className="mt-5">
              <EmailCaptureForm
                source="mock_exam_result"
                placeholder="you@email.com"
                buttonLabel="Email my breakdown"
                successMessage="Sent — check your inbox. Your result is still below."
                footnote="Your result stays on this page either way. No spam, unsubscribe any time."
                compact
                extraPayload={{
                  mock_result: {
                    examName,
                    examSlug,
                    score: correctCount,
                    total: questions.length,
                    percentage: percent,
                    passed,
                    passThreshold,
                    weakAreas: weakAreas.map((c) => ({
                      name: c.name,
                      correct: c.correct,
                      total: c.total,
                    })),
                    missed: missedForEmail,
                    missedTotal: missedForEmail.length,
                  },
                }}
              />
            </div>
          </section>

          {/* Weak areas — only if there are sub-60% topics with ≥2 Qs */}
          {weakAreas.length > 0 && (
            <section aria-labelledby="weak-heading">
              <h2 id="weak-heading" className={`${LABEL} mb-3 text-white`}>
                Topics to revise
              </h2>
              <ul className={`${PANEL} divide-y divide-white/[0.08]`}>
                {weakAreas.map((c, i) => (
                  <li key={c.name} className="flex items-baseline gap-3 px-4 py-3 sm:px-5">
                    <RowNumber n={i + 1} />
                    <span className="flex-1 text-[14.5px] text-white">{c.name}</span>
                    <span className="shrink-0 text-[14px] font-semibold tabular-nums text-orange-300">
                      {c.correct}/{c.total}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Per-topic breakdown — hairline rows with a thin fill per row */}
          {categoryBreakdown.length > 0 && (
            <section aria-labelledby="breakdown-heading">
              <h2 id="breakdown-heading" className={`${LABEL} mb-3 text-white`}>
                Score by topic
              </h2>
              <ul className={`${PANEL} divide-y divide-white/[0.08]`}>
                {categoryBreakdown.map((c) => (
                  <li key={c.name} className="px-4 py-3.5 sm:px-5">
                    <div className="mb-2 flex items-baseline justify-between gap-4">
                      <span className="text-[14.5px] text-white">{c.name}</span>
                      <span className="shrink-0 text-[13.5px] tabular-nums text-white">
                        {c.correct}/{c.total} · {c.percent}%
                      </span>
                    </div>
                    <div className="h-px w-full bg-white/[0.14]">
                      <div
                        className={`h-px ${
                          c.percent >= passThreshold
                            ? 'bg-emerald-400'
                            : c.percent >= 50
                              ? 'bg-elec-yellow'
                              : 'bg-orange-400'
                        }`}
                        style={{ width: `${c.percent}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Conversion — personalised to the result they just scored.
              Flat panel, numbered rows, ONE yellow (the button). */}
          {signupCta && (
            <section
              aria-labelledby="convert-heading"
              className={`${PANEL} px-4 py-6 sm:px-7 sm:py-7`}
            >
              <h2
                id="convert-heading"
                className="max-w-[24ch] text-[22px] font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-[26px]"
              >
                {passed
                  ? `${percent}% today — now make sure it holds on exam day.`
                  : `${percent}% today. The full app is built to get you to a pass.`}
              </h2>
              <p className="mt-3 max-w-[54ch] text-[14.5px] leading-relaxed text-white">
                This mock is one page of it. Inside there's a full Study Centre — proper course
                content, not just more questions.
              </p>
              <ol className="mt-6 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {[
                  weakAreas.length > 0
                    ? `Practice sets built from your weak topics — ${weakAreas
                        .slice(0, 2)
                        .map((c) => c.name)
                        .join(' and ')} — until they stop costing you marks`
                    : 'The full question bank, not just the rotation you see here',
                  'A complete Inspection & Testing course — initial verification, periodic inspection, certification and EICR coding, with practical walkthroughs and scenarios',
                  'Elec-AI: ask a regs question in plain English, get an answer in seconds with every regulation cited and tappable to its full text. Send it a photo or just talk to it',
                  '14 CPD courses — 18th Edition, EV, renewables, fire alarm, emergency lighting — plus site tickets like CSCS, IPAF and PASMA, most with their own 30-question mock',
                  'An explanation on every wrong answer, grounded in BS 7671, and progress tracked across attempts',
                  '19 certificate types and 70+ calculators for when you are back on the tools',
                ].map((line, i) => (
                  <li key={i} className="flex items-start gap-3 py-3">
                    <RowNumber n={i + 1} />
                    <span className="flex-1 text-[14.5px] leading-relaxed text-white">{line}</span>
                  </li>
                ))}
              </ol>
              {/* The de-risk, stated plainly and BEFORE the button — the ask
                  is the moment they weigh cost, and the honest answer is that
                  there isn't one for a week. No second yellow: the button is
                  the only one on this panel. */}
              <p className="mt-6 rounded-xl border border-white/[0.12] bg-white/[0.03] px-4 py-3.5 text-[14.5px] leading-relaxed text-white">
                <span className="font-semibold">£0 today, and £0 until day 8.</span> You get the
                whole Study Centre for seven days. Walk away before day 8 and it has cost you
                nothing — you have still had the week's learning.
              </p>
              <Link
                to={signupCta.href}
                className="mt-4 flex h-14 w-full touch-manipulation items-center justify-center rounded-xl bg-elec-yellow px-7 text-[15.5px] font-bold tracking-[-0.01em] text-black transition-colors hover:brightness-95 sm:inline-flex sm:w-auto"
              >
                {signupCta.label}
              </Link>
              {signupCta.subline && (
                <p className="mt-3 text-[13px] text-white">{signupCta.subline}</p>
              )}
            </section>
          )}

          {/* Review — collapsed rows so the page doesn't blow up below.
              Correct/wrong is carried by the word, not a coloured icon. */}
          <section aria-labelledby="review-heading">
            <h2 id="review-heading" className={`${LABEL} mb-3 text-white`}>
              Review your answers
            </h2>
            <ol className={`${PANEL} divide-y divide-white/[0.08]`}>
              {questions.map((q, idx) => {
                const userAnswer = answers[idx];
                const isCorrect = userAnswer === q.correctAnswer;
                const verdict = userAnswer === null ? 'Skipped' : isCorrect ? 'Correct' : 'Wrong';
                const verdictTone =
                  userAnswer === null
                    ? 'text-white'
                    : isCorrect
                      ? 'text-emerald-300'
                      : 'text-orange-300';
                return (
                  <li key={`${attempt}-${q.id}`}>
                    <details className="group">
                      <summary className="flex cursor-pointer list-none touch-manipulation items-start gap-3 px-4 py-3.5 sm:px-5">
                        <RowNumber n={idx + 1} />
                        <span className="flex-1 text-[14.5px] leading-snug text-white">
                          {q.question}
                        </span>
                        <span className="flex shrink-0 flex-col items-end gap-0.5 pt-[2px]">
                          <span
                            className={`text-[11px] font-semibold uppercase tracking-[0.1em] ${verdictTone}`}
                          >
                            {verdict}
                          </span>
                          {/* First-party difficulty: how many other people miss
                              this one. Only shown where the sample is real. */}
                          {failureRates[String(q.id)] !== undefined && (
                            <span className="whitespace-nowrap text-[11px] tabular-nums text-white">
                              {failureRates[String(q.id)]}% get this wrong
                            </span>
                          )}
                        </span>
                        <span
                          aria-hidden
                          className="mt-[7px] h-[7px] w-[7px] shrink-0 rotate-45 border-b border-r border-white transition-transform group-open:-rotate-[135deg]"
                        />
                      </summary>
                      <div className="px-4 pb-4 pl-[2.9rem] sm:px-5 sm:pb-5 sm:pl-[3.1rem]">
                        <ul className="space-y-1.5">
                          {q.options.map((opt, i) => {
                            const isUserPick = userAnswer === i;
                            const isCorrectOpt = i === q.correctAnswer;
                            return (
                              <li
                                key={i}
                                className={`rounded-lg px-3 py-2 text-[13.5px] leading-snug text-white ${
                                  isCorrectOpt
                                    ? 'border border-emerald-400/40 bg-emerald-400/[0.08]'
                                    : isUserPick
                                      ? 'border border-orange-400/40 bg-orange-400/[0.08]'
                                      : 'border border-white/[0.08]'
                                }`}
                              >
                                <span className="mr-2 font-semibold">
                                  {String.fromCharCode(65 + i)}
                                </span>
                                {opt}
                                {isCorrectOpt && (
                                  <span className="ml-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-300">
                                    Correct
                                  </span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                        {q.explanation && (
                          <p className="mt-3 text-[13.5px] leading-relaxed text-white">
                            <span className="font-semibold">Why: </span>
                            {q.explanation}
                          </p>
                        )}
                      </div>
                    </details>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>
      )}
    </>
  );
}

export default SEOMockExam;
