import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import FirecrawlApp from 'https://esm.sh/@mendable/firecrawl-js@1.29.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NewsArticle {
  title: string;
  content: string;
  url: string;
  date_published: string;
  source: string;
  external_id: string;
  category: string;
}

async function scrapeWebsiteContent(url: string, source: string, firecrawlApp: FirecrawlApp): Promise<NewsArticle[]> {
  try {
    console.log(`Scraping website: ${url} for ${source}`);
    
    const scrapeResponse = await firecrawlApp.scrapeUrl(url, {
      formats: ['markdown'],
      onlyMainContent: true,
    });

    if (!scrapeResponse.success) {
      console.error(`Failed to scrape ${url}:`, scrapeResponse.error);
      return [];
    }

    const articles: NewsArticle[] = [];
    const content = scrapeResponse.data?.markdown || '';
    
    if (content.length < 100) {
      console.warn(`Insufficient content from ${url}`);
      return [];
    }

    // Parse content into articles based on source type
    let contentSections: string[] = [];
    
    if (source === 'HSE') {
      // HSE-specific parsing for safety bulletins and updates
      contentSections = content.split(/(?=Press release|Safety alert|Enforcement notice|Improvement notice)/gi);
    } else if (source === 'IET') {
      // IET-specific parsing for regulations and technical updates
      contentSections = content.split(/(?=Amendment|Update|Regulation|BS\s*7671|Wiring)/gi);
    } else {
      // Default parsing
      contentSections = content.split(/\n\n|\n---\n/);
    }
    
    contentSections.forEach((section: string, index: number) => {
      const cleanSection = section.trim();
      if (cleanSection.length < 150) return; // Skip very short sections
      
      // Enhanced title extraction
      const lines = cleanSection.split('\n');
      let title = '';
      
      if (source === 'HSE') {
        const hseTitleMatch = lines.find(line => 
          /press release|safety alert|enforcement|electrical/gi.test(line) && 
          line.length > 10 && line.length < 200
        );
        title = hseTitleMatch?.replace(/^#+\s*|\*\*|\*|<[^>]*>/g, '').trim() || 
                `HSE Safety Update - ${index + 1}`;
      } else if (source === 'IET') {
        const ietTitleMatch = lines.find(line => 
          /bs\s*7671|amendment|regulation|update|wiring/gi.test(line) && 
          line.length > 10 && line.length < 200
        );
        title = ietTitleMatch?.replace(/^#+\s*|\*\*|\*|<[^>]*>/g, '').trim() || 
                `BS7671/IET Update - ${index + 1}`;
      } else {
        const titleMatch = lines.find(line => 
          line.startsWith('#') || 
          line.startsWith('**') || 
          (line.length > 20 && line.length < 200)
        );
        title = titleMatch?.replace(/^#+\s*|\*\*|\*|<[^>]*>/g, '').trim() || 
                `Update from ${source} - ${index + 1}`;
      }
      
      // Content validation - ensure relevance to electrical industry
      const electricalKeywords = [
        'electrical', 'electricity', 'bs7671', 'wiring', 'regulation', 'safety', 
        'cable', 'circuit', 'installation', 'testing', 'inspection', 'pat', 
        'amendment', 'compliance', 'certification'
      ];
      
      const hasRelevantContent = electricalKeywords.some(keyword => 
        cleanSection.toLowerCase().includes(keyword.toLowerCase())
      );
      
      // Skip irrelevant content
      if (!hasRelevantContent || 
          title.toLowerCase().includes('cookie') || 
          title.toLowerCase().includes('navigation') ||
          title.toLowerCase().includes('search')) {
        return;
      }
      
      // Generate summary
      const summary = cleanSection.substring(0, 300).replace(/\n/g, ' ').trim();
      
      articles.push({
        title,
        content: cleanSection,
        url,
        date_published: new Date().toISOString(),
        source,
        external_id: `${source}-${Date.now()}-${index}`,
        category: source
      });
    });
    
    console.log(`Extracted ${articles.length} articles from ${source}`);
    return articles.slice(0, 5); // Limit to 5 articles per source
    
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return [];
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const firecrawlApp = new FirecrawlApp({ apiKey: firecrawlApiKey });

    // News sources to scrape
    const sources = [
      { url: 'https://www.hse.gov.uk/electricity/', source: 'HSE' },
      { url: 'https://electrical.theiet.org/bs-7671/', source: 'IET' },
      { url: 'https://www.hse.gov.uk/news/', source: 'HSE' }
    ];

    let totalInserted = 0;
    let errors = 0;

    for (const sourceConfig of sources) {
      try {
        const articles = await scrapeWebsiteContent(sourceConfig.url, sourceConfig.source, firecrawlApp);
        
        for (const article of articles) {
          try {
            const { error } = await supabase
              .from('industry_news')
              .upsert({
                title: article.title,
                content: article.content,
                source: article.source,
                external_id: article.external_id,
                url: article.url,
                date_published: article.date_published,
                category: article.category,
                is_breaking: false,
                view_count: 0,
                average_rating: 0
              }, { 
                onConflict: 'source,external_id',
                ignoreDuplicates: true 
              });

            if (!error) {
              totalInserted++;
            } else {
              console.error('Error inserting article:', error);
              errors++;
            }
          } catch (insertError) {
            console.error('Error processing article:', insertError);
            errors++;
          }
        }
      } catch (sourceError) {
        console.error(`Error processing source ${sourceConfig.source}:`, sourceError);
        errors++;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully processed ${totalInserted} articles`,
        inserted: totalInserted,
        errors: errors
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in fetch-news function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});