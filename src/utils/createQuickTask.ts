import { supabase } from '@/integrations/supabase/client';

interface QuickTaskOptions {
  dueAt?: string;
  customerId?: string;
  details?: string;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  tags?: string[];
}

/**
 * Creates a spark task from anywhere in the app.
 * Returns the new task ID or null on failure.
 */
export async function createQuickTask(
  title: string,
  options?: QuickTaskOptions
): Promise<string | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await (
    supabase as unknown as {
      from: (table: string) => {
        insert: (row: Record<string, unknown>) => {
          select: (cols: string) => {
            single: () => Promise<{
              data: { id: string } | null;
              error: { message: string } | null;
            }>;
          };
        };
      };
    }
  )
    .from('spark_tasks')
    .insert({
      user_id: user.id,
      title: title.trim(),
      details: options?.details?.trim() || null,
      priority: options?.priority || 'normal',
      due_at: options?.dueAt || null,
      customer_id: options?.customerId || null,
      tags: options?.tags || [],
    })
    .select('id')
    .single();

  if (error) throw error;
  return data!.id;
}

/**
 * Creates multiple tasks in a single batch insert.
 * Returns the count of tasks created.
 */
export async function createQuickTaskBatch(
  tasks: Array<{ title: string } & QuickTaskOptions>
): Promise<number> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const rows = tasks.map((t) => ({
    user_id: user.id,
    title: t.title.trim(),
    details: t.details?.trim() || null,
    priority: t.priority || 'high',
    due_at: t.dueAt || new Date().toISOString(),
    customer_id: t.customerId || null,
    tags: t.tags || [],
  }));

  const { error } = await (
    supabase as unknown as {
      from: (table: string) => {
        insert: (rows: Record<string, unknown>[]) => Promise<{ error: { message: string } | null }>;
      };
    }
  )
    .from('spark_tasks')
    .insert(rows);

  if (error) throw error;
  return rows.length;
}
