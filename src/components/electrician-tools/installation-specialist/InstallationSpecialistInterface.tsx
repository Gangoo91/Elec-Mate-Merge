/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Installation Specialist orchestrator.
 *
 * Three-screen flow mirroring the Cost Engineer rebuild:
 *   1. Briefing — description-led brief + attachments + optional details
 *   2. Stream   — editorial streaming surface, progress + live steps
 *   3. Results  — editorial method statement
 *
 * Backend stays on the existing `create-installation-method-job` /
 * polling stack. The shape of `method_data` returned by the edge
 * function is read by `EditorialMethodResults` directly. When a
 * `installation_method_partials` table lands, swap polling for realtime
 * subscription inside `InstallationStream`.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { InstallationBriefing } from './InstallationBriefing';
import { InstallationStream } from './InstallationStream';
import { EditorialMethodResults } from './EditorialMethodResults';
import {
  InstallationMethodInputs,
  composeInstallationBriefing,
  emptyInstallationInputs,
} from '@/types/installation-method-inputs';
import { useInstallationMethodJobPolling } from '@/hooks/useInstallationMethodJobPolling';
import {
  getStoredCircuitContext,
  clearStoredCircuitContext,
  type StoredCircuitContext,
} from '@/utils/circuit-context-generator';
import { ImportedContextBanner } from '@/components/electrician-tools/shared/ImportedContextBanner';
import { SaveCustomerPrompt } from '@/components/electrician/shared/SaveCustomerPrompt';

interface InstallationSpecialistInterfaceProps {
  designerContext?: any;
}

type View = 'briefing' | 'streaming' | 'results';

const InstallationSpecialistInterface = ({
  designerContext,
}: InstallationSpecialistInterfaceProps) => {
  const routerLocation = useLocation();
  const savedResultsState = routerLocation.state as {
    fromSavedResults?: boolean;
    jobId?: string;
    outputData?: any;
    inputData?: any;
  } | null;

  /* ─── State ─────────────────────────────────────────────────── */
  const [inputs, setInputs] = useState<InstallationMethodInputs>(() => {
    if (savedResultsState?.fromSavedResults && savedResultsState.inputData) {
      const i = savedResultsState.inputData;
      return {
        ...emptyInstallationInputs(),
        description: i.query ?? i.description ?? '',
        installationType: i.projectDetails?.installationType ?? 'domestic',
        projectName: i.projectDetails?.projectName ?? '',
        location: i.projectDetails?.location ?? '',
        clientName: i.projectDetails?.clientName ?? '',
      };
    }
    return emptyInstallationInputs();
  });

  const [view, setView] = useState<View>(
    savedResultsState?.fromSavedResults ? 'results' : 'briefing'
  );
  const [methodData, setMethodData] = useState<any>(savedResultsState?.outputData ?? null);
  const [currentJobId, setCurrentJobId] = useState<string | null>(savedResultsState?.jobId ?? null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [importedContext, setImportedContext] = useState<StoredCircuitContext | null>(null);
  const [showSaveCustomerPrompt, setShowSaveCustomerPrompt] = useState(false);
  const [savePromptDismissed, setSavePromptDismissed] = useState(false);
  const inputsBeforeStreamRef = useRef<InstallationMethodInputs | null>(null);

  /* ─── Imported circuit context (from Circuit Designer) ──────── */
  useEffect(() => {
    const stored = getStoredCircuitContext();
    if (stored && stored.agentType === 'installer') {
      setImportedContext(stored);
      clearStoredCircuitContext();
    }
  }, []);

  const handleUseImportedContext = () => {
    if (!importedContext) return;
    setInputs((prev) => ({
      ...prev,
      description: prev.description
        ? `${prev.description}\n\n${importedContext.formattedPrompt}`
        : importedContext.formattedPrompt,
      projectName: prev.projectName || importedContext.sourceDesign,
    }));
    setImportedContext(null);
  };

  /* ─── Polling the job ───────────────────────────────────────── */
  const {
    isPolling,
    startPolling,
    stopPolling,
    progress: jobProgress,
    status: jobStatus,
    currentStep: jobCurrentStep,
    methodData: jobMethodData,
    error: jobError,
  } = useInstallationMethodJobPolling(currentJobId);

  /* ─── Patch / generate / cancel ─────────────────────────────── */
  const onPatch = (patch: Partial<InstallationMethodInputs>) =>
    setInputs((prev) => ({ ...prev, ...patch }));

  const onGenerate = async () => {
    inputsBeforeStreamRef.current = inputs;
    setView('streaming');
    setMethodData(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Sign in to generate a method statement.');
        setView('briefing');
        return;
      }

      const briefing = composeInstallationBriefing(inputs);
      const { data, error } = await supabase.functions.invoke('installation-specialist', {
        body: {
          action: 'generate',
          query: briefing,
          projectDetails: {
            projectName: inputs.projectName,
            location: inputs.location,
            installationType: inputs.installationType,
            clientName: inputs.clientName,
            clientContact: inputs.clientContact,
            additionalNotes: inputs.additionalNotes,
            expectedStartDate: inputs.expectedStartDate,
          },
          designerContext: designerContext || null,
          attachments: inputs.attachments,
        },
      });

      if (error || !data?.jobId) {
        throw new Error(error?.message || 'Failed to create installation method job.');
      }

      setCurrentJobId(data.jobId);
      startPolling();

      if (inputs.customerId) {
        supabase
          .from('installation_method_jobs')
          .update({ customer_id: inputs.customerId })
          .eq('id', data.jobId)
          .then(({ error: linkErr }) => {
            if (linkErr) console.error('Customer link failed:', linkErr);
          });
      } else if (inputs.clientName?.trim() && !savePromptDismissed) {
        setShowSaveCustomerPrompt(true);
      }
    } catch (err: any) {
      console.error('Installation generate error:', err);
      toast.error('Generation failed', { description: err?.message ?? 'Unexpected error' });
      setView('briefing');
    }
  };

  const handleCancel = async () => {
    if (!currentJobId) {
      setView('briefing');
      return;
    }
    setIsCancelling(true);
    try {
      await supabase.functions.invoke('installation-specialist', {
        body: { action: 'cancel', jobId: currentJobId },
      });
      stopPolling();
      setCurrentJobId(null);
      setView('briefing');
      toast.info('Generation cancelled');
    } catch (err: any) {
      console.error('Cancel error:', err);
      toast.error('Couldn’t cancel', { description: err?.message });
    } finally {
      setIsCancelling(false);
    }
  };

  const handleNewMethod = () => {
    setMethodData(null);
    setCurrentJobId(null);
    setInputs(emptyInstallationInputs());
    setView('briefing');
  };

  const handleEditAndRegenerate = () => {
    if (inputsBeforeStreamRef.current) setInputs(inputsBeforeStreamRef.current);
    setMethodData(null);
    setCurrentJobId(null);
    setView('briefing');
  };

  /* ─── React to job lifecycle ────────────────────────────────── */
  useEffect(() => {
    if (jobStatus === 'complete' && jobMethodData) {
      setMethodData(jobMethodData);
      setView('results');
    } else if (jobStatus === 'failed' || jobStatus === 'cancelled') {
      // Stay on stream so the failure card is shown; stream's "Back"
      // button calls handleCancel which routes back to briefing.
      stopPolling();
    }
  }, [jobStatus, jobMethodData, stopPolling]);

  // Restart polling if job is processing but polling stopped
  useEffect(() => {
    if (currentJobId && jobStatus === 'processing' && !isPolling) {
      startPolling();
    }
  }, [currentJobId, jobStatus, isPolling, startPolling]);

  /* ─── Render ────────────────────────────────────────────────── */
  const liveMethod = useMemo(() => {
    if (!jobMethodData) return null;
    if (Array.isArray(jobMethodData.steps) && jobMethodData.steps.length > 0) return jobMethodData;
    return null;
  }, [jobMethodData]);

  if (view === 'streaming') {
    return (
      <InstallationStream
        inputs={inputs}
        jobId={currentJobId}
        jobProgress={jobProgress}
        jobStatus={jobStatus === 'idle' ? 'pending' : jobStatus}
        currentStep={jobCurrentStep}
        error={jobError}
        liveMethod={liveMethod}
        onCancel={handleCancel}
      />
    );
  }

  if (view === 'results' && methodData) {
    return (
      <EditorialMethodResults
        inputs={inputs}
        methodData={methodData}
        jobId={currentJobId}
        onNewMethod={handleNewMethod}
        onEditAndRegenerate={handleEditAndRegenerate}
      />
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Imported circuit context */}
      <AnimatePresence>
        {importedContext && (
          <ImportedContextBanner
            source={importedContext.sourceDesign}
            circuitCount={importedContext.context.circuitSummaries.length}
            onUseContext={handleUseImportedContext}
            onDismiss={() => setImportedContext(null)}
          />
        )}
      </AnimatePresence>

      {/* Save customer prompt (after submit) */}
      {showSaveCustomerPrompt && !inputs.customerId && inputs.clientName?.trim() && (
        <SaveCustomerPrompt
          client={{ name: inputs.clientName, address: inputs.location || undefined }}
          onSaved={(savedId) => {
            setInputs((prev) => ({ ...prev, customerId: savedId }));
            setShowSaveCustomerPrompt(false);
            if (currentJobId) {
              supabase
                .from('installation_method_jobs')
                .update({ customer_id: savedId })
                .eq('id', currentJobId);
            }
          }}
          onDismiss={() => {
            setShowSaveCustomerPrompt(false);
            setSavePromptDismissed(true);
          }}
        />
      )}

      <InstallationBriefing
        inputs={inputs}
        onPatch={onPatch}
        onGenerate={onGenerate}
        isProcessing={view !== 'briefing'}
      />

      {isCancelling && <p className="text-center text-[12px] text-white/55">Cancelling…</p>}
    </div>
  );
};

export default InstallationSpecialistInterface;
