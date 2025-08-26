import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const URL = "https://api.firecrawl.dev/v2/search";

const QUERIES = [
  "HSE health safety executive electrical UK updates site:hse.gov.uk OR site:gov.uk",
  "BS7671 electrical wiring regulations UK updates site:theiet.org OR site:gov.uk",
  "IET institution engineering technology UK electrical updates site:theiet.org",
  "UK electrical infrastructure projects contracts site:gov.uk OR site:constructionnews.co.uk",
  "BS 7671 Updates UK electrical regulations site:theiet.org OR site:gov.uk",
  "GOV.UK electrical safety regulations updates UK site:gov.uk"
];

// ✅ Map long queries to clean tags
const QUERY_TAG_MAP = {
  "HSE health safety executive electrical UK updates site:hse.gov.uk OR site:gov.uk": "HSE",
  "BS7671 electrical wiring regulations UK updates site:theiet.org OR site:gov.uk": "BS7671",
  "IET institution engineering technology UK electrical updates site:theiet.org": "IET",
  "UK electrical infrastructure projects contracts site:gov.uk OR site:constructionnews.co.uk": "Major Projects",
  "BS 7671 Updates UK electrical regulations site:theiet.org OR site:gov.uk": "BS7671",
  "GOV.UK electrical safety regulations updates UK site:gov.uk": "GOV.UK"
};

// ✅ Filter out job sites and job-related URLs
function isNotJobSite(article) {
  const url = (article.url || "").toLowerCase();
  const jobDomains = [
    'findajob.dwp.gov.uk', 'jobs.', 'careers.', 'recruitment.', 'indeed.', 'totaljobs.', 
    'reed.co.uk', 'cv-library.', 'jobsite.', 'fish4jobs.', 'jobcentreplus.',
    'apprenticeships.gov.uk', 'apprenticeship-', '/jobs/', '/careers/', '/vacancies/'
  ];
  
  return !jobDomains.some(domain => url.includes(domain));
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

// ✅ Filter out job-related content
function isNotJobContent(article) {
  const text = `${article.title || ""} ${article.snippet || ""}`.toLowerCase();
  
  const jobTerms = [
    // Salary and compensation
    '£', 'salary', 'per annum', 'hourly rate', 'daily rate', 'competitive salary',
    'benefits package', 'pension', 'bonus', 'overtime',
    
    // Recruitment language
    'apply', 'cv', 'resume', 'interview', 'position available', 'vacancy',
    'hiring', 'recruit', 'candidate', 'applicant', 'job description',
    'we are looking for', 'seeking', 'required:', 'essential:', 'desirable:',
    
    // Employment types
    'full-time', 'part-time', 'permanent', 'temporary', 'contract', 'freelance',
    'immediate start', 'asap', 'start date', 'notice period',
    
    // Job-specific terms
    'job opportunity', 'career opportunity', 'join our team', 'work with us',
    'application deadline', 'closing date', 'ref:', 'reference:'
  ];
  
  return !jobTerms.some(term => text.includes(term));
}

// ✅ Filter for NEWS-focused electrical, engineering, tech, and safety content
function isIndustryRelevant(article) {
  const text = `${article.title || ""} ${article.snippet || ""}`.toLowerCase();
  
  const newsKeywords = [
    // Core electrical terms - NEWS focused
    'electrical', 'electric', 'wiring', 'circuit', 'voltage', 'current', 'power',
    'bs7671', 'bs 7671', 'iee regulations', 'installation', 'testing', 'inspection',
    'rcd', 'mcb', 'consumer unit', 'electrical safety',
    
    // Engineering & Technology - NEWS focused
    'engineering', 'technology', 'automation', 'control systems',
    'smart grid', 'smart home', 'digital', 'iot', 'industrial', 'manufacturing',
    'renewable energy', 'solar', 'wind', 'battery', 'energy storage', 'ev charging',
    'electric vehicle', 'grid', 'distribution', 'transmission', 'substation',
    
    // Health & Safety - NEWS focused
    'safety', 'health', 'hse', 'accident', 'incident', 'risk assessment', 'hazard',
    'protection', 'ppe', 'compliance', 'regulation', 'standard',
    'code of practice', 'guidance', 'alert', 'injury', 'fatality',
    
    // Professional & Standards - NEWS focused (removed job terms)
    'iet', 'institution', 'niceic', 'napit', 'elecsa', 'stroma',
    'certification', 'cpr',
    
    // Infrastructure & Construction - NEWS focused
    'construction', 'building', 'infrastructure', 'project', 'contract', 'tender',
    'framework', 'procurement', 'utilities', 'maintenance',
    
    // News-specific terms
    'update', 'announcement', 'new regulation', 'changes to', 'introduced',
    'published', 'released', 'revised', 'amended', 'consultation'
  ];
  
  const irrelevantTerms = [
    'football', 'rugby', 'cricket', 'tennis', 'sport', 'music', 'celebrity', 'fashion',
    'entertainment', 'film', 'movie', 'tv show', 'restaurant', 'food', 'recipe',
    'travel', 'holiday', 'tourism', 'retail', 'shopping', 'weather forecast',
    'traffic', 'parking', 'pub', 'bar', 'nightclub'
  ];
  
  const hasNewsTerms = newsKeywords.some(term => text.includes(term));
  const hasIrrelevantTerms = irrelevantTerms.some(term => text.includes(term));
  
  return hasNewsTerms && !hasIrrelevantTerms;
}

// ✅ Map API response into desired schema with multi-stage filtering
function normalizeArticles(articles, query) {
  const cleanTag = QUERY_TAG_MAP[query] || query;
  return articles
    .filter(article => 
      isNotJobSite(article) && 
      isNotJobContent(article) && 
      isUKRelevant(article) && 
      isIndustryRelevant(article)
    )
    .map((a) => ({
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