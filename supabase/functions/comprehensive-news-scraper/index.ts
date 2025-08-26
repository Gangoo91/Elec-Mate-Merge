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

// ✅ Enhanced job site and URL pattern exclusion
function isNotJobSite(article) {
  const url = (article.url || "").toLowerCase();
  const title = (article.title || "").toLowerCase();
  
  // Comprehensive job domains and patterns
  const jobDomains = [
    'findajob.dwp.gov.uk', 'jobs.', 'careers.', 'recruitment.', 'indeed.', 'totaljobs.', 
    'reed.co.uk', 'cv-library.', 'jobsite.', 'fish4jobs.', 'jobcentreplus.',
    'apprenticeships.gov.uk', 'graduatejobs.', 'jobserve.', 'milkround.',
    'jobstoday.', 'charityjob.', 'prospects.ac.uk', 'jobs.ac.uk'
  ];
  
  // URL patterns that indicate job listings
  const jobUrlPatterns = [
    '/jobs/', '/careers/', '/vacancies/', '/opportunities/', '/positions/',
    '/apprenticeship-', '/graduate-', '/trainee-', '/job-', '/vacancy-',
    'job-search', 'career-search', 'apply-now', 'job_id=', 'vacancy_id='
  ];
  
  // Title patterns that indicate job listings
  const jobTitlePatterns = [
    'job:', 'vacancy:', 'position:', 'role:', 'apprentice:', 'trainee:',
    'now hiring', 'we are recruiting', 'job opportunity', 'career opportunity'
  ];
  
  const hasJobDomain = jobDomains.some(domain => url.includes(domain));
  const hasJobUrlPattern = jobUrlPatterns.some(pattern => url.includes(pattern));
  const hasJobTitlePattern = jobTitlePatterns.some(pattern => title.includes(pattern));
  
  return !hasJobDomain && !hasJobUrlPattern && !hasJobTitlePattern;
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

// ✅ Enhanced job content exclusion with weighted scoring
function isNotJobContent(article) {
  const text = `${article.title || ""} ${article.snippet || ""}`.toLowerCase();
  
  // Strong job indicators (immediate exclusion)
  const strongJobTerms = [
    // Direct job application terms
    'apply now', 'send cv', 'submit application', 'apply for this', 'join our team',
    'we are recruiting', 'we are hiring', 'now hiring', 'seeking candidates',
    'job reference', 'ref:', 'vacancy ref', 'position ref',
    
    // Salary specific
    '£/hour', '£/day', '£ per hour', '£ per day', 'k per annum', 'k salary',
    'competitive salary', 'excellent salary', 'attractive salary',
    
    // Employment specifics
    'full time', 'part time', 'permanent role', 'temporary position', 'contract role',
    'immediate start', 'start asap', 'available immediately', 'notice period',
    
    // Application process
    'application deadline', 'closing date', 'interview process', 'selection process',
    'shortlisted candidates', 'successful applicant'
  ];
  
  // Moderate job indicators (multiple needed for exclusion)
  const moderateJobTerms = [
    'experience required', 'skills required', 'qualifications needed', 'must have',
    'essential skills', 'desirable skills', 'key responsibilities', 'main duties',
    'role involves', 'you will be', 'ideal candidate', 'suitable candidate',
    'career opportunity', 'progression opportunity', 'development opportunity'
  ];
  
  // Count indicators
  const strongCount = strongJobTerms.filter(term => text.includes(term)).length;
  const moderateCount = moderateJobTerms.filter(term => text.includes(term)).length;
  
  // Exclude if any strong indicators or multiple moderate indicators
  return strongCount === 0 && moderateCount < 3;
}

// ✅ Enhanced content classification for legitimate industry news
function isIndustryRelevant(article) {
  const text = `${article.title || ""} ${article.snippet || ""}`.toLowerCase();
  const url = (article.url || "").toLowerCase();
  
  // High-priority news sources (always relevant if from these domains)
  const trustedNewsSources = [
    'gov.uk', 'hse.gov.uk', 'theiet.org', 'niceic.com', 'napit.org.uk',
    'bbc.co.uk/news', 'constructionnews.co.uk', 'electricaltimes.co.uk',
    'electrical-installation.org', 'voltimum.co.uk'
  ];
  
  const isTrustedSource = trustedNewsSources.some(domain => url.includes(domain));
  
  // Core electrical industry terms (high relevance)
  const coreElectricalTerms = [
    'electrical', 'electric', 'wiring', 'circuit', 'voltage', 'current', 'power grid',
    'bs7671', 'bs 7671', '18th edition', 'iee regulations', 'electrical installation',
    'rcd', 'mcb', 'rcbo', 'consumer unit', 'electrical safety', 'pat testing',
    'electrical inspection', 'electrical testing', 'earth bonding', 'electrical fault'
  ];
  
  // Engineering & Technology (medium relevance)
  const engineeringTerms = [
    'engineering', 'automation', 'control systems', 'industrial control',
    'smart grid', 'smart meter', 'digital substation', 'scada', 'plc',
    'renewable energy', 'solar pv', 'wind turbine', 'battery storage',
    'ev charging', 'electric vehicle', 'power distribution', 'transmission lines'
  ];
  
  // Health & Safety (high relevance)
  const safetyTerms = [
    'electrical safety', 'health and safety', 'hse', 'safety alert', 'safety notice',
    'electrical accident', 'electrical incident', 'safety regulation', 'compliance',
    'risk assessment', 'method statement', 'ppe', 'safe isolation',
    'electrical hazard', 'safety guidance', 'code of practice'
  ];
  
  // News-specific indicators (boost relevance)
  const newsIndicators = [
    'new regulation', 'regulation update', 'standard update', 'code change',
    'announced', 'published', 'released', 'revised', 'amended', 'introduced',
    'consultation', 'guidance issued', 'alert issued', 'warning issued',
    'industry update', 'technical bulletin', 'safety bulletin'
  ];
  
  // Calculate relevance score
  let relevanceScore = 0;
  
  if (isTrustedSource) relevanceScore += 3;
  if (coreElectricalTerms.some(term => text.includes(term))) relevanceScore += 2;
  if (safetyTerms.some(term => text.includes(term))) relevanceScore += 2;
  if (engineeringTerms.some(term => text.includes(term))) relevanceScore += 1;
  if (newsIndicators.some(term => text.includes(term))) relevanceScore += 1;
  
  // Exclude non-industry content
  const irrelevantTerms = [
    'football', 'rugby', 'cricket', 'tennis', 'sport', 'music', 'celebrity', 'fashion',
    'entertainment', 'film', 'movie', 'tv show', 'restaurant', 'food', 'recipe',
    'travel', 'holiday', 'tourism', 'retail', 'shopping', 'weather forecast',
    'local news', 'community news', 'parish council', 'school news'
  ];
  
  const hasIrrelevantTerms = irrelevantTerms.some(term => text.includes(term));
  
  return relevanceScore >= 2 && !hasIrrelevantTerms;
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