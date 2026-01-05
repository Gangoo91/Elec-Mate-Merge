import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Job } from "@/services/jobService";

// Types
export interface JobFinancial {
  id: string;
  job_id: string;
  user_id: string;
  budget_labour: number;
  budget_materials: number;
  budget_equipment: number;
  budget_overheads: number;
  budget_profit: number;
  budget_total: number;
  actual_labour: number;
  actual_materials: number;
  actual_equipment: number;
  actual_overheads: number;
  actual_total: number;
  invoiced: number;
  paid: number;
  margin: number;
  status: 'On Budget' | 'Over Budget' | 'Under Budget';
  notes: string | null;
  created_at: string;
  updated_at: string;
  job?: Job;
}

export interface VariationOrder {
  id: string;
  job_id: string;
  user_id: string;
  description: string;
  value: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  approved_by: string | null;
  approved_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface JobFinancialWithJob extends JobFinancial {
  job: Job;
  variation_orders?: VariationOrder[];
}

export interface UpdateJobFinancialData {
  budget_labour?: number;
  budget_materials?: number;
  budget_equipment?: number;
  budget_overheads?: number;
  budget_profit?: number;
  budget_total?: number;
  actual_labour?: number;
  actual_materials?: number;
  actual_equipment?: number;
  actual_overheads?: number;
  actual_total?: number;
  invoiced?: number;
  paid?: number;
  notes?: string;
}

// Fetch all job financials with job details
export function useJobFinancials() {
  return useQuery({
    queryKey: ['job-financials'],
    queryFn: async (): Promise<JobFinancialWithJob[]> => {
      const { data, error } = await supabase
        .from('job_financials')
        .select(`
          *,
          job:jobs(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch variation orders for each job
      const financials = (data || []) as JobFinancialWithJob[];

      for (const fin of financials) {
        const { data: variations } = await supabase
          .from('variation_orders')
          .select('*')
          .eq('job_id', fin.job_id)
          .order('created_at', { ascending: false });

        fin.variation_orders = (variations || []) as VariationOrder[];
      }

      return financials;
    },
  });
}

// Fetch financial for a single job
export function useJobFinancial(jobId: string | undefined) {
  return useQuery({
    queryKey: ['job-financials', jobId],
    queryFn: async (): Promise<JobFinancialWithJob | null> => {
      if (!jobId) return null;

      const { data, error } = await supabase
        .from('job_financials')
        .select(`
          *,
          job:jobs(*)
        `)
        .eq('job_id', jobId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw error;
      }

      // Fetch variation orders
      const { data: variations } = await supabase
        .from('variation_orders')
        .select('*')
        .eq('job_id', jobId)
        .order('created_at', { ascending: false });

      return {
        ...data,
        variation_orders: (variations || []) as VariationOrder[],
      } as JobFinancialWithJob;
    },
    enabled: !!jobId,
  });
}

// Update job financial
export function useUpdateJobFinancial() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ jobId, data }: { jobId: string; data: UpdateJobFinancialData }): Promise<JobFinancial> => {
      // Calculate totals and margin if budget/actual values are updated
      const updates: any = { ...data };

      if (data.budget_labour !== undefined || data.budget_materials !== undefined ||
          data.budget_equipment !== undefined || data.budget_overheads !== undefined) {
        updates.budget_total = (data.budget_labour || 0) + (data.budget_materials || 0) +
                               (data.budget_equipment || 0) + (data.budget_overheads || 0);
      }

      if (data.actual_labour !== undefined || data.actual_materials !== undefined ||
          data.actual_equipment !== undefined || data.actual_overheads !== undefined) {
        updates.actual_total = (data.actual_labour || 0) + (data.actual_materials || 0) +
                               (data.actual_equipment || 0) + (data.actual_overheads || 0);
      }

      // Calculate margin
      if (updates.budget_total && updates.actual_total) {
        updates.margin = ((updates.budget_total - updates.actual_total) / updates.budget_total) * 100;
        updates.status = updates.actual_total > updates.budget_total ? 'Over Budget' :
                        updates.actual_total < updates.budget_total * 0.9 ? 'Under Budget' : 'On Budget';
      }

      const { data: result, error } = await supabase
        .from('job_financials')
        .update(updates)
        .eq('job_id', jobId)
        .select()
        .single();

      if (error) throw error;
      return result as JobFinancial;
    },
    onSuccess: (_, { jobId }) => {
      queryClient.invalidateQueries({ queryKey: ['job-financials'] });
      queryClient.invalidateQueries({ queryKey: ['job-financials', jobId] });
      toast({
        title: "Financials Updated",
        description: "Job financial data has been updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Create variation order
export function useCreateVariationOrder() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: { job_id: string; description: string; value: number; notes?: string }): Promise<VariationOrder> => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      const { data: result, error } = await supabase
        .from('variation_orders')
        .insert({
          ...data,
          user_id: userData.user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return result as VariationOrder;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['job-financials'] });
      queryClient.invalidateQueries({ queryKey: ['job-financials', variables.job_id] });
      toast({
        title: "Variation Order Created",
        description: "The variation order has been added.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Update variation order status
export function useUpdateVariationOrderStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, status, approvedBy }: { id: string; status: VariationOrder['status']; approvedBy?: string }): Promise<VariationOrder> => {
      const updates: Partial<VariationOrder> = { status };

      if (status === 'Approved' && approvedBy) {
        updates.approved_by = approvedBy;
        updates.approved_date = new Date().toISOString().split('T')[0];
      }

      const { data: result, error } = await supabase
        .from('variation_orders')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result as VariationOrder;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-financials'] });
      toast({
        title: "Status Updated",
        description: "Variation order status has been updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Delete variation order
export function useDeleteVariationOrder() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from('variation_orders')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-financials'] });
      toast({
        title: "Deleted",
        description: "Variation order has been removed.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Summary stats
export function useJobFinancialStats() {
  const { data: financials = [] } = useJobFinancials();

  return {
    totalBudget: financials.reduce((sum, f) => sum + Number(f.budget_total), 0),
    totalActual: financials.reduce((sum, f) => sum + Number(f.actual_total), 0),
    totalInvoiced: financials.reduce((sum, f) => sum + Number(f.invoiced), 0),
    totalPaid: financials.reduce((sum, f) => sum + Number(f.paid), 0),
    totalOutstanding: financials.reduce((sum, f) => sum + Number(f.invoiced) - Number(f.paid), 0),
    avgMargin: financials.length > 0
      ? financials.reduce((sum, f) => sum + Number(f.margin), 0) / financials.length
      : 0,
    overBudgetCount: financials.filter(f => f.status === 'Over Budget').length,
    jobCount: financials.length,
  };
}
