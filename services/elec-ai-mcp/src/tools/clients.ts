/**
 * Client tools — read_clients, create_client, update_client, generate_client_portal_link
 * Maps to: Supabase `customers` table (RLS-scoped)
 *
 * SKILL.md contract:
 *   read_clients returns: id, name, email, phone, address, notes, total_jobs, total_revenue
 */

import type { UserContext } from '../auth.js';

import { callEdgeFunction } from '../lib/edge-function.js';

export async function readClients(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  // Fetch clients from customers table
  let query = supabase
    .from('customers')
    .select('id, name, email, phone, address, notes, created_at');

  if (typeof args.search === 'string' && args.search.length > 0) {
    // Sanitise to prevent PostgREST filter injection via .or() syntax
    const sanitised = args.search.replace(/[,.()"'\\]/g, '');
    if (sanitised.length > 0) {
      const search = `%${sanitised}%`;
      query = query.or(
        `name.ilike.${search},email.ilike.${search},phone.ilike.${search},address.ilike.${search}`
      );
    }
  }

  const limit = typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 100) : 50;
  query = query.order('created_at', { ascending: false }).limit(limit);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to read clients: ${error.message}`);

  return { clients: data || [] };
}

export async function createClient(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  if (typeof args.name !== 'string' || args.name.trim().length === 0) {
    throw new Error('Client name is required');
  }

  const { data, error } = await supabase
    .from('customers')
    .insert({
      user_id: user.userId,
      name: args.name.trim(),
      email: typeof args.email === 'string' ? args.email.trim() : null,
      phone: typeof args.phone === 'string' ? args.phone.trim() : null,
      address: typeof args.address === 'string' ? args.address.trim() : null,
      notes: typeof args.notes === 'string' ? args.notes : null,
    })
    .select('id')
    .single();

  if (error) throw new Error(`Failed to create client: ${error.message}`);

  return { client_id: data.id };
}

export async function updateClient(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  if (typeof args.client_id !== 'string') {
    throw new Error('client_id is required');
  }

  const updates: Record<string, unknown> = {};
  for (const field of ['name', 'email', 'phone', 'address', 'notes']) {
    if (typeof args[field] === 'string') {
      updates[field] = args[field];
    }
  }

  if (Object.keys(updates).length === 0) {
    throw new Error('No valid fields to update');
  }

  const { error } = await supabase.from('customers').update(updates).eq('id', args.client_id);

  if (error) throw new Error(`Failed to update client: ${error.message}`);

  return { success: true };
}

export async function generateClientPortalLink(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.client_id !== 'string') {
    throw new Error('client_id is required');
  }

  const result = await callEdgeFunction('generate-client-portal-link', user.jwt, {
    client_id: args.client_id,
    include_certs: args.include_certs ?? true,
    include_invoices: args.include_invoices ?? true,
    include_quotes: args.include_quotes ?? true,
  });

  if (result.error) throw new Error(result.error);
  return result.data;
}
