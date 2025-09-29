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
    console.log('🔄 Starting weekly guide cache refresh...');

    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);
    
    // Get all expired guide cache entries
    const { data: expiredGuides } = await supabase
      .from('tool_guide_cache')
      .select('guide_type')
      .lt('expires_at', new Date().toISOString());

    if (!expiredGuides || expiredGuides.length === 0) {
      console.log('✅ No expired guides found, cache is up to date');
      return new Response(JSON.stringify({ 
        message: 'No expired guides found', 
        refreshed: 0 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`🔄 Found ${expiredGuides.length} expired guides to refresh`);

    // Refresh each expired guide
    let refreshedCount = 0;
    for (const guide of expiredGuides) {
      try {
        console.log(`🔄 Refreshing guide: ${guide.guide_type}`);
        
        const { error } = await supabase.functions.invoke('generate-tool-guide', {
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

        if (error) {
          console.error(`Failed to refresh guide ${guide.guide_type}:`, error);
        } else {
          refreshedCount++;
          console.log(`✅ Refreshed guide: ${guide.guide_type}`);
        }
        
        // Add a small delay to avoid overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Error refreshing guide ${guide.guide_type}:`, error);
      }
    }

    // Clean up any remaining expired entries
    await supabase
      .from('tool_guide_cache')
      .delete()
      .lt('expires_at', new Date().toISOString());

    console.log(`✅ Weekly cache refresh completed. Refreshed ${refreshedCount}/${expiredGuides.length} guides`);

    return new Response(JSON.stringify({ 
      message: 'Weekly cache refresh completed',
      expired: expiredGuides.length,
      refreshed: refreshedCount
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in weekly cache refresh:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});