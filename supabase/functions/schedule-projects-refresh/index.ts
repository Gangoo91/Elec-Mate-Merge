import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('Starting scheduled projects refresh...');

    // Call the enhanced projects scraper
    const { data: scrapeResult, error: scrapeError } = await supabase.functions.invoke(
      'enhanced-projects-scraper',
      {
        body: { 
          scheduled: true,
          timestamp: new Date().toISOString()
        }
      }
    );

    if (scrapeError) {
      console.error('Error calling enhanced-projects-scraper:', scrapeError);
      throw scrapeError;
    }

    console.log('Scheduled refresh completed successfully:', scrapeResult);

    // Log the scheduled execution
    const { error: logError } = await supabase
      .from('scraping_logs')
      .insert({
        status: 'success',
        projects_found: scrapeResult?.stats?.scraped || 0,
        projects_added: scrapeResult?.stats?.inserted || 0,
        error_message: null,
        execution_time_ms: Date.now() // Simplified timing
      });

    if (logError) {
      console.error('Error logging scheduled execution:', logError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Scheduled projects refresh completed successfully',
        stats: scrapeResult?.stats || {},
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in scheduled projects refresh:', error);
    
    // Log the error
    await supabase
      .from('scraping_logs')
      .insert({
        status: 'error',
        projects_found: 0,
        projects_added: 0,
        error_message: error.message,
        execution_time_ms: Date.now()
      });

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});