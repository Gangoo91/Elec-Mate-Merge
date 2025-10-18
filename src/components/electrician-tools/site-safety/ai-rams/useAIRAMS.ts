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
    const totalDuration = 10000; // 10 seconds per agent
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
    setEstimatedTimeRemaining(45);
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
      setEstimatedTimeRemaining(40);

      // Start simulated progress
      simulateSubStepProgress('health-safety', HEALTH_SAFETY_SUBSTEPS);

      const { data: hsData, error: hsError } = await supabase.functions.invoke('health-safety-v3', {
        body: {
          query: `Create a detailed risk assessment for the following electrical work: ${jobDescription}. Include specific hazards, risk ratings (likelihood and severity), and control measures.`,
          workType: jobScale
        }
      });

      if (abortControllerRef.current?.signal.aborted) {
        throw new Error('Generation cancelled');
      }

      if (hsError || !hsData) {
        console.error('Health & Safety agent error:', hsError);
        clearProgressIntervals();
        setReasoningSteps(prev => prev.map(step => 
          step.agent === 'health-safety' 
            ? { ...step, status: 'error', reasoning: hsError?.message || 'Agent failed to respond', subStep: null }
            : step
        ));
        
        setError('Health & Safety Agent failed. Please check your input and try again.');
        setIsProcessing(false);
        return; // Stop processing if health-safety fails
      }

      // Store raw H&S response
      setRawHSResponse(hsData);

      clearProgressIntervals();
      const hsTimeElapsed = Math.round((Date.now() - hsStartTime) / 1000);

      // Debug logging to see actual response structure
      console.log('🔍 Health & Safety raw response:', hsData);
      console.log('🔍 hsData.response structure:', hsData.response);
      console.log('🔍 hsData.structuredData:', hsData.structuredData);

      // Extract hazard count from multiple possible locations
      const hsActualData = hsData.structuredData?.riskAssessment 
        || hsData.response?.structuredData?.riskAssessment
        || hsData.response?.riskAssessment 
        || hsData.riskAssessment
        || hsData;

      const hazardCount = hsActualData.riskAssessment?.hazards?.length 
        || hsActualData.hazards?.length 
        || 0;

      console.log('🔍 Extracted hazard count:', hazardCount);

      setReasoningSteps(prev => prev.map(step => 
        step.agent === 'health-safety' 
          ? { ...step, status: 'complete', reasoning: `Generated ${hazardCount} hazards and control measures`, subStep: null, timeElapsed: hsTimeElapsed }
          : step
      ));
      setOverallProgress(50);
      setEstimatedTimeRemaining(25);

      // Step 2: Call Installer Agent (with H&S context)
      const installerStartTime = Date.now();
      setReasoningSteps(prev => prev.map(step => 
        step.agent === 'installer' ? { ...step, status: 'processing', subStep: INSTALLER_SUBSTEPS[0] } : step
      ));

      // Start simulated progress for installer
      simulateSubStepProgress('installer', INSTALLER_SUBSTEPS);

      const { data: installerData, error: installerError } = await supabase.functions.invoke('installer-v3', {
        body: {
          query: `Create a detailed step-by-step method statement for: ${jobDescription}. Include installation procedures, safety requirements per step, equipment needed, and time estimates.`,
          previousAgentOutputs: [{
            agent: 'health-safety',
            response: hsData
          }]
        }
      });

      if (abortControllerRef.current?.signal.aborted) {
        throw new Error('Generation cancelled');
      }

      if (installerError) throw new Error(`Installer Agent failed: ${installerError.message}`);
      if (!installerData) throw new Error('No response from Installer Agent');

      // Store raw installer response
      setRawInstallerResponse(installerData);

      clearProgressIntervals();
      const installerTimeElapsed = Math.round((Date.now() - installerStartTime) / 1000);

      // Debug logging to see actual response structure
      console.log('🔍 Installer raw response:', installerData);
      console.log('🔍 installerData.response structure:', installerData.response);
      console.log('🔍 installerData.structuredData:', installerData.structuredData);

      // Extract steps count from multiple possible locations
      const installerActualData = installerData.structuredData?.methodStatementSteps
        || installerData.response?.structuredData?.methodStatementSteps
        || installerData.response?.methodStatementSteps
        || installerData.response?.installationSteps
        || installerData.methodStatementSteps
        || installerData.installationSteps
        || installerData;

      const stepsCount = installerActualData.methodStatementSteps?.length 
        || installerActualData.installationSteps?.length
        || (Array.isArray(installerActualData) ? installerActualData.length : 0);

      console.log('🔍 Extracted steps count:', stepsCount);

      setReasoningSteps(prev => prev.map(step => 
        step.agent === 'installer' 
          ? { ...step, status: 'complete', reasoning: `Generated ${stepsCount} installation steps`, subStep: null, timeElapsed: installerTimeElapsed }
          : step
      ));
      setOverallProgress(100);
      setEstimatedTimeRemaining(0);

      // Step 3: Transform agent outputs to RAMS format
      // Pass the full agent response objects to the transformer
      const combinedData = combineAgentOutputsToRAMS(
        hsData,
        installerData,
        {
          ...projectInfo,
          date: new Date().toISOString()
        }
      );

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
