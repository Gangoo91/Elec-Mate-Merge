import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type RAMSStatus = "draft" | "submitted" | "approved" | "rejected";

export interface RAMSRisk {
  id: string;
  hazard: string;
  risk_level: "low" | "medium" | "high";
  control_measures: string[];
  residual_risk: "low" | "medium" | "high";
  responsible_person?: string;
}

export interface RAMSDocument {
  id: string;
  user_id: string;
  project_name: string;
  location: string;
  date: string;
  assessor: string;
  contractor?: string;
  supervisor?: string;
  activities: string[];
  risks: RAMSRisk[];
  status: RAMSStatus;
  version: number;
  pdf_url?: string;
  created_at: string;
  updated_at: string;
  last_autosave_at?: string;
  ai_generation_metadata?: Record<string, unknown>;
  job_scale?: string;
  required_ppe: string[];
  ppe_details?: Record<string, unknown>[];
}

export type CreateRAMSDocumentInput = Omit<RAMSDocument, "id" | "user_id" | "created_at" | "updated_at" | "version">;
export type UpdateRAMSDocumentInput = Partial<CreateRAMSDocumentInput>;

// Fetch all RAMS documents for the current user
export function useRAMSDocuments() {
  return useQuery({
    queryKey: ["ramsDocuments"],
    queryFn: async (): Promise<RAMSDocument[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("rams_documents")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      return data as RAMSDocument[];
    },
  });
}

// Fetch RAMS documents by status
export function useRAMSDocumentsByStatus(status: RAMSStatus) {
  return useQuery({
    queryKey: ["ramsDocuments", "status", status],
    queryFn: async (): Promise<RAMSDocument[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("rams_documents")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", status)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      return data as RAMSDocument[];
    },
  });
}

// Fetch a single RAMS document by ID
export function useRAMSDocument(id: string | undefined) {
  return useQuery({
    queryKey: ["ramsDocuments", id],
    queryFn: async (): Promise<RAMSDocument | null> => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("rams_documents")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as RAMSDocument;
    },
    enabled: !!id,
  });
}

// Get RAMS document statistics
export function useRAMSDocumentStats() {
  return useQuery({
    queryKey: ["ramsDocuments", "stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("rams_documents")
        .select("id, status, created_at")
        .eq("user_id", user.id);

      if (error) throw error;

      const thisMonth = new Date();
      thisMonth.setDate(1);
      const thisMonthStr = thisMonth.toISOString();

      const stats = {
        total: data.length,
        draft: data.filter(d => d.status === "draft").length,
        submitted: data.filter(d => d.status === "submitted").length,
        approved: data.filter(d => d.status === "approved").length,
        rejected: data.filter(d => d.status === "rejected").length,
        thisMonth: data.filter(d => d.created_at >= thisMonthStr).length,
      };

      return stats;
    },
  });
}

// Create a new RAMS document
export function useCreateRAMSDocument() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateRAMSDocumentInput): Promise<RAMSDocument> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("rams_documents")
        .insert({ ...input, user_id: user.id, version: 1 })
        .select()
        .single();

      if (error) throw error;
      return data as RAMSDocument;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ramsDocuments"] });
      toast({
        title: "RAMS created",
        description: "The risk assessment has been created successfully.",
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

// Update an existing RAMS document
export function useUpdateRAMSDocument() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateRAMSDocumentInput & { id: string }): Promise<RAMSDocument> => {
      const { data, error } = await supabase
        .from("rams_documents")
        .update({ ...input, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as RAMSDocument;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ramsDocuments"] });
      queryClient.invalidateQueries({ queryKey: ["ramsDocuments", data.id] });
      toast({
        title: "RAMS updated",
        description: "The risk assessment has been updated successfully.",
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

// Autosave RAMS document (silent, no toast)
export function useAutosaveRAMSDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateRAMSDocumentInput & { id: string }): Promise<RAMSDocument> => {
      const { data, error } = await supabase
        .from("rams_documents")
        .update({
          ...input,
          updated_at: new Date().toISOString(),
          last_autosave_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as RAMSDocument;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ramsDocuments"] });
      queryClient.invalidateQueries({ queryKey: ["ramsDocuments", data.id] });
    },
  });
}

// Update RAMS status
export function useUpdateRAMSStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: RAMSStatus }): Promise<RAMSDocument> => {
      const { data, error } = await supabase
        .from("rams_documents")
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as RAMSDocument;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ramsDocuments"] });
      queryClient.invalidateQueries({ queryKey: ["ramsDocuments", data.id] });
      toast({
        title: "Status updated",
        description: `RAMS marked as ${data.status}.`,
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

// Create new version of RAMS document
export function useCreateRAMSVersion() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<RAMSDocument> => {
      // First get the current document
      const { data: current, error: fetchError } = await supabase
        .from("rams_documents")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;

      // Create a new version
      const { id: _, created_at, updated_at, ...rest } = current;
      const { data, error } = await supabase
        .from("rams_documents")
        .insert({
          ...rest,
          version: (current.version || 1) + 1,
          status: "draft",
        })
        .select()
        .single();

      if (error) throw error;
      return data as RAMSDocument;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ramsDocuments"] });
      toast({
        title: "New version created",
        description: "A new version of the RAMS has been created.",
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

// Delete a RAMS document
export function useDeleteRAMSDocument() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from("rams_documents")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ramsDocuments"] });
      toast({
        title: "RAMS deleted",
        description: "The risk assessment has been removed.",
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
