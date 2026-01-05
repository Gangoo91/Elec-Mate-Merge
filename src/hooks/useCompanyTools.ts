import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Types
export interface CompanyTool {
  id: string;
  tool_number: string;
  name: string;
  category: string;
  serial_number: string | null;
  purchase_date: string | null;
  purchase_price: number;
  assigned_to: string | null;
  assigned_to_employee_id: string | null;
  status: 'Available' | 'In Use' | 'On Hire' | 'Under Repair' | 'Lost' | 'Written Off';
  last_calibration: string | null;
  next_calibration: string | null;
  pat_date: string | null;
  pat_due: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateToolData {
  name: string;
  category: string;
  serial_number?: string;
  purchase_date?: string;
  purchase_price?: number;
  assigned_to?: string;
  assigned_to_employee_id?: string;
  status?: string;
  last_calibration?: string;
  next_calibration?: string;
  pat_date?: string;
  pat_due?: string;
  notes?: string;
}

export interface UpdateToolData extends Partial<CreateToolData> {}

// Fetch all tools
export function useCompanyTools() {
  return useQuery({
    queryKey: ['company-tools'],
    queryFn: async (): Promise<CompanyTool[]> => {
      const { data, error } = await supabase
        .from('company_tools')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as CompanyTool[];
    },
  });
}

// Fetch single tool
export function useCompanyTool(id: string | undefined) {
  return useQuery({
    queryKey: ['company-tools', id],
    queryFn: async (): Promise<CompanyTool | null> => {
      if (!id) return null;

      const { data, error } = await supabase
        .from('company_tools')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as CompanyTool;
    },
    enabled: !!id,
  });
}

// Fetch tools by status
export function useToolsByStatus(status: string) {
  return useQuery({
    queryKey: ['company-tools', 'status', status],
    queryFn: async (): Promise<CompanyTool[]> => {
      const { data, error } = await supabase
        .from('company_tools')
        .select('*')
        .eq('status', status)
        .order('name');

      if (error) throw error;
      return data as CompanyTool[];
    },
  });
}

// Fetch tools by category
export function useToolsByCategory(category: string) {
  return useQuery({
    queryKey: ['company-tools', 'category', category],
    queryFn: async (): Promise<CompanyTool[]> => {
      const { data, error } = await supabase
        .from('company_tools')
        .select('*')
        .eq('category', category)
        .order('name');

      if (error) throw error;
      return data as CompanyTool[];
    },
  });
}

// Create tool
export function useCreateTool() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateToolData): Promise<CompanyTool> => {
      const { data: result, error } = await supabase
        .from('company_tools')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return result as CompanyTool;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company-tools'] });
      toast({
        title: "Tool Added",
        description: "The equipment has been added to the inventory.",
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

// Update tool
export function useUpdateTool() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateToolData }): Promise<CompanyTool> => {
      const { data: result, error } = await supabase
        .from('company_tools')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result as CompanyTool;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['company-tools'] });
      queryClient.invalidateQueries({ queryKey: ['company-tools', id] });
      toast({
        title: "Tool Updated",
        description: "The equipment details have been updated.",
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

// Delete tool
export function useDeleteTool() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from('company_tools')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company-tools'] });
      toast({
        title: "Tool Removed",
        description: "The equipment has been removed from the inventory.",
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

// Update tool status
export function useUpdateToolStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, status, assignedTo, assignedToEmployeeId }: {
      id: string;
      status: string;
      assignedTo?: string;
      assignedToEmployeeId?: string;
    }): Promise<CompanyTool> => {
      const updates: any = { status };
      if (assignedTo !== undefined) updates.assigned_to = assignedTo;
      if (assignedToEmployeeId !== undefined) updates.assigned_to_employee_id = assignedToEmployeeId;

      const { data, error } = await supabase
        .from('company_tools')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as CompanyTool;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company-tools'] });
      toast({
        title: "Status Updated",
        description: "Tool status has been updated.",
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

// Log calibration/service
export function useLogService() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, serviceType, date, nextDue }: {
      id: string;
      serviceType: 'calibration' | 'pat';
      date: string;
      nextDue?: string;
    }): Promise<CompanyTool> => {
      const updates: any = {};

      if (serviceType === 'calibration') {
        updates.last_calibration = date;
        if (nextDue) updates.next_calibration = nextDue;
      } else if (serviceType === 'pat') {
        updates.pat_date = date;
        if (nextDue) updates.pat_due = nextDue;
      }

      const { data, error } = await supabase
        .from('company_tools')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as CompanyTool;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company-tools'] });
      toast({
        title: "Service Logged",
        description: "Service record has been updated.",
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

// Get tool stats
export function useToolStats() {
  const { data: tools = [] } = useCompanyTools();

  const now = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

  const toolsDuePAT = tools.filter(t => {
    if (!t.pat_due) return false;
    const dueDate = new Date(t.pat_due);
    return dueDate > now && dueDate <= thirtyDaysFromNow;
  }).length;

  const toolsDueCalibration = tools.filter(t => {
    if (!t.next_calibration) return false;
    const dueDate = new Date(t.next_calibration);
    return dueDate > now && dueDate <= thirtyDaysFromNow;
  }).length;

  const toolsOverdue = tools.filter(t => {
    const patOverdue = t.pat_due && new Date(t.pat_due) < now;
    const calOverdue = t.next_calibration && new Date(t.next_calibration) < now;
    return patOverdue || calOverdue;
  }).length;

  return {
    total: tools.length,
    available: tools.filter(t => t.status === 'Available').length,
    inUse: tools.filter(t => t.status === 'In Use').length,
    onHire: tools.filter(t => t.status === 'On Hire').length,
    underRepair: tools.filter(t => t.status === 'Under Repair').length,
    toolsDuePAT,
    toolsDueCalibration,
    toolsDue: toolsDuePAT + toolsDueCalibration,
    toolsOverdue,
    totalValue: tools.reduce((sum, t) => sum + Number(t.purchase_price || 0), 0),
  };
}

// Get categories
export function useToolCategories() {
  const { data: tools = [] } = useCompanyTools();

  const categories = [...new Set(tools.map(t => t.category))].sort();
  return categories;
}
