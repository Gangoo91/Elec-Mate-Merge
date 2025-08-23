import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { corsHeaders } from "../_shared/cors.ts";

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { keywords = "electrical course", location = "United Kingdom" } = await req.json();
    
    console.log(`Starting live course aggregation for: ${keywords} in ${location}`);
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Live course fetching is disabled
    console.log('Live course fetching is disabled - returning empty course data');
    
    const sourceResults = [
      {
        source: 'Live Fetching',
        courseCount: 0,
        success: false,
        error: 'Live course fetching has been disabled',
        lastUpdated: new Date().toISOString()
      }
    ];
    
    const uniqueCourses = [];

    const summary = {
      totalCourses: 0,
      originalCourses: 0,
      duplicatesRemoved: 0,
      sourceBreakdown: sourceResults,
      searchCriteria: { keywords, location },
      liveCourses: 0,
      lastUpdated: new Date().toISOString(),
      message: 'Live course fetching has been disabled'
    };

    console.log(`📊 Aggregation complete: ${uniqueCourses.length} unique courses from ${sourceResults.filter(s => s.success).length} sources`);

    return new Response(JSON.stringify({
      courses: uniqueCourses,
      total: uniqueCourses.length,
      summary,
      sourceResults,
      isLiveData: false
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in live course aggregator:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      courses: [],
      total: 0,
      summary: null,
      sourceResults: [],
      isLiveData: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
