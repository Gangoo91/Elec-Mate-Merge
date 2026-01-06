import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, FileText, Trash2, Minus, Info } from 'lucide-react';
import { EICObservation } from '@/hooks/useEICObservations';
import { useInspectionPhotos } from '@/hooks/useInspectionPhotos';
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
          <Select
            value={observation.defectCode}
            onValueChange={(value: 'unsatisfactory' | 'limitation' | 'not-applicable') => {
              // Update observation locally
              onUpdate(observation.id, 'defectCode', value);
              
              // Sync back to inspection item if linked
              if (observation.inspectionItemId && onSyncToInspectionItem) {
                onSyncToInspectionItem(observation.inspectionItemId, value);
              }
            }}
          >
            <SelectTrigger className="h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {defectCodes.map((code) => (
                <SelectItem key={code.code} value={code.code}>
                  {code.code.toUpperCase()} - {code.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            <span className="text-xs text-muted-foreground">
              {photos.length} photo{photos.length !== 1 ? 's' : ''}
            </span>
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
