import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import FirecrawlApp from 'https://esm.sh/@mendable/firecrawl-js@2.6.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🔧 Starting news scraping process...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');

    if (!firecrawlApiKey) {
      throw new Error('FIRECRAWL_API_KEY not found');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const app = new FirecrawlApp({ apiKey: firecrawlApiKey });

    // Define news sources with their categories
    const newsSources = [
      {
        url: 'https://www.electricaltimes.co.uk/latest-news/',
        category: 'General',
        source_name: 'Electrical Times',
        regulatory_body: 'Industry'
      },
      {
        url: 'https://professional-electrician.com/category/technical/',
        category: 'Technical',
        source_name: 'Professional Electrician',
        regulatory_body: 'Industry'
      },
      {
        url: 'https://electricalcontractingnews.com/category/safety-and-training/',
        category: 'Safety',
        source_name: 'Electrical Contracting News',
        regulatory_body: 'HSE'
      },
      {
        url: 'https://professional-electrician.com/category/18th-edition/',
        category: 'BS7671',
        source_name: 'Professional Electrician',
        regulatory_body: 'IET'
      },
      {
        url: 'https://www.electricaltimes.co.uk/category/awards-news/',
        category: 'Industry',
        source_name: 'Electrical Times',
        regulatory_body: 'Industry'
      }
    ];

    const allArticles = [];
    
    for (const source of newsSources) {
      try {
        console.log(`📰 Scraping ${source.source_name}: ${source.url}`);
        
        const crawlResponse = await app.crawlUrl(source.url, {
          limit: 10,
          scrapeOptions: {
            formats: ['markdown', 'extract'],
            extract: {
              schema: {
                type: "object",
                properties: {
                  articles: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string" },
                        summary: { type: "string" },
                        content: { type: "string" },
                        date_published: { type: "string" },
                        author: { type: "string" },
                        url: { type: "string" },
                        tags: {
                          type: "array",
                          items: { type: "string" }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        });

        if (crawlResponse.success && crawlResponse.data) {
          for (const page of crawlResponse.data) {
            if (page.extract?.articles) {
              for (const article of page.extract.articles) {
                if (article.title && article.content) {
                  // Create content hash for deduplication
                  const contentHash = await crypto.subtle.digest(
                    'SHA-256',
                    new TextEncoder().encode(article.title + article.content)
                  );
                  const hashHex = Array.from(new Uint8Array(contentHash))
                    .map(b => b.toString(16).padStart(2, '0'))
                    .join('');

                  allArticles.push({
                    title: article.title.substring(0, 255),
                    summary: article.summary?.substring(0, 500) || article.content.substring(0, 500) + '...',
                    content: article.content,
                    category: source.category,
                    source_name: source.source_name,
                    regulatory_body: source.regulatory_body,
                    date_published: article.date_published || new Date().toISOString().split('T')[0],
                    content_hash: hashHex,
                    is_active: true,
                    view_count: 0,
                    average_rating: 0
                  });
                }
              }
            }
          }
        }
        
        console.log(`✅ Scraped ${source.source_name}: Found articles`);
        
      } catch (error) {
        console.error(`❌ Error scraping ${source.source_name}:`, error);
        continue;
      }
    }

    console.log(`📊 Total articles found: ${allArticles.length}`);

    if (allArticles.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'No articles found',
          articlesProcessed: 0 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Remove duplicate articles based on content hash
    const uniqueArticles = allArticles.filter((article, index, self) =>
      index === self.findIndex(a => a.content_hash === article.content_hash)
    );

    console.log(`🔄 Unique articles after deduplication: ${uniqueArticles.length}`);

    // Check for existing articles to avoid duplicates
    const existingHashes = await supabase
      .from('industry_news')
      .select('content_hash')
      .in('content_hash', uniqueArticles.map(a => a.content_hash));

    const existingHashSet = new Set(
      existingHashes.data?.map(item => item.content_hash) || []
    );

    // Filter out articles that already exist
    const newArticles = uniqueArticles.filter(
      article => !existingHashSet.has(article.content_hash)
    );

    console.log(`📥 New articles to insert: ${newArticles.length}`);

    let insertedCount = 0;
    if (newArticles.length > 0) {
      // Don't deactivate existing articles to preserve static content
      // Only insert new articles

      // Insert new articles in batches
      const batchSize = 10;
      for (let i = 0; i < newArticles.length; i += batchSize) {
        const batch = newArticles.slice(i, i + batchSize);
        const { error } = await supabase
          .from('industry_news')
          .insert(batch);

        if (error) {
          console.error(`❌ Error inserting batch ${i}-${i + batch.length}:`, error);
        } else {
          insertedCount += batch.length;
          console.log(`✅ Inserted batch ${i}-${i + batch.length}`);
        }
      }
    }

    console.log(`🎉 News scraping completed: ${insertedCount} articles inserted`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully scraped and inserted ${insertedCount} new articles`,
        totalFound: allArticles.length,
        uniqueArticles: uniqueArticles.length,
        articlesInserted: insertedCount,
        sources: newsSources.map(s => s.source_name)
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Error in news scraping function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        articlesProcessed: 0 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});