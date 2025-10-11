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

  if (error) throw error;

  return {
    responses: data.responses || [],
    suggestedNextAgents: data.suggestedNextAgents || [],
    consultedAgents: data.consultedAgents || []
  };
};
