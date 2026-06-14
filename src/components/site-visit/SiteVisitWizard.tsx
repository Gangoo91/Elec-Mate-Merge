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
import { useSiteVisitSync } from '@/hooks/useSiteVisitSync';
import { useSiteSurveyAnalysis } from '@/hooks/useSiteSurveyAnalysis';
import { SiteVisitJobStep } from './steps/SiteVisitJobStep';
import { SiteVisitCaptureStep } from './steps/SiteVisitCaptureStep';
import { SiteVisitScopePriceStep } from './steps/SiteVisitScopePriceStep';
import { SiteVisitSignOffStep } from './steps/SiteVisitSignOffStep';
import { GoogleMapsProvider } from '@/contexts/GoogleMapsContext';
import { supabase } from '@/integrations/supabase/client';
import type { SiteVisit } from '@/types/siteVisit';

type RecoveredDraft = Partial<SiteVisit> & {
  currentStep?: number;
  activeRoomId?: string | null;
  assumptions?: string;
};

// 4 steps (was 7): Job merges Client+Property; Scope & Price merges
// Review+Scope+Generate (the AI pricing runs there, the finalise pipeline is
// inline plumbing); Sign-off closes it out.
const STEPS = [
  { id: 0, title: 'Job', shortTitle: 'Job', sub: "Who it's for and where it is" },
  { id: 1, title: 'Capture', shortTitle: 'Capture', sub: 'Walk the site — rooms, items, photos' },
  { id: 2, title: 'Scope & Price', shortTitle: 'Scope', sub: 'AI-priced scope, ready to send' },
  { id: 3, title: 'Sign-off', shortTitle: 'Sign', sub: 'Signature on the spot or by link' },
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
  // The localStorage key id the recovered draft was found under — needed so
  // Discard clears the right key (drafts save under the visit's uuid, not "-new")
  const [recoveredDraftId, setRecoveredDraftId] = useState<string | null>(null);
  const [unrecoverablePhotoCount, setUnrecoverablePhotoCount] = useState(0);
  const [captureSeconds, setCaptureSeconds] = useState(0);

  const sv = useSiteVisit(initialVisit);
  const { sendToQuoteWizard } = useSiteVisitStorage();

  // Cloud autosave — localStorage (10s, in useSiteVisit) stays the instant
  // layer; this keeps an atomic cloud copy so a killed app loses nothing
  const cloud = useSiteVisitSync({ visit: sv.visit });

  // Cached AI survey analysis for this visit (live-priced materials + labour).
  // The hook loads any completed job on mount; handleSendToQuote re-fetches
  // fresh because the Review panel runs its OWN hook instance — an analysis
  // completed mid-session never reaches this one's state.
  const { result: analysisResult } = useSiteSurveyAnalysis(sv.visit.id);

  const handleSendToQuote = useCallback(async () => {
    let analysis = analysisResult;
    try {
      const { data: latestJob } = await supabase
        .from('site_survey_analysis_jobs')
        .select('result')
        .eq('site_visit_id', sv.visit.id)
        .eq('status', 'completed')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (latestJob?.result) {
        analysis = latestJob.result as typeof analysisResult;
      }
    } catch {
      // Fall back to whatever this instance has — never block the handoff
    }
    const sessionId = sendToQuoteWizard(sv.visit, analysis);
    // Flush the latest state to the cloud before leaving for the quote wizard
    void cloud.syncNow();
    // Visit is complete — clear its draft so it isn't re-offered as
    // "unsaved work" on the next fresh site visit
    draftStorage.clearDraft('site-visit', sv.visit.id || null);
    // Carry the project so the quote lands inside it (QuoteBuilderCreate
    // stamps project_id from this param)
    const projectParam = sv.visit.projectId ? `&projectId=${sv.visit.projectId}` : '';
    navigate(`/electrician/quote-builder/create?siteVisitSessionId=${sessionId}${projectParam}`);
  }, [sv.visit, analysisResult, sendToQuoteWizard, navigate, cloud]);

  // Check for recoverable draft on mount. Drafts are saved under the visit's
  // own uuid (useSiteVisit always generates one), so scan for the latest
  // site-visit draft rather than only checking the "-new" key — the old
  // exact-key lookup meant recovery never fired at all (ELE-1069).
  useEffect(() => {
    if (initialVisit?.id) {
      // Resuming a cloud copy — but offline edits may have left a NEWER local
      // draft under this visit's id. Offer it rather than silently losing it.
      const local = draftStorage.loadDraft('site-visit', initialVisit.id);
      if (
        local &&
        draftStorage.isLocalDraftNewer(
          'site-visit',
          initialVisit.id,
          initialVisit.updatedAt ?? null
        )
      ) {
        const data = local.data as RecoveredDraft;
        const allPhotos = Array.isArray(data.photos) ? data.photos : [];
        const livePhotos = allPhotos.filter(
          (p) => p?.photoUrl && !String(p.photoUrl).startsWith('blob:')
        );
        setUnrecoverablePhotoCount(allPhotos.length - livePhotos.length);
        setRecoveredDraft({ ...data, photos: livePhotos });
        setRecoveredDraftId(initialVisit.id);
        setShowRecoveryBanner(true);
      }
      return;
    }
    if (!initialVisit) {
      const found = draftStorage.loadLatestDraft('site-visit', (d) => {
        const rooms = d?.rooms;
        return Boolean(
          d?.customerName || d?.propertyAddress || (Array.isArray(rooms) && rooms.length > 0)
        );
      });
      if (found) {
        const data = found.data as RecoveredDraft;
        // Blob photo URLs don't survive the WebView being killed — count the
        // dead ones so the banner is honest about what's coming back
        const allPhotos = Array.isArray(data.photos) ? data.photos : [];
        const livePhotos = allPhotos.filter(
          (p) => p?.photoUrl && !String(p.photoUrl).startsWith('blob:')
        );
        setUnrecoverablePhotoCount(allPhotos.length - livePhotos.length);
        setRecoveredDraft({ ...data, photos: livePhotos });
        setRecoveredDraftId(found.reportId);
        setShowRecoveryBanner(true);
      }
    }
  }, []);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sv.currentStep]);

  // Auto-populate assumptions when first arriving at Scope & Price
  useEffect(() => {
    if (sv.currentStep === 2 && !(sv.visit.assumptions ?? '').trim()) {
      sv.updateAssumptions(getDefaultAssumptions(sv.visit.propertyType, sv.visit));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sv.currentStep]);

  const handleRecoverDraft = useCallback(() => {
    if (recoveredDraft) {
      // Bulk restore: recovers all fields including rooms, items, photos, prompts, step
      sv.restoreVisit(recoveredDraft);
      setShowRecoveryBanner(false);
      setRecoveredDraft(null);
    }
  }, [recoveredDraft, sv]);

  const handleDiscardDraft = useCallback(() => {
    draftStorage.clearDraft('site-visit', recoveredDraftId);
    setShowRecoveryBanner(false);
    setRecoveredDraft(null);
    setRecoveredDraftId(null);
  }, [recoveredDraftId]);

  const canProceed = (): boolean => {
    switch (sv.currentStep) {
      case 0:
        return !!sv.visit.customerName?.trim() && !!sv.visit.propertyAddress?.trim();
      case 1:
        return sv.visit.rooms.length > 0;
      default:
        return true;
    }
  };

  const currentStepTitle = STEPS[sv.currentStep]?.title || '';

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
                {unrecoverablePhotoCount > 0 &&
                  ` ${unrecoverablePhotoCount} photo${unrecoverablePhotoCount === 1 ? '' : 's'} couldn't be recovered — photos only survive once uploaded.`}
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

        {/* === STEP RAIL — numbered circles with connectors (quotes pattern) === */}
        <div className="pb-1 pt-1">
          <div className="flex items-center">
            {STEPS.map((step, i) => {
              const isActive = sv.currentStep === step.id;
              const isComplete = sv.currentStep > step.id;
              const accessible = step.id <= sv.currentStep;
              return (
                <React.Fragment key={step.id}>
                  {i > 0 && (
                    <div
                      className={cn(
                        'mx-2 h-[2px] min-w-3 flex-1 rounded-full sm:mx-3',
                        step.id <= sv.currentStep ? 'bg-elec-yellow/50' : 'bg-white/[0.10]'
                      )}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      if (accessible) sv.setStep(step.id);
                    }}
                    disabled={!accessible}
                    className="flex flex-shrink-0 select-none items-center gap-2 py-1 touch-manipulation"
                  >
                    <span
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold tabular-nums transition-all',
                        isActive
                          ? 'bg-elec-yellow text-black shadow-[0_0_0_4px_rgba(250,204,21,0.12)]'
                          : isComplete
                            ? 'border border-emerald-500/30 bg-emerald-500/15 text-emerald-400'
                            : 'border border-white/[0.10] bg-white/[0.06] text-white/55'
                      )}
                    >
                      {isComplete ? '✓' : step.id + 1}
                    </span>
                    <span
                      className={cn(
                        'hidden text-[12px] font-medium leading-none sm:block',
                        isActive ? 'text-white' : isComplete ? 'text-white/80' : 'text-white/50'
                      )}
                    >
                      {step.shortTitle}
                    </span>
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* === STEP PANEL — flat on mobile, elevated card on sm+ (quotes pattern) === */}
        <div className="sm:rounded-2xl sm:border sm:border-white/[0.10] sm:bg-gradient-to-b sm:from-white/[0.05] sm:to-white/[0.02] sm:p-6 sm:shadow-[0_8px_24px_rgba(0,0,0,0.35)] lg:p-8">
          <div className="mb-5 flex items-start justify-between gap-3 border-b border-white/[0.08] pb-4">
            <div>
              <h2 className="text-[20px] font-bold leading-tight text-white">{currentStepTitle}</h2>
              <p className="mt-1 text-[12px] text-white/60">{STEPS[sv.currentStep]?.sub}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <AutoSaveIndicator
                lastSaved={cloud.lastCloudSync ?? sv.lastSaved}
                isSaving={sv.isSaving || cloud.cloudStatus === 'syncing'}
              />
              {cloud.cloudStatus === 'offline' && (
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-300">
                  Offline — saved on this device, will sync
                </span>
              )}
              {cloud.cloudStatus === 'error' && (
                <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-medium text-red-300">
                  Cloud save failed — retrying
                </span>
              )}
            </div>
          </div>

          {/* Step content */}
          <div ref={contentRef}>
            {sv.currentStep === 0 && (
              <SiteVisitJobStep
                visit={sv.visit}
                onUpdateClient={sv.updateClient}
                onUpdateProperty={sv.updateProperty}
              />
            )}
            {sv.currentStep === 1 && (
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
                onReorderItems={sv.reorderItems}
                captureSeconds={captureSeconds}
                onCaptureTimerTick={setCaptureSeconds}
              />
            )}
            {sv.currentStep === 2 && (
              <SiteVisitScopePriceStep
                visit={sv.visit}
                assumptions={sv.visit.assumptions ?? ''}
                onAssumptionsChange={sv.updateAssumptions}
                onJumpToRoom={(roomId) => {
                  sv.setActiveRoom(roomId);
                  sv.setStep(1);
                }}
                onFinalised={() => sv.setStep(3)}
              />
            )}
            {sv.currentStep === 3 && (
              <SiteVisitSignOffStep
                visit={sv.visit}
                assumptions={sv.visit.assumptions ?? ''}
                onSendToQuote={handleSendToQuote}
              />
            )}
          </div>

          {/* Bottom navigation — Scope & Price advances via its own Finalise
            CTA; Sign-off via its own actions */}
          {sv.currentStep < 2 && (
            <div className="flex items-center gap-3 pt-2">
              {sv.currentStep > 0 ? (
                <Button
                  variant="outline"
                  onClick={sv.prevStep}
                  className="h-12 flex-1 rounded-xl border-white/[0.12] bg-white/[0.04] text-white transition-transform hover:bg-white/[0.08] touch-manipulation active:scale-[0.98]"
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
                className="h-12 flex-[2] rounded-xl bg-elec-yellow font-semibold text-black transition-transform hover:bg-elec-yellow/90 disabled:opacity-50 touch-manipulation active:scale-[0.98]"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
          {/* Scope & Price: back to Capture without finalising */}
          {sv.currentStep === 2 && (
            <div className="pt-2">
              <Button
                variant="outline"
                onClick={sv.prevStep}
                className="h-12 w-full rounded-xl border-white/[0.12] bg-white/[0.04] text-white transition-transform hover:bg-white/[0.08] touch-manipulation active:scale-[0.98] sm:w-auto sm:px-8"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to capture
              </Button>
            </div>
          )}
        </div>
      </div>
    </GoogleMapsProvider>
  );
};
