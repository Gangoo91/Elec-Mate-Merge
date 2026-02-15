/**
 * CriteriaLinkerSheet
 *
 * Bottom sheet opened when an assessor taps "Link to Criteria" on a
 * portfolio item. Shows the full criteria tree for the category and
 * lets the assessor check which ACs this evidence satisfies.
 */

import React, { useState, useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Search, Link2, Loader2, CheckCircle2 } from 'lucide-react';
import type {
  CriteriaChecklistData,
  LearningOutcomeGroup,
} from '@/hooks/college/useSubmissionCriteria';

interface CriteriaLinkerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemTitle: string;
  itemId: string;
  checklistData: CriteriaChecklistData;
  currentLinkedACs: string[];
  onSave: (itemId: string, selectedACs: string[]) => void;
  isSaving?: boolean;
}

export function CriteriaLinkerSheet({
  open,
  onOpenChange,
  itemTitle,
  itemId,
  checklistData,
  currentLinkedACs,
  onSave,
  isSaving,
}: CriteriaLinkerSheetProps) {
  const [selectedACs, setSelectedACs] = useState<Set<string>>(new Set(currentLinkedACs));
  const [search, setSearch] = useState('');
  const [expandedLOs, setExpandedLOs] = useState<Set<string>>(
    new Set(checklistData.learningOutcomes.map((lo) => lo.loNumber))
  );

  // Reset selection when sheet opens with new data
  React.useEffect(() => {
    if (open) {
      setSelectedACs(new Set(currentLinkedACs));
      setSearch('');
    }
  }, [open, currentLinkedACs]);

  const toggleAC = (acRef: string) => {
    setSelectedACs((prev) => {
      const next = new Set(prev);
      if (next.has(acRef)) {
        next.delete(acRef);
      } else {
        next.add(acRef);
      }
      return next;
    });
  };

  const toggleLO = (loNumber: string) => {
    setExpandedLOs((prev) => {
      const next = new Set(prev);
      if (next.has(loNumber)) {
        next.delete(loNumber);
      } else {
        next.add(loNumber);
      }
      return next;
    });
  };

  const handleSave = () => {
    onSave(itemId, Array.from(selectedACs));
  };

  const filteredLOs = useMemo(() => {
    if (!search.trim()) return checklistData.learningOutcomes;

    const searchLower = search.toLowerCase();
    return checklistData.learningOutcomes
      .map((lo) => ({
        ...lo,
        criteria: lo.criteria.filter(
          (c) =>
            c.acRef.toLowerCase().includes(searchLower) ||
            c.acText.toLowerCase().includes(searchLower) ||
            c.acFullRef.toLowerCase().includes(searchLower)
        ),
      }))
      .filter((lo) => lo.criteria.length > 0);
  }, [checklistData.learningOutcomes, search]);

  const hasChanges = useMemo(() => {
    const currentSet = new Set(currentLinkedACs);
    if (currentSet.size !== selectedACs.size) return true;
    for (const ac of selectedACs) {
      if (!currentSet.has(ac)) return true;
    }
    return false;
  }, [currentLinkedACs, selectedACs]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Drag handle */}
          <div className="flex justify-center pt-2.5 pb-1">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <SheetHeader className="flex-shrink-0 border-b border-border px-4 pb-4">
            <SheetTitle className="text-base flex items-center gap-2">
              <Link2 className="h-5 w-5 text-elec-yellow" />
              Link Evidence to Criteria
            </SheetTitle>
            <p className="text-sm text-white mt-1">
              Select which assessment criteria this evidence satisfies:
            </p>
            <p className="text-sm text-elec-yellow font-medium truncate">{itemTitle}</p>

            {/* Search */}
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
              <Input
                placeholder="Search criteria..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-11 touch-manipulation bg-white/5 border-elec-gray/40"
              />
            </div>

            {/* Selection count */}
            <div className="flex items-center justify-between mt-2">
              <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
                {selectedACs.size} criteria selected
              </Badge>
              {selectedACs.size > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-white h-8 touch-manipulation"
                  onClick={() => setSelectedACs(new Set())}
                >
                  Clear all
                </Button>
              )}
            </div>
          </SheetHeader>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 space-y-2">
            {filteredLOs.map((lo) => (
              <Collapsible
                key={lo.loNumber}
                open={expandedLOs.has(lo.loNumber)}
                onOpenChange={() => toggleLO(lo.loNumber)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors h-11 touch-manipulation">
                  <div className="flex items-center gap-2 min-w-0">
                    {expandedLOs.has(lo.loNumber) ? (
                      <ChevronDown className="h-4 w-4 text-white shrink-0" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-white shrink-0" />
                    )}
                    <span className="text-sm font-medium text-white truncate">
                      LO{lo.loNumber}: {lo.loText}
                    </span>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="ml-2 mt-1 space-y-1 border-l-2 border-white/10 pl-3">
                    {lo.criteria.map((criterion) => {
                      const isSelected = selectedACs.has(criterion.acRef);

                      return (
                        <button
                          key={criterion.acRef}
                          onClick={() => toggleAC(criterion.acRef)}
                          className={`flex items-start gap-3 w-full p-2.5 rounded-lg transition-colors text-left h-auto min-h-[44px] touch-manipulation ${
                            isSelected
                              ? 'bg-elec-yellow/10 border border-elec-yellow/20'
                              : 'bg-white/[0.02] hover:bg-white/5'
                          }`}
                        >
                          <Checkbox
                            checked={isSelected}
                            className="mt-0.5 h-5 w-5 shrink-0 pointer-events-none border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2">
                              <span className="text-xs font-mono text-elec-yellow shrink-0">
                                {criterion.acRef}
                              </span>
                              <p className="text-sm text-white leading-snug">{criterion.acText}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}

            {filteredLOs.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-sm text-white">No criteria match your search.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <SheetFooter className="flex-shrink-0 border-t border-border p-4">
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                className="flex-1 h-11 touch-manipulation"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/80"
                onClick={handleSave}
                disabled={!hasChanges || isSaving}
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                )}
                Save Linkage
              </Button>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CriteriaLinkerSheet;
