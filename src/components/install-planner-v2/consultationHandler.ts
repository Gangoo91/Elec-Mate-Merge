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
  currentDesign: any
) => {
  // Single-agent conversational flow - no mode needed
  const agentsToCall = selectedAgents;

  try {
    // Call agent-router edge function
    const { data, error } = await supabase.functions.invoke('agent-router', {
      body: {
        conversationId: crypto.randomUUID(),
        userMessage,
        selectedAgents: agentsToCall,
        messages,
        currentDesign
      }
    });

    if (error) {
      // Wrap errors with friendly context
      console.error('Agent router error:', error);
      throw new Error(`Agent call failed: ${error.message || 'Unknown error'}`);
    }

    return {
      responses: data.responses || [],
      suggestedNextAgents: data.suggestedNextAgents || [],
      consultedAgents: data.consultedAgents || []
    };
  } catch (err) {
    // Ensure errors are always structured for UI display
    const message = err instanceof Error ? err.message : 'Agent consultation failed';
    console.error('Consultation handler error:', message);
    throw new Error(message);
  }
};
