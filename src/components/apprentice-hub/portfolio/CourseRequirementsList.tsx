/**
 * CourseRequirementsList
 *
 * Searchable, filterable AC list grouped by unit. Default-collapsed units
 * keep the page calm. The filter chips ("all / open / claimed / done")
 * let the apprentice narrow to where their work is.
 */

import { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Eyebrow, SectionHeader } from './PortfolioPrimitives';
import type { PortfolioEntry } from '@/types/portfolio';
import type { QualificationACTree } from '@/hooks/qualification/useQualificationACs';

type FilterMode = 'all' | 'open' | 'claimed' | 'done';

interface CourseRequirementsListProps {
  tree: QualificationACTree;
  acEvidenceMap: Map<string, PortfolioEntry[]>;
  claimedOnlyRefs: Set<string>;
  onACClick?: (acRef: string, acText: string, unitCode: string) => void;
}

const FILTER_LABELS: Record<FilterMode, string> = {
  all: 'All',
  open: 'Open',
  claimed: 'Claimed only',
  done: 'Evidenced',
};

export function CourseRequirementsList({
  tree,
  acEvidenceMap,
  claimedOnlyRefs,
  onACClick,
}: CourseRequirementsListProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterMode>('all');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const counts = useMemo(() => {
    let done = 0;
    let claimed = 0;
    let open = 0;
    for (const unit of tree.units) {
      for (const lo of unit.learningOutcomes) {
        for (const ac of lo.assessmentCriteria) {
          if (acEvidenceMap.has(ac.acRef) || acEvidenceMap.has(ac.acFullRef)) {
            done++;
          } else if (
            claimedOnlyRefs.has(ac.acRef) ||
            claimedOnlyRefs.has(ac.acFullRef)
          ) {
            claimed++;
          } else {
            open++;
          }
        }
      }
    }
    return { done, claimed, open, total: tree.totalACs };
  }, [tree, acEvidenceMap, claimedOnlyRefs]);

  const toggle = (unitCode: string) => {
    const next = new Set(expanded);
    if (next.has(unitCode)) next.delete(unitCode);
    else next.add(unitCode);
    setExpanded(next);
  };

  const matchAC = (
    ac: { acRef: string; acFullRef: string; acText: string }
  ): { include: boolean; isDone: boolean; isClaimed: boolean } => {
    const isDone = acEvidenceMap.has(ac.acRef) || acEvidenceMap.has(ac.acFullRef);
    const isClaimed =
      !isDone &&
      (claimedOnlyRefs.has(ac.acRef) || claimedOnlyRefs.has(ac.acFullRef));
    let include = true;
    if (filter === 'done') include = isDone;
    else if (filter === 'claimed') include = isClaimed;
    else if (filter === 'open') include = !isDone && !isClaimed;
    if (include && search) {
      const q = search.toLowerCase();
      include = ac.acText.toLowerCase().includes(q) || ac.acRef.toLowerCase().includes(q);
    }
    return { include, isDone, isClaimed };
  };

  return (
    <div className="space-y-3">
      <SectionHeader
        eyebrow="Course requirements"
        title={`${tree.units.length} units · ${tree.totalACs} ACs`}
        meta={`${counts.done} done · ${counts.claimed} claimed · ${counts.open} open`}
      />

      {/* Search + filters */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-3 sm:p-4 space-y-3">
        <div className="relative">
          <Search className="h-4 w-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ACs by reference or text…"
            className="w-full h-11 pl-10 pr-3 rounded-lg bg-white/[0.02] border border-white/[0.08] text-[13px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20 outline-none touch-manipulation"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(['all', 'open', 'claimed', 'done'] as FilterMode[]).map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'h-8 px-3 rounded-full text-[11.5px] font-medium border transition-colors touch-manipulation',
                  isActive
                    ? 'bg-elec-yellow text-black border-elec-yellow'
                    : 'bg-white/[0.02] text-white/85 border-white/[0.08] hover:bg-white/[0.04]'
                )}
              >
                {FILTER_LABELS[f]}
                <span className="ml-1.5 text-[10px] opacity-70 font-mono">
                  {f === 'all'
                    ? counts.total
                    : f === 'done'
                      ? counts.done
                      : f === 'claimed'
                        ? counts.claimed
                        : counts.open}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Unit list */}
      <div className="space-y-2">
        {tree.units.map((unit) => {
          const allUnitACs = unit.learningOutcomes.flatMap((lo) => lo.assessmentCriteria);
          const totalUnitACs = allUnitACs.length;
          const evidencedUnitACs = allUnitACs.filter(
            (ac) => acEvidenceMap.has(ac.acRef) || acEvidenceMap.has(ac.acFullRef)
          ).length;
          const isOpen = expanded.has(unit.unitCode);

          // Filter the unit's content; if nothing matches under the active filter
          // hide the unit entirely so the list stays focussed.
          const visibleLOs = unit.learningOutcomes
            .map((lo) => ({
              ...lo,
              filteredACs: lo.assessmentCriteria.map((ac) => ({
                ac,
                ...matchAC(ac),
              })).filter((x) => x.include),
            }))
            .filter((lo) => lo.filteredACs.length > 0);

          if (filter !== 'all' || search) {
            if (visibleLOs.length === 0) return null;
          }

          return (
            <Collapsible
              key={unit.unitCode}
              open={isOpen}
              onOpenChange={() => toggle(unit.unitCode)}
            >
              <CollapsibleTrigger asChild>
                <button
                  className={cn(
                    'w-full text-left p-4 rounded-xl border transition-colors touch-manipulation',
                    'border-white/[0.06] bg-[hsl(0_0%_10%)] hover:bg-white/[0.03]',
                    isOpen && 'border-white/[0.12]'
                  )}
                >
                  <div className="flex items-baseline gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      {isOpen ? (
                        <ChevronDown className="h-4 w-4 text-elec-yellow" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-white/55" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-white/55 flex-shrink-0">
                          {unit.unitCode}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.14em] text-white/40">
                          {unit.learningOutcomes.length} LOs · {totalUnitACs} ACs
                        </span>
                      </div>
                      <p className="text-[14px] font-medium text-white leading-snug">
                        {unit.unitTitle}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 space-y-0.5">
                      <span
                        className={cn(
                          'text-[14px] font-mono font-semibold tabular-nums',
                          evidencedUnitACs === totalUnitACs && totalUnitACs > 0
                            ? 'text-elec-yellow'
                            : 'text-white'
                        )}
                      >
                        {evidencedUnitACs}/{totalUnitACs}
                      </span>
                    </div>
                  </div>
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 mb-1 space-y-3">
                  {visibleLOs.map((lo) => (
                    <div
                      key={`${unit.unitCode}-${lo.loNumber}`}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.015] overflow-hidden"
                    >
                      {/* LO band */}
                      <div className="flex items-start gap-2.5 px-3.5 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
                        <span className="text-[10px] font-bold uppercase tracking-[0.10em] text-elec-yellow bg-elec-yellow/[0.10] border border-elec-yellow/25 rounded-md px-2 py-0.5 shrink-0">
                          LO{lo.loNumber}
                        </span>
                        <p className="text-[12.5px] font-medium text-white/90 leading-snug">
                          {lo.loText}
                        </p>
                      </div>

                      {/* AC rows */}
                      <div className="p-1.5 space-y-0.5">
                        {lo.filteredACs.map(({ ac, isDone, isClaimed }) => {
                          const evidenceCount = (
                            acEvidenceMap.get(ac.acRef) || acEvidenceMap.get(ac.acFullRef) || []
                          ).length;
                          return (
                            <button
                              key={ac.acFullRef}
                              onClick={(e) => {
                                e.stopPropagation();
                                onACClick?.(
                                  ac.acRef,
                                  ac.acText.replace(`${ac.acRef} `, ''),
                                  unit.unitCode
                                );
                              }}
                              className="w-full flex items-start gap-2.5 text-left rounded-lg py-2 px-2.5 transition-colors hover:bg-white/[0.05] active:bg-white/[0.06] touch-manipulation"
                            >
                              {isDone ? (
                                <span className="w-4 h-4 rounded-full bg-elec-yellow flex-shrink-0 mt-0.5" />
                              ) : isClaimed ? (
                                <span className="w-4 h-4 rounded-full border-2 border-elec-yellow/70 bg-elec-yellow/[0.12] flex-shrink-0 mt-0.5" />
                              ) : (
                                <span className="w-4 h-4 rounded-full border-2 border-white/25 flex-shrink-0 mt-0.5" />
                              )}
                              <span
                                className={cn(
                                  'font-mono text-[10.5px] font-semibold px-1.5 py-0.5 rounded shrink-0 mt-px',
                                  isDone
                                    ? 'text-black bg-elec-yellow'
                                    : isClaimed
                                      ? 'text-elec-yellow bg-elec-yellow/[0.10] border border-elec-yellow/30'
                                      : 'text-white/70 bg-white/[0.05] border border-white/[0.08]'
                                )}
                              >
                                {ac.acRef}
                              </span>
                              <span className="flex-1 text-[12.5px] text-white/85 leading-snug">
                                {ac.acText.replace(`${ac.acRef} `, '')}
                              </span>
                              {evidenceCount > 0 && (
                                <span className="text-[10px] font-mono text-elec-yellow px-1.5 py-0.5 rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.08] shrink-0 mt-px">
                                  {evidenceCount}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>

      {tree.totalACs > 0 && (
        <Eyebrow className="block text-center pt-2">
          {Math.round((counts.done / counts.total) * 100)}% of the qualification evidenced
        </Eyebrow>
      )}
    </div>
  );
}
