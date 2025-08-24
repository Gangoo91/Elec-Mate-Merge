import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const URL = "https://api.firecrawl.dev/v2/search";

const QUERIES = [
  "HSE updates health and safety executive electrical",
  "BS7671 updates electrical wiring regulations",
  "IET updates institution engineering technology electrical",
  "Major electrical projects UK infrastructure power",
  "BS 7671 Updates",
  "GOV.UK electrical regulations safety"
];

// ✅ Map long queries to clean tags
const QUERY_TAG_MAP = {
  "HSE updates health and safety executive electrical": "HSE",
  "BS7671 updates electrical wiring regulations": "BS7671",
  "IET updates institution engineering technology electrical": "IET",
  "Major electrical projects UK infrastructure power": "Major Projects",
  "BS 7671 Updates": "BS7671",
  "GOV.UK electrical regulations safety": "GOV.UK"
};

// ✅ Map API response into desired schema
function normalizeArticles(articles, query) {
  const cleanTag = QUERY_TAG_MAP[query] || query;
  return articles.map((a) => ({
    title: a.title || "",
    url: a.url || "",
    snippet: a.snippet || "",
    date: a.date || "",
    tag: cleanTag
  }));
}

async function fetchNews(query) {
  console.log(`🔎 Fetching: ${query}`);
  const payload = {
    query,
    sources: ["news"],
    categories: [],
    tbs: "qdr:w", // past week
    limit: 10,
    scrapeOptions: {
      onlyMainContent: true,
      maxAge: 172800000,
      parsers: ["pdf"],
      formats: [],
    },
  };

  try {
    const API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`❌ API request failed: ${response.status}`);
    }

    const data = await response.json();
    const articles = data?.data?.news || [];

    // ✅ Return only normalized schema
    return normalizeArticles(articles, query);
  } catch (error) {
    console.error(`⚠️ Error fetching ${query}:`, error.message);
    return [];
  }
}

async function main() {
  let allArticles = [];

  for (const query of QUERIES) {
    const articles = await fetchNews(query);
    allArticles = allArticles.concat(articles);
  }

  return allArticles;
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