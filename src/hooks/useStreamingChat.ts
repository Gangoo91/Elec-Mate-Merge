import { useState, useCallback } from 'react';

interface StreamChunk {
  type: 'token' | 'citation' | 'tool_call' | 'agent_update' | 'done' | 'error' | 'plan' | 'agent_start' | 'agent_response' | 'agent_complete' | 'all_agents_complete' | 'agent_error' | 'agent_skipped' | 'question_analysis' | 'confirmation_required';
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
  onConfirmationRequired?: (data: any) => void;
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
      const FUNCTION_URL = "https://jtwygbeceundfgnkirof.supabase.co/functions/v1/orchestrator-agent-v2";
      
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

      let response: Response;
      try {
        response = await fetch(FUNCTION_URL, {
          method: 'POST',
headers: {
  'Content-Type': 'application/json',
  'Accept': 'text/event-stream'
},
mode: 'cors',
referrerPolicy: 'no-referrer',
body: JSON.stringify({ 
  messages, 
  currentDesign, 
  selectedAgents, 
  targetAgent,
  ...(currentDesign?.userContext && { userContext: currentDesign.userContext })
}),
signal: controller.signal
        });
      } catch (e: any) {
        if (e?.name === 'AbortError') {
          throw new Error('Request timed out after 5 minutes. For very large designs (18+ circuits), please break into smaller sections.');
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
                    console.error(`Agent ${chunk.agent} error:`, errorMsg);
                    options.onError?.(`${chunk.agent} encountered an issue: ${errorMsg}`);
                    break;
                  
                  case 'agent_skipped':
                    // Agent was skipped due to missing dependencies
                    if (chunk.agent) {
                      const skipReason = chunk.data?.reason || 'Missing prerequisite data';
                      console.warn(`⏭️ ${chunk.agent} skipped: ${skipReason}`);
                      fullResponse += `\n\n*${chunk.agent} skipped — ${skipReason}. Other agents continuing...*\n`;
                      onToken(`\n\n*${chunk.agent} skipped — ${skipReason}*\n`);
                    }
                    break;
                  
                  case 'question_analysis':
                    // Question understanding analysis received
                    if (chunk.data) {
                      options.onQuestionAnalysis?.(chunk.data);
                    }
                    break;
                  
                  case 'confirmation_required':
                    // User confirmation required
                    if (chunk.data) {
                      options.onConfirmationRequired?.(chunk.data);
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
        // Handle regular JSON response (fallback for non-streaming)
        const data = await response.json();
        
        if (data.error) throw new Error(data.error);
        
        fullResponse = data.response || '';
        citations = data.citations || [];
        toolCalls = data.toolCalls || [];
        activeAgents = data.activeAgents || [];
        
        // Simulate streaming for smoother UX
        const words = fullResponse.split(' ');
        for (const word of words) {
          onToken(word + ' ');
          await new Promise(resolve => setTimeout(resolve, 30));
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

  return {
    streamMessage,
    isStreaming
  };
};
