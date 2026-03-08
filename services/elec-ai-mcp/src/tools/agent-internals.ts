/**
 * Agent internal tools — read_memory, write_memory, delete_memory, log_activity, read_activity_log
 * Maps to: Supabase `user_agent_preferences` + `agent_action_log` tables
 *
 * Note: log_activity is also called automatically by the audit logger middleware.
 * This tool exists so the agent can log additional context (e.g. approval decisions).
 */

import type { UserContext } from '../auth.js';

export async function readMemory(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  let query = supabase.from('user_agent_preferences').select('key, value, source, updated_at');

  if (typeof args.key === 'string') {
    query = query.eq('key', args.key);
  }

  const { data, error } = await query;
  if (error) throw new Error(`Failed to read memory: ${error.message}`);

  const preferences = data || [];
  return {
    preferences,
    memory_summary:
      preferences.length > 0
        ? preferences.map((p) => `${p.key}: ${p.value}`).join('\n')
        : 'No stored preferences.',
  };
}

export async function writeMemory(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.key !== 'string' || args.key.trim().length === 0) {
    throw new Error('key is required');
  }
  if (typeof args.value !== 'string') {
    throw new Error('value is required');
  }
  if (args.source !== 'user_stated' && args.source !== 'agent_learned') {
    throw new Error('source must be "user_stated" or "agent_learned"');
  }

  const supabase = user.supabase;

  const { error } = await supabase.from('user_agent_preferences').upsert(
    {
      user_id: user.userId,
      key: args.key.trim(),
      value: args.value,
      source: args.source,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,key' }
  );

  if (error) throw new Error(`Failed to write memory: ${error.message}`);

  return { stored: true };
}

export async function deleteMemory(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  if (args.all === true) {
    const { error } = await supabase
      .from('user_agent_preferences')
      .delete()
      .eq('user_id', user.userId);

    if (error) throw new Error(`Failed to delete all memories: ${error.message}`);
    return { deleted: true, scope: 'all' };
  }

  if (typeof args.key === 'string') {
    const { error } = await supabase
      .from('user_agent_preferences')
      .delete()
      .eq('user_id', user.userId)
      .eq('key', args.key);

    if (error) throw new Error(`Failed to delete memory: ${error.message}`);
    return { deleted: true, scope: 'key', key: args.key };
  }

  throw new Error('Specify a key to delete, or set all: true to delete everything');
}

export async function logActivity(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.action_type !== 'string') {
    throw new Error('action_type is required');
  }
  if (typeof args.action_detail !== 'object' || args.action_detail === null) {
    throw new Error('action_detail is required and must be an object');
  }

  const supabase = user.supabase;

  const { data, error } = await supabase
    .from('agent_action_log')
    .insert({
      user_id: user.userId,
      action_type: args.action_type,
      detail: args.action_detail,
      tool_name: typeof args.tool_name === 'string' ? args.tool_name : null,
      client_id: typeof args.client_id === 'string' ? args.client_id : null,
      approved: typeof args.approved === 'boolean' ? args.approved : null,
    })
    .select('id')
    .single();

  if (error) throw new Error(`Failed to log activity: ${error.message}`);

  return { log_id: data.id };
}

export async function getUsageSummary(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  // Default to last 7 days
  const days = typeof args.days === 'number' && args.days > 0 ? Math.min(args.days, 90) : 7;
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data, error } = await supabase
    .from('agent_usage')
    .select('date, tool_calls, messages_sent, messages_received, rag_queries, rate_limit_hits')
    .gte('date', since.toISOString().slice(0, 10))
    .order('date', { ascending: false });

  if (error) throw new Error(`Failed to read usage: ${error.message}`);

  const rows = data || [];
  const totals = rows.reduce(
    (acc, row) => ({
      tool_calls: acc.tool_calls + (row.tool_calls || 0),
      messages_sent: acc.messages_sent + (row.messages_sent || 0),
      messages_received: acc.messages_received + (row.messages_received || 0),
      rag_queries: acc.rag_queries + (row.rag_queries || 0),
    }),
    { tool_calls: 0, messages_sent: 0, messages_received: 0, rag_queries: 0 }
  );

  return {
    period_days: days,
    daily_breakdown: rows,
    totals,
    summary: `Over the last ${days} days: ${totals.tool_calls} tool calls, ${totals.messages_sent} messages sent, ${totals.rag_queries} knowledge lookups.`,
  };
}

export async function readActivityLog(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  let query = supabase
    .from('agent_action_log')
    .select('id, action_type, detail, tool_name, client_id, approved, created_at');

  if (typeof args.date_from === 'string') {
    query = query.gte('created_at', args.date_from);
  }
  if (typeof args.action_type === 'string') {
    query = query.eq('action_type', args.action_type);
  }

  const limit = typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 100) : 50;
  query = query.order('created_at', { ascending: false }).limit(limit);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to read activity log: ${error.message}`);

  return { activities: data || [] };
}
