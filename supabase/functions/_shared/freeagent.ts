/**
 * FreeAgent API v2 helpers (ELE-2077). https://dev.freeagent.com/docs
 *
 *   OAuth 2.0: authorise at /v2/approve_app, tokens at /v2/token_endpoint
 *   (HTTP Basic client id:secret). Access tokens last an hour; refresh tokens
 *   are long-lived. No granular scopes: a token can do what the approving
 *   FreeAgent user can do.
 *   Rate limits: 120 requests a minute and 3,600 an hour per user.
 *   Sandbox: https://api.sandbox.freeagent.com (sign up at
 *   https://signup.sandbox.freeagent.com/signup). FREEAGENT_ENVIRONMENT
 *   picks sandbox (default, for safety) or production.
 *
 * Records are identified by URL in FreeAgent (".../v2/invoices/123"). We store
 * the trailing id and rebuild the URL from the base.
 */

const ENV = Deno.env.get('FREEAGENT_ENVIRONMENT') === 'production' ? 'production' : 'sandbox';
export const FREEAGENT_BASE =
  ENV === 'production' ? 'https://api.freeagent.com/v2' : 'https://api.sandbox.freeagent.com/v2';

const CLIENT_ID = Deno.env.get('FREEAGENT_CLIENT_ID');
const CLIENT_SECRET = Deno.env.get('FREEAGENT_CLIENT_SECRET');

export const freeagentConfigured = () => !!CLIENT_ID && !!CLIENT_SECRET;

export function freeagentAuthorizeUrl(redirectUri: string, state: string): string {
  const params = new URLSearchParams({
    client_id: CLIENT_ID ?? '',
    response_type: 'code',
    redirect_uri: redirectUri,
    state,
  });
  return `${FREEAGENT_BASE}/approve_app?${params}`;
}

export interface FreeAgentTokens {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

async function tokenRequest(body: URLSearchParams): Promise<FreeAgentTokens> {
  const res = await fetch(`${FREEAGENT_BASE}/token_endpoint`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
    },
    body,
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok)
    throw new Error(`FreeAgent token ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return (await res.json()) as FreeAgentTokens;
}

export const exchangeFreeAgentCode = (code: string, redirectUri: string) =>
  tokenRequest(
    new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: redirectUri })
  );

export async function refreshFreeAgentToken(
  refreshToken: string
): Promise<{ accessToken: string; refreshToken?: string; expiresIn: number }> {
  const t = await tokenRequest(
    new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken })
  );
  return {
    accessToken: t.access_token,
    refreshToken: t.refresh_token ?? refreshToken,
    expiresIn: t.expires_in,
  };
}

export async function fa<T = Record<string, unknown>>(
  accessToken: string,
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const res = await fetch(path.startsWith('http') ? path : `${FREEAGENT_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'Elec-Mate',
      ...(init.headers ?? {}),
    },
    signal: AbortSignal.timeout(20_000),
  });
  if (res.status === 429) throw new Error('FreeAgent rate limit reached. Try again in a minute.');
  if (!res.ok) throw new Error(`FreeAgent ${res.status}: ${(await res.text()).slice(0, 400)}`);
  if (res.status === 204) return {} as T;
  return (await res.json()) as T;
}

export const faId = (url: string | undefined | null) => (url ? (url.split('/').pop() ?? '') : '');

export async function getFreeAgentCompany(
  accessToken: string
): Promise<{ tenantId: string; tenantName: string }> {
  try {
    const { company } = await fa<{ company: { url?: string; id?: string; name?: string } }>(
      accessToken,
      '/company'
    );
    return {
      tenantId: company.id ?? faId(company.url) ?? 'freeagent',
      tenantName: company.name || 'FreeAgent',
    };
  } catch (e) {
    console.warn('FreeAgent company fetch failed', (e as Error).message);
    return { tenantId: 'freeagent', tenantName: 'FreeAgent' };
  }
}

interface FaContact {
  url: string;
  organisation_name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

const norm = (s: string | undefined | null) => (s ?? '').trim().toLowerCase().replace(/\s+/g, ' ');

/**
 * Find the client among the company's active contacts (FreeAgent has no
 * name search, so this reads up to 1,000 contacts), or create one. Returns the
 * contact URL, which is how invoices reference it.
 */
export async function findOrCreateFreeAgentContact(
  accessToken: string,
  client: { name: string; email?: string; phone?: string; address?: string }
): Promise<string> {
  const name = norm(client.name);
  const email = norm(client.email);
  for (let page = 1; page <= 10; page++) {
    const { contacts } = await fa<{ contacts: FaContact[] }>(
      accessToken,
      `/contacts?view=active&per_page=100&page=${page}`
    );
    const hit = (contacts ?? []).find(
      (c) =>
        (email && norm(c.email) === email) ||
        norm(c.organisation_name) === name ||
        norm(`${c.first_name ?? ''} ${c.last_name ?? ''}`) === name
    );
    if (hit) return hit.url;
    if (!contacts || contacts.length < 100) break;
  }
  const { contact } = await fa<{ contact: FaContact }>(accessToken, '/contacts', {
    method: 'POST',
    body: JSON.stringify({
      contact: {
        organisation_name: client.name?.trim() || 'Customer',
        email: client.email || undefined,
        phone_number: client.phone || undefined,
        address1: client.address || undefined,
      },
    }),
  });
  return contact.url;
}

/** Payment state for the two-way sync. FreeAgent works out paid/due itself. */
export async function pullInvoiceStatusFromFreeAgent(accessToken: string, invoiceId: string) {
  const { invoice } = await fa<{
    invoice: {
      status?: string;
      paid_value?: string;
      due_value?: string;
      total_value?: string;
      paid_on?: string;
    };
  }>(accessToken, `/invoices/${encodeURIComponent(invoiceId)}`);
  const status = String(invoice.status ?? '');
  const amountPaid = Math.round((Number(invoice.paid_value) || 0) * 100) / 100;
  const amountDue = Math.round((Number(invoice.due_value) || 0) * 100) / 100;
  const isPaid =
    /^(paid|overpaid)$/i.test(status) || (Number(invoice.total_value) > 0 && amountDue <= 0.005);
  const paidAt = isPaid && invoice.paid_on ? new Date(invoice.paid_on).toISOString() : null;
  return { isPaid, paidAt, externalStatus: status.toUpperCase(), amountPaid, amountDue };
}
