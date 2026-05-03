import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  let jobId: string | undefined;

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const jobInputs = await req.json();

    const { data: job, error: insertError } = await supabase
      .from('circuit_design_jobs')
      .insert({
        user_id: user.id,
        job_inputs: jobInputs,
        status: 'processing',
        progress: 5,
        current_step: 'Starting designer…',
        started_at: new Date().toISOString(),
        designer_status: 'pending',
        designer_progress: 0,
      })
      .select()
      .single();

    if (insertError || !job) {
      console.error('Failed to create job:', insertError);
      return new Response(JSON.stringify({ error: insertError?.message ?? 'Insert failed' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    jobId = job.id;
    console.log(`✅ Circuit design job created: ${jobId}`);

    const designerTask = supabase.functions
      .invoke('designer-agent-v3', {
        body: {
          jobId,
          mode: 'direct-design',
          projectInfo: jobInputs.projectInfo,
          supply: jobInputs.supply,
          circuits: jobInputs.circuits,
          additionalPrompt: jobInputs.additionalPrompt || '',
          specialRequirements: jobInputs.specialRequirements || [],
          installationConstraints: jobInputs.installationConstraints || {},
        },
      })
      .then(() => {
        console.log(`✅ Designer HTTP response received for job ${jobId}`);
      })
      .catch((error) => {
        console.log(`ℹ️ Designer HTTP connection closed for job ${jobId}:`, error.message);
      });

    EdgeRuntime.waitUntil(designerTask);

    console.log(`🚀 Designer launched for job ${jobId}`);

    return new Response(JSON.stringify({ jobId, status: 'processing' }), {
      status: 202,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in circuit-designer:', error);

    if (jobId) {
      try {
        const supabase = createClient(
          Deno.env.get('SUPABASE_URL')!,
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        );
        await supabase
          .from('circuit_design_jobs')
          .update({
            status: 'failed',
            error_message: error.message,
            current_step: `Failed: ${error.message}`,
          })
          .eq('id', jobId);
      } catch (updateError) {
        console.error('Failed to update job with error:', updateError);
      }
    }

    await captureException(error, {
      functionName: 'circuit-designer',
      requestUrl: req.url,
      requestMethod: req.method,
    });

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
