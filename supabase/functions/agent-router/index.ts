// AGENT ROUTER - Self-Contained User-Driven Architecture (No shared deps)
import { serve } from '../_shared/deps.ts';
import { captureException } from '../_shared/sentry.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

// Inline CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
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
  'designer-multi': 'designer-agent-v3', // Use V3 for multi-circuit designs
  'cost-engineer': 'cost-engineer-v3',
  'installer': 'installer-v3',
  'health-safety': 'health-safety-v3',
  'commissioning': 'commissioning-v3',
  'inspector': 'inspector-v3',
  'project-manager': 'project-mgmt-v3'
};

function isMultiCircuitQuery(query: string): boolean {
  const patterns = [
    /multi.?circuit/i,
    /multiple circuits/i,
    /(\d+\s*circuits?)/i,
    /circuit \d+.*circuit \d+/i,
    /(?:ring|radial|cooker|shower|lighting|heater).*?(?:and|,|plus|\+).*?(?:ring|radial|cooker|shower|lighting|heater)/i,
    // 🆕 HIGH-LEVEL DESIGN PATTERNS (full house, rewire, consumer unit sizing)
    /full house|whole house|house rewire|complete rewire/i,
    /(\d+)[\s-]?way.*(?:board|consumer unit|CU)/i,
    /(\d+)[\s-]?bed.*(?:house|property|rewire)/i,
    /board change|consumer unit.*(?:sizing|design|planning)/i
  ];
  return patterns.some(p => p.test(query));
}

// PHASE 2: Cross-Agent Knowledge Sharing - Conversation-level RAG cache
const conversationRAGCache = new Map<string, { regulations: any[]; timestamp: number }>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

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
      currentDesign,
      contextFromPreviousAgent,
      mode // NEW: 'method-statement' or undefined
    } = await req.json();

    logger.info('🚀 Agent router invoked', { 
      conversationId, 
      userMessage: userMessage?.slice(0, 50), 
      agents: selectedAgents,
      messageCount: messages.length,
      mode 
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

    // PHASE 2: Get shared regulations from cache (if available)
    let sharedRegulations: any[] = [];
    if (conversationId) {
      const cached = conversationRAGCache.get(conversationId);
      if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
        sharedRegulations = cached.regulations;
        logger.info(`♻️ Found ${sharedRegulations.length} shared regulations from cache`);
      }
    }

    // PHASE 3: Extract job details from context
    let projectMeta: any = {};
    if (currentDesign) {
      projectMeta = {
        projectName: currentDesign.projectName || currentDesign.design?.projectName,
        location: currentDesign.location || currentDesign.design?.location,
        clientName: currentDesign.clientName,
        budget: currentDesign.budget,
        deadline: currentDesign.deadline,
        buildingType: currentDesign.buildingType || currentDesign.design?.installationType
      };
    }
    
    // Extract from messages if not in currentDesign
    if (!projectMeta.clientName && messages.length > 0) {
      const clientMatch = messages.find(m => m.content?.toLowerCase().includes('client:'));
      if (clientMatch) {
        const match = clientMatch.content.match(/client:\s*([^\n]+)/i);
        if (match) projectMeta.clientName = match[1].trim();
      }
    }
    
    logger.info('📋 Project metadata extracted:', projectMeta);

    // NEW: For method-statement mode, run all agents in STAGED PARALLEL EXECUTION
    let agentResponses: Array<{ agent: string; response: AgentResponse }> = [];
    let totalRAGCalls = 0;
    
    if (mode === 'method-statement') {
      logger.info('🚀 Method Statement Mode: STAGED PARALLEL execution');
      
      const completedResponses: Array<{ agent: string; response: AgentResponse }> = [];
      
      // STAGE 1: Designer runs FIRST (provides circuit specs for other agents)
      const designerAgent = selectedAgents.find(a => a === 'designer' || a === 'designer-multi');
      if (designerAgent) {
        logger.info(`📐 STAGE 1: Running ${designerAgent} first to establish circuit context`);
        
        const designerEndpoint = AGENT_ENDPOINTS[designerAgent];
        const designerResponse = await invokeAgentWithRetry(
          designerAgent,
          designerEndpoint,
          {
            query: contextFromPreviousAgent ? `${contextFromPreviousAgent}\n\n${userMessage}` : userMessage,
            messages: [
              ...messages,
              { role: 'user', content: userMessage }
            ],
            conversationId,
            currentDesign,
            requestSuggestions: true,
            contextFromPreviousAgent,
            projectDetails: { ...currentDesign, ...projectMeta }
          },
          supabase,
          logger
        );
        
        if (!designerResponse.hadError && designerResponse.data) {
          completedResponses.push({ 
            agent: designerAgent, 
            response: designerResponse.data 
          });
          
          // Cache designer regulations for other agents
          if (designerResponse.data?.citations && conversationId) {
            const regulations = designerResponse.data.citations.map((c: any) => ({
              regulation_number: c.section || c.regulation_number,
              section: c.title || c.section,
              content: c.content || c.excerpt,
              relevance: c.relevance || 0.8
            }));
            
            conversationRAGCache.set(conversationId, {
              regulations,
              timestamp: Date.now()
            });
            
            sharedRegulations = regulations;
            totalRAGCalls++;
            logger.info(`🚀 Cached ${regulations.length} regulations from ${designerAgent}`);
          }
          
          logger.info(`✅ STAGE 1 complete: ${designerAgent} output available to other agents`);
        }
      }
      
      // STAGE 2: All other agents run IN PARALLEL with designer context
      const remainingAgents = selectedAgents.filter(a => a !== designerAgent);
      
      if (remainingAgents.length > 0) {
        logger.info(`🔀 STAGE 2: Running ${remainingAgents.length} agents in parallel with designer context`);
        
        const parallelCalls = remainingAgents.map((agentType) => {
          const endpoint = AGENT_ENDPOINTS[agentType];
          if (!endpoint) {
            logger.warn('Unknown agent type', { agentType });
            return Promise.resolve({ agent: agentType, response: null, hadError: true });
          }

          logger.info(`Starting ${agentType} agent (parallel with designer context)`);
          
          const shouldUseSharedRegs = sharedRegulations.length > 0;
          
          return invokeAgentWithRetry(
            agentType,
            endpoint,
            {
              query: contextFromPreviousAgent ? `${contextFromPreviousAgent}\n\n${userMessage}` : userMessage,
              messages: [
                ...messages,
                { role: 'user', content: userMessage }
              ],
              conversationId,
              currentDesign,
              // Pass designer output to all agents
              previousAgentOutputs: completedResponses,
              requestSuggestions: true,
              sharedRegulations: shouldUseSharedRegs ? sharedRegulations : undefined,
              contextFromPreviousAgent,
              projectDetails: { ...currentDesign, ...projectMeta }
            },
            supabase,
            logger
          ).then(response => ({ agent: agentType, response, hadError: response.hadError }));
        });
        
        const results = await Promise.all(parallelCalls);
        
        // Add successful results to completedResponses
        results.forEach(r => {
          if (!r.hadError && r.response && r.response.data) {
            completedResponses.push({ 
              agent: r.agent, 
              response: r.response.data 
            });
          }
        });
        
        logger.info(`✅ STAGE 2 complete: ${completedResponses.length - (designerAgent ? 1 : 0)}/${remainingAgents.length} agents succeeded`);
      }
      
      agentResponses = completedResponses;
      logger.info(`✅ Staged parallel execution complete: ${agentResponses.length}/${selectedAgents.length} total agents succeeded`);
      
    } else {
      // Original sequential execution for other modes
      for (const agentType of selectedAgents) {
        const endpoint = AGENT_ENDPOINTS[agentType];
        if (!endpoint) {
          logger.warn('Unknown agent type', { agentType });
          continue;
        }

        logger.info(`Calling ${agentType} agent`);
      
      // PHASE 2: Pass shared regulations to non-designer agents
      const shouldUseSharedRegs = agentType !== 'designer' && agentType !== 'designer-multi' && sharedRegulations.length > 0;
      
      const response = await invokeAgentWithRetry(
        agentType,
        endpoint,
        {
          query: contextFromPreviousAgent ? `${contextFromPreviousAgent}\n\n${userMessage}` : userMessage,
          messages: [
            ...messages,
            { role: 'user', content: userMessage }
          ],
          conversationId,
          currentDesign,
          previousAgentOutputs: agentResponses,
          requestSuggestions: true,
          // PHASE 2: Include shared knowledge
          sharedRegulations: shouldUseSharedRegs ? sharedRegulations : undefined,
          contextFromPreviousAgent,
          // PHASE 3: Include job details
          projectDetails: { ...currentDesign, ...projectMeta }
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

      // PHASE 2: Store regulations from designer for sharing with other agents
      if ((agentType === 'designer' || agentType === 'designer-multi') && response.data?.citations && conversationId) {
        const regulations = response.data.citations.map((c: any) => ({
          regulation_number: c.section || c.regulation_number,
          section: c.title || c.section,
          content: c.content || c.excerpt,
          relevance: c.relevance || 0.8
        }));
        
        conversationRAGCache.set(conversationId, {
          regulations,
          timestamp: Date.now()
        });
        
        sharedRegulations = regulations;
        totalRAGCalls++;
        logger.info(`🚀 Cached ${regulations.length} regulations from designer for conversation ${conversationId}`);
      } else if (shouldUseSharedRegs && sharedRegulations.length > 0) {
        logger.info(`♻️ ${agentType} reused ${sharedRegulations.length} shared regulations (0ms RAG)`);
      }

        logger.info(`${agentType} completed`, { 
          hasSuggestions: !!(response.data?.suggestedNextAgents?.length),
          hadError: response.hadError,
          usedSharedRegs: shouldUseSharedRegs
        });
      }
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
        consultedAgents: selectedAgents,
        // PHASE 2: Return RAG efficiency metrics
        metadata: {
          totalRAGCalls,
          cachedRegulations: sharedRegulations.length,
          ragEfficiency: totalRAGCalls > 0 ? `Saved ${selectedAgents.length - totalRAGCalls} RAG calls` : undefined
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    logger.error('Router error', { error });
    await captureException(error, {
      functionName: 'agent-router',
      requestUrl: req.url,
      requestMethod: req.method
    });
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
