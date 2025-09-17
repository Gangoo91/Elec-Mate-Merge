import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('⚠️ This function is deprecated. Use firecrawl-education-scraper instead.');
    
    // Return a response directing to the new function
    return new Response(JSON.stringify({
      success: false,
      error: 'This function has been replaced by firecrawl-education-scraper',
      redirect: 'Use firecrawl-education-scraper for live education data',
      timestamp: new Date().toISOString()
    }), {
      status: 410, // Gone
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ Error in deprecated live education aggregator:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Function deprecated',
      timestamp: new Date().toISOString()
    }), {
      status: 410,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});