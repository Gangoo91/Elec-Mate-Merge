import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestId = generateRequestId();
    const logger = createLogger(requestId);
    
    logger.info('🚀 Materials cache updater function invoked');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new ValidationError('Supabase credentials not configured');
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if cache was recently updated (within last 6 days) with timeout
    const { data: existingCache, error: cacheError } = await withTimeout(
      supabase
        .from('materials_weekly_cache')
        .select('created_at, expires_at')
        .order('created_at', { ascending: false })
        .limit(1)
        .single(),
      Timeouts.QUICK,
      'cache age check'
    );

    if (!cacheError && existingCache) {
      const cacheAge = Date.now() - new Date(existingCache.created_at).getTime();
      const sixDaysInMs = 6 * 24 * 60 * 60 * 1000;
      
      if (cacheAge < sixDaysInMs) {
        logger.info('⏰ Cache is still fresh, skipping update', {
          cacheAgeDays: Math.floor(cacheAge / (24 * 60 * 60 * 1000)),
          nextUpdateDue: existingCache.expires_at
        });
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Cache is still fresh',
            cacheAge: Math.floor(cacheAge / (24 * 60 * 60 * 1000)),
            nextUpdateDue: existingCache.expires_at
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    logger.info('🔄 Updating materials cache with fresh data');

    // Clear old cache entries first with timeout
    const { error: deleteError } = await withTimeout(
      supabase
        .from('materials_weekly_cache')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'),
      Timeouts.QUICK,
      'old cache deletion'
    );

    if (deleteError) {
      logger.warn('Error clearing old cache', { error: deleteError });
    } else {
      logger.info('🗑️ Cleared old cache entries');
    }

    // Call the comprehensive materials scraper with retry and timeout
    logger.info('📞 Calling comprehensive-materials-scraper');
    
    const { data: scraperResponse, error: scraperError } = await withRetry(
      () => withTimeout(
        supabase.functions.invoke('comprehensive-materials-scraper', { body: {} }),
        Timeouts.CRITICAL, // 2 minutes for scraping
        'comprehensive materials scraper'
      ),
      RetryPresets.STANDARD
    );

    if (scraperError) {
      logger.error('Error calling scraper', { error: scraperError });
      throw new Error(`Scraper error: ${scraperError.message}`);
    }

    logger.info('📊 Scraper response received', { responseType: typeof scraperResponse });

    // Extract the actual data from the scraper response
    let scrapedData;
    
    // Handle different response formats - check for materials property first
    if (scraperResponse && scraperResponse.materials && Array.isArray(scraperResponse.materials)) {
      scrapedData = scraperResponse.materials;
    } else if (scraperResponse && scraperResponse.data) {
      scrapedData = scraperResponse.data;
    } else if (scraperResponse && Array.isArray(scraperResponse)) {
      scrapedData = scraperResponse;
    } else {
      scrapedData = null;
    }

    if (!scrapedData || !Array.isArray(scrapedData) || scrapedData.length === 0) {
      logger.error('Scraper returned no usable data', { 
        responseType: typeof scraperResponse, 
        isArray: Array.isArray(scraperResponse) 
      });
      throw new Error(`No data returned from scraper. Response type: ${typeof scraperResponse}, Array: ${Array.isArray(scraperResponse)}`);
    }

    logger.info(`📊 Got ${scrapedData.length} materials from scraper`);

    // Group materials by category for storage
    const categoryData: Record<string, any[]> = {};
    scrapedData.forEach((material: any) => {
      const category = material.category?.toLowerCase() || 'other';
      if (!categoryData[category]) {
        categoryData[category] = [];
      }
      categoryData[category].push(material);
    });

    // Store data in cache with 7-day expiry
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const cacheEntries = Object.entries(categoryData).map(([category, materials]) => ({
      category,
      materials_data: materials,
      total_products: materials.length,
      expires_at: expiresAt.toISOString(),
      update_status: 'completed'
    }));

    // Insert new cache entries with timeout
    const { error: insertError } = await withTimeout(
      supabase
        .from('materials_weekly_cache')
        .insert(cacheEntries),
      Timeouts.STANDARD,
      'cache entries insertion'
    );

    if (insertError) {
      logger.error('Error storing cache data', { error: insertError });
      throw new Error(`Cache storage error: ${insertError.message}`);
    }

    logger.info(`✅ Successfully cached ${cacheEntries.length} categories with ${scrapedData.length} total materials`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Cache updated with ${scrapedData.length} materials across ${cacheEntries.length} categories`,
        categoriesUpdated: Object.keys(categoryData),
        totalMaterials: scrapedData.length,
        expiresAt: expiresAt.toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return handleError(error);
  }
});