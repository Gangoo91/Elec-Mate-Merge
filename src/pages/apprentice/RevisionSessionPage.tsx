/**
 * RevisionSessionPage — /apprentice/revision
 *
 * The night-before-the-test loop: replays the learner's personal missed pile
 * (wrong answers captured automatically from every mock exam and course quiz)
 * one question at a time. Two consecutive correct answers graduate a question
 * out of the pile. Soft 10-minute timer — informational, never cuts a question
 * off mid-answer.
 *
 * Completed sessions log to learning_activity_log via useLearningXP so they
 * feed streaks/XP/OTJ exactly like any other study activity.
 *
 * Layout mirrors the exam screen: a fixed, full-height working surface that
 * owns the viewport between the app header and the bottom of the window, with
 * the question block centred in it. The page previously sat as normal flow
 * content, so a short question left two-thirds of the screen empty below it
 * while the answer options hugged the top edge.
 *
 * Built on the card recipe (src/components/ui/card-recipe.ts) rather than the
 * flat `bg-[hsl(0_0%_10%)]` + white-border surfaces this page used to carry —
 * those read as grey rectangles with no brand on them next to the redesigned
 * exam screens. Volt fills are solid only; the graduation banner used to use a
 * translucent `bg-white/[0.05]` wash, which goes muddy on this ground.
 *
 * Back navigation is caller-aware: entry points pass `state.from`, so leaving
 * returns you where you came from rather than always dumping you on Today.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, Timer, Trophy } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useHaptic } from '@/hooks/useHaptic';
import { useLearningXP } from '@/hooks/useLearningXP';
import {
  getSession,
  recordResult,
  getCount,
  type MissedQuestion,
  type RevisionOutcome,
} from '@/lib/missedQuestions';
import { CARD_PRIMARY, CARD_SURFACE } from '@/components/ui/card-recipe';
import { cn } from '@/lib/utils';

const SESSION_MINUTES = 10;
/** Hard cap on minutes logged to XP/OTJ — a tab left open isn't study time. */
const MAX_LOGGED_MINUTES = SESSION_MINUTES * 2;

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

/** One answered question — outcome drives graduation, correct drives score. */
interface AnswerRecord {
  outcome: RevisionOutcome;
  /** Whether the pick matched the correct option — kept separately because
   * an entry graduated in another tab returns outcome 'unknown', which must
   * not mark a genuinely correct answer as wrong on the end screen. */
  correct: boolean;
}

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">{children}</p>
);

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

  const [questions, setQuestions] = useState<MissedQuestion[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [results, setResults] = useState<AnswerRecord[]>([]);
  const [finished, setFinished] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(SESSION_MINUTES * 60);
  const startedAtRef = useRef(Date.now());
  const loggedRef = useRef(false);

  // Load a session once per visit (and per "Go again").
  const loadSession = () => {
    if (!uid) return;
    setQuestions(getSession(uid, 12));
    setIdx(0);
    setPicked(null);
    setResults([]);
    setFinished(false);
    setSecondsLeft(SESSION_MINUTES * 60);
    startedAtRef.current = Date.now();
    loggedRef.current = false;
  };
  useEffect(loadSession, [uid]);

  // Soft countdown — informational; the session ends after the CURRENT
  // question when time runs out, never mid-question.
  useEffect(() => {
    if (finished || !questions?.length) return;
    const t = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [finished, questions]);

  // The drill owns the viewport while it runs, so hide the apprentice tab bar
  // — it would otherwise sit over the Next control, same as on the papers.
  useEffect(() => {
    if (finished || !questions?.length) return;
    document.body.classList.add('exam-active');
    return () => document.body.classList.remove('exam-active');
  }, [finished, questions]);

  const q = questions?.[idx] ?? null;
  const graduated = results.filter((r) => r.outcome === 'graduated').length;
  const correct = results.filter((r) => r.correct).length;
  // Outcome of the question on screen, once answered — drives the inline
  // feedback that makes the "two in a row to graduate" rule visible.
  const lastOutcome = picked !== null ? (results[idx]?.outcome ?? null) : null;

  const finishSession = () => {
    setFinished(true);
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
      questionCount: results.length,
      scorePercent: Math.round((correct / results.length) * 100),
      actualMinutes: minutes,
      metadata: { source: 'missed_pile', graduated, answered: results.length },
    });
  };

  const pick = (i: number) => {
    if (!q || !uid || picked !== null) return;
    setPicked(i);
    const correctPick = i === q.correctAnswer;
    const outcome = recordResult(uid, q.key, correctPick);
    setResults((r) => [...r, { outcome, correct: correctPick }]);
    if (correctPick) haptic.light();
    else haptic.medium();
  };

  const next = () => {
    if (!questions) return;
    if (idx + 1 >= questions.length || secondsLeft === 0) {
      finishSession();
    } else {
      setIdx(idx + 1);
      setPicked(null);
    }
  };

  // Keyboard play for the night-before loop: 1–9 (or a–z) pick an answer,
  // Enter / Space / → advance. A ref keeps the listener stable (bound once)
  // while always reading the latest handlers + state.
  const kbRef = useRef({ q, picked, pick, next, finished });
  useEffect(() => {
    kbRef.current = { q, picked, pick, next, finished };
  });
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const { q: cur, picked: p, pick: doPick, next: doNext, finished: done } = kbRef.current;
      // Stand down on the end screen so Enter doesn't race the Go-again/Back
      // buttons (or re-fire finishSession).
      if (done || !cur) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (p === null) {
        let i = -1;
        if (e.key >= '1' && e.key <= '9') i = Number(e.key) - 1;
        else if (/^[a-zA-Z]$/.test(e.key)) i = e.key.toLowerCase().charCodeAt(0) - 97;
        if (i >= 0 && i < cur.options.length) {
          e.preventDefault();
          doPick(i);
        }
      } else if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault();
        doNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const mins = Math.floor(secondsLeft / 60);
  const secs = String(secondsLeft % 60).padStart(2, '0');
  // localStorage read, cheap — recomputes naturally on the end-screen render.
  const remaining = uid && finished ? getCount(uid) : 0;
  const total = questions?.length ?? 0;
  const answered = results.length;

  const backButton = (
    <button
      type="button"
      onClick={() => {
        haptic.light();
        navigate(back.to);
      }}
      className="-ml-1 flex h-11 shrink-0 items-center gap-1.5 px-1 text-[13px] font-semibold text-white touch-manipulation active:scale-[0.97]"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to {back.label}
    </button>
  );

  // ── Live session ────────────────────────────────────────────────────────
  // Fixed to the viewport below the app header, exactly like the exam screen,
  // so the question sits in the middle of the space instead of at the top of
  // an otherwise empty page.
  if (!finished && q) {
    const optionCount = q.options.length;
    return (
      <div
        className="fixed bottom-0 right-0 z-30 flex flex-col overflow-hidden bg-elec-dark"
        style={{ top: 'var(--header-height, 56px)', left: 'var(--sidebar-width, 0px)' }}
      >
        <header className="flex shrink-0 items-center gap-3 border-b border-white/[0.08] px-4 py-2.5 sm:px-6">
          {backButton}
          <span className="min-w-0 flex-1 truncate text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Quick revision
          </span>
          <span className="shrink-0 text-[12.5px] tabular-nums text-white">
            {correct}/{answered} right
          </span>
          <span
            className={cn(
              'inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-[12.5px] font-semibold tabular-nums',
              secondsLeft < 60 ? 'border-red-400 text-red-300' : 'border-elec-yellow/35 text-white'
            )}
          >
            <Timer className="h-3.5 w-3.5" />
            {mins}:{secs}
          </span>
        </header>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-5 sm:px-6">
          <div className="m-auto grid w-full max-w-6xl gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-5">
            <div className="min-w-0">
              {/* Segmented progress — one cell per question, so "how much is
                  left" is answerable at a glance rather than by reading a
                  fraction. Matches the course quiz. */}
              <div className="mb-4">
                <Eyebrow>
                  Question {idx + 1} of {total}
                </Eyebrow>
                <div className="mt-2 flex gap-1">
                  {Array.from({ length: total }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'h-1 flex-1 rounded-full transition-colors',
                        i === idx
                          ? 'bg-elec-yellow'
                          : i < idx
                            ? results[i]?.correct
                              ? 'bg-green-500'
                              : 'bg-red-400'
                            : 'bg-white/10'
                      )}
                    />
                  ))}
                </div>
              </div>

              <h2 className="text-[19px] font-bold leading-snug tracking-tight text-white sm:text-[24px] lg:text-[28px]">
                {q.question}
              </h2>

              <div className="mt-5 space-y-2.5">
                {q.options.map((opt, i) => {
                  const isPicked = picked === i;
                  const isCorrect = i === q.correctAnswer;
                  const show = picked !== null;
                  return (
                    <button
                      key={`${q.key}-${i}`}
                      type="button"
                      disabled={show}
                      onClick={() => pick(i)}
                      aria-pressed={isPicked}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left',
                        'touch-manipulation select-none [-webkit-tap-highlight-color:transparent]',
                        'transition-[background-image,border-color,transform] duration-150 ease-out',
                        show && isCorrect
                          ? 'border-green-400'
                          : show && isPicked
                            ? 'border-red-400'
                            : 'border-elec-yellow/35 active:scale-[0.99]',
                        CARD_SURFACE
                      )}
                    >
                      {/* Letter badge — also the key you press. The keyboard
                          hint said "press 1–4" against options that carried
                          no number at all. */}
                      <span
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[12px] font-bold lg:h-10 lg:w-10 lg:text-[14px]',
                          show && isCorrect
                            ? 'border-green-400 text-green-400'
                            : show && isPicked
                              ? 'border-red-400 text-red-400'
                              : 'border-elec-yellow/35 text-white'
                        )}
                      >
                        {show && isCorrect ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          String.fromCharCode(65 + i)
                        )}
                      </span>
                      <span className="flex-1 text-[15px] leading-snug text-white sm:text-[16px] lg:text-[17px]">
                        {opt}
                      </span>
                      {/* Outcome is otherwise colour-only — name it for screen readers */}
                      {show && isCorrect && <span className="sr-only"> — correct answer</span>}
                      {show && isPicked && !isCorrect && (
                        <span className="sr-only"> — your answer, incorrect</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {picked !== null && (
                <div className="mt-5 space-y-3">
                  {/* Volt EDGE, not a volt wash — a translucent yellow fill
                      goes muddy brown on this ground. */}
                  {lastOutcome === 'graduated' && (
                    <div
                      className={cn(
                        'flex items-center gap-2 rounded-xl border border-elec-yellow px-4 py-3',
                        CARD_SURFACE
                      )}
                    >
                      <Trophy className="h-4 w-4 shrink-0 text-elec-yellow" />
                      <span className="text-[13.5px] font-semibold text-elec-yellow">
                        Graduated — that one won't come back
                      </span>
                    </div>
                  )}
                  {lastOutcome === 'progressed' && (
                    <div
                      className={cn(
                        'flex items-center gap-2 rounded-xl border border-green-400 px-4 py-3',
                        CARD_SURFACE
                      )}
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-green-400" />
                      <span className="text-[13.5px] font-medium text-white">
                        Right — get it once more and it graduates
                      </span>
                    </div>
                  )}
                  {lastOutcome === 'missed' && (
                    <div
                      className={cn(
                        'flex items-center gap-2 rounded-xl border border-orange-400 px-4 py-3',
                        CARD_SURFACE
                      )}
                    >
                      <ArrowRight className="h-4 w-4 shrink-0 text-orange-300" />
                      <span className="text-[13.5px] font-medium text-white">
                        Not this time — it stays in the pile for another go
                      </span>
                    </div>
                  )}
                  {q.explanation && (
                    <div
                      className={cn('rounded-xl border border-elec-yellow/35 p-4', CARD_SURFACE)}
                    >
                      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                        Why
                      </p>
                      <p className="text-[14px] leading-relaxed text-white">{q.explanation}</p>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      haptic.medium();
                      next();
                    }}
                    className={cn(
                      'inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border text-[14px] font-bold text-black',
                      'touch-manipulation select-none [-webkit-tap-highlight-color:transparent]',
                      'transition-[background-image,transform] duration-150 ease-out active:scale-[0.97]',
                      CARD_PRIMARY
                    )}
                  >
                    {idx + 1 >= total || secondsLeft === 0 ? 'Finish session' : 'Next question'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Keyboard hint — desktop only, where it's actually usable. */}
              <p className="mt-4 hidden text-center text-[12px] text-white sm:block">
                {picked === null
                  ? `Press A–${String.fromCharCode(64 + optionCount)} or 1–${optionCount} to answer`
                  : 'Press Enter for the next question'}
              </p>
            </div>

            {/* Session panel. Holds what the header used to truncate — the
                question's origin — plus the running figures. On a phone it
                sits under the question rather than pushing it off screen. */}
            <aside className="space-y-3 lg:self-start">
              <div className={cn('rounded-2xl border border-elec-yellow/35 p-4', CARD_SURFACE)}>
                <Eyebrow>This question came from</Eyebrow>
                <p className="mt-1.5 text-[13.5px] font-semibold leading-snug text-white">
                  {q.source}
                </p>
                <p className="mt-3 border-t border-white/[0.1] pt-3 text-[12.5px] leading-relaxed text-white">
                  You've missed it{' '}
                  <span className="font-semibold text-elec-yellow">
                    {q.timesMissed} {q.timesMissed === 1 ? 'time' : 'times'}
                  </span>
                  . Two right in a row and it leaves the pile for good.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-2.5">
                {[
                  { label: 'Answered', value: `${answered}/${total}`, tone: 'text-white' },
                  { label: 'Correct', value: String(correct), tone: 'text-green-400' },
                  { label: 'Graduated', value: String(graduated), tone: 'text-elec-yellow' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={cn(
                      'rounded-xl border border-elec-yellow/35 px-3 py-3 text-center lg:flex lg:items-baseline lg:justify-between lg:text-left',
                      CARD_SURFACE
                    )}
                  >
                    <p
                      className={cn(
                        'text-[20px] font-bold leading-none tabular-nums lg:order-2',
                        stat.tone
                      )}
                    >
                      {stat.value}
                    </p>
                    <p className="mt-1.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-white lg:order-1 lg:mt-0">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }

  // ── Empty pile / end screen ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-elec-dark px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4">{backButton}</div>

        {/* Empty pile */}
        {questions !== null && total === 0 && !finished && (
          <div
            className={cn(
              'mx-auto max-w-lg space-y-3 rounded-2xl border border-elec-yellow/35 p-8 text-center',
              CARD_SURFACE
            )}
          >
            <ClipboardList className="mx-auto h-7 w-7 text-elec-yellow" />
            <p className="text-[17px] font-bold tracking-tight text-white">
              Nothing in your missed pile
            </p>
            <p className="text-[13.5px] leading-relaxed text-white">
              Every question you get wrong in a mock exam or a course quiz lands here automatically.
              Sit a paper and this fills itself.
            </p>
            <button
              type="button"
              onClick={() => {
                haptic.medium();
                navigate('/study-centre/mock-exams');
              }}
              className={cn(
                'mt-2 flex h-12 w-full items-center justify-center rounded-xl border text-[14px] font-bold text-black',
                'touch-manipulation active:scale-[0.97]',
                CARD_PRIMARY
              )}
            >
              Browse mock exams
            </button>
          </div>
        )}

        {/* End screen */}
        {finished && (
          <div className="grid gap-3 lg:grid-cols-2">
            <section
              className={cn(
                // Centred, because the grid stretches this card to match the
                // taller one beside it and top-aligned content leaves a gap.
                'flex flex-col items-center justify-center rounded-2xl border border-elec-yellow/35 p-6 text-center sm:p-7',
                CARD_SURFACE
              )}
            >
              <CheckCircle2 className="h-8 w-8 text-elec-yellow" />
              <p className="mt-4 text-[44px] font-bold leading-none tabular-nums tracking-tight text-white">
                {results.length > 0 ? Math.round((correct / results.length) * 100) : 0}%
              </p>
              <p className="mt-2 text-[13.5px] text-white">
                {correct} of {results.length} right
              </p>
              <p className="mt-3 max-w-[40ch] text-[12.5px] leading-relaxed text-white">
                {graduated > 0
                  ? `${graduated} ${graduated === 1 ? 'question has' : 'questions have'} left your pile for good.`
                  : 'Nothing graduated this round — get one right twice in a row and it drops out.'}
              </p>
            </section>

            <section
              className={cn(
                'flex flex-col rounded-2xl border border-elec-yellow/35 p-5 sm:p-6',
                CARD_SURFACE
              )}
            >
              <Eyebrow>Where your pile stands</Eyebrow>
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <div className="rounded-xl border border-elec-yellow/35 px-3 py-4 text-center">
                  <p className="text-[28px] font-bold leading-none tabular-nums text-elec-yellow">
                    {graduated}
                  </p>
                  <p className="mt-1.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-white">
                    Graduated
                  </p>
                </div>
                <div className="rounded-xl border border-elec-yellow/35 px-3 py-4 text-center">
                  <p className="text-[28px] font-bold leading-none tabular-nums text-white">
                    {remaining}
                  </p>
                  <p className="mt-1.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-white">
                    Still to clear
                  </p>
                </div>
              </div>

              <p className="mt-4 text-[13px] leading-relaxed text-white">
                {remaining === 0
                  ? 'Pile cleared. Sit a mock exam to find the next set of weak spots.'
                  : `${remaining} ${remaining === 1 ? 'question' : 'questions'} still to clear. Little and often beats one long session.`}
              </p>

              <div className="mt-4 space-y-2.5">
                {remaining > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      haptic.medium();
                      loadSession();
                    }}
                    className={cn(
                      'flex h-12 w-full items-center justify-center rounded-xl border text-[14px] font-bold text-black',
                      'touch-manipulation active:scale-[0.97]',
                      CARD_PRIMARY
                    )}
                  >
                    Go again
                  </button>
                )}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      haptic.light();
                      navigate('/study-centre/mock-exams');
                    }}
                    className={cn(
                      'flex h-11 items-center justify-center rounded-xl border border-elec-yellow/35 px-3 text-[13px] font-semibold text-white',
                      'touch-manipulation active:scale-[0.97]',
                      CARD_SURFACE
                    )}
                  >
                    Mock exams
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      haptic.light();
                      navigate(back.to);
                    }}
                    className={cn(
                      'flex h-11 items-center justify-center rounded-xl border border-elec-yellow/35 px-3 text-center text-[13px] font-semibold text-white',
                      'touch-manipulation active:scale-[0.97]',
                      CARD_SURFACE
                    )}
                  >
                    Back to {back.label}
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
