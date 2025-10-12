// AGENT ROUTER - Self-Contained User-Driven Architecture (No shared deps)
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

// Inline CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Inline requestId generator
function generateRequestId(): string {
  const arr = new Uint8Array(8);
  crypto.getRandomValues(arr);
  return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
}

// Minimal inline logger
function createLogger(requestId: string) {
  return {
    info: (msg: string, data?: any) => console.log(`[${requestId}] ${msg}`, data || ''),
    warn: (msg: string, data?: any) => console.warn(`[${requestId}] ${msg}`, data || ''),
    error: (msg: string, data?: any) => console.error(`[${requestId}] ${msg}`, data || ''),
    debug: (msg: string, data?: any) => console.debug(`[${requestId}] ${msg}`, data || '')
  };
}

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
  'designer-multi': 'designer-agent',
  'cost-engineer': 'cost-engineer-v3',
  'installer': 'installer-v3',
  'health-safety': 'health-safety-v3',
  'commissioning': 'commissioning-v3',
  'project-manager': 'project-mgmt-v3'
};

function isMultiCircuitQuery(query: string): boolean {
  const patterns = [
    /multi.?circuit/i,
    /multiple circuits/i,
    /(\d+\s*circuits?)/i,
    /circuit \d+.*circuit \d+/i,
    /(?:ring|radial|cooker|shower|lighting|heater).*?(?:and|,|plus|\+).*?(?:ring|radial|cooker|shower|lighting|heater)/i
  ];
  return patterns.some(p => p.test(query));
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Health check
  if (req.method === 'GET') {
    return new Response(
      JSON.stringify({ status: 'healthy', function: 'agent-router' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId);

  try {
    const { 
      conversationId, 
      userMessage, 
      selectedAgents,
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
      return new Response(
        JSON.stringify({ success: false, error: 'userMessage is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    if (!selectedAgents || !Array.isArray(selectedAgents) || selectedAgents.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'selectedAgents array is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Multi-circuit routing
    if (selectedAgents.includes('designer') && isMultiCircuitQuery(userMessage)) {
      logger.info('Multi-circuit detected, routing to designer-agent');
      const designerIndex = selectedAgents.indexOf('designer');
      selectedAgents[designerIndex] = 'designer-multi';
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
      
      const response = await invokeAgentWithRetry(
        agentType,
        endpoint,
        {
          query: userMessage,
          messages: [
            ...messages,
            { role: 'user', content: userMessage }
          ],
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
    
    // Helper: Invoke agent with retry
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
          
          if (error.message?.includes('ValidationError') || error.message?.includes('400')) {
            logger.error(`${agentType} validation error (no retry)`, { error });
            throw error;
          }
          
          if (attempt < maxRetries) {
            const delay = 1000 * Math.pow(2, attempt);
            logger.warn(`${agentType} attempt ${attempt + 1} failed, retrying in ${delay}ms`, { error });
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }
          
          throw error;
          
        } catch (error) {
          if (attempt === maxRetries) {
            logger.error(`${agentType} failed after ${maxRetries + 1} attempts`, { error });
            return {
              hadError: true,
              partialResponse: {
                response: `⚠️ ${agentType} encountered an error but other agents can still help.`,
                structuredData: null,
                suggestedNextAgents: [],
                error: true
              }
            };
          }
        }
      }
      
      return {
        hadError: true,
        partialResponse: {
          response: `❌ ${agentType} is temporarily unavailable.`,
          structuredData: null,
          suggestedNextAgents: []
        }
      };
    }

    // Aggregate suggestions
    const allSuggestions: AgentSuggestion[] = [];
    agentResponses.forEach(({ response }) => {
      if (response.suggestedNextAgents) {
        allSuggestions.push(...response.suggestedNextAgents);
      }
    });

    const uniqueSuggestions = allSuggestions
      .filter((s, index, self) => 
        index === self.findIndex(t => t.agent === s.agent) &&
        !selectedAgents.includes(s.agent)
      )
      .sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return (priorityOrder[a.priority || 'medium'] - priorityOrder[b.priority || 'medium']);
      });

    // JSON Response
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
