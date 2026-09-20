/**
 * AI Caller Module
 * Handles OpenAI API calls with retry logic
 */

import { callOpenAI, AIProviderError } from '../../_shared/ai-providers.ts';
import { withRetry } from '../../_shared/retry.ts';

// Model fallback chain for reliability
const MODEL_FALLBACK_CHAIN = [
  'gpt-5-mini-2025-08-07',  // Primary: Fast, cost-effective
  'gpt-4.1-mini-2025-04-14', // Fallback 1: More reliable
  'gpt-4o-mini'             // Fallback 2: Legacy reliable model
];

/**
 * Call OpenAI with retry, timeout handling, and automatic model fallback
 */
export async function callOpenAIWithRetry(
  messages: any[],
  tools: any[],
  tool_choice: any,
  openAiKey: string,
  logger: any,
  timeoutMs: number = 280000,
  batchInfo?: { current: number, total: number },
  modelFallbackChain?: string[] // Optional: custom fallback chain
): Promise<any> {
  const batchLabel = batchInfo ? `Batch ${batchInfo.current}/${batchInfo.total}` : 'Processing';
  const fallbackChain = modelFallbackChain || MODEL_FALLBACK_CHAIN;
  
  logger.info(`Calling OpenAI with ${timeoutMs}ms timeout and retry...`);
  console.log(`⏱️ ${batchLabel} - OpenAI timeout configured: ${timeoutMs}ms (${Math.round(timeoutMs/1000)}s)`);
  console.log(`🚀 ${batchLabel} - Starting OpenAI API call at ${new Date().toISOString()}`);
  
  const startTime = Date.now();
  let lastError: any;

  // Try each model in the fallback chain
  for (let modelIndex = 0; modelIndex < fallbackChain.length; modelIndex++) {
    const model = fallbackChain[modelIndex];
    const isLastModel = modelIndex === fallbackChain.length - 1;
    
    try {
      console.log(`🤖 ${batchLabel} - Attempting with ${model} (${modelIndex + 1}/${fallbackChain.length})`);
      
      const response = await withRetry(async () => {
        const response = await callOpenAI(
          {
            messages,
            model,
            max_completion_tokens: 6000,
            tools,
            tool_choice
          },
          openAiKey,
          timeoutMs
        );

        return response;
      }, {
        maxRetries: isLastModel ? 3 : 1, // More retries on last model
        baseDelayMs: 2000,
        maxDelayMs: 10000,
        shouldRetry: (error: unknown) => {
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

      const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
      console.log(`✅ ${batchLabel} - ${model} succeeded in ${elapsedSeconds}s`);

      return response;
      
    } catch (error) {
      lastError = error;
      console.warn(`⚠️ ${batchLabel} - ${model} failed:`, error instanceof Error ? error.message : String(error));
      
      if (isLastModel) {
        console.error(`❌ ${batchLabel} - All AI models failed. Last error:`, error);
        throw new Error(`All AI models failed. Last error: ${error instanceof Error ? error.message : String(error)}`);
      }
      
      console.log(`🔄 ${batchLabel} - Trying fallback model: ${fallbackChain[modelIndex + 1]}...`);
      // Wait 2 seconds before trying next model
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  throw lastError;
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
