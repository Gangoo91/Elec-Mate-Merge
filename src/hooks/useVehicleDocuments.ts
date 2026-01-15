import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type DocumentType = "mot_certificate" | "insurance" | "v5" | "service_invoice" | "breakdown_cover" | "other";

export interface VehicleDocument {
  id: string;
  user_id: string;
  vehicle_id: string;
  document_type: DocumentType;
  name: string;
  file_url: string;
  expiry_date?: string;
  issue_date?: string;
  reference_number?: string;
  provider?: string;
  notes?: string;
  created_at: string;
}

export type CreateDocumentInput = Omit<VehicleDocument, "id" | "user_id" | "created_at">;

export const DOCUMENT_TYPES: Array<{ value: DocumentType; label: string }> = [
  { value: "mot_certificate", label: "MOT Certificate" },
  { value: "insurance", label: "Insurance" },
  { value: "v5", label: "V5 (Log Book)" },
  { value: "service_invoice", label: "Service Invoice" },
  { value: "breakdown_cover", label: "Breakdown Cover" },
  { value: "other", label: "Other" },
];

// Fetch documents for a specific vehicle
export function useVehicleDocuments(vehicleId: string | undefined) {
  return useQuery({
    queryKey: ["vehicleDocuments", vehicleId],
    queryFn: async (): Promise<VehicleDocument[]> => {
      if (!vehicleId) return [];

      const { data, error } = await supabase
        .from("vehicle_documents")
        .select("*")
        .eq("vehicle_id", vehicleId)
        .order("document_type", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as VehicleDocument[];
    },
    enabled: !!vehicleId,
  });
}

// Get expiring documents count
export function useExpiringDocuments(vehicleId: string | undefined) {
  return useQuery({
    queryKey: ["expiringDocuments", vehicleId],
    queryFn: async () => {
      if (!vehicleId) return null;

      const { data, error } = await supabase
        .from("vehicle_documents")
        .select("expiry_date, document_type")
        .eq("vehicle_id", vehicleId)
        .not("expiry_date", "is", null);

      if (error) throw error;

      const today = new Date().toISOString().split("T")[0];
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      return {
        expired: data.filter(d => d.expiry_date && d.expiry_date < today).length,
        expiringIn7Days: data.filter(d => d.expiry_date && d.expiry_date >= today && d.expiry_date <= sevenDaysFromNow).length,
        expiringIn30Days: data.filter(d => d.expiry_date && d.expiry_date > sevenDaysFromNow && d.expiry_date <= thirtyDaysFromNow).length,
      };
    },
    enabled: !!vehicleId,
  });
}

// Upload document file and create record
export function useUploadDocument() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      file,
      vehicleId,
      documentType,
      name,
      expiryDate,
      issueDate,
      referenceNumber,
      provider,
      notes,
    }: {
      file: File;
      vehicleId: string;
      documentType: DocumentType;
      name: string;
      expiryDate?: string;
      issueDate?: string;
      referenceNumber?: string;
      provider?: string;
      notes?: string;
    }): Promise<VehicleDocument> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Upload file to storage
      const fileName = `vehicle-documents/${user.id}/${vehicleId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("visual-uploads")
        .upload(fileName, file, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("visual-uploads")
        .getPublicUrl(uploadData.path);

      // Create document record
      const { data, error } = await supabase
        .from("vehicle_documents")
        .insert({
          user_id: user.id,
          vehicle_id: vehicleId,
          document_type: documentType,
          name,
          file_url: urlData.publicUrl,
          expiry_date: expiryDate || null,
          issue_date: issueDate || null,
          reference_number: referenceNumber || null,
          provider: provider || null,
          notes: notes || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data as VehicleDocument;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["vehicleDocuments", data.vehicle_id] });
      queryClient.invalidateQueries({ queryKey: ["expiringDocuments", data.vehicle_id] });
      toast({
        title: "Document uploaded",
        description: `${data.name} has been uploaded successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Delete a document
export function useDeleteDocument() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, vehicleId, fileUrl }: { id: string; vehicleId: string; fileUrl: string }): Promise<void> => {
      // Delete from storage (extract path from URL)
      const urlParts = fileUrl.split("/visual-uploads/");
      if (urlParts.length > 1) {
        await supabase.storage.from("visual-uploads").remove([urlParts[1]]);
      }

      // Delete record
      const { error } = await supabase
        .from("vehicle_documents")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["vehicleDocuments", variables.vehicleId] });
      queryClient.invalidateQueries({ queryKey: ["expiringDocuments", variables.vehicleId] });
      toast({
        title: "Document deleted",
        description: "The document has been removed.",
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
