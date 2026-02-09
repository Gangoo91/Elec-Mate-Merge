/**
 * QualificationRequirements
 *
 * Bottom-sheet accordion browser showing all units, learning outcomes,
 * and assessment criteria for the student's enrolled qualification.
 *
 * Each AC shows status: green (evidenced), amber (partial), grey (not started).
 * Status is determined by cross-referencing portfolio_items.assessment_criteria_met.
 */

import { useState, useEffect, useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/ui/sheet';
import { ChevronDown, ChevronRight, BookOpen, CheckCircle2, Circle, Search, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface QualificationRequirement {
  id: string;
  qualification_code: string;
  qualification_name: string;
  unit_code: string;
  unit_title: string;
  learning_outcome_number: string | null;
  learning_outcome: string;
  assessment_criteria: string[];
  topic_area: string | null;
  level: number | null;
}

interface QualificationRequirementsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  qualificationCode: string | null;
  /** Set of AC identifiers the student has already evidenced (e.g. "301.2.3") */
  evidencedACs?: Set<string>;
}

interface UnitGroup {
  unitCode: string;
  unitTitle: string;
  requirements: QualificationRequirement[];
}

export function QualificationRequirements({
  open,
  onOpenChange,
  qualificationCode,
  evidencedACs = new Set(),
}: QualificationRequirementsProps) {
  const [requirements, setRequirements] = useState<QualificationRequirement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());
  const [expandedLOs, setExpandedLOs] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  // Load requirements when opened
  useEffect(() => {
    if (!open || !qualificationCode) return;

    let cancelled = false;

    async function load() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('qualification_requirements')
          .select('*')
          .eq('qualification_code', qualificationCode!)
          .order('unit_code', { ascending: true })
          .order('learning_outcome_number', { ascending: true });

        if (error) throw error;
        if (!cancelled) {
          setRequirements((data as QualificationRequirement[]) || []);
        }
      } catch (err) {
        console.error('[QualificationRequirements] Load error:', err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [open, qualificationCode]);

  // Group by unit
  const unitGroups = useMemo(() => {
    const groups: Map<string, UnitGroup> = new Map();
    const filtered = searchQuery.trim()
      ? requirements.filter((r) => {
          const q = searchQuery.toLowerCase();
          return (
            r.unit_title.toLowerCase().includes(q) ||
            r.learning_outcome.toLowerCase().includes(q) ||
            r.assessment_criteria.some((ac) => ac.toLowerCase().includes(q)) ||
            r.unit_code.toLowerCase().includes(q)
          );
        })
      : requirements;

    for (const req of filtered) {
      if (!groups.has(req.unit_code)) {
        groups.set(req.unit_code, {
          unitCode: req.unit_code,
          unitTitle: req.unit_title,
          requirements: [],
        });
      }
      groups.get(req.unit_code)!.requirements.push(req);
    }

    return Array.from(groups.values());
  }, [requirements, searchQuery]);

  const toggleUnit = (unitCode: string) => {
    setExpandedUnits((prev) => {
      const next = new Set(prev);
      if (next.has(unitCode)) {
        next.delete(unitCode);
      } else {
        next.add(unitCode);
      }
      return next;
    });
  };

  const toggleLO = (loKey: string) => {
    setExpandedLOs((prev) => {
      const next = new Set(prev);
      if (next.has(loKey)) {
        next.delete(loKey);
      } else {
        next.add(loKey);
      }
      return next;
    });
  };

  // Count evidenced ACs per unit
  const getUnitProgress = (group: UnitGroup) => {
    let total = 0;
    let evidenced = 0;
    for (const req of group.requirements) {
      for (const ac of req.assessment_criteria) {
        total++;
        const acRef = ac.split(' ')[0]; // e.g. "2.3" from "2.3 Describe..."
        const fullRef = `${req.unit_code}.${acRef}`;
        if (evidencedACs.has(fullRef) || evidencedACs.has(acRef)) {
          evidenced++;
        }
      }
    }
    return { total, evidenced };
  };

  const getACStatus = (unitCode: string, acText: string): 'evidenced' | 'not_started' => {
    const acRef = acText.split(' ')[0];
    const fullRef = `${unitCode}.${acRef}`;
    if (evidencedACs.has(fullRef) || evidencedACs.has(acRef)) {
      return 'evidenced';
    }
    return 'not_started';
  };

  const progressColour = (pct: number) => {
    if (pct >= 75) return 'text-green-400 bg-green-400/10';
    if (pct >= 25) return 'text-amber-400 bg-amber-400/10';
    return 'text-white/40 bg-white/[0.04]';
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden [&>button.absolute]:hidden sm:max-w-[640px] sm:mx-auto sm:rounded-t-2xl"
      >
        <div className="flex flex-col h-full bg-[hsl(240,5.9%,10%)]">
          {/* Header */}
          <SheetHeader className="flex-shrink-0 border-b border-white/[0.06]">
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="h-1 w-10 rounded-full bg-white/30" />
            </div>
            <div className="px-4 pb-3">
              <SheetTitle className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="h-4.5 w-4.5 text-elec-yellow" />
                Qualification Requirements
              </SheetTitle>
              <p className="text-xs text-white/50 mt-0.5">
                {requirements.length > 0 ? requirements[0].qualification_name : 'Loading...'}
              </p>
            </div>

            {/* Search */}
            <div className="px-4 pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search units, outcomes, criteria..."
                  className="w-full h-11 pl-10 pr-10 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm placeholder:text-white/50 focus:outline-none focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20 touch-manipulation"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full active:bg-white/10 touch-manipulation"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                )}
              </div>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 space-y-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin h-6 w-6 border-2 border-elec-yellow border-t-transparent rounded-full" />
              </div>
            ) : unitGroups.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-8 w-8 text-white/20 mx-auto mb-3" />
                <p className="text-sm text-white/50">
                  {qualificationCode
                    ? 'No requirements found for this qualification'
                    : 'Select a qualification to view requirements'}
                </p>
              </div>
            ) : (
              unitGroups.map((group) => {
                const { total, evidenced } = getUnitProgress(group);
                const pct = total > 0 ? Math.round((evidenced / total) * 100) : 0;
                const isExpanded = expandedUnits.has(group.unitCode);

                return (
                  <div
                    key={group.unitCode}
                    className="rounded-xl border border-white/[0.08] overflow-hidden"
                  >
                    {/* Unit header */}
                    <button
                      onClick={() => toggleUnit(group.unitCode)}
                      className="w-full flex items-center gap-3 px-4 py-3.5 bg-white/[0.03] touch-manipulation active:bg-white/[0.06] transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-white/60 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-white/60 flex-shrink-0" />
                      )}
                      <div className="flex-1 text-left min-w-0">
                        <span className="text-xs font-bold text-elec-yellow">
                          Unit {group.unitCode}
                        </span>
                        <p className="text-sm text-white truncate">{group.unitTitle}</p>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${progressColour(pct)}`}
                      >
                        {evidenced}/{total}
                      </span>
                    </button>

                    {/* Expanded: Learning Outcomes */}
                    {isExpanded && (
                      <div className="border-t border-white/[0.06]">
                        {group.requirements.map((req) => {
                          const loKey = `${req.unit_code}-${req.learning_outcome_number}`;
                          const loExpanded = expandedLOs.has(loKey);

                          return (
                            <div
                              key={req.id}
                              className="border-b border-white/[0.04] last:border-b-0"
                            >
                              {/* LO header */}
                              <button
                                onClick={() => toggleLO(loKey)}
                                className="w-full flex items-start gap-2.5 px-4 py-2.5 pl-10 touch-manipulation active:bg-white/[0.03] transition-colors"
                              >
                                {loExpanded ? (
                                  <ChevronDown className="h-3.5 w-3.5 text-white/40 mt-0.5 flex-shrink-0" />
                                ) : (
                                  <ChevronRight className="h-3.5 w-3.5 text-white/40 mt-0.5 flex-shrink-0" />
                                )}
                                <div className="flex-1 text-left">
                                  {req.learning_outcome_number && (
                                    <span className="text-[10px] font-medium text-white/50 uppercase tracking-wider">
                                      LO{req.learning_outcome_number}
                                    </span>
                                  )}
                                  <p className="text-xs text-white/80 leading-relaxed">
                                    {req.learning_outcome}
                                  </p>
                                </div>
                              </button>

                              {/* AC list */}
                              {loExpanded && req.assessment_criteria.length > 0 && (
                                <div className="pl-16 pr-4 pb-2.5 space-y-1">
                                  {req.assessment_criteria.map((ac, idx) => {
                                    const status = getACStatus(req.unit_code, ac);
                                    return (
                                      <div key={idx} className="flex items-start gap-2">
                                        {status === 'evidenced' ? (
                                          <CheckCircle2 className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                                        ) : (
                                          <Circle className="h-3.5 w-3.5 text-white/20 mt-0.5 flex-shrink-0" />
                                        )}
                                        <p
                                          className={`text-[11px] leading-relaxed ${
                                            status === 'evidenced'
                                              ? 'text-green-400/80'
                                              : 'text-white/60'
                                          }`}
                                        >
                                          {ac}
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
              })
            )}

            {/* Bottom breathing room */}
            <div className="h-4" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
