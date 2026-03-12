/**
 * Safety tools (3)
 * Safety document templates, safe isolation records, and site diary entries.
 *
 * Tools:
 *   - get_safety_templates — browse safety_document_templates
 *   - create_safe_isolation_record — log GS38 procedure to safe_isolation_records
 *   - log_site_diary_entry — daily site entry to electrician_site_diary
 */

import type { UserContext } from '../auth.js';

export async function getSafetyTemplates(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  let query = supabase
    .from('safety_document_templates')
    .select('id, title, description, category, template_type, content');

  if (typeof args.category === 'string' && args.category.length > 0) {
    query = query.eq('category', args.category);
  }

  if (typeof args.template_type === 'string' && args.template_type.length > 0) {
    query = query.eq('template_type', args.template_type);
  }

  if (typeof args.search === 'string' && args.search.length > 0) {
    const searchTerm = args.search.replace(/[,.()"'\\]/g, '');
    query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
  }

  const limit = typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 30) : 20;
  query = query.order('title', { ascending: true }).limit(limit);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to get safety templates: ${error.message}`);

  return { templates: data || [] };
}

export async function createSafeIsolationRecord(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.location !== 'string' || args.location.trim().length === 0) {
    throw new Error('location is required');
  }
  if (
    typeof args.circuit_description !== 'string' ||
    args.circuit_description.trim().length === 0
  ) {
    throw new Error('circuit_description is required');
  }

  const supabase = user.supabase;

  const { data, error } = await supabase
    .from('safe_isolation_records')
    .insert({
      user_id: user.userId,
      location: args.location.trim(),
      circuit_description: args.circuit_description.trim(),
      supply_type: typeof args.supply_type === 'string' ? args.supply_type : null,
      isolation_point: typeof args.isolation_point === 'string' ? args.isolation_point : null,
      voltage_before: typeof args.voltage_before === 'number' ? args.voltage_before : null,
      voltage_after: typeof args.voltage_after === 'number' ? args.voltage_after : null,
      proving_unit_used:
        typeof args.proving_unit_used === 'boolean' ? args.proving_unit_used : false,
      lock_off_applied: typeof args.lock_off_applied === 'boolean' ? args.lock_off_applied : false,
      caution_notice_posted:
        typeof args.caution_notice_posted === 'boolean' ? args.caution_notice_posted : false,
      gs38_compliant: typeof args.gs38_compliant === 'boolean' ? args.gs38_compliant : false,
      notes: typeof args.notes === 'string' ? args.notes.trim() : null,
      date: typeof args.date === 'string' ? args.date : new Date().toISOString().split('T')[0],
      customer_id: typeof args.customer_id === 'string' ? args.customer_id : null,
      job_id: typeof args.job_id === 'string' ? args.job_id : null,
    })
    .select('id')
    .single();

  if (error) throw new Error(`Failed to create safe isolation record: ${error.message}`);

  return { record_id: data.id, created: true };
}

export async function readSiteDiary(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  let query = supabase
    .from('electrician_site_diary')
    .select(
      'id, date, summary, location, work_completed, issues_encountered, materials_used, weather_conditions, hours_worked, customer_id, project_id, photos, created_at'
    )
    .eq('user_id', user.userId);

  if (typeof args.date_from === 'string') {
    query = query.gte('date', args.date_from);
  }
  if (typeof args.date_to === 'string') {
    query = query.lte('date', args.date_to);
  }
  if (typeof args.location === 'string' && args.location.length > 0) {
    query = query.ilike('location', `%${args.location}%`);
  }
  if (typeof args.project_id === 'string') {
    query = query.eq('project_id', args.project_id);
  }

  const limit = typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 50) : 50;

  const { data, error } = await query.order('date', { ascending: false }).limit(limit);

  if (error) throw new Error(`Failed to read site diary: ${error.message}`);

  return { items: data || [], count: (data || []).length };
}

export async function readSafeIsolationRecords(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  let query = supabase
    .from('safe_isolation_records')
    .select(
      'id, location, circuit_description, supply_type, isolation_point, voltage_before, voltage_after, proving_unit_used, lock_off_applied, caution_notice_posted, gs38_compliant, notes, date, customer_id, job_id, created_at'
    )
    .eq('user_id', user.userId);

  if (typeof args.date_from === 'string') {
    query = query.gte('date', args.date_from);
  }
  if (typeof args.date_to === 'string') {
    query = query.lte('date', args.date_to);
  }
  if (typeof args.location === 'string' && args.location.length > 0) {
    query = query.ilike('location', `%${args.location}%`);
  }
  if (typeof args.gs38_compliant === 'boolean') {
    query = query.eq('gs38_compliant', args.gs38_compliant);
  }

  const limit = typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 50) : 50;

  const { data, error } = await query.order('date', { ascending: false }).limit(limit);

  if (error) throw new Error(`Failed to read safe isolation records: ${error.message}`);

  return { items: data || [], count: (data || []).length };
}

export async function logSiteDiaryEntry(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.date !== 'string') {
    throw new Error('date is required (ISO-8601)');
  }
  if (typeof args.summary !== 'string' || args.summary.trim().length === 0) {
    throw new Error('summary is required');
  }

  const supabase = user.supabase;

  const { data, error } = await supabase
    .from('electrician_site_diary')
    .insert({
      user_id: user.userId,
      date: args.date,
      summary: args.summary.trim(),
      location: typeof args.location === 'string' ? args.location.trim() : null,
      work_completed: typeof args.work_completed === 'string' ? args.work_completed.trim() : null,
      issues_encountered:
        typeof args.issues_encountered === 'string' ? args.issues_encountered.trim() : null,
      materials_used: typeof args.materials_used === 'string' ? args.materials_used.trim() : null,
      weather_conditions:
        typeof args.weather_conditions === 'string' ? args.weather_conditions : null,
      hours_worked: typeof args.hours_worked === 'number' ? args.hours_worked : null,
      customer_id: typeof args.customer_id === 'string' ? args.customer_id : null,
      project_id: typeof args.project_id === 'string' ? args.project_id : null,
      photos: Array.isArray(args.photos) ? args.photos : [],
    })
    .select('id')
    .single();

  if (error) throw new Error(`Failed to log site diary entry: ${error.message}`);

  return { diary_entry_id: data.id, logged: true };
}
