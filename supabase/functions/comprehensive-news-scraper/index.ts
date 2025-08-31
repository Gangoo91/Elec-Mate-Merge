import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const URL = "https://api.firecrawl.dev/v2/search";

const electricalKeywords = [
  "Health and Safety Executive UK electrical",
  "BS7671 IET Wiring Regulations UK",
  "Institution of Engineering and Technology UK",
  "UK electrical infrastructure projects",
  "UK Government electrical regulations HSE",
  "British electrical industry news",
  "UK power distribution projects",
];

const keywordToShortTag = {
  "Health and Safety Executive UK electrical": "HSE",
  "BS7671 IET Wiring Regulations UK": "BS7671",
  "Institution of Engineering and Technology UK": "IET",
  "UK electrical infrastructure projects": "Major Projects",
  "UK Government electrical regulations HSE": "UK Regulations",
  "British electrical industry news": "Industry News",
  "UK power distribution projects": "Power Projects",
};

function isUKRelevant(article) {
  const ukDomains = ['.gov.uk', '.co.uk', '.ac.uk', '.org.uk'];
  const ukKeywords = ['UK', 'United Kingdom', 'Britain', 'British', 'England', 'Scotland', 'Wales', 'Northern Ireland'];
  const excludeKeywords = ['India', 'Indian', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'];
  
  // Check if URL is from UK domain
  const hasUKDomain = ukDomains.some(domain => article.url.includes(domain));
  
  // Check if content mentions UK
  const content = `${article.title} ${article.snippet}`.toLowerCase();
  const hasUKKeywords = ukKeywords.some(keyword => content.includes(keyword.toLowerCase()));
  
  // Check if content mentions excluded locations
  const hasExcludeKeywords = excludeKeywords.some(keyword => content.includes(keyword.toLowerCase()));
  
  return (hasUKDomain || hasUKKeywords) && !hasExcludeKeywords;
}

function normalizeArticles(articles, query) {
  const shortTag = keywordToShortTag[query] || query;
  
  // Filter for UK-relevant articles only
  const ukRelevantArticles = articles.filter(isUKRelevant);
  
  return ukRelevantArticles.map((a) => ({
    title: a.title || "",
    url: a.url || "",
    snippet: a.snippet || "",
    date: a.date || "",
    tag: shortTag,
  }));
}

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
      query: `${query} site:gov.uk OR site:co.uk OR site:ac.uk`,
      sources: ["news"],
      location: "United Kingdom",
      tbs: "qdr:w",
      limit: 30,
      country: "gb",
      lang: "en",
      scrapeOptions: {
        onlyMainContent: true,
        maxAge: 0,
        parsers: [],
        formats: ["markdown"],
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
    return normalizeArticles(articles, query);
  } catch (error) {
    console.error(`⚠️ Error fetching ${query}:`, error.message);
    return [];
  }
}

async function main() {
  try {
    const results = await Promise.allSettled(electricalKeywords.map((keyword) => fetchNews(keyword)));
    const newsArticles = results.filter((r) => r.status === "fulfilled").flatMap((r) => r.value);
    return newsArticles;
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