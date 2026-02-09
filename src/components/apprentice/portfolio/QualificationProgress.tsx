/**
 * QualificationProgress
 *
 * Dashboard showing overall qualification completion, per-unit progress bars,
 * and a gap analysis of unmet assessment criteria.
 *
 * Colour-coded: green >75%, amber 25-75%, red <25%.
 */

import { useState, useEffect, useMemo } from 'react';
import { Target, TrendingUp, AlertTriangle, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface QualificationRequirement {
  id: string;
  unit_code: string;
  unit_title: string;
  learning_outcome_number: string | null;
  learning_outcome: string;
  assessment_criteria: string[];
  topic_area: string | null;
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

  useEffect(() => {
    if (!qualificationCode) return;

    let cancelled = false;

    async function load() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('qualification_requirements')
          .select(
            'id, unit_code, unit_title, learning_outcome_number, learning_outcome, assessment_criteria, topic_area'
          )
          .eq('qualification_code', qualificationCode!)
          .order('unit_code', { ascending: true });

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

      for (const ac of req.assessment_criteria) {
        unit.totalACs++;
        const acRef = ac.split(' ')[0];
        const fullRef = `${req.unit_code}.${acRef}`;
        if (evidencedACs.has(fullRef) || evidencedACs.has(acRef)) {
          unit.evidencedACs++;
        } else {
          unit.gaps.push(`${req.unit_code} AC ${ac}`);
        }
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
        <div className="px-4 py-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5 text-white/60" />
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Unit Breakdown
            </h4>
          </div>
        </div>

        <div className="divide-y divide-white/[0.04]">
          {unitProgress.map((unit) => (
            <div key={unit.unitCode} className="px-4 py-3">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex-1 min-w-0 mr-3">
                  <span className="text-[10px] font-bold text-elec-yellow">
                    Unit {unit.unitCode}
                  </span>
                  <p className="text-xs text-white/70 truncate">{unit.unitTitle}</p>
                </div>
                <span
                  className={`text-xs font-medium flex-shrink-0 ${textColour(unit.percentage)}`}
                >
                  {unit.evidencedACs}/{unit.totalACs}
                </span>
              </div>

              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${progressBarColour(unit.percentage)}`}
                  style={{ width: `${unit.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
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
                <p key={idx} className="text-[11px] text-white/50 leading-relaxed">
                  {gap}
                </p>
              ))}
              {allGaps.length > 30 && (
                <p className="text-[11px] text-white/30 italic">
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
