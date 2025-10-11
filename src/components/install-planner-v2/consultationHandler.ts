// Simplified consultation handler for IntelligentAIPlanner
import { supabase } from "@/integrations/supabase/client";
import { ConsultationMode, AgentType } from "./ConsultationTeamSelector";

interface AgentSuggestion {
  agent: string;
  reason: string;
  priority?: 'high' | 'medium' | 'low';
}

export const handleConsultation = async (
  userMessage: string,
  messages: any[],
  consultationMode: ConsultationMode,
  selectedAgents: AgentType[],
  currentDesign: any
) => {
  // Determine which agents to call
  let agentsToCall: AgentType[] = [];
  
  if (consultationMode === 'full') {
    agentsToCall = ['designer', 'cost-engineer', 'installer', 'health-safety', 'commissioning', 'project-manager'];
  } else if (consultationMode === 'quick') {
    agentsToCall = ['designer', 'cost-engineer'];
  } else {
    agentsToCall = selectedAgents;
  }

  // Call agent-router edge function
  const { data, error } = await supabase.functions.invoke('agent-router', {
    body: {
      conversationId: crypto.randomUUID(),
      userMessage,
      selectedAgents: agentsToCall,
      consultationMode,
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
