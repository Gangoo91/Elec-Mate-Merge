import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, FileText, Trash2, Minus, Info, FolderPlus, Loader2, Check } from 'lucide-react';
import { EICObservation } from '@/hooks/useEICObservations';
import { useInspectionPhotos } from '@/hooks/useInspectionPhotos';
import { useSafetyPhotoUpload } from '@/hooks/useSafetyPhotoUpload';
import { useCertificatePhoto, generateProjectRef, mapDefectCodeToCategory } from '@/contexts/CertificatePhotoContext';
import { toast } from '@/hooks/use-toast';
import InspectionPhotoUpload from '@/components/inspection/InspectionPhotoUpload';
import InspectionPhotoGallery from '@/components/inspection/InspectionPhotoGallery';

interface EICDefectObservationCardProps {
  observation: EICObservation;
  reportId: string;
  index: number;
  onUpdate: (id: string, field: keyof EICObservation, value: any) => void;
  onRemove: (id: string) => void;
  onSyncToInspectionItem?: (inspectionItemId: string, newOutcome: string) => void;
}

const EICDefectObservationCard: React.FC<EICDefectObservationCardProps> = ({
  observation,
  reportId,
  index,
  onUpdate,
  onRemove,
  onSyncToInspectionItem
}) => {
  const [isSendingToPhotoDocs, setIsSendingToPhotoDocs] = useState(false);
  const [sentToPhotoDocs, setSentToPhotoDocs] = useState(false);

  // Get certificate context for project reference generation
  const certificateContext = useCertificatePhoto();
  const { copyFromInspection } = useSafetyPhotoUpload();

  // Initialize photo management with observation context for AI
  const {
    photos,
    isUploading,
    isScanning,
    uploadPhoto,
    deletePhoto,
    scanPhotoWithAI,
  } = useInspectionPhotos({
    reportId: reportId || '',
    reportType: 'eic',
    itemId: observation.id,
    observationId: observation.id,
    observationContext: {
      classification: observation.defectCode.toUpperCase(),
      itemLocation: observation.item || 'Not specified',
      description: observation.description || 'No description provided',
      recommendation: observation.recommendation,
    },
  });

  // Handler for sending photos to Photo Docs
  const handleSendToPhotoDocs = async () => {
    if (photos.length === 0) return;

    setIsSendingToPhotoDocs(true);

    try {
      // Generate project reference from certificate context or fallback
      const projectRef = generateProjectRef({
        certificateNumber: certificateContext?.certificateNumber || reportId,
        clientName: certificateContext?.clientName,
        installationAddress: certificateContext?.installationAddress,
      });

      // Copy each photo
      let successCount = 0;
      for (const photo of photos) {
        const result = await copyFromInspection({
          sourceUrl: photo.file_url,
          projectReference: projectRef,
          description: `${observation.description || 'Observation'} - ${observation.recommendation || ''}`.trim(),
          category: mapDefectCodeToCategory(observation.defectCode),
          defectCode: observation.defectCode.toUpperCase(),
          location: certificateContext?.installationAddress || observation.item,
          certificateNumber: certificateContext?.certificateNumber || reportId,
          certificateType: certificateContext?.certificateType || 'eic',
        });

        if (result) successCount++;
      }

      if (successCount > 0) {
        setSentToPhotoDocs(true);
        toast({
          title: "Photos sent to Photo Docs",
          description: `${successCount} photo${successCount > 1 ? 's' : ''} copied to project "${projectRef}"`,
        });
      }
    } catch (error) {
      console.error('Error sending to photo docs:', error);
      toast({
        title: "Failed to send photos",
        description: "Could not copy photos to Photo Docs",
        variant: "destructive",
      });
    } finally {
      setIsSendingToPhotoDocs(false);
    }
  };

  const defectCodes = [
    { code: 'unsatisfactory', description: 'Does not comply with BS 7671', severity: 'high' },
    { code: 'limitation', description: 'Limitation noted during inspection', severity: 'limitation' },
    { code: 'not-applicable', description: 'Not applicable to this installation', severity: 'neutral' }
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'limitation': return <Info className="h-4 w-4 text-purple-500" />;
      case 'neutral': return <Minus className="h-4 w-4 text-white/60" />;
      default: return <FileText className="h-4 w-4 text-elec-yellow" />;
    }
  };

  const getBorderColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-l-red-500';
      case 'limitation': return 'border-l-purple-500';
      case 'neutral': return 'border-l-white/60';
      default: return 'border-l-elec-yellow';
    }
  };

  const currentDefectCode = defectCodes.find(c => c.code === observation.defectCode);
  const borderColor = getBorderColor(currentDefectCode?.severity || 'high');

  return (
    <Card className={`p-4 sm:p-6 border border-border border-l-4 ${borderColor}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h4 className="font-semibold flex items-center gap-2 text-base">
          {getSeverityIcon(currentDefectCode?.severity || 'high')}
          Observation {index + 1} - {observation.defectCode.toUpperCase()}
        </h4>
        <div className="flex items-center gap-3">
          {(observation.defectCode === 'C1' || observation.defectCode === 'C2' || observation.defectCode === 'C3') && (
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Checkbox
                checked={observation.rectified}
                onCheckedChange={(checked) => onUpdate(observation.id, 'rectified', checked)}
              />
              <Label className="text-base cursor-pointer leading-relaxed">Rectified</Label>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(observation.id)}
            className="text-red-500 hover:text-red-700 h-9 w-9 p-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium mb-1.5 block">Item/Location</Label>
          <Input
            placeholder="e.g., Consumer unit, Kitchen socket"
            value={observation.item}
            onChange={(e) => onUpdate(observation.id, 'item', e.target.value)}
            className="h-10"
          />
        </div>
        <div>
          <Label className="text-sm font-medium mb-1.5 block">Classification</Label>
          <MobileSelectPicker
            value={observation.defectCode}
            onValueChange={(value) => {
              // Update observation locally
              onUpdate(observation.id, 'defectCode', value as 'unsatisfactory' | 'limitation' | 'not-applicable');

              // Sync back to inspection item if linked
              if (observation.inspectionItemId && onSyncToInspectionItem) {
                onSyncToInspectionItem(observation.inspectionItemId, value);
              }
            }}
            options={defectCodes.map((code) => ({
              value: code.code,
              label: `${code.code.toUpperCase()} - ${code.description}`,
            }))}
            placeholder="Select classification"
            title="Classification"
          />
        </div>
        <div>
          <Label className="text-sm font-medium mb-1.5 block">
            {observation.defectCode === 'not-applicable' ? 'Reason for Not Applicable' : 
             observation.defectCode === 'limitation' ? 'Description of Limitation' : 
             'Description'}
          </Label>
          <Textarea
            placeholder={
              observation.defectCode === 'not-applicable' ? 'Explain why this item is not applicable...' :
              observation.defectCode === 'limitation' ? 'Describe the limitation encountered...' :
              'Detailed description of the non-compliance...'
            }
            value={observation.description}
            onChange={(e) => onUpdate(observation.id, 'description', e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>
        {observation.defectCode !== 'not-applicable' && (
          <div>
            <Label className="text-sm font-medium mb-1.5 block">
              {observation.defectCode === 'limitation' ? 'Further Action Required' : 'Recommendation'}
            </Label>
            <Textarea
              placeholder={
                observation.defectCode === 'limitation' ? 'What action is needed to overcome this limitation...' :
                'Recommended remedial action to achieve compliance...'
              }
              value={observation.recommendation}
              onChange={(e) => onUpdate(observation.id, 'recommendation', e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>
        )}

        {/* Photo Evidence Section */}
        <div className="space-y-3 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Photo Evidence</Label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {photos.length} photo{photos.length !== 1 ? 's' : ''}
              </span>
              {photos.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSendToPhotoDocs}
                  disabled={isSendingToPhotoDocs || sentToPhotoDocs}
                  className="h-7 px-2 text-xs text-emerald-400/80 hover:text-emerald-400 hover:bg-emerald-400/10"
                >
                  {isSendingToPhotoDocs ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />
                      Sending...
                    </>
                  ) : sentToPhotoDocs ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1" />
                      Sent
                    </>
                  ) : (
                    <>
                      <FolderPlus className="h-3.5 w-3.5 mr-1" />
                      Send to Photo Docs
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
          
          <InspectionPhotoUpload
            onPhotoCapture={async (file) => {
              await uploadPhoto(
                file,
                observation.defectCode,
                observation.description
              );
            }}
            isUploading={isUploading}
          />
          
          <InspectionPhotoGallery
            photos={photos}
            onDeletePhoto={deletePhoto}
            onScanPhoto={scanPhotoWithAI}
            isScanning={isScanning}
            inspectorContext={{
              classification: observation.defectCode.toUpperCase(),
              itemLocation: observation.item || 'Not specified',
              description: observation.description || 'No description provided',
              recommendation: observation.recommendation,
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default EICDefectObservationCard;
