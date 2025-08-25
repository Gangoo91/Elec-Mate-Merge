import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const URL = "https://api.firecrawl.dev/v2/search";

const QUERIES = [
  "electrical safety news UK 2024 2025 site:hse.gov.uk OR site:constructionnews.co.uk",
  "BS7671 wiring regulations updates news UK site:theiet.org OR site:electrical-installation.co.uk",
  "IET electrical engineering news UK updates site:theiet.org OR site:engineeringnews.co.uk",
  "UK electrical infrastructure contracts awarded 2024 site:constructionnews.co.uk OR site:gov.uk",
  "electrical regulations changes UK news site:gov.uk OR site:theiet.org",
  "electrical safety incidents UK news site:hse.gov.uk OR site:constructionnews.co.uk"
];

// ✅ Map long queries to clean tags
const QUERY_TAG_MAP = {
  "electrical safety news UK 2024 2025 site:hse.gov.uk OR site:constructionnews.co.uk": "Safety News",
  "BS7671 wiring regulations updates news UK site:theiet.org OR site:electrical-installation.co.uk": "BS7671",
  "IET electrical engineering news UK updates site:theiet.org OR site:engineeringnews.co.uk": "IET",
  "UK electrical infrastructure contracts awarded 2024 site:constructionnews.co.uk OR site:gov.uk": "Major Projects",
  "electrical regulations changes UK news site:gov.uk OR site:theiet.org": "Regulations",
  "electrical safety incidents UK news site:hse.gov.uk OR site:constructionnews.co.uk": "Safety Incidents"
};

// ✅ Validate date is recent (within last 30 days)
function isDateRecent(dateStr) {
  if (!dateStr) return false;
  
  try {
    const articleDate = new Date(dateStr);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    return articleDate >= thirtyDaysAgo && articleDate <= new Date();
  } catch {
    return false;
  }
}

// ✅ Check content quality
function isQualityContent(article) {
  const title = article.title || "";
  const snippet = article.snippet || "";
  
  // Filter out generic content
  const genericTerms = ['home', 'about us', 'contact', 'privacy policy', 'terms', 'cookies'];
  const isGeneric = genericTerms.some(term => title.toLowerCase().includes(term));
  
  // Must have meaningful content
  const hasContent = title.length > 10 && snippet.length > 20;
  
  // Must be news-like content
  const newsIndicators = ['news', 'update', 'announce', 'report', 'incident', 'regulation', 'standard', 'safety'];
  const isNewsLike = newsIndicators.some(term => 
    title.toLowerCase().includes(term) || snippet.toLowerCase().includes(term)
  );
  
  return !isGeneric && hasContent && isNewsLike;
}

// ✅ Filter for UK-specific content
function isUKRelevant(article) {
  const text = `${article.title || ""} ${article.snippet || ""}`.toLowerCase();
  const ukTerms = ['uk', 'united kingdom', 'britain', 'british', 'england', 'scotland', 'wales', 'northern ireland', 'gov.uk', 'hse.gov.uk', 'theiet.org'];
  const excludeTerms = ['usa', 'us ', 'america', 'canada', 'australia', 'europe', 'eu ', 'international'];
  
  const hasUKTerms = ukTerms.some(term => text.includes(term));
  const hasExcludeTerms = excludeTerms.some(term => text.includes(term));
  const isUKDomain = (article.url || "").includes('.gov.uk') || (article.url || "").includes('.co.uk') || (article.url || "").includes('theiet.org');
  
  return (hasUKTerms || isUKDomain) && !hasExcludeTerms;
}

// ✅ Map API response into desired schema with quality filtering
function normalizeArticles(articles, query) {
  const cleanTag = QUERY_TAG_MAP[query] || query;
  return articles
    .filter(isUKRelevant)
    .filter(isQualityContent)
    .filter(article => isDateRecent(article.date))
    .map((a) => ({
      title: a.title || "",
      url: a.url || "",
      snippet: a.snippet || "",
      date: a.date || new Date().toISOString(), // Fallback to today if no date
      tag: cleanTag
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by newest first
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