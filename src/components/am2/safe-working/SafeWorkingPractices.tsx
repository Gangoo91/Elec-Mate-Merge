/**
 * SafeWorkingPractices — the AM2S v1's first hour: Safe Working Practices
 * and Planning (NET Pre-Assessment Manual v2025.03, 1 hour + 10 min reading).
 *
 * AM2 plan, 6 Oct 2026. Missing from the simulator until now. Three parts,
 * as NET sets them:
 *   1. Isolate the assessment unit distribution board — the 10-point test on
 *      the outgoing side of the isolator. Reuses Section C's engine
 *      (ScenarioRun), so unsafe steps are critical in Assessment.
 *   2. A risk assessment of a practice bay — hazard or "No action required",
 *      who might be harmed, and the precaution.
 *   3. Planning the composite installation (unmarked — a checklist).
 * Score: half the isolation, half the risk assessment; a critical isolation
 * error in Assessment scores 0, as a dangerous isolation fails on the day.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_BASE, CARD_SURFACE } from '@/components/ui/card-recipe';
import { useAuth } from '@/contexts/AuthContext';
import { saveAM2Session } from '@/hooks/am2/saveAM2Session';
import { MODES, type SimMode } from '@/data/am2/sectionBRules';
import { ASSESSMENT_BOARD_ISOLATION } from '@/data/am2/safeIsolationScenarios';
import {
  PLANNING_STEPS,
  PRACTICE_BAY,
  WHO,
  markRisk,
  type RiskAnswer,
  type WhoKey,
} from '@/data/am2/safeWorking';
import {
  Countdown,
  ScenarioRun,
  type Mistake,
} from '@/components/am2/safe-isolation/SafeIsolationAssessment';
import { AM2_EYEBROW, AM2_PAGE, AM2_SPLIT, AM2_TITLE } from '@/components/am2/layout';

type Stage = 'intro' | 'isolation' | 'risk' | 'plan' | 'results';

interface Props {
  onSessionComplete?: (score?: number) => void;
  /** Mock day: straight in, in this mode, no retry. */
  forceMode?: SimMode;
}

const chipOn = 'border-elec-yellow bg-elec-yellow font-semibold text-black';
const chipOff = 'border-white/[0.14] bg-white/[0.06] font-medium text-white';

function shuffle<T>(arr: readonly T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function SafeWorkingPractices({ onSessionComplete, forceMode }: Props) {
  const { user } = useAuth();
  const [stage, setStage] = useState<Stage>('intro');
  const [mode, setMode] = useState<SimMode>(forceMode ?? 'practise');
  const [startedAt, setStartedAt] = useState(0);
  const [iso, setIso] = useState<{ correct: number; mistakes: Mistake[] }>({
    correct: 0,
    mistakes: [],
  });
  const [answers, setAnswers] = useState<Record<string, RiskAnswer>>({});
  const [planned, setPlanned] = useState<number[]>([]);
  const [result, setResult] = useState<{ score: number; seconds: number } | null>(null);
  // Precautions in a fresh order per run — the right one is first in the data.
  const [order, setOrder] = useState<Record<string, string[]>>({});

  const start = useCallback((m: SimMode) => {
    setMode(m);
    setStartedAt(Date.now());
    setIso({ correct: 0, mistakes: [] });
    setAnswers({});
    setPlanned([]);
    setResult(null);
    setOrder(
      Object.fromEntries(
        PRACTICE_BAY.map((o) => [
          o.id,
          shuffle(o.hazard ? o.hazard.precautions : (o.distractors ?? [])),
        ])
      )
    );
    setStage('isolation');
  }, []);

  const startedForced = useRef(false);
  useEffect(() => {
    if (forceMode && !startedForced.current) {
      startedForced.current = true;
      start(forceMode);
    }
  }, [forceMode, start]);

  const learn = mode === 'learn';
  const assessment = mode === 'assessment';
  const allAnswered = PRACTICE_BAY.every((o) => {
    const a = answers[o.id];
    if (!a || a.hazard === undefined) return false;
    return a.hazard === false || (a.who.length > 0 && !!a.precaution);
  });

  const riskMarks = useMemo(
    () => PRACTICE_BAY.map((o) => ({ o, m: markRisk(o, answers[o.id]) })),
    [answers]
  );

  const finish = useCallback(() => {
    const critical = iso.mistakes.filter((m) => m.critical).length;
    const isoPct = iso.mistakes.length
      ? (iso.correct / (iso.correct + iso.mistakes.length)) * 100
      : 100;
    const riskRight = riskMarks.filter((r) => r.m.right).length;
    const riskPct = (riskRight / PRACTICE_BAY.length) * 100;
    const score = assessment && critical > 0 ? 0 : Math.round((isoPct + riskPct) / 2);
    const seconds = Math.round((Date.now() - startedAt) / 1000);
    setResult({ score, seconds });
    setStage('results');
    if (user) {
      void saveAM2Session(user.id, {
        sessionType: 'safe_working',
        overallScore: score,
        componentScores: {
          mode,
          isolation: Math.round(isoPct),
          risk: Math.round(riskPct),
          critical,
        },
        sessionData: {
          version: 1,
          mistakes: [
            ...iso.mistakes.map((m) => ({ tag: m.tag, critical: m.critical })),
            ...riskMarks
              .filter((r) => !r.m.right)
              .map((r) => ({ tag: `risk_${r.o.id}`, critical: false })),
          ],
        },
        timeSpentSeconds: seconds,
        startedAt: new Date(startedAt).toISOString(),
      });
    }
    onSessionComplete?.(score);
  }, [iso, riskMarks, assessment, startedAt, user, mode, onSessionComplete]);

  /* ── Intro ─────────────────────────────────────────────── */
  if (stage === 'intro') {
    return (
      <div className="h-full overflow-y-auto">
        <div className={AM2_PAGE}>
          <div className={cn(AM2_SPLIT, 'mt-2')}>
            <div className="space-y-5">
              <div>
                <p className={AM2_EYEBROW}>Safe working · 1 hour on the day (AM2S v1)</p>
                <h1 className={AM2_TITLE}>Safe working practices and planning</h1>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white">
                  The AM2S v1 opens with this hour. Isolate the assessment board with the 10-point
                  test, do a risk assessment of your bay, then plan the composite installation.
                </p>
              </div>
              <p className="max-w-xl text-[13px] leading-relaxed text-white">
                On the day the assessor watches the whole isolation. An unsafe step is a critical
                fail — Assessment mode marks it the same way.
              </p>
              <div className="grid gap-2.5 sm:grid-cols-3">
                {(['learn', 'practise', 'assessment'] as SimMode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => start(m)}
                    className={cn(
                      CARD_BASE,
                      CARD_SURFACE,
                      m === 'practise' ? 'border-elec-yellow' : 'border-white/[0.14]',
                      'p-4 hover:border-elec-yellow'
                    )}
                  >
                    <span className="flex items-center justify-between text-[16px] font-bold text-white">
                      {MODES[m].label}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                    <span className="mt-1 text-[12.5px] leading-snug text-white">
                      {m === 'learn'
                        ? 'Feedback on every choice, and each hazard explained as you go.'
                        : m === 'practise'
                          ? 'Feedback on the isolation as you go; the risk assessment is marked at the end.'
                          : 'Nothing marked until the end. Unsafe = fail.'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <ol className="space-y-2">
              {[
                [
                  '1',
                  'Isolate the assessment board',
                  'Outgoing side of the isolator, all 10 combinations',
                ],
                ['2', 'Risk assessment', 'Hazard or “No action required”, who, and the precaution'],
                ['3', 'Plan the installation', 'Drawings, materials, order of work, timesheet'],
              ].map(([n, t, d]) => (
                <li
                  key={n}
                  className={cn(
                    'flex gap-3 rounded-2xl border border-white/[0.14] p-4',
                    CARD_SURFACE
                  )}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-elec-yellow text-[12px] font-bold text-black">
                    {n}
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-white">{t}</span>
                    <span className="block text-[12.5px] text-white">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }

  /* ── 1. Isolation ──────────────────────────────────────── */
  if (stage === 'isolation') {
    return (
      <div className="h-full overflow-y-auto">
        <ScenarioRun
          scenario={ASSESSMENT_BOARD_ISOLATION}
          index={0}
          total={1}
          mode={mode}
          startedAt={startedAt}
          section="Safe working"
          minutes={60}
          onDone={(correct, mistakes) => {
            setIso({ correct, mistakes });
            setStage('risk');
          }}
        />
      </div>
    );
  }

  /* ── 2. Risk assessment ────────────────────────────────── */
  if (stage === 'risk') {
    const set = (id: string, patch: Partial<RiskAnswer>) =>
      setAnswers((a) => ({ ...a, [id]: { who: [], ...a[id], ...patch } }));
    return (
      <div className="h-full overflow-y-auto">
        <div className={AM2_PAGE}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className={AM2_EYEBROW}>Safe working · {MODES[mode].label} · Part 2 of 3</p>
            {assessment && startedAt ? <Countdown since={startedAt} minutes={60} /> : null}
          </div>
          <h1 className={cn(AM2_TITLE, 'mt-1')}>Risk assessment</h1>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-white">
            A practice bay. For each thing you see: is there a hazard? If so, who might be harmed
            and what precaution do you record? If there’s no risk, record “No action required”.
          </p>
          <ul className="mt-5 space-y-3">
            {PRACTICE_BAY.map((o) => {
              const a = answers[o.id];
              const m = markRisk(o, a);
              const answered =
                !!a &&
                a.hazard !== undefined &&
                (a.hazard === false || (!!a.precaution && a.who.length > 0));
              return (
                <li
                  key={o.id}
                  className={cn('rounded-2xl border border-white/[0.14] p-4', CARD_SURFACE)}
                >
                  <p className="text-[15px] font-medium leading-snug text-white">{o.seen}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {[
                      { v: true, label: 'Hazard' },
                      { v: false, label: 'No action required' },
                    ].map((c) => (
                      <button
                        key={c.label}
                        type="button"
                        aria-pressed={a?.hazard === c.v}
                        onClick={() => set(o.id, { hazard: c.v })}
                        className={cn(
                          'h-11 rounded-xl border text-[14px] touch-manipulation',
                          a?.hazard === c.v ? chipOn : chipOff
                        )}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                  {a?.hazard && o.hazard !== undefined && (
                    <div className="mt-3 space-y-3 border-t border-white/[0.1] pt-3">
                      <div>
                        <p className="text-[12px] font-semibold text-white">Who might be harmed?</p>
                        <div className="mt-1.5 flex flex-wrap gap-2">
                          {WHO.map((w) => {
                            const on = a.who.includes(w.key);
                            return (
                              <button
                                key={w.key}
                                type="button"
                                aria-pressed={on}
                                onClick={() =>
                                  set(o.id, {
                                    who: on
                                      ? a.who.filter((x: WhoKey) => x !== w.key)
                                      : [...a.who, w.key],
                                  })
                                }
                                className={cn(
                                  'h-11 rounded-xl border px-3.5 text-[13.5px] touch-manipulation',
                                  on ? chipOn : chipOff
                                )}
                              >
                                {w.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-white">Precaution</p>
                        <div className="mt-1.5 grid gap-2">
                          {(
                            order[o.id] ??
                            (o.hazard ? [...o.hazard.precautions] : [...(o.distractors ?? [])])
                          ).map((p) => (
                            <button
                              key={p}
                              type="button"
                              aria-pressed={a.precaution === p}
                              onClick={() => set(o.id, { precaution: p })}
                              className={cn(
                                'min-h-[48px] rounded-xl border px-4 py-2.5 text-left text-[13.5px] leading-snug touch-manipulation',
                                a.precaution === p ? chipOn : chipOff
                              )}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {learn && answered && (
                    <div className="mt-3 flex gap-2.5 border-t border-white/[0.1] pt-3">
                      <span
                        className={cn(
                          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                          m.right ? 'bg-emerald-400' : 'bg-red-500'
                        )}
                      >
                        {m.right ? (
                          <Check className="h-3 w-3 text-black" />
                        ) : (
                          <X className="h-3 w-3 text-white" />
                        )}
                      </span>
                      <p className="text-[13px] leading-snug text-white">
                        <span className="font-semibold">
                          {o.hazard ? `${o.hazard.what}.` : 'No action required.'}
                        </span>{' '}
                        {o.why}
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              disabled={!allAnswered}
              onClick={() => setStage('plan')}
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-elec-yellow px-5 text-[15px] font-bold text-black touch-manipulation disabled:bg-white/[0.12] disabled:text-white"
            >
              {allAnswered ? 'Risk assessment done' : 'Answer every item'}
              {allAnswered && <ArrowRight className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── 3. Planning ───────────────────────────────────────── */
  if (stage === 'plan') {
    return (
      <div className="h-full overflow-y-auto">
        <div className={AM2_PAGE}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className={AM2_EYEBROW}>Safe working · {MODES[mode].label} · Part 3 of 3</p>
            {assessment && startedAt ? <Countdown since={startedAt} minutes={60} /> : null}
          </div>
          <h1 className={cn(AM2_TITLE, 'mt-1')}>Plan the composite installation</h1>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-white">
            On the day you have the Candidate Manual, the drawings, the bay with its materials and
            equipment, and notepaper. This part isn’t marked — tick off what you’d do.
          </p>
          <ul className="mt-5 space-y-2">
            {PLANNING_STEPS.map((p, i) => {
              const on = planned.includes(i);
              return (
                <li key={p}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setPlanned((x) => (on ? x.filter((y) => y !== i) : [...x, i]))}
                    className={cn(
                      'flex min-h-[52px] w-full items-center gap-3 rounded-xl border px-4 py-2.5 text-left touch-manipulation',
                      on ? 'border-elec-yellow' : 'border-white/[0.14]'
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border',
                        on ? 'border-elec-yellow bg-elec-yellow' : 'border-white/[0.35]'
                      )}
                    >
                      {on && <Check className="h-3 w-3 text-black" />}
                    </span>
                    <span className="text-[14px] leading-snug text-white">{p}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={finish}
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-elec-yellow px-5 text-[15px] font-bold text-black touch-manipulation"
            >
              Finish the hour <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Results ───────────────────────────────────────────── */
  const critical = iso.mistakes.filter((m) => m.critical);
  const wrongRisk = riskMarks.filter((r) => !r.m.right);
  return (
    <div className="h-full overflow-y-auto">
      <div className={AM2_PAGE}>
        <p className={AM2_EYEBROW}>Safe working · {MODES[mode].label}</p>
        <h1 className={cn(AM2_TITLE, 'mt-1')}>
          {result?.score ?? 0}%
          {assessment && critical.length > 0 ? ' — an unsafe isolation step' : ''}
        </h1>
        <p className="mt-2 text-[13px] text-white">
          {Math.floor((result?.seconds ?? 0) / 60)} min of the hour.
        </p>

        <section className="mt-5 space-y-2">
          <h2 className="text-[15px] font-semibold text-white">The isolation</h2>
          {iso.mistakes.length === 0 ? (
            <p className="text-[14px] text-white">Every step right, in a safe order.</p>
          ) : (
            iso.mistakes.map((m, i) => (
              <div
                key={i}
                className={cn('rounded-2xl border border-white/[0.14] p-4', CARD_SURFACE)}
              >
                <p className="text-[14px] font-semibold text-white">
                  {m.critical ? 'Unsafe: ' : ''}
                  {m.what}
                </p>
                <p className="mt-1 text-[13px] leading-snug text-white">{m.why}</p>
              </div>
            ))
          )}
        </section>

        <section className="mt-5 space-y-2">
          <h2 className="text-[15px] font-semibold text-white">
            Risk assessment · {PRACTICE_BAY.length - wrongRisk.length} of {PRACTICE_BAY.length}
          </h2>
          {wrongRisk.map(({ o }) => (
            <div
              key={o.id}
              className={cn('rounded-2xl border border-white/[0.14] p-4', CARD_SURFACE)}
            >
              <p className="text-[14px] font-semibold text-white">{o.seen}</p>
              <p className="mt-1 text-[13px] leading-snug text-white">
                {o.hazard
                  ? `${o.hazard.what} — ${o.hazard.who
                      .map((w) => WHO.find((x) => x.key === w)!.label.toLowerCase())
                      .join(', ')}. ${o.hazard.precautions[0]}. `
                  : 'No action required. '}
                {o.why}
              </p>
            </div>
          ))}
        </section>

        {!forceMode && (
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => start(mode)}
              className="h-12 rounded-xl bg-elec-yellow px-5 text-[15px] font-bold text-black touch-manipulation"
            >
              Again
            </button>
            <button
              type="button"
              onClick={() => setStage('intro')}
              className="h-12 rounded-xl border border-white/[0.22] px-5 text-[15px] font-semibold text-white touch-manipulation"
            >
              Choose mode
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SafeWorkingPractices;
