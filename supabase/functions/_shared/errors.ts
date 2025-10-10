/**
 * Structured Error Handling Framework
 * Provides typed errors and consistent error responses across all edge functions
 */

import { corsHeaders } from './cors.ts';

/**
 * Base Edge Function Error
 */
export class EdgeFunctionError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = 'EdgeFunctionError';
  }
}

/**
 * Validation Error (400)
 */
export class ValidationError extends EdgeFunctionError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', 400, details);
  }
}

/**
 * External API Error (502)
 */
export class ExternalAPIError extends EdgeFunctionError {
  constructor(service: string, details?: any) {
    super(`${service} API failed`, 'EXTERNAL_API_ERROR', 502, details);
  }
}

/**
 * Authentication Error (401)
 */
export class AuthenticationError extends EdgeFunctionError {
  constructor(message: string = 'Authentication required', details?: any) {
    super(message, 'AUTHENTICATION_ERROR', 401, details);
  }
}

/**
 * Rate Limit Error (429)
 */
export class RateLimitError extends EdgeFunctionError {
  constructor(message: string = 'Rate limit exceeded', details?: any) {
    super(message, 'RATE_LIMIT_ERROR', 429, details);
  }
}

/**
 * Centralized Error Handler
 * Returns consistent JSON error responses with proper status codes
 */
export function handleError(error: unknown): Response {
  // Structured edge function errors
  if (error instanceof EdgeFunctionError) {
    console.error(`[${error.code}] ${error.message}`, error.details || '');
    return new Response(
      JSON.stringify({
        error: error.message,
        code: error.code,
        details: error.details
      }),
      {
        status: error.statusCode,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
  
  // Standard JavaScript errors
  if (error instanceof Error) {
    console.error('[RUNTIME_ERROR]', error.message, error.stack || '');
    return new Response(
      JSON.stringify({ 
        error: error.message,
        code: 'RUNTIME_ERROR'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
  
  // Unknown error type
  console.error('[UNKNOWN_ERROR]', error);
  return new Response(
    JSON.stringify({ 
      error: 'Internal server error',
      code: 'UNKNOWN_ERROR'
    }),
    { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    }
  );
}

/**
 * Safe Error Message Extraction
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Unknown error occurred';
}
