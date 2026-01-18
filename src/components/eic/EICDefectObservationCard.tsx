/**
 * EIC Defect Observation Card
 *
 * Premium glass morphism card for individual observations.
 * Native mobile app feel with touch-optimized controls.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Trash2, Info, ChevronDown, ChevronUp, Camera, MapPin } from 'lucide-react';
import { EICObservation } from '@/hooks/useEICObservations';
import { useInspectionPhotos } from '@/hooks/useInspectionPhotos';
import InspectionPhotoUpload from '@/components/inspection/InspectionPhotoUpload';
import InspectionPhotoGallery from '@/components/inspection/InspectionPhotoGallery';
import { cn } from '@/lib/utils';

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
  const [isExpanded, setIsExpanded] = useState(true);

  // Initialize photo management
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
    { code: 'unsatisfactory', label: 'Unsatisfactory', description: 'Does not comply with BS 7671', color: 'red' },
    { code: 'limitation', label: 'Limitation', description: 'Limitation noted during inspection', color: 'purple' },
    { code: 'not-applicable', label: 'N/A', description: 'Not applicable to this installation', color: 'neutral' }
  ];

  const currentCode = defectCodes.find(c => c.code === observation.defectCode) || defectCodes[0];

  const getBorderColor = () => {
    switch (currentCode.color) {
      case 'red': return 'border-l-red-500';
      case 'purple': return 'border-l-purple-500';
      case 'neutral': return 'border-l-neutral-500';
      default: return 'border-l-orange-500';
    }
  };

  const getBadgeStyles = () => {
    switch (currentCode.color) {
      case 'red': return 'bg-red-500/15 text-red-400';
      case 'purple': return 'bg-purple-500/15 text-purple-400';
      case 'neutral': return 'bg-neutral-500/15 text-neutral-400';
      default: return 'bg-orange-500/15 text-orange-400';
    }
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-white/[0.03] backdrop-blur-sm",
        "border border-white/[0.06]",
        "border-l-4",
        getBorderColor()
      )}
    >
      {/* Header - Always Visible */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer touch-manipulation"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Number Badge */}
          <div className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
            "text-sm font-bold",
            getBadgeStyles()
          )}>
            {index + 1}
          </div>

          {/* Title & Location */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              {currentCode.color === 'red' && <AlertTriangle className="w-4 h-4 text-red-400" />}
              {currentCode.color === 'purple' && <Info className="w-4 h-4 text-purple-400" />}
              <span className={cn(
                "text-sm font-medium",
                currentCode.color === 'red' && "text-red-400",
                currentCode.color === 'purple' && "text-purple-400",
                currentCode.color === 'neutral' && "text-neutral-400"
              )}>
                {currentCode.label}
              </span>
            </div>
            {observation.item && (
              <p className="text-xs text-foreground/50 truncate mt-0.5">
                {observation.item}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(observation.id);
            }}
            className="h-8 w-8 flex items-center justify-center rounded-lg text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-colors touch-manipulation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="h-8 w-8 flex items-center justify-center text-foreground/40">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-white/[0.06] pt-4">
              {/* Location Field */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-foreground/50" />
                  <span className="text-xs text-foreground/50">Item/Location</span>
                </div>
                <Input
                  placeholder="e.g., Consumer unit, Kitchen socket"
                  value={observation.item}
                  onChange={(e) => onUpdate(observation.id, 'item', e.target.value)}
                  className="h-11 text-sm bg-white/[0.03] border-white/[0.08] focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50"
                />
              </div>

              {/* Classification */}
              <div>
                <span className="text-xs text-foreground/50 mb-2 block">Classification</span>
                <div className="flex gap-2">
                  {defectCodes.map((code) => (
                    <button
                      key={code.code}
                      onClick={() => {
                        onUpdate(observation.id, 'defectCode', code.code);
                        if (observation.inspectionItemId && onSyncToInspectionItem) {
                          onSyncToInspectionItem(observation.inspectionItemId, code.code);
                        }
                      }}
                      className={cn(
                        "flex-1 h-10 rounded-lg text-sm font-medium transition-all duration-200",
                        "touch-manipulation active:scale-[0.97]",
                        observation.defectCode === code.code
                          ? code.color === 'red'
                            ? "bg-red-600 text-white"
                            : code.color === 'purple'
                            ? "bg-purple-600 text-white"
                            : "bg-neutral-600 text-white"
                          : "bg-white/[0.05] text-foreground/70 border border-white/[0.08]"
                      )}
                    >
                      {code.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <span className="text-xs text-foreground/50 mb-2 block">
                  {observation.defectCode === 'not-applicable' ? 'Reason' :
                   observation.defectCode === 'limitation' ? 'Limitation Details' :
                   'Description'}
                </span>
                <Textarea
                  placeholder={
                    observation.defectCode === 'not-applicable' ? 'Explain why this item is not applicable...' :
                    observation.defectCode === 'limitation' ? 'Describe the limitation encountered...' :
                    'Detailed description of the non-compliance...'
                  }
                  value={observation.description}
                  onChange={(e) => onUpdate(observation.id, 'description', e.target.value)}
                  className="min-h-[80px] text-sm bg-white/[0.03] border-white/[0.08] resize-none focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50"
                />
              </div>

              {/* Recommendation */}
              {observation.defectCode !== 'not-applicable' && (
                <div>
                  <span className="text-xs text-foreground/50 mb-2 block">
                    {observation.defectCode === 'limitation' ? 'Further Action Required' : 'Recommendation'}
                  </span>
                  <Textarea
                    placeholder={
                      observation.defectCode === 'limitation' ? 'What action is needed to overcome this limitation...' :
                      'Recommended remedial action to achieve compliance...'
                    }
                    value={observation.recommendation}
                    onChange={(e) => onUpdate(observation.id, 'recommendation', e.target.value)}
                    className="min-h-[60px] text-sm bg-white/[0.03] border-white/[0.08] resize-none focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50"
                  />
                </div>
              )}

              {/* Photo Evidence */}
              <div className="pt-3 border-t border-white/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-foreground/50" />
                    <span className="text-xs text-foreground/50">Photo Evidence</span>
                  </div>
                  {photos.length > 0 && (
                    <span className="text-xs text-foreground/40">
                      {photos.length} photo{photos.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>

                <InspectionPhotoUpload
                  onPhotoCapture={async (file) => {
                    await uploadPhoto(file, observation.defectCode, observation.description);
                  }}
                  isUploading={isUploading}
                />

                {photos.length > 0 && (
                  <div className="mt-3">
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
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EICDefectObservationCard;
