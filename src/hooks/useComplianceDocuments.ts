import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type DocumentType = "RAMS Sign-off" | "Permit" | "Induction" | "Briefing" | "Method Statement" | "Certificate" | "Policy";
export type DocumentCategory = "Safety" | "Permits" | "Induction" | "Training" | "Legal" | "Insurance";
export type DocumentStatus = "Current" | "Expiring" | "Expired" | "Draft" | "Pending";

export interface ComplianceDocument {
  id: string;
  user_id: string;
  title: string;
  document_type?: DocumentType;
  category?: DocumentCategory;
  description?: string;
  status: DocumentStatus;
  expiry_date?: string;
  renewal_date?: string;
  signatures_required: number;
  signatures_collected: number;
  file_url?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export type CreateComplianceDocumentInput = Omit<ComplianceDocument, "id" | "user_id" | "created_at" | "updated_at">;
export type UpdateComplianceDocumentInput = Partial<CreateComplianceDocumentInput>;

// Fetch all compliance documents for the current user
export function useComplianceDocuments() {
  return useQuery({
    queryKey: ["complianceDocuments"],
    queryFn: async (): Promise<ComplianceDocument[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("compliance_documents")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ComplianceDocument[];
    },
  });
}

// Fetch compliance documents by category
export function useComplianceDocumentsByCategory(category: DocumentCategory) {
  return useQuery({
    queryKey: ["complianceDocuments", "category", category],
    queryFn: async (): Promise<ComplianceDocument[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("compliance_documents")
        .select("*")
        .eq("user_id", user.id)
        .eq("category", category)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ComplianceDocument[];
    },
  });
}

// Fetch compliance documents by status
export function useComplianceDocumentsByStatus(status: DocumentStatus) {
  return useQuery({
    queryKey: ["complianceDocuments", "status", status],
    queryFn: async (): Promise<ComplianceDocument[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("compliance_documents")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", status)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ComplianceDocument[];
    },
  });
}

// Get compliance statistics
export function useComplianceStats() {
  return useQuery({
    queryKey: ["complianceDocuments", "stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("compliance_documents")
        .select("id, status, signatures_required, signatures_collected, expiry_date")
        .eq("user_id", user.id);

      if (error) throw error;

      const today = new Date().toISOString().split("T")[0];
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      const totalSignaturesRequired = data.reduce((sum, d) => sum + (d.signatures_required || 0), 0);
      const totalSignaturesCollected = data.reduce((sum, d) => sum + (d.signatures_collected || 0), 0);

      const stats = {
        total: data.length,
        current: data.filter(d => d.status === "Current").length,
        pending: data.filter(d => d.status === "Pending" || (d.signatures_required > d.signatures_collected)).length,
        expiring: data.filter(d =>
          d.expiry_date &&
          d.expiry_date >= today &&
          d.expiry_date <= thirtyDaysFromNow
        ).length,
        expired: data.filter(d => d.status === "Expired" || (d.expiry_date && d.expiry_date < today)).length,
        signaturesRequired: totalSignaturesRequired,
        signaturesCollected: totalSignaturesCollected,
        complianceScore: totalSignaturesRequired > 0
          ? Math.round((totalSignaturesCollected / totalSignaturesRequired) * 100)
          : 100,
      };

      return stats;
    },
  });
}

// Create a new compliance document
export function useCreateComplianceDocument() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateComplianceDocumentInput): Promise<ComplianceDocument> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("compliance_documents")
        .insert({ ...input, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data as ComplianceDocument;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complianceDocuments"] });
      toast({
        title: "Document added",
        description: "The compliance document has been created successfully.",
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

// Update an existing compliance document
export function useUpdateComplianceDocument() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateComplianceDocumentInput & { id: string }): Promise<ComplianceDocument> => {
      const { data, error } = await supabase
        .from("compliance_documents")
        .update({ ...input, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as ComplianceDocument;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complianceDocuments"] });
      toast({
        title: "Document updated",
        description: "The compliance document has been updated successfully.",
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

// Update signatures count
export function useUpdateSignatures() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, signatures_collected }: { id: string; signatures_collected: number }): Promise<ComplianceDocument> => {
      const { data, error } = await supabase
        .from("compliance_documents")
        .update({
          signatures_collected,
          updated_at: new Date().toISOString()
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as ComplianceDocument;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["complianceDocuments"] });

      if (data.signatures_collected >= data.signatures_required) {
        toast({
          title: "All signatures collected",
          description: "The document now has all required signatures.",
        });
      } else {
        toast({
          title: "Signature recorded",
          description: `${data.signatures_collected}/${data.signatures_required} signatures collected.`,
        });
      }
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

// Delete a compliance document
export function useDeleteComplianceDocument() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from("compliance_documents")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complianceDocuments"] });
      toast({
        title: "Document deleted",
        description: "The compliance document has been removed.",
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
