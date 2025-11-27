import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { RichAgentRequest, AgentResponse, AgentType } from '@/types/agent-request';

// Legacy interface for backward compatibility
interface LegacyAgentRequest {
  query: string;
  [key: string]: any;
}

export interface UseSimpleAgentReturn {
  callAgent: (agent: AgentType, request: RichAgentRequest | LegacyAgentRequest) => Promise<AgentResponse | null>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
  progress: {
    stage: 'initializing' | 'parsing' | 'ai' | 'validation' | 'complete';
    message: string;
  } | null;
}

const AGENT_FUNCTIONS: Record<AgentType, string> = {
  'designer': 'designer-agent',
  'cost-engineer': 'cost-engineer-v3',
  'health-safety': 'health-safety-v3',
  'installer': 'installer-v3',
  'project-manager': 'project-mgmt-v3',
  'commissioning': 'commissioning-v3',
  'maintenance': 'maintenance-v3',
  'tutor': 'tutor-v3'
};

const AGENT_NAMES: Record<AgentType, string> = {
  'designer': 'Circuit Designer',
  'cost-engineer': 'Cost Engineer',
  'health-safety': 'Health & Safety Advisor',
  'installer': 'Installation Specialist',
  'project-manager': 'Project Manager',
  'commissioning': 'Commissioning Specialist',
  'maintenance': 'Maintenance Specialist',
  'tutor': 'Training Tutor'
};

export const useSimpleAgent = (): UseSimpleAgentReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<{
    stage: 'initializing' | 'parsing' | 'ai' | 'validation' | 'complete';
    message: string;
  } | null>(null);

  const callAgent = async (agent: AgentType, request: RichAgentRequest | LegacyAgentRequest): Promise<AgentResponse | null> => {
    setIsLoading(true);
    setError(null);
    setProgress({ stage: 'initializing', message: 'Starting up...' });

    const functionName = AGENT_FUNCTIONS[agent];
    const agentName = AGENT_NAMES[agent];
    const startTime = Date.now();

    console.log(`🤖 Calling ${agentName} (${functionName})`, request);

    // Standard JSON-based call for all agents (including cost-engineer)
    // Identify long-running agents
    const isLongRunningAgent = agent === 'project-manager' || agent === 'health-safety' || agent === 'cost-engineer';

    // Client-side progress simulation with better feedback
    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed < 5000) {
        setProgress({ stage: 'initializing', message: 'Starting up...' });
      } else if (elapsed < 30000) {
        setProgress({ stage: 'parsing', message: 'Searching BS 7671 regulations...' });
      } else if (elapsed < 90000) {
        setProgress({ 
          stage: 'ai', 
          message: isLongRunningAgent 
            ? 'Generating comprehensive plan (this may take 2-3 minutes)...' 
            : 'Generating detailed procedures...'
        });
      } else if (elapsed < 150000) {
        setProgress({ 
          stage: 'validation', 
          message: 'Almost there - finalising details...' 
        });
      } else if (elapsed < 240000) {
        setProgress({ 
          stage: 'validation', 
          message: 'Still processing - complex project requires more time...' 
        });
      } else {
        setProgress({ 
          stage: 'validation', 
          message: 'Final checks in progress...' 
        });
      }
    }, 1000);

    try {
      // Supabase client doesn't support custom timeouts/signals directly
      // Cost engineer needs longer timeout (5 mins) due to GPT-5 Mini reasoning
      // Other functions use default 280s backend timeout
      const { data, error: invokeError } = await supabase.functions.invoke(functionName, {
        body: request
      });

      clearInterval(progressTimer);

      if (invokeError) {
        throw invokeError;
      }

      if (!data.success) {
        throw new Error(data.error || 'Agent returned unsuccessful response');
      }

      setProgress({ stage: 'complete', message: 'Response ready!' });
      console.log(`✅ ${agentName} response:`, data);
      
      toast.success(`${agentName} completed`, {
        description: `Request processed successfully`
      });

      return data as AgentResponse;

    } catch (err) {
      clearInterval(progressTimer);
      let errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      
      // Detect specific error types and provide helpful messages
      if (errorMessage.includes('timeout') || errorMessage.includes('5 minutes')) {
        errorMessage = `${agentName} timeout: Complex projects may take 2-3 minutes. Please try again with a simpler request or break it into smaller parts.`;
      } else if (errorMessage.includes('split is not a function') || errorMessage.includes('phase.phase')) {
        errorMessage = `${agentName} data error: The project plan data structure is corrupted. This is a known issue being fixed. Please try regenerating.`;
      } else if (errorMessage.includes('FunctionsHttpError')) {
        errorMessage = `${agentName} connection error: Unable to reach the backend. Check your internet connection and try again.`;
      }
      
      console.error(`❌ ${agentName} error:`, {
        originalError: err,
        userMessage: errorMessage,
        timestamp: new Date().toISOString()
      });
      
      setError(errorMessage);
      
      toast.error(`${agentName} failed`, {
        description: errorMessage,
        duration: 7000
      });

      return null;

    } finally {
      clearInterval(progressTimer);
      setIsLoading(false);
      setTimeout(() => setProgress(null), 2000);
    }
  };

  const clearError = () => setError(null);

  return {
    callAgent,
    isLoading,
    error,
    clearError,
    progress
  };
};
