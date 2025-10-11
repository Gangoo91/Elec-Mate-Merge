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
  
  if (error instanceof ValidationError) {
    statusCode = 400;
    message = error.message;
  } else if (error instanceof ExternalAPIError) {
    statusCode = 502;
    message = `${error.service} error: ${error.message}`;
  } else if (error instanceof Error) {
    message = error.message;
  }
  
  console.error('Error handled:', { statusCode, message });
  
  return new Response(
    JSON.stringify({ error: message }),
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
      model: 'text-embedding-3-small',
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
    temperature = 0.7,
    maxTokens = 2000,
    responseFormat = 'text'
  } = options;

  const body: any = {
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    max_tokens: maxTokens,
    temperature
  };

  if (responseFormat === 'json_object') {
    body.response_format = { type: 'json_object' };
  }

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
    throw new ExternalAPIError(`AI completion failed: ${response.status} - ${errorText}`, 'Lovable AI');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// ============= V3 ENHANCEMENTS =============

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
}

/**
 * Generate embedding with retry logic (3 attempts with exponential backoff)
 */
export async function generateEmbeddingWithRetry(
  text: string,
  apiKey: string,
  maxRetries: number = 3
): Promise<number[]> {
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
}
