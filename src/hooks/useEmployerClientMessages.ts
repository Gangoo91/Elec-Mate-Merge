import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';

/* ==========================================================================
   useEmployerClientMessages — the EMPLOYER side of client-portal messaging.
   The client sends via SECURITY DEFINER token RPCs (get/send_portal_message);
   this reads the same thread + lets the portal owner reply and mark client
   messages read, all under RLS (owner = client_portal_links.user_id).
   ========================================================================== */

export interface ClientMessage {
  id: string;
  job_id: string | null;
  access_token: string;
  message: string;
  sender_type: 'client' | 'employer';
  read_at: string | null;
  created_at: string;
}

// Table isn't guaranteed in the generated Supabase types — cast the name.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const table = () => (supabase as any).from('employer_client_messages');

export function useEmployerClientMessages(token: string | null | undefined, jobId?: string | null) {
  const qc = useQueryClient();

  useEffect(() => {
    if (!token) return;
    const channel = supabase
      .channel(realtimeChannelName(`client-msgs-${token}`))
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'employer_client_messages',
          filter: `access_token=eq.${token}`,
        },
        () => qc.invalidateQueries({ queryKey: ['employer-client-messages', token] })
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [token, qc]);

  const query = useQuery<ClientMessage[]>({
    queryKey: ['employer-client-messages', token],
    enabled: !!token,
    // Realtime covers this table, but keep a 30s poll as a belt-and-braces
    // fallback for dropped sockets (mirrors the client portal's poll).
    refetchInterval: 30_000,
    queryFn: async () => {
      const { data, error } = await table()
        .select('*')
        .eq('access_token', token)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return (data ?? []) as ClientMessage[];
    },
  });

  const reply = useMutation({
    mutationFn: async (message: string) => {
      const { error } = await table().insert({
        job_id: jobId ?? null,
        access_token: token,
        message,
        sender_type: 'employer',
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['employer-client-messages', token] }),
  });

  // Mark the client's unread messages as read.
  const markRead = useMutation({
    mutationFn: async () => {
      const { error } = await table()
        .update({ read_at: new Date().toISOString() })
        .eq('access_token', token)
        .eq('sender_type', 'client')
        .is('read_at', null);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['employer-client-messages', token] }),
  });

  const messages = query.data ?? [];
  const unread = messages.filter((m) => m.sender_type === 'client' && !m.read_at).length;

  return { messages, unread, isLoading: query.isLoading, reply, markRead };
}
