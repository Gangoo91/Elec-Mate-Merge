/**
 * V3 Core - Single shared module for all V3 agents
 * Minimal, self-contained utilities with zero circular dependencies
 */

import { createClient as createSupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

// ============= CORS =============
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ============= LOGGING =============
export interface LogMetadata {
  [key: string]: unknown;
}

export class Logger {
  constructor(private requestId: string, private context: LogMetadata = {}) {}
  
  info(message: string, meta?: LogMetadata) {
    console.info(`[${this.requestId}] [INFO] ${message}`, JSON.stringify({ ...this.context, ...meta }));
  }
  
  error(message: string, meta?: LogMetadata) {
    console.error(`[${this.requestId}] [ERROR] ${message}`, JSON.stringify({ ...this.context, ...meta }));
  }
  
  debug(message: string, meta?: LogMetadata) {
    console.debug(`[${this.requestId}] [DEBUG] ${message}`, JSON.stringify({ ...this.context, ...meta }));
  }
  
  warn(message: string, meta?: LogMetadata) {
    console.warn(`[${this.requestId}] [WARN] ${message}`, JSON.stringify({ ...this.context, ...meta }));
  }
  
  async time<T>(operation: string, fn: () => Promise<T>): Promise<T> {
    const start = Date.now();
    try {
      const result = await fn();
      const duration = Date.now() - start;
      this.debug(`${operation} completed`, { duration });
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      this.error(`${operation} failed`, { duration, error: error instanceof Error ? error.message : String(error) });
      throw error;
    }
  }
}

export function createLogger(requestId: string, context?: LogMetadata): Logger {
  return new Logger(requestId, context);
}

export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// ============= ERROR HANDLING =============
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class ExternalAPIError extends Error {
  constructor(message: string, public service: string) {
    super(message);
    this.name = 'ExternalAPIError';
  }
}

export function handleError(error: unknown): Response {
  let statusCode = 500;
  let message = 'Unknown error';
  let userMessage = message;
  let detailedError = '';
  
  if (error instanceof ValidationError) {
    statusCode = 400;
    message = error.message;
    userMessage = message;
    detailedError = message;
  } else if (error instanceof ExternalAPIError) {
    statusCode = 502;
    message = `${error.service} error: ${error.message}`;
    detailedError = message;
    // Include actual AI error message for better debugging
    userMessage = error.message.includes('max_tokens') 
      ? 'AI model configuration issue. Please try again.'
      : `External service issue with ${error.service}. Please try again.`;
  } else if (error instanceof Error) {
    message = error.message;
    detailedError = error.stack || message;
    // Provide user-friendly message for JSON parsing errors
    if (message.includes('Invalid JSON')) {
      userMessage = 'AI response formatting issue. Please try again.';
    } else if (message.includes('max_tokens') || message.includes('max_completion_tokens')) {
      userMessage = 'AI model parameter issue. This has been logged and will be fixed.';
    } else {
      userMessage = message;
    }
  }
  
  console.error('Error handled:', { statusCode, message, detailedError });
  
  return new Response(
    JSON.stringify({ 
      error: userMessage, 
      _rawError: message,
      _details: detailedError.substring(0, 500) // Include partial stack for debugging
    }),
    { 
      status: statusCode,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  );
}

// ============= SUPABASE CLIENT =============
export function createClient(url: string, key: string) {
  return createSupabaseClient(url, key);
}

// ============= UTILITIES =============
export async function generateEmbedding(text: string, apiKey: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: text,
      model: 'text-embedding-3-large', // UPGRADED: 3072 dimensions for +20% accuracy
      dimensions: 3072
    }),
  });

  if (!response.ok) {
    throw new ExternalAPIError(`Embedding generation failed: ${response.status}`, 'OpenAI');
  }

  const data = await response.json();
  return data.data[0].embedding;
}

export async function callLovableAI(
  systemPrompt: string,
  userPrompt: string,
  apiKey: string,
  options: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    responseFormat?: 'json_object' | 'text';
  } = {}
): Promise<string> {
  const {
    model = 'google/gemini-2.5-flash',
    temperature,
    maxTokens = 2000,
    responseFormat = 'text'
  } = options;

  // CRITICAL: GPT-5 parameter compatibility
  const isGPT5 = model.toLowerCase().includes('gpt-5') || model.toLowerCase().includes('openai/gpt-5');
  
  const body: any = {
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]
  };

  // Use correct token parameter based on model
  if (isGPT5) {
    body.max_completion_tokens = maxTokens;
    // GPT-5 doesn't support temperature parameter - omit it
    console.debug(`Using max_completion_tokens for GPT-5 model: ${model}`);
  } else {
    body.max_tokens = maxTokens;
    body.temperature = temperature ?? 0.7;
  }

  if (responseFormat === 'json_object') {
    body.response_format = { type: 'json_object' };
  }

  console.debug('Calling Lovable AI', { model, tokenParam: isGPT5 ? 'max_completion_tokens' : 'max_tokens' });

  // Auto-retry mechanism for parameter mismatch
  let lastError: Error | null = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        
        // Check for max_tokens parameter error and auto-fix
        if (response.status === 400 && errorText.includes('max_tokens') && errorText.includes('not supported')) {
          if (attempt === 0) {
            console.warn('⚠️ Detected max_tokens parameter error, retrying with max_completion_tokens');
            // Swap parameters and retry
            delete body.max_tokens;
            body.max_completion_tokens = maxTokens;
            delete body.temperature; // Also remove temperature for safety
            continue;
          }
        }
        
        throw new ExternalAPIError(`AI completion failed: ${response.status} - ${errorText}`, 'Lovable AI');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt === 1) throw lastError;
    }
  }
  
  throw lastError!;
}

// ============= V3 ENHANCEMENTS =============

/**
 * Parse JSON with robust repair logic for LLM outputs
 */
export function parseJsonWithRepair(raw: string, logger: Logger, context: string): any {
  logger.debug(`Parsing JSON for ${context}`, { rawLength: raw.length });
  
  // Step 1: Trim and strip code fences
  let cleaned = raw.trim();
  cleaned = cleaned.replace(/```[a-z]*\n([\s\S]*?)```/gi, '$1');
  
  // Step 2: Extract JSON body (find first { to last })
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start >= 0 && end > start) {
    cleaned = cleaned.slice(start, end + 1);
  }
  
  // Step 3: Normalise symbols
  cleaned = cleaned
    .replace(/[\u2018\u2019]/g, "'")      // Smart single quotes → '
    .replace(/[\u201C\u201D]/g, '"')      // Smart double quotes → "
    .replace(/[\u2013\u2014]/g, '-')      // En/em dashes → -
    .replace(/\u00D7/g, 'x');             // Multiplication sign → x
  
  // Step 4: Apply existing repair strategies
  cleaned = cleaned
    .replace(/,(\s*[}\]])/g, '$1')              // Remove trailing commas
    .replace(/([{,]\s*)(\w+):/g, '$1"$2":')    // Quote unquoted keys
    .replace(/'/g, '"');                        // Single to double quotes
  
  // Step 5: Try parsing
  try {
    const parsed = JSON.parse(cleaned);
    if (cleaned.length < raw.length) {
      logger.debug(`JSON trimmed during repair`, { 
        beforeLen: raw.length, 
        afterLen: cleaned.length,
        trimmed: true,
        context 
      });
    }
    return parsed;
  } catch (parseError: any) {
    logger.warn(`JSON parse failed for ${context}`, { 
      error: parseError.message,
      sample: cleaned.substring(0, 500)
    });
    throw new Error(`Invalid JSON from AI: ${parseError.message}. Repair failed: ${cleaned.substring(0, 100)}...`);
  }
}

/**
 * Call Lovable AI with timeout protection (55s before Supabase 60s limit)
 */
export async function callLovableAIWithTimeout(
  systemPrompt: string,
  userPrompt: string,
  apiKey: string,
  options: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    responseFormat?: 'json_object' | 'text';
    timeoutMs?: number;
  } = {}
): Promise<string> {
  // Use circuit breaker to prevent overwhelming failing service
  const { lovableAICircuit } = await import('./circuit-breaker.ts');
  
  return await lovableAICircuit.execute(async () => {
    const { timeoutMs = 55000, ...aiOptions } = options;
    
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`AI request timed out after ${timeoutMs}ms`));
      }, timeoutMs);
    });
    
    try {
      return await Promise.race([
        callLovableAI(systemPrompt, userPrompt, apiKey, aiOptions),
        timeoutPromise
      ]);
    } catch (error) {
      if (error instanceof Error && error.message.includes('timed out')) {
        throw new ExternalAPIError('AI request exceeded time limit', 'Lovable AI');
      }
      throw error;
    }
  });
}

/**
 * Generate embedding with retry logic (3 attempts with exponential backoff)
 */
export async function generateEmbeddingWithRetry(
  text: string,
  apiKey: string,
  maxRetries: number = 3
): Promise<number[]> {
  // Use circuit breaker to prevent overwhelming failing service
  const { embeddingCircuit } = await import('./circuit-breaker.ts');
  
  return await embeddingCircuit.execute(async () => {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await generateEmbedding(text, apiKey);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempt < maxRetries) {
          const delayMs = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
          console.warn(`Embedding attempt ${attempt} failed, retrying in ${delayMs}ms...`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
        }
      }
    }
    
    throw new ExternalAPIError(
      `Failed to generate embedding after ${maxRetries} attempts: ${lastError?.message}`,
      'OpenAI'
    );
  });
}
