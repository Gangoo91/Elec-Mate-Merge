/**
 * CriteriaReferenceSheet
 *
 * Bottom sheet showing the full description for an assessment criterion,
 * required evidence types, quantities, and guidance text. Opened when
 * an assessor taps the "Ref" button on a criterion row.
 */

import React from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Pill,
  LoadingState,
  SheetShell,
  FormCard,
  EmptyState,
  Eyebrow,
} from '@/components/college/primitives';
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
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow="Criteria Reference"
          title={acRef ? `AC ${acRef}` : 'Criterion'}
        >
          {isLoading ? (
            <LoadingState />
          ) : (
            <>
              <FormCard eyebrow="Assessment Criterion">
                <p className="text-[13px] text-white leading-relaxed">
                  {matchingReq?.assessment_criterion_text || acText || `AC ${acRef}`}
                </p>
              </FormCard>

              {matchingReq && (
                <FormCard eyebrow="Evidence Requirements">
                  <div className="flex items-center justify-end -mt-1">
                    {matchingReq.is_mandatory && <Pill tone="red">Mandatory</Pill>}
                  </div>

                  <div className="space-y-2">
                    {matchingReq.evidence_type_codes.map((code) => (
                      <div
                        key={code}
                        className="flex items-center gap-3 p-3 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.08]"
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

                  {matchingReq.min_quantity != null && matchingReq.min_quantity > 0 && (
                    <p className="text-[12px] text-white">
                      Minimum {matchingReq.min_quantity} piece
                      {matchingReq.min_quantity > 1 ? 's' : ''} of evidence required
                    </p>
                  )}
                </FormCard>
              )}

              {matchingReq?.guidance && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 space-y-3">
                  <Eyebrow className="text-blue-400">Guidance</Eyebrow>
                  <p className="text-[13px] text-white leading-relaxed">{matchingReq.guidance}</p>
                </div>
              )}

              {matchingReq?.example_description && (
                <FormCard eyebrow="Example Evidence">
                  <p className="text-[13px] text-white leading-relaxed">
                    {matchingReq.example_description}
                  </p>
                </FormCard>
              )}

              {!matchingReq && (
                <EmptyState
                  title="No specific evidence requirements defined"
                  description="Use your professional judgement when assessing evidence against this criterion."
                />
              )}
            </>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

export default CriteriaReferenceSheet;
