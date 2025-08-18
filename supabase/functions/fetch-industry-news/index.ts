
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
  source: string;
  regulatory_body?: string;
  source_url: string;
  external_id: string;
  date_published: string;
  category: string;
  tags: string[];
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
      source: source,
      regulatory_body: regulatoryBody,
      source_url: url,
      external_id: `${source.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date_published: new Date().toISOString(),
      category: category,
      tags: tags
    });

    return articles;
    
  } catch (error) {
    console.error(`Error scraping ${url} with Firecrawl:`, error);
    return [];
  }
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
        const articles = await scrapeWithFirecrawl(sourceData.url, sourceData.source);
        
        // Insert articles with upsert to handle duplicates
        for (const article of articles) {
          try {
            const { error } = await supabase
              .from('industry_news')
              .upsert(article, { 
                onConflict: 'external_id',
                ignoreDuplicates: false 
              });

            if (error) {
              console.error(`Error inserting article:`, error);
              totalErrors++;
            } else {
              totalInserted++;
            }
          } catch (insertError) {
            console.error(`Error inserting article:`, insertError);
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
