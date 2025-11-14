/**
 * AI Caller Module
 * Handles OpenAI API calls with retry logic
 */

import { callOpenAI, AIProviderError } from '../../_shared/ai-providers.ts';
import { withRetry } from '../../_shared/retry.ts';

/**
 * Call OpenAI with retry and timeout handling
 */
export async function callOpenAIWithRetry(
  messages: any[],
  tools: any[],
  tool_choice: any,
  openAiKey: string,
  logger: any,
  timeoutMs: number = 280000,
  batchInfo?: { current: number, total: number } // NEW: For progress tracking
): Promise<any> {
  const batchLabel = batchInfo ? `Batch ${batchInfo.current}/${batchInfo.total}` : 'Processing';
  logger.info(`Calling OpenAI GPT-5 Mini with ${timeoutMs}ms timeout and retry...`);
  
  // Log the timeout being used
  console.log(`⏱️ ${batchLabel} - OpenAI timeout configured: ${timeoutMs}ms (${Math.round(timeoutMs/1000)}s)`);
  console.log(`🚀 ${batchLabel} - Starting OpenAI API call at ${new Date().toISOString()}`);
  
  const startTime = Date.now();

  return await withRetry(async () => {
    const response = await callOpenAI(
      {
        messages,
        model: 'gpt-5-mini-2025-08-07', // FAST & EFFICIENT: GPT-5 Mini for 45-60s response time
        max_tokens: 24000,
        tools,
        tool_choice
      },
      openAiKey,
      timeoutMs // Explicitly pass timeout
    );

    const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
    console.log(`✅ ${batchLabel} - OpenAI response received in ${elapsedSeconds}s`);

    return response;
  }, {
    maxRetries: 3,
    baseDelayMs: 2000,
    maxDelayMs: 10000,
    shouldRetry: (error: unknown) => {
      // Only retry on actual timeout/network errors, not validation errors
      if (error instanceof Error) {
        const msg = error.message.toLowerCase();
        const isRetryable = msg.includes('timeout') || 
                          msg.includes('network') || 
                          msg.includes('econnreset') ||
                          msg.includes('429') ||
                          msg.includes('503');
        
        if (!isRetryable) {
          console.error('❌ Non-retryable OpenAI error:', error.message);
        }
        
        return isRetryable;
      }
      return false;
    }
  });
}

/**
 * Parse tool calls from AI response
 */
export function parseToolCalls(response: any): any[] {
  if (!response.toolCalls || response.toolCalls.length === 0) {
    throw new Error('No tool calls found in AI response');
  }

  return response.toolCalls.map((toolCall: any) => {
    try {
      const args = JSON.parse(toolCall.function.arguments);
      return { name: toolCall.function.name, arguments: args };
    } catch (e) {
      throw new Error(`Failed to parse tool call arguments: ${e.message}`);
    }
  });
}
