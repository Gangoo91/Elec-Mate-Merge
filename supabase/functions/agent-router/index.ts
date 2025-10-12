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
  'designer': 'designer-v3',
  'designer-multi': 'designer-agent', // Multi-circuit designer
  'cost-engineer': 'cost-engineer-v3',
  'installer': 'installer-v3',
  'health-safety': 'health-safety-v3',
  'commissioning': 'commissioning-v3',
  'project-manager': 'project-mgmt-v3'
};

/**
 * Detect multi-circuit queries in user message
 */
function isMultiCircuitQuery(query: string): boolean {
  const patterns = [
    /multi.?circuit/i,
    /multiple circuits/i,
    /(\d+\s*circuits?)/i,
    /circuit \d+.*circuit \d+/i,  // "circuit 1... circuit 2"
    /(?:ring|radial|cooker|shower|lighting|heater).*?(?:and|,|plus|\+).*?(?:ring|radial|cooker|shower|lighting|heater)/i  // "ring main and cooker circuit"
  ];
  
  return patterns.some(p => p.test(query));
}

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

    logger.info('🚀 Agent router invoked', { 
      conversationId, 
      userMessage: userMessage?.slice(0, 50), 
      agents: selectedAgents,
      messageCount: messages.length 
    });

    if (!userMessage) {
      throw new ValidationError('userMessage is required');
    }

    if (!selectedAgents || !Array.isArray(selectedAgents) || selectedAgents.length === 0) {
      throw new ValidationError('selectedAgents array is required and must not be empty');
    }

    // Multi-circuit routing: Automatically route to designer-agent for multi-circuit queries
    if (selectedAgents.includes('designer') && isMultiCircuitQuery(userMessage)) {
      logger.info('Multi-circuit detected, routing to designer-agent');
      const designerIndex = selectedAgents.indexOf('designer');
      selectedAgents[designerIndex] = 'designer-multi';
    }

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

    // Call agents sequentially with retry logic
    const agentResponses: Array<{ agent: string; response: AgentResponse }> = [];
    
    for (const agentType of selectedAgents) {
      const endpoint = AGENT_ENDPOINTS[agentType];
      if (!endpoint) {
        logger.warn('Unknown agent type', { agentType });
        continue;
      }

      logger.info(`Calling ${agentType} agent`);
      
      // Invoke with retry logic
      const response = await invokeAgentWithRetry(
        agentType,
        endpoint,
        {
          query: userMessage,
          messages: [
            ...messages,
            { role: 'user', content: userMessage }
          ],
          conversationSummary,
          conversationId,
          currentDesign,
          previousAgentOutputs: agentResponses,
          requestSuggestions: true
        },
        supabase,
        logger
      );

      if (response.data?.autoRedirect) {
        logger.info(`${agentType} redirecting to ${response.data.autoRedirect}`);
        const redirectAgent = response.data.autoRedirect;
        if (!selectedAgents.includes(redirectAgent)) {
          selectedAgents.push(redirectAgent);
        }
      }

      agentResponses.push({ 
        agent: agentType, 
        response: response.data || response.partialResponse
      });

      logger.info(`${agentType} completed`, { 
        hasSuggestions: !!(response.data?.suggestedNextAgents?.length),
        hadError: response.hadError
      });
    }
    
    // Helper function: Invoke agent with retry logic
    async function invokeAgentWithRetry(
      agentType: string,
      endpoint: string,
      body: any,
      supabase: any,
      logger: any,
      maxRetries = 2
    ): Promise<{ data?: any; hadError: boolean; partialResponse?: any }> {
      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          const { data, error } = await supabase.functions.invoke(endpoint, { body });
          
          if (!error) {
            return { data, hadError: false };
          }
          
          // Don't retry validation errors
          if (error.message?.includes('ValidationError') || error.message?.includes('400')) {
            logger.error(`${agentType} validation error (no retry)`, { error });
            throw error;
          }
          
          // Retry transient errors with exponential backoff
          if (attempt < maxRetries) {
            const delay = 1000 * Math.pow(2, attempt);
            logger.warn(`${agentType} attempt ${attempt + 1} failed, retrying in ${delay}ms`, { error });
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }
          
          throw error;
          
        } catch (error) {
          if (attempt === maxRetries) {
            // Return partial success instead of crashing entire consultation
            logger.error(`${agentType} failed after ${maxRetries + 1} attempts`, { error });
            return {
              hadError: true,
              partialResponse: {
                response: `⚠️ ${agentType} encountered an error but other agents can still help. Please try again or contact support if this persists.`,
                structuredData: null,
                suggestedNextAgents: [],
                error: true
              }
            };
          }
        }
      }
      
      // Fallback (should never reach here)
      return {
        hadError: true,
        partialResponse: {
          response: `❌ ${agentType} is temporarily unavailable.`,
          structuredData: null,
          suggestedNextAgents: []
        }
      };
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

    // Check Accept header for SSE vs JSON
    const acceptHeader = req.headers.get('Accept') || '';
    const wantsSSE = acceptHeader.includes('text/event-stream');

    if (wantsSSE) {
      // SSE Streaming Response
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          try {
            // Send plan
            const planChunk = `data: ${JSON.stringify({
              type: 'plan',
              agents: selectedAgents,
              total: selectedAgents.length
            })}\n\n`;
            controller.enqueue(encoder.encode(planChunk));

            // Send agent responses
            for (let i = 0; i < agentResponses.length; i++) {
              const { agent, response } = agentResponses[i];
              
              const responseChunk = `data: ${JSON.stringify({
                type: 'agent_response',
                agent,
                index: i + 1,
                total: agentResponses.length,
                response: response.response,
                structuredData: response.structuredData,
                suggestedNextAgents: response.suggestedNextAgents
              })}\n\n`;
              controller.enqueue(encoder.encode(responseChunk));
            }

            // Send completion
            const doneChunk = `data: ${JSON.stringify({
              type: 'all_agents_complete',
              suggestedNextAgents: uniqueSuggestions,
              consultedAgents: selectedAgents
            })}\n\n`;
            controller.enqueue(encoder.encode(doneChunk));

            controller.close();
          } catch (error) {
            const errorChunk = `data: ${JSON.stringify({
              type: 'error',
              error: error instanceof Error ? error.message : 'Unknown error'
            })}\n\n`;
            controller.enqueue(encoder.encode(errorChunk));
            controller.close();
          }
        }
      });

      return new Response(stream, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      });
    } else {
      // JSON Response (backwards compatibility)
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
    }

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
