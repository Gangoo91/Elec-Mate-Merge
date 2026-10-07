/**
 * Accounting OAuth Initialization
 * Starts the OAuth flow for Xero, Sage, QuickBooks, or FreshBooks
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';
import { captureException } from '../_shared/sentry.ts';

// Provider credentials from environment
const XERO_CLIENT_ID = Deno.env.get('XERO_CLIENT_ID');
const QUICKBOOKS_CLIENT_ID = Deno.env.get('QUICKBOOKS_CLIENT_ID');
const SAGE_CLIENT_ID = Deno.env.get('SAGE_CLIENT_ID');
const FRESHBOOKS_CLIENT_ID = Deno.env.get('FRESHBOOKS_CLIENT_ID');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

type AccountingProvider = 'xero' | 'sage' | 'quickbooks' | 'freshbooks';

const VALID_PROVIDERS: AccountingProvider[] = ['xero', 'sage', 'quickbooks', 'freshbooks'];

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    /*
     * ELE-1825: `firmId` lets an admin manager connect (or reconnect) the
     * FIRM's package from the Employer Hub. The tokens always belong to the
     * firm owner (firm id = owner's profile id), so the Electrical Hub and the
     * Employer Hub share one connection. `returnTo` picks where the callback
     * lands: the Electrical Hub's settings (default) or Finance > Accounting.
     */
    const { provider, firmId, returnTo } = await req.json();

    if (!provider || !VALID_PROVIDERS.includes(provider)) {
      throw new ValidationError(`Provider must be one of: ${VALID_PROVIDERS.join(', ')}`);
    }

    // Generate random state for CSRF protection
    const state = crypto.randomUUID();
    const redirectUri = `${SUPABASE_URL}/functions/v1/accounting-oauth-callback`;

    let authUrl: string;

    switch (provider) {
      case 'xero': {
        if (!XERO_CLIENT_ID) {
          throw new ValidationError('Xero integration not configured');
        }

        /*
         * `accounting.settings.read` is what makes ELE-1744 and ELE-1703 work
         * at all, and it was missing.
         *
         * Checked against Xero's own OpenAPI spec (XeroAPI/Xero-OpenAPI,
         * xero_accounting.yaml). Every endpoint we touch and the scope it
         * requires:
         *
         *   GET /Invoices  -> accounting.transactions[.read]   requested ✓
         *   GET /Contacts  -> accounting.contacts[.read]       requested ✓
         *   GET /Accounts  -> accounting.settings[.read]       MISSING ✗
         *   GET /TaxRates  -> accounting.settings[.read]       MISSING ✗
         *
         * The first two are the ones that demonstrably work in production,
         * which is what makes the reading trustworthy rather than a guess.
         * The second two are the chart-of-accounts detection (ELE-1744) and
         * the reverse-charge tax type (ELE-1703) — both of which swallow their
         * own failures and fall back to a default, so neither has ever been
         * able to announce that it could not read anything.
         *
         * `.read` and not the full `accounting.settings`: we only ever GET
         * from both endpoints, and the write scope would let us create tax
         * rates and accounts in a customer's books.
         *
         * Existing connections are untouched — a token keeps the scopes it was
         * granted, so nobody is logged out and nothing changes for them until
         * they next reconnect. Only new and reconnecting users pick this up.
         */
        const params = new URLSearchParams({
          client_id: XERO_CLIENT_ID,
          redirect_uri: redirectUri,
          response_type: 'code',
          scope:
            'openid profile email accounting.transactions accounting.contacts ' +
            'accounting.settings.read offline_access',
          state,
        });

        authUrl = `https://login.xero.com/identity/connect/authorize?${params}`;
        break;
      }

      case 'quickbooks': {
        if (!QUICKBOOKS_CLIENT_ID) {
          throw new ValidationError('QuickBooks integration not configured');
        }

        const params = new URLSearchParams({
          client_id: QUICKBOOKS_CLIENT_ID,
          redirect_uri: redirectUri,
          response_type: 'code',
          scope: 'com.intuit.quickbooks.accounting',
          state,
        });

        authUrl = `https://appcenter.intuit.com/connect/oauth2?${params}`;
        break;
      }

      case 'sage': {
        if (!SAGE_CLIENT_ID) {
          throw new ValidationError('Sage integration not configured');
        }

        // Sage Accounting OAuth - use URLSearchParams for proper encoding
        const params = new URLSearchParams({
          response_type: 'code',
          client_id: SAGE_CLIENT_ID,
          redirect_uri: redirectUri,
          scope: 'full_access',
          state,
        });

        // Sage Accounting OAuth URL - without filter parameter
        authUrl = `https://www.sageone.com/oauth2/auth/central?${params}`;

        console.log('Sage OAuth URL:', authUrl);
        break;
      }

      case 'freshbooks': {
        if (!FRESHBOOKS_CLIENT_ID) {
          throw new ValidationError('FreshBooks integration not configured');
        }

        const params = new URLSearchParams({
          client_id: FRESHBOOKS_CLIENT_ID,
          redirect_uri: redirectUri,
          response_type: 'code',
          scope: 'user:profile:read user:invoices:read user:invoices:write',
          state,
        });

        authUrl = `https://auth.freshbooks.com/oauth/authorize?${params}`;
        break;
      }

      default:
        throw new ValidationError(`Provider "${provider}" not supported`);
    }

    // Store state in database with 10-minute expiry
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new ValidationError('Authorization header required');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new ValidationError('Authentication required');
    }

    const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (firmId !== undefined && firmId !== null && (typeof firmId !== 'string' || !uuidRe.test(firmId))) {
      throw new ValidationError('firmId must be a UUID');
    }
    const destination = returnTo === 'employer' ? 'employer' : 'settings';
    const forFirm = typeof firmId === 'string' && firmId !== user.id;

    let insertError: unknown = null;
    if (forFirm) {
      // Owner or an ADMIN manager of that firm only. can_see_firm_money is the
      // same test the database uses for every £ figure, run as the caller.
      const { data: allowed, error: roleError } = await supabase.rpc('can_see_firm_money', {
        p_firm: firmId,
      });
      if (roleError || allowed !== true) {
        return new Response(
          JSON.stringify({ error: 'Only the owner or an admin can connect the firm\'s accounts.' }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      // The state row is the firm owner's (RLS only lets a user write their
      // own), so the service role writes it, recording who started it.
      const admin = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
      ({ error: insertError } = await admin.from('accounting_oauth_states').insert({
        state,
        user_id: firmId,
        initiated_by: user.id,
        return_to: destination,
        provider,
        expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      }));
    } else {
      // Store state temporarily in accounting_oauth_states table
      ({ error: insertError } = await supabase.from('accounting_oauth_states').insert({
        state,
        user_id: user.id,
        return_to: destination,
        provider,
        expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      }));
    }

    if (insertError) {
      console.error('Failed to store OAuth state:', insertError);
      throw new Error('Failed to initialize OAuth flow');
    }

    console.log(`Accounting OAuth flow initiated for ${provider}`, {
      user_id: user.id,
      firm: forFirm ? firmId : undefined,
    });

    return new Response(JSON.stringify({ authUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    await captureException(error, {
      functionName: 'accounting-oauth-init',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return handleError(error);
  }
});
