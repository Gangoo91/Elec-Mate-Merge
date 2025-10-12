/**
 * Universal AI Wrapper - Single Source of Truth for All AI Calls
 * 
 * Features:
 * - 60s timeout (safe for Supabase)
 * - Automatic retry with exponential backoff
 * - Gemini by default (fast + free)
 * - Consistent parameter handling (max_tokens vs max_completion_tokens)
 * - Robust error handling with fallback support
 */

import { withTimeout, Timeouts } from './timeout.ts';
import { withRetry, RetryPresets } from './retry.ts';

export class AIError extends Error {
  constructor(
    message: string,
    public provider: string,
    public statusCode?: number,
    public retryable: boolean = false
  ) {
    super(message);
    this.name = 'AIError';
  }
}

export interface AICallOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  responseFormat?: 'json_object' | 'text';
  timeoutMs?: number;
  systemPrompt: string;
  userPrompt: string;
  requireJSON?: boolean;
  tools?: any[];
  toolChoice?: any;
}

export interface AICallResult {
  content: string;
  model: string;
  source: 'ai' | 'fallback';
  duration: number;
  toolCalls?: any[];
}

/**
 * UNIVERSAL AI WRAPPER - Use this for ALL AI calls
 * 
 * @param apiKey - Lovable AI key or OpenAI key
 * @param options - AI call configuration
 * @returns AI response with metadata
 * @throws AIError with proper context
 */
export async function callAI(
  apiKey: string,
  options: AICallOptions
): Promise<AICallResult> {
  const {
    model = 'google/gemini-2.5-flash', // Default: fast + free Gemini
    temperature,
    maxTokens = 2000,
    responseFormat = 'text',
    timeoutMs = 55000, // 55s to stay under 60s Supabase limit
    systemPrompt,
    userPrompt,
    requireJSON = false,
    tools,
    toolChoice
  } = options;

  const startTime = Date.now();
  const isGPT5 = model.includes('gpt-5');
  const isOpenAI = model.startsWith('openai/') || model.startsWith('gpt-');
  const provider = isOpenAI ? 'OpenAI' : 'Lovable AI';

  // Build request body with correct parameters for model type
  const body: any = {
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]
  };

  // Handle token parameter differences between models
  if (isGPT5) {
    body.max_completion_tokens = maxTokens;
    // Don't set temperature for GPT-5 (not supported)
  } else {
    body.max_tokens = maxTokens;
    if (temperature !== undefined) {
      body.temperature = temperature;
    }
  }

  // Add response format if specified
  if (responseFormat === 'json_object') {
    body.response_format = { type: 'json_object' };
  }

  // Add tool calling if specified
  if (tools && tools.length > 0) {
    body.tools = tools;
    if (toolChoice) {
      body.tool_choice = toolChoice;
    }
  }

  console.log(`🤖 AI Call: ${model} (timeout: ${timeoutMs}ms, provider: ${provider})`);

  // Wrap with timeout + retry for resilience
  try {
    const result = await withTimeout(
      withRetry(async () => {
        const endpoint = isOpenAI 
          ? 'https://api.openai.com/v1/chat/completions'
          : 'https://ai.gateway.lovable.dev/v1/chat/completions';

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const errorText = await response.text();
          
          // Handle specific error cases with appropriate retry behavior
          if (response.status === 429) {
            throw new AIError('Rate limit exceeded', provider, 429, true); // Retryable
          }
          if (response.status === 402) {
            throw new AIError('Payment required - credits exhausted', provider, 402, false);
          }
          if (response.status === 503 || response.status === 502) {
            throw new AIError('Service temporarily unavailable', provider, response.status, true); // Retryable
          }
          if (response.status === 500) {
            throw new AIError('Internal server error', provider, 500, true); // Retryable
          }
          
          throw new AIError(
            `AI call failed: ${errorText}`,
            provider,
            response.status,
            false
          );
        }

        const data = await response.json();
        
        // Handle tool calls (structured output)
        if (data.choices?.[0]?.message?.tool_calls) {
          const toolCalls = data.choices[0].message.tool_calls;
          const content = toolCalls[0]?.function?.arguments || '{}';
          
          return { content, toolCalls };
        }

        // Handle regular text response
        const content = data.choices?.[0]?.message?.content;
        
        if (!content) {
          throw new AIError('Empty response from AI', provider, undefined, true); // Retryable
        }

        // Validate JSON if required
        if (requireJSON) {
          try {
            JSON.parse(content);
          } catch {
            throw new AIError('AI returned invalid JSON', provider, undefined, true); // Retryable
          }
        }

        return { content, toolCalls: undefined };
      }, {
        ...RetryPresets.STANDARD,
        shouldRetry: (error: unknown) => {
          if (error instanceof AIError) {
            return error.retryable;
          }
          // Retry on network errors by default
          if (error instanceof Error) {
            const message = error.message.toLowerCase();
            return message.includes('timeout') || 
                   message.includes('network') ||
                   message.includes('econnreset');
          }
          return false;
        }
      }),
      timeoutMs,
      `AI call to ${model}`
    );

    const duration = Date.now() - startTime;
    console.log(`✅ AI call succeeded (${duration}ms)`);

    return {
      content: result.content,
      model,
      source: 'ai',
      duration,
      toolCalls: result.toolCalls
    };

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ AI call failed after ${duration}ms:`, error);

    // Re-throw with proper context
    if (error instanceof AIError) {
      throw error;
    }
    
    throw new AIError(
      error instanceof Error ? error.message : 'AI call failed',
      provider,
      undefined,
      false
    );
  }
}

/**
 * Call AI with automatic fallback to template response
 * Use this when you have a fallback strategy (recommended for user-facing features)
 * 
 * @param apiKey - Lovable AI key or OpenAI key
 * @param options - AI call configuration
 * @param fallbackFn - Function that generates fallback response
 * @returns AI response with metadata (never throws)
 */
export async function callAIWithFallback(
  apiKey: string,
  options: AICallOptions,
  fallbackFn: () => string
): Promise<AICallResult> {
  try {
    return await callAI(apiKey, options);
  } catch (error) {
    console.warn('⚠️ AI call failed, using fallback', {
      error: error instanceof Error ? error.message : String(error),
      model: options.model
    });
    
    return {
      content: fallbackFn(),
      model: options.model || 'fallback',
      source: 'fallback',
      duration: 0
    };
  }
}

/**
 * Timeout presets for AI calls
 */
export const AITimeouts = {
  /** Quick AI tasks (30s) - simple queries, classifications */
  QUICK: 30000,
  
  /** Standard AI calls (55s) - most use cases */
  STANDARD: 55000,
  
  /** Long AI operations (90s) - complex analysis, multi-step reasoning */
  LONG: 90000,
};
