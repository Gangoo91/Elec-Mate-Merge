import { useState, useEffect, useRef } from "react";
import { StructuredDesignWizard } from "./structured-input/StructuredDesignWizard";
import { DesignReviewEditor } from "./DesignReviewEditor";
import { DesignProcessingView } from "./DesignProcessingView";
import { DesignInputs } from "@/types/installation-design";
import { AgentInbox } from "@/components/install-planner-v2/AgentInbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useCircuitDesignGeneration } from "@/hooks/useCircuitDesignGeneration";

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

// Format structured installation guidance into readable text
const formatInstallationGuidance = (guidance: any): string => {
  if (!guidance) return '';
  
  const sections: string[] = [];
  
  // Executive Summary
  if (guidance.executiveSummary) {
    sections.push(`📋 OVERVIEW\n${guidance.executiveSummary}\n`);
  }
  
  // Safety Considerations
  if (guidance.safetyConsiderations?.length > 0) {
    const safetyItems = guidance.safetyConsiderations
      .map((s: any) => `• ${s.consideration || s.description || s}`)
      .join('\n');
    sections.push(`⚠️ SAFETY CONSIDERATIONS\n${safetyItems}\n`);
  }
  
  // Materials Required
  if (guidance.materialsRequired?.length > 0) {
    const materials = guidance.materialsRequired
      .map((m: any) => {
        const qty = m.quantity || '';
        const item = m.item || m.name || '';
        const spec = m.specification ? ` (${m.specification})` : '';
        return `• ${qty}${qty ? 'x ' : ''}${item}${spec}`;
      })
      .join('\n');
    sections.push(`📦 MATERIALS REQUIRED\n${materials}\n`);
  }
  
  // Tools Required
  if (guidance.toolsRequired?.length > 0) {
    const tools = guidance.toolsRequired
      .map((t: any) => `• ${t.tool || t.name || t}${t.purpose ? ` - ${t.purpose}` : ''}`)
      .join('\n');
    sections.push(`🔧 TOOLS REQUIRED\n${tools}\n`);
  }
  
  // Cable Routing
  if (guidance.cableRouting?.length > 0) {
    const routing = guidance.cableRouting
      .map((r: any) => `• ${r.step || r.description || r}${r.method ? ` (${r.method})` : ''}`)
      .join('\n');
    sections.push(`🔌 CABLE ROUTING\n${routing}\n`);
  }
  
  // Installation Procedure
  if (guidance.installationProcedure?.length > 0) {
    const steps = guidance.installationProcedure
      .map((step: any) => {
        const num = step.stepNumber || '';
        const title = step.title || '';
        const desc = step.description || '';
        return `${num}. ${title}\n   ${desc}`;
      })
      .join('\n\n');
    sections.push(`🔧 INSTALLATION STEPS\n${steps}\n`);
  }
  
  // Testing Requirements removed - handled separately in expectedTests
  
  return sections.join('\n---\n\n');
};

// Map progress percentage to stage for accurate UI display
// Phase 1 (Designer): 0-50%, Phase 2 (Installation): 50-100%
const getStageFromProgress = (progress: number): number => {
  if (progress < 5) return 0;   // Initialising
  if (progress < 15) return 1;  // Understanding Requirements
  if (progress < 25) return 2;  // Searching Regulations
  if (progress < 50) return 3;  // AI Circuit Design (Phase 1)
  if (progress < 70) return 4;  // Installation Guidance (Phase 2)
  if (progress < 95) return 5;  // Compliance Validation
  return 6;                      // Finalising/Downloading
};

// Transform Installation Agent's testingRequirements to expectedTestResults format
const transformTestingRequirements = (testingReqs: any): any => {
  if (!testingReqs?.tests || !Array.isArray(testingReqs.tests)) return undefined;
  
  const result: any = {
    r1r2: { at20C: '', at70C: '', calculation: '' },
    zs: { calculated: '', maxPermitted: '', compliant: 'Yes' },
    insulationResistance: { testVoltage: '500V DC', minResistance: '≥1.0MΩ' },
    polarity: 'Verify correct polarity at all terminations',
    rcdTest: { at1x: '≤300ms @ 30mA', at5x: '≤40ms @ 150mA' }
  };
  
  // Extract values from structured testing requirements
  testingReqs.tests.forEach((test: any) => {
    const testName = test.testName || '';
    const procedure = test.procedure || '';
    const expectedReading = test.expectedReading || '';
    const acceptanceCriteria = test.acceptanceCriteria || '';
    
    if (testName.toLowerCase().includes('continuity') || testName.toLowerCase().includes('r1+r2')) {
      result.r1r2.calculation = procedure;
      result.r1r2.at70C = expectedReading;
    }
    if (testName.toLowerCase().includes('loop') || testName.toLowerCase().includes('zs')) {
      result.zs.calculated = expectedReading;
      result.zs.maxPermitted = acceptanceCriteria;
    }
    if (testName.toLowerCase().includes('insulation')) {
      result.insulationResistance.minResistance = expectedReading || result.insulationResistance.minResistance;
    }
    if (testName.toLowerCase().includes('polarity')) {
      result.polarity = procedure || result.polarity;
    }
    if (testName.toLowerCase().includes('rcd')) {
      result.rcdTest = { ...result.rcdTest, ...(test.details || {}) };
    }
  });
  
  return result;
};

// Transform backend expectedTests to frontend expectedTestResults format
// Returns numerical values only (no Ω suffix) - null when data unavailable
const transformExpectedTests = (expectedTests: any): any => {
  if (!expectedTests) return null;
  
  // Validate we have actual numerical data
  const hasR1R2 = typeof expectedTests.r1r2?.at20C === 'number' || typeof expectedTests.r1r2?.at70C === 'number';
  const hasZs = typeof expectedTests.zs?.expected === 'number' || typeof expectedTests.zs?.maxPermitted === 'number';
  
  if (!hasR1R2 && !hasZs) return null;
  
  return {
    r1r2: {
      at20C: typeof expectedTests.r1r2?.at20C === 'number' ? expectedTests.r1r2.at20C.toFixed(3) : null,
      at70C: typeof expectedTests.r1r2?.at70C === 'number' ? expectedTests.r1r2.at70C.toFixed(3) : null,
      calculation: expectedTests.r1r2?.value || null
    },
    zs: {
      calculated: typeof expectedTests.zs?.expected === 'number' ? expectedTests.zs.expected.toFixed(2) : null,
      maxPermitted: typeof expectedTests.zs?.maxPermitted === 'number' ? expectedTests.zs.maxPermitted.toFixed(2) : null,
      compliant: expectedTests.zs?.compliant ?? null
    },
    insulationResistance: {
      testVoltage: expectedTests.insulationResistance?.testVoltage || '500V DC',
      minResistance: expectedTests.insulationResistance?.minResistance || '≥1.0MΩ'
    },
    polarity: 'Verify correct polarity at all terminations',
    rcdTest: expectedTests.rcd ? {
      at1x: `≤${expectedTests.rcd.maxTripTimeMs}ms @ ${expectedTests.rcd.ratingmA}mA`,
      at5x: `≤40ms @ ${expectedTests.rcd.ratingmA * 5}mA`,
      regulation: expectedTests.rcd.regulation || 'BS 7671 Reg 612.13.2'
    } : null
  };
};

export const AIInstallationDesigner = () => {
  const [currentView, setCurrentView] = useState<'input' | 'processing' | 'results'>('input');
  const [userRequest, setUserRequest] = useState<string>('');
  const [totalCircuits, setTotalCircuits] = useState<number>(0);
  const [designData, setDesignData] = useState<any>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const successToastShown = useRef(false);
  
  // Use job polling hook (now includes installationGuidance)
  const { job, progress, status, currentStep, designData: jobDesignData, installationGuidance, error } = useCircuitDesignGeneration(jobId);

  const handleGenerate = async (inputs: DesignInputs) => {
    try {
      successToastShown.current = false; // Reset flag for new job
      // Store user request and circuit count for processing view
      const userDescription = inputs.additionalPrompt || 
        `${inputs.projectName} - ${inputs.circuits.length} circuit${inputs.circuits.length !== 1 ? 's' : ''}`;
      sessionStorage.setItem('design-user-request', userDescription);
      sessionStorage.setItem('design-total-circuits', String(inputs.circuits.length));
      setUserRequest(userDescription);
      setTotalCircuits(inputs.circuits.length);

      // Count circuits that require AI processing
      const aiRequiredCircuits = inputs.circuits.filter(c => {
        const isComplex = 
          (c.loadPower || 0) > 7200 || 
          (c.cableLength || 0) > 100 || 
          c.specialLocation !== 'none';
        return isComplex || !['socket', 'lighting'].includes(c.loadType || '');
      });

      // Warn if job is very large
      if (aiRequiredCircuits.length > 16) {
        toast.warning('Large design detected', {
          description: `${aiRequiredCircuits.length} complex circuits may take 3-5 minutes to process.`,
          duration: 8000
        });
      }

      setCurrentView('processing');
      
      // Create async job via job queue
      const { data, error } = await supabase.functions.invoke('create-circuit-design-job', {
        body: {
          mode: 'direct-design',
          projectInfo: {
            projectName: inputs.projectName || 'Untitled Project',
            location: inputs.location || 'Not specified',
            clientName: inputs.clientName,
            electricianName: inputs.electricianName,
            installationType: inputs.propertyType || 'domestic'
          },
          supply: {
            voltage: inputs.voltage || 230,
            phases: inputs.phases || 'single',
            pfc: inputs.pscc || 16000,
            ze: inputs.ze || 0.35,
            earthingSystem: inputs.earthingSystem || 'TN-C-S',
            consumerUnitType: 'split-load',
            mainSwitchRating: inputs.mainSwitchRating || 100
          },
          circuits: inputs.circuits || [],
          additionalPrompt: inputs.additionalPrompt || '',
          specialRequirements: [],
          installationConstraints: {
            ambientTemp: inputs.ambientTemp || 30,
            groupingFactor: inputs.groupingFactor || 1,
            budget: inputs.budgetLevel || 'standard'
          }
        }
      });

      if (error) {
        toast.error('Failed to start design generation', {
          description: error.message || 'Please try again'
        });
        setCurrentView('input');
        return;
      }

      // Start polling the job
      setJobId(data.jobId);
      console.log('🚀 Started circuit design job:', data.jobId);
      
    } catch (error: any) {
      console.error('Design generation error:', error);
      toast.error('Design generation failed', {
        description: error.message || 'Please try again'
      });
      setCurrentView('input');
    }
  };

  // Monitor job completion
  useEffect(() => {
    if (status === 'complete' && jobDesignData && !successToastShown.current) {
      console.log('✅ Job complete, processing results...');
      
      // Extract project info from job inputs
      const jobInputs = (job as any)?.job_inputs;
      
      const designWithMetadata = {
        circuits: jobDesignData.circuits.map((circuit: any, index: number) => {
          // Get circuit-specific guidance
          const circuitKey = `circuit_${index}`;
          const circuitGuidance = installationGuidance?.[circuitKey];
          
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
            // Format circuit-specific installation guidance for UI display
            installationGuidance: circuitGuidance?.guidance ? 
              formatInstallationGuidance(circuitGuidance.guidance) : 
              undefined,
            // Pass structured guidance object for PDF consumption
            installationGuidanceStructured: circuitGuidance?.guidance || undefined,
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
            structuredOutput: circuit.structuredOutput ? {
              atAGlanceSummary: circuit.structuredOutput.atAGlanceSummary ? {
                loadKw: circuit.structuredOutput.atAGlanceSummary.loadKw,
                loadIb: circuit.structuredOutput.atAGlanceSummary.loadIb,
                cable: circuit.structuredOutput.atAGlanceSummary.cable,
                protectiveDevice: circuit.structuredOutput.atAGlanceSummary.protectiveDevice,
                voltageDrop: circuit.structuredOutput.atAGlanceSummary.voltageDrop,
                zs: circuit.structuredOutput.atAGlanceSummary.zs,
                complianceTick: circuit.structuredOutput.atAGlanceSummary.complianceTick,
                notes: circuit.structuredOutput.atAGlanceSummary.notes
              } : undefined,
              sections: circuit.structuredOutput.sections
            } : undefined
          };
        }),
        projectInfo: jobInputs?.projectInfo || {
          projectName: 'Untitled Project',
          location: 'Not specified'
        },
        supply: jobInputs?.supply || {
          voltage: 230,
          phases: 'single',
          pfc: 16000,
          ze: 0.35,
          earthingSystem: 'TN-C-S'
        },
        // Transform supply into consumerUnit format with complete data mapping
        consumerUnit: {
          type: (jobInputs?.supply?.consumerUnitType as 'split-load' | 'high-integrity' | 'main-switch') || 'split-load',
          mainSwitchRating: jobInputs?.supply?.mainSwitchRating || 100,
          ways: jobDesignData.circuits?.length || 0,
          incomingSupply: {
            voltage: jobInputs?.supply?.voltage || 230,
            phases: (jobInputs?.supply?.phases as 'single' | 'three') || 'single',
            incomingPFC: jobInputs?.supply?.pfc || jobInputs?.supply?.pscc || 16,
            Ze: jobInputs?.supply?.ze || 0.35,
            earthingSystem: (jobInputs?.supply?.earthingSystem || jobInputs?.supply?.earthing as 'TN-S' | 'TN-C-S' | 'TT') || 'TN-C-S'
          }
        },
        projectName: jobInputs?.projectInfo?.projectName || 'Untitled Project',
        location: jobInputs?.projectInfo?.location || 'Not specified',
        clientName: jobInputs?.projectInfo?.clientName,
        electricianName: jobInputs?.projectInfo?.electricianName,
        installationType: (jobInputs?.projectInfo?.installationType as 'domestic' | 'commercial' | 'industrial') || 'domestic',
        // ✅ Pass through diversity values from backend (Phase 4.9 synced values)
        totalLoad: jobDesignData.totalLoad || jobDesignData?.circuits?.reduce((sum, c) => sum + (c.loadPower || 0), 0) || 0,
        diversifiedLoad: jobDesignData.diversifiedLoad || 0,
        diversityFactor: jobDesignData.diversityFactor || 0.65,
        // ✅ Calculate Total Design Ib from all circuits
        totalDesignCurrent: jobDesignData.circuits?.reduce((sum: number, c: any) => sum + (c.calculations?.Ib || c.designCurrent || 0), 0) || 0,
        diversityBreakdown: jobDesignData.diversityBreakdown || {
          totalConnectedLoad: jobDesignData.totalLoad || 0,
          diversifiedLoad: jobDesignData.diversifiedLoad || 0,
          overallDiversityFactor: jobDesignData.diversityFactor || 0.65,
          byCategory: [],
          reasoning: 'Calculated per BS 7671'
        },
        diversityApplied: false,
        materials: [],
        // CRITICAL: Add installation guidance from Design Installation Agent
        // This is the TOP-LEVEL guidance that drives the InstallationGuidancePerCircuitPanel
        installationGuidance: installationGuidance,
        // CRITICAL: Pass validation state to frontend
        validationPassed: jobDesignData.validationPassed,
        validationIssues: jobDesignData.validationIssues || [],
        autoFixSuggestions: jobDesignData.autoFixSuggestions || []
      };

      console.log('🔧 Design data mapped:', {
        circuitCount: designWithMetadata.circuits.length,
        firstCircuit: designWithMetadata.circuits[0]?.name,
        hasAtAGlance: !!designWithMetadata.circuits[0]?.structuredOutput?.atAGlanceSummary,
        hasExpectedTests: !!designWithMetadata.circuits[0]?.expectedTests,
        validationPassed: designWithMetadata.validationPassed,
        issueCount: designWithMetadata.validationIssues.length
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
          duration: 8000
        });
      } else {
        toast.success('Design generated successfully' + cacheInfo + autoFixInfo, {
          description: `${jobDesignData.circuits?.length || 0} circuit${(jobDesignData.circuits?.length || 0) !== 1 ? 's' : ''} designed${validationInfo}`
        });
      }
      
      // Mark toast as shown
      successToastShown.current = true;
    }
    
    if (status === 'failed' && error) {
      toast.error('Design generation failed', {
        description: error || 'Please try again'
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
        body: { jobId }
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

  const handleTaskAccept = (contextData: any, instruction: string | null) => {
    console.log('Task accepted from agent:', contextData, instruction);
    // TODO: Pre-fill form with data from other agents
  };

  return (
    <div className="space-y-4">
      {/* Agent Inbox */}
      <AgentInbox 
        currentAgent="designer"
        onTaskAccept={handleTaskAccept}
      />

      {currentView === 'input' && (
        <StructuredDesignWizard 
          onGenerate={handleGenerate}
          isProcessing={status === 'processing'}
        />
      )}

      {currentView === 'processing' && (
        <DesignProcessingView 
          progress={{ 
            stage: getStageFromProgress(progress), 
            percent: progress,
            message: currentStep || 'Processing...',
            designer_progress: job?.designer_progress || 0,
            designer_status: job?.designer_status || 'pending',
            installer_progress: job?.installer_progress || 0,
            installer_status: job?.installer_status || 'pending'
          }}
          userRequest={userRequest}
          totalCircuits={totalCircuits}
          onCancel={handleCancel}
        />
      )}

      {currentView === 'results' && designData && (
        <DesignReviewEditor 
          design={designData}
          onReset={handleRetry}
        />
      )}
    </div>
  );
};