import { corsHeaders, serve, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestId = generateRequestId();
    const logger = createLogger(requestId);
    
    logger.info('📅 Materials weekly scheduler started');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new ValidationError('Supabase credentials not configured');
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if cache refresh is needed (older than 6 days) with timeout
    const { data: cacheStatus } = await withTimeout(
      supabase
        .from('materials_weekly_cache')
        .select('last_updated')
        .order('last_updated', { ascending: false })
        .limit(1)
        .single(),
      Timeouts.QUICK,
      'cache status check'
    );

    const now = new Date();
    const sixDaysAgo = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);
    const lastUpdate = cacheStatus?.last_updated ? new Date(cacheStatus.last_updated) : null;

    if (lastUpdate && lastUpdate > sixDaysAgo) {
      logger.info('✅ Cache is still fresh, skipping refresh', { 
        lastUpdate: lastUpdate.toISOString(),
        nextRefresh: new Date(lastUpdate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
      });
      
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

    logger.info('🔄 Cache is stale, starting refresh');

    // Call the comprehensive materials weekly scraper with retry and timeout
    const scraperResponse = await withRetry(
      () => withTimeout(
        supabase.functions.invoke('comprehensive-materials-weekly-scraper', {
          body: { 
            scheduler_trigger: true,
            timestamp: now.toISOString()
          }
        }),
        Timeouts.CRITICAL, // 2 minutes for scraping operation
        'materials scraper invocation'
      ),
      RetryPresets.STANDARD
    );

    if (scraperResponse.error) {
      logger.error('Error calling materials scraper', { error: scraperResponse.error });
      throw new Error(`Scraper failed: ${scraperResponse.error.message}`);
    }

    logger.info('✅ Materials weekly refresh completed successfully');

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
    return handleError(error);
  }
});