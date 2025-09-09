import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('📅 [MATERIALS-WEEKLY-SCHEDULER] Starting weekly materials refresh...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if cache refresh is needed (older than 6 days)
    const { data: cacheStatus } = await supabase
      .from('materials_weekly_cache')
      .select('last_updated')
      .order('last_updated', { ascending: false })
      .limit(1)
      .single();

    const now = new Date();
    const sixDaysAgo = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);
    const lastUpdate = cacheStatus?.last_updated ? new Date(cacheStatus.last_updated) : null;

    if (lastUpdate && lastUpdate > sixDaysAgo) {
      console.log('✅ Cache is still fresh, skipping refresh');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Cache is still fresh, no refresh needed',
          last_updated: lastUpdate.toISOString(),
          next_refresh: new Date(lastUpdate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('🔄 Cache is stale, starting refresh...');

    // Call the comprehensive materials weekly scraper
    const scraperResponse = await supabase.functions.invoke('comprehensive-materials-weekly-scraper', {
      body: { 
        scheduler_trigger: true,
        timestamp: now.toISOString()
      }
    });

    if (scraperResponse.error) {
      console.error('❌ Error calling materials scraper:', scraperResponse.error);
      throw new Error(`Scraper failed: ${scraperResponse.error.message}`);
    }

    console.log('✅ Materials weekly refresh completed successfully');

    const response = {
      success: true,
      message: 'Materials weekly refresh completed',
      scraper_response: scraperResponse.data,
      timestamp: now.toISOString(),
      next_refresh: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ [MATERIALS-WEEKLY-SCHEDULER] Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        success: false,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});