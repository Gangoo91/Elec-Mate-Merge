/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { StructuredDesignWizard } from './structured-input/StructuredDesignWizard';
import EditorialDesignResults from './EditorialDesignResults';
import { CircuitDesignStream } from './CircuitDesignStream';
import { DesignInputs, CircuitInput } from '@/types/installation-design';
import { AgentInbox } from '@/components/install-planner-v2/AgentInbox';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useCircuitDesignGeneration } from '@/hooks/useCircuitDesignGeneration';
import { ImportedContextBanner } from '@/components/electrician-tools/shared/ImportedContextBanner';
import { AnimatePresence, motion } from 'framer-motion';
import { SaveCustomerPrompt } from '@/components/electrician/shared/SaveCustomerPrompt';
import { trackFeatureUse } from '@/components/ActivityTracker';
import { useAuth } from '@/contexts/AuthContext';

// User-friendly error message mapper
const getFriendlyErrorMessage = (error: string): string => {
  if (error.includes('user_id') || error.includes('authentication')) {
    return 'Authentication error. Please try logging out and back in.';
  }
  if (error.includes('timeout') || error.includes('3 minutes')) {
    return 'Design generation is taking longer than expected. Please try again with fewer circuits, or contact support if the issue persists.';
  }
  if (error.includes('rate limit') || error.includes('429')) {
    return 'Too many requests. Please wait a moment and try again.';
  }
  if (error.includes('cancelled')) {
    return 'Design generation was cancelled.';
  }
  if (error.includes('RAG') || error.includes('regulations')) {
    return 'Unable to access design knowledge base. Please try again in a moment.';
  }
  if (error.includes('OpenAI') || error.includes('API')) {
    return 'AI service temporarily unavailable. Please try again in a moment.';
  }

  // Generic fallback
  return `Design generation failed: ${error.slice(0, 100)}`;
};

// Transform backend expectedTests to frontend expectedTestResults format
// Returns numerical values only (no Ω suffix) - null when data unavailable
const transformExpectedTests = (expectedTests: any): any => {
  if (!expectedTests) return null;

  // Validate we have actual numerical data
  const hasR1R2 =
    typeof expectedTests.r1r2?.at20C === 'number' || typeof expectedTests.r1r2?.at70C === 'number';
  const hasZs =
    typeof expectedTests.zs?.expected === 'number' ||
    typeof expectedTests.zs?.maxPermitted === 'number';

  if (!hasR1R2 && !hasZs) return null;

  return {
    r1r2: {
      at20C:
        typeof expectedTests.r1r2?.at20C === 'number' ? expectedTests.r1r2.at20C.toFixed(3) : null,
      at70C:
        typeof expectedTests.r1r2?.at70C === 'number' ? expectedTests.r1r2.at70C.toFixed(3) : null,
      calculation: expectedTests.r1r2?.value || null,
    },
    zs: {
      calculated:
        typeof expectedTests.zs?.expected === 'number'
          ? expectedTests.zs.expected.toFixed(2)
          : null,
      maxPermitted:
        typeof expectedTests.zs?.maxPermitted === 'number'
          ? expectedTests.zs.maxPermitted.toFixed(2)
          : null,
      compliant: expectedTests.zs?.compliant ?? null,
    },
    insulationResistance: {
      testVoltage: expectedTests.insulationResistance?.testVoltage || '500V DC',
      minResistance: expectedTests.insulationResistance?.minResistance || '≥1.0MΩ',
    },
    polarity: 'Verify correct polarity at all terminations',
    rcdTest: expectedTests.rcd
      ? {
          at1x: `≤${expectedTests.rcd.maxTripTimeMs}ms @ ${expectedTests.rcd.ratingmA}mA`,
          at5x: `≤40ms @ ${expectedTests.rcd.ratingmA * 5}mA`,
          regulation: expectedTests.rcd.regulation || 'BS 7671 Reg 612.13.2',
        }
      : null,
  };
};

// Map context data from another agent to wizard initial data format
const mapContextToWizardData = (contextData: any): Partial<DesignInputs> => {
  return {
    projectName: contextData.projectName || '',
    location: contextData.location || '',
    clientName: contextData.clientName || '',
    propertyType: contextData.installationType || contextData.propertyType || 'domestic',
    voltage: contextData.voltage || 230,
    phases: contextData.phases || 'single',
    ze: contextData.ze || 0.35,
    earthingSystem: contextData.earthingSystem || 'TN-C-S',
    circuits:
      contextData.circuits?.map((c: any) => ({
        id: crypto.randomUUID(),
        name: c.name || 'Imported Circuit',
        loadType: c.loadType || 'general',
        loadPower: c.loadPower || c.power,
        cableLength: c.cableLength || c.length,
        phases: c.phases || 'single',
        specialLocation: c.specialLocation || 'none',
        notes: c.notes || '',
      })) || [],
  };
};

// Interface for imported context from other agents
interface ImportedAgentContext {
  contextData: any;
  instruction: string | null;
  source: string;
}

export const AIInstallationDesigner = () => {
  const routerLocation = useLocation();
  const { user } = useAuth();

  // Check if we're viewing saved results
  const savedResultsState = routerLocation.state as {
    fromSavedResults?: boolean;
    jobId?: string;
    outputData?: any;
    inputData?: any;
  } | null;

  const [currentView, setCurrentView] = useState<'input' | 'processing' | 'results'>(
    savedResultsState?.fromSavedResults ? 'results' : 'input'
  );
  const [userRequest, setUserRequest] = useState<string>('');
  const [totalCircuits, setTotalCircuits] = useState<number>(0);
  const [designData, setDesignData] = useState<any>(() => {
    // Initialize with saved results if present
    if (savedResultsState?.fromSavedResults && savedResultsState.outputData) {
      return savedResultsState.outputData;
    }
    return null;
  });
  const [jobId, setJobId] = useState<string | null>(null);
  const [activeInputs, setActiveInputs] = useState<DesignInputs | null>(null);
  const successToastShown = useRef(!!savedResultsState?.fromSavedResults);
  // State for context imported from other agents via AgentInbox
  const [importedContext, setImportedContext] = useState<ImportedAgentContext | null>(null);
  const [wizardInitialData, setWizardInitialData] = useState<Partial<DesignInputs> | undefined>(
    undefined
  );
  const [customerId, setCustomerId] = useState<string | undefined>(undefined);
  const [showSaveCustomerPrompt, setShowSaveCustomerPrompt] = useState(false);
  const [savePromptDismissed, setSavePromptDismissed] = useState(false);

  const {
    job,
    progress,
    status,
    currentStep,
    designData: jobDesignData,
    error,
  } = useCircuitDesignGeneration(jobId);

  const handleGenerate = async (inputs: DesignInputs) => {
    try {
      successToastShown.current = false; // Reset flag for new job
      // Store user request and circuit count for processing view
      const userDescription =
        inputs.additionalPrompt ||
        `${inputs.projectName} - ${inputs.circuits.length} circuit${inputs.circuits.length !== 1 ? 's' : ''}`;
      sessionStorage.setItem('design-user-request', userDescription);
      sessionStorage.setItem('design-total-circuits', String(inputs.circuits.length));
      setUserRequest(userDescription);
      setTotalCircuits(inputs.circuits.length);

      // Count circuits that require AI processing
      const aiRequiredCircuits = inputs.circuits.filter((c) => {
        const isComplex =
          (c.loadPower || 0) > 7200 || (c.cableLength || 0) > 100 || c.specialLocation !== 'none';
        return isComplex || !['socket', 'lighting'].includes(c.loadType || '');
      });

      // Warn if job is very large
      if (aiRequiredCircuits.length > 16) {
        toast.warning('Large design detected', {
          description: `${aiRequiredCircuits.length} complex circuits may take 3-5 minutes to process.`,
          duration: 8000,
        });
      }

      setActiveInputs(inputs);
      setCurrentView('processing');

      // Create async job via job queue
      const { data, error } = await supabase.functions.invoke('circuit-designer', {
        body: {
          mode: 'direct-design',
          projectInfo: {
            projectName: inputs.projectName || 'Untitled Project',
            location: inputs.location || 'Not specified',
            clientName: inputs.clientName,
            electricianName: inputs.electricianName,
            installationType: inputs.propertyType || 'domestic',
          },
          supply: {
            voltage: inputs.voltage || 230,
            phases: inputs.phases || 'single',
            pfc: inputs.pscc || 16000,
            ze: inputs.ze || 0.35,
            earthingSystem: inputs.earthingSystem || 'TN-C-S',
            consumerUnitType: 'split-load',
            mainSwitchRating: inputs.mainSwitchRating || 100,
          },
          circuits: inputs.circuits || [],
          additionalPrompt: inputs.additionalPrompt || '',
          specialRequirements: [],
          installationConstraints: {
            ambientTemp: inputs.ambientTemp || 30,
            groupingFactor: inputs.groupingFactor || 1,
            budget: inputs.budgetLevel || 'standard',
          },
        },
      });

      if (error) {
        toast.error('Failed to start design generation', {
          description: error.message || 'Please try again',
        });
        setCurrentView('input');
        return;
      }

      // Start polling the job
      setJobId(data.jobId);
      trackFeatureUse(user?.id || '', 'ai_circuit_designer', {});
      console.log('🚀 Started circuit design job:', data.jobId);

      // Link customer to job
      if (customerId && data.jobId) {
        supabase
          .from('circuit_design_jobs')
          .update({ customer_id: customerId })
          .eq('id', data.jobId)
          .then(({ error: linkErr }) => {
            if (linkErr) console.error('Failed to link customer to circuit design job:', linkErr);
          });
      } else if (!customerId && inputs.clientName?.trim() && !savePromptDismissed) {
        setShowSaveCustomerPrompt(true);
      }
    } catch (error: any) {
      console.error('Design generation error:', error);
      toast.error('Design generation failed', {
        description: error.message || 'Please try again',
      });
      setCurrentView('input');
    }
  };

  useEffect(() => {
    if (status === 'complete' && jobDesignData && !successToastShown.current) {
      console.log('✅ Job complete, processing results...');

      const jobInputs = (job as any)?.job_inputs;

      const designWithMetadata = {
        circuits: jobDesignData.circuits.map((circuit: any) => {
          return {
            ...circuit,
            // Explicitly preserve all core fields
            name: circuit.name,
            loadType: circuit.loadType,
            loadPower: circuit.loadPower,
            phases: circuit.phases,
            cableLength: circuit.cableLength,
            cableSize: circuit.cableSize,
            cpcSize: circuit.cpcSize,
            voltage: circuit.voltage,
            protectionDevice: circuit.protectionDevice,
            calculations: circuit.calculations,
            justifications: circuit.justifications,
            installationMethod: circuit.installationMethod || circuit.installMethod,
            // Use backend expectedTests as primary source - NO text fallback
            // Only numerical values from expectedTests, null if unavailable
            expectedTestResults: circuit.expectedTests
              ? transformExpectedTests(circuit.expectedTests)
              : null,
            reasoning: circuit.reasoning,
            rcdProtected: circuit.rcdProtected,
            circuitNumber: circuit.circuitNumber,
            specialLocation: circuit.specialLocation,
            // CRITICAL: Preserve expectedTests
            expectedTests: circuit.expectedTests,
            // CRITICAL: Deep clone structuredOutput to preserve all nested data
            structuredOutput: circuit.structuredOutput
              ? {
                  atAGlanceSummary: circuit.structuredOutput.atAGlanceSummary
                    ? {
                        loadKw: circuit.structuredOutput.atAGlanceSummary.loadKw,
                        loadIb: circuit.structuredOutput.atAGlanceSummary.loadIb,
                        cable: circuit.structuredOutput.atAGlanceSummary.cable,
                        protectiveDevice:
                          circuit.structuredOutput.atAGlanceSummary.protectiveDevice,
                        voltageDrop: circuit.structuredOutput.atAGlanceSummary.voltageDrop,
                        zs: circuit.structuredOutput.atAGlanceSummary.zs,
                        complianceTick: circuit.structuredOutput.atAGlanceSummary.complianceTick,
                        notes: circuit.structuredOutput.atAGlanceSummary.notes,
                      }
                    : undefined,
                  sections: circuit.structuredOutput.sections,
                }
              : undefined,
          };
        }),
        projectInfo: jobInputs?.projectInfo || {
          projectName: 'Untitled Project',
          location: 'Not specified',
        },
        supply: jobInputs?.supply || {
          voltage: 230,
          phases: 'single',
          pfc: 16000,
          ze: 0.35,
          earthingSystem: 'TN-C-S',
        },
        // Transform supply into consumerUnit format with complete data mapping
        consumerUnit: {
          type:
            (jobInputs?.supply?.consumerUnitType as
              | 'split-load'
              | 'high-integrity'
              | 'main-switch') || 'split-load',
          mainSwitchRating: jobInputs?.supply?.mainSwitchRating || 100,
          ways: jobDesignData.circuits?.length || 0,
          incomingSupply: {
            voltage: jobInputs?.supply?.voltage || 230,
            phases: (jobInputs?.supply?.phases as 'single' | 'three') || 'single',
            incomingPFC: jobInputs?.supply?.pfc || jobInputs?.supply?.pscc || 16,
            Ze: jobInputs?.supply?.ze || 0.35,
            earthingSystem:
              jobInputs?.supply?.earthingSystem ||
              (jobInputs?.supply?.earthing as 'TN-S' | 'TN-C-S' | 'TT') ||
              'TN-C-S',
          },
        },
        projectName: jobInputs?.projectInfo?.projectName || 'Untitled Project',
        location: jobInputs?.projectInfo?.location || 'Not specified',
        clientName: jobInputs?.projectInfo?.clientName,
        electricianName: jobInputs?.projectInfo?.electricianName,
        installationType:
          (jobInputs?.projectInfo?.installationType as 'domestic' | 'commercial' | 'industrial') ||
          'domestic',
        // ✅ Pass through diversity values from backend (Phase 4.9 synced values)
        totalLoad:
          jobDesignData.totalLoad ||
          jobDesignData?.circuits?.reduce((sum, c) => sum + (c.loadPower || 0), 0) ||
          0,
        diversifiedLoad: jobDesignData.diversifiedLoad || 0,
        diversityFactor: jobDesignData.diversityFactor || 0.65,
        // ✅ Calculate Total Design Ib from all circuits
        totalDesignCurrent:
          jobDesignData.circuits?.reduce(
            (sum: number, c: any) => sum + (c.calculations?.Ib || c.designCurrent || 0),
            0
          ) || 0,
        diversityBreakdown: jobDesignData.diversityBreakdown || {
          totalConnectedLoad: jobDesignData.totalLoad || 0,
          diversifiedLoad: jobDesignData.diversifiedLoad || 0,
          overallDiversityFactor: jobDesignData.diversityFactor || 0.65,
          byCategory: [],
          reasoning: 'Calculated per BS 7671',
        },
        diversityApplied: false,
        materials: [],
        validationPassed: jobDesignData.validationPassed,
        validationIssues: jobDesignData.validationIssues || [],
        autoFixSuggestions: jobDesignData.autoFixSuggestions || [],
      };

      console.log('🔧 Design data mapped:', {
        circuitCount: designWithMetadata.circuits.length,
        firstCircuit: designWithMetadata.circuits[0]?.name,
        hasAtAGlance: !!designWithMetadata.circuits[0]?.structuredOutput?.atAGlanceSummary,
        hasExpectedTests: !!designWithMetadata.circuits[0]?.expectedTests,
        validationPassed: designWithMetadata.validationPassed,
        issueCount: designWithMetadata.validationIssues.length,
      });

      setDesignData(designWithMetadata);
      sessionStorage.setItem('circuit-design-data', JSON.stringify(designWithMetadata));
      setCurrentView('results');

      const failedCount = jobDesignData.failedCircuits?.count || 0;
      const failedNames = jobDesignData.failedCircuits?.names || [];
      const cacheInfo = jobDesignData.fromCache ? ' (from cache)' : '';
      const autoFixInfo = jobDesignData.autoFixApplied ? ' (auto-fixed)' : '';
      const validationInfo = !jobDesignData.validationPassed
        ? ` - ${jobDesignData.validationIssues?.length || 0} validation issue(s) found`
        : '';

      if (failedCount > 0) {
        toast.warning(`${failedCount} circuit${failedCount !== 1 ? 's' : ''} failed to generate`, {
          description: `Completed: ${jobDesignData.circuits?.length || 0}. Failed: ${failedNames.join(', ')}`,
          duration: 8000,
        });
      } else {
        toast.success('Design generated successfully' + cacheInfo + autoFixInfo, {
          description: `${jobDesignData.circuits?.length || 0} circuit${(jobDesignData.circuits?.length || 0) !== 1 ? 's' : ''} designed${validationInfo}`,
        });
      }

      // Mark toast as shown
      successToastShown.current = true;
    }

    if (status === 'failed' && error) {
      toast.error('Design generation failed', {
        description: error || 'Please try again',
      });
      setCurrentView('input');
      setJobId(null);
    }
  }, [status, jobDesignData, error]);

  // Load design data from session on mount
  useEffect(() => {
    const savedData = sessionStorage.getItem('circuit-design-data');
    if (savedData) {
      try {
        setDesignData(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to parse saved design data:', e);
      }
    }
  }, []);

  const handleCancel = async () => {
    if (jobId) {
      // Cancel the job
      await supabase.functions.invoke('cancel-circuit-design-job', {
        body: { jobId },
      });
    }
    setCurrentView('input');
    setJobId(null);
    sessionStorage.removeItem('circuit-design-data');
    toast.info('Design generation cancelled');
  };

  const handleRetry = () => {
    setCurrentView('input');
    setJobId(null);
    sessionStorage.removeItem('circuit-design-data');
  };

  /**
   * Force-flip to results from whatever circuit_design_partials we have.
   * Used when the job's stuck on a slow/failed circuit but most are designed.
   * Missing circuits are kept as placeholder entries so the user knows what
   * needs re-designing.
   */
  const handleForceResults = async () => {
    if (!jobId || !activeInputs) {
      toast.error('Cannot view results — design state lost.');
      return;
    }
    try {
      const { data: partials, error: partialsErr } = await supabase
        .from('circuit_design_partials' as any)
        .select('*')
        .eq('job_id', jobId)
        .order('circuit_index');
      if (partialsErr) throw partialsErr;
      if (!partials || partials.length === 0) {
        toast.error('No circuits ready yet — give it another moment.');
        return;
      }

      const partialsByIdx = new Map<number, any>();
      (partials as any[]).forEach((p) => partialsByIdx.set(p.circuit_index, p.circuit_data));

      // Build a circuit array indexed by the wizard's input order.
      // Where we have a real designed circuit → use it. Where we don't →
      // mark with failedToDesign flag so the results page surfaces it.
      const wizardCircuits = activeInputs.circuits;
      const merged = wizardCircuits.map((wc, i) => {
        const p = partialsByIdx.get(i);
        if (p) return p;
        return {
          name: wc.name ?? `Circuit ${i + 1}`,
          loadType: wc.loadType,
          loadPower: wc.loadPower,
          phases: wc.phases ?? 'single',
          voltage: 230,
          circuitNumber: i + 1,
          failedToDesign: true,
          ungrounded_choices: ['Circuit not designed — re-run to complete this way.'],
          calculations: {},
          warnings: ['Circuit not designed'],
        };
      });

      const totalLoad = merged.reduce((s, c) => s + Number(c?.loadPower ?? 0), 0);
      const designed = merged.filter((c) => !(c as any).failedToDesign);
      const diversifiedLoad = designed.reduce(
        (s, c) =>
          s + Number(c?.calculations?.diversifiedLoad ?? c?.loadPower ?? 0),
        0
      );
      const diversityFactor = totalLoad > 0 ? diversifiedLoad / totalLoad : 0.65;

      const designWithMetadata: any = {
        circuits: merged,
        projectInfo: {
          projectName: activeInputs.projectName ?? 'Untitled Project',
          location: activeInputs.location ?? 'Not specified',
          clientName: activeInputs.clientName,
          electricianName: activeInputs.electricianName,
          installationType: activeInputs.propertyType ?? 'domestic',
        },
        supply: {
          voltage: activeInputs.voltage ?? 230,
          phases: activeInputs.phases ?? 'single',
          pfc: activeInputs.pscc ?? 16000,
          ze: activeInputs.ze ?? 0.35,
          earthingSystem: activeInputs.earthingSystem ?? 'TN-C-S',
        },
        consumerUnit: {
          type: 'split-load' as const,
          mainSwitchRating: activeInputs.mainSwitchRating ?? 100,
          ways: merged.length,
          incomingSupply: {
            voltage: activeInputs.voltage ?? 230,
            phases: (activeInputs.phases ?? 'single') as 'single' | 'three',
            incomingPFC: activeInputs.pscc ?? 16,
            Ze: activeInputs.ze ?? 0.35,
            earthingSystem: (activeInputs.earthingSystem ?? 'TN-C-S') as 'TN-S' | 'TN-C-S' | 'TT',
          },
        },
        projectName: activeInputs.projectName ?? 'Untitled Project',
        location: activeInputs.location ?? 'Not specified',
        clientName: activeInputs.clientName,
        electricianName: activeInputs.electricianName,
        installationType: activeInputs.propertyType ?? 'domestic',
        totalLoad,
        diversifiedLoad,
        diversityFactor,
        totalDesignCurrent: designed.reduce(
          (s, c) => s + Number(c?.calculations?.Ib ?? 0),
          0
        ),
        diversityBreakdown: {
          totalConnectedLoad: totalLoad,
          diversifiedLoad,
          overallDiversityFactor: diversityFactor,
          byCategory: [],
          reasoning: 'Calculated from streamed partials (job did not fully complete)',
        },
        diversityApplied: false,
        materials: [],
        validationPassed: false,
        validationIssues: [
          {
            severity: 'warn',
            message: `${merged.length - designed.length} of ${merged.length} circuits did not finish designing — re-run to complete.`,
          },
        ],
        autoFixSuggestions: [],
        partialResults: true,
      };

      setDesignData(designWithMetadata);
      sessionStorage.setItem('circuit-design-data', JSON.stringify(designWithMetadata));
      setCurrentView('results');

      toast.warning(`${designed.length} of ${merged.length} circuits ready`, {
        description: 'Showing partial results — re-run to complete the missing circuits.',
        duration: 6000,
      });
    } catch (err: any) {
      console.error('Force results failed:', err);
      toast.error('Could not load partial results', {
        description: err?.message ?? 'Try waiting a moment longer.',
      });
    }
  };

  const handleTaskAccept = (contextData: any, instruction: string | null) => {
    console.log('Task accepted from agent:', contextData, instruction);

    if (contextData) {
      try {
        // Store context for wizard to use
        setImportedContext({
          contextData,
          instruction,
          source: contextData.sourceAgent || contextData.projectName || 'another agent',
        });

        toast.success('Context loaded', {
          description: 'Work forwarded from another agent. Click "Use Context" to populate form.',
        });
      } catch (error) {
        console.error('Failed to parse agent context:', error);
        toast.error('Failed to load context from agent');
      }
    }
  };

  const handleUseImportedContext = () => {
    if (importedContext) {
      // Map context to wizard data format and set as initial data
      const mappedData = mapContextToWizardData(importedContext.contextData);
      setWizardInitialData(mappedData);
      setImportedContext(null);

      toast.success('Form populated', {
        description: `Imported ${mappedData.circuits?.length || 0} circuit(s) from ${importedContext.source}`,
      });
    }
  };

  const handleDismissImportedContext = () => {
    setImportedContext(null);
  };

  return (
    <div className="space-y-4">
      {/* Agent Inbox */}
      <AgentInbox currentAgent="designer" onTaskAccept={handleTaskAccept} />

      {/* Imported Context Banner - show when context is available and in input view */}
      <AnimatePresence>
        {importedContext && currentView === 'input' && (
          <ImportedContextBanner
            source={importedContext.source}
            circuitCount={importedContext.contextData?.circuits?.length || 0}
            onUseContext={handleUseImportedContext}
            onDismiss={handleDismissImportedContext}
          />
        )}
      </AnimatePresence>

      {currentView === 'input' && (
        <>
          {/* Save Customer Prompt */}
          {showSaveCustomerPrompt && !customerId && (
            <SaveCustomerPrompt
              client={{ name: designData?.clientName || '' }}
              onSaved={(savedId) => {
                setCustomerId(savedId);
                setShowSaveCustomerPrompt(false);
                if (jobId) {
                  supabase
                    .from('circuit_design_jobs')
                    .update({ customer_id: savedId })
                    .eq('id', jobId);
                }
              }}
              onDismiss={() => {
                setShowSaveCustomerPrompt(false);
                setSavePromptDismissed(true);
              }}
            />
          )}

          <StructuredDesignWizard
            onGenerate={handleGenerate}
            isProcessing={status === 'processing'}
            initialData={wizardInitialData}
            customerId={customerId}
            onCustomerIdChange={setCustomerId}
          />
        </>
      )}

      <AnimatePresence mode="wait">
        {currentView === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <CircuitDesignStream
              jobId={jobId}
              inputs={activeInputs ?? undefined}
              userRequest={userRequest}
              jobProgress={progress}
              jobStatus={status}
              currentStep={currentStep}
              onCancel={handleCancel}
              onForceResults={handleForceResults}
            />
          </motion.div>
        )}

        {currentView === 'results' && designData && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <EditorialDesignResults design={designData} onReset={handleRetry} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
