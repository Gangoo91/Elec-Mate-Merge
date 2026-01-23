/**
 * Accounting Invoice Sync
 * Syncs an invoice to connected accounting software
 * Currently focused on Xero (Phase 1)
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError, ExternalAPIError } from '../_shared/errors.ts';
import { decryptToken, encryptToken } from '../_shared/encryption.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';

const XERO_CLIENT_ID = Deno.env.get('XERO_CLIENT_ID');
const XERO_CLIENT_SECRET = Deno.env.get('XERO_CLIENT_SECRET');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

type AccountingProvider = 'xero' | 'sage' | 'quickbooks' | 'freshbooks';

interface InvoiceData {
  id: string;
  invoice_number: string;
  invoice_date: string;
  invoice_due_date: string;
  client_data: any;
  line_items: any[];
  subtotal: number;
  vat_amount: number;
  total: number;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { invoiceId, provider = 'xero', userId: internalUserId } = await req.json();

    if (!invoiceId) {
      throw new ValidationError('Invoice ID required');
    }

    let userId: string;

    // Support both user auth (from frontend) and internal calls (from other edge functions)
    const authHeader = req.headers.get('Authorization');

    if (authHeader) {
      // Frontend call - authenticate user
      const supabaseAuth = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_ANON_KEY')!,
        { global: { headers: { Authorization: authHeader } } }
      );

      const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();
      if (authError || !user) {
        throw new ValidationError('Authentication required');
      }
      userId = user.id;
    } else if (internalUserId) {
      // Internal call from another edge function (e.g., stripe-connect-webhook)
      // Verify the invoice belongs to this user
      userId = internalUserId;
      console.log(`Internal sync call for user ${userId}`);
    } else {
      throw new ValidationError('Authorization header or userId required');
    }

    // Use service role for database operations
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Get invoice data
    const { data: invoice, error: invoiceError } = await supabase
      .from('quotes')
      .select('*')
      .eq('id', invoiceId)
      .eq('user_id', userId)
      .single();

    if (invoiceError || !invoice) {
      throw new ValidationError('Invoice not found');
    }

    // Get accounting tokens
    const { data: tokenData, error: tokenError } = await supabase
      .from('accounting_oauth_tokens')
      .select('*')
      .eq('user_id', userId)
      .eq('provider', provider)
      .single();

    if (tokenError || !tokenData) {
      throw new ValidationError(`${provider} not connected. Please connect your account first.`);
    }

    // Check if token needs refresh
    let accessToken = await decryptToken(tokenData.encrypted_access_token);
    const tokenExpiry = new Date(tokenData.token_expires_at);

    if (tokenExpiry < new Date()) {
      // Token expired, refresh it
      if (!tokenData.encrypted_refresh_token) {
        throw new ValidationError(`${provider} session expired. Please reconnect your account.`);
      }

      const refreshToken = await decryptToken(tokenData.encrypted_refresh_token);
      const newTokens = await refreshAccessToken(provider, refreshToken);

      accessToken = newTokens.access_token;

      // Update stored tokens
      const encryptedAccessToken = await encryptToken(newTokens.access_token);
      const encryptedRefreshToken = newTokens.refresh_token
        ? await encryptToken(newTokens.refresh_token)
        : tokenData.encrypted_refresh_token;

      await supabase
        .from('accounting_oauth_tokens')
        .update({
          encrypted_access_token: encryptedAccessToken,
          encrypted_refresh_token: encryptedRefreshToken,
          token_expires_at: new Date(Date.now() + newTokens.expires_in * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', tokenData.id);
    }

    // Sync to accounting provider
    let externalInvoiceId: string;

    switch (provider) {
      case 'xero':
        externalInvoiceId = await withRetry(
          () => withTimeout(
            syncToXero(accessToken, tokenData.tenant_id!, invoice),
            Timeouts.STANDARD,
            'Xero invoice sync'
          ),
          RetryPresets.STANDARD
        );
        break;

      // TODO: Add other providers in future phases
      default:
        throw new ValidationError(`Provider "${provider}" sync not yet implemented`);
    }

    // Record sync in database
    await supabase
      .from('accounting_invoice_syncs')
      .upsert({
        user_id: userId,
        invoice_id: invoiceId,
        provider,
        external_invoice_id: externalInvoiceId,
        status: 'synced',
        synced_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'invoice_id,provider',
      });

    // Update integration last sync time
    const { data: profile } = await supabase
      .from('company_profiles')
      .select('accounting_integrations')
      .eq('user_id', userId)
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
        .eq('user_id', userId);
    }

    console.log(`Invoice synced to ${provider}`, {
      user_id: userId,
      invoice_id: invoiceId,
      external_id: externalInvoiceId,
    });

    return new Response(
      JSON.stringify({
        success: true,
        externalInvoiceId,
        provider,
        message: `Invoice synced to ${provider}`,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return handleError(error);
  }
});

async function refreshAccessToken(provider: AccountingProvider, refreshToken: string): Promise<{
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}> {
  switch (provider) {
    case 'xero': {
      const response = await fetch('https://identity.xero.com/connect/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${XERO_CLIENT_ID}:${XERO_CLIENT_SECRET}`)}`,
        },
        body: new URLSearchParams({
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }),
      });

      if (!response.ok) {
        throw new ExternalAPIError('Xero Token Refresh', await response.text());
      }

      return await response.json();
    }

    // TODO: Add other providers
    default:
      throw new ValidationError(`Token refresh not implemented for ${provider}`);
  }
}

async function syncToXero(accessToken: string, tenantId: string, invoice: InvoiceData): Promise<string> {
  // Parse client data
  const clientData = typeof invoice.client_data === 'string'
    ? JSON.parse(invoice.client_data)
    : invoice.client_data;

  // Parse line items
  const lineItems = Array.isArray(invoice.line_items)
    ? invoice.line_items
    : (typeof invoice.line_items === 'string' ? JSON.parse(invoice.line_items) : []);

  // First, ensure the contact exists or create it
  const contactId = await ensureXeroContact(accessToken, tenantId, clientData);

  // Map line items to Xero format
  const xeroLineItems = lineItems.map((item: any) => ({
    Description: item.description || item.name || 'Service',
    Quantity: item.quantity || 1,
    UnitAmount: item.unitPrice || item.unit_price || item.price || 0,
    AccountCode: '200', // Default sales account
    TaxType: item.vatRate > 0 ? 'OUTPUT2' : 'NONE', // UK VAT
  }));

  // Create invoice in Xero
  const xeroInvoice = {
    Type: 'ACCREC', // Accounts Receivable (sales invoice)
    Contact: { ContactID: contactId },
    Date: invoice.invoice_date?.split('T')[0] || new Date().toISOString().split('T')[0],
    DueDate: invoice.invoice_due_date?.split('T')[0] || new Date().toISOString().split('T')[0],
    Reference: invoice.invoice_number,
    LineAmountTypes: 'Exclusive', // Amounts are exclusive of tax
    LineItems: xeroLineItems,
    Status: 'AUTHORISED', // Ready to send
    CurrencyCode: 'GBP',
  };

  const response = await fetch('https://api.xero.com/api.xro/2.0/Invoices', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Xero-tenant-id': tenantId,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ Invoices: [xeroInvoice] }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Xero invoice creation failed:', errorText);
    throw new ExternalAPIError('Xero Invoice Creation', errorText);
  }

  const result = await response.json();
  const createdInvoice = result.Invoices?.[0];

  if (!createdInvoice?.InvoiceID) {
    throw new ExternalAPIError('Xero Invoice Creation', 'No invoice ID returned');
  }

  return createdInvoice.InvoiceID;
}

async function ensureXeroContact(accessToken: string, tenantId: string, clientData: any): Promise<string> {
  const clientName = clientData?.name || clientData?.company || 'Unknown Client';
  const clientEmail = clientData?.email;

  // Search for existing contact by name
  const searchResponse = await fetch(
    `https://api.xero.com/api.xro/2.0/Contacts?where=Name=="${encodeURIComponent(clientName)}"`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Xero-tenant-id': tenantId,
        'Accept': 'application/json',
      },
    }
  );

  if (searchResponse.ok) {
    const searchResult = await searchResponse.json();
    if (searchResult.Contacts?.length > 0) {
      return searchResult.Contacts[0].ContactID;
    }
  }

  // Contact doesn't exist, create it
  const newContact = {
    Name: clientName,
    EmailAddress: clientEmail,
    Phones: clientData?.phone ? [{ PhoneType: 'DEFAULT', PhoneNumber: clientData.phone }] : undefined,
    Addresses: clientData?.address ? [{
      AddressType: 'STREET',
      AddressLine1: clientData.address,
      City: clientData.city || '',
      PostalCode: clientData.postcode || '',
      Country: 'United Kingdom',
    }] : undefined,
  };

  const createResponse = await fetch('https://api.xero.com/api.xro/2.0/Contacts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Xero-tenant-id': tenantId,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ Contacts: [newContact] }),
  });

  if (!createResponse.ok) {
    const errorText = await createResponse.text();
    console.error('Xero contact creation failed:', errorText);
    throw new ExternalAPIError('Xero Contact Creation', errorText);
  }

  const createResult = await createResponse.json();
  const createdContact = createResult.Contacts?.[0];

  if (!createdContact?.ContactID) {
    throw new ExternalAPIError('Xero Contact Creation', 'No contact ID returned');
  }

  return createdContact.ContactID;
}
