import { supabase } from '@/integrations/supabase/client';
import { getActingEmployerId } from '@/lib/actingEmployer';
import { describeCustomerDeleteError } from '@/lib/customerDeleteError';

// get_employer_client_summaries / get_firm_customer_documents /
// customer_has_history aren't in the generated types yet. Cast once here so the
// rest of the app consumes strongly-typed interfaces below.
const db = supabase as unknown as {
  from: (table: string) => any;
  rpc: (fn: string, args?: Record<string, unknown>) => Promise<{ data: any; error: any }>;
  auth: typeof supabase.auth;
};

export interface EmployerClient {
  id: string;
  employer_id: string;
  name: string;
  company_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  notes: string | null;
  tags: string[];
  last_activity_at: string | null;
  created_at: string;
  updated_at: string;
}

/** Per-client real aggregates from get_employer_client_summaries(). */
export interface EmployerClientSummary {
  id: string;
  name: string;
  company_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  notes: string | null;
  tags: string[];
  last_activity_at: string | null;
  created_at: string;
  quote_count: number;
  open_quote_value: number;
  invoice_count: number;
  total_invoiced: number;
  total_paid: number;
  outstanding: number;
  job_count: number;
  active_job_count: number;
}

export type EmployerClientInput = Pick<
  EmployerClient,
  'name' | 'company_name' | 'email' | 'phone' | 'address' | 'notes'
> & { tags?: string[] };

const num = (v: unknown) => Number(v ?? 0);

export const getClientSummaries = async (): Promise<EmployerClientSummary[]> => {
  const { data, error } = await db.rpc('get_employer_client_summaries');
  if (error) {
    console.error('Error fetching client summaries:', error);
    throw error;
  }
  return (data ?? []).map((r: Record<string, unknown>) => ({
    id: r.id as string,
    name: r.name as string,
    // The RPC's contact_name column carries customers.company_name.
    company_name: (r.contact_name as string) ?? null,
    email: (r.email as string) ?? null,
    phone: (r.phone as string) ?? null,
    address: (r.address as string) ?? null,
    notes: (r.notes as string) ?? null,
    tags: (r.tags as string[]) ?? [],
    last_activity_at: (r.last_activity_at as string) ?? null,
    created_at: r.created_at as string,
    quote_count: num(r.quote_count),
    open_quote_value: num(r.open_quote_value),
    invoice_count: num(r.invoice_count),
    total_invoiced: num(r.total_invoiced),
    total_paid: num(r.total_paid),
    outstanding: num(r.outstanding),
    job_count: num(r.job_count),
    active_job_count: num(r.active_job_count),
  }));
};

// ELE-1995: the firm's clients are `customers` — the same book the owner uses
// in the Electrical Hub. `employer_clients` is legacy (its 3 rows were copied
// into customers on 6 Oct) and is no longer read or written here.

const toClient = (r: Record<string, unknown>): EmployerClient => ({
  id: r.id as string,
  employer_id: r.user_id as string,
  name: (r.name as string) ?? '',
  company_name: (r.company_name as string) ?? null,
  email: (r.email as string) ?? null,
  phone: (r.phone as string) ?? null,
  address: (r.address as string) ?? null,
  notes: (r.notes as string) ?? null,
  tags: (r.tags as string[]) ?? [],
  last_activity_at: (r.last_activity_at as string) ?? null,
  created_at: r.created_at as string,
  updated_at: (r.updated_at as string) ?? (r.created_at as string),
});

const actingEmployerId = async (): Promise<string> => {
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  return (await getActingEmployerId(user.id)) ?? user.id;
};

export const getClients = async (): Promise<EmployerClient[]> => {
  const employerId = await actingEmployerId();
  const { data, error } = await db
    .from('customers')
    .select('*')
    .eq('user_id', employerId)
    .order('name', { ascending: true });
  if (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
  return (data ?? []).map(toClient);
};

export const createClient = async (input: EmployerClientInput): Promise<EmployerClient> => {
  const employerId = await actingEmployerId();
  const { data, error } = await db
    .from('customers')
    .insert({
      user_id: employerId,
      name: input.name.trim(),
      company_name: input.company_name || null,
      email: input.email ? input.email.toLowerCase() : null,
      phone: input.phone || null,
      address: input.address || null,
      notes: input.notes || null,
      tags: input.tags ?? [],
      last_activity_at: new Date().toISOString(),
    })
    .select()
    .single();
  if (error) {
    console.error('Error creating client:', error);
    throw error;
  }
  return toClient(data);
};

export const updateClient = async (
  id: string,
  updates: Partial<EmployerClientInput>
): Promise<EmployerClient> => {
  const patch: Record<string, unknown> = {};
  if (updates.name !== undefined) patch.name = updates.name.trim();
  if (updates.company_name !== undefined) patch.company_name = updates.company_name || null;
  if (updates.email !== undefined) patch.email = updates.email ? updates.email.toLowerCase() : null;
  if (updates.phone !== undefined) patch.phone = updates.phone || null;
  if (updates.address !== undefined) patch.address = updates.address || null;
  if (updates.notes !== undefined) patch.notes = updates.notes || null;
  if (updates.tags !== undefined) patch.tags = updates.tags;
  patch.updated_at = new Date().toISOString();
  const { data, error } = await db.from('customers').update(patch).eq('id', id).select().single();
  if (error) {
    console.error('Error updating client:', error);
    throw error;
  }
  return toClient(data);
};

/** Thrown when a client can't be deleted because it carries history. */
export class ClientHasHistoryError extends Error {}

export const deleteClient = async (id: string): Promise<void> => {
  // A client with quotes, invoices, jobs or certificates is never deleted from
  // the Employer Hub: removing it would orphan that history for the whole firm.
  // (The database enforces the same rule for managers.)
  const { data: hasHistory, error: histError } = await db.rpc('customer_has_history', {
    p_customer_id: id,
  });
  if (histError) throw histError;
  if (hasHistory) {
    throw new ClientHasHistoryError(
      'This client has quotes, invoices, jobs or certificates, so it can\'t be deleted. Their history stays on the record.'
    );
  }
  const { data, error } = await db.from('customers').delete().eq('id', id).select('id');
  if (error) {
    console.error('Error deleting client:', error);
    throw new Error(describeCustomerDeleteError(error));
  }
  if (!data || data.length === 0) {
    // RLS matched nothing: not this firm's client, or it gained history meanwhile.
    throw new Error('This client could not be deleted. Refresh and try again.');
  }
};

/** Find an existing client by (case-insensitive) name for this firm, or create one. */
export const findOrCreateClientByName = async (name: string): Promise<EmployerClient> => {
  const trimmed = name.trim();
  const employerId = await actingEmployerId();
  const { data: existing } = await db
    .from('customers')
    .select('*')
    .eq('user_id', employerId)
    .ilike('name', trimmed)
    .limit(1)
    .maybeSingle();
  if (existing) return toClient(existing);
  return createClient({
    name: trimmed,
    company_name: null,
    email: null,
    phone: null,
    address: null,
    notes: null,
  });
};

/** Link a just-created record to a client, creating the client from the
 *  free-text name if needed. Fire-and-forget friendly. Quotes and invoices are
 *  rows in `quotes` (customer_id); jobs use employer_jobs.customer_id. */
export const linkRecordToClient = async (
  table: 'employer_jobs' | 'quotes',
  recordId: string,
  clientName: string | null | undefined
): Promise<string | null> => {
  const name = (clientName ?? '').trim();
  if (!recordId || !name) return null;
  const client = await findOrCreateClientByName(name);
  const target = table === 'employer_jobs' ? 'employer_jobs' : 'quotes';
  await db.from(target).update({ customer_id: client.id }).eq('id', recordId);
  await db
    .from('customers')
    .update({ last_activity_at: new Date().toISOString() })
    .eq('id', client.id);
  return client.id;
};

// The client's linked records, for the detail hub (deep-linkable rows).
export interface ClientLinkedRecords {
  quotes: Array<{ id: string; quote_number: string | null; status: string; value: number; job_title: string | null; created_at: string }>;
  invoices: Array<{ id: string; invoice_number: string | null; status: string; amount: number; due_date: string | null; created_at: string }>;
  jobs: Array<{ id: string; title: string; status: string; value: number | null; start_date: string | null }>;
}

const titleCase = (v: string | null | undefined) =>
  v ? v.charAt(0).toUpperCase() + v.slice(1).toLowerCase() : 'Draft';

export const getClientLinkedRecords = async (clientId: string): Promise<ClientLinkedRecords> => {
  const [q, j] = await Promise.all([
    db
      .from('quotes')
      .select('id, quote_number, invoice_number, status, invoice_status, invoice_raised, total, job_details, invoice_due_date, created_at')
      .eq('customer_id', clientId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false }),
    db
      .from('employer_jobs')
      .select('id, title, status, value, start_date')
      .eq('customer_id', clientId)
      .is('archived_at', null)
      .order('start_date', { ascending: false }),
  ]);
  const rows = (q.data ?? []) as Array<Record<string, unknown>>;
  return {
    quotes: rows
      .filter((r) => !r.invoice_raised)
      .map((r) => ({
        id: r.id as string,
        quote_number: (r.quote_number as string) ?? null,
        status: titleCase(r.status as string),
        value: Number(r.total ?? 0),
        job_title: ((r.job_details as { title?: string } | null)?.title as string) ?? null,
        created_at: r.created_at as string,
      })),
    invoices: rows
      .filter((r) => !!r.invoice_raised)
      .map((r) => ({
        id: r.id as string,
        invoice_number: (r.invoice_number as string) ?? null,
        status: titleCase(r.invoice_status as string),
        amount: Number(r.total ?? 0),
        due_date: (r.invoice_due_date as string) ?? null,
        created_at: r.created_at as string,
      })),
    jobs: (j.data ?? []) as ClientLinkedRecords['jobs'],
  };
};

// Certificates and properties for one client. reports / customer_properties are
// owner-only under RLS, so the firm reads them through a scoped definer RPC.
export interface ClientCertificate {
  id: string;
  report_id: string | null;
  report_type: string;
  certificate_number: string | null;
  status: string;
  inspection_date: string | null;
  next_inspection_due: string | null;
  expiry_date: string | null;
  installation_address: string | null;
  created_at: string;
}

export interface ClientProperty {
  id: string;
  address: string | null;
  postcode: string | null;
  property_type: string | null;
  is_primary: boolean | null;
}

export interface ClientDocuments {
  /** True when the signed-in user owns the customer book (can open certs). */
  isOwner: boolean;
  certificates: ClientCertificate[];
  properties: ClientProperty[];
}

export const getClientDocuments = async (clientId: string): Promise<ClientDocuments> => {
  const { data, error } = await db.rpc('get_firm_customer_documents', {
    p_customer_id: clientId,
  });
  if (error) {
    console.error('Error fetching client documents:', error);
    throw error;
  }
  const d = (data ?? {}) as {
    is_owner?: boolean;
    certificates?: ClientCertificate[];
    properties?: ClientProperty[];
  };
  return {
    isOwner: !!d.is_owner,
    certificates: d.certificates ?? [],
    properties: d.properties ?? [],
  };
};
