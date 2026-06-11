import React, { useState, useCallback, useMemo, useRef } from 'react';
import {
  AlertTriangle,
  Check,
  Loader2,
  AlertCircle,
  RotateCcw,
  Download,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScopeOfWorksEditor } from '../scope/ScopeOfWorksEditor';
import { SurveyAnalysisPanel } from '../review/SurveyAnalysisPanel';
import { useSiteVisitStorage } from '@/hooks/useSiteVisitStorage';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { downloadScopePDF } from '@/utils/scope-pdf';
import { GLOBAL_PROMPTS, ROOM_PROMPTS } from '@/data/siteVisit/smartPrompts';
import type { SiteVisit, ScopeBaseline, PreStartChecklist } from '@/types/siteVisit';

interface FinaliseStepItem {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'done' | 'error';
  error?: string;
}

interface SiteVisitScopePriceStepProps {
  visit: SiteVisit;
  assumptions: string;
  onAssumptionsChange: (assumptions: string) => void;
  /** Jump back to Capture, focusing a room (or property prompts when null) */
  onJumpToRoom: (roomId: string | null) => void;
  /** All finalise operations complete — advance to Sign-off */
  onFinalised: () => void;
}

/**
 * Step 03 · Scope & Price — merges the old Review + Scope + Generate steps.
 * The AI survey analysis runs automatically (live-priced materials + labour),
 * the scope stays editable, and "Finalise" runs the save/photos/baseline/
 * checklist pipeline inline (idempotent — retries never duplicate).
 */
export const SiteVisitScopePriceStep = ({
  visit,
  assumptions,
  onAssumptionsChange,
  onJumpToRoom,
  onFinalised,
}: SiteVisitScopePriceStepProps) => {
  const {
    saveSiteVisit,
    lockScopeBaseline,
    generatePreStartChecklistForVisit,
    ensureCustomer,
    uploadSiteVisitPhotos,
    createPhotoProject,
    updateStatus,
    bridgePhotosToSafetyPhotos,
  } = useSiteVisitStorage();
  const { companyProfile } = useCompanyProfile();

  const [steps, setSteps] = useState<FinaliseStepItem[]>([
    { id: 'save', label: 'Save site visit', status: 'pending' },
    { id: 'customer', label: 'Link / create customer', status: 'pending' },
    { id: 'photos', label: 'Upload photos & project', status: 'pending' },
    { id: 'bridge', label: 'File photos in documentation', status: 'pending' },
    { id: 'baseline', label: 'Lock scope baseline', status: 'pending' },
    { id: 'checklist', label: 'Pre-start checklist', status: 'pending' },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const hasStartedRef = useRef(false);
  const visitRef = useRef<SiteVisit>(visit);
  // Track latest edits, but never clobber the mid-run enrichment
  // (customerId / photoProjectId set by the pipeline) while it's running
  if (!isRunning) visitRef.current = visit;

  const isDone = steps.every((s) => s.status === 'done');
  const hasError = steps.some((s) => s.status === 'error');

  const totalItems = visit.rooms.reduce((sum, r) => sum + r.items.length, 0);
  const totalPromptsAnswered = visit.prompts.filter((p) => p.response).length;

  // Missing required prompts — each one is a tap-to-fix link back into Capture
  const missingPrompts = useMemo(() => {
    const missing: { roomId: string | null; label: string; question: string }[] = [];
    for (const prompt of GLOBAL_PROMPTS) {
      if (!prompt.required) continue;
      const answered = visit.prompts.find(
        (p) => p.promptKey === prompt.key && !p.roomId && p.response
      );
      if (!answered) missing.push({ roomId: null, label: 'Property', question: prompt.question });
    }
    for (const room of visit.rooms) {
      for (const prompt of ROOM_PROMPTS) {
        if (!prompt.required) continue;
        if (prompt.roomTypes && !prompt.roomTypes.includes(room.roomType)) continue;
        const answered = visit.prompts.find(
          (p) => p.promptKey === prompt.key && p.roomId === room.id && p.response
        );
        if (!answered)
          missing.push({ roomId: room.id, label: room.roomName, question: prompt.question });
      }
    }
    return missing;
  }, [visit]);

  // Ref mirror so async runners can check completion without reading stale
  // state (and without side-effects inside updaters)
  const stepsRef = useRef<FinaliseStepItem[]>(steps);
  const updateStep = (id: string, status: FinaliseStepItem['status'], error?: string) => {
    setSteps((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, status, error } : s));
      stepsRef.current = next;
      return next;
    });
  };

  const runSave = useCallback(async () => {
    updateStep('save', 'running');
    const savedId = await saveSiteVisit(visitRef.current);
    if (!savedId) {
      updateStep('save', 'error', 'Could not save — check your connection and retry');
      return false;
    }
    updateStep('save', 'done');
    return true;
  }, [saveSiteVisit]);

  const runCustomer = useCallback(async () => {
    updateStep('customer', 'running');
    const customerId = await ensureCustomer(visitRef.current);
    if (customerId) visitRef.current = { ...visitRef.current, customerId };
    updateStep('customer', 'done');
    return true;
  }, [ensureCustomer]);

  const runPhotos = useCallback(async () => {
    updateStep('photos', 'running');
    try {
      const current = visitRef.current;
      let updated = { ...current };
      const blobCount = current.photos.filter((p) => p.photoUrl.startsWith('blob:')).length;
      if (blobCount > 0) {
        const uploadedPhotos = await uploadSiteVisitPhotos(current);
        updated = { ...updated, photos: uploadedPhotos };
      }
      if (updated.photos.length > 0) {
        const projectId = await createPhotoProject(updated);
        if (projectId) updated = { ...updated, photoProjectId: projectId };
      }
      await saveSiteVisit(updated);
      visitRef.current = updated;
      updateStep('photos', 'done');
      return true;
    } catch (err: unknown) {
      updateStep(
        'photos',
        'error',
        err instanceof Error ? err.message : 'Photo upload failed — retry when back in signal'
      );
      return false;
    }
  }, [uploadSiteVisitPhotos, createPhotoProject, saveSiteVisit]);

  const runBridge = useCallback(async () => {
    updateStep('bridge', 'running');
    try {
      await bridgePhotosToSafetyPhotos(visitRef.current);
      updateStep('bridge', 'done');
      return true;
    } catch (err: unknown) {
      updateStep('bridge', 'error', err instanceof Error ? err.message : 'Photo filing failed');
      return false;
    }
  }, [bridgePhotosToSafetyPhotos]);

  const runBaseline = useCallback(async () => {
    updateStep('baseline', 'running');
    const bl: ScopeBaseline | null = await lockScopeBaseline(visitRef.current);
    if (bl) {
      updateStep('baseline', 'done');
      return true;
    }
    updateStep('baseline', 'error', 'Could not lock the scope — retry');
    return false;
  }, [lockScopeBaseline]);

  const runChecklist = useCallback(async () => {
    updateStep('checklist', 'running');
    const cl: PreStartChecklist | null = await generatePreStartChecklistForVisit(visitRef.current);
    if (cl) {
      updateStep('checklist', 'done');
      return true;
    }
    updateStep('checklist', 'error', 'Checklist generation failed — retry');
    return false;
  }, [generatePreStartChecklistForVisit]);

  const stepRunners = useMemo<Record<string, () => Promise<boolean>>>(
    () => ({
      save: runSave,
      customer: runCustomer,
      photos: runPhotos,
      bridge: runBridge,
      baseline: runBaseline,
      checklist: runChecklist,
    }),
    [runSave, runCustomer, runPhotos, runBridge, runBaseline, runChecklist]
  );

  const retryStep = useCallback(
    async (stepId: string) => {
      const runner = stepRunners[stepId];
      if (!runner) return;
      const ok = await runner();
      // If everything is now green, finish the journey
      if (ok && stepsRef.current.every((s) => s.status === 'done')) {
        await updateStatus(visitRef.current.id, 'completed');
        onFinalised();
      }
    },
    [stepRunners, updateStatus, onFinalised]
  );

  const handleFinalise = useCallback(async () => {
    if (hasStartedRef.current && isRunning) return; // double-tap guard
    hasStartedRef.current = true;
    setIsRunning(true);
    visitRef.current = { ...visit };

    const sequence = [runSave, runCustomer, runPhotos, runBridge, runBaseline, runChecklist];
    let allOk = true;
    for (const run of sequence) {
      const ok = await run();
      if (!ok) {
        allOk = false;
        break; // dependent steps don't run on failure — retry from the list
      }
    }

    if (allOk) {
      await updateStatus(visitRef.current.id, 'completed');
      setIsRunning(false);
      onFinalised();
    } else {
      setIsRunning(false);
    }
  }, [
    visit,
    isRunning,
    runSave,
    runCustomer,
    runPhotos,
    runBridge,
    runBaseline,
    runChecklist,
    updateStatus,
    onFinalised,
  ]);

  const handleDownloadPDF = useCallback(async () => {
    setIsDownloading(true);
    try {
      await downloadScopePDF({
        companyName: companyProfile?.company_name || undefined,
        companyLogoUrl: companyProfile?.logo_url || undefined,
        referenceId: visit.id?.slice(0, 8).toUpperCase(),
        customerName: visit.customerName,
        customerEmail: visit.customerEmail,
        customerPhone: visit.customerPhone,
        propertyAddress: visit.propertyAddress,
        propertyPostcode: visit.propertyPostcode,
        propertyType: visit.propertyType,
        rooms: visit.rooms.map((r) => ({
          roomName: r.roomName,
          items: r.items.map((i) => ({
            itemDescription: i.itemDescription,
            quantity: i.quantity,
            unit: i.unit,
          })),
          notes: r.notes,
        })),
        prompts: visit.prompts
          .filter((p) => p.response)
          .map((p) => {
            const room = p.roomId ? visit.rooms.find((r) => r.id === p.roomId) : undefined;
            return {
              promptQuestion: p.promptQuestion,
              response: p.response || '',
              roomName: room?.roomName,
            };
          }),
        assumptions,
      });
    } finally {
      setIsDownloading(false);
    }
  }, [visit, assumptions, companyProfile]);

  return (
    <div className="space-y-5">
      {/* Stat strip */}
      <div className="grid grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06]">
        {[
          { label: 'Rooms', value: visit.rooms.length },
          { label: 'Items', value: totalItems },
          { label: 'Photos', value: visit.photos.length },
          { label: 'Prompts', value: totalPromptsAnswered },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="relative flex flex-col items-start bg-[hsl(0_0%_12%)] p-3 sm:p-4"
          >
            {i === 0 && (
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 opacity-80"
              />
            )}
            <div className="w-full truncate text-[10px] font-medium uppercase tracking-[0.12em] text-white/55 sm:tracking-[0.18em]">
              {stat.label}
            </div>
            <p className="mt-1.5 text-[20px] font-semibold tabular-nums leading-none tracking-tight text-white sm:text-[24px]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Missing prompts — tap to fix */}
      {missingPrompts.length > 0 && (
        <div className="space-y-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 flex-shrink-0 text-amber-400" />
            <p className="text-sm font-medium text-white">
              {missingPrompts.length} required answer{missingPrompts.length !== 1 ? 's' : ''}{' '}
              missing — tap to fix
            </p>
          </div>
          <div className="space-y-1">
            {missingPrompts.map((mp, idx) => (
              <button
                key={idx}
                onClick={() => onJumpToRoom(mp.roomId)}
                className="flex min-h-[44px] w-full items-center justify-between gap-2 rounded-xl bg-white/[0.04] px-3 py-2 text-left touch-manipulation active:bg-white/[0.08]"
              >
                <span className="text-[13px] text-white">
                  <span className="font-semibold">{mp.label}:</span> {mp.question.replace('?', '')}
                </span>
                <ChevronRight className="h-4 w-4 flex-shrink-0 text-amber-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* AI pricing — runs automatically */}
      <SurveyAnalysisPanel visit={visit} autoStart />

      {/* Scope of works + assumptions */}
      <ScopeOfWorksEditor
        visit={visit}
        assumptions={assumptions}
        onAssumptionsChange={onAssumptionsChange}
      />

      <Button
        onClick={handleDownloadPDF}
        disabled={isDownloading}
        variant="outline"
        className="h-11 w-full touch-manipulation border-white/20 text-white hover:border-elec-yellow hover:text-elec-yellow"
      >
        {isDownloading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating PDF…
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Download scope PDF
          </>
        )}
      </Button>

      {/* Finalise — the old Generate step, now inline plumbing */}
      <div className="space-y-3 border-t border-white/[0.06] pt-5">
        {(isRunning || hasError || isDone) && (
          <div className="space-y-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3"
              >
                {step.status === 'pending' && (
                  <div className="h-6 w-6 rounded-full border-2 border-white/20" />
                )}
                {step.status === 'running' && (
                  <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
                )}
                {step.status === 'done' && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
                {step.status === 'error' && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500">
                    <AlertCircle className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{step.label}</p>
                  {step.error && <p className="text-xs text-red-400">{step.error}</p>}
                </div>
                {step.status === 'error' && !isRunning && (
                  <button
                    onClick={() => retryStep(step.id)}
                    className="flex h-9 items-center gap-1 rounded-lg border border-white/[0.1] bg-white/[0.05] px-3 text-xs font-medium text-white touch-manipulation active:bg-white/10"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Retry
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {!isDone && (
          <Button
            onClick={handleFinalise}
            disabled={isRunning}
            className="h-12 w-full touch-manipulation rounded-xl bg-elec-yellow text-base font-semibold text-black transition-transform hover:bg-elec-yellow/90 active:scale-[0.98]"
          >
            {isRunning ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Finalising…
              </>
            ) : hasError ? (
              'Retry failed steps above, then continue'
            ) : (
              'Finalise & continue to sign-off →'
            )}
          </Button>
        )}
        {!isRunning && !isDone && !hasError && (
          <p className="text-center text-[12px] text-white/55">
            Saves everything, files the photos and locks the scope
          </p>
        )}
      </div>
    </div>
  );
};
