/**
 * RevisionSessionPage — /apprentice/revision
 *
 * The night-before-the-test loop: replays the learner's personal missed pile
 * (wrong answers captured automatically from mock exams) one question at a
 * time. Two consecutive correct answers graduate a question out of the pile.
 * Soft 10-minute timer — informational only, never cuts a question off.
 *
 * Completed sessions log to learning_activity_log via useLearningXP so they
 * feed streaks/XP/OTJ exactly like any other study activity.
 */

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ClipboardList, Timer } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLearningXP } from '@/hooks/useLearningXP';
import {
  getSession,
  recordResult,
  getCount,
  type MissedQuestion,
  type RevisionOutcome,
} from '@/lib/missedQuestions';
import { cn } from '@/lib/utils';

const SESSION_MINUTES = 10;
/** Hard cap on minutes logged to XP/OTJ — a tab left open isn't study time. */
const MAX_LOGGED_MINUTES = SESSION_MINUTES * 2;

/** One answered question — outcome drives graduation, correct drives score. */
interface AnswerRecord {
  outcome: RevisionOutcome;
  /** Whether the pick matched the correct option — kept separately because
   * an entry graduated in another tab returns outcome 'unknown', which must
   * not mark a genuinely correct answer as wrong on the end screen. */
  correct: boolean;
}

export default function RevisionSessionPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { logActivity } = useLearningXP();
  const uid = user?.id ?? null;

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

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      {/* House masthead */}
      <div className="sticky top-0 z-50 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="mx-auto max-w-2xl px-4">
          <div className="flex items-center h-12 gap-4">
            <button
              type="button"
              onClick={() => navigate('/apprentice/today')}
              className="text-[12.5px] font-medium text-white hover:text-white transition-colors touch-manipulation whitespace-nowrap"
            >
              ← Back
            </button>
            <span className="flex-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Apprentice · Quick revision
            </span>
            {!finished && questions && questions.length > 0 && (
              <span
                className={cn(
                  'inline-flex items-center gap-1 text-[11px] font-mono tabular-nums',
                  secondsLeft < 60 ? 'text-red-300' : 'text-white/55'
                )}
              >
                <Timer className="h-3.5 w-3.5" />
                {mins}:{secs}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pt-6 pb-28 max-w-2xl mx-auto space-y-5">
        {/* Empty pile */}
        {questions !== null && questions.length === 0 && (
          <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_10%)] p-6 text-center space-y-3">
            <ClipboardList className="h-6 w-6 text-white/25 mx-auto" />
            <p className="text-[14px] font-medium text-white/85">Nothing in your missed pile</p>
            <p className="text-[12.5px] text-white/50 leading-snug">
              Wrong answers from mock exams land here automatically. Take a mock to feed it.
            </p>
            <button
              type="button"
              onClick={() => navigate('/mock-exams')}
              className="w-full h-11 rounded-xl border border-elec-yellow/25 bg-elec-yellow/10 hover:bg-elec-yellow/20 text-elec-yellow text-[13px] font-medium touch-manipulation transition-colors"
            >
              Open mock exams
            </button>
          </div>
        )}

        {/* Question */}
        {!finished && q && (
          <>
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
                Question {idx + 1} of {questions?.length}
              </span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-white/40 truncate max-w-[50%]">
                {q.source}
              </span>
            </div>

            <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full bg-elec-yellow/50 transition-all duration-300"
                style={{
                  width: `${(((idx + (picked !== null ? 1 : 0)) / (questions?.length || 1)) * 100).toFixed(1)}%`,
                }}
              />
            </div>

            <h2 className="text-[17px] font-semibold leading-snug tracking-tight">{q.question}</h2>

            <div className="space-y-2">
              {q.options.map((opt, i) => {
                const isPicked = picked === i;
                const isCorrect = i === q.correctAnswer;
                const show = picked !== null;
                return (
                  <button
                    key={`${q.key}-${i}`}
                    type="button"
                    disabled={picked !== null}
                    onClick={() => pick(i)}
                    aria-pressed={isPicked}
                    className={cn(
                      'w-full min-h-11 rounded-xl border px-4 py-3 text-left text-[13.5px] leading-snug touch-manipulation transition-colors',
                      show && isCorrect
                        ? 'border-elec-yellow/60 bg-elec-yellow/10 text-elec-yellow'
                        : show && isPicked
                          ? 'border-red-400/50 bg-red-500/10 text-red-200'
                          : 'border-white/[0.10] bg-white/[0.04] text-white/85',
                      picked === null && 'hover:border-white/25'
                    )}
                  >
                    {opt}
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
              <>
                {lastOutcome === 'graduated' && (
                  <div className="flex items-center gap-2 rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.07] px-3.5 py-2.5">
                    <CheckCircle2 className="h-4 w-4 text-elec-yellow shrink-0" />
                    <span className="text-[12.5px] font-medium text-elec-yellow">
                      Graduated — that one won't come back
                    </span>
                  </div>
                )}
                {lastOutcome === 'progressed' && (
                  <div className="flex items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.04] px-3.5 py-2.5">
                    <CheckCircle2 className="h-4 w-4 text-white/70 shrink-0" />
                    <span className="text-[12.5px] font-medium text-white/80">
                      Nice — get it right once more and it graduates
                    </span>
                  </div>
                )}
                {q.explanation && (
                  <p className="text-[12.5px] text-white/60 leading-relaxed rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-3.5">
                    {q.explanation}
                  </p>
                )}
                <button
                  type="button"
                  onClick={next}
                  className="w-full h-11 rounded-xl bg-elec-yellow text-black text-[14px] font-semibold touch-manipulation active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-2"
                >
                  {idx + 1 >= (questions?.length ?? 0) || secondsLeft === 0 ? 'Finish' : 'Next'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </>
            )}

            {/* Keyboard hint — desktop only, where it's actually usable. */}
            <p className="hidden sm:block text-[11px] text-white/30 text-center pt-1">
              {picked === null
                ? `Press 1–${q.options.length} to answer`
                : 'Press Enter for the next question'}
            </p>
          </>
        )}

        {/* End screen */}
        {finished && (
          <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_10%)] p-6 text-center space-y-3">
            <CheckCircle2 className="h-7 w-7 text-elec-yellow mx-auto" />
            <p className="text-[18px] font-semibold">
              {correct} of {results.length} right
            </p>
            <p className="text-[12.5px] text-white/55 leading-snug">
              {graduated > 0 && (
                <>
                  {graduated} graduated — they won't come back.
                  <br />
                </>
              )}
              {remaining > 0
                ? `${remaining} still in your pile.`
                : 'Pile cleared — take a mock to find new weak spots.'}
            </p>
            <div className="flex gap-2 pt-1">
              {remaining > 0 && (
                <button
                  type="button"
                  onClick={loadSession}
                  className="flex-1 h-11 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation"
                >
                  Go again
                </button>
              )}
              <button
                type="button"
                onClick={() => navigate('/apprentice/today')}
                className="flex-1 h-11 rounded-xl border border-white/[0.10] bg-white/[0.04] text-white/85 text-[13px] font-medium touch-manipulation"
              >
                Back to Today
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
