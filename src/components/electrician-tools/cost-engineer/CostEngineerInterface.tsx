/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { trackFeatureUse } from '@/components/ActivityTracker';
import { storageGetSync } from '@/utils/storage';

import { useCostEngineerGeneration } from '@/hooks/useCostEngineerGeneration';
import { CostBriefing } from './CostBriefing';
import { CostEstimateStream } from './CostEstimateStream';
import { EditorialCostResults } from './EditorialCostResults';
import { BusinessSettings, DEFAULT_BUSINESS_SETTINGS } from './BusinessSettingsDialog';
import { SaveCustomerPrompt } from '@/components/electrician/shared/SaveCustomerPrompt';
import { ImportedContextBanner } from '@/components/electrician-tools/shared/ImportedContextBanner';
import {
  getStoredCircuitContext,
  clearStoredCircuitContext,
  type StoredCircuitContext,
} from '@/utils/circuit-context-generator';
import {
  CostEstimateInputs,
  DEFAULT_COST_ESTIMATE_INPUTS,
  composeQueryFromInputs,
} from '@/types/cost-estimate-inputs';

const getStorageKey = (userId?: string) =>
  userId ? `electrician_business_settings_${userId}` : 'electrician_business_settings_guest';

type ViewState = 'input' | 'processing' | 'results';

const CostEngineerInterface = () => {
  const { user } = useAuth();
  const routerLocation = useLocation();
  const storageKey = useMemo(() => getStorageKey(user?.id), [user?.id]);

  const savedResultsState = routerLocation.state as {
    fromSavedResults?: boolean;
    jobId?: string;
    outputData?: any;
    inputData?: any;
  } | null;

  const [viewState, setViewState] = useState<ViewState>(
    savedResultsState?.fromSavedResults ? 'results' : 'input'
  );

  const [inputs, setInputs] = useState<CostEstimateInputs>(DEFAULT_COST_ESTIMATE_INPUTS);
  const [structuredData, setStructuredData] = useState<any>(null);
  const [rawResponse, setRawResponse] = useState<string>('');

  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>(
    DEFAULT_BUSINESS_SETTINGS
  );

  const [jobId, setJobId] = useState<string | null>(null);
  const [jobError, setJobError] = useState<string | null>(null);
  const [lastInputs, setLastInputs] = useState<CostEstimateInputs | null>(null);
  // When viewing a refined estimate we keep the parent's structuredData
  // around so the results page can show a diff + a "view original" link.
  const [parentStructuredData, setParentStructuredData] = useState<any>(null);
  const [parentJobId, setParentJobId] = useState<string | null>(null);

  const [importedContext, setImportedContext] = useState<StoredCircuitContext | null>(null);
  const [showSaveCustomerPrompt, setShowSaveCustomerPrompt] = useState(false);
  const [savePromptDismissed, setSavePromptDismissed] = useState(false);

  /* ── Imported circuit context ─────────────────────── */
  useEffect(() => {
    const stored = getStoredCircuitContext();
    if (stored && stored.agentType === 'cost-engineer') {
      setImportedContext(stored);
      clearStoredCircuitContext();
    }
  }, []);

  const handleUseImportedContext = () => {
    if (importedContext) {
      setInputs((prev) => ({
        ...prev,
        projectName: importedContext.sourceDesign || prev.projectName,
        description: [
          prev.description,
          prev.description ? '\n' : '',
          'From Circuit Designer:\n',
          importedContext.formattedPrompt,
        ]
          .filter(Boolean)
          .join(''),
      }));
      setImportedContext(null);
    }
  };

  /* ── Saved results from navigation state ──────────── */
  useEffect(() => {
    if (savedResultsState?.fromSavedResults && savedResultsState.outputData) {
      const data = savedResultsState.outputData;
      const inp = savedResultsState.inputData;
      setStructuredData(data.structuredData);
      setRawResponse(data.response || '');
      if (inp?.projectContext?.briefingInputs) {
        setInputs({
          ...DEFAULT_COST_ESTIMATE_INPUTS,
          ...inp.projectContext.briefingInputs,
        });
      } else if (inp?.projectContext) {
        setInputs({
          ...DEFAULT_COST_ESTIMATE_INPUTS,
          description: inp.query ?? '',
          projectName: inp.projectContext.projectName ?? '',
          projectType: inp.projectContext.projectType ?? 'domestic',
          location: inp.projectContext.location ?? '',
          clientName: inp.projectContext.clientInfo ?? '',
          notes: inp.projectContext.additionalInfo ?? '',
        });
      }
      setViewState('results');
    }
  }, [savedResultsState]);

  /* ── Business settings load ───────────────────────── */
  useEffect(() => {
    const raw = storageGetSync(storageKey);
    if (raw) {
      try {
        setBusinessSettings(JSON.parse(raw));
      } catch (e) {
        console.error('Failed to parse business settings:', e);
      }
    } else {
      setBusinessSettings(DEFAULT_BUSINESS_SETTINGS);
    }
  }, [storageKey]);

  /* ── Job polling ──────────────────────────────────── */
  const { job, isPolling, cancelJob } = useCostEngineerGeneration({
    jobId,
    onComplete: (data) => {
      setJobError(null);
      setStructuredData(data?.structuredData ?? null);
      setRawResponse(data?.response ?? '');
      setViewState('results');
      // Surface the save-customer prompt now that results are visible.
      if (!inputs.customerId && inputs.clientName.trim() && !savePromptDismissed) {
        setShowSaveCustomerPrompt(true);
      }
    },
    onError: (error) => {
      setJobError(error);
      toast({ title: 'Generation failed', description: error, variant: 'destructive' });
    },
  });

  /**
   * When the polled job has a `refine_of`, fetch the parent's
   * output_data so the results page can compute deltas and offer a
   * "view original" link. Cleared whenever we switch to a non-refined
   * job.
   */
  useEffect(() => {
    if (!job?.refine_of) {
      setParentStructuredData(null);
      setParentJobId(null);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from('cost_engineer_jobs')
        .select('output_data')
        .eq('id', job.refine_of)
        .maybeSingle();
      if (cancelled || !data?.output_data) return;
      setParentStructuredData(data.output_data?.structuredData ?? null);
      setParentJobId(job.refine_of);
    })();
    return () => {
      cancelled = true;
    };
  }, [job?.refine_of]);

  /**
   * Switch the displayed estimate back to the parent (the "original"
   * before refinement). Restores parent's structuredData; refinement
   * controls hide because parent has no refine_of.
   */
  const handleViewOriginal = async () => {
    if (!parentJobId) return;
    const { data } = await supabase
      .from('cost_engineer_jobs')
      .select('id, output_data, refine_of')
      .eq('id', parentJobId)
      .maybeSingle();
    if (!data?.output_data) {
      toast({ title: 'Original not available', variant: 'destructive' });
      return;
    }
    setJobId(data.id);
    setStructuredData(data.output_data?.structuredData ?? null);
    setRawResponse(data.output_data?.response ?? '');
    // Parent of parent (if any) is loaded by the effect above when the
    // poll resolves the new job.
  };

  const patchInputs = (patch: Partial<CostEstimateInputs>) =>
    setInputs((prev) => ({ ...prev, ...patch }));

  /* ── Generate ─────────────────────────────────────── */
  const handleGenerate = async (overrideInputs?: CostEstimateInputs) => {
    const next = overrideInputs ?? inputs;
    setInputs(next);
    setLastInputs(next);
    setViewState('processing');
    setJobError(null);

    const payload = {
      query: composeQueryFromInputs(next),
      region: next.region,
      projectContext: {
        projectType: next.projectType,
        projectName: next.projectName,
        clientInfo: [next.clientName, next.clientContact].filter(Boolean).join(' - '),
        additionalInfo: next.notes ?? '',
        // Echoed back through to results view; processed by edge function for vision/PDF intake.
        attachments: next.attachments,
        briefingInputs: next,
      },
      businessSettings: {
        ...businessSettings,
        profitTargets: {
          ...businessSettings.profitTargets,
          target: next.markupPercent,
        },
      },
    };

    try {
      const { data, error } = await supabase.functions.invoke('cost-engineer', {
        body: payload,
      });
      if (error) throw error;

      setJobId(data.jobId);
      if (user?.id) {
        trackFeatureUse(user.id, 'ai_cost_engineer', { jobId: data.jobId });
      }

      if (next.customerId && data.jobId) {
        supabase
          .from('cost_engineer_jobs')
          .update({ customer_id: next.customerId })
          .eq('id', data.jobId)
          .then(({ error: linkErr }) => {
            if (linkErr) console.error('Failed to link customer:', linkErr);
          });
      }
      // Note: SaveCustomerPrompt is surfaced from the polling onComplete
      // callback so it lands on the results view, not the now-hidden briefing.
    } catch (err: any) {
      console.error('Error creating job:', err);
      setViewState('input');
      toast({ title: 'Failed to start estimate', description: err.message, variant: 'destructive' });
    }
  };

  const handleCancel = async () => {
    if (jobId) await cancelJob();
    setViewState('input');
    setJobId(null);
    setJobError(null);
  };

  const handleRetry = async () => {
    if (lastInputs) {
      await handleGenerate(lastInputs);
    } else {
      setViewState('input');
      setJobError(null);
    }
  };

  /**
   * Trigger a refinement of the current estimate. Sends the existing
   * jobId as parentJobId; the worker loads the parent's items and runs
   * a delta AI pass per the chosen mode.
   */
  const handleRefine = async (mode: 'cheaper' | 'premium' | 'phase') => {
    if (!jobId) {
      toast({ title: 'Cannot refine', description: 'No estimate loaded', variant: 'destructive' });
      return;
    }
    setViewState('processing');
    setJobError(null);

    try {
      const { data, error } = await supabase.functions.invoke('cost-engineer', {
        body: {
          refineMode: mode,
          parentJobId: jobId,
          businessSettings: {
            ...businessSettings,
            profitTargets: {
              ...businessSettings.profitTargets,
              target: inputs.markupPercent,
            },
          },
        },
      });
      if (error) throw error;
      setJobId(data.jobId);
      toast({
        title: 'Refining estimate',
        description: `Generating a ${mode === 'phase' ? 'phased' : mode} version of your quote…`,
      });
    } catch (err: any) {
      console.error('Error creating refinement job:', err);
      setViewState('results');
      toast({ title: 'Refinement failed', description: err.message, variant: 'destructive' });
    }
  };

  /**
   * Bring the user back to the briefing with the current estimate's
   * inputs preserved. They can tweak the description / details / notes
   * and hit generate to fire a fresh estimate. Faster than starting
   * from scratch when they realise they forgot a circuit or want to
   * swap a spec — the everyday refinement.
   */
  const handleEditAndRegenerate = () => {
    setViewState('input');
    setStructuredData(null);
    setRawResponse('');
    setJobError(null);
    // Keep `inputs` populated and `jobId` cleared so a generate fires a
    // fresh extraction (not a refinement of the previous job — the user
    // might be changing the brief substantially).
    setJobId(null);
  };

  const handleNewEstimate = () => {
    setViewState('input');
    setInputs(DEFAULT_COST_ESTIMATE_INPUTS);
    setStructuredData(null);
    setRawResponse('');
    setJobId(null);
    setJobError(null);
    setShowSaveCustomerPrompt(false);
    setSavePromptDismissed(false);
  };

  /* ── Render ───────────────────────────────────────── */
  if (viewState === 'processing' && (isPolling || jobError)) {
    return (
      <CostEstimateStream
        inputs={inputs}
        jobId={jobId}
        jobProgress={job?.progress ?? 0}
        jobStatus={(job?.status as any) ?? 'processing'}
        currentStep={job?.current_step ?? undefined}
        refineMode={(job as any)?.refine_mode ?? null}
        error={jobError}
        onCancel={handleCancel}
        onRetry={handleRetry}
      />
    );
  }

  if (viewState === 'results' && structuredData) {
    return (
      <>
        {showSaveCustomerPrompt && !inputs.customerId && inputs.clientName.trim() && (
          <div className="px-4 sm:px-6 md:px-10 lg:px-16 pt-4">
            <SaveCustomerPrompt
              client={{ name: inputs.clientName.split(' - ')[0] || inputs.clientName }}
              onSaved={(savedId) => {
                patchInputs({ customerId: savedId });
                setShowSaveCustomerPrompt(false);
                if (jobId) {
                  supabase
                    .from('cost_engineer_jobs')
                    .update({ customer_id: savedId })
                    .eq('id', jobId);
                }
              }}
              onDismiss={() => {
                setShowSaveCustomerPrompt(false);
                setSavePromptDismissed(true);
              }}
            />
          </div>
        )}
        <EditorialCostResults
          inputs={inputs}
          structuredData={structuredData}
          rawResponse={rawResponse}
          jobId={jobId}
          refineOf={(job as any)?.refine_of ?? null}
          refineMode={(job as any)?.refine_mode ?? null}
          parentStructuredData={parentStructuredData}
          onNewEstimate={handleNewEstimate}
          onRefine={handleRefine}
          onViewOriginal={parentJobId ? handleViewOriginal : undefined}
          onEditAndRegenerate={handleEditAndRegenerate}
        />
      </>
    );
  }

  return (
    <>
      <AnimatePresence>
        {importedContext && (
          <div className="px-4 pt-4">
            <ImportedContextBanner
              source={importedContext.sourceDesign}
              circuitCount={importedContext.context.circuitSummaries.length}
              onUseContext={handleUseImportedContext}
              onDismiss={() => setImportedContext(null)}
            />
          </div>
        )}
      </AnimatePresence>

      <CostBriefing
        inputs={inputs}
        onPatch={patchInputs}
        onGenerate={() => handleGenerate()}
        isProcessing={viewState !== 'input'}
      />
    </>
  );
};

export default CostEngineerInterface;
