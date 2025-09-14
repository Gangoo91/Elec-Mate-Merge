import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import FirecrawlApp from 'https://esm.sh/@mendable/firecrawl-js@4.3.4';

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

    // Enhanced news sources with better targeting for electrical industry
    const newsSources = [
      {
        url: 'https://www.electricaltimes.co.uk/latest-news/',
        category: 'Industry News',
        source_name: 'Electrical Times',
        regulatory_body: 'Industry',
        priority: 1
      },
      {
        url: 'https://professional-electrician.com/category/technical/',
        category: 'Technical',
        source_name: 'Professional Electrician',
        regulatory_body: 'Industry',
        priority: 2
      },
      {
        url: 'https://electricalcontractingnews.com/category/safety-and-training/',
        category: 'Safety',
        source_name: 'Electrical Contracting News',
        regulatory_body: 'HSE',
        priority: 1
      },
      {
        url: 'https://professional-electrician.com/category/18th-edition/',
        category: 'BS7671',
        source_name: 'Professional Electrician',
        regulatory_body: 'IET',
        priority: 1
      },
      {
        url: 'https://www.electricaltimes.co.uk/category/training/',
        category: 'Training',
        source_name: 'Electrical Times',
        regulatory_body: 'Industry',
        priority: 2
      },
      {
        url: 'https://www.electricaltimes.co.uk/category/renewables/',
        category: 'Renewable Energy',
        source_name: 'Electrical Times',
        regulatory_body: 'Industry',
        priority: 2
      },
      {
        url: 'https://www.electricaltimes.co.uk/category/smart-technology/',
        category: 'Smart Technology',
        source_name: 'Electrical Times',
        regulatory_body: 'Industry',
        priority: 3
      },
      {
        url: 'https://professional-electrician.com/category/apprenticeships/',
        category: 'Apprenticeships',
        source_name: 'Professional Electrician',
        regulatory_body: 'Industry',
        priority: 2
      }
    ];

    const allArticles = [];
    
    for (const source of newsSources) {
      try {
        console.log(`📰 Scraping ${source.source_name}: ${source.url}`);
        
        const crawlResponse = await app.scrapeUrl(source.url, {
          formats: ['markdown', 'html'],
          onlyMainContent: true,
          includeTags: ['article', 'main', 'content'],
          excludeTags: ['nav', 'footer', 'aside', 'advertisement'],
          extract: {
            schema: {
              type: "object",
              properties: {
                articles: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { 
                        type: "string",
                        description: "Article headline or title"
                      },
                      summary: { 
                        type: "string",
                        description: "Brief summary or excerpt of the article (2-3 sentences)"
                      },
                      content: { 
                        type: "string",
                        description: "Full article content in clean text format"
                      },
                      date_published: { 
                        type: "string",
                        description: "Publication date in ISO format or readable date"
                      },
                      url: {
                        type: "string",
                        description: "Direct link to the full article"
                      },
                      author: {
                        type: "string",
                        description: "Article author if available"
                      }
                    },
                    required: ["title", "content"]
                  }
                }
              }
            }
          },
          waitFor: 2000,
          timeout: 30000
        });

        if (crawlResponse.success && crawlResponse.extract?.articles) {
          for (const article of crawlResponse.extract.articles) {
            if (article.title && article.content && article.title.length > 10 && article.content.length > 100) {
              // Enhanced content processing
              const cleanTitle = article.title.trim().substring(0, 255);
              const cleanContent = article.content.trim();
              const cleanSummary = article.summary?.trim().substring(0, 500) || 
                                cleanContent.substring(0, 300).split(' ').slice(0, -1).join(' ') + '...';
              
              // Enhanced date processing
              let publishedDate = new Date().toISOString().split('T')[0];
              if (article.date_published) {
                try {
                  const parsedDate = new Date(article.date_published);
                  if (!isNaN(parsedDate.getTime())) {
                    publishedDate = parsedDate.toISOString().split('T')[0];
                  }
                } catch (error) {
                  console.log(`Date parsing failed for: ${article.date_published}`);
                }
              }

              // Create content hash for deduplication
              const contentHash = await crypto.subtle.digest(
                'SHA-256',
                new TextEncoder().encode(cleanTitle + cleanContent)
              );
              const hashHex = Array.from(new Uint8Array(contentHash))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');

              // Quality score based on content length and source priority
              const qualityScore = Math.min(100, 
                (cleanContent.length / 100) + (source.priority * 20)
              );

              allArticles.push({
                title: cleanTitle,
                summary: cleanSummary,
                content: cleanContent,
                category: source.category,
                source_name: source.source_name,
                regulatory_body: source.regulatory_body,
                date_published: publishedDate,
                content_hash: hashHex,
                is_active: true,
                view_count: 0,
                average_rating: 0,
                source_url: article.url || source.url,
                author: article.author?.substring(0, 100) || null,
                quality_score: Math.round(qualityScore)
              });
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