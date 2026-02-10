/**
 * QualificationProgress
 *
 * Dashboard showing overall qualification completion, per-unit progress bars,
 * and a gap analysis of unmet assessment criteria.
 *
 * Colour-coded: green >75%, amber 25-75%, red <25%.
 */

import { useState, useEffect, useMemo } from 'react';
import { Target, TrendingUp, AlertTriangle, ChevronDown, ChevronUp, ChevronRight, BookOpen, CheckCircle2, Circle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface QualificationRequirement {
  id: string;
  qualification_code: string;
  unit_code: string;
  unit_title: string;
  lo_number: number | null;
  lo_text: string;
  ac_code: string;
  ac_text: string;
}

interface QualificationProgressProps {
  qualificationCode: string | null;
  qualificationName?: string | null;
  /** Set of AC identifiers the student has already evidenced */
  evidencedACs?: Set<string>;
}

interface UnitProgress {
  unitCode: string;
  unitTitle: string;
  totalACs: number;
  evidencedACs: number;
  percentage: number;
  gaps: string[];
}

export function QualificationProgress({
  qualificationCode,
  qualificationName,
  evidencedACs = new Set(),
}: QualificationProgressProps) {
  const [requirements, setRequirements] = useState<QualificationRequirement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showGaps, setShowGaps] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());
  const [expandedLOs, setExpandedLOs] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!qualificationCode) return;

    let cancelled = false;

    async function load() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('qualification_requirements')
          .select('id, qualification_code, unit_code, unit_title, lo_number, lo_text, ac_code, ac_text')
          .eq('qualification_code', qualificationCode!)
          .order('unit_code', { ascending: true })
          .order('lo_number', { ascending: true })
          .order('ac_code', { ascending: true });

        if (error) throw error;
        if (!cancelled) {
          setRequirements((data as QualificationRequirement[]) || []);
        }
      } catch (err) {
        console.error('[QualificationProgress] Load error:', err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [qualificationCode]);

  // Calculate per-unit progress
  const unitProgress = useMemo(() => {
    const units: Map<string, UnitProgress> = new Map();

    for (const req of requirements) {
      if (!units.has(req.unit_code)) {
        units.set(req.unit_code, {
          unitCode: req.unit_code,
          unitTitle: req.unit_title,
          totalACs: 0,
          evidencedACs: 0,
          percentage: 0,
          gaps: [],
        });
      }

      const unit = units.get(req.unit_code)!;

      // Each row is one AC
      unit.totalACs++;
      const acRef = req.ac_code;
      const fullRef = `${req.unit_code}.${acRef}`;
      if (evidencedACs.has(fullRef) || evidencedACs.has(acRef)) {
        unit.evidencedACs++;
      } else {
        unit.gaps.push(`${req.unit_code} AC ${acRef}: ${req.ac_text}`);
      }
    }

    // Calculate percentages
    for (const unit of units.values()) {
      unit.percentage =
        unit.totalACs > 0 ? Math.round((unit.evidencedACs / unit.totalACs) * 100) : 0;
    }

    return Array.from(units.values());
  }, [requirements, evidencedACs]);

  // Overall stats
  const overall = useMemo(() => {
    const total = unitProgress.reduce((s, u) => s + u.totalACs, 0);
    const evidenced = unitProgress.reduce((s, u) => s + u.evidencedACs, 0);
    return {
      total,
      evidenced,
      percentage: total > 0 ? Math.round((evidenced / total) * 100) : 0,
    };
  }, [unitProgress]);

  const allGaps = useMemo(() => unitProgress.flatMap((u) => u.gaps), [unitProgress]);

  // Group requirements by unit → LO for accordion display
  const unitLOGroups = useMemo(() => {
    const result: Map<string, { loNumber: number | null; loText: string; acs: QualificationRequirement[] }[]> = new Map();

    for (const req of requirements) {
      if (!result.has(req.unit_code)) {
        result.set(req.unit_code, []);
      }
      const loGroups = result.get(req.unit_code)!;
      const loKey = req.lo_number ?? -1;
      let loGroup = loGroups.find((g) => (g.loNumber ?? -1) === loKey);
      if (!loGroup) {
        loGroup = { loNumber: req.lo_number, loText: req.lo_text, acs: [] };
        loGroups.push(loGroup);
      }
      loGroup.acs.push(req);
    }

    return result;
  }, [requirements]);

  const progressBarColour = (pct: number) => {
    if (pct >= 75) return 'bg-green-500';
    if (pct >= 25) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const textColour = (pct: number) => {
    if (pct >= 75) return 'text-green-400';
    if (pct >= 25) return 'text-amber-400';
    return 'text-red-400';
  };

  if (!qualificationCode) {
    return (
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 text-center">
        <BookOpen className="h-8 w-8 text-white/20 mx-auto mb-3" />
        <p className="text-sm text-white/50">Select a qualification to track your progress</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin h-6 w-6 border-2 border-elec-yellow border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Overall progress card */}
      <div className="rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-elec-yellow" />
            <h3 className="text-sm font-semibold text-white">Overall Progress</h3>
          </div>
          <span className={`text-lg font-bold ${textColour(overall.percentage)}`}>
            {overall.percentage}%
          </span>
        </div>

        {qualificationName && <p className="text-[11px] text-white/50 mb-3">{qualificationName}</p>}

        {/* Overall progress bar */}
        <div className="h-3 rounded-full bg-white/[0.06] overflow-hidden mb-2">
          <div
            className={`h-full rounded-full transition-all duration-500 ${progressBarColour(overall.percentage)}`}
            style={{ width: `${overall.percentage}%` }}
          />
        </div>

        <div className="flex justify-between text-[11px] text-white/50">
          <span>
            {overall.evidenced} of {overall.total} ACs evidenced
          </span>
          <span>{overall.total - overall.evidenced} remaining</span>
        </div>
      </div>

      {/* Per-unit progress */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="w-full flex items-center justify-between px-4 py-3 touch-manipulation active:bg-white/[0.03] transition-colors"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5 text-elec-yellow" />
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Unit Breakdown
            </h4>
            <span className="text-[10px] text-white/60 font-medium px-1.5 py-0.5 rounded-full bg-white/[0.06]">
              {unitProgress.length} units
            </span>
          </div>
          {showBreakdown ? (
            <ChevronUp className="h-4 w-4 text-white" />
          ) : (
            <ChevronDown className="h-4 w-4 text-white" />
          )}
        </button>

        {showBreakdown && <div className="divide-y divide-white/[0.04] max-h-[60vh] overflow-y-auto overscroll-contain border-t border-white/[0.06]">
          {unitProgress.map((unit) => {
            const isExpanded = expandedUnits.has(unit.unitCode);
            const loGroups = unitLOGroups.get(unit.unitCode) || [];

            return (
              <div key={unit.unitCode}>
                {/* Unit header — clickable */}
                <button
                  onClick={() => {
                    setExpandedUnits((prev) => {
                      const next = new Set(prev);
                      if (next.has(unit.unitCode)) {
                        next.delete(unit.unitCode);
                      } else {
                        next.add(unit.unitCode);
                      }
                      return next;
                    });
                  }}
                  className="w-full px-4 py-3 touch-manipulation active:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 flex-1 min-w-0 mr-3">
                      {isExpanded ? (
                        <ChevronDown className="h-3.5 w-3.5 text-white flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5 text-white flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0 text-left">
                        <span className="text-[10px] font-bold text-elec-yellow">
                          Unit {unit.unitCode}
                        </span>
                        <p className="text-xs text-white truncate">{unit.unitTitle}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-medium flex-shrink-0 ${textColour(unit.percentage)}`}
                    >
                      {unit.evidencedACs}/{unit.totalACs}
                    </span>
                  </div>

                  <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden" style={{ marginLeft: '22px' }}>
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${progressBarColour(unit.percentage)}`}
                      style={{ width: `${unit.percentage}%` }}
                    />
                  </div>
                </button>

                {/* Expanded: LO accordion */}
                {isExpanded && loGroups.length > 0 && (
                  <div className="border-t border-white/[0.04]">
                    {loGroups.map((lo) => {
                      const loKey = `${unit.unitCode}-${lo.loNumber}`;
                      const loExpanded = expandedLOs.has(loKey);

                      return (
                        <div key={loKey} className="border-b border-white/[0.03] last:border-b-0">
                          {/* LO header — clickable */}
                          <button
                            onClick={() => {
                              setExpandedLOs((prev) => {
                                const next = new Set(prev);
                                if (next.has(loKey)) {
                                  next.delete(loKey);
                                } else {
                                  next.add(loKey);
                                }
                                return next;
                              });
                            }}
                            className="w-full flex items-start gap-2 px-4 py-2.5 touch-manipulation active:bg-white/[0.03] transition-colors min-h-[44px]"
                            style={{ paddingLeft: '36px' }}
                          >
                            {loExpanded ? (
                              <ChevronDown className="h-3 w-3 text-white/80 mt-1 flex-shrink-0" />
                            ) : (
                              <ChevronRight className="h-3 w-3 text-white/80 mt-1 flex-shrink-0" />
                            )}
                            <div className="flex-1 text-left">
                              {lo.loNumber != null && (
                                <span className="text-[10px] font-semibold text-elec-yellow/80 uppercase tracking-wider">
                                  LO{lo.loNumber}
                                </span>
                              )}
                              <p className="text-[11px] text-white leading-relaxed">
                                {lo.loText}
                              </p>
                            </div>
                          </button>

                          {/* ACs under this LO */}
                          {loExpanded && (
                            <div className="pb-2.5 space-y-1" style={{ paddingLeft: '56px', paddingRight: '16px' }}>
                              {lo.acs.map((ac) => {
                                const fullRef = `${ac.unit_code}.${ac.ac_code}`;
                                const isEvidenced =
                                  evidencedACs.has(fullRef) || evidencedACs.has(ac.ac_code);
                                return (
                                  <div key={ac.id} className="flex items-start gap-2">
                                    {isEvidenced ? (
                                      <CheckCircle2 className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                                    ) : (
                                      <Circle className="h-3.5 w-3.5 text-white/30 mt-0.5 flex-shrink-0" />
                                    )}
                                    <p
                                      className={`text-[11px] leading-relaxed ${
                                        isEvidenced ? 'text-green-400' : 'text-white'
                                      }`}
                                    >
                                      <span className="font-semibold">{ac.ac_code}</span>{' '}
                                      {ac.ac_text}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>}
      </div>

      {/* Gap analysis */}
      {allGaps.length > 0 && (
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
          <button
            onClick={() => setShowGaps(!showGaps)}
            className="w-full flex items-center justify-between px-4 py-3 touch-manipulation active:bg-white/[0.03] transition-colors"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                Gaps to Fill
              </h4>
              <span className="text-[10px] text-amber-400/70 font-medium px-1.5 py-0.5 rounded-full bg-amber-400/10">
                {allGaps.length}
              </span>
            </div>
            {showGaps ? (
              <ChevronUp className="h-4 w-4 text-white/40" />
            ) : (
              <ChevronDown className="h-4 w-4 text-white/40" />
            )}
          </button>

          {showGaps && (
            <div className="px-4 pb-3 space-y-1 max-h-60 overflow-y-auto overscroll-contain">
              {allGaps.slice(0, 30).map((gap, idx) => (
                <p key={idx} className="text-[11px] text-white leading-relaxed text-left">
                  {gap}
                </p>
              ))}
              {allGaps.length > 30 && (
                <p className="text-[11px] text-white/60 italic text-left">
                  ...and {allGaps.length - 30} more
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
