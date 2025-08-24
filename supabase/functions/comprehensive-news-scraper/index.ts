import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enhanced content quality filtering for regulatory content
function isQualityContent(title: string, content: string): boolean {
  const lowQualityIndicators = [
    'page not found', '404', 'error', 'access denied', 'not available',
    'coming soon', 'under construction', 'maintenance', 'temporarily unavailable',
    'javascript required', 'enable javascript', 'browser not supported'
  ];
  
  const titleLower = title.toLowerCase();
  const contentLower = content.toLowerCase();
  
  // Check for low-quality indicators
  if (lowQualityIndicators.some(indicator => 
    titleLower.includes(indicator) || contentLower.includes(indicator)
  )) {
    return false;
  }
  
  // Minimum content requirements
  if (title.trim().length < 5 || content.trim().length < 30) {
    return false;
  }
  
  // Allow regulatory content even if short
  const regulatoryKeywords = [
    'safety alert', 'enforcement notice', 'amendment', 'regulation', 'bs7671',
    'electrical safety', 'hazard', 'warning', 'recall', 'guidance', 'hse', 'iet'
  ];
  
  if (regulatoryKeywords.some(keyword => 
    titleLower.includes(keyword) || contentLower.includes(keyword)
  )) {
    return true;
  }
  
  return content.trim().length >= 100; // Basic content length requirement
}

// Generate stable external ID for articles  
function generateExternalId(title: string, category: string, url: string): string {
  const cleanTitle = title.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 40);
  const timestamp = Date.now();
  return `${category.toLowerCase()}_${cleanTitle}_${timestamp}`;
}

// Generate content hash for duplicate detection using crypto API
async function generateContentHash(title: string, content: string): Promise<string> {
  const combinedContent = title.trim() + '|' + content.trim().substring(0, 1000);
  const encoder = new TextEncoder();
  const data = encoder.encode(combinedContent);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Check for existing articles to prevent duplicates
async function checkExistingArticles(supabase: any): Promise<Set<string>> {
  try {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    const { data, error } = await supabase
      .from('industry_news')
      .select('content_hash, title')
      .gte('created_at', threeDaysAgo.toISOString());
    
    if (error) {
      console.error('Error fetching existing articles:', error);
      return new Set();
    }
    
    const existingHashes = new Set<string>();
    data?.forEach(article => {
      if (article.content_hash) existingHashes.add(article.content_hash);
      if (article.title) existingHashes.add(article.title.toLowerCase().trim());
    });
    
    console.log(`Found ${existingHashes.size} existing article identifiers for duplicate checking`);
    return existingHashes;
  } catch (error) {
    console.error('Error checking existing articles:', error);
    return new Set();
  }
}

interface ProcessedArticle {
  title: string;
  summary: string;
  content: string;
  regulatory_body: string;
  category: string;
  external_id: string;
  source_url: string;
  external_url?: string;
  date_published: string;
  content_hash?: string;
}

interface SearchQuery {
  name: string;
  query: string;
  category: string;
  regulatory_body: string;
}

// Schema validation function
function validateArticleSchema(result: any): boolean {
  return result && 
         result.title && result.title.trim() !== "" &&
         result.url && result.url.trim() !== "" &&
         result.source && result.source.trim() !== "";
}

// Normalize result structure with metadata
function normalizeQueryResult(query: string, results: any[]): any {
  const filteredResults = results.filter(validateArticleSchema);
  return {
    query,
    fetched_at: new Date().toISOString(),
    results: filteredResults,
    validation_stats: {
      total_found: results.length,
      schema_valid: filteredResults.length,
      filtered_out: results.length - filteredResults.length
    }
  };
}

// Updated search queries matching bash script exactly  
const SEARCH_QUERIES: SearchQuery[] = [
  {
    name: 'HSE',
    query: 'HSE',
    category: 'HSE',
    regulatory_body: 'Health and Safety Executive'
  },
  {
    name: 'BS7671',
    query: 'BS7671',
    category: 'BS7671', 
    regulatory_body: 'Institution of Engineering and Technology'
  },
  {
    name: 'TET',
    query: 'TET',
    category: 'TET',
    regulatory_body: 'Electrical Testing'
  },
  {
    name: 'Major Projects',
    query: 'Major Projects',
    category: 'Major Projects',
    regulatory_body: 'UK Government'
  },
  {
    name: 'BS 7671 Updates',
    query: 'BS 7671 Updates',
    category: 'BS7671',
    regulatory_body: 'Institution of Engineering and Technology'
  }
];

// Enhanced electrical relevance check
function isElectricallyRelevant(title: string, content: string, category: string): boolean {
  const electricalKeywords = [
    'electrical', 'electricity', 'electrician', 'bs7671', 'wiring', 'circuit',
    'installation', 'testing', 'inspection', 'cable', 'power', 'voltage',
    'safety', 'regulation', 'compliance', 'hse', 'iet', 'engineering',
    'construction', 'infrastructure', 'energy', 'grid', 'distribution'
  ];
  
  const textToCheck = `${title} ${content}`.toLowerCase();
  
  // Be more permissive for official sources
  if (category === 'HSE' || category === 'BS7671' || category === 'IET') {
    return electricalKeywords.some(keyword => textToCheck.includes(keyword)) ||
           textToCheck.includes('safety') || textToCheck.includes('regulation');
  }
  
  // Stricter for general major projects
  return electricalKeywords.some(keyword => textToCheck.includes(keyword));
}

// Enhanced Firecrawl v2 Search API function matching bash script approach
async function searchWithFirecrawlV2(searchQuery: SearchQuery, firecrawlApiKey: string): Promise<ProcessedArticle[]> {
  try {
    console.log(`🔎 Fetching: ${searchQuery.query}`);
    
    // Exact payload matching bash script
    const payload = {
      query: searchQuery.query,
      sources: ["news"],
      categories: [],
      tbs: "qdr:w", // last week
      limit: 10,
      scrapeOptions: {
        onlyMainContent: true,
        maxAge: 172800000, // 48 hours in milliseconds
        parsers: ["pdf"],
        formats: []
      }
    };

    const response = await fetch('https://api.firecrawl.dev/v2/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    console.log(`📡 API Response status: ${response.status} for ${searchQuery.name}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Firecrawl search failed for ${searchQuery.name}: ${response.status} ${response.statusText}`, errorText);
      return [];
    }

    const results = await response.json();
    console.log(`📊 Raw API response for ${searchQuery.name}:`, JSON.stringify(results, null, 2));
    
    if (!results.data || !Array.isArray(results.data)) {
      console.log(`No results found for ${searchQuery.name}`);
      console.log(`✅ Firecrawl search returned: 0 results for ${searchQuery.name}`);
      return [];
    }

    // Apply schema validation
    const validResults = results.data.filter(validateArticleSchema);
    console.log(`✅ Firecrawl search returned: ${validResults.length} results for ${searchQuery.name}`);
    console.log(`📊 Schema validation: ${results.data.length} total, ${validResults.length} valid, ${results.data.length - validResults.length} filtered out`);

    const articles: ProcessedArticle[] = [];
    
    // Process validated results  
    for (let i = 0; i < Math.min(validResults.length, 10); i++) {
      const result = validResults[i];
      
      try {
        const title = result.title.trim();
        const content = result.description || result.content || '';
        const url = result.url.trim();
        const publishDate = result.publishedTime ? new Date(result.publishedTime).toISOString() : new Date().toISOString();
        
        // Enhanced electrical relevance check for TET category
        if (searchQuery.category === 'TET') {
          const tetKeywords = ['testing', 'test', 'inspection', 'certificate', 'calibration', 'measurement', 'pat', 'eicr'];
          const textToCheck = `${title} ${content}`.toLowerCase();
          if (!tetKeywords.some(keyword => textToCheck.includes(keyword))) {
            console.log(`⏭️ Skipping non-TET relevant: ${title.substring(0, 50)}...`);
            continue;
          }
        } else if (!isElectricallyRelevant(title, content, searchQuery.category)) {
          console.log(`⏭️ Skipping non-electrical: ${title.substring(0, 50)}...`);
          continue;
        }
        
        if (!isQualityContent(title, content)) {
          console.log(`⏭️ Skipping low quality: ${title.substring(0, 50)}...`);
          continue;
        }
        
        const articleContent = `**${title}**

${content}

**Source:** ${searchQuery.regulatory_body}
**Category:** ${searchQuery.category}  
**Published:** ${new Date(publishDate).toLocaleDateString()}
**URL:** ${url}`;
        
        const contentHash = await generateContentHash(title, content);
        
        articles.push({
          title: title.substring(0, 150),
          summary: content.substring(0, 200) + (content.length > 200 ? '...' : ''),
          content: articleContent,
          regulatory_body: searchQuery.regulatory_body,
          category: searchQuery.category,
          external_id: generateExternalId(title, searchQuery.category, url),
          source_url: url,
          external_url: url,
          date_published: publishDate,
          content_hash: contentHash
        });
        
      } catch (resultError) {
        console.warn(`⚠️ Error processing result ${i}:`, resultError);
      }
    }
    
    console.log(`✅ ${searchQuery.name}: ${articles.length} articles processed`);
    return articles;
    
  } catch (error) {
    console.error(`❌ Search error for ${searchQuery.name}:`, error);
    return [];
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
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration');
    }

    if (!firecrawlApiKey) {
      console.error('❌ FIRECRAWL_API_KEY not found in environment variables');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Firecrawl API key not configured. Please add FIRECRAWL_API_KEY to Edge Function secrets.',
          articlesInserted: 0,
          errors: 1
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }
    
    console.log('✅ Firecrawl API key found, proceeding with search...');

    const supabase = createClient(supabaseUrl, supabaseKey);

    let totalProcessed = 0;
    let allNormalizedResults = [];
    let totalErrors = 0;

    // Process each search query for live results  
    console.log('🔍 Processing Firecrawl v2 search queries for live results...');
    
    for (const searchQuery of SEARCH_QUERIES) {
      try {
        console.log(`\n🔎 Processing: ${searchQuery.name}`);
        
        const articles = await searchWithFirecrawlV2(searchQuery, firecrawlApiKey);
        totalProcessed += articles.length;
        
        // Transform articles with normalized structure
        const normalizedArticles = articles.map(article => ({
          id: `live-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: article.title,
          summary: article.summary,
          content: article.content,
          category: article.category,
          regulatory_body: article.regulatory_body,
          external_id: article.external_id,
          source_url: article.source_url,
          external_url: article.external_url,
          date_published: article.date_published,
          source_name: article.regulatory_body,
          view_count: 0,
          average_rating: 0,
          is_active: true,
          content_hash: article.content_hash
        }));

        // Create normalized result matching bash script structure
        const normalizedResult = normalizeQueryResult(searchQuery.query, normalizedArticles);
        allNormalizedResults.push(normalizedResult);
        
        // Rate limiting between queries
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (queryError) {
        console.error(`❌ Error processing ${searchQuery.name}:`, queryError);
        totalErrors++;
        
        // Add empty normalized result for failed queries
        allNormalizedResults.push(normalizeQueryResult(searchQuery.query, []));
      }
    }

    const executionTime = Date.now() - startTime;
    
    // Flatten all articles from normalized results
    const allArticles = allNormalizedResults.flatMap(result => result.results);
    console.log(`\n🎉 Scraping complete: ${totalProcessed} processed, ${allArticles.length} articles ready, ${totalErrors} errors in ${executionTime}ms`);
    console.log(`✅ All validated & normalized results processed`);

    return new Response(
      JSON.stringify({
        success: true,
        articlesProcessed: totalProcessed,
        articlesReturned: allArticles.length,
        articles: allArticles,
        normalizedResults: allNormalizedResults,
        validationSummary: {
          totalQueries: SEARCH_QUERIES.length,
          successfulQueries: SEARCH_QUERIES.length - totalErrors,
          failedQueries: totalErrors
        },
        errors: totalErrors,
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