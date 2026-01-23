/**
 * Accounting Software Integration Types
 * Supports Xero, Sage, QuickBooks, and FreshBooks
 */

export type AccountingProvider = 'xero' | 'sage' | 'quickbooks' | 'freshbooks';

export type AccountingStatus = 'connected' | 'pending' | 'error' | 'disconnected';

export interface AccountingIntegration {
  provider: AccountingProvider;
  status: AccountingStatus;
  tenantId?: string;        // Organisation/company ID in accounting system
  tenantName?: string;      // "ABC Electrical Ltd" display name
  connectedAt?: string;     // ISO date string
  lastSyncAt?: string;      // ISO date string
  autoSyncEnabled: boolean;
  error?: string;           // Error message if status is 'error'
}

export interface AccountingInvoicePayload {
  invoiceNumber: string;
  invoiceDate: string;      // ISO date string
  dueDate: string;          // ISO date string
  clientName: string;
  clientEmail?: string;
  clientAddress?: string;
  clientPhone?: string;
  lineItems: AccountingLineItem[];
  subtotal: number;
  vatAmount: number;
  total: number;
  currency: string;         // 'GBP', 'USD', etc.
  reference?: string;       // Job reference or PO number
  notes?: string;
}

export interface AccountingLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  vatRate?: number;         // VAT percentage (e.g., 20 for 20%)
  accountCode?: string;     // Chart of accounts code
}

export interface AccountingInvoiceSync {
  id: string;
  userId: string;
  invoiceId: string;
  provider: AccountingProvider;
  externalInvoiceId?: string;  // ID in the accounting system
  status: 'pending' | 'synced' | 'error';
  errorMessage?: string;
  syncedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccountingOAuthToken {
  id: string;
  userId: string;
  provider: AccountingProvider;
  tenantId?: string;
  tenantName?: string;
  tokenExpiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Provider display configuration
export interface AccountingProviderConfig {
  id: AccountingProvider;
  name: string;
  description: string;
  logoColor: string;        // Tailwind color class
  bgColor: string;          // Background color class
  scopes: string[];         // OAuth scopes required
  authUrl: string;          // OAuth authorization URL
}

export const ACCOUNTING_PROVIDERS: Record<AccountingProvider, AccountingProviderConfig> = {
  xero: {
    id: 'xero',
    name: 'Xero',
    description: 'UK\'s #1 small business accounting',
    logoColor: 'text-[#13B5EA]',
    bgColor: 'bg-[#13B5EA]/15',
    scopes: ['openid', 'profile', 'email', 'accounting.transactions', 'accounting.contacts', 'offline_access'],
    authUrl: 'https://login.xero.com/identity/connect/authorize',
  },
  quickbooks: {
    id: 'quickbooks',
    name: 'QuickBooks',
    description: 'Popular accounting worldwide',
    logoColor: 'text-[#2CA01C]',
    bgColor: 'bg-[#2CA01C]/15',
    scopes: ['com.intuit.quickbooks.accounting'],
    authUrl: 'https://appcenter.intuit.com/connect/oauth2',
  },
  sage: {
    id: 'sage',
    name: 'Sage',
    description: 'Enterprise accounting solution',
    logoColor: 'text-[#00D639]',
    bgColor: 'bg-[#00D639]/15',
    scopes: ['full_access'],
    authUrl: 'https://www.sageone.com/oauth2/auth/central',
  },
  freshbooks: {
    id: 'freshbooks',
    name: 'FreshBooks',
    description: 'Simple invoicing & accounting',
    logoColor: 'text-[#0075DD]',
    bgColor: 'bg-[#0075DD]/15',
    scopes: ['user:profile:read', 'user:invoices:read', 'user:invoices:write'],
    authUrl: 'https://auth.freshbooks.com/oauth/authorize',
  },
};

// Helper to get provider display name
export const getProviderDisplayName = (provider: AccountingProvider): string => {
  return ACCOUNTING_PROVIDERS[provider]?.name || provider;
};

// Helper to check if a provider is connected
export const isProviderConnected = (
  integrations: AccountingIntegration[] | undefined,
  provider: AccountingProvider
): boolean => {
  return integrations?.some(i => i.provider === provider && i.status === 'connected') || false;
};

// Helper to get integration by provider
export const getIntegration = (
  integrations: AccountingIntegration[] | undefined,
  provider: AccountingProvider
): AccountingIntegration | undefined => {
  return integrations?.find(i => i.provider === provider);
};
