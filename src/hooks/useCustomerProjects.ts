import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface CustomerProject {
  id: string;
  title: string;
  status: string;
  priority: string;
  location: string | null;
  estimatedValue: number | null;
  startDate: string | null;
  dueDate: string | null;
  completedAt: string | null;
  projectType: string | null;
  createdAt: string;
  updatedAt: string;
}

export const useCustomerProjects = (customerId: string) => {
  const [projects, setProjects] = useState<CustomerProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    if (!customerId) {
      setProjects([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('spark_projects')
        .select(
          'id, title, status, priority, location, estimated_value, start_date, due_date, completed_at, project_type, created_at, updated_at'
        )
        .eq('customer_id', customerId)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      setProjects(
        (data || []).map((row) => ({
          id: row.id,
          title: row.title,
          status: row.status,
          priority: row.priority,
          location: row.location,
          estimatedValue: row.estimated_value ? Number(row.estimated_value) : null,
          startDate: row.start_date,
          dueDate: row.due_date,
          completedAt: row.completed_at,
          projectType: row.project_type,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        }))
      );
    } catch {
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    load();
  }, [load]);

  return { projects, isLoading, refresh: load };
};
