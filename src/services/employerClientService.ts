import { supabase } from '@/integrations/supabase/client';

// employer_clients + get_employer_client_summaries were added by the Phase 1
// CRM migration and aren't in the generated types yet. Cast once here so the
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
  contact_name: string | null;
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
  contact_name: string | null;
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
  'name' | 'contact_name' | 'email' | 'phone' | 'address' | 'notes'
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
    contact_name: (r.contact_name as string) ?? null,
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

export const getClients = async (): Promise<EmployerClient[]> => {
  const { data, error } = await db
    .from('employer_clients')
    .select('*')
    .order('name', { ascending: true });
  if (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
  return (data ?? []) as EmployerClient[];
};

export const createClient = async (input: EmployerClientInput): Promise<EmployerClient> => {
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await db
    .from('employer_clients')
    .insert({
      employer_id: user.id,
      name: input.name,
      contact_name: input.contact_name || null,
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
  return data as EmployerClient;
};

export const updateClient = async (
  id: string,
  updates: Partial<EmployerClientInput>
): Promise<EmployerClient> => {
  const patch: Record<string, unknown> = { ...updates };
  if (typeof updates.email === 'string') patch.email = updates.email.toLowerCase() || null;
  const { data, error } = await db
    .from('employer_clients')
    .update(patch)
    .eq('id', id)
    .select()
    .single();
  if (error) {
    console.error('Error updating client:', error);
    throw error;
  }
  return data as EmployerClient;
};

export const deleteClient = async (id: string): Promise<void> => {
  const { error } = await db.from('employer_clients').delete().eq('id', id);
  if (error) {
    console.error('Error deleting client:', error);
    throw error;
  }
};

/** Find an existing client by (case-insensitive) name, or create one. Used by the
 *  create-or-select picker and Employer Mate so a client record always backs a
 *  quote / invoice / job. */
export const findOrCreateClientByName = async (name: string): Promise<EmployerClient> => {
  const trimmed = name.trim();
  const { data: existing } = await db
    .from('employer_clients')
    .select('*')
    .ilike('name', trimmed)
    .limit(1)
    .maybeSingle();
  if (existing) return existing as EmployerClient;
  return createClient({
    name: trimmed,
    contact_name: null,
    email: null,
    phone: null,
    address: null,
    notes: null,
  });
};

/** Link a just-created quote/invoice/job to a client, creating the client from
 *  the free-text name if needed and touching last_activity_at. Fire-and-forget
 *  friendly: callers should not let a link failure block the primary create. */
export const linkRecordToClient = async (
  table: 'employer_quotes' | 'employer_invoices' | 'employer_jobs',
  recordId: string,
  clientName: string | null | undefined
): Promise<string | null> => {
  const name = (clientName ?? '').trim();
  if (!recordId || !name) return null;
  const client = await findOrCreateClientByName(name);
  await db.from(table).update({ client_id: client.id }).eq('id', recordId);
  await db
    .from('employer_clients')
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

export const getClientLinkedRecords = async (clientId: string): Promise<ClientLinkedRecords> => {
  const [q, i, j] = await Promise.all([
    db.from('employer_quotes').select('id, quote_number, status, value, job_title, created_at').eq('client_id', clientId).order('created_at', { ascending: false }),
    db.from('employer_invoices').select('id, invoice_number, status, amount, due_date, created_at').eq('client_id', clientId).order('created_at', { ascending: false }),
    db.from('employer_jobs').select('id, title, status, value, start_date').eq('client_id', clientId).order('start_date', { ascending: false }),
  ]);
  return {
    quotes: (q.data ?? []) as ClientLinkedRecords['quotes'],
    invoices: (i.data ?? []) as ClientLinkedRecords['invoices'],
    jobs: (j.data ?? []) as ClientLinkedRecords['jobs'],
  };
};
