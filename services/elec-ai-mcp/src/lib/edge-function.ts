/**
 * Helper to call Supabase edge functions with user authentication.
 * All edge function calls pass the user JWT for RLS scoping.
 *
 * Security features:
 *   - Allowlist enforcement (SECURITY.md §14 — blocks admin-* functions)
 *   - 30-second timeout to prevent hanging requests
 *   - Structured error responses
 */

import { config } from '../config.js';
import { validateEdgeFunctionAccess } from '../middleware/edge-function-guard.js';

/** Timeout for edge function calls (30 seconds) */
const EDGE_FUNCTION_TIMEOUT_MS = 30_000;

export interface EdgeFunctionResponse<T = unknown> {
  data: T | null;
  error: string | null;
  status: number;
}

/**
 * Call a Supabase edge function with the user's JWT.
 * Validates against the allowlist before calling.
 */
export async function callEdgeFunction<T = unknown>(
  functionName: string,
  userJwt: string,
  body?: Record<string, unknown>,
  options?: { timeoutMs?: number }
): Promise<EdgeFunctionResponse<T>> {
  // Block access to admin and unlisted functions (SECURITY.md §14)
  validateEdgeFunctionAccess(functionName);

  const timeoutMs = options?.timeoutMs || EDGE_FUNCTION_TIMEOUT_MS;
  const url = `${config.supabaseUrl}/functions/v1/${functionName}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userJwt}`,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const contentType = response.headers.get('content-type') || '';

    if (!response.ok) {
      const errorText = contentType.includes('application/json')
        ? JSON.stringify(await response.json())
        : await response.text();
      return {
        data: null,
        error: `Edge function ${functionName} returned ${response.status}: ${errorText}`,
        status: response.status,
      };
    }

    const data = contentType.includes('application/json')
      ? ((await response.json()) as T)
      : ((await response.text()) as unknown as T);

    return { data, error: null, status: response.status };
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      return {
        data: null,
        error: `Edge function ${functionName} timed out after ${timeoutMs / 1000}s`,
        status: 0,
      };
    }
    const message = err instanceof Error ? err.message : String(err);
    return {
      data: null,
      error: `Failed to call edge function ${functionName}: ${message}`,
      status: 0,
    };
  } finally {
    clearTimeout(timeout);
  }
}
