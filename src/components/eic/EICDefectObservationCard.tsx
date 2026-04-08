import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import { EICObservation } from '@/hooks/useEICObservations';
import { useInspectionPhotos } from '@/hooks/useInspectionPhotos';
import InspectionPhotoUpload from '@/components/inspection/InspectionPhotoUpload';
import InspectionPhotoGallery from '@/components/inspection/InspectionPhotoGallery';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

interface EICDefectObservationCardProps {
  observation: EICObservation;
  reportId: string;
  index: number;
  onUpdate: (id: string, field: keyof EICObservation, value: any) => void;
  onRemove: (id: string) => void;
  onSyncToInspectionItem?: (inspectionItemId: string, newOutcome: string) => void;
}

const CLASSIFICATIONS = [
  { code: 'unsatisfactory', label: 'Unsat' },
  { code: 'limitation', label: 'LIM' },
  { code: 'not-applicable', label: 'N/A' },
];

const EICDefectObservationCard: React.FC<EICDefectObservationCardProps> = ({
  observation,
  reportId,
  index,
  onUpdate,
  onRemove,
  onSyncToInspectionItem,
}) => {
  const haptic = useHaptic();

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

  const getBorderColor = () => {
    switch (observation.defectCode) {
      case 'unsatisfactory': return 'border-l-red-500';
      case 'limitation': return 'border-l-amber-500';
      default: return 'border-l-white/20';
    }
  };

  return (
    <div className="rounded-lg bg-white/[0.06] border border-white/[0.08] overflow-hidden">
      {/* Header bar — coloured accent */}
      <div className={cn(
        'flex items-center justify-between px-3 py-2',
        observation.defectCode === 'unsatisfactory' ? 'bg-red-500/10' :
        observation.defectCode === 'limitation' ? 'bg-amber-500/10' : 'bg-white/[0.03]'
      )}>
        <div className="flex items-center gap-2">
          <span className={cn(
            'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold',
            observation.defectCode === 'unsatisfactory' ? 'bg-red-500/20 text-red-400' :
            observation.defectCode === 'limitation' ? 'bg-amber-500/20 text-amber-400' :
            'bg-white/[0.08] text-white'
          )}>
            {index + 1}
          </span>
          <div className="flex gap-1">
            {CLASSIFICATIONS.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  haptic.light();
                  onUpdate(observation.id, 'defectCode', c.code);
                  if (observation.inspectionItemId && onSyncToInspectionItem) {
                    onSyncToInspectionItem(observation.inspectionItemId, c.code);
                  }
                }}
                className={cn(
                  'h-7 px-2 rounded-md font-semibold text-[9px] touch-manipulation active:scale-[0.98]',
                  observation.defectCode === c.code
                    ? c.code === 'unsatisfactory'
                      ? 'bg-red-500 text-white'
                      : c.code === 'limitation'
                        ? 'bg-amber-500 text-black'
                        : 'bg-white/[0.15] text-white'
                    : 'bg-transparent text-white'
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => { haptic.warning(); onRemove(observation.id); }}
          className="w-7 h-7 flex items-center justify-center text-white touch-manipulation active:scale-[0.98]"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 space-y-3">
        <div>
          <label className="text-[10px] text-white mb-1 block">Item / Location</label>
          <Input
            placeholder="e.g., Consumer unit, Kitchen socket"
            value={observation.item}
            onChange={(e) => onUpdate(observation.id, 'item', e.target.value)}
            className="h-10 text-sm touch-manipulation bg-white/[0.04] border-white/[0.06] focus:border-elec-yellow/50"
          />
        </div>

        <div>
          <label className="text-[10px] text-white mb-1 block">
            {observation.defectCode === 'limitation' ? 'Limitation Details' : 'Description'}
          </label>
          <Textarea
            placeholder={observation.defectCode === 'limitation' ? 'Describe the limitation...' : 'Describe the issue...'}
            value={observation.description}
            onChange={(e) => onUpdate(observation.id, 'description', e.target.value)}
            className="min-h-[50px] text-sm touch-manipulation resize-none bg-white/[0.04] border-white/[0.06] focus:border-elec-yellow/50"
          />
        </div>

        {observation.defectCode !== 'not-applicable' && (
          <div>
            <label className="text-[10px] text-white mb-1 block">
              {observation.defectCode === 'limitation' ? 'Action Required' : 'Recommendation'}
            </label>
            <Textarea
              placeholder="Remedial action required..."
              value={observation.recommendation}
              onChange={(e) => onUpdate(observation.id, 'recommendation', e.target.value)}
              className="min-h-[40px] text-sm touch-manipulation resize-none bg-white/[0.04] border-white/[0.06] focus:border-elec-yellow/50"
            />
          </div>
        )}

        <InspectionPhotoUpload
          onPhotoCapture={async (file) => {
            await uploadPhoto(file, observation.defectCode, observation.description);
          }}
          isUploading={isUploading}
        />

        {photos.length > 0 && (
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
        )}
      </div>
    </div>
  );
};

export default EICDefectObservationCard;
