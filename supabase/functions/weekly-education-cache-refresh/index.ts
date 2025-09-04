import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

interface RefreshResult {
  category: string;
  status: 'success' | 'failed';
  error?: string;
  courseCount?: number;
  refreshTime?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🔄 Weekly Education Cache Refresh starting...');
    
    // Get all cache entries that need refreshing (expired or scheduled)
    const { data: cacheEntries, error: fetchError } = await supabase
      .from('live_education_cache')
      .select('*')
      .or('expires_at.lt.now(),refresh_status.eq.scheduled')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('❌ Error fetching cache entries:', fetchError);
      throw fetchError;
    }

    console.log(`📋 Found ${cacheEntries?.length || 0} cache entries to refresh`);

    const refreshResults: RefreshResult[] = [];
    
    // Process each category that needs refreshing
    const categoriesToRefresh = [...new Set(cacheEntries?.map(entry => entry.category) || ['electrical'])];
    
    for (const category of categoriesToRefresh) {
      try {
        console.log(`🔄 Refreshing education cache for category: ${category}`);
        
        // Update status to in_progress
        await supabase
          .from('live_education_cache')
          .update({ refresh_status: 'in_progress' })
          .eq('category', category);

        // Call the live-education-aggregator function to refresh the data
        const { data, error: functionError } = await supabase.functions.invoke('live-education-aggregator', {
          body: { 
            category, 
            refresh: true, // Force refresh
            limit: 50 
          }
        });

        if (functionError) {
          console.error(`❌ Error refreshing ${category}:`, functionError);
          
          // Update status to failed
          await supabase
            .from('live_education_cache')
            .update({ 
              refresh_status: 'failed',
              last_refreshed: new Date().toISOString()
            })
            .eq('category', category);

          refreshResults.push({
            category,
            status: 'failed',
            error: functionError.message,
            refreshTime: new Date().toISOString()
          });
        } else {
          console.log(`✅ Successfully refreshed ${category}: ${data?.data?.length || 0} courses`);
          
          refreshResults.push({
            category,
            status: 'success',
            courseCount: data?.data?.length || 0,
            refreshTime: new Date().toISOString()
          });
        }

        // Add delay between requests to avoid overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (error) {
        console.error(`❌ Error processing category ${category}:`, error);
        
        // Update status to failed
        await supabase
          .from('live_education_cache')
          .update({ 
            refresh_status: 'failed',
            last_refreshed: new Date().toISOString()
          })
          .eq('category', category);

        refreshResults.push({
          category,
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error',
          refreshTime: new Date().toISOString()
        });
      }
    }

    // Clean up expired cache entries
    console.log('🧹 Cleaning up expired cache entries...');
    try {
      await supabase.rpc('cleanup_expired_education_cache');
      console.log('✅ Cache cleanup completed');
    } catch (cleanupError) {
      console.warn('⚠️ Cache cleanup failed:', cleanupError);
    }

    // Summary
    const successCount = refreshResults.filter(r => r.status === 'success').length;
    const failedCount = refreshResults.filter(r => r.status === 'failed').length;
    const totalCourses = refreshResults.reduce((sum, r) => sum + (r.courseCount || 0), 0);

    console.log(`📊 Weekly refresh complete: ${successCount} successful, ${failedCount} failed, ${totalCourses} total courses`);

    return new Response(JSON.stringify({
      success: true,
      message: 'Weekly education cache refresh completed',
      summary: {
        categories_processed: categoriesToRefresh.length,
        successful_refreshes: successCount,
        failed_refreshes: failedCount,
        total_courses: totalCourses,
        refresh_time: new Date().toISOString()
      },
      results: refreshResults
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in weekly education cache refresh:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});