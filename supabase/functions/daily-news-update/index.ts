import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting daily news update job...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Invoke the comprehensive news scraper
    console.log('Invoking comprehensive-news-scraper...');
    const scraperResponse = await supabase.functions.invoke('comprehensive-news-scraper', {
      body: { scheduled: true }
    });

    if (scraperResponse.error) {
      console.error('Scraper invocation error:', scraperResponse.error);
      throw new Error(`Scraper failed: ${scraperResponse.error.message}`);
    }

    const scraperData = scraperResponse.data;
    console.log('Scraper response:', scraperData);

    // Log the successful run
    const logEntry = {
      source_id: null,
      projects_found: scraperData?.articlesProcessed || 0,
      projects_added: scraperData?.articlesInserted || 0,
      execution_time_ms: scraperData?.executionTime || 0,
      status: 'success',
      error_message: null
    };

    const { error: logError } = await supabase
      .from('scraping_logs')
      .insert(logEntry);

    if (logError) {
      console.error('Failed to log scraping result:', logError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Daily news update completed successfully',
        articlesProcessed: scraperData?.articlesProcessed || 0,
        articlesInserted: scraperData?.articlesInserted || 0,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Daily news update error:', error);
    
    // Try to log the error
    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL');
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
      
      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase.from('scraping_logs').insert({
          source_id: null,
          projects_found: 0,
          projects_added: 0,
          execution_time_ms: 0,
          status: 'error',
          error_message: error.message
        });
      }
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});