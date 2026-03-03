/**
 * Project tools — read_projects, create_project, update_project, complete_project
 * Maps to: Supabase `spark_projects` table (RLS-scoped)
 *
 * Projects group spark_tasks under a parent.
 * e.g. "Full House Rewire - 14 Oak Avenue" with 32 tasks underneath.
 *
 * Status: 'open' | 'active' | 'completed' | 'cancelled'
 * Priority: 'low' | 'normal' | 'high' | 'urgent'
 */

import type { UserContext } from '../auth.js';

export async function readProjects(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  let query = supabase
    .from('spark_projects')
    .select(
      'id, title, description, status, priority, location, customer_id, estimated_value, start_date, due_date, completed_at, tags, created_at, updated_at, customers(name)'
    );

  if (typeof args.status === 'string') {
    query = query.eq('status', args.status);
  } else {
    query = query.neq('status', 'cancelled');
  }

  if (typeof args.priority === 'string') {
    query = query.eq('priority', args.priority);
  }

  if (typeof args.customer_id === 'string') {
    query = query.eq('customer_id', args.customer_id);
  }

  if (typeof args.search === 'string' && args.search.length > 0) {
    query = query.ilike('title', `%${args.search}%`);
  }

  const limit = typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 100) : 50;
  query = query.order('created_at', { ascending: false }).limit(limit);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to read projects: ${error.message}`);

  // For each project, get task counts
  const projects = await Promise.all(
    (data || []).map(async (p: Record<string, unknown>) => {
      const customer = p.customers as { name: string } | null;
      const { customers: _c, ...rest } = p;

      // Count total and completed tasks for this project
      const { count: totalTasks } = await supabase
        .from('spark_tasks')
        .select('id', { count: 'exact', head: true })
        .eq('project_id', p.id)
        .neq('status', 'cancelled');

      const { count: doneTasks } = await supabase
        .from('spark_tasks')
        .select('id', { count: 'exact', head: true })
        .eq('project_id', p.id)
        .eq('status', 'done');

      return {
        ...rest,
        customer_name: customer?.name || null,
        total_tasks: totalTasks || 0,
        completed_tasks: doneTasks || 0,
        progress:
          totalTasks && totalTasks > 0 ? Math.round(((doneTasks || 0) / totalTasks) * 100) : 0,
      };
    })
  );

  return { projects };
}

export async function createProject(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.title !== 'string' || args.title.trim().length === 0) {
    throw new Error('Project title is required');
  }

  const supabase = user.supabase;

  const validPriorities = ['low', 'normal', 'high', 'urgent'];
  const priority =
    typeof args.priority === 'string' && validPriorities.includes(args.priority)
      ? args.priority
      : 'normal';

  const { data, error } = await supabase
    .from('spark_projects')
    .insert({
      user_id: user.userId,
      title: args.title.trim(),
      description: typeof args.description === 'string' ? args.description.trim() : null,
      priority,
      status: 'open',
      location: typeof args.location === 'string' ? args.location.trim() : null,
      customer_id: typeof args.customer_id === 'string' ? args.customer_id : null,
      estimated_value:
        typeof args.estimated_value === 'number' && args.estimated_value >= 0
          ? args.estimated_value
          : null,
      start_date: typeof args.start_date === 'string' ? args.start_date : null,
      due_date: typeof args.due_date === 'string' ? args.due_date : null,
      tags: Array.isArray(args.tags) ? args.tags : [],
    })
    .select('id, title, status, priority')
    .single();

  if (error) throw new Error(`Failed to create project: ${error.message}`);

  // If tasks were provided inline, create them linked to this project
  let tasksCreated = 0;
  if (Array.isArray(args.tasks) && args.tasks.length > 0) {
    // Auto-assign sequential due dates so tasks appear in order in the app.
    // Uses start_date as base (or today), then spaces tasks 1 day apart.
    // Only applies if a task doesn't already have a due_at.
    const baseDate = typeof args.start_date === 'string' ? new Date(args.start_date) : new Date();
    // Set base to start of day
    baseDate.setHours(8, 0, 0, 0);

    const taskRows = args.tasks
      .filter((t): t is Record<string, unknown> => typeof t === 'object' && t !== null)
      .map((t, index) => {
        // If the task has an explicit due_at, use it. Otherwise auto-assign
        // sequential dates so the app shows them in the correct order.
        let dueAt: string | null = null;
        if (typeof t.due_at === 'string') {
          dueAt = t.due_at;
        } else {
          const taskDate = new Date(baseDate.getTime());
          taskDate.setDate(taskDate.getDate() + index);
          dueAt = taskDate.toISOString();
        }

        return {
          user_id: user.userId,
          project_id: data.id,
          title: typeof t.title === 'string' ? t.title.trim() : 'Untitled task',
          details: typeof t.details === 'string' ? t.details.trim() : null,
          priority:
            typeof t.priority === 'string' && validPriorities.includes(t.priority)
              ? t.priority
              : priority,
          due_at: dueAt,
          location: typeof args.location === 'string' ? args.location.trim() : null,
          customer_id: typeof args.customer_id === 'string' ? args.customer_id : null,
          tags: Array.isArray(t.tags) ? t.tags : [],
        };
      });

    if (taskRows.length > 0) {
      const { error: taskError } = await supabase.from('spark_tasks').insert(taskRows);
      if (taskError)
        throw new Error(`Project created but failed to create tasks: ${taskError.message}`);
      tasksCreated = taskRows.length;
    }
  }

  return {
    project_id: data.id,
    title: data.title,
    status: data.status,
    priority: data.priority,
    tasks_created: tasksCreated,
  };
}

export async function updateProject(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.project_id !== 'string') {
    throw new Error('project_id is required');
  }

  const supabase = user.supabase;
  const updates: Record<string, unknown> = {};

  if (typeof args.title === 'string') updates.title = args.title.trim();
  if (typeof args.description === 'string') updates.description = args.description.trim();
  if (typeof args.status === 'string') {
    const validStatuses = ['open', 'active', 'completed', 'cancelled'];
    if (validStatuses.includes(args.status)) {
      updates.status = args.status;
      if (args.status === 'completed') {
        updates.completed_at = new Date().toISOString();
      }
    }
  }
  if (typeof args.priority === 'string') {
    const validPriorities = ['low', 'normal', 'high', 'urgent'];
    if (validPriorities.includes(args.priority)) {
      updates.priority = args.priority;
    }
  }
  if (typeof args.location === 'string') updates.location = args.location.trim();
  if (args.customer_id !== undefined) {
    updates.customer_id = typeof args.customer_id === 'string' ? args.customer_id : null;
  }
  if (typeof args.estimated_value === 'number') updates.estimated_value = args.estimated_value;
  if (typeof args.start_date === 'string') updates.start_date = args.start_date;
  if (typeof args.due_date === 'string') updates.due_date = args.due_date;
  if (Array.isArray(args.tags)) updates.tags = args.tags;

  if (Object.keys(updates).length === 0) {
    throw new Error('No valid fields to update');
  }

  const { error } = await supabase
    .from('spark_projects')
    .update(updates)
    .eq('id', args.project_id)
    .eq('user_id', user.userId);

  if (error) throw new Error(`Failed to update project: ${error.message}`);

  return { success: true };
}

export async function completeProject(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.project_id !== 'string') {
    throw new Error('project_id is required');
  }

  const supabase = user.supabase;

  // Complete the project
  const { error } = await supabase
    .from('spark_projects')
    .update({
      status: 'completed',
      completed_at: new Date().toISOString(),
    })
    .eq('id', args.project_id)
    .eq('user_id', user.userId);

  if (error) throw new Error(`Failed to complete project: ${error.message}`);

  // Optionally complete all open tasks in the project
  if (args.complete_tasks === true) {
    const { error: taskError } = await supabase
      .from('spark_tasks')
      .update({
        status: 'done',
        completed_at: new Date().toISOString(),
      })
      .eq('project_id', args.project_id)
      .eq('status', 'open');

    if (taskError)
      throw new Error(`Project completed but failed to complete tasks: ${taskError.message}`);
  }

  return { success: true, status: 'completed' };
}

// ─── Link / Unlink / Summary ──────────────────────────────────────────────

/** Valid tables that support project_id linking */
const LINKABLE_TABLES: Record<string, string> = {
  task: 'spark_tasks',
  quote: 'quotes',
  invoice: 'quotes', // invoices are quotes with invoice_raised=true
  certificate: 'reports',
  rams: 'rams_generation_jobs',
  circuit_design: 'circuit_design_jobs',
  site_visit: 'site_visits',
};

export async function linkToProject(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.project_id !== 'string') {
    throw new Error('project_id is required');
  }
  if (typeof args.entity_type !== 'string' || !LINKABLE_TABLES[args.entity_type]) {
    throw new Error(`entity_type must be one of: ${Object.keys(LINKABLE_TABLES).join(', ')}`);
  }
  if (typeof args.entity_id !== 'string') {
    throw new Error('entity_id is required');
  }

  const supabase = user.supabase;
  const table = LINKABLE_TABLES[args.entity_type];

  // Verify project exists and belongs to user
  const { data: project, error: projErr } = await supabase
    .from('spark_projects')
    .select('id')
    .eq('id', args.project_id)
    .eq('user_id', user.userId)
    .single();

  if (projErr || !project) throw new Error('Project not found');

  // Link the entity
  const { error } = await supabase
    .from(table)
    .update({ project_id: args.project_id })
    .eq('id', args.entity_id);

  if (error) throw new Error(`Failed to link ${args.entity_type} to project: ${error.message}`);

  return {
    success: true,
    entity_type: args.entity_type,
    entity_id: args.entity_id,
    project_id: args.project_id,
  };
}

export async function unlinkFromProject(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.entity_type !== 'string' || !LINKABLE_TABLES[args.entity_type]) {
    throw new Error(`entity_type must be one of: ${Object.keys(LINKABLE_TABLES).join(', ')}`);
  }
  if (typeof args.entity_id !== 'string') {
    throw new Error('entity_id is required');
  }

  const supabase = user.supabase;
  const table = LINKABLE_TABLES[args.entity_type];

  const { error } = await supabase
    .from(table)
    .update({ project_id: null })
    .eq('id', args.entity_id);

  if (error) throw new Error(`Failed to unlink ${args.entity_type}: ${error.message}`);

  return { success: true, entity_type: args.entity_type, entity_id: args.entity_id };
}

export async function getProjectSummary(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.project_id !== 'string') {
    throw new Error('project_id is required');
  }

  const supabase = user.supabase;

  // Get project details
  const { data: project, error: projErr } = await supabase
    .from('spark_projects')
    .select('*, customers(name, email, phone)')
    .eq('id', args.project_id)
    .eq('user_id', user.userId)
    .single();

  if (projErr || !project) throw new Error('Project not found');

  // Fetch all linked entities in parallel
  const [tasksResult, quotesResult, invoicesResult, certsResult, ramsResult, designsResult] =
    await Promise.all([
      supabase
        .from('spark_tasks')
        .select('id, title, status, priority, due_at, completed_at')
        .eq('project_id', args.project_id)
        .neq('status', 'cancelled')
        .order('due_at', { ascending: true }),

      supabase
        .from('quotes')
        .select('id, status, total, client_data, created_at')
        .eq('project_id', args.project_id)
        .eq('invoice_raised', false),

      supabase
        .from('quotes')
        .select('id, status, total, invoice_status, client_data, created_at')
        .eq('project_id', args.project_id)
        .eq('invoice_raised', true),

      supabase
        .from('reports')
        .select('id, report_type, status, installation_address, created_at')
        .eq('project_id', args.project_id),

      supabase
        .from('rams_generation_jobs')
        .select('id, status, job_type, created_at')
        .eq('project_id', args.project_id),

      supabase
        .from('circuit_design_jobs')
        .select('id, status, job_type, created_at')
        .eq('project_id', args.project_id),
    ]);

  const tasks = tasksResult.data || [];
  const completedTasks = tasks.filter((t) => t.status === 'done').length;

  const customer = project.customers as { name: string; email: string; phone: string } | null;

  return {
    project: {
      id: project.id,
      title: project.title,
      description: project.description,
      status: project.status,
      priority: project.priority,
      customer_name: customer?.name || null,
      customer_email: customer?.email || null,
      estimated_value: project.estimated_value,
      start_date: project.start_date,
      due_date: project.due_date,
      created_at: project.created_at,
    },
    tasks: {
      items: tasks,
      total: tasks.length,
      completed: completedTasks,
      progress: tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0,
    },
    quotes: {
      items: quotesResult.data || [],
      total: (quotesResult.data || []).length,
      total_value: (quotesResult.data || []).reduce((s, q) => s + (Number(q.total) || 0), 0),
    },
    invoices: {
      items: invoicesResult.data || [],
      total: (invoicesResult.data || []).length,
      total_value: (invoicesResult.data || []).reduce((s, i) => s + (Number(i.total) || 0), 0),
      paid: (invoicesResult.data || []).filter((i) => i.invoice_status === 'paid').length,
    },
    certificates: {
      items: certsResult.data || [],
      total: (certsResult.data || []).length,
    },
    rams: {
      items: ramsResult.data || [],
      total: (ramsResult.data || []).length,
    },
    circuit_designs: {
      items: designsResult.data || [],
      total: (designsResult.data || []).length,
    },
  };
}
