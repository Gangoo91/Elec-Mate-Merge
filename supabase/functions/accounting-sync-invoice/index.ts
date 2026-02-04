/**
 * Accounting Invoice Sync
 * Syncs invoices to connected accounting software (Xero, QuickBooks, Sage, FreshBooks)
 */

import { corsHeaders } from '../_shared/cors.ts';
import { captureException } from '../_shared/sentry.ts';
import { createClient } from '../_shared/deps.ts';
import { handleError, ValidationError, ExternalAPIError } from '../_shared/errors.ts';
import { decryptToken, encryptToken } from '../_shared/encryption.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

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
const QUICKBOOKS_BASE_URL = QUICKBOOKS_ENVIRONMENT === 'production'
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
  return new Response(
    JSON.stringify({ success: false, error, detail, httpStatus }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
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
    try {
      const body = await req.json();
      invoiceId = body.invoiceId;
      provider = body.provider;
    } catch (parseErr) {
      return errorResponse('Invalid JSON body', String(parseErr), 400);
    }

    if (!invoiceId || !provider) {
      return errorResponse('Invoice ID and provider are required', undefined, 400);
    }

    // Validate UUID format - catch "undefined" strings and invalid UUIDs
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(invoiceId)) {
      return errorResponse('Invalid invoice ID format', `Received: "${invoiceId}" - expected UUID format`, 400);
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
      return errorResponse(`No ${provider} connection found. Please connect your account first.`, tokenError?.message, 400);
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
        return errorResponse(`ENCRYPTION_KEY has wrong length: ${encKey.length} (expected 64)`, undefined, 500);
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
      return errorResponse('Token decryption failed', `${String(decryptError)}. Session may be expired. Please reconnect your accounting software.`, 500);
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
        return errorResponse('Token expired and no refresh token available. Please reconnect.', undefined, 401);
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
      const errorMsg = syncError instanceof Error ? syncError.message : String(syncError);
      const errorStack = syncError instanceof Error ? syncError.stack : undefined;

      // Extract more details from ExternalAPIError
      let detailMsg = errorMsg;
      if (syncError instanceof ExternalAPIError && syncError.details) {
        const details = syncError.details;
        if (details.error) {
          // Try to parse QuickBooks error response
          try {
            const qbError = typeof details.error === 'string' ? JSON.parse(details.error) : details.error;
            const faultError = qbError?.Fault?.Error?.[0];
            if (faultError) {
              detailMsg = `${provider} Error: ${faultError.Message || faultError.Detail || errorMsg}`;
            }
          } catch {
            detailMsg = `${provider} Error: ${details.error}`;
          }
        }
        console.log('Detailed error:', detailMsg);
      }

      return errorResponse(`Failed to sync to ${provider}`, `${detailMsg}\n\nStack: ${errorStack}`, 500);
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
      requestMethod: req.method
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

async function refreshAccessToken(provider: AccountingProvider, refreshToken: string): Promise<RefreshResult> {
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
  }>;
  subtotal: number;
  overhead: number;
  profit: number;
  vatAmount: number;
  total: number;
  notes?: string;
  currency: string;
  isPaid?: boolean;
  paidAt?: string;
}

interface SyncResult {
  invoiceId: string;
  invoiceUrl?: string;
}

async function syncToXero(
  accessToken: string,
  tenantId: string,
  invoice: InvoiceData
): Promise<SyncResult> {
  // First, find or create the contact
  const contactId = await findOrCreateXeroContact(accessToken, tenantId, invoice.client);

  // Calculate markup factor to distribute overhead/profit proportionally
  const totalMarkup = (invoice.overhead || 0) + (invoice.profit || 0);
  const markupFactor = invoice.subtotal > 0 ? (invoice.subtotal + totalMarkup) / invoice.subtotal : 1;

  // Format line items for Xero - distribute overhead/profit into each line item
  const lineItems: any[] = invoice.items.map((item) => ({
    Description: item.description,
    Quantity: item.quantity,
    UnitAmount: Math.round(item.unitPrice * markupFactor * 100) / 100, // Apply markup proportionally
    AccountCode: '200', // Sales account - user may need to configure this
    TaxType: invoice.vatAmount > 0 ? 'OUTPUT2' : 'NONE', // 20% VAT or no VAT
  }));

  // Create the invoice
  const xeroInvoice = {
    Type: 'ACCREC', // Accounts Receivable invoice
    Contact: { ContactID: contactId },
    Date: invoice.date?.split('T')[0] || new Date().toISOString().split('T')[0],
    DueDate: invoice.dueDate?.split('T')[0],
    Reference: invoice.invoiceNumber,
    InvoiceNumber: invoice.invoiceNumber,
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

  // If invoice is paid, create a payment in Xero
  if (invoice.isPaid) {
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
    console.warn('Invoice created but payment marking failed - invoice will show as unpaid in Xero');
  }
}

async function getXeroBankAccount(accessToken: string, tenantId: string): Promise<string> {
  // Get bank accounts from Xero
  const response = await fetch(
    'https://api.xero.com/api.xro/2.0/Accounts?where=Type=="BANK"',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'xero-tenant-id': tenantId,
        Accept: 'application/json',
      },
    }
  );

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
    Phones: client.phone
      ? [{ PhoneType: 'DEFAULT', PhoneNumber: client.phone }]
      : [],
    Addresses: client.address
      ? [{ AddressType: 'POBOX', AddressLine1: client.address }]
      : [],
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

  // Calculate markup factor to distribute overhead/profit proportionally
  const totalMarkup = (invoice.overhead || 0) + (invoice.profit || 0);
  const markupFactor = invoice.subtotal > 0 ? (invoice.subtotal + totalMarkup) / invoice.subtotal : 1;

  // Format line items for QuickBooks - distribute overhead/profit into each line item
  // MUST include ItemRef or amounts are ignored!
  const lineItems: any[] = invoice.items.map((item, index) => {
    const adjustedUnitPrice = Math.round(item.unitPrice * markupFactor * 100) / 100;
    return {
      Id: String(index + 1),
      LineNum: index + 1,
      Description: item.description,
      Amount: item.quantity * adjustedUnitPrice,
      DetailType: 'SalesItemLineDetail',
      SalesItemLineDetail: {
        ItemRef: {
          value: serviceItem.id,
          name: serviceItem.name,
        },
        Qty: item.quantity,
        UnitPrice: adjustedUnitPrice,
      },
    };
  });

  // Create the invoice
  const qbInvoice = {
    CustomerRef: { value: customerId },
    DocNumber: invoice.invoiceNumber,
    TxnDate: invoice.date?.split('T')[0],
    DueDate: invoice.dueDate?.split('T')[0],
    Line: lineItems,
    CustomerMemo: invoice.notes ? { value: invoice.notes } : undefined,
  };

  const response = await fetch(
    `${QUICKBOOKS_BASE_URL}/v3/company/${realmId}/invoice`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(qbInvoice),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('QuickBooks invoice creation failed:', errorText);
    throw new ExternalAPIError('QuickBooks', { status: response.status, error: errorText });
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
      console.warn('Invoice created but payment marking failed - invoice will show as unpaid in QuickBooks');
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

  const response = await fetch(
    `${QUICKBOOKS_BASE_URL}/v3/company/${realmId}/payment`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(qbPayment),
    }
  );

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
  const query = `SELECT * FROM Item WHERE Type = 'Service' MAXRESULTS 10`;
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
      // Prefer an item named "Services" or "Service" if it exists
      const preferredItem = items.find((item: any) =>
        item.Name?.toLowerCase() === 'services' ||
        item.Name?.toLowerCase() === 'service'
      );

      if (preferredItem) {
        console.log('Found preferred service item:', preferredItem.Id, preferredItem.Name);
        return { id: String(preferredItem.Id), name: preferredItem.Name };
      }

      // Otherwise return the first service item
      console.log('Using first service item:', items[0].Id, items[0].Name);
      return { id: String(items[0].Id), name: items[0].Name };
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

  const createResponse = await fetch(
    `${QUICKBOOKS_BASE_URL}/v3/company/${realmId}/item`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(newItem),
    }
  );

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
 * Get an Income account from QuickBooks for creating service items
 */
async function getQBIncomeAccount(
  accessToken: string,
  realmId: string
): Promise<string> {
  // Query for Income accounts
  const query = `SELECT * FROM Account WHERE AccountType = 'Income' MAXRESULTS 5`;
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
      // Prefer "Sales" or "Services" income account
      const preferredAccount = accounts.find((acc: any) =>
        acc.Name?.toLowerCase().includes('sales') ||
        acc.Name?.toLowerCase().includes('service') ||
        acc.Name?.toLowerCase().includes('income')
      );

      if (preferredAccount) {
        console.log('Using income account:', preferredAccount.Id, preferredAccount.Name);
        return String(preferredAccount.Id);
      }

      console.log('Using first income account:', accounts[0].Id, accounts[0].Name);
      return String(accounts[0].Id);
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
          console.log('Found existing customer by email:', emailSearchResult.QueryResponse.Customer[0].Id);
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
  throw new Error(`Failed to create customer "${sanitizedName}" in QuickBooks. The name may already exist with different details, or there may be a QuickBooks configuration issue.`);
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
  const newCustomer = {
    DisplayName: displayName,
    PrimaryEmailAddr: client.email ? { Address: client.email } : undefined,
    PrimaryPhone: client.phone ? { FreeFormNumber: client.phone } : undefined,
  };

  console.log('Creating customer with payload:', JSON.stringify(newCustomer));

  try {
    const createResponse = await fetch(
      `${QUICKBOOKS_BASE_URL}/v3/company/${realmId}/customer`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(newCustomer),
      }
    );

    console.log('Create response status:', createResponse.status);

    if (createResponse.ok) {
      const createResult = await createResponse.json();
      console.log('Created customer:', createResult.Customer?.Id);
      return createResult.Customer?.Id || null;
    }

    // Log the error but don't throw - let caller handle retry
    const errorText = await createResponse.text();
    console.error('QuickBooks customer creation failed:', createResponse.status, errorText);

    // Parse error to check if it's a duplicate name issue
    try {
      const errorJson = JSON.parse(errorText);
      const errorMessage = errorJson?.Fault?.Error?.[0]?.Message || '';
      console.log('QuickBooks error message:', errorMessage);

      // If it's a duplicate name error, return null to allow retry with unique name
      if (errorMessage.includes('Duplicate') || errorMessage.includes('already exists')) {
        console.log('Duplicate name detected, will retry with unique suffix');
        return null;
      }
    } catch {
      // Error text wasn't JSON, continue
    }

    return null;
  } catch (fetchError) {
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
    throw new Error('Sage resource_owner_id (X-Site) is required. Please reconnect your Sage account.');
  }

  // Find or create contact
  const contactId = await findOrCreateSageContact(accessToken, resourceOwnerId, invoice.client);
  console.log('Contact ID:', contactId);

  // Calculate markup factor to distribute overhead/profit proportionally
  const totalMarkup = (invoice.overhead || 0) + (invoice.profit || 0);
  const markupFactor = invoice.subtotal > 0 ? (invoice.subtotal + totalMarkup) / invoice.subtotal : 1;

  // Format line items for Sage - distribute overhead/profit into each line item
  const lineItems: any[] = invoice.items.map((item) => ({
    description: item.description,
    quantity: String(item.quantity),
    unit_price: String(Math.round(item.unitPrice * markupFactor * 100) / 100), // Apply markup proportionally
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
    main_address: client.address
      ? { address_line_1: client.address }
      : undefined,
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
