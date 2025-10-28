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

    // 🔍 CRITICAL PRE-SAVE CHECKPOINT
    console.log('🔍 PRE-SAVE DETAILED ANALYSIS:', {
      totalRisksInMemory: ramsData.risks?.length,
      totalPPEInMemory: ramsData.ppeDetails?.length,
      first5Hazards: ramsData.risks?.slice(0, 5).map(r => r.hazard),
      last5Hazards: ramsData.risks?.slice(-5).map(r => r.hazard),
      middleHazards: ramsData.risks?.slice(10, 15).map(r => r.hazard),
      allRiskIds: ramsData.risks?.map(r => r.id)
    });

    // ✅ PHASE 6: Pre-save quality gate - prevent data loss
    const extractedHazardCount = (ramsData as any)._extractedHazardCount || ramsData.risks?.length || 0;
    const riskCount = ramsData.risks?.length || 0;
    const hazardLoss = extractedHazardCount > 0 ? (extractedHazardCount - riskCount) / extractedHazardCount : 0;
    
    if (hazardLoss > 0.2 && extractedHazardCount >= 10) {
      console.error('🚨 ABORTING SAVE - Detected >20% hazard loss', {
        extracted: extractedHazardCount,
        aboutToSave: riskCount,
        lossPercentage: `${(hazardLoss * 100).toFixed(1)}%`
      });
      
      toast({
        title: "Data loss prevented",
        description: `Cannot save - ${Math.round(hazardLoss * 100)}% of hazards would be lost. Please regenerate.`,
        variant: "destructive"
      });
      
      setIsSaving(false);
      return;
    }

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

      // 🚨 FINAL CHECKPOINT - Ensure payload has all risks
      console.log('🚨 FINAL DATABASE PAYLOAD CHECKPOINT:', {
        risksInPayload: (ramsPayload.risks as any)?.length,
        expectedMinimum: 20,
        payloadFirst3: (ramsPayload.risks as any)?.slice(0, 3).map((r: any) => r.hazard),
        payloadLast3: (ramsPayload.risks as any)?.slice(-3).map((r: any) => r.hazard),
        aboutToSaveToDatabase: true
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

      // ✅ PHASE 6: Post-save verification
      if (savedDocId && !isAutosave) {
        const { data: savedDoc, error: verifyError } = await supabase
          .from('rams_documents')
          .select('risks, ppe_details')
          .eq('id', savedDocId)
          .single();
        
        if (!verifyError && savedDoc) {
          const savedRiskCount = (savedDoc.risks as any)?.length || 0;
          const expectedRiskCount = riskCount;
          const postSaveLoss = expectedRiskCount > 0 ? (expectedRiskCount - savedRiskCount) / expectedRiskCount : 0;
          
          if (postSaveLoss > 0.2) {
            console.error('🚨 POST-SAVE VERIFICATION FAILED', {
              expected: expectedRiskCount,
              saved: savedRiskCount,
              lossPercentage: `${(postSaveLoss * 100).toFixed(1)}%`
            });
            
            toast({
              title: "Data integrity issue",
              description: `Only ${savedRiskCount}/${expectedRiskCount} risks were saved. Document may be incomplete.`,
              variant: "destructive"
            });
          } else {
            console.log(`✅ Post-save verification passed: ${savedRiskCount} risks saved`);
          }
        }
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
    maxRetries = 3  // Increased from 2 to 3 for better reliability
  ): Promise<{ data: any; error: any }> => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 Attempt ${attempt}/${maxRetries} for ${functionName}`);
        
        // Wrap the supabase invoke call with a timeout
        const invokePromise = supabase.functions.invoke(functionName, { body });
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timed out after 8 minutes')), 480000)
        );
        
        const { data, error } = await Promise.race([
          invokePromise,
          timeoutPromise
        ]) as { data: any; error: any };
        
        // NEW: Validate result has actual hazards (not just success=true)
        if (!error && data?.success) {
          const hazardCount = data?.structuredData?.riskAssessment?.hazards?.length || 
                             data?.riskAssessment?.hazards?.length || 0;
          
          if (hazardCount >= 8) {  // Minimum acceptable hazard count
            console.log(`✅ ${functionName} succeeded on attempt ${attempt} with ${hazardCount} hazards`);
            return { data, error: null };
          } else if (hazardCount > 0) {
            console.warn(`⚠️ ${functionName} returned only ${hazardCount} hazards (expected 15+)`);
            if (attempt === maxRetries) {
              // Last attempt - accept what we got
              console.log(`✅ Accepting partial result on final attempt: ${hazardCount} hazards`);
              return { data, error: null };
            }
            // Otherwise retry for better results
            console.log(`🔄 Retrying for more complete results...`);
          } else {
            console.warn(`⚠️ ${functionName} returned success but no hazards - retrying`);
          }
        }
        
        // Exponential backoff before retry
        if (attempt < maxRetries) {
          const backoffMs = Math.min(1000 * Math.pow(2, attempt - 1), 5000); // 1s, 2s, 4s (capped at 5s)
          console.log(`⏳ Waiting ${backoffMs}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, backoffMs));
        } else {
          console.error(`❌ ${functionName} failed after ${maxRetries} attempts`, { error, data });
        }
      } catch (timeoutError) {
        console.error(`❌ ${functionName} timed out on attempt ${attempt}`, timeoutError);
        if (attempt < maxRetries) {
          const backoffMs = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
          console.log(`⏳ Waiting ${backoffMs}ms before retry after timeout...`);
          await new Promise(resolve => setTimeout(resolve, backoffMs));
        } else {
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
    // Clear stale state before starting fresh generation
    setRamsData(null);
    setMethodData(null);
    setRawHSResponse(null);
    setRawInstallerResponse(null);
    setDocumentId(null);
    
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

      // STEP 3: Health check - fail fast if edge function is down (5 second timeout)
      try {
        console.log('🏥 Checking edge function health...');
        const healthCheckPromise = supabase.functions.invoke('health-safety-v3', {
          body: { mode: 'health-check' }
        });
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Health check timeout after 5 seconds')), 5000)
        );
        
        const healthCheck: any = await Promise.race([healthCheckPromise, timeoutPromise]);
        
        if (!healthCheck?.data || healthCheck.error) {
          console.error('❌ Health check failed:', {
            hasData: !!healthCheck?.data,
            error: healthCheck?.error,
            data: healthCheck?.data
          });
          throw new Error('AI system is offline - edge function not responding');
        }
        console.log('✅ Health check passed:', healthCheck.data);
      } catch (healthError) {
        console.error('❌ Health check failed:', healthError);
        toast({
          title: "⚠️ AI System Unavailable",
          description: "The AI risk assessment system is currently offline. Using basic hazard template instead.",
          variant: "destructive",
          duration: 10000
        });
        // Will fall through to AI call which will timeout and trigger fallback
      }

      const { data: hsData, error: hsError } = await callAgentWithRetry('health-safety-v3', {
        query: `Create a detailed risk assessment for the following electrical work: ${jobDescription}. Include specific hazards, risk ratings (likelihood and severity), and control measures.`,
        workType: jobScale
      });

      // CRITICAL: Log COMPLETE raw response to find exact path
      console.log('🔍 COMPLETE RAW RESPONSE FROM EDGE FUNCTION:', {
        typeOfHsData: typeof hsData,
        isNull: hsData === null,
        isUndefined: hsData === undefined,
        topLevelKeys: hsData ? Object.keys(hsData) : 'NO KEYS',
        fullResponse: JSON.stringify(hsData, null, 2), // FULL response, not truncated
        // Check ALL possible nesting levels
        paths: {
          'direct.success': hsData?.success,
          'direct.structuredData': !!hsData?.structuredData,
          'direct.structuredData.riskAssessment': !!hsData?.structuredData?.riskAssessment,
          'direct.structuredData.riskAssessment.hazards': hsData?.structuredData?.riskAssessment?.hazards?.length,
          'wrapped.data.success': hsData?.data?.success,
          'wrapped.data.structuredData.riskAssessment.hazards': hsData?.data?.structuredData?.riskAssessment?.hazards?.length,
          'wrapped.response.structuredData.riskAssessment.hazards': hsData?.response?.structuredData?.riskAssessment?.hazards?.length,
        }
      });

      if (abortControllerRef.current?.signal.aborted) {
        throw new Error('Generation cancelled');
      }

      // Health & Safety data will be validated and potentially replaced below
      
      // More specific error detection with enhanced diagnostics
      let mutableHsError = hsError; // Create mutable copy since hsError is const
      if (mutableHsError) {
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

        // Enhanced error detection for edge function crashes
        const is500Error = mutableHsError.message?.includes('500') || 
                          mutableHsError.message?.includes('Internal Server Error') ||
                          mutableHsError.name === 'FunctionsHttpError';
        
        if (is500Error) {
          console.error('🚨 EDGE FUNCTION CRASH DETECTED:', {
            error: mutableHsError,
            likelyBug: 'Edge function crashed after AI completed - check edge function logs',
            solution: 'Fix edge function bug, AI is generating data correctly'
          });
          
          toast({
            title: "⚠️ Backend Error",
            description: "AI generated risk assessment successfully but server crashed. This is a known bug being fixed.",
            variant: "destructive",
            duration: 10000
          });
        }
      }
      
      if (!hsData) {
        console.error('❌ Health & Safety returned no data', {
          hadError: !!hsError,
          errorType: hsError?.name
        });
      }
      
      // STEP 1: Add comprehensive response logging with COMPLETE structure
      console.log('🔍 RAW EDGE FUNCTION RESPONSE - DEEP INSPECTION:', {
        topLevelKeys: Object.keys(hsData || {}),
        hasStructuredData: !!hsData?.structuredData,
        hasRiskAssessment: !!hsData?.structuredData?.riskAssessment,
        hasHazardsArray: Array.isArray(hsData?.structuredData?.riskAssessment?.hazards),
        hazardCount: hsData?.structuredData?.riskAssessment?.hazards?.length || 0,
        // Show EVERY possible nesting level
        nestedPaths: {
          'hsData.hazards': hsData?.hazards?.length,
          'hsData.riskAssessment.hazards': hsData?.riskAssessment?.hazards?.length,
          'hsData.structuredData.hazards': hsData?.structuredData?.hazards?.length,
          'hsData.structuredData.riskAssessment.hazards': hsData?.structuredData?.riskAssessment?.hazards?.length,
          'hsData.response.structuredData.riskAssessment.hazards': hsData?.response?.structuredData?.riskAssessment?.hazards?.length,
          'hsData.data.structuredData.riskAssessment.hazards': hsData?.data?.structuredData?.riskAssessment?.hazards?.length,
        },
        fullStructure: JSON.stringify(hsData, null, 2).substring(0, 3000), // Increased to 3000 chars
        firstHazardSample: hsData?.structuredData?.riskAssessment?.hazards?.[0]
      });
      
      if (hsData && !hsData.success) {
        console.error('❌ Health & Safety returned success:false', {
          responseKeys: Object.keys(hsData),
          hasStructuredData: !!hsData.structuredData,
          hasRiskAssessment: !!hsData.structuredData?.riskAssessment,
          structuredDataKeys: hsData.structuredData ? Object.keys(hsData.structuredData) : []
        });
      }
      
      // STEP 2: Unwrap response if it's wrapped in extra layer + comprehensive path checking
      // Supabase functions.invoke() returns edge function response directly in `data`
      // But edge function might wrap its own response
      let unwrappedData = hsData;
      
      // Check if response is wrapped in extra layers
      if (hsData?.data && typeof hsData.data === 'object') {
        console.log('🔓 Detected wrapped response - unwrapping hsData.data');
        unwrappedData = hsData.data;
      } else if (hsData?.response && typeof hsData.response === 'object') {
        console.log('🔓 Detected wrapped response - unwrapping hsData.response');
        unwrappedData = hsData.response;
      }

      const extractHazards = (responseData: any): any[] => {
        // Try ALL possible paths where hazards might be nested
        const possiblePaths = [
          responseData?.structuredData?.riskAssessment?.hazards,           // Standard path
          responseData?.data?.structuredData?.riskAssessment?.hazards,     // Wrapped in .data
          responseData?.response?.structuredData?.riskAssessment?.hazards, // Wrapped in .response
          responseData?.riskAssessment?.hazards,                           // Direct riskAssessment
          responseData?.hazards,                                           // Direct hazards array
          responseData?.structuredData?.hazards,                           // structuredData.hazards
        ];
        
        console.log('🔍 Checking all possible hazard paths:', {
          paths: possiblePaths.map((p, i) => ({
            index: i,
            isArray: Array.isArray(p),
            length: Array.isArray(p) ? p.length : 0,
            sample: Array.isArray(p) && p.length > 0 ? p[0]?.hazard?.substring(0, 40) : null
          })),
          responseKeys: Object.keys(responseData || {})
        });
        
        // Find first non-empty array
        let hazards: any[] = [];
        for (let i = 0; i < possiblePaths.length; i++) {
          const path = possiblePaths[i];
          if (Array.isArray(path) && path.length > 0) {
            console.log(`✅ Found ${path.length} hazards at path index ${i}`);
            hazards = path;
            break;
          }
        }
        
        if (hazards.length === 0) {
          console.error('❌ No hazards found in ANY path', {
            checkedPaths: possiblePaths.length,
            fullResponseSample: JSON.stringify(responseData)?.substring(0, 1000)
          });
          return [];
        }
        
        // Accept ALL hazards - linkedToStep is optional metadata
        const validHazards = hazards.filter(h => {
          const hasHazard = h.hazard && typeof h.hazard === 'string';
          const hasLikelihood = typeof h.likelihood === 'number';
          const hasSeverity = typeof h.severity === 'number';
          
          if (!hasHazard || !hasLikelihood || !hasSeverity) {
            console.warn('⚠️ Hazard missing required fields:', {
              hazard: h.hazard?.substring(0, 50),
              hasHazard,
              hasLikelihood,
              hasSeverity
            });
            return false;
          }
          
          // Set default linkedToStep if missing
          if (typeof h.linkedToStep !== 'number') {
            h.linkedToStep = 0; // 0 = general risk, not linked to specific step
          }
          
          return true;
        });
        
        console.log(`✅ Extracted ${validHazards.length}/${hazards.length} hazards with required fields`);
        
        return validHazards;
      };

      // Extract hazards from unwrapped data
      const extractedHazards = extractHazards(unwrappedData);
      const hasValidHazards = extractedHazards.length > 0;

      // Detailed extraction diagnostics
      console.log('🔍 EXTRACTION DIAGNOSTICS:', {
        totalInResponse: unwrappedData?.structuredData?.riskAssessment?.hazards?.length || 0,
        extracted: extractedHazards.length,
        retentionRate: unwrappedData?.structuredData?.riskAssessment?.hazards?.length > 0
          ? `${((extractedHazards.length / unwrappedData.structuredData.riskAssessment.hazards.length) * 100).toFixed(0)}%`
          : 'N/A',
        samplesExtracted: extractedHazards.slice(0, 3).map(h => ({
          hazard: h.hazard?.substring(0, 40),
          linkedToStep: h.linkedToStep,
          likelihood: h.likelihood,
          severity: h.severity
        })),
        samplesFiltered: unwrappedData?.structuredData?.riskAssessment?.hazards
          ?.filter((h: any) => !extractedHazards.find((e: any) => e.hazard === h.hazard))
          ?.slice(0, 3)
          .map((h: any) => ({
            hazard: h.hazard?.substring(0, 40),
            linkedToStep: h.linkedToStep,
            reason: !h.hazard ? 'missing hazard' : 
                    typeof h.likelihood !== 'number' ? 'missing likelihood' :
                    typeof h.severity !== 'number' ? 'missing severity' : 'unknown'
          })) || []
      });

      console.log('🎯 EXTRACTION RESULTS AFTER UNWRAPPING:', {
        extractedCount: extractedHazards.length,
        hasValidHazards,
        unwrappedDataSuccess: unwrappedData?.success,
        originalDataSuccess: hsData?.success,
        hasError: !!hsError,
        willUseAIData: hasValidHazards,
      });

      // Use unwrapped data for the rest of processing
      let hsDataToUse = unwrappedData;
      let shouldUseFallback = false;

      // ✅ STRENGTHENED: Never use fallback if we have ANY valid AI hazards (1+)
      if (extractedHazards.length >= 1) {
        console.log(`✅ USING AI-GENERATED DATA - ${extractedHazards.length} valid hazards found`);
        console.log('🎯 AI data preserved - no fallback will be triggered');
        hsDataToUse = unwrappedData;
        
        // Ensure success flag is set
        if (!hsDataToUse.success) {
          hsDataToUse = { ...hsDataToUse, success: true };
        }
        
        // Never use fallback when we have valid data
        shouldUseFallback = false;
        mutableHsError = null; // Clear errors since we have valid data
      } else {
        console.warn(`⚠️ NO HAZARDS EXTRACTED - WILL ATTEMPT CACHE OR FALLBACK`);
        console.log('🔍 Fallback trigger reason:', {
          extractedCount: 0,
          hasValidHazards: false,
          hasError: !!hsError,
          willAttemptCache: true
        });
        // STEP 3: Poll for cached response if timeout occurred
        const pollForCachedResponse = async (): Promise<any | null> => {
          console.log('🔄 Polling ai_response_cache for completed response...');
          try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return null;

            // Check cache for recent completed responses
            const { data: cachedResults } = await supabase
              .from('ai_response_cache')
              .select('*')
              .gte('timestamp', new Date(Date.now() - 600000).toISOString()) // Last 10 minutes
              .order('timestamp', { ascending: false })
              .limit(5);

            if (cachedResults && cachedResults.length > 0) {
              for (const cached of cachedResults) {
                if (cached.response && typeof cached.response === 'object') {
                  const responseObj = cached.response as any;
                  // Check multiple possible paths for hazards
                  const hazards = responseObj?.structuredData?.riskAssessment?.hazards ||
                                 responseObj?.riskAssessment?.hazards;
                  
                  if (Array.isArray(hazards) && hazards.length >= 8) {
                    console.log(`✅ Found cached response with ${hazards.length} hazards`);
                    // Ensure hazards are at both levels for compatibility
                    const normalizedResponse = {
                      success: true,
                      ...responseObj,
                      riskAssessment: responseObj.riskAssessment || responseObj.structuredData?.riskAssessment,
                      structuredData: {
                        ...(responseObj.structuredData || {}),
                        riskAssessment: responseObj.structuredData?.riskAssessment || responseObj.riskAssessment
                      }
                    };
                    return normalizedResponse;
                  }
                }
              }
              console.log('⚠️ Cache checked but no responses with sufficient hazards found');
            } else {
              console.log('⚠️ No cached results found in last 10 minutes');
            }
          } catch (err) {
            console.error('Cache poll error:', err);
          }
          return null;
        };

        // Validate data before triggering fallback
        if (mutableHsError) {
          const isTimeout = mutableHsError.message?.toLowerCase().includes('timeout');
          
          if (isTimeout) {
            console.warn('⏱️ Timeout detected - checking for valid data and cache...');
            
            // ✅ FIX: Use AI data if we have ANY valid hazards (not just >= 8)
            if (hasValidHazards) {
              console.log(`✅ Valid data received despite timeout - using ALL ${extractedHazards.length} AI hazards`);
              hsDataToUse = hsData;
              shouldUseFallback = false;
              mutableHsError = null;
              toast({
                title: "Network unstable",
                description: `Risk assessment completed successfully with ${extractedHazards.length} hazards despite connection issues`,
              });
            } else {
              // Try to get cached response
              const cachedData = await pollForCachedResponse();
              if (cachedData) {
                console.log('✅ Using cached response from database');
                hsDataToUse = cachedData;
                shouldUseFallback = false;
                mutableHsError = null;
                toast({
                  title: "Retrieved from cache",
                  description: "Risk assessment recovered from recent generation",
                });
              } else {
                shouldUseFallback = true;
              }
            }
          } else {
            // ✅ FIX: Non-timeout error - use AI data if we have ANY hazards
            if (hasValidHazards) {
              console.warn(`⚠️ Network error but valid data received - using ALL ${extractedHazards.length} AI hazards, ignoring error`);
              hsDataToUse = hsData;
              shouldUseFallback = false;
              mutableHsError = null;
            } else {
              shouldUseFallback = true;
            }
          }
        } else if (!hsData || (!hasValidHazards && !hsData.success)) {
          // Only trigger fallback if truly no data
          shouldUseFallback = true;
        }
      }

      // STEP 2 & 5: Only trigger fallback when truly no data available
      if (shouldUseFallback) {
        console.error('🚨 CRITICAL: USING FALLBACK DATA - AI GENERATION FAILED', { 
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

        // STEP 5: Prominent warning that fallback data is being used
        toast({
          title: "AI Generation Timed Out",
          description: "GPT-5 Mini took longer than 2 minutes to generate your specific hazards. Showing 8 generic electrical hazards as a starting point.\n\nWhat you can do:\n• Click 'Regenerate' button to try again\n• Manually add your job-specific hazards using the form\n• Edit the generic hazards to match your specific work\n\nThis is NOT a comprehensive assessment for your job!",
          variant: "destructive",
          duration: 20000
        });
        
        // STEP 5: Enhanced fallback with 8 comprehensive hazards
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
                },
                {
                  hazard: "Work at height from ladders/scaffolds",
                  risk: "Falls causing serious injury",
                  likelihood: 3,
                  severity: 4,
                  controls: ["Edge protection", "Harness if required", "3-point contact", "Inspect equipment before use"]
                },
                {
                  hazard: "Asbestos in building materials",
                  risk: "Respiratory disease from fibre exposure",
                  likelihood: 2,
                  severity: 5,
                  controls: ["Pre-demolition survey", "Licensed asbestos removal", "RPE if disturbed", "Wet methods"]
                },
                {
                  hazard: "Confined spaces (ducting/voids)",
                  risk: "Asphyxiation or entrapment",
                  likelihood: 2,
                  severity: 5,
                  controls: ["Atmosphere testing", "Forced ventilation", "Emergency rescue plan", "Permit to work"]
                },
                {
                  hazard: "Vehicle movements on site",
                  risk: "Struck by moving vehicles",
                  likelihood: 3,
                  severity: 4,
                  controls: ["Segregated walkways", "Hi-vis clothing", "Banksman for reversing", "Site speed limits"]
                },
                {
                  hazard: "Fire risk from hot works/electrical faults",
                  risk: "Burns and smoke inhalation",
                  likelihood: 2,
                  severity: 4,
                  controls: ["Fire extinguishers available", "Hot work permit", "Fire watch", "Clear combustibles"]
                }
              ],
              ppe: ["Safety helmet to BS EN 397", "Safety boots to BS EN 20345", "Hi-vis vest to BS EN ISO 20471", "Insulated gloves to BS EN 60903", "Safety glasses to BS EN 166", "Hearing protection to BS EN 352", "Respiratory protection to BS EN 149", "Arc-rated PPE to IEC 61482"],
              emergencyProcedures: ["Isolate power in emergency", "Call 999 for electric shock", "First aid kit location known", "Assembly point identified", "Nearest hospital: [To be confirmed]"]
            }
          }
        };
        
        // STEP 5: Show prominent warning toast
        toast({
          title: "⚠️ Using basic risk assessment",
          description: "AI generation timed out - 8 common electrical hazards provided. Consider regenerating for job-specific assessment.",
          variant: "destructive",
        });
        
        // STEP 5: Log fallback usage to edge function
        try {
          await supabase.functions.invoke('health-safety-v3', {
            body: {
              logFallbackUsage: true,
              query: jobDescription,
              reason: hsError?.message || 'No valid response',
              timestamp: new Date().toISOString()
            }
          });
        } catch (logError) {
          console.error('Failed to log fallback usage:', logError);
        }
        
        setReasoningSteps(prev => prev.map(step => 
          step.agent === 'health-safety' 
            ? { ...step, status: 'complete', reasoning: 'Using enhanced fallback electrical hazards (8 hazards)', subStep: null, timeElapsed: Math.round((Date.now() - hsStartTime) / 1000) }
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
      
      // STEP 3: Defensive check before transformer - ensure we're not passing fallback data
      const finalHazardCheck = extractHazards(hsDataToUse);
      if (finalHazardCheck.length < 8 && extractedHazards.length >= 8) {
        console.warn('⚠️ hsDataToUse has fewer hazards than original - RESTORING AI DATA');
        hsDataToUse = hsData; // Restore original AI data
      }

      console.log('🔄 Pre-transformation validation:', {
        hazardsBeingPassed: finalHazardCheck.length,
        willUseAIData: finalHazardCheck.length >= 8,
        originalHazardCount: extractedHazards.length
      });
      
      const combinedData = combineAgentOutputsToRAMS(
        hsDataToUse,
        installerData,
        {
          ...projectInfo,
          date: new Date().toISOString()
        }
      );

      // STEP 5: Enhanced quality gate - detect hazard loss
      console.log('✅ RAMS transformation complete:', {
        ramsRisks: combinedData.ramsData?.risks?.length || 0,
        methodSteps: combinedData.methodData?.steps?.length || 0,
        extractedHazards: extractedHazards.length
      });

      // 🎯 CRITICAL CHECKPOINT - Verify risks before state update
      console.log('🎯 POST-TRANSFORMATION CHECKPOINT:', {
        risksInCombinedData: combinedData.ramsData?.risks?.length,
        expectedMinimum: 20,
        hazardsExtracted: extractedHazards.length,
        matchesExpectation: (combinedData.ramsData?.risks?.length || 0) >= 20,
        first3Risks: combinedData.ramsData?.risks?.slice(0, 3).map(r => r.hazard),
        last3Risks: combinedData.ramsData?.risks?.slice(-3).map(r => r.hazard)
      });

      // Verify we didn't lose more than 20% of hazards in transformation
      const hazardRetentionRate = extractedHazards.length > 0 
        ? (combinedData.ramsData?.risks?.length || 0) / extractedHazards.length 
        : 1;
      
      if (hazardRetentionRate < 0.8 && extractedHazards.length >= 5) {
        console.error('❌ CRITICAL: Significant hazard loss during transformation!', {
          extractedFromAI: extractedHazards.length,
          afterTransformation: combinedData.ramsData?.risks?.length || 0,
          lostHazards: extractedHazards.length - (combinedData.ramsData?.risks?.length || 0),
          retentionRate: `${(hazardRetentionRate * 100).toFixed(1)}%`,
          threshold: '80%'
        });
        
        toast({
          title: "Data loss detected",
          description: `Only ${combinedData.ramsData?.risks?.length} of ${extractedHazards.length} hazards preserved (${(hazardRetentionRate * 100).toFixed(0)}%). Please report this issue.`,
          variant: "destructive"
        });
      }

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
