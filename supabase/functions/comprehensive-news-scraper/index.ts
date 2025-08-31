import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const URL = "https://api.firecrawl.dev/v2/search";


async function fetchNews(query) {
  console.log(`🔎 Fetching: ${query}`);

  const url = "https://api.firecrawl.dev/v2/search";

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get('FIRECRAWL_API_KEY')}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `${query} electrical UK`,
      sources: ["news"],
      location: "United Kingdom",
      tbs: "qdr:w",
      limit: 50,
      scrapeOptions: {
        onlyMainContent: false,
        maxAge: 0,
        parsers: [],
        formats: [
          {
            type: "json",
            schema: {
              type: "object",
              required: [],
              properties: {
                title: {
                  type: "string",
                },
                snippet: {
                  type: "string",
                },
                imageUrl: {
                  type: "string",
                },
                url: {
                  type: "string",
                },
                date: {
                  type: "string",
                  description: "date in iso format",
                },
              },
            },
          },
        ],
      },
    }),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`❌ API request failed: ${response.status}`);
    }

    const data = await response.json();
    const articles = data?.data?.news || [];

    // ✅ Return only normalized schema
    return articles.map((article) => ({
      title: article.title,
      snippet: article.snippet,
      url: article.url,
      date: article.date,
      dateFormat: article?.json?.date,
      imageUrl: article?.json?.imageUrl,
      tag: query,
    }));
  } catch (error) {
    console.error(`⚠️ Error fetching ${query}:`, error.message);
    return [];
  }
}

async function main() {
  const electricalKeywords = [
    "Health and Safety Executive",
    "BS7671 (IET Wiring Regulations)",
    "Institution of Engineering and Technology",
    "Major Engineering and Infrastructure Projects",
    "UK Government Electrical Regulations and Publications",
  ];

  try {
    const results = await Promise.allSettled(electricalKeywords.map((keyword) => fetchNews(keyword)));
    const articles = results.filter((r) => r.status === "fulfilled").flatMap((r) => r.value);
    return articles;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    console.log('🚀 Starting Firecrawl v2 News Search...');
    
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');

    if (!firecrawlApiKey) {
      console.error('❌ FIRECRAWL_API_KEY not found in environment variables');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Firecrawl API key not configured. Please add FIRECRAWL_API_KEY to Edge Function secrets.'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }
    
    console.log('✅ Firecrawl API key found, proceeding with search...');

    const allArticles = await main();
    const executionTime = Date.now() - startTime;

    console.log(`\n🎉 Scraping complete: ${allArticles.length} articles processed in ${executionTime}ms`);

    return new Response(
      JSON.stringify({
        success: true,
        articles: allArticles,
        count: allArticles.length,
        executionTime,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('❌ Comprehensive scraper error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});