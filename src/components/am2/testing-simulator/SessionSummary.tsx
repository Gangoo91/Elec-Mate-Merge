/**
 * SessionSummary — the Section B debrief.
 *
 * Rebuilt 6 Oct 2026 (AM2 plan, Phase 1). Three percentages told a learner
 * nothing to do next. Now: marks in three parts (testing, the schedule,
 * problems caught), the problems that were planted on the rig and whether
 * they were found, and every mistake with what was right. Marks, not
 * weights — the overall is marks earned over marks available.
 */
import { cn } from '@/lib/utils';
import { RotateCcw, Check, X, Target } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { DRILL_FOR } from '@/data/am2/sectionBDrills';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { ScheduleReview } from './ScheduleReview';
import { INSPECTION_ITEMS, type InspectionState } from '@/data/am2/sectionBInspection';
import type { SimulatorScore } from '@/types/am2-testing-simulator';
import {
  MISTAKE_LABEL,
  MODES,
  PROBLEM_UNIT,
  problemWhy,
  REMARKS,
  type SimMistake,
} from '@/data/am2/sectionBRules';

interface SessionSummaryProps {
  score: SimulatorScore;
  /** The run's inspection: which checks were defects and what was said. */
  inspection?: InspectionState;
  /** Part of the Mock AM2 day: no mode choice, and its own summary links to drills. */
  forced?: boolean;
  onTryAgain: () => void;
  onBackToRig: () => void;
}

const BAR = 80;
const SURFACE = cn('rounded-2xl border border-white/[0.14]', CARD_SURFACE);

function fmt(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m >= 60
    ? `${Math.floor(m / 60)} h ${m % 60} min`
    : `${m} min ${String(s).padStart(2, '0')} s`;
}

export function SessionSummary({
  score,
  inspection,
  forced,
  onTryAgain,
  onBackToRig,
}: SessionSummaryProps) {
  const { marking, mode, seconds, overall } = score;
  const [, setSearchParams] = useSearchParams();
  // The drills that fix this run's mistakes, most frequent first.
  const drillKinds = [
    ...new Set(
      [...marking.mistakes]
        .sort(
          (a, b) =>
            marking.mistakes.filter((m) => m.tag === b.tag).length -
            marking.mistakes.filter((m) => m.tag === a.tag).length
        )
        .map((m) => DRILL_FOR[m.tag])
    ),
  ];
  const atBar = overall >= BAR;
  const parts = [
    {
      label: 'Inspection',
      ...marking.inspection,
      note: marking.inspection.of
        ? 'A mark per check judged right — acceptable or a defect'
        : 'Not marked in Learn mode',
    },
    {
      label: 'Bonding',
      ...marking.bonding,
      note: marking.bonding.of
        ? 'Each clamp tested and judged, and the conductor size recorded'
        : 'Not marked in Learn mode',
    },
    {
      label: 'Testing',
      ...marking.testing,
      note: 'A mark per test done, less one for each wrong attempt',
    },
    {
      label: 'Schedule',
      ...marking.schedule,
      note: 'A mark per box with the right entry, N/A included',
    },
    {
      label: 'Origin',
      ...(marking.origin ?? { got: 0, of: 0 }),
      note: marking.origin?.of
        ? 'Ze the right way, PSCC and PEFC, and the phase sequence judged'
        : 'Not marked in Learn mode',
    },
    {
      label: 'Functional',
      ...(marking.functional ?? { got: 0, of: 0 }),
      note: marking.functional?.of
        ? 'Each switch and control operated and judged'
        : 'Not marked in Learn mode',
    },
    {
      label: 'Paperwork',
      ...(marking.paperwork ?? { got: 0, of: 0 }),
      note: marking.paperwork?.of
        ? 'Circuit details by group, and the certificate’s supply details'
        : 'Filled in for you in Learn mode',
    },
    {
      label: 'Problems put right',
      ...marking.problems,
      note: marking.problems.of
        ? 'Two marks each: put right and retested. A remark alone earns one (Reg 644.1.1)'
        : 'None planted in Learn mode',
    },
  ];

  // Group mistakes by type, most common first.
  const groups = Object.entries(
    marking.mistakes.reduce<Record<string, SimMistake[]>>((acc, m) => {
      (acc[m.tag] ??= []).push(m);
      return acc;
    }, {})
  ).sort((a, b) => b[1].length - a[1].length);

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-[1300px] space-y-7 px-4 pb-12 pt-6 sm:px-6 lg:px-10">
        {/* Headline */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[12px] font-semibold text-white">
              Section B · {MODES[mode].label} · {fmt(seconds)}
            </p>
            <h1 className="mt-1 text-[30px] font-bold leading-tight tracking-tight text-white lg:text-[38px]">
              <span className={'text-white'}>{overall}%</span>{' '}
              {mode === 'learn'
                ? 'in Learn mode'
                : atBar
                  ? mode === 'assessment'
                    ? 'at the bar'
                    : 'at the practice bar'
                  : mode === 'assessment'
                    ? 'below the bar'
                    : 'below the practice bar'}
            </h1>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-white">
              {mode === 'learn'
                ? 'Learn runs show you the way and aren’t marked against the bar. Try Practise next — no prompts, and you fill in the schedule.'
                : mode === 'practise'
                  ? atBar
                    ? 'Good run. When Practise feels routine, sit it in Assessment mode — that’s the run that counts.'
                    : `The practice bar is ${BAR}%. Work through the list below, then go again.`
                  : atBar
                    ? 'This counts towards Section B being ready. Two Assessment runs at the bar and it’s marked ready.'
                    : `The bar is ${BAR}%. The list below is what cost you marks.`}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {!forced && (
              <button
                type="button"
                onClick={onTryAgain}
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-elec-yellow px-6 text-[14.5px] font-bold text-black touch-manipulation"
              >
                <RotateCcw className="h-4 w-4" /> Test the rig again
              </button>
            )}
            {drillKinds.length > 0 && !forced && (
              <button
                type="button"
                onClick={() => setSearchParams({ tab: 'b-drill', kinds: drillKinds.join(',') })}
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-elec-yellow px-5 text-[14px] font-bold text-white touch-manipulation"
              >
                <Target className="h-4 w-4" /> Practise just these
              </button>
            )}
            {!forced && (
              <button
                type="button"
                onClick={onBackToRig}
                className="h-12 rounded-xl border border-white/[0.2] px-5 text-[14px] font-semibold text-white touch-manipulation"
              >
                Choose a mode
              </button>
            )}
          </div>
        </div>

        {/* Marks */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {parts.map((p) => {
            const pct = p.of ? Math.round((p.got / p.of) * 100) : 0;
            return (
              <div key={p.label} className={cn(SURFACE, 'p-5')}>
                <p className="text-[13px] font-semibold text-white">{p.label}</p>
                <p className="mt-2 font-mono text-[30px] font-bold leading-none tabular-nums text-white">
                  {p.got}
                  <span className="text-[16px]"> / {p.of}</span>
                </p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                  <div
                    className={cn(
                      'h-full rounded-full',
                      !p.of ? 'bg-transparent' : pct >= BAR ? 'bg-emerald-400' : 'bg-amber-400'
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="mt-2.5 text-[12.5px] leading-snug text-white">{p.note}</p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-start">
          {/* Planted problems */}
          <section className={cn(SURFACE, 'p-5')}>
            <h2 className="text-[16px] font-bold text-white">Problems on the rig this time</h2>
            {marking.caught.length === 0 ? (
              <p className="mt-2 text-[14px] text-white">
                None in Learn mode. Practise and Assessment plant one or more readings outside the
                limit — you have to spot them, put them right and retest.
              </p>
            ) : (
              <ul className="mt-3 space-y-3">
                {marking.caught.map(({ problem, caught, fixed, retested, remarked }) => (
                  <li key={problem.testId} className="flex gap-3">
                    <span
                      className={cn(
                        'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                        caught ? 'bg-emerald-400' : 'bg-red-500'
                      )}
                    >
                      {caught ? (
                        <Check className="h-3.5 w-3.5 text-black" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-white" />
                      )}
                    </span>
                    <div className="min-w-0 text-[14px] text-white">
                      <p className="font-semibold">
                        Circuit {problem.circuitId}: {problem.displayValue}{' '}
                        {PROBLEM_UNIT[problem.kind]}. {REMARKS[problem.kind]}
                      </p>
                      <p className="mt-0.5 text-[13px] leading-snug">{problemWhy(problem)}</p>
                      <p className="mt-0.5 text-[13px] font-semibold leading-snug">
                        {fixed
                          ? retested
                            ? 'You put it right and retested.'
                            : 'You put it right, but didn’t retest everything it could affect.'
                          : remarked
                            ? 'Recorded with a remark, but not put right.'
                            : 'Not found.'}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Mistakes */}
          <section className={cn(SURFACE, 'p-5')}>
            <h2 className="text-[16px] font-bold text-white">
              {marking.mistakes.length
                ? `What cost marks (${marking.mistakes.length})`
                : 'No mistakes'}
            </h2>
            {groups.length === 0 ? (
              <p className="mt-2 text-[14px] text-white">
                Clean run — every box right and every test in order.
              </p>
            ) : (
              <div className="mt-3 space-y-4">
                {groups.map(([tag, list]) => (
                  <div key={tag}>
                    <p className="flex items-center justify-between text-[13.5px] font-bold text-white">
                      {MISTAKE_LABEL[tag as SimMistake['tag']]}
                      <span className="font-mono text-[12.5px]">×{list.length}</span>
                    </p>
                    <p className="mt-0.5 text-[13px] font-medium text-white">{list[0].fix}</p>
                    <ul className="mt-1.5 space-y-1">
                      {list.slice(0, 6).map((m, i) => (
                        <li key={i} className="flex gap-2 text-[13px] leading-snug text-white">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-white" />
                          {m.what}
                        </li>
                      ))}
                      {list.length > 6 && (
                        <li className="text-[12.5px] text-white">…and {list.length - 6} more</li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {inspection && marking.inspection.of > 0 && (
          <section className={cn(SURFACE, 'p-5')}>
            <h2 className="text-[16px] font-bold text-white">The inspection</h2>
            <p className="mt-0.5 text-[13px] text-white">
              {marking.inspection.got} of {marking.inspection.of} checks judged right.{' '}
              {inspection.defects.length} defect
              {inspection.defects.length === 1 ? ' was' : 's were'} planted this time.
            </p>
            <ul className="mt-3 divide-y divide-white/[0.07]">
              {INSPECTION_ITEMS.map((item) => {
                const defect = inspection.defects.includes(item.id);
                const said = inspection.answers[item.id];
                const right = said === (defect ? 'defect' : 'ok');
                return (
                  <li key={item.id} className="flex gap-3 py-2.5">
                    <span
                      className={cn(
                        'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                        right ? 'bg-emerald-400' : 'bg-red-500'
                      )}
                    >
                      {right ? (
                        <Check className="h-3 w-3 text-black" />
                      ) : (
                        <X className="h-3 w-3 text-white" />
                      )}
                    </span>
                    <div className="min-w-0 text-[13.5px] leading-snug text-white">
                      <p>
                        <span className="font-semibold">{item.where}:</span>{' '}
                        {defect ? item.defectSeen : item.okSeen}
                      </p>
                      <p className="mt-0.5 text-[12.5px]">
                        {defect ? 'A defect' : 'Acceptable'}
                        {said
                          ? ` — you said ${said === 'ok' ? 'acceptable' : 'defect'}.`
                          : ' — not judged.'}{' '}
                        {!right && (
                          <>
                            Reg {item.reg}: {item.why}
                          </>
                        )}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <ScheduleReview marking={marking} />
      </div>
    </div>
  );
}

export default SessionSummary;
