import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, Trash2, Minus, Info, FileText } from 'lucide-react';
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

const defectCodes = [
  { code: 'unsatisfactory', description: 'Does not comply with BS 7671', severity: 'high' },
  { code: 'limitation', description: 'Limitation noted during inspection', severity: 'limitation' },
  { code: 'not-applicable', description: 'Not applicable to this installation', severity: 'neutral' },
];

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
    case 'limitation': return <Info className="h-4 w-4 text-purple-400" />;
    case 'neutral': return <Minus className="h-4 w-4 text-white" />;
    default: return <FileText className="h-4 w-4 text-elec-yellow" />;
  }
};

const getBorderColor = (severity: string) => {
  switch (severity) {
    case 'high': return 'border-l-red-500';
    case 'limitation': return 'border-l-purple-500';
    case 'neutral': return 'border-l-white/20';
    default: return 'border-l-elec-yellow';
  }
};

const EICDefectObservationCard: React.FC<EICDefectObservationCardProps> = ({
  observation,
  reportId,
  index,
  onUpdate,
  onRemove,
  onSyncToInspectionItem,
}) => {
  const { photos, isUploading, isScanning, uploadPhoto, deletePhoto, scanPhotoWithAI } =
    useInspectionPhotos({
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

  const currentDefectCode = defectCodes.find((c) => c.code === observation.defectCode);
  const borderColor = getBorderColor(currentDefectCode?.severity || 'high');

  return (
    <div className={`bg-white/[0.03] rounded-lg border border-white/[0.06] border-l-4 ${borderColor} p-4 space-y-4`}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
          {getSeverityIcon(currentDefectCode?.severity || 'high')}
          Observation {index + 1}
        </h4>
        <div className="flex items-center gap-2">
          {(observation.defectCode === 'C1' ||
            observation.defectCode === 'C2' ||
            observation.defectCode === 'C3') && (
            <div className="flex items-center gap-2 px-2 py-1 bg-white/[0.03] rounded-lg">
              <Checkbox
                checked={observation.rectified}
                onCheckedChange={(checked) => onUpdate(observation.id, 'rectified', checked)}
                className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
              />
              <Label className="text-xs text-white cursor-pointer">Rectified</Label>
            </div>
          )}
          <button
            onClick={() => onRemove(observation.id)}
            className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-red-400 touch-manipulation active:scale-[0.98]"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <Label className="text-white text-xs mb-1.5 block">Item/Location</Label>
          <Input
            placeholder="e.g., Consumer unit, Kitchen socket"
            value={observation.item}
            onChange={(e) => onUpdate(observation.id, 'item', e.target.value)}
            className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
          />
        </div>

        <div>
          <Label className="text-white text-xs mb-1.5 block">Classification</Label>
          <Select
            value={observation.defectCode}
            onValueChange={(value: 'unsatisfactory' | 'limitation' | 'not-applicable') => {
              onUpdate(observation.id, 'defectCode', value);
              if (observation.inspectionItemId && onSyncToInspectionItem) {
                onSyncToInspectionItem(observation.inspectionItemId, value);
              }
            }}
          >
            <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white/[0.06] border-white/[0.08] text-white z-50">
              {defectCodes.map((code) => (
                <SelectItem key={code.code} value={code.code}>
                  {code.code.toUpperCase()} - {code.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-white text-xs mb-1.5 block">
            {observation.defectCode === 'not-applicable'
              ? 'Reason for Not Applicable'
              : observation.defectCode === 'limitation'
                ? 'Description of Limitation'
                : 'Description'}
          </Label>
          <Textarea
            placeholder={
              observation.defectCode === 'not-applicable'
                ? 'Explain why this item is not applicable...'
                : observation.defectCode === 'limitation'
                  ? 'Describe the limitation encountered...'
                  : 'Detailed description of the non-compliance...'
            }
            value={observation.description}
            onChange={(e) => onUpdate(observation.id, 'description', e.target.value)}
            rows={3}
            className="text-sm touch-manipulation min-h-[80px] resize-none bg-white/[0.06] border-white/[0.08]"
          />
        </div>

        {observation.defectCode !== 'not-applicable' && (
          <div>
            <Label className="text-white text-xs mb-1.5 block">
              {observation.defectCode === 'limitation' ? 'Further Action Required' : 'Recommendation'}
            </Label>
            <Textarea
              placeholder={
                observation.defectCode === 'limitation'
                  ? 'What action is needed to overcome this limitation...'
                  : 'Recommended remedial action...'
              }
              value={observation.recommendation}
              onChange={(e) => onUpdate(observation.id, 'recommendation', e.target.value)}
              rows={2}
              className="text-sm touch-manipulation min-h-[60px] resize-none bg-white/[0.06] border-white/[0.08]"
            />
          </div>
        )}

        {/* Photo Evidence */}
        <div className="space-y-2 pt-3 border-t border-white/[0.06]">
          <div className="flex items-center justify-between">
            <Label className="text-white text-xs">Photo Evidence</Label>
            <span className="text-[10px] text-white">
              {photos.length} photo{photos.length !== 1 ? 's' : ''}
            </span>
          </div>

          <InspectionPhotoUpload
            onPhotoCapture={async (file) => {
              await uploadPhoto(file, observation.defectCode, observation.description);
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
    </div>
  );
};

export default EICDefectObservationCard;
