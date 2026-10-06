/**
 * EICCircuitDetailsTab — schedule of circuit details, columns 1–16.
 *
 * Rebuilt 5 Oct 2026. Desktop: the sheet as the model form lays it out, in
 * groups (wiring, conductors, overcurrent device, RCD). Phone: a card per
 * circuit in the same groups. N/A where there is no RCD. A short key explains
 * the wiring-type and reference-method codes so the letters mean something.
 *
 * Round 6: in Practise and Assessment the learner writes columns 3–16 from the
 * rig's drawings (NET: the candidate completes the schedule of circuit
 * details). Learn keeps them filled in. Marked in markRun, by group.
 */

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { AM2_RIG_CIRCUITS } from '@/data/am2RigCircuits';
import { DETAIL_GROUPS, circuitSpec } from '@/data/am2/sectionBDetails';
import type { EICCircuitDetail } from '@/types/am2-testing-simulator';
import { WriteSheet, type WriteTarget } from './WriteSheet';

interface EICCircuitDetailsTabProps {
  circuitDetails: EICCircuitDetail[];
  /** Assessment: the key doesn't spell out the 0.8 rule — knowing it is assessed. */
  assessment?: boolean;
  /** Practise and Assessment: the learner writes columns 3–16. */
  writable?: boolean;
  onWrite?: (circuitNumber: string, field: string, value: string) => void;
}

type Key = keyof EICCircuitDetail;
const GROUPS = DETAIL_GROUPS.map((g) => ({
  title: g.title,
  cols: g.fields.map((f) => ({ ...f, head: f.unit ? `${f.head} ${f.unit}` : f.head })),
}));

const val = (d: EICCircuitDetail, k: Key) => d[k] || 'N/A';

export function EICCircuitDetailsTab({
  circuitDetails,
  assessment,
  writable = false,
  onWrite,
}: EICCircuitDetailsTabProps) {
  const [target, setTarget] = useState<WriteTarget | null>(null);
  const cell = (d: EICCircuitDetail, k: Key) => {
    if (!writable) return val(d, k);
    const f = DETAIL_GROUPS.flatMap((g) => g.fields).find((x) => x.key === k)!;
    return (
      <button
        type="button"
        onClick={() =>
          setTarget({
            title: `Circuit ${d.circuitNumber} · ${f.head} (${f.col})`,
            description: 'From the drawings for this circuit. N/A where it doesn’t apply.',
            value: d[k],
            options: f.options,
            unit: f.unit,
            numeric: !f.options || f.key === 'rcdIdn',
            onWrite: (v) => onWrite?.(d.circuitNumber, k, v),
          })
        }
        className={cn(
          'inline-flex min-h-[44px] min-w-[52px] items-center justify-center rounded-md border px-1.5 font-mono text-[13px] font-semibold tabular-nums text-white touch-manipulation',
          d[k] ? 'border-white/[0.2]' : 'border-dashed border-white/[0.35]'
        )}
        aria-label={`Write circuit ${d.circuitNumber}, column ${f.col}`}
      >
        {d[k]}
      </button>
    );
  };
  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-5 px-3 py-4 sm:px-5 lg:px-6">
      <WriteSheet target={target} onClose={() => setTarget(null)} />
      <p className="max-w-3xl text-[13.5px] leading-relaxed text-white">
        {writable
          ? 'Write columns 3–16 for each circuit from the drawings below — the cable, how it’s installed, the device and the RCD. Column 12 is the maximum Zs for the device from Table 41.3.'
          : 'Filled in from the rig for you. On a real job you complete it from the design and the board — check each line against what you can see.'}
      </p>

      {writable && (
        <div className={cn('rounded-2xl border border-white/[0.14] p-4 lg:p-5', CARD_SURFACE)}>
          <p className="text-[13.5px] font-bold text-white">The drawings</p>
          <ul className="mt-2 space-y-2">
            {AM2_RIG_CIRCUITS.map((c) => (
              <li key={c.id} className="text-[13px] leading-snug text-white">
                <span className="font-mono font-semibold">{c.id}</span>{' '}
                <span className="font-semibold">{c.name}:</span> {circuitSpec(c)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Desktop */}
      <div
        className={cn(
          'hidden overflow-x-auto rounded-2xl border border-white/[0.14] lg:block',
          CARD_SURFACE
        )}
      >
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="border-b border-white/[0.1]">
              <th rowSpan={2} className="px-4 py-2 text-left align-bottom">
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
                  </th>
                ))
              )}
            </tr>
          </thead>
          <tbody>
            {circuitDetails.map((d) => (
              <tr key={d.circuitNumber} className="border-b border-white/[0.07] last:border-0">
                <td className="px-4 py-3 text-left">
                  <span className="font-mono text-[12px] font-semibold text-white">
                    {d.circuitNumber}{' '}
                  </span>
                  <span className="text-[13.5px] font-semibold text-white">
                    {d.circuitDescription}
                  </span>
                </td>
                {GROUPS.flatMap((g) =>
                  g.cols.map((c, i) => (
                    <td
                      key={c.key}
                      className={cn(
                        'px-2 py-2.5 font-mono text-[13px] font-semibold tabular-nums text-white',
                        i === 0 && 'border-l border-white/[0.07]'
                      )}
                    >
                      {cell(d, c.key)}
                    </td>
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phone */}
      <div className="space-y-3 lg:hidden">
        {circuitDetails.map((d) => (
          <div
            key={d.circuitNumber}
            className={cn('overflow-hidden rounded-2xl border border-white/[0.14]', CARD_SURFACE)}
          >
            <div className="border-b border-white/[0.08] px-4 py-3">
              <p className="font-mono text-[11.5px] font-semibold text-white">
                Circuit {d.circuitNumber}
              </p>
              <p className="text-[15px] font-bold text-white">{d.circuitDescription}</p>
            </div>
            <div className="divide-y divide-white/[0.06] px-4">
              {GROUPS.map((g) =>
                g.title === 'RCD' &&
                (!d.rcdBsStandard || d.rcdBsStandard === 'N/A') &&
                !writable ? (
                  <div key={g.title} className="flex items-center justify-between py-2.5">
                    <p className="text-[12px] font-bold text-white">RCD</p>
                    <p className="text-[12.5px] font-semibold text-white">N/A — no RCD</p>
                  </div>
                ) : (
                  <div key={g.title} className="py-2.5">
                    <p className="text-[12px] font-bold text-white">{g.title}</p>
                    <div className="mt-1.5 grid grid-cols-3 gap-x-2 gap-y-2">
                      {g.cols.map((c) => (
                        <div key={c.key} className="min-w-0">
                          <p className="text-[11px] text-white">
                            <span className="font-mono">{c.col}</span> {c.head}
                          </p>
                          <div className="truncate font-mono text-[13.5px] font-semibold text-white">
                            {cell(d, c.key)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Key to the codes */}
      <div className={cn('rounded-2xl border border-white/[0.14] p-4 lg:p-5', CARD_SURFACE)}>
        <p className="text-[13.5px] font-bold text-white">What the codes mean</p>
        <dl className="mt-2 grid grid-cols-1 gap-x-8 gap-y-1.5 text-[13px] text-white sm:grid-cols-2">
          {[
            ['A', 'Thermoplastic insulated and sheathed (T&E)'],
            ['G', 'Thermosetting (XLPE) SWA'],
            ['O', 'Other — here, fire-resistant FP200'],
            ['Ref. method C', 'Clipped direct'],
            [
              'Max Zs (col 12)',
              assessment
                ? 'Maximum permitted Zs for the device (Table 41.3)'
                : 'Table 41.3 value — Appendix 3: met when a reading at ambient is no more than 0.8 × this',
            ],
            ['N/A', 'The column doesn’t apply to that circuit'],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-3">
              <dt className="w-28 shrink-0 font-mono font-bold">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
