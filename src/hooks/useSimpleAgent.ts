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
    stage: 'parsing' | 'rag' | 'ai' | 'validation' | 'complete';
    message: string;
  } | null;
}

const AGENT_FUNCTIONS: Record<AgentType, string> = {
  'designer': 'designer-v3',
  'cost-engineer': 'cost-engineer-v3',
  'health-safety': 'health-safety-v3',
  'installer': 'installer-v3',
  'project-manager': 'project-mgmt-v3',
  'commissioning': 'commissioning-v3'
};

const AGENT_NAMES: Record<AgentType, string> = {
  'designer': 'Circuit Designer',
  'cost-engineer': 'Cost Engineer',
  'health-safety': 'Health & Safety Advisor',
  'installer': 'Installation Specialist',
  'project-manager': 'Project Manager',
  'commissioning': 'Commissioning Specialist'
};

export const useSimpleAgent = (): UseSimpleAgentReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<{
    stage: 'parsing' | 'rag' | 'ai' | 'validation' | 'complete';
    message: string;
  } | null>(null);

  const callAgent = async (agent: AgentType, request: RichAgentRequest | LegacyAgentRequest): Promise<AgentResponse | null> => {
    setIsLoading(true);
    setError(null);
    setProgress({ stage: 'parsing', message: 'Understanding your query...' });

    const functionName = AGENT_FUNCTIONS[agent];
    const agentName = AGENT_NAMES[agent];

    console.log(`🤖 Calling ${agentName} (${functionName})`, request);

    try {
      setProgress({ stage: 'rag', message: 'Searching BS 7671 regulations...' });
      
      const { data, error: invokeError } = await supabase.functions.invoke(functionName, {
        body: request
      });

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
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error(`❌ ${agentName} error:`, errorMessage);
      
      setError(errorMessage);
      
      toast.error(`${agentName} failed`, {
        description: errorMessage
      });

      return null;

    } finally {
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
