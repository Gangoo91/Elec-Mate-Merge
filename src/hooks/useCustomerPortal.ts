import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Capacitor } from '@capacitor/core';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';

/* ==========================================================================
   useCustomerPortal: the OFFICE side of the client portal (ELE-1996).

   One portal per customer (not per job). Owner, admins and office managers
   create, share, pause, revoke and renew the link, and read and answer the
   customer's messages. Everything goes through SECURITY DEFINER functions
   that check the caller acts for the firm that owns the customer; the tables
   themselves are read-only to the app.
   ========================================================================== */

export interface CustomerPortalLink {
  id: string;
  token: string;
  is_active: boolean;
  expires_at: string | null;
  expired: boolean;
  usable: boolean;
  views: number;
  last_opened_at: string | null;
  last_shared_at: string | null;
  shared_via: string | null;
  created_at: string;
}

export interface CustomerPortalState {
  link: CustomerPortalLink | null;
  unread: number;
  messages: number;
}

export interface CustomerMessage {
  id: string;
  message: string;
  sender_type: 'client' | 'employer';
  created_at: string;
  read_at: string | null;
  sender_name: string | null;
}

export interface InboxThread {
  customer_id: string;
  customer_name: string;
  contact_name: string;
  last_message: string;
  last_from: 'client' | 'employer';
  last_at: string;
  unread: number;
}

export type PortalAction = 'pause' | 'resume' | 'revoke' | 'rotate' | 'expiry' | 'shared';

// The functions are newer than the generated types.
const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;

async function call<T>(fn: string, args?: Record<string, unknown>): Promise<T> {
  const { data, error } = await rpc(fn, args);
  if (error) throw new Error(error.message);
  return data as T;
}

/** The address a customer opens. Native builds run on capacitor://, so they
 *  always hand out the public site. */
export function portalUrl(token: string): string {
  const origin =
    typeof window !== 'undefined' &&
    /^https?:/.test(window.location.origin) &&
    !Capacitor.isNativePlatform()
      ? window.location.origin
      : 'https://www.elec-mate.com';
  return `${origin}/portal/${token}`;
}

const portalKey = (customerId?: string | null) => ['customer-portal', customerId];
const messagesKey = (customerId?: string | null) => ['customer-messages', customerId];
export const CLIENT_INBOX_KEY = ['client-message-inbox'];

export function useCustomerPortal(customerId: string | null | undefined) {
  return useQuery({
    queryKey: portalKey(customerId),
    enabled: !!customerId,
    queryFn: () => call<CustomerPortalState>('get_customer_portal', { p_customer_id: customerId }),
    staleTime: 30_000,
  });
}

export function useEnsurePortalLink(customerId: string | null | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (expiresDays: number | null = null) =>
      call<CustomerPortalLink>('ensure_customer_portal_link', {
        p_customer_id: customerId,
        p_expires_days: expiresDays,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: portalKey(customerId) });
      qc.invalidateQueries({ queryKey: ['client-portal-links'] });
    },
  });
}

export function useManagePortalLink(customerId: string | null | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: { linkId: string; action: PortalAction; days?: number | null; via?: string }) =>
      call<{ link: CustomerPortalLink | null }>('manage_customer_portal_link', {
        p_link_id: v.linkId,
        p_action: v.action,
        p_days: v.days ?? null,
        p_via: v.via ?? null,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: portalKey(customerId) });
      qc.invalidateQueries({ queryKey: ['client-portal-links'] });
    },
  });
}

/** The thread with one customer, live. */
export function useCustomerMessages(customerId: string | null | undefined) {
  const qc = useQueryClient();

  useEffect(() => {
    if (!customerId) return;
    const channel = supabase
      .channel(realtimeChannelName(`customer-msgs-${customerId}`))
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'employer_client_messages',
          filter: `customer_id=eq.${customerId}`,
        },
        () => {
          qc.invalidateQueries({ queryKey: messagesKey(customerId) });
          qc.invalidateQueries({ queryKey: portalKey(customerId) });
          qc.invalidateQueries({ queryKey: CLIENT_INBOX_KEY });
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [customerId, qc]);

  return useQuery({
    queryKey: messagesKey(customerId),
    enabled: !!customerId,
    // Realtime covers inserts; the poll is a fallback for a dropped socket.
    refetchInterval: 30_000,
    queryFn: () => call<CustomerMessage[]>('get_customer_messages', { p_customer_id: customerId }),
  });
}

export function useReplyToCustomer(customerId: string | null | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (message: string) =>
      call<{ id: string }>('reply_customer_message', {
        p_customer_id: customerId,
        p_message: message,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: messagesKey(customerId) });
      qc.invalidateQueries({ queryKey: portalKey(customerId) });
      qc.invalidateQueries({ queryKey: CLIENT_INBOX_KEY });
    },
  });
}

export function useMarkCustomerMessagesRead(customerId: string | null | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => call<number>('mark_customer_messages_read', { p_customer_id: customerId }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: messagesKey(customerId) });
      qc.invalidateQueries({ queryKey: portalKey(customerId) });
      qc.invalidateQueries({ queryKey: CLIENT_INBOX_KEY });
    },
  });
}

/** Every customer thread the firm has, newest first (Overview + Client portal). */
export function useClientMessageInbox(enabled = true) {
  return useQuery({
    queryKey: CLIENT_INBOX_KEY,
    enabled,
    refetchInterval: 60_000,
    queryFn: () => call<InboxThread[]>('get_client_message_inbox'),
  });
}

export interface FirmPortalLinkRow {
  id: string;
  customer_id: string;
  is_active: boolean | null;
  expires_at: string | null;
  views_count: number | null;
  last_accessed_at: string | null;
  last_shared_at: string | null;
  created_at: string;
}

/** Every live portal link of the firm (read under RLS; writes go through functions). */
export function useFirmPortalLinks() {
  return useQuery({
    queryKey: ['client-portal-links'],
    queryFn: async (): Promise<FirmPortalLinkRow[]> => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('client_portal_links')
        .select(
          'id, customer_id, is_active, expires_at, views_count, last_accessed_at, last_shared_at, created_at'
        )
        .not('customer_id', 'is', null)
        .is('revoked_at', null)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as FirmPortalLinkRow[];
    },
    staleTime: 30_000,
  });
}

/** The worker's own "show me to customers" consent (ELE-1837). */
export function useShowMeToCustomers() {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ['show-me-to-customers'],
    queryFn: () => call<{ on: boolean; on_roster: boolean }>('get_show_me_to_customers'),
    staleTime: 60_000,
  });
  const set = useMutation({
    mutationFn: (on: boolean) => call<boolean>('set_show_me_to_customers', { p_on: on }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['show-me-to-customers'] }),
  });
  return { ...query, set };
}
