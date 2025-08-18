
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface FirecrawlResponse {
  success: boolean;
  data?: {
    markdown: string;
    metadata: {
      title: string;
      description?: string;
      publishDate?: string;
    };
  };
  error?: string;
}

interface NewsArticle {
  title: string;
  summary: string;
  content: string;
  regulatory_body: string;
  source_url: string;
  external_id: string;
  date_published: string;
  category: string;
  external_url?: string;
}

async function scrapeWithFirecrawl(url: string, source: string): Promise<NewsArticle[]> {
  console.log(`Starting scrape for: ${url}`);
  
  const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
  if (!firecrawlApiKey) {
    console.error('FIRECRAWL_API_KEY not found');
    return [];
  }

  try {
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        formats: ['markdown'],
        onlyMainContent: true,
        includeTags: ['title', 'meta', 'article', 'h1', 'h2', 'h3', 'p'],
        waitFor: 3000
      }),
    });

    if (!response.ok) {
      throw new Error(`Firecrawl API error: ${response.status} ${response.statusText}`);
    }

    const result: FirecrawlResponse = await response.json();
    
    if (!result.success || !result.data) {
      console.error(`Firecrawl scraping failed for ${url}:`, result.error);
      return [];
    }

    console.log(`Successfully scraped content from ${url}`);
    
    // Extract content and create articles based on source
    const articles: NewsArticle[] = [];
    const content = result.data.markdown;
    const title = result.data.metadata.title || 'No Title';
    
    // Create a unique external ID based on URL and content hash
    const contentHash = await hashString(title + content.substring(0, 100));
    const external_id = `${source.toLowerCase().replace(/\s+/g, '_')}_${contentHash}`;
    
    // Create summary from content
    const summary = content.length > 500 
      ? content.substring(0, 500) + '...' 
      : content;

    // Enhanced processing for electrical industry content
    let category = 'general';
    let regulatoryBody = source;
    let tags: string[] = [];

    if (source === 'HSE') {
      category = content.toLowerCase().includes('electrical') ? 'electrical' : 'safety';
      regulatoryBody = 'HSE';
      tags = content.toLowerCase().includes('electrical') ? ['Electrical Safety', 'HSE'] : ['Safety', 'HSE'];
    } else if (source === 'BS7671') {
      category = 'regulations';
      regulatoryBody = 'BEIS';
      tags = ['BS 7671', 'Wiring Regulations', 'Government'];
    } else if (source === 'IET') {
      category = content.toLowerCase().includes('bs 7671') || content.toLowerCase().includes('wiring') ? 'regulations' : 'technical';
      regulatoryBody = 'IET';
      tags = content.toLowerCase().includes('bs 7671') ? ['BS 7671', 'IET', 'Wiring Regulations'] : ['IET', 'Technical'];
    } else if (source.includes('Major Projects')) {
      category = 'Major Projects';
      regulatoryBody = 'Industry';
      tags = ['Major Projects', 'Contracts', 'Industry'];
    }

    // Create electrical industry-focused summary
    const electricalKeywords = ['electrical', 'bs 7671', 'wiring', 'installation', 'electrical safety', 'regulations', 'compliance'];
    const isElectricalContent = electricalKeywords.some(keyword => 
      content.toLowerCase().includes(keyword) || title.toLowerCase().includes(keyword)
    );

    let enhancedSummary = summary;
    if (isElectricalContent) {
      const electricalContext = extractElectricalContext(content);
      enhancedSummary = electricalContext || summary;
    }

    articles.push({
      title: title.trim(),
      summary: enhancedSummary,
      content: content,
      regulatory_body: regulatoryBody,
      source_url: url,
      external_id: external_id,
      date_published: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD for date column
      category: category,
      external_url: url
    });

    return articles;
    
  } catch (error) {
    console.error(`Error scraping ${url} with Firecrawl:`, error);
    return [];
  }
}

// Simple hash function for creating consistent IDs
async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 8);
}

function extractElectricalContext(content: string): string {
  // Extract electrician-relevant information from content
  const sentences = content.split('.').filter(s => s.trim());
  const relevantSentences = sentences.filter(sentence => {
    const lower = sentence.toLowerCase();
    return lower.includes('electrical') || 
           lower.includes('bs 7671') || 
           lower.includes('wiring') || 
           lower.includes('installation') || 
           lower.includes('safety') || 
           lower.includes('regulation') ||
           lower.includes('compliance') ||
           lower.includes('contract') ||
           lower.includes('project');
  });

  if (relevantSentences.length > 0) {
    const summary = relevantSentences.slice(0, 3).join('. ').trim();
    return summary.length > 500 ? summary.substring(0, 500) + '...' : summary + '.';
  }

  return content.substring(0, 500) + '...';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log("Starting industry news fetch with Firecrawl...");
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Enhanced sources using Firecrawl for better content extraction
    const sources = [
      { url: 'https://www.hse.gov.uk/news/', source: 'HSE' },
      { url: 'https://www.gov.uk/government/collections/bs-7671', source: 'BS7671' },
      { url: 'https://www.theiet.org/news/', source: 'IET' },
      { url: 'https://www.constructionenquirer.com/category/contracts-awarded/', source: 'Major Projects Just Awarded' },
      { url: 'https://www.theconstructionindex.co.uk/news/contracts', source: 'Major Projects Just Awarded' }
    ];

    let totalInserted = 0;
    let totalErrors = 0;

    // Process each source with Firecrawl
    for (const sourceData of sources) {
      try {
        console.log(`Processing source: ${sourceData.source} - ${sourceData.url}`);
        
        // Check if we already have recent content from this source (within last hour)
        const { data: recentArticles } = await supabase
          .from('industry_news')
          .select('external_id')
          .eq('regulatory_body', sourceData.source.includes('Major Projects') ? 'Industry' : sourceData.source)
          .gte('created_at', new Date(Date.now() - 60 * 60 * 1000).toISOString());

        console.log(`Found ${recentArticles?.length || 0} recent articles from ${sourceData.source}`);
        
        const articles = await scrapeWithFirecrawl(sourceData.url, sourceData.source);
        
        // Insert articles with better duplicate handling
        for (const article of articles) {
          try {
            // First check if this exact external_id exists
            const { data: existingArticle } = await supabase
              .from('industry_news')
              .select('id')
              .eq('external_id', article.external_id)
              .single();

            if (existingArticle) {
              console.log(`Article already exists with external_id: ${article.external_id}`);
              continue;
            }

            // Insert new article
            const { error } = await supabase
              .from('industry_news')
              .insert(article);

            if (error) {
              console.error(`Error inserting article:`, error);
              totalErrors++;
            } else {
              console.log(`Successfully inserted article: ${article.title.substring(0, 50)}...`);
              totalInserted++;
            }
          } catch (insertError) {
            console.error(`Error processing article insertion:`, insertError);
            totalErrors++;
          }
        }
        
      } catch (sourceError) {
        console.error(`Error processing source ${sourceData.source}:`, sourceError);
        totalErrors++;
      }
    }

    console.log(`Fetch completed: ${totalInserted} articles inserted, ${totalErrors} errors`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        inserted: totalInserted, 
        errors: totalErrors 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )

  } catch (error) {
    console.error('Industry news fetch error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
