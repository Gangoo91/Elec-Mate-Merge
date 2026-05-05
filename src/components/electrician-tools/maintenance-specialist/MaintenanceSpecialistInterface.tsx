/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Maintenance Specialist orchestrator.
 *
 * Three-screen flow mirroring Installation Specialist:
 *   1. Briefing — description-led + attachments + asset details
 *   2. Stream   — editorial streaming view (realtime partials)
 *   3. Results  — editorial maintenance method statement
 *
 * Backend: single `maintenance-specialist` edge function. Frontend
 * subscribes to `maintenance_method_partials` realtime via the stream
 * component, polls `maintenance_method_jobs` for terminal status via
 * the existing `useMaintenanceMethodJobPolling` hook.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { MaintenanceBriefing } from './MaintenanceBriefing';
import { MaintenanceStream } from './MaintenanceStream';
import { EditorialMaintenanceResults } from './EditorialMaintenanceResults';
import {
  MaintenanceMethodInputs,
  composeMaintenanceBriefing,
  emptyMaintenanceInputs,
} from '@/types/maintenance-method-inputs';
import { useMaintenanceMethodJobPolling } from '@/hooks/useMaintenanceMethodJobPolling';
import { SaveCustomerPrompt } from '@/components/electrician/shared/SaveCustomerPrompt';

type View = 'briefing' | 'streaming' | 'results';

const MaintenanceSpecialistInterface = () => {
  const routerLocation = useLocation();
  const savedResultsState = routerLocation.state as {
    fromSavedResults?: boolean;
    jobId?: string;
    outputData?: any;
    inputData?: any;
  } | null;

  const [inputs, setInputs] = useState<MaintenanceMethodInputs>(() => {
    if (savedResultsState?.fromSavedResults && savedResultsState.inputData) {
      const i = savedResultsState.inputData;
      return {
        ...emptyMaintenanceInputs(),
        description: i.query ?? i.description ?? '',
        installationType: i.equipmentDetails?.installationType ?? 'commercial',
        projectName: i.equipmentDetails?.projectName ?? '',
        equipmentType: i.equipmentDetails?.equipmentType ?? '',
        equipmentMakeModel: i.equipmentDetails?.equipmentMakeModel ?? '',
        location: i.equipmentDetails?.location ?? '',
        clientName: i.equipmentDetails?.clientName ?? '',
      };
    }
    return emptyMaintenanceInputs();
  });

  const [view, setView] = useState<View>(
    savedResultsState?.fromSavedResults ? 'results' : 'briefing'
  );
  const [methodData, setMethodData] = useState<any>(savedResultsState?.outputData ?? null);
  const [currentJobId, setCurrentJobId] = useState<string | null>(savedResultsState?.jobId ?? null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [showSaveCustomerPrompt, setShowSaveCustomerPrompt] = useState(false);
  const [savePromptDismissed, setSavePromptDismissed] = useState(false);
  const inputsBeforeStreamRef = useRef<MaintenanceMethodInputs | null>(null);

  // The maintenance polling hook auto-starts when given a jobId, so we
  // don't call startPolling / stopPolling here. We derive the headline
  // fields from the polled `job` row.
  const { job: polledJob } = useMaintenanceMethodJobPolling(currentJobId);
  const jobProgress = polledJob?.progress ?? 0;
  const jobStatus = (polledJob?.status ?? 'pending') as
    | 'pending'
    | 'processing'
    | 'completed'
    | 'failed'
    | 'cancelled';
  const jobCurrentStep = polledJob?.current_step ?? '';
  const jobMethodData = polledJob?.method_data ?? null;
  const jobError = polledJob?.error_message ?? null;

  const onPatch = (patch: Partial<MaintenanceMethodInputs>) =>
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
        toast.error('Sign in to generate a maintenance method statement.');
        setView('briefing');
        return;
      }

      const briefing = composeMaintenanceBriefing(inputs);
      const { data, error } = await supabase.functions.invoke('maintenance-specialist', {
        body: {
          action: 'generate',
          query: briefing,
          equipmentDetails: {
            projectName: inputs.projectName,
            equipmentType: inputs.equipmentType,
            equipmentMakeModel: inputs.equipmentMakeModel,
            location: inputs.location,
            installationType: inputs.installationType,
            clientName: inputs.clientName,
            clientContact: inputs.clientContact,
            ageYears: inputs.ageYears,
            frequency: inputs.frequency,
            criticality: inputs.criticality,
            additionalNotes: inputs.additionalNotes,
          },
          attachments: inputs.attachments,
        },
      });

      if (error || !data?.jobId) {
        throw new Error(error?.message || 'Failed to create maintenance method job.');
      }

      // Setting jobId auto-starts the polling hook.
      setCurrentJobId(data.jobId);

      if (inputs.customerId) {
        supabase
          .from('maintenance_method_jobs')
           
          .update({ customer_id: inputs.customerId } as any)
          .eq('id', data.jobId)
          .then(({ error: linkErr }) => {
            if (linkErr) console.error('Customer link failed:', linkErr);
          });
      } else if (inputs.clientName?.trim() && !savePromptDismissed) {
        setShowSaveCustomerPrompt(true);
      }
    } catch (err: any) {
      console.error('Maintenance generate error:', err);
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
      await supabase.functions.invoke('maintenance-specialist', {
        body: { action: 'cancel', jobId: currentJobId },
      });
      // Clearing jobId auto-stops the polling hook.
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
    setInputs(emptyMaintenanceInputs());
    setView('briefing');
  };

  const handleEditAndRegenerate = () => {
    if (inputsBeforeStreamRef.current) setInputs(inputsBeforeStreamRef.current);
    setMethodData(null);
    setCurrentJobId(null);
    setView('briefing');
  };

  useEffect(() => {
    if (jobStatus === 'completed' && jobMethodData) {
      setMethodData(jobMethodData);
      setView('results');
    }
    // The polling hook handles its own cleanup on unmount / jobId change;
    // we don't need to call any stop method on failed/cancelled here.
  }, [jobStatus, jobMethodData]);

  const liveMethod = useMemo(() => {
    if (!jobMethodData) return null;
    if (Array.isArray(jobMethodData.steps) && jobMethodData.steps.length > 0) return jobMethodData;
    return null;
  }, [jobMethodData]);

  if (view === 'streaming') {
    return (
      <MaintenanceStream
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
      <EditorialMaintenanceResults
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
      {showSaveCustomerPrompt && !inputs.customerId && inputs.clientName?.trim() && (
        <SaveCustomerPrompt
          client={{ name: inputs.clientName, address: inputs.location || undefined }}
          onSaved={(savedId) => {
            setInputs((prev) => ({ ...prev, customerId: savedId }));
            setShowSaveCustomerPrompt(false);
            if (currentJobId) {
              supabase
                .from('maintenance_method_jobs')
                 
                .update({ customer_id: savedId } as any)
                .eq('id', currentJobId);
            }
          }}
          onDismiss={() => {
            setShowSaveCustomerPrompt(false);
            setSavePromptDismissed(true);
          }}
        />
      )}

      <MaintenanceBriefing
        inputs={inputs}
        onPatch={onPatch}
        onGenerate={onGenerate}
        isProcessing={view !== 'briefing'}
      />

      {isCancelling && <p className="text-center text-[12px] text-white/55">Cancelling…</p>}
    </div>
  );
};

export default MaintenanceSpecialistInterface;
