import React, { useLayoutEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { EICObservation, normalizeEICDefectCode } from '@/hooks/useEICObservations';
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

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none resize-none touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

/**
 * Textarea that grows to fit its content (EICR parity) — an observation runs to
 * several sentences and used to arrive trapped in a 70px scroll box, which hid
 * the very thing the user had just written. Grows to a generous ceiling, then
 * scrolls, so a card can never run away down the page.
 */
const AutoTextarea = ({
  value,
  maxHeight = 320,
  className,
  ...props
}: React.ComponentProps<typeof Textarea> & { maxHeight?: number }) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    const next = Math.min(el.scrollHeight, maxHeight);
    el.style.height = `${next}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }, [value, maxHeight]);

  return <Textarea ref={ref} value={value} className={cn(className, 'resize-none')} {...props} />;
};

const EICDefectObservationCard: React.FC<EICDefectObservationCardProps> = ({
  observation,
  reportId,
  index,
  onUpdate,
  onRemove,
  onSyncToInspectionItem,
}) => {
  const haptic = useHaptic();
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  // Display code — maps legacy EICR codes (C1/C2/C3) stored by older certs to
  // the three EIC classifications so a chip always highlights. Chip taps write
  // the canonical EIC code back.
  const displayCode = normalizeEICDefectCode(observation.defectCode);

  const { photos, isUploading, isScanning, uploadPhoto, deletePhoto, scanPhotoWithAI } =
    useInspectionPhotos({
      reportId: reportId || '',
      reportType: 'eic',
      itemId: observation.id,
      observationId: observation.id,
      observationContext: {
        classification: displayCode.toUpperCase(),
        itemLocation: observation.item || 'Not specified',
        description: observation.description || 'No description provided',
        recommendation: observation.recommendation,
      },
    });

  const getBorderColor = () => {
    switch (displayCode) {
      case 'unsatisfactory': return 'border-l-red-500';
      case 'limitation': return 'border-l-amber-500';
      default: return 'border-l-white/20';
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.1] bg-white/[0.05]">
      {/* Header bar — classification chips only. Remove used to sit here, a
          thumb-width from N/A, and deleted the card instantly; it now lives at
          the foot of the card behind a confirm. */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className={cn(
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold',
            displayCode === 'unsatisfactory' ? 'bg-red-500 text-white' :
            displayCode === 'limitation' ? 'bg-amber-500 text-black' :
            'bg-white/[0.12] text-white'
          )}>
            {index + 1}
          </span>
          <div className="flex gap-1.5">
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
                  'h-11 rounded-xl px-3 text-[12px] font-semibold transition-all touch-manipulation active:scale-[0.98]',
                  displayCode === c.code
                    ? c.code === 'unsatisfactory'
                      ? 'bg-red-500 border border-red-500 text-white'
                      : c.code === 'limitation'
                        ? 'bg-amber-500 border border-amber-500 text-black'
                        : 'bg-white/[0.15] border border-white/[0.2] text-white'
                    : 'bg-white/[0.06] border border-white/[0.12] text-white'
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content — description + recommendation pair up on desktop so a card
          stays one screen tall */}
      <div className="space-y-4 p-4">
        <div className="sm:max-w-md">
          <label className={labelCn}>Item / location</label>
          <Input
            placeholder="e.g., Consumer unit, Kitchen socket"
            value={observation.item}
            onChange={(e) => onUpdate(observation.id, 'item', e.target.value)}
            className={inputCn}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6">
          <div>
            <label className={labelCn}>
              {displayCode === 'limitation' ? 'Limitation details' : 'Description'}
            </label>
            <AutoTextarea
              placeholder={displayCode === 'limitation' ? 'Describe the limitation...' : 'Describe the issue...'}
              value={observation.description}
              onChange={(e) => onUpdate(observation.id, 'description', e.target.value)}
              className={cn(textareaCn, 'min-h-[70px]')}
            />
          </div>

          {displayCode !== 'not-applicable' && (
            <div>
              <label className={labelCn}>
                {displayCode === 'limitation' ? 'Action required' : 'Recommendation'}
              </label>
              <AutoTextarea
                placeholder="Remedial action required..."
                value={observation.recommendation}
                onChange={(e) => onUpdate(observation.id, 'recommendation', e.target.value)}
                className={cn(textareaCn, 'min-h-[70px]')}
              />
            </div>
          )}
        </div>

        <div className="sm:max-w-md">
          <InspectionPhotoUpload
            onPhotoCapture={async (file) => {
              await uploadPhoto(file, displayCode, observation.description);
            }}
            isUploading={isUploading}
          />
        </div>

        {photos.length > 0 && (
          <InspectionPhotoGallery
            photos={photos}
            onDeletePhoto={deletePhoto}
            onScanPhoto={scanPhotoWithAI}
            isScanning={isScanning}
            inspectorContext={{
              classification: displayCode.toUpperCase(),
              itemLocation: observation.item || 'Not specified',
              description: observation.description || 'No description provided',
              recommendation: observation.recommendation,
            }}
          />
        )}

        {/* Destructive action — its own row at the foot of the card, well
            clear of the classification chips, and confirmed before it fires:
            a mis-tap used to bin the typed description, the recommendation
            and orphan the uploaded photos with no way back. */}
        <div className="border-t border-white/[0.08] pt-3">
          <button
            type="button"
            onClick={() => { haptic.warning(); setShowRemoveConfirm(true); }}
            className="h-11 w-full rounded-xl border border-red-500/30 bg-red-500/[0.08] text-[13px] font-medium text-red-400 touch-manipulation active:scale-[0.98]"
          >
            Remove observation
          </button>
        </div>
      </div>

      {/* Shared ConfirmationDialog, variant="destructive" — same component and
          red confirm the rest of the app uses (SignaturePad's Clear, quote
          delete). A raw AlertDialog here rendered the destructive action in
          primary yellow, reading as the safe choice. */}
      <ConfirmationDialog
        open={showRemoveConfirm}
        onOpenChange={setShowRemoveConfirm}
        title="Remove this observation?"
        description={`Observation ${index + 1} and anything typed into it will be deleted, along with any photos attached to it. This cannot be undone.`}
        confirmText="Remove observation"
        cancelText="Cancel"
        variant="destructive"
        onConfirm={() => onRemove(observation.id)}
      />
    </div>
  );
};

export default EICDefectObservationCard;
