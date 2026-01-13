import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type DocumentType = "Quote" | "Contract" | "Certificate" | "RAMS" | "Timesheet" | "Completion" | "Variation" | "Invoice";
export type SignatureStatus = "Pending" | "Sent" | "Viewed" | "Signed" | "Declined" | "Expired";

export interface SignatureRequest {
  id: string;
  user_id: string;
  job_id?: string;
  document_type?: DocumentType;
  document_id?: string;
  document_title: string;
  signer_name: string;
  signer_email?: string;
  signer_phone?: string;
  status: SignatureStatus;
  signature_url?: string;
  signed_at?: string;
  ip_address?: string;
  expires_at?: string;
  message?: string;
  linked_invoice?: string;
  created_at: string;
  updated_at: string;
  // Joined data
  job?: {
    id: string;
    title: string;
    client?: string;
  };
}

export type CreateSignatureRequestInput = Omit<SignatureRequest, "id" | "user_id" | "created_at" | "updated_at" | "job">;
export type UpdateSignatureRequestInput = Partial<CreateSignatureRequestInput>;

// Fetch all signature requests for the current user
export function useSignatureRequests() {
  return useQuery({
    queryKey: ["signatureRequests"],
    queryFn: async (): Promise<SignatureRequest[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("signature_requests")
        .select(`
          *,
          job:employer_jobs(id, title, client)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as SignatureRequest[];
    },
  });
}

// Fetch pending signature requests
export function usePendingSignatures() {
  return useQuery({
    queryKey: ["signatureRequests", "pending"],
    queryFn: async (): Promise<SignatureRequest[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("signature_requests")
        .select(`
          *,
          job:employer_jobs(id, title, client)
        `)
        .eq("user_id", user.id)
        .in("status", ["Pending", "Sent", "Viewed"])
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as SignatureRequest[];
    },
  });
}

// Get signature request statistics
export function useSignatureStats() {
  return useQuery({
    queryKey: ["signatureRequests", "stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("signature_requests")
        .select("id, status, expires_at")
        .eq("user_id", user.id);

      if (error) throw error;

      const today = new Date().toISOString();

      const stats = {
        total: data.length,
        pending: data.filter(s => ["Pending", "Sent", "Viewed"].includes(s.status)).length,
        signed: data.filter(s => s.status === "Signed").length,
        declined: data.filter(s => s.status === "Declined").length,
        expired: data.filter(s => s.status === "Expired" || (s.expires_at && s.expires_at < today && s.status !== "Signed")).length,
      };

      return stats;
    },
  });
}

// Create a new signature request
export function useCreateSignatureRequest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateSignatureRequestInput): Promise<SignatureRequest> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("signature_requests")
        .insert({ ...input, user_id: user.id })
        .select(`
          *,
          job:employer_jobs(id, title, client)
        `)
        .single();

      if (error) throw error;
      return data as SignatureRequest;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["signatureRequests"] });
      toast({
        title: "Signature request created",
        description: `Request sent to ${data.signer_name}.`,
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

// Update a signature request
export function useUpdateSignatureRequest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateSignatureRequestInput & { id: string }): Promise<SignatureRequest> => {
      const { data, error } = await supabase
        .from("signature_requests")
        .update({ ...input, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select(`
          *,
          job:employer_jobs(id, title, client)
        `)
        .single();

      if (error) throw error;
      return data as SignatureRequest;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signatureRequests"] });
      toast({
        title: "Request updated",
        description: "The signature request has been updated.",
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

// Mark as sent (resend)
export function useResendSignatureRequest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<SignatureRequest> => {
      const { data, error } = await supabase
        .from("signature_requests")
        .update({
          status: "Sent",
          updated_at: new Date().toISOString()
        })
        .eq("id", id)
        .select(`
          *,
          job:employer_jobs(id, title, client)
        `)
        .single();

      if (error) throw error;
      return data as SignatureRequest;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["signatureRequests"] });
      toast({
        title: "Request resent",
        description: `Reminder sent to ${data.signer_name}.`,
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

// Mark signature as signed (for testing/manual entry)
export function useMarkAsSigned() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, signatureUrl }: { id: string; signatureUrl?: string }): Promise<SignatureRequest> => {
      const { data, error } = await supabase
        .from("signature_requests")
        .update({
          status: "Signed",
          signed_at: new Date().toISOString(),
          signature_url: signatureUrl,
          updated_at: new Date().toISOString()
        })
        .eq("id", id)
        .select(`
          *,
          job:employer_jobs(id, title, client)
        `)
        .single();

      if (error) throw error;
      return data as SignatureRequest;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["signatureRequests"] });
      toast({
        title: "Signature recorded",
        description: `${data.signer_name} has signed.`,
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

// Delete a signature request
export function useDeleteSignatureRequest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from("signature_requests")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signatureRequests"] });
      toast({
        title: "Request deleted",
        description: "The signature request has been removed.",
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
