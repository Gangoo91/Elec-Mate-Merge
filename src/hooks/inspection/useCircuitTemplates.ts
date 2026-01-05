import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CircuitTemplate {
  id: string;
  name: string;
  description?: string;
  category?: string;
  isPublic: boolean;
  templateData: any;
  usageCount: number;
  createdAt: string;
}

export const useCircuitTemplates = () => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<CircuitTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load templates
  const loadTemplates = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('circuit_templates')
        .select('*')
        .order('usage_count', { ascending: false });

      if (error) throw error;

      setTemplates(data.map(t => ({
        id: t.id,
        name: t.name,
        description: t.description || undefined,
        category: t.category || undefined,
        isPublic: t.is_public,
        templateData: t.template_data,
        usageCount: t.usage_count,
        createdAt: t.created_at,
      })));
    } catch (error) {
      console.error('Failed to load templates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  // Save template
  const saveTemplate = async (template: Omit<CircuitTemplate, 'id' | 'usageCount' | 'createdAt'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('circuit_templates')
        .insert({
          user_id: user.id,
          name: template.name,
          description: template.description,
          category: template.category,
          is_public: template.isPublic,
          template_data: template.templateData,
        });

      if (error) throw error;

      toast({
        title: 'Template saved',
        description: `Circuit template "${template.name}" has been saved.`,
      });

      await loadTemplates();
    } catch (error) {
      toast({
        title: 'Save failed',
        description: 'Failed to save circuit template.',
        variant: 'destructive',
      });
    }
  };

  // Delete template
  const deleteTemplate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('circuit_templates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Template deleted',
        description: 'Circuit template has been deleted.',
      });

      await loadTemplates();
    } catch (error) {
      toast({
        title: 'Delete failed',
        description: 'Failed to delete circuit template.',
        variant: 'destructive',
      });
    }
  };

  // Use template (increment usage count)
  const useTemplate = async (id: string) => {
    try {
      const template = templates.find(t => t.id === id);
      if (!template) return null;

      // Increment usage count
      await supabase
        .from('circuit_templates')
        .update({ usage_count: template.usageCount + 1 })
        .eq('id', id);

      return template.templateData;
    } catch (error) {
      console.error('Failed to use template:', error);
      return null;
    }
  };

  return {
    templates,
    isLoading,
    saveTemplate,
    deleteTemplate,
    useTemplate,
    refreshTemplates: loadTemplates,
  };
};
