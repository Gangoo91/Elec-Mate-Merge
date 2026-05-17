import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { draftStorage } from '@/utils/draftStorage';
import { getDefaultAssumptions } from '@/utils/defaultAssumptions';
import { AutoSaveIndicator } from '@/components/electrician/shared/AutoSaveIndicator';
import { useSiteVisit } from '@/hooks/useSiteVisit';
import { useSiteVisitStorage } from '@/hooks/useSiteVisitStorage';
import { SiteVisitClientStep } from './steps/SiteVisitClientStep';
import { SiteVisitPropertyStep } from './steps/SiteVisitPropertyStep';
import { SiteVisitCaptureStep } from './steps/SiteVisitCaptureStep';
import { SiteVisitReviewStep } from './steps/SiteVisitReviewStep';
import { SiteVisitScopeStep } from './steps/SiteVisitScopeStep';
import { SiteVisitGenerateStep } from './steps/SiteVisitGenerateStep';
import { SiteVisitSignOffStep } from './steps/SiteVisitSignOffStep';
import { GoogleMapsProvider } from '@/contexts/GoogleMapsContext';
import type { SiteVisit } from '@/types/siteVisit';
import { Eyebrow } from '@/components/college/primitives';

type RecoveredDraft = Partial<SiteVisit> & {
  currentStep?: number;
  activeRoomId?: string | null;
  assumptions?: string;
};

const STEPS = [
  { id: 0, title: 'Client', shortTitle: 'Client' },
  { id: 1, title: 'Property', shortTitle: 'Property' },
  { id: 2, title: 'Capture', shortTitle: 'Capture' },
  { id: 3, title: 'Review', shortTitle: 'Review' },
  { id: 4, title: 'Scope', shortTitle: 'Scope' },
  { id: 5, title: 'Generate', shortTitle: 'Generate' },
  { id: 6, title: 'Sign-off', shortTitle: 'Sign' },
];

interface SiteVisitWizardProps {
  initialVisit?: Partial<SiteVisit>;
  onComplete?: () => void;
}

export const SiteVisitWizard = ({ initialVisit, onComplete }: SiteVisitWizardProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [showRecoveryBanner, setShowRecoveryBanner] = useState(false);
  const [recoveredDraft, setRecoveredDraft] = useState<RecoveredDraft | null>(null);
  const [assumptions, setAssumptions] = useState('');
  const [captureSeconds, setCaptureSeconds] = useState(0);

  const sv = useSiteVisit(initialVisit);
  const { sendToQuoteWizard } = useSiteVisitStorage();

  const handleSendToQuote = useCallback(() => {
    const sessionId = sendToQuoteWizard(sv.visit);
    navigate(`/electrician/quote-builder/create?siteVisitSessionId=${sessionId}`);
  }, [sv.visit, sendToQuoteWizard, navigate]);

  // Check for recoverable draft on mount
  useEffect(() => {
    if (!initialVisit) {
      const draft = draftStorage.loadDraft('site-visit', null);
      if (draft && draftStorage.hasRecoverableDraft('site-visit')) {
        setRecoveredDraft(draft.data);
        setShowRecoveryBanner(true);
      }
    }
  }, []);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sv.currentStep]);

  // Auto-populate assumptions when first arriving at Scope step
  useEffect(() => {
    if (sv.currentStep === 4 && !assumptions.trim()) {
      setAssumptions(getDefaultAssumptions(sv.visit.propertyType, sv.visit));
    }
  }, [sv.currentStep]);

  const handleRecoverDraft = useCallback(() => {
    if (recoveredDraft) {
      // Bulk restore: recovers all fields including rooms, items, photos, prompts, step
      sv.restoreVisit(recoveredDraft);
      if (recoveredDraft.assumptions) setAssumptions(recoveredDraft.assumptions);
      setShowRecoveryBanner(false);
      setRecoveredDraft(null);
    }
  }, [recoveredDraft, sv]);

  const handleDiscardDraft = useCallback(() => {
    draftStorage.clearDraft('site-visit', null);
    setShowRecoveryBanner(false);
    setRecoveredDraft(null);
  }, []);

  const canProceed = (): boolean => {
    switch (sv.currentStep) {
      case 0:
        return !!sv.visit.customerName?.trim();
      case 1:
        return !!sv.visit.propertyAddress?.trim();
      case 2:
        return sv.visit.rooms.length > 0;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return true;
    }
  };

  const currentStepTitle = STEPS[sv.currentStep]?.title || '';
  const currentStepNumber = String(sv.currentStep + 1).padStart(2, '0');

  return (
    <GoogleMapsProvider>
      <div className="space-y-5">
        {/* Draft recovery banner */}
        {showRecoveryBanner && (
          <div className="flex flex-col gap-3 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/[0.08] to-transparent p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-400">
                Unsaved draft found
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white">
                Recover where you left off?
              </div>
              <p className="mt-0.5 text-[12.5px] text-white/65">
                Your last session was saved locally and never uploaded.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDiscardDraft}
                className="flex h-9 items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-3 text-[12px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation"
              >
                Discard
              </button>
              <button
                onClick={handleRecoverDraft}
                className="flex h-9 items-center rounded-full bg-elec-yellow px-3.5 text-[12px] font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation"
              >
                Recover →
              </button>
            </div>
          </div>
        )}

        {/* Editorial step header */}
        <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <Eyebrow>
                STEP {currentStepNumber} OF {String(STEPS.length).padStart(2, '0')} ·{' '}
                {currentStepTitle.toUpperCase()}
              </Eyebrow>
              <h2 className="mt-1.5 text-[20px] font-semibold leading-tight tracking-tight text-white sm:text-[22px]">
                {currentStepTitle}
              </h2>
            </div>
            <AutoSaveIndicator lastSaved={sv.lastSaved} isSaving={sv.isSaving} />
          </div>

          {/* Numbered step pills */}
          <div className="mt-4 flex gap-1.5 overflow-x-auto scrollbar-hide">
            {STEPS.map((step) => {
              const isActive = sv.currentStep === step.id;
              const isComplete = sv.currentStep > step.id;
              const accessible = step.id <= sv.currentStep;
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    if (accessible) sv.setStep(step.id);
                  }}
                  disabled={!accessible}
                  className={cn(
                    'flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-[11px] font-medium transition-colors touch-manipulation',
                    isActive
                      ? 'bg-elec-yellow text-black'
                      : isComplete
                        ? 'border border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-400 hover:bg-emerald-500/[0.14]'
                        : 'border border-white/[0.08] bg-white/[0.04] text-white/45'
                  )}
                >
                  <span className="tabular-nums opacity-60">
                    {String(step.id + 1).padStart(2, '0')}
                  </span>
                  <span>{step.shortTitle}</span>
                  {isComplete && <span aria-hidden>✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step content */}
        <div ref={contentRef}>
          {sv.currentStep === 0 && (
            <SiteVisitClientStep
              visit={sv.visit}
              onUpdateClient={sv.updateClient}
              onUpdateProperty={sv.updateProperty}
            />
          )}
          {sv.currentStep === 1 && (
            <SiteVisitPropertyStep visit={sv.visit} onUpdateProperty={sv.updateProperty} />
          )}
          {sv.currentStep === 2 && (
            <SiteVisitCaptureStep
              visit={sv.visit}
              activeRoomId={sv.activeRoomId}
              onAddRoom={sv.addRoom}
              onRemoveRoom={sv.removeRoom}
              onSetActiveRoom={sv.setActiveRoom}
              onAddItem={sv.addItem}
              onUpdateItem={sv.updateItem}
              onRemoveItem={sv.removeItem}
              onUpdateRoomNotes={sv.updateRoomNotes}
              onAddPhoto={sv.addPhoto}
              onRemovePhoto={sv.removePhoto}
              onUpdatePhotoUrl={sv.updatePhotoUrl}
              getPromptResponse={sv.getPromptResponse}
              setPromptResponse={sv.setPromptResponse}
              onReorderRooms={sv.reorderRooms}
              captureSeconds={captureSeconds}
              onCaptureTimerTick={setCaptureSeconds}
            />
          )}
          {sv.currentStep === 3 && (
            <SiteVisitReviewStep
              visit={sv.visit}
              totalRooms={sv.totalRooms}
              totalItems={sv.totalItems}
              totalPhotos={sv.totalPhotos}
              totalPromptsAnswered={sv.totalPromptsAnswered}
            />
          )}
          {sv.currentStep === 4 && (
            <SiteVisitScopeStep
              visit={sv.visit}
              assumptions={assumptions}
              onAssumptionsChange={setAssumptions}
            />
          )}
          {sv.currentStep === 5 && (
            <SiteVisitGenerateStep
              visit={sv.visit}
              assumptions={assumptions}
              onContinueToSignOff={sv.nextStep}
            />
          )}
          {sv.currentStep === 6 && (
            <SiteVisitSignOffStep
              visit={sv.visit}
              assumptions={assumptions}
              onSendToQuote={handleSendToQuote}
            />
          )}
        </div>

        {/* Bottom navigation */}
        {sv.currentStep < 5 && (
          <div className="flex items-center gap-3 pt-2">
            {sv.currentStep > 0 ? (
              <Button
                variant="outline"
                onClick={sv.prevStep}
                className="h-12 flex-1 rounded-xl border-white/[0.12] bg-white/[0.04] text-white hover:bg-white/[0.08] touch-manipulation"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            ) : (
              <div className="hidden flex-1 sm:block" />
            )}
            <Button
              onClick={sv.nextStep}
              disabled={!canProceed()}
              className="h-12 flex-[2] rounded-xl bg-elec-yellow font-semibold text-black hover:bg-elec-yellow/90 disabled:opacity-50 touch-manipulation"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </GoogleMapsProvider>
  );
};
