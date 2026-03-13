import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { StructuredSafetyDocument } from '@/types/safety-template';
import {
  cloneStructuredDocument,
  fillFields,
  structuredToHtml,
  normaliseStructuredContent,
} from '@/utils/safety-template-renderer';

export interface SafetyTemplate {
  id: string;
  name: string;
  category: string;
  subcategory: string | null;
  content: string;
  placeholders: string[];
  summary: string | null;
  version: number;
  sort_order: number;
  is_active: boolean;
  regulatory_references: string[];
  structured_content: StructuredSafetyDocument | null;
  created_at: string;
}

export interface UserSafetyDocument {
  id: string;
  user_id: string;
  template_id: string | null;
  name: string;
  content: string;
  status: 'Draft' | 'Active' | 'Review Due' | 'Archived';
  company_name: string | null;
  site_address: string | null;
  structured_content: StructuredSafetyDocument | null;
  adopted_at: string;
  review_date: string | null;
  approved_by: string | null;
  pdf_url: string | null;
  created_at: string;
  updated_at: string;
}

export function useSafetyTemplates(category?: string) {
  return useQuery({
    queryKey: ['safety-templates', category],
    queryFn: async (): Promise<SafetyTemplate[]> => {
      let query = supabase
        .from('safety_document_templates')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return ((data ?? []) as unknown as SafetyTemplate[]).map((t) => ({
        ...t,
        structured_content: normaliseStructuredContent(t.structured_content),
      }));
    },
    staleTime: 300_000,
  });
}

export function useUserSafetyDocuments() {
  return useQuery({
    queryKey: ['user-safety-documents'],
    queryFn: async (): Promise<UserSafetyDocument[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('user_safety_documents')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return ((data ?? []) as unknown as UserSafetyDocument[]).map((d) => ({
        ...d,
        structured_content: normaliseStructuredContent(d.structured_content),
      }));
    },
    staleTime: 60_000,
  });
}

export function useAdoptTemplate() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      templateId,
      name,
      content,
      companyName,
      siteAddress,
      structuredContent,
      fieldValues,
    }: {
      templateId: string;
      name: string;
      content: string;
      companyName?: string;
      siteAddress?: string;
      structuredContent?: StructuredSafetyDocument | null;
      fieldValues?: Record<string, string>;
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Deep-clone and fill structured content if available
      let filledStructured: StructuredSafetyDocument | null = null;
      let htmlContent = content;

      if (structuredContent && fieldValues) {
        filledStructured = fillFields(cloneStructuredDocument(structuredContent), fieldValues);
        htmlContent = structuredToHtml(filledStructured, fieldValues);
      }

      const { data, error } = await supabase
        .from('user_safety_documents')
        .insert({
          user_id: user.id,
          template_id: templateId,
          name,
          content: htmlContent,
          company_name: companyName ?? null,
          site_address: siteAddress ?? null,
          structured_content: filledStructured as any,
          status: 'Draft',
          review_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-safety-documents'] });
      toast({
        title: 'Template Adopted',
        description: 'Document has been added to your library.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Could not adopt template. Please try again.',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateUserDocument() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<UserSafetyDocument> & { id: string }) => {
      const { data, error } = await supabase
        .from('user_safety_documents')
        .update({ ...updates, updated_at: new Date().toISOString() } as any)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-safety-documents'] });
      toast({ title: 'Document Updated' });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Could not update document.',
        variant: 'destructive',
      });
    },
  });
}
