/**
 * SafeIsolationAssessment — AM2 Section C practice.
 *
 * Rebuilt 5 Oct 2026; modes and the job pool added 6 Oct (AM2 plan, Phase 3).
 *
 * Six jobs in the pool, one of each NET task kind per run: a piece of
 * single-phase equipment (one of four), a three-phase isolation (motor
 * starter) and a distribution board (sub-board).
 * At each point the learner picks what to do next from correct actions and
 * plausible traps. Any order the procedure allows is accepted. Proving dead is
 * hands-on: tap each conductor pair. Two jobs carry a twist — an out-of-date
 * schedule (the socket is live) and an indicator that fails its re-prove.
 *
 * Modes:
 *   Learn       — feedback on every choice and a "What comes next?" hint.
 *   Practise    — feedback on every choice, no hints.
 *   Assessment  — no feedback until the end; any unsafe step is a critical
 *                 fail and the run scores 0, as a dangerous isolation is on
 *                 the day. Only Assessment runs count towards "ready".
 *
 * Every mistake is saved with a tag, so "Your weak spots" can drill it.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Lightbulb, RotateCcw, X, AlertTriangle } from 'lucide-react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { cn } from '@/lib/utils';
import { hapticsEnabled } from '@/lib/haptics';
import { CARD_BASE, CARD_SURFACE } from '@/components/ui/card-recipe';
import { useAM2Readiness } from '@/hooks/am2/useAM2Readiness';
import { useAuth } from '@/contexts/AuthContext';
import { saveAM2Session } from '@/hooks/am2/saveAM2Session';
import {
  ISOLATION_TAG_LABEL,
  SAFE_ISOLATION_SCENARIOS,
  type IsolationActionId,
  type IsolationScenario,
  type IsolationTag,
  INFORM_FIRST,
} from '@/data/am2/safeIsolationScenarios';
import { MODES, type SimMode } from '@/data/am2/sectionBRules';
import {
  AM2_EYEBROW,
  AM2_LIST,
  AM2_PAGE,
  AM2_PRIMARY,
  AM2_SPLIT,
  AM2_TITLE,
} from '@/components/am2/layout';

interface SafeIsolationAssessmentProps {
  /** Fires once the run is scored; `score` is that run's result (0–100). */
  onSessionComplete?: (score?: number) => void;
  /** The Mock AM2 day runs this as an Assessment, no mode choice. */
  forceMode?: SimMode;
  /** Open straight into this mode once (e.g. "Start Section C in Learn mode"). */
  startIn?: SimMode;
}

export interface Mistake {
  scenario: string;
  what: string;
  why: string;
  tag: IsolationTag;
  /** Unsafe — on the day this is a critical fail. */
  critical: boolean;
}

type Choice =
  | { kind: 'action'; id: IsolationActionId; label: string }
  | { kind: 'trap'; id: string; label: string; why: string; tag: IsolationTag };

type Stage = { kind: 'intro' } | { kind: 'scenario'; index: number } | { kind: 'results' };

const JOBS_PER_RUN = 3;

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

async function haptic(style: ImpactStyle) {
  if (!hapticsEnabled()) return;
  try {
    await Haptics.impact({ style });
  } catch {
    /* web */
  }
}

export function SafeIsolationAssessment({
  onSessionComplete,
  forceMode,
  startIn,
}: SafeIsolationAssessmentProps) {
  const { saveScore } = useAM2Readiness();
  const { user } = useAuth();
  const [stage, setStage] = useState<Stage>({ kind: 'intro' });
  const [mode, setMode] = useState<SimMode>(forceMode ?? 'practise');
  const [jobs, setJobs] = useState<IsolationScenario[]>([]);
  const [startedAt, setStartedAt] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  const [finalScore, setFinalScore] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const start = useCallback((m: SimMode) => {
    setMode(m);
    // One job of each kind, as NET sets them: single-phase equipment, then
    // three-phase, then a circuit at a board — a different job of each kind
    // from run to run.
    const kinds = [
      'Single-phase equipment',
      'Three-phase equipment',
      'Isolate a distribution board',
    ];
    const oneEach = kinds.map(
      (k) => shuffle(SAFE_ISOLATION_SCENARIOS.filter((x) => x.kind === k))[0]
    );
    setJobs(oneEach.slice(0, JOBS_PER_RUN));
    setStartedAt(Date.now());
    setCorrectCount(0);
    setMistakes([]);
    setStage({ kind: 'scenario', index: 0 });
    void haptic(ImpactStyle.Medium);
  }, []);

  // Mock day: straight in as an Assessment.
  useEffect(() => {
    if (forceMode && stage.kind === 'intro') start(forceMode);
  }, [forceMode, stage.kind, start]);
  const startedIn = useRef(false);
  useEffect(() => {
    if (startIn && !forceMode && !startedIn.current && stage.kind === 'intro') {
      startedIn.current = true;
      start(startIn);
    }
  }, [startIn, forceMode, stage.kind, start]);

  const finish = useCallback(
    (correct: number, all: Mistake[]) => {
      const critical = all.filter((m) => m.critical).length;
      const raw = all.length ? Math.round((correct / (correct + all.length)) * 100) : 100;
      // On the day a dangerous isolation fails the section outright.
      const score = mode === 'assessment' && critical > 0 ? 0 : raw;
      const elapsed = Math.round((Date.now() - startedAt) / 1000);
      setFinalScore(score);
      setSeconds(elapsed);
      if (mode === 'assessment') saveScore('safeIsolation', score);
      if (user) {
        void saveAM2Session(user.id, {
          sessionType: 'safe_isolation',
          overallScore: score,
          componentScores: { mode, critical, mistakes: all.length, correct },
          sessionData: {
            version: 3,
            jobs: jobs.map((j) => j.id),
            mistakes: all.map((m) => ({ tag: m.tag, critical: m.critical, scenario: m.scenario })),
            correct,
          },
          timeSpentSeconds: elapsed,
          startedAt: new Date(startedAt).toISOString(),
        });
      }
      setStage({ kind: 'results' });
      onSessionComplete?.(score);
      void haptic(all.length ? ImpactStyle.Medium : ImpactStyle.Heavy);
    },
    [mode, startedAt, saveScore, user, jobs, onSessionComplete]
  );

  if (stage.kind === 'intro') {
    return (
      <div className="h-full overflow-y-auto">
        <Intro onStart={start} />
      </div>
    );
  }

  if (stage.kind === 'results') {
    return (
      <div className="h-full overflow-y-auto">
        <Results
          mode={mode}
          score={finalScore}
          seconds={seconds}
          mistakes={mistakes}
          onAgain={forceMode ? undefined : () => start(mode)}
          onModes={forceMode ? undefined : () => setStage({ kind: 'intro' })}
          inMock={!!forceMode}
        />
      </div>
    );
  }

  const scenario = jobs[stage.index];
  return (
    <div className="h-full overflow-y-auto">
      <ScenarioRun
        key={`${scenario.id}-${stage.index}`}
        scenario={scenario}
        index={stage.index}
        total={jobs.length}
        mode={mode}
        startedAt={startedAt}
        onDone={(c, m) => {
          const correct = correctCount + c;
          const all = [...mistakes, ...m];
          setCorrectCount(correct);
          setMistakes(all);
          if (stage.index < jobs.length - 1) {
            setStage({ kind: 'scenario', index: stage.index + 1 });
          } else {
            finish(correct, all);
          }
        }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function Intro({ onStart }: { onStart: (m: SimMode) => void }) {
  return (
    <div className={AM2_PAGE}>
      <div className={cn(AM2_SPLIT, 'mt-2')}>
        <div className="space-y-5">
          <div>
            <p className={AM2_EYEBROW}>Section C · 30 minutes on the day</p>
            <h1 className={AM2_TITLE}>Safe isolation</h1>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white">
              Three jobs: a piece of single-phase equipment, a three-phase isolation and a
              distribution board. For each one, choose what you’d do next — some choices are traps.
              Any safe order is accepted. When you prove dead, you test each conductor pair
              yourself.
            </p>
          </div>
          <p className="max-w-xl text-[13px] leading-relaxed text-white">
            Practice bar: no mistakes. On the day, a dangerous isolation is a critical fail whatever
            else you get right — Assessment mode marks it the same way.
          </p>
          <div className="grid gap-2.5 sm:grid-cols-3">
            {(['learn', 'practise', 'assessment'] as SimMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => onStart(m)}
                className={cn(
                  CARD_BASE,
                  CARD_SURFACE,
                  m === 'practise' ? 'border-elec-yellow' : 'border-elec-yellow/35',
                  'p-4 hover:border-elec-yellow'
                )}
              >
                <span className="flex items-center justify-between text-[16px] font-bold text-white">
                  {MODES[m].label}
                  <ArrowRight className="h-4 w-4" />
                </span>
                <span className="mt-1 text-[12.5px] leading-snug text-white">
                  {m === 'learn'
                    ? 'Feedback on every choice, and a hint when you’re stuck.'
                    : m === 'practise'
                      ? 'Feedback on every choice. No hints.'
                      : 'No feedback until the end. Unsafe = fail. Counts towards “ready”.'}
                </span>
              </button>
            ))}
          </div>
        </div>
        <ol className={AM2_LIST}>
          {SAFE_ISOLATION_SCENARIOS.map((s) => (
            <li key={s.id} className="flex items-start gap-4 px-4 py-4 sm:px-5">
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-white">{s.title}</p>
                <p className="mt-0.5 text-[12.5px] font-medium text-white">{s.kind}</p>
                <p className="mt-1.5 hidden text-[13px] leading-relaxed text-white sm:block">
                  {s.brief}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

type Feedback = { tone: 'ok' | 'bad' | 'noted'; text: string } | null;

const CHOICE_BTN =
  'min-h-[52px] rounded-xl border border-white/[0.14] bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13),0_2px_10px_-4px_rgba(0,0,0,0.7)] px-4 py-3 text-left text-[13.5px] font-medium leading-snug text-white transition-colors hover:border-white/[0.3] active:scale-[0.98] touch-manipulation';

export function ScenarioRun({
  scenario,
  index,
  total,
  mode,
  startedAt,
  onDone,
  section = 'Section C',
  minutes = 30,
}: {
  /** Header label — the Safe Working hour reuses this for its board isolation. */
  section?: string;
  /** Assessment countdown length. */
  minutes?: number;
  scenario: IsolationScenario;
  index: number;
  /** When the run started — Assessment counts down the day's 30 minutes. */
  startedAt?: number;
  total: number;
  mode: SimMode;
  onDone: (correct: number, mistakes: Mistake[]) => void;
}) {
  const assessment = mode === 'assessment';
  const [done, setDone] = useState<IsolationActionId[]>([]);
  const [usedTraps, setUsedTraps] = useState<string[]>([]);
  const [correct, setCorrect] = useState(0);
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [hint, setHint] = useState<IsolationActionId | null>(null);
  const [reproveFailed, setReproveFailed] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (feedback) feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [feedback]);
  const [testing, setTesting] = useState(false);
  const [twistState, setTwistState] = useState<'pending' | 'showing' | 'resolved' | 'none'>(
    scenario.liveTwist ? 'pending' : 'none'
  );

  const addMistake = useCallback(
    (what: string, why: string, tag: IsolationTag, critical: boolean) => {
      setMistakes((m) => [...m, { scenario: scenario.title, what, why, tag, critical }]);
      // Assessment: recorded, not explained — you find out at the end.
      setFeedback(assessment ? { tone: 'noted', text: 'Noted.' } : { tone: 'bad', text: why });
      setHint(null);
      void haptic(assessment ? ImpactStyle.Light : ImpactStyle.Heavy);
    },
    [scenario.title, assessment]
  );

  // The twist's answers in a fresh order per job — the right one was always first.
  const reproveChoices = useMemo(
    () => shuffle(scenario.proveAfterFails?.choices ?? []),
    [scenario.proveAfterFails]
  );
  // Order is fixed per job so the cards don't jump around between taps.
  const order = useMemo(
    () =>
      shuffle<Choice>([
        ...scenario.actions.map((a) => ({ kind: 'action' as const, id: a.id, label: a.label })),
        ...scenario.traps.map((t) => ({
          kind: 'trap' as const,
          id: t.id,
          label: t.label,
          why: t.why,
          tag: t.tag,
        })),
      ]),
    [scenario]
  );

  const remaining = order.filter((c) =>
    c.kind === 'action' ? !done.includes(c.id) : !usedTraps.includes(c.id)
  );
  const allDone = scenario.actions.every((a) => done.includes(a.id));
  const nextAllowed = scenario.actions.find(
    (a) => !done.includes(a.id) && a.needs.every((n) => done.includes(n))
  );

  const choose = (c: Choice) => {
    if (c.kind === 'trap') {
      setUsedTraps((t) => [...t, c.id]);
      addMistake(c.label, c.why, c.tag, true);
      return;
    }
    const action = scenario.actions.find((a) => a.id === c.id)!;
    const missing = action.needs.filter((n) => !done.includes(n));
    if (missing.length) {
      // Proving the indicator brackets the dead test (NET: "prove test
      // equipment before and after"). Testing with an unproved indicator, or
      // "re-proving" before the test, leaves a 0 V reading unproved — critical.
      const unprovedTest = action.id === 'proveDead' && missing.includes('proveBefore');
      const earlyReprove = action.id === 'proveAfter' && missing.includes('proveDead');
      const onlyInform = missing.length === 1 && missing[0] === 'inform';
      if (unprovedTest || earlyReprove)
        addMistake(
          c.label,
          unprovedTest
            ? 'The indicator hasn’t been proved, so a 0 V reading could just mean it isn’t working. Prove it on the proving unit before the dead test and again after.'
            : 'Proving the indicator again only counts after the dead test — it shows it was still working when it read 0 V. Done first, the dead test is never proved.',
          'prove_before',
          true
        );
      else if (onlyInform) addMistake(c.label, INFORM_FIRST, 'not_informed', false);
      else addMistake(c.label, action.tooEarly, 'too_early', false);
      // Learn/Practise: blocked so you can put it right. Assessment: it's done,
      // out of order, as it would be on the day — so a too-early tap looks no
      // different from a right one and gives nothing away.
      if (!assessment) return;
    }
    if (action.id === 'proveDead') {
      if (missing.length) deadNoCredit.current = true;
      setFeedback(null);
      setHint(null);
      setTesting(true);
      return;
    }
    if (action.id === 'proveAfter' && scenario.proveAfterFails && !reproveFailed) {
      setReproveFailed(true);
      setFeedback(null);
      setHint(null);
      void haptic(ImpactStyle.Heavy);
      return;
    }
    setDone((d) => [...d, action.id]);
    if (!missing.length) setCorrect((n) => n + 1); // out of order doesn't earn the step
    // Assessment: the same "Noted." after every choice, right or wrong.
    // Learn/Practise: proving the tester before locking off is safe, but NET's
    // printed sequence does it after — say so, without marking it.
    const beforeLock =
      action.id === 'proveBefore' && !done.includes('lockOff') && !done.includes('notice');
    setFeedback(
      assessment
        ? { tone: 'noted', text: 'Noted.' }
        : beforeLock
          ? {
              tone: 'ok',
              text: 'Done. On the day, NET’s sequence has you prove the tester after you’ve locked off and fitted the notice — do it in that order.',
            }
          : { tone: 'ok', text: 'Done.' }
    );
    setHint(null);
    void haptic(ImpactStyle.Light);
  };

  // A dead test started out of order, or stopped with pairs untested, is
  // recorded but doesn't earn the step.
  const deadNoCredit = useRef(false);
  const deadTestComplete = () => {
    setTesting(false);
    setDone((d) => [...d, 'proveDead']);
    if (!deadNoCredit.current) setCorrect((n) => n + 1);
    deadNoCredit.current = false;
    setFeedback(
      assessment
        ? { tone: 'noted', text: 'Noted.' }
        : { tone: 'ok', text: `Every pair read 0 V at ${scenario.pointOfWork}.` }
    );
  };

  const stepsDone = scenario.actions.filter((a) => done.includes(a.id));
  const twistReprove = reproveFailed && !done.includes('proveAfter');

  return (
    <div className={AM2_PAGE}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <p className="text-[12.5px] font-semibold text-white">
          {section} · {MODES[mode].label} · Job {index + 1} of {total} · {scenario.kind}
        </p>
        {!assessment && (
          <p className="text-[12.5px] tabular-nums text-white">
            {mistakes.length} mistake{mistakes.length === 1 ? '' : 's'}
          </p>
        )}
        {assessment && startedAt ? <Countdown since={startedAt} minutes={minutes} /> : null}
      </div>
      <div className="mt-3 grid h-1 gap-1" style={{ gridTemplateColumns: `repeat(${total}, 1fr)` }}>
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={cn(
              'rounded-full',
              i < index ? 'bg-elec-yellow' : i === index ? 'bg-white' : 'bg-white/15'
            )}
          />
        ))}
      </div>

      <div className={cn(AM2_SPLIT, 'mt-5')}>
        <div className="space-y-5 lg:sticky lg:top-4">
          <div>
            <h2 className="text-[24px] font-bold leading-tight tracking-tight text-white lg:text-[28px]">
              {scenario.title}
            </h2>
            <p className="mt-2 text-[14.5px] leading-relaxed text-white">{scenario.brief}</p>
          </div>

          {stepsDone.length > 0 && !assessment && (
            <ol className={cn(AM2_LIST, 'divide-white/[0.06]')}>
              {stepsDone.map((a, i) => (
                <li key={a.id} className="flex items-start gap-3 px-4 py-2.5 sm:px-5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-[11px] font-bold text-black">
                    {i + 1}
                  </span>
                  <span className="text-[13px] leading-snug text-white">{a.label}</span>
                </li>
              ))}
            </ol>
          )}

          {feedback && (
            <div
              ref={feedbackRef}
              role="status"
              className={cn(
                'flex items-start gap-2.5 rounded-xl border px-4 py-3 text-[13.5px] leading-snug text-white',
                feedback.tone === 'ok'
                  ? 'border-emerald-400/40'
                  : feedback.tone === 'bad'
                    ? 'border-amber-400/60'
                    : 'border-white/[0.2]'
              )}
            >
              {feedback.tone === 'ok' ? (
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              ) : feedback.tone === 'bad' ? (
                <X className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              ) : null}
              <span>
                {feedback.tone === 'bad' && <span className="font-semibold">Mistake. </span>}
                {feedback.text}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {testing ? (
            <DeadTest
              scenario={scenario}
              twist={
                twistState === 'pending' || twistState === 'showing'
                  ? scenario.liveTwist
                  : undefined
              }
              onTwistShown={() => setTwistState('showing')}
              onTwistAnswer={(ok, label, why, critical) => {
                if (ok) {
                  setCorrect((n) => n + 1);
                  setFeedback(
                    assessment
                      ? { tone: 'noted', text: 'Noted.' }
                      : {
                          tone: 'ok',
                          text: `${why} You trace the socket to way 6, switch that off, lock it, sign it — now test again.`,
                        }
                  );
                } else {
                  addMistake(
                    label,
                    `${why} The right move is to stop and find what really feeds it — here that's way 6. Isolate, lock and sign way 6, then test again.`,
                    'live_reading',
                    critical !== false
                  );
                }
                setTwistState('resolved');
              }}
              onIncomplete={(missing) => {
                deadNoCredit.current = true;
                addMistake(
                  'Stopped the dead test early',
                  `You haven't tested ${missing.join(', ')}. Every combination has to read 0 V before you can call it dead.`,
                  'missed_pair',
                  true
                );
              }}
              onComplete={deadTestComplete}
              assessment={assessment}
            />
          ) : twistReprove && scenario.proveAfterFails ? (
            /* The indicator fails on the proving unit after the dead test */
            <div className="space-y-3">
              <div className="rounded-xl border border-red-400/60 px-4 py-3.5">
                <p className="text-[13px] font-semibold text-white">
                  Re-proving on the proving unit
                </p>
                <p className="mt-1 text-[20px] font-bold leading-tight text-white">
                  The indicator doesn’t light
                </p>
              </div>
              <h3 className="text-[15px] font-semibold text-white">What now?</h3>
              <div className="grid gap-2">
                {reproveChoices.map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => {
                      if (c.correct) {
                        setCorrect((n) => n + 1);
                        setFeedback(
                          assessment
                            ? { tone: 'noted', text: 'Noted.' }
                            : {
                                tone: 'ok',
                                text: `${c.why} With a working indicator, proved before and after, every pair reads 0 V.`,
                              }
                        );
                      } else {
                        addMistake(c.label, c.why, 'prove_after', true);
                      }
                      setDone((d) => [...d, 'proveAfter']);
                    }}
                    className={CHOICE_BTN}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          ) : allDone && !assessment ? (
            <div className="space-y-3">
              <p className="text-[13.5px] leading-relaxed text-white">{scenario.takeaway}</p>
              <button
                type="button"
                onClick={() => onDone(correct, mistakes)}
                className={AM2_PRIMARY}
              >
                {index < total - 1 ? `On to job ${index + 2}` : 'See how you did'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-2.5 flex items-center justify-between gap-3">
                <h3 className="text-[15px] font-semibold text-white">What do you do next?</h3>
                {mode === 'learn' && nextAllowed && (
                  <button
                    type="button"
                    onClick={() => setHint(nextAllowed.id)}
                    className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-white/[0.2] px-3 text-[12.5px] font-semibold text-white touch-manipulation"
                  >
                    <Lightbulb className="h-4 w-4" /> Hint
                  </button>
                )}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {remaining.map((c) => (
                  <button
                    key={`${c.kind}-${c.id}`}
                    type="button"
                    onClick={() => choose(c)}
                    className={cn(
                      CHOICE_BTN,
                      hint &&
                        c.kind === 'action' &&
                        c.id === hint &&
                        'border-elec-yellow ring-2 ring-elec-yellow'
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              {/* Assessment: you decide when the job is done — the list doesn't
                  vanish to tell you. Any step left out is recorded. */}
              {assessment && (
                <button
                  type="button"
                  onClick={() => {
                    const left = scenario.actions.filter((a) => !done.includes(a.id));
                    const SAFETY: IsolationActionId[] = [
                      'identify',
                      'switchOff',
                      'lockOff',
                      'proveBefore',
                      'proveDead',
                      'proveAfter',
                    ];
                    const extra: Mistake[] = left.map((a) => ({
                      scenario: scenario.title,
                      what: `Left out: ${a.label.toLowerCase()}`,
                      why:
                        a.id === 'inform'
                          ? INFORM_FIRST
                          : a.tooEarly || 'A step of the safe isolation procedure was left out.',
                      tag:
                        a.id === 'proveBefore' || a.id === 'proveAfter'
                          ? 'prove_before'
                          : a.id === 'proveDead'
                            ? 'missed_pair'
                            : a.id === 'inform'
                              ? 'not_informed'
                              : 'too_early',
                      critical: SAFETY.includes(a.id),
                    }));
                    onDone(correct, [...mistakes, ...extra]);
                  }}
                  className={cn(AM2_PRIMARY, 'mt-4')}
                >
                  {index < total - 1 ? 'Job done — on to the next' : 'Job done — finish'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

/** Time left of the section's limit on the day (NET: Section C, 30 minutes). */
export function Countdown({ since, minutes }: { since: number; minutes: number }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const left = Math.max(0, minutes * 60 - Math.floor((now - since) / 1000));
  return (
    <p className="text-[12.5px] font-semibold tabular-nums text-white" aria-live="off">
      {left > 0
        ? `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')} left`
        : 'Time’s up — the assessor would stop you here'}
    </p>
  );
}

function DeadTest({
  scenario,
  twist,
  onTwistShown,
  onTwistAnswer,
  onIncomplete,
  onComplete,
  assessment,
}: {
  scenario: IsolationScenario;
  twist?: IsolationScenario['liveTwist'];
  onTwistShown: () => void;
  onTwistAnswer: (ok: boolean, label: string, why: string, critical?: boolean) => void;
  onIncomplete: (missing: string[]) => void;
  onComplete: () => void;
  /** Assessment: the pairs aren't listed — you choose two conductors at a time. */
  assessment?: boolean;
}) {
  const [tested, setTested] = useState<string[]>([]);
  const [firstLead, setFirstLead] = useState<string | null>(null);
  const conductors = useMemo(() => {
    const ORDER = ['L', 'L1', 'L2', 'L3', 'SL', 'N', 'E'];
    const set = new Set(scenario.testPairs.flatMap((p) => p.split('–')));
    // Any conductor a job names gets a button, even one not in ORDER yet —
    // a missing button made a job impossible to finish.
    return [...ORDER.filter((c) => set.has(c)), ...[...set].filter((c) => !ORDER.includes(c))];
  }, [scenario.testPairs]);
  /** The listed pair for two conductors, in whichever order the job lists it. */
  const pairFor = (a: string, b: string) =>
    scenario.testPairs.find((p) => p === `${a}–${b}` || p === `${b}–${a}`) ?? `${a}–${b}`;
  const [liveShown, setLiveShown] = useState(false);
  const [twistDone, setTwistDone] = useState(!twist);
  const twistChoices = useMemo(() => shuffle(twist?.choices ?? []), [twist]);

  const test = (pair: string) => {
    if (twist && !twistDone && pair === twist.pair) {
      setLiveShown(true);
      onTwistShown();
      void haptic(ImpactStyle.Heavy);
      return;
    }
    setTested((t) => (t.includes(pair) ? t : [...t, pair]));
    void haptic(ImpactStyle.Light);
  };

  if (liveShown && twist && !twistDone) {
    return (
      <div className="space-y-3">
        <div className="rounded-xl border border-red-400/60 px-4 py-3.5">
          <p className="text-[13px] font-semibold text-white">
            {twist.pair} at {scenario.pointOfWork}
          </p>
          <p className="mt-1 text-[32px] font-bold tabular-nums leading-none text-white">
            {twist.reading}
          </p>
        </div>
        <h3 className="text-[15px] font-semibold text-white">What now?</h3>
        <div className="grid gap-2">
          {twistChoices.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={() => {
                onTwistAnswer(c.correct, c.label, c.why, c.critical);
                setTwistDone(true);
                setLiveShown(false);
                setTested([]);
              }}
              className={CHOICE_BTN}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const missing = scenario.testPairs.filter((p) => !tested.includes(p));

  // Assessment: one lead on each of two conductors — which combinations is
  // for you to know (NET: "test all the combinations").
  if (assessment) {
    return (
      <div className="space-y-3">
        <h3 className="text-[15px] font-semibold text-white">
          Prove dead at {scenario.pointOfWork}
        </h3>
        <p className="text-[12.5px] text-white">
          {firstLead
            ? `First lead on ${firstLead}. Where does the second go?`
            : 'Put your first lead on a conductor.'}
        </p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {conductors.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={firstLead === c}
              onClick={() => {
                if (!firstLead) return setFirstLead(c);
                if (firstLead === c) return setFirstLead(null);
                test(pairFor(firstLead, c));
                setFirstLead(null);
              }}
              className={cn(
                'h-12 rounded-xl border text-[15px] font-bold touch-manipulation',
                firstLead === c
                  ? 'border-elec-yellow bg-elec-yellow text-black'
                  : 'border-white/[0.16] bg-white/[0.05] text-white'
              )}
            >
              {c}
            </button>
          ))}
        </div>
        {tested.length > 0 && (
          <p className="text-[13px] text-white">
            <span className="font-semibold">Tested, 0 V:</span> {tested.join(', ')}
          </p>
        )}
        <button
          type="button"
          onClick={() => {
            if (missing.length) onIncomplete(missing);
            onComplete();
          }}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-bold text-black touch-manipulation active:scale-[0.98]"
        >
          It's dead
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-[15px] font-semibold text-white">Prove dead at {scenario.pointOfWork}</h3>
      <p className="text-[12.5px] text-white">Tap each pair to test it.</p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {scenario.testPairs.map((p) => {
          const isDone = tested.includes(p);
          return (
            <button
              key={p}
              type="button"
              onClick={() => test(p)}
              className={cn(
                'h-14 rounded-xl border text-center touch-manipulation active:scale-[0.97]',
                isDone ? 'border-emerald-400/60' : 'border-white/[0.16] bg-white/[0.05]'
              )}
            >
              <span className="block text-[13.5px] font-semibold text-white">{p}</span>
              <span className={cn('block text-[12px] tabular-nums', 'text-white')}>
                {isDone ? '0 V' : 'test'}
              </span>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => (missing.length ? onIncomplete(missing) : onComplete())}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-bold text-black touch-manipulation active:scale-[0.98]"
      >
        It's dead
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function Results({
  mode,
  score,
  seconds,
  mistakes,
  onAgain,
  onModes,
  inMock,
}: {
  mode: SimMode;
  score: number;
  seconds: number;
  mistakes: Mistake[];
  onAgain?: () => void;
  /** On the Mock day: no "again" and no way out but the day's own Continue. */
  inMock?: boolean;
  onModes?: () => void;
}) {
  const perfect = mistakes.length === 0;
  const critical = mistakes.filter((m) => m.critical);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return (
    <div className={AM2_PAGE}>
      <div className={AM2_SPLIT}>
        <div className="space-y-5">
          <div>
            <p className={AM2_EYEBROW}>Section C · Safe isolation · {MODES[mode].label}</p>
            <h1 className={AM2_TITLE}>
              {perfect
                ? 'Three safe isolations, no mistakes'
                : critical.length && mode === 'assessment'
                  ? 'Critical fail — an unsafe step'
                  : `${mistakes.length} mistake${mistakes.length === 1 ? '' : 's'} to fix`}
            </h1>
            <p className="mt-3 text-[15px] text-white">
              <span className={cn('text-[22px] font-bold tabular-nums', 'text-white')}>
                {score}%
              </span>{' '}
              · {mins}:{String(secs).padStart(2, '0')} ·{' '}
              {perfect ? 'at the bar' : 'the bar is no mistakes'}
            </p>
            {critical.length > 0 && (
              <p className="mt-3 flex items-start gap-2 rounded-xl border-2 border-red-500 px-4 py-3 text-[13.5px] leading-snug text-white">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                {critical.length} unsafe step{critical.length === 1 ? '' : 's'}.{' '}
                {mode === 'assessment'
                  ? 'In Assessment that scores 0, as a dangerous isolation fails the section on the day.'
                  : 'In Assessment mode any one of these scores 0.'}
              </p>
            )}
          </div>
          {!inMock && (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              {onAgain && (
                <button type="button" onClick={onAgain} className={AM2_PRIMARY}>
                  <RotateCcw className="h-4 w-4" />
                  Three new jobs
                </button>
              )}
              {onModes ? (
                <button
                  type="button"
                  onClick={onModes}
                  className="flex h-11 items-center justify-center px-4 text-[14px] font-medium text-white touch-manipulation"
                >
                  Choose a mode
                </button>
              ) : (
                <Link
                  to="/apprentice/am2-simulator"
                  className="flex h-11 items-center justify-center px-4 text-[14px] font-medium text-white touch-manipulation"
                >
                  Back to AM2
                </Link>
              )}
            </div>
          )}
        </div>
        {mistakes.length > 0 ? (
          <ul className={AM2_LIST}>
            {mistakes.map((m, i) => (
              <li key={i} className="px-4 py-4 sm:px-5">
                <p className="flex items-center gap-2 text-[12px] font-semibold text-white">
                  {m.scenario}
                  <span
                    className={cn(
                      'rounded px-1.5 py-0.5 text-[11px] font-bold',
                      m.critical ? 'bg-red-500 text-white' : 'border border-white/[0.25] text-white'
                    )}
                  >
                    {m.critical ? 'Unsafe' : ISOLATION_TAG_LABEL[m.tag]}
                  </span>
                </p>
                <p className="mt-1 text-[14.5px] font-semibold leading-snug text-white">{m.what}</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-white">{m.why}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className={cn(AM2_LIST, 'px-5 py-5')}>
            <p className="text-[15px] font-semibold text-white">
              Every step safe, every order allowed.
            </p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-white">
              {mode === 'assessment'
                ? 'Two clean Assessment runs in a row marks Section C as ready.'
                : 'Now try it in Assessment mode — that’s the run that counts towards “ready”.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SafeIsolationAssessment;
