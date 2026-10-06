/**
 * AM2RigOverview — Section B home: the rig and the schedule side by side.
 *
 * Rebuilt 5 Oct 2026 (Andrew: "yellow card needs to be redesigned… other cards
 * need to be better"). The schedule was a solid-yellow eighth card that said
 * nothing about the schedule; it is now a panel that shows it — one row per
 * circuit, one square per box you have to fill, coloured by what is in it.
 * Circuit cards carry what you would read off the board and the next test due,
 * rather than a progress bar alone.
 */

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { containerVariants } from '@/components/college/primitives';
import { CARD_BASE, CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubSectionHeading } from '@/components/hub/HubPrimitives';
import {
  CircleDot,
  Zap,
  Lightbulb,
  Settings,
  Bell,
  Server,
  Droplets,
  Check,
  ChevronRight,
  FileText,
  Eye,
  Link2,
  Gauge,
  ToggleRight,
} from 'lucide-react';
import { AM2_RIG_CIRCUITS, measuredZsMax } from '@/data/am2RigCircuits';
import { useEICSchedule, type CellStatus } from '@/hooks/am2/useEICSchedule';
import { Fragment, useEffect, useState } from 'react';
import { MODES, deadDoneOn, nextTestFor, type SimMode } from '@/data/am2/sectionBRules';
import { INSPECTION_ITEMS } from '@/data/am2/sectionBInspection';
import { BONDS } from '@/data/am2/sectionBBonding';
import { FUNC_ITEMS } from '@/data/am2/sectionBFunctional';

/** Readings at the origin: Ze, PSCC, PEFC and two phase sequence checks. */
const ORIGIN_READINGS = 5;
import type {
  AM2RigCircuit,
  CircuitProgress,
  EICScheduleState,
} from '@/types/am2-testing-simulator';

interface AM2RigOverviewProps {
  circuitProgress: Record<number, CircuitProgress>;
  overallProgress: number;
  eic: EICScheduleState;
  mode: SimMode | null;
  energised: boolean;
  deadDone: boolean;
  sessionStartTime: number;
  /** When this run was saved, if it was brought back after the page closed. */
  resumedAt?: number | null;
  inspectionDone: boolean;
  inspectionJudged: number;
  onOpenInspection: () => void;
  bondingDone: boolean;
  bondingTested: number;
  onOpenBonding: () => void;
  /** Readings taken at the origin (of 5). */
  originTaken: number;
  /** The main earthing conductor is off the MET (for the Ze test). */
  earthOff: boolean;
  onOpenOrigin: () => void;
  functionalChecked: number;
  onOpenFunctional: () => void;
  /** Isolate the board again — for a repair or a dead test to repeat. */
  onDeenergise: () => void;
  /** Assessment: switching on before every dead test is done — the assessor stops it. */
  onEarlyEnergise: () => void;
  /** Leave this mode without finishing the run. */
  onChangeMode: () => void;
  /** Mock day: one go — no Start again, no Change mode. */
  locked?: boolean;
  onStartMode: (mode: SimMode) => void;
  onEnergise: () => void;
  onSelectCircuit: (circuitId: number) => void;
  onOpenSchedule: () => void;
}

/** Section B on the day: about 3½ hours. Pace is judged against it. */
const SECTION_B_SECONDS = 210 * 60;

/** The time now, ticking each second while `on`. */
function useNow(on: boolean) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!on) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [on]);
  return now;
}

function clock(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${h > 0 ? `${h}:` : ''}${String(m).padStart(h > 0 ? 2 : 1, '0')}:${String(s % 60).padStart(2, '0')}`;
}

const CIRCUIT_ICONS: Record<number, typeof Zap> = {
  1: CircleDot,
  2: Zap,
  3: Lightbulb,
  4: Settings,
  5: Bell,
  6: Server,
  7: Droplets,
};

/** What protects the circuit, as it reads on the board. */
function protection(c: AM2RigCircuit): string {
  const device = `${c.mcbRating} A Type ${c.mcbType}`;
  if (!c.hasRcd) return `${device} MCB`;
  if (c.rcdBsStandard === 'BS EN 61009') return `${device} RCBO · ${c.rcdRating} mA`;
  return `${device} MCB · ${c.rcdRating} mA RCD`;
}

function cable(c: AM2RigCircuit): string {
  const cpc = /^[\d.]+$/.test(c.cpcMm2) ? `${c.cpcMm2} mm² cpc` : `${c.cpcMm2.toLowerCase()} cpc`;
  return `${c.cableType} · ${cpc}`;
}

/** BS 7671 Section 643, in the book's order. 643.2–643.6 are done dead and in
 *  that order (643.1); the rest are live. */
const TEST_ORDER = [
  { name: 'Continuity of conductors', reg: '643.2', live: false },
  { name: 'Insulation resistance', reg: '643.3', live: false },
  { name: 'Polarity', reg: '643.6', live: false },
  { name: 'Earth fault loop impedance and PFC', reg: '643.7.3', live: true },
  { name: 'Additional protection (RCD)', reg: '643.8', live: true },
  { name: 'Phase sequence', reg: '643.9', live: true },
  { name: 'Functional testing', reg: '643.10', live: true },
];

const SQUARE: Record<CellStatus, string> = {
  filled: 'bg-emerald-400 border-emerald-400',
  failed: 'bg-red-500 border-red-500',
  empty: 'bg-transparent border-white/[0.28]',
};

export function AM2RigOverview({
  circuitProgress,
  overallProgress,
  eic,
  mode,
  energised,
  deadDone,
  sessionStartTime,
  resumedAt,
  inspectionDone,
  inspectionJudged,
  onOpenInspection,
  bondingDone,
  bondingTested,
  onOpenBonding,
  originTaken,
  earthOff,
  onOpenOrigin,
  functionalChecked,
  onOpenFunctional,
  onDeenergise,
  onEarlyEnergise,
  onChangeMode,
  locked = false,
  onStartMode,
  onEnergise,
  onSelectCircuit,
  onOpenSchedule,
}: AM2RigOverviewProps) {
  const learn = mode === 'learn';
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmChange, setConfirmChange] = useState(false);
  const [checks, setChecks] = useState<boolean[]>([false, false, false]);
  // iOS doesn't blur a tapped button, so the armed reset also disarms itself.
  useEffect(() => {
    if (!confirmReset && !confirmChange) return;
    const t = setTimeout(() => {
      setConfirmReset(false);
      setConfirmChange(false);
    }, 4000);
    return () => clearTimeout(t);
  }, [confirmReset, confirmChange]);
  const { validations } = useEICSchedule(eic);

  const rows = AM2_RIG_CIRCUITS.map((c) => {
    const p = circuitProgress[c.id];
    const completed = p?.completedTests ?? [];
    const total = p?.totalTests || c.requiredTests.length;
    const next = nextTestFor(c, completed, energised);
    const waiting = !next && completed.length < total && deadDoneOn(c, completed);
    return { c, done: completed.length, total, next, waiting, taken: p?.readings.length ?? 0 };
  });
  const doneTests = rows.reduce((n, r) => n + r.done, 0);
  const totalTests = rows.reduce((n, r) => n + r.total, 0);

  const boxesFilled = validations.reduce((n, v) => n + v.filledCount, 0);
  const boxesTotal = validations.reduce((n, v) => n + v.totalCount, 0);
  // Assessment: no pass/fail on readings anywhere — the learner judges them.
  const failedBoxes =
    mode === 'assessment'
      ? 0
      : validations.reduce(
          (n, v) => n + Object.values(v.columnStatuses).filter((s) => s === 'failed').length,
          0
        );
  const allTested = doneTests >= totalTests;

  // Assessment gives nothing away: no count of tests matched, no "done",
  // no limits, no prompt for what comes next — only the readings you've taken
  // and the time.
  const assess = mode === 'assessment';
  const readingsTaken = Object.values(circuitProgress).reduce((n, p) => n + p.readings.length, 0);

  // Pace against the day: where you'd be by now if the work were spread
  // evenly over 3½ hours. The inspection counts as work (half a test a check)
  // and so does the bonding, so inspecting first doesn't put you "behind".
  // Not in Learn — it isn't timed.
  const timed = !!mode && !learn;
  const now = useNow(timed);
  const elapsed = (now - sessionStartTime) / 1000;
  const shouldBe = Math.min(100, (elapsed / SECTION_B_SECONDS) * 100);
  const workDone =
    doneTests + inspectionJudged * 0.5 + bondingTested + originTaken + functionalChecked;
  const workTotal =
    totalTests + INSPECTION_ITEMS.length * 0.5 + BONDS.length + ORIGIN_READINGS + FUNC_ITEMS.length;
  const aheadMin = Math.round(
    ((workDone - (workTotal * elapsed) / SECTION_B_SECONDS) * (SECTION_B_SECONDS / workTotal)) / 60
  );
  const minutesLeft = Math.max(0, Math.ceil((SECTION_B_SECONDS - elapsed) / 60));
  const [showEnergise, setShowEnergise] = useState(false);
  const [earlyTried, setEarlyTried] = useState(false);
  const [earthStop, setEarthStop] = useState(false);
  const [confirmIsolate, setConfirmIsolate] = useState(false);
  useEffect(() => {
    if (!earthOff) setEarthStop(false);
  }, [earthOff]);
  // iOS doesn't blur a tapped button, so the armed isolate disarms itself too.
  useEffect(() => {
    if (!confirmIsolate) return;
    const t = setTimeout(() => setConfirmIsolate(false), 4000);
    return () => clearTimeout(t);
  }, [confirmIsolate]);
  // Refused once, the switch stays off until more testing has been done — so
  // repeated taps aren't repeated mistakes, and nothing says when it's time.
  useEffect(() => setEarlyTried(false), [readingsTaken]);
  const pace = allTested
    ? { text: 'Every test done', tone: 'text-white' }
    : elapsed > SECTION_B_SECONDS
      ? { text: 'Over the 3½ hours', tone: 'text-white' }
      : aheadMin <= -3
        ? { text: `${-aheadMin} min behind`, tone: 'text-white' }
        : aheadMin >= 3
          ? { text: `${aheadMin} min ahead`, tone: 'text-white' }
          : { text: 'On pace', tone: 'text-white' };
  // The circuit you were on, else the first one with a test it can take now.
  const resume = rows.find((r) => r.next && r.done > 0) ?? rows.find((r) => r.next);
  const readyToEnergise = !!mode && deadDone && !energised;
  // Learn and Practise point you at the inspection first; Assessment leaves the
  // order to you (Reg 642.1 is part of what's assessed).
  const inspectNext = !!mode && !inspectionDone && mode !== 'assessment' && doneTests === 0;
  // …then the main bonding (a dead test), first or once the circuits' dead
  // tests are done — the board can't go live without it.
  const bondNext =
    !!mode && !assess && !inspectNext && !bondingDone && !energised && (doneTests === 0 || !resume);
  // …Ze is taken with the installation isolated, so the origin comes before
  // the board goes live; the motor's phase sequence and the functional checks
  // once it is.
  const originNext =
    !!mode && !assess && !inspectNext && !bondNext && !energised && originTaken === 0;
  const liveStationNext =
    !!mode && !assess && energised && !resume
      ? originTaken < ORIGIN_READINGS
        ? 'origin'
        : functionalChecked < FUNC_ITEMS.length
          ? 'functional'
          : null
      : null;

  // Two-tap reset. Under the progress on a wide screen, under the button on a phone.
  const startAgain = (className: string) =>
    !locked && (
      <button
        type="button"
        onClick={() => {
          if (confirmReset) {
            setConfirmReset(false);
            setChecks([false, false, false]);
            setShowEnergise(false);
            setEarlyTried(false);
            if (mode) onStartMode(mode);
          } else setConfirmReset(true);
        }}
        onBlur={() => setConfirmReset(false)}
        className={cn(
          'mt-1 inline-flex h-11 items-center rounded-xl border border-white/[0.18] px-3.5 text-[12.5px] font-semibold text-white touch-manipulation',
          className
        )}
      >
        {confirmReset ? 'Tap again to clear this run' : 'Start again'}
      </button>
    );

  // Out of this mode altogether, back to the choice — without finishing (and
  // so without saving) a run you didn't mean to start.
  const changeMode = (className: string) =>
    !locked && (
      <button
        type="button"
        onClick={() => {
          if (confirmChange) {
            setConfirmChange(false);
            setChecks([false, false, false]);
            setShowEnergise(false);
            setEarlyTried(false);
            onChangeMode();
          } else setConfirmChange(true);
        }}
        onBlur={() => setConfirmChange(false)}
        className={cn(
          'mt-1 inline-flex h-11 items-center rounded-xl border border-white/[0.18] px-3.5 text-[12.5px] font-semibold text-white touch-manipulation',
          className
        )}
      >
        {confirmChange ? 'Tap again — this run is cleared' : 'Change mode'}
      </button>
    );

  // The inspection (Reg 642.1) and the main bonding, as rig rows.
  const stations = (
    <>
      {/* The inspection comes first (Reg 642.1) */}
      <li>
        <button
          type="button"
          onClick={onOpenInspection}
          disabled={mode === null}
          className="group flex w-full items-center gap-3 px-4 py-3.5 text-left touch-manipulation transition-colors hover:bg-white/[0.04] active:bg-white/[0.06] disabled:pointer-events-none lg:gap-4 lg:px-5 lg:py-4"
        >
          <span
            className={cn(
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border',
              inspectionDone
                ? 'border-emerald-400 bg-emerald-400'
                : 'border-white/[0.18] bg-white/[0.08]'
            )}
          >
            {inspectionDone ? (
              <Check className="h-5 w-5 text-black" />
            ) : (
              <Eye className="h-5 w-5 text-white" />
            )}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[15.5px] font-semibold leading-tight text-white">
              Visual inspection
            </span>
            <span className="mt-1 block text-[12.5px] leading-snug text-white">
              The board, accessories, joints, labels, bonding and fire seals
              {!assess && ' — before any test, normally with the supply off (Reg 642.1)'}
            </span>
          </span>
          <span className="hidden w-36 shrink-0 sm:block">
            <span className={cn('block text-[12px] font-semibold', 'text-white')}>
              {inspectionDone ? 'Done' : inspectionJudged ? 'In progress' : 'Not started'}
            </span>
            <span className="mt-1 block font-mono text-[12.5px] font-semibold tabular-nums text-white">
              {inspectionJudged}/{INSPECTION_ITEMS.length} checks
            </span>
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5" />
        </button>
      </li>

      {/* Main bonding continuity — a dead test (Reg 643.2.1) */}
      <li>
        <button
          type="button"
          onClick={onOpenBonding}
          disabled={mode === null}
          className="group flex w-full items-center gap-3 px-4 py-3.5 text-left touch-manipulation transition-colors hover:bg-white/[0.04] active:bg-white/[0.06] disabled:pointer-events-none lg:gap-4 lg:px-5 lg:py-4"
        >
          <span
            className={cn(
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border',
              bondingDone
                ? 'border-emerald-400 bg-emerald-400'
                : 'border-white/[0.18] bg-white/[0.08]'
            )}
          >
            {bondingDone ? (
              <Check className="h-5 w-5 text-black" />
            ) : (
              <Link2 className="h-5 w-5 text-white" />
            )}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[15.5px] font-semibold leading-tight text-white">
              Protective bonding
            </span>
            <span className="mt-1 block text-[12.5px] leading-snug text-white">
              Main bonding to the water and gas pipes, and the supplementary bond at the shower
              {!assess && ' — a dead test (Reg 643.2.1)'}
            </span>
          </span>
          <span className="hidden w-36 shrink-0 sm:block">
            <span className={cn('block text-[12px] font-semibold', 'text-white')}>
              {bondingDone ? 'Done' : bondingTested ? 'In progress' : 'Not started'}
            </span>
            <span className="mt-1 block font-mono text-[12.5px] font-semibold tabular-nums text-white">
              {bondingTested}/{BONDS.length} bonds
            </span>
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5" />
        </button>
      </li>

      {/* The origin: Ze, PSCC/PEFC, phase sequence (Regs 643.7.3, 643.9) */}
      {[
        {
          key: 'origin',
          onClick: onOpenOrigin,
          Icon: Gauge,
          title: 'The origin',
          body: 'Ze, prospective fault current and phase sequence',
          reg: ' — Regs 643.7.3, 643.9',
          count: `${originTaken}/${ORIGIN_READINGS} readings`,
          started: originTaken > 0,
          done: !assess && originTaken >= ORIGIN_READINGS,
        },
        {
          key: 'functional',
          onClick: onOpenFunctional,
          Icon: ToggleRight,
          title: 'Functional testing',
          body: 'Switches, isolator, starter and controls work as intended',
          reg: ' — live, Reg 643.10',
          count: `${functionalChecked}/${FUNC_ITEMS.length} checked`,
          started: functionalChecked > 0,
          done: !assess && functionalChecked >= FUNC_ITEMS.length,
        },
      ].map((st) => (
        <li key={st.key}>
          <button
            type="button"
            onClick={st.onClick}
            disabled={mode === null}
            className="group flex w-full items-center gap-3 px-4 py-3.5 text-left touch-manipulation transition-colors hover:bg-white/[0.04] active:bg-white/[0.06] disabled:pointer-events-none lg:gap-4 lg:px-5 lg:py-4"
          >
            <span
              className={cn(
                'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border',
                st.done
                  ? 'border-emerald-400 bg-emerald-400'
                  : 'border-white/[0.18] bg-white/[0.08]'
              )}
            >
              {st.done ? (
                <Check className="h-5 w-5 text-black" />
              ) : (
                <st.Icon className="h-5 w-5 text-white" />
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15.5px] font-semibold leading-tight text-white">
                {st.title}
              </span>
              <span className="mt-1 block text-[12.5px] leading-snug text-white">
                {st.body}
                {!assess && st.reg}
              </span>
            </span>
            <span className="hidden w-36 shrink-0 sm:block">
              <span className="block text-[12px] font-semibold text-white">
                {st.done ? 'Done' : st.started ? 'In progress' : 'Not started'}
              </span>
              <span className="mt-1 block font-mono text-[12.5px] font-semibold tabular-nums text-white">
                {st.count}
              </span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5" />
          </button>
        </li>
      ))}
    </>
  );

  // The immersive frame is overflow-hidden, so this page scrolls itself —
  // without it circuits 5–7 sat below the fold out of reach.
  return (
    <div className="h-full overflow-y-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-[1400px] space-y-6 px-4 pb-12 pt-5 sm:px-6 lg:space-y-8 lg:px-10 lg:pt-8"
      >
        {/* Heading */}
        <header className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div>
            <p className="text-[12px] font-semibold text-white">
              Section B · about 3½ hours on the day
            </p>
            <h1 className="mt-1 text-[28px] font-bold leading-tight tracking-tight text-white lg:text-[34px]">
              Inspection and testing
            </h1>
          </div>
          <p className="max-w-xl text-[14px] leading-relaxed text-white lg:pb-1 lg:text-right">
            Seven circuits on the rig, the inspection, the bonding, the origin and the functional
            checks.
            {mode !== 'assessment' &&
              ' All the dead tests first, then energise the board for the live tests.'}{' '}
            Practice bar: 80% or better.
          </p>
        </header>

        {mode === null ? (
          /* Pick how to work before anything else */
          <section className="space-y-3">
            <HubSectionHeading>How do you want to work?</HubSectionHeading>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {(['learn', 'practise', 'assessment'] as SimMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => onStartMode(m)}
                  className={cn(
                    CARD_BASE,
                    m === 'practise' ? 'border-elec-yellow' : 'border-elec-yellow/35',
                    CARD_SURFACE,
                    'p-4 hover:border-elec-yellow lg:p-5'
                  )}
                >
                  <span className="flex items-center justify-between">
                    <span className="text-[17px] font-bold text-white">{MODES[m].label}</span>
                    <ChevronRight className="h-4 w-4 text-white" />
                  </span>
                  <span className="mt-1 text-[13px] leading-snug text-white">{MODES[m].blurb}</span>
                  <span className="mt-3 space-y-1">
                    {MODES[m].points.map((pt) => (
                      <span key={pt} className="flex gap-1.5 text-[12.5px] leading-snug text-white">
                        <Check className="mt-[2px] h-3 w-3 shrink-0 text-emerald-400" />
                        {pt}
                      </span>
                    ))}
                  </span>
                </button>
              ))}
            </div>
          </section>
        ) : (
          /* Where you are and the one thing to do next, in one bar */
          <section
            className={cn(
              'flex flex-col gap-4 rounded-2xl border border-elec-yellow/35 p-4 lg:flex-row lg:items-center lg:gap-6 lg:p-5',
              CARD_SURFACE
            )}
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <p className="flex items-center gap-2 text-[13px] font-semibold text-white">
                  <span className="rounded-md bg-elec-yellow px-2 py-0.5 text-[12px] font-bold text-black">
                    {MODES[mode].label}
                  </span>
                  {energised ? 'Board energised' : 'Board dead'}
                </p>
                <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-semibold tabular-nums text-white">
                  {timed && (
                    <span>
                      <span className="font-mono">{clock(elapsed)}</span>
                      <span className="font-medium"> of 3:30:00</span>
                    </span>
                  )}
                  {timed && !assess && <span className={pace.tone}>{pace.text}</span>}
                  {assess ? (
                    <span>
                      {minutesLeft} min left · {readingsTaken} reading
                      {readingsTaken === 1 ? '' : 's'} taken
                    </span>
                  ) : (
                    <span>
                      {doneTests} of {totalTests} tests
                    </span>
                  )}
                </p>
              </div>
              {resumedAt && (
                <p className="mt-2 text-[12.5px] font-medium text-white">
                  Picked up where you left off — saved{' '}
                  {new Date(resumedAt).toLocaleString('en-GB', {
                    weekday: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  . The clock carries on from the time you’d spent.
                </p>
              )}
              <div className="relative mt-3">
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.1]">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all',
                      assess ? 'bg-white' : allTested ? 'bg-emerald-400' : 'bg-elec-yellow'
                    )}
                    style={{ width: `${assess ? shouldBe : overallProgress}%` }}
                  />
                </div>
                {/* Where you'd be by now at an even pace over 3½ hours */}
                {timed && !assess && !allTested && (
                  <span
                    className="absolute -top-1 h-4 w-0.5 rounded-full bg-white"
                    style={{ left: `calc(${shouldBe}% - 1px)` }}
                    title="Where you’d be by now at an even pace"
                    aria-hidden
                  />
                )}
              </div>
              {timed && (assess || !allTested) && (
                <p className="mt-1.5 text-[11.5px] text-white">
                  {assess
                    ? 'The line fills as you use the 3½ hours.'
                    : 'The white mark is where you’d be by now if the work were spread evenly over the 3½ hours.'}
                </p>
              )}
              <div className="hidden gap-2 lg:flex">
                {startAgain('')}
                {changeMode('')}
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                assess
                  ? document
                      .getElementById('rig')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  : inspectNext
                    ? onOpenInspection()
                    : bondNext
                      ? onOpenBonding()
                      : originNext
                        ? onOpenOrigin()
                        : liveStationNext === 'origin'
                          ? onOpenOrigin()
                          : liveStationNext === 'functional'
                            ? onOpenFunctional()
                            : resume
                              ? onSelectCircuit(resume.c.id)
                              : readyToEnergise
                                ? document
                                    .getElementById('energise')
                                    ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                                : onOpenSchedule()
              }
              className="flex min-h-[60px] w-full items-center gap-3 rounded-xl bg-elec-yellow px-4 py-2.5 text-left text-black touch-manipulation active:scale-[0.99] lg:w-[420px] lg:shrink-0"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[15.5px] font-bold leading-tight">
                  {assess
                    ? readingsTaken || inspectionJudged
                      ? 'Carry on — the rig is below'
                      : 'Start where you choose'
                    : inspectNext
                      ? inspectionJudged
                        ? 'Carry on with the visual inspection'
                        : 'Start with the visual inspection'
                      : bondNext
                        ? 'Test the bonding'
                        : originNext
                          ? 'Ze and fault current at the origin'
                          : liveStationNext === 'origin'
                            ? 'Phase sequence at the motor'
                            : liveStationNext === 'functional'
                              ? 'Functional testing'
                              : resume
                                ? `${doneTests === 0 ? 'Start with' : 'Carry on with'} circuit ${resume.c.id} — ${resume.c.name.toLowerCase()}`
                                : readyToEnergise
                                  ? 'Energise the board'
                                  : learn
                                    ? 'Check the schedule and finish'
                                    : 'Fill in the schedule and finish'}
                </span>
                <span className="mt-0.5 block truncate text-[12.5px] font-semibold">
                  {assess
                    ? 'In the order you’d work on the day — nobody will prompt you'
                    : inspectNext
                      ? `${inspectionJudged} of ${INSPECTION_ITEMS.length} judged — inspect before you test (Reg 642.1)`
                      : bondNext
                        ? 'Main and supplementary bonding continuity — a dead test'
                        : originNext
                          ? 'With the installation isolated — Ze first'
                          : liveStationNext === 'origin'
                            ? 'Now the board is live (Reg 643.9)'
                            : liveStationNext === 'functional'
                              ? 'Operate each switch and control (Reg 643.10)'
                              : resume
                                ? learn && resume.next
                                  ? `Next: ${resume.next.description}`
                                  : `${resume.total - resume.done} test${resume.total - resume.done === 1 ? '' : 's'} left on this circuit`
                                : readyToEnergise
                                  ? 'Every dead test is done — the live tests come next'
                                  : 'Every test is done'}
                </span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0" />
            </button>
            <div className="-mt-2 flex gap-2 lg:hidden">
              {startAgain('')}
              {changeMode('')}
            </div>
          </section>
        )}

        {/* Assessment: switching on is your call — no panel appears to tell you
            the dead tests are done. */}
        {assess && !energised && !showEnergise && (
          <button
            type="button"
            onClick={() => setShowEnergise(true)}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.22] px-4 text-[14px] font-semibold text-white touch-manipulation"
          >
            <Zap className="h-4 w-4" /> Energise the board…
          </button>
        )}

        {/* Switching on — a deliberate step, not a side effect */}
        {((readyToEnergise && !assess) || (assess && !energised && showEnergise)) && (
          <div id="energise" className="rounded-2xl border-2 border-elec-yellow p-4 lg:p-5">
            <p className="text-[17px] font-bold text-white">
              {assess ? 'Energise the board?' : 'Every dead test is done. Energise the board?'}
            </p>
            <p className="mt-1 max-w-3xl text-[13.5px] text-white">
              {assess
                ? 'Live tests need the supply on.'
                : 'The live tests — Zs, RCD, the phase sequence at the motor and the functional checks — need the supply on.'}
              {!assess && ' Regulation 643.1 puts the dead tests first.'} Before you switch on:
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {[
                'Dead test results written on the schedule',
                'Links and test leads removed, covers back on',
                'Everyone near the rig knows it’s going live',
              ].map((label, i) => (
                <button
                  key={label}
                  type="button"
                  aria-pressed={checks[i]}
                  onClick={() => setChecks((c) => c.map((v, j) => (j === i ? !v : v)))}
                  className={cn(
                    'flex min-h-[48px] items-center gap-2.5 rounded-xl border px-3 py-2 text-left text-[13.5px] font-medium text-white touch-manipulation',
                    checks[i] ? 'border-emerald-400' : 'border-white/[0.2]'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border',
                      checks[i] ? 'border-emerald-400 bg-emerald-400' : 'border-white/[0.4]'
                    )}
                  >
                    {checks[i] && <Check className="h-3.5 w-3.5 text-black" />}
                  </span>
                  {label}
                </button>
              ))}
            </div>
            {earthOff && !assess && (
              <p className="mt-3 rounded-xl border border-red-400 px-3 py-2 text-[13.5px] font-semibold text-white">
                The main earthing conductor is still off the MET — reconnect it at the origin first.
              </p>
            )}
            <button
              type="button"
              disabled={!checks.every(Boolean) || earlyTried || earthStop || (earthOff && !assess)}
              onClick={() => {
                if (earthOff) {
                  // The assessor stops you: no earth.
                  setEarthStop(true);
                  return onEnergise();
                }
                if (!assess || deadDone) return onEnergise();
                // The assessor wouldn't let you go live early.
                setEarlyTried(true);
                onEarlyEnergise();
              }}
              className="mt-3 inline-flex h-12 items-center gap-2 rounded-xl bg-elec-yellow px-6 text-[15px] font-bold text-black touch-manipulation disabled:bg-white/[0.12] disabled:text-white"
            >
              Switch the supply on
            </button>
            {assess && (
              <button
                type="button"
                onClick={() => {
                  setShowEnergise(false);
                }}
                className="ml-2 mt-3 inline-flex h-12 items-center rounded-xl border border-white/[0.22] px-5 text-[14px] font-semibold text-white touch-manipulation"
              >
                Not yet
              </button>
            )}
            {earlyTried && (
              <p className="mt-3 text-[13.5px] font-semibold text-white">
                The assessor stops you: not every dead test is done. The board stays dead.
              </p>
            )}
            {earthStop && (
              <p className="mt-3 text-[13.5px] font-semibold text-white">
                The assessor stops you: the main earthing conductor is off. The board stays dead.
              </p>
            )}
          </div>
        )}

        {/* Energised: isolate again for a repair or a dead test to repeat */}
        {!!mode && energised && (
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (confirmIsolate) {
                  setConfirmIsolate(false);
                  setChecks([false, false, false]);
                  setShowEnergise(false);
                  onDeenergise();
                } else setConfirmIsolate(true);
              }}
              onBlur={() => setConfirmIsolate(false)}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.22] px-4 text-[14px] font-semibold text-white touch-manipulation"
            >
              {confirmIsolate ? 'Tap again to isolate the board' : 'Isolate the board'}
            </button>
            {!assess && (
              <p className="text-[12.5px] text-white">
                For a repair, or a dead test you need to repeat. Re-energise once the dead tests are
                done again.
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-8">
          <div className="space-y-6">
            {/* The rig — one list, one row per circuit, so it reads like the board */}
            <section id="rig" className="scroll-mt-4 space-y-3">
              <HubSectionHeading>The rig</HubSectionHeading>
              <ul
                className={cn(
                  '-mx-4 divide-y divide-white/[0.08] overflow-hidden border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x',
                  CARD_SURFACE
                )}
              >
                {!assess && stations}

                {rows.map(({ c, done, total, next, waiting, taken }) => {
                  const Icon = CIRCUIT_ICONS[c.id] || Zap;
                  // Assessment: readings taken, never tests matched or "done".
                  const complete = !assess && done >= total;
                  const started = assess ? taken > 0 : done > 0;
                  const note =
                    mode === null || assess
                      ? null
                      : complete
                        ? null
                        : waiting
                          ? 'Dead tests done — live tests once the board is energised'
                          : learn && next
                            ? `Next: ${next.description}`
                            : null;
                  const progress = assess ? (
                    <span className="block font-mono text-[12.5px] font-semibold tabular-nums text-white">
                      {taken} reading{taken === 1 ? '' : 's'}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2.5">
                      <span className="flex flex-1 gap-[3px]" aria-hidden>
                        {Array.from({ length: total }).map((_, i) => (
                          <span
                            key={i}
                            className={cn(
                              'h-1.5 flex-1 rounded-full',
                              i < done
                                ? complete
                                  ? 'bg-emerald-400'
                                  : 'bg-elec-yellow'
                                : 'bg-white/[0.14]'
                            )}
                          />
                        ))}
                      </span>
                      <span className="w-10 shrink-0 text-right font-mono text-[12.5px] font-semibold tabular-nums text-white">
                        {done}/{total}
                      </span>
                    </span>
                  );
                  return (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => onSelectCircuit(c.id)}
                        disabled={mode === null}
                        className="group flex w-full items-center gap-3 px-4 py-3.5 text-left touch-manipulation transition-colors hover:bg-white/[0.04] active:bg-white/[0.06] disabled:pointer-events-none lg:gap-4 lg:px-5 lg:py-4"
                      >
                        <span
                          className={cn(
                            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border',
                            complete
                              ? 'border-emerald-400 bg-emerald-400'
                              : 'border-white/[0.18] bg-white/[0.08]'
                          )}
                        >
                          {complete ? (
                            <Check className="h-5 w-5 text-black" />
                          ) : (
                            <Icon className="h-5 w-5 text-white" />
                          )}
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="flex items-baseline gap-2">
                            <span className="font-mono text-[12px] font-semibold text-white">
                              {c.id}
                            </span>
                            <span className="truncate text-[15.5px] font-semibold leading-tight text-white">
                              {c.name}
                            </span>
                          </span>
                          {/* What's on the board, as you'd read it */}
                          <span className="mt-1 block text-[12.5px] leading-snug text-white">
                            {/* Each spec stays whole, so a wrap falls between them */}
                            {[
                              protection(c),
                              cable(c),
                              // Working the limit out is part of the assessment.
                              assess ? '' : `measured Zs ≤ ${measuredZsMax(c).toFixed(2)} Ω`,
                            ]
                              .filter(Boolean)
                              .map((t, i) => (
                                <Fragment key={t}>
                                  {i > 0 && ' · '}
                                  <span className="whitespace-nowrap">{t}</span>
                                </Fragment>
                              ))}
                          </span>
                          {note && (
                            <span className="mt-1 block truncate text-[12.5px] font-semibold text-white">
                              {note}
                            </span>
                          )}
                          {/* Phone: progress under the specs */}
                          <span className="mt-2.5 block sm:hidden">{progress}</span>
                        </span>

                        {/* Tablet up: progress in its own column, so the rows line up */}
                        <span className="hidden w-36 shrink-0 sm:block">
                          <span
                            className={cn('mb-1.5 block text-[12px] font-semibold', 'text-white')}
                          >
                            {complete
                              ? 'Done'
                              : started
                                ? assess
                                  ? 'Started'
                                  : 'In progress'
                                : 'Not started'}
                          </span>
                          {progress}
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </li>
                  );
                })}
                {/* Assessment: no order implied — inspection and bonding after the circuits */}
                {assess && stations}
              </ul>
            </section>
            {/* The order the book puts the tests in (Regulation 643.1). Hidden in
                Assessment — no help on the day. */}
            {mode !== 'assessment' && (
              <section className="space-y-3">
                <HubSectionHeading>Test order</HubSectionHeading>
                <div
                  className={cn('rounded-2xl border border-white/[0.14] p-4 lg:p-5', CARD_SURFACE)}
                >
                  <p className="text-[12.5px] leading-snug text-white">
                    Regulation 643.1: the dead tests, in this order, before you switch on.
                  </p>
                  <ol className="mt-3 grid gap-x-8 gap-y-1.5 border-t border-white/[0.1] pt-3 md:grid-flow-col md:grid-rows-4">
                    {TEST_ORDER.map((t, i) => (
                      <li key={t.name} className="flex items-center gap-2.5 text-[13px] text-white">
                        <span
                          className={cn(
                            'flex h-5 w-5 shrink-0 items-center justify-center rounded-md font-mono text-[11px] font-bold',
                            t.live
                              ? 'border border-white/[0.3] text-white'
                              : 'bg-elec-yellow text-black'
                          )}
                        >
                          {i + 1}
                        </span>
                        <span className="min-w-0 flex-1">{t.name}</span>
                        <span className="shrink-0 font-mono text-[11.5px] text-white">{t.reg}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-3 flex items-center gap-2 text-[12px] text-white">
                    <span className="h-3 w-3 rounded-[3px] bg-elec-yellow" /> Dead
                    <span className="ml-2 h-3 w-3 rounded-[3px] border border-white/[0.3]" /> Live
                  </p>
                </div>
              </section>
            )}
          </div>

          {/* Right rail: the schedule, kept in view while you scroll */}
          <aside className="space-y-6 lg:sticky lg:top-4">
            <section className="space-y-3">
              <HubSectionHeading>Schedule of test results</HubSectionHeading>
              <div
                className={cn(
                  'overflow-hidden rounded-2xl border border-elec-yellow/35',
                  CARD_SURFACE
                )}
              >
                <div className="flex items-start gap-3 px-4 pb-3 pt-4 lg:px-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.18] bg-white/[0.08]">
                    <FileText className="h-5 w-5 text-white" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[24px] font-bold leading-none tabular-nums text-white">
                      {boxesFilled}
                      <span className="text-[15px] font-semibold"> of {boxesTotal} boxes</span>
                    </p>
                    <p className="mt-1.5 text-[12.5px] leading-snug text-white">
                      {failedBoxes > 0
                        ? `${failedBoxes} reading${failedBoxes === 1 ? '' : 's'} outside the limit — check before you finish.`
                        : allTested && !assess
                          ? 'Every test done. Check the schedule, then finish for your result.'
                          : learn
                            ? 'Fills in from your readings as you test.'
                            : 'Write each reading in as you take it.'}
                    </p>
                  </div>
                </div>

                {/* One row per circuit, one square per box */}
                <ul className="divide-y divide-white/[0.07] border-y border-white/[0.08]">
                  {AM2_RIG_CIRCUITS.map((c) => {
                    const v = validations.find((x) => x.circuitId === c.id);
                    const cells = Object.values(v?.columnStatuses ?? {}) as CellStatus[];
                    return (
                      <li
                        key={c.id}
                        className="grid grid-cols-[1.25rem_minmax(0,1fr)_2.25rem] items-center gap-x-3 gap-y-1.5 px-4 py-2 lg:px-5"
                      >
                        <span className="font-mono text-[12px] font-semibold text-white">
                          {c.id}
                        </span>
                        <span className="min-w-0 truncate text-[13px] text-white">{c.name}</span>
                        {/* Eleven boxes a circuit: their own line, so the name isn't cut short */}
                        <span className="col-start-2 col-end-4 row-start-2 flex gap-1" aria-hidden>
                          {cells.map((s, i) => (
                            <span
                              key={i}
                              className={cn(
                                'h-3 w-3 rounded-[3px] border',
                                SQUARE[mode === 'assessment' && s === 'failed' ? 'filled' : s]
                              )}
                            />
                          ))}
                        </span>
                        <span className="text-right font-mono text-[12px] font-semibold tabular-nums text-white">
                          {v?.filledCount ?? 0}/{v?.totalCount ?? 0}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <div className="space-y-3 px-4 py-4 lg:px-5">
                  <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-white">
                    <span className="inline-flex items-center gap-1.5">
                      <span className={cn('h-3 w-3 rounded-[3px] border', SQUARE.filled)} /> Filled
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className={cn('h-3 w-3 rounded-[3px] border', SQUARE.empty)} /> To test
                    </span>
                    {mode !== 'assessment' && (
                      <span className="inline-flex items-center gap-1.5">
                        <span className={cn('h-3 w-3 rounded-[3px] border', SQUARE.failed)} />{' '}
                        Outside the limit
                      </span>
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={onOpenSchedule}
                    disabled={mode === null}
                    className="inline-flex h-12 w-full disabled:bg-white/[0.12] disabled:text-white items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-bold text-black touch-manipulation active:scale-[0.98]"
                  >
                    {allTested && !assess ? 'Check and finish' : 'Open the schedule'}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </motion.div>
    </div>
  );
}
