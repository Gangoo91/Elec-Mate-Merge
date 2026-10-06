import { supabase } from '@/integrations/supabase/client';

/**
 * Start a RAMS from a previous one.
 *
 * Electricians do the same jobs again and again; regenerating a consumer-unit
 * change from scratch every time is slow and gives a different document each
 * time. This copies an earlier generated RAMS into a NEW record (the original
 * and its issued versions are untouched), puts this job's name and site on it,
 * and clears the review and anything site-specific that cannot carry over —
 * so the Issue tab's checks force a fresh look at this site.
 *
 * Inserted as status 'complete' so nothing is generated or charged; the
 * results page opens it for editing like any other RAMS.
 */
export async function copyRamsForNewJob(
  sourceId: string,
  target: { projectName?: string; location?: string; projectId?: string }
): Promise<{ id: string } | { error: string }> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Not signed in' };

  const { data: src, error: readErr } = await supabase
    .from('rams_generation_jobs')
    .select('job_description, project_info, job_scale, rams_data, method_data')
    .eq('id', sourceId)
    .eq('user_id', user.id)
    .single();
  if (readErr || !src) return { error: readErr?.message || 'RAMS not found' };

  const rams = { ...((src.rams_data as Record<string, unknown>) ?? {}) };
  const method = { ...((src.method_data as Record<string, unknown>) ?? {}) };
  const name = target.projectName?.trim();
  const site = target.location?.trim();
  if (name) {
    rams.projectName = name;
    method.jobTitle = name;
  }
  // The old site's address and people never belong on a new site's RAMS.
  rams.location = site || '';
  method.location = site || '';
  for (const k of [
    'siteManagerName',
    'siteManagerPhone',
    'firstAiderName',
    'firstAiderPhone',
    'safetyOfficerName',
    'safetyOfficerPhone',
    'assemblyPoint',
  ]) {
    rams[k] = '';
  }
  rams.date = new Date().toISOString().split('T')[0];
  delete rams.review;

  const { data: created, error: insErr } = await supabase
    .from('rams_generation_jobs')
    .insert({
      user_id: user.id,
      job_description: String(src.job_description ?? ''),
      project_info: {
        ...((src.project_info as Record<string, unknown>) ?? {}),
        ...(name ? { projectName: name } : {}),
        location: site || '',
      },
      job_scale: src.job_scale,
      status: 'complete',
      progress: 100,
      rams_data: rams as never,
      method_data: method as never,
      completed_at: new Date().toISOString(),
      project_id: target.projectId ?? null,
      generation_metadata: { copied_from: sourceId },
    })
    .select('id')
    .single();
  if (insErr || !created) return { error: insErr?.message || 'Could not copy' };
  return { id: created.id };
}
