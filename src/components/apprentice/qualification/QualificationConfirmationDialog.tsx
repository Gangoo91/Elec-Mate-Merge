/**
 * QualificationConfirmationDialog
 *
 * Bottom sheet showing the real course requirements (units, LOs, ACs)
 * from qualification_requirements. Lets the user review what's needed
 * before confirming their portfolio setup.
 */

import { useState, useEffect, useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  CalendarDays,
  GraduationCap,
  Clock,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Layers,
  FileText,
  Loader2,
} from 'lucide-react';
import { Qualification, QualificationCategory } from '@/types/qualification';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface RawRequirement {
  unit_code: string;
  unit_title: string;
  lo_number: number | null;
  lo_text: string;
  ac_code: string;
  ac_text: string;
}

interface UnitSummary {
  unitCode: string;
  unitTitle: string;
  loCount: number;
  acCount: number;
  learningOutcomes: {
    loNumber: string;
    loText: string;
    acCount: number;
    acs: { code: string; text: string }[];
  }[];
}

interface QualificationConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  qualification: Qualification | null;
  categories: QualificationCategory[];
  onConfirm: (targetDate?: string) => Promise<void>;
}

const QualificationConfirmationDialog = ({
  open,
  onOpenChange,
  qualification,
  categories,
  onConfirm,
}: QualificationConfirmationDialogProps) => {
  const [targetDate, setTargetDate] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());
  const [rawData, setRawData] = useState<RawRequirement[]>([]);
  const [loadingReqs, setLoadingReqs] = useState(false);

  // Load actual requirements when qualification changes
  useEffect(() => {
    if (!qualification?.code || !open) {
      setRawData([]);
      return;
    }

    let cancelled = false;

    async function loadRequirements() {
      setLoadingReqs(true);

      try {
        // The qualification code IS the requirement code for our canonical courses
        // Also check via mappings as a fallback
        let reqCode = qualification!.code;

        const { data: mapping } = await supabase
          .from('qualification_requirement_mappings')
          .select('requirement_code')
          .eq('qualification_code', qualification!.code)
          .eq('is_primary', true)
          .maybeSingle();

        if (mapping?.requirement_code) {
          reqCode = mapping.requirement_code;
        }

        const { data, error } = await supabase
          .from('qualification_requirements')
          .select('unit_code, unit_title, lo_number, lo_text, ac_code, ac_text')
          .eq('qualification_code', reqCode)
          .order('unit_code')
          .order('lo_number')
          .order('ac_code');

        if (error) throw error;
        if (!cancelled) {
          setRawData((data as RawRequirement[]) || []);
        }
      } catch {
        // Non-critical
      } finally {
        if (!cancelled) setLoadingReqs(false);
      }
    }

    loadRequirements();
    return () => {
      cancelled = true;
    };
  }, [qualification?.code, open]);

  // Build unit summaries
  const units = useMemo((): UnitSummary[] => {
    const unitMap = new Map<string, UnitSummary>();
    const loMap = new Map<string, UnitSummary['learningOutcomes'][0]>();

    for (const req of rawData) {
      if (!unitMap.has(req.unit_code)) {
        unitMap.set(req.unit_code, {
          unitCode: req.unit_code,
          unitTitle: req.unit_title,
          loCount: 0,
          acCount: 0,
          learningOutcomes: [],
        });
      }

      const unit = unitMap.get(req.unit_code)!;
      const loKey = `${req.unit_code}-${req.lo_number ?? '0'}`;

      if (!loMap.has(loKey)) {
        const lo = {
          loNumber: String(req.lo_number ?? ''),
          loText: req.lo_text,
          acCount: 0,
          acs: [] as { code: string; text: string }[],
        };
        loMap.set(loKey, lo);
        unit.learningOutcomes.push(lo);
        unit.loCount++;
      }

      const lo = loMap.get(loKey)!;
      lo.acs.push({ code: req.ac_code, text: req.ac_text });
      lo.acCount++;
      unit.acCount++;
    }

    return Array.from(unitMap.values());
  }, [rawData]);

  const totalACs = rawData.length;
  const totalLOs = units.reduce((sum, u) => sum + u.loCount, 0);

  const handleConfirm = async () => {
    if (!qualification) return;

    setIsConfirming(true);
    try {
      await onConfirm(targetDate || undefined);
      onOpenChange(false);
      setTargetDate('');
      setExpandedUnits(new Set());
    } catch {
      toast.error('Failed to select qualification');
    } finally {
      setIsConfirming(false);
    }
  };

  const toggleUnit = (unitCode: string) => {
    const next = new Set(expandedUnits);
    if (next.has(unitCode)) {
      next.delete(unitCode);
    } else {
      next.add(unitCode);
    }
    setExpandedUnits(next);
  };

  const setQuickDate = (months: number) => {
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    setTargetDate(date.toISOString().split('T')[0]);
  };

  if (!qualification) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Drag handle */}
          <div className="w-12 h-1 bg-muted rounded-full mx-auto mt-3 mb-2 flex-shrink-0" />

          {/* Header */}
          <SheetHeader className="px-5 pb-4 flex-shrink-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-elec-yellow text-black font-semibold text-xs">
                {qualification.level}
              </Badge>
              <span className="text-xs text-white/70">{qualification.awarding_body}</span>
            </div>
            <SheetTitle className="text-left text-lg leading-tight">
              {qualification.title}
            </SheetTitle>
          </SheetHeader>

          {/* Stats bar */}
          <div className="flex items-center gap-4 px-5 pb-4 flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm font-semibold text-white">{units.length}</span>
              <span className="text-xs text-white/60">units</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-semibold text-white">{totalLOs}</span>
              <span className="text-xs text-white/60">outcomes</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-green-400" />
              <span className="text-sm font-semibold text-white">{totalACs}</span>
              <span className="text-xs text-white/60">ACs</span>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-5">
            {/* Units accordion */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                Course Units
              </h4>

              {loadingReqs ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-5 w-5 text-elec-yellow animate-spin" />
                  <span className="ml-2 text-sm text-white/60">Loading requirements...</span>
                </div>
              ) : units.length === 0 ? (
                <p className="text-sm text-white/60 text-center py-6">
                  No curriculum data available for this course yet.
                </p>
              ) : (
                <div className="space-y-2">
                  {units.map((unit) => (
                    <Collapsible
                      key={unit.unitCode}
                      open={expandedUnits.has(unit.unitCode)}
                      onOpenChange={() => toggleUnit(unit.unitCode)}
                    >
                      <CollapsibleTrigger asChild>
                        <button
                          className={cn(
                            'w-full text-left p-3.5 rounded-xl transition-all',
                            'bg-white/[0.03] border border-white/[0.08]',
                            'hover:border-white/[0.15] active:scale-[0.99] touch-manipulation',
                            expandedUnits.has(unit.unitCode) &&
                              'border-elec-yellow/30 bg-white/[0.05]'
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={cn(
                                'p-1.5 rounded-lg mt-0.5 flex-shrink-0',
                                expandedUnits.has(unit.unitCode)
                                  ? 'bg-elec-yellow/20'
                                  : 'bg-white/[0.06]'
                              )}
                            >
                              {expandedUnits.has(unit.unitCode) ? (
                                <ChevronDown className="h-4 w-4 text-elec-yellow" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-white/50" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-white leading-tight">
                                {unit.unitTitle}
                              </p>
                              <p className="text-xs text-white/50 mt-1">
                                {unit.unitCode} · {unit.loCount} outcomes · {unit.acCount} ACs
                              </p>
                            </div>
                          </div>
                        </button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="ml-4 mr-1 mt-2 mb-1 space-y-3">
                          {unit.learningOutcomes.map((lo) => (
                            <div key={`${unit.unitCode}-${lo.loNumber}`} className="space-y-1.5">
                              <p className="text-xs font-medium text-blue-400">
                                LO{lo.loNumber}: {lo.loText}
                              </p>
                              <div className="space-y-1 ml-3">
                                {lo.acs.map((ac) => (
                                  <div
                                    key={`${unit.unitCode}-${ac.code}`}
                                    className="flex items-start gap-2 text-xs text-white/70"
                                  >
                                    <span className="text-elec-yellow/70 flex-shrink-0 mt-px">
                                      •
                                    </span>
                                    <span>
                                      <span className="font-medium text-white/90">{ac.code}</span>{' '}
                                      {ac.text}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              )}
            </div>

            {/* Target Date */}
            <div className="space-y-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <Label className="flex items-center gap-2 text-sm font-medium text-white">
                <CalendarDays className="h-4 w-4 text-elec-yellow" />
                Target Completion Date
                <span className="text-white/50 font-normal">(Optional)</span>
              </Label>

              <div className="flex gap-2">
                {[
                  { label: '3 months', months: 3 },
                  { label: '6 months', months: 6 },
                  { label: '1 year', months: 12 },
                ].map(({ label, months }) => (
                  <Button
                    key={months}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setQuickDate(months)}
                    className="flex-1 text-xs h-11 touch-manipulation active:scale-95 border-white/15 bg-white/[0.04]"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {label}
                  </Button>
                ))}
              </div>

              <Input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="bg-background border-white/15 h-11 touch-manipulation"
              />

              <p className="text-xs text-white/50">
                Set a goal to track your progress. You can change this later.
              </p>
            </div>
          </div>

          {/* Sticky footer */}
          <div className="flex-shrink-0 px-5 py-4 border-t border-white/[0.06] bg-background/95 backdrop-blur-xl pb-[max(1rem,env(safe-area-inset-bottom))]">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isConfirming}
                className="flex-1 h-12 rounded-xl touch-manipulation active:scale-[0.97] border-white/15"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={isConfirming}
                className="flex-[2] h-12 rounded-xl bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.97]"
              >
                {isConfirming ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Setting Up...
                  </>
                ) : (
                  <>
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Confirm & Start Portfolio
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default QualificationConfirmationDialog;
