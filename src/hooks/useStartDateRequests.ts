import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface StartDateRequest {
  id: string;
  quote_number: string | null;
  requested_start_date: string;
  requested_time_preference: 'morning' | 'afternoon' | 'flexible';
  requested_at: string | null;
  customer_id: string | null;
  client_name: string;
  client_phone: string | null;
  client_address: string | null;
  total: number;
}

/**
 * Clients who accepted a quote and named a day to start, still waiting on an
 * answer.
 *
 * ELE-1513. These are deliberately NOT calendar events — nothing is agreed
 * until the electrician confirms — which is exactly why they need surfacing
 * somewhere. A request that only existed as a row on the quote was a client
 * waiting on a reply nobody could see.
 *
 * Shared by the Quotes page, the Booking page and the Calendar so all three
 * agree, and so the count is fetched once.
 */
export function useStartDateRequests() {
  return useQuery({
    queryKey: ['start-date-requests'],
    staleTime: 30_000,
    queryFn: async (): Promise<StartDateRequest[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('quotes')
        .select(
          'id, quote_number, requested_start_date, requested_time_preference, requested_at, customer_id, client_data, total'
        )
        .eq('user_id', user.id)
        .not('requested_start_date', 'is', null)
        .is('booked_slot_start', null)
        .is('deleted_at', null)
        .order('requested_start_date', { ascending: true });

      if (error) throw error;

      return (data ?? []).map((r) => {
        const client = (r.client_data ?? {}) as {
          name?: string;
          phone?: string;
          address?: string;
        };
        return {
          id: String(r.id),
          quote_number: r.quote_number,
          requested_start_date: String(r.requested_start_date),
          requested_time_preference:
            (r.requested_time_preference as StartDateRequest['requested_time_preference']) ??
            'flexible',
          requested_at: r.requested_at,
          customer_id: r.customer_id,
          // Trailing whitespace is common in this JSONB — it comes straight
          // from whatever was typed into the quote builder.
          client_name: client.name?.trim() || 'Client',
          client_phone: client.phone?.trim() || null,
          client_address: client.address?.trim() || null,
          total: Number(r.total ?? 0),
        };
      });
    },
  });
}

/** Requests indexed by the day asked for, for marking up a calendar grid. */
export function startDateRequestsByDay(requests: StartDateRequest[]): Map<string, StartDateRequest[]> {
  const map = new Map<string, StartDateRequest[]>();
  for (const r of requests) {
    const list = map.get(r.requested_start_date);
    if (list) list.push(r);
    else map.set(r.requested_start_date, [r]);
  }
  return map;
}

export function preferenceLabel(p: StartDateRequest['requested_time_preference']): string {
  if (p === 'morning') return 'morning';
  if (p === 'afternoon') return 'afternoon';
  return 'any time';
}
