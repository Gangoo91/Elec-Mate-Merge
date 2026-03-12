import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type TaskStatus = 'open' | 'done' | 'snoozed' | 'cancelled';
export type TaskPriority = 'low' | 'normal' | 'high' | 'urgent';
export type TaskView = 'today' | 'week' | 'all' | 'completed' | 'snagging';

export interface SparkTask {
  id: string;
  userId: string;
  title: string;
  details?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueAt?: string;
  snoozedUntil?: string;
  customerId?: string;
  customerName?: string;
  location?: string;
  tags: string[];
  projectId?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface SaveTaskInput {
  title: string;
  details?: string;
  priority?: TaskPriority;
  dueAt?: string;
  customerId?: string;
  location?: string;
  tags?: string[];
  projectId?: string;
}

export interface UpdateTaskInput {
  title?: string;
  details?: string;
  priority?: TaskPriority;
  dueAt?: string | null;
  customerId?: string | null;
  location?: string | null;
  tags?: string[];
  status?: TaskStatus;
  projectId?: string | null;
}

export interface SparkTaskCounts {
  today: number;
  week: number;
  all: number;
  completed: number;
  overdue: number;
  snagging: number;
}

interface SparkTaskRow {
  id: string;
  user_id: string;
  title: string;
  details?: string | null;
  status: string;
  priority: string;
  due_at?: string | null;
  snoozed_until?: string | null;
  customer_id?: string | null;
  customers?: { name: string } | null;
  location?: string | null;
  tags?: string[] | null;
  project_id?: string | null;
  created_at: string;
  updated_at: string;
  completed_at?: string | null;
}

const PRIORITY_ORDER: Record<TaskPriority, number> = {
  urgent: 4,
  high: 3,
  normal: 2,
  low: 1,
};

function endOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

function endOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const daysUntilSunday = day === 0 ? 0 : 7 - day;
  d.setDate(d.getDate() + daysUntilSunday);
  d.setHours(23, 59, 59, 999);
  return d;
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function mapRow(row: SparkTaskRow): SparkTask {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    details: row.details || undefined,
    status: row.status as TaskStatus,
    priority: row.priority as TaskPriority,
    dueAt: row.due_at || undefined,
    snoozedUntil: row.snoozed_until || undefined,
    customerId: row.customer_id || undefined,
    customerName: row.customers?.name || undefined,
    location: row.location || undefined,
    tags: row.tags || [],
    projectId: row.project_id || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    completedAt: row.completed_at || undefined,
  };
}

function isNotSnoozed(t: SparkTask, now: Date): boolean {
  return !(t.snoozedUntil && new Date(t.snoozedUntil) > now);
}

function matchesToday(t: SparkTask, now: Date): boolean {
  if (!isNotSnoozed(t, now)) return false;
  const eod = endOfDay(now);
  const sod = startOfDay(now);
  if (t.dueAt) return new Date(t.dueAt) <= eod;
  return new Date(t.createdAt) >= sod;
}

function matchesWeek(t: SparkTask, now: Date): boolean {
  if (!isNotSnoozed(t, now)) return false;
  if (!t.dueAt) return false;
  return new Date(t.dueAt) <= endOfWeek(now);
}

function isOverdue(t: SparkTask, now: Date): boolean {
  return !!t.dueAt && new Date(t.dueAt) < now && t.status === 'open';
}

function sortTasks(tasks: SparkTask[]): SparkTask[] {
  return [...tasks].sort((a, b) => {
    const pa = PRIORITY_ORDER[a.priority] || 0;
    const pb = PRIORITY_ORDER[b.priority] || 0;
    if (pa !== pb) return pb - pa;
    if (a.dueAt && b.dueAt) return new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime();
    if (a.dueAt) return -1;
    if (b.dueAt) return 1;
    return 0;
  });
}

function filterByView(tasks: SparkTask[], view: TaskView, now: Date): SparkTask[] {
  if (view === 'completed') {
    return tasks
      .filter((t) => t.status === 'done')
      .sort((a, b) => {
        const ca = a.completedAt ? new Date(a.completedAt).getTime() : 0;
        const cb = b.completedAt ? new Date(b.completedAt).getTime() : 0;
        return cb - ca;
      });
  }

  const open = tasks.filter((t) => t.status === 'open' && isNotSnoozed(t, now));

  if (view === 'snagging')
    return sortTasks(tasks.filter((t) => t.status !== 'cancelled' && t.tags.includes('snagging')));
  if (view === 'today') return sortTasks(open.filter((t) => matchesToday(t, now)));
  if (view === 'week') return sortTasks(open.filter((t) => matchesWeek(t, now)));
  return sortTasks(open);
}

export const useSparkTasks = (view: TaskView = 'all') => {
  const { toast } = useToast();
  const [allTasks, setAllTasks] = useState<SparkTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadingRef = useRef(false);

  const loadTasks = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    try {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setAllTasks([]);
        return;
      }

      // Single query — fetch ALL non-cancelled tasks (open + done)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('spark_tasks')
        .select('*, customers(name)')
        .eq('user_id', user.id)
        .neq('status', 'cancelled');

      if (error) throw error;
      setAllTasks((data || []).map(mapRow));
    } catch (error) {
      console.error('Failed to load spark tasks:', error);
    } finally {
      setIsLoading(false);
      loadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    loadTasks();

    // Realtime subscription — toast on INSERT, silent refresh on UPDATE
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const setupRealtime = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      channel = supabase
        .channel('spark-tasks-realtime')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'spark_tasks',
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            const newTask = payload.new as SparkTaskRow;
            if (newTask.status !== 'cancelled') {
              toast({
                title: 'New Task',
                description: newTask.title,
                duration: 4000,
              });
              loadTasks();
            }
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'spark_tasks',
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            loadTasks();
          }
        )
        .subscribe();
    };

    setupRealtime();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [loadTasks, toast]);

  // Derived: filtered + sorted tasks for the current view
  const now = new Date();
  const tasks = filterByView(allTasks, view, now);

  // Counts for all views (single pass, no extra queries)
  const counts: SparkTaskCounts = {
    today: allTasks.filter((t) => t.status === 'open' && matchesToday(t, now)).length,
    week: allTasks.filter((t) => t.status === 'open' && matchesWeek(t, now)).length,
    all: allTasks.filter((t) => t.status === 'open' && isNotSnoozed(t, now)).length,
    completed: allTasks.filter((t) => t.status === 'done').length,
    overdue: allTasks.filter((t) => t.status === 'open' && isOverdue(t, now)).length,
    snagging: allTasks.filter((t) => t.status !== 'cancelled' && t.tags.includes('snagging'))
      .length,
  };

  const logEvent = async (
    userId: string,
    taskId: string,
    eventType: string,
    metadata?: Record<string, unknown>
  ) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any).from('spark_task_events').insert({
        task_id: taskId,
        user_id: userId,
        event_type: eventType,
        metadata: metadata || {},
      });
    } catch (err) {
      console.error('Failed to log task event:', err);
    }
  };

  const saveTask = async (input: SaveTaskInput) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('spark_tasks')
        .insert({
          user_id: user.id,
          title: input.title.trim(),
          details: input.details?.trim() || null,
          priority: input.priority || 'normal',
          due_at: input.dueAt || null,
          customer_id: input.customerId || null,
          location: input.location?.trim() || null,
          tags: input.tags || [],
          project_id: input.projectId || null,
        })
        .select('*, customers(name)')
        .single();

      if (error) throw error;

      // Optimistic: add to local state immediately
      setAllTasks((prev) => [...prev, mapRow(data)]);
      logEvent(user.id, data.id, 'created');

      toast({
        title: 'Task created',
        description: `"${input.title}" has been added.`,
      });

      return data.id as string;
    } catch (error: unknown) {
      console.error('Task save error:', error);
      toast({
        title: 'Save failed',
        description: `Failed to save task: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateTask = async (id: string, updates: UpdateTaskInput) => {
    const prev = allTasks;

    // Optimistic: apply updates to local state immediately
    setAllTasks((current) =>
      current.map((t) => {
        if (t.id !== id) return t;
        const patched = { ...t };
        if (updates.title !== undefined) patched.title = updates.title.trim();
        if (updates.details !== undefined) patched.details = updates.details?.trim() || undefined;
        if (updates.priority !== undefined) patched.priority = updates.priority;
        if (updates.dueAt !== undefined) patched.dueAt = updates.dueAt || undefined;
        if (updates.customerId !== undefined) patched.customerId = updates.customerId || undefined;
        if (updates.location !== undefined)
          patched.location = updates.location?.trim() || undefined;
        if (updates.tags !== undefined) patched.tags = updates.tags;
        if (updates.status !== undefined) patched.status = updates.status;
        if (updates.projectId !== undefined) patched.projectId = updates.projectId || undefined;
        return patched;
      })
    );

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const dbUpdates: Record<string, unknown> = {};
      if (updates.title !== undefined) dbUpdates.title = updates.title.trim();
      if (updates.details !== undefined) dbUpdates.details = updates.details?.trim() || null;
      if (updates.priority !== undefined) dbUpdates.priority = updates.priority;
      if (updates.dueAt !== undefined) dbUpdates.due_at = updates.dueAt || null;
      if (updates.customerId !== undefined) dbUpdates.customer_id = updates.customerId || null;
      if (updates.location !== undefined) dbUpdates.location = updates.location?.trim() || null;
      if (updates.tags !== undefined) dbUpdates.tags = updates.tags;
      if (updates.status !== undefined) dbUpdates.status = updates.status;
      if (updates.projectId !== undefined) dbUpdates.project_id = updates.projectId || null;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('spark_tasks')
        .update(dbUpdates)
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      logEvent(user.id, id, 'updated', { fields: Object.keys(dbUpdates) });

      toast({
        title: 'Task updated',
        description: 'Changes saved.',
      });

      // If customer changed, do a background refresh for the join data
      if (updates.customerId !== undefined) {
        loadTasks();
      }
    } catch (error: unknown) {
      // Rollback on failure
      setAllTasks(prev);
      toast({
        title: 'Update failed',
        description: `Failed to update task: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    }
  };

  const markDone = async (id: string) => {
    const prev = allTasks;
    // Optimistic: immediately move to done
    setAllTasks((current) =>
      current.map((t) =>
        t.id === id
          ? { ...t, status: 'done' as TaskStatus, completedAt: new Date().toISOString() }
          : t
      )
    );

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('spark_tasks')
        .update({ status: 'done', completed_at: new Date().toISOString() })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      logEvent(user.id, id, 'completed');
      toast({ title: 'Task completed', description: 'Nice one! Task marked as done.' });
    } catch (error: unknown) {
      // Rollback
      setAllTasks(prev);
      toast({
        title: 'Failed',
        description: 'Could not mark task as done.',
        variant: 'destructive',
      });
    }
  };

  const reopenTask = async (id: string) => {
    const prev = allTasks;
    setAllTasks((current) =>
      current.map((t) =>
        t.id === id ? { ...t, status: 'open' as TaskStatus, completedAt: undefined } : t
      )
    );

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('spark_tasks')
        .update({ status: 'open', completed_at: null })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      logEvent(user.id, id, 'reopened');
      toast({ title: 'Task reopened', description: 'Task moved back to open.' });
    } catch (error: unknown) {
      setAllTasks(prev);
      toast({ title: 'Failed', description: 'Could not reopen task.', variant: 'destructive' });
    }
  };

  const snoozeTask = async (id: string, until: Date) => {
    const prev = allTasks;
    setAllTasks((current) =>
      current.map((t) => (t.id === id ? { ...t, snoozedUntil: until.toISOString() } : t))
    );

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('spark_tasks')
        .update({ snoozed_until: until.toISOString() })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      logEvent(user.id, id, 'snoozed', { snoozed_until: until.toISOString() });
      toast({
        title: 'Task snoozed',
        description: `Snoozed until ${until.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}.`,
      });
    } catch (error: unknown) {
      setAllTasks(prev);
      toast({ title: 'Failed', description: 'Could not snooze task.', variant: 'destructive' });
    }
  };

  const deleteTask = async (id: string) => {
    const prev = allTasks;
    // Optimistic: remove from list
    setAllTasks((current) =>
      current.map((t) => (t.id === id ? { ...t, status: 'cancelled' as TaskStatus } : t))
    );

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('spark_tasks')
        .update({ status: 'cancelled' })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      logEvent(user.id, id, 'cancelled');
      toast({ title: 'Task deleted', description: 'Task has been removed.' });
    } catch (error: unknown) {
      setAllTasks(prev);
      toast({
        title: 'Delete failed',
        description: 'Could not delete task.',
        variant: 'destructive',
      });
    }
  };

  return {
    tasks,
    counts,
    isLoading,
    saveTask,
    updateTask,
    deleteTask,
    markDone,
    reopenTask,
    snoozeTask,
    refreshTasks: loadTasks,
  };
};
