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
        .from('employer_job_financials')
        .select(`
          *,
          job:employer_jobs(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch variation orders for each job
      const financials = (data || []) as JobFinancialWithJob[];

      for (const fin of financials) {
        const { data: variations } = await supabase
          .from('employer_variation_orders')
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
        .from('employer_job_financials')
        .select(`
          *,
          job:employer_jobs(*)
        `)
        .eq('job_id', jobId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw error;
      }

      // Fetch variation orders
      const { data: variations } = await supabase
        .from('employer_variation_orders')
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
        .from('employer_job_financials')
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
        .from('employer_variation_orders')
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
        .from('employer_variation_orders')
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
        .from('employer_variation_orders')
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

// Types for actual costs
export interface ActualCostEntry {
  category: 'labour' | 'materials' | 'equipment' | 'overheads';
  amount: number;
  date: string;
  notes?: string;
}

export interface JobCostComparison {
  category: string;
  budgeted: number;
  actual: number;
  variance: number;
  variancePercent: number;
}

// Record actual cost against a job
export function useRecordActualCost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ jobId, entry }: { jobId: string; entry: ActualCostEntry }): Promise<JobFinancial> => {
      // First get current values
      const { data: current, error: fetchError } = await supabase
        .from('employer_job_financials')
        .select('*')
        .eq('job_id', jobId)
        .single();

      if (fetchError) throw fetchError;

      // Calculate new actual based on category
      const fieldMap: Record<string, string> = {
        labour: 'actual_labour',
        materials: 'actual_materials',
        equipment: 'actual_equipment',
        overheads: 'actual_overheads',
      };

      const field = fieldMap[entry.category];
      const currentValue = Number(current[field] || 0);
      const newValue = currentValue + entry.amount;

      // Calculate new totals
      const updates: Record<string, number | string> = {
        [field]: newValue,
      };

      // Recalculate actual_total
      const actualLabour = entry.category === 'labour' ? newValue : Number(current.actual_labour || 0);
      const actualMaterials = entry.category === 'materials' ? newValue : Number(current.actual_materials || 0);
      const actualEquipment = entry.category === 'equipment' ? newValue : Number(current.actual_equipment || 0);
      const actualOverheads = entry.category === 'overheads' ? newValue : Number(current.actual_overheads || 0);

      updates.actual_total = actualLabour + actualMaterials + actualEquipment + actualOverheads;

      // Recalculate margin and status
      const budgetTotal = Number(current.budget_total || 0);
      if (budgetTotal > 0) {
        updates.margin = ((budgetTotal - updates.actual_total) / budgetTotal) * 100;
        updates.status = updates.actual_total > budgetTotal ? 'Over Budget' :
                        updates.actual_total < budgetTotal * 0.9 ? 'Under Budget' : 'On Budget';
      }

      // Add notes if provided
      if (entry.notes) {
        const existingNotes = current.notes || '';
        const dateStr = new Date(entry.date).toLocaleDateString('en-GB');
        updates.notes = `${existingNotes}\n[${dateStr}] ${entry.category}: £${entry.amount} - ${entry.notes}`.trim();
      }

      const { data: result, error } = await supabase
        .from('employer_job_financials')
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
        title: "Cost Recorded",
        description: "Actual cost has been added to the job.",
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

// Get cost comparison (budgeted vs actual) for a job
export function useJobCostComparison(jobId: string | undefined) {
  const { data: financial } = useJobFinancial(jobId);

  const comparison: JobCostComparison[] = [];

  if (financial) {
    const categories = [
      { key: 'labour', label: 'Labour', budget: 'budget_labour', actual: 'actual_labour' },
      { key: 'materials', label: 'Materials', budget: 'budget_materials', actual: 'actual_materials' },
      { key: 'equipment', label: 'Equipment', budget: 'budget_equipment', actual: 'actual_equipment' },
      { key: 'overheads', label: 'Overheads', budget: 'budget_overheads', actual: 'actual_overheads' },
    ];

    categories.forEach(cat => {
      const budgeted = Number((financial as any)[cat.budget] || 0);
      const actual = Number((financial as any)[cat.actual] || 0);
      const variance = budgeted - actual;
      const variancePercent = budgeted > 0 ? (variance / budgeted) * 100 : 0;

      comparison.push({
        category: cat.label,
        budgeted,
        actual,
        variance,
        variancePercent,
      });
    });

    // Add totals row
    comparison.push({
      category: 'Total',
      budgeted: Number(financial.budget_total || 0),
      actual: Number(financial.actual_total || 0),
      variance: Number(financial.budget_total || 0) - Number(financial.actual_total || 0),
      variancePercent: Number(financial.margin || 0),
    });
  }

  return comparison;
}

// Update budget values
export function useUpdateBudgetValues() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ jobId, budgets }: {
      jobId: string;
      budgets: {
        labour?: number;
        materials?: number;
        equipment?: number;
        overheads?: number;
        profit?: number;
      };
    }): Promise<JobFinancial> => {
      // Get current values
      const { data: current, error: fetchError } = await supabase
        .from('employer_job_financials')
        .select('*')
        .eq('job_id', jobId)
        .single();

      if (fetchError) throw fetchError;

      const updates: Record<string, number | string> = {};

      if (budgets.labour !== undefined) updates.budget_labour = budgets.labour;
      if (budgets.materials !== undefined) updates.budget_materials = budgets.materials;
      if (budgets.equipment !== undefined) updates.budget_equipment = budgets.equipment;
      if (budgets.overheads !== undefined) updates.budget_overheads = budgets.overheads;
      if (budgets.profit !== undefined) updates.budget_profit = budgets.profit;

      // Recalculate total
      const labour = budgets.labour ?? Number(current.budget_labour || 0);
      const materials = budgets.materials ?? Number(current.budget_materials || 0);
      const equipment = budgets.equipment ?? Number(current.budget_equipment || 0);
      const overheads = budgets.overheads ?? Number(current.budget_overheads || 0);
      const profit = budgets.profit ?? Number(current.budget_profit || 0);

      updates.budget_total = labour + materials + equipment + overheads + profit;

      // Recalculate margin
      const actualTotal = Number(current.actual_total || 0);
      if (updates.budget_total > 0) {
        updates.margin = ((updates.budget_total - actualTotal) / updates.budget_total) * 100;
        updates.status = actualTotal > updates.budget_total ? 'Over Budget' :
                        actualTotal < updates.budget_total * 0.9 ? 'Under Budget' : 'On Budget';
      }

      const { data: result, error } = await supabase
        .from('employer_job_financials')
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
        title: "Budget Updated",
        description: "Job budget has been updated.",
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

// Create job financial record (for new jobs)
export function useCreateJobFinancial() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: {
      job_id: string;
      budget_labour?: number;
      budget_materials?: number;
      budget_equipment?: number;
      budget_overheads?: number;
      budget_profit?: number;
    }): Promise<JobFinancial> => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      const labour = data.budget_labour || 0;
      const materials = data.budget_materials || 0;
      const equipment = data.budget_equipment || 0;
      const overheads = data.budget_overheads || 0;
      const profit = data.budget_profit || 0;

      const { data: result, error } = await supabase
        .from('employer_job_financials')
        .insert({
          ...data,
          user_id: userData.user.id,
          budget_total: labour + materials + equipment + overheads + profit,
          actual_labour: 0,
          actual_materials: 0,
          actual_equipment: 0,
          actual_overheads: 0,
          actual_total: 0,
          invoiced: 0,
          paid: 0,
          margin: 100,
          status: 'Under Budget',
        })
        .select()
        .single();

      if (error) throw error;
      return result as JobFinancial;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-financials'] });
      toast({
        title: "Budget Created",
        description: "Job budget sheet has been created.",
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

// Update variation order with full details
export function useUpdateVariationOrder() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, updates }: {
      id: string;
      updates: Partial<Omit<VariationOrder, 'id' | 'created_at' | 'user_id'>>;
    }): Promise<VariationOrder> => {
      const { data: result, error } = await supabase
        .from('employer_variation_orders')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result as VariationOrder;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-financials'] });
      toast({
        title: "Variation Order Updated",
        description: "The variation order has been updated.",
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

// Fetch variation orders by status
export function useVariationOrdersByStatus(status?: VariationOrder['status']) {
  return useQuery({
    queryKey: ['variation-orders', 'status', status],
    queryFn: async (): Promise<(VariationOrder & { job?: { title: string; client: string } })[]> => {
      let query = supabase
        .from('employer_variation_orders')
        .select(`
          *,
          job:employer_jobs(title, client)
        `)
        .order('created_at', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
  });
}

// Update invoiced/paid amounts
export function useUpdateJobPayments() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ jobId, invoiced, paid }: {
      jobId: string;
      invoiced?: number;
      paid?: number;
    }): Promise<JobFinancial> => {
      const updates: Record<string, number> = {};
      if (invoiced !== undefined) updates.invoiced = invoiced;
      if (paid !== undefined) updates.paid = paid;

      const { data: result, error } = await supabase
        .from('employer_job_financials')
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
        title: "Payments Updated",
        description: "Invoiced/paid amounts have been updated.",
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
