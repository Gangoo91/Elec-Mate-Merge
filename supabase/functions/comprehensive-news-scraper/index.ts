import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import FirecrawlApp from 'https://esm.sh/@mendable/firecrawl-js@1.29.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
}

interface NewsSource {
  name: string;
  url: string;
  category: 'HSE' | 'BS7671' | 'IET' | 'Major Projects';
  regulatory_body: string;
  scrape_selector?: string;
}

const NEWS_SOURCES: NewsSource[] = [
  // HSE Sources
  {
    name: 'HSE Electrical Safety',
    url: 'https://www.hse.gov.uk/electricity/',
    category: 'HSE',
    regulatory_body: 'Health and Safety Executive'
  },
  {
    name: 'HSE Latest News & Updates',
    url: 'https://www.hse.gov.uk/news/',
    category: 'HSE', 
    regulatory_body: 'Health and Safety Executive'
  },
  {
    name: 'HSE Safety Alerts',
    url: 'https://www.hse.gov.uk/safetybulletins/',
    category: 'HSE',
    regulatory_body: 'Health and Safety Executive'
  },
  
  // BS7671 & IET Sources
  {
    name: 'IET BS7671 18th Edition Updates',
    url: 'https://electrical.theiet.org/bs-7671/updates-to-18th-edition/',
    category: 'BS7671',
    regulatory_body: 'Institution of Engineering and Technology'
  },
  {
    name: 'IET Wiring Regulations',
    url: 'https://electrical.theiet.org/bs-7671/', 
    category: 'BS7671',
    regulatory_body: 'Institution of Engineering and Technology'
  },
  {
    name: 'IET Wiring Matters Magazine',
    url: 'https://electrical.theiet.org/wiring-matters/',
    category: 'IET',
    regulatory_body: 'Institution of Engineering and Technology'
  },
  {
    name: 'IET Technical Updates',
    url: 'https://electrical.theiet.org/wiring-regulations/guidance-notes/',
    category: 'IET',
    regulatory_body: 'Institution of Engineering and Technology'
  },
  
  // Major Projects Sources
  {
    name: 'UK Government Tenders - Electrical',
    url: 'https://www.find-tender.service.gov.uk/Search/Results?keywords=electrical+infrastructure',
    category: 'Major Projects',
    regulatory_body: 'UK Government'
  },
  {
    name: 'Construction News Infrastructure',
    url: 'https://www.constructionnews.co.uk/sectors/infrastructure/',
    category: 'Major Projects',
    regulatory_body: 'Construction Industry'
  },
  {
    name: 'Electrical Review News',
    url: 'https://www.electricalreview.co.uk/news/',
    category: 'Major Projects',
    regulatory_body: 'Electrical Industry'
  }
];

async function intelligentContentParsing(rawContent: string, source: NewsSource): Promise<ProcessedArticle[]> {
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
  
  if (!openAIApiKey) {
    console.log('No OpenAI API key found, using basic parsing for', source.name);
    return basicContentParsing(rawContent, source);
  }

  try {
    console.log(`Using AI to parse content from ${source.name}`);
    
    const prompt = `You are an expert UK electrical industry analyst. Extract relevant news articles from the following scraped content from ${source.name} (${source.category}).

Content to analyze:
${rawContent.substring(0, 8000)}

Extract 3-5 most relevant electrical industry articles. For each article, provide:

1. **Title**: Clear, professional title (max 100 chars)
2. **Summary**: Key points in 2-3 sentences (max 200 chars) 
3. **Content**: Full article content with proper paragraphs
4. **Category**: One of: HSE, BS7671, IET, Major Projects
5. **Relevance**: Why this is important to UK electricians
6. **Keywords**: Key electrical terms mentioned

Focus on:
- Safety updates and alerts
- BS7671 amendments and guidance
- New regulations and compliance requirements  
- Major electrical contracts and projects
- Technical updates and best practices
- Industry warnings and recalls

Ignore:
- General website navigation
- Cookie policies
- Unrelated news
- Marketing content

Format as JSON array:
[
  {
    "title": "Article title",
    "summary": "Brief summary", 
    "content": "Full detailed content with proper formatting",
    "category": "${source.category}",
    "keywords": ["keyword1", "keyword2"],
    "relevance_score": 8,
    "date_mentioned": "extracted date or null"
  }
]

Return only valid JSON, no other text.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert UK electrical industry news analyst. Always respond with valid JSON only.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 4000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      console.error(`OpenAI API error: ${response.status}`);
      return basicContentParsing(rawContent, source);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content?.trim();
    
    if (!aiResponse) {
      console.error('No response from OpenAI');
      return basicContentParsing(rawContent, source);
    }

    try {
      const parsedArticles = JSON.parse(aiResponse);
      
      if (!Array.isArray(parsedArticles)) {
        console.error('AI response is not an array');
        return basicContentParsing(rawContent, source);
      }

      // Convert AI response to ProcessedArticle format
      const processedArticles: ProcessedArticle[] = parsedArticles
        .filter(article => article.relevance_score >= 6)
        .slice(0, 4)
        .map((article, index) => ({
          title: article.title || `${source.category} Update ${index + 1}`,
          summary: article.summary || article.content?.substring(0, 200) + '...',
          content: article.content || 'Content not available',
          regulatory_body: source.regulatory_body,
          category: source.category,
          external_id: `ai-${source.name}-${Date.now()}-${index}`,
          source_url: source.url,
          external_url: source.url,
          date_published: article.date_mentioned ? 
            new Date(article.date_mentioned).toISOString() : 
            new Date().toISOString()
        }));

      console.log(`AI extracted ${processedArticles.length} articles from ${source.name}`);
      return processedArticles;

    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.log('AI Response:', aiResponse.substring(0, 500));
      return basicContentParsing(rawContent, source);
    }

  } catch (error) {
    console.error(`AI parsing error for ${source.name}:`, error);
    return basicContentParsing(rawContent, source);
  }
}

function basicContentParsing(rawContent: string, source: NewsSource): ProcessedArticle[] {
  console.log(`Using basic parsing for ${source.name}`);
  
  const articles: ProcessedArticle[] = [];
  
  try {
    // Split content into sections based on source type
    let sections: string[] = [];
    
    if (source.category === 'HSE') {
      sections = rawContent.split(/(?=Press release|Safety alert|Enforcement notice|Improvement notice|News:|Update:)/gi);
    } else if (source.category === 'BS7671' || source.category === 'IET') {
      sections = rawContent.split(/(?=Amendment|Update|Regulation|BS\s*7671|Wiring|Edition|Guidance)/gi);
    } else if (source.category === 'Major Projects') {
      sections = rawContent.split(/(?=Contract|Tender|Award|Project|£\d+|Infrastructure|Construction)/gi);
    } else {
      sections = rawContent.split(/\n\n+|\n---+\n/);
    }
    
    const relevantKeywords = [
      'electrical', 'electricity', 'bs7671', 'wiring', 'regulation', 'safety',
      'cable', 'circuit', 'installation', 'testing', 'inspection', 'amendment',
      'compliance', 'certification', 'contractor', 'electrician', 'project',
      'tender', 'contract', 'infrastructure', 'construction', 'power', 'energy'
    ];
    
    sections.forEach((section, index) => {
      const cleanSection = section.trim();
      if (cleanSection.length < 200) return;
      
      // Check relevance
      const hasRelevantContent = relevantKeywords.some(keyword =>
        cleanSection.toLowerCase().includes(keyword.toLowerCase())
      );
      
      if (!hasRelevantContent) return;
      
      // Extract title
      const lines = cleanSection.split('\n').filter(line => line.trim().length > 0);
      const title = lines.find(line => 
        line.length > 10 && line.length < 150 &&
        !line.toLowerCase().includes('cookie') &&
        !line.toLowerCase().includes('navigation')
      )?.replace(/^#+\s*|\*\*|\*|<[^>]*>/g, '').trim() || 
      `${source.category} Update ${index + 1}`;
      
      // Generate summary
      const summary = cleanSection
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .substring(0, 200)
        .trim() + '...';
      
      articles.push({
        title,
        summary,
        content: cleanSection,
        regulatory_body: source.regulatory_body,
        category: source.category,
        external_id: `basic-${source.name}-${Date.now()}-${index}`,
        source_url: source.url,
        external_url: source.url,
        date_published: new Date().toISOString()
      });
    });
    
    return articles.slice(0, 3);
    
  } catch (error) {
    console.error(`Basic parsing error for ${source.name}:`, error);
    return [];
  }
}

async function scrapeAndProcessSource(source: NewsSource, firecrawl: FirecrawlApp): Promise<ProcessedArticle[]> {
  try {
    console.log(`Scraping ${source.name}...`);
    
    const scrapeResponse = await firecrawl.scrapeUrl(source.url, {
      formats: ['markdown', 'html'],
      onlyMainContent: true,
      waitFor: 2000,
      timeout: 30000
    });

    if (!scrapeResponse.success) {
      console.error(`Failed to scrape ${source.url}:`, scrapeResponse.error);
      return [];
    }

    const rawContent = scrapeResponse.data?.markdown || scrapeResponse.data?.html || '';
    
    if (rawContent.length < 500) {
      console.warn(`Insufficient content from ${source.url}`);
      return [];
    }

    // Use AI-powered parsing
    const articles = await intelligentContentParsing(rawContent, source);
    
    console.log(`Processed ${articles.length} articles from ${source.name}`);
    return articles;

  } catch (error) {
    console.error(`Error processing ${source.name}:`, error);
    return [];
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting comprehensive news scraping...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY')!;
    
    if (!firecrawlApiKey) {
      throw new Error('FIRECRAWL_API_KEY is required');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const firecrawl = new FirecrawlApp({ apiKey: firecrawlApiKey });

    let totalProcessed = 0;
    let totalInserted = 0;
    let errors = 0;

    // Process sources in batches to avoid rate limits
    const batchSize = 3;
    for (let i = 0; i < NEWS_SOURCES.length; i += batchSize) {
      const batch = NEWS_SOURCES.slice(i, i + batchSize);
      
      console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(NEWS_SOURCES.length / batchSize)}`);
      
      const batchPromises = batch.map(source => scrapeAndProcessSource(source, firecrawl));
      const batchResults = await Promise.allSettled(batchPromises);
      
      for (const result of batchResults) {
        if (result.status === 'fulfilled') {
          const articles = result.value;
          totalProcessed += articles.length;
          
          // Insert articles into database
          for (const article of articles) {
            try {
              const { error } = await supabase
                .from('industry_news')
                .upsert({
                  title: article.title,
                  summary: article.summary,
                  content: article.content,
                  regulatory_body: article.regulatory_body,
                  category: article.category,
                  external_id: article.external_id,
                  source_url: article.source_url,
                  external_url: article.external_url,
                  date_published: article.date_published,
                  is_active: true,
                  view_count: 0,
                  average_rating: 0
                }, {
                  onConflict: 'external_id',
                  ignoreDuplicates: true
                });

              if (!error) {
                totalInserted++;
              } else {
                console.error('Database insert error:', error);
                errors++;
              }
            } catch (insertError) {
              console.error('Insert error:', insertError);
              errors++;
            }
          }
        } else {
          console.error('Batch processing error:', result.reason);
          errors++;
        }
      }
      
      // Rate limiting delay between batches
      if (i + batchSize < NEWS_SOURCES.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    console.log(`Scraping complete: ${totalProcessed} processed, ${totalInserted} inserted, ${errors} errors`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully processed ${totalProcessed} articles and inserted ${totalInserted} new articles`,
        stats: {
          processed: totalProcessed,
          inserted: totalInserted,
          errors: errors,
          sources_checked: NEWS_SOURCES.length
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Comprehensive scraper error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to scrape news sources',
        details: error instanceof Error ? error.stack : 'Unknown error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});