/**
 * CriteriaLinkerSheet
 *
 * Bottom sheet opened when an assessor taps "Link to Criteria" on a
 * portfolio item. Shows the full criteria tree for the category and
 * lets the assessor check which ACs this evidence satisfies.
 */

import React, { useState, useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Pill } from '@/components/college/primitives';
import type { CriteriaChecklistData } from '@/hooks/college/useSubmissionCriteria';

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

const eyebrow = 'text-[10px] font-medium uppercase tracking-[0.16em] text-white/55';

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
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)]">
        <div className="flex flex-col h-full">
          <div className="flex justify-center pt-2.5 pb-1">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          <SheetHeader className="flex-shrink-0 border-b border-white/[0.06] px-5 pb-4">
            <div className={eyebrow}>Link Evidence</div>
            <SheetTitle className="text-[18px] font-semibold text-white mt-1 text-left">
              Link to criteria
            </SheetTitle>
            <p className="text-[12.5px] text-white/55 mt-1 text-left">
              Select which assessment criteria this evidence satisfies
            </p>
            <p className="text-[13px] text-elec-yellow font-medium truncate mt-1">{itemTitle}</p>

            <input
              placeholder="Search criteria…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full mt-3 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/65 focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
            />

            <div className="flex items-center justify-between mt-3">
              <Pill tone="yellow">{selectedACs.size} selected</Pill>
              {selectedACs.size > 0 && (
                <button
                  type="button"
                  className="text-[12px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation"
                  onClick={() => setSelectedACs(new Set())}
                >
                  Clear all
                </button>
              )}
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-2">
            {filteredLOs.map((lo) => (
              <Collapsible
                key={lo.loNumber}
                open={expandedLOs.has(lo.loNumber)}
                onOpenChange={() => toggleLO(lo.loNumber)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] border border-white/[0.06] transition-colors h-11 touch-manipulation">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      aria-hidden
                      className={`text-[11px] text-white/75 w-4 shrink-0 transition-transform ${expandedLOs.has(lo.loNumber) ? 'rotate-90' : ''}`}
                    >
                      ›
                    </span>
                    <span className="text-[13px] font-medium text-white truncate">
                      LO{lo.loNumber}: {lo.loText}
                    </span>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="ml-2 mt-1 space-y-1 border-l border-white/10 pl-3">
                    {lo.criteria.map((criterion) => {
                      const isSelected = selectedACs.has(criterion.acRef);

                      return (
                        <button
                          key={criterion.acRef}
                          onClick={() => toggleAC(criterion.acRef)}
                          className={`flex items-start gap-3 w-full p-3 rounded-xl transition-colors text-left h-auto min-h-[44px] touch-manipulation ${
                            isSelected
                              ? 'bg-elec-yellow/10 border border-elec-yellow/30'
                              : 'bg-[hsl(0_0%_9%)] border border-white/[0.06] hover:bg-[hsl(0_0%_11%)]'
                          }`}
                        >
                          <Checkbox
                            checked={isSelected}
                            className="mt-0.5 h-5 w-5 shrink-0 pointer-events-none border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2">
                              <span className="text-[11.5px] font-mono text-elec-yellow shrink-0">
                                {criterion.acRef}
                              </span>
                              <p className="text-[13px] text-white leading-snug">
                                {criterion.acText}
                              </p>
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
              <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-10 text-center">
                <div className="text-[13px] text-white/70">No criteria match your search.</div>
              </div>
            )}
          </div>

          <SheetFooter className="flex-shrink-0 border-t border-white/[0.06] p-4">
            <div className="flex gap-2 w-full">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="flex-1 h-11 text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation border border-white/[0.08] rounded-full"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!hasChanges || isSaving}
                className="flex-1 h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
              >
                {isSaving ? 'Saving…' : 'Save Linkage →'}
              </button>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CriteriaLinkerSheet;
