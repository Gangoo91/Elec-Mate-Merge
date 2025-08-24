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

// Firecrawl v2 Search Queries (matches user's Python code)
const SEARCH_QUERIES: SearchQuery[] = [
  {
    name: 'HSE Updates',
    query: 'HSE update (health and safety executive) site:uk',
    category: 'HSE',
    regulatory_body: 'Health and Safety Executive'
  },
  {
    name: 'BS7671 Updates', 
    query: 'BS7671 updates site:uk',
    category: 'BS7671',
    regulatory_body: 'Institution of Engineering and Technology'
  },
  {
    name: 'IET Updates',
    query: 'IET updates site:uk', 
    category: 'IET',
    regulatory_body: 'Institution of Engineering and Technology'
  },
  {
    name: 'Major Projects',
    query: 'Major projects site:uk',
    category: 'Major Projects',
    regulatory_body: 'UK Government'
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

// Firecrawl v2 Search API function (matches user's Python code exactly)
async function searchWithFirecrawlV2(searchQuery: SearchQuery, firecrawlApiKey: string): Promise<ProcessedArticle[]> {
  try {
    console.log(`🔎 Searching for: ${searchQuery.query}`);
    
    // Use exact payload format from user's Python code
    const payload = {
      query: searchQuery.query,
      sources: ["news"],
      categories: [],
      tbs: "qdr:w", // last week (changed from 24 hours for better results)
      limit: 30,
      scrapeOptions: {
        onlyMainContent: true,
        maxAge: 604800000, // 1 week in milliseconds
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
    console.log(`✅ Firecrawl search returned: ${results.data?.length || 0} results for ${searchQuery.name}`);
    
    if (!results.data || !Array.isArray(results.data)) {
      console.log(`No results found for ${searchQuery.name}`);
      return [];
    }

    const articles: ProcessedArticle[] = [];
    
    // Process search results 
    for (let i = 0; i < Math.min(results.data.length, 10); i++) {
      const result = results.data[i];
      
      try {
        const title = result.title || `${searchQuery.category} Update ${i + 1}`;
        const content = result.description || result.content || '';
        const url = result.url || '';
        const publishDate = result.publishedTime ? new Date(result.publishedTime).toISOString() : new Date().toISOString();
        
        // Check electrical relevance
        if (!isElectricallyRelevant(title, content, searchQuery.category)) {
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
    
    console.log(`📄 Extracted ${articles.length} relevant articles for ${searchQuery.name}`);
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
    let totalInserted = 0;
    let totalErrors = 0;
    
    // Check existing articles for duplicate prevention
    console.log('📋 Checking existing articles for duplicate prevention...');
    const existingArticles = await checkExistingArticles(supabase);

    // Process each search query from user's Python code
    console.log('🔍 Processing Firecrawl v2 search queries...');
    
    for (const searchQuery of SEARCH_QUERIES) {
      try {
        console.log(`\n🔎 Processing: ${searchQuery.name}`);
        
        const articles = await searchWithFirecrawlV2(searchQuery, firecrawlApiKey);
        totalProcessed += articles.length;
        
        // Filter duplicates and insert
        let inserted = 0;
        for (const article of articles) {
          // Check for duplicates
          const isDuplicate = existingArticles.has(article.content_hash!) || 
                             existingArticles.has(article.title.toLowerCase().trim());
          
          if (isDuplicate) {
            console.log(`⏭️ Skipping duplicate: ${article.title.substring(0, 50)}...`);
            continue;
          }
          
          try {
            const { error: insertError } = await supabase
              .from('industry_news')
              .insert({
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
                relevance_score: 8,
                content_quality: 7,
                is_active: true,
                content_hash: article.content_hash
              });

            if (insertError) {
              if (insertError.code === '23505') {
                console.log(`⏭️ Duplicate constraint: ${article.title.substring(0, 50)}...`);
              } else {
                console.error('❌ Insert error:', insertError);
                totalErrors++;
              }
            } else {
              inserted++;
              totalInserted++;
              // Add to existing set to prevent duplicates in same batch
              existingArticles.add(article.content_hash!);
              existingArticles.add(article.title.toLowerCase().trim());
            }
          } catch (insertError) {
            console.error('❌ Database error:', insertError);
            totalErrors++;
          }
        }
        
        console.log(`✅ ${searchQuery.name}: ${inserted} articles inserted`);
        
        // Rate limiting between queries
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (queryError) {
        console.error(`❌ Error processing ${searchQuery.name}:`, queryError);
        totalErrors++;
      }
    }

    const executionTime = Date.now() - startTime;
    console.log(`\n🎉 Scraping complete: ${totalProcessed} processed, ${totalInserted} inserted, ${totalErrors} errors in ${executionTime}ms`);

    return new Response(
      JSON.stringify({
        success: true,
        articlesProcessed: totalProcessed,
        articlesInserted: totalInserted,
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