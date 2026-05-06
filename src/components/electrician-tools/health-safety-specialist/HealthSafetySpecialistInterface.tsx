/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Health & Safety Specialist orchestrator.
 *
 * Three-screen flow mirroring Installation/Maintenance Specialist:
 *   1. Briefing — description-led + attachments + scope
 *   2. Stream   — editorial streaming view (realtime partials)
 *   3. Results  — editorial RAMS surface
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { HealthSafetyBriefing } from './HealthSafetyBriefing';
import { HealthSafetyStream } from './HealthSafetyStream';
import { EditorialHealthSafetyResults } from './EditorialHealthSafetyResults';
import {
  HealthSafetyInputs,
  composeHealthSafetyBriefing,
  emptyHealthSafetyInputs,
} from '@/types/health-safety-inputs';
import { SaveCustomerPrompt } from '@/components/electrician/shared/SaveCustomerPrompt';

type View = 'briefing' | 'streaming' | 'results';

const POLL_INTERVAL_MS = 1500;

const HealthSafetySpecialistInterface = () => {
  const routerLocation = useLocation();
  const savedResultsState = routerLocation.state as
    | {
        fromSavedResults?: boolean;
        jobId?: string;
        outputData?: any;
        inputData?: any;
      }
    | null;

  const [inputs, setInputs] = useState<HealthSafetyInputs>(() => {
    if (savedResultsState?.fromSavedResults && savedResultsState.inputData) {
      const i = savedResultsState.inputData;
      return {
        ...emptyHealthSafetyInputs(),
        description: i.query ?? i.description ?? '',
        workType: i.work_type ?? i.workType ?? 'commercial',
        projectName: i.project_info?.projectName ?? '',
        location: i.project_info?.location ?? '',
        clientName: i.project_info?.clientName ?? '',
        scopeOfWorks: i.project_info?.scopeOfWorks ?? '',
      };
    }
    return emptyHealthSafetyInputs();
  });

  const [view, setView] = useState<View>(
    savedResultsState?.fromSavedResults ? 'results' : 'briefing'
  );
  const [outputData, setOutputData] = useState<any>(savedResultsState?.outputData ?? null);
  const [currentJobId, setCurrentJobId] = useState<string | null>(savedResultsState?.jobId ?? null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [showSaveCustomerPrompt, setShowSaveCustomerPrompt] = useState(false);
  const [savePromptDismissed, setSavePromptDismissed] = useState(false);
  const inputsBeforeStreamRef = useRef<HealthSafetyInputs | null>(null);

  // Local polling — there's no shared hook for health_safety_jobs, so we
  // poll directly. Auto-stops when jobId is null or status is terminal.
  const [polledJob, setPolledJob] = useState<any | null>(null);
  useEffect(() => {
    if (!currentJobId) {
      setPolledJob(null);
      return;
    }
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const poll = async () => {
      const { data, error } = await supabase
        .from('health_safety_jobs')
        .select('id, status, progress, current_step, output_data, error_message')
        .eq('id', currentJobId)
        .maybeSingle();
      if (cancelled) return;
      if (error) {
        console.error('H&S polling error:', error);
        timer = setTimeout(poll, POLL_INTERVAL_MS);
        return;
      }
      setPolledJob(data ?? null);
      if (data && (data.status === 'complete' || data.status === 'failed' || data.status === 'cancelled')) {
        return;
      }
      timer = setTimeout(poll, POLL_INTERVAL_MS);
    };
    poll();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [currentJobId]);

  const jobProgress = polledJob?.progress ?? 0;
  const jobStatus = (polledJob?.status ?? 'pending') as
    | 'pending'
    | 'processing'
    | 'complete'
    | 'failed'
    | 'cancelled';
  const jobCurrentStep = polledJob?.current_step ?? '';
  const jobOutputData = polledJob?.output_data ?? null;
  const jobError = polledJob?.error_message ?? null;

  const onPatch = (patch: Partial<HealthSafetyInputs>) =>
    setInputs((prev) => ({ ...prev, ...patch }));

  const onGenerate = async () => {
    inputsBeforeStreamRef.current = inputs;
    setView('streaming');
    setOutputData(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Sign in to generate a RAMS.');
        setView('briefing');
        return;
      }

      const briefing = composeHealthSafetyBriefing(inputs);
      const { data, error } = await supabase.functions.invoke('health-safety-specialist', {
        body: {
          action: 'generate',
          query: briefing,
          workType: inputs.workType,
          projectInfo: {
            projectName: inputs.projectName,
            scopeOfWorks: inputs.scopeOfWorks,
            location: inputs.location,
            clientName: inputs.clientName,
            clientContact: inputs.clientContact,
            duration: inputs.duration,
            headcount: inputs.headcount,
            additionalNotes: inputs.additionalNotes,
          },
          attachments: inputs.attachments,
        },
      });

      if (error || !data?.jobId) {
        throw new Error(error?.message || 'Failed to create RAMS job.');
      }

      setCurrentJobId(data.jobId);

      if (!inputs.customerId && inputs.clientName?.trim() && !savePromptDismissed) {
        setShowSaveCustomerPrompt(true);
      }
    } catch (err: any) {
      console.error('H&S generate error:', err);
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
      await supabase.functions.invoke('health-safety-specialist', {
        body: { action: 'cancel', jobId: currentJobId },
      });
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
    setOutputData(null);
    setCurrentJobId(null);
    setInputs(emptyHealthSafetyInputs());
    setView('briefing');
  };

  const handleEditAndRegenerate = () => {
    if (inputsBeforeStreamRef.current) setInputs(inputsBeforeStreamRef.current);
    setOutputData(null);
    setCurrentJobId(null);
    setView('briefing');
  };

  useEffect(() => {
    if (jobStatus === 'complete' && jobOutputData) {
      setOutputData(jobOutputData);
      setView('results');
    }
  }, [jobStatus, jobOutputData]);

  const liveMethod = useMemo(() => {
    if (!jobOutputData) return null;
    if (Array.isArray(jobOutputData.hazards) && jobOutputData.hazards.length > 0) {
      // Adapt the data shape so the stream's "live steps preview" can
      // show drafted hazards. Reuse `steps` field for the stream's renderer.
      return {
        steps: jobOutputData.hazards.map((h: any, i: number) => ({
          stepNumber: h.hazardNumber ?? i + 1,
          title: h.title,
          content: h.locationOfHazard,
        })),
      };
    }
    return null;
  }, [jobOutputData]);

  if (view === 'streaming') {
    return (
      <HealthSafetyStream
        inputs={inputs}
        jobId={currentJobId}
        jobProgress={jobProgress}
        jobStatus={jobStatus === 'complete' ? 'completed' : jobStatus === 'cancelled' ? 'cancelled' : jobStatus === 'failed' ? 'failed' : jobStatus}
        currentStep={jobCurrentStep}
        error={jobError}
        liveMethod={liveMethod}
        onCancel={handleCancel}
      />
    );
  }

  if (view === 'results' && outputData) {
    return (
      <EditorialHealthSafetyResults
        inputs={inputs}
        outputData={outputData}
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
          }}
          onDismiss={() => {
            setShowSaveCustomerPrompt(false);
            setSavePromptDismissed(true);
          }}
        />
      )}

      <HealthSafetyBriefing
        inputs={inputs}
        onPatch={onPatch}
        onGenerate={onGenerate}
        isProcessing={view !== 'briefing'}
      />

      {isCancelling && (
        <p className="text-center text-[12px] text-white/70">Cancelling…</p>
      )}
    </div>
  );
};

export default HealthSafetySpecialistInterface;
