/**
 * SEOMockExam — public, SEO-friendly mock exam component.
 *
 * Three states sharing one tight surface:
 *   1. PRE-START  — what crawlers index + what visitors see first.
 *                   No nested H1/eyebrow chrome — the H1 lives on the
 *                   wrapper page (<PublicMockExamPage>). This component
 *                   contributes: stats line, Start button, sample
 *                   questions (as <details> so they're indexable but
 *                   don't dominate the viewport).
 *   2. ACTIVE     — minimal progress bar + question + options.
 *   3. RESULTS    — score card, weak areas, per-topic breakdown, retake,
 *                   then the "Come to Elec-Mate" conversion block.
 *
 * Mobile-flat per CLAUDE.md memory rule: no card chrome below sm:, edge-
 * to-edge via px-4 on the page wrapper.
 *
 * Phase 1 option shuffle is wired here — per-attempt salt so retakes
 * feel fresh; fixed salt for the SSR sample questions so crawl HTML is
 * consistent across crawls.
 */
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Play,
  Award,
  AlertTriangle,
  Target,
  ChevronRight,
  Flag,
} from 'lucide-react';
import { shuffleAllQuestionOptions, createShuffleSalt } from '@/utils/shuffleOptions';
import { supabase } from '@/integrations/supabase/client';
import { recordMiss } from '@/lib/missedQuestions';

export interface SEOMockExamQuestion {
  id: number | string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  topic?: string;
  section?: string;
  category?: string;
}

interface SEOMockExamProps {
  /** Plain exam name — only used inside aria-labels + the conversion block;
   * NOT rendered as a heading (H1 lives on the wrapper page). */
  examName: string;
  /** The full question bank — must contain at least `questionsPerExam` entries. */
  questionBank: SEOMockExamQuestion[];
  /** How many questions the user gets per attempt. Default 25. */
  questionsPerExam?: number;
  /** Time limit per attempt (minutes). Default 30. */
  timeLimitMinutes?: number;
  /** Pass threshold (%). Default 70. */
  passThreshold?: number;
  /** Sign-up CTA shown in the conversion block AFTER results. */
  signupCta?: { label: string; href: string; subline?: string };
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function SEOMockExam({
  examName,
  questionBank,
  questionsPerExam = 25,
  timeLimitMinutes = 30,
  passThreshold = 70,
  signupCta,
}: SEOMockExamProps) {
  const location = useLocation();
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

  // 3 sample questions rendered server-side for SEO. Picked deterministically
  // and shuffled with a fixed salt so crawl HTML is identical between crawls.
  const sampleQuestions = useMemo(
    () => shuffleAllQuestionOptions(questionBank.slice(0, Math.min(3, questionBank.length)), 0),
    [questionBank]
  );

  const start = useCallback(() => {
    const picked = shuffleAllQuestionOptions(
      shuffle(questionBank).slice(0, questionsPerExam),
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
    // Scroll the exam into view so the user lands at the first question
    // rather than scrolling back to the now-hidden hero.
    requestAnimationFrame(() => {
      document.getElementById('mock-exam')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [questionBank, questionsPerExam, timeLimitMinutes]);

  const submit = useCallback(() => {
    if (submitGuardRef.current) return;
    submitGuardRef.current = true;
    setSubmitted(true);
    setStarted(false);
    const finished = Date.now();
    setFinishedAt(finished);

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
    const examSlug = parts[1];
    const topicSlug = parts[2] ?? null;
    if (!examSlug) return;
    const payload = {
      exam_slug: examSlug,
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
  }, [startedAt, questions, answers, passThreshold, location.pathname, examName]);

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

  const timeTakenSec = startedAt && finishedAt ? Math.round((finishedAt - startedAt) / 1000) : 0;
  const formatDuration = (s: number) => {
    const mm = Math.floor(s / 60);
    const ss = s % 60;
    return `${mm}m ${String(ss).padStart(2, '0')}s`;
  };

  const answeredCount = answers.filter((a) => a !== null).length;
  const progressPct = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  return (
    <>
      {/* PRE-START — stats line + CTA + sample questions */}
      {!started && !submitted && (
        <div className="space-y-8">
          {/* Stats line — one row, no card chrome */}
          <dl
            aria-label="Exam at a glance"
            className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75"
          >
            <div className="inline-flex items-baseline gap-1.5">
              <dt className="sr-only">Questions</dt>
              <dd className="font-semibold text-white tabular-nums">{questionsPerExam}</dd>
              <span>questions</span>
            </div>
            <span aria-hidden className="text-white/25">
              ·
            </span>
            <div className="inline-flex items-baseline gap-1.5">
              <dt className="sr-only">Time limit</dt>
              <dd className="font-semibold text-white tabular-nums">{timeLimitMinutes}</dd>
              <span>min</span>
            </div>
            <span aria-hidden className="text-white/25">
              ·
            </span>
            <div className="inline-flex items-baseline gap-1.5">
              <dt className="sr-only">Pass mark</dt>
              <dd className="font-semibold text-white tabular-nums">{passThreshold}%</dd>
              <span>
                to pass{' '}
                <span className="text-white/55">
                  ({passMarkAbs}/{questionsPerExam})
                </span>
              </span>
            </div>
            <span aria-hidden className="text-white/25">
              ·
            </span>
            <div className="inline-flex items-baseline gap-1.5">
              <dt className="sr-only">Bank size</dt>
              <dd className="font-semibold text-white tabular-nums">{questionBank.length}</dd>
              <span>question bank</span>
            </div>
          </dl>

          {/* The CTA. The whole page's job. */}
          <div>
            <button
              type="button"
              onClick={start}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 h-14 px-7 rounded-2xl bg-yellow-500 hover:bg-yellow-400 active:scale-[0.99] text-black font-bold text-base sm:text-[17px] touch-manipulation transition-all shadow-lg shadow-yellow-500/20"
              aria-label={`Start ${examName}`}
            >
              <Play className="w-5 h-5" />
              Start the mock exam
              <ChevronRight className="w-5 h-5 -mr-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </button>
            <p className="mt-3 text-[13px] text-white/55">
              Free · no sign-up · timer can be ignored · retake as many times as you want
            </p>
          </div>

          {/* Sample questions — collapsed by default. <details> is native,
              indexed by Google when expanded HTML is in the source. Two-
              column grid on lg:+ so the section doesn't run as a thin
              ribbon on desktop monitors. */}
          <section aria-labelledby="sample-q-heading" className="pt-2">
            <h2
              id="sample-q-heading"
              className="text-[13px] font-semibold uppercase tracking-[0.18em] text-yellow-400 mb-4"
            >
              Sample questions
            </h2>
            <ol className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
              {sampleQuestions.map((q, idx) => (
                <li key={q.id}>
                  <details className="group h-full rounded-xl bg-white/[0.03] border border-white/[0.08] open:bg-white/[0.05]">
                    <summary className="cursor-pointer list-none px-4 py-3 sm:px-5 sm:py-4 flex items-start gap-3 touch-manipulation">
                      <span className="text-[11px] font-semibold text-yellow-400/85 tabular-nums shrink-0 mt-0.5">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-white text-[14.5px] leading-snug flex-1">
                        {q.question}
                      </span>
                      <ChevronRight className="w-4 h-4 text-white/40 shrink-0 mt-0.5 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pl-[3.25rem] sm:pl-[3.5rem]">
                      <ul className="space-y-1.5 mt-1">
                        {q.options.map((opt, i) => (
                          <li
                            key={i}
                            className={`text-[13.5px] leading-snug px-3 py-2 rounded-lg ${
                              i === q.correctAnswer
                                ? 'bg-emerald-500/10 text-emerald-200 border border-emerald-500/30'
                                : 'bg-white/[0.02] text-white/70 border border-white/[0.05]'
                            }`}
                          >
                            <span className="font-medium mr-2 text-white/55">
                              {String.fromCharCode(65 + i)}.
                            </span>
                            {opt}
                            {i === q.correctAnswer && (
                              <CheckCircle2 className="w-3.5 h-3.5 inline ml-1.5 -mt-0.5 text-emerald-300" />
                            )}
                          </li>
                        ))}
                      </ul>
                      {q.explanation && (
                        <p className="mt-3 text-[13px] text-white/65 leading-relaxed">
                          <span className="font-semibold text-white/80">Why:</span> {q.explanation}
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

      {/* ACTIVE EXAM — mobile-flat, desktop two-column with sidebar.
          Desktop sidebar (lg:+) shows timer + question grid so the user
          can hop between questions without scrolling, matching the
          in-app StandardMockExam pattern. */}
      {started && questions.length > 0 && (
        <div id="mock-exam" className="lg:grid lg:grid-cols-[1fr_18rem] lg:gap-8">
          {/* Mobile sticky header — hidden on lg:+ where the sidebar takes over */}
          <div className="lg:hidden sticky top-[4.5rem] z-10 -mx-4 sm:mx-0 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10 sm:border sm:rounded-xl sm:border-white/15 mb-4">
            <div className="px-4 sm:px-4 py-2.5 flex items-center justify-between gap-3 text-[13px]">
              <div className="flex items-center gap-2 text-white/80">
                <Clock className="w-3.5 h-3.5 text-yellow-400" />
                <span className="tabular-nums font-semibold">
                  {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
                </span>
              </div>
              <div className="text-white/65 tabular-nums">
                {current + 1} <span className="text-white/35">/ {questions.length}</span>
              </div>
              <button
                type="button"
                onClick={submit}
                className="text-[12.5px] font-medium text-yellow-400 hover:text-yellow-300 touch-manipulation"
              >
                Submit early
              </button>
            </div>
            <div className="h-0.5 bg-white/10 sm:rounded-b-xl overflow-hidden">
              <div
                className="h-full bg-yellow-400 transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Question column */}
          <div className="lg:rounded-2xl lg:bg-white/[0.02] lg:border lg:border-white/[0.06] lg:p-8">
            <div className="hidden lg:flex items-center justify-between mb-6 pb-5 border-b border-white/[0.06]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-yellow-400">
                  Question {current + 1} of {questions.length}
                </p>
                <h2 className="sr-only">Question {current + 1}</h2>
              </div>
              <div className="text-[12.5px] text-white/65 tabular-nums">
                {answeredCount} answered
              </div>
            </div>
            <p className="text-white text-[16px] sm:text-[17px] lg:text-[19px] font-semibold leading-relaxed">
              {questions[current].question}
            </p>
            <ul className="mt-5 lg:mt-7 space-y-2.5 lg:space-y-3">
              {questions[current].options.map((opt, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => {
                      const a = [...answers];
                      a[current] = i;
                      setAnswers(a);
                    }}
                    className={`group w-full text-left rounded-xl px-4 py-3.5 lg:px-5 lg:py-4 min-h-[56px] lg:min-h-[64px] flex items-start gap-3 lg:gap-4 transition-colors touch-manipulation active:scale-[0.99] ${
                      answers[current] === i
                        ? 'bg-yellow-500/15 ring-1 ring-yellow-500/50 text-white'
                        : 'bg-white/[0.03] border border-white/[0.08] text-white/85 hover:bg-white/[0.06] hover:border-white/[0.15]'
                    }`}
                  >
                    <span
                      className={`shrink-0 inline-flex items-center justify-center h-7 w-7 lg:h-8 lg:w-8 rounded-lg text-[12px] lg:text-[13px] font-bold transition-colors ${
                        answers[current] === i
                          ? 'bg-yellow-500 text-black'
                          : 'bg-white/[0.06] text-white/70 group-hover:text-white'
                      }`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-[14.5px] sm:text-[15px] lg:text-[16px] leading-snug pt-0.5">
                      {opt}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between gap-3 mt-6 lg:mt-8 lg:pt-6 lg:border-t lg:border-white/[0.06]">
              <button
                type="button"
                onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                disabled={current === 0}
                className="h-11 lg:h-12 px-4 lg:px-5 rounded-xl border border-white/15 text-white/80 hover:bg-white/[0.05] disabled:opacity-30 disabled:pointer-events-none touch-manipulation text-[14px] lg:text-[15px]"
              >
                ← Previous
              </button>
              {current < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}
                  className="h-11 lg:h-12 px-5 lg:px-6 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation text-[14px] lg:text-[15px]"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  className="h-11 lg:h-12 px-5 lg:px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold touch-manipulation text-[14px] lg:text-[15px]"
                >
                  Submit answers
                </button>
              )}
            </div>
          </div>

          {/* Desktop sidebar — timer, progress, question grid, submit */}
          <aside className="hidden lg:block sticky top-[5rem] self-start space-y-4">
            <div className="rounded-2xl bg-gradient-to-br from-yellow-500/[0.08] to-transparent border border-yellow-500/30 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-yellow-400">
                  Time remaining
                </span>
              </div>
              <div
                className={`font-mono text-3xl font-bold tabular-nums leading-none ${
                  secondsLeft < 300 ? 'text-red-400 animate-pulse' : 'text-white'
                }`}
              >
                {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
              </div>
              <div className="mt-3 h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="mt-2 text-[12px] text-white/65 tabular-nums">
                {answeredCount} / {questions.length} answered
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65 mb-3">
                Questions
              </p>
              <div className="grid grid-cols-5 gap-1.5">
                {questions.map((_, i) => {
                  const answered = answers[i] !== null;
                  const isCurrent = i === current;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrent(i)}
                      className={`h-9 rounded-lg text-[12px] font-semibold tabular-nums transition-colors touch-manipulation ${
                        isCurrent
                          ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/30 scale-105'
                          : answered
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25'
                            : 'bg-white/[0.04] text-white/55 border border-white/[0.06] hover:bg-white/[0.08]'
                      }`}
                      aria-label={`Go to question ${i + 1}${answered ? ' (answered)' : ''}`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={submit}
                className="mt-4 w-full h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25 text-[13px] font-semibold touch-manipulation"
              >
                Submit early
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* RESULTS — score + breakdown + conversion */}
      {submitted && (
        <div className="space-y-8">
          {/* Score card */}
          <div
            className={`rounded-2xl border p-5 sm:p-7 ${
              passed
                ? 'bg-emerald-500/[0.08] border-emerald-500/30'
                : 'bg-orange-500/[0.08] border-orange-500/30'
            }`}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              {passed ? (
                <Award className="w-7 h-7 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <RotateCcw className="w-7 h-7 text-orange-400 shrink-0 mt-0.5" />
              )}
              <div className="min-w-0">
                <p
                  className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                    passed ? 'text-emerald-300' : 'text-orange-300'
                  }`}
                >
                  {passed ? 'Pass' : 'Not yet'}
                </p>
                <p className="text-3xl sm:text-4xl font-bold text-white tabular-nums leading-none mt-1">
                  {percent}%
                </p>
                <p className="mt-2 text-[14px] text-white/80 leading-relaxed">
                  {correctCount} of {questions.length} correct · {formatDuration(timeTakenSec)} ·
                  pass mark {passThreshold}%
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={start}
              className="mt-5 inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation text-[14px]"
            >
              <RotateCcw className="w-4 h-4" />
              Try again with fresh questions
            </button>
          </div>

          {/* Weak areas — only if there are sub-60% topics with ≥2 Qs */}
          {weakAreas.length > 0 && (
            <section
              aria-labelledby="weak-heading"
              className="rounded-2xl bg-orange-500/[0.05] border border-orange-500/20 p-5 sm:p-6"
            >
              <h2
                id="weak-heading"
                className="text-white font-semibold flex items-center gap-2 text-[15px]"
              >
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                Topics to revise
              </h2>
              <ul className="mt-3 space-y-2">
                {weakAreas.map((c) => (
                  <li key={c.name} className="flex items-center justify-between gap-3 text-[14px]">
                    <span className="text-white/85">{c.name}</span>
                    <span className="text-orange-300 tabular-nums font-medium shrink-0">
                      {c.correct}/{c.total} · {c.percent}%
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Per-topic breakdown */}
          {categoryBreakdown.length > 0 && (
            <section
              aria-labelledby="breakdown-heading"
              className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 sm:p-6"
            >
              <h2
                id="breakdown-heading"
                className="text-white font-semibold flex items-center gap-2 text-[15px]"
              >
                <Target className="w-4 h-4 text-yellow-400" />
                Score by topic
              </h2>
              <ul className="mt-4 space-y-3">
                {categoryBreakdown.map((c) => {
                  const tone =
                    c.percent >= passThreshold
                      ? 'bg-emerald-500'
                      : c.percent >= 50
                        ? 'bg-yellow-500'
                        : 'bg-orange-500';
                  return (
                    <li key={c.name}>
                      <div className="flex items-center justify-between text-[13.5px] mb-1.5">
                        <span className="text-white/85">{c.name}</span>
                        <span className="text-white/55 tabular-nums">
                          {c.correct}/{c.total} · {c.percent}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <div className={`h-full ${tone}`} style={{ width: `${c.percent}%` }} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Review — collapsed details so the page doesn't blow up below */}
          <section aria-labelledby="review-heading">
            <h2
              id="review-heading"
              className="text-[13px] font-semibold uppercase tracking-[0.18em] text-yellow-400 mb-3"
            >
              Review your answers
            </h2>
            <ol className="space-y-2">
              {questions.map((q, idx) => {
                const userAnswer = answers[idx];
                const isCorrect = userAnswer === q.correctAnswer;
                return (
                  <li key={`${attempt}-${q.id}`}>
                    <details
                      className={`group rounded-xl border ${
                        userAnswer === null
                          ? 'bg-white/[0.03] border-white/[0.08]'
                          : isCorrect
                            ? 'bg-emerald-500/[0.05] border-emerald-500/20'
                            : 'bg-red-500/[0.05] border-red-500/20'
                      }`}
                    >
                      <summary className="cursor-pointer list-none px-4 py-3 sm:px-5 sm:py-3.5 flex items-start gap-3 touch-manipulation">
                        <span className="text-[11px] font-semibold text-white/45 tabular-nums shrink-0 mt-0.5">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        {userAnswer === null ? (
                          <span className="text-[11px] font-semibold text-white/55 shrink-0 mt-0.5">
                            Skipped
                          </span>
                        ) : isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        )}
                        <span className="text-white text-[14px] leading-snug flex-1">
                          {q.question}
                        </span>
                        <ChevronRight className="w-4 h-4 text-white/40 shrink-0 mt-0.5 group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pl-[3.25rem] sm:pl-[3.5rem]">
                        <ul className="space-y-1.5 mt-1">
                          {q.options.map((opt, i) => {
                            const isUserPick = userAnswer === i;
                            const isCorrectOpt = i === q.correctAnswer;
                            return (
                              <li
                                key={i}
                                className={`text-[13px] leading-snug px-3 py-2 rounded-lg ${
                                  isCorrectOpt
                                    ? 'bg-emerald-500/10 text-emerald-200 border border-emerald-500/30'
                                    : isUserPick
                                      ? 'bg-red-500/10 text-red-200 border border-red-500/30'
                                      : 'bg-white/[0.02] text-white/60 border border-white/[0.05]'
                                }`}
                              >
                                <span className="font-medium mr-2 text-white/55">
                                  {String.fromCharCode(65 + i)}.
                                </span>
                                {opt}
                              </li>
                            );
                          })}
                        </ul>
                        {q.explanation && (
                          <p className="mt-3 text-[13px] text-white/65 leading-relaxed">
                            <span className="font-semibold text-white/80">Why:</span>{' '}
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

          {/* Conversion — "Like what you see? Come to Elec-Mate." */}
          {signupCta && (
            <section
              aria-labelledby="convert-heading"
              className="rounded-2xl bg-gradient-to-br from-yellow-500/[0.08] via-yellow-500/[0.04] to-transparent border border-yellow-500/25 p-5 sm:p-7"
            >
              <h2
                id="convert-heading"
                className="text-white text-[18px] sm:text-[20px] font-bold leading-tight"
              >
                Like what you see? The full app goes further.
              </h2>
              <ul className="mt-4 space-y-2.5 text-[14px] text-white/85">
                <li className="flex items-start gap-2.5">
                  <span className="text-yellow-400 mt-0.5 shrink-0">→</span>
                  <span>Full question bank, not just the rotation you see here</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-yellow-400 mt-0.5 shrink-0">→</span>
                  <span>AI explanation on every wrong answer, grounded in BS 7671</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-yellow-400 mt-0.5 shrink-0">→</span>
                  <span>Progress tracking across attempts + weak-topic deep dives</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-yellow-400 mt-0.5 shrink-0">→</span>
                  <span>AM2 practical simulator + every cert you need on site</span>
                </li>
              </ul>
              <Link
                to={signupCta.href}
                className="mt-6 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-[15px] touch-manipulation"
              >
                {signupCta.label}
                <ChevronRight className="w-4 h-4" />
              </Link>
              {signupCta.subline && (
                <p className="mt-3 text-[12.5px] text-white/55">{signupCta.subline}</p>
              )}
            </section>
          )}
        </div>
      )}
    </>
  );
}

export default SEOMockExam;
