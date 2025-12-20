import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { generateMaintenanceMethod } from '../_agents/maintenance-method-core.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Declare EdgeRuntime for TypeScript
declare const EdgeRuntime: {
  waitUntil: (promise: Promise<unknown>) => void;
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

    // Start background processing - this allows the HTTP response to return immediately
    // while the OpenAI call continues in the background
    EdgeRuntime.waitUntil((async () => {
      console.log(`🚀 Background task started for job: ${jobId}`);
      
      try {
        // Generate maintenance method (this is the slow OpenAI call)
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

          console.log(`✅ Background task completed successfully: ${jobId}`);
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

          console.error(`❌ Background task failed: ${jobId}`, result.error);
        }
      } catch (error: any) {
        console.error(`💥 Background task crashed: ${jobId}`, error);
        
        // Mark job as failed
        await supabase
          .from('maintenance_method_jobs')
          .update({
            status: 'failed',
            error_message: `Background task error: ${error.message}`,
            completed_at: new Date().toISOString()
          })
          .eq('id', jobId);
      }
    })());

    // Return immediately - don't wait for OpenAI
    console.log(`📤 Returning HTTP response immediately for job: ${jobId}`);
    return new Response(
      JSON.stringify({ success: true, message: 'Processing started in background' }),
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
