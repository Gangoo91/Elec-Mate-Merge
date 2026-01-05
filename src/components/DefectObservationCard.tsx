
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, CheckCircle, XCircle, FileText, Trash2, Minus, Info } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useInspectionPhotos } from '@/hooks/useInspectionPhotos';
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
      case 'neutral': return <Minus className="h-4 w-4 text-gray-500" />;
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
            <span className="text-xs text-muted-foreground">
              {photos.length} photo{photos.length !== 1 ? 's' : ''}
            </span>
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
          <Select
            value={defect.defectCode}
            onValueChange={(value: 'C1' | 'C2' | 'C3' | 'FI' | 'N/A' | 'LIM') => onUpdate(defect.id, 'defectCode', value)}
          >
            <SelectTrigger className="h-11 text-base touch-manipulation">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]" position="popper">
              {defectCodes.map((code) => (
                <SelectItem key={code.code} value={code.code}>
                  {code.code} - {code.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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