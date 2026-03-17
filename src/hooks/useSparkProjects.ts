import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type ProjectStatus = 'open' | 'active' | 'completed' | 'cancelled';
export type ProjectPriority = 'low' | 'normal' | 'high' | 'urgent';
export type ProjectView = 'active' | 'completed' | 'all';

export interface SparkProject {
  id: string;
  userId: string;
  title: string;
  description?: string;
  projectType?: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  customerId?: string;
  customerName?: string;
  location?: string;
  estimatedValue?: number;
  startDate?: string;
  dueDate?: string;
  completedAt?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  totalTasks: number;
  completedTasks: number;
  progress: number;
}

export interface CreateProjectInput {
  title: string;
  description?: string;
  projectType?: string;
  priority?: ProjectPriority;
  customerId?: string;
  location?: string;
  estimatedValue?: number;
  startDate?: string;
  dueDate?: string;
  tags?: string[];
}

interface ProjectRow {
  id: string;
  user_id: string;
  title: string;
  description?: string | null;
  project_type?: string | null;
  status: string;
  priority: string;
  customer_id?: string | null;
  customers?: { name: string } | null;
  location?: string | null;
  estimated_value?: number | null;
  start_date?: string | null;
  due_date?: string | null;
  completed_at?: string | null;
  tags?: string[] | null;
  created_at: string;
  updated_at: string;
}

function mapRow(row: ProjectRow, taskCounts?: { total: number; done: number }): SparkProject {
  const total = taskCounts?.total || 0;
  const done = taskCounts?.done || 0;
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    description: row.description || undefined,
    projectType: row.project_type || undefined,
    status: row.status as ProjectStatus,
    priority: row.priority as ProjectPriority,
    customerId: row.customer_id || undefined,
    customerName: row.customers?.name || undefined,
    location: row.location || undefined,
    estimatedValue: row.estimated_value || undefined,
    startDate: row.start_date || undefined,
    dueDate: row.due_date || undefined,
    completedAt: row.completed_at || undefined,
    tags: row.tags || [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    totalTasks: total,
    completedTasks: done,
    progress: total > 0 ? Math.round((done / total) * 100) : 0,
  };
}

export const useSparkProjects = (view: ProjectView = 'active') => {
  const { toast } = useToast();
  const [allProjects, setAllProjects] = useState<SparkProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadingRef = useRef(false);

  const loadProjects = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    try {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setAllProjects([]);
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('spark_projects')
        .select('*, customers(name)')
        .eq('user_id', user.id)
        .neq('status', 'cancelled')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get task counts for each project
      const projects = await Promise.all(
        (data || []).map(async (row: ProjectRow) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { count: total } = await (supabase as any)
            .from('spark_tasks')
            .select('id', { count: 'exact', head: true })
            .eq('project_id', row.id)
            .neq('status', 'cancelled');

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { count: done } = await (supabase as any)
            .from('spark_tasks')
            .select('id', { count: 'exact', head: true })
            .eq('project_id', row.id)
            .eq('status', 'done');

          return mapRow(row, { total: total || 0, done: done || 0 });
        })
      );

      setAllProjects(projects);
    } catch (error) {
      console.error('Failed to load spark projects:', error);
    } finally {
      setIsLoading(false);
      loadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    loadProjects();

    // Realtime subscription — toast on INSERT, debounced refresh on UPDATE
    let channel: ReturnType<typeof supabase.channel> | null = null;
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const debouncedLoad = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => loadProjects(), 200);
    };

    const setupRealtime = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      channel = supabase
        .channel('spark-projects-realtime')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'spark_projects',
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            const newProject = payload.new as ProjectRow;
            if (newProject.status !== 'cancelled') {
              toast({
                title: 'New Project',
                description: newProject.title,
                duration: 4000,
              });
              debouncedLoad();
            }
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'spark_projects',
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            debouncedLoad();
          }
        )
        .subscribe();
    };

    setupRealtime();

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      if (channel) supabase.removeChannel(channel);
    };
  }, [loadProjects, toast]);

  // Filter by view
  const projects =
    view === 'active'
      ? allProjects.filter((p) => p.status === 'open' || p.status === 'active')
      : view === 'completed'
        ? allProjects.filter((p) => p.status === 'completed')
        : allProjects;

  const counts = {
    active: allProjects.filter((p) => p.status === 'open' || p.status === 'active').length,
    completed: allProjects.filter((p) => p.status === 'completed').length,
    all: allProjects.length,
  };

  const createProject = async (input: CreateProjectInput) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('spark_projects')
        .insert({
          user_id: user.id,
          title: input.title.trim(),
          description: input.description?.trim() || null,
          project_type: input.projectType || null,
          priority: input.priority || 'normal',
          status: 'open',
          customer_id: input.customerId || null,
          location: input.location?.trim() || null,
          estimated_value: input.estimatedValue || null,
          start_date: input.startDate || null,
          due_date: input.dueDate || null,
          tags: input.tags || [],
        })
        .select('*, customers(name)')
        .single();

      if (error) throw error;

      setAllProjects((prev) => [mapRow(data, { total: 0, done: 0 }), ...prev]);
      toast({
        title: 'Project created',
        description: `"${input.title}" has been created.`,
      });

      return data.id as string;
    } catch (error: unknown) {
      console.error('Project create error:', error);
      toast({
        title: 'Create failed',
        description: `Failed to create project: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateProject = async (
    id: string,
    updates: Partial<CreateProjectInput> & { status?: ProjectStatus }
  ) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const dbUpdates: Record<string, unknown> = {};
      if (updates.title !== undefined) dbUpdates.title = updates.title.trim();
      if (updates.description !== undefined)
        dbUpdates.description = updates.description?.trim() || null;
      if (updates.projectType !== undefined) dbUpdates.project_type = updates.projectType || null;
      if (updates.priority !== undefined) dbUpdates.priority = updates.priority;
      if (updates.customerId !== undefined) dbUpdates.customer_id = updates.customerId || null;
      if (updates.location !== undefined) dbUpdates.location = updates.location?.trim() || null;
      if (updates.estimatedValue !== undefined)
        dbUpdates.estimated_value = updates.estimatedValue || null;
      if (updates.startDate !== undefined) dbUpdates.start_date = updates.startDate || null;
      if (updates.dueDate !== undefined) dbUpdates.due_date = updates.dueDate || null;
      if (updates.tags !== undefined) dbUpdates.tags = updates.tags || [];
      if (updates.status !== undefined) {
        dbUpdates.status = updates.status;
        if (updates.status === 'completed') dbUpdates.completed_at = new Date().toISOString();
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('spark_projects')
        .update(dbUpdates)
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      // Refresh to get accurate data
      await loadProjects();
      toast({ title: 'Project updated', description: 'Changes saved.' });
    } catch (error: unknown) {
      toast({
        title: 'Update failed',
        description: `Failed to update: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    }
  };

  const completeProject = async (id: string) => {
    await updateProject(id, { status: 'completed' });
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('spark_projects')
        .delete()
        .eq('id', id);
      if (error) throw error;
      toast({ title: 'Project deleted', description: 'Project permanently removed.' });
      await loadProjects();
      return true;
    } catch (err: unknown) {
      toast({
        title: 'Delete failed',
        description: err instanceof Error ? err.message : 'Could not delete project.',
        variant: 'destructive',
      });
      return false;
    }
  };

  return {
    projects,
    counts,
    isLoading,
    createProject,
    updateProject,
    completeProject,
    deleteProject,
    refreshProjects: loadProjects,
  };
};
