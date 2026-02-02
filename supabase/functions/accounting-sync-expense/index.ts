/**
 * Accounting Expense Sync
 * Syncs expenses to connected accounting software (Xero, QuickBooks)
 * as bank transactions (SPEND) or purchases
 */

import { corsHeaders } from '../_shared/cors.ts';
import { captureException } from '../_shared/sentry.ts';
import { createClient } from '../_shared/deps.ts';
import { handleError, ValidationError, ExternalAPIError } from '../_shared/errors.ts';
import { decryptToken, encryptToken } from '../_shared/encryption.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

// Provider credentials for token refresh
const XERO_CLIENT_ID = Deno.env.get('XERO_CLIENT_ID');
const XERO_CLIENT_SECRET = Deno.env.get('XERO_CLIENT_SECRET');
const QUICKBOOKS_CLIENT_ID = Deno.env.get('QUICKBOOKS_CLIENT_ID');
const QUICKBOOKS_CLIENT_SECRET = Deno.env.get('QUICKBOOKS_CLIENT_SECRET');

// QuickBooks environment
const QUICKBOOKS_ENVIRONMENT = Deno.env.get('QUICKBOOKS_ENVIRONMENT') || 'sandbox';
const QUICKBOOKS_BASE_URL = QUICKBOOKS_ENVIRONMENT === 'production'
  ? 'https://quickbooks.api.intuit.com'
  : 'https://sandbox-quickbooks.api.intuit.com';

type AccountingProvider = 'xero' | 'quickbooks';

// Xero account codes for expense categories
const XERO_ACCOUNT_CODES: Record<string, string> = {
  fuel: '449',        // Motor Vehicle Expenses
  tools: '429',       // Equipment
  ppe: '453',         // Protective Clothing
  materials: '300',   // Cost of Goods Sold
  hotels: '493',      // Travel - Accommodation
  mileage: '449',     // Motor Vehicle Expenses
  training: '404',    // Training Costs
  vehicle: '449',     // Motor Vehicle Expenses
  insurance: '461',   // Insurance
  subscriptions: '489', // Subscriptions
  meals: '493',       // Travel - Meals
  other: '429',       // General Expenses
};

// QuickBooks account types for expense categories
const QUICKBOOKS_ACCOUNT_TYPES: Record<string, string> = {
  fuel: 'Automobile',
  tools: 'Equipment Rental',
  ppe: 'Supplies',
  materials: 'Cost of Goods Sold',
  hotels: 'Travel',
  mileage: 'Automobile',
  training: 'Training',
  vehicle: 'Automobile',
  insurance: 'Insurance',
  subscriptions: 'Other Business Expense',
  meals: 'Meals and Entertainment',
  other: 'Other Business Expense',
};

interface ExpenseData {
  id: string;
  category: string;
  amount: number;
  date: string;
  vendor: string | null;
  description: string | null;
  vat_amount: number | null;
  mileage_miles: number | null;
  mileage_from: string | null;
  mileage_to: string | null;
}

interface SyncResult {
  expenseId: string;
  externalExpenseId: string;
  externalUrl?: string;
}

// Helper to return errors as 200 so frontend can read them
function errorResponse(error: string, detail?: string, httpStatus = 400) {
  return new Response(
    JSON.stringify({ success: false, error, detail, httpStatus }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

Deno.serve(async (req: Request) => {
  try {
    console.log('=== ACCOUNTING EXPENSE SYNC START ===');

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
    let expenseIds: string[];
    let provider: string;
    try {
      const body = await req.json();
      // Support both single expense and array of expenses
      if (Array.isArray(body.expenseIds)) {
        expenseIds = body.expenseIds;
      } else if (body.expenseId) {
        expenseIds = [body.expenseId];
      } else {
        return errorResponse('expenseId or expenseIds required', undefined, 400);
      }
      provider = body.provider;
    } catch (parseErr) {
      return errorResponse('Invalid JSON body', String(parseErr), 400);
    }

    if (!expenseIds.length || !provider) {
      return errorResponse('Expense ID(s) and provider are required', undefined, 400);
    }

    // Validate UUID format for all expense IDs
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    for (const expenseId of expenseIds) {
      if (!uuidRegex.test(expenseId)) {
        return errorResponse('Invalid expense ID format', `Received: "${expenseId}" - expected UUID format`, 400);
      }
    }

    console.log(`Syncing ${expenseIds.length} expense(s) to ${provider} for user ${user.id}`);

    // Use service role for database operations
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Get the expenses
    const { data: expenses, error: expenseError } = await supabase
      .from('sole_trader_expenses')
      .select('*')
      .in('id', expenseIds)
      .eq('user_id', user.id);

    if (expenseError) {
      return errorResponse('Error fetching expenses', expenseError.message, 500);
    }

    if (!expenses || expenses.length === 0) {
      return errorResponse('No expenses found or access denied', undefined, 404);
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
      return errorResponse('Token decryption failed', 'Session may be expired. Please reconnect your accounting software.', 500);
    }

    const tenantId = tokenData.tenant_id;
    if (!tenantId) {
      return errorResponse(`No tenant ID found for ${provider}`, undefined, 400);
    }

    // Check if token is expired and needs refresh
    const isExpired = new Date(tokenData.token_expires_at) < new Date();
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

    // Sync each expense
    const results: SyncResult[] = [];
    const errors: { expenseId: string; error: string }[] = [];

    for (const expense of expenses) {
      try {
        const expenseData: ExpenseData = {
          id: expense.id,
          category: expense.category,
          amount: parseFloat(expense.amount),
          date: expense.date,
          vendor: expense.vendor,
          description: expense.description,
          vat_amount: expense.vat_amount ? parseFloat(expense.vat_amount) : null,
          mileage_miles: expense.mileage_miles ? parseFloat(expense.mileage_miles) : null,
          mileage_from: expense.mileage_from,
          mileage_to: expense.mileage_to,
        };

        let result: SyncResult;

        switch (provider as AccountingProvider) {
          case 'xero':
            result = await syncExpenseToXero(accessToken, tenantId, expenseData);
            break;
          case 'quickbooks':
            result = await syncExpenseToQuickBooks(accessToken, tenantId, expenseData);
            break;
          default:
            throw new Error(`Provider "${provider}" not supported for expense sync`);
        }

        results.push(result);

        // Record sync in database
        await supabase
          .from('accounting_expense_syncs')
          .upsert({
            user_id: user.id,
            expense_id: expense.id,
            provider: provider,
            external_expense_id: result.externalExpenseId,
            external_url: result.externalUrl,
            status: 'synced',
            synced_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'expense_id,provider',
          });

        // Update expense to mark as synced
        await supabase
          .from('sole_trader_expenses')
          .update({ synced_to_accounting: true, updated_at: new Date().toISOString() })
          .eq('id', expense.id);

      } catch (syncError) {
        console.error(`Error syncing expense ${expense.id}:`, syncError);
        const errorMsg = syncError instanceof Error ? syncError.message : String(syncError);
        errors.push({ expenseId: expense.id, error: errorMsg });

        // Record error in database
        await supabase
          .from('accounting_expense_syncs')
          .upsert({
            user_id: user.id,
            expense_id: expense.id,
            provider: provider,
            status: 'error',
            error_message: errorMsg,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'expense_id,provider',
          });
      }
    }

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

    console.log(`Synced ${results.length} expenses, ${errors.length} errors`);

    return new Response(
      JSON.stringify({
        success: true,
        synced: results,
        errors: errors,
        message: errors.length > 0
          ? `Synced ${results.length} expense(s) with ${errors.length} error(s)`
          : `Successfully synced ${results.length} expense(s) to ${provider}`,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unhandled error in accounting-sync-expense:', error);
    await captureException(error, {
      functionName: 'accounting-sync-expense',
      requestUrl: req.url,
      requestMethod: req.method
    });
    const errorMsg = error instanceof Error ? error.message : String(error);
    return errorResponse('Unexpected server error', errorMsg, 500);
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

// ============================================
// Xero Expense Sync
// ============================================

async function syncExpenseToXero(
  accessToken: string,
  tenantId: string,
  expense: ExpenseData
): Promise<SyncResult> {
  console.log('=== syncExpenseToXero START ===');
  console.log('Expense:', expense.id, expense.category, expense.amount);

  // Get or create a bank account for the expense
  const bankAccountCode = await getXeroBankAccount(accessToken, tenantId);

  // Build description
  let description = expense.description || getCategoryLabel(expense.category);
  if (expense.mileage_miles && expense.mileage_from && expense.mileage_to) {
    description = `${expense.mileage_miles} miles: ${expense.mileage_from} to ${expense.mileage_to}`;
  }

  // Calculate net amount if VAT is present (Xero expects net + VAT)
  const netAmount = expense.vat_amount
    ? expense.amount - expense.vat_amount
    : expense.amount;

  // Create bank transaction (SPEND type = expense)
  const bankTransaction: any = {
    Type: 'SPEND',
    Contact: {
      Name: expense.vendor || 'Unknown Vendor',
    },
    Date: expense.date?.split('T')[0] || new Date().toISOString().split('T')[0],
    LineItems: [{
      Description: description,
      Quantity: 1,
      UnitAmount: netAmount,  // Net amount (before VAT)
      AccountCode: XERO_ACCOUNT_CODES[expense.category] || '429',
      TaxType: expense.vat_amount ? 'INPUT2' : 'NONE',  // INPUT2 = 20% UK VAT on purchases
      TaxAmount: expense.vat_amount || undefined,  // Explicit VAT amount if known
    }],
    BankAccount: {
      Code: bankAccountCode,
    },
    Reference: `EM-${expense.id.slice(0, 8)}`,
    Status: 'AUTHORISED',
  };

  // If we have explicit VAT amount, set line amount type
  if (expense.vat_amount) {
    bankTransaction.LineAmountTypes = 'Exclusive';  // Amounts are exclusive of tax
  }

  console.log('Creating Xero bank transaction:', JSON.stringify(bankTransaction));

  const response = await fetch('https://api.xero.com/api.xro/2.0/BankTransactions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'xero-tenant-id': tenantId,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ BankTransactions: [bankTransaction] }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Xero bank transaction creation failed:', errorText);
    throw new Error(`Xero API error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  const createdTransaction = result.BankTransactions?.[0];

  if (!createdTransaction?.BankTransactionID) {
    throw new Error('No transaction ID returned from Xero');
  }

  console.log('Xero expense synced:', createdTransaction.BankTransactionID);

  return {
    expenseId: expense.id,
    externalExpenseId: createdTransaction.BankTransactionID,
    externalUrl: `https://go.xero.com/Bank/ViewTransaction.aspx?bankTransactionID=${createdTransaction.BankTransactionID}`,
  };
}

async function getXeroBankAccount(accessToken: string, tenantId: string): Promise<string> {
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
      const activeAccount = data.Accounts.find((a: any) => a.Status === 'ACTIVE');
      if (activeAccount) {
        return activeAccount.Code;
      }
      return data.Accounts[0].Code;
    }
  }

  // Fallback to common default bank account code
  return '090';
}

// ============================================
// QuickBooks Expense Sync
// ============================================

async function syncExpenseToQuickBooks(
  accessToken: string,
  realmId: string,
  expense: ExpenseData
): Promise<SyncResult> {
  console.log('=== syncExpenseToQuickBooks START ===');
  console.log('Expense:', expense.id, expense.category, expense.amount);

  // Get an expense account for this category
  const accountRef = await getOrCreateQBExpenseAccount(accessToken, realmId, expense.category);

  // Build description
  let description = expense.description || getCategoryLabel(expense.category);
  if (expense.mileage_miles && expense.mileage_from && expense.mileage_to) {
    description = `${expense.mileage_miles} miles: ${expense.mileage_from} to ${expense.mileage_to}`;
  }

  // Calculate net amount if VAT is present
  const netAmount = expense.vat_amount
    ? expense.amount - expense.vat_amount
    : expense.amount;

  // Create purchase (expense)
  const purchase: any = {
    PaymentType: 'Cash',
    TotalAmt: expense.amount,
    TxnDate: expense.date?.split('T')[0] || new Date().toISOString().split('T')[0],
    EntityRef: expense.vendor ? {
      name: expense.vendor,
      type: 'Vendor',
    } : undefined,
    Line: [{
      DetailType: 'AccountBasedExpenseLineDetail',
      Amount: netAmount,
      AccountBasedExpenseLineDetail: {
        AccountRef: accountRef,
        TaxCodeRef: expense.vat_amount ? { value: 'TAX' } : { value: 'NON' },
      },
      Description: description,
    }],
    PrivateNote: `Elec-Mate Expense: ${expense.id.slice(0, 8)}`,
  };

  // Add global tax if VAT is present
  if (expense.vat_amount) {
    purchase.GlobalTaxCalculation = 'TaxExcluded';
    purchase.TxnTaxDetail = {
      TotalTax: expense.vat_amount,
    };
  }

  console.log('Creating QuickBooks purchase:', JSON.stringify(purchase));

  const response = await fetch(
    `${QUICKBOOKS_BASE_URL}/v3/company/${realmId}/purchase`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(purchase),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('QuickBooks purchase creation failed:', errorText);
    throw new Error(`QuickBooks API error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  const createdPurchase = result.Purchase;

  if (!createdPurchase?.Id) {
    throw new Error('No purchase ID returned from QuickBooks');
  }

  console.log('QuickBooks expense synced:', createdPurchase.Id);

  return {
    expenseId: expense.id,
    externalExpenseId: createdPurchase.Id,
    externalUrl: `https://app.qbo.intuit.com/app/expense?txnId=${createdPurchase.Id}`,
  };
}

async function getOrCreateQBExpenseAccount(
  accessToken: string,
  realmId: string,
  category: string
): Promise<{ value: string; name: string }> {
  const accountType = QUICKBOOKS_ACCOUNT_TYPES[category] || 'Other Business Expense';

  // Query for expense accounts
  const query = `SELECT * FROM Account WHERE AccountType = 'Expense' MAXRESULTS 50`;
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
      // Try to find an account matching the category type
      const matchingAccount = accounts.find((acc: any) =>
        acc.Name?.toLowerCase().includes(accountType.toLowerCase()) ||
        acc.AccountSubType?.toLowerCase().includes(accountType.toLowerCase().replace(/ /g, ''))
      );

      if (matchingAccount) {
        return { value: String(matchingAccount.Id), name: matchingAccount.Name };
      }

      // Otherwise return the first expense account
      return { value: String(accounts[0].Id), name: accounts[0].Name };
    }
  }

  // Fallback - this shouldn't happen in a properly set up QuickBooks
  console.warn('No expense accounts found, using fallback');
  return { value: '1', name: 'Expenses' };
}

// ============================================
// Helpers
// ============================================

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    fuel: 'Fuel',
    tools: 'Tools',
    ppe: 'PPE',
    materials: 'Materials',
    hotels: 'Hotels',
    mileage: 'Mileage',
    training: 'Training',
    vehicle: 'Vehicle',
    insurance: 'Insurance',
    subscriptions: 'Subscriptions',
    meals: 'Meals',
    other: 'Other',
  };
  return labels[category] || category;
}
