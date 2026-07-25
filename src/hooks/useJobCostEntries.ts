import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

// ELE-1401 — per-visit job cost ledger. Table is newer than types.ts, hence
// the cast (same pattern as useDashboardPreferences).

export interface JobCostEntry {
  id: string;
  project_id: string;
  entry_date: string;
  category: 'labour' | 'material' | 'other';
  description: string;
  hours: number | null;
  quantity: number | null;
  unit_cost: number | null;
  total: number;
  invoice_id: string | null;
  invoiced_at: string | null;
  created_at: string;
}

export interface NewJobCostEntry {
  entry_date: string;
  category: 'labour' | 'material' | 'other';
  description: string;
  hours?: number;
  quantity?: number;
  unit_cost?: number;
}

const computeTotal = (e: NewJobCostEntry): number => {
  const unit = e.unit_cost ?? 0;
  if (e.category === 'labour') return (e.hours ?? 0) * unit;
  return (e.quantity ?? 1) * unit;
};

export function useJobCostEntries(projectId: string | null | undefined) {
  const { user } = useAuth();
  // Table is newer than the generated types — regenerating types.ts removes this.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;
  const queryClient = useQueryClient();
  const queryKey = ['job-cost-entries', projectId];

  const { data: entries = [], isLoading } = useQuery({
    queryKey,
    queryFn: async (): Promise<JobCostEntry[]> => {
      if (!projectId) return [];
      const { data, error } = await db
        .from('job_cost_entries')
        .select('*')
        .eq('project_id', projectId)
        .order('entry_date', { ascending: false })
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as JobCostEntry[];
    },
    enabled: !!projectId && !!user?.id,
    staleTime: 30 * 1000,
  });

  const { mutateAsync: addEntry, isPending: isAdding } = useMutation({
    mutationFn: async (entry: NewJobCostEntry) => {
      if (!projectId) throw new Error('No job selected');
      const { error } = await db.from('job_cost_entries').insert({
        project_id: projectId,
        entry_date: entry.entry_date,
        category: entry.category,
        description: entry.description.trim(),
        hours: entry.category === 'labour' ? (entry.hours ?? null) : null,
        quantity: entry.category === 'labour' ? null : (entry.quantity ?? 1),
        unit_cost: entry.unit_cost ?? null,
        total: computeTotal(entry),
      });
      if (error) throw error;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  const { mutateAsync: deleteEntry } = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await db
        .from('job_cost_entries')
        .delete()
        .eq('id', id)
        .is('invoice_id', null); // invoiced entries are part of a financial record
      if (error) throw error;
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<JobCostEntry[]>(queryKey);
      queryClient.setQueryData<JobCostEntry[]>(queryKey, (old = []) =>
        old.filter((e) => e.id !== id || e.invoice_id !== null)
      );
      return { previous };
    },
    onError: (_e, _id, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(queryKey, ctx.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  const { mutateAsync: markInvoiced } = useMutation({
    mutationFn: async ({ ids, invoiceId }: { ids: string[]; invoiceId: string }) => {
      if (ids.length === 0) return;
      const { error } = await db
        .from('job_cost_entries')
        .update({ invoice_id: invoiceId, invoiced_at: new Date().toISOString() })
        .in('id', ids)
        .is('invoice_id', null);
      if (error) throw error;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  // The job's OTHER unbilled costs — time-tracker sessions and "got"
  // materials live in their own systems but belong in the same running
  // total, or the number on the header lies by omission.
  const { data: externalUnbilled = { timer: 0, materials: 0 } } = useQuery({
    queryKey: ['job-external-costs', projectId],
    queryFn: async () => {
      const [{ data: sessions }, { data: mats }] = await Promise.all([
        db
          .from('time_sessions')
          .select('duration_seconds, hourly_rate')
          .eq('project_id', projectId)
          .is('invoice_id', null),
        db
          .from('job_materials')
          .select('quantity, unit_price')
          .eq('project_id', projectId)
          .is('invoice_id', null)
          .in('status', ['got', 'fitted']),
      ]);
      const timer = ((sessions as Array<{ duration_seconds: number; hourly_rate: number }>) || [])
        .reduce((s, r) => s + ((Number(r.duration_seconds) || 0) / 3600) * (Number(r.hourly_rate) || 0), 0);
      const materials = ((mats as Array<{ quantity: number; unit_price: number }>) || [])
        .reduce((s, r) => s + (r.quantity == null ? 1 : Number(r.quantity)) * (Number(r.unit_price) || 0), 0);
      return { timer: Math.round(timer * 100) / 100, materials: Math.round(materials * 100) / 100 };
    },
    enabled: !!projectId && !!user?.id,
    staleTime: 60 * 1000,
  });

  const total = entries.reduce((s, e) => s + (e.total || 0), 0);
  const uninvoiced = entries.filter((e) => !e.invoice_id);
  const uninvoicedTotal = uninvoiced.reduce((s, e) => s + (e.total || 0), 0);
  const invoicedTotal = total - uninvoicedTotal;
  const externalTotal = externalUnbilled.timer + externalUnbilled.materials;
  const runningTotal = uninvoicedTotal + externalTotal;

  return {
    entries,
    uninvoiced,
    total,
    uninvoicedTotal,
    invoicedTotal,
    externalUnbilled,
    externalTotal,
    runningTotal,
    isLoading,
    isAdding,
    addEntry,
    deleteEntry,
    markInvoiced,
  };
}
