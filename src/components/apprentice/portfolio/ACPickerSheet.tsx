/**
 * ACPickerSheet
 *
 * Bottom sheet for selecting assessment criteria when adding portfolio evidence.
 * Shows hierarchical Unit → LO → AC accordion with checkboxes for multi-select.
 */

import { useState, useMemo } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Search,
  X,
} from "lucide-react";
import {
  useQualificationACs,
  type QualificationUnit,
} from "@/hooks/qualification/useQualificationACs";

interface ACPickerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requirementCode: string | null;
  /** Currently selected AC refs in "unitCode.acRef" format */
  selectedACs: string[];
  /** ACs already evidenced (shown green, info only) */
  evidencedACs?: Set<string>;
  onDone: (selected: string[]) => void;
}

export function ACPickerSheet({
  open,
  onOpenChange,
  requirementCode,
  selectedACs,
  evidencedACs = new Set(),
  onDone,
}: ACPickerSheetProps) {
  const { tree, isLoading } = useQualificationACs(requirementCode);
  const [localSelected, setLocalSelected] = useState<Set<string>>(
    new Set(selectedACs),
  );
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());
  const [expandedLOs, setExpandedLOs] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  // Reset local state when sheet opens
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setLocalSelected(new Set(selectedACs));
      setSearchQuery("");
    }
    onOpenChange(isOpen);
  };

  const toggleAC = (acFullRef: string) => {
    setLocalSelected((prev) => {
      const next = new Set(prev);
      if (next.has(acFullRef)) {
        next.delete(acFullRef);
      } else {
        next.add(acFullRef);
      }
      return next;
    });
  };

  const toggleUnit = (unitCode: string) => {
    setExpandedUnits((prev) => {
      const next = new Set(prev);
      if (next.has(unitCode)) next.delete(unitCode);
      else next.add(unitCode);
      return next;
    });
  };

  const toggleLO = (loKey: string) => {
    setExpandedLOs((prev) => {
      const next = new Set(prev);
      if (next.has(loKey)) next.delete(loKey);
      else next.add(loKey);
      return next;
    });
  };

  const filteredUnits = useMemo(() => {
    if (!searchQuery.trim()) return tree.units;

    const q = searchQuery.toLowerCase();
    return tree.units
      .map((unit) => ({
        ...unit,
        learningOutcomes: unit.learningOutcomes
          .map((lo) => ({
            ...lo,
            assessmentCriteria: lo.assessmentCriteria.filter(
              (ac) =>
                ac.acText.toLowerCase().includes(q) ||
                ac.acFullRef.toLowerCase().includes(q),
            ),
          }))
          .filter(
            (lo) =>
              lo.assessmentCriteria.length > 0 ||
              lo.loText.toLowerCase().includes(q),
          ),
      }))
      .filter(
        (unit) =>
          unit.learningOutcomes.length > 0 ||
          unit.unitTitle.toLowerCase().includes(q) ||
          unit.unitCode.toLowerCase().includes(q),
      );
  }, [tree.units, searchQuery]);

  const handleDone = () => {
    onDone(Array.from(localSelected));
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
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
              <div className="flex items-center justify-between">
                <SheetTitle className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="h-4.5 w-4.5 text-elec-yellow" />
                  Select Assessment Criteria
                </SheetTitle>
                {localSelected.size > 0 && (
                  <Badge className="bg-elec-yellow text-black text-xs font-bold">
                    {localSelected.size} selected
                  </Badge>
                )}
              </div>
              <p className="text-xs text-white/50 mt-0.5">
                Choose the criteria this evidence demonstrates
              </p>
            </div>

            {/* Search */}
            <div className="px-4 pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search criteria..."
                  className="w-full h-11 pl-10 pr-10 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm placeholder:text-white/50 focus:outline-none focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20 touch-manipulation"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
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
            ) : filteredUnits.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-8 w-8 text-white/20 mx-auto mb-3" />
                <p className="text-sm text-white/50">
                  {requirementCode
                    ? "No criteria found"
                    : "No qualification selected"}
                </p>
              </div>
            ) : (
              filteredUnits.map((unit) => (
                <UnitAccordion
                  key={unit.unitCode}
                  unit={unit}
                  isExpanded={expandedUnits.has(unit.unitCode)}
                  expandedLOs={expandedLOs}
                  localSelected={localSelected}
                  evidencedACs={evidencedACs}
                  onToggleUnit={() => toggleUnit(unit.unitCode)}
                  onToggleLO={toggleLO}
                  onToggleAC={toggleAC}
                />
              ))
            )}
            <div className="h-4" />
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 border-t border-white/[0.06] px-4 py-3 pb-safe">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12 border-white/20 text-white touch-manipulation active:scale-[0.98]"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
                onClick={handleDone}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Done ({localSelected.size})
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function UnitAccordion({
  unit,
  isExpanded,
  expandedLOs,
  localSelected,
  evidencedACs,
  onToggleUnit,
  onToggleLO,
  onToggleAC,
}: {
  unit: QualificationUnit;
  isExpanded: boolean;
  expandedLOs: Set<string>;
  localSelected: Set<string>;
  evidencedACs: Set<string>;
  onToggleUnit: () => void;
  onToggleLO: (loKey: string) => void;
  onToggleAC: (acFullRef: string) => void;
}) {
  // Count selected ACs in this unit
  const selectedInUnit = unit.learningOutcomes.reduce(
    (count, lo) =>
      count +
      lo.assessmentCriteria.filter((ac) => localSelected.has(ac.acFullRef))
        .length,
    0,
  );

  const totalInUnit = unit.learningOutcomes.reduce(
    (count, lo) => count + lo.assessmentCriteria.length,
    0,
  );

  return (
    <div className="rounded-xl border border-white/[0.08] overflow-hidden">
      <button
        onClick={onToggleUnit}
        className="w-full flex items-center gap-3 px-4 py-3.5 bg-white/[0.03] touch-manipulation active:bg-white/[0.06] transition-colors"
      >
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-white/60 flex-shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 text-white/60 flex-shrink-0" />
        )}
        <div className="flex-1 text-left min-w-0">
          <span className="text-xs font-bold text-elec-yellow">
            Unit {unit.unitCode}
          </span>
          <p className="text-sm text-white truncate">{unit.unitTitle}</p>
        </div>
        <div className="flex items-center gap-1.5">
          {selectedInUnit > 0 && (
            <Badge className="bg-elec-yellow text-black text-[10px] font-bold">
              {selectedInUnit}
            </Badge>
          )}
          <span className="text-xs text-white/40">{totalInUnit} ACs</span>
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-white/[0.06]">
          {unit.learningOutcomes.map((lo) => {
            const loKey = `${unit.unitCode}-${lo.loNumber}`;
            const loExpanded = expandedLOs.has(loKey);

            return (
              <div
                key={loKey}
                className="border-b border-white/[0.04] last:border-b-0"
              >
                <button
                  onClick={() => onToggleLO(loKey)}
                  className="w-full flex items-start gap-2.5 px-4 py-2.5 pl-10 touch-manipulation active:bg-white/[0.03] transition-colors"
                >
                  {loExpanded ? (
                    <ChevronDown className="h-3.5 w-3.5 text-white/40 mt-0.5 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 text-white/40 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1 text-left">
                    {lo.loNumber && (
                      <span className="text-[10px] font-medium text-white/50 uppercase tracking-wider">
                        LO{lo.loNumber}
                      </span>
                    )}
                    <p className="text-xs text-white/80 leading-relaxed">
                      {lo.loText}
                    </p>
                  </div>
                </button>

                {loExpanded && lo.assessmentCriteria.length > 0 && (
                  <div className="pl-14 pr-4 pb-2.5 space-y-1.5">
                    {lo.assessmentCriteria.map((ac) => {
                      const isSelected = localSelected.has(ac.acFullRef);
                      const isEvidenced = evidencedACs.has(ac.acFullRef);

                      return (
                        <button
                          key={ac.acFullRef}
                          onClick={() => onToggleAC(ac.acFullRef)}
                          className={cn(
                            "w-full flex items-start gap-2.5 text-left py-1.5 touch-manipulation rounded-lg px-1 -mx-1",
                            isSelected && "bg-elec-yellow/10",
                            isEvidenced && !isSelected && "bg-green-500/5",
                          )}
                        >
                          <Checkbox
                            checked={isSelected}
                            className="mt-0.5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                            tabIndex={-1}
                          />
                          <div className="flex-1 min-w-0">
                            <p
                              className={cn(
                                "text-[11px] leading-relaxed",
                                isEvidenced
                                  ? "text-green-400/80"
                                  : "text-white/60",
                              )}
                            >
                              {ac.acText}
                            </p>
                            {isEvidenced && (
                              <span className="text-[9px] text-green-400/60 font-medium">
                                Already evidenced
                              </span>
                            )}
                          </div>
                        </button>
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
}

export default ACPickerSheet;
