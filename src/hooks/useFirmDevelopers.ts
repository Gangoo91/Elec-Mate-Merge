/**
 * Settings › Developers (ELE-2077): the firm owner's API keys and webhooks.
 *
 * Owner only, enforced in the database: every function acts on auth.uid() as
 * the firm, so a manager signed in to the firm cannot mint a key that reads it.
 * A new key and a new webhook secret come back ONCE, at creation, and are never
 * readable again (only a hash of the key is stored).
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const API_SCOPES = [
  'jobs',
  'customers',
  'quotes',
  'invoices',
  'timesheets',
  'certificates',
] as const;
export type ApiScope = (typeof API_SCOPES)[number];

export const SCOPE_LABEL: Record<ApiScope, string> = {
  jobs: 'Jobs',
  customers: 'Customers',
  quotes: 'Quotes',
  invoices: 'Invoices',
  timesheets: 'Timesheets',
  certificates: 'Certificates',
};

export const WEBHOOK_EVENTS = [
  'job.created',
  'job.updated',
  'job.completed',
  'invoice.created',
  'invoice.sent',
  'invoice.paid',
  'invoice.updated',
  'certificate.linked',
] as const;
export type WebhookEvent = (typeof WEBHOOK_EVENTS)[number];

export const EVENT_LABEL: Record<WebhookEvent, string> = {
  'job.created': 'Job created',
  'job.updated': 'Job changed',
  'job.completed': 'Job completed',
  'invoice.created': 'Invoice raised',
  'invoice.sent': 'Invoice sent',
  'invoice.paid': 'Invoice paid',
  'invoice.updated': 'Invoice changed',
  'certificate.linked': 'Certificate added to a job',
};

export interface ApiKeyRow {
  id: string;
  label: string;
  key_prefix: string;
  scopes: ApiScope[];
  rate_limit_per_minute: number;
  created_at: string;
  last_used_at: string | null;
  revoked_at: string | null;
  calls_24h: number;
}

export interface WebhookRow {
  id: string;
  url: string;
  events: WebhookEvent[];
  description: string | null;
  active: boolean;
  created_at: string;
  last_success_at: string | null;
  last_failure_at: string | null;
  consecutive_failures: number;
  pending: number;
  recent: {
    id: string;
    event: string;
    status: 'pending' | 'delivering' | 'delivered' | 'failed' | 'dead';
    attempts: number;
    last_status_code: number | null;
    last_error: string | null;
    created_at: string;
    delivered_at: string | null;
  }[];
}

export const API_BASE = `${import.meta.env.VITE_SUPABASE_URL ?? 'https://jtwygbeceundfgnkirof.supabase.co'}/functions/v1/firm-api/v1`;

const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;

async function call<T>(fn: string, args?: Record<string, unknown>): Promise<T> {
  const { data, error } = await rpc(fn, args);
  if (error) throw new Error(error.message);
  return data as T;
}

export function useApiKeys(enabled = true) {
  return useQuery({
    queryKey: ['firm-api-keys'],
    enabled,
    queryFn: () => call<ApiKeyRow[]>('firm_api_keys_list'),
  });
}

export function useMintApiKey() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: { label: string; scopes: ApiScope[]; rate: number }) =>
      call<{ id: string; key: string; prefix: string }>('firm_api_key_mint', {
        p_label: v.label,
        p_scopes: v.scopes,
        p_rate: v.rate,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['firm-api-keys'] }),
  });
}

export function useRevokeApiKey() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => call<void>('firm_api_key_revoke', { p_key: id }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['firm-api-keys'] }),
  });
}

export function useWebhooks(enabled = true) {
  return useQuery({
    queryKey: ['firm-webhooks'],
    enabled,
    refetchInterval: 60_000,
    queryFn: () => call<WebhookRow[]>('firm_webhooks_list'),
  });
}

export function useSaveWebhook() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: {
      id?: string | null;
      url: string;
      events: WebhookEvent[];
      description?: string;
      active?: boolean;
    }) =>
      call<{ id: string; secret?: string }>('firm_webhook_save', {
        p_id: v.id ?? null,
        p_url: v.url,
        p_events: v.events,
        p_description: v.description ?? null,
        p_active: v.active ?? true,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['firm-webhooks'] }),
  });
}

export function useWebhookAction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (v: { id: string; action: 'test' | 'rotate' | 'delete' }) => {
      if (v.action === 'test') return call<void>('firm_webhook_send_test', { p_id: v.id });
      if (v.action === 'rotate')
        return call<{ secret: string }>('firm_webhook_rotate_secret', { p_id: v.id });
      return call<void>('firm_webhook_delete', { p_id: v.id });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['firm-webhooks'] }),
  });
}
