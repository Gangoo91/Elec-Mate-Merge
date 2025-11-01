/**
 * Direct AI Provider Utilities
 * Routes to Gemini Flash 2.5 or OpenAI GPT-4.1-mini
 * Replaces Lovable AI Gateway
 */

export class AIProviderError extends Error {
  constructor(
    message: string,
    public provider: 'gemini' | 'openai',
    public statusCode?: number,
    public retryable: boolean = false
  ) {
    super(message);
    this.name = 'AIProviderError';
  }
}

export interface AICallOptions {
  messages: Array<{ role: string; content: string }>;
  model?: string;
  temperature?: number;
  max_tokens?: number;
  response_format?: { type: 'json_object' };
  tools?: any[];
  tool_choice?: any;
}

export interface AIResponse {
  content: string;
  toolCalls?: any[];
}

/**
 * Generate embeddings using OpenAI text-embedding-3-small
 * Cost: $0.00002 per 1K tokens (very cheap)
 */
export async function generateEmbedding(
  text: string,
  openAiKey: string
): Promise<number[]> {
  console.log('🔢 Generating embedding with OpenAI text-embedding-3-small');
  
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: text,
      model: 'text-embedding-3-small',
      dimensions: 1536 // Standard dimension
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new AIProviderError(
      `OpenAI embedding failed: ${response.status} - ${errorText}`,
      'openai',
      response.status,
      response.status === 429 || response.status >= 500
    );
  }

  const data = await response.json();
  return data.data[0].embedding;
}

/**
 * Call Google Gemini 2.5 Flash for tooling/generation tasks
 * Default model, very fast and cheap
 */
export async function callGemini(
  options: AICallOptions,
  geminiKey: string
): Promise<AIResponse> {
  const {
    messages,
    model = 'gemini-2.5-flash',
    temperature = 0.3,
    max_tokens = 2000,
    response_format,
    tools,
    tool_choice
  } = options;

  console.log(`🤖 Calling Gemini ${model}`);

  // Convert messages to Gemini format
  const systemPrompt = messages.find(m => m.role === 'system')?.content || '';
  const userMessages = messages.filter(m => m.role === 'user' || m.role === 'assistant');
  
  const geminiMessages = userMessages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const body: any = {
    contents: geminiMessages,
    generationConfig: {
      temperature,
      maxOutputTokens: max_tokens
    }
  };

  if (systemPrompt) {
    body.systemInstruction = {
      parts: [{ text: systemPrompt }]
    };
  }

  if (response_format?.type === 'json_object') {
    body.generationConfig.responseMimeType = 'application/json';
  }

  // Add tool calling if specified
  if (tools && tools.length > 0) {
    body.tools = tools.map((tool: any) => ({
      functionDeclarations: [{
        name: tool.function.name,
        description: tool.function.description,
        parameters: tool.function.parameters
      }]
    }));
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    
    if (response.status === 429) {
      throw new AIProviderError('Gemini rate limit exceeded', 'gemini', 429, true);
    }
    
    throw new AIProviderError(
      `Gemini API error: ${response.status} - ${errorText}`,
      'gemini',
      response.status,
      response.status >= 500
    );
  }

  const data = await response.json();
  
  // Handle safety blocks
  if (data.candidates?.[0]?.finishReason === 'SAFETY') {
    throw new AIProviderError(
      'Content blocked by Gemini safety filters',
      'gemini',
      undefined,
      false
    );
  }

  // Extract content
  const candidate = data.candidates?.[0];
  
  // Handle MALFORMED_FUNCTION_CALL specifically - this is retryable with simpler prompts
  if (candidate?.finishReason === 'MALFORMED_FUNCTION_CALL') {
    throw new AIProviderError(
      'Gemini could not format response correctly - tool calling schema may be too complex. Will retry with simplified approach.',
      'gemini',
      undefined,
      true // retryable
    );
  }
  
  if (!candidate?.content?.parts?.[0]) {
    const finishReason = candidate?.finishReason || 'unknown';
    const isRetryable = finishReason === 'MALFORMED_FUNCTION_CALL' || finishReason === 'OTHER' || finishReason === 'RECITATION';
    
    throw new AIProviderError(
      `Empty response from Gemini (finish reason: ${finishReason})`,
      'gemini',
      undefined,
      isRetryable
    );
  }

  // Handle tool calls
  if (candidate.content.parts[0].functionCall) {
    const toolCall = candidate.content.parts[0].functionCall;
    return {
      content: JSON.stringify(toolCall.args),
      toolCalls: [{ function: { name: toolCall.name, arguments: JSON.stringify(toolCall.args) } }]
    };
  }

  const content = candidate.content.parts[0].text;
  if (!content) {
    throw new AIProviderError('Empty content from Gemini', 'gemini', undefined, true);
  }

  return { content };
}

/**
 * Call OpenAI GPT-4.1-mini for chat/conversational tasks
 * More expensive than Gemini but excellent for chat
 */
export async function callOpenAI(
  options: AICallOptions,
  openAiKey: string,
  timeoutMs: number = 110000 // 110s timeout - leave 10s buffer for edge function
): Promise<AIResponse> {
  const {
    messages,
    model = 'gpt-5-mini-2025-08-07',
    temperature = 0.7,
    max_tokens = 30000,
    response_format,
    tools,
    tool_choice
  } = options;

  console.log(`🤖 Calling OpenAI ${model} (timeout: ${timeoutMs}ms)`);

  // GPT-5, GPT-4.1, O3, O4 models require max_completion_tokens and NO temperature
  const isNewModel = model.includes('gpt-5') || model.includes('gpt-4.1') || model.includes('o3') || model.includes('o4');

  const body: any = {
    model,
    messages,
  };

  // Use max_completion_tokens for new models, max_tokens for legacy
  if (isNewModel) {
    body.max_completion_tokens = max_tokens;
    // Do NOT send temperature - new models don't support it
  } else {
    body.max_tokens = max_tokens;
    body.temperature = temperature;
  }

  if (response_format) {
    body.response_format = response_format;
  }

  if (tools && tools.length > 0) {
    body.tools = tools;
    if (tool_choice) {
      body.tool_choice = tool_choice;
    }
  }

  // Create AbortController for timeout
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => {
    console.error(`⏱️ ABORTING: OpenAI call exceeded ${timeoutMs}ms`);
    abortController.abort();
  }, timeoutMs);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: abortController.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      
      if (response.status === 429) {
        throw new AIProviderError('OpenAI rate limit exceeded', 'openai', 429, true);
      }
      
      throw new AIProviderError(
        `OpenAI API error: ${response.status} - ${errorText}`,
        'openai',
        response.status,
        response.status >= 500
      );
    }

    const data = await response.json();
  
  // Handle tool calls
  if (data.choices?.[0]?.message?.tool_calls) {
    const toolCalls = data.choices[0].message.tool_calls;
    return {
      content: toolCalls[0]?.function?.arguments || '{}',
      toolCalls
    };
  }

    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new AIProviderError(
        `Empty response from OpenAI (finish reason: ${data.choices?.[0]?.finish_reason || 'unknown'})`,
        'openai',
        undefined,
        true
      );
    }

    return { content };
  } catch (error: any) {
    clearTimeout(timeoutId);
    
    // Handle abort errors
    if (error.name === 'AbortError') {
      throw new AIProviderError(
        `OpenAI API timeout after ${timeoutMs}ms`,
        'openai',
        408, // Request Timeout
        true // retryable
      );
    }
    
    throw error;
  }
}

/**
 * Retry with exponential backoff
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelayMs: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // Don't retry non-retryable errors
      if (error instanceof AIProviderError && !error.retryable) {
        throw error;
      }

      if (attempt < maxRetries) {
        const delayMs = Math.min(baseDelayMs * Math.pow(2, attempt - 1), 10000);
        console.warn(`⚠️ Attempt ${attempt} failed, retrying in ${delayMs}ms...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError!;
}
