import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🔄 Starting weekly cache refresh process...');
    
    // Create Supabase client
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);
    
    // Get guides that need refreshing (either expired or scheduled for refresh)
    const { data: guidesToRefresh, error: fetchError } = await supabase
      .from('tool_guide_cache')
      .select('guide_type, expires_at, refresh_scheduled_for')
      .or(`expires_at.lt.${new Date().toISOString()},refresh_scheduled_for.lt.${new Date().toISOString()}`);
    
    if (fetchError) {
      console.error('Error fetching guides to refresh:', fetchError);
      throw new Error('Failed to fetch guides for refresh');
    }

    if (!guidesToRefresh || guidesToRefresh.length === 0) {
      console.log('✅ No guides need refreshing at this time');
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'No guides needed refreshing',
        refreshedCount: 0,
        timestamp: new Date().toISOString()
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`📋 Found ${guidesToRefresh.length} guides to refresh:`, guidesToRefresh.map(g => g.guide_type));

    // Update refresh status to 'in_progress' for tracking
    await supabase
      .from('tool_guide_cache')
      .update({ refresh_status: 'in_progress' })
      .in('guide_type', guidesToRefresh.map(g => g.guide_type));

    let refreshedCount = 0;
    let errors = [];

    // Refresh each guide with delay to prevent overwhelming the system
    for (const guide of guidesToRefresh) {
      try {
        console.log(`🔄 Refreshing guide: ${guide.guide_type}`);
        
        const { error: refreshError } = await supabase.functions.invoke('generate-tool-guide', {
          body: { 
            guideType: guide.guide_type,
            forceRefresh: true,
            userProfile: {
              experience: 'professional',
              specialization: 'general_electrical',
              business_type: 'mobile_electrician'
            }
          }
        });

        if (refreshError) {
          console.error(`❌ Failed to refresh ${guide.guide_type}:`, refreshError);
          errors.push({ guide: guide.guide_type, error: refreshError.message });
          
          // Mark as failed
          await supabase
            .from('tool_guide_cache')
            .update({ refresh_status: 'failed' })
            .eq('guide_type', guide.guide_type);
        } else {
          console.log(`✅ Successfully refreshed ${guide.guide_type}`);
          refreshedCount++;
        }

        // Add delay between refreshes to avoid rate limits
        if (guidesToRefresh.indexOf(guide) < guidesToRefresh.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }

      } catch (error) {
        console.error(`❌ Error refreshing ${guide.guide_type}:`, error);
        errors.push({ guide: guide.guide_type, error: error.message });
        
        // Mark as failed
        await supabase
          .from('tool_guide_cache')
          .update({ refresh_status: 'failed' })
          .eq('guide_type', guide.guide_type);
      }
    }

    // Clean up old expired entries
    console.log('🧹 Cleaning up old expired cache entries...');
    await supabase.rpc('cleanup_expired_tool_cache');

    const result = {
      success: true,
      message: `Weekly cache refresh completed`,
      refreshedCount,
      totalGuides: guidesToRefresh.length,
      errors: errors.length > 0 ? errors : undefined,
      timestamp: new Date().toISOString()
    };

    console.log('📊 Weekly refresh summary:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Weekly cache refresh failed:', error);
    
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});