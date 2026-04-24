/**
 * CriteriaLinkerSheet
 *
 * Bottom sheet opened when an assessor taps "Link to Criteria" on a
 * portfolio item. Shows the full criteria tree for the category and
 * lets the assessor check which ACs this evidence satisfies.
 */

import React, { useState, useMemo } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Pill,
  SheetShell,
  PrimaryButton,
  SecondaryButton,
  EmptyState,
  inputClass,
  checkboxClass,
} from '@/components/college/primitives';
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
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow="Link Evidence"
          title="Link to criteria"
          description={
            <>
              <span>Select which assessment criteria this evidence satisfies</span>
              <span className="block mt-1 text-[13px] text-elec-yellow font-medium truncate">
                {itemTitle}
              </span>
            </>
          }
          footer={
            <>
              <SecondaryButton fullWidth onClick={() => onOpenChange(false)}>
                Cancel
              </SecondaryButton>
              <PrimaryButton
                fullWidth
                onClick={handleSave}
                disabled={!hasChanges || isSaving}
              >
                {isSaving ? 'Saving…' : 'Save Linkage →'}
              </PrimaryButton>
            </>
          }
        >
          <input
            placeholder="Search criteria…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={inputClass}
          />

          <div className="flex items-center justify-between">
            <Pill tone="yellow">{selectedACs.size} selected</Pill>
            {selectedACs.size > 0 && (
              <button
                type="button"
                className="text-[12px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation"
                onClick={() => setSelectedACs(new Set())}
              >
                Clear all
              </button>
            )}
          </div>

          <div className="space-y-2">
            {filteredLOs.map((lo) => (
              <Collapsible
                key={lo.loNumber}
                open={expandedLOs.has(lo.loNumber)}
                onOpenChange={() => toggleLO(lo.loNumber)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] border border-white/[0.08] transition-colors h-11 touch-manipulation">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      aria-hidden
                      className={`text-[11px] text-white w-4 shrink-0 transition-transform ${expandedLOs.has(lo.loNumber) ? 'rotate-90' : ''}`}
                    >
                      ›
                    </span>
                    <span className="text-[13px] font-medium text-white truncate">
                      LO{lo.loNumber}: {lo.loText}
                    </span>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="ml-2 mt-1 space-y-1 border-l border-white/[0.08] pl-3">
                    {lo.criteria.map((criterion) => {
                      const isSelected = selectedACs.has(criterion.acRef);

                      return (
                        <button
                          key={criterion.acRef}
                          onClick={() => toggleAC(criterion.acRef)}
                          className={`flex items-start gap-3 w-full p-3 rounded-xl transition-colors text-left h-auto min-h-[44px] touch-manipulation ${
                            isSelected
                              ? 'bg-elec-yellow/10 border border-elec-yellow/30'
                              : 'bg-[hsl(0_0%_9%)] border border-white/[0.08] hover:bg-[hsl(0_0%_11%)]'
                          }`}
                        >
                          <Checkbox
                            checked={isSelected}
                            className={`${checkboxClass} mt-0.5 shrink-0 pointer-events-none`}
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
              <EmptyState title="No criteria match your search." />
            )}
          </div>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

export default CriteriaLinkerSheet;
