import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { combineAgentOutputsToRAMS } from '@/utils/rams-ai-transformer';
import type { RAMSData } from '@/types/rams';
import type { MethodStatementData } from '@/types/method-statement';

interface ReasoningStep {
  agent: 'health-safety' | 'installer';
  status: 'pending' | 'processing' | 'complete' | 'error';
  reasoning?: string;
}

interface UseAIRAMSReturn {
  isProcessing: boolean;
  reasoningSteps: ReasoningStep[];
  ramsData: RAMSData | null;
  methodData: Partial<MethodStatementData> | null;
  error: string | null;
  generateRAMS: (jobDescription: string, projectInfo: {
    projectName: string;
    location: string;
    assessor: string;
    contractor: string;
    supervisor: string;
  }) => Promise<void>;
  reset: () => void;
}

export function useAIRAMS(): UseAIRAMSReturn {
  const [isProcessing, setIsProcessing] = useState(false);
  const [reasoningSteps, setReasoningSteps] = useState<ReasoningStep[]>([]);
  const [ramsData, setRamsData] = useState<RAMSData | null>(null);
  const [methodData, setMethodData] = useState<Partial<MethodStatementData> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateRAMS = async (
    jobDescription: string,
    projectInfo: {
      projectName: string;
      location: string;
      assessor: string;
      contractor: string;
      supervisor: string;
    }
  ) => {
    setIsProcessing(true);
    setError(null);
    
    // Initialize reasoning steps
    setReasoningSteps([
      { agent: 'health-safety', status: 'pending' },
      { agent: 'installer', status: 'pending' }
    ]);

    try {
      // Step 1: Call Health & Safety Agent
      setReasoningSteps(prev => prev.map(step => 
        step.agent === 'health-safety' ? { ...step, status: 'processing' } : step
      ));

      const { data: hsData, error: hsError } = await supabase.functions.invoke('health-safety-agent', {
        body: {
          messages: [{
            role: 'user',
            content: `Create a detailed risk assessment for the following electrical work: ${jobDescription}. Include specific hazards, risk ratings (likelihood and severity), and control measures.`
          }]
        }
      });

      if (hsError) throw new Error(`Health & Safety Agent failed: ${hsError.message}`);
      if (!hsData?.response) throw new Error('No response from Health & Safety Agent');

      setReasoningSteps(prev => prev.map(step => 
        step.agent === 'health-safety' 
          ? { ...step, status: 'complete', reasoning: hsData.response.substring(0, 200) + '...' }
          : step
      ));

      // Step 2: Call Installer Agent (with H&S context)
      setReasoningSteps(prev => prev.map(step => 
        step.agent === 'installer' ? { ...step, status: 'processing' } : step
      ));

      const { data: installerData, error: installerError } = await supabase.functions.invoke('installer-agent', {
        body: {
          messages: [{
            role: 'user',
            content: `Create a detailed step-by-step method statement for: ${jobDescription}. Include installation procedures, safety requirements per step, equipment needed, and time estimates.`
          }],
          context: {
            previousAgentOutputs: [{
              agent: 'health-safety',
              response: hsData.response
            }]
          }
        }
      });

      if (installerError) throw new Error(`Installer Agent failed: ${installerError.message}`);
      if (!installerData?.response) throw new Error('No response from Installer Agent');

      setReasoningSteps(prev => prev.map(step => 
        step.agent === 'installer' 
          ? { ...step, status: 'complete', reasoning: installerData.response.substring(0, 200) + '...' }
          : step
      ));

      // Step 3: Transform agent outputs to RAMS format
      const combinedData = combineAgentOutputsToRAMS(
        { response: hsData.response, confidence: hsData.confidence },
        { response: installerData.response, confidence: installerData.confidence },
        {
          ...projectInfo,
          date: new Date().toISOString()
        }
      );

      setRamsData(combinedData.ramsData);
      setMethodData(combinedData.methodData);

    } catch (err) {
      console.error('AI RAMS generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate RAMS');
      setReasoningSteps(prev => prev.map(step => 
        step.status === 'processing' ? { ...step, status: 'error' } : step
      ));
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setIsProcessing(false);
    setReasoningSteps([]);
    setRamsData(null);
    setMethodData(null);
    setError(null);
  };

  return {
    isProcessing,
    reasoningSteps,
    ramsData,
    methodData,
    error,
    generateRAMS,
    reset
  };
}
