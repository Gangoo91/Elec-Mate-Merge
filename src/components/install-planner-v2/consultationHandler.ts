// Simplified consultation handler for IntelligentAIPlanner
import { supabase } from "@/integrations/supabase/client";
import { AgentType } from "./InChatAgentSelector";

interface AgentSuggestion {
  agent: string;
  reason: string;
  priority?: 'high' | 'medium' | 'low';
}

export const handleConsultation = async (
  userMessage: string,
  messages: any[],
  selectedAgents: AgentType[],
  currentDesign: any,
  conversationId: string,
  maxRetries = 2,
  onProgress?: (message: string) => void
) => {
  // Single-agent conversational flow - no mode needed
  const agentsToCall = selectedAgents;
  
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Show RAG progress indicator for H&S agent
      if (agentsToCall.includes('health-safety') && onProgress) {
        if (attempt === 0) {
          onProgress('🔍 Searching health & safety knowledge base...');
        } else {
          onProgress(`🔄 Retrying H&S knowledge search (attempt ${attempt + 1})...`);
        }
      }
      
      // Call agent-router edge function
      const { data, error } = await supabase.functions.invoke('agent-router', {
        body: {
          conversationId: conversationId,
          userMessage,
          selectedAgents: agentsToCall,
          messages,
          currentDesign
        }
      });

      if (error) {
        throw new Error(`Agent call failed: ${error.message || 'Unknown error'}`);
      }
      
      // Success - show completion message
      if (agentsToCall.includes('health-safety') && onProgress) {
        onProgress('✅ H&S knowledge retrieved - generating risk assessment...');
      }

      return {
        responses: (data.responses || []).map((r: any) => ({
          ...r,
          // Preserve metadata from agent response
          metadata: r.response?.metadata
        })),
        suggestedNextAgents: data.suggestedNextAgents || [],
        consultedAgents: data.consultedAgents || [],
        // NEW: Return router metadata as well
        routerMetadata: data.metadata
      };
    } catch (err) {
      lastError = err instanceof Error ? err : new Error('Agent consultation failed');
      console.error(`Consultation attempt ${attempt + 1} failed:`, lastError);
      
      // Don't retry if we've exhausted attempts
      if (attempt === maxRetries) {
        break;
      }
      
      // Exponential backoff: 1s, 2s, 4s
      const delay = 1000 * Math.pow(2, attempt);
      console.log(`⏳ Waiting ${delay}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // All retries exhausted
  console.error('Consultation handler error:', lastError);
  throw lastError || new Error('Agent consultation failed');
};
