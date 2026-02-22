import React, { useState, useCallback, useRef } from 'react';
import { Check, Loader2, AlertCircle, PenTool, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSiteVisitStorage } from '@/hooks/useSiteVisitStorage';
import { PreStartChecklistView } from '../generate/PreStartChecklistView';
import { ScopeBaselineConfirmation } from '../generate/ScopeBaselineConfirmation';
import type { SiteVisit, ScopeBaseline, PreStartChecklist } from '@/types/siteVisit';

interface GenerateStepItem {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'done' | 'error';
  error?: string;
}

interface SiteVisitGenerateStepProps {
  visit: SiteVisit;
  assumptions: string;
  onContinueToSignOff: () => void;
}

export const SiteVisitGenerateStep = ({
  visit,
  assumptions,
  onContinueToSignOff,
}: SiteVisitGenerateStepProps) => {
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

  const [steps, setSteps] = useState<GenerateStepItem[]>([
    { id: 'save', label: 'Save site visit', status: 'pending' },
    { id: 'customer', label: 'Link / create customer', status: 'pending' },
    { id: 'photos', label: 'Upload photos & create project', status: 'pending' },
    { id: 'bridge', label: 'Bridge photos to documentation', status: 'pending' },
    { id: 'baseline', label: 'Lock scope baseline', status: 'pending' },
    { id: 'checklist', label: 'Generate pre-start checklist', status: 'pending' },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [baseline, setBaseline] = useState<ScopeBaseline | null>(null);
  const [checklist, setChecklist] = useState<PreStartChecklist | null>(null);

  // Keep a mutable ref to the latest visit state for retries
  const visitRef = useRef<SiteVisit>(visit);
  visitRef.current = visit;

  const isDone = steps.every((s) => s.status === 'done');

  const updateStep = (id: string, status: GenerateStepItem['status'], error?: string) => {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, status, error } : s)));
  };

  // Individual step runners
  const runSave = useCallback(async () => {
    updateStep('save', 'running');
    const savedId = await saveSiteVisit(visitRef.current);
    if (!savedId) {
      updateStep('save', 'error', 'Failed to save');
      return false;
    }
    updateStep('save', 'done');
    return true;
  }, [saveSiteVisit]);

  const runCustomer = useCallback(async () => {
    updateStep('customer', 'running');
    const customerId = await ensureCustomer(visitRef.current);
    if (customerId) {
      visitRef.current = { ...visitRef.current, customerId };
    }
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
        if (projectId) {
          updated = { ...updated, photoProjectId: projectId };
        }
      }

      await saveSiteVisit(updated);
      visitRef.current = updated;
      updateStep('photos', 'done');
      return true;
    } catch (err: unknown) {
      updateStep('photos', 'error', err instanceof Error ? err.message : 'Photo upload failed');
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
      updateStep('bridge', 'error', err instanceof Error ? err.message : 'Photo bridge failed');
      return false;
    }
  }, [bridgePhotosToSafetyPhotos]);

  const runBaseline = useCallback(async () => {
    updateStep('baseline', 'running');
    const bl = await lockScopeBaseline(visitRef.current);
    if (bl) {
      setBaseline(bl);
      updateStep('baseline', 'done');
      return true;
    }
    updateStep('baseline', 'error', 'Failed to lock baseline');
    return false;
  }, [lockScopeBaseline]);

  const runChecklist = useCallback(async () => {
    updateStep('checklist', 'running');
    const cl = await generatePreStartChecklistForVisit(visitRef.current);
    if (cl) {
      setChecklist(cl);
      updateStep('checklist', 'done');
      return true;
    }
    updateStep('checklist', 'error', 'Failed to generate checklist');
    return false;
  }, [generatePreStartChecklistForVisit]);

  const stepRunners: Record<string, () => Promise<boolean>> = {
    save: runSave,
    customer: runCustomer,
    photos: runPhotos,
    bridge: runBridge,
    baseline: runBaseline,
    checklist: runChecklist,
  };

  const retryStep = useCallback(
    async (stepId: string) => {
      const runner = stepRunners[stepId];
      if (!runner) return;
      await runner();
    },
    [stepRunners]
  );

  const handleGenerate = useCallback(async () => {
    setIsRunning(true);
    visitRef.current = { ...visit };

    await runSave();
    await runCustomer();
    await runPhotos();
    await runBridge();
    await runBaseline();
    await runChecklist();

    // Mark visit as completed
    await updateStatus(visitRef.current.id, 'completed');

    setIsRunning(false);
  }, [visit, runSave, runCustomer, runPhotos, runBridge, runBaseline, runChecklist, updateStatus]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-white">Generate Outputs</h2>
        <p className="text-sm text-white mt-1">
          Save, upload photos, lock baseline and generate checklist
        </p>
      </div>

      {/* Progress steps */}
      <div className="space-y-2">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
          >
            {step.status === 'pending' && (
              <div className="w-6 h-6 rounded-full border-2 border-white/20" />
            )}
            {step.status === 'running' && (
              <Loader2 className="h-6 w-6 text-elec-yellow animate-spin" />
            )}
            {step.status === 'done' && (
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                <Check className="h-3.5 w-3.5 text-white" />
              </div>
            )}
            {step.status === 'error' && (
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
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
                className="h-8 px-2 flex items-center gap-1 rounded-lg text-xs font-medium text-white bg-white/[0.05] border border-white/[0.1] touch-manipulation active:bg-white/10"
              >
                <RotateCcw className="h-3 w-3" />
                Retry
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Generate button */}
      {!isDone && (
        <Button
          onClick={handleGenerate}
          disabled={isRunning}
          className="w-full h-12 text-base font-semibold touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90"
        >
          {isRunning ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate All'
          )}
        </Button>
      )}

      {/* Results */}
      {baseline && <ScopeBaselineConfirmation baseline={baseline} />}
      {checklist && <PreStartChecklistView checklist={checklist} />}

      {/* Continue to Client Sign-Off */}
      {isDone && (
        <div className="space-y-2 pt-4 border-t border-white/[0.06]">
          <Button
            onClick={onContinueToSignOff}
            className="w-full h-12 text-base font-semibold touch-manipulation bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <PenTool className="h-5 w-5 mr-2" />
            Continue to Client Sign-Off
          </Button>
          <p className="text-xs text-white text-center">
            Get the client to sign the scope of works on your device
          </p>
        </div>
      )}
    </div>
  );
};
