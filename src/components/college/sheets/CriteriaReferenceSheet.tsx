/**
 * CriteriaReferenceSheet
 *
 * Bottom sheet showing the full description for an assessment criterion,
 * required evidence types, quantities, and guidance text. Opened when
 * an assessor taps the "Ref" button on a criterion row.
 */

import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Pill, LoadingState } from '@/components/college/primitives';
import { useEvidenceRequirements } from '@/hooks/useEvidenceRequirements';

// ── Props ──────────────────────────────────────────────────────

interface CriteriaReferenceSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  acRef: string | null;
  acText?: string;
  categoryId: string | null;
}

// ── Component ──────────────────────────────────────────────────

export function CriteriaReferenceSheet({
  open,
  onOpenChange,
  acRef,
  acText,
  categoryId,
}: CriteriaReferenceSheetProps) {
  const { requirements, isLoading } = useEvidenceRequirements({
    categoryId: categoryId ?? undefined,
  });

  // Find the matching requirement for this AC
  const matchingReq = React.useMemo(() => {
    if (!acRef || !requirements.length) return null;
    return requirements.find(
      (r) =>
        r.assessment_criterion === acRef ||
        r.assessment_criterion.includes(acRef) ||
        acRef.includes(r.assessment_criterion)
    );
  }, [acRef, requirements]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)]">
        <div className="flex flex-col h-full">
          {/* Drag handle */}
          <div className="flex justify-center pt-2.5 pb-1">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <SheetHeader className="flex-shrink-0 border-b border-white/[0.06] px-5 pb-4">
            <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
              Criteria Reference
            </div>
            <SheetTitle className="text-[17px] font-semibold text-white mt-1">
              {acRef ? `AC ${acRef}` : 'Criterion'}
            </SheetTitle>
          </SheetHeader>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 space-y-4">
            {isLoading ? (
              <LoadingState />
            ) : (
              <>
                {/* AC Description */}
                <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5">
                  <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40 mb-2">
                    Assessment Criterion
                  </div>
                  <p className="text-[13px] text-white leading-relaxed">
                    {matchingReq?.assessment_criterion_text || acText || `AC ${acRef}`}
                  </p>
                </div>

                {/* Evidence Requirements */}
                {matchingReq && (
                  <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                        Evidence Requirements
                      </div>
                      {matchingReq.is_mandatory && <Pill tone="red">Mandatory</Pill>}
                    </div>

                    {/* Required evidence types */}
                    <div className="space-y-2">
                      {matchingReq.evidence_type_codes.map((code) => (
                        <div
                          key={code}
                          className="flex items-center gap-3 p-3 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06]"
                        >
                          <div className="flex-1">
                            <p className="text-[13px] text-white capitalize">
                              {code.replace(/_/g, ' ')}
                            </p>
                          </div>
                          <Pill tone="yellow">{matchingReq.quantity_required ?? 1}× required</Pill>
                        </div>
                      ))}
                    </div>

                    {/* Minimum quantity */}
                    {matchingReq.min_quantity != null && matchingReq.min_quantity > 0 && (
                      <p className="text-[12px] text-white/60">
                        Minimum {matchingReq.min_quantity} piece
                        {matchingReq.min_quantity > 1 ? 's' : ''} of evidence required
                      </p>
                    )}
                  </div>
                )}

                {/* Guidance */}
                {matchingReq?.guidance && (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5">
                    <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-blue-400 mb-2">
                      Guidance
                    </div>
                    <p className="text-[13px] text-white leading-relaxed">{matchingReq.guidance}</p>
                  </div>
                )}

                {/* Example Description */}
                {matchingReq?.example_description && (
                  <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5">
                    <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40 mb-2">
                      Example Evidence
                    </div>
                    <p className="text-[13px] text-white leading-relaxed">
                      {matchingReq.example_description}
                    </p>
                  </div>
                )}

                {/* No requirements found */}
                {!matchingReq && (
                  <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-10 text-center">
                    <div className="text-[14px] font-medium text-white">
                      No specific evidence requirements defined
                    </div>
                    <p className="mt-2 text-[12.5px] text-white/50 max-w-md mx-auto leading-relaxed">
                      Use your professional judgement when assessing evidence against this criterion.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CriteriaReferenceSheet;
