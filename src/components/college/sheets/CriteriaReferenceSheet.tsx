/**
 * CriteriaReferenceSheet
 *
 * Bottom sheet showing the full description for an assessment criterion,
 * required evidence types, quantities, and guidance text. Opened when
 * an assessor taps the "Ref" button on a criterion row.
 */

import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  BookOpen,
  FileText,
  Camera,
  Calculator,
  Video,
  ClipboardList,
  PenTool,
  Eye,
  Award,
  Loader2,
} from 'lucide-react';
import { useEvidenceRequirements } from '@/hooks/useEvidenceRequirements';
import type { UnitEvidenceRequirement } from '@/types/evidence';

// ── Evidence type icon mapping ─────────────────────────────────

const evidenceTypeIcons: Record<string, React.ReactNode> = {
  photo: <Camera className="h-4 w-4" />,
  document: <FileText className="h-4 w-4" />,
  certificate: <Award className="h-4 w-4" />,
  test_result: <ClipboardList className="h-4 w-4" />,
  witness: <Eye className="h-4 w-4" />,
  reflection: <PenTool className="h-4 w-4" />,
  work_log: <ClipboardList className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  drawing: <PenTool className="h-4 w-4" />,
  calculation: <Calculator className="h-4 w-4" />,
};

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
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Drag handle */}
          <div className="flex justify-center pt-2.5 pb-1">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <SheetHeader className="flex-shrink-0 border-b border-border px-4 pb-4">
            <SheetTitle className="text-base flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-elec-yellow" />
              Criteria Reference
            </SheetTitle>
            {acRef && (
              <Badge
                variant="outline"
                className="w-fit mt-1 border-elec-yellow/30 text-elec-yellow font-mono"
              >
                AC {acRef}
              </Badge>
            )}
          </SheetHeader>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
              </div>
            ) : (
              <>
                {/* AC Description */}
                <Card className="bg-white/5 border-elec-gray/40">
                  <CardContent className="p-4">
                    <h4 className="text-sm font-medium text-elec-yellow mb-2">
                      Assessment Criterion
                    </h4>
                    <p className="text-sm text-white leading-relaxed">
                      {matchingReq?.assessment_criterion_text || acText || `AC ${acRef}`}
                    </p>
                  </CardContent>
                </Card>

                {/* Evidence Requirements */}
                {matchingReq && (
                  <Card className="bg-white/5 border-elec-gray/40">
                    <CardContent className="p-4 space-y-3">
                      <h4 className="text-sm font-medium text-elec-yellow">
                        Evidence Requirements
                      </h4>

                      {/* Required evidence types */}
                      <div className="space-y-2">
                        {matchingReq.evidence_type_codes.map((code) => (
                          <div
                            key={code}
                            className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5"
                          >
                            <div className="h-8 w-8 rounded-lg bg-elec-yellow/10 flex items-center justify-center text-elec-yellow">
                              {evidenceTypeIcons[code] || <FileText className="h-4 w-4" />}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-white capitalize">
                                {code.replace(/_/g, ' ')}
                              </p>
                            </div>
                            <Badge variant="outline" className="text-white border-white/20">
                              {matchingReq.quantity_required ?? 1}x required
                            </Badge>
                          </div>
                        ))}
                      </div>

                      {/* Minimum quantity */}
                      {matchingReq.min_quantity != null && matchingReq.min_quantity > 0 && (
                        <p className="text-xs text-white">
                          Minimum {matchingReq.min_quantity} piece
                          {matchingReq.min_quantity > 1 ? 's' : ''} of evidence required
                        </p>
                      )}

                      {/* Mandatory badge */}
                      {matchingReq.is_mandatory && (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                          Mandatory
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Guidance */}
                {matchingReq?.guidance && (
                  <Card className="bg-blue-500/10 border-blue-500/20">
                    <CardContent className="p-4">
                      <h4 className="text-sm font-medium text-blue-400 mb-2">Guidance</h4>
                      <p className="text-sm text-white leading-relaxed">{matchingReq.guidance}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Example Description */}
                {matchingReq?.example_description && (
                  <Card className="bg-white/5 border-elec-gray/40">
                    <CardContent className="p-4">
                      <h4 className="text-sm font-medium text-elec-yellow mb-2">
                        Example Evidence
                      </h4>
                      <p className="text-sm text-white leading-relaxed">
                        {matchingReq.example_description}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* No requirements found */}
                {!matchingReq && (
                  <Card className="bg-white/5 border-elec-gray/40">
                    <CardContent className="py-8 text-center">
                      <FileText className="h-10 w-10 text-white mx-auto mb-3" />
                      <p className="text-sm text-white">
                        No specific evidence requirements have been defined for this criterion yet.
                      </p>
                      <p className="text-xs text-white mt-2">
                        Use your professional judgement when assessing evidence against this
                        criterion.
                      </p>
                    </CardContent>
                  </Card>
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
