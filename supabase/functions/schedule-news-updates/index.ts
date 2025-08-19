import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Scheduled news update triggered');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Trigger the comprehensive news scraper
    const { data, error } = await supabase.functions.invoke('comprehensive-news-scraper', {
      body: { scheduled: true }
    });

    if (error) {
      console.error('Error calling comprehensive-news-scraper:', error);
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('Scheduled news update completed:', data);

    // Log the scheduled update
    const { error: logError } = await supabase
      .from('scraping_logs')
      .insert({
        source_id: null,
        projects_found: data?.stats?.processed || 0,
        projects_added: data?.stats?.inserted || 0,
        execution_time_ms: null,
        status: data?.success ? 'success' : 'failed',
        error_message: data?.success ? null : 'Scheduled update failed'
      });

    if (logError) {
      console.error('Error logging scheduled update:', logError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Scheduled news update completed successfully',
        data: data
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Scheduled update error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to run scheduled update'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});