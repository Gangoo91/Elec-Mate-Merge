import React, { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sanitizeTextInput } from '@/utils/inputSanitization';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useInspectionPhotos } from '@/hooks/useInspectionPhotos';
import { useEnhanceObservation } from '@/hooks/useEnhanceObservation';
import { useHaptic } from '@/hooks/useHaptic';
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

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none resize-none touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

// SOLID colour-coded selected states — never translucent washes.
const defectCodeConfig = {
  C1: {
    label: 'C1 - DANGER',
    description: 'Danger present. Risk of injury. Immediate remedial action is necessary',
    chipOn: 'bg-red-600 border-red-600 text-white font-semibold',
    borderL: 'border-l-red-600',
  },
  C2: {
    label: 'C2 - POTENTIALLY DANGEROUS',
    description: 'Potentially dangerous — urgent remedial action is necessary',
    chipOn: 'bg-orange-500 border-orange-500 text-black font-semibold',
    borderL: 'border-l-orange-500',
  },
  C3: {
    label: 'C3 - IMPROVEMENT',
    description: 'Improvement recommended',
    chipOn: 'bg-elec-yellow border-elec-yellow text-black font-semibold',
    borderL: 'border-l-elec-yellow',
  },
  FI: {
    label: 'FI - FURTHER INVESTIGATION',
    description: 'Further investigation is advised',
    chipOn: 'bg-blue-500 border-blue-500 text-white font-semibold',
    borderL: 'border-l-blue-500',
  },
  'N/A': {
    label: 'N/A',
    description: 'Not applicable',
    chipOn: 'bg-white border-white text-black font-semibold',
    borderL: 'border-l-white/30',
  },
  LIM: {
    label: 'LIM - LIMITATION',
    description: 'Limitation noted',
    chipOn: 'bg-purple-500 border-purple-500 text-white font-semibold',
    borderL: 'border-l-purple-500',
  },
};

const chipOff = 'bg-white/[0.06] border border-white/[0.12] text-white font-medium';

/**
 * Textarea that grows to fit its content — an AI-written observation is
 * several sentences and used to arrive trapped in a 70px scroll box, which
 * hid the very thing the user asked for. Grows to a generous ceiling, then
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
  const haptic = useHaptic();

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

  // The AI needs something to work from — the gate stays, but the button says so.
  const canUseAI = defect.description.trim().length >= 5;

  // Split photos into the defect (before) evidence and rectification (after)
  // evidence. After-photos are tagged with a sentinel prefix on the description
  // so we can keep a single store without a schema change.
  const RECTIFIED_TAG = '[RECTIFIED]';
  const isRectifiedPhoto = (desc?: string) => (desc || '').startsWith(RECTIFIED_TAG);
  const beforePhotos = photos.filter((p) => !isRectifiedPhoto(p.faultDescription));
  const rectifiedPhotos = photos.filter((p) => isRectifiedPhoto(p.faultDescription));

  const handleCodeChange = (code: DefectObservation['defectCode']) => {
    // Save scroll position before state update to prevent scroll jump
    const scrollY = window.scrollY;
    onUpdate(defect.id, 'defectCode', code);
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  };

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-white/[0.1] border-l-[3px] bg-white/[0.05]',
        config.borderL
      )}
    >
      {/* Header — item number + current code chip + remove */}
      <div className="flex items-center justify-between gap-2 border-b border-white/[0.08] px-3.5 py-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="text-sm font-bold text-white">#{index + 1}</span>
          <span
            className={cn('rounded-md border px-2.5 py-1 text-[11px] font-bold', config.chipOn)}
          >
            {defect.defectCode}
          </span>
          <span className="hidden truncate text-[11px] text-white/80 sm:inline">
            {config.description}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            haptic.warning();
            onRemove(defect.id);
          }}
          className="h-11 shrink-0 px-2 text-[13px] font-medium text-red-400 touch-manipulation active:scale-[0.98]"
        >
          Remove
        </button>
      </div>

      {/* Classification selector — full-width grid on phones, natural-width
          chips on larger screens (six stretched bars read badly at desktop). */}
      <div className="border-b border-white/[0.08] px-3.5 py-2.5">
        <div className="grid grid-cols-6 gap-1.5 sm:flex sm:flex-wrap">
          {(Object.keys(defectCodeConfig) as DefectObservation['defectCode'][]).map((code) => {
            const isActive = defect.defectCode === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => {
                  haptic.light();
                  handleCodeChange(code);
                }}
                className={cn(
                  'h-11 rounded-xl border text-xs transition-all touch-manipulation active:scale-[0.96] sm:w-16',
                  isActive ? defectCodeConfig[code].chipOn : chipOff
                )}
              >
                {code}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content — single column on phones; on desktop the written record
          (left) sits beside the evidence/tools column (right) so a card is
          one screen, not a scroll. */}
      <div className="px-3.5 py-4 lg:grid lg:grid-cols-2 lg:gap-x-6">
        <div className="space-y-4 lg:min-w-0">
          {/* Item / location */}
          <div>
            <label className={labelCn}>Item / location</label>
            <Input
              placeholder="e.g., Consumer unit, Kitchen socket"
              value={defect.item}
              onChange={(e) => onUpdate(defect.id, 'item', sanitizeTextInput(e.target.value))}
              className={inputCn}
            />
          </div>

          {/* Observation description */}
          <div>
            <label className={labelCn}>
              {defect.defectCode === 'N/A'
                ? 'Reason for not applicable'
                : defect.defectCode === 'LIM'
                  ? 'Limitation description'
                  : 'Observation'}
            </label>
            <AutoTextarea
              placeholder={
                defect.defectCode === 'N/A'
                  ? 'Explain why this item is not applicable…'
                  : defect.defectCode === 'LIM'
                    ? 'Describe the limitation encountered…'
                    : 'Include the relevant schedule reference(s), as appropriate…'
              }
              value={defect.description}
              onChange={(e) =>
                onUpdate(defect.id, 'description', sanitizeTextInput(e.target.value))
              }
              className={cn(textareaCn, 'min-h-[70px]')}
            />
          </div>

          {/* Recommendation */}
          {defect.defectCode !== 'N/A' && (
            <div>
              <label className={labelCn}>
                {defect.defectCode === 'LIM' ? 'Further action required' : 'Recommendation'}
              </label>
              <AutoTextarea
                placeholder={
                  defect.defectCode === 'LIM'
                    ? 'What action is needed to overcome this limitation…'
                    : 'Recommended remedial action…'
                }
                value={defect.recommendation}
                onChange={(e) =>
                  onUpdate(defect.id, 'recommendation', sanitizeTextInput(e.target.value))
                }
                className={cn(textareaCn, 'min-h-[60px]')}
              />
            </div>
          )}
        </div>

        {/* Evidence + tools column. One rhythm: every sub-block is a heading and
          its content, spaced by space-y-4 — no stacked dividers, no dead gaps. */}
        <div className="mt-4 space-y-4 border-t border-white/[0.08] pt-4 lg:mt-0 lg:min-w-0 lg:border-t-0 lg:pt-0">
          {/* BS 7671 references (read-only, populated by AI). Rendered as a clean
            list — reg number as a chip, the clause text as readable prose — so it
            never reads as a wall of monospace text (ELE-1188). */}
          {defect.regulation && (
            <div>
              <span className={labelCn}>BS 7671 references</span>
              <div className="space-y-2 rounded-xl bg-white/[0.05] p-3.5">
                {defect.regulation
                  .split(';')
                  .map((ref) => ref.trim())
                  .filter(Boolean)
                  .map((ref, i) => {
                    const idx = ref.indexOf(':');
                    const num = idx > -1 ? ref.slice(0, idx).trim() : ref;
                    const title = idx > -1 ? ref.slice(idx + 1).trim() : '';
                    // Only treat the prefix as a reg-number chip when it looks like
                    // one — otherwise (messy AI prose) render it all as readable text.
                    const isRegNumber = idx > -1 && num.length <= 22;
                    return (
                      <div key={i} className="flex gap-2">
                        {isRegNumber ? (
                          <>
                            <span className="h-fit shrink-0 rounded border border-elec-yellow/30 px-1.5 py-0.5 font-mono text-[11px] text-elec-yellow">
                              {num}
                            </span>
                            {title && (
                              <span className="text-xs leading-relaxed text-white/80">{title}</span>
                            )}
                          </>
                        ) : (
                          <span className="text-xs leading-relaxed text-white/80">{ref}</span>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* AI assist — the star tool: turns a few words into a full BS 7671
            observation, recommendation and regulation references. Always shown
            (when codeable) so inspectors know it's there. The disabled state is
            a deliberate neutral button that says what it needs — never a washed
            out ghost of the live one. */}
          {defect.defectCode !== 'N/A' && (
            <div>
              <span className={labelCn}>AI assistant</span>
              <Button
                type="button"
                onClick={async () => {
                  haptic.light();
                  setShowAISheet(true);
                  await enhance({
                    description: defect.description,
                    location: defect.item,
                    currentCode: defect.defectCode,
                  });
                }}
                disabled={isEnhancing || !canUseAI}
                variant="ghost"
                className={cn(
                  'h-12 w-full rounded-xl text-sm font-semibold transition-all touch-manipulation active:scale-[0.99]',
                  isEnhancing
                    ? 'bg-elec-yellow text-black disabled:bg-elec-yellow disabled:text-black disabled:opacity-100'
                    : canUseAI
                      ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90 hover:text-black'
                      : 'border border-white/[0.12] bg-white/[0.04] text-white/85 hover:bg-white/[0.04] hover:text-white/85 disabled:opacity-100'
                )}
              >
                {isEnhancing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin text-black" />
                    AI is writing…
                  </>
                ) : canUseAI ? (
                  'Write with AI'
                ) : (
                  'Add a few words to use AI'
                )}
              </Button>
              <p className="mt-2 text-[12px] leading-relaxed text-white/85">
                Jot a few words above — AI writes the full observation, recommendation and BS 7671
                references from the regulations database.
              </p>
            </div>
          )}

          {/* Photo evidence */}
          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className={cn(labelCn, 'mb-0')}>Photo evidence</span>
              <span className="text-[12px] text-white/85">
                {beforePhotos.length} photo{beforePhotos.length !== 1 ? 's' : ''}
              </span>
            </div>

            <InspectionPhotoUpload
              onPhotoCapture={async (file) => {
                await uploadPhoto(file, defect.defectCode, defect.description);
              }}
              isUploading={isUploading}
            />

            {beforePhotos.length > 0 && (
              <div className="mt-3">
                <InspectionPhotoGallery
                  photos={beforePhotos}
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

          {/* Rectified toggle — the section-closing action for this column */}
          {defect.defectCode !== 'N/A' && defect.defectCode !== 'LIM' && (
            <div>
              <span className={labelCn}>Rectification</span>
              <button
                type="button"
                onClick={() => {
                  haptic.light();
                  onUpdate(defect.id, 'rectified', !defect.rectified);
                }}
                className={cn(
                  'h-11 w-full rounded-xl border text-sm transition-all touch-manipulation active:scale-[0.99]',
                  defect.rectified
                    ? 'border-green-500 bg-green-500 font-semibold text-black'
                    : chipOff
                )}
              >
                {defect.rectified ? 'Rectified during inspection' : 'Mark as rectified'}
              </button>

              {/* Rectification (after) evidence — only once marked rectified */}
              {defect.rectified && (
                <div className="mt-3 rounded-xl border border-green-500/30 bg-white/[0.05] p-3.5">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="text-[12px] font-medium text-white">
                      Rectification evidence (after)
                    </span>
                    <span className="text-[12px] text-white/85">
                      {rectifiedPhotos.length} photo{rectifiedPhotos.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <InspectionPhotoUpload
                    onPhotoCapture={async (file) => {
                      await uploadPhoto(
                        file,
                        defect.defectCode,
                        `${RECTIFIED_TAG} ${defect.description}`.trim()
                      );
                    }}
                    isUploading={isUploading}
                  />

                  {rectifiedPhotos.length > 0 && (
                    <div className="mt-3">
                      <InspectionPhotoGallery
                        photos={rectifiedPhotos}
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
              )}
            </div>
          )}
        </div>
      </div>

      {/* Issue danger notice — C1 only */}
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

/** Danger notice button for C1 observations — navigates with pre-fill data */
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
    <div className="border-t border-white/[0.08] px-3.5 pb-4 pt-3.5">
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
        className="h-12 w-full rounded-xl bg-red-600 text-sm font-semibold text-white transition-all touch-manipulation active:scale-[0.98]"
      >
        Issue danger notice
      </button>
      <p className="mt-2 text-center text-xs text-white/80">Pre-filled from this observation</p>
    </div>
  );
}

export default DefectObservationCard;
