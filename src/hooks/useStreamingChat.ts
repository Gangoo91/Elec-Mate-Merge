import { useState, useCallback } from 'react';

interface StreamChunk {
  type: 'token' | 'citation' | 'tool_call' | 'agent_update' | 'done' | 'error';
  content?: string;
  data?: any;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  citations?: Array<{ number: string; title: string }>;
  toolCalls?: any[];
  activeAgents?: string[];
}

interface UseStreamingChatOptions {
  onAgentUpdate?: (agents: string[]) => void;
  onToolCall?: (toolCall: any) => void;
  onCitation?: (citation: any) => void;
  onError?: (error: string) => void;
}

export const useStreamingChat = (options: UseStreamingChatOptions = {}) => {
  const [isStreaming, setIsStreaming] = useState(false);

  const streamMessage = useCallback(async (
    messages: Message[],
    currentDesign: any,
    onToken: (token: string) => void,
    onComplete: (fullMessage: string, data: any) => void
  ) => {
    setIsStreaming(true);
    let fullResponse = '';
    let citations: any[] = [];
    let toolCalls: any[] = [];
    let activeAgents: string[] = [];

    try {
      const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/orchestrator-agent`;
      
      const response = await fetch(FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ messages, currentDesign })
      });

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
        activeAgents
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get AI response';
      options.onError?.(errorMessage);
      throw error;
    } finally {
      setIsStreaming(false);
    }
  }, [options]);

  return {
    streamMessage,
    isStreaming
  };
};
