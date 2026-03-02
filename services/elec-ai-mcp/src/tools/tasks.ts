/**
 * Task tools — read_tasks, create_task, update_task, complete_task, snooze_task, delete_task
 * Maps to: Supabase `spark_tasks` table (RLS-scoped)
 *
 * Columns: id, user_id, title, details, status, priority, due_at,
 *          snoozed_until, customer_id, location, tags, created_at,
 *          updated_at, completed_at
 *
 * Status: 'open' | 'done' | 'snoozed' | 'cancelled'
 * Priority: 'low' | 'normal' | 'high' | 'urgent'
 */

import type { UserContext } from '../auth.js';

export async function readTasks(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  let query = supabase
    .from('spark_tasks')
    .select(
      'id, title, details, status, priority, due_at, snoozed_until, customer_id, project_id, location, tags, created_at, updated_at, completed_at, customers(name), spark_projects(title)'
    );

  // Filter by status (default: open tasks)
  if (typeof args.status === 'string') {
    query = query.eq('status', args.status);
  } else {
    // By default, exclude cancelled tasks
    query = query.neq('status', 'cancelled');
  }

  if (typeof args.priority === 'string') {
    query = query.eq('priority', args.priority);
  }

  if (typeof args.customer_id === 'string') {
    query = query.eq('customer_id', args.customer_id);
  }

  if (args.due_before && typeof args.due_before === 'string') {
    query = query.lte('due_at', args.due_before);
  }

  if (typeof args.project_id === 'string') {
    query = query.eq('project_id', args.project_id);
  }

  if (args.overdue === true) {
    query = query
      .eq('status', 'open')
      .not('due_at', 'is', null)
      .lt('due_at', new Date().toISOString());
  }

  const limit = typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 100) : 50;

  // Sort: urgent first, then by due date
  query = query
    .order('priority', { ascending: false })
    .order('due_at', { ascending: true, nullsFirst: false })
    .limit(limit);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to read tasks: ${error.message}`);

  // Map for cleaner output
  const tasks = (data || []).map((t: Record<string, unknown>) => {
    const customer = t.customers as { name: string } | null;
    const project = t.spark_projects as { title: string } | null;
    const { customers: _c, spark_projects: _p, ...rest } = t;
    return {
      ...rest,
      customer_name: customer?.name || null,
      project_name: project?.title || null,
    };
  });

  return { tasks };
}

export async function createTask(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.title !== 'string' || args.title.trim().length === 0) {
    throw new Error('Task title is required');
  }

  const supabase = user.supabase;

  const validPriorities = ['low', 'normal', 'high', 'urgent'];
  const priority =
    typeof args.priority === 'string' && validPriorities.includes(args.priority)
      ? args.priority
      : 'normal';

  const { data, error } = await supabase
    .from('spark_tasks')
    .insert({
      user_id: user.userId,
      title: args.title.trim(),
      details: typeof args.details === 'string' ? args.details.trim() : null,
      priority,
      due_at: typeof args.due_at === 'string' ? args.due_at : null,
      customer_id: typeof args.customer_id === 'string' ? args.customer_id : null,
      project_id: typeof args.project_id === 'string' ? args.project_id : null,
      location: typeof args.location === 'string' ? args.location.trim() : null,
      tags: Array.isArray(args.tags) ? args.tags : [],
    })
    .select('id, title, priority, status, due_at, project_id')
    .single();

  if (error) throw new Error(`Failed to create task: ${error.message}`);

  // Log the event
  try {
    await supabase.from('spark_task_events').insert({
      task_id: data.id,
      user_id: user.userId,
      event_type: 'created',
      metadata: {},
    });
  } catch {
    /* non-critical */
  }

  return { task_id: data.id, title: data.title, priority: data.priority, status: data.status };
}

export async function updateTask(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.task_id !== 'string') {
    throw new Error('task_id is required');
  }

  const supabase = user.supabase;
  const updates: Record<string, unknown> = {};

  if (typeof args.title === 'string') updates.title = args.title.trim();
  if (typeof args.details === 'string') updates.details = args.details.trim();
  if (typeof args.priority === 'string') {
    const validPriorities = ['low', 'normal', 'high', 'urgent'];
    if (validPriorities.includes(args.priority)) {
      updates.priority = args.priority;
    }
  }
  if (args.due_at !== undefined) {
    updates.due_at = typeof args.due_at === 'string' ? args.due_at : null;
  }
  if (args.customer_id !== undefined) {
    updates.customer_id = typeof args.customer_id === 'string' ? args.customer_id : null;
  }
  if (typeof args.location === 'string') updates.location = args.location.trim();
  if (args.project_id !== undefined) {
    updates.project_id = typeof args.project_id === 'string' ? args.project_id : null;
  }
  if (Array.isArray(args.tags)) updates.tags = args.tags;

  if (Object.keys(updates).length === 0) {
    throw new Error('No valid fields to update');
  }

  const { error } = await supabase
    .from('spark_tasks')
    .update(updates)
    .eq('id', args.task_id)
    .eq('user_id', user.userId);

  if (error) throw new Error(`Failed to update task: ${error.message}`);

  // Log the event
  try {
    await supabase.from('spark_task_events').insert({
      task_id: args.task_id,
      user_id: user.userId,
      event_type: 'updated',
      metadata: { fields: Object.keys(updates) },
    });
  } catch {
    /* non-critical */
  }

  return { success: true };
}

export async function completeTask(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.task_id !== 'string') {
    throw new Error('task_id is required');
  }

  const supabase = user.supabase;

  const { error } = await supabase
    .from('spark_tasks')
    .update({
      status: 'done',
      completed_at: new Date().toISOString(),
    })
    .eq('id', args.task_id)
    .eq('user_id', user.userId);

  if (error) throw new Error(`Failed to complete task: ${error.message}`);

  // Log the event
  try {
    await supabase.from('spark_task_events').insert({
      task_id: args.task_id,
      user_id: user.userId,
      event_type: 'completed',
      metadata: {},
    });
  } catch {
    /* non-critical */
  }

  return { success: true, status: 'done' };
}

export async function snoozeTask(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.task_id !== 'string') {
    throw new Error('task_id is required');
  }
  if (typeof args.snooze_until !== 'string') {
    throw new Error('snooze_until is required (ISO-8601 datetime)');
  }

  const snoozeDate = new Date(args.snooze_until);
  if (isNaN(snoozeDate.getTime())) {
    throw new Error('snooze_until must be a valid ISO-8601 date');
  }
  if (snoozeDate <= new Date()) {
    throw new Error('snooze_until must be in the future');
  }

  const supabase = user.supabase;

  const { error } = await supabase
    .from('spark_tasks')
    .update({
      snoozed_until: snoozeDate.toISOString(),
    })
    .eq('id', args.task_id)
    .eq('user_id', user.userId);

  if (error) throw new Error(`Failed to snooze task: ${error.message}`);

  // Log the event
  try {
    await supabase.from('spark_task_events').insert({
      task_id: args.task_id,
      user_id: user.userId,
      event_type: 'snoozed',
      metadata: { snoozed_until: snoozeDate.toISOString() },
    });
  } catch {
    /* non-critical */
  }

  return { success: true, snoozed_until: snoozeDate.toISOString() };
}

export async function deleteTask(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.task_id !== 'string') {
    throw new Error('task_id is required');
  }

  const supabase = user.supabase;

  // Soft delete — set status to 'cancelled'
  const { error } = await supabase
    .from('spark_tasks')
    .update({ status: 'cancelled' })
    .eq('id', args.task_id)
    .eq('user_id', user.userId);

  if (error) throw new Error(`Failed to delete task: ${error.message}`);

  // Log the event
  try {
    await supabase.from('spark_task_events').insert({
      task_id: args.task_id,
      user_id: user.userId,
      event_type: 'cancelled',
      metadata: {},
    });
  } catch {
    /* non-critical */
  }

  return { success: true, status: 'cancelled' };
}
