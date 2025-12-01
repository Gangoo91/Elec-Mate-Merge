import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { generateMaintenanceMethod } from '../_agents/maintenance-method-core.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { jobId } = await req.json();

    console.log(`🔧 Processing maintenance method job: ${jobId}`);

    // Fetch job
    const { data: job, error: fetchError } = await supabase
      .from('maintenance_method_jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (fetchError || !job) {
      console.error('Job not found:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Job not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update status to processing
    await supabase
      .from('maintenance_method_jobs')
      .update({
        status: 'processing',
        started_at: new Date().toISOString(),
        progress: 5,
        current_step: 'Initializing maintenance method generation'
      })
      .eq('id', jobId);

    // Generate maintenance method
    const result = await generateMaintenanceMethod({
      supabase,
      jobId,
      query: job.query,
      equipmentDetails: job.equipment_details,
      detailLevel: job.detail_level || 'normal'
    });

    if (result.success) {
      // Update job with success
      await supabase
        .from('maintenance_method_jobs')
        .update({
          status: 'completed',
          progress: 100,
          method_data: result.data,
          quality_metrics: result.metrics,
          completed_at: new Date().toISOString(),
          current_step: 'Maintenance method generation completed'
        })
        .eq('id', jobId);

      console.log(`✅ Maintenance method job completed: ${jobId}`);
    } else {
      // Update job with failure
      await supabase
        .from('maintenance_method_jobs')
        .update({
          status: 'failed',
          error_message: result.error || 'Unknown error',
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);

      console.error(`❌ Maintenance method job failed: ${jobId}`, result.error);
    }

    return new Response(
      JSON.stringify({ success: result.success }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('Error in process-maintenance-method-job:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
