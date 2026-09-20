/**
 * Universal AI Wrapper - Multi-Provider Support
 * 
 * Features:
 * - Anthropic direct API (when ANTHROPIC_API_KEY present)
 * - Gemini via Lovable AI Gateway (default, fast + free)
 * - OpenAI direct API support
 * - 60s timeout (safe for Supabase)
 * - Automatic retry with exponential backoff
 * - Consistent parameter handling
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
 * Detect provider from model name
 */
function detectProvider(model: string): 'anthropic' | 'openai' | 'gemini' {
  if (model.startsWith('anthropic/') || model.startsWith('claude-')) {
    return 'anthropic';
  }
  if (model.startsWith('openai/') || model.startsWith('gpt-')) {
    return 'openai';
  }
  return 'gemini'; // google/* or default
}

/**
 * Call Anthropic API directly (bypasses gateway)
 */
async function callAnthropicDirect(
  model: string,
  systemPrompt: string,
  userPrompt: string,
  options: Partial<AICallOptions>
): Promise<{ content: string; toolCalls?: any[] }> {
  const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY');
  if (!anthropicKey) {
    throw new AIError('ANTHROPIC_API_KEY not configured', 'Anthropic', undefined, false);
  }

  const { maxTokens = 2600, temperature = 0.2 } = options;
  
  // Map model name: anthropic/claude-3-7-sonnet-20250219 → claude-3-7-sonnet-20250219
  const cleanModel = model.replace('anthropic/', '');

  const body: any = {
    model: cleanModel,
    max_tokens: maxTokens,
    temperature,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }]
  };

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': anthropicKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new AIError(
      `Anthropic API error: ${response.status} ${errorText}`,
      'Anthropic',
      response.status,
      response.status === 429 || response.status >= 500
    );
  }

  const data = await response.json();
  
  // Map Anthropic response to our format
  const content = data.content?.[0]?.text || '';
  
  return { content, toolCalls: undefined };
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
    timeoutMs = 70000, // 70s for complex tasks
    systemPrompt,
    userPrompt,
    requireJSON = false,
    tools,
    toolChoice
  } = options;

  const startTime = Date.now();
  const provider = detectProvider(model);
  
  // Check if we should use Anthropic direct API
  const useAnthropicDirect = provider === 'anthropic' && Deno.env.get('ANTHROPIC_API_KEY');

  const providerName = useAnthropicDirect 
    ? 'Anthropic Direct' 
    : (provider === 'openai' ? 'OpenAI' : 'Lovable AI');
  
  console.log(`🤖 AI Call: ${model} (timeout: ${timeoutMs}ms, provider: ${providerName})`);

  // Wrap with timeout + retry for resilience
  try {
    const result = await withTimeout(
      withRetry(async () => {
        // Route to Anthropic direct API if available and model is Claude
        if (useAnthropicDirect) {
          return await callAnthropicDirect(model, systemPrompt, userPrompt, options);
        }

        // Otherwise use Lovable AI Gateway or OpenAI
        const isOpenAI = provider === 'openai';
        const isGPT5 = model.includes('gpt-5');

        const endpoint = isOpenAI 
          ? 'https://api.openai.com/v1/chat/completions'
          : 'https://ai.gateway.lovable.dev/v1/chat/completions';

        // Build request body with correct parameters for model type
        const body: any = {
          model: isOpenAI ? model.replace(/^openai\//, '') : model, // Strip openai/ prefix for direct API calls
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

        // Add explicit timeout to prevent indefinite hanging
        const controller = new AbortController();
        const fetchTimeout = setTimeout(() => controller.abort(), 120000); // 2 min max per attempt

        let response;
        try {
          response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            signal: controller.signal,
          });
          clearTimeout(fetchTimeout);
        } catch (fetchError: any) {
          clearTimeout(fetchTimeout);
          
          // Handle abort as timeout
          if (fetchError.name === 'AbortError') {
            throw new AIError('OpenAI API call timed out after 120s', providerName, undefined, true);
          }
          throw fetchError;
        }

        if (!response.ok) {
          const errorText = await response.text();
          
          // Check for invalid model error from gateway → suggest fallback
          if (errorText.includes('invalid model') && provider === 'anthropic') {
            console.warn(`⚠️ Gateway rejected ${model}, suggest using Anthropic direct API or Gemini`);
          }
          
          // Handle specific error cases with appropriate retry behavior
          if (response.status === 429) {
            throw new AIError('Rate limit exceeded', providerName, 429, true); // Retryable
          }
          if (response.status === 402) {
            throw new AIError('Payment required - credits exhausted', providerName, 402, false);
          }
          if (response.status === 503 || response.status === 502) {
            throw new AIError('Service temporarily unavailable', providerName, response.status, true);
          }
          if (response.status === 500) {
            throw new AIError('Internal server error', providerName, 500, true);
          }
          
          throw new AIError(
            `AI call failed: ${errorText}`,
            providerName,
            response.status,
            false
          );
        }

        const data = await response.json();
        
        // Debug log the full response structure
        console.log('🔍 AI Response Structure:', {
          hasChoices: !!data.choices,
          choicesLength: data.choices?.length,
          hasMessage: !!data.choices?.[0]?.message,
          hasContent: !!data.choices?.[0]?.message?.content,
          contentType: typeof data.choices?.[0]?.message?.content,
          finishReason: data.choices?.[0]?.finish_reason,
          safetyRatings: data.choices?.[0]?.safety_ratings,
          model: data.model
        });

        // Handle safety blocks (Gemini-specific)
        if (data.choices?.[0]?.finish_reason === 'SAFETY') {
          throw new AIError(
            'Content blocked by safety filters. Try rephrasing your query.',
            providerName,
            undefined,
            false // Not retryable
          );
        }

        // Handle refusals (Claude/GPT-specific)
        if (data.choices?.[0]?.finish_reason === 'content_filter') {
          throw new AIError(
            'Content filtered by AI provider. Please rephrase.',
            providerName,
            undefined,
            false
          );
        }
        
        // Handle tool calls (structured output)
        if (data.choices?.[0]?.message?.tool_calls) {
          const toolCalls = data.choices[0].message.tool_calls;
          const content = toolCalls[0]?.function?.arguments || '{}';
          
          return { content, toolCalls };
        }

        // Handle regular text response
        const content = data.choices?.[0]?.message?.content;
        
        if (!content) {
          // Log the full response for debugging
          console.error('❌ Empty content from AI:', {
            fullResponse: JSON.stringify(data),
            finishReason: data.choices?.[0]?.finish_reason,
            model: data.model,
            usage: data.usage
          });
          
          throw new AIError(
            `Empty response from AI (finish_reason: ${data.choices?.[0]?.finish_reason || 'unknown'})`,
            providerName,
            undefined,
            true // Retryable - might be transient
          );
        }

        // Validate JSON if required
        if (requireJSON) {
          try {
            JSON.parse(content);
          } catch {
            throw new AIError('AI returned invalid JSON', providerName, undefined, true);
          }
        }

        return { content, toolCalls: undefined };
      }, {
        ...RetryPresets.STANDARD,
        maxRetries: 3, // Reduce from 4 to 3
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
    console.log(`✅ AI call succeeded (${duration}ms, provider: ${providerName})`);

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
      providerName,
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
