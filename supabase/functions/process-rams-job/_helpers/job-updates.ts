/**
 * Database update helpers for job status
 */

import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

export async function updateJobProgress(
  supabase: SupabaseClient,
  jobId: string,
  progress: number,
  currentStep: string
): Promise<void> {
  await supabase
    .from('rams_generation_jobs')
    .update({ progress, current_step: currentStep })
    .eq('id', jobId);
}

export async function updateJobProcessing(
  supabase: SupabaseClient,
  jobId: string
): Promise<void> {
  await supabase
    .from('rams_generation_jobs')
    .update({ 
      status: 'processing', 
      started_at: new Date().toISOString(),
      current_step: 'Analysing job description and identifying potential hazards...',
      progress: 5
    })
    .eq('id', jobId);
}

export async function updateJobComplete(
  supabase: SupabaseClient,
  jobId: string,
  ramsData: any,
  methodData: any,
  rawHsResponse?: any,
  rawInstallerResponse?: any
): Promise<void> {
  await supabase
    .from('rams_generation_jobs')
    .update({
      status: 'complete',
      progress: 100,
      current_step: 'RAMS generation complete!',
      rams_data: ramsData,
      ...(methodData ? { method_data: methodData } : {}),
      ...(rawInstallerResponse ? { raw_installer_response: rawInstallerResponse } : {}),
      ...(rawHsResponse ? { raw_hs_response: rawHsResponse } : {}),
      completed_at: new Date().toISOString(),
      generation_metadata: { cache_hit: false }
    })
    .eq('id', jobId);
}

export async function updateJobError(
  supabase: SupabaseClient,
  jobId: string | null,
  errorMessage: string
): Promise<void> {
  if (!jobId) return;
  
  await supabase
    .from('rams_generation_jobs')
    .update({
      status: 'failed',
      error_message: errorMessage,
      completed_at: new Date().toISOString()
    })
    .eq('id', jobId);
}

export async function checkIfCancelled(
  supabase: SupabaseClient,
  jobId: string
): Promise<boolean> {
  const { data } = await supabase
    .from('rams_generation_jobs')
    .select('status')
    .eq('id', jobId)
    .single();
  
  return data?.status === 'cancelled';
}
