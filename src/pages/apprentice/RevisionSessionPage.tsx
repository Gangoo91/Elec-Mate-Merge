/**
 * Quick revision — /apprentice/revision
 *
 * The learner's personal pile of questions they got wrong (every course quiz
 * and mock exam adds to it automatically), replayed until they stick. Two
 * right in a row and a question leaves the pile for good.
 *
 * Redesigned 10 Oct 2026 (Andrew: "make this excellent and best in class…
 * really useful"):
 *
 *  - A start screen. It used to drop straight into a running 10-minute
 *    countdown. Now: how big the pile is, where the questions came from, and
 *    a choice of 5, 10, 20 or all — or just one source ("only the Level 3
 *    Mock Exam 1 ones").
 *  - One calm column while answering: where the question came from and how
 *    often you've missed it sit in one line above it; no side panel of
 *    spaced-caps tiles. The timer is gone — the session length is the limit.
 *  - A miss comes back once at the end of the round ("Back again"), so you
 *    finish having answered it right, not just having seen the answer.
 *  - The finish screen leads with what to do next and then lists what you
 *    missed with the right answer and the reason, to read before you go.
 *
 * Unchanged: the pile itself (src/lib/missedQuestions, on this device),
 * graduation rules, XP/OTJ logging through useLearningXP, keyboard play, and
 * caller-aware Back (`state.from`).
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useHaptic } from '@/hooks/useHaptic';
import { useLearningXP } from '@/hooks/useLearningXP';
import {
  getSession,
  recordResult,
  getCount,
  WINS_TO_GRADUATE,
  type MissedQuestion,
  type RevisionOutcome,
} from '@/lib/missedQuestions';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { cn } from '@/lib/utils';

/** Hard cap on minutes logged to XP/OTJ — a tab left open isn't study time. */
const MAX_LOGGED_MINUTES = 30;
/** Rough time per question, for "about 4 minutes". */
const SECONDS_PER_QUESTION = 25;

/** Where "Back" goes when the caller didn't say. */
const DEFAULT_BACK = { to: '/apprentice/today', label: 'Today' };

/** Readable name for a path, so a caller only has to pass the route. */
function labelForPath(path: string): string {
  if (path.startsWith('/study-centre/mock-exams')) return 'mock exams';
  if (path.startsWith('/study-centre/apprentice')) return 'course';
  if (path.startsWith('/study-centre')) return 'Study Centre';
  if (path.startsWith('/apprentice/today')) return 'Today';
  if (path.startsWith('/apprentice/hub')) return 'your portfolio';
  if (path.startsWith('/apprentice')) return 'Apprentice Hub';
  if (path.startsWith('/dashboard')) return 'Dashboard';
  return 'Back';
}

/** One answered question. */
interface AnswerRecord {
  key: string;
  outcome: RevisionOutcome;
  /** Whether the pick matched — kept apart from outcome, which is 'unknown'
   * for an entry graduated in another tab. */
  correct: boolean;
  /** A second go at a question missed earlier in this round. */
  retry: boolean;
}

/** A question in this round; `retry` marks the second go at a miss. */
interface RoundItem {
  q: MissedQuestion;
  retry: boolean;
}

const SIZES = [5, 10, 20] as const;
/** "today", "yesterday", "3 days ago", "2 weeks ago". */
function ago(ms: number): string {
  if (!ms) return 'a while ago';
  const days = Math.floor((Date.now() - ms) / 86400000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 14) return `${days} days ago`;
  if (days < 60) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
}

const minutesFor = (n: number) => Math.max(1, Math.round((n * SECONDS_PER_QUESTION) / 60));

export default function RevisionSessionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const haptic = useHaptic();
  const { logActivity } = useLearningXP();
  const uid = user?.id ?? null;

  // Caller-supplied origin. `label` is optional — a bare `from` is enough.
  const back = useMemo(() => {
    const state = location.state as { from?: string; label?: string } | null;
    if (!state?.from) return DEFAULT_BACK;
    return { to: state.from, label: state.label ?? labelForPath(state.from) };
  }, [location.state]);

  const [phase, setPhase] = useState<'start' | 'live' | 'done'>('start');
  /** The whole pile, worst first — read on the start and finish screens. */
  const [pile, setPile] = useState<MissedQuestion[] | null>(null);
  const [size, setSize] = useState<number>(10);
  const [round, setRound] = useState<RoundItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [results, setResults] = useState<AnswerRecord[]>([]);
  const startedAtRef = useRef(Date.now());
  const feedbackRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const loggedRef = useRef(false);

  const readPile = () => (uid ? getSession(uid, 1000) : []);
  useEffect(() => {
    if (!uid) return;
    setPile(getSession(uid, 1000));
  }, [uid]);

  // Sources, biggest first, with what helps you choose between them.
  const sources = useMemo(() => {
    const m = new Map<string, { n: number; stubborn: number; last: number }>();
    for (const q of pile ?? []) {
      const cur = m.get(q.source) ?? { n: 0, stubborn: 0, last: 0 };
      cur.n += 1;
      if (q.timesMissed >= 3) cur.stubborn += 1;
      cur.last = Math.max(cur.last, q.missedAt);
      m.set(q.source, cur);
    }
    return [...m.entries()].sort((a, b) => b[1].n - a[1].n);
  }, [pile]);
  const total = pile?.length ?? 0;
  const stubborn = (pile ?? []).filter((q) => q.timesMissed >= 3).length;

  /** `fresh`: put the questions just seen at the back, so "Go again" moves on. */
  const start = (count: number, source?: string, fresh = false) => {
    const seen = new Set(fresh ? round.map((r) => r.q.key) : []);
    const all = readPile().filter((q) => !source || q.source === source);
    const ordered = [...all.filter((q) => !seen.has(q.key)), ...all.filter((q) => seen.has(q.key))];
    setRound(ordered.slice(0, count).map((q) => ({ q, retry: false })));
    setIdx(0);
    setPicked(null);
    setResults([]);
    startedAtRef.current = Date.now();
    loggedRef.current = false;
    setPhase('live');
    haptic.medium();
  };

  // Answered: bring the verdict and explanation into view. New question: top.
  useEffect(() => {
    if (phase !== 'live') return;
    if (picked !== null) {
      requestAnimationFrame(() =>
        feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      );
    } else {
      scrollRef.current?.scrollTo({ top: 0 });
    }
  }, [picked, idx, phase]);

  // The drill owns the viewport while it runs, so hide the apprentice tab bar
  // — it would otherwise sit over the Next control, same as on the papers.
  useEffect(() => {
    if (phase !== 'live') return;
    document.body.classList.add('exam-active');
    return () => document.body.classList.remove('exam-active');
  }, [phase]);

  const item = phase === 'live' ? (round[idx] ?? null) : null;
  const q = item?.q ?? null;
  const firstTries = results.filter((r) => !r.retry);
  const rightFirstTime = firstTries.filter((r) => r.correct).length;
  const graduated = results.filter((r) => r.outcome === 'graduated').length;
  const lastResult = picked !== null ? results[results.length - 1] : null;
  const questionsInRound = round.filter((r) => !r.retry).length;

  const finish = () => {
    setPhase('done');
    setPile(readPile());
    if (loggedRef.current || results.length === 0) return;
    loggedRef.current = true;
    const minutes = Math.min(
      MAX_LOGGED_MINUTES,
      Math.max(1, Math.round((Date.now() - startedAtRef.current) / 60000))
    );
    logActivity({
      activityType: 'quiz_completed',
      sourceId: 'missed-pile',
      sourceTitle: 'Quick revision — missed questions',
      questionCount: firstTries.length,
      scorePercent: Math.round((rightFirstTime / Math.max(1, firstTries.length)) * 100),
      actualMinutes: minutes,
      metadata: { source: 'missed_pile', graduated, answered: results.length },
    });
  };

  const pick = (i: number) => {
    if (!q || !item || !uid || picked !== null) return;
    setPicked(i);
    const correctPick = i === q.correctAnswer;
    const outcome = recordResult(uid, q.key, correctPick);
    setResults((r) => [...r, { key: q.key, outcome, correct: correctPick, retry: item.retry }]);
    // A first-time miss comes back once at the end of the round.
    if (!correctPick && !item.retry) setRound((r) => [...r, { q, retry: true }]);
    if (correctPick) haptic.light();
    else haptic.medium();
  };

  const next = () => {
    if (idx + 1 >= round.length) finish();
    else {
      setIdx(idx + 1);
      setPicked(null);
    }
  };

  // Keyboard: 1–9 or a–z answer, Enter / Space / → for the next question.
  const kbRef = useRef({ q, picked, pick, next, phase });
  useEffect(() => {
    kbRef.current = { q, picked, pick, next, phase };
  });
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const { q: cur, picked: p, pick: doPick, next: doNext, phase: ph } = kbRef.current;
      if (ph !== 'live' || !cur || e.repeat) return;
      const t = e.target as HTMLElement | null;
      if (t?.closest('input, textarea, select')) return;
      if (p === null) {
        let i = -1;
        if (e.key >= '1' && e.key <= '9') i = Number(e.key) - 1;
        else if (/^[a-zA-Z]$/.test(e.key)) i = e.key.toLowerCase().charCodeAt(0) - 97;
        if (i >= 0 && i < cur.options.length) {
          e.preventDefault();
          doPick(i);
        }
      } else if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
        // Enter on a focused button is that button's.
        if (t?.closest('button') && e.key !== 'ArrowRight') return;
        e.preventDefault();
        doNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ── Answering ─────────────────────────────────────────────────────────
  if (phase === 'live' && q && item) {
    const answeredFirst = firstTries.length;
    const progressPct = Math.round((idx / Math.max(1, round.length)) * 100);
    return (
      <div
        className="fixed bottom-0 right-0 z-30 flex flex-col overflow-hidden bg-elec-dark"
        style={{ top: 'var(--header-height, 56px)', left: 'var(--sidebar-width, 0px)' }}
      >
        <header className="shrink-0 border-b border-white/[0.08] px-4 py-2 sm:px-6">
          <div className="mx-auto flex max-w-3xl items-center gap-3">
            <button
              type="button"
              onClick={() => finish()}
              className="-ml-1 flex h-11 shrink-0 items-center gap-1.5 px-1 text-[14px] font-semibold text-white touch-manipulation active:opacity-70"
            >
              <X className="h-4 w-4" aria-hidden />
              End
            </button>
            <span className="min-w-0 flex-1 truncate text-center text-[14px] font-semibold text-white">
              Quick revision
            </span>
            <span className="shrink-0 text-[13.5px] font-semibold tabular-nums text-white">
              {Math.min(answeredFirst + (picked === null || item.retry ? 1 : 0), questionsInRound)}{' '}
              of {questionsInRound}
            </span>
          </div>
          <div className="mx-auto mt-1.5 h-1 max-w-3xl overflow-hidden rounded-full bg-white/[0.1]">
            <div
              className="h-full rounded-full bg-elec-yellow transition-[width] duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </header>

        <div
          ref={scrollRef}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 py-6 sm:px-6"
        >
          <div className="m-auto w-full max-w-3xl">
            <p className="text-[13px] font-medium text-white">
              {item.retry ? (
                <span className="font-semibold text-orange-400">Back again · </span>
              ) : null}
              {q.source} · missed {q.timesMissed} {q.timesMissed === 1 ? 'time' : 'times'}
            </p>
            <h1 className="mt-2 text-[21px] font-bold leading-snug tracking-tight text-white sm:text-[26px] lg:text-[30px]">
              {q.question}
            </h1>

            <div className="mt-6 space-y-2.5">
              {q.options.map((opt, i) => {
                const isPicked = picked === i;
                const isCorrect = i === q.correctAnswer;
                const show = picked !== null;
                return (
                  <button
                    key={`${q.key}-${idx}-${i}`}
                    type="button"
                    disabled={show}
                    onClick={() => pick(i)}
                    aria-pressed={isPicked}
                    className={cn(
                      'flex min-h-[56px] w-full items-center gap-3.5 rounded-2xl border px-4 py-3 text-left transition-colors touch-manipulation select-none [-webkit-tap-highlight-color:transparent]',
                      show && isCorrect
                        ? 'border-emerald-400 bg-white/[0.05]'
                        : show && isPicked
                          ? 'border-red-400 bg-white/[0.03]'
                          : show
                            ? 'border-white/[0.08] opacity-60'
                            : 'border-white/[0.14] bg-white/[0.03] hover:border-white/[0.3] active:scale-[0.99] active:bg-white/[0.08]'
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[13px] font-bold',
                        show && isCorrect
                          ? 'bg-emerald-400 text-black'
                          : show && isPicked
                            ? 'bg-red-400 text-black'
                            : 'bg-white/[0.08] text-white'
                      )}
                      aria-hidden
                    >
                      {show && isCorrect ? (
                        <Check className="h-4 w-4" strokeWidth={3} />
                      ) : show && isPicked ? (
                        <X className="h-4 w-4" strokeWidth={3} />
                      ) : (
                        String.fromCharCode(65 + i)
                      )}
                    </span>
                    <span className="flex-1 text-[16px] leading-snug text-white lg:text-[17px]">
                      {opt}
                    </span>
                    {show && isCorrect && <span className="sr-only"> — correct answer</span>}
                    {show && isPicked && !isCorrect && (
                      <span className="sr-only"> — your answer, incorrect</span>
                    )}
                  </button>
                );
              })}
            </div>

            {picked !== null && lastResult && (
              <div ref={feedbackRef} className="mt-5 scroll-mb-28 space-y-3" aria-live="polite">
                <div className="rounded-2xl border border-white/[0.12] bg-white/[0.03] p-4 sm:p-5">
                  <p
                    className={cn(
                      'text-[15px] font-bold',
                      lastResult.outcome === 'graduated'
                        ? 'text-elec-yellow'
                        : lastResult.correct
                          ? 'text-emerald-400'
                          : 'text-orange-400'
                    )}
                  >
                    {lastResult.outcome === 'graduated'
                      ? 'Cleared. That one won’t come back.'
                      : lastResult.correct
                        ? `Right. Once more next time and it’s cleared.`
                        : item.retry
                          ? 'Not yet. It stays in your pile for next time.'
                          : 'Not this time. It’ll come back at the end of this round.'}
                  </p>
                  {/* Wrong: name the right answer here too — on a small phone the
                      options have scrolled out of view by now. */}
                  {!lastResult.correct && (
                    <p className="mt-2 text-[14.5px] leading-snug text-white">
                      The answer:{' '}
                      <span className="font-semibold text-emerald-400">
                        {q.options[q.correctAnswer]}
                      </span>
                    </p>
                  )}
                  {q.explanation && (
                    <p className="mt-2 text-[14.5px] leading-relaxed text-white">{q.explanation}</p>
                  )}
                </div>
              </div>
            )}

            <p className="mt-4 hidden text-center text-[12.5px] text-white sm:block">
              {picked === null
                ? `Keys: A–${String.fromCharCode(64 + q.options.length)} or 1–${q.options.length} to answer`
                : 'Press → for the next question'}
            </p>
          </div>
        </div>

        {/* Next: pinned to the bottom of the screen once you've answered, so
            it's under your thumb however long the explanation is. */}
        {picked !== null && (
          <div className="shrink-0 border-t border-white/[0.08] bg-elec-dark px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-6">
            <button
              type="button"
              onClick={() => {
                haptic.medium();
                next();
              }}
              className="mx-auto flex h-14 w-full max-w-3xl items-center justify-center gap-2 rounded-2xl bg-elec-yellow text-[16px] font-bold text-black touch-manipulation active:scale-[0.99]"
            >
              {idx + 1 >= round.length ? 'See how you did' : 'Next question'}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── Start, empty and finish screens ───────────────────────────────────
  const sectionTitle = 'text-[18px] font-bold tracking-tight text-white sm:text-[20px]';
  const panel = 'rounded-2xl border border-white/[0.1] bg-white/[0.03]';
  const missedThisRound = round
    .filter((r) => !r.retry)
    .map((r) => r.q)
    .filter((qq) => results.some((res) => res.key === qq.key && !res.retry && !res.correct));
  const remaining = uid && phase === 'done' ? getCount(uid) : total;

  return (
    <HubPage ground="landing">
      <HubMasthead section="Revision" title="Quick revision" onBack={() => navigate(back.to)} />
      <HubBody>
        {pile !== null && total === 0 && phase !== 'done' ? (
          // ── Empty pile ──
          <section className="relative -mx-4 overflow-hidden card-landing max-sm:!rounded-none max-sm:!border-x-0 px-5 py-6 sm:mx-0 sm:rounded-3xl sm:px-8 sm:py-8">
            <p className="text-[13px] font-semibold text-elec-yellow">
              Quick revision
            </p>
            <h1 className="mt-1.5 text-[28px] font-bold leading-tight tracking-tight text-white sm:text-[36px]">
              Nothing to win back
            </h1>
            <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-white">
              Every question you get wrong in a course quiz or a mock exam lands here, ready to
              revise. Two right in a row and it’s gone for good.
            </p>
            <button
              type="button"
              onClick={() => navigate('/study-centre/mock-exams')}
              className="mt-5 inline-flex h-12 items-center gap-2 rounded-xl bg-elec-yellow px-5 text-[15px] font-bold text-black touch-manipulation active:scale-[0.99]"
            >
              Sit a mock exam
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </section>
        ) : phase === 'done' ? (
          // ── Finish ──
          <>
            <section className="relative -mx-4 overflow-hidden card-landing max-sm:!rounded-none max-sm:!border-x-0 px-5 py-6 sm:mx-0 sm:rounded-3xl sm:px-8 sm:py-8">
              <p className="text-[13px] font-medium text-white">Round done</p>
              <h1 className="mt-1 text-[28px] font-bold leading-tight tracking-tight text-white sm:text-[36px]">
                {firstTries.length === 0
                  ? 'Nothing answered'
                  : rightFirstTime === firstTries.length
                    ? 'All right first time'
                    : `${rightFirstTime} of ${firstTries.length} right first time`}
              </h1>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-white">
                {graduated > 0
                  ? `${graduated} ${graduated === 1 ? 'question' : 'questions'} cleared for good. `
                  : ''}
                {remaining === 0 ? 'Your pile is empty.' : `${remaining} still in your pile.`}
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                {remaining > 0 && (
                  <button
                    type="button"
                    onClick={() => start(size, undefined, true)}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-elec-yellow px-5 text-[15px] font-bold text-black touch-manipulation active:scale-[0.99]"
                  >
                    Go again · {Math.min(size, remaining)} questions
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setPhase('start')}
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/[0.2] px-5 text-[14.5px] font-semibold text-white touch-manipulation hover:border-white/[0.4] active:bg-white/[0.06]"
                >
                  Choose what to revise
                </button>
                <button
                  type="button"
                  onClick={() => navigate(back.to)}
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/[0.2] px-5 text-[14.5px] font-semibold text-white touch-manipulation hover:border-white/[0.4] active:bg-white/[0.06]"
                >
                  Back to {back.label}
                </button>
              </div>
            </section>

            {missedThisRound.length > 0 && (
              <section className="space-y-3" aria-labelledby="rv-missed">
                <h2 id="rv-missed" className={sectionTitle}>
                  Worth reading before you go
                </h2>
                <ul className={cn(panel, 'divide-y divide-white/[0.06]')}>
                  {missedThisRound.map((mq) => (
                    <li key={mq.key} className="px-5 py-4">
                      <p className="text-[15px] font-semibold leading-snug text-white">
                        {mq.question}
                      </p>
                      <p className="mt-1.5 text-[14px] font-semibold text-emerald-400">
                        {mq.options[mq.correctAnswer]}
                      </p>
                      {mq.explanation && (
                        <p className="mt-1 text-[13.5px] leading-relaxed text-white">
                          {mq.explanation}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        ) : (
          // ── Start ──
          pile !== null && (
            <>
              <section className="relative -mx-4 overflow-hidden card-landing max-sm:!rounded-none max-sm:!border-x-0 px-5 py-6 sm:mx-0 sm:rounded-3xl sm:px-8 sm:py-8">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/70 to-elec-yellow/0"
                />
                <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-end lg:gap-x-10">
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-elec-yellow">
                      Quick revision
                    </p>
                    <h1 className="mt-1.5 text-[28px] font-bold leading-tight tracking-tight text-white sm:text-[38px]">
                      {total} {total === 1 ? 'question' : 'questions'} to win back
                    </h1>
                    <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-white">
                      The ones you got wrong in course quizzes and mock exams, hardest first. Get
                      one right {WINS_TO_GRADUATE === 2 ? 'twice' : `${WINS_TO_GRADUATE} times`} in
                      a row and it’s gone for good.
                    </p>
                    {stubborn > 0 && (
                      <p className="mt-3 text-[13.5px] font-medium text-white">
                        <span className="font-semibold text-orange-400">{stubborn}</span> you’ve
                        missed three times or more. They come first.
                      </p>
                    )}
                  </div>
                  <div className="min-w-0 space-y-3">
                    <div
                      role="group"
                      aria-label="How many questions"
                      className="flex flex-wrap gap-2"
                    >
                      {[...SIZES.filter((n) => n < total), total].map((n) => (
                        <button
                          key={n}
                          type="button"
                          aria-pressed={size === n || (n === total && size >= total)}
                          onClick={() => setSize(n)}
                          className={chipCn(size === n || (n === total && size >= total))}
                        >
                          {n === total ? `All ${n}` : n}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => start(Math.min(size, total))}
                      className="flex min-h-[56px] w-full items-center justify-between gap-3 rounded-xl bg-elec-yellow px-4 py-3 text-left text-black touch-manipulation active:scale-[0.99]"
                    >
                      <span>
                        <span className="block text-[16px] font-bold leading-tight">
                          Start {Math.min(size, total)}{' '}
                          {Math.min(size, total) === 1 ? 'question' : 'questions'}
                        </span>
                        <span className="mt-0.5 block text-[12.5px] font-medium">
                          About {minutesFor(Math.min(size, total))}{' '}
                          {minutesFor(Math.min(size, total)) === 1 ? 'minute' : 'minutes'}
                        </span>
                      </span>
                      <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
                    </button>
                  </div>
                </div>
              </section>

              {sources.length > 1 && (
                <section className="space-y-3" aria-labelledby="rv-sources">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 id="rv-sources" className={sectionTitle}>
                      Where they came from
                    </h2>
                    <span className="text-[13px] font-medium text-white">
                      {sources.length} {sources.length === 1 ? 'source' : 'sources'}
                    </span>
                  </div>
                  <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
                    {sources.map(([src, info]) => {
                      const share = Math.round((info.n / Math.max(1, total)) * 100);
                      return (
                        <li key={src}>
                          <button
                            type="button"
                            onClick={() => start(info.n, src)}
                            aria-label={`Revise the ${info.n} from ${src}`}
                            className="group flex h-full w-full flex-col rounded-2xl border border-white/[0.1] bg-white/[0.03] p-4 text-left transition-colors touch-manipulation hover:border-white/[0.24] hover:bg-white/[0.05] active:scale-[0.99] active:bg-white/[0.07] sm:p-5"
                          >
                            <span className="text-[12.5px] font-medium text-white">
                              Last missed {ago(info.last)}
                            </span>
                            <span className="mt-1 text-[17px] font-semibold leading-snug tracking-tight text-white">
                              {src}
                            </span>
                            <span className="mt-3 flex items-end justify-between gap-3">
                              <span className="flex items-baseline gap-2">
                                <span className="text-[30px] font-bold leading-none tabular-nums text-white">
                                  {info.n}
                                </span>
                                <span className="text-[13.5px] font-medium text-white">
                                  to win back
                                </span>
                              </span>
                              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/[0.3] px-3.5 py-1.5 text-[13px] font-semibold text-white transition-colors group-hover:border-white/[0.5]">
                                Revise
                                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                              </span>
                            </span>
                            <span className="mt-3 block h-[3px] overflow-hidden rounded-full bg-white/[0.1]">
                              <span
                                className="block h-full rounded-full bg-orange-400"
                                style={{ width: `${Math.max(share, 3)}%` }}
                              />
                            </span>
                            <span className="mt-1.5 text-[12.5px] font-medium text-white">
                              {share}% of your pile
                              {info.stubborn > 0 && ` · ${info.stubborn} missed 3+ times`}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )}

              <p className="text-[13px] leading-relaxed text-white">
                Your pile is kept on this device. Little and often clears it fastest.
              </p>
            </>
          )
        )}
      </HubBody>
    </HubPage>
  );
}
