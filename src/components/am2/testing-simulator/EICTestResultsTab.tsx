/**
 * EICTestResultsTab — schedule of test results, laid out like the model form.
 *
 * Desktop: one sheet, circuits down, numbered columns across, grouped the way
 * the printed schedule groups them (ring continuity, continuity, insulation
 * resistance, polarity, Zs, RCD). "N/A" where a column doesn't apply to that
 * circuit — that is what you write on the form, not a blank.
 * Phone: a card per circuit with the same groups.
 * An empty box is a button: it takes you to the circuit that fills it.
 */

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { AM2_RIG_CIRCUITS } from '@/data/am2RigCircuits';
import { REMARK_OPTIONS, RESULT_COLS, connectionsFor } from '@/data/am2/sectionBRules';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import type {
  EICCircuitDetail,
  EICTestResult,
  EICScheduleState,
  TestReading,
} from '@/types/am2-testing-simulator';
import type { EICValidation, CellStatus } from '@/hooks/am2/useEICSchedule';

interface EICTestResultsTabProps {
  testResults: EICTestResult[];
  headerFields: EICScheduleState['headerFields'];
  validations: EICValidation[];
  circuitDetails: EICCircuitDetail[];
  onGoToCircuit: (circuitId: number) => void;
  /** Practise/Assessment: the learner writes every box. */
  writable?: boolean;
  /** Colour readings outside the limit (off in Assessment). */
  showLimits?: boolean;
  readings?: Record<number, TestReading[]>;
  onWrite?: (circuitId: number, field: string, value: string) => void;
}

type Key = keyof EICTestResult;
interface Col {
  key: Key;
  col: number;
  head: string;
  unit?: string;
}

const GROUPS: { title: string; cols: Col[] }[] = [
  {
    title: 'Ring final continuity',
    cols: [
      { key: 'ringR1', col: 18, head: 'r₁', unit: 'Ω' },
      { key: 'ringRn', col: 19, head: 'rₙ', unit: 'Ω' },
      { key: 'ringR2', col: 20, head: 'r₂', unit: 'Ω' },
    ],
  },
  { title: 'Continuity', cols: [{ key: 'r1r2', col: 21, head: 'R₁ + R₂', unit: 'Ω' }] },
  {
    title: 'Insulation resistance',
    cols: [
      { key: 'irTestVoltage', col: 23, head: 'Test', unit: 'V' },
      { key: 'irLiveLive', col: 24, head: 'Live–live', unit: 'MΩ' },
      { key: 'irLiveEarth', col: 25, head: 'Live–earth', unit: 'MΩ' },
    ],
  },
  { title: 'Polarity', cols: [{ key: 'polarity', col: 26, head: 'Polarity' }] },
  { title: 'Zs', cols: [{ key: 'maxMeasuredZs', col: 27, head: 'Max Zs', unit: 'Ω' }] },
  {
    title: 'RCD',
    cols: [
      { key: 'rcdDisconnectionTime', col: 28, head: 'Time', unit: 'ms' },
      { key: 'rcdTestButton', col: 29, head: 'Button' },
    ],
  },
];

type Cell = { kind: 'na' } | { kind: 'value'; text: string; failed: boolean } | { kind: 'empty' };

function cellFor(
  r: EICTestResult,
  key: Key,
  cs: Partial<Record<string, CellStatus>>,
  isRing: boolean,
  hasRcd: boolean,
  writable = false
): Cell {
  if (writable) {
    const w = (r[key] as string) || '';
    if (!w) return { kind: 'empty' };
    if (w === 'N/A') return { kind: 'na' };
    return {
      kind: 'value',
      text: w === 'PASS' || w === 'OK' ? '✓' : w,
      failed: cs[key] === 'failed',
    };
  }
  if ((key === 'ringR1' || key === 'ringRn' || key === 'ringR2') && !isRing) return { kind: 'na' };
  if ((key === 'rcdDisconnectionTime' || key === 'rcdTestButton') && !hasRcd) return { kind: 'na' };
  const v = r[key];
  if (key === 'polarity') {
    if (!v) return { kind: 'empty' };
    return { kind: 'value', text: v === 'FAIL' ? '✗' : '✓', failed: v === 'FAIL' };
  }
  if (!v) return { kind: 'empty' };
  return { kind: 'value', text: v === 'PASS' ? '✓' : v, failed: cs[key] === 'failed' };
}

const HEADER_LABELS: Array<[keyof EICScheduleState['headerFields'], string, string?]> = [
  ['dbReference', 'Board'],
  ['location', 'Location'],
  ['ze', 'Ze at the board', 'Ω'],
  ['ipf', 'Ipf at the board', 'kA'],
  ['phaseSequence', 'Phase sequence'],
];

export function EICTestResultsTab({
  testResults,
  headerFields,
  validations,
  circuitDetails,
  onGoToCircuit,
  writable = false,
  showLimits = true,
  readings = {},
  onWrite,
}: EICTestResultsTabProps) {
  const [picking, setPicking] = useState<{ id: number; key: Key | 'remarks' } | null>(null);
  const rows = testResults.map((r) => {
    const id = parseInt(r.circuitNumber);
    const v = validations.find((x) => x.circuitId === id);
    const d = circuitDetails.find((x) => x.circuitNumber === r.circuitNumber);
    return {
      r,
      id,
      v,
      name: d?.circuitDescription ?? `Circuit ${id}`,
      cs: (v?.columnStatuses ?? {}) as Partial<Record<string, CellStatus>>,
      // From the circuit itself — the schedule now counts every column on every row.
      isRing: AM2_RIG_CIRCUITS.find((c) => c.id === id)?.diagramLayout === 'ring',
      hasRcd: !!AM2_RIG_CIRCUITS.find((c) => c.id === id)?.hasRcd,
    };
  });

  // A render function, not a component: as <Value/> it was a new component type on
  // every render, so every box remounted and focus was lost after each write.
  const renderValue = ({ c, id, k }: { c: Cell; id: number; k?: Key | 'remarks' }) =>
    writable && k ? (
      <button
        type="button"
        onClick={() => setPicking({ id, key: k })}
        className={cn(
          'inline-flex min-h-[44px] min-w-[52px] items-center justify-center rounded-md border px-1.5 font-mono text-[13px] font-semibold tabular-nums touch-manipulation',
          c.kind === 'empty'
            ? 'border-dashed border-white/[0.35] text-white hover:border-elec-yellow'
            : c.kind === 'value' && c.failed && showLimits
              ? 'border-red-500 bg-red-500 text-white'
              : 'border-white/[0.2] text-white hover:border-elec-yellow'
        )}
        aria-label={`Write circuit ${id}, ${k === 'remarks' ? 'remarks' : (RESULT_COLS.find((x) => x.key === k)?.label ?? String(k))}`}
      >
        {c.kind === 'na' ? 'N/A' : c.kind === 'value' ? c.text : ''}
      </button>
    ) : c.kind === 'na' ? (
      <span className="text-[12px] font-semibold text-white">N/A</span>
    ) : c.kind === 'empty' ? (
      // An empty box looks like one: a gap waiting to be filled.
      <span
        className="inline-block h-7 w-12 rounded-md border border-dashed border-white/[0.3] align-middle"
        aria-label="Not tested yet"
      />
    ) : (
      <span
        className={cn(
          'font-mono text-[13.5px] font-semibold tabular-nums',
          c.failed && showLimits ? 'rounded bg-red-500 px-1.5 py-0.5 text-white' : 'text-white'
        )}
      >
        {c.text}
      </span>
    );

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-5 px-3 py-4 sm:px-5 lg:px-6">
      {/* Board details — the top of the schedule */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {HEADER_LABELS.map(([k, label, unit]) => {
          const val = headerFields[k];
          return (
            <div
              key={k}
              className={cn('rounded-xl border border-white/[0.14] px-3.5 py-2.5', CARD_SURFACE)}
            >
              <p className="text-[11.5px] font-semibold text-white">{label}</p>
              <p className="mt-0.5 truncate font-mono text-[15px] font-bold text-white">
                {val ? (
                  `${val}${unit ? ` ${unit}` : ''}`
                ) : (
                  <span className="font-sans text-[13px] font-semibold text-white">
                    {k === 'phaseSequence' ? 'Not checked yet' : 'Not measured yet'}
                  </span>
                )}
              </p>
            </div>
          );
        })}
      </div>

      {/* Desktop: the sheet */}
      <div
        className={cn(
          'hidden overflow-x-auto rounded-2xl border border-white/[0.14] lg:block',
          CARD_SURFACE
        )}
      >
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="border-b border-white/[0.1]">
              <th
                rowSpan={2}
                className="sticky left-0 z-10 bg-[hsl(0_0%_17%)] px-4 py-2 text-left align-bottom"
              >
                <span className="block font-mono text-[10.5px] text-white">1–2</span>
                <span className="text-[12.5px] font-bold text-white">Circuit</span>
              </th>
              {GROUPS.map((g) => (
                <th
                  key={g.title}
                  colSpan={g.cols.length}
                  className="border-l border-white/[0.1] px-2 pt-2.5 text-[11.5px] font-bold text-white"
                >
                  {g.title}
                </th>
              ))}
              {writable && (
                <th
                  rowSpan={2}
                  className="border-l border-white/[0.1] px-3 py-2 text-left align-bottom text-[12px] font-bold text-white"
                >
                  <span className="block font-mono text-[10.5px]">31</span>Remarks
                </th>
              )}
              <th
                rowSpan={2}
                className="border-l border-white/[0.1] px-3 py-2 align-bottom text-[12px] font-bold text-white"
              >
                Done
              </th>
            </tr>
            <tr className="border-b border-white/[0.14]">
              {GROUPS.flatMap((g) =>
                g.cols.map((c, i) => (
                  <th
                    key={c.key}
                    className={cn(
                      'px-2 pb-2 pt-1 text-[12px] font-semibold text-white',
                      i === 0 && 'border-l border-white/[0.1]'
                    )}
                  >
                    <span className="block font-mono text-[10.5px]">{c.col}</span>
                    {c.head}
                    {c.unit && <span className="ml-0.5 text-[10.5px]">{c.unit}</span>}
                  </th>
                ))
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ r, id, v, name, cs, isRing, hasRcd }) => (
              <tr key={id} className="border-b border-white/[0.07] last:border-0">
                <td className="sticky left-0 z-10 bg-[hsl(0_0%_17%)] px-4 py-3 text-left">
                  <span className="font-mono text-[12px] font-semibold text-white">{id} </span>
                  <span className="text-[13.5px] font-semibold text-white">{name}</span>
                </td>
                {GROUPS.flatMap((g) =>
                  g.cols.map((c, i) => (
                    <td
                      key={c.key}
                      className={cn('px-2 py-2.5', i === 0 && 'border-l border-white/[0.07]')}
                    >
                      {renderValue({
                        c: cellFor(r, c.key, cs, isRing, hasRcd, writable),
                        id,
                        k: c.key,
                      })}
                    </td>
                  ))
                )}
                {writable && (
                  <td className="border-l border-white/[0.07] px-2 py-2.5 text-left">
                    <button
                      type="button"
                      onClick={() => setPicking({ id, key: 'remarks' })}
                      className="min-h-[44px] w-[150px] truncate rounded-md border border-dashed border-white/[0.3] px-2 text-left text-[12px] text-white touch-manipulation hover:border-elec-yellow"
                      title={r.remarks || 'None'}
                    >
                      {r.remarks || 'None'}
                    </button>
                  </td>
                )}
                <td className="border-l border-white/[0.07] px-3 py-2.5">
                  {v?.overallComplete ? (
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400">
                      <Check className="h-3.5 w-3.5 text-black" />
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onGoToCircuit(id)}
                      className="inline-flex h-11 items-center gap-1 whitespace-nowrap rounded-lg border border-white/[0.25] px-2.5 text-[12px] font-bold text-white touch-manipulation hover:border-elec-yellow"
                      aria-label={`Go to circuit ${id}`}
                    >
                      {v?.filledCount ?? 0}/{v?.totalCount ?? 0} · Go to it{' '}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phone: a card per circuit */}
      <div className="space-y-3 lg:hidden">
        {rows.map(({ r, id, v, name, cs, isRing, hasRcd }) => {
          const done = !!v?.overallComplete;
          return (
            <div
              key={id}
              className={cn(
                'overflow-hidden rounded-2xl border',
                CARD_SURFACE,
                done ? 'border-emerald-400/70' : 'border-white/[0.14]'
              )}
            >
              <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold text-white">Circuit {id}</p>
                  <p className="truncate text-[15px] font-bold text-white">{name}</p>
                </div>
                {done ? (
                  <span className="inline-flex h-7 items-center gap-1 rounded-full bg-emerald-400 px-2.5 text-[12px] font-bold text-black">
                    <Check className="h-3.5 w-3.5" /> Done
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => onGoToCircuit(id)}
                    className="inline-flex h-11 items-center gap-1 rounded-xl bg-elec-yellow px-3.5 text-[13px] font-bold text-black touch-manipulation"
                  >
                    {v?.filledCount ?? 0}/{v?.totalCount ?? 0} · Go to it{' '}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
              {/* Every box that applies, three to a row — N/A columns left out */}
              <div className="grid grid-cols-3 gap-x-3 gap-y-3 px-4 py-3">
                {GROUPS.flatMap((g) => g.cols)
                  .map((c) => ({ c, cell: cellFor(r, c.key, cs, isRing, hasRcd, writable) }))
                  // Writing the schedule yourself includes writing N/A — so keep them.
                  .filter((x) => writable || x.cell.kind !== 'na')
                  .map(({ c, cell }) => (
                    <div key={c.key} className="min-w-0">
                      <p className="truncate text-[11px] text-white">
                        <span className="font-mono">{c.col}</span> {c.head}
                        {c.unit ? ` ${c.unit}` : ''}
                      </p>
                      <div className="mt-1">{renderValue({ c: cell, id, k: c.key })}</div>
                    </div>
                  ))}
              </div>
              {writable && (
                <div className="border-t border-white/[0.06] px-4 py-2.5">
                  <p className="text-[11px] text-white">
                    <span className="font-mono">31</span> Remarks
                  </p>
                  <button
                    type="button"
                    onClick={() => setPicking({ id, key: 'remarks' })}
                    className="mt-1 min-h-[44px] w-full rounded-md border border-dashed border-white/[0.3] px-2.5 text-left text-[13px] text-white touch-manipulation"
                  >
                    {r.remarks || 'None'}
                  </button>
                </div>
              )}
              {!writable && (!isRing || !hasRcd) && (
                <p className="border-t border-white/[0.06] px-4 py-2 text-[11.5px] text-white">
                  N/A on this circuit:{' '}
                  {[!isRing && 'ring continuity (18–20)', !hasRcd && 'RCD (28–29)']
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Writing a box: pick from the reading log, or N/A, or a tick */}
      <Sheet open={!!picking} onOpenChange={(o) => !o && setPicking(null)}>
        <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-2xl p-0">
          {picking &&
            (() => {
              const c = AM2_RIG_CIRCUITS.find((x) => x.id === picking.id)!;
              const col = GROUPS.flatMap((g) => g.cols).find((x) => x.key === picking.key);
              const write = (v: string) => {
                onWrite?.(picking.id, picking.key as string, v);
                setPicking(null);
              };
              const log = readings[picking.id] ?? [];
              const opt = (label: string, value: string, sub?: string, key?: string) => (
                <button
                  key={key ?? label + value}
                  type="button"
                  onClick={() => write(value)}
                  className="flex min-h-[52px] w-full items-center justify-between gap-3 rounded-xl border border-white/[0.16] px-4 py-2 text-left touch-manipulation hover:border-elec-yellow"
                >
                  <span className="font-mono text-[16px] font-bold text-white">{label}</span>
                  {sub && <span className="text-right text-[12.5px] text-white">{sub}</span>}
                </button>
              );
              const k = picking.key;
              return (
                <div className="space-y-3 bg-[hsl(0_0%_13%)] p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6">
                  <div>
                    <SheetTitle className="text-[18px] font-bold text-white">
                      Circuit {c.id} ·{' '}
                      {k === 'remarks' ? 'Remarks (31)' : `${col?.head} (${col?.col})`}
                    </SheetTitle>
                    <SheetDescription className="text-[13px] text-white">
                      {k === 'remarks'
                        ? 'Anything outside a limit on this circuit gets a remark.'
                        : 'Choose the reading that belongs in this box.'}
                    </SheetDescription>
                  </div>
                  <div className="grid gap-2">
                    {k === 'remarks' ? (
                      REMARK_OPTIONS.map((t) => opt(t, t))
                    ) : k === 'irTestVoltage' ? (
                      ['250', '500', '1000'].map((v) => opt(`${v} V`, v))
                    ) : k === 'polarity' || k === 'rcdTestButton' ? (
                      [opt('✓', '✓', 'Satisfactory'), opt('✗', '✗', 'Not satisfactory')]
                    ) : log.length === 0 ? (
                      <p className="rounded-xl border border-white/[0.14] px-4 py-3 text-[13.5px] text-white">
                        No readings in the log for this circuit yet.
                      </p>
                    ) : (
                      log.map((r) => {
                        const pt = c.testPoints.find((p) => p.id === r.testPointId)?.label;
                        const conn = connectionsFor(c, r.dialPosition).find(
                          (o) => o.value === (r.subTest ?? '')
                        )?.label;
                        const test = {
                          CONTINUITY: 'Continuity',
                          IR_250V: 'Insulation 250 V',
                          IR_500V: 'Insulation 500 V',
                          LOOP_ZS: 'Loop Zs',
                          RCD_30: 'RCD',
                          RCD_100: 'RCD',
                          RCD_300: 'RCD',
                          PFC: 'PFC',
                          OFF: '',
                        }[r.dialPosition];
                        return opt(
                          `${r.displayValue} ${r.unit}`,
                          r.displayValue,
                          [test, pt, conn, r.stale ? 'before the repair' : '']
                            .filter(Boolean)
                            .join(' · '),
                          r.id
                        );
                      })
                    )}
                    {k !== 'remarks' && opt('N/A', 'N/A', 'Doesn’t apply to this circuit')}
                    <button
                      type="button"
                      onClick={() => write('')}
                      className="min-h-[44px] rounded-xl border border-white/[0.18] px-4 text-left text-[13.5px] font-semibold text-white touch-manipulation"
                    >
                      Clear this box
                    </button>
                  </div>
                </div>
              );
            })()}
        </SheetContent>
      </Sheet>

      {writable ? (
        <p className="text-[12.5px] leading-relaxed text-white">
          Tap a box to write it: a reading from your log, N/A where the column doesn’t apply, a tick
          for polarity and the RCD button, and a remark for anything outside a limit.
        </p>
      ) : (
        <p className="text-[12.5px] leading-relaxed text-white">
          Readings go in as you take them. <span className="font-semibold">N/A</span> is what you
          write where a column doesn&apos;t apply. A{' '}
          <span className="rounded bg-red-500 px-1 font-semibold">red</span> box is outside the
          limit. Dashed boxes are still empty — <span className="font-semibold">Go to it</span>{' '}
          takes you to that circuit.
        </p>
      )}
    </div>
  );
}
