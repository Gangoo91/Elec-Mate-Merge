import { FunctionsHttpError } from '@supabase/supabase-js';

/**
 * Read the JSON body an edge function returned with a non-2xx status.
 *
 * ⚠️ This exists because of a trap that silently breaks error handling.
 *
 * `supabase.functions.invoke` throws on any non-2xx response
 * (`FunctionsClient`: `if (!response.ok) throw new FunctionsHttpError(response)`),
 * so the call resolves to `{ data: null, error: FunctionsHttpError }`. Anything
 * the function put in its body — a sentinel, a message written for the user —
 * is inside `error.context`, NOT in `data`.
 *
 * So the natural-looking check is dead code:
 *
 * ```ts
 * const res = await supabase.functions.invoke('fn');
 * if (res.data?.error === 'some_sentinel') { … }   // never true on a 4xx
 * ```
 *
 * It fails quietly: the branch never runs, the caller falls through to its
 * generic "something went wrong", and the specific message the function went to
 * the trouble of writing is never seen. Two live examples were found this way —
 * an electrician with no Stripe account was told "Couldn't create the payment
 * link" instead of "Connect Stripe first", and a user with no billing account
 * got a generic failure instead of "No billing account found."
 *
 * A function that returns its sentinel with status 200 is unaffected
 * (`generate-portfolio-statement` does this, and its caller works) — but 200 for
 * an error is its own compromise, so prefer the right status and this helper.
 *
 * Returns `null` when the error is not an HTTP error or the body is not JSON.
 */
export async function readEdgeFunctionError<
  T extends { error?: string; message?: string; code?: string } = {
    error?: string;
    message?: string;
    code?: string;
  },
>(error: unknown): Promise<T | null> {
  if (!(error instanceof FunctionsHttpError)) return null;
  try {
    return (await error.context.json()) as T;
  } catch {
    return null;
  }
}
