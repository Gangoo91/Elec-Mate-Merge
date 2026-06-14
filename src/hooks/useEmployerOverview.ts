import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { useQueryClient } from '@tanstack/react-query';

/* ==========================================================================
   useEmployerOverview — the daily radar. One caller-scoped RPC aggregates
   the cash strip + named, one-tap attention items across certs, invoices,
   jobs, packs and fleet. Every figure is real; empty = genuinely all clear.
   ========================================================================== */

export type RadarSeverity = 'red' | 'orange' | 'amber';
export type RadarSection = 'safetyhub' | 'financehub' | 'jobshub' | 'fleet' | 'peoplehub' | 'elecid';

export interface RadarItem {
  kind: 'cert_expiry' | 'overdue_invoice' | 'job_overdue' | 'unsigned_pack' | 'vehicle_expiry';
  id: string;
  title: string;
  subtitle: string;
  days: number;
  severity: RadarSeverity;
  section: RadarSection;
  amount: number | null;
}

export interface RadarCash {
  invoiced_this_month: number;
  paid_this_month: number;
  overdue_total: number;
  overdue_count: number;
}

export interface EmployerOverview {
  cash: RadarCash;
  items: RadarItem[];
  counts: {
    pending_timesheets: number;
    total_attention: number;
  };
}

const EMPTY: EmployerOverview = {
  cash: { invoiced_this_month: 0, paid_this_month: 0, overdue_total: 0, overdue_count: 0 },
  items: [],
  counts: { pending_timesheets: 0, total_attention: 0 },
};

export function useEmployerOverview() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel(realtimeChannelName('employer-overview-radar'))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'employer_invoices' }, () =>
        queryClient.invalidateQueries({ queryKey: ['employer-overview'] })
      )
      .on('postgres_changes', { event: '*', schema: 'public', table: 'employer_certifications' }, () =>
        queryClient.invalidateQueries({ queryKey: ['employer-overview'] })
      )
      .on('postgres_changes', { event: '*', schema: 'public', table: 'employer_timesheets' }, () =>
        queryClient.invalidateQueries({ queryKey: ['employer-overview'] })
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery<EmployerOverview>({
    queryKey: ['employer-overview'],
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_employer_overview');
      if (error) throw error;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const r = (data as any) || {};
      return {
        cash: { ...EMPTY.cash, ...(r.cash || {}) },
        items: Array.isArray(r.items) ? r.items : [],
        counts: { ...EMPTY.counts, ...(r.counts || {}) },
      };
    },
  });
}
