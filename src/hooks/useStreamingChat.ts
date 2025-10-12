import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface StreamChunk {
  type: 'token' | 'citation' | 'tool_call' | 'agent_update' | 'done' | 'error' | 'plan' | 'agent_start' | 'agent_response' | 'agent_complete' | 'all_agents_complete' | 'agent_error' | 'agent_skipped' | 'question_analysis' | 'confirmation_required' | 'agent_thinking' | 'agent_challenge' | 'agent_revised' | 'agent_defended' | 'agent_consensus' | 'validation_warning';
  content?: string;
  data?: any;
  agent?: string;
  agents?: string[];
  response?: string;
  citations?: any[];
  costUpdates?: any;
  nextAgent?: string | null;
  agentOutputs?: any[];
  index?: number;
  total?: number;
  structuredData?: any;
  message?: string;
  step?: number;
  totalSteps?: number;
  confirmationId?: string;
  questionAnalysis?: any;
  criticalMissing?: string[];
  challenger?: string;
  target?: string;
  issue?: string;
  recommendation?: string;
  severity?: string;
  regulation?: string;
  revisedOutput?: string;
  reasoning?: string;
  agentResponse?: string;
  warnings?: string[];
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  citations?: Array<{ number: string; title: string }>;
  toolCalls?: any[];
  activeAgents?: string[];
  agentName?: string;
}

interface UseStreamingChatOptions {
  onAgentUpdate?: (agents: string[]) => void;
  onToolCall?: (toolCall: any) => void;
  onCitation?: (citation: any) => void;
  onError?: (error: string) => void;
  onAgentStart?: (agent: string, index: number, total: number) => void;
  onAgentResponse?: (agent: string, response: string, structuredData?: any) => void;
  onAgentComplete?: (agent: string, nextAgent: string | null) => void;
  onAllAgentsComplete?: (agentOutputs: any[]) => void;
  onPlan?: (agents: string[], complexity: string) => void;
  onEstimatedTime?: (seconds: number) => void;
  onElapsedTimeUpdate?: (seconds: number) => void;
  onAgentProgress?: (agent: string, status: 'pending' | 'active' | 'complete') => void;
  onQuestionAnalysis?: (data: any) => void;
  onAgentThinking?: (agent: string, message: string, step: number, totalSteps: number) => void;
  onAgentChallenge?: (data: any) => void;
  onAgentRevised?: (data: any) => void;
  onAgentDefended?: (data: any) => void;
  onAgentConsensus?: (data: any) => void;
  onValidationWarning?: (data: any) => void;
}

export const useStreamingChat = (options: UseStreamingChatOptions = {}) => {
  const [isStreaming, setIsStreaming] = useState(false);

  const streamMessage = useCallback(async (
    messages: Message[],
    currentDesign: any,
    onToken: (token: string) => void,
    onComplete: (fullMessage: string, data: any) => void,
    selectedAgents?: string[],
    targetAgent?: string
  ) => {
    setIsStreaming(true);
    let fullResponse = '';
    let citations: any[] = [];
    let toolCalls: any[] = [];
    let activeAgents: string[] = [];
    let structuredData: any = null;
    
    // Track elapsed time
    const startTime = Date.now();
    const elapsedInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      options.onElapsedTimeUpdate?.(elapsed);
    }, 1000);

    try {
      // ALWAYS use agent-router for consistency, deduplication, and proper flow
      const FUNCTION_URL = `https://jtwygbeceundfgnkirof.supabase.co/functions/v1/agent-router`;
      
      if (!FUNCTION_URL) {
        throw new Error('Invalid function URL configuration');
      }
      
      // Timeout handling (300s total, 30s, 90s, and 180s warnings) with AbortController
      const timeoutMs = 300000; // 5 minutes for complex 18-way designs
      const warningMs = 30000;
      const secondWarningMs = 90000;
      const thirdWarningMs = 180000;

      const controller = new AbortController();
      const warningTimer = setTimeout(() => {
        options.onError?.('Still working on your request, this is taking longer than expected...');
      }, warningMs);
      const secondWarningTimer = setTimeout(() => {
        options.onError?.('Still processing... complex designs can take 3-5 minutes.');
      }, secondWarningMs);
      const thirdWarningTimer = setTimeout(() => {
        options.onError?.('Almost there... large multi-circuit designs require detailed analysis.');
      }, thirdWarningMs);
      const timeoutTimer = setTimeout(() => {
        controller.abort();
      }, timeoutMs);

      // Extract latest user message
      const lastUserMessage = messages
        .filter(m => m.role === 'user')
        .pop()?.content || '';

      // Default to Designer if no agents selected
      const agentsToCall = selectedAgents && selectedAgents.length > 0 
        ? selectedAgents 
        : ['designer'];

      let response: Response;
      try {
        // Get current session for authorization
        const { data: { session } } = await supabase.auth.getSession();
        
        response = await fetch(FUNCTION_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(session?.access_token ? {
              'Authorization': `Bearer ${session.access_token}`,
              'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8'
            } : {})
          },
          mode: 'cors',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({ 
            conversationId: currentDesign?.conversationId,
            userMessage: lastUserMessage,
            selectedAgents: agentsToCall,
            consultationMode: 'user-driven',
            messages,
            currentDesign
          }),
          signal: controller.signal
        });
      } catch (e: any) {
        if (e?.name === 'AbortError') {
          throw new Error('Request timed out after 5 minutes. For very large designs (18+ circuits), please break into smaller sections.');
        }
        if (e?.name === 'TypeError' && e?.message?.includes('Failed to fetch')) {
          throw new Error('Router unavailable. Please wait a few seconds and Retry.');
        }
        throw e;
    } finally {
      clearTimeout(warningTimer);
      clearTimeout(secondWarningTimer);
      clearTimeout(thirdWarningTimer);
      clearTimeout(timeoutTimer);
    }

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again in a moment.');
        }
        if (response.status === 402) {
          throw new Error('AI credits exhausted. Please add credits to continue.');
        }
        
        // Try to get detailed error message from server
        let serverMessage = '';
        try {
          const errorData = await response.json();
          serverMessage = errorData.error || errorData.message || '';
        } catch {
          try {
            serverMessage = await response.text();
          } catch {}
        }
        
        throw new Error(`Request failed (${response.status}): ${serverMessage || response.statusText || 'Unknown error'}`);
      }

      // Check if response is streaming (SSE) or regular JSON
      const contentType = response.headers.get('content-type');
      
      if (contentType?.includes('text/event-stream')) {
        // Handle SSE streaming
        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response body');

        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (data === '[DONE]') continue;

              try {
                const chunk: StreamChunk = JSON.parse(data);

                switch (chunk.type) {
                  case 'plan':
                    // Agent plan received
                    if (chunk.agents) {
                      activeAgents = chunk.agents;
                      options.onPlan?.(chunk.agents, chunk.data?.complexity || 'simple');
                      
                      // Calculate estimated time based on circuit count
                      const lastMessage = messages[messages.length - 1]?.content || '';
                      const wayMatch = lastMessage.match(/(\d+)[\s-]?way/i);
                      const circuitCount = wayMatch ? parseInt(wayMatch[1]) : 6;
                      
                      const baseTime = 60; // Designer base
                      const perCircuitTime = 4; // Seconds per circuit
                      const estimatedSeconds = baseTime + (circuitCount * perCircuitTime) + (chunk.agents.length * 25);
                      options.onEstimatedTime?.(estimatedSeconds);
                    }
                    break;

                  case 'agent_start':
                    // Agent is starting to respond
                    if (chunk.agent) {
                      options.onAgentStart?.(chunk.agent, chunk.index || 0, chunk.total || 1);
                      options.onAgentProgress?.(chunk.agent, 'active');
                    }
                    break;

                  case 'agent_response':
                    // Full agent response received
                    if (chunk.agent && chunk.response) {
                      fullResponse += (fullResponse ? '\n\n' : '') + chunk.response;
                      onToken(chunk.response);
                      options.onAgentResponse?.(chunk.agent, chunk.response, chunk.structuredData);
                      
                      if (chunk.citations) {
                        citations.push(...chunk.citations);
                      }
                      if (chunk.costUpdates) {
                        // Handle cost updates
                      }
                      if (chunk.structuredData) {
                        structuredData = chunk.structuredData;
                      }
                    }
                    break;

                  case 'agent_complete':
                    // Agent finished
                    if (chunk.agent) {
                      options.onAgentComplete?.(chunk.agent, chunk.nextAgent || null);
                      options.onAgentProgress?.(chunk.agent, 'complete');
                    }
                    break;

                  case 'all_agents_complete':
                    // All agents have finished
                    if (chunk.agentOutputs) {
                      options.onAllAgentsComplete?.(chunk.agentOutputs);
                    }
                    break;

                  case 'agent_error':
                    const errorMsg = chunk.data?.error || chunk.content || 'Unknown error';
                    const agentName = chunk.agent || 'Agent';
                    console.error(`❌ ${agentName} error:`, errorMsg);
                    options.onError?.(`${agentName} failed: ${errorMsg}`);
                    // Append to response for visibility
                    const errorLine = `\n\n*⚠️ ${agentName} encountered an error and was skipped. Other agents continuing...*\n`;
                    fullResponse += errorLine;
                    onToken(errorLine);
                    break;
                  
                  case 'agent_skipped':
                    // Agent was skipped due to missing dependencies
                    if (chunk.agent) {
                      const skipReason = chunk.data?.reason || 'Dependency failed';
                      const deps = chunk.data?.dependencies ? ` (needs: ${chunk.data.dependencies.join(', ')})` : '';
                      console.warn(`⏭️ ${chunk.agent} skipped: ${skipReason}`);
                      const skipLine = `\n\n*ℹ️ ${chunk.agent} skipped: ${skipReason}${deps}. Other agents continuing...*\n`;
                      fullResponse += skipLine;
                      onToken(skipLine);
                      toast.info(`${chunk.agent} skipped: ${skipReason}`);
                    }
                    break;
                  
                  case 'question_analysis':
                    // Question understanding analysis received
                    if (chunk.data) {
                      options.onQuestionAnalysis?.(chunk.data);
                    }
                    break;
                  
                  case 'agent_thinking':
                    // Agent is thinking/processing
                    if (chunk.agent && chunk.message) {
                      options.onAgentThinking?.(
                        chunk.agent, 
                        chunk.message, 
                        chunk.step || 1,
                        chunk.totalSteps || 1
                      );
                    }
                    break;

                  case 'token':
                    if (chunk.content) {
                      fullResponse += chunk.content;
                      onToken(chunk.content);
                    }
                    break;

                  case 'citation':
                    if (chunk.data) {
                      citations.push(chunk.data);
                      options.onCitation?.(chunk.data);
                    }
                    break;

                  case 'tool_call':
                    if (chunk.data) {
                      toolCalls.push(chunk.data);
                      options.onToolCall?.(chunk.data);
                    }
                    break;

                  case 'agent_update':
                    if (chunk.data?.agents) {
                      activeAgents = chunk.data.agents;
                      options.onAgentUpdate?.(activeAgents);
                    }
                    break;

                  case 'agent_challenge':
                    // Inter-agent challenge raised
                    options.onAgentChallenge?.({
                      challenger: chunk.challenger,
                      target: chunk.target,
                      issue: chunk.issue,
                      recommendation: chunk.recommendation,
                      severity: chunk.severity,
                      regulation: chunk.regulation
                    });
                    break;

                  case 'agent_revised':
                    // Agent accepted challenge and revised output
                    options.onAgentRevised?.({
                      agent: chunk.agent,
                      challenger: chunk.challenger,
                      issue: chunk.issue,
                      revisedOutput: chunk.revisedOutput,
                      reasoning: chunk.reasoning,
                      agentResponse: chunk.agentResponse
                    });
                    break;

                  case 'agent_defended':
                    // Agent defended original design
                    options.onAgentDefended?.({
                      agent: chunk.agent,
                      challenger: chunk.challenger,
                      issue: chunk.issue,
                      reasoning: chunk.reasoning,
                      agentResponse: chunk.agentResponse
                    });
                    break;

                  case 'agent_consensus':
                    // Agents reached compromise
                    options.onAgentConsensus?.({
                      agent: chunk.agent,
                      challenger: chunk.challenger,
                      issue: chunk.issue,
                      revisedOutput: chunk.revisedOutput,
                      reasoning: chunk.reasoning,
                      agentResponse: chunk.agentResponse
                    });
                    break;

                  case 'validation_warning':
                    // Non-critical validation warnings
                    options.onValidationWarning?.({
                      agent: chunk.agent,
                      warnings: chunk.warnings
                    });
                    break;

                  case 'error':
                    throw new Error(chunk.content || 'Stream error');
                }
              } catch (e) {
                console.warn('Failed to parse SSE chunk:', e);
              }
            }
          }
        }
      } else {
        // Handle JSON response from agent-router
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Agent router failed');
        }
        
        // Agent-router returns: { success, responses: [{ agent, response: {response, structuredData, suggestedNextAgents} }], suggestedNextAgents, consultedAgents }
        if (data.responses && Array.isArray(data.responses)) {
          // Process each agent's response
          for (const agentOutput of data.responses) {
            const agentName = agentOutput.agent;
            let agentResponse: any = agentOutput.response;
            
            // If response is a stringified JSON, parse it
            if (typeof agentResponse === 'string' && agentResponse.startsWith('{')) {
              try {
                agentResponse = JSON.parse(agentResponse);
              } catch (e) {
                // If parsing fails, treat as plain string
                agentResponse = { response: agentResponse };
              }
            }
            
            // Extract response text
            const responseText = agentResponse?.response || agentResponse?.summary || 
                                (typeof agentOutput.response === 'string' ? agentOutput.response : '');
            fullResponse += (fullResponse ? '\n\n' : '') + responseText;
            
            // Notify agent response with structured data
            options.onAgentResponse?.(agentName, responseText, agentResponse?.structuredData);
            
            // Merge structured data (last agent wins, but collect suggestedNextAgents)
            if (agentResponse?.structuredData) {
              structuredData = agentResponse.structuredData;
            }
            
            // Simulate streaming for each agent response
            const words = responseText.split(' ');
            for (const word of words) {
              onToken(word + ' ');
              await new Promise(resolve => setTimeout(resolve, 20));
            }
          }
          
          // Set suggested next agents from router (already deduped and prioritized)
          if (structuredData) {
            structuredData.suggestedNextAgents = data.suggestedNextAgents || [];
          } else {
            structuredData = {
              suggestedNextAgents: data.suggestedNextAgents || []
            };
          }
          
          // Mark all consulted agents as complete
          if (data.consultedAgents) {
            for (const agent of data.consultedAgents) {
              options.onAgentComplete?.(agent, null);
            }
          }
          
          // Notify completion
          options.onAllAgentsComplete?.(data.responses);
        } else {
          throw new Error('Invalid response format from agent-router');
        }
      }

      onComplete(fullResponse, {
        citations,
        toolCalls,
        activeAgents,
        structuredData
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get AI response';
      options.onError?.(errorMessage);
      throw error;
    } finally {
      clearInterval(elapsedInterval);
      setIsStreaming(false);
    }
  }, [options]);

  return { streamMessage, isStreaming };
};
