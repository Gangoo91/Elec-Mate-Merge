import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import FirecrawlApp from 'https://esm.sh/@mendable/firecrawl-js@1.29.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { apiKey } = await req.json();
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'API key required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Test connection with a simple scrape
    const firecrawl = new FirecrawlApp({ apiKey });
    
    console.log('Testing Firecrawl connection...');
    
    const testResult = await firecrawl.scrapeUrl('https://example.com', {
      formats: ['markdown'],
      includeTags: ['h1', 'p'],
      timeout: 5000
    });

    const isValid = testResult.success && testResult.data;

    return new Response(
      JSON.stringify({
        success: isValid,
        message: isValid ? 'Connection successful' : 'Connection failed',
        details: isValid ? 'API key is valid and working' : 'Invalid API key or service unavailable'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Connection test error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Connection test failed',
        details: 'Please check your API key and try again'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});