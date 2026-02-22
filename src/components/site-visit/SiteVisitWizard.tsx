import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  ArrowRight,
  User,
  MapPin,
  ClipboardList,
  Eye,
  FileText,
  Zap,
  PenTool,
} from 'lucide-react';
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

type RecoveredDraft = Partial<SiteVisit> & {
  currentStep?: number;
  activeRoomId?: string | null;
  assumptions?: string;
};

const STEPS = [
  { id: 0, title: 'Client', shortTitle: 'Client', icon: User },
  { id: 1, title: 'Property', shortTitle: 'Property', icon: MapPin },
  { id: 2, title: 'Capture', shortTitle: 'Capture', icon: ClipboardList },
  { id: 3, title: 'Review', shortTitle: 'Review', icon: Eye },
  { id: 4, title: 'Scope', shortTitle: 'Scope', icon: FileText },
  { id: 5, title: 'Generate', shortTitle: 'Generate', icon: Zap },
  { id: 6, title: 'Sign-Off', shortTitle: 'Sign', icon: PenTool },
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

  return (
    <GoogleMapsProvider>
      <div className="space-y-4">
        {/* Draft recovery banner */}
        {showRecoveryBanner && (
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex-1">
              <p className="text-[15px] font-medium text-amber-400">Unsaved site visit found</p>
              <p className="text-[13px] text-white">Would you like to recover your progress?</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDiscardDraft}
                className="text-xs touch-manipulation text-white"
              >
                Discard
              </Button>
              <Button
                size="sm"
                onClick={handleRecoverDraft}
                className="text-xs touch-manipulation bg-amber-500 text-black hover:bg-amber-600"
              >
                Recover
              </Button>
            </div>
          </div>
        )}

        {/* Step progress bar */}
        <div className="flex gap-1 overflow-x-auto pb-1">
          {STEPS.map((step) => {
            const isActive = sv.currentStep === step.id;
            const isComplete = sv.currentStep > step.id;
            const Icon = step.icon;
            return (
              <button
                key={step.id}
                onClick={() => {
                  if (step.id <= sv.currentStep) sv.setStep(step.id);
                }}
                disabled={step.id > sv.currentStep}
                className={cn(
                  'flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all touch-manipulation min-w-[60px]',
                  isActive && 'bg-elec-yellow/20 border border-elec-yellow',
                  isComplete && 'bg-emerald-500/10',
                  !isActive && !isComplete && 'opacity-40'
                )}
              >
                <Icon
                  className={cn(
                    'h-4 w-4',
                    isActive ? 'text-elec-yellow' : isComplete ? 'text-emerald-400' : 'text-white'
                  )}
                />
                <span
                  className={cn('text-[10px] font-medium', isActive ? 'text-white' : 'text-white')}
                >
                  {step.shortTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Auto-save indicator */}
        <AutoSaveIndicator lastSaved={sv.lastSaved} isSaving={sv.isSaving} />

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
          <div className="flex gap-3 pt-2">
            {sv.currentStep > 0 && (
              <Button
                variant="outline"
                onClick={sv.prevStep}
                className="flex-1 h-12 touch-manipulation text-white border-white/20"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            <Button
              onClick={sv.nextStep}
              disabled={!canProceed()}
              className="flex-1 h-12 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold"
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </GoogleMapsProvider>
  );
};
