// AGENT ROUTER - User-Driven Consultation Architecture
// Replaces complex orchestrator with simple routing based on user selection
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import { summarizeConversation, type Message as ConvMessage } from '../_shared/conversation-memory.ts';

interface AgentSuggestion {
  agent: string;
  reason: string;
  priority?: 'high' | 'medium' | 'low';
}

interface AgentResponse {
  response: string;
  structuredData?: any;
  suggestedNextAgents?: AgentSuggestion[];
  autoRedirect?: string;
}

const AGENT_ENDPOINTS: Record<string, string> = {
  'designer': 'designer-agent',
  'cost-engineer': 'cost-engineer-agent',
  'installer': 'installer-agent',
  'health-safety': 'health-safety-agent',
  'commissioning': 'commissioning-agent',
  'project-manager': 'project-manager-agent'
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'agent-router' });

  try {
    const { 
      conversationId, 
      userMessage, 
      selectedAgents,
      consultationMode,
      messages = [],
      currentDesign
    } = await req.json();

    if (!userMessage) {
      throw new ValidationError('userMessage is required');
    }

    if (!selectedAgents || !Array.isArray(selectedAgents) || selectedAgents.length === 0) {
      throw new ValidationError('selectedAgents array is required and must not be empty');
    }

    logger.info('Agent routing', { 
      mode: consultationMode, 
      agents: selectedAgents.length,
      hasConversationId: !!conversationId 
    });

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) throw new ValidationError('OPENAI_API_KEY not configured');

    // Get conversation context
    let conversationSummary = null;
    if (messages.length > 3) {
      logger.info('Summarizing conversation', { messageCount: messages.length });
      conversationSummary = await summarizeConversation(messages as ConvMessage[], openAIApiKey);
      logger.info('Conversation summarized', { 
        projectType: conversationSummary.projectType,
        circuits: conversationSummary.circuits?.length || 0,
        decisions: conversationSummary.decisions?.length || 0
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Call agents sequentially
    const agentResponses: Array<{ agent: string; response: AgentResponse }> = [];
    
    for (const agentType of selectedAgents) {
      const endpoint = AGENT_ENDPOINTS[agentType];
      if (!endpoint) {
        logger.warn('Unknown agent type', { agentType });
        continue;
      }

      logger.info(`Calling ${agentType} agent`);
      
      try {
        const { data, error } = await supabase.functions.invoke(endpoint, {
          body: {
            messages: [
              ...messages,
              { role: 'user', content: userMessage }
            ],
            conversationSummary,
            conversationId,
            currentDesign,
            previousAgentOutputs: agentResponses,
            requestSuggestions: true
          }
        });

        if (error) {
          logger.error(`${agentType} agent error`, { error });
          throw error;
        }

        if (data.autoRedirect) {
          logger.info(`${agentType} redirecting to ${data.autoRedirect}`);
          // Auto-redirect case: wrong agent selected
          const redirectAgent = data.autoRedirect;
          if (!selectedAgents.includes(redirectAgent)) {
            selectedAgents.push(redirectAgent);
          }
        }

        agentResponses.push({ 
          agent: agentType, 
          response: data 
        });

        logger.info(`${agentType} completed`, { 
          hasSuggestions: !!data.suggestedNextAgents?.length 
        });
      } catch (error) {
        logger.error(`${agentType} failed`, { error });
        agentResponses.push({
          agent: agentType,
          response: {
            response: `❌ ${agentType} agent encountered an error. Please try again.`,
            structuredData: null,
            suggestedNextAgents: []
          }
        });
      }
    }

    // Aggregate suggestions from all agents
    const allSuggestions: AgentSuggestion[] = [];
    agentResponses.forEach(({ response }) => {
      if (response.suggestedNextAgents) {
        allSuggestions.push(...response.suggestedNextAgents);
      }
    });

    // Remove duplicates and already-consulted agents
    const uniqueSuggestions = allSuggestions
      .filter((s, index, self) => 
        index === self.findIndex(t => t.agent === s.agent) &&
        !selectedAgents.includes(s.agent)
      )
      .sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return (priorityOrder[a.priority || 'medium'] - priorityOrder[b.priority || 'medium']);
      });

    return new Response(
      JSON.stringify({
        success: true,
        responses: agentResponses,
        suggestedNextAgents: uniqueSuggestions,
        consultedAgents: selectedAgents
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    logger.error('Router error', { error });
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
