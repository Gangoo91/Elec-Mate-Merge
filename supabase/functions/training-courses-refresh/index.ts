import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const VPS_PIPELINE_URL = 'http://89.167.69.251:3002/pipeline/run/courses_scrape';
const FRESHNESS_HOURS = 6;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check when data was last scraped
    const { data: latest } = await supabase
      .from('training_courses')
      .select('scraped_at')
      .order('scraped_at', { ascending: false })
      .limit(1)
      .single();

    const count = await supabase
      .from('training_courses')
      .select('id', { count: 'exact', head: true });

    const totalCourses = count.count ?? 0;

    if (latest?.scraped_at) {
      const scrapedAt = new Date(latest.scraped_at);
      const ageHours = (Date.now() - scrapedAt.getTime()) / (1000 * 60 * 60);

      if (ageHours < FRESHNESS_HOURS) {
        return new Response(
          JSON.stringify({
            fresh: true,
            total_courses: totalCourses,
            last_updated: latest.scraped_at,
            age_hours: Math.round(ageHours * 10) / 10,
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    // Data is stale or missing — trigger pipeline on VPS
    try {
      const pipelineRes = await fetch(VPS_PIPELINE_URL, { method: 'POST' });
      const pipelineData = await pipelineRes.json();
      console.log('Pipeline triggered:', pipelineData);
    } catch (pipelineError) {
      console.error('Failed to trigger pipeline:', pipelineError);
      // Still return success — the data will be refreshed on next scheduled run
    }

    return new Response(
      JSON.stringify({
        fresh: false,
        total_courses: totalCourses,
        last_updated: latest?.scraped_at ?? null,
        message: 'Refresh triggered — new data will be available shortly',
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in training-courses-refresh:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
