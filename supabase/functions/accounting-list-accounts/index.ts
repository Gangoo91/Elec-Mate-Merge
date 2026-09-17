/**
 * Accounting List Accounts
 * ────────────────────────────────────────────────────────────────────────
 * The revenue accounts in the connected Xero organisation, so an electrician
 * can pick where their invoices post instead of typing a code.
 *
 * ELE-1744. Invoice sync hardcoded Xero's default UK sales code, '200'. That
 * works for a stock chart of accounts and is rejected outright by any org that
 * customised theirs — Patrick at Elctric Ltd uses 001 and got "Account code
 * '200' is not a valid code for this document" with nowhere to change it.
 *
 * The first fix was a box to type a code into. This exists because that is
 * still homework: it asks someone who wires houses to go and look up a ledger
 * code. Their chart of accounts is one call away, so the app reads it and
 * offers the accounts by name.
 *
 * Read-only. It lists accounts and writes nothing — the choice is saved from
 * the client against the user's own token row, which RLS already scopes.
 */

import { serve } from '../_shared/deps.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';
import { decryptToken } from '../_shared/encryption.ts';
import { captureException } from '../_shared/sentry.ts';
import { fetchXeroRevenueAccounts } from '../_shared/xero-accounts.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new ValidationError('Authorization header required');

    const supabaseAuth = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const {
      data: { user },
      error: authError,
    } = await supabaseAuth.auth.getUser();
    if (authError || !user) throw new ValidationError('Authentication required');

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    const { data: token } = await supabase
      .from('accounting_oauth_tokens')
      .select('encrypted_access_token, tenant_id, account_settings')
      .eq('user_id', user.id)
      .eq('provider', 'xero')
      .maybeSingle();

    if (!token?.encrypted_access_token || !token.tenant_id) {
      throw new ValidationError('No Xero connection found. Connect Xero first.');
    }

    const accessToken = await decryptToken(token.encrypted_access_token);

    /*
     * Shared with the OAuth callback and the invoice sync — one definition of
     * what counts as a usable revenue account. ARCHIVED accounts are excluded
     * there, because Xero rejects a posting to one exactly as it rejects a
     * code that does not exist, and offering one would reproduce the original
     * bug through a friendlier route.
     */
    let accounts;
    try {
      accounts = await fetchXeroRevenueAccounts(accessToken, token.tenant_id);
    } catch (lookupError) {
      console.warn('[ELE-1744] Xero Accounts failed:', lookupError);
      const expired = /\b401\b/.test(String(lookupError));
      // An expired token is the one cause the user can actually act on, so it
      // gets its own wording rather than a generic try-again.
      throw new ValidationError(
        expired
          ? 'Your Xero connection has expired. Disconnect and reconnect Xero, then try again.'
          : 'Could not read your Xero chart of accounts. Please try again shortly.'
      );
    }

    const selected =
      (token.account_settings as { sales_account_code?: string } | null)?.sales_account_code ??
      null;

    return new Response(JSON.stringify({ accounts, selected }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    await captureException(error, {
      functionName: 'accounting-list-accounts',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return handleError(error);
  }
});
