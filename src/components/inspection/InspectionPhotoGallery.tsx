import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Sparkles, Loader2, ZoomIn, CheckCircle, AlertTriangle, AlertCircle, HelpCircle, ArrowRight, FolderOutput } from 'lucide-react';
import { InspectionPhoto } from '@/types/inspection';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import AIAnalysisConfirmDialog from './AIAnalysisConfirmDialog';
import AIAnalysisSummaryCard from './AIAnalysisSummaryCard';
import { useSafetyPhotoUpload } from '@/hooks/useSafetyPhotoUpload';
import { useToast } from '@/hooks/use-toast';

interface InspectionPhotoGalleryProps {
  photos: InspectionPhoto[];
  onDeletePhoto: (photoId: string) => void;
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
  'C1': 'hazard_identification',
  'C2': 'hazard_identification',
  'C3': 'site_condition',
  'FI': 'site_condition',
  'LIM': 'site_condition',
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
      <div className="space-y-3">
        {photos.map((photo) => (
          <div key={photo.id} className="space-y-2">
            {/* Photo Thumbnail */}
            <div className="relative">
              <div 
                className="relative group w-32 sm:w-40 md:w-48 aspect-square rounded-lg overflow-hidden bg-muted border-2 border-border cursor-pointer hover:border-primary transition-all"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo.thumbnailUrl}
                  alt="Inspection evidence"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* AI Agreement Badge Overlay */}
                {photo.aiAnalysis && (
                  <div className="absolute top-2 right-2">
                    {getAgreementBadge(photo.aiAnalysis, photo.faultCode)}
                  </div>
                )}

                {/* Zoom Indicator */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <ZoomIn className="h-8 w-8 text-foreground" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-1 left-1 flex gap-1">
                {!photo.aiAnalysis && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-7 w-7 bg-primary/90 hover:bg-primary text-primary-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleScanClick(photo);
                    }}
                    disabled={isScanning === photo.id}
                  >
                    {isScanning === photo.id ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Sparkles className="h-3 w-3" />
                    )}
                  </Button>
                )}
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-7 w-7 bg-elec-yellow/90 hover:bg-elec-yellow text-black"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSendToPhotoDocs(photo);
                  }}
                  disabled={sendingToDocsId === photo.id}
                  title="Send to Photo Documentation"
                >
                  {sendingToDocsId === photo.id ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <FolderOutput className="h-3 w-3" />
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeletePhoto(photo.id);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Inline AI Summary Card */}
            {photo.aiAnalysis && (
              <AIAnalysisSummaryCard
                aiAnalysis={photo.aiAnalysis}
                inspectorClassification={photo.faultCode}
                onViewFullAnalysis={() => setSelectedPhoto(photo)}
              />
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
            <p className="text-sm text-muted-foreground">BS7671:2018+A3:2024 Compliance Check</p>
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
                  <Alert variant={selectedPhoto.aiAnalysis.qualityAssurance?.agreesWithInspector ? "default" : "warning"}>
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
                            <p className="text-xs text-muted-foreground mb-1.5">Inspector classified as:</p>
                            <Badge variant="outline" className="text-sm">
                              {selectedPhoto.faultCode || 'Unknown'}
                            </Badge>
                          </div>
                          <ArrowRight className="h-5 w-5 text-elec-yellow shrink-0" />
                          <div className="flex-1">
                            <p className="text-xs text-muted-foreground mb-1.5">AI suggests:</p>
                            <Badge className="text-sm bg-elec-yellow text-black">
                              {selectedPhoto.aiAnalysis.qualityAssurance.suggestedClassification}
                            </Badge>
                          </div>
                        </div>
                        {selectedPhoto.aiAnalysis.qualityAssurance.reasonForChallenge && (
                          <div className="pt-3 border-t border-elec-yellow/20">
                            <p className="text-xs text-muted-foreground mb-1">Reasoning:</p>
                            <p className="text-sm leading-relaxed">
                              {selectedPhoto.aiAnalysis.qualityAssurance.reasonForChallenge}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {/* Regulation References */}
                  {selectedPhoto.aiAnalysis.regulations && selectedPhoto.aiAnalysis.regulations.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Regulation References</h4>
                      <div className="space-y-2">
                        {selectedPhoto.aiAnalysis.regulations.map((reg: any, idx: number) => (
                          <Card key={idx}>
                            <CardContent className="p-3">
                              <div className="flex items-start gap-3">
                                <Badge variant="outline" className="shrink-0">{reg.code}</Badge>
                                <div className="flex-1 space-y-1">
                                  {reg.title && <p className="font-medium text-sm">{reg.title}</p>}
                                  <p className="text-xs text-muted-foreground">
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
                      <AccordionTrigger className="text-sm font-semibold">Visual Analysis</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          {selectedPhoto.aiAnalysis.observations?.safetyFeatures?.length > 0 && (
                            <div>
                              <h5 className="text-xs font-medium text-success mb-1">✓ Safety Features Present</h5>
                              <ul className="text-xs space-y-1">
                                {selectedPhoto.aiAnalysis.observations.safetyFeatures.map((item: string, i: number) => (
                                  <li key={i} className="text-muted-foreground">✓ {item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {selectedPhoto.aiAnalysis.observations?.concerns?.length > 0 && (
                            <div>
                              <h5 className="text-xs font-medium text-destructive mb-1">⚠️ Concerns Observed</h5>
                              <ul className="text-xs space-y-1">
                                {selectedPhoto.aiAnalysis.observations.concerns.map((item: string, i: number) => (
                                  <li key={i} className="text-muted-foreground">⚠️ {item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {selectedPhoto.aiAnalysis.observations?.cannotVerify?.length > 0 && (
                            <div>
                              <h5 className="text-xs font-medium text-muted-foreground mb-1">🔍 Cannot Verify from Photo</h5>
                              <ul className="text-xs space-y-1">
                                {selectedPhoto.aiAnalysis.observations.cannotVerify.map((item: string, i: number) => (
                                  <li key={i} className="text-muted-foreground">• {item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="guidance">
                      <AccordionTrigger className="text-sm font-semibold">Inspector Guidance</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <p className="text-xs">{selectedPhoto.aiAnalysis.inspectorGuidance?.message}</p>
                          
                          {selectedPhoto.aiAnalysis.inspectorGuidance?.additionalChecks?.length > 0 && (
                            <div>
                              <h5 className="text-xs font-medium mb-2">Additional On-Site Checks:</h5>
                              <ul className="text-xs space-y-1">
                                {selectedPhoto.aiAnalysis.inspectorGuidance.additionalChecks.map((check: string, i: number) => (
                                  <li key={i} className="text-muted-foreground">• {check}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {selectedPhoto.aiAnalysis.inspectorGuidance?.questionsToConsider?.length > 0 && (
                            <div>
                              <h5 className="text-xs font-medium mb-2">Questions to Consider:</h5>
                              <ul className="text-xs space-y-1">
                                {selectedPhoto.aiAnalysis.inspectorGuidance.questionsToConsider.map((q: string, i: number) => (
                                  <li key={i} className="text-muted-foreground">• {q}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Photo Quality Warning */}
                  {selectedPhoto.aiAnalysis.photoQuality && !selectedPhoto.aiAnalysis.photoQuality.adequate && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle className="text-sm">Photo Quality Issues</AlertTitle>
                      <AlertDescription>
                        <ul className="text-xs mt-2 space-y-1">
                          {selectedPhoto.aiAnalysis.photoQuality.issues?.map((issue: string, i: number) => (
                            <li key={i}>• {issue}</li>
                          ))}
                        </ul>
                        <p className="text-xs mt-2">Consider retaking photo for more accurate AI verification.</p>
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Confidence Meter */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium">AI Confidence:</span>
                    <Progress value={selectedPhoto.aiAnalysis.confidence || 0} className="flex-1" />
                    <span className="text-xs font-medium">{Math.round(selectedPhoto.aiAnalysis.confidence || 0)}%</span>
                  </div>

                  {/* Disclaimer */}
                  <Alert>
                    <AlertDescription className="text-xs">
                      <strong>AI Assistance Only:</strong> AI provides a second opinion. Final classification responsibility remains with the qualified inspector.
                    </AlertDescription>
                  </Alert>
                </>
              ) : (
                <Alert>
                  <AlertDescription className="text-sm">
                    No AI analysis available. Click the Sparkles button to run quality assurance check.
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
