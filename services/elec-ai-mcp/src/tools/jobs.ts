/**
 * Job tools — read_jobs, create_job, update_job
 * Maps to: Supabase `employer_jobs` table (RLS-scoped)
 *
 * Column mapping (SKILL.md → actual DB):
 *   address → location
 *   client_id → client (string, not FK)
 *   scheduled_date → start_date
 *   estimated_value → value
 *   status values: 'Active'|'Pending'|'Completed'|'On Hold'|'Cancelled'
 */

import type { UserContext } from '../auth.js';

export async function readJobs(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  let query = supabase
    .from('employer_jobs')
    .select(
      'id, title, location, client, status, start_date, end_date, description, value, progress, created_at'
    );

  if (typeof args.status === 'string') {
    // Map agent-friendly lowercase statuses to DB Title Case
    const statusMap: Record<string, string> = {
      active: 'Active',
      completed: 'Completed',
      scheduled: 'Pending',
      pending: 'Pending',
      'on hold': 'On Hold',
      cancelled: 'Cancelled',
    };
    const dbStatus = statusMap[args.status.toLowerCase()] || args.status;
    query = query.eq('status', dbStatus);
  }
  if (typeof args.client_id === 'string') {
    query = query.eq('client', args.client_id);
  }
  if (typeof args.date_from === 'string') {
    query = query.gte('start_date', args.date_from);
  }
  if (typeof args.date_to === 'string') {
    query = query.lte('start_date', args.date_to);
  }

  const limit = typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 100) : 50;
  query = query.order('start_date', { ascending: true }).limit(limit);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to read jobs: ${error.message}`);

  return { jobs: data || [] };
}

export async function createJob(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.title !== 'string' || args.title.trim().length === 0) {
    throw new Error('Job title is required');
  }
  if (typeof args.address !== 'string' || args.address.trim().length === 0) {
    throw new Error('Job location/address is required');
  }

  const supabase = user.supabase;

  const { data, error } = await supabase
    .from('employer_jobs')
    .insert({
      user_id: user.userId,
      title: args.title.trim(),
      location: args.address.trim(),
      client: typeof args.client_id === 'string' ? args.client_id : '',
      description: typeof args.description === 'string' ? args.description : null,
      start_date: typeof args.scheduled_date === 'string' ? args.scheduled_date : null,
      value:
        typeof args.estimated_value === 'number' && args.estimated_value >= 0
          ? args.estimated_value
          : 0,
      status: 'Pending',
    })
    .select('id, status')
    .single();

  if (error) throw new Error(`Failed to create job: ${error.message}`);

  return { job_id: data.id, status: data.status };
}

export async function updateJob(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.job_id !== 'string') {
    throw new Error('job_id is required');
  }

  const supabase = user.supabase;

  const updates: Record<string, unknown> = {};
  if (typeof args.status === 'string') {
    // Map agent-friendly statuses to DB
    const statusMap: Record<string, string> = {
      active: 'Active',
      completed: 'Completed',
      pending: 'Pending',
      'on hold': 'On Hold',
      cancelled: 'Cancelled',
    };
    updates.status = statusMap[args.status.toLowerCase()] || args.status;
  }
  if (typeof args.notes === 'string') updates.description = args.notes;
  if (typeof args.completed_at === 'string') updates.end_date = args.completed_at;

  if (Object.keys(updates).length === 0) {
    throw new Error('No valid fields to update');
  }

  const { error } = await supabase.from('employer_jobs').update(updates).eq('id', args.job_id);

  if (error) throw new Error(`Failed to update job: ${error.message}`);

  return { success: true };
}
