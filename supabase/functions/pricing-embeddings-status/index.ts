import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { job_id, cache_id, supplier } = await req.json();

    console.log('📊 Checking embeddings status...', { job_id, cache_id, supplier });

    // If job_id provided, get specific job status
    if (job_id) {
      const { data: job, error: jobError } = await supabase
        .from('batch_jobs')
        .select('*, batch_progress(*)')
        .eq('id', job_id)
        .single();

      if (jobError) throw jobError;

      if (!job) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Job not found'
        }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const batchProgress = job.batch_progress?.[0];

      return new Response(JSON.stringify({
        success: true,
        job_id: job.id,
        status: job.status,
        total: batchProgress?.total_items || 0,
        processed: batchProgress?.items_processed || 0,
        errors: batchProgress?.data?.errors || 0,
        skipped: batchProgress?.data?.skipped || 0,
        progress_percentage: job.progress_percentage || 0,
        started_at: job.started_at,
        completed_at: job.completed_at,
        error_message: job.error_message
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Otherwise, get latest job for cache_id or supplier
    let query = supabase
      .from('batch_jobs')
      .select('*, batch_progress(*)')
      .eq('job_type', 'pricing_embeddings')
      .order('created_at', { ascending: false })
      .limit(1);

    if (cache_id) {
      query = query.eq('metadata->>cache_id', cache_id);
    } else if (supplier) {
      query = query.ilike('metadata->>supplier', `%${supplier}%`);
    }

    const { data: jobs, error } = await query;

    if (error) throw error;

    if (!jobs || jobs.length === 0) {
      // No job found, check total embeddings count
      const { count } = await supabase
        .from('pricing_embeddings')
        .select('*', { count: 'exact', head: true });

      return new Response(JSON.stringify({
        success: true,
        job_id: null,
        status: 'no_job',
        total: count || 0,
        processed: count || 0,
        errors: 0,
        skipped: 0,
        progress_percentage: 100
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const job = jobs[0];
    const batchProgress = job.batch_progress?.[0];

    return new Response(JSON.stringify({
      success: true,
      job_id: job.id,
      status: job.status,
      total: batchProgress?.total_items || 0,
      processed: batchProgress?.items_processed || 0,
      errors: batchProgress?.data?.errors || 0,
      skipped: batchProgress?.data?.skipped || 0,
      progress_percentage: job.progress_percentage || 0,
      started_at: job.started_at,
      completed_at: job.completed_at,
      error_message: job.error_message
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error checking embeddings status:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to check status',
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
