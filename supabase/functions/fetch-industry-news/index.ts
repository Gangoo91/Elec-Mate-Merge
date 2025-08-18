
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface NewsArticle {
  title: string;
  summary: string;
  content: string;
  regulatory_body: string;
  category: string;
  source_url: string;
  external_url: string;
  external_id: string;
  date_published: string;
}

// Firecrawl API integration - using scrape instead of crawl for better results
async function scrapeWebsite(url: string): Promise<any[]> {
  const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
  if (!firecrawlApiKey) {
    throw new Error('FIRECRAWL_API_KEY not found');
  }

  console.log(`Starting scrape for: ${url}`);
  
  try {
    const scrapeResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        formats: ['markdown'],
        onlyMainContent: true,
        includeTags: ['title', 'meta', 'article', 'p', 'h1', 'h2', 'h3'],
        excludeTags: ['nav', 'footer', 'aside', 'script', 'style']
      })
    });

    if (!scrapeResponse.ok) {
      const errorText = await scrapeResponse.text();
      console.error(`Firecrawl API error: ${scrapeResponse.status} - ${errorText}`);
      throw new Error(`Firecrawl API error: ${scrapeResponse.status}`);
    }

    const scrapeData = await scrapeResponse.json();
    
    if (scrapeData.success && scrapeData.data) {
      console.log(`Successfully scraped content from ${url}`);
      return [scrapeData.data]; // Return as array for consistency
    } else {
      console.error('Scrape failed:', scrapeData);
      return [];
    }
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return [];
  }
}

// AI summarization using OpenAI
async function summarizeForElectricians(content: string, title: string): Promise<string> {
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openAIApiKey) {
    console.warn('OpenAI API key not found, using original content');
    return content.substring(0, 300) + '...';
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert electrical industry analyst. Summarize news articles in exactly 2 sentences for electricians in the UK, focusing on practical implications, regulatory changes, safety updates, or project opportunities. Be concise but informative.'
          },
          {
            role: 'user',
            content: `Title: ${title}\n\nContent: ${content.substring(0, 2000)}`
          }
        ],
        max_tokens: 150,
        temperature: 0.3
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.choices[0]?.message?.content || content.substring(0, 300) + '...';
    } else {
      console.error('OpenAI API error:', response.status);
      return content.substring(0, 300) + '...';
    }
  } catch (error) {
    console.error('Error summarizing content:', error);
    return content.substring(0, 300) + '...';
  }
}

// Process scraped data into news articles
async function processScrapedData(data: any, sourceUrl: string): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = [];
  
  // Determine category and regulatory body from source URL
  let category = 'General';
  let regulatory_body = 'Unknown';
  
  if (sourceUrl.includes('hse.gov.uk')) {
    category = 'HSE';
    regulatory_body = 'HSE';
  } else if (sourceUrl.includes('bs-7671') || sourceUrl.includes('gov.uk')) {
    category = 'BS7671';
    regulatory_body = 'BEIS';
  } else if (sourceUrl.includes('theiet.org')) {
    category = 'IET';
    regulatory_body = 'IET';
  } else if (sourceUrl.includes('constructionenquirer.com') || sourceUrl.includes('theconstructionindex.co.uk')) {
    category = 'Major Projects';
    regulatory_body = 'Industry';
  }

  if (data && data.markdown) {
    const title = data.metadata?.title || 'Latest Update';
    const content = data.markdown;
    const url = data.metadata?.sourceURL || sourceUrl;
    
    // Generate AI summary
    const summary = await summarizeForElectricians(content, title);
    
    // Create external ID from URL
    const external_id = url.split('/').pop() || Date.now().toString();
    
    articles.push({
      title: title.trim(),
      summary: summary,
      content: content.substring(0, 2000), // Limit content length
      regulatory_body,
      category,
      source_url: sourceUrl,
      external_url: url,
      external_id: `${regulatory_body.toLowerCase()}_${external_id}_${Date.now()}`,
      date_published: new Date().toISOString(),
    });
  }
  
  return articles;
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

    // Target URLs for crawling
    const sources = [
      { url: 'https://www.hse.gov.uk/news/', name: 'HSE' },
      { url: 'https://www.gov.uk/government/collections/bs-7671', name: 'BS7671' },
      { url: 'https://www.theiet.org/news/', name: 'IET' },
      { url: 'https://www.constructionenquirer.com/category/contracts-awarded/', name: 'Major Projects' },
      { url: 'https://www.theconstructionindex.co.uk/news/contracts', name: 'Major Projects' }
    ];

    let totalInserted = 0;
    let totalErrors = 0;

    // Process each source
    for (const source of sources) {
      try {
        console.log(`Processing source: ${source.name} - ${source.url}`);
        
        // Scrape the website
        const scrapeData = await scrapeWebsite(source.url);
        
        if (scrapeData.length > 0) {
          // Process scraped data into articles
          const articles = await processScrapedData(scrapeData[0], source.url);
          
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
        }
        
      } catch (sourceError) {
        console.error(`Error processing source ${source.name}:`, sourceError);
        totalErrors++;
      }
    }

    console.log(`Fetch completed: ${totalInserted} articles inserted, ${totalErrors} errors`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        inserted: totalInserted, 
        errors: totalErrors,
        message: `Successfully processed ${totalInserted} articles from industry sources` 
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
