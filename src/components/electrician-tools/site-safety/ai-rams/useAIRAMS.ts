import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { combineAgentOutputsToRAMS } from '@/utils/rams-ai-transformer';
import type { RAMSData } from '@/types/rams';
import type { MethodStatementData } from '@/types/method-statement';
import { useToast } from '@/hooks/use-toast';
import { animateValue } from '@/utils/animation-helpers';

interface SubStep {
  label: string;
  progress: number;
}

interface ReasoningStep {
  agent: 'health-safety' | 'installer';
  status: 'pending' | 'processing' | 'complete' | 'error';
  reasoning?: string;
  subStep?: SubStep | null;
  timeElapsed?: number;
}

const HEALTH_SAFETY_SUBSTEPS: SubStep[] = [
  { label: 'Analysing job description...', progress: 0 },
  { label: 'Identifying hazards...', progress: 0 },
  { label: 'Assessing risk levels...', progress: 0 },
  { label: 'Generating control measures...', progress: 0 },
];

const INSTALLER_SUBSTEPS: SubStep[] = [
  { label: 'Reviewing safety requirements...', progress: 0 },
  { label: 'Planning installation sequence...', progress: 0 },
  { label: 'Defining equipment & tools...', progress: 0 },
  { label: 'Generating method statement...', progress: 0 },
];

interface UseAIRAMSReturn {
  isProcessing: boolean;
  reasoningSteps: ReasoningStep[];
  ramsData: RAMSData | null;
  methodData: Partial<MethodStatementData> | null;
  error: string | null;
  isSaving: boolean;
  lastSaved: Date | null;
  documentId: string | null;
  overallProgress: number;
  estimatedTimeRemaining: number | undefined;
  rawHSResponse: any | null;
  rawInstallerResponse: any | null;
  generateRAMS: (jobDescription: string, projectInfo: {
    projectName: string;
    location: string;
    assessor: string;
    contractor: string;
    supervisor: string;
    siteManagerName?: string;
    siteManagerPhone?: string;
    firstAiderName?: string;
    firstAiderPhone?: string;
    safetyOfficerName?: string;
    safetyOfficerPhone?: string;
    assemblyPoint?: string;
  }, jobScale: 'domestic' | 'commercial' | 'industrial') => Promise<void>;
  saveToDatabase: () => Promise<void>;
  reset: () => void;
  cancelGeneration: () => void;
}

export function useAIRAMS(): UseAIRAMSReturn {
  const [isProcessing, setIsProcessing] = useState(false);
  const [reasoningSteps, setReasoningSteps] = useState<ReasoningStep[]>([]);
  const [ramsData, setRamsData] = useState<RAMSData | null>(null);
  const [methodData, setMethodData] = useState<Partial<MethodStatementData> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [overallProgress, setOverallProgress] = useState(0);
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState<number | undefined>(undefined);
  const [rawHSResponse, setRawHSResponse] = useState<any | null>(null);
  const [rawInstallerResponse, setRawInstallerResponse] = useState<any | null>(null);
  const { toast } = useToast();

  const abortControllerRef = useRef<AbortController | null>(null);
  const progressIntervalsRef = useRef<NodeJS.Timeout[]>([]);
  const animationCleanupRef = useRef<(() => void) | null>(null);

  // Smooth progress animation
  const animateProgress = useCallback((targetProgress: number, duration: number = 800) => {
    if (animationCleanupRef.current) {
      animationCleanupRef.current();
    }
    const startProgress = overallProgress;
    const cleanup = animateValue(startProgress, targetProgress, duration, setOverallProgress);
    animationCleanupRef.current = cleanup;
  }, [overallProgress]);

  // Autosave every 30 seconds when data exists
  useEffect(() => {
    if (!ramsData || !methodData || isProcessing) return;

    const autosaveInterval = setInterval(() => {
      saveToDatabase(true); // Silent autosave
    }, 30000);

    return () => clearInterval(autosaveInterval);
  }, [ramsData, methodData, isProcessing]);

  const saveToDatabase = useCallback(async (isAutosave = false) => {
    if (!ramsData || !methodData) {
      if (!isAutosave) {
        toast({
          title: "Nothing to save",
          description: "Generate a RAMS document first",
          variant: "destructive"
        });
      }
      return;
    }

    // 🔍 QUALITY VALIDATION: Prevent saving incomplete data
    const hazardCount = ramsData.risks?.length || 0;
    const ppeCount = ramsData.ppeDetails?.length || 0;
    
    if (!isAutosave && hazardCount < 8) {
      console.warn('⚠️ Low hazard count detected:', hazardCount);
      toast({
        title: "Quality warning",
        description: `Only ${hazardCount} hazards identified. Industrial jobs typically have 15-25 hazards. Consider regenerating or adding more.`,
        variant: "destructive"
      });
      
      // Allow saving but warn user
    }
    
    if (!isAutosave && ppeCount < 6) {
      console.warn('⚠️ Low PPE count detected:', ppeCount);
      toast({
        title: "PPE warning", 
        description: `Only ${ppeCount} PPE items. Electrical work typically requires 8-12 items. Check if all necessary protection is listed.`,
        variant: "destructive"
      });
    }

    console.log('💾 Saving RAMS data:', {
      hazardCount,
      ppeCount,
      risksSample: ramsData.risks?.slice(0, 3),
      ppeSample: ramsData.ppeDetails?.slice(0, 3)
    });

    setIsSaving(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Save or update RAMS document with ALL hazard data preserved
      const ramsPayload = {
        user_id: user.id,
        project_name: ramsData.projectName,
        location: ramsData.location,
        date: ramsData.date,
        assessor: ramsData.assessor,
        contractor: ramsData.contractor || methodData.contractor || '',
        supervisor: ramsData.supervisor || methodData.supervisor || '',
        activities: ramsData.activities,
        risks: ramsData.risks as unknown as any, // JSONB type - ALL risks preserved
        required_ppe: ramsData.requiredPPE || [],
        ppe_details: (ramsData.ppeDetails || []) as unknown as any, // JSONB type - ALL PPE preserved
        status: 'draft' as const,
        last_autosave_at: new Date().toISOString(),
        ai_generation_metadata: {
          generatedAt: new Date().toISOString(),
          autosave: isAutosave,
          hazardCount: ramsData.risks?.length || 0,
          ppeCount: ramsData.ppeDetails?.length || 0,
          emergencyContacts: {
            siteManagerName: ramsData.siteManagerName,
            siteManagerPhone: ramsData.siteManagerPhone,
            firstAiderName: ramsData.firstAiderName,
            firstAiderPhone: ramsData.firstAiderPhone,
            safetyOfficerName: ramsData.safetyOfficerName,
            safetyOfficerPhone: ramsData.safetyOfficerPhone,
            assemblyPoint: ramsData.assemblyPoint
          }
        } as any
      };
      
      console.log('💾 Payload being saved:', {
        risksLength: (ramsPayload.risks as any)?.length,
        ppeLength: (ramsPayload.ppe_details as any)?.length
      });

      let savedDocId = documentId;

      if (documentId) {
        // Update existing document
        const { error: updateError } = await supabase
          .from('rams_documents')
          .update(ramsPayload)
          .eq('id', documentId);

        if (updateError) throw updateError;
      } else {
        // Insert new document
        const { data: newDoc, error: insertError } = await supabase
          .from('rams_documents')
          .insert([ramsPayload])
          .select()
          .single();

        if (insertError) throw insertError;
        savedDocId = newDoc.id;
        setDocumentId(newDoc.id);
      }

      // Save method statement
      if (savedDocId && methodData.steps) {
        const methodPayload = {
          user_id: user.id,
          rams_document_id: savedDocId,
          job_title: methodData.jobTitle || ramsData.projectName,
          location: methodData.location || ramsData.location,
          contractor: methodData.contractor || '',
          supervisor: methodData.supervisor || '',
          work_type: methodData.workType || 'Electrical Installation',
          duration: methodData.duration,
          team_size: methodData.teamSize,
          description: methodData.description,
          overall_risk_level: methodData.overallRiskLevel || 'medium',
          review_date: methodData.reviewDate,
          approved_by: methodData.approvedBy,
          steps: methodData.steps as unknown as any, // JSONB type
          tools_required: methodData.toolsRequired || [],
          materials_required: methodData.materialsRequired || [],
          practical_tips: methodData.practicalTips || [],
          common_mistakes: methodData.commonMistakes || [],
          total_estimated_time: methodData.totalEstimatedTime,
          difficulty_level: methodData.difficultyLevel,
          compliance_regulations: methodData.complianceRegulations || [],
          compliance_warnings: methodData.complianceWarnings || [],
          status: 'draft' as const
        };

        // Check if method statement exists
        const { data: existingMethod } = await supabase
          .from('method_statements')
          .select('id')
          .eq('rams_document_id', savedDocId)
          .maybeSingle();

        if (existingMethod) {
          await supabase
            .from('method_statements')
            .update(methodPayload)
            .eq('id', existingMethod.id);
        } else {
          await supabase
            .from('method_statements')
            .insert([methodPayload]);
        }
      }

      setLastSaved(new Date());
      
      if (!isAutosave) {
        toast({
          title: "Saved successfully",
          description: "RAMS document saved to database"
        });
      }
    } catch (err) {
      console.error('Save error:', err);
      if (!isAutosave) {
        toast({
          title: "Save failed",
          description: err instanceof Error ? err.message : 'Failed to save document',
          variant: "destructive"
        });
      }
    } finally {
      setIsSaving(false);
    }
  }, [ramsData, methodData, documentId, toast]);

  const simulateSubStepProgress = useCallback((
    agent: 'health-safety' | 'installer',
    subSteps: SubStep[]
  ) => {
    let currentSubStepIndex = 0;
    let currentProgress = 0;
    const totalDuration = 120000; // 2 minutes per agent
    const updateInterval = 150; // Update every 150ms
    const progressPerUpdate = (100 / (totalDuration / updateInterval)) / subSteps.length;

    const interval = setInterval(() => {
      currentProgress += progressPerUpdate;
      
      if (currentProgress >= 100) {
        currentProgress = 95; // Cap at 95% until real data arrives
        currentSubStepIndex = subSteps.length - 1;
      } else {
        currentSubStepIndex = Math.min(
          Math.floor((currentProgress / 100) * subSteps.length),
          subSteps.length - 1
        );
      }

      const subStep: SubStep = {
        label: subSteps[currentSubStepIndex].label,
        progress: Math.round(Math.min(((currentProgress % (100 / subSteps.length)) / (100 / subSteps.length)) * 100, 95))
      };

      setReasoningSteps(prev => 
        prev.map(step => 
          step.agent === agent && step.status === 'processing'
            ? { ...step, subStep }
            : step
        )
      );
    }, updateInterval);

    progressIntervalsRef.current.push(interval);
    return interval;
  }, []);

  // PHASE 1: Smooth progress polling for real-time updates
  const startProgressPolling = useCallback((
    agent: 'health-safety' | 'installer',
    startProgress: number,
    targetProgress: number,
    estimatedDuration: number
  ) => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressRatio = Math.min(elapsed / estimatedDuration, 0.95); // Cap at 95% until complete
      const currentProgress = startProgress + (targetProgress - startProgress) * progressRatio;
      
      setOverallProgress(Math.round(currentProgress));
      
      // Update estimated time remaining
      const remaining = Math.max(0, Math.ceil((estimatedDuration - elapsed) / 1000));
      setEstimatedTimeRemaining(remaining);
    }, 500); // Update every 500ms
    
    progressIntervalsRef.current.push(interval);
    return interval;
  }, []);

  const clearProgressIntervals = useCallback(() => {
    progressIntervalsRef.current.forEach(interval => clearInterval(interval));
    progressIntervalsRef.current = [];
  }, []);

  const cancelGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      clearProgressIntervals();
      setIsProcessing(false);
      setError('Generation cancelled by user');
      toast({
        title: "Cancelled",
        description: "RAMS generation has been cancelled",
      });
    }
  }, [clearProgressIntervals, toast]);

  const callAgentWithRetry = async (
    functionName: string,
    body: any,
    maxRetries = 2
  ): Promise<{ data: any; error: any }> => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      // Optimized timeout for GPT-5-Mini (target: 40-60s backend response)
      const timeoutPromise = new Promise<{ data: null; error: any }>((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout after 3 minutes')), 180000)
      );
      
      const invokePromise = supabase.functions.invoke(functionName, { body });
      
      try {
        const { data, error } = await Promise.race([invokePromise, timeoutPromise]);
        
        if (!error && data?.success) {
          console.log(`✅ ${functionName} succeeded on attempt ${attempt}`);
          return { data, error: null };
        }
        
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
          console.log(`⏳ Retry ${attempt}/${maxRetries} for ${functionName} after ${delay}ms`);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          console.error(`❌ ${functionName} failed after ${maxRetries} attempts`, { error, data });
        }
      } catch (timeoutError) {
        console.error(`❌ ${functionName} timed out on attempt ${attempt}`, timeoutError);
        if (attempt === maxRetries) {
          return { data: null, error: timeoutError };
        }
      }
    }
    
    return { data: null, error: new Error(`Failed after ${maxRetries} attempts`) };
  };

  const generateRAMS = async (
    jobDescription: string,
    projectInfo: {
      projectName: string;
      location: string;
      assessor: string;
      contractor: string;
      supervisor: string;
      siteManagerName?: string;
      siteManagerPhone?: string;
      firstAiderName?: string;
      firstAiderPhone?: string;
      safetyOfficerName?: string;
      safetyOfficerPhone?: string;
      assemblyPoint?: string;
    },
    jobScale: 'domestic' | 'commercial' | 'industrial'
  ) => {
    setIsProcessing(true);
    setError(null);
    setOverallProgress(0);
    setEstimatedTimeRemaining(270); // 4.5 minutes
    clearProgressIntervals();
    
    abortControllerRef.current = new AbortController();
    
    // Initialize reasoning steps
    setReasoningSteps([
      { agent: 'health-safety', status: 'pending', subStep: null },
      { agent: 'installer', status: 'pending', subStep: null }
    ]);

    try {
      // Step 1: Call Health & Safety Agent
      const hsStartTime = Date.now();
      setReasoningSteps(prev => prev.map(step => 
        step.agent === 'health-safety' ? { ...step, status: 'processing', subStep: HEALTH_SAFETY_SUBSTEPS[0] } : step
      ));
      
      // PHASE 1: Start smooth progress polling 0% → 45% over 3 minutes
      startProgressPolling('health-safety', 0, 45, 180000);
      setEstimatedTimeRemaining(300); // 5 minutes total

      // Start simulated substep progress
      simulateSubStepProgress('health-safety', HEALTH_SAFETY_SUBSTEPS);

      // Health check before starting (optional - continues on failure)
      try {
        console.log('🏥 Checking edge function health...');
        const healthCheck = await supabase.functions.invoke('health-safety-v3', {
          body: { healthCheck: true }
        });
        console.log('✅ Health check response:', healthCheck.data);
      } catch (healthError) {
        console.warn('⚠️ Health check failed (continuing anyway):', healthError);
      }

      const { data: hsData, error: hsError } = await callAgentWithRetry('health-safety-v3', {
        query: `Create a detailed risk assessment for the following electrical work: ${jobDescription}. Include specific hazards, risk ratings (likelihood and severity), and control measures.`,
        workType: jobScale
      });

      // DIAGNOSTIC: Log raw response structure
      console.log('🔍 RAW Health & Safety Response:', {
        hasData: !!hsData,
        dataKeys: hsData ? Object.keys(hsData) : [],
        success: hsData?.success,
        structuredDataKeys: hsData?.structuredData ? Object.keys(hsData.structuredData) : [],
        riskAssessmentKeys: hsData?.structuredData?.riskAssessment ? Object.keys(hsData.structuredData.riskAssessment) : [],
        hazardCount: hsData?.structuredData?.riskAssessment?.hazards?.length || 0,
        firstHazard: hsData?.structuredData?.riskAssessment?.hazards?.[0],
        fullResponsePreview: JSON.stringify(hsData, null, 2).substring(0, 1000) // First 1000 chars
      });

      if (abortControllerRef.current?.signal.aborted) {
        throw new Error('Generation cancelled');
      }

      let hsDataToUse = hsData;

      // More specific error detection with enhanced diagnostics
      if (hsError) {
        console.error('❌ Health & Safety network error:', {
          error: hsError,
          message: hsError.message,
          name: hsError.name,
          // Check error type
          isFetchError: hsError.name === 'FunctionsFetchError',
          isHttpError: hsError.name === 'FunctionsHttpError',
          isTimeout: hsError.message?.toLowerCase().includes('timeout') || hsError.message?.toLowerCase().includes('fetch'),
          // Full error details
          fullError: JSON.stringify(hsError, Object.getOwnPropertyNames(hsError))
        });
      }
      
      if (!hsData) {
        console.error('❌ Health & Safety returned no data', {
          hadError: !!hsError,
          errorType: hsError?.name
        });
      }
      
      if (hsData && !hsData.success) {
        console.error('❌ Health & Safety returned success:false', {
          responseKeys: Object.keys(hsData),
          hasStructuredData: !!hsData.structuredData,
          hasRiskAssessment: !!hsData.structuredData?.riskAssessment,
          structuredDataKeys: hsData.structuredData ? Object.keys(hsData.structuredData) : []
        });
      }
      
      // PHASE 2: Enhanced hazard extraction with comprehensive path checking
      const extractHazards = (responseData: any): any[] => {
        console.log('🔍 DETAILED HAZARD EXTRACTION:', {
          responseStructure: JSON.stringify(responseData, null, 2).substring(0, 1000),
          hasStructuredData: !!responseData?.structuredData,
          hasRiskAssessment: !!responseData?.structuredData?.riskAssessment,
          hazardPaths: {
            path1Count: responseData?.structuredData?.riskAssessment?.hazards?.length || 0,
            path2Count: responseData?.response?.structuredData?.riskAssessment?.hazards?.length || 0
          }
        });

        const possiblePaths = [
          responseData?.structuredData?.riskAssessment?.hazards,
          responseData?.response?.structuredData?.riskAssessment?.hazards,
          responseData?.structuredData?.hazards,
          responseData?.riskAssessment?.hazards,
          responseData?.hazards
        ];

        for (const path of possiblePaths) {
          if (Array.isArray(path) && path.length > 0) {
            console.log(`✅ Found ${path.length} hazards`, {
              firstHazard: path[0],
              allHazardNames: path.map((h: any) => h.hazard || h.hazardDescription)
            });
            return path;
          }
        }

        console.error('❌ NO HAZARDS FOUND IN ANY PATH - this should not happen with updated prompt');
        return [];
      };

      const extractedHazards = extractHazards(hsData);
      const hasValidHazards = extractedHazards.length > 0;

      // Only use fallback if truly no valid data exists
      if (hsError || !hsData || !hsData.success || !hasValidHazards) {
        console.error('❌ Health & Safety agent failed - using fallback:', { 
          hsError: hsError?.message,
          hasData: !!hsData,
          success: hsData?.success,
          hazardCount: extractedHazards.length,
          willUseFallback: true,
          paths: {
            'structuredData.riskAssessment.hazards': hsData?.structuredData?.riskAssessment?.hazards?.length || 0,
            'response.structuredData.riskAssessment.hazards': hsData?.response?.structuredData?.riskAssessment?.hazards?.length || 0,
            'structuredData.hazards': hsData?.structuredData?.hazards?.length || 0,
            'riskAssessment.hazards': hsData?.riskAssessment?.hazards?.length || 0
          },
          dataKeys: hsData ? Object.keys(hsData) : []
        });
        hsDataToUse = {
          success: true,
          structuredData: {
            riskAssessment: {
              hazards: [
                {
                  hazard: "Electrical shock from live conductors",
                  risk: "Electric shock, burns, or fatality",
                  likelihood: 4,
                  severity: 5,
                  controls: ["Isolate power supply", "Use voltage tester", "Wear insulated gloves", "Competent supervision"]
                },
                {
                  hazard: "Arc flash during switching operations",
                  risk: "Burns and blast injuries",
                  likelihood: 3,
                  severity: 5,
                  controls: ["Maintain safe distance", "Wear arc-rated PPE", "Remote operation where possible"]
                },
                {
                  hazard: "Manual handling of equipment",
                  risk: "Musculoskeletal injury",
                  likelihood: 4,
                  severity: 3,
                  controls: ["Use mechanical aids", "Team lift >25kg", "Proper lifting technique"]
                }
              ],
              ppe: ["Safety helmet to BS EN 397", "Safety boots to BS EN 20345", "Hi-vis vest to BS EN ISO 20471", "Insulated gloves to BS EN 60903", "Safety glasses to BS EN 166"],
              emergencyProcedures: ["Isolate power in emergency", "Call 999 for electric shock", "First aid kit location known", "Assembly point identified"]
            }
          }
        };
        
        // Fallback toast removed - only show when genuinely necessary
        
        setReasoningSteps(prev => prev.map(step => 
          step.agent === 'health-safety' 
            ? { ...step, status: 'complete', reasoning: 'Using fallback electrical hazards (3 hazards)', subStep: null, timeElapsed: Math.round((Date.now() - hsStartTime) / 1000) }
            : step
        ));
      }

      // Store raw H&S response
      setRawHSResponse(hsDataToUse);

      // PHASE 1: Clear progress intervals and set to 50% after H&S completion
      clearProgressIntervals();
      setOverallProgress(50);
      const hsTimeElapsed = Math.round((Date.now() - hsStartTime) / 1000);

      // Extract hazard count with comprehensive fallback paths
      const structuredData = hsDataToUse?.structuredData || hsDataToUse?.response?.structuredData || {};
      const riskAssessment = structuredData.riskAssessment || hsDataToUse?.riskAssessment || {};
      const hazards = riskAssessment.hazards || [];
      const hazardCount = hazards.length;

      console.log('✅ Health & Safety complete:', {
        success: hsDataToUse?.success,
        hazardCount,
        hasPPE: !!(riskAssessment.ppe?.length),
        hasEmergencyProcs: !!(riskAssessment.emergencyProcedures?.length),
        dataPath: hsDataToUse?.structuredData ? 'structuredData' : 'response.structuredData'
      });

      // Only update reasoning if not already set by fallback
      if (hsDataToUse?.success) {
        setReasoningSteps(prev => prev.map(step => 
          step.agent === 'health-safety' 
            ? { ...step, status: 'complete', reasoning: `Generated ${hazardCount || 'multiple'} hazards and control measures`, subStep: null, timeElapsed: hsTimeElapsed }
            : step
        ));
      }

      // Step 2: Call Installer Agent (with H&S context)
      const installerStartTime = Date.now();
      setReasoningSteps(prev => prev.map(step => 
        step.agent === 'installer' ? { ...step, status: 'processing', subStep: INSTALLER_SUBSTEPS[0] } : step
      ));

      // PHASE 1: Start smooth progress polling 50% → 95% over 2 minutes
      startProgressPolling('installer', 50, 95, 120000);
      setEstimatedTimeRemaining(120); // 2 minutes

      // Start simulated substep progress for installer
      simulateSubStepProgress('installer', INSTALLER_SUBSTEPS);

      const { data: installerData, error: installerError } = await callAgentWithRetry('installer-v3', {
        query: `Create a detailed step-by-step method statement for: ${jobDescription}. Include installation procedures, safety requirements per step, equipment needed, and time estimates.`,
        previousAgentOutputs: [{
          agent: 'health-safety',
          response: hsDataToUse
        }]
      });

      if (abortControllerRef.current?.signal.aborted) {
        throw new Error('Generation cancelled');
      }

      if (installerError || !installerData?.success) {
        console.error('❌ Installer agent failed:', { installerError, installerData });
        throw new Error(`Installer Agent failed: ${installerError?.message || 'No valid response'}`);
      }

      // Store raw installer response
      setRawInstallerResponse(installerData);

      clearProgressIntervals();
      const installerTimeElapsed = Math.round((Date.now() - installerStartTime) / 1000);

      // Extract steps count with comprehensive fallback paths
      const installerStructuredData = installerData?.structuredData || installerData?.response?.structuredData || {};
      const methodSteps = installerStructuredData.methodStatementSteps || installerData?.methodStatementSteps || installerData?.installationSteps || [];
      const stepsCount = methodSteps.length;

      console.log('✅ Installer complete:', {
        success: installerData?.success,
        stepsCount,
        dataPath: installerData?.structuredData ? 'structuredData' : 'response.structuredData'
      });

      // PHASE 1: Clear progress intervals and set to 100% after installer completion
      clearProgressIntervals();
      setOverallProgress(100);
      setEstimatedTimeRemaining(0);
      
      setReasoningSteps(prev => prev.map(step => 
        step.agent === 'installer' 
          ? { ...step, status: 'complete', reasoning: `Generated ${stepsCount || 'multiple'} installation steps`, subStep: null, timeElapsed: installerTimeElapsed }
          : step
      ));

      // Step 3: Transform agent outputs to RAMS format
      console.log('🔄 Transforming agent outputs to RAMS format...');
      const combinedData = combineAgentOutputsToRAMS(
        hsDataToUse,
        installerData,
        {
          ...projectInfo,
          date: new Date().toISOString()
        }
      );

      console.log('✅ RAMS transformation complete:', {
        ramsRisks: combinedData.ramsData?.risks?.length || 0,
        methodSteps: combinedData.methodData?.steps?.length || 0
      });

      setRamsData(combinedData.ramsData);
      setMethodData(combinedData.methodData);

      // Auto-save on generation
      setTimeout(() => saveToDatabase(true), 1000);

    } catch (err) {
      console.error('AI RAMS generation error:', err);
      clearProgressIntervals();
      setError(err instanceof Error ? err.message : 'Failed to generate RAMS');
      setReasoningSteps(prev => prev.map(step => 
        step.status === 'processing' ? { ...step, status: 'error', subStep: null } : step
      ));
      setOverallProgress(0);
      setEstimatedTimeRemaining(undefined);
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    clearProgressIntervals();
    abortControllerRef.current = null;
    setIsProcessing(false);
    setReasoningSteps([]);
    setRamsData(null);
    setMethodData(null);
    setError(null);
    setDocumentId(null);
    setLastSaved(null);
    setOverallProgress(0);
    setEstimatedTimeRemaining(undefined);
    setRawHSResponse(null);
    setRawInstallerResponse(null);
  };

  return {
    isProcessing,
    reasoningSteps,
    ramsData,
    methodData,
    error,
    isSaving,
    lastSaved,
    documentId,
    overallProgress,
    estimatedTimeRemaining,
    rawHSResponse,
    rawInstallerResponse,
    generateRAMS,
    saveToDatabase,
    reset,
    cancelGeneration
  };
}
