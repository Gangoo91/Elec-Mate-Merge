/**
 * CircuitTestView v8 — the Section B workbench, in three modes.
 *
 * 6 Oct 2026 (AM2 plan, Phase 1). What the learner has to do themselves now
 * depends on the mode:
 *   Learn       — every step prompted: range, where, what to connect.
 *   Practise    — no prompts. They pick the point on the rig, the range and
 *                 what they're connecting; readings go to a reading log and
 *                 they fill in the schedule. The guide is still there.
 *   Assessment  — as Practise, without the guide or a pass/fail on readings.
 * In every mode: live tests are locked until every circuit's dead tests are
 * done and the board is energised (Reg 643.1); continuity reads high until the
 * leads are nulled; the high-current loop test trips an RCD.
 *
 * Round 6: "Put something right" — with the board isolated, choose a repair
 * from one list (the same options wherever they could apply, so it gives
 * nothing away). A repair makes stale the tests it could have affected
 * (Reg 643.1); their old readings stay in the log, marked, and the tests
 * have to be taken again.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, FileText, Check, ArrowRight, BookOpen, X, Wrench } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { FIX_OPTIONS, fixOptionsFor, type FixRecord } from '@/data/am2/sectionBRectify';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import type {
  AM2RigCircuit,
  DialPosition,
  CircuitProgress,
  TestReading,
  RequiredTest,
} from '@/types/am2-testing-simulator';
import { MFTInstrument } from './MFTInstrument';
import { CircuitDiagram } from './CircuitDiagram';
import { useMFTInstrument } from '@/hooks/am2/useMFTInstrument';
import { getTestGuide, inSentence, passShort } from '@/data/am2TestLearning';
import {
  LEAD_RESISTANCE,
  adjustForRingPosition,
  applyProblem,
  connectionsFor,
  deadDoneOn,
  isLiveDial,
  matchTest,
  nextTestFor,
  type SeededProblem,
  type SimMistake,
  type SimMode,
} from '@/data/am2/sectionBRules';

interface CircuitTestViewProps {
  circuit: AM2RigCircuit;
  progress: CircuitProgress;
  gn3Step: number;
  mode: SimMode;
  energised: boolean;
  leadsNulled: boolean;
  seeded: SeededProblem[];
  onNullLeads: () => void;
  onLogMistake: (m: SimMistake) => void;
  onReadingComplete: (reading: TestReading) => void;
  onBack: () => void;
  onOpenEIC: () => void;
  /** Repairs made in this run (this circuit's are listed in the log). */
  fixes?: FixRecord[];
  onRectify?: (circuitId: number, optionId: string) => void;
  /** Isolate the board for a repair. */
  onDeenergise?: () => void;
}

/** How the range reads on the dial. */
const RANGE: Record<DialPosition, string> = {
  OFF: 'OFF',
  CONTINUITY: 'Ω',
  IR_250V: '250 V',
  IR_500V: '500 V',
  LOOP_ZS: 'Zs',
  RCD_30: '30 mA',
  RCD_100: '100 mA',
  RCD_300: '300 mA',
  PFC: 'PFC',
};

const SURFACE = cn('rounded-2xl border border-white/[0.16]', CARD_SURFACE);

function protection(c: AM2RigCircuit): string {
  const d = `${c.mcbRating} A Type ${c.mcbType}`;
  if (!c.hasRcd) return `${d} MCB`;
  return c.rcdBsStandard === 'BS EN 61009'
    ? `${d} RCBO, ${c.rcdRating} mA`
    : `${d} MCB, ${c.rcdRating} mA RCD`;
}

/** The connection Learn mode sets for a test. */
function learnConnection(c: AM2RigCircuit, t: RequiredTest | null): string | null {
  if (!t) return null;
  if (t.dialPosition === 'LOOP_ZS') return c.hasRcd ? 'notrip' : 'hi';
  return t.subTest ?? '';
}

export function CircuitTestView({
  circuit,
  progress,
  mode,
  energised,
  leadsNulled,
  seeded,
  onNullLeads,
  onLogMistake,
  onReadingComplete,
  onBack,
  onOpenEIC,
  fixes = [],
  onRectify,
  onDeenergise,
}: CircuitTestViewProps) {
  const [fixOpen, setFixOpen] = useState(false);
  const [fixDone, setFixDone] = useState<string | null>(null);
  const myFixes = fixes.filter((f) => f.circuitId === circuit.id);
  const learn = mode === 'learn';
  const marked = !learn;
  const assessment = mode === 'assessment';

  const sortedTests = useMemo(
    () => [...circuit.requiredTests].sort((a, b) => a.gn3Step - b.gn3Step),
    [circuit.requiredTests]
  );
  const nextTest = useMemo(
    () => nextTestFor(circuit, progress.completedTests, energised),
    [circuit, progress.completedTests, energised]
  );

  const [manualPoint, setManualPoint] = useState<string | null>(null);
  const [connection, setConnection] = useState<string | null>(null);
  const [lastReading, setLastReading] = useState<TestReading | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const nullLogged = useRef(false);

  const activeTestPointId = manualPoint || (learn ? (nextTest?.testPointId ?? null) : null);
  const activePoint = circuit.testPoints.find((p) => p.id === activeTestPointId);

  const {
    state: mft,
    setDialPosition,
    runTest,
  } = useMFTInstrument({
    circuit,
    activeTestPointId,
    activeSubTest:
      connection && connection !== 'hi' && connection !== 'notrip' ? connection : undefined,
    adjustReading: (raw: TestReading) => {
      // Ring position, then a planted problem, then un-nulled leads on continuity.
      let reading = applyProblem(adjustForRingPosition(circuit, raw), circuit, seeded);
      if (reading.dialPosition === 'CONTINUITY' && !leadsNulled && reading.subTest !== 'polarity') {
        const v = Math.round((reading.value + LEAD_RESISTANCE) * 100) / 100;
        reading = { ...reading, value: v, displayValue: v.toFixed(2) };
      }
      return reading;
    },
    neutralSounds: mode === 'assessment',
    onReadingComplete: (reading: TestReading) => {
      setLastReading(reading);
      onReadingComplete(reading);
    },
  });

  // Learn: the right connection is set for you as the test changes.
  useEffect(() => {
    if (learn) setConnection(learnConnection(circuit, nextTest));
  }, [learn, circuit, nextTest]);

  const handleDial = useCallback(
    (pos: DialPosition) => {
      setDialPosition(pos);
      setLastReading(null);
      setNotice(null);
      if (!learn) setConnection(null);
    },
    [setDialPosition, learn]
  );

  const handlePoint = useCallback((id: string) => {
    setManualPoint(id);
    setLastReading(null);
    setNotice(null);
  }, []);

  const log = useCallback(
    (m: SimMistake) => {
      if (marked) onLogMistake(m);
    },
    [marked, onLogMistake]
  );

  const options = connectionsFor(circuit, mft.dialPosition);
  const needsConnection = options.length > 0;

  const handleTest = useCallback(() => {
    setNotice(null);
    const dial = mft.dialPosition;
    if (!activePoint) {
      setNotice('Tap a point on the rig to put your leads on.');
      return;
    }
    if (needsConnection && connection === null) {
      setNotice('Choose what you’re connecting to before you test.');
      return;
    }
    if (isLiveDial(dial) && !energised) {
      setNotice(
        assessment
          ? 'The board is dead — no reading.'
          : 'The board is dead. Live tests come after every circuit’s dead tests are done and the board is energised (Reg 643.1).'
      );
      log({
        tag: 'live_before_dead',
        circuitId: circuit.id,
        what: `Circuit ${circuit.id}: tried a ${RANGE[dial]} test before the board was energised.`,
        fix: 'Every dead test on every circuit first, then energise, then the live tests.',
      });
      return;
    }
    if (!isLiveDial(dial) && energised) {
      setNotice(
        assessment
          ? 'The board is energised — the assessor stops you.'
          : 'The board is energised. Continuity and insulation resistance are dead tests — they need the circuit isolated, and 500 V on a live circuit is a hazard.'
      );
      log({
        tag: 'live_before_dead',
        circuitId: circuit.id,
        what: `Circuit ${circuit.id}: a ${RANGE[dial]} test with the board live.`,
        fix: 'Dead tests are done before energising. If one needs repeating, isolate first.',
      });
      return;
    }
    if (!activePoint.availableTests.includes(dial)) {
      setNotice(
        assessment
          ? 'No reading.'
          : `There’s nothing to measure on ${RANGE[dial]} at the ${inSentence(activePoint.label)}.`
      );
      log({
        tag: 'wrong_point',
        circuitId: circuit.id,
        what: `Circuit ${circuit.id}: ${RANGE[dial]} at the ${inSentence(activePoint.label)}.`,
        fix: 'Match the test to where it is taken: insulation resistance at the board, Zs at the far point.',
      });
      return;
    }
    if (dial === 'LOOP_ZS' && circuit.hasRcd && connection === 'hi') {
      // Assessment: the trip is what you'd see; the coaching isn't.
      setNotice(
        assessment
          ? 'The RCD tripped.'
          : 'The RCD tripped. On an RCD-protected circuit use the three-wire no-trip loop test.'
      );
      log({
        tag: 'tripped_rcd',
        circuitId: circuit.id,
        what: `Circuit ${circuit.id}: two-wire high-current loop test on an RCD-protected circuit.`,
        fix: 'Use the three-wire no-trip test where there is an RCD or RCBO (GN3).',
      });
      return;
    }
    if (dial === 'CONTINUITY' && !leadsNulled && !nullLogged.current) {
      nullLogged.current = true;
      log({
        tag: 'leads_not_nulled',
        circuitId: circuit.id,
        what: 'Continuity readings taken without nulling the leads — each one is about 0.20 Ω high.',
        fix: 'Null the leads on the ohms range before the first continuity test.',
      });
    }
    runTest();
  }, [
    assessment,
    mft.dialPosition,
    activePoint,
    needsConnection,
    connection,
    energised,
    log,
    circuit,
    leadsNulled,
    runTest,
  ]);

  const handleNext = useCallback(() => {
    setManualPoint(null);
    setLastReading(null);
    setNotice(null);
    if (!learn) setConnection(null);
  }, [learn]);

  const done = progress.completedTests.length;
  const allDone = done >= progress.totalTests;
  // Assessment never says a circuit is finished or waiting: that would show
  // which readings matched a required test. Only readings taken are shown.
  const waitingForPower =
    !assessment && !nextTest && !allDone && deadDoneOn(circuit, progress.completedTests);
  const taken = progress.readings.length;
  const point = nextTest ? circuit.testPoints.find((p) => p.id === nextTest.testPointId) : null;
  const dialRight = !!nextTest && mft.dialPosition === nextTest.dialPosition;
  const leadsRight = !!nextTest && activeTestPointId === nextTest.testPointId;
  const guide = nextTest && !assessment ? getTestGuide(circuit, nextTest) : null;
  const index = nextTest ? sortedTests.findIndex((t) => t.id === nextTest.id) + 1 : done;

  const completedPoints = useMemo(() => {
    const ids = new Set<string>();
    for (const id of progress.completedTests) {
      const t = circuit.requiredTests.find((x) => x.id === id);
      if (t) ids.add(t.testPointId);
    }
    return Array.from(ids);
  }, [progress.completedTests, circuit.requiredTests]);

  const readingFor = (t: RequiredTest) =>
    [...progress.readings].reverse().find((r) => matchTest(circuit, r)?.id === t.id);

  const connectionLabel = (t: RequiredTest) => {
    const v = learnConnection(circuit, t);
    return connectionsFor(circuit, t.dialPosition).find((o) => o.value === v)?.label;
  };

  // Learn: say why TEST would do nothing.
  const learnBlocker =
    learn && nextTest && !lastReading && !notice
      ? mft.dialPosition === 'OFF'
        ? `Turn the dial to ${RANGE[nextTest.dialPosition]}`
        : nextTest.dialPosition === 'CONTINUITY' && !leadsNulled
          ? 'Null the leads first — tap “Null leads” under the tester.'
          : null
      : null;

  return (
    <div className="flex h-full flex-col">
      {/* ── Circuit bar ── */}
      <div className="flex shrink-0 items-center gap-3 border-b border-white/[0.08] px-3 py-2.5 sm:px-4 lg:px-5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-11 shrink-0 items-center gap-1 rounded-xl border border-white/[0.18] bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04] pl-2 pr-3.5 text-[14px] font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13)] touch-manipulation hover:border-elec-yellow/60 active:scale-[0.97]"
        >
          <ChevronLeft className="h-5 w-5" /> The rig
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15.5px] font-bold leading-tight text-white lg:text-[17px]">
            <span className="text-[12px] font-semibold">Circuit {circuit.id} · </span>
            {circuit.name}
          </p>
          <p className="truncate text-[12px] text-white">
            {protection(circuit)} · {circuit.cableType}
          </p>
        </div>
        <span
          className={cn(
            'shrink-0 rounded-md px-2 py-1 text-[11.5px] font-bold',
            energised ? 'bg-red-500 text-white' : 'border border-white/[0.25] text-white'
          )}
        >
          {energised ? 'Board energised' : 'Board dead'}
        </span>
        <span className="hidden shrink-0 text-[12.5px] font-semibold tabular-nums text-white sm:block">
          {assessment
            ? `${taken} reading${taken === 1 ? '' : 's'}`
            : `${done}/${progress.totalTests} tests`}
        </span>
        {mode !== 'learn' && onRectify && (
          <button
            type="button"
            onClick={() => {
              setFixDone(null);
              setFixOpen(true);
            }}
            aria-label="Put something right on this circuit"
            className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl border border-white/[0.18] px-3 text-[13px] font-semibold text-white touch-manipulation hover:border-white/[0.35]"
          >
            <Wrench className="h-4 w-4" />
            <span className="hidden sm:inline">Put right</span>
          </button>
        )}
        <button
          type="button"
          onClick={onOpenEIC}
          aria-label="Open the schedule"
          className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl border border-white/[0.18] px-3 text-[13px] font-semibold text-white touch-manipulation hover:border-white/[0.35]"
        >
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">Schedule</span>
        </button>
      </div>

      {/* ── Workbench ── */}
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)] gap-3 overflow-y-auto p-3 sm:p-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(400px,1fr)] lg:gap-5 lg:overflow-hidden lg:p-5">
        {/* Left: the job + the rig */}
        <div className="flex flex-col gap-3 lg:min-h-0">
          {allDone && !assessment ? (
            <div className={cn(SURFACE, 'flex shrink-0 items-center gap-3 p-4 lg:p-5')}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-400">
                <Check className="h-5 w-5 text-black" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[17px] font-bold text-white">Circuit {circuit.id} is tested</p>
                <p className="text-[13px] text-white">
                  {learn
                    ? `All ${progress.totalTests} readings are on the schedule.`
                    : 'Your readings are in the log — write them on the schedule.'}
                </p>
              </div>
              <button
                type="button"
                onClick={onBack}
                className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl bg-elec-yellow px-4 text-[14px] font-bold text-black touch-manipulation"
              >
                Next circuit <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : waitingForPower ? (
            <div className={cn(SURFACE, 'shrink-0 p-4 lg:p-5')}>
              <p className="text-[17px] font-bold text-white">Dead tests done on this circuit</p>
              <p className="mt-1 text-[13.5px] text-white">
                The live tests here come once every circuit’s dead tests are done and the board is
                energised — that happens on the rig page (Reg 643.1).
              </p>
              <button
                type="button"
                onClick={onBack}
                className="mt-3 inline-flex h-11 items-center gap-1.5 rounded-xl bg-elec-yellow px-4 text-[14px] font-bold text-black touch-manipulation"
              >
                Back to the rig <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : learn && nextTest ? (
            <div className={cn(SURFACE, 'shrink-0 p-4 lg:p-5')}>
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold text-white">
                    Test {index} of {progress.totalTests}
                  </p>
                  <h2 className="mt-0.5 text-[19px] font-bold leading-snug text-white lg:text-[21px]">
                    {nextTest.description}
                  </h2>
                </div>
                {guide && <GuideToggle open={showGuide} onClick={() => setShowGuide((v) => !v)} />}
              </div>
              <ol className="mt-3.5 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {[
                  {
                    ok: dialRight,
                    text: (
                      <>
                        Dial to <b className="font-mono">{RANGE[nextTest.dialPosition]}</b>
                      </>
                    ),
                  },
                  {
                    ok: leadsRight,
                    text: (
                      <>
                        Leads on the <b>{inSentence(point?.label ?? '')}</b>
                        {connectionLabel(nextTest) ? <> · {connectionLabel(nextTest)}</> : null}
                      </>
                    ),
                  },
                  { ok: false, text: <>Hold TEST</> },
                ].map((s, i) => (
                  <li
                    key={i}
                    className={cn(
                      'flex min-h-[44px] items-center gap-2.5 rounded-xl border px-3 py-2 text-[13.5px] text-white',
                      s.ok ? 'border-emerald-400/70' : 'border-white/[0.14]'
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-bold',
                        s.ok ? 'bg-emerald-400 text-black' : 'bg-white/[0.12] text-white'
                      )}
                    >
                      {s.ok ? <Check className="h-3.5 w-3.5" /> : i + 1}
                    </span>
                    <span className="min-w-0">{s.text}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-[13px] text-white">
                <span className="font-semibold">Good result: </span>
                {passShort(circuit, nextTest)}
              </p>
            </div>
          ) : (
            /* Practise / Assessment: no prompts — what's left, not how */
            <div className={cn(SURFACE, 'shrink-0 p-4 lg:p-5')}>
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold text-white">
                    {assessment
                      ? `Assessment · ${taken} reading${taken === 1 ? '' : 's'} taken on this circuit`
                      : `Practise mode · ${progress.totalTests - done} test${progress.totalTests - done === 1 ? '' : 's'} left on this circuit`}
                  </p>
                  <h2 className="mt-0.5 text-[19px] font-bold leading-snug text-white lg:text-[21px]">
                    Choose the point, the range and what you connect
                  </h2>
                </div>
                {guide && <GuideToggle open={showGuide} onClick={() => setShowGuide((v) => !v)} />}
              </div>
              <p className="mt-2 text-[13px] text-white">
                {assessment
                  ? energised
                    ? 'The board is energised.'
                    : 'The board is dead.'
                  : energised
                    ? 'The board is energised. Do this circuit’s live tests.'
                    : 'The board is dead. Dead tests only, in the right order.'}{' '}
                {mode === 'practise' && 'Tap a point on the rig to put your leads there.'}
              </p>
            </div>
          )}

          {/* The rig, or the guide in its place */}
          <div
            className={cn(
              'relative shrink-0 overflow-hidden rounded-2xl border border-white/[0.12] lg:min-h-[260px] lg:flex-1 lg:shrink',
              showGuide && guide ? 'h-auto' : 'h-[230px] sm:h-[300px] lg:h-auto',
              showGuide && guide ? CARD_SURFACE : 'bg-[hsl(220_5%_23%)]'
            )}
          >
            {showGuide && guide ? (
              <div className="h-full overflow-y-auto p-4 lg:absolute lg:inset-0 lg:p-6">
                <div className="grid gap-5 xl:grid-cols-2 xl:gap-8">
                  <div className="space-y-5">
                    <section>
                      <h3 className="text-[15px] font-bold text-white">What it tells you</h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-white">
                        {guide.measures}
                      </p>
                    </section>
                    <section>
                      <h3 className="text-[15px] font-bold text-white">How to do it</h3>
                      <ol className="mt-2 space-y-2">
                        {guide.steps.map((s, i) => (
                          <li key={i} className="flex gap-3 text-[14px] leading-snug text-white">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-elec-yellow text-[12px] font-bold text-black">
                              {i + 1}
                            </span>
                            <span className="pt-0.5">{s}</span>
                          </li>
                        ))}
                      </ol>
                    </section>
                  </div>
                  <div className="space-y-5">
                    <section className="rounded-xl border border-emerald-400/60 p-4">
                      <h3 className="text-[15px] font-bold text-white">A good result</h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-white">{guide.pass}</p>
                      <p className="mt-3 border-t border-white/[0.1] pt-2.5 text-[13px] text-white">
                        <span className="font-semibold">On the schedule: </span>
                        {guide.schedule}
                      </p>
                    </section>
                    <section>
                      <h3 className="flex items-center gap-1.5 text-[15px] font-bold text-white">
                        Where marks are lost
                      </h3>
                      <ul className="mt-2 space-y-2">
                        {guide.wrong.map((w, i) => (
                          <li key={i} className="flex gap-2.5 text-[14px] leading-snug text-white">
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                    <p className="border-t border-white/[0.1] pt-3 font-mono text-[12px] text-white">
                      {guide.refs}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="absolute left-3 top-2.5 z-10 text-[11.5px] font-semibold text-white">
                  {activePoint
                    ? `Leads on the ${inSentence(activePoint.label)}`
                    : 'Tap a point to put your leads there'}
                </div>
                <div className="h-full w-full p-2 pt-7">
                  <CircuitDiagram
                    testPoints={circuit.testPoints}
                    diagramLayout={circuit.diagramLayout}
                    activeTestPointId={activeTestPointId}
                    guidedTestPointId={learn && !manualPoint ? nextTest?.testPointId || null : null}
                    completedTestPointIds={learn ? completedPoints : []}
                    onSelectTestPoint={handlePoint}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right: the tester, what you connect, the result, the log */}
        <div className="flex flex-col gap-3 lg:min-h-0 lg:overflow-y-auto">
          <MFTInstrument
            dialPosition={mft.dialPosition}
            displayMode={mft.displayMode}
            reading={mft.currentReading}
            hideVerdict={assessment}
            onDialChange={handleDial}
            onTest={handleTest}
            testDisabled={mft.isTestActive}
            targetPosition={learn ? (nextTest?.dialPosition ?? null) : null}
          />

          {/* What the leads are connected to, and nulling */}
          {(needsConnection || mft.dialPosition === 'CONTINUITY') && (
            <div className={cn(SURFACE, 'p-3.5')}>
              {mft.dialPosition === 'CONTINUITY' && (
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-[13px] text-white">
                    {leadsNulled
                      ? 'Leads nulled'
                      : assessment
                        ? 'Leads not nulled'
                        : 'Leads not nulled — readings include the leads'}
                  </p>
                  <button
                    type="button"
                    onClick={onNullLeads}
                    disabled={leadsNulled}
                    className={cn(
                      'inline-flex h-11 items-center gap-1.5 rounded-lg px-3 text-[13px] font-bold touch-manipulation',
                      leadsNulled
                        ? 'border border-emerald-400 text-white'
                        : learn
                          ? 'bg-elec-yellow text-black'
                          : 'border border-white/[0.25] text-white'
                    )}
                  >
                    {leadsNulled ? <Check className="h-4 w-4 text-emerald-400" /> : null}
                    {leadsNulled ? 'Nulled' : 'Null leads'}
                  </button>
                </div>
              )}
              {needsConnection && (
                <>
                  <p className="text-[12px] font-semibold text-white">Connected to</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {options.map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        onClick={() => setConnection(o.value)}
                        aria-pressed={connection === o.value}
                        className={cn(
                          'min-h-[44px] rounded-lg border px-3 text-[13px] font-semibold touch-manipulation',
                          connection === o.value
                            ? 'border-elec-yellow bg-elec-yellow text-black'
                            : 'border-white/[0.2] text-white hover:border-white/[0.4]'
                        )}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {(notice || learnBlocker) && (
            <p className="rounded-xl border border-amber-400 px-4 py-2.5 text-[13px] text-white">
              {notice ?? learnBlocker}
            </p>
          )}

          {lastReading && (
            <div
              className={cn(
                'flex items-center gap-3 rounded-xl border-2 px-4 py-3',
                assessment
                  ? 'border-white/[0.3]'
                  : lastReading.compliant
                    ? 'border-emerald-400'
                    : 'border-red-400'
              )}
            >
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[22px] font-bold leading-tight tabular-nums text-white">
                  {lastReading.displayValue} {lastReading.unit}
                </p>
                <p className="text-[12.5px] font-semibold text-white">
                  {assessment
                    ? 'In your reading log — is it within the limit?'
                    : lastReading.compliant
                      ? learn
                        ? 'Within the limit — written on the schedule'
                        : 'Within the limit — in your reading log'
                      : 'Outside the limit — put it right, then retest (Reg 643.1)'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl bg-elec-yellow px-4 text-[14px] font-bold text-black touch-manipulation active:scale-[0.97]"
              >
                {learn ? 'Next test' : 'Done'} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Learn: the ordered list. Otherwise: the reading log. */}
          <div className={cn(SURFACE, 'overflow-hidden')}>
            <p className="border-b border-white/[0.08] px-4 py-2.5 text-[13.5px] font-bold text-white">
              {learn ? 'Tests on this circuit' : 'Reading log'}
            </p>
            {learn ? (
              <ol className="divide-y divide-white/[0.07]">
                {sortedTests.map((t, i) => {
                  const isDone = progress.completedTests.includes(t.id);
                  const isNext = !isDone && nextTest?.id === t.id;
                  const r = isDone ? readingFor(t) : undefined;
                  return (
                    <li
                      key={t.id}
                      className={cn(
                        'flex min-h-[44px] items-center gap-3 px-4 py-2',
                        isNext && 'bg-white/[0.06]'
                      )}
                    >
                      <span
                        className={cn(
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11.5px] font-bold',
                          isDone
                            ? 'bg-emerald-400 text-black'
                            : isNext
                              ? 'bg-elec-yellow text-black'
                              : 'border border-white/25 text-white'
                        )}
                      >
                        {isDone ? <Check className="h-3.5 w-3.5" /> : i + 1}
                      </span>
                      <span className="min-w-0 flex-1 text-[13px] leading-snug text-white">
                        {t.description}
                      </span>
                      <span className="shrink-0 font-mono text-[12px] font-semibold tabular-nums text-white">
                        {r ? (
                          <span className={r.compliant ? 'text-emerald-400' : 'text-red-400'}>
                            {r.displayValue} {r.unit}
                          </span>
                        ) : (
                          RANGE[t.dialPosition]
                        )}
                      </span>
                    </li>
                  );
                })}
              </ol>
            ) : progress.readings.length === 0 && !myFixes.length ? (
              <p className="px-4 py-3 text-[13px] text-white">
                Nothing yet. Every reading you take on this circuit appears here — you write it on
                the schedule.
              </p>
            ) : (
              <ol className="divide-y divide-white/[0.07]">
                {progress.readings.map((r) => {
                  const pt = circuit.testPoints.find((p) => p.id === r.testPointId);
                  const conn = connectionsFor(circuit, r.dialPosition).find(
                    (o) => o.value === (r.subTest ?? '')
                  );
                  return (
                    <li key={r.id} className="flex min-h-[44px] items-center gap-3 px-4 py-2">
                      <span className="shrink-0 rounded-md border border-white/[0.2] px-1.5 py-0.5 font-mono text-[11.5px] font-bold text-white">
                        {RANGE[r.dialPosition]}
                      </span>
                      <span className="min-w-0 flex-1 text-[13px] leading-snug text-white">
                        {pt?.label}
                        {conn ? ` · ${conn.label}` : ''}
                        {r.stale && (
                          <span className="block text-[12px] font-semibold">
                            Before the repair — take it again
                          </span>
                        )}
                      </span>
                      <span
                        className={cn(
                          'shrink-0 font-mono text-[13px] font-semibold tabular-nums text-white',
                          r.stale && 'line-through'
                        )}
                      >
                        {r.displayValue} {r.unit}
                      </span>
                    </li>
                  );
                })}
              </ol>
            )}
            {!learn && myFixes.length > 0 && (
              <div className="border-t border-white/[0.08] px-4 py-2.5">
                <p className="text-[12.5px] font-bold text-white">Repairs on this circuit</p>
                <ul className="mt-1 space-y-1">
                  {myFixes.map((f) => (
                    <li key={f.at} className="text-[13px] leading-snug text-white">
                      {FIX_OPTIONS.find((o) => o.id === f.optionId)?.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Putting a fault right (Reg 644.1.1), then retesting (643.1) */}
      <Sheet open={fixOpen} onOpenChange={setFixOpen}>
        <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-2xl p-0">
          <div className="space-y-4 bg-[hsl(0_0%_13%)] p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6">
            <div>
              <SheetTitle className="text-[18px] font-bold text-white">
                Put something right on circuit {circuit.id}
              </SheetTitle>
              <SheetDescription className="text-[13px] text-white">
                {assessment
                  ? 'Choose what you’ll do.'
                  : 'Choose the repair the readings point to. Afterwards, repeat the test that failed and any earlier test the fault could have affected (Reg 643.1).'}
              </SheetDescription>
            </div>
            {fixDone ? (
              <>
                <p className="rounded-xl border border-white/[0.18] px-4 py-3 text-[14px] text-white">
                  Done: {fixDone}.{' '}
                  {assessment ? '' : 'Now retest what the repair could have affected.'}
                </p>
                <button
                  type="button"
                  onClick={() => setFixOpen(false)}
                  className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-bold text-black touch-manipulation"
                >
                  Back to the circuit
                </button>
              </>
            ) : energised ? (
              <>
                <p className="text-[14px] text-white">
                  The board is energised. Repairs are done with it isolated.
                </p>
                <button
                  type="button"
                  onClick={() => onDeenergise?.()}
                  className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-bold text-black touch-manipulation"
                >
                  Isolate the board
                </button>
              </>
            ) : (
              <div className="grid gap-2">
                {fixOptionsFor(circuit).map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => {
                      onRectify?.(circuit.id, o.id);
                      setFixDone(o.label.charAt(0).toLowerCase() + o.label.slice(1));
                    }}
                    className="flex min-h-[52px] w-full items-center rounded-xl border border-white/[0.16] px-4 py-2 text-left text-[14px] font-medium text-white touch-manipulation hover:border-elec-yellow"
                  >
                    {o.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setFixOpen(false)}
                  className="min-h-[44px] rounded-xl border border-white/[0.18] px-4 text-left text-[13.5px] font-semibold text-white touch-manipulation"
                >
                  Not now
                </button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function GuideToggle({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl px-3.5 text-[13px] font-semibold touch-manipulation',
        open
          ? 'bg-elec-yellow text-black'
          : 'border border-white/[0.18] text-white hover:border-white/[0.35]'
      )}
    >
      {open ? <X className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
      {open ? 'Close' : 'How to do it'}
    </button>
  );
}
