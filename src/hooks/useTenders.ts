import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Types
export interface Tender {
  id: string;
  user_id: string;
  tender_number: string;
  title: string;
  client: string;
  value: number;
  deadline: string | null;
  status: 'Open' | 'Submitted' | 'Won' | 'Lost' | 'Withdrawn';
  category: string | null;
  description: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  submission_date: string | null;
  result_date: string | null;
  notes: string | null;
  documents: any[];
  opportunity_id: string | null;
  source_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface TenderEstimate {
  id: string;
  tender_id: string;
  user_id: string;
  labour_hours: number;
  labour_cost: number;
  materials_cost: number;
  equipment_cost: number;
  overheads: number;
  profit: number;
  total_estimate: number;
  hazards: string[];
  programme: string | null;
  rams_scoped: boolean;
  confidence: 'Low' | 'Medium' | 'High';
  notes: string | null;
  created_at: string;
  updated_at: string;
  tender?: Tender;
}

export interface CreateTenderData {
  title: string;
  client: string;
  value?: number;
  deadline?: string;
  status?: Tender['status'];
  category?: string;
  description?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  notes?: string;
  opportunity_id?: string;
  source_url?: string;
}

export interface UpdateTenderData extends Partial<CreateTenderData> {
  submission_date?: string;
  result_date?: string;
  documents?: any[];
}

export interface CreateEstimateData {
  tender_id: string;
  labour_hours?: number;
  labour_cost?: number;
  materials_cost?: number;
  equipment_cost?: number;
  overheads?: number;
  profit?: number;
  total_estimate?: number;
  hazards?: string[];
  programme?: string;
  rams_scoped?: boolean;
  confidence?: TenderEstimate['confidence'];
  notes?: string;
}

// Fetch all tenders
export function useTenders() {
  return useQuery({
    queryKey: ['tenders'],
    queryFn: async (): Promise<Tender[]> => {
      const { data, error } = await supabase
        .from('tenders')
        .select('*')
        .order('deadline', { ascending: true });

      if (error) throw error;
      return (data || []) as Tender[];
    },
  });
}

// Fetch a single tender by ID
export function useTender(id: string | undefined) {
  return useQuery({
    queryKey: ['tenders', id],
    queryFn: async (): Promise<Tender | null> => {
      if (!id) return null;

      const { data, error } = await supabase
        .from('tenders')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Tender;
    },
    enabled: !!id,
  });
}

// Fetch tenders by status
export function useTendersByStatus(status: Tender['status']) {
  return useQuery({
    queryKey: ['tenders', 'status', status],
    queryFn: async (): Promise<Tender[]> => {
      const { data, error } = await supabase
        .from('tenders')
        .select('*')
        .eq('status', status)
        .order('deadline', { ascending: true });

      if (error) throw error;
      return (data || []) as Tender[];
    },
  });
}

// Create tender
export function useCreateTender() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateTenderData): Promise<Tender> => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      const { data: result, error } = await supabase
        .from('tenders')
        .insert({
          ...data,
          user_id: userData.user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return result as Tender;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenders'] });
      toast({
        title: "Tender Created",
        description: "The tender has been added to your tracking list.",
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

// Update tender
export function useUpdateTender() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateTenderData }): Promise<Tender> => {
      const { data: result, error } = await supabase
        .from('tenders')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result as Tender;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['tenders'] });
      queryClient.invalidateQueries({ queryKey: ['tenders', id] });
      toast({
        title: "Tender Updated",
        description: "The tender has been updated successfully.",
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

// Update tender status
export function useUpdateTenderStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, status, resultDate }: { id: string; status: Tender['status']; resultDate?: string }): Promise<Tender> => {
      const updateData: UpdateTenderData = { status };

      if (status === 'Submitted') {
        updateData.submission_date = new Date().toISOString().split('T')[0];
      }

      if ((status === 'Won' || status === 'Lost') && resultDate) {
        updateData.result_date = resultDate;
      }

      const { data: result, error } = await supabase
        .from('tenders')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result as Tender;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tenders'] });

      const messages: Record<Tender['status'], string> = {
        'Open': 'Tender reopened',
        'Submitted': 'Tender marked as submitted',
        'Won': 'Congratulations! Tender won!',
        'Lost': 'Tender marked as lost',
        'Withdrawn': 'Tender withdrawn',
      };

      toast({
        title: "Status Updated",
        description: messages[data.status],
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

// Delete tender
export function useDeleteTender() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from('tenders')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenders'] });
      toast({
        title: "Tender Deleted",
        description: "The tender has been removed.",
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

// Fetch estimates for a tender
export function useTenderEstimates(tenderId?: string) {
  return useQuery({
    queryKey: ['tender-estimates', tenderId],
    queryFn: async (): Promise<TenderEstimate[]> => {
      let query = supabase
        .from('tender_estimates')
        .select('*, tender:tenders(*)');

      if (tenderId) {
        query = query.eq('tender_id', tenderId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []) as TenderEstimate[];
    },
    enabled: tenderId === undefined || !!tenderId,
  });
}

// Fetch all estimates (for the AI Estimates section)
export function useAllTenderEstimates() {
  return useQuery({
    queryKey: ['tender-estimates', 'all'],
    queryFn: async (): Promise<(TenderEstimate & { tender: Tender })[]> => {
      const { data, error } = await supabase
        .from('tender_estimates')
        .select('*, tender:tenders(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []) as (TenderEstimate & { tender: Tender })[];
    },
  });
}

// Create estimate
export function useCreateTenderEstimate() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateEstimateData): Promise<TenderEstimate> => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      const { data: result, error } = await supabase
        .from('tender_estimates')
        .insert({
          ...data,
          user_id: userData.user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return result as TenderEstimate;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tender-estimates'] });
      queryClient.invalidateQueries({ queryKey: ['tender-estimates', variables.tender_id] });
      toast({
        title: "Estimate Created",
        description: "The tender estimate has been saved.",
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

// Delete estimate
export function useDeleteTenderEstimate() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from('tender_estimates')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tender-estimates'] });
      toast({
        title: "Estimate Deleted",
        description: "The estimate has been removed.",
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

// Tender statistics
export function useTenderStats() {
  const { data: tenders = [] } = useTenders();

  const stats = {
    open: tenders.filter(t => t.status === 'Open').length,
    submitted: tenders.filter(t => t.status === 'Submitted').length,
    won: tenders.filter(t => t.status === 'Won').length,
    lost: tenders.filter(t => t.status === 'Lost').length,
    openValue: tenders.filter(t => t.status === 'Open').reduce((sum, t) => sum + Number(t.value), 0),
    wonValue: tenders.filter(t => t.status === 'Won').reduce((sum, t) => sum + Number(t.value), 0),
    winRate: tenders.filter(t => t.status === 'Won' || t.status === 'Lost').length > 0
      ? (tenders.filter(t => t.status === 'Won').length / tenders.filter(t => t.status === 'Won' || t.status === 'Lost').length) * 100
      : 0,
  };

  return stats;
}

// Document types
export interface TenderDocument {
  id: string;
  name: string;
  url: string;
  size?: number;
  uploaded_at: string;
}

// Upload tender document
export function useUploadTenderDocument() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ tenderId, file }: { tenderId: string; file: File }): Promise<TenderDocument> => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const timestamp = Date.now();
      const uniqueName = `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const storagePath = `${userData.user.id}/${tenderId}/${uniqueName}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('tender-documents')
        .upload(storagePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('tender-documents')
        .getPublicUrl(storagePath);

      const newDoc: TenderDocument = {
        id: `doc-${timestamp}`,
        name: file.name,
        url: urlData.publicUrl,
        size: file.size,
        uploaded_at: new Date().toISOString(),
      };

      // Get current tender to update documents array
      const { data: tender, error: fetchError } = await supabase
        .from('tenders')
        .select('documents')
        .eq('id', tenderId)
        .single();

      if (fetchError) throw fetchError;

      const currentDocs = Array.isArray(tender.documents) ? tender.documents : [];
      const updatedDocs = [...currentDocs, newDoc];

      // Update tender with new document
      const { error: updateError } = await supabase
        .from('tenders')
        .update({ documents: updatedDocs })
        .eq('id', tenderId);

      if (updateError) throw updateError;

      return newDoc;
    },
    onSuccess: (_, { tenderId }) => {
      queryClient.invalidateQueries({ queryKey: ['tenders'] });
      queryClient.invalidateQueries({ queryKey: ['tenders', tenderId] });
      toast({
        title: "Document Uploaded",
        description: "The document has been added to the tender.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Delete tender document
export function useDeleteTenderDocument() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ tenderId, documentId, url }: { tenderId: string; documentId: string; url: string }): Promise<void> => {
      // Try to delete from storage (extract path from URL)
      try {
        const urlObj = new URL(url);
        const pathMatch = urlObj.pathname.match(/\/tender-documents\/(.+)$/);
        if (pathMatch) {
          await supabase.storage.from('tender-documents').remove([pathMatch[1]]);
        }
      } catch (e) {
        // Storage deletion is best-effort
        console.warn('Could not delete file from storage:', e);
      }

      // Get current tender
      const { data: tender, error: fetchError } = await supabase
        .from('tenders')
        .select('documents')
        .eq('id', tenderId)
        .single();

      if (fetchError) throw fetchError;

      const currentDocs = Array.isArray(tender.documents) ? tender.documents : [];
      const updatedDocs = currentDocs.filter((doc: TenderDocument) => doc.id !== documentId);

      // Update tender
      const { error: updateError } = await supabase
        .from('tenders')
        .update({ documents: updatedDocs })
        .eq('id', tenderId);

      if (updateError) throw updateError;
    },
    onSuccess: (_, { tenderId }) => {
      queryClient.invalidateQueries({ queryKey: ['tenders'] });
      queryClient.invalidateQueries({ queryKey: ['tenders', tenderId] });
      toast({
        title: "Document Deleted",
        description: "The document has been removed.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Delete Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Generate AI tender estimate
export function useGenerateTenderEstimate() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ tenderId, documentUrls, description }: {
      tenderId: string;
      documentUrls: string[];
      description?: string;
    }): Promise<CreateEstimateData & { id: string }> => {
      const { data, error } = await supabase.functions.invoke('generate-tender-estimate', {
        body: { tenderId, documentUrls, description },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (_, { tenderId }) => {
      queryClient.invalidateQueries({ queryKey: ['tender-estimates'] });
      queryClient.invalidateQueries({ queryKey: ['tender-estimates', tenderId] });
      toast({
        title: "Estimate Generated",
        description: "AI has generated a cost estimate for this tender.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Estimation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
