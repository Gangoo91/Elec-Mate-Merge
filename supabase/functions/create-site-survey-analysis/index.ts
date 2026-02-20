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

    const { siteVisitId, inputData } = await req.json();

    if (!siteVisitId) {
      return new Response(JSON.stringify({ error: 'siteVisitId is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create job record
    const { data: job, error } = await supabase
      .from('site_survey_analysis_jobs')
      .insert({
        user_id: user.id,
        site_visit_id: siteVisitId,
        status: 'pending',
        progress: 0,
        input_data: inputData,
      })
      .select()
      .single();

    if (error) {
      console.error('Failed to create analysis job:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`✅ Created site survey analysis job: ${job.id}`);

    // Trigger background processing (fire and forget)
    const processUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/process-site-survey-analysis`;
    fetch(processUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
        'Content-Type': 'application/json',
        'x-supabase-timeout': '300',
      },
      body: JSON.stringify({ jobId: job.id }),
    }).catch((err) => console.error('Failed to trigger processing:', err));

    console.log(`🚀 Triggered background processing for job: ${job.id}`);

    return new Response(JSON.stringify({ jobId: job.id, status: 'pending' }), {
      status: 202,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error in create-site-survey-analysis:', error);
    await captureException(error, {
      functionName: 'create-site-survey-analysis',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
