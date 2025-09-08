import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Materials Cache Updater function invoked');
    
    // Create Supabase client for internal operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if cache was recently updated (within last 13 days for bi-weekly cycle)
    const { data: existingCache, error: cacheError } = await supabase
      .from('materials_weekly_cache')
      .select('created_at, expires_at')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (!cacheError && existingCache) {
      const cacheAge = Date.now() - new Date(existingCache.created_at).getTime();
      const thirteenDaysInMs = 13 * 24 * 60 * 60 * 1000; // 13 days (bi-weekly with 1 day buffer)
      
      if (cacheAge < thirteenDaysInMs) {
        console.log('⏰ Cache is still fresh, skipping update');
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Cache is still fresh (bi-weekly cycle)',
            cacheAge: Math.floor(cacheAge / (24 * 60 * 60 * 1000)),
            nextUpdateDue: existingCache.expires_at
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    console.log('🔄 Starting batch processing for materials data...');

    // Start batch processing instead of direct scraping
    const { data: batchResponse, error: batchError } = await supabase.functions.invoke(
      'materials-batch-processor',
      { body: { refresh: true } }
    );

    if (batchError) {
      console.error('❌ Error starting batch processor:', batchError);
      throw new Error(`Batch processor error: ${batchError.message}`);
    }

    console.log('✅ Batch processing started successfully:', batchResponse);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Batch processing started',
        job_id: batchResponse?.job_id,
        estimated_time: batchResponse?.estimated_time || '5-10 minutes',
        action: 'batch_started'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Error in materials-cache-updater:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to update materials cache', 
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});