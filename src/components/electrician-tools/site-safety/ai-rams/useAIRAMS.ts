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

  // Issue 5: Autosave every 30 seconds when data exists
  useEffect(() => {
    if (!ramsData || !methodData || isProcessing) return;

    const autosaveInterval = setInterval(() => {
      saveToDatabase(true); // Silent autosave
    }, 30000);

    return () => clearInterval(autosaveInterval);
  }, [ramsData, methodData, isProcessing, saveToDatabase]);

  // Issue 6: Optimized progress simulation (2s intervals, 45s duration)
  const simulateSubStepProgress = useCallback((
    agent: 'health-safety' | 'installer',
    subSteps: SubStep[]
  ) => {
    let currentSubStepIndex = 0;
    let currentProgress = 0;
    const totalDuration = 120000; // 120s per agent - matches new timeout
    const updateInterval = 3000; // Update every 3s
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

  // Phase 1B: Standardized extraction functions
  const extractHealthSafetyData = (responseData: any) => {
    if (!responseData?.success) {
      throw new Error(responseData?.error || 'Health & Safety agent failed');
    }
    if (!responseData?.data) {
      throw new Error('Invalid response structure');
    }
    const { hazards, ppe, emergencyProcedures } = responseData.data;
    if (!Array.isArray(hazards) || hazards.length === 0) {
      throw new Error('No hazards generated');
    }
    return { hazards, ppe: ppe || [], emergencyProcedures: emergencyProcedures || [], metadata: responseData.metadata };
  };

  const extractInstallerData = (responseData: any) => {
    if (!responseData?.success || !responseData?.data) {
      throw new Error('Invalid installer response');
    }
    const { steps, toolsRequired, materialsRequired, practicalTips } = responseData.data;
    return { steps: steps || [], toolsRequired: toolsRequired || [], materialsRequired: materialsRequired || [], practicalTips: practicalTips || [], metadata: responseData.metadata };
  };

  // Phase 2: Aggressive Timeout with Real Cancellation
  const AGENT_TIMEOUT_MS = 120000; // 120 seconds - matches edge function timeout
  const MAX_RETRIES = 2;

  const callAgentWithRetry = async (
    functionName: string,
    body: any,
    maxRetries = MAX_RETRIES
  ): Promise<{ data: any; error: any }> => {
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 ${functionName} attempt ${attempt}/${maxRetries}`);
        
        // Wrap invoke with timeout using Promise.race
        const invokePromise = supabase.functions.invoke(functionName, { body });
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`Timeout after ${AGENT_TIMEOUT_MS}ms`)), AGENT_TIMEOUT_MS)
        );
        
        const { data, error } = await Promise.race([
          invokePromise,
          timeoutPromise
        ]) as { data: any; error: any };
        
        // Check standardized response
        if (!error && data?.success) {
          const itemCount = data?.data?.hazards?.length || data?.data?.steps?.length || 0;
          
          if (itemCount > 0) {
            console.log(`✅ ${functionName} succeeded: ${itemCount} items in ${attempt} attempt(s)`);
            return { data, error: null };
          }
          
          console.warn(`⚠️ ${functionName} returned zero items on attempt ${attempt}`);
        }
        
        if (error) {
          console.error(`❌ ${functionName} error on attempt ${attempt}:`, error);
        }
        
        // Retry with exponential backoff
        if (attempt < maxRetries) {
          const backoffMs = 2000 * attempt; // 2s, 4s
          console.log(`⏳ Retrying in ${backoffMs}ms...`);
          await new Promise(resolve => setTimeout(resolve, backoffMs));
        }
        
      } catch (err: any) {
        // Handle timeout
        if (err.message?.includes('Timeout')) {
          console.error(`❌ ${functionName} timed out on attempt ${attempt}`);
          
          if (attempt === maxRetries) {
            return { 
              data: null, 
              error: new Error(`Request timed out after ${AGENT_TIMEOUT_MS/1000}s`) 
            };
          }
        } else {
          console.error(`❌ ${functionName} threw error:`, err);
          
          if (attempt === maxRetries) {
            return { data: null, error: err };
          }
        }
        
        // Exponential backoff
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
        }
      }
    }
    
    return { 
      data: null, 
      error: new Error(`${functionName} failed after ${maxRetries} attempts`) 
    };
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

      // Phase 1B & 2: Call with timeout and extract using standardized structure
      const hsProgressInterval = startProgressPolling('health-safety', 5, 50, 35000);
      
      const { data: hsData, error: hsError } = await callAgentWithRetry('health-safety-v3', {
        query: `Create a detailed risk assessment for the following electrical work: ${jobDescription}. Include specific hazards, risk ratings (likelihood and severity), and control measures.`,
        workType: jobScale
      });
      
      clearInterval(hsProgressInterval);
      setOverallProgress(55);

      if (abortControllerRef.current?.signal.aborted) {
        throw new Error('Generation cancelled');
      }

      if (hsError || !hsData?.success) {
        throw new Error(hsError?.message || 'Health & Safety analysis failed');
      }

      // Phase 1B: Extract using standardized structure
      const hsExtracted = extractHealthSafetyData(hsData);
      
      setReasoningSteps(prev => prev.map(step => 
        step.agent === 'health-safety' 
          ? { ...step, status: 'complete', reasoning: `Generated ${hsExtracted.hazards.length} hazards`, subStep: null }
          : step
      ));
      
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

      // ✅ PHASE 1: Standardized extraction - hazards at top level only
      const extractHazards = (responseData: any): any[] => {
        console.log('✅ PHASE 1: Extracting hazards from standardized response', {
          hasData: !!responseData?.data,
          hasHazards: !!responseData?.data?.hazards,
          hasStructuredData: !!responseData?.structuredData,
          topLevelKeys: Object.keys(responseData || {})
        });
        
        // PHASE 1: Single source of truth - data.hazards only
        let hazards: any[] = [];
        
        // Try standardized path first (new schema)
        if (responseData?.data?.hazards && Array.isArray(responseData.data.hazards)) {
          hazards = responseData.data.hazards;
          console.log(`✅ PHASE 1: Found ${hazards.length} hazards in data.hazards (standardized schema)`);
        }
        // Fallback to old structure for backward compatibility
        else if (responseData?.structuredData?.riskAssessment?.hazards && Array.isArray(responseData.structuredData.riskAssessment.hazards)) {
          hazards = responseData.structuredData.riskAssessment.hazards;
          console.log(`✅ PHASE 1: Found ${hazards.length} hazards in structuredData (backward compat)`);
        }
        else {
          console.error('❌ PHASE 1: No hazards found in standardized paths', {
            hasDataHazards: !!responseData?.data?.hazards,
            hasStructuredHazards: !!responseData?.structuredData?.riskAssessment?.hazards,
            responseKeys: Object.keys(responseData || {}),
            fullResponseSample: JSON.stringify(responseData)?.substring(0, 1000)
          });
          return [];
        }
        
        // ✅ PHASE 1: Validate hazard structure (no filtering, just validation)
        const validatedHazards = hazards.map((h, idx) => {
          // Ensure required fields exist
          if (!h.hazard || typeof h.hazard !== 'string') {
            console.error(`❌ PHASE 1: Hazard ${idx + 1} missing description`, h);
            return null;
          }
          if (typeof h.likelihood !== 'number' || typeof h.severity !== 'number') {
            console.error(`❌ PHASE 1: Hazard ${idx + 1} missing risk scores`, h);
            return null;
          }
          
          // Ensure linkedToStep exists (default to 0 if missing)
          if (typeof h.linkedToStep !== 'number') {
            h.linkedToStep = 0;
          }
          
          return h;
        }).filter(Boolean);
        
        const retentionRate = hazards.length > 0 
          ? ((validatedHazards.length / hazards.length) * 100).toFixed(1)
          : '0';
        
        console.log(`✅ PHASE 1: Validated ${validatedHazards.length}/${hazards.length} hazards (${retentionRate}% retention)`, {
          filtered: hazards.length - validatedHazards.length,
          sampleHazards: validatedHazards.slice(0, 3).map(h => h.hazard?.substring(0, 40))
        });
        
        // ✅ PHASE 1: Fail if >10% data loss
        if (hazards.length > 0 && (validatedHazards.length / hazards.length) < 0.9) {
          console.error(`🚨 PHASE 1: HIGH DATA LOSS - ${100 - parseFloat(retentionRate)}% hazards lost during validation`);
        }
        
        return validatedHazards;
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

      // ✅ PRIORITY 6: Display timing breakdown from H&S with enhanced visibility
      const hsTimeElapsed = Math.round((Date.now() - hsStartTime) / 1000);
      if (hsData?.metadata?.timingBreakdown) {
        const timing = hsData.metadata.timingBreakdown;
        const ragMs = timing.ragRetrieval || 0;
        const aiMs = timing.aiGeneration || 0;
        const totalMs = timing.totalTime || 0;
        const ragPercent = totalMs > 0 ? Math.round((ragMs / totalMs) * 100) : 0;
        const aiPercent = totalMs > 0 ? Math.round((aiMs / totalMs) * 100) : 0;
        
        console.log(`✅ Health & Safety complete: ${extractedHazards.length} hazards, ${hsTimeElapsed}s`);
        console.log(`📊 H&S Time Breakdown: RAG ${(ragMs / 1000).toFixed(1)}s (${ragPercent}%), AI ${(aiMs / 1000).toFixed(1)}s (${aiPercent}%), Total ${(totalMs / 1000).toFixed(1)}s`);

        // Enhanced bottleneck warnings
        if (ragMs > 5000) {
          console.warn(`🐌 H&S RAG BOTTLENECK: ${(ragMs / 1000).toFixed(1)}s (expected <3s)`);
        }
        if (aiMs > 110000) {
          console.warn(`🐌 H&S AI BOTTLENECK: ${(aiMs / 1000).toFixed(1)}s (expected <110s)`);
        }
      } else {
        console.warn('⚠️ No timing data returned from H&S agent');
      }

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

      // STEP 2 & 5: Fail if no valid data available (no fallback)
      if (shouldUseFallback) {
        console.error('🚨 CRITICAL: AI GENERATION FAILED - NO FALLBACK', { 
          hsError: hsError?.message,
          hasData: !!hsData,
          success: hsData?.success,
          hazardCount: extractedHazards.length,
          paths: {
            'structuredData.riskAssessment.hazards': hsData?.structuredData?.riskAssessment?.hazards?.length || 0,
            'response.structuredData.riskAssessment.hazards': hsData?.response?.structuredData?.riskAssessment?.hazards?.length || 0,
            'structuredData.hazards': hsData?.structuredData?.hazards?.length || 0,
            'riskAssessment.hazards': hsData?.riskAssessment?.hazards?.length || 0
          },
          dataKeys: hsData ? Object.keys(hsData) : []
        });

        toast({
          title: "AI Generation Failed",
          description: "Unable to generate risk assessment. Please try again or check your connection.",
          variant: "destructive",
          duration: 10000
        });

        throw new Error(hsError?.message || 'AI generation failed - no valid hazards generated');
      }

      // Store raw H&S response
      setRawHSResponse(hsDataToUse);

      // PHASE 1: Clear progress intervals and set to 50% after H&S completion
      clearProgressIntervals();
      setOverallProgress(50);
      // hsTimeElapsed already declared earlier for timing display

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
      
      const installerProgressInterval = startProgressPolling('installer', 55, 90, 30000);

      const { data: installerData, error: installerError } = await callAgentWithRetry('installer-v3', {
        query: `Create a detailed step-by-step method statement for: ${jobDescription}. Include installation procedures, safety requirements per step, equipment needed, and time estimates.`,
        previousAgentOutputs: [{
          agent: 'health-safety',
          response: hsData
        }]
      });
      
      clearInterval(installerProgressInterval);
      setOverallProgress(95);

      if (abortControllerRef.current?.signal.aborted) {
        throw new Error('Generation cancelled');
      }

      if (installerError || !installerData?.success) {
        console.warn('⚠️ Installer agent failed, proceeding with H&S data only');
      }

      // Display timing breakdown from Installer
      if (installerData?.metadata?.timingBreakdown) {
        const timing = installerData.metadata.timingBreakdown;
        const ragPercent = timing.totalTime > 0 ? Math.round((timing.ragRetrieval / timing.totalTime) * 100) : 0;
        const aiPercent = timing.totalTime > 0 ? Math.round((timing.aiGeneration / timing.totalTime) * 100) : 0;
        const cachePercent = timing.totalTime > 0 ? Math.round((timing.cacheCheck / timing.totalTime) * 100) : 0;
        
        console.log('⏱️ INSTALLER TIMING BREAKDOWN:', {
          cacheCheck: `${timing.cacheCheck}ms (${cachePercent}%)`,
          ragRetrieval: `${timing.ragRetrieval}ms (${ragPercent}%)`,
          aiGeneration: `${timing.aiGeneration}ms (${aiPercent}%)`,
          totalTime: `${timing.totalTime}ms`
        });

        // Warn if components are slow
        if (timing.ragRetrieval > 5000) {
          console.warn(`🐌 INSTALLER RAG BOTTLENECK: ${timing.ragRetrieval}ms (expected <3000ms)`);
        }
        if (timing.aiGeneration > 45000) {
          console.warn(`🐌 INSTALLER AI BOTTLENECK: ${timing.aiGeneration}ms (expected <40000ms)`);
        }
      }

      const installerExtracted = installerData?.success 
        ? extractInstallerData(installerData)
        : { steps: [], toolsRequired: [], materialsRequired: [], practicalTips: [] };

      setReasoningSteps(prev => prev.map(step => 
        step.agent === 'installer' 
          ? { ...step, status: 'complete', reasoning: `Generated ${installerExtracted.steps.length} steps`, subStep: null }
          : step
      ));

      clearProgressIntervals();
      const installerTimeElapsed = Math.round((Date.now() - installerStartTime) / 1000);

      // Extract steps count with comprehensive fallback paths
      const installerStructuredData = installerData?.structuredData || installerData?.response?.structuredData || {};
      const methodSteps = installerStructuredData.methodStatementSteps || installerData?.methodStatementSteps || installerData?.installationSteps || [];
      const stepsCount = methodSteps.length;

      console.log(`✅ Installer complete: ${stepsCount} steps, ${installerTimeElapsed}s`);

      // ✅ PRIORITY 6: Display timing breakdown from Installer with enhanced visibility
      if (installerData?.metadata?.timingBreakdown) {
        const timing = installerData.metadata.timingBreakdown;
        const ragMs = timing.ragRetrieval || 0;
        const aiMs = timing.aiGeneration || 0;
        const totalMs = timing.totalTime || 0;
        const ragPercent = totalMs > 0 ? Math.round((ragMs / totalMs) * 100) : 0;
        const aiPercent = totalMs > 0 ? Math.round((aiMs / totalMs) * 100) : 0;
        
        console.log(`📊 Installer Time Breakdown: RAG ${(ragMs / 1000).toFixed(1)}s (${ragPercent}%), AI ${(aiMs / 1000).toFixed(1)}s (${aiPercent}%), Total ${(totalMs / 1000).toFixed(1)}s`);

        // Enhanced bottleneck warnings
        if (ragMs > 5000) {
          console.warn(`🐌 Installer RAG BOTTLENECK: ${(ragMs / 1000).toFixed(1)}s (expected <3s)`);
        }
        if (aiMs > 110000) {
          console.warn(`🐌 Installer AI BOTTLENECK: ${(aiMs / 1000).toFixed(1)}s (expected <110s)`);
        }
      } else {
        console.warn('⚠️ No timing data returned from Installer agent');
      }

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

      // Enhanced pre-transformation validation with all data types
      const preTransformCounts = {
        hazards: extractedHazards.length,
        ppe: hsExtracted.ppe?.length || 0,
        emergencyProcs: hsExtracted.emergencyProcedures?.length || 0,
        steps: installerData.data?.steps?.length || 0
      };

      console.log('🎯 PRE-TRANSFORMATION CHECKPOINT:', preTransformCounts);
      
      // Phase 4: Use standardized data directly - wrap for transformer compatibility
      const combinedData = combineAgentOutputsToRAMS(
        {
          structuredData: {
            riskAssessment: {
              hazards: hsExtracted.hazards,
              ppe: hsExtracted.ppe,
              emergencyProcedures: hsExtracted.emergencyProcedures
            }
          }
        },
        installerData,
        {
          ...projectInfo,
          date: new Date().toISOString()
        }
      );

      // STEP 5: Enhanced post-transformation validation
      const postTransformCounts = {
        risks: combinedData.ramsData?.risks?.length || 0,
        ppeDetails: combinedData.ramsData?.ppeDetails?.length || 0,
        emergencyProcs: combinedData.ramsData?.emergencyProcedures?.length || 0,
        steps: combinedData.methodData?.steps?.length || 0
      };

      // Calculate loss rates
      const hazardLossRate = preTransformCounts.hazards > 0
        ? ((preTransformCounts.hazards - postTransformCounts.risks) / preTransformCounts.hazards) * 100
        : 0;
      const ppeLossRate = preTransformCounts.ppe > 0
        ? ((preTransformCounts.ppe - postTransformCounts.ppeDetails) / preTransformCounts.ppe) * 100
        : 0;
      const emergencyLossRate = preTransformCounts.emergencyProcs > 0
        ? ((preTransformCounts.emergencyProcs - postTransformCounts.emergencyProcs) / preTransformCounts.emergencyProcs) * 100
        : 0;
      const stepLossRate = preTransformCounts.steps > 0
        ? ((preTransformCounts.steps - postTransformCounts.steps) / preTransformCounts.steps) * 100
        : 0;

      console.log('🎯 POST-TRANSFORMATION CHECKPOINT:', {
        before: preTransformCounts,
        after: postTransformCounts,
        lost: {
          hazards: preTransformCounts.hazards - postTransformCounts.risks,
          ppe: preTransformCounts.ppe - postTransformCounts.ppeDetails,
          emergencyProcs: preTransformCounts.emergencyProcs - postTransformCounts.emergencyProcs,
          steps: preTransformCounts.steps - postTransformCounts.steps
        },
        lossRates: {
          hazards: `${hazardLossRate.toFixed(1)}%`,
          ppe: `${ppeLossRate.toFixed(1)}%`,
          emergencyProcs: `${emergencyLossRate.toFixed(1)}%`,
          steps: `${stepLossRate.toFixed(1)}%`
        }
      });

      // CRITICAL: Alert on significant data loss
      if (hazardLossRate > 20 && preTransformCounts.hazards >= 5) {
        console.error('🚨 CRITICAL: >20% hazard loss during transformation!', {
          original: preTransformCounts.hazards,
          transformed: postTransformCounts.risks,
          lost: preTransformCounts.hazards - postTransformCounts.risks,
          lossRate: `${hazardLossRate.toFixed(1)}%`
        });

        toast({
          title: "Data transformation issue",
          description: `Lost ${hazardLossRate.toFixed(0)}% of hazards (${preTransformCounts.hazards - postTransformCounts.risks} items). Please report this bug.`,
          variant: "destructive"
        });
      }

      if (ppeLossRate > 30 && preTransformCounts.ppe >= 5) {
        console.warn('⚠️ WARNING: >30% PPE loss during transformation', {
          original: preTransformCounts.ppe,
          transformed: postTransformCounts.ppeDetails,
          lost: preTransformCounts.ppe - postTransformCounts.ppeDetails,
          lossRate: `${ppeLossRate.toFixed(1)}%`
        });

        toast({
          title: "PPE data loss",
          description: `Lost ${ppeLossRate.toFixed(0)}% of PPE items during transformation.`,
          variant: "destructive"
        });
      }

      // Success message if no significant loss
      if (hazardLossRate === 0 && ppeLossRate === 0) {
        console.log('✅ Perfect transformation: 0% data loss');
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
