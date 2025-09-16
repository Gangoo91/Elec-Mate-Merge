import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// News sources with URL mapping for Firecrawl v2 batch API
const newsSources = [
  {
    name: 'Electrical Times',
    url: 'https://www.electricaltimes.co.uk/latest-news/',
    category: 'Industry News'
  },
  {
    name: 'Professional Electrician Technical',
    url: 'https://professional-electrician.com/category/technical/',
    category: 'Technical'
  },
  {
    name: 'Electrical Contracting News',
    url: 'https://electricalcontractingnews.com/category/safety-and-training/',
    category: 'Safety & Training'
  },
  {
    name: 'Professional Electrician 18th Edition',
    url: 'https://professional-electrician.com/category/18th-edition/',
    category: '18th Edition'
  },
  {
    name: 'Electrical Times Categories',
    url: 'https://www.electricaltimes.co.uk/cate',
    category: 'General'
  }
];

// Get news using Firecrawl v2 batch API
async function getNews(firecrawlApiKey: string): Promise<any[]> {
  console.log('🚀 Starting Firecrawl v2 batch news scraping...');
  
  const url = "https://api.firecrawl.dev/v2/batch/scrape";
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${firecrawlApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      urls: newsSources.map(source => source.url),
      onlyMainContent: true,
      maxAge: 0,
      parsers: [],
      formats: [
        {
          type: "json",
          prompt: "Extract only articles that are directly related to electricians or the electrical industry. Ignore unrelated articles. For each article, include the title, description, date, and url.",
          schema: {
            type: "array",
            items: {
              type: "object",
              required: ["title", "description", "date", "visit_link"],
              properties: {
                title: { type: "string" },
                description: { type: "string" },
                date: { type: "string", description: "date in iso format" },
                tags: { type: "string" },
                visit_link: { type: "string", description: "link of the article" },
                views: { type: "string" },
              },
            },
          },
        },
      ],
    }),
  };

  console.log('📡 Creating batch scrape job...');
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`Firecrawl API error: ${response.status} ${response.statusText}`);
  }
  
  const job = await response.json();
  console.log("✅ Batch job created:", job.id);

  let status;
  let attempts = 0;
  const maxAttempts = 60; // 5 minutes max wait time

  console.log('⏳ Polling for job completion...');
  do {
    if (attempts >= maxAttempts) {
      throw new Error('Batch job timeout after 5 minutes');
    }
    
    await new Promise((r) => setTimeout(r, 5000)); // Wait 5 seconds
    
    const res = await fetch(job.url, {
      headers: { Authorization: `Bearer ${firecrawlApiKey}` },
    });
    
    if (!res.ok) {
      throw new Error(`Failed to check job status: ${res.status}`);
    }

    status = await res.json();
    console.log(`🔄 Job status: ${status.status} (attempt ${attempts + 1})`);
    attempts++;
  } while (status.status !== "completed" && status.status !== "failed");

  if (status.status === "failed") {
    throw new Error(`Batch job failed: ${status.error || 'Unknown error'}`);
  }

  console.log('🎉 Batch job completed successfully');
  
  // Extract and flatten articles from all sources
  const allArticles = status.data?.map((result, index) => {
    const sourceInfo = newsSources[index];
    const articles = result.json || [];
    
    console.log(`📄 Source ${sourceInfo.name}: ${articles.length} articles found`);
    
    // Add source information to each article
    return articles.map(article => ({
      ...article,
      source_name: sourceInfo.name,
      category: sourceInfo.category,
      source_url: sourceInfo.url
    }));
  }).flat() || [];

  console.log(`📊 Total articles extracted: ${allArticles.length}`);
  return allArticles;
}

// Generate content hash for deduplication
function generateContentHash(title: string, sourceUrl: string): string {
  const content = title + (sourceUrl || '');
  return Array.from(new TextEncoder().encode(content))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .substring(0, 32);
}

// Transform and validate article data
function transformArticle(article: any): any {
  // Parse date - handle various formats
  let datePublished;
  try {
    if (article.date) {
      datePublished = new Date(article.date).toISOString().split('T')[0];
    } else {
      datePublished = new Date().toISOString().split('T')[0];
    }
  } catch {
    datePublished = new Date().toISOString().split('T')[0];
  }

  return {
    title: article.title?.substring(0, 500) || 'Untitled',
    summary: article.description?.substring(0, 1000) || '',
    content: article.description?.substring(0, 5000) || '',
    category: article.category || 'General',
    source_name: article.source_name || 'Unknown Source',
    external_url: article.visit_link || article.url || null,
    date_published: datePublished,
    regulatory_body: 'Industry',
    content_hash: generateContentHash(article.title || '', article.visit_link || ''),
    is_active: true,
    view_count: 0,
    average_rating: 0
  };
}

// Insert articles into database
async function insertArticles(articles: any[], supabase: any): Promise<number> {
  if (!articles.length) {
    console.log('📭 No articles to insert');
    return 0;
  }
  
  console.log(`📝 Processing ${articles.length} articles for insertion...`);
  
  // Check for existing articles to avoid duplicates
  const { data: existingArticles } = await supabase
    .from('industry_news')
    .select('title, content_hash')
    .eq('is_active', true);
  
  const existingHashes = new Set(existingArticles?.map(a => a.content_hash) || []);
  const existingTitles = new Set(existingArticles?.map(a => a.title.toLowerCase()) || []);
  
  // Transform and filter articles
  const validArticles = articles
    .filter(article => article.title && article.description) // Must have title and description
    .map(transformArticle)
    .filter(article => {
      const titleLower = article.title.toLowerCase();
      return !existingHashes.has(article.content_hash) && !existingTitles.has(titleLower);
    });
  
  console.log(`📥 New unique articles to insert: ${validArticles.length}`);
  
  if (validArticles.length === 0) {
    return 0;
  }
  
  // Insert in batches
  const batchSize = 10;
  let insertedCount = 0;
  
  for (let i = 0; i < validArticles.length; i += batchSize) {
    const batch = validArticles.slice(i, i + batchSize);
    const { error } = await supabase
      .from('industry_news')
      .insert(batch);
    
    if (error) {
      console.error(`❌ Error inserting batch ${i + 1}-${Math.min(i + batchSize, validArticles.length)}:`, error);
    } else {
      console.log(`✅ Inserted batch ${i + 1}-${Math.min(i + batchSize, validArticles.length)}`);
      insertedCount += batch.length;
    }
  }
  
  return insertedCount;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    console.log('🔧 Starting Firecrawl v2 news aggregation...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');

    if (!firecrawlApiKey) {
      console.error('❌ FIRECRAWL_API_KEY not found in environment variables');
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Firecrawl API key not configured. Please add your Firecrawl API key in Supabase Edge Function Secrets.',
          articlesInserted: 0 
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get news articles using batch API
    const articles = await getNews(firecrawlApiKey);
    
    // Insert new articles
    const articlesInserted = await insertArticles(articles, supabase);
    
    console.log(`🎉 News aggregation completed: ${articlesInserted} new articles added`);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: `News aggregation completed successfully`,
        articlesInserted,
        totalArticlesProcessed: articles.length,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
    
  } catch (error) {
    console.error('❌ News aggregation failed:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});