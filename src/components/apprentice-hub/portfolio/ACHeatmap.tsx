/**
 * ACHeatmap
 *
 * Five-state at-a-glance map of every AC in the apprentice's qualification.
 * Goes beyond "evidenced or not" to surface the full assessor → IQA chain.
 *
 *   • iqa_confirmed   — yellow filled with a hairline ring
 *   • signed_off      — yellow filled
 *   • evidenced       — yellow outline (awaiting assessor)
 *   • referred        — red border (assessor sent it back; action needed)
 *   • not_yet         — orange border (assessor said "still working")
 *   • claimed-only    — soft yellow outline
 *   • not_started     — neutral grey
 *
 * Tap a tile → AC details sheet with full audit timeline.
 */

import { cn } from '@/lib/utils';
import { Eyebrow, SectionHeader } from './PortfolioPrimitives';
import type { PortfolioEntry } from '@/types/portfolio';
import type { QualificationACTree } from '@/hooks/qualification/useQualificationACs';
import type {
  ACComplianceState,
  ACSignoffRecord,
} from '@/hooks/portfolio/useACSignoffs';

interface ACHeatmapProps {
  tree: QualificationACTree;
  acEvidenceMap: Map<string, PortfolioEntry[]>;
  claimedOnlyRefs: Set<string>;
  /** Lookup helper from useACSignoffs */
  getSignoff?: (acRef: string, unitCode?: string) => ACSignoffRecord | undefined;
  onACClick?: (acRef: string, acText: string, unitCode: string) => void;
}

const STATE_TILE: Record<ACComplianceState | 'claimed_only', string> = {
  iqa_confirmed:
    'bg-elec-yellow ring-1 ring-elec-yellow/60 ring-offset-1 ring-offset-[hsl(0_0%_10%)] hover:bg-elec-yellow/90',
  signed_off: 'bg-elec-yellow hover:bg-elec-yellow/90',
  evidenced:
    'border border-elec-yellow/60 bg-elec-yellow/[0.10] hover:bg-elec-yellow/[0.20]',
  not_yet:
    'border border-orange-400/60 bg-orange-400/[0.08] hover:bg-orange-400/[0.18]',
  referred: 'border border-red-400/60 bg-red-500/[0.10] hover:bg-red-500/[0.20]',
  in_progress:
    'border border-white/15 bg-white/[0.04] hover:bg-white/[0.08]',
  claimed_only:
    'border border-elec-yellow/30 bg-elec-yellow/[0.04] hover:bg-elec-yellow/[0.10]',
  not_started: 'bg-white/[0.06] hover:bg-white/[0.10]',
};

const LEGEND: Array<{ label: string; cls: string }> = [
  { label: 'IQA confirmed', cls: 'bg-elec-yellow ring-1 ring-elec-yellow/60' },
  { label: 'Signed off', cls: 'bg-elec-yellow' },
  { label: 'Evidenced', cls: 'border border-elec-yellow/60 bg-elec-yellow/[0.10]' },
  { label: 'Referred', cls: 'border border-red-400/60 bg-red-500/[0.10]' },
  { label: 'Open', cls: 'bg-white/[0.06]' },
];

export function ACHeatmap({
  tree,
  acEvidenceMap,
  claimedOnlyRefs,
  getSignoff,
  onACClick,
}: ACHeatmapProps) {
  const totalACs = tree.totalACs;

  // Pre-compute per-AC state for the rollup counts
  let countConfirmed = 0;
  let countSigned = 0;
  let countEvidenced = 0;
  let countReferred = 0;
  let countOpen = 0;

  return (
    <div className="space-y-3">
      <SectionHeader
        eyebrow="Coverage map"
        title="Every assessment criterion at a glance"
        meta="Tap a tile to see the audit chain — evidence, sign-off, IQA"
      />

      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
        {/* Legend */}
        <div className="flex flex-wrap gap-3 pb-3 border-b border-white/[0.04]">
          {LEGEND.map((l) => (
            <span
              key={l.label}
              className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-white/55"
            >
              <span className={cn('w-2.5 h-2.5 rounded-sm', l.cls)} />
              {l.label}
            </span>
          ))}
        </div>

        {/* Unit grid — single column on mobile, 2 cols on md, 3 on xl.
            Each unit becomes a self-contained card so they fill the width
            on a wide screen instead of stacking vertically. */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-5">
        {tree.units.map((unit) => {
          const allUnitACs = unit.learningOutcomes.flatMap((lo) => lo.assessmentCriteria);
          let unitDone = 0;
          for (const ac of allUnitACs) {
            const evidenced =
              acEvidenceMap.has(ac.acRef) || acEvidenceMap.has(ac.acFullRef);
            const signoff = getSignoff?.(ac.acRef, unit.unitCode);
            if (signoff?.status === 'iqa_confirmed' || signoff?.status === 'signed_off') {
              unitDone++;
            } else if (evidenced) {
              unitDone++;
            }
          }
          return (
            <div key={unit.unitCode} className="space-y-2 min-w-0">
              <div className="flex items-baseline justify-between gap-3">
                <div className="min-w-0 flex-1 flex items-baseline gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-white/55 flex-shrink-0">
                    {unit.unitCode}
                  </span>
                  <span className="text-[13px] font-medium text-white truncate">
                    {unit.unitTitle}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-white/85 tabular-nums flex-shrink-0">
                  {unitDone}/{allUnitACs.length}
                </span>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(24px,1fr))] gap-1">
                {allUnitACs.map((ac) => {
                  const evidenced =
                    acEvidenceMap.has(ac.acRef) || acEvidenceMap.has(ac.acFullRef);
                  const claimedOnly =
                    !evidenced &&
                    (claimedOnlyRefs.has(ac.acRef) || claimedOnlyRefs.has(ac.acFullRef));
                  const signoff = getSignoff?.(ac.acRef, unit.unitCode);

                  let stateKey: ACComplianceState | 'claimed_only';
                  if (signoff?.status === 'iqa_confirmed') {
                    stateKey = 'iqa_confirmed';
                    countConfirmed++;
                  } else if (signoff?.status === 'signed_off') {
                    stateKey = 'signed_off';
                    countSigned++;
                  } else if (signoff?.status === 'referred') {
                    stateKey = 'referred';
                    countReferred++;
                  } else if (signoff?.status === 'not_yet') {
                    stateKey = 'not_yet';
                    countReferred++;
                  } else if (evidenced) {
                    stateKey = 'evidenced';
                    countEvidenced++;
                  } else if (claimedOnly) {
                    stateKey = 'claimed_only';
                    countOpen++;
                  } else {
                    stateKey = 'not_started';
                    countOpen++;
                  }

                  return (
                    <button
                      key={ac.acFullRef}
                      type="button"
                      title={`${ac.acRef} — ${ac.acText.replace(`${ac.acRef} `, '').slice(0, 80)}`}
                      onClick={() =>
                        onACClick?.(
                          ac.acRef,
                          ac.acText.replace(`${ac.acRef} `, ''),
                          unit.unitCode
                        )
                      }
                      className={cn(
                        'aspect-square rounded-[3px] transition-colors touch-manipulation',
                        STATE_TILE[stateKey]
                      )}
                    >
                      <span className="sr-only">{ac.acRef}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-3 border-t border-white/[0.04]">
          <Stat label="IQA" value={countConfirmed} highlight />
          <Stat label="Signed" value={countSigned} highlight />
          <Stat label="Evidenced" value={countEvidenced} />
          <Stat label="Referred" value={countReferred} warn />
          <Stat label="Open" value={countOpen} />
        </div>
      </div>

      <Eyebrow className="block text-center pt-1">
        {countConfirmed + countSigned + countEvidenced} of {totalACs} ACs have evidence ·{' '}
        {totalACs > 0
          ? Math.round(((countConfirmed + countSigned + countEvidenced) / totalACs) * 100)
          : 0}
        %
      </Eyebrow>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
  warn,
}: {
  label: string;
  value: number;
  highlight?: boolean;
  warn?: boolean;
}) {
  return (
    <div className="text-center space-y-0.5">
      <div
        className={cn(
          'text-[18px] font-mono font-semibold tabular-nums leading-none',
          highlight ? 'text-elec-yellow' : warn ? 'text-red-300' : 'text-white'
        )}
      >
        {value}
      </div>
      <div className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/55">
        {label}
      </div>
    </div>
  );
}
