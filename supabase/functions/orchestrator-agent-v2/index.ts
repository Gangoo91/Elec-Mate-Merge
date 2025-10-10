// CONVERSATIONAL MULTI-AGENT ORCHESTRATOR V2
// Sequential agent conversations where each specialist speaks directly to the user

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import type { Message, ConversationState, ConversationSummary } from '../_shared/conversation-memory.ts';
import { buildConversationState, summarizeConversation } from '../_shared/conversation-memory.ts';
import { detectIntents, type IntentAnalysis } from '../_shared/intent-detection.ts';
import { planAgentSequence, type AgentContext, type AgentOutput, type AgentPlan } from '../_shared/agent-orchestration.ts';
import { validateResponse } from '../_shared/response-validation.ts';
import { ResponseCache, isCacheable } from '../_shared/response-cache.ts';
import { extractCircuitContext } from '../orchestrator-agent/extract-circuit-context.ts';
import { validateAgentOutputs, formatValidationReport } from '../_shared/validation-layer.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, accept',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const responseCache = new ResponseCache();

// Helper to extract circuit count from message
function extractCircuitCount(message: string): number {
  const wayMatch = message.match(/(\d+)[\s-]?way/i);
  if (wayMatch) return parseInt(wayMatch[1]);
  
  const circuitMatch = message.match(/(\d+)\s+circuits?/i);
  if (circuitMatch) return parseInt(circuitMatch[1]);
  
  return 6; // Default
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

try {
    console.log('[orchestrator-v2] POST start');
    const { messages, currentDesign, conversationalMode = true, selectedAgents, targetAgent } = await req.json() as OrchestratorRequest;
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('🎯 Conversational Orchestrator V2: Starting multi-agent consultation');
    
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

    // AI-powered intent detection
    console.log('🎯 AI intent detection...');
    const intentAnalysis = await detectIntents(latestMessage, conversationSummary, openAIApiKey);
    
    // Validate intent analysis before logging
    if (intentAnalysis && intentAnalysis.intents) {
      console.log('Intent Analysis:', {
        primary: intentAnalysis.primaryIntent,
        scores: intentAnalysis.intents,
        reasoning: intentAnalysis.reasoning
      });
    } else {
      console.error('❌ Invalid intent analysis received:', intentAnalysis);
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
    
    // Plan agent sequence
    console.log('📋 Planning agent conversation sequence...');
    const agentPlan = await planAgentSequence(intentAnalysis, conversationSummary, latestMessage, openAIApiKey);
    
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
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Orchestrator failed',
      response: "I'm having trouble processing that mate. Can you give me a bit more detail about what you need help with?"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
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

      try {
        // Send immediate "thinking" event to start stream within 1s
        const thinkingEvent = `data: ${JSON.stringify({
          type: 'thinking',
          message: 'Analysing your request and planning the approach...'
        })}\n\n`;
        controller.enqueue(encoder.encode(thinkingEvent));

        // Send initial event with agent plan
        const planEvent = `data: ${JSON.stringify({
          type: 'plan',
          agents: agentPlan.sequence.map((s: any) => s.agent),
          complexity: agentPlan.estimatedComplexity,
          reasoning: agentPlan.reasoning
        })}\n\n`;
        controller.enqueue(encoder.encode(planEvent));

        // Detect workflow type
        const workflowType = latestMessage.toLowerCase().includes('fault') || 
                             latestMessage.toLowerCase().includes('defect') ||
                             latestMessage.toLowerCase().includes('inspection')
          ? 'fault-finding'
          : 'new-installation';

        // Build execution groups for parallel processing
        const executionGroups = workflowType === 'new-installation'
          ? [
              [{ agent: 'designer', dependencies: [] }],
              [
                { agent: 'cost-engineer', dependencies: ['designer'] },
                { agent: 'health-safety', dependencies: ['designer'] },
                { agent: 'installer', dependencies: ['designer'] }
              ],
              [{ agent: 'commissioning', dependencies: ['designer'] }]
            ]
          : [
              [{ agent: 'designer', dependencies: [] }],
              [
                { agent: 'cost-engineer', dependencies: ['designer'] },
                { agent: 'health-safety', dependencies: ['designer'] },
                { agent: 'installer', dependencies: ['designer'] }
              ],
              [{ agent: 'inspector', dependencies: ['designer', 'installer'] }],
              [{ agent: 'commissioning', dependencies: ['designer', 'inspector'] }]
            ];

        // Filter execution groups based on agent plan sequence
        const activeAgents = agentPlan.sequence.map((s: any) => s.agent);
        const filteredGroups = executionGroups.map(group => 
          group.filter(step => activeAgents.includes(step.agent))
        ).filter(group => group.length > 0);

        // Execute agents in parallel groups
        for (let groupIndex = 0; groupIndex < filteredGroups.length; groupIndex++) {
          const group = filteredGroups[groupIndex];
          
          // Execute all agents in this group in parallel
          const groupPromises = group.map(async (step) => {
            const agentName = step.agent;
            const agentIndex = activeAgents.indexOf(agentName);
            const isFirst = groupIndex === 0;
            const isLast = groupIndex === filteredGroups.length - 1;
            console.log(`🎨 Agent ${agentIndex + 1}/${activeAgents.length}: ${agentName} (Group ${groupIndex + 1}/${filteredGroups.length}, parallel with ${group.length} others)`);

            // Send agent_start event
            const startEvent = `data: ${JSON.stringify({
              type: 'agent_start',
              agent: agentName,
              index: agentIndex,
              total: activeAgents.length,
              groupIndex,
              parallelCount: group.length
            })}\n\n`;
            controller.enqueue(encoder.encode(startEvent));

            try {
              const agentFunctionName = getAgentFunctionName(agentName);
              
              // Build relevant context (Phase 3: Smart Context Reduction)
              const relevantContext = buildRelevantContext(agentName, agentContext.previousAgentOutputs);
              
              // Build context-aware messages for this agent
              const agentMessages = buildAgentMessages(
                messages,
                { ...agentContext, structuredKnowledge: relevantContext },
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
                        structuredKnowledge: buildStructuredContext(agentContext.previousAgentOutputs)
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
                data: { error: result.error.message || 'Agent failed' }
              })}\n\n`;
              controller.enqueue(encoder.encode(errorEvent));
              return;
            }

            const output: AgentOutput = {
              agent: agentName,
              response: result.data?.response || '',
              citations: result.data?.citations || [],
              toolCalls: result.data?.toolCalls || [],
              costUpdates: result.data?.costUpdates,
              confidence: result.data?.confidence || 0.8
            };

            agentOutputs.push(output);
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
            controller.enqueue(encoder.encode(responseEvent));

            allCitations.push(...output.citations);
            allToolCalls.push(...output.toolCalls);
            if (output.costUpdates) costUpdates = output.costUpdates;

              // Send agent_complete event
              const nextGroupHasAgents = groupIndex < filteredGroups.length - 1;
              const completeEvent = `data: ${JSON.stringify({
                type: 'agent_complete',
                agent: agentName,
                nextAgent: nextGroupHasAgents ? filteredGroups[groupIndex + 1][0].agent : null
              })}\n\n`;
              controller.enqueue(encoder.encode(completeEvent));

            } catch (error) {
              console.error(`Error in agent ${agentName}:`, error);
              const errorEvent = `data: ${JSON.stringify({
                type: 'agent_error',
                agent: agentName,
                data: { error: error instanceof Error ? error.message : 'Unknown error' }
              })}\n\n`;
              controller.enqueue(encoder.encode(errorEvent));
            }
          });

          await Promise.all(groupPromises);
        }

        // Phase 6: Quality Gate - Validate all agent outputs
        const validationErrors = validateAgentOutputs(agentOutputs);
        if (validationErrors.length > 0) {
          console.warn('⚠️ Validation issues found:', validationErrors);
          const reportEvent = `data: ${JSON.stringify({
            type: 'validation_report',
            report: formatValidationReport(validationErrors)
          })}\n\n`;
          controller.enqueue(encoder.encode(reportEvent));
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
        controller.enqueue(encoder.encode(doneEvent));

        controller.close();
      } catch (error) {
        console.error('Stream error:', error);
        const errorEvent = `data: ${JSON.stringify({
          type: 'error',
          error: error instanceof Error ? error.message : 'Stream failed'
        })}\n\n`;
        controller.enqueue(encoder.encode(errorEvent));
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
