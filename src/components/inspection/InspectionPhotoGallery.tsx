import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  X,
  Sparkles,
  Loader2,
  ZoomIn,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  FolderOutput,
} from 'lucide-react';
import { InspectionPhoto } from '@/types/inspection';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
import AIAnalysisSummaryCard from './AIAnalysisSummaryCard';
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
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<InspectionPhoto | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [photoToScan, setPhotoToScan] = useState<InspectionPhoto | null>(null);
  const [sendingToDocsId, setSendingToDocsId] = useState<string | null>(null);

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
      <div className="space-y-2">
        {photos.map((photo, idx) => (
          <div
            key={photo.id}
            className="rounded-xl bg-white/[0.03] border border-white/[0.08] overflow-hidden"
          >
            {/* Photo row: thumbnail + info + actions */}
            <div className="flex items-center gap-3 p-3">
              {/* Thumbnail — tap to view full */}
              <div
                className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-muted cursor-pointer active:scale-[0.97] transition-transform touch-manipulation"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo.thumbnailUrl}
                  alt="Evidence photo"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 active:bg-black/20 transition-colors" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Photo {idx + 1}</p>
                {photo.aiAnalysis ? (
                  <div className="mt-1">{getAgreementBadge(photo.aiAnalysis, photo.faultCode)}</div>
                ) : (
                  <p className="text-xs text-white mt-0.5">Tap to view full size</p>
                )}
              </div>

              {/* Delete */}
              <button
                onClick={() => onDeletePhoto(photo.id)}
                className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-500/10 transition-colors touch-manipulation"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Action buttons row */}
            <div className="flex gap-2 px-3 pb-3">
              {!photo.aiAnalysis && (
                <button
                  onClick={() => handleScanClick(photo)}
                  disabled={isScanning === photo.id}
                  className="flex-1 h-10 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 bg-white/[0.05] text-white border border-white/[0.08] hover:bg-white/[0.08] transition-colors touch-manipulation disabled:opacity-50"
                >
                  {isScanning === photo.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="h-3.5 w-3.5" />
                  )}
                  AI Scan
                </button>
              )}
              <button
                onClick={() => handleSendToPhotoDocs(photo)}
                disabled={sendingToDocsId === photo.id}
                className="flex-1 h-10 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/20 hover:bg-elec-yellow/15 transition-colors touch-manipulation disabled:opacity-50"
              >
                {sendingToDocsId === photo.id ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <FolderOutput className="h-3.5 w-3.5" />
                )}
                Save to Docs
              </button>
            </div>

            {/* Inline AI Summary Card */}
            {photo.aiAnalysis && (
              <div className="px-3 pb-3">
                <AIAnalysisSummaryCard
                  aiAnalysis={photo.aiAnalysis}
                  inspectorClassification={photo.faultCode}
                  onViewFullAnalysis={() => setSelectedPhoto(photo)}
                />
              </div>
            )}
          </div>
        ))}
      </div>

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
        <DialogContent className="max-w-2xl sm:max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Photo Evidence & AI Quality Assurance</DialogTitle>
            <p className="text-sm text-white">BS7671:2018+A3:2024 Compliance Check</p>
          </DialogHeader>
          {selectedPhoto && (
            <div className="space-y-4">
              <img
                src={selectedPhoto.url}
                alt="Inspection evidence"
                className="w-full max-w-md sm:max-w-lg mx-auto max-h-[25vh] sm:max-h-[30vh] object-contain rounded-lg border"
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
                <Alert>
                  <AlertDescription className="text-sm">
                    No AI analysis available. Click the Sparkles button to run quality assurance
                    check.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InspectionPhotoGallery;
