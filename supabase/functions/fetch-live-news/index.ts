import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LiveNewsResult {
  title: string;
  snippet: string;
  url: string;
  source?: string;
  date?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    
    if (!firecrawlApiKey) {
      throw new Error('FIRECRAWL_API_KEY not configured');
    }

    console.log('Fetching live electrical industry news...');

    // Search queries for electrical industry news
    const searchQueries = [
      "HSE electrical safety alerts UK",
      "BS7671 wiring regulations updates",
      "IET electrical engineering news",
      "UK electrical industry news"
    ];

    const allResults: LiveNewsResult[] = [];

    // Process searches in batches
    for (const query of searchQueries) {
      try {
        console.log(`Searching for: ${query}`);
        
        const response = await fetch('https://api.firecrawl.dev/v1/search', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${firecrawlApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            sources: ["news"], // Using the successful format
            limit: 5
          })
        });

        if (!response.ok) {
          console.error(`Search failed for query "${query}":`, response.status, response.statusText);
          continue;
        }

        const searchData = await response.json();
        console.log(`Search response for "${query}":`, searchData);

        if (searchData.data?.news && Array.isArray(searchData.data.news)) {
          searchData.data.news.forEach((item: any) => {
            if (item.title && item.snippet && item.url) {
              allResults.push({
                title: item.title.trim(),
                snippet: item.snippet.trim(),
                url: item.url,
                source: item.source || 'Industry News',
                date: item.date || new Date().toISOString()
              });
            }
          });
          console.log(`Found ${searchData.data.news.length} results for "${query}"`);
        } else {
          console.log(`No news results found for "${query}"`);
        }
      } catch (searchError) {
        console.error(`Error searching for "${query}":`, searchError);
      }
    }

    // Remove duplicates based on URL
    const uniqueResults = allResults.filter((result, index, self) =>
      index === self.findIndex(r => r.url === result.url)
    );

    console.log(`Total unique results found: ${uniqueResults.length}`);

    return new Response(
      JSON.stringify({
        success: true,
        data: uniqueResults.slice(0, 20), // Limit to 20 most recent
        count: uniqueResults.length,
        message: `Found ${uniqueResults.length} live news articles`
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in fetch-live-news function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        data: []
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});