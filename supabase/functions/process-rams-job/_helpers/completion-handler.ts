/**
 * Handle partial and full completions for RAMS generation
 */

import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { transformHealthSafetyResponse } from './transformers.ts';

interface CompletionResult {
  status: 'complete' | 'partial' | 'failed';
  response?: Response;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export async function handleCompletion(
  supabase: SupabaseClient,
  jobId: string,
  job: any,
  hsData: any,
  hsError: any,
  installerData: any,
  installerError: any
): Promise<CompletionResult> {
  
  console.log('🔍 [DEBUG] Completion Handler Input:', {
    hsData: {
      exists: !!hsData,
      keys: hsData ? Object.keys(hsData) : [],
      hasDataField: !!(hsData?.data),
      successField: hsData?.success
    },
    hsError: {
      exists: !!hsError,
      message: hsError?.message
    },
    installerData: {
      exists: !!installerData,
      keys: installerData ? Object.keys(installerData) : [],
      hasDataField: !!(installerData?.data),
      successField: installerData?.success
    },
    installerError: {
      exists: !!installerError,
      message: installerError?.message
    }
  });

  const hsSucceeded = hsData && !hsError;
  const installerSucceeded = installerData && !installerError;

  console.log('🔍 [DEBUG] Success Checks:', {
    hsSucceeded,
    installerSucceeded
  });

  const projectDetails = {
    projectName: job.project_info.projectName,
    location: job.project_info.location,
    contractor: job.project_info.contractor,
    supervisor: job.project_info.supervisor,
    assessor: job.project_info.assessor
  };

  // Case 1: Total failure
  if (!hsSucceeded && !installerSucceeded) {
    console.error('❌ Both agents failed');
    await supabase
      .from('rams_generation_jobs')
      .update({
        status: 'failed',
        progress: 0,
        current_step: 'Both agents failed to generate content',
        error_message: `H&S Error: ${hsError?.message || 'Unknown'}, Installer Error: ${installerError?.message || 'Unknown'}`,
        completed_at: new Date().toISOString()
      })
      .eq('id', jobId);
    
    return { 
      status: 'failed',
      response: new Response(
        JSON.stringify({ success: false, error: 'Both agents failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    };
  }

  // Case 2: Partial - RAMS only
  if (hsSucceeded && !installerSucceeded) {
    console.warn('⚠️ Installer failed but Health & Safety succeeded');
    
    const transformedRAMSData = transformHealthSafetyResponse(hsData, projectDetails);
    
    await supabase
      .from('rams_generation_jobs')
      .update({
        status: 'partial',
        progress: 100,
        current_step: 'Risk assessment complete (Method statement failed)',
        rams_data: transformedRAMSData,
        method_data: null,
        error_message: `Method statement generation failed: ${installerError?.message || 'Unknown error'}`,
        completed_at: new Date().toISOString()
      })
      .eq('id', jobId);
    
    return { 
      status: 'partial',
      response: new Response(
        JSON.stringify({ success: true, jobId, partial: true, hasRAMS: true, hasMethod: false }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    };
  }

  // Case 3: Partial - Method Statement only
  if (!hsSucceeded && installerSucceeded) {
    console.warn('⚠️ Health & Safety failed but Installer succeeded');
    await supabase
      .from('rams_generation_jobs')
      .update({
        status: 'partial',
        progress: 100,
        current_step: 'Method statement complete (Risk assessment failed)',
        rams_data: null,
        method_data: installerData?.data,
        error_message: `Risk assessment generation failed: ${hsError?.message || 'Unknown error'}`,
        completed_at: new Date().toISOString()
      })
      .eq('id', jobId);
    
    return { 
      status: 'partial',
      response: new Response(
        JSON.stringify({ success: true, jobId, partial: true, hasRAMS: false, hasMethod: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    };
  }

  // Case 4: Full success
  return { status: 'complete' };
}
