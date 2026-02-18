import React, { useState, useCallback } from 'react';
import { Check, Loader2, AlertCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
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
}

export const SiteVisitGenerateStep = ({ visit, assumptions }: SiteVisitGenerateStepProps) => {
  const navigate = useNavigate();
  const {
    saveSiteVisit,
    lockScopeBaseline,
    generatePreStartChecklistForVisit,
    sendToQuoteWizard,
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
  const [isDone, setIsDone] = useState(false);
  const [baseline, setBaseline] = useState<ScopeBaseline | null>(null);
  const [checklist, setChecklist] = useState<PreStartChecklist | null>(null);

  // Mutable copy we update as we go (photos get persistent URLs, customer_id set, etc.)
  const [workingVisit, setWorkingVisit] = useState<SiteVisit>(visit);

  const updateStep = (id: string, status: GenerateStepItem['status'], error?: string) => {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, status, error } : s)));
  };

  const handleGenerate = useCallback(async () => {
    setIsRunning(true);
    let current = { ...visit };

    // Step 1: Save
    updateStep('save', 'running');
    const savedId = await saveSiteVisit(current);
    if (!savedId) {
      updateStep('save', 'error', 'Failed to save');
      setIsRunning(false);
      return;
    }
    updateStep('save', 'done');

    // Step 2: Ensure customer in CRM
    updateStep('customer', 'running');
    const customerId = await ensureCustomer(current);
    if (customerId) {
      current = { ...current, customerId };
    }
    updateStep('customer', 'done');

    // Step 3: Upload photos + create project
    updateStep('photos', 'running');
    try {
      // Upload blob photos to Supabase storage
      const blobCount = current.photos.filter((p) => p.photoUrl.startsWith('blob:')).length;
      if (blobCount > 0) {
        const uploadedPhotos = await uploadSiteVisitPhotos(current);
        current = { ...current, photos: uploadedPhotos };
      }

      // Create photo project
      if (current.photos.length > 0) {
        const projectId = await createPhotoProject(current);
        if (projectId) {
          current = { ...current, photoProjectId: projectId };
        }
      }

      // Re-save with updated photo URLs, customer_id, and photo_project_id
      await saveSiteVisit(current);
      updateStep('photos', 'done');
    } catch (err: unknown) {
      updateStep('photos', 'error', err instanceof Error ? err.message : 'Photo upload failed');
    }

    setWorkingVisit(current);

    // Step 3.5: Bridge photos to safety_photos for Photo Documentation
    updateStep('bridge', 'running');
    try {
      await bridgePhotosToSafetyPhotos(current);
      updateStep('bridge', 'done');
    } catch (err: unknown) {
      updateStep('bridge', 'error', err instanceof Error ? err.message : 'Photo bridge failed');
    }

    // Step 4: Lock baseline
    updateStep('baseline', 'running');
    const bl = await lockScopeBaseline(current);
    if (bl) {
      setBaseline(bl);
      updateStep('baseline', 'done');
    } else {
      updateStep('baseline', 'error', 'Failed to lock baseline');
    }

    // Step 5: Generate checklist
    updateStep('checklist', 'running');
    const cl = await generatePreStartChecklistForVisit(current);
    if (cl) {
      setChecklist(cl);
      updateStep('checklist', 'done');
    } else {
      updateStep('checklist', 'error', 'Failed to generate checklist');
    }

    // Mark visit as completed
    await updateStatus(current.id, 'completed');

    setIsRunning(false);
    setIsDone(true);
  }, [
    visit,
    saveSiteVisit,
    ensureCustomer,
    uploadSiteVisitPhotos,
    createPhotoProject,
    bridgePhotosToSafetyPhotos,
    lockScopeBaseline,
    generatePreStartChecklistForVisit,
    updateStatus,
  ]);

  const handleSendToQuote = useCallback(() => {
    const sessionId = sendToQuoteWizard(workingVisit);
    navigate(`/electrician/quote-builder/create?siteVisitSessionId=${sessionId}`);
  }, [workingVisit, sendToQuoteWizard, navigate]);

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

      {/* Send to Quote Wizard */}
      {isDone && (
        <div className="space-y-2 pt-4 border-t border-white/[0.06]">
          <Button
            onClick={handleSendToQuote}
            className="w-full h-12 text-base font-semibold touch-manipulation bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <FileText className="h-5 w-5 mr-2" />
            Send to Quote Wizard
          </Button>
          <p className="text-xs text-white text-center">
            Pre-fills materials from your scope into the quote builder
          </p>
        </div>
      )}
    </div>
  );
};
