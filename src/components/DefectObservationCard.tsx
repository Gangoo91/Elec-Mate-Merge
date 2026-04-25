import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText,
  Trash2,
  Minus,
  Info,
  Camera,
  Check,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { useInspectionPhotos } from '@/hooks/useInspectionPhotos';
import { useEnhanceObservation } from '@/hooks/useEnhanceObservation';
import InspectionPhotoUpload from './inspection/InspectionPhotoUpload';
import InspectionPhotoGallery from './inspection/InspectionPhotoGallery';
import AIEnhanceObservationSheet from './inspection/eicr/AIEnhanceObservationSheet';
import { cn } from '@/lib/utils';

interface DefectObservation {
  id: string;
  item: string;
  defectCode: 'C1' | 'C2' | 'C3' | 'FI' | 'N/A' | 'LIM';
  description: string;
  recommendation: string;
  rectified: boolean;
  regulation?: string;
  inspectionItemId?: string;
}

interface DefectObservationCardProps {
  defect: DefectObservation;
  reportId: string;
  index: number;
  onUpdate: (id: string, field: keyof DefectObservation | '__BULK__', value: any) => void;
  onRemove: (id: string) => void;
  certificateContext?: {
    certificateNumber?: string;
    certificateType?: 'eicr' | 'eic';
    installationAddress?: string;
    clientName?: string;
    clientPhone?: string;
    clientEmail?: string;
    inspectorName?: string;
    companyName?: string;
    companyPhone?: string;
    companyEmail?: string;
    registrationScheme?: string;
    registrationNumber?: string;
  };
}

const defectCodeConfig = {
  C1: {
    label: 'C1 - DANGER',
    description: 'Danger present — immediate action required',
    bgClass: 'bg-red-500/20',
    borderClass: 'border-red-500',
    textClass: 'text-red-400',
    cardBg: '',
    icon: XCircle,
  },
  C2: {
    label: 'C2 - POTENTIALLY DANGEROUS',
    description: 'Potentially dangerous — urgent action required',
    bgClass: 'bg-orange-500/20',
    borderClass: 'border-orange-500',
    textClass: 'text-orange-400',
    cardBg: '',
    icon: AlertTriangle,
  },
  C3: {
    label: 'C3 - IMPROVEMENT',
    description: 'Improvement recommended',
    bgClass: 'bg-yellow-500/20',
    borderClass: 'border-yellow-500/60',
    textClass: 'text-yellow-400',
    cardBg: '',
    icon: CheckCircle,
  },
  FI: {
    label: 'FI - FURTHER INVESTIGATION',
    description: 'Further investigation advised',
    bgClass: 'bg-blue-500/20',
    borderClass: 'border-blue-500/60',
    textClass: 'text-blue-400',
    cardBg: '',
    icon: FileText,
  },
  'N/A': {
    label: 'N/A',
    description: 'Not applicable',
    bgClass: 'bg-white/10',
    borderClass: 'border-white/20',
    textClass: 'text-white',
    cardBg: '',
    icon: Minus,
  },
  LIM: {
    label: 'LIM - LIMITATION',
    description: 'Limitation noted',
    bgClass: 'bg-purple-500/20',
    borderClass: 'border-purple-500/60',
    textClass: 'text-purple-400',
    cardBg: '',
    icon: Info,
  },
};

const DefectObservationCard = ({
  defect,
  reportId,
  index,
  onUpdate,
  onRemove,
  certificateContext,
}: DefectObservationCardProps) => {
  const [showAISheet, setShowAISheet] = useState(false);
  const { enhance, retry, isEnhancing, suggestions, progressStep } = useEnhanceObservation();

  const { photos, isUploading, isScanning, uploadPhoto, deletePhoto, scanPhotoWithAI } =
    useInspectionPhotos({
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

  const config = defectCodeConfig[defect.defectCode];
  const IconComponent = config.icon;

  const handleCodeChange = (code: DefectObservation['defectCode']) => {
    // Save scroll position before state update to prevent scroll jump
    const scrollY = window.scrollY;
    onUpdate(defect.id, 'defectCode', code);
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  };

  return (
    <div className={cn('rounded-xl overflow-hidden border-l-[3px]', config.borderClass, 'border border-white/[0.06]', config.cardBg)}>
      {/* Header — item number + current code badge + delete */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-white/[0.02] border-b border-white/[0.04]">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-bold text-white">#{index + 1}</span>
          <span className={cn('text-[11px] font-bold px-2.5 py-1 rounded-md border', config.bgClass, config.borderClass, config.textClass)}>
            {defect.defectCode}
          </span>
          <span className="text-[10px] text-white/30 hidden sm:inline">{config.description}</span>
        </div>
        <button
          onClick={() => onRemove(defect.id)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400/50 hover:text-red-400 hover:bg-red-500/10 touch-manipulation active:scale-[0.95] transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Classification selector — full-width row of tappable buttons */}
      <div className="px-3.5 py-2.5 border-b border-white/[0.04] bg-white/[0.01]">
        <div className="grid grid-cols-6 gap-1.5">
          {(Object.keys(defectCodeConfig) as DefectObservation['defectCode'][]).map((code) => {
            const codeConfig = defectCodeConfig[code];
            const isActive = defect.defectCode === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => handleCodeChange(code)}
                className={cn(
                  'h-9 rounded-lg text-xs font-bold transition-all touch-manipulation active:scale-[0.96]',
                  isActive
                    ? cn(codeConfig.bgClass, codeConfig.borderClass, codeConfig.textClass, 'border')
                    : 'bg-white/[0.03] border border-white/[0.06] text-white/30'
                )}
              >
                {code}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="px-3.5 py-3 space-y-3">
        {/* Item / Location */}
        <div>
          <Label className="text-[10px] text-white/50 uppercase tracking-wider mb-1 block">Item / Location</Label>
          <Input
            placeholder="e.g., Consumer unit, Kitchen socket"
            value={defect.item}
            onChange={async (e) => {
              const value = e.target.value;
              const { sanitizeTextInput } = await import('@/utils/inputSanitization');
              onUpdate(defect.id, 'item', sanitizeTextInput(value));
            }}
            className="h-11 text-sm bg-white/[0.04] border-white/[0.06] focus:border-yellow-500 focus:ring-yellow-500 placeholder:text-white/25 touch-manipulation"
          />
        </div>

        {/* Observation description */}
        <div>
          <Label className="text-[10px] text-white/50 uppercase tracking-wider mb-1 block">
            {defect.defectCode === 'N/A'
              ? 'Reason for Not Applicable'
              : defect.defectCode === 'LIM'
                ? 'Limitation Description'
                : 'Observation'}
          </Label>
          <Textarea
            placeholder={
              defect.defectCode === 'N/A'
                ? 'Explain why this item is not applicable...'
                : defect.defectCode === 'LIM'
                  ? 'Describe the limitation encountered...'
                  : 'Include the relevant schedule reference(s), as appropriate...'
            }
            value={defect.description}
            onChange={async (e) => {
              const value = e.target.value;
              const { sanitizeTextInput } = await import('@/utils/inputSanitization');
              onUpdate(defect.id, 'description', sanitizeTextInput(value));
            }}
            rows={2}
            className="text-base bg-white/[0.04] border-white/[0.06] focus:border-yellow-500 focus:ring-yellow-500
                       placeholder:text-white/25 resize-none min-h-[70px] touch-manipulation"
          />
        </div>

        {/* Recommendation */}
        {defect.defectCode !== 'N/A' && (
          <div>
            <Label className="text-[10px] text-white/50 uppercase tracking-wider mb-1 block">
              {defect.defectCode === 'LIM' ? 'Further Action Required' : 'Recommendation'}
            </Label>
            <Textarea
              placeholder={
                defect.defectCode === 'LIM'
                  ? 'What action is needed to overcome this limitation...'
                  : 'Recommended remedial action...'
              }
              value={defect.recommendation}
              onChange={async (e) => {
                const value = e.target.value;
                const { sanitizeTextInput } = await import('@/utils/inputSanitization');
                onUpdate(defect.id, 'recommendation', sanitizeTextInput(value));
              }}
              rows={2}
              className="text-base bg-white/[0.04] border-white/[0.06] focus:border-yellow-500 focus:ring-yellow-500
                         placeholder:text-white/25 resize-none min-h-[60px] touch-manipulation"
            />
          </div>
        )}

        {/* BS 7671 References (read-only, populated by AI) */}
        {defect.regulation && (
          <div className="rounded-xl p-3 border border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-1.5 mb-2">
              <BookOpen className="h-3.5 w-3.5 text-elec-yellow" />
              <span className="text-xs font-semibold text-white">BS 7671 References</span>
            </div>
            <p className="text-xs text-white font-mono leading-relaxed">{defect.regulation}</p>
          </div>
        )}

        {/* AI Enhance Button */}
        {defect.defectCode !== 'N/A' && defect.description.length >= 5 && (
          <Button
            type="button"
            onClick={async () => {
              setShowAISheet(true);
              await enhance({
                description: defect.description,
                location: defect.item,
                currentCode: defect.defectCode,
              });
            }}
            disabled={isEnhancing}
            className="h-11 w-full gap-2 bg-gradient-to-r from-elec-yellow/20 to-amber-500/20
                       border border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/30
                       touch-manipulation"
            variant="outline"
          >
            <Sparkles className="h-4 w-4" />
            AI Enhance Observation
          </Button>
        )}

        {/* Photo Evidence */}
        <div className="pt-3 border-t border-white/5">
          <div className="flex items-center justify-between mb-3">
            <Label className="text-xs text-white flex items-center gap-1.5">
              <Camera className="h-3.5 w-3.5" />
              Photo Evidence
            </Label>
            <span className="text-xs text-white">
              {photos.length} photo{photos.length !== 1 ? 's' : ''}
            </span>
          </div>

          <InspectionPhotoUpload
            onPhotoCapture={async (file) => {
              await uploadPhoto(file, defect.defectCode, defect.description);
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
                  classification: defect.defectCode,
                  itemLocation: defect.item || 'Not specified',
                  description: defect.description || 'No description provided',
                  recommendation: defect.recommendation,
                }}
                certificateContext={certificateContext}
              />
            </div>
          )}
        </div>

        {/* Rectified Checkbox */}
        {defect.defectCode !== 'N/A' && defect.defectCode !== 'LIM' && (
          <div className="pt-3 border-t border-white/5">
            <button
              type="button"
              onClick={() => onUpdate(defect.id, 'rectified', !defect.rectified)}
              className={cn(
                'flex items-center gap-3 w-full p-3 rounded-xl transition-all touch-manipulation',
                defect.rectified
                  ? 'bg-green-500/15 border border-green-500/30'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              )}
            >
              <div
                className={cn(
                  'w-5 h-5 rounded flex items-center justify-center transition-colors',
                  defect.rectified
                    ? 'bg-green-500 text-white'
                    : 'bg-white/10 border border-white/20'
                )}
              >
                {defect.rectified && <Check className="h-3.5 w-3.5" />}
              </div>
              <span
                className={cn(
                  'text-sm font-medium',
                  defect.rectified ? 'text-green-400' : 'text-white'
                )}
              >
                {defect.rectified ? 'Rectified during inspection' : 'Mark as rectified'}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Issue Danger Notice — C1 only */}
      {defect.defectCode === 'C1' && certificateContext && (
        <IssueDangerNoticeButton
          defect={defect}
          certificateContext={certificateContext}
          photos={photos}
        />
      )}

      <AIEnhanceObservationSheet
        open={showAISheet}
        onOpenChange={setShowAISheet}
        isEnhancing={isEnhancing}
        progressStep={progressStep}
        suggestions={suggestions}
        currentCode={defect.defectCode}
        currentDescription={defect.description}
        onAcceptCode={(code) => onUpdate(defect.id, 'defectCode', code)}
        onAcceptDescription={(desc) => onUpdate(defect.id, 'description', desc)}
        onAcceptRecommendation={(rec) => onUpdate(defect.id, 'recommendation', rec)}
        onAcceptRegulations={(regulation) => onUpdate(defect.id, 'regulation', regulation)}
        onAcceptAll={() => {
          if (suggestions) {
            // Build merged updates and apply in a SINGLE onUpdate call
            // to avoid race condition where rapid sequential calls
            // each read the same stale state and only the last one sticks
            const mergedUpdates: Partial<DefectObservation> = {};
            if (suggestions.suggestedCode && suggestions.suggestedCode !== defect.defectCode) {
              mergedUpdates.defectCode = suggestions.suggestedCode;
            }
            if (suggestions.enhancedDescription) {
              mergedUpdates.description = suggestions.enhancedDescription;
            }
            if (suggestions.recommendation) {
              mergedUpdates.recommendation = suggestions.recommendation;
            }
            if (suggestions.regulationRefs?.length > 0) {
              mergedUpdates.regulation = suggestions.regulationRefs
                .map((r) => `${r.number}: ${r.title}`)
                .join('; ');
            }
            // Use special '__BULK__' field to apply all updates atomically
            onUpdate(defect.id, '__BULK__', mergedUpdates);
            setShowAISheet(false);
          }
        }}
        onRetry={retry}
      />
    </div>
  );
};

/** Danger Notice button for C1 observations — navigates with pre-fill data */
function IssueDangerNoticeButton({
  defect,
  certificateContext,
  photos,
}: {
  defect: DefectObservation;
  certificateContext: NonNullable<DefectObservationCardProps['certificateContext']>;
  photos: { id: string; url: string }[];
}) {
  const navigate = useNavigate();

  return (
    <div className="pt-3 border-t border-white/5">
      <button
        type="button"
        onClick={() => {
          navigate('/electrician/inspection-testing/danger-notice', {
            state: {
              fromEicr: true,
              eicrCertNumber: certificateContext.certificateNumber || '',
              clientName: certificateContext.clientName || '',
              installationAddress: certificateContext.installationAddress || '',
              clientPhone: certificateContext.clientPhone || '',
              clientEmail: certificateContext.clientEmail || '',
              inspectorName: certificateContext.inspectorName || '',
              inspectorCompany: certificateContext.companyName || '',
              inspectorPhone: certificateContext.companyPhone || '',
              inspectorEmail: certificateContext.companyEmail || '',
              inspectorRegistration: certificateContext.registrationNumber || '',
              inspectorScheme: certificateContext.registrationScheme || '',
              observation: {
                description: defect.description,
                item: defect.item,
                regulation: defect.regulation || '',
                recommendation: defect.recommendation,
                photos: photos.map((p) => p.url).filter(Boolean),
              },
            },
          });
        }}
        className="flex items-center gap-3 w-full p-3 rounded-xl bg-red-500/10 border border-red-500/25 hover:bg-red-500/15 transition-all touch-manipulation active:scale-[0.98]"
      >
        <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
        <span className="text-sm font-medium text-red-400">Issue Danger Notice</span>
        <span className="text-[10px] text-white ml-auto">Pre-filled from this observation</span>
      </button>
    </div>
  );
}

export default DefectObservationCard;
