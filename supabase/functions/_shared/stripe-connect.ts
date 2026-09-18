/**
 * Shared helpers for Stripe Connect accounts.
 *
 * One definition, because the same question gets asked from more than one
 * function and the answer decides whether we clear a user's payment account.
 */

/**
 * Does this Stripe error mean the connected account is simply gone?
 *
 * Covers the three ways an account we hold an id for stops being reachable:
 * the user revoked our application's access from their Stripe dashboard (a
 * permission error, HTTP 403), the account was deleted (`resource_missing`), or
 * Stripe has disabled it for us (`account_invalid`).
 *
 * ⚠️ Everything else must keep throwing. The response to a `true` here is to
 * CLEAR the account from the user's profile, so a network blip or a Stripe
 * outage must never be mistaken for a disconnection — that would cut off an
 * electrician's card payments over a transient error.
 *
 * Both shapes are checked deliberately. The stripe-node SDK raises
 * `StripePermissionError`, but the API's own payload for the same condition
 * carries `type: "api_error"` with `code: "account_invalid"` — so matching on
 * the SDK type alone would miss it, which is exactly how this went unhandled
 * (Sentry JAVASCRIPT-REACT-H3).
 */
export function isAccountUnreachable(error: unknown): boolean {
  const err = error as { type?: string; code?: string; statusCode?: number } | null;
  if (!err) return false;
  return (
    err.type === 'StripePermissionError' ||
    err.code === 'account_invalid' ||
    err.code === 'resource_missing' ||
    err.statusCode === 403
  );
}
