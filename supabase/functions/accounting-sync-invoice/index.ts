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

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new ValidationError('Authorization header required');
    }

    const supabaseAuth = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();
    if (authError || !user) {
      throw new ValidationError('Authentication required');
    }

    // Parse request body
    const { invoiceId, provider } = await req.json();

    if (!invoiceId) {
      throw new ValidationError('Invoice ID is required');
    }

    if (!provider) {
      throw new ValidationError('Provider is required');
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
      throw new ValidationError('Invoice not found or access denied');
    }

    // Get encrypted tokens
    const { data: tokenData, error: tokenError } = await supabase
      .from('accounting_oauth_tokens')
      .select('*')
      .eq('user_id', user.id)
      .eq('provider', provider)
      .single();

    if (tokenError || !tokenData) {
      throw new ValidationError(`No ${provider} connection found. Please connect your account first.`);
    }

    // Decrypt tokens
    let accessToken: string;
    let refreshToken: string | undefined;

    try {
      accessToken = await decryptToken(tokenData.encrypted_access_token);
      if (tokenData.encrypted_refresh_token) {
        refreshToken = await decryptToken(tokenData.encrypted_refresh_token);
      }
    } catch (decryptError) {
      console.error('Token decryption failed:', decryptError);
      throw new ValidationError('Session expired. Please reconnect your accounting software.');
    }

    const tenantId = tokenData.tenant_id;

    // Check if token is expired and needs refresh
    const isExpired = new Date(tokenData.token_expires_at) < new Date();
    if (isExpired && refreshToken) {
      console.log(`Token expired for ${provider}, refreshing...`);
      const refreshed = await refreshAccessToken(provider, refreshToken);
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
    } else if (isExpired) {
      throw new ValidationError('Session expired. Please reconnect your accounting software.');
    }

    // Prepare invoice data for provider
    const invoiceData = {
      invoiceNumber: invoice.invoice_number,
      date: invoice.invoice_date,
      dueDate: invoice.invoice_due_date,
      client: invoice.client_data as any,
      items: invoice.items as any[],
      subtotal: parseFloat(String(invoice.subtotal)),
      vatAmount: parseFloat(String(invoice.vat_amount)),
      total: parseFloat(String(invoice.total)),
      notes: invoice.notes,
      currency: 'GBP',
      isPaid: invoice.invoice_status === 'paid',
      paidAt: invoice.invoice_paid_at,
    };

    // Sync to provider
    let externalInvoiceId: string;
    let externalInvoiceUrl: string | undefined;

    switch (provider as AccountingProvider) {
      case 'xero':
        const xeroResult = await withRetry(
          () => withTimeout(
            syncToXero(accessToken, tenantId, invoiceData),
            Timeouts.STANDARD,
            'Xero invoice sync'
          ),
          RetryPresets.STANDARD
        );
        externalInvoiceId = xeroResult.invoiceId;
        externalInvoiceUrl = xeroResult.invoiceUrl;
        break;

      case 'quickbooks':
        const qbResult = await withRetry(
          () => withTimeout(
            syncToQuickBooks(accessToken, tenantId, invoiceData),
            Timeouts.STANDARD,
            'QuickBooks invoice sync'
          ),
          RetryPresets.STANDARD
        );
        externalInvoiceId = qbResult.invoiceId;
        externalInvoiceUrl = qbResult.invoiceUrl;
        break;

      case 'sage':
        const sageResult = await withRetry(
          () => withTimeout(
            syncToSage(accessToken, invoiceData),
            Timeouts.STANDARD,
            'Sage invoice sync'
          ),
          RetryPresets.STANDARD
        );
        externalInvoiceId = sageResult.invoiceId;
        break;

      case 'freshbooks':
        const fbResult = await withRetry(
          () => withTimeout(
            syncToFreshBooks(accessToken, tenantId, invoiceData),
            Timeouts.STANDARD,
            'FreshBooks invoice sync'
          ),
          RetryPresets.STANDARD
        );
        externalInvoiceId = fbResult.invoiceId;
        break;

      default:
        throw new ValidationError(`Provider "${provider}" not supported`);
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
    console.error('Invoice sync error:', error);
    await captureException(error, {
      functionName: 'accounting-sync-invoice',
      requestUrl: req.url,
      requestMethod: req.method
    });
    return handleError(error);
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

  // Format line items for Xero
  const lineItems = invoice.items.map((item) => ({
    Description: item.description,
    Quantity: item.quantity,
    UnitAmount: item.unitPrice,
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
  // First, find or create the customer
  const customerId = await findOrCreateQBCustomer(accessToken, realmId, invoice.client);

  // Format line items for QuickBooks
  const lineItems = invoice.items.map((item, index) => ({
    Id: String(index + 1),
    LineNum: index + 1,
    Description: item.description,
    Amount: item.quantity * item.unitPrice,
    DetailType: 'SalesItemLineDetail',
    SalesItemLineDetail: {
      Qty: item.quantity,
      UnitPrice: item.unitPrice,
    },
  }));

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

  return {
    invoiceId: createdInvoice.Id,
    invoiceUrl: `https://app.qbo.intuit.com/app/invoice?txnId=${createdInvoice.Id}`,
  };
}

async function findOrCreateQBCustomer(
  accessToken: string,
  realmId: string,
  client: InvoiceData['client']
): Promise<string> {
  // Search for existing customer
  const query = client.email
    ? `SELECT * FROM Customer WHERE PrimaryEmailAddr = '${client.email}'`
    : `SELECT * FROM Customer WHERE DisplayName = '${client.name.replace(/'/g, "\\'")}'`;

  const searchResponse = await fetch(
    `${QUICKBOOKS_BASE_URL}/v3/company/${realmId}/query?query=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    }
  );

  if (searchResponse.ok) {
    const searchResult = await searchResponse.json();
    if (searchResult.QueryResponse?.Customer?.length > 0) {
      return searchResult.QueryResponse.Customer[0].Id;
    }
  }

  // Create new customer
  const newCustomer = {
    DisplayName: client.name,
    PrimaryEmailAddr: client.email ? { Address: client.email } : undefined,
    PrimaryPhone: client.phone ? { FreeFormNumber: client.phone } : undefined,
  };

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

  if (!createResponse.ok) {
    const errorText = await createResponse.text();
    console.error('QuickBooks customer creation failed:', errorText);
    throw new ExternalAPIError('QuickBooks', { error: 'Failed to create customer' });
  }

  const createResult = await createResponse.json();
  return createResult.Customer.Id;
}

async function syncToSage(accessToken: string, invoice: InvoiceData): Promise<SyncResult> {
  // Find or create contact
  const contactId = await findOrCreateSageContact(accessToken, invoice.client);

  // Format line items for Sage
  const lineItems = invoice.items.map((item) => ({
    description: item.description,
    quantity: String(item.quantity),
    unit_price: String(item.unitPrice),
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

  const response = await fetch('https://api.accounting.sage.com/v3.1/sales_invoices', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ sales_invoice: sageInvoice }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Sage invoice creation failed:', errorText);
    throw new ExternalAPIError('Sage', { status: response.status, error: errorText });
  }

  const result = await response.json();
  return {
    invoiceId: result.id || result.$key,
  };
}

async function findOrCreateSageContact(
  accessToken: string,
  client: InvoiceData['client']
): Promise<string> {
  // Search for existing contact
  const searchResponse = await fetch(
    `https://api.accounting.sage.com/v3.1/contacts?search=${encodeURIComponent(client.name)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    }
  );

  if (searchResponse.ok) {
    const searchResult = await searchResponse.json();
    if (searchResult.$items?.length > 0) {
      return searchResult.$items[0].id || searchResult.$items[0].$key;
    }
  }

  // Create new contact
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
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ contact: newContact }),
  });

  if (!createResponse.ok) {
    const errorText = await createResponse.text();
    console.error('Sage contact creation failed:', errorText);
    throw new ExternalAPIError('Sage', { error: 'Failed to create contact' });
  }

  const createResult = await createResponse.json();
  return createResult.id || createResult.$key;
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
