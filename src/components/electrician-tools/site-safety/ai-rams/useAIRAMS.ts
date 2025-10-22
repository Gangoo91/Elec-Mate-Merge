import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { combineAgentOutputsToRAMS } from '@/utils/rams-ai-transformer';
import type { RAMSData } from '@/types/rams';
import type { MethodStatementData } from '@/types/method-statement';
import { useToast } from '@/hooks/use-toast';

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

    setIsSaving(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Save or update RAMS document
      const ramsPayload = {
        user_id: user.id,
        project_name: ramsData.projectName,
        location: ramsData.location,
        date: ramsData.date,
        assessor: ramsData.assessor,
        contractor: ramsData.contractor || methodData.contractor || '',
        supervisor: ramsData.supervisor || methodData.supervisor || '',
        activities: ramsData.activities,
        risks: ramsData.risks as unknown as any, // JSONB type
        status: 'draft' as const,
        last_autosave_at: new Date().toISOString(),
        ai_generation_metadata: {
          generatedAt: new Date().toISOString(),
          autosave: isAutosave,
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
          status: 'draft' as const
        };

        // Check if method statement exists
        const { data: existingMethod } = await supabase
          .from('method_statements')
          .select('id')
          .eq('rams_document_id', savedDocId)
          .single();

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
    maxRetries = 3
  ): Promise<{ data: any; error: any }> => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const { data, error } = await supabase.functions.invoke(functionName, { body });
      
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
      setOverallProgress(5);
      setEstimatedTimeRemaining(240); // 4 minutes

      // Start simulated progress
      simulateSubStepProgress('health-safety', HEALTH_SAFETY_SUBSTEPS);

      const { data: hsData, error: hsError } = await callAgentWithRetry('health-safety-v3', {
        query: `Create a detailed risk assessment for the following electrical work: ${jobDescription}. Include specific hazards, risk ratings (likelihood and severity), and control measures.`,
        workType: jobScale
      });

      if (abortControllerRef.current?.signal.aborted) {
        throw new Error('Generation cancelled');
      }

      let hsDataToUse = hsData;

      // More specific error detection
      if (hsError) {
        console.error('❌ Health & Safety network error:', hsError);
      }
      
      if (!hsData) {
        console.error('❌ Health & Safety returned no data');
      }
      
      if (hsData && !hsData.success) {
        console.error('❌ Health & Safety returned success:false', {
          responseKeys: Object.keys(hsData),
          hasStructuredData: !!hsData.structuredData,
          hasRiskAssessment: !!hsData.structuredData?.riskAssessment
        });
      }
      
      // Use fallback only if truly necessary
      if (hsError || !hsData || !hsData.success || !hsData.structuredData?.riskAssessment) {
        console.warn('⚠️ Health & Safety agent issue, using fallback data:', { 
          hsError: hsError?.message, 
          hasData: !!hsData,
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
        
        toast({
          title: "Using fallback safety data",
          description: "Health & Safety agent encountered issues. Using standard electrical hazards.",
          variant: "default"
        });
        
        setReasoningSteps(prev => prev.map(step => 
          step.agent === 'health-safety' 
            ? { ...step, status: 'complete', reasoning: 'Using fallback electrical hazards (3 hazards)', subStep: null, timeElapsed: Math.round((Date.now() - hsStartTime) / 1000) }
            : step
        ));
      }

      // Store raw H&S response
      setRawHSResponse(hsDataToUse);

      clearProgressIntervals();
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
      if (hsData?.success) {
        setReasoningSteps(prev => prev.map(step => 
          step.agent === 'health-safety' 
            ? { ...step, status: 'complete', reasoning: `Generated ${hazardCount || 'multiple'} hazards and control measures`, subStep: null, timeElapsed: hsTimeElapsed }
            : step
        ));
      }
      
      setOverallProgress(50);
      setEstimatedTimeRemaining(120); // 2 minutes

      // Step 2: Call Installer Agent (with H&S context)
      const installerStartTime = Date.now();
      setReasoningSteps(prev => prev.map(step => 
        step.agent === 'installer' ? { ...step, status: 'processing', subStep: INSTALLER_SUBSTEPS[0] } : step
      ));

      // Start simulated progress for installer
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

      setReasoningSteps(prev => prev.map(step => 
        step.agent === 'installer' 
          ? { ...step, status: 'complete', reasoning: `Generated ${stepsCount || 'multiple'} installation steps`, subStep: null, timeElapsed: installerTimeElapsed }
          : step
      ));
      setOverallProgress(100);
      setEstimatedTimeRemaining(0);

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
