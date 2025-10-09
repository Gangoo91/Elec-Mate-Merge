// CONVERSATIONAL MULTI-AGENT ORCHESTRATOR
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
import { extractCircuitContext } from './extract-circuit-context.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const responseCache = new ResponseCache();

interface OrchestratorRequest {
  messages: Message[];
  currentDesign?: any;
  conversationalMode?: boolean; // Enable sequential agent conversations
  selectedAgents?: string[]; // User-selected agents (e.g., ['designer', 'cost-engineer'])
  targetAgent?: string; // Specific agent to re-engage for follow-up
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const startTime = Date.now();
    const { messages, currentDesign, conversationalMode = true, selectedAgents, targetAgent } = await req.json() as OrchestratorRequest;
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('🎯 Conversational Orchestrator: Starting multi-agent consultation');
    
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
    console.error('❌ Error in orchestrator-agent:', error);
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
        // Send initial event with agent plan
        const planEvent = `data: ${JSON.stringify({
          type: 'plan',
          agents: agentPlan.sequence.map((s: any) => s.agent),
          complexity: agentPlan.estimatedComplexity,
          reasoning: agentPlan.reasoning
        })}\n\n`;
        controller.enqueue(encoder.encode(planEvent));

        // Execute agents sequentially
        for (let i = 0; i < agentPlan.sequence.length; i++) {
          const step = agentPlan.sequence[i];
          const agentName = step.agent;
          const isFirst = i === 0;
          const isLast = i === agentPlan.sequence.length - 1;
          
          console.log(`🎨 Agent ${i + 1}/${agentPlan.sequence.length}: ${agentName} speaking...`);

          // Send agent_start event
          const startEvent = `data: ${JSON.stringify({
            type: 'agent_start',
            agent: agentName,
            index: i,
            total: agentPlan.sequence.length
          })}\n\n`;
          controller.enqueue(encoder.encode(startEvent));

          try {
            const agentFunctionName = getAgentFunctionName(agentName);
            
            // Build context-aware messages for this agent
            const agentMessages = buildAgentMessages(
              messages,
              agentContext,
              agentName,
              isFirst,
              isLast
            );

            const timeoutMs = 120000; // 120s for complex RAG agents (H&S needs 90s)
            const result = await Promise.race([
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

            if (result.error) {
              console.error(`Agent ${agentName} error:`, result.error);
              
              // Send error event with detailed message
              const errorEvent = `data: ${JSON.stringify({
                type: 'agent_error',
                agent: agentName,
                data: { error: result.error.message || 'Agent failed' }
              })}\n\n`;
              controller.enqueue(encoder.encode(errorEvent));
              continue;
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
            const completeEvent = `data: ${JSON.stringify({
              type: 'agent_complete',
              agent: agentName,
              nextAgent: !isLast ? agentPlan.sequence[i + 1].agent : null
            })}\n\n`;
            controller.enqueue(encoder.encode(completeEvent));

          } catch (error) {
            console.error(`❌ Error executing ${agentName}:`, error);
            const errorEvent = `data: ${JSON.stringify({
              type: 'agent_error',
              agent: agentName,
              error: error instanceof Error ? error.message : 'Unknown error'
            })}\n\n`;
            controller.enqueue(encoder.encode(errorEvent));
          }
        }

        // Only send completion if we got at least one agent response
        if (agentOutputs.length === 0) {
          const errorEvent = `data: ${JSON.stringify({
            type: 'error',
            error: 'No agents completed successfully'
          })}\n\n`;
          controller.enqueue(encoder.encode(errorEvent));
        } else {
          // Send all_agents_complete event
          const executionTime = Date.now() - startTime;
          const finalEvent = `data: ${JSON.stringify({
            type: 'all_agents_complete',
            agentOutputs: agentOutputs.map(a => ({
              agent: a.agent,
              response: a.response,
              citations: a.citations,
              confidence: a.confidence
            })),
            totalCitations: allCitations,
            costUpdates,
            toolCalls: allToolCalls,
            executionTime,
            timestamp: new Date().toISOString()
          })}\n\n`;
          controller.enqueue(encoder.encode(finalEvent));
        }

        // Send [DONE] marker
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));

      } catch (error) {
        console.error('❌ Stream error:', error);
        const errorEvent = `data: ${JSON.stringify({
          type: 'error',
          error: error instanceof Error ? error.message : 'Stream failed'
        })}\n\n`;
        controller.enqueue(encoder.encode(errorEvent));
      } finally {
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
}

// Legacy synthesis mode
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
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const agentOutputs: AgentOutput[] = [];
  const agentContext: AgentContext = {
    messages,
    conversationSummary,
    conversationState,
    previousAgentOutputs: [],
    userQuery: latestMessage,
    fullConversationThread: reconstructFullConversationThread(messages)
  };

  for (const step of agentPlan.sequence) {
    try {
      const agentFunctionName = getAgentFunctionName(step.agent);
      const result = await supabase.functions.invoke(agentFunctionName, {
        body: { messages, currentDesign, context: agentContext }
      });

      if (!result.error && result.data) {
        agentOutputs.push({
          agent: step.agent,
          response: result.data.response || '',
          citations: result.data.citations || [],
          toolCalls: result.data.toolCalls || [],
          costUpdates: result.data.costUpdates,
          confidence: result.data.confidence || 0.8
        });
      }
    } catch (error) {
      console.error(`Error executing ${step.agent}:`, error);
    }
  }

  const finalResponse = await synthesizeResponse(
    agentOutputs,
    latestMessage,
    conversationSummary,
    conversationState,
    openAIApiKey
  );

  return new Response(JSON.stringify({
    ...finalResponse,
    activeAgents: agentOutputs.map(a => a.agent),
    executionTime: Date.now() - startTime,
    timestamp: new Date().toISOString()
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// Helper: Build context-aware messages with FULL conversation history
function buildAgentMessages(
  messages: Message[],
  agentContext: AgentContext,
  agentName: string,
  isFirst: boolean,
  isLast: boolean
): Message[] {
  // Start with the FULL conversation thread (includes all user + agent messages)
  const fullMessages = [...agentContext.fullConversationThread];
  
  // NEW: Extract circuit type for H&S agent
  if (agentName === 'health-safety') {
    const circuitContext = extractCircuitContext(agentContext);
    
    fullMessages.push({
      role: 'system',
      content: `CIRCUIT BEING INSTALLED:
${circuitContext}

Provide safety briefing specific to THIS circuit type, not generic assumptions.`
    });
  }
  
  // Add structured context from previous agents if not the first
  if (!isFirst && agentContext.previousAgentOutputs.length > 0) {
    const structuredContext = buildStructuredContext(agentContext.previousAgentOutputs);
    
    fullMessages.push({
      role: 'system',
      content: `KNOWLEDGE FROM PREVIOUS SPECIALISTS (reference these exact details):

${structuredContext}

${agentName === 'commissioning' 
  ? 'Now provide TESTING PROCEDURES only. DO NOT repeat safety briefings - H&S has covered that.'
  : 'Build on what they\'ve said with your specialty.'}

You can see the full conversation history above, including what other specialists have said. Reference specific numbers, calculations, or recommendations when relevant.`
    });
  }
  
  return fullMessages;
}

// COMPACT CONTEXT: Build lightweight summaries for speed
function buildStructuredContext(previousOutputs: AgentOutput[]): string {
  const summaries: string[] = [];
  
  for (const output of previousOutputs) {
    const agent = output.agent;
    let summary = `${getAgentEmoji(agent)} ${agent.toUpperCase()}:\n`;
    
    // Extract only essential structured data (no full responses)
    if (agent === 'designer') {
      const ib = extractValue(output.response, /Ib.*?(\d+\.?\d*)\s*A/i);
      const in_ = extractValue(output.response, /In.*?(\d+\.?\d*)\s*A/i);
      const iz = extractValue(output.response, /Iz.*?(\d+\.?\d*)\s*A/i);
      const vd = extractValue(output.response, /voltage drop.*?(\d+\.?\d*)\s*[V%]/i);
      const cable = extractValue(output.response, /(\d+(?:\.\d+)?)\s*mm²/i);
      const device = extractValue(output.response, /(\d+A\s*Type\s*[ABC])/i);
      
      if (ib) summary += `  Ib=${ib}A`;
      if (in_) summary += `, In=${in_}A`;
      if (iz) summary += `, Iz=${iz}A`;
      if (vd) summary += `\n  VD=${vd}`;
      if (cable) summary += `, Cable=${cable}mm²`;
      if (device) summary += `\n  Protection=${device}`;
    } else if (agent === 'installer') {
      const method = extractValue(output.response, /(clipped direct|buried|conduit|trunking)/i);
      const reg = extractValue(output.response, /Reg(?:ulation)?\s*(\d{3}(?:\.\d+)?)/i);
      
      if (method) summary += `  Method=${method}`;
      if (reg) summary += `, Cites Reg ${reg}`;
    } else if (agent === 'cost-engineer') {
      const materials = extractValue(output.response, /materials?[:\s]+£?([\d,]+)/i);
      const labour = extractValue(output.response, /labour[:\s]+£?([\d,]+)/i);
      const total = extractValue(output.response, /total[:\s]+£?([\d,]+)/i);
      
      if (materials) summary += `  Materials=£${materials}`;
      if (labour) summary += `, Labour=£${labour}`;
      if (total) summary += `\n  Total=£${total}`;
    } else if (agent === 'health-safety') {
      const hazards = extractValue(output.response, /(\d+)\s*hazards?/i) || '2-3';
      const controls = extractValue(output.response, /(\d+)\s*controls?/i) || '3-4';
      
      summary += `  ${hazards} hazards identified, ${controls} controls specified`;
      summary += `\n  ⚠️ Safety briefing complete - DO NOT REPEAT`;
    } else if (agent === 'commissioning') {
      const tests = extractValue(output.response, /(\d+)\s*(?:STEP|test)/i) || '4-5';
      summary += `  ${tests} test procedures specified`;
      summary += `\n  🔧 Testing guidance complete - DO NOT REPEAT`;
    }
    
    // Limit to 200 chars max per agent
    if (summary.length > 250) {
      summary = summary.substring(0, 247) + '...';
    }
    
    summaries.push(summary);
  }
  
  return summaries.join('\n\n');
}

// Helper to extract values with regex
function extractValue(text: string, regex: RegExp): string | null {
  const match = text.match(regex);
  return match ? match[1] : null;
}

// Helper: Extract structured data from responses
function extractCalculations(response: string): string[] {
  const calculations: string[] = [];
  
  // Extract Ib, In, Iz values
  const ibMatch = response.match(/Ib\s*[=:]\s*([\d.]+)\s*A/i);
  if (ibMatch) calculations.push(`Ib (design current) = ${ibMatch[1]}A`);
  
  const inMatch = response.match(/In\s*[=:]\s*([\d.]+)\s*A/i);
  if (inMatch) calculations.push(`In (device rating) = ${inMatch[1]}A`);
  
  const izMatch = response.match(/Iz\s*[=:]\s*([\d.]+)\s*A/i);
  if (izMatch) calculations.push(`Iz (cable capacity) = ${izMatch[1]}A`);
  
  // Extract voltage drop
  const vdMatch = response.match(/(?:voltage drop|VD)\s*[=:]\s*([\d.]+)\s*[V%]/i);
  if (vdMatch) calculations.push(`Voltage drop = ${vdMatch[1]}V or %`);
  
  // Extract Max Zs
  const zsMatch = response.match(/(?:Max Zs|Zs)\s*[=:]\s*([\d.]+)\s*Ω/i);
  if (zsMatch) calculations.push(`Max Zs = ${zsMatch[1]}Ω`);
  
  return calculations;
}

function extractCableSpec(response: string): string | null {
  const match = response.match(/(\d+(?:\.\d+)?)\s*mm²\s*(?:twin|T&E|cable|6242Y|SWA)/i);
  return match ? match[0] : null;
}

function extractDeviceSpec(response: string): string | null {
  const match = response.match(/(\d+)A\s*(?:Type\s*)?([ABC])\s*(?:MCB|RCBO)/i);
  return match ? match[0] : null;
}

function extractInstallationMethod(response: string): string | null {
  const methods = ['clipped direct', 'buried', 'conduit', 'trunking', 'SWA'];
  for (const method of methods) {
    if (response.toLowerCase().includes(method.toLowerCase())) {
      return method;
    }
  }
  return null;
}

function extractCosts(response: string): string | null {
  const lines: string[] = [];
  
  // Extract material costs
  const materialMatch = response.match(/materials?[:\s]+£?([\d,]+)/i);
  if (materialMatch) lines.push(`Materials: £${materialMatch[1]}`);
  
  // Extract labour costs
  const labourMatch = response.match(/labour[:\s]+£?([\d,]+)/i);
  if (labourMatch) lines.push(`Labour: £${labourMatch[1]}`);
  
  // Extract total
  const totalMatch = response.match(/total[:\s]+£?([\d,]+)/i);
  if (totalMatch) lines.push(`Total: £${totalMatch[1]}`);
  
  return lines.length > 0 ? lines.join('\n') : null;
}

function getAgentEmoji(agent: string): string {
  const emojis: Record<string, string> = {
    'designer': '🎨',
    'cost-engineer': '💰',
    'installer': '🔧',
    'commissioning': '✅',
    'health-safety': '🦺',
    'inspector': '🔍'
  };
  return emojis[agent] || '🤖';
}

function getAgentDisplayName(agent: string): string {
  const names: Record<string, string> = {
    'designer': 'Circuit Designer',
    'cost-engineer': 'Cost Engineer',
    'installer': 'Installation Specialist',
    'commissioning': 'Testing & Commissioning',
    'health-safety': 'Health & Safety',
    'inspector': 'Inspection & Testing Specialist'
  };
  return names[agent] || agent;
}

// NEW: Reconstruct full conversation thread from messages
// Handles both fresh messages (user-only) and resumed conversations (user + formatted agent responses)
function reconstructFullConversationThread(messages: Message[]): Message[] {
  return messages.map(msg => {
    // If this is an assistant message that's already formatted with [AgentName]:, keep it as-is
    // If not, it's probably from initial messages, keep it
    return msg;
  });
}

// Helper: Detect which agent wrote a message based on content patterns
function detectAgentFromMessage(content: string): string | null {
  const contentLower = content.toLowerCase();
  
  // Designer patterns
  if (contentLower.includes('table 4d') || contentLower.includes('reg 433') || 
      contentLower.includes('voltage drop') || contentLower.includes('cable capacity') ||
      contentLower.includes('ib') || contentLower.includes('in') || contentLower.includes('iz')) {
    return 'designer';
  }
  
  // Cost Engineer patterns
  if (contentLower.includes('£') || contentLower.includes('cost') || 
      contentLower.includes('materials') || contentLower.includes('labour') ||
      contentLower.includes('screwfix') || contentLower.includes('cef')) {
    return 'cost-engineer';
  }
  
  // Installer patterns
  if (contentLower.includes('clip') || contentLower.includes('safe zone') || 
      contentLower.includes('install') || contentLower.includes('routing') ||
      contentLower.includes('reg 522') || contentLower.includes('support')) {
    return 'installer';
  }
  
  // Health & Safety patterns
  if (contentLower.includes('ppe') || contentLower.includes('hazard') || 
      contentLower.includes('risk') || contentLower.includes('safety') ||
      contentLower.includes('ewr') || contentLower.includes('acop') ||
      contentLower.includes('likelihood') || contentLower.includes('severity')) {
    return 'health-safety';
  }
  
  // Commissioning patterns
  if (contentLower.includes('test') || contentLower.includes('commissioning') || 
      contentLower.includes('insulation resistance') || contentLower.includes('zs') ||
      contentLower.includes('reg 64') || contentLower.includes('continuity')) {
    return 'commissioning';
  }
  
  return null;
}

// Helper: Get agent introduction
function getAgentIntro(agentName: string): string {
  const intros: Record<string, string> = {
    'designer': '🎨 **Designer here**',
    'installer': '🔧 **Installation specialist**',
    'health-safety': '🦺 **Health & Safety**',
    'cost-engineer': '💰 **Cost Engineer**',
    'project-manager': '📋 **Project Manager**',
    'commissioning': '✅ **Commissioning**'
  };
  return intros[agentName] || `**${agentName}**`;
}

// Helper: Get transition between agents
function getAgentTransition(currentAgent: string, nextAgent: string): string {
  const transitions: Record<string, Record<string, string>> = {
    'designer': {
      'installer': "Alright, design's sorted. Now let me hand over to the installer for the practical side...",
      'health-safety': "Design's done. Before we crack on though, let's get the H&S perspective...",
      'cost-engineer': "Right, design's locked in. Let's get costs on this...",
      'project-manager': "Design complete. Let's see what the project manager reckons for timelines..."
    },
    'installer': {
      'health-safety': "Installation method sorted. Now, safety considerations...",
      'cost-engineer': "You know how to install it now. Let's price it up properly...",
      'commissioning': "Install plan's there. Let's talk testing and commissioning..."
    },
    'health-safety': {
      'cost-engineer': "Safety's covered. Now for the money side...",
      'installer': "H&S brief done. Back to installation specifics...",
      'commissioning': "Safety sorted. Let's talk about testing this safely..."
    },
    'cost-engineer': {
      'installer': "Costs are there. Let's get into how you'll actually install this...",
      'project-manager': "Pricing done. Let me get the project manager to talk timelines...",
      'commissioning': "Budget's set. Finally, let's talk testing and sign-off..."
    },
    'project-manager': {
      'installer': "Timeline's clear. Now for installation details...",
      'cost-engineer': "Project plan's there. Let's get accurate costs on this...",
      'commissioning': "Schedule's sorted. Finally, commissioning requirements..."
    }
  };
  
  return transitions[currentAgent]?.[nextAgent] || "Moving on to the next specialist...";
}

function getAgentFunctionName(agent: string): string {
  const mapping: Record<string, string> = {
    'designer': 'designer-agent',
    'design': 'designer-agent',
    'cost-engineer': 'cost-engineer-agent',
    'cost': 'cost-engineer-agent',
    'installer': 'installer-agent',
    'installation': 'installer-agent',
    'commissioning': 'commissioning-agent',
    'health-safety': 'health-safety-agent',
    'project-manager': 'project-manager-agent',
    'inspector': 'inspector-agent'
  };
  return mapping[agent] || 'designer-agent';
}

async function synthesizeResponse(
  agentOutputs: AgentOutput[],
  userQuery: string,
  conversationSummary: ConversationSummary,
  conversationState: ConversationState,
  openAIApiKey: string
): Promise<{
  response: string;
  citations: any[];
  costUpdates: any;
  toolCalls: any[];
  confidence: number;
}> {
  
  // If no agents responded, provide smart fallback
  if (agentOutputs.length === 0) {
    return {
      response: generateSmartFallback(userQuery, conversationSummary, conversationState),
      citations: [],
      costUpdates: null,
      toolCalls: [],
      confidence: 0.6
    };
  }

  // Combine all agent outputs
  const allCitations = agentOutputs.flatMap(a => a.citations);
  const allToolCalls = agentOutputs.flatMap(a => a.toolCalls);
  const costUpdates = agentOutputs.find(a => a.costUpdates)?.costUpdates;
  const avgConfidence = agentOutputs.reduce((sum, a) => sum + a.confidence, 0) / agentOutputs.length;

  // If only one agent, return its response directly
  if (agentOutputs.length === 1) {
    return {
      response: agentOutputs[0].response,
      citations: allCitations,
      costUpdates,
      toolCalls: allToolCalls,
      confidence: avgConfidence
    };
  }

  // Multiple agents: Use GPT-5 to synthesize naturally
  const agentResponses = agentOutputs.map(a => `${a.agent.toUpperCase()}:\n${a.response}`).join('\n\n---\n\n');

  const synthesisPrompt = `You're an experienced electrical engineer coordinating multiple specialists. Merge their responses into ONE natural, flowing conversation.

USER ASKED: "${userQuery}"

CONVERSATION CONTEXT:
- Project: ${conversationState.projectType} (${conversationState.constraints.buildingType || 'general'})
- Stage: ${conversationState.stage}
- Last topic: ${conversationSummary.lastTopic}

SPECIALIST RESPONSES:
${agentResponses}

YOUR TASK:
Merge these specialist insights into a single natural response that:
1. Sounds like you're chatting with a mate (UK electrician, not American)
2. Flows naturally - NO markdown, NO bullet points, NO formal sections
3. Uses emojis sparingly and naturally (🎨 design, 💰 costs, 🔧 installation, ✅ testing)
4. Cites regulations naturally in sentences (e.g., "According to Reg 433.1..." or "Reg 525 says...")
5. Builds on previous conversation - don't repeat what was already discussed
6. Explains the "why" behind recommendations, not just the "what"
7. Uses paragraphs, not lists
8. Keeps technical terms but explains them conversationally
9. If user acknowledged/agreed, start with "No worries mate!" or "Sound!" then continue

Write as if you're texting back on a job site - professional but friendly. Show your working when doing calculations, like you're explaining to an apprentice.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-2025-08-07', // PHASE 1: GPT-5
        messages: [
          { 
            role: 'system', 
            content: 'You are an experienced UK electrician synthesizing specialist advice. Keep responses natural and conversational, no markdown formatting. Cite BS 7671 regulations naturally.' 
          },
          { role: 'user', content: synthesisPrompt }
        ],
        max_completion_tokens: 2500 // PHASE 1: Updated parameter
      }),
    });

    if (!response.ok) {
      console.error('Synthesis API error:', await response.text());
      return {
        response: agentOutputs[0].response, // Fallback to first agent
        citations: allCitations,
        costUpdates,
        toolCalls: allToolCalls,
        confidence: avgConfidence * 0.8
      };
    }

    const data = await response.json();
    const synthesized = data.choices[0]?.message?.content || agentOutputs[0].response;

    return {
      response: synthesized,
      citations: allCitations,
      costUpdates,
      toolCalls: allToolCalls,
      confidence: avgConfidence
    };

  } catch (error) {
    console.error('Synthesis failed:', error);
    return {
      response: agentOutputs[0].response,
      citations: allCitations,
      costUpdates,
      toolCalls: allToolCalls,
      confidence: avgConfidence * 0.7
    };
  }
}

// PHASE 8: Group agents by dependencies for parallel execution
function groupByDependencies(sequence: any[]): any[][] {
  const groups: any[][] = [];
  const processed = new Set<string>();

  while (processed.size < sequence.length) {
    const currentGroup = sequence.filter(step => {
      // Can execute if all dependencies are already processed
      return !processed.has(step.agent) &&
             step.dependencies.every((dep: string) => processed.has(dep));
    });

    if (currentGroup.length === 0) break; // Circular dependency or error

    groups.push(currentGroup);
    currentGroup.forEach(step => processed.add(step.agent));
  }

  return groups;
}

function generateSmartFallback(
  userQuery: string,
  conversationSummary: ConversationSummary,
  conversationState: ConversationState
): string {
  // Context-aware fallbacks based on conversation state
  const query = userQuery.toLowerCase();
  
  // Acknowledgment responses
  const acknowledgmentWords = ['great', 'sound', 'perfect', 'yes', 'okay', 'yeah', 'nice', 'thanks', 'brilliant'];
  const isAcknowledgment = acknowledgmentWords.some(word => query.includes(word)) && query.length < 50;
  
  if (isAcknowledgment && conversationState.stage === 'design') {
    return `No worries mate! 👍 Right, let's get specific then - how many circuits are you planning? Just the basics like lighting and sockets, or are we adding shower circuits, EV charger, that sort of thing?`;
  }

  if (isAcknowledgment) {
    return `Sound! What's the next bit you need help with?`;
  }

  // Topic-specific clarifications
  if (conversationSummary.lastTopic.includes('shower')) {
    return `I can help with that shower circuit. What size shower are you thinking? 8.5kW? 9.5kW? And how far's the cable run from the consumer unit?`;
  }

  if (conversationState.projectType === 'domestic') {
    return `No worries. For this domestic job, what specifically do you need help with? Design calculations, material costs, installation method, or testing procedures?`;
  }

  // Generic but helpful
  return `I can help with that. To give you the best advice, can you tell me a bit more about what you're planning? What type of circuit or installation are you working on?`;
}
