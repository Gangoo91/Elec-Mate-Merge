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
  timeoutMs: number = 280000
): Promise<any> {
  logger.info('Calling OpenAI GPT-5 Mini (fast model) with retry...');

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
      timeoutMs
    );

    return response;
  }, {
    maxAttempts: 3,
    backoff: [2000, 5000, 10000]
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
