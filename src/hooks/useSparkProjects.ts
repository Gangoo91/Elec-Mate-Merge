import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { useToast } from '@/hooks/use-toast';

export type ProjectStatus = 'open' | 'active' | 'completed' | 'cancelled';
export type ProjectPriority = 'low' | 'normal' | 'high' | 'urgent';
export type ProjectView = 'active' | 'completed' | 'all';

/** Derived server-side in get_jobs_overview from linked data — never stored or set by hand. */
export type JobStage =
  | 'enquiry'
  | 'quoted'
  | 'won'
  | 'booked'
  | 'in_progress'
  | 'bill_it'
  | 'awaiting_payment'
  | 'paid'
  | 'cancelled';

export const JOB_STAGE_META: Record<JobStage, { label: string; dot: string; text: string }> = {
  enquiry: { label: 'Enquiry', dot: 'bg-white/40', text: 'text-white/55' },
  quoted: { label: 'Quoted', dot: 'bg-blue-400', text: 'text-blue-300' },
  won: { label: 'Won — book it', dot: 'bg-elec-yellow', text: 'text-elec-yellow' },
  booked: { label: 'Booked', dot: 'bg-sky-400', text: 'text-sky-300' },
  in_progress: { label: 'In progress', dot: 'bg-emerald-400', text: 'text-emerald-300' },
  bill_it: { label: 'Bill it', dot: 'bg-orange-400', text: 'text-orange-300' },
  awaiting_payment: { label: 'Awaiting payment', dot: 'bg-amber-400', text: 'text-amber-300' },
  paid: { label: 'Paid', dot: 'bg-emerald-400', text: 'text-emerald-300' },
  cancelled: { label: 'Cancelled', dot: 'bg-red-400', text: 'text-red-300' },
};

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
  stage: JobStage;
  quoteCount: number;
  hasAcceptedQuote: boolean;
  bookedSlot?: string;
  invoiceCount: number;
  unpaidInvoiceCount: number;
  paidInvoiceCount: number;
  certCount: number;
  visitCount: number;
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
    stage: 'enquiry',
    quoteCount: 0,
    hasAcceptedQuote: false,
    invoiceCount: 0,
    unpaidInvoiceCount: 0,
    paidInvoiceCount: 0,
    certCount: 0,
    visitCount: 0,
  };
}

interface OverviewRow extends Omit<ProjectRow, 'customers'> {
  customer_name?: string | null;
  total_tasks: number;
  done_tasks: number;
  quote_count: number;
  has_accepted_quote: boolean;
  booked_slot?: string | null;
  invoice_count: number;
  unpaid_invoice_count: number;
  paid_invoice_count: number;
  cert_count: number;
  visit_count: number;
  stage: string;
}

function mapOverviewRow(row: OverviewRow): SparkProject {
  const total = row.total_tasks || 0;
  const done = row.done_tasks || 0;
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    description: row.description || undefined,
    projectType: row.project_type || undefined,
    status: row.status as ProjectStatus,
    priority: row.priority as ProjectPriority,
    customerId: row.customer_id || undefined,
    customerName: row.customer_name || undefined,
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
    stage: (row.stage as JobStage) || 'enquiry',
    quoteCount: row.quote_count || 0,
    hasAcceptedQuote: row.has_accepted_quote || false,
    bookedSlot: row.booked_slot || undefined,
    invoiceCount: row.invoice_count || 0,
    unpaidInvoiceCount: row.unpaid_invoice_count || 0,
    paidInvoiceCount: row.paid_invoice_count || 0,
    certCount: row.cert_count || 0,
    visitCount: row.visit_count || 0,
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

      // Single round trip: projects + task counts + linked-doc aggregates + derived stage
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any).rpc('get_jobs_overview');

      if (error) throw error;

      setAllProjects(((data || []) as OverviewRow[]).map(mapOverviewRow));
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
        .channel(realtimeChannelName('spark-projects-realtime'))
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
                title: 'New job',
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

      const created = mapRow(data, { total: 0, done: 0 });
      setAllProjects((prev) => [created, ...prev]);
      toast({
        title: 'Job created',
        description: `"${input.title}" has been created.`,
      });

      return created;
    } catch (error: unknown) {
      console.error('Project create error:', error);
      toast({
        title: 'Create failed',
        description: `Failed to create job: ${error instanceof Error ? error.message : 'Unknown error'}`,
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
      toast({ title: 'Job updated', description: 'Changes saved.' });
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
      toast({ title: 'Job deleted', description: 'Job permanently removed.' });
      await loadProjects();
      return true;
    } catch (err: unknown) {
      toast({
        title: 'Delete failed',
        description: err instanceof Error ? err.message : 'Could not delete job.',
        variant: 'destructive',
      });
      return false;
    }
  };

  return {
    projects,
    allProjects,
    counts,
    isLoading,
    createProject,
    updateProject,
    completeProject,
    deleteProject,
    refreshProjects: loadProjects,
  };
};
