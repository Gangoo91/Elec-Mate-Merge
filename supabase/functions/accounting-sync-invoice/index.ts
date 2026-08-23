/**
 * Accounting Invoice Sync
 * Syncs invoices to connected accounting software (Xero, QuickBooks, Sage, FreshBooks)
 */

import { corsHeaders } from '../_shared/cors.ts';
import { recordXeroPayment } from '../_shared/xero-invoice-status.ts';
import { recordQuickBooksPayment } from '../_shared/quickbooks-invoice-status.ts';
import { captureException } from '../_shared/sentry.ts';
import { createClient } from '../_shared/deps.ts';
import { handleError, ValidationError, ExternalAPIError } from '../_shared/errors.ts';
import { decryptToken, encryptToken } from '../_shared/encryption.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

// A sync we deliberately refuse with an actionable reason (ELE-1343) — the
// handler turns this into a 409 whose message reaches the user verbatim.
class SyncBlockedError extends Error {
  constructor(
    public title: string,
    public detail: string
  ) {
    super(`${title}: ${detail}`);
  }
}

// Provider credentials for token refresh
const XERO_CLIENT_ID = Deno.env.get('XERO_CLIENT_ID');
const XERO_CLIENT_SECRET = Deno.env.get('XERO_CLIENT_SECRET');
const QUICKBOOKS_CLIENT_ID = Deno.env.get('QUICKBOOKS_CLIENT_ID');
const QUICKBOOKS_CLIENT_SECRET = Deno.env.get('QUICKBOOKS_CLIENT_SECRET');
const SAGE_CLIENT_ID = Deno.env.get('SAGE_CLIENT_ID');
const SAGE_CLIENT_SECRET = Deno.env.get('SAGE_CLIENT_SECRET');
const FRESHBOOKS_CLIENT_ID = Deno.env.get('FRESHBOOKS_CLIENT_ID');
const FRESHBOOKS_CLIENT_SECRET = Deno.env.get('FRESHBOOKS_CLIENT_SECRET');

// QuickBooks environment - defaults to sandbox for safety
const QUICKBOOKS_ENVIRONMENT = Deno.env.get('QUICKBOOKS_ENVIRONMENT') || 'sandbox';
const QUICKBOOKS_BASE_URL =
  QUICKBOOKS_ENVIRONMENT === 'production'
    ? 'https://quickbooks.api.intuit.com'
    : 'https://sandbox-quickbooks.api.intuit.com';

type AccountingProvider = 'xero' | 'sage' | 'quickbooks' | 'freshbooks';

interface TokenData {
  accessToken: string;
  refreshToken?: string;
  tenantId: string;
}

// Helper to return errors as 200 so frontend can read them
function errorResponse(error: string, detail?: string, httpStatus = 400) {
  return new Response(JSON.stringify({ success: false, error, detail, httpStatus }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req: Request) => {
  // Wrap absolutely everything in try-catch to prevent 502
  try {
    console.log('=== ACCOUNTING SYNC START ===');
    console.log('QuickBooks Environment:', QUICKBOOKS_ENVIRONMENT);
    console.log('QuickBooks Base URL:', QUICKBOOKS_BASE_URL);

    // Diagnostic: Check all required env vars
    const envCheck = {
      SUPABASE_URL: !!SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: !!SUPABASE_SERVICE_ROLE_KEY,
      ENCRYPTION_KEY: !!Deno.env.get('ENCRYPTION_KEY'),
      ENCRYPTION_KEY_LENGTH: Deno.env.get('ENCRYPTION_KEY')?.length || 0,
      QUICKBOOKS_CLIENT_ID: !!QUICKBOOKS_CLIENT_ID,
      QUICKBOOKS_CLIENT_SECRET: !!QUICKBOOKS_CLIENT_SECRET,
      QUICKBOOKS_ENVIRONMENT: QUICKBOOKS_ENVIRONMENT,
    };
    console.log('=== ENV CHECK ===', JSON.stringify(envCheck));

    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Authenticate user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return errorResponse('Authorization header required', undefined, 401);
    }

    let user: any;
    try {
      const supabaseAuth = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_ANON_KEY')!,
        { global: { headers: { Authorization: authHeader } } }
      );
      const { data, error: authError } = await supabaseAuth.auth.getUser();
      if (authError || !data.user) {
        return errorResponse('Authentication required', authError?.message, 401);
      }
      user = data.user;
    } catch (authErr) {
      return errorResponse('Auth error', String(authErr), 500);
    }

    // Parse request body
    let invoiceId: string;
    let provider: string;
    let recordPayment = false;
    try {
      const body = await req.json();
      invoiceId = body.invoiceId;
      provider = body.provider;
      recordPayment = body.recordPayment === true;
    } catch (parseErr) {
      return errorResponse('Invalid JSON body', String(parseErr), 400);
    }

    if (!invoiceId || !provider) {
      return errorResponse('Invoice ID and provider are required', undefined, 400);
    }

    // Validate UUID format - catch "undefined" strings and invalid UUIDs
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(invoiceId)) {
      return errorResponse(
        'Invalid invoice ID format',
        `Received: "${invoiceId}" - expected UUID format`,
        400
      );
    }

    console.log(`Syncing invoice ${invoiceId} to ${provider} for user ${user.id}`);

    // Use service role for database operations
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Get the invoice
    const { data: invoice, error: invoiceError } = await supabase
      .from('quotes')
      .select('*')
      .eq('id', invoiceId)
      .eq('user_id', user.id)
      .eq('invoice_raised', true)
      .single();

    if (invoiceError || !invoice) {
      return errorResponse('Invoice not found or access denied', invoiceError?.message, 404);
    }

    // Get encrypted tokens
    const { data: tokenData, error: tokenError } = await supabase
      .from('accounting_oauth_tokens')
      .select('*')
      .eq('user_id', user.id)
      .eq('provider', provider)
      .single();

    if (tokenError || !tokenData) {
      return errorResponse(
        `No ${provider} connection found. Please connect your account first.`,
        tokenError?.message,
        400
      );
    }

    // Decrypt tokens - this is likely where it fails
    let accessToken: string;
    let refreshToken: string | undefined;

    console.log('=== STEP: Token decryption ===');
    console.log('Token data exists:', !!tokenData);
    console.log('Encrypted access token length:', tokenData.encrypted_access_token?.length || 0);
    console.log('Has encrypted refresh token:', !!tokenData.encrypted_refresh_token);

    try {
      // Check if ENCRYPTION_KEY is set
      const encKey = Deno.env.get('ENCRYPTION_KEY');
      console.log('ENCRYPTION_KEY exists:', !!encKey);
      console.log('ENCRYPTION_KEY length:', encKey?.length || 0);

      if (!encKey) {
        console.error('ERROR: ENCRYPTION_KEY not configured');
        return errorResponse('ENCRYPTION_KEY not configured on server', undefined, 500);
      }
      if (encKey.length !== 64) {
        console.error('ERROR: ENCRYPTION_KEY wrong length:', encKey.length);
        return errorResponse(
          `ENCRYPTION_KEY has wrong length: ${encKey.length} (expected 64)`,
          undefined,
          500
        );
      }

      console.log('Attempting to decrypt access token...');
      accessToken = await decryptToken(tokenData.encrypted_access_token);
      console.log('Access token decrypted successfully, length:', accessToken.length);

      if (tokenData.encrypted_refresh_token) {
        console.log('Attempting to decrypt refresh token...');
        refreshToken = await decryptToken(tokenData.encrypted_refresh_token);
        console.log('Refresh token decrypted successfully');
      }
    } catch (decryptError) {
      console.error('Token decryption FAILED:', decryptError);
      return errorResponse(
        'Token decryption failed',
        `${String(decryptError)}. Session may be expired. Please reconnect your accounting software.`,
        500
      );
    }

    const tenantId = tokenData.tenant_id;
    console.log('=== STEP: Tenant ID check ===');
    console.log('Tenant ID:', tenantId);

    if (!tenantId) {
      console.error('ERROR: No tenant ID found');
      return errorResponse('No tenant ID (realmId) found for QuickBooks', undefined, 400);
    }

    // Check if token is expired and needs refresh
    console.log('=== STEP: Token expiry check ===');
    console.log('Token expires at:', tokenData.token_expires_at);
    console.log('Current time:', new Date().toISOString());
    const isExpired = new Date(tokenData.token_expires_at) < new Date();
    console.log('Token is expired:', isExpired);
    if (isExpired) {
      if (!refreshToken) {
        return errorResponse(
          'Token expired and no refresh token available. Please reconnect.',
          undefined,
          401
        );
      }

      try {
        console.log(`Token expired for ${provider}, refreshing...`);
        const refreshed = await refreshAccessToken(provider as AccountingProvider, refreshToken);
        accessToken = refreshed.accessToken;

        // Update stored tokens
        const encryptedAccessToken = await encryptToken(refreshed.accessToken);
        const encryptedRefreshToken = refreshed.refreshToken
          ? await encryptToken(refreshed.refreshToken)
          : tokenData.encrypted_refresh_token;

        await supabase
          .from('accounting_oauth_tokens')
          .update({
            encrypted_access_token: encryptedAccessToken,
            encrypted_refresh_token: encryptedRefreshToken,
            token_expires_at: new Date(Date.now() + refreshed.expiresIn * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user.id)
          .eq('provider', provider);
      } catch (refreshErr) {
        return errorResponse('Token refresh failed', String(refreshErr), 401);
      }
    }

    // ── Record-payment mode (two-way: Elec-Mate "Mark as paid" → provider) ──
    // Settles the invoice's remaining balance in the provider so their books
    // close the invoice too. No invoice re-push happens on this path.
    if (recordPayment) {
      if (!invoice.external_invoice_id || invoice.external_invoice_provider !== provider) {
        return errorResponse(
          'Invoice not synced to this provider yet',
          'Sync the invoice to your accounting software first, then payments can be recorded against it.',
          409
        );
      }
      try {
        const paidAt = (invoice.invoice_paid_at as string | null) ?? null;
        const result =
          provider === 'xero'
            ? await recordXeroPayment(accessToken, tenantId, invoice.external_invoice_id, paidAt)
            : provider === 'quickbooks'
              ? await recordQuickBooksPayment(accessToken, tenantId, invoice.external_invoice_id, paidAt)
              : null;
        if (!result) {
          return errorResponse(
            `Recording payments in ${provider} is not supported yet`,
            'Xero and QuickBooks are supported.',
            501
          );
        }
        console.log(`Payment recorded in ${provider}:`, JSON.stringify(result));
        return new Response(JSON.stringify({ success: true, mode: 'payment', provider, ...result }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (payErr) {
        const msg = payErr instanceof Error ? payErr.message : String(payErr);
        console.error('Record-payment error:', msg);
        return errorResponse(`Failed to record payment in ${provider}`, msg, 502);
      }
    }

    // Prepare invoice data for provider
    const invoiceData = {
      invoiceNumber: invoice.invoice_number,
      date: invoice.invoice_date,
      dueDate: invoice.invoice_due_date,
      client: invoice.client_data as any,
      items: invoice.items as any[],
      subtotal: parseFloat(String(invoice.subtotal)),
      overhead: parseFloat(String(invoice.overhead || 0)),
      profit: parseFloat(String(invoice.profit || 0)),
      vatAmount: parseFloat(String(invoice.vat_amount)),
      total: parseFloat(String(invoice.total)),
      notes: invoice.notes,
      currency: 'GBP',
      isPaid: invoice.invoice_status === 'paid',
      paidAt: invoice.invoice_paid_at,
      // ELE-1318 — CIS domestic reverse charge: VAT is accounted for by the
      // customer, so the invoice carries no VAT but must be coded as DRC in
      // the accounting provider (NOT zero-rated/exempt).
      reverseCharge:
        (invoice.settings as Record<string, unknown> | null)?.reverseCharge === true ||
        (invoice.settings as Record<string, unknown> | null)?.reverseCharge === 'true',
      externalInvoiceId:
        invoice.external_invoice_provider === provider
          ? ((invoice.external_invoice_id as string | null) ?? null)
          : null,
      /*
       * ELE-1521 — the invoice-level discount, carried as its own figure.
       *
       * It was only ever implicit in `total`, so the provider sync had no way
       * to represent it as anything but a reduction smeared across every line.
       * Resolved to a cash amount here: QuickBooks discount lines take an
       * amount, and resolving a percentage once against the subtotal keeps the
       * arithmetic in one place.
       */
      discount: (() => {
        /*
         * DERIVED, never recomputed.
         *
         * The first version re-ran the percentage here — `subtotal * value/100`
         * — and was wrong, because quote-calculations.ts applies a percentage
         * to `subtotal + overhead + profit` and caps a fixed discount at that
         * same base. Any document carrying overhead or profit would have had a
         * discount line that disagreed with its own total.
         *
         * These four figures are stored and authoritative, and the identity
         * holds by construction:
         *
         *   netAfterDiscount = (subtotal + overhead + profit) - discount
         *   total            = netAfterDiscount + vat
         *
         * so discount = (subtotal + overhead + profit) - (total - vat).
         *
         * That cannot drift from the invoice the customer was sent, whatever
         * the discount type was, and it needs no knowledge of how the figure
         * was arrived at.
         */
        const st = invoice.settings as Record<string, unknown> | null;
        if (!st || (st.discountEnabled !== true && st.discountEnabled !== 'true')) return null;

        const base =
          (parseFloat(String(invoice.subtotal)) || 0) +
          (parseFloat(String(invoice.overhead || 0)) || 0) +
          (parseFloat(String(invoice.profit || 0)) || 0);
        const netTarget =
          (parseFloat(String(invoice.total)) || 0) -
          (parseFloat(String(invoice.vat_amount)) || 0);
        const amount = Math.round((base - netTarget) * 100) / 100;

        // A penny either way is rounding, not a discount.
        if (!Number.isFinite(amount) || amount <= 0.01) return null;

        return {
          amount,
          label:
            typeof st.discountLabel === 'string' && st.discountLabel.trim()
              ? String(st.discountLabel).trim()
              : 'Discount',
        };
      })(),
      /*
       * ELE-1571 — the third-party grant.
       *
       * Read straight from settings rather than derived from the stored
       * figures the way `discount` is, because a grant leaves NO trace in
       * subtotal/vat/total: it comes off the gross after VAT, so the identity
       * the discount derivation relies on cannot see it.
       *
       * Capped at the invoice total. `computeQuoteTotals` caps at
       * `total − cisAmount`, but CIS is not represented in this sync at all,
       * so the total is the correct bound for what is actually being pushed.
       * Anything above it would produce a negative invoice.
       */
      grant: (() => {
        const st = invoice.settings as Record<string, unknown> | null;
        if (!st || (st.grantEnabled !== true && st.grantEnabled !== 'true')) return null;

        const raw = Number(st.grantAmount) || 0;
        const total = parseFloat(String(invoice.total)) || 0;
        const amount = Math.round(Math.min(raw, Math.max(0, total)) * 100) / 100;

        // A penny either way is rounding, not a grant.
        if (!Number.isFinite(amount) || amount <= 0.01) return null;

        return {
          amount,
          label:
            typeof st.grantLabel === 'string' && st.grantLabel.trim()
              ? String(st.grantLabel).trim()
              : 'Grant',
        };
      })(),
    };

    // Sync to provider - WITHOUT retry/timeout wrappers for now to simplify debugging
    let externalInvoiceId: string;
    let externalInvoiceUrl: string | undefined;

    console.log('=== STEP: Provider sync ===');
    console.log('Provider:', provider);
    console.log('Invoice number:', invoiceData.invoiceNumber);
    console.log('Invoice total:', invoiceData.total);
    console.log('Client name:', invoiceData.client?.name);

    try {
      switch (provider as AccountingProvider) {
        case 'xero':
          console.log('Syncing to Xero...');
          const xeroResult = await syncToXero(accessToken, tenantId, invoiceData);
          externalInvoiceId = xeroResult.invoiceId;
          externalInvoiceUrl = xeroResult.invoiceUrl;
          console.log('Xero sync SUCCESS:', xeroResult);
          break;

        case 'quickbooks':
          console.log('Syncing to QuickBooks...');
          console.log('Access token length:', accessToken?.length);
          console.log('Realm ID:', tenantId);
          const qbResult = await syncToQuickBooks(accessToken, tenantId, invoiceData);
          externalInvoiceId = qbResult.invoiceId;
          externalInvoiceUrl = qbResult.invoiceUrl;
          console.log('QuickBooks sync SUCCESS:', qbResult);
          break;

        case 'sage':
          console.log('Syncing to Sage...');
          console.log('Resource Owner ID (X-Site):', tenantId);
          const sageResult = await syncToSage(accessToken, tenantId, invoiceData);
          externalInvoiceId = sageResult.invoiceId;
          console.log('Sage sync SUCCESS:', sageResult);
          break;

        case 'freshbooks':
          const fbResult = await syncToFreshBooks(accessToken, tenantId, invoiceData);
          externalInvoiceId = fbResult.invoiceId;
          break;

        default:
          return errorResponse(`Provider "${provider}" not supported`, undefined, 400);
      }
    } catch (syncError) {
      console.error('Provider sync error:', syncError);
      if (syncError instanceof SyncBlockedError) {
        return errorResponse(syncError.title, syncError.detail, 409);
      }
      const errorMsg = syncError instanceof Error ? syncError.message : String(syncError);

      // Friendly, actionable message for well-known provider faults so the user
      // sees what to do rather than a raw API error. QuickBooks fault 6190
      // ("Invalid Company Status") means the connected company's subscription
      // or trial has lapsed — QB blocks ALL data writes until it's reactivated.
      const providerLabel =
        provider === 'quickbooks'
          ? 'QuickBooks'
          : provider.charAt(0).toUpperCase() + provider.slice(1);
      const lowerErr = errorMsg.toLowerCase();
      if (
        errorMsg.includes('6190') ||
        lowerErr.includes('invalid company status') ||
        (lowerErr.includes('subscription') && lowerErr.includes('ended'))
      ) {
        return errorResponse(
          `Your ${providerLabel} subscription has ended`,
          `${providerLabel} is blocking new data because the subscription or trial on the connected company has lapsed. Reactivate it in ${providerLabel}${
            provider === 'quickbooks' ? ' (Settings ⚙️ → Subscriptions and billing)' : ''
          }, then run the sync again.`,
          402
        );
      }

      // Extract more details from ExternalAPIError
      let detailMsg = errorMsg;
      if (syncError instanceof ExternalAPIError && syncError.details) {
        const details = syncError.details;
        if (details.error) {
          try {
            const parsed =
              typeof details.error === 'string' ? JSON.parse(details.error) : details.error;
            const faultError = parsed?.Fault?.Error?.[0];
            // Xero nests validation messages under Elements[].ValidationErrors
            // (sometimes top-level ValidationErrors) — ELE-1339 follow-up.
            const xeroValidation = ((parsed?.Elements as any[]) || [])
              .flatMap((el: any) => el?.ValidationErrors || [])
              .concat(parsed?.ValidationErrors || [])
              .map((v: any) => v?.Message)
              .filter(Boolean);
            if (faultError) {
              // QuickBooks puts the generic "A business validation error has
              // occurred" in Message and the actual reason in Detail — surface
              // both so the user (and we) can see what actually failed. ELE-1235.
              const parts = [faultError.Message, faultError.Detail].filter(Boolean);
              detailMsg = `${provider} Error: ${parts.join(' — ') || errorMsg}`;
            } else if (xeroValidation.length > 0) {
              detailMsg = `Xero: ${xeroValidation.join(' — ')}`;
              // Xero refuses to modify an invoice once payments or credit
              // notes are applied to it. Tell the user what to do instead of
              // handing them a stack trace.
              if (
                xeroValidation.some((m: string) =>
                  /not of valid status for modification|payment|paid invoice/i.test(m)
                )
              ) {
                return errorResponse(
                  'Xero blocked the update',
                  `Xero refused to update this invoice: ${xeroValidation.join(' — ')}. This usually means payments or credit notes are already recorded against it in Xero. Remove or adjust those in Xero first, then tap Re-sync — or make the change directly in Xero.`,
                  409
                );
              }
            } else if (parsed?.Message) {
              detailMsg = `${providerLabel}: ${parsed.Message}`;
            }
          } catch {
            detailMsg = `${provider} Error: ${details.error}`;
          }
        }
        console.log('Detailed error:', detailMsg);
      }

      // Stack traces stay in the server logs (console.error above) — the
      // client toast only gets the human-readable reason.
      return errorResponse(`Failed to sync to ${provider}`, detailMsg, 500);
    }

    // Update invoice with external reference
    await supabase
      .from('quotes')
      .update({
        external_invoice_id: externalInvoiceId,
        external_invoice_provider: provider,
        external_invoice_url: externalInvoiceUrl,
        external_invoice_synced_at: new Date().toISOString(),
      })
      .eq('id', invoiceId);

    // Update last sync time in company profile
    const { data: profile } = await supabase
      .from('company_profiles')
      .select('accounting_integrations')
      .eq('user_id', user.id)
      .single();

    if (profile?.accounting_integrations) {
      const integrations = profile.accounting_integrations.map((i: any) => {
        if (i.provider === provider) {
          return { ...i, lastSyncAt: new Date().toISOString() };
        }
        return i;
      });

      await supabase
        .from('company_profiles')
        .update({ accounting_integrations: integrations })
        .eq('user_id', user.id);
    }

    console.log(`Invoice ${invoiceId} synced to ${provider} as ${externalInvoiceId}`);

    return new Response(
      JSON.stringify({
        success: true,
        externalInvoiceId,
        externalInvoiceUrl,
        provider,
        message: `Invoice synced to ${provider} successfully`,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    // Catch-all for any unhandled errors - should never reach here
    console.error('Unhandled error in accounting-sync-invoice:', error);
    await captureException(error, {
      functionName: 'accounting-sync-invoice',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    const errorMsg = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    return errorResponse('Unexpected server error', `${errorMsg}\n\nStack: ${errorStack}`, 500);
  }
});

// ============================================
// Token Refresh Functions
// ============================================

interface RefreshResult {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

async function refreshAccessToken(
  provider: AccountingProvider,
  refreshToken: string
): Promise<RefreshResult> {
  switch (provider) {
    case 'xero':
      return refreshXeroToken(refreshToken);
    case 'quickbooks':
      return refreshQuickBooksToken(refreshToken);
    case 'sage':
      return refreshSageToken(refreshToken);
    case 'freshbooks':
      return refreshFreshBooksToken(refreshToken);
    default:
      throw new Error(`Refresh not implemented for ${provider}`);
  }
}

async function refreshXeroToken(refreshToken: string): Promise<RefreshResult> {
  const response = await fetch('https://identity.xero.com/connect/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${XERO_CLIENT_ID}:${XERO_CLIENT_SECRET}`)}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Xero token refresh failed:', error);
    throw new Error('Failed to refresh Xero session');
  }

  const data = await response.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  };
}

async function refreshQuickBooksToken(refreshToken: string): Promise<RefreshResult> {
  const response = await fetch('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${QUICKBOOKS_CLIENT_ID}:${QUICKBOOKS_CLIENT_SECRET}`)}`,
      Accept: 'application/json',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('QuickBooks token refresh failed:', error);
    throw new Error('Failed to refresh QuickBooks session');
  }

  const data = await response.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  };
}

async function refreshSageToken(refreshToken: string): Promise<RefreshResult> {
  const response = await fetch('https://oauth.accounting.sage.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: SAGE_CLIENT_ID!,
      client_secret: SAGE_CLIENT_SECRET!,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Sage token refresh failed:', error);
    throw new Error('Failed to refresh Sage session');
  }

  const data = await response.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  };
}

async function refreshFreshBooksToken(refreshToken: string): Promise<RefreshResult> {
  const response = await fetch('https://api.freshbooks.com/auth/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: FRESHBOOKS_CLIENT_ID,
      client_secret: FRESHBOOKS_CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('FreshBooks token refresh failed:', error);
    throw new Error('Failed to refresh FreshBooks session');
  }

  const data = await response.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  };
}

// ============================================
// Provider Sync Functions
// ============================================

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  client: {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total?: number;
    /**
     * ELE-1575 — the line's own net, and the ONLY figure that agrees with
     * `subtotal`. Per-category markup is absorbed into `totalPrice` and is NOT
     * reflected in `unitPrice`, so the two disagree on any marked-up line.
     * Present on every stored quote row; the interface simply never declared it.
     */
    totalPrice?: number;
  }>;
  subtotal: number;
  overhead: number;
  profit: number;
  /** Invoice-level discount as a cash amount, with the user's own wording. */
  discount?: { amount: number; label: string } | null;
  /**
   * ELE-1571 — third-party grant (OZEV and similar), as a cash amount off the
   * VAT-INCLUSIVE total, with the user's own wording.
   *
   * ⚠️ NOT a discount, and must never be routed through the discount path. A
   * discount reduces the price and VAT is recalculated on the lower figure. A
   * grant is consideration from a third party: the supply is still worth the
   * full amount, VAT stays due on all of it, and only the customer's share
   * falls. Both providers therefore carry this as its own **zero-VAT negative
   * line**, which lands the invoice on what the customer actually owes while
   * leaving the VAT untouched.
   */
  grant?: { amount: number; label: string } | null;
  vatAmount: number;
  total: number;
  notes?: string;
  currency: string;
  isPaid?: boolean;
  paidAt?: string;
  reverseCharge?: boolean;
  // Set when the invoice was already synced to this provider — providers
  // that support it update the existing record instead of creating a
  // duplicate (ELE-1339).
  externalInvoiceId?: string | null;
}

interface SyncResult {
  invoiceId: string;
  invoiceUrl?: string;
}

/**
 * ELE-1575 — the net a line is actually worth.
 *
 * The bug: every provider mapped `Quantity × unitPrice` and the accounting
 * package recomputed the invoice from that. But `computeQuoteTotals` builds
 * `subtotal` from the line's **totalPrice**, which has per-category markup
 * absorbed into it while `unitPrice` stays raw. On any marked-up line the two
 * disagree, and the invoice pushed to the customer's accounts is short.
 *
 * Real case (invoice/001, £1,221.82):
 *   materials  qty 1   unitPrice 716.00  totalPrice 880.68   ← £164.68 of markup
 *   labour     qty 2.5 unitPrice  55.00  totalPrice 137.50
 *   Elec-Mate net  880.68 + 137.50 = 1018.18  → £1,221.82 inc VAT ✓
 *   Pushed net     716.00 + 137.50 =  853.50  → £1,024.20 inc VAT ✗
 * £1,024.20 is exactly what the customer saw in Xero.
 *
 * `totalPrice` wins whenever it is present and sane; quantity × unitPrice is
 * only the fallback for lines that predate it.
 */
function lineBaseNet(item: InvoiceData['items'][number]): number {
  const qty = Number(item.quantity) || 0;
  const unit = Number(item.unitPrice) || 0;
  const stored = Number(item.totalPrice ?? item.total);
  if (Number.isFinite(stored) && stored !== 0) return stored;
  return qty * unit;
}

interface NetLine {
  description: string;
  quantity: number;
  /** Per-unit net, rounded to 2dp for display. */
  unitAmount: number;
  /** The authoritative net for this line. Providers must be given THIS. */
  lineAmount: number;
}

/**
 * Turn invoice items into lines that provably sum to `netTarget`.
 *
 * Rounding each line to 2dp independently leaves pennies on the floor, and the
 * provider recomputes the invoice from what we send — so the residual is
 * pushed onto the largest line rather than silently lost. If the result still
 * cannot be reconciled the caller is expected to refuse the sync: a wrong
 * figure in someone's accounts is worse than a failed push, because it
 * reconciles against nothing and can misstate VAT.
 */
function buildNetLines(items: InvoiceData['items'], netTarget: number): NetLine[] {
  const bases = items.map(lineBaseNet);
  const baseSum = bases.reduce((a, b) => a + b, 0);
  const factor = baseSum > 0 && netTarget > 0 ? netTarget / baseSum : 1;

  const lines: NetLine[] = items.map((item, i) => {
    const qty = Number(item.quantity) || 0;
    const lineAmount = Math.round(bases[i] * factor * 100) / 100;
    return {
      description: item.description,
      quantity: qty,
      unitAmount: qty !== 0 ? Math.round((lineAmount / qty) * 100) / 100 : lineAmount,
      lineAmount,
    };
  });

  if (netTarget > 0 && lines.length > 0) {
    const sum = Math.round(lines.reduce((a, l) => a + l.lineAmount, 0) * 100) / 100;
    const residual = Math.round((netTarget - sum) * 100) / 100;
    if (residual !== 0) {
      let biggest = 0;
      for (let i = 1; i < lines.length; i++) {
        if (Math.abs(lines[i].lineAmount) > Math.abs(lines[biggest].lineAmount)) biggest = i;
      }
      const l = lines[biggest];
      l.lineAmount = Math.round((l.lineAmount + residual) * 100) / 100;
      if (l.quantity !== 0) {
        l.unitAmount = Math.round((l.lineAmount / l.quantity) * 100) / 100;
      }
    }
  }

  return lines;
}

/** Throws rather than pushing a figure that won't reconcile. */
function assertLinesReconcile(lines: NetLine[], netTarget: number, provider: string): void {
  if (!(netTarget > 0)) return;
  const sum = Math.round(lines.reduce((a, l) => a + l.lineAmount, 0) * 100) / 100;
  if (Math.abs(sum - netTarget) > 0.01) {
    throw new Error(
      `Refusing to sync to ${provider}: line items total £${sum.toFixed(2)} but this invoice ` +
        `is £${netTarget.toFixed(2)} excluding VAT. Pushing this would put a figure in your ` +
        `accounts that does not match the invoice your customer received.`
    );
  }
}

async function syncToXero(
  accessToken: string,
  tenantId: string,
  invoice: InvoiceData
): Promise<SyncResult> {
  // First, find or create the contact
  const contactId = await findOrCreateXeroContact(accessToken, tenantId, invoice.client);

  // Distribute overhead, profit AND any invoice-level discount proportionally
  // into the line prices. Providers recompute their invoice total from the
  // lines, so the lines must sum to the actual net — before ELE-1343 a fixed
  // discount never reached the provider and re-syncs pushed the undiscounted
  // total back.
  const netTarget = (invoice.total || 0) - (invoice.vatAmount || 0);

  // ELE-1575 — built from each line's true net (see lineBaseNet) and
  // reconciled to netTarget, instead of Quantity × unitPrice.
  const netLines = buildNetLines(invoice.items, netTarget);
  assertLinesReconcile(netLines, netTarget, 'Xero');

  // LineAmount is sent explicitly. Xero derives it from Quantity × UnitAmount
  // when it is absent, which reintroduces 2dp rounding drift across lines and
  // is what let a wrong total through in the first place.
  const lineItems: any[] = netLines.map((line) => ({
    Description: line.description,
    Quantity: line.quantity,
    UnitAmount: line.unitAmount,
    LineAmount: line.lineAmount,
    AccountCode: '200', // Sales account - user may need to configure this
    TaxType: invoice.vatAmount > 0 ? 'OUTPUT2' : 'NONE', // 20% VAT or no VAT
  }));

  /*
   * ELE-1571 — the grant, as its own negative line carrying NO VAT.
   *
   * Appended AFTER `assertLinesReconcile`, deliberately: the sales lines must
   * still sum to the true net, and this line then takes the customer's share
   * down without touching it.
   *
   * `TaxType: 'NONE'` is the whole point. Coding it OUTPUT2 would credit VAT
   * back on the grant and under-declare the tax — the supply is still worth
   * the full amount and HMRC is still owed VAT on all of it; only who pays
   * the balance changes. With NONE, Xero lands on:
   *
   *   net 833.33 + VAT 166.67 − grant 500.00 = 500.00 due
   *
   * which is exactly what the certificate-side PDF tells the customer to pay,
   * so the invoice settles in Xero when they pay it instead of sitting open
   * for the grant amount forever.
   *
   * Must be pushed BEFORE the isUpdate block below — that block compares line
   * COUNTS against the live Xero invoice, so the grant line has to be part of
   * the array being counted.
   */
  const xeroGrant = invoice.grant?.amount ?? 0;
  if (xeroGrant > 0) {
    lineItems.push({
      Description: invoice.grant?.label ?? 'Grant',
      Quantity: 1,
      UnitAmount: -xeroGrant,
      LineAmount: -xeroGrant,
      AccountCode: '200',
      TaxType: 'NONE',
    });
  }

  // What Xero will actually hold once the grant line is applied. Used for the
  // already-settled guard below — comparing against `invoice.total` there
  // would miss the case where payments already exceed the grant-reduced total.
  const xeroPayableTotal = Math.round(((invoice.total || 0) - xeroGrant) * 100) / 100;

  // Create the invoice — or update it in place. Xero's POST /Invoices
  // patches the existing record when the body carries its InvoiceID;
  // without it every re-sync created a duplicate invoice (ELE-1339).
  const isUpdate = Boolean(invoice.externalInvoiceId);

  // ELE-1343 — Xero refuses a line-item replacement once payments or credit
  // notes are applied. Fetch the live invoice first: reuse its LineItemIDs so
  // Xero treats our lines as edits to the existing ones, and refuse early
  // with an actionable message when the shapes can't be reconciled.
  if (isUpdate) {
    const existingRes = await fetch(
      `https://api.xero.com/api.xro/2.0/Invoices/${invoice.externalInvoiceId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'xero-tenant-id': tenantId,
          Accept: 'application/json',
        },
      }
    );
    if (existingRes.ok) {
      const existing = (await existingRes.json()).Invoices?.[0];
      const settled = Number(existing?.AmountPaid || 0) + Number(existing?.AmountCredited || 0);
      if (settled > 0) {
        if (xeroPayableTotal < settled) {
          throw new SyncBlockedError(
            'Xero blocked the update',
            `£${settled.toFixed(2)} is already paid or credited against this invoice in Xero, and the new total £${xeroPayableTotal.toFixed(2)} is below that. Adjust the payments in Xero first, then Re-sync.`
          );
        }
        const existingLines = existing?.LineItems || [];
        if (existingLines.length !== lineItems.length) {
          throw new SyncBlockedError(
            'Xero blocked the update',
            `This invoice has payments recorded against it in Xero, and its line items there (${existingLines.length}) no longer match this invoice (${lineItems.length}), so Xero will not accept the change. Make the change directly in Xero, or remove the payments there and Re-sync.`
          );
        }
        existingLines.forEach((el: any, i: number) => {
          lineItems[i].LineItemID = el.LineItemID;
        });
        console.log(
          `Xero update: reusing ${existingLines.length} LineItemIDs (settled £${settled.toFixed(2)})`
        );
      }
    } else {
      console.warn('Could not fetch existing Xero invoice, attempting plain update:', existingRes.status);
    }
  }

  const xeroInvoice = {
    ...(isUpdate ? { InvoiceID: invoice.externalInvoiceId } : {}),
    Type: 'ACCREC', // Accounts Receivable invoice
    Contact: { ContactID: contactId },
    Date: invoice.date?.split('T')[0] || new Date().toISOString().split('T')[0],
    DueDate: invoice.dueDate?.split('T')[0],
    Reference: invoice.invoiceNumber,
    InvoiceNumber: invoice.invoiceNumber,
    // ELE-1575 — state it rather than relying on the org default. Our lines
    // are VAT-exclusive nets; a tenant defaulting to Inclusive would read the
    // same numbers as gross and book the VAT out of the net.
    LineAmountTypes: 'Exclusive',
    LineItems: lineItems,
    Status: 'AUTHORISED',
    CurrencyCode: invoice.currency,
  };

  const response = await fetch('https://api.xero.com/api.xro/2.0/Invoices', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'xero-tenant-id': tenantId,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ Invoices: [xeroInvoice] }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Xero invoice creation failed:', errorText);
    throw new ExternalAPIError('Xero', { status: response.status, error: errorText });
  }

  const result = await response.json();
  const createdInvoice = result.Invoices?.[0];

  if (!createdInvoice?.InvoiceID) {
    throw new ExternalAPIError('Xero', { error: 'No invoice ID returned' });
  }

  // ELE-1575 — verify what Xero actually booked before we call this a success.
  // Xero echoes the computed Total on the create/update response, so this
  // costs no extra call. The original defect was silent for days precisely
  // because nothing ever compared the two figures.
  const xeroTotal = Number(createdInvoice.Total);
  if (Number.isFinite(xeroTotal) && invoice.total > 0) {
    const drift = Math.round((xeroTotal - invoice.total) * 100) / 100;
    if (Math.abs(drift) > 0.01) {
      console.error(
        `Xero total mismatch on ${invoice.invoiceNumber}: Xero booked £${xeroTotal.toFixed(2)}, ` +
          `invoice is £${invoice.total.toFixed(2)} (drift £${drift.toFixed(2)})`
      );
      // Payment is deliberately NOT created — attaching one to a wrong-valued
      // invoice is what makes it hard to correct afterwards (Xero blocks line
      // edits once a payment is applied). Fail loudly instead.
      throw new Error(
        `Xero recorded £${xeroTotal.toFixed(2)} for invoice ${invoice.invoiceNumber} but it is ` +
          `£${invoice.total.toFixed(2)}. Nothing has been marked as paid. Please re-check the ` +
          `invoice in Elec-Mate and try again.`
      );
    }
  }

  // If invoice is paid, create a payment in Xero. Create path only — on an
  // update the payment may already exist and would be duplicated.
  if (invoice.isPaid && !isUpdate) {
    await createXeroPayment(accessToken, tenantId, {
      invoiceId: createdInvoice.InvoiceID,
      amount: invoice.total,
      date: invoice.paidAt?.split('T')[0] || new Date().toISOString().split('T')[0],
      currency: invoice.currency,
    });
    console.log(`Created payment for invoice ${createdInvoice.InvoiceID} in Xero`);
  }

  return {
    invoiceId: createdInvoice.InvoiceID,
    invoiceUrl: `https://go.xero.com/AccountsReceivable/View.aspx?InvoiceID=${createdInvoice.InvoiceID}`,
  };
}

async function createXeroPayment(
  accessToken: string,
  tenantId: string,
  payment: {
    invoiceId: string;
    amount: number;
    date: string;
    currency: string;
  }
): Promise<void> {
  // First, get a bank account to apply payment to
  const bankAccountCode = await getXeroBankAccount(accessToken, tenantId);

  const xeroPayment = {
    Invoice: { InvoiceID: payment.invoiceId },
    Account: { Code: bankAccountCode },
    Amount: payment.amount,
    Date: payment.date,
  };

  const response = await fetch('https://api.xero.com/api.xro/2.0/Payments', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'xero-tenant-id': tenantId,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ Payments: [xeroPayment] }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Xero payment creation failed:', errorText);
    // Don't throw - invoice was created, just log the payment failure
    console.warn(
      'Invoice created but payment marking failed - invoice will show as unpaid in Xero'
    );
  }
}

async function getXeroBankAccount(accessToken: string, tenantId: string): Promise<string> {
  // Get bank accounts from Xero
  const response = await fetch('https://api.xero.com/api.xro/2.0/Accounts?where=Type=="BANK"', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'xero-tenant-id': tenantId,
      Accept: 'application/json',
    },
  });

  if (response.ok) {
    const data = await response.json();
    if (data.Accounts?.length > 0) {
      // Return the first active bank account
      const activeAccount = data.Accounts.find((a: any) => a.Status === 'ACTIVE');
      if (activeAccount) {
        return activeAccount.Code;
      }
      return data.Accounts[0].Code;
    }
  }

  // Fallback to common default bank account code
  return '090'; // "Business Bank Account" is a common default in Xero
}

async function findOrCreateXeroContact(
  accessToken: string,
  tenantId: string,
  client: InvoiceData['client']
): Promise<string> {
  // Search for existing contact by name or email
  const searchParams = new URLSearchParams();
  if (client.email) {
    searchParams.set('where', `EmailAddress="${client.email}"`);
  } else {
    searchParams.set('where', `Name="${client.name.replace(/"/g, '\\"')}"`);
  }

  const searchResponse = await fetch(
    `https://api.xero.com/api.xro/2.0/Contacts?${searchParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'xero-tenant-id': tenantId,
        Accept: 'application/json',
      },
    }
  );

  if (searchResponse.ok) {
    const searchResult = await searchResponse.json();
    if (searchResult.Contacts?.length > 0) {
      return searchResult.Contacts[0].ContactID;
    }
  }

  // Create new contact
  const newContact = {
    Name: client.name,
    EmailAddress: client.email,
    Phones: client.phone ? [{ PhoneType: 'DEFAULT', PhoneNumber: client.phone }] : [],
    Addresses: client.address ? [{ AddressType: 'POBOX', AddressLine1: client.address }] : [],
  };

  const createResponse = await fetch('https://api.xero.com/api.xro/2.0/Contacts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'xero-tenant-id': tenantId,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ Contacts: [newContact] }),
  });

  if (!createResponse.ok) {
    const errorText = await createResponse.text();
    console.error('Xero contact creation failed:', errorText);
    throw new ExternalAPIError('Xero', { error: 'Failed to create contact' });
  }

  const createResult = await createResponse.json();
  return createResult.Contacts[0].ContactID;
}

async function syncToQuickBooks(
  accessToken: string,
  realmId: string,
  invoice: InvoiceData
): Promise<SyncResult> {
  console.log('=== syncToQuickBooks START ===');
  console.log('RealmId:', realmId);
  console.log('Client:', JSON.stringify(invoice.client));
  console.log('Using URL:', QUICKBOOKS_BASE_URL);

  // Validate required data
  if (!invoice.client?.name) {
    throw new Error('Client name is required for QuickBooks invoice');
  }
  if (!invoice.items || !Array.isArray(invoice.items) || invoice.items.length === 0) {
    throw new Error('Invoice must have at least one line item');
  }

  // First, find or create the customer
  console.log('Finding/creating customer...');
  const customerId = await findOrCreateQBCustomer(accessToken, realmId, invoice.client);
  console.log('Customer ID:', customerId);

  if (!customerId) {
    throw new Error('Failed to find or create customer in QuickBooks');
  }

  // Get or create a service item - REQUIRED for line items to have amounts counted
  console.log('Getting/creating service item...');
  const serviceItem = await getOrCreateQBServiceItem(accessToken, realmId);
  console.log('Service Item:', serviceItem);

  /*
   * ELE-1521 — overhead and profit are distributed into the lines; the
   * DISCOUNT is not.
   *
   * This used to fold all three into one `markupFactor`, so a £200 discount on
   * a £652.75 invoice rewrote every unit price: £26.14, £4.04, £1.54, £3.56.
   * Three things went wrong with that.
   *
   *  - The prices in the customer's accounts stopped matching the prices on
   *    the invoice the customer was sent.
   *  - Seven lines each rounded to 2dp against a factor of 0.6936…, so the
   *    QuickBooks total came out a penny under: £452.74 against £452.75. An
   *    invoice that does not reconcile is worse than one that is merely ugly.
   *  - The discount's wording was lost. Users write real conditions in there
   *    ("only applied if the customer has completed the grant application
   *    form"), and a proportional reduction cannot carry a sentence.
   *
   * Overhead and profit genuinely are part of what a line costs, so they stay
   * distributed. The discount becomes a QuickBooks discount line, which is
   * what it is.
   */
  const discountAmount = invoice.discount?.amount ?? 0;
  const netTarget = (invoice.total || 0) - (invoice.vatAmount || 0);
  // Add the discount back before deriving the markup — the lines must sum to
  // the pre-discount net, and the discount line takes it off again.
  const grossTarget = netTarget + discountAmount;

  // Resolve the sales tax code once. UK QuickBooks requires a TaxCodeRef on every
  // sales line; without it QuickBooks drops the VAT and can reject the invoice
  // with a business validation error. ELE-1235.
  const vatTaxCodeId = await getQBSalesTaxCode(
    accessToken,
    realmId,
    invoice.vatAmount > 0,
    invoice.reverseCharge === true
  );
  console.log(
    'VAT tax code:',
    vatTaxCodeId,
    '(vatAmount:',
    invoice.vatAmount,
    'reverseCharge:',
    invoice.reverseCharge === true,
    ')'
  );

  /*
   * Refuse to sync an invoice that carries VAT when no sales tax code could be
   * resolved in the QuickBooks company.
   *
   * Without this the lines go with no `TaxCodeRef`, QuickBooks adds no tax, and
   * the invoice lands at the EX-VAT net — silently short by the whole VAT
   * amount. Measured on a real sync: a £1,000.00 invoice (£833.33 + £166.67
   * VAT) arrived in QuickBooks as £833.33, with a no-grant control invoice
   * proving it was unrelated to the grant line.
   *
   * A wrong figure sitting in someone's books is far worse than a sync that
   * refuses and says why, so this blocks with an actionable message rather
   * than warning into logs nobody reads. `reverseCharge` is deliberately
   * excluded: that path legitimately carries no VAT, and it already falls back
   * to zero-rated with its own warning.
   */
  if (invoice.vatAmount > 0 && !vatTaxCodeId && invoice.reverseCharge !== true) {
    throw new SyncBlockedError(
      'QuickBooks has no VAT code to use',
      `This invoice includes £${invoice.vatAmount.toFixed(2)} VAT, but no standard-rated sales tax code could be found in your QuickBooks company. Syncing would post it as £${(
        (invoice.total || 0) - (invoice.vatAmount || 0)
      ).toFixed(2)} instead of £${(invoice.total || 0).toFixed(
        2
      )} — short by the VAT. Turn on VAT in QuickBooks (Taxes → Set up VAT) so a 20% code exists, then Re-sync.`
    );
  }

  // Format line items for QuickBooks - distribute overhead/profit into each line item
  // MUST include ItemRef or amounts are ignored!
  //
  // ELE-1575 — reconciled to `grossTarget`, not netTarget: the discount is a
  // line of its own below (ELE-1521), so the sales lines must still add up to
  // the PRE-discount net for the discount line to take it off again.
  const netLines = buildNetLines(invoice.items, grossTarget);
  assertLinesReconcile(netLines, grossTarget, 'QuickBooks');

  const lineItems: any[] = netLines.map((line, index) => ({
    Id: String(index + 1),
    LineNum: index + 1,
    Description: line.description,
    // Amount is the authoritative line net. Deriving it from Qty × UnitPrice
    // is what let rounding drift and the unitPrice/totalPrice mismatch through.
    Amount: line.lineAmount,
    DetailType: 'SalesItemLineDetail',
    SalesItemLineDetail: {
      ItemRef: {
        value: serviceItem.id,
        name: serviceItem.name,
      },
      Qty: line.quantity,
      UnitPrice: line.unitAmount,
      ...(vatTaxCodeId ? { TaxCodeRef: { value: vatTaxCodeId } } : {}),
    },
  }));

  /*
   * QuickBooks models a discount as a line of its own — DiscountLineDetail,
   * with PercentBased false and the cash amount. It has to come after the
   * sales lines; QuickBooks applies it to the subtotal of everything above it.
   */
  if (discountAmount > 0) {
    lineItems.push({
      LineNum: lineItems.length + 1,
      Description: invoice.discount?.label ?? 'Discount',
      Amount: Math.round(discountAmount * 100) / 100,
      DetailType: 'DiscountLineDetail',
      DiscountLineDetail: {
        PercentBased: false,
        ...(vatTaxCodeId ? { TaxCodeRef: { value: vatTaxCodeId } } : {}),
      },
    });
  }

  /*
   * ELE-1571 — the grant.
   *
   * ⚠️ Deliberately NOT a DiscountLineDetail, even though one sits directly
   * above and it would be the obvious thing to copy. QuickBooks applies a
   * discount line to the subtotal above it and recalculates VAT on the
   * reduced figure — which is right for a discount and wrong for a grant. The
   * supply is still worth the full amount; VAT stays due on all of it.
   *
   * A negative sales line carrying the ZERO-RATED code gives the correct
   * result: the goods lines keep their 20%, this line adds no tax, and the
   * balance owed drops to the customer's share.
   *
   * Its own tax-code lookup — `vatTaxCodeId` above is the standard-rated (or
   * reverse-charge) code and would tax the deduction.
   */
  const qbGrantAmount = invoice.grant?.amount ?? 0;
  if (qbGrantAmount > 0) {
    const zeroRatedTaxCodeId = await getQBSalesTaxCode(accessToken, realmId, false, false);
    console.log(
      '[QuickBooks] grant line',
      qbGrantAmount,
      'zero-rated tax code:',
      zeroRatedTaxCodeId
    );
    lineItems.push({
      LineNum: lineItems.length + 1,
      Description: invoice.grant?.label ?? 'Grant',
      Amount: -Math.round(qbGrantAmount * 100) / 100,
      DetailType: 'SalesItemLineDetail',
      SalesItemLineDetail: {
        ItemRef: { value: serviceItem.id, name: serviceItem.name },
        Qty: 1,
        UnitPrice: -Math.round(qbGrantAmount * 100) / 100,
        ...(zeroRatedTaxCodeId ? { TaxCodeRef: { value: zeroRatedTaxCodeId } } : {}),
      },
    });
  }

  // Create the invoice. QuickBooks rejects a duplicate DocNumber with a business
  // validation error (code 6140) when the company uses custom transaction
  // numbers — e.g. the number was already used by a prior sync or a manual QBO
  // invoice. Retry once letting QuickBooks auto-assign its own number so the
  // sync still succeeds rather than hard-failing. ELE-1235.
  /*
   * ELE-1523 — re-syncing an edited invoice was creating a SECOND invoice in
   * QuickBooks instead of updating the first.
   *
   * There was no update path here at all: every sync POSTed a new invoice, and
   * `SyncToken` — which QuickBooks requires on any update — appeared nowhere in
   * this file. Xero has had this since ELE-1339 (`isUpdate` + InvoiceID); the
   * QuickBooks branch simply ignored the `externalInvoiceId` we already store.
   *
   * Worse, the 6140 handler below made it certain. Fault 6140 is QuickBooks
   * saying "you already have an invoice with this number" — the one signal
   * that would have caught the duplicate — and the code answered it by
   * retrying with auto-numbering, which is how the user ended up with two
   * invoices for one job, the second wearing a number they never chose.
   *
   * QuickBooks updates are a POST to the same /invoice endpoint carrying `Id`
   * and the CURRENT `SyncToken`. The token is a running version counter, so it
   * has to be read immediately before the write — a stale one is rejected with
   * fault 5010 (stale object).
   */
  const existingQbId = invoice.externalInvoiceId ?? null;
  let syncToken: string | null = null;

  if (existingQbId) {
    const existingRes = await fetch(
      `${QUICKBOOKS_BASE_URL}/v3/company/${realmId}/invoice/${existingQbId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      }
    );
    if (existingRes.ok) {
      const existing = (await existingRes.json())?.Invoice;
      syncToken = existing?.SyncToken != null ? String(existing.SyncToken) : null;
      console.log(`Updating existing QuickBooks invoice ${existingQbId} (SyncToken ${syncToken})`);
    } else if (existingRes.status === 404 || existingRes.status === 410) {
      // Genuinely gone — deleted in QuickBooks. Creating a replacement is the
      // right answer and cannot duplicate anything, because there is nothing
      // left to duplicate.
      console.log(
        `QuickBooks invoice ${existingQbId} no longer exists (${existingRes.status}) — creating a replacement`
      );
    } else {
      /*
       * ELE-1561 — do NOT create on any other failure.
       *
       * This branch used to fall through to the create path for *every*
       * non-OK response. An expired token, a rate limit, a transient 5xx or a
       * realm mismatch all look identical to "deleted" from here, so a
       * five-second QuickBooks blip silently produced a second invoice for a
       * job that already had one. mglowacki hit this repeatedly: every resend
       * rolled the dice again, and each loss left another duplicate to void by
       * hand.
       *
       * Failing is safe. Every caller treats an accounting sync failure as
       * non-fatal — the invoice email still goes out — so the cost of stopping
       * here is a retry, and the cost of guessing is a duplicate in somebody's
       * books.
       */
      const detail = await existingRes.text().catch(() => '');
      console.error(
        `QuickBooks invoice ${existingQbId} not retrievable (${existingRes.status}) — refusing to create a duplicate`
      );
      // Thrown, not returned: this function's contract is SyncResult, and every
      // other hard failure in it throws. The caller catches and reports the sync
      // as failed without touching the invoice.
      throw new Error(
        `Could not reach existing QuickBooks invoice ${existingQbId} (HTTP ${existingRes.status}). ` +
          `Not creating a new one — retry the sync. ${detail.slice(0, 200)}`
      );
    }
  }

  const isUpdate = Boolean(existingQbId && syncToken !== null);

  const buildInvoicePayload = (includeDocNumber: boolean) => ({
    ...(isUpdate ? { Id: existingQbId, SyncToken: syncToken, sparse: true } : {}),
    CustomerRef: { value: customerId },
    // Net lines + QuickBooks adds VAT on top (UK). Only set when we resolved a
    // tax code, so US Automated-Sales-Tax companies are untouched. ELE-1235.
    ...(vatTaxCodeId ? { GlobalTaxCalculation: 'TaxExcluded' } : {}),
    ...(includeDocNumber && invoice.invoiceNumber
      ? { DocNumber: invoice.invoiceNumber }
      : {}),
    TxnDate: invoice.date?.split('T')[0],
    DueDate: invoice.dueDate?.split('T')[0],
    Line: lineItems,
    // ELE-1318 — HMRC requires reverse-charge wording on the invoice itself.
    CustomerMemo: (() => {
      const drcNote =
        invoice.reverseCharge === true
          ? 'Domestic reverse charge: customer to account for VAT to HMRC (VAT Act 1994 s55A).'
          : '';
      const memo = [invoice.notes, drcNote].filter(Boolean).join('\n\n');
      return memo ? { value: memo } : undefined;
    })(),
  });

  const postInvoice = (payload: unknown) =>
    fetch(`${QUICKBOOKS_BASE_URL}/v3/company/${realmId}/invoice`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

  let response = await postInvoice(buildInvoicePayload(true));

  if (!response.ok) {
    const firstErrorText = await response.text();
    console.error('QuickBooks invoice creation failed:', response.status, firstErrorText);

    let isDuplicateDocNumber = false;
    try {
      const fault = JSON.parse(firstErrorText)?.Fault?.Error?.[0];
      const code = fault?.code ? String(fault.code) : '';
      const text = `${fault?.Message || ''} ${fault?.Detail || ''}`.toLowerCase();
      isDuplicateDocNumber =
        code === '6140' || (text.includes('duplicate') && text.includes('document number'));
    } catch {
      // Fault text wasn't JSON — fall through and surface it as-is.
    }

    /*
     * Only ever fall back to auto-numbering when we are CREATING. On an update
     * the DocNumber collides with the invoice's own existing number, and
     * retrying without it used to mint a second invoice — the exact duplicate
     * this ticket is about. If an update hits 6140 something else is wrong and
     * it should surface, not silently branch.
     */
    if (isDuplicateDocNumber && invoice.invoiceNumber && !isUpdate) {
      console.log(
        `Duplicate DocNumber "${invoice.invoiceNumber}" — retrying with QuickBooks auto-numbering`
      );
      const retryResponse = await postInvoice(buildInvoicePayload(false));
      if (!retryResponse.ok) {
        const retryErrorText = await retryResponse.text();
        console.error('QuickBooks invoice retry failed:', retryResponse.status, retryErrorText);
        throw new ExternalAPIError('QuickBooks', {
          status: retryResponse.status,
          error: retryErrorText,
        });
      }
      response = retryResponse;
    } else {
      throw new ExternalAPIError('QuickBooks', { status: response.status, error: firstErrorText });
    }
  }

  const result = await response.json();
  const createdInvoice = result.Invoice;

  if (!createdInvoice?.Id) {
    throw new ExternalAPIError('QuickBooks', { error: 'No invoice ID returned' });
  }

  // If invoice is paid, create a payment in QuickBooks
  if (invoice.isPaid) {
    console.log('Invoice is marked as paid, creating payment in QuickBooks...');
    try {
      await createQuickBooksPayment(accessToken, realmId, {
        invoiceId: createdInvoice.Id,
        customerId: customerId,
        amount: invoice.total,
        date: invoice.paidAt?.split('T')[0] || new Date().toISOString().split('T')[0],
      });
      console.log(`Created payment for invoice ${createdInvoice.Id} in QuickBooks`);
    } catch (paymentError) {
      // Don't fail the whole sync if payment creation fails
      console.error('Failed to create payment in QuickBooks:', paymentError);
      console.warn(
        'Invoice created but payment marking failed - invoice will show as unpaid in QuickBooks'
      );
    }
  }

  return {
    invoiceId: createdInvoice.Id,
    invoiceUrl: `https://app.qbo.intuit.com/app/invoice?txnId=${createdInvoice.Id}`,
  };
}

async function createQuickBooksPayment(
  accessToken: string,
  realmId: string,
  payment: {
    invoiceId: string;
    customerId: string;
    amount: number;
    date: string;
  }
): Promise<void> {
  console.log('Creating QuickBooks payment:', payment);

  const qbPayment = {
    CustomerRef: { value: payment.customerId },
    TotalAmt: payment.amount,
    TxnDate: payment.date,
    Line: [
      {
        Amount: payment.amount,
        LinkedTxn: [
          {
            TxnId: payment.invoiceId,
            TxnType: 'Invoice',
          },
        ],
      },
    ],
  };

  const response = await fetch(`${QUICKBOOKS_BASE_URL}/v3/company/${realmId}/payment`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(qbPayment),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('QuickBooks payment creation failed:', response.status, errorText);
    throw new Error(`Failed to create payment: ${errorText}`);
  }

  const result = await response.json();
  console.log('QuickBooks payment created:', result.Payment?.Id);
}

/**
 * Get or create a service item in QuickBooks
 * CRITICAL: Line items MUST have an ItemRef or QuickBooks ignores the amounts!
 * Returns the default "Services" item or creates one if none exist
 */
async function getOrCreateQBServiceItem(
  accessToken: string,
  realmId: string
): Promise<{ id: string; name: string }> {
  console.log('=== getOrCreateQBServiceItem START ===');

  // First, try to find any existing Service-type item
  const query = `SELECT * FROM Item WHERE Type = 'Service' MAXRESULTS 100`;
  const queryUrl = `${QUICKBOOKS_BASE_URL}/v3/company/${realmId}/query?query=${encodeURIComponent(query)}`;

  console.log('Querying for service items...');

  const queryResponse = await fetch(queryUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (queryResponse.ok) {
    const result = await queryResponse.json();
    const items = result.QueryResponse?.Item;

    if (items && items.length > 0) {
      // Exclude CIS items — QuickBooks rejects a CIS item on an invoice for a
      // non-CIS customer ("You cannot select CIS accounts/items..."). ELE-1235.
      const nonCis = items.filter((item: any) => !/\bcis\b/i.test(String(item.Name || '')));
      const pool = nonCis.length > 0 ? nonCis : items;

      // Prefer an item named "Services" or "Service" if it exists
      const preferredItem = pool.find(
        (item: any) =>
          item.Name?.toLowerCase() === 'services' || item.Name?.toLowerCase() === 'service'
      );

      if (preferredItem) {
        console.log('Found preferred service item:', preferredItem.Id, preferredItem.Name);
        return { id: String(preferredItem.Id), name: preferredItem.Name };
      }

      // Otherwise return the first non-CIS service item
      console.log('Using first service item:', pool[0].Id, pool[0].Name);
      return { id: String(pool[0].Id), name: pool[0].Name };
    }
  } else {
    const errorText = await queryResponse.text();
    console.warn('Service item query failed:', queryResponse.status, errorText);
  }

  // No service items found - create one
  console.log('No service items found, creating "Services" item...');

  // First, we need an Income account for the item
  const incomeAccountId = await getQBIncomeAccount(accessToken, realmId);

  const newItem = {
    Name: 'Services',
    Type: 'Service',
    IncomeAccountRef: {
      value: incomeAccountId,
    },
    Description: 'General services (auto-created by Elec-Mate)',
  };

  const createResponse = await fetch(`${QUICKBOOKS_BASE_URL}/v3/company/${realmId}/item`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(newItem),
  });

  if (!createResponse.ok) {
    const errorText = await createResponse.text();
    console.error('Failed to create service item:', createResponse.status, errorText);

    // Last resort: try to use item ID "1" which is often the default Services item
    console.log('Falling back to default item ID "1"');
    return { id: '1', name: 'Services' };
  }

  const createResult = await createResponse.json();
  console.log('Created service item:', createResult.Item?.Id, createResult.Item?.Name);
  return { id: String(createResult.Item.Id), name: createResult.Item.Name };
}

/**
 * Find the QuickBooks sales tax code to apply to invoice lines. UK QuickBooks
 * companies require a TaxCodeRef on every sales line (and GlobalTaxCalculation
 * on the invoice) — omitting it triggers a "business validation error" AND drops
 * the VAT entirely, so the synced total no longer matches the Elec-Mate invoice.
 * Returns the standard 20% VAT code for vatable invoices, or the No-VAT/Exempt
 * code for zero-rated ones. Returns null when no suitable code is found (e.g. US
 * Automated Sales Tax companies) so the caller falls back to sending no tax and
 * behaviour is unchanged for them. ELE-1235.
 */
async function getQBSalesTaxCode(
  accessToken: string,
  realmId: string,
  vatable: boolean,
  reverseCharge = false
): Promise<string | null> {
  try {
    const query = `SELECT * FROM TaxCode MAXRESULTS 100`;
    const url = `${QUICKBOOKS_BASE_URL}/v3/company/${realmId}/query?query=${encodeURIComponent(query)}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' },
    });
    if (!res.ok) {
      console.warn('TaxCode query failed:', res.status, await res.text());
      return null;
    }
    const data = await res.json();
    const codes: any[] = (data.QueryResponse?.TaxCode || []).filter(
      (c: any) => c.Active !== false
    );
    if (codes.length === 0) return null;

    const name = (c: any) => String(c.Name || '');
    const byName = (re: RegExp) => codes.find((c: any) => re.test(name(c)));

    // ELE-1318 / ELE-1466 — CIS domestic reverse charge.
    //
    // ELE-1318 matched DRC codes on the literal words "reverse charge". Most
    // UK QuickBooks companies do not name them that way: the CIS codes are
    // "20.0% RC CIS" and "5.0% RC CIS". "RC" never matched, so the lookup
    // fell through to the zero-rated branch below and QuickBooks received a
    // No-VAT code — the reported "subtotal is correct but the VAT boxes are
    // left empty, so I have to amend them as 20% RC CIS".
    //
    // Match "RC" and "DRC" as well, and prefer the CIS variant: this is
    // construction, and QBO also ships non-construction reverse-charge codes
    // ("RC SG", "RC MPCCs") that would be the wrong treatment. Purchase-side
    // and EC acquisition variants are input tax and are excluded outright —
    // they must never land on a sales invoice.
    if (reverseCharge) {
      // EC goods/services codes (ECG, ECS) are an intra-community treatment,
      // not domestic construction — excluded along with the purchase-side
      // (input tax) variants, which must never land on a sales invoice.
      type QBTaxCode = { Id?: string | number; Name?: string };
      const isSalesSide = (n: string) =>
        !/\bec(g|s)?\b|acquisition|purchase|input/i.test(n);
      const rcCodes: QBTaxCode[] = codes.filter((c: QBTaxCode) => {
        const n = name(c);
        return isSalesSide(n) && (/reverse\s*charge/i.test(n) || /\bd?rc\b/i.test(n));
      });
      const cisCodes = rcCodes.filter((c: QBTaxCode) => /\bcis\b/i.test(name(c)));
      const wordedCodes = rcCodes.filter((c: QBTaxCode) => /reverse\s*charge/i.test(name(c)));
      const prefer20 = (list: QBTaxCode[]) =>
        list.find((c: QBTaxCode) => /20/.test(name(c))) || list[0];

      // CIS first (construction), then anything explicitly worded "reverse
      // charge". A bare "RC SG"/"RC MPCCs" is deliberately NOT used — the
      // wrong reverse-charge type is worse than the zero-rated fallback.
      const drc = prefer20(cisCodes) || prefer20(wordedCodes);
      if (drc) {
        console.log('[getQBSalesTaxCode] domestic reverse charge code:', name(drc));
        return String(drc.Id);
      }
      console.warn(
        '[getQBSalesTaxCode] no Domestic Reverse Charge tax code in this QBO company — falling back to zero-rated (ELE-1318). Codes seen:',
        codes.map(name).join(' | ')
      );
    }

    if (vatable) {
      // Standard-rated 20% sales VAT — exclude EC acquisition / purchase / reverse
      // charge variants which also contain "20".
      const std =
        codes.find(
          (c: any) =>
            /20(\.0)?\s*%?\s*s\b/i.test(name(c)) &&
            !/ec|acq|purchase|reverse/i.test(name(c))
        ) || byName(/standard.*20|20(\.0)?\s*%/i);
      if (std) return String(std.Id);

      /*
       * Name matching failed — fall back to matching by RATE.
       *
       * Turning VAT on in Elec-Mate should put VAT on the QuickBooks invoice,
       * full stop. Xero manages that unconditionally because 'OUTPUT2' is a
       * built-in constant; QuickBooks has no equivalent, so the correct code
       * has to be found inside the user's own company — and a company is free
       * to name its codes anything at all. Matching on the words "20% S" is a
       * guess about wording, and when it misses, the invoice silently posts
       * with no tax.
       *
       * A rate of 20 is a fact rather than a wording, so this asks the company
       * for its sales TaxRates and picks the one that IS 20%, then finds the
       * code that uses it. Only runs when the cheap name match has already
       * failed, so it costs nothing in the normal case.
       */
      try {
        const rateRes = await fetch(
          `${QUICKBOOKS_BASE_URL}/v3/company/${realmId}/query?query=${encodeURIComponent(
            'SELECT * FROM TaxRate MAXRESULTS 200'
          )}`,
          { headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' } }
        );
        if (rateRes.ok) {
          const rateData = await rateRes.json();
          const rates: any[] = rateData.QueryResponse?.TaxRate || [];
          // Sales-side only: a 20% PURCHASE rate is input tax and must never
          // land on a sales invoice.
          const twenty = rates.filter(
            (r: any) =>
              Number(r?.RateValue) === 20 &&
              r?.Active !== false &&
              !/purchase|acq|ec\b|input/i.test(String(r?.Name || ''))
          );
          const twentyIds = new Set(twenty.map((r: any) => String(r.Id)));
          const byRate = codes.find((c: any) => {
            const details = c?.SalesTaxRateList?.TaxRateDetail || [];
            return details.some((d: any) => twentyIds.has(String(d?.TaxRateRef?.value)));
          });
          if (byRate) {
            console.log(
              '[getQBSalesTaxCode] matched standard rate by VALUE, not name:',
              name(byRate)
            );
            return String(byRate.Id);
          }
        } else {
          console.warn('[getQBSalesTaxCode] TaxRate query failed:', rateRes.status);
        }
      } catch (rateErr) {
        console.warn('[getQBSalesTaxCode] rate-based lookup failed:', rateErr);
      }

      console.warn(
        '[getQBSalesTaxCode] no standard-rated sales code found by name OR rate. Codes seen:',
        codes.map(name).join(' | ')
      );
      return null;
    }

    // Zero-rated / exempt / no-VAT
    const noVat =
      byName(/no\s*vat/i) || byName(/exempt/i) || byName(/zero/i) || byName(/0(\.0)?\s*%/i);
    return noVat ? String(noVat.Id) : null;
  } catch (e) {
    console.warn('getQBSalesTaxCode error:', e);
    return null;
  }
}

/**
 * Get an Income account from QuickBooks for creating service items
 */
async function getQBIncomeAccount(accessToken: string, realmId: string): Promise<string> {
  // Query for Income accounts
  const query = `SELECT * FROM Account WHERE AccountType = 'Income' MAXRESULTS 100`;
  const queryUrl = `${QUICKBOOKS_BASE_URL}/v3/company/${realmId}/query?query=${encodeURIComponent(query)}`;

  const response = await fetch(queryUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (response.ok) {
    const result = await response.json();
    const accounts = result.QueryResponse?.Account;

    if (accounts && accounts.length > 0) {
      // NEVER use a CIS (Construction Industry Scheme) account. On a CIS-enabled
      // QuickBooks company, putting a CIS account/item on an invoice for a
      // non-CIS customer is rejected with "You cannot select CIS accounts/items
      // for a non-CIS supplier/customer". Filter CIS accounts out first. ELE-1235.
      const isCis = (acc: any) =>
        /\bcis\b/i.test(String(acc.Name || '')) ||
        /cis/i.test(String(acc.AccountSubType || ''));
      const pool = accounts.filter((acc: any) => !isCis(acc));
      const usable = pool.length > 0 ? pool : accounts;

      // Prefer a "Sales" / "Services" / "Income" named account
      const preferredAccount = usable.find(
        (acc: any) =>
          acc.Name?.toLowerCase().includes('sales') ||
          acc.Name?.toLowerCase().includes('service') ||
          acc.Name?.toLowerCase().includes('income')
      );

      if (preferredAccount) {
        console.log('Using income account:', preferredAccount.Id, preferredAccount.Name);
        return String(preferredAccount.Id);
      }

      console.log('Using first non-CIS income account:', usable[0].Id, usable[0].Name);
      return String(usable[0].Id);
    }
  }

  // Fallback to account ID "1" - this may not work but is a last resort
  console.warn('No income accounts found, using fallback ID "1"');
  return '1';
}

async function findOrCreateQBCustomer(
  accessToken: string,
  realmId: string,
  client: InvoiceData['client']
): Promise<string> {
  console.log('=== findOrCreateQBCustomer START ===');
  console.log('Client name:', client.name);
  console.log('Client email:', client.email);

  // Sanitize and validate client name - QuickBooks has a 100 char limit for DisplayName
  const rawName = client.name?.trim() || 'Unknown Client';
  // Remove characters that cause issues in QuickBooks queries
  const sanitizedName = rawName.replace(/['"]/g, '').substring(0, 100);
  // Escape single quotes in name for SQL query (after we've removed them, just in case)
  const escapedName = sanitizedName.replace(/'/g, "\\'");

  console.log('Sanitized name:', sanitizedName);

  // First try to search by email (more unique)
  if (client.email) {
    const emailQuery = `SELECT * FROM Customer WHERE PrimaryEmailAddr = '${client.email}'`;
    console.log('QB Email Query:', emailQuery);

    const emailSearchUrl = `${QUICKBOOKS_BASE_URL}/v3/company/${realmId}/query?query=${encodeURIComponent(emailQuery)}`;

    try {
      const emailSearchResponse = await fetch(emailSearchUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      });

      if (emailSearchResponse.ok) {
        const emailSearchResult = await emailSearchResponse.json();
        if (emailSearchResult.QueryResponse?.Customer?.length > 0) {
          console.log(
            'Found existing customer by email:',
            emailSearchResult.QueryResponse.Customer[0].Id
          );
          return emailSearchResult.QueryResponse.Customer[0].Id;
        }
      }
    } catch (emailSearchError) {
      console.warn('Email search failed, will try name search:', emailSearchError);
    }
  }

  // Then search by display name
  const nameQuery = `SELECT * FROM Customer WHERE DisplayName = '${escapedName}'`;
  console.log('QB Name Query:', nameQuery);

  const searchUrl = `${QUICKBOOKS_BASE_URL}/v3/company/${realmId}/query?query=${encodeURIComponent(nameQuery)}`;
  console.log('Search URL:', searchUrl);

  const searchResponse = await fetch(searchUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  console.log('Search response status:', searchResponse.status);

  if (searchResponse.ok) {
    const searchResult = await searchResponse.json();
    console.log('Search result:', JSON.stringify(searchResult).substring(0, 500));
    if (searchResult.QueryResponse?.Customer?.length > 0) {
      console.log('Found existing customer by name:', searchResult.QueryResponse.Customer[0].Id);
      return searchResult.QueryResponse.Customer[0].Id;
    }
  } else {
    const errorText = await searchResponse.text();
    console.error('QB customer search failed:', searchResponse.status, errorText);
    // Don't throw - try to create customer instead
  }

  // Create new customer
  console.log('Creating new customer...');

  // Try to create with the base name first
  const customerId = await tryCreateQBCustomer(accessToken, realmId, sanitizedName, client);
  if (customerId) {
    return customerId;
  }

  // If creation failed (likely duplicate name), try with a unique suffix
  const uniqueName = `${sanitizedName.substring(0, 85)} (${Date.now().toString().slice(-6)})`;
  console.log('Retrying with unique name:', uniqueName);

  const retryCustomerId = await tryCreateQBCustomer(accessToken, realmId, uniqueName, client);
  if (retryCustomerId) {
    return retryCustomerId;
  }

  // If both attempts failed, throw with detailed error
  throw new Error(
    `Failed to create customer "${sanitizedName}" in QuickBooks. The name may already exist with different details, or there may be a QuickBooks configuration issue.`
  );
}

/**
 * Attempt to create a customer in QuickBooks
 * Returns customer ID on success, null on failure
 */
async function tryCreateQBCustomer(
  accessToken: string,
  realmId: string,
  displayName: string,
  client: InvoiceData['client']
): Promise<string | null> {
  /*
   * ELE-1522 — the customer arrived in QuickBooks as a bare name.
   *
   * This payload carried DisplayName, email and phone and nothing else. The
   * `Addresses: [...]` further up is the XERO shape, so it was easy to read
   * this file and assume the address was handled; QuickBooks never received
   * one. An invoice with no billing address is not much use to whoever has to
   * post it.
   *
   * QuickBooks wants a structured BillAddr. We hold the address as a single
   * free-text field, and Line1 is the one part it is always safe to put it in
   * — splitting a UK address on commas guesses wrongly more often than not.
   */
  const newCustomer = {
    DisplayName: displayName,
    PrimaryEmailAddr: client.email ? { Address: client.email } : undefined,
    PrimaryPhone: client.phone ? { FreeFormNumber: client.phone } : undefined,
    ...(client.address ? { BillAddr: { Line1: client.address } } : {}),
  };

  console.log('Creating customer with payload:', JSON.stringify(newCustomer));

  try {
    const createResponse = await fetch(`${QUICKBOOKS_BASE_URL}/v3/company/${realmId}/customer`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(newCustomer),
    });

    console.log('Create response status:', createResponse.status);

    if (createResponse.ok) {
      const createResult = await createResponse.json();
      console.log('Created customer:', createResult.Customer?.Id);
      return createResult.Customer?.Id || null;
    }

    // Log the error but don't throw - let caller handle retry
    const errorText = await createResponse.text();
    console.error('QuickBooks customer creation failed:', createResponse.status, errorText);

    // Parse the QuickBooks Fault so we can (a) retry on duplicate names and
    // (b) surface the REAL error for anything else instead of swallowing it.
    let qbMessage = errorText;
    let qbCode = '';
    let qbDetail = '';
    try {
      const fault = JSON.parse(errorText)?.Fault?.Error?.[0];
      qbMessage = fault?.Message || errorText;
      qbCode = fault?.code ? String(fault.code) : '';
      qbDetail = fault?.Detail || '';
      console.log('QuickBooks error message:', qbCode, qbMessage, qbDetail);

      // Duplicate name (code 6240) — return null so the caller retries with a unique name
      if (qbMessage.includes('Duplicate') || qbMessage.includes('already exists') || qbCode === '6240') {
        console.log('Duplicate name detected, will retry with unique suffix');
        return null;
      }
    } catch {
      // Error text wasn't JSON — fall through and surface the raw text
    }

    // Non-duplicate failure: surface QuickBooks' actual fault instead of the
    // generic "may already exist / configuration issue" message. (ELE-1009 / QB sync)
    throw new Error(
      `QuickBooks rejected the customer create [HTTP ${createResponse.status}${qbCode ? `, code ${qbCode}` : ''}]: ${qbMessage}${qbDetail ? ` — ${qbDetail}` : ''}`
    );
  } catch (fetchError) {
    // Re-throw our explicit QB fault; only swallow genuine network/fetch errors.
    if (fetchError instanceof Error && fetchError.message.startsWith('QuickBooks rejected')) {
      throw fetchError;
    }
    console.error('Customer creation fetch error:', fetchError);
    return null;
  }
}

async function syncToSage(
  accessToken: string,
  resourceOwnerId: string,
  invoice: InvoiceData
): Promise<SyncResult> {
  console.log('=== syncToSage START ===');
  console.log('Resource Owner ID:', resourceOwnerId);

  if (!resourceOwnerId) {
    throw new Error(
      'Sage resource_owner_id (X-Site) is required. Please reconnect your Sage account.'
    );
  }

  // Find or create contact
  const contactId = await findOrCreateSageContact(accessToken, resourceOwnerId, invoice.client);
  console.log('Contact ID:', contactId);

  // Distribute overhead, profit AND any invoice-level discount proportionally
  // into the line prices. Providers recompute their invoice total from the
  // lines, so the lines must sum to the actual net — before ELE-1343 a fixed
  // discount never reached the provider and re-syncs pushed the undiscounted
  // total back.
  const netTarget = (invoice.total || 0) - (invoice.vatAmount || 0);

  // ELE-1575 — same correction as Xero. Sage has no line-amount override, so
  // the reconciled per-unit net is what has to be right here.
  const netLines = buildNetLines(invoice.items, netTarget);
  assertLinesReconcile(netLines, netTarget, 'Sage');

  const lineItems: any[] = netLines.map((line) => ({
    description: line.description,
    quantity: String(line.quantity),
    unit_price: String(line.unitAmount),
    tax_rate_id: invoice.vatAmount > 0 ? 'GB_STANDARD' : 'GB_EXEMPT',
  }));

  // Create the invoice
  const sageInvoice = {
    contact_id: contactId,
    date: invoice.date?.split('T')[0],
    due_date: invoice.dueDate?.split('T')[0],
    reference: invoice.invoiceNumber,
    invoice_lines: lineItems,
    notes: invoice.notes,
  };

  console.log('Creating Sage invoice:', JSON.stringify(sageInvoice));

  const response = await fetch('https://api.accounting.sage.com/v3.1/sales_invoices', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Site': resourceOwnerId, // REQUIRED for all Sage API requests
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ sales_invoice: sageInvoice }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Sage invoice creation failed:', response.status, errorText);
    throw new ExternalAPIError('Sage', { status: response.status, error: errorText });
  }

  const result = await response.json();
  console.log('Sage invoice created:', result);
  return {
    invoiceId: result.id || result.$key,
  };
}

async function findOrCreateSageContact(
  accessToken: string,
  resourceOwnerId: string,
  client: InvoiceData['client']
): Promise<string> {
  console.log('=== findOrCreateSageContact START ===');
  console.log('Client name:', client.name);

  // Search for existing contact - X-Site header is REQUIRED
  const searchResponse = await fetch(
    `https://api.accounting.sage.com/v3.1/contacts?search=${encodeURIComponent(client.name)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Site': resourceOwnerId,
        Accept: 'application/json',
      },
    }
  );

  console.log('Contact search response:', searchResponse.status);

  if (searchResponse.ok) {
    const searchResult = await searchResponse.json();
    console.log('Contact search result:', JSON.stringify(searchResult).substring(0, 500));
    if (searchResult.$items?.length > 0) {
      const existingId = searchResult.$items[0].id || searchResult.$items[0].$key;
      console.log('Found existing contact:', existingId);
      return existingId;
    }
  } else {
    const errorText = await searchResponse.text();
    console.warn('Contact search failed:', searchResponse.status, errorText);
  }

  // Create new contact
  console.log('Creating new Sage contact...');
  const newContact = {
    name: client.name,
    contact_type_ids: ['CUSTOMER'],
    email: client.email,
    telephone: client.phone,
    main_address: client.address ? { address_line_1: client.address } : undefined,
  };

  const createResponse = await fetch('https://api.accounting.sage.com/v3.1/contacts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Site': resourceOwnerId, // REQUIRED for all Sage API requests
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ contact: newContact }),
  });

  console.log('Contact create response:', createResponse.status);

  if (!createResponse.ok) {
    const errorText = await createResponse.text();
    console.error('Sage contact creation failed:', createResponse.status, errorText);
    throw new ExternalAPIError('Sage', { error: `Failed to create contact: ${errorText}` });
  }

  const createResult = await createResponse.json();
  const newId = createResult.id || createResult.$key;
  console.log('Created new contact:', newId);
  return newId;
}

async function syncToFreshBooks(
  accessToken: string,
  accountId: string,
  invoice: InvoiceData
): Promise<SyncResult> {
  // Find or create client
  const clientId = await findOrCreateFBClient(accessToken, accountId, invoice.client);

  // Format line items for FreshBooks
  const lineItems = invoice.items.map((item) => ({
    name: item.description,
    description: item.description,
    qty: item.quantity,
    unit_cost: { amount: String(item.unitPrice), code: invoice.currency },
    taxName1: invoice.vatAmount > 0 ? 'VAT' : undefined,
    taxAmount1: invoice.vatAmount > 0 ? 20 : undefined,
  }));

  // Create the invoice
  const fbInvoice = {
    customerid: clientId,
    create_date: invoice.date?.split('T')[0],
    due_offset_days: 30,
    invoice_number: invoice.invoiceNumber,
    lines: lineItems,
    notes: invoice.notes,
  };

  const response = await fetch(
    `https://api.freshbooks.com/accounting/account/${accountId}/invoices/invoices`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ invoice: fbInvoice }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('FreshBooks invoice creation failed:', errorText);
    throw new ExternalAPIError('FreshBooks', { status: response.status, error: errorText });
  }

  const result = await response.json();
  const createdInvoice = result.response?.result?.invoice;

  if (!createdInvoice?.id) {
    throw new ExternalAPIError('FreshBooks', { error: 'No invoice ID returned' });
  }

  return {
    invoiceId: String(createdInvoice.id),
  };
}

async function findOrCreateFBClient(
  accessToken: string,
  accountId: string,
  client: InvoiceData['client']
): Promise<string> {
  // Search for existing client
  const searchResponse = await fetch(
    `https://api.freshbooks.com/accounting/account/${accountId}/users/clients?search[email]=${encodeURIComponent(client.email || '')}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    }
  );

  if (searchResponse.ok) {
    const searchResult = await searchResponse.json();
    if (searchResult.response?.result?.clients?.length > 0) {
      return String(searchResult.response.result.clients[0].id);
    }
  }

  // Create new client
  const newClient = {
    organization: client.name,
    email: client.email,
    mob_phone: client.phone,
  };

  const createResponse = await fetch(
    `https://api.freshbooks.com/accounting/account/${accountId}/users/clients`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ client: newClient }),
    }
  );

  if (!createResponse.ok) {
    const errorText = await createResponse.text();
    console.error('FreshBooks client creation failed:', errorText);
    throw new ExternalAPIError('FreshBooks', { error: 'Failed to create client' });
  }

  const createResult = await createResponse.json();
  return String(createResult.response?.result?.client?.id);
}
