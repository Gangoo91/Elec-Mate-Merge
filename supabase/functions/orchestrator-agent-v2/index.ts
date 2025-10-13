// CONVERSATIONAL MULTI-AGENT ORCHESTRATOR V3
// Intelligent context-sharing orchestration with RAG optimization
// Note: UK English only in user-facing strings. Do not use UK-only words like 'whilst' in code keywords.

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, ValidationError, getErrorMessage } from '../_shared/errors.ts';
import { validateAgentRequest, getRequestBody } from '../_shared/validation.ts';
import type { Message, ConversationState, ConversationSummary } from '../_shared/conversation-memory.ts';
import { buildConversationState, summarizeConversation } from '../_shared/conversation-memory.ts';
import { detectIntents, type IntentAnalysis } from '../_shared/intent-detection.ts';
import { planAgentSequence, type AgentContext, type AgentOutput, type AgentPlan } from '../_shared/agent-orchestration.ts';
import { validateResponse } from '../_shared/response-validation.ts';
import { ResponseCache, isCacheable } from '../_shared/response-cache.ts';
import { extractCircuitContext } from '../_shared/extract-circuit-context.ts';
import { validateAgentOutputs, formatValidationReport } from '../_shared/validation-layer.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import { 
  validateDesignerOutput, 
  validateCostOutput, 
  validateInstallerOutput,
  reviewChallenge,
  type Challenge 
} from '../_shared/agent-validation.ts';
import { createContextEnvelope, mergeContext, type ContextEnvelope, type QueryIntent, inferRAGPriority } from '../_shared/agent-context.ts';

const responseCache = new ResponseCache();

// Agent-level response cache (in-memory, 1 hour TTL)
const agentResultsCache = new Map<string, { data: any; timestamp: number }>();
const AGENT_CACHE_TTL = 60 * 60 * 1000; // 1 hour

interface AvailableAgent {
  name: string;
  endpoint: string;
  capabilities: string[];
  priority: number;
}

// PHASE 5: Complete V3 Integration - All agents use world-class RAG
const availableAgents: AvailableAgent[] = [
  { name: 'designer', endpoint: 'designer-v3', capabilities: ['design', 'calculations', 'cable-sizing'], priority: 1 },
  { name: 'health-safety', endpoint: 'health-safety-v3', capabilities: ['safety', 'risk-assessment', 'method-statements'], priority: 2 },
  { name: 'installer', endpoint: 'installer-v3', capabilities: ['installation', 'practical-guidance', 'tools'], priority: 3 },
  { name: 'inspector', endpoint: 'inspector-v3', capabilities: ['testing', 'inspection', 'certification'], priority: 4 },
  { name: 'cost', endpoint: 'cost-engineer-v3', capabilities: ['pricing', 'materials', 'labour'], priority: 5 },
  { name: 'project-mgmt', endpoint: 'project-mgmt-v3', capabilities: ['timeline', 'planning', 'coordination', 'scheduling'], priority: 6 }
];

function getCacheKey(messages: Message[], selectedAgents?: string[]): string {
  const lastMessage = messages[messages.length - 1]?.content || '';
  const agentKey = selectedAgents?.sort().join(',') || 'auto';
  return `${lastMessage.substring(0, 100)}_${agentKey}`;
}

function getAgentCacheKey(agentName: string, messages: Message[], context: any): string {
  const lastMessage = messages[messages.length - 1]?.content || '';
  const contextHash = JSON.stringify(context?.previousAgentOutputs || []).substring(0, 50);
  return `${agentName}_${lastMessage.substring(0, 50)}_${contextHash}`;
}

function getCachedAgentResult(cacheKey: string): any | null {
  const cached = agentResultsCache.get(cacheKey);
  if (!cached) return null;
  
  const age = Date.now() - cached.timestamp;
  if (age > AGENT_CACHE_TTL) {
    agentResultsCache.delete(cacheKey);
    return null;
  }
  
  return cached.data;
}

function setCachedAgentResult(cacheKey: string, data: any): void {
  agentResultsCache.set(cacheKey, {
    data,
    timestamp: Date.now()
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'orchestrator-agent-v2' });
  const startTime = Date.now();

  try {
    const { messages, context, selectedAgents, sessionId, conversationalMode = false, currentDesign, jobScale = 'commercial' } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) throw new ValidationError('OPENAI_API_KEY not configured');

    logger.info('Orchestrator starting', { 
      messageCount: messages?.length,
      selectedAgents,
      conversationalMode,
      sessionId
    });

    // Create QueryIntent and ContextEnvelope
    const latestMessage = messages[messages.length - 1]?.content || '';
    const queryIntent = inferQueryIntent(latestMessage);
    
    let agentContext: ContextEnvelope = context?.agentContext || createContextEnvelope(requestId, queryIntent);
    agentContext.sessionId = sessionId;
    agentContext.agentChain.push('orchestrator');
    
    logger.info('Context created', { 
      queryIntent: queryIntent.primaryGoal,
      circuitType: queryIntent.circuitType,
      ragPriority: agentContext.ragPriority
    });

    // Check cache for identical requests
    const cacheKey = getCacheKey(messages, selectedAgents);
    const cachedResponse = responseCache.get(cacheKey);
    
    if (cachedResponse && isCacheable(messages)) {
      logger.info('Cache hit - returning cached response', { cacheKey });
      return new Response(JSON.stringify({
        ...cachedResponse,
        cached: true,
        cacheAge: Date.now() - (cachedResponse.timestamp || Date.now())
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Build conversation state
    const conversationState = buildConversationState(messages, context);
    const conversationSummary = await summarizeConversation(messages, openAIApiKey);
    
    logger.debug('Conversation state built', {
      messageCount: conversationState.messageCount,
      lastTopic: conversationSummary.lastTopic
    });

    // Detect intents - build proper ConversationSummary with safe defaults
    const safeSummary: ConversationSummary = {
      projectType: conversationSummary?.projectType || conversationState?.projectType || 'domestic',
      lastTopic: conversationSummary?.lastTopic || conversationState?.lastTopic || 'general electrical work',
      keyFacts: conversationSummary?.keyFacts || [],
      decisions: conversationSummary?.decisions || [],
      requirements: conversationSummary?.requirements || [],
      openQuestions: conversationSummary?.openQuestions || []
    };
    
    // PHASE 1: FIX - await detectIntents and pass openAIApiKey
    const intents = await detectIntents(messages[messages.length - 1]?.content || '', safeSummary, openAIApiKey);
    
    // PHASE 2: Check if clarification is needed BEFORE calling agents
    if (intents.requiresClarification && intents.suggestedFollowUp) {
      logger.info('Clarification required', { suggestedFollowUp: intents.suggestedFollowUp });
      
      const clarificationResponse = {
        agent: 'orchestrator',
        agentPlan: [],
        agentOutputs: [],
        combinedResponse: `I need a bit more information to create an accurate design:\n\n${intents.suggestedFollowUp}\n\nOnce you provide these details, I can give you a comprehensive BS 7671-compliant design with exact cable sizes, protection devices, and cost estimates.`,
        confidence: 0.9,
        conversationState,
        conversationSummary,
        requiresClarification: true,
        executionTime: Date.now() - startTime,
        agentContext
      };
      
      return new Response(JSON.stringify(clarificationResponse), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    logger.info('Intents detected', {
      primary: intents.primary,
      secondary: intents.secondary,
      confidence: intents.confidence
    });

    // Plan agent sequence
    const agentPlan = await planAgentSequence(
      intents,
      safeSummary,
      latestMessage,
      openAIApiKey
    );
    
    logger.info('Agent plan created', {
      sequence: agentPlan.sequence.map(s => s.agent),
      reasoning: agentPlan.reasoning
    });

    // Initialize Supabase client for agent calls
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Execute agent sequence with context passing
    const agentOutputs: AgentOutput[] = [];
    let totalRAGCalls = 0;
    let designerFoundRegulations: any[] = [];
    
    for (const agentStep of agentPlan.sequence) {
      const agent = availableAgents.find(a => a.name === agentStep.agent);
      if (!agent) continue;

      try {
        // Check agent-level cache
        const agentCacheKey = getAgentCacheKey(agent.name, messages, { previousAgentOutputs: agentOutputs });
        const cachedAgentResult = getCachedAgentResult(agentCacheKey);
        
        if (cachedAgentResult) {
          logger.info(`Agent cache hit: ${agent.name}`);
          agentOutputs.push(cachedAgentResult);
          continue;
        }

        // Extract circuit context for H&S agent if designer has already provided circuit details
        let circuitContext = 'General electrical installation (circuit type unknown)';
        if (agent.name === 'health-safety' && agentOutputs.length > 0) {
          try {
            circuitContext = extractCircuitContext({ previousAgentOutputs: agentOutputs });
          } catch (error) {
            logger.warn('Failed to extract circuit context for H&S agent', { error: error.message });
          }
        }

        // PHASE 3: RAG Context Sharing - After designer completes, share regulations with other agents
        const shouldSkipRAG = agent.name !== 'designer' && designerFoundRegulations.length > 0;
        
        const agentResponse = await logger.time(
          `${agent.name} agent call`,
          () => withRetry(
            () => withTimeout(
              supabase.functions.invoke(agent.endpoint, {
                body: {
                  messages,
                  context: {
                    ...context,
                    conversationState,
                    conversationSummary: safeSummary,
                    circuitContext,
                    previousAgentOutputs: agentOutputs,
                    // PHASE 3: Pass shared RAG context
                    skipRAG: shouldSkipRAG,
                    sharedRegulations: designerFoundRegulations
                  },
                  currentDesign,
                  jobScale,
                  incomingContext: shouldSkipRAG ? {
                    ...agentContext,
                    foundRegulations: designerFoundRegulations
                  } : agentContext
                }
              }),
              Timeouts.LONG,
              `${agent.name} agent call`
            ),
            RetryPresets.STANDARD
          )
        );

        if (agentResponse.data) {
          const parsedData = typeof agentResponse.data === 'string' 
            ? JSON.parse(agentResponse.data) 
            : agentResponse.data;

          const agentOutput: AgentOutput = {
            agent: agent.name,
            response: parsedData.response || JSON.stringify(parsedData),
            data: parsedData
          };

          agentOutputs.push(agentOutput);

          // Cache agent result
          setCachedAgentResult(agentCacheKey, agentOutput);

          // Merge context from agent
          if (parsedData.agentContext) {
            agentContext = mergeContext(agentContext, parsedData.agentContext);
            
            // PHASE 3: After designer completes, extract regulations for sharing
            if (agent.name === 'designer' && agentContext.foundRegulations) {
              designerFoundRegulations = agentContext.foundRegulations;
              totalRAGCalls++;
              logger.info(`🚀 RAG: Designer searched ${designerFoundRegulations.length} regulations`, {
                ragCallCount: 1
              });
            } else if (shouldSkipRAG) {
              logger.info(`♻️ ${agent.name} reused designer's ${designerFoundRegulations.length} regulations (0ms RAG)`);
            }
            
            logger.info(`Context updated by ${agent.name}`, {
              ragCalls: agentContext.ragCallCount,
              regulations: agentContext.foundRegulations?.length || 0,
              totalRAGCalls
            });
          }

          logger.info(`${agent.name} completed`, {
            confidence: parsedData.confidence,
            hasStructuredData: !!parsedData.structuredData
          });
        }
      } catch (error) {
        logger.error(`${agent.name} failed:`, error);
        agentOutputs.push({
          agent: agent.name,
          response: `${agent.name} encountered an error: ${getErrorMessage(error)}`,
          data: { error: getErrorMessage(error) }
        });
      }
    }

    // Validate agent outputs
    const validationResults = validateAgentOutputs(agentOutputs, intents);
    const validationReport = formatValidationReport(validationResults);
    
    logger.info('Agent outputs validated', {
      allValid: validationResults.every(r => r.isValid),
      issues: validationResults.filter(r => !r.isValid).length
    });

    // PHASE 4: Intelligent Response Synthesis
    const { synthesizeAgentOutputs } = await import('../_shared/response-synthesizer.ts');
    
    const synthesizedResponse = await synthesizeAgentOutputs({
      intents,
      agentOutputs,
      conversationState,
      foundRegulations: designerFoundRegulations,
      ragMetadata: {
        totalRAGCalls,
        regulationCount: designerFoundRegulations.length,
        searchMethod: agentContext.foundRegulations?.[0]?.source || 'hybrid'
      },
      agentChain: agentPlan.sequence.map(s => s.agent),
      validationReport: !validationResults.every(r => r.isValid) ? validationReport : undefined
    });
    
    const combinedResponse = synthesizedResponse;

    // Build final response
    const finalResponse = {
      agent: 'orchestrator',
      agentPlan: agentPlan.sequence.map(s => s.agent),
      agentOutputs,
      combinedResponse,
      confidence: Math.min(...agentOutputs.map(o => o.data?.confidence || 0.8)),
      conversationState,
      conversationSummary,
      validationResults,
      executionTime: Date.now() - startTime,
      agentContext
    };

    // Cache response if appropriate
    if (isCacheable(messages)) {
      responseCache.set(cacheKey, finalResponse);
      logger.debug('Response cached', { cacheKey });
    }

    logger.info('Orchestration complete', {
      agentsExecuted: agentOutputs.length,
      executionTime: finalResponse.executionTime,
      confidence: finalResponse.confidence
    });

    return new Response(JSON.stringify(finalResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    logger.error('Orchestrator error', { error: getErrorMessage(error) });
    return handleError(error, logger, corsHeaders);
  }
});

// Infer query intent for RAG prioritization
function inferQueryIntent(message: string): QueryIntent {
  const lower = message.toLowerCase();
  
  let primaryGoal: QueryIntent['primaryGoal'] = 'general';
  if (/(design|calculate|cable|size|voltage drop)/i.test(lower)) primaryGoal = 'design';
  else if (/(safe|risk|hazard|ppe|method statement)/i.test(lower)) primaryGoal = 'safety';
  else if (/(install|route|fix|terminate|clip)/i.test(lower)) primaryGoal = 'installation';
  else if (/(test|inspect|verify|cert)/i.test(lower)) primaryGoal = 'inspection';
  else if (/(price|cost|quote)/i.test(lower)) primaryGoal = 'pricing';

  let circuitType: string | undefined;
  if (/shower/i.test(lower)) circuitType = 'shower';
  else if (/cooker/i.test(lower)) circuitType = 'cooker';
  else if (/socket|ring/i.test(lower)) circuitType = 'socket';
  else if (/light/i.test(lower)) circuitType = 'lighting';
  else if (/(ev|car charg)/i.test(lower)) circuitType = 'ev';

  const powerMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:kw|kilowatt|w|watt)/i);
  const powerRating = powerMatch ? parseFloat(powerMatch[1]) * (powerMatch[0].includes('kw') ? 1000 : 1) : undefined;

  let complexity: QueryIntent['complexity'] = 'medium';
  if (/(simple|basic|single|one circuit)/i.test(lower)) complexity = 'simple';
  else if (/(complex|multi|three phase|industrial|several)/i.test(lower)) complexity = 'complex';

  const requiresCalculations = /(calculate|size|select|determine|volt drop)/i.test(lower);
  const requiresRegulations = /(regulation|bs ?7671|must|require|comply)/i.test(lower);

  const keywords = lower.split(/\s+/).filter(w => w.length > 3);

  return {
    primaryGoal,
    circuitType,
    powerRating,
    complexity,
    requiresCalculations,
    requiresRegulations,
    keywords: keywords.slice(0, 10)
  };
}
