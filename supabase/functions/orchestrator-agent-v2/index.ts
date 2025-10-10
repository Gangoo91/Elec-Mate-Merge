// CONVERSATIONAL MULTI-AGENT ORCHESTRATOR V2
// Sequential agent conversations where each specialist speaks directly to the user
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
import { cleanupExpiredConfirmations } from './confirmation-handler.ts';

// corsHeaders imported from shared deps

const responseCache = new ResponseCache();

// Agent-level response cache (in-memory, 1 hour TTL)
const agentResultsCache = new Map<string, { data: any; timestamp: number }>();
const AGENT_CACHE_TTL = 60 * 60 * 1000; // 1 hour

// PRIORITY 1: Pending confirmation sessions (in-memory, 30 min TTL)
interface ConfirmationSession {
  confirmationId: string;
  sessionData: {
    agentPlan: any;
    messages: Message[];
    currentDesign: any;
    conversationSummary: ConversationSummary;
    conversationState: ConversationState;
    latestMessage: string;
    questionAnalysis: any;
  };
  timestamp: number;
}

const pendingConfirmations = new Map<string, ConfirmationSession>();
const CONFIRMATION_TTL = 30 * 60 * 1000; // 30 minutes

// Helper to get from cache with TTL check
function getFromAgentCache(key: string): any | null {
  const cached = agentResultsCache.get(key);
  if (!cached) return null;
  
  if (Date.now() - cached.timestamp > AGENT_CACHE_TTL) {
    agentResultsCache.delete(key);  // Expired
    return null;
  }
  
  return cached.data;
}

// Periodic cleanup (run at start of each request)
function cleanupExpiredCache() {
  const now = Date.now();
  for (const [key, value] of agentResultsCache.entries()) {
    if (now - value.timestamp > AGENT_CACHE_TTL) {
      agentResultsCache.delete(key);
    }
  }
}

// Helper to extract circuit count from message
function extractCircuitCount(message: string): number {
  const wayMatch = message.match(/(\d+)[\s-]?way/i);
  if (wayMatch) return parseInt(wayMatch[1]);
  
  const circuitMatch = message.match(/(\d+)\s+circuits?/i);
  if (circuitMatch) return parseInt(circuitMatch[1]);
  
  return 6; // Default
}

// PHASE 1: Question analysis helper functions
function extractLoadFromMessage(message: string): number | null {
  const kwMatch = message.match(/(\d+(?:\.\d+)?)\s*kW/i);
  if (kwMatch) return parseFloat(kwMatch[1]);
  
  const wMatch = message.match(/(\d+(?:\.\d+)?)\s*W/i);
  if (wMatch) return parseFloat(wMatch[1]) / 1000;
  
  const ampMatch = message.match(/(\d+(?:\.\d+)?)\s*A/i);
  if (ampMatch) {
    const voltage = extractVoltageFromMessage(message) || 230;
    return (parseFloat(ampMatch[1]) * voltage) / 1000;
  }
  
  return null;
}

function extractDistanceFromMessage(message: string): number | null {
  const match = message.match(/(\d+(?:\.\d+)?)\s*(?:m|metre|meter)s?/i);
  return match ? parseFloat(match[1]) : null;
}

function extractEnvironmentFromMessage(message: string): string | null {
  if (/outdoor|outside|external/i.test(message)) return 'outdoor';
  if (/indoor|inside|internal/i.test(message)) return 'indoor';
  if (/buried|underground/i.test(message)) return 'underground';
  if (/loft|attic|roof\s*space/i.test(message)) return 'loft';
  return null;
}

function extractVoltageFromMessage(message: string): number | null {
  const match = message.match(/(\d+)\s*V/i);
  if (match) return parseInt(match[1]);
  
  if (/3[\s-]?phase|three[\s-]?phase|400V/i.test(message)) return 400;
  return 230;
}

function extractPhasesFromMessage(message: string): string {
  if (/3[\s-]?phase|three[\s-]?phase|400V/i.test(message)) return 'three';
  if (/single[\s-]?phase|230V|240V/i.test(message)) return 'single';
  return 'single';
}

function extractCircuitTypeFromMessage(message: string): string | null {
  const types: { [key: string]: RegExp } = {
    'cooker': /cooker|oven|hob/i,
    'shower': /shower|electric\s*shower/i,
    'immersion': /immersion|water\s*heater/i,
    'ev-charging': /ev\s*charg|electric\s*vehicle|car\s*charg/i,
    'ring-main': /ring\s*main|socket\s*circuit|sockets/i,
    'lighting': /light|lighting\s*circuit/i,
    'heater': /heater|heating/i,
    'motor': /motor|pump/i
  };
  
  for (const [type, regex] of Object.entries(types)) {
    if (regex.test(message)) return type;
  }
  
  return null;
}

function identifyMissingInfo(message: string, intentAnalysis: any): string[] {
  const missing: string[] = [];
  
  if (!extractLoadFromMessage(message)) missing.push('Load (kW/Amps)');
  if (!extractDistanceFromMessage(message)) missing.push('Cable length (metres)');
  if (!extractEnvironmentFromMessage(message)) missing.push('Installation environment');
  if (!/mcb|rcbo|rcd|fuse/i.test(message)) missing.push('Protection device preference');
  if (!/swa|twin.*earth|armoured|conduit|trunking/i.test(message)) missing.push('Cable type/installation method');
  
  return missing;
}

interface OrchestratorRequest {
  messages: Message[];
  currentDesign?: any;
  conversationalMode?: boolean; // Enable sequential agent conversations
  selectedAgents?: string[]; // User-selected agents (e.g., ['designer', 'cost-engineer'])
  targetAgent?: string; // Specific agent to re-engage for follow-up
}

serve(async (req) => {
if (req.method === 'OPTIONS') {
    console.log('[orchestrator-v2] CORS preflight');
    return new Response(null, { headers: corsHeaders });
  }

  // PRIORITY 1: Handle confirmation endpoint
  const url = new URL(req.url);
  if (url.searchParams.get('action') === 'confirm') {
    return handleConfirmation(req);
  }

try {
    console.log('[orchestrator-v2] POST start');
    const startTime = Date.now();
    
    // WAVE 2 FIX: Cleanup expired cache entries at start of each request
    cleanupExpiredCache();
    
    const body = await getRequestBody(req);
    const validatedRequest = validateAgentRequest(body);
    const { messages, currentDesign, conversationalMode = true, selectedAgents, targetAgent } = validatedRequest;
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Initialize structured logging with request ID
    const requestId = generateRequestId();
    const logger = createLogger(requestId, {
      conversationalMode,
      messageCount: messages.length,
      hasSelectedAgents: !!selectedAgents,
      hasTargetAgent: !!targetAgent,
    });

    logger.info('🎯 Conversational Orchestrator V2: Starting multi-agent consultation');
    
    const latestMessage = messages[messages.length - 1]?.content || '';

    // PHASE 8: Check cache first for common queries
    if (isCacheable(latestMessage)) {
      const cached = await responseCache.get(latestMessage);
      if (cached) {
        console.log('⚡ Returning cached response (10x faster)');
        return new Response(JSON.stringify({
          response: cached.response,
          activeAgents: ['cache'],
          citations: cached.citations,
          confidence: cached.confidence,
          fromCache: true,
          executionTime: Date.now() - startTime,
          timestamp: new Date().toISOString()
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Build conversation state and summary
    console.log('📊 Building conversation memory...');
    const conversationState = buildConversationState(messages);
    const conversationSummary = await summarizeConversation(messages, openAIApiKey);
    
    console.log('Conversation State:', {
      projectType: conversationState.projectType,
      stage: conversationState.stage,
      circuits: conversationState.circuits.length,
      lastTopic: conversationSummary.lastTopic
    });

    // AI-powered intent detection with retry protection
    logger.info('🎯 AI intent detection...');
    const intentAnalysis = await withRetry(
      () => withTimeout(
        detectIntents(latestMessage, conversationSummary, openAIApiKey),
        Timeouts.STANDARD,
        'detectIntents'
      ),
      RetryPresets.STANDARD
    );
    
    // Validate intent analysis before logging
    if (intentAnalysis && intentAnalysis.intents) {
      logger.info('Intent Analysis:', {
        primary: intentAnalysis.primaryIntent,
        scores: intentAnalysis.intents,
        reasoning: intentAnalysis.reasoning
      });
    } else {
      logger.error('❌ Invalid intent analysis received:', intentAnalysis);
    }

    // Handle clarification requests
    if (intentAnalysis.requiresClarification && intentAnalysis.suggestedFollowUp) {
      return new Response(JSON.stringify({
        response: intentAnalysis.suggestedFollowUp,
        activeAgents: [],
        citations: [],
        requiresClarification: true,
        timestamp: new Date().toISOString()
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Detect if this is a follow-up question to a specific agent
    const followUpMatch = latestMessage.match(/Continue to (designer|cost-engineer|installer|commissioning)/i);
    const isFollowUpToAgent = messages.length > 3 && !followUpMatch && !latestMessage.toLowerCase().includes('design') && !latestMessage.toLowerCase().includes('new');
    
    // Plan agent sequence with retry protection
    console.log('📋 Planning agent conversation sequence...');
    const agentPlan = await withRetry(
      () => withTimeout(
        planAgentSequence(intentAnalysis, conversationSummary, latestMessage, openAIApiKey),
        Timeouts.STANDARD,
        'planAgentSequence'
      ),
      RetryPresets.STANDARD
    );
    
    // Safety check
    if (!agentPlan || !agentPlan.sequence || agentPlan.sequence.length === 0) {
      console.warn('⚠️ Empty agent plan, using safe default');
      agentPlan.sequence = [{
        agent: 'designer',
        priority: 1,
        reasoning: 'Safe default',
        dependencies: []
      }];
    }
    
    // If user is asking follow-up, route to the last active agent only
    if (isFollowUpToAgent && conversationState.circuits.length > 0) {
      const lastAgentMessage = [...messages].reverse().find(m => 
        m.role === 'assistant' && m.content.length > 50
      );
      
      if (lastAgentMessage) {
        // Detect which agent this was from based on content patterns
        const agentFromMessage = detectAgentFromMessage(lastAgentMessage.content);
        if (agentFromMessage) {
          console.log(`🎯 Follow-up question detected for ${agentFromMessage}`);
          agentPlan.sequence = [{
            agent: agentFromMessage,
            priority: 1,
            reasoning: 'Follow-up question',
            dependencies: []
          }];
        }
      }
    }
    
    // Handle targetAgent for follow-up questions
    if (targetAgent) {
      console.log('🎯 Re-engaging specific agent:', targetAgent);
      agentPlan.sequence = [{
        agent: targetAgent,
        priority: 1,
        reasoning: 'User requested follow-up',
        dependencies: []
      }];
    }
    // Filter by user-selected agents if provided
    else if (selectedAgents && selectedAgents.length > 0 && !isFollowUpToAgent) {
      console.log('🎯 Filtering to user-selected agents:', selectedAgents);
      agentPlan.sequence = agentPlan.sequence.filter((step: any) => 
        selectedAgents.includes(step.agent)
      );
      
      // Ensure we have at least one agent
      if (agentPlan.sequence.length === 0) {
        console.warn('⚠️ No matching agents found, using first selected agent');
        agentPlan.sequence = [{
          agent: selectedAgents[0],
          priority: 1,
          reasoning: 'User selected',
          dependencies: []
        }];
      }
    }
    
    console.log('Agent Plan:', {
      sequence: agentPlan.sequence.map((s: any) => s.agent),
      complexity: agentPlan.estimatedComplexity,
      userFiltered: !!selectedAgents
    });

    // CONVERSATIONAL MODE: Sequential agent responses
    if (conversationalMode) {
      return await handleConversationalMode(
        agentPlan,
        messages,
        currentDesign,
        conversationSummary,
        conversationState,
        latestMessage,
        startTime
      );
    }

    // Legacy synthesis mode (fallback)
    return await handleSynthesisMode(
      agentPlan,
      messages,
      currentDesign,
      conversationSummary,
      conversationState,
      latestMessage,
      openAIApiKey,
      startTime
    );

  } catch (error) {
    console.error('❌ Error in orchestrator-agent-v2:', error);
    return handleError(error);
  }
});

// CONVERSATIONAL MODE: Stream each agent's response as it arrives
async function handleConversationalMode(
  agentPlan: any,
  messages: Message[],
  currentDesign: any,
  conversationSummary: ConversationSummary,
  conversationState: ConversationState,
  latestMessage: string,
  startTime: number
): Promise<Response> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const agentOutputs: AgentOutput[] = [];
      const agentContext: AgentContext = {
        messages,
        conversationSummary,
        conversationState,
        previousAgentOutputs: [],
        userQuery: latestMessage,
        fullConversationThread: reconstructFullConversationThread(messages)
      };

      const allCitations: any[] = [];
      const allToolCalls: any[] = [];
      let costUpdates: any = null;

      // Stream write queue to prevent race conditions
      const streamWriteQueue: Array<() => void> = [];
      let isWriting = false;

      // WAVE 1 FIX: Make synchronous to prevent floating promise
      const processStreamQueue = () => {
        if (isWriting || streamWriteQueue.length === 0) return;
        
        isWriting = true;
        while (streamWriteQueue.length > 0) {
          const write = streamWriteQueue.shift();
          if (write) write(); // Synchronous call - controller.enqueue is already sync
        }
        isWriting = false;
      };

      const queueStreamWrite = (data: Uint8Array) => {
        return new Promise<void>((resolve) => {
          streamWriteQueue.push(() => {
            try {
              controller.enqueue(data);
            } catch (error) {
              console.error('❌ Stream write error:', error);
            }
            resolve();
          });
          processStreamQueue();
        });
      };

      try {
        // Send immediate "thinking" event to start stream within 1s
        const thinkingEvent = `data: ${JSON.stringify({
          type: 'thinking',
          message: 'Analysing your request and planning the approach...'
        })}\n\n`;
        await queueStreamWrite(encoder.encode(thinkingEvent));

        // Send question analysis event
        const questionAnalysisData = {
          userQuestion: latestMessage,
          interpretedRequirements: {
            circuitType: extractCircuitTypeFromMessage(latestMessage),
            load: extractLoadFromMessage(latestMessage),
            distance: extractDistanceFromMessage(latestMessage),
            environment: extractEnvironmentFromMessage(latestMessage),
            voltage: extractVoltageFromMessage(latestMessage),
            phases: extractPhasesFromMessage(latestMessage)
          },
          missingInfo: identifyMissingInfo(latestMessage, {}),
          agentPlan: agentPlan.sequence.map((step: any) => ({
            agent: step.agent,
            reason: step.reasoning,
            priority: step.priority
          })),
          estimatedComplexity: agentPlan.estimatedComplexity || 'simple',
          reasoning: agentPlan.reasoning || 'Standard electrical installation approach',
          timestamp: new Date().toISOString()
        };

        const analysisEvent = `data: ${JSON.stringify({
          type: 'question_analysis',
          data: questionAnalysisData
        })}\n\n`;
        await queueStreamWrite(encoder.encode(analysisEvent));
        
        // PRIORITY 1: Check if confirmation required (critical params missing)
        const criticalMissing = [];
        if (!questionAnalysisData.interpretedRequirements.load) criticalMissing.push('load');
        if (!questionAnalysisData.interpretedRequirements.distance) criticalMissing.push('distance');
        if (!questionAnalysisData.interpretedRequirements.voltage) criticalMissing.push('voltage');
        
        if (criticalMissing.length > 0) {
          // Generate unique confirmation ID
          const confirmationId = `confirm_${Date.now()}_${Math.random().toString(36).slice(2)}`;
          
          // Store session for later resumption
          pendingConfirmations.set(confirmationId, {
            confirmationId,
            sessionData: {
              agentPlan,
              messages,
              currentDesign,
              conversationSummary,
              conversationState,
              latestMessage,
              questionAnalysis: questionAnalysisData
            },
            timestamp: Date.now()
          });
          
          // Cleanup old sessions
          cleanupExpiredConfirmations();
          
          const confirmEvent = `data: ${JSON.stringify({
            type: 'confirmation_required',
            confirmationId,
            questionAnalysis: questionAnalysisData,
            message: 'Please confirm these assumptions before we proceed',
            criticalMissing
          })}\n\n`;
          await queueStreamWrite(encoder.encode(confirmEvent));
          
          console.log(`⏸️ Confirmation required (ID: ${confirmationId}):`, criticalMissing);
          
          // Close stream and wait for confirmation
          controller.close();
          return;
        }

        // Send initial event with agent plan
        const planEvent = `data: ${JSON.stringify({
          type: 'plan',
          agents: agentPlan.sequence.map((s: any) => s.agent),
          complexity: agentPlan.estimatedComplexity,
          reasoning: agentPlan.reasoning
        })}\n\n`;
        await queueStreamWrite(encoder.encode(planEvent));

        // Detect workflow type
        const workflowType = latestMessage.toLowerCase().includes('fault') || 
                             latestMessage.toLowerCase().includes('defect') ||
                             latestMessage.toLowerCase().includes('inspection')
          ? 'fault-finding'
          : 'new-installation';

        // Build execution groups for parallel processing
        // CRITICAL: Installer and H&S can run even if Designer struggles (use partial data)
        // Only Cost-Engineer and Commissioning truly depend on Designer success
        const executionGroups = workflowType === 'new-installation'
          ? [
              [{ agent: 'designer', dependencies: [] }],
              [
                { agent: 'installer', dependencies: [] },      // Can work from user description
                { agent: 'health-safety', dependencies: [] }   // Can assess based on work type
              ],
              [{ agent: 'cost-engineer', dependencies: [] }],  // Will state assumptions if no Designer
              [{ agent: 'commissioning', dependencies: ['designer'] }]
            ]
          : [
              [{ agent: 'designer', dependencies: [] }],
              [
                { agent: 'installer', dependencies: [] },
                { agent: 'health-safety', dependencies: [] }
              ],
              [{ agent: 'cost-engineer', dependencies: [] }],
              [{ agent: 'inspector', dependencies: ['designer', 'installer'] }],
              [{ agent: 'commissioning', dependencies: ['designer', 'inspector'] }]
            ];

        // Filter execution groups based on agent plan sequence
        const activeAgents = agentPlan.sequence.map((s: any) => s.agent);
        const filteredGroups = executionGroups.map(group => 
          group.filter(step => activeAgents.includes(step.agent))
        ).filter(group => group.length > 0);

        // Execute agents in parallel groups using Promise.all
        for (let groupIndex = 0; groupIndex < filteredGroups.length; groupIndex++) {
          const group = filteredGroups[groupIndex];
          
          // Execute all agents in this group in TRUE parallel using Promise.all
          await Promise.all(group.map(async (step) => {
            const agentName = step.agent;
            const agentIndex = activeAgents.indexOf(agentName);
            const isFirst = groupIndex === 0;
            const isLast = groupIndex === filteredGroups.length - 1;
            console.log(`🎨 Agent ${agentIndex + 1}/${activeAgents.length}: ${agentName} (Group ${groupIndex + 1}/${filteredGroups.length}, parallel with ${group.length} others)`);

            // WAVE 2 FIX: Better cache key to prevent collisions
            const lastMessage = messages[messages.length - 1]?.content || '';
            const selectedAgentsStr = JSON.stringify(activeAgents.sort());
            const cacheKey = `${agentName}:${lastMessage.slice(0, 100)}:${selectedAgentsStr}:${conversationState.stage}`;
            const cached = getFromAgentCache(cacheKey);
            
            if (cached) { // TTL already checked in getFromAgentCache
              console.log(`⚡ ${agentName} cache hit - instant response`);
              
              const cachedOutput: AgentOutput = {
                agent: agentName,
                response: cached.data.response || '',
                citations: cached.data.citations || [],
                toolCalls: cached.data.toolCalls || [],
                costUpdates: cached.data.costUpdates,
                confidence: cached.data.confidence || 0.8
              };
              
              agentOutputs.push(cachedOutput);
              
              // Send cached completion event
              const completeEvent = `data: ${JSON.stringify({
                type: 'agent_complete',
                agent: agentName,
                response: cachedOutput.response,
                citations: cachedOutput.citations,
                cached: true,
                elapsed: 0
              })}\n\n`;
              await queueStreamWrite(encoder.encode(completeEvent));
              return;
            }

            // Send agent_start event
            const startTime = Date.now();
            const startEvent = `data: ${JSON.stringify({
              type: 'agent_start',
              agent: agentName,
              index: agentIndex,
              total: activeAgents.length,
              groupIndex,
              parallelCount: group.length
            })}\n\n`;
            await queueStreamWrite(encoder.encode(startEvent));
            
            // PRIORITY 4: Send agent thinking event
            const thinkingEvent = `data: ${JSON.stringify({
              type: 'agent_thinking',
              agent: agentName,
              message: `Analysing ${agentName === 'designer' ? 'circuit requirements' : agentName === 'cost-engineer' ? 'pricing and materials' : agentName === 'installer' ? 'installation approach' : agentName === 'health-safety' ? 'safety requirements' : 'testing procedures'}...`,
              step: groupIndex + 1,
              totalSteps: filteredGroups.length
            })}\n\n`;
            await queueStreamWrite(encoder.encode(thinkingEvent));

            try {
              // WAVE 3 FIX: Only skip if critical dependency truly failed (not just missing data)
              const dependencies = step.dependencies || [];
              const criticalFailedDeps = dependencies.filter((dep: string) => {
                const depOutput = agentOutputs.find(o => o.agent === dep);
                // Only consider it "failed" if agent threw an error, not just missing structured data
                return depOutput && depOutput.structuredData?.error;
              });

              if (criticalFailedDeps.length > 0) {
                console.warn(`⚠️ Skipping ${agentName} - dependencies failed:`, criticalFailedDeps);
                agentOutputs.push({
                  agent: agentName,
                  response: `⚠️ ${getAgentDisplayName(agentName)} was skipped because required data from ${criticalFailedDeps.map((d: string) => getAgentDisplayName(d)).join(', ')} is unavailable.`,
                  citations: [],
                  structuredData: { skipped: true, reason: 'dependency_failed', failedDeps: criticalFailedDeps }
                });
                
                const skipEvent = `data: ${JSON.stringify({
                  type: 'agent_skipped',
                  agent: agentName,
                  reason: 'dependency_failed',
                  failedDeps: criticalFailedDeps
                })}\n\n`;
                await queueStreamWrite(encoder.encode(skipEvent));
                return;
              }

              const agentFunctionName = getAgentFunctionName(agentName);
              
              // WAVE 2 FIX: Build context once and reuse (remove redundant calls)
              const structuredContext = buildStructuredContext(agentContext.previousAgentOutputs);
              const relevantContext = buildRelevantContext(agentName, agentContext.previousAgentOutputs);
              
              // Build context-aware messages for this agent
              const agentMessages = buildAgentMessages(
                messages,
                { 
                  ...agentContext, 
                  structuredKnowledge: structuredContext,
                  relevantContext 
                },
                agentName,
                isFirst,
                isLast
              );

            // Phase 4: Add retry logic with exponential backoff
            const timeoutMs = 120000;
            const maxRetries = 2;
            let result: any;
            let lastError: Error | null = null;
            
            for (let attempt = 0; attempt <= maxRetries; attempt++) {
              try {
                const backoffMs = attempt > 0 ? Math.min(1000 * Math.pow(2, attempt - 1), 5000) : 0;
                if (backoffMs > 0) {
                  console.log(`🔄 Retrying ${agentName} after ${backoffMs}ms (attempt ${attempt + 1}/${maxRetries + 1})`);
                  await new Promise(resolve => setTimeout(resolve, backoffMs));
                }
                
                result = await Promise.race([
                  supabase.functions.invoke(agentFunctionName, {
                    body: { 
                      messages: agentMessages,
                      currentDesign,
                      context: {
                        ...agentContext,
                        structuredKnowledge: structuredContext, // WAVE 2 FIX: Reuse already-built context
                        relevantContext
                      }
                    }
                  }),
                  new Promise((_, reject) => setTimeout(() => reject(new Error('Timed out waiting for agent response')), timeoutMs))
                ]);
                
                // Success - break retry loop
                break;
              } catch (error) {
                lastError = error as Error;
                if (attempt === maxRetries) {
                  throw lastError;
                }
                console.warn(`⚠️ Agent ${agentName} attempt ${attempt + 1} failed:`, lastError.message);
              }
            }

            if (result.error) {
              console.error(`Agent ${agentName} error:`, result.error);
              
              // Send error event with detailed message
              const errorEvent = `data: ${JSON.stringify({
                type: 'agent_error',
                agent: agentName,
                data: { 
                  error: result.error.message || 'Agent failed',
                  agent: agentName,
                  partialResults: true
                }
              })}\n\n`;
              await queueStreamWrite(encoder.encode(errorEvent));
              
              // Store partial error output but continue with other agents
              agentOutputs.push({
                agent: agentName,
                response: `⚠️ ${agentName} encountered an error and provided partial results. Other agents will continue.`,
                citations: [],
                structuredData: { error: result.error.message }
              });
              
              console.log(`⚠️ Agent ${agentName} failed, but continuing with remaining agents`);
              return; // Return early but don't stop the entire stream
            }

            // PHASE 2: Include structuredData in AgentOutput
            const output: AgentOutput = {
              agent: agentName,
              response: result.data?.response || '',
              citations: result.data?.citations || [],
              toolCalls: result.data?.toolCalls || [],
              costUpdates: result.data?.costUpdates,
              structuredData: result.data?.structuredData || null,
              confidence: result.data?.confidence || 0.8
            };

            // Cache the result
            agentResultsCache.set(cacheKey, {
              data: result.data,
              timestamp: Date.now()
            });

            agentOutputs.push(output);
            
            const elapsed = Date.now() - startTime;
            console.log(`✅ ${agentName} completed in ${elapsed}ms`);
            agentContext.previousAgentOutputs = agentOutputs;
            
            // Add agent's response to full conversation thread
            agentContext.fullConversationThread.push({
              role: 'assistant',
              content: `[${getAgentDisplayName(agentName)}]: ${output.response}`
            });

            // Send agent_response event with full response
            const responseEvent = `data: ${JSON.stringify({
              type: 'agent_response',
              agent: agentName,
              response: output.response,
              citations: output.citations,
              toolCalls: output.toolCalls,
              costUpdates: output.costUpdates,
              confidence: output.confidence,
              structuredData: result.data?.structuredData || null
            })}\n\n`;
            await queueStreamWrite(encoder.encode(responseEvent));

            allCitations.push(...output.citations);
            allToolCalls.push(...output.toolCalls);
            if (output.costUpdates) costUpdates = output.costUpdates;

            // Phase 9: Inter-agent validation for critical agents
            if (['designer', 'cost-engineer', 'installer'].includes(agentName)) {
              await performInterAgentValidation(
                agentName,
                output,
                agentContext,
                encoder,
                queueStreamWrite,
                agentOutputs,
                Deno.env.get('OPENAI_API_KEY')!
              );
            }

              // Send agent_complete event
              const nextGroupHasAgents = groupIndex < filteredGroups.length - 1;
              const completeEvent = `data: ${JSON.stringify({
                type: 'agent_complete',
                agent: agentName,
                nextAgent: nextGroupHasAgents ? filteredGroups[groupIndex + 1][0].agent : null
              })}\n\n`;
              await queueStreamWrite(encoder.encode(completeEvent));

            } catch (error) {
              // WAVE 2 FIX: Add structured error telemetry
              const errorContext = {
                errorType: error instanceof Error ? error.constructor.name : 'UnknownError',
                message: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
                agentName,
                streamPhase: 'agent_execution',
                timestamp: new Date().toISOString(),
                latestMessage: latestMessage.slice(0, 100),
                groupIndex,
                dependencies: step.dependencies
              };
              
              console.error(`🚨 Agent ${agentName} error:`, JSON.stringify(errorContext, null, 2));
              
              const errorEvent = `data: ${JSON.stringify({
                type: 'agent_error',
                agent: agentName,
                data: { 
                  error: errorContext.message,
                  errorType: errorContext.errorType,
                  context: errorContext,
                }
              })}\n\n`;
              // WAVE 1 FIX: Use queue instead of direct enqueue
              await queueStreamWrite(encoder.encode(errorEvent));
            }
          }));
        }

        // Phase 6: Quality Gate - Validate all agent outputs
        const validationErrors = validateAgentOutputs(agentOutputs);
        if (validationErrors.length > 0) {
          console.warn('⚠️ Validation issues found:', validationErrors);
          const reportEvent = `data: ${JSON.stringify({
            type: 'validation_report',
            report: formatValidationReport(validationErrors)
          })}\n\n`;
          // WAVE 1 FIX: Use queue instead of direct enqueue
          await queueStreamWrite(encoder.encode(reportEvent));
        }

        // Send final complete event
        const doneEvent = `data: ${JSON.stringify({
          type: 'complete',
          agentOutputs,
          citations: allCitations,
          toolCalls: allToolCalls,
          costUpdates,
          executionTime: Date.now() - startTime,
          timestamp: new Date().toISOString()
        })}\n\n`;
        // WAVE 1 FIX: Use queue and wait for drain before closing
        await queueStreamWrite(encoder.encode(doneEvent));
        
        // Wait for all queued writes to complete
        while (streamWriteQueue.length > 0 || isWriting) {
          await new Promise(resolve => setTimeout(resolve, 10));
        }

        controller.close();
      } catch (error) {
        // WAVE 2 FIX: Add structured error telemetry for stream errors
        const errorContext = {
          errorType: error instanceof Error ? error.constructor.name : 'UnknownError',
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          streamPhase: 'stream_orchestration',
          timestamp: new Date().toISOString(),
          latestMessage: latestMessage.slice(0, 100)
        };
        
        console.error('🚨 Stream orchestration error:', JSON.stringify(errorContext, null, 2));
        
        const errorEvent = `data: ${JSON.stringify({
          type: 'error',
          error: errorContext.message,
          errorType: errorContext.errorType,
          context: errorContext
        })}\n\n`;
        // WAVE 1 FIX: Use queue instead of direct enqueue
        await queueStreamWrite(encoder.encode(errorEvent));
        
        // Wait for queue to drain
        while (streamWriteQueue.length > 0 || isWriting) {
          await new Promise(resolve => setTimeout(resolve, 10));
        }
        
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

function reconstructFullConversationThread(messages: Message[]): Message[] {
  return messages.map(m => ({
    role: m.role,
    content: m.content
  }));
}

function detectAgentFromMessage(content: string): string | null {
  if (content.includes('Circuit Designer') || content.includes('circuits') || content.includes('BS 7671')) return 'designer';
  if (content.includes('Cost Engineer') || content.includes('£') || content.includes('price')) return 'cost-engineer';
  if (content.includes('Installation Specialist') || content.includes('install') || content.includes('cable run')) return 'installer';
  if (content.includes('Health & Safety') || content.includes('PPE') || content.includes('risk')) return 'health-safety';
  if (content.includes('Testing') || content.includes('commissioning') || content.includes('Ze')) return 'commissioning';
  return null;
}

function getAgentFunctionName(agent: string): string {
  const mapping: Record<string, string> = {
    'designer': 'designer-agent',
    'cost-engineer': 'cost-engineer-agent',
    'installer': 'installer-agent',
    'health-safety': 'health-safety-agent',
    'commissioning': 'commissioning-agent',
    'project-manager': 'project-manager-agent',
    'inspector': 'inspector-agent'
  };
  return mapping[agent] || 'designer-agent';
}

function getAgentDisplayName(agent: string): string {
  const names: Record<string, string> = {
    'designer': 'Circuit Designer',
    'cost-engineer': 'Cost Engineer',
    'installer': 'Installation Specialist',
    'health-safety': 'Health & Safety',
    'commissioning': 'Testing & Commissioning',
    'project-manager': 'Project Manager',
    'inspector': 'Inspector'
  };
  return names[agent] || agent;
}

function buildRelevantContext(agent: string, previousOutputs: AgentOutput[]): any {
  // Return relevant context based on agent role
  return previousOutputs.reduce((acc, output) => {
    acc[output.agent] = {
      response: output.response,
      citations: output.citations
    };
    return acc;
  }, {} as any);
}

function buildStructuredContext(previousOutputs: AgentOutput[]): any {
  return previousOutputs.map(o => ({
    agent: o.agent,
    summary: o.response.slice(0, 200)
  }));
}

// Phase 9: Inter-agent validation
async function performInterAgentValidation(
  agentName: string,
  output: AgentOutput,
  agentContext: any,
  encoder: TextEncoder,
  queueStreamWrite: (data: Uint8Array) => Promise<void>,
  agentOutputs: AgentOutput[],
  openAIApiKey: string
): Promise<void> {
  try {
    let validationResult;
    const challenges: Challenge[] = [];

    // Run appropriate validation based on agent
    if (agentName === 'designer') {
      validationResult = validateDesignerOutput(output.response, agentContext);
      challenges.push(...validationResult.challenges);
      
      // Send validation warnings if any
      if (validationResult.warnings.length > 0) {
        const warningEvent = `data: ${JSON.stringify({
          type: 'validation_warning',
          agent: agentName,
          warnings: validationResult.warnings
        })}\n\n`;
        await queueStreamWrite(encoder.encode(warningEvent));
      }
    }
    else if (agentName === 'cost-engineer') {
      const designerOutput = agentOutputs.find(o => o.agent === 'designer');
      if (designerOutput) {
        validationResult = validateCostOutput(output.response, designerOutput.response);
        challenges.push(...validationResult.challenges);
      }
    }
    else if (agentName === 'installer') {
      const designerOutput = agentOutputs.find(o => o.agent === 'designer');
      if (designerOutput) {
        validationResult = validateInstallerOutput(output.response, designerOutput.response);
        challenges.push(...validationResult.challenges);
      }
    }

    // Process challenges
    for (const challenge of challenges) {
      console.log(`⚠️ Challenge raised: ${challenge.issue}`);
      
      // Send challenge event
      const challengeEvent = `data: ${JSON.stringify({
        type: 'agent_challenge',
        challenger: challenge.challenger,
        target: challenge.target,
        issue: challenge.issue,
        recommendation: challenge.recommendation,
        severity: challenge.severity,
        regulation: challenge.regulation
      })}\n\n`;
      await queueStreamWrite(encoder.encode(challengeEvent));

      // Get target agent to review challenge
      const resolution = await reviewChallenge(
        challenge.target,
        challenge,
        output.response,
        agentContext,
        openAIApiKey
      );

      console.log(`${challenge.target} ${resolution.action} the challenge`);

      // Send resolution event
      if (resolution.action === 'accepted' && resolution.revisedOutput) {
        // Update the output with revised version
        output.response = resolution.revisedOutput;
        
        const revisedEvent = `data: ${JSON.stringify({
          type: 'agent_revised',
          agent: challenge.target,
          challenger: challenge.challenger,
          issue: challenge.issue,
          revisedOutput: resolution.revisedOutput,
          reasoning: resolution.reasoning,
          agentResponse: resolution.agentResponse
        })}\n\n`;
        await queueStreamWrite(encoder.encode(revisedEvent));
      }
      else if (resolution.action === 'defended') {
        const defendedEvent = `data: ${JSON.stringify({
          type: 'agent_defended',
          agent: challenge.target,
          challenger: challenge.challenger,
          issue: challenge.issue,
          reasoning: resolution.reasoning,
          agentResponse: resolution.agentResponse
        })}\n\n`;
        await queueStreamWrite(encoder.encode(defendedEvent));
      }
      else if (resolution.action === 'compromised') {
        // Partial revision
        if (resolution.revisedOutput) {
          output.response = resolution.revisedOutput;
        }
        
        const compromiseEvent = `data: ${JSON.stringify({
          type: 'agent_consensus',
          agent: challenge.target,
          challenger: challenge.challenger,
          issue: challenge.issue,
          revisedOutput: resolution.revisedOutput,
          reasoning: resolution.reasoning,
          agentResponse: resolution.agentResponse
        })}\n\n`;
        await queueStreamWrite(encoder.encode(compromiseEvent));
      }
    }

  } catch (error) {
    console.error('Error in inter-agent validation:', error);
    // Don't fail the entire flow on validation errors
  }
}

function buildAgentMessages(
  messages: Message[],
  context: AgentContext,
  agentName: string,
  isFirst: boolean,
  isLast: boolean
): Message[] {
  return messages;
}

async function handleSynthesisMode(
  agentPlan: any,
  messages: Message[],
  currentDesign: any,
  conversationSummary: ConversationSummary,
  conversationState: ConversationState,
  latestMessage: string,
  openAIApiKey: string,
  startTime: number
): Promise<Response> {
  return new Response(JSON.stringify({
    response: "Synthesis mode not implemented in v2",
    error: "Please use conversational mode"
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
