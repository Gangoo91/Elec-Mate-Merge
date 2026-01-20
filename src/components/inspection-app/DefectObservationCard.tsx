
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, CheckCircle, XCircle, FileText, Trash2, Minus, Info, FolderPlus, Loader2, Check } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useInspectionPhotos } from '@/hooks/useInspectionPhotos';
import { useSafetyPhotoUpload } from '@/hooks/useSafetyPhotoUpload';
import { useCertificatePhoto, generateProjectRef, mapDefectCodeToCategory } from '@/contexts/CertificatePhotoContext';
import { toast } from '@/hooks/use-toast';
import InspectionPhotoUpload from './inspection/InspectionPhotoUpload';
import InspectionPhotoGallery from './inspection/InspectionPhotoGallery';

interface DefectObservation {
  id: string;
  item: string;
  defectCode: 'C1' | 'C2' | 'C3' | 'FI' | 'N/A' | 'LIM';
  description: string;
  recommendation: string;
  rectified: boolean;
  inspectionItemId?: string;
}

interface DefectObservationCardProps {
  defect: DefectObservation;
  reportId: string;
  index: number;
  onUpdate: (id: string, field: keyof DefectObservation, value: any) => void;
  onRemove: (id: string) => void;
}

const DefectObservationCard = ({ defect, reportId, index, onUpdate, onRemove }: DefectObservationCardProps) => {
  const [isSendingToPhotoDocs, setIsSendingToPhotoDocs] = useState(false);
  const [sentToPhotoDocs, setSentToPhotoDocs] = useState(false);

  // Get certificate context for project reference generation
  const certificateContext = useCertificatePhoto();
  const { copyFromInspection } = useSafetyPhotoUpload();

  // Load photos linked to this observation OR from the inspection item
  const {
    photos,
    isUploading,
    isScanning,
    uploadPhoto,
    deletePhoto,
    scanPhotoWithAI
  } = useInspectionPhotos({
    reportId: reportId || '',
    reportType: 'eicr',
    itemId: defect.inspectionItemId,
    observationId: defect.id,
    observationContext: {
      classification: defect.defectCode,
      itemLocation: defect.item || 'Not specified',
      description: defect.description || 'No description provided',
      recommendation: defect.recommendation,
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
          description: `${defect.description || 'Observation'} - ${defect.recommendation || ''}`.trim(),
          category: mapDefectCodeToCategory(defect.defectCode),
          defectCode: defect.defectCode,
          location: certificateContext?.installationAddress || defect.item,
          certificateNumber: certificateContext?.certificateNumber || reportId,
          certificateType: certificateContext?.certificateType || 'eicr',
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
    { code: 'C1', description: 'Danger present - Immediate action required', severity: 'high' },
    { code: 'C2', description: 'Potentially dangerous - Urgent remedial action required', severity: 'medium' },
    { code: 'C3', description: 'Improvement recommended', severity: 'low' },
    { code: 'FI', description: 'Further investigation required', severity: 'info' },
    { code: 'N/A', description: 'Not applicable to this installation', severity: 'neutral' },
    { code: 'LIM', description: 'Limitation noted during inspection', severity: 'limitation' }
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'medium': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'neutral': return <Minus className="h-4 w-4 text-white/60" />;
      case 'limitation': return <Info className="h-4 w-4 text-purple-500" />;
      default: return <FileText className="h-4 w-4 text-blue-500" />;
    }
  };

  const getBorderColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-orange-500';
      case 'low': return 'border-l-yellow-500';
      case 'info': return 'border-l-blue-500';
      case 'neutral': return 'border-l-gray-500';
      case 'limitation': return 'border-l-purple-500';
      default: return 'border-l-blue-500';
    }
  };

  const currentDefectCode = defectCodes.find(c => c.code === defect.defectCode);
  const borderColor = getBorderColor(currentDefectCode?.severity || 'info');

  return (
    <Card className={`p-3 sm:p-4 md:p-6 border-l-4 ${borderColor}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h4 className="font-semibold flex items-center gap-2 text-base">
          {getSeverityIcon(currentDefectCode?.severity || 'info')}
          Observation {index + 1} - {defect.defectCode}
        </h4>
        <div className="flex items-center gap-3">
          {defect.defectCode !== 'N/A' && defect.defectCode !== 'LIM' && (
            <div className="flex items-center gap-2">
              <Checkbox
                checked={defect.rectified}
                onCheckedChange={(checked) => onUpdate(defect.id, 'rectified', checked)}
                className="h-5 w-5"
              />
              <Label className="text-sm cursor-pointer">Rectified</Label>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(defect.id)}
            className="text-red-500 hover:text-red-700 h-9 w-9 p-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {/* Photo Evidence Section - Moved to top */}
        <div className="space-y-3 pb-4 border-b border-border">
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
                defect.defectCode,
                defect.description
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
              classification: defect.defectCode,
              itemLocation: defect.item || 'Not specified',
              description: defect.description || 'No description provided',
              recommendation: defect.recommendation,
            }}
          />
        </div>

        <div>
          <Label className="mb-1.5 block">Item/Location</Label>
          <Input
            placeholder="e.g., Consumer unit, Kitchen socket"
            value={defect.item}
            onChange={async (e) => {
              const { sanitizeTextInput } = await import('@/utils/inputSanitization');
              onUpdate(defect.id, 'item', sanitizeTextInput(e.target.value));
            }}
            className="h-11 text-base touch-manipulation"
          />
        </div>
        <div>
          <Label className="mb-1.5 block">Classification</Label>
          <MobileSelectPicker
            value={defect.defectCode}
            onValueChange={(value) => onUpdate(defect.id, 'defectCode', value as 'C1' | 'C2' | 'C3' | 'FI' | 'N/A' | 'LIM')}
            options={defectCodes.map((code) => ({
              value: code.code,
              label: `${code.code} - ${code.description}`,
            }))}
            placeholder="Select classification"
            title="Defect Classification"
          />
        </div>
        <div>
          <Label className="mb-1.5 block">
            {defect.defectCode === 'N/A' ? 'Reason for Not Applicable' : 
             defect.defectCode === 'LIM' ? 'Description of Limitation' : 
             'Description of Defect'}
          </Label>
          <Textarea
            placeholder={
              defect.defectCode === 'N/A' ? 'Explain why this item is not applicable...' :
              defect.defectCode === 'LIM' ? 'Describe the limitation encountered...' :
              'Detailed description of the defect found...'
            }
            value={defect.description}
            onChange={async (e) => {
              const { sanitizeTextInput } = await import('@/utils/inputSanitization');
              onUpdate(defect.id, 'description', sanitizeTextInput(e.target.value));
            }}
            rows={3}
            className="touch-manipulation text-base min-h-[120px]"
          />
        </div>
        {defect.defectCode !== 'N/A' && (
          <div>
            <Label className="mb-1.5 block">
              {defect.defectCode === 'LIM' ? 'Further Action Required' : 'Recommendation'}
            </Label>
            <Textarea
              placeholder={
                defect.defectCode === 'LIM' ? 'What action is needed to overcome this limitation...' :
                'Recommended remedial action...'
              }
              value={defect.recommendation}
              onChange={async (e) => {
                const { sanitizeTextInput } = await import('@/utils/inputSanitization');
                onUpdate(defect.id, 'recommendation', sanitizeTextInput(e.target.value));
              }}
              rows={2}
              className="touch-manipulation text-base min-h-[100px]"
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default DefectObservationCard;