/**
 * Tracked Edge Function Invoker
 *
 * Wraps supabase.functions.invoke with automatic Sentry error tracking.
 * Use this instead of supabase.functions.invoke for automatic error monitoring.
 *
 * Usage:
 *   import { trackedInvoke } from '@/utils/trackedInvoke';
 *   const { data, error } = await trackedInvoke('function-name', { body: { ... } });
 */

import { supabase } from '@/integrations/supabase/client';
import { captureEdgeFunctionError, addBreadcrumb } from '@/lib/sentry';

type InvokeOptions = {
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
};

type InvokeResult<T = unknown> = {
  data: T | null;
  error: Error | null;
};

/**
 * Invoke an edge function with automatic Sentry error tracking
 */
export async function trackedInvoke<T = unknown>(
  functionName: string,
  options?: InvokeOptions
): Promise<InvokeResult<T>> {
  addBreadcrumb(`Edge function: ${functionName}`, 'edge_function', {
    hasBody: !!options?.body,
  });

  try {
    const { data, error } = await supabase.functions.invoke(functionName, options);

    if (error) {
      captureEdgeFunctionError(
        new Error(`${functionName} failed: ${error.message}`),
        functionName,
        {
          errorMessage: error.message,
          hasBody: !!options?.body,
        }
      );
      return { data: null, error };
    }

    return { data: data as T, error: null };
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    captureEdgeFunctionError(error, functionName, {
      errorType: 'exception',
      hasBody: !!options?.body,
    });
    return { data: null, error };
  }
}

/**
 * Critical edge functions that should trigger high-priority alerts
 */
const CRITICAL_FUNCTIONS = [
  'create-checkout',
  'check-subscription',
  'stripe-webhook',
  'send-welcome-email',
  'send-password-reset',
  'generate-pdf-monkey',
];

/**
 * Invoke a critical edge function with fatal-level error tracking
 */
export async function trackedInvokeCritical<T = unknown>(
  functionName: string,
  options?: InvokeOptions
): Promise<InvokeResult<T>> {
  const isCritical = CRITICAL_FUNCTIONS.includes(functionName);

  addBreadcrumb(`Critical edge function: ${functionName}`, 'edge_function', {
    critical: isCritical,
    hasBody: !!options?.body,
  });

  try {
    const { data, error } = await supabase.functions.invoke(functionName, options);

    if (error) {
      // Use the payment error tracker for critical functions (triggers alerts)
      const { capturePaymentError } = await import('@/lib/sentry');
      capturePaymentError(
        new Error(`Critical function ${functionName} failed: ${error.message}`),
        {
          functionName,
          errorMessage: error.message,
          critical: true,
        }
      );
      return { data: null, error };
    }

    return { data: data as T, error: null };
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    const { capturePaymentError } = await import('@/lib/sentry');
    capturePaymentError(error, {
      functionName,
      errorType: 'exception',
      critical: true,
    });
    return { data: null, error };
  }
}
