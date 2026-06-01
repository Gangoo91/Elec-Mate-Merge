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
 * Collapsed by default — the whole map is a lot of tiles, so it lives behind a
 * one-line dropdown with a live progress bar. Tap to open the full grid; tap a
 * tile → AC details sheet with the audit timeline.
 */

import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Eyebrow } from './PortfolioPrimitives';
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
    'border border-elec-yellow/70 bg-elec-yellow/[0.18] hover:bg-elec-yellow/[0.30]',
  not_yet:
    'border border-orange-400/70 bg-orange-400/[0.16] hover:bg-orange-400/[0.28]',
  referred: 'border border-red-400/70 bg-red-500/[0.18] hover:bg-red-500/[0.30]',
  in_progress:
    'border border-white/20 bg-white/[0.06] hover:bg-white/[0.12]',
  claimed_only:
    'border border-elec-yellow/40 bg-elec-yellow/[0.07] hover:bg-elec-yellow/[0.16]',
  not_started: 'bg-white/[0.08] hover:bg-white/[0.14]',
};

const LEGEND: Array<{ label: string; cls: string }> = [
  { label: 'IQA confirmed', cls: 'bg-elec-yellow ring-1 ring-elec-yellow/60' },
  { label: 'Signed off', cls: 'bg-elec-yellow' },
  { label: 'Evidenced', cls: 'border border-elec-yellow/70 bg-elec-yellow/[0.18]' },
  { label: 'Referred', cls: 'border border-red-400/70 bg-red-500/[0.18]' },
  { label: 'Open', cls: 'bg-white/[0.08]' },
];

export function ACHeatmap({
  tree,
  acEvidenceMap,
  claimedOnlyRefs,
  getSignoff,
  onACClick,
}: ACHeatmapProps) {
  const [open, setOpen] = useState(false);
  const totalACs = tree.totalACs;

  // Per-AC state classifier — single source of truth used by both the rollup
  // (for the collapsed header) and the tiles (when expanded).
  const stateFor = (
    ac: { acRef: string; acFullRef: string },
    unitCode: string
  ): ACComplianceState | 'claimed_only' => {
    const evidenced = acEvidenceMap.has(ac.acRef) || acEvidenceMap.has(ac.acFullRef);
    const claimedOnly =
      !evidenced && (claimedOnlyRefs.has(ac.acRef) || claimedOnlyRefs.has(ac.acFullRef));
    const signoff = getSignoff?.(ac.acRef, unitCode);
    if (signoff?.status === 'iqa_confirmed') return 'iqa_confirmed';
    if (signoff?.status === 'signed_off') return 'signed_off';
    if (signoff?.status === 'referred') return 'referred';
    if (signoff?.status === 'not_yet') return 'not_yet';
    if (evidenced) return 'evidenced';
    if (claimedOnly) return 'claimed_only';
    return 'not_started';
  };

  // Rollup — computed independently of render so the collapsed header has the
  // numbers even while the tile grid is hidden.
  const roll = useMemo(() => {
    let confirmed = 0;
    let signed = 0;
    let evidenced = 0;
    let referred = 0;
    let open = 0;
    for (const unit of tree.units) {
      for (const lo of unit.learningOutcomes) {
        for (const ac of lo.assessmentCriteria) {
          const s = stateFor(ac, unit.unitCode);
          if (s === 'iqa_confirmed') confirmed++;
          else if (s === 'signed_off') signed++;
          else if (s === 'referred' || s === 'not_yet') referred++;
          else if (s === 'evidenced') evidenced++;
          else open++;
        }
      }
    }
    return { confirmed, signed, evidenced, referred, open };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tree, acEvidenceMap, claimedOnlyRefs, getSignoff]);

  const withEvidence = roll.confirmed + roll.signed + roll.evidenced;
  const pct = totalACs > 0 ? Math.round((withEvidence / totalACs) * 100) : 0;

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      {/* Trigger — the whole map collapses to this one calm row */}
      <CollapsibleTrigger asChild>
        <button
          className={cn(
            'w-full text-left rounded-xl border bg-[hsl(0_0%_10%)] p-4 sm:p-5 transition-colors touch-manipulation',
            open ? 'border-white/[0.12]' : 'border-white/[0.06] hover:bg-white/[0.03]'
          )}
        >
          <div className="flex items-center gap-4">
            <div className="flex-1 min-w-0 space-y-2">
              <Eyebrow>Coverage map</Eyebrow>
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-white tracking-tight leading-tight">
                Every assessment criterion
              </h3>
              {/* Live progress bar */}
              <div className="flex items-center gap-3 pt-0.5">
                <div className="h-2 flex-1 rounded-full bg-white/[0.07] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-elec-yellow transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-[12px] font-mono font-semibold text-white tabular-nums shrink-0">
                  {withEvidence}/{totalACs}
                  <span className="text-elec-yellow ml-1.5">{pct}%</span>
                </span>
              </div>
              {!open && (
                <p className="text-[11.5px] text-white/55 leading-snug">
                  {roll.referred > 0 ? (
                    <span className="text-red-300">
                      {roll.referred} need{roll.referred === 1 ? 's' : ''} action ·{' '}
                    </span>
                  ) : null}
                  Tap to see every criterion and its audit chain
                </p>
              )}
            </div>
            <ChevronDown
              className={cn(
                'h-5 w-5 text-white/55 shrink-0 transition-transform duration-200',
                open && 'rotate-180 text-elec-yellow'
              )}
            />
          </div>
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="mt-2 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          {/* Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 pb-3 border-b border-white/[0.06]">
            {LEGEND.map((l) => (
              <span
                key={l.label}
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-white/70"
              >
                <span className={cn('w-2.5 h-2.5 rounded-sm', l.cls)} />
                {l.label}
              </span>
            ))}
          </div>

          {/* Unit grid — 1 col on mobile, 2 on md, 3 on xl */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-5">
            {tree.units.map((unit) => {
              const allUnitACs = unit.learningOutcomes.flatMap((lo) => lo.assessmentCriteria);
              let unitDone = 0;
              for (const ac of allUnitACs) {
                const s = stateFor(ac, unit.unitCode);
                if (s === 'iqa_confirmed' || s === 'signed_off' || s === 'evidenced') unitDone++;
              }
              return (
                <div key={unit.unitCode} className="space-y-2 min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="min-w-0 flex-1 flex items-baseline gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-white/60 flex-shrink-0">
                        {unit.unitCode}
                      </span>
                      <span className="text-[13px] font-medium text-white truncate">
                        {unit.unitTitle}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-white/90 tabular-nums flex-shrink-0">
                      {unitDone}/{allUnitACs.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(26px,1fr))] gap-1.5">
                    {allUnitACs.map((ac) => {
                      const stateKey = stateFor(ac, unit.unitCode);
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
                            'aspect-square rounded-[4px] transition-colors touch-manipulation',
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

          {/* Rollup stats */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 pt-3 border-t border-white/[0.06]">
            <Stat label="IQA" value={roll.confirmed} highlight />
            <Stat label="Signed" value={roll.signed} highlight />
            <Stat label="Evidenced" value={roll.evidenced} />
            <Stat label="Referred" value={roll.referred} warn />
            <Stat label="Open" value={roll.open} />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
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
