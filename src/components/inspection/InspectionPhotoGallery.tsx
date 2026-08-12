import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  Loader2,
  ZoomIn,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  FolderOutput,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';
import { InspectionPhoto } from '@/types/inspection';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import AIAnalysisConfirmDialog from './AIAnalysisConfirmDialog';
import { useSafetyPhotoUpload } from '@/hooks/useSafetyPhotoUpload';
import { useToast } from '@/hooks/use-toast';

interface InspectionPhotoGalleryProps {
  photos: InspectionPhoto[];
  onDeletePhoto: (photoId: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onScanPhoto: (photoId: string) => Promise<any>;
  isScanning: string | null;
  inspectorContext?: {
    classification?: string;
    itemLocation?: string;
    description?: string;
    recommendation?: string;
  };
  certificateContext?: {
    certificateNumber?: string;
    certificateType?: 'eicr' | 'eic';
    installationAddress?: string;
    clientName?: string;
  };
  /**
   * Per-photo "Get an AI second opinion" trigger. Off by default.
   *
   * On EICR/EIC the observation already carries its own AI entry point
   * ("Write with AI"), so rendering one per photo put up to four AI buttons on a
   * single observation — and the label read the fault code stamped on the photo
   * at upload time, so it still said "C3" after the inspector moved the item to
   * C2. Screens with no observation-level AI (BESS) opt back in.
   */
  showAiSecondOpinion?: boolean;
}

// Map defect codes to photo documentation categories
const defectCodeToCategoryMap: Record<string, string> = {
  C1: 'hazard_identification',
  C2: 'hazard_identification',
  C3: 'site_condition',
  FI: 'site_condition',
  LIM: 'site_condition',
  'N/A': 'other',
};

const InspectionPhotoGallery: React.FC<InspectionPhotoGalleryProps> = ({
  photos,
  onDeletePhoto,
  onScanPhoto,
  isScanning,
  inspectorContext,
  certificateContext,
  showAiSecondOpinion = false,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<InspectionPhoto | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [photoToScan, setPhotoToScan] = useState<InspectionPhoto | null>(null);
  const [sendingToDocsId, setSendingToDocsId] = useState<string | null>(null);
  /** Photo whose action sheet is open, with its 1-based position for the title. */
  const [actionPhoto, setActionPhoto] = useState<{ photo: InspectionPhoto; index: number } | null>(
    null
  );

  const { copyFromInspection, isUploading } = useSafetyPhotoUpload();
  const { toast } = useToast();

  const handleScanClick = (photo: InspectionPhoto) => {
    setPhotoToScan(photo);
    setConfirmDialogOpen(true);
  };

  const handleConfirmScan = () => {
    if (photoToScan) {
      onScanPhoto(photoToScan.id);
      setPhotoToScan(null);
    }
  };

  const handleSendToPhotoDocs = async (photo: InspectionPhoto) => {
    setSendingToDocsId(photo.id);
    try {
      const defectCode = photo.faultCode || inspectorContext?.classification || '';
      const category = defectCodeToCategoryMap[defectCode] || 'other';

      // Build description from context
      const descriptionParts = [];
      if (defectCode) descriptionParts.push(`[${defectCode}]`);
      if (inspectorContext?.itemLocation) descriptionParts.push(inspectorContext.itemLocation);
      if (inspectorContext?.description) descriptionParts.push(inspectorContext.description);
      const description = descriptionParts.join(' - ') || 'Inspection photo';

      // Build project reference from certificate
      const projectReference = certificateContext?.certificateNumber
        ? `${certificateContext.certificateType?.toUpperCase() || 'CERT'}-${certificateContext.certificateNumber}`
        : certificateContext?.clientName || 'Inspection';

      const result = await copyFromInspection({
        sourceUrl: photo.url,
        projectReference,
        description,
        category,
        defectCode: defectCode || undefined,
        location: certificateContext?.installationAddress,
        certificateNumber: certificateContext?.certificateNumber,
        certificateType: certificateContext?.certificateType?.toUpperCase(),
      });

      if (result) {
        toast({
          title: 'Photo saved to Photo Docs',
          description: 'Photo has been copied to your Photo Documentation',
        });
      }
    } catch (error) {
      console.error('Error sending to photo docs:', error);
      toast({
        title: 'Failed to save',
        description: 'Could not copy photo to Photo Documentation',
        variant: 'destructive',
      });
    } finally {
      setSendingToDocsId(null);
    }
  };

  if (photos.length === 0) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getAgreementBadge = (aiAnalysis: any, inspectorClassification?: string) => {
    if (!aiAnalysis?.qualityAssurance) return null;

    const { agreesWithInspector, suggestedClassification } = aiAnalysis.qualityAssurance;
    const { aiClassification } = aiAnalysis;

    if (agreesWithInspector) {
      return (
        <Badge className="bg-success/90 backdrop-blur-sm text-success-foreground border-success">
          <CheckCircle className="w-3 h-3 mr-1" />
          AI Confirms {inspectorClassification || aiClassification}
        </Badge>
      );
    } else if (aiClassification === 'NO_DEFECT_VISIBLE') {
      return (
        <Badge className="bg-warning/90 backdrop-blur-sm text-warning-foreground border-warning">
          <HelpCircle className="w-3 h-3 mr-1" />
          AI Queries Classification
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-destructive/90 backdrop-blur-sm text-destructive-foreground border-destructive">
          <AlertTriangle className="w-3 h-3 mr-1" />
          AI Suggests {suggestedClassification || aiClassification}
        </Badge>
      );
    }
  };

  return (
    <>
      {/* Thumbnail grid — the photos are the content, so the tiles carry the
        weight and every action sits behind the ⋯ sheet. The previous layout
        stacked a full-width AI panel and a Save button under each row, which
        ran to ~200px per photo and buried the images. */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {photos.map((photo, idx) => (
          <div
            key={photo.id}
            className="group relative aspect-square overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03]"
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(photo)}
              className="h-full w-full touch-manipulation transition-transform active:scale-[0.98]"
              aria-label={`View photo ${idx + 1} full size`}
            >
              <img
                src={photo.thumbnailUrl}
                alt={`Evidence photo ${idx + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/25 active:bg-black/30">
                <ZoomIn className="h-5 w-5 text-white opacity-0 drop-shadow transition-opacity group-hover:opacity-100" />
              </div>
            </button>

            {/* Actions — one affordance per tile */}
            <button
              type="button"
              onClick={() => setActionPhoto({ photo, index: idx })}
              className="absolute right-1 top-1 flex h-11 w-11 touch-manipulation items-center justify-center rounded-lg text-white transition-colors hover:bg-black/40 active:bg-black/50"
              aria-label={`Actions for photo ${idx + 1}`}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-black/55 backdrop-blur-sm">
                <MoreHorizontal className="h-4 w-4" />
              </span>
            </button>

            {/* AI verdict, when this photo has been analysed */}
            {photo.aiAnalysis && (
              <div className="pointer-events-none absolute inset-x-1 bottom-1 flex justify-center">
                <div className="scale-[0.85] origin-bottom">
                  {getAgreementBadge(photo.aiAnalysis, photo.faultCode)}
                </div>
              </div>
            )}

            {isScanning === photo.id && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Per-photo actions */}
      <Sheet open={!!actionPhoto} onOpenChange={(open) => !open && setActionPhoto(null)}>
        <SheetContent side="bottom" className="rounded-t-2xl border-white/[0.08] bg-[#1a1a1e] p-0">
          {actionPhoto && (
            <div className="p-4">
              <div className="mb-4 flex items-center gap-3">
                <img
                  src={actionPhoto.photo.thumbnailUrl}
                  alt=""
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <p className="text-sm font-semibold text-white">Photo {actionPhoto.index + 1}</p>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPhoto(actionPhoto.photo);
                    setActionPhoto(null);
                  }}
                  className="flex h-12 w-full touch-manipulation items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.05] px-4 text-sm font-medium text-white transition-colors hover:bg-white/[0.08]"
                >
                  <ZoomIn className="h-4 w-4" />
                  View full size
                </button>

                {showAiSecondOpinion && !actionPhoto.photo.aiAnalysis && (
                  <button
                    type="button"
                    onClick={() => {
                      handleScanClick(actionPhoto.photo);
                      setActionPhoto(null);
                    }}
                    className="flex h-12 w-full touch-manipulation items-center gap-3 rounded-xl border border-elec-yellow/40 bg-elec-yellow/[0.12] px-4 text-sm font-medium text-elec-yellow transition-colors hover:bg-elec-yellow/[0.16]"
                  >
                    <Sparkles className="h-4 w-4" />
                    Get an AI second opinion
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleSendToPhotoDocs(actionPhoto.photo)}
                  disabled={sendingToDocsId === actionPhoto.photo.id}
                  className="flex h-12 w-full touch-manipulation items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.05] px-4 text-sm font-medium text-white transition-colors hover:bg-white/[0.08] disabled:opacity-50"
                >
                  {sendingToDocsId === actionPhoto.photo.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <FolderOutput className="h-4 w-4" />
                  )}
                  Save to Photo Docs
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onDeletePhoto(actionPhoto.photo.id);
                    setActionPhoto(null);
                  }}
                  className="flex h-12 w-full touch-manipulation items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/15"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete photo
                </button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* AI Analysis Confirmation Dialog */}
      {photoToScan && (
        <AIAnalysisConfirmDialog
          open={confirmDialogOpen}
          onOpenChange={setConfirmDialogOpen}
          onConfirm={handleConfirmScan}
          photoUrl={photoToScan.url}
          inspectorContext={{
            classification: photoToScan.faultCode || inspectorContext?.classification,
            itemLocation: inspectorContext?.itemLocation,
            description: inspectorContext?.description,
          }}
        />
      )}

      {/* Detailed AI Analysis Dialog */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-2xl sm:max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-[#1a1a1e] border-white/[0.08] text-white">
          <DialogHeader>
            <DialogTitle className="text-white text-sm font-bold">Photo Evidence</DialogTitle>
          </DialogHeader>
          {selectedPhoto && (
            <div className="space-y-4">
              {/* ELE-1550 — this was capped at max-h-[25vh] inside a dialog up
                to 90vh tall. `object-contain` then letterboxed a portrait
                certificate scan into a quarter of the screen, so the document
                appeared as a thin band of content floating in black. Scale by
                height and let the width follow, so a tall scan fills the space
                it has and a wide one is still bounded. */}
              <img
                src={selectedPhoto.url}
                alt="Inspection evidence"
                className="mx-auto max-h-[60vh] w-auto max-w-full rounded-lg border object-contain"
              />

              {selectedPhoto.aiAnalysis ? (
                <>
                  {/* Agreement Status Alert */}
                  <Alert
                    variant={
                      selectedPhoto.aiAnalysis.qualityAssurance?.agreesWithInspector
                        ? 'default'
                        : 'warning'
                    }
                  >
                    <AlertTitle className="flex items-center gap-2">
                      {selectedPhoto.aiAnalysis.qualityAssurance?.agreesWithInspector ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Classification Confirmed
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4" />
                          Classification Query
                        </>
                      )}
                    </AlertTitle>
                    <AlertDescription className="text-sm">
                      {selectedPhoto.aiAnalysis.qualityAssurance?.feedback}
                    </AlertDescription>
                  </Alert>

                  {/* Challenge Card - If disagreeing */}
                  {!selectedPhoto.aiAnalysis.qualityAssurance?.agreesWithInspector &&
                    selectedPhoto.aiAnalysis.qualityAssurance?.suggestedClassification && (
                      <Card className="border-elec-yellow/40 bg-elec-yellow/5">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-elec-yellow" />
                            AI Suggestion
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <p className="text-xs text-white mb-1.5">Inspector classified as:</p>
                              <Badge variant="outline" className="text-sm">
                                {selectedPhoto.faultCode || 'Unknown'}
                              </Badge>
                            </div>
                            <ArrowRight className="h-5 w-5 text-elec-yellow shrink-0" />
                            <div className="flex-1">
                              <p className="text-xs text-white mb-1.5">AI suggests:</p>
                              <Badge className="text-sm bg-elec-yellow text-black">
                                {selectedPhoto.aiAnalysis.qualityAssurance.suggestedClassification}
                              </Badge>
                            </div>
                          </div>
                          {selectedPhoto.aiAnalysis.qualityAssurance.reasonForChallenge && (
                            <div className="pt-3 border-t border-elec-yellow/20">
                              <p className="text-xs text-white mb-1">Reasoning:</p>
                              <p className="text-sm leading-relaxed">
                                {selectedPhoto.aiAnalysis.qualityAssurance.reasonForChallenge}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}

                  {/* Regulation References */}
                  {selectedPhoto.aiAnalysis.regulations &&
                    selectedPhoto.aiAnalysis.regulations.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Regulation References</h4>
                        <div className="space-y-2">
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {selectedPhoto.aiAnalysis.regulations.map((reg: any, idx: number) => (
                            <Card key={idx}>
                              <CardContent className="p-3">
                                <div className="flex items-start gap-3">
                                  <Badge variant="outline" className="shrink-0">
                                    {reg.code}
                                  </Badge>
                                  <div className="flex-1 space-y-1">
                                    {reg.title && (
                                      <p className="font-medium text-sm">{reg.title}</p>
                                    )}
                                    <p className="text-xs text-white">
                                      <strong>Requirement:</strong> {reg.requirement}
                                    </p>
                                    <p className="text-xs">
                                      <strong>Assessment:</strong> {reg.assessment}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Visual Observations & Guidance */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="observations">
                      <AccordionTrigger className="text-sm font-semibold">
                        Visual Analysis
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          {selectedPhoto.aiAnalysis.observations?.safetyFeatures?.length > 0 && (
                            <div>
                              <h5 className="text-xs font-medium text-success mb-1">
                                ✓ Safety Features Present
                              </h5>
                              <ul className="text-xs space-y-1">
                                {selectedPhoto.aiAnalysis.observations.safetyFeatures.map(
                                  (item: string, i: number) => (
                                    <li key={i} className="text-white">
                                      ✓ {item}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}

                          {selectedPhoto.aiAnalysis.observations?.concerns?.length > 0 && (
                            <div>
                              <h5 className="text-xs font-medium text-destructive mb-1">
                                ⚠️ Concerns Observed
                              </h5>
                              <ul className="text-xs space-y-1">
                                {selectedPhoto.aiAnalysis.observations.concerns.map(
                                  (item: string, i: number) => (
                                    <li key={i} className="text-white">
                                      ⚠️ {item}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}

                          {selectedPhoto.aiAnalysis.observations?.cannotVerify?.length > 0 && (
                            <div>
                              <h5 className="text-xs font-medium text-white mb-1">
                                🔍 Cannot Verify from Photo
                              </h5>
                              <ul className="text-xs space-y-1">
                                {selectedPhoto.aiAnalysis.observations.cannotVerify.map(
                                  (item: string, i: number) => (
                                    <li key={i} className="text-white">
                                      • {item}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="guidance">
                      <AccordionTrigger className="text-sm font-semibold">
                        Inspector Guidance
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <p className="text-xs">
                            {selectedPhoto.aiAnalysis.inspectorGuidance?.message}
                          </p>

                          {selectedPhoto.aiAnalysis.inspectorGuidance?.additionalChecks?.length >
                            0 && (
                            <div>
                              <h5 className="text-xs font-medium mb-2">
                                Additional On-Site Checks:
                              </h5>
                              <ul className="text-xs space-y-1">
                                {selectedPhoto.aiAnalysis.inspectorGuidance.additionalChecks.map(
                                  (check: string, i: number) => (
                                    <li key={i} className="text-white">
                                      • {check}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}

                          {selectedPhoto.aiAnalysis.inspectorGuidance?.questionsToConsider?.length >
                            0 && (
                            <div>
                              <h5 className="text-xs font-medium mb-2">Questions to Consider:</h5>
                              <ul className="text-xs space-y-1">
                                {selectedPhoto.aiAnalysis.inspectorGuidance.questionsToConsider.map(
                                  (q: string, i: number) => (
                                    <li key={i} className="text-white">
                                      • {q}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Photo Quality Warning */}
                  {selectedPhoto.aiAnalysis.photoQuality &&
                    !selectedPhoto.aiAnalysis.photoQuality.adequate && (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle className="text-sm">Photo Quality Issues</AlertTitle>
                        <AlertDescription>
                          <ul className="text-xs mt-2 space-y-1">
                            {selectedPhoto.aiAnalysis.photoQuality.issues?.map(
                              (issue: string, i: number) => (
                                <li key={i}>• {issue}</li>
                              )
                            )}
                          </ul>
                          <p className="text-xs mt-2">
                            Consider retaking photo for more accurate AI verification.
                          </p>
                        </AlertDescription>
                      </Alert>
                    )}

                  {/* Confidence Meter */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium">AI Confidence:</span>
                    <Progress value={selectedPhoto.aiAnalysis.confidence || 0} className="flex-1" />
                    <span className="text-xs font-medium">
                      {Math.round(selectedPhoto.aiAnalysis.confidence || 0)}%
                    </span>
                  </div>

                  {/* Disclaimer */}
                  <Alert>
                    <AlertDescription className="text-xs">
                      <strong>AI Assistance Only:</strong> AI provides a second opinion. Final
                      classification responsibility remains with the qualified inspector.
                    </AlertDescription>
                  </Alert>
                </>
              ) : (
                <div className="rounded-lg bg-white/[0.04] border border-white/[0.08] p-4 text-center">
                  <p className="text-xs text-white">
                    {showAiSecondOpinion
                      ? 'No AI analysis yet — open the ⋯ menu on this photo to run a quality check.'
                      : 'No AI analysis for this photo.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InspectionPhotoGallery;
