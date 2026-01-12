import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type ContractType = "Employment" | "Subcontractor" | "Client" | "Supplier" | "Apprentice";
export type ContractCategory = "Employment" | "Job Descriptions" | "Performance" | "Procedures" | "Templates";
export type ContractStatus = "Draft" | "Active" | "Expired" | "Terminated" | "Template";

export interface Contract {
  id: string;
  user_id: string;
  employee_id?: string;
  contract_type?: ContractType;
  category?: ContractCategory;
  title: string;
  party_name?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  value?: number;
  status: ContractStatus;
  file_url?: string;
  notes?: string;
  is_template: boolean;
  created_at: string;
  updated_at: string;
  // Joined data
  employee?: {
    id: string;
    name: string;
  };
}

export type CreateContractInput = Omit<Contract, "id" | "user_id" | "created_at" | "updated_at" | "employee">;
export type UpdateContractInput = Partial<CreateContractInput>;

// Fetch all contracts for the current user (non-templates)
export function useContracts() {
  return useQuery({
    queryKey: ["contracts"],
    queryFn: async (): Promise<Contract[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("contracts")
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .eq("user_id", user.id)
        .eq("is_template", false)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Contract[];
    },
  });
}

// Fetch contract templates only
export function useContractTemplates() {
  return useQuery({
    queryKey: ["contracts", "templates"],
    queryFn: async (): Promise<Contract[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("contracts")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_template", true)
        .order("category", { ascending: true })
        .order("title", { ascending: true });

      if (error) throw error;
      return data as Contract[];
    },
  });
}

// Fetch active contracts
export function useActiveContracts() {
  return useQuery({
    queryKey: ["contracts", "active"],
    queryFn: async (): Promise<Contract[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("contracts")
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .eq("user_id", user.id)
        .eq("is_template", false)
        .eq("status", "Active")
        .order("start_date", { ascending: false });

      if (error) throw error;
      return data as Contract[];
    },
  });
}

// Get contract statistics
export function useContractStats() {
  return useQuery({
    queryKey: ["contracts", "stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("contracts")
        .select("id, status, is_template, end_date")
        .eq("user_id", user.id);

      if (error) throw error;

      const today = new Date().toISOString().split("T")[0];
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      const stats = {
        total: data.filter(c => !c.is_template).length,
        templates: data.filter(c => c.is_template).length,
        active: data.filter(c => !c.is_template && c.status === "Active").length,
        expired: data.filter(c => !c.is_template && (c.status === "Expired" || (c.end_date && c.end_date < today))).length,
        expiringSoon: data.filter(c =>
          !c.is_template &&
          c.end_date &&
          c.end_date >= today &&
          c.end_date <= thirtyDaysFromNow
        ).length,
        draft: data.filter(c => !c.is_template && c.status === "Draft").length,
      };

      return stats;
    },
  });
}

// Create a new contract
export function useCreateContract() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateContractInput): Promise<Contract> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("contracts")
        .insert({ ...input, user_id: user.id })
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;
      return data as Contract;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      toast({
        title: data.is_template ? "Template created" : "Contract created",
        description: `${data.title} has been created successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Update an existing contract
export function useUpdateContract() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateContractInput & { id: string }): Promise<Contract> => {
      const { data, error } = await supabase
        .from("contracts")
        .update({ ...input, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;
      return data as Contract;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      toast({
        title: "Contract updated",
        description: "The contract has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Update contract status
export function useUpdateContractStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ContractStatus }): Promise<Contract> => {
      const { data, error } = await supabase
        .from("contracts")
        .update({
          status,
          updated_at: new Date().toISOString()
        })
        .eq("id", id)
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;
      return data as Contract;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      toast({
        title: "Status updated",
        description: `Contract marked as ${data.status}.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Delete a contract
export function useDeleteContract() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from("contracts")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      toast({
        title: "Contract deleted",
        description: "The contract has been removed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
