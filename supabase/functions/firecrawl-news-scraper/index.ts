import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🔧 Starting Firecrawl news scraping process...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');

    if (!firecrawlApiKey) {
      throw new Error('FIRECRAWL_API_KEY not found');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    async function getNews() {
      console.log('🚀 Starting news scraping with Firecrawl API...');
      
      const url = "https://api.firecrawl.dev/v1/scrape";
      const sources = [
        {
          url: "https://www.electricaltimes.co.uk/latest-news/",
          category: "Industry",
          source: "Electrical Times"
        },
        {
          url: "https://professional-electrician.com/category/technical/",
          category: "Technical",
          source: "Professional Electrician"
        },
        {
          url: "https://electricalcontractingnews.com/category/safety-and-training/",
          category: "Safety",
          source: "Electrical Contracting News"
        },
        {
          url: "https://professional-electrician.com/category/18th-edition/",
          category: "BS7671",
          source: "Professional Electrician"
        }
      ];

      const allArticles = [];
      
      for (const source of sources) {
        try {
          console.log(`📡 Scraping ${source.source}: ${source.url}`);
          
          const options = {
            method: "POST",
            headers: {
              Authorization: `Bearer ${firecrawlApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: source.url,
              pageOptions: {
                onlyMainContent: true,
                includeHtml: false,
                waitFor: 2000
              },
              extractorOptions: {
                mode: "llm-extraction",
                extractionPrompt: `Extract all news articles from this electrical industry page. For each article, extract:
                - title: The headline of the article
                - description: A brief summary or excerpt
                - url: The link to the full article (if available)
                - date: Publication date in any format
                - imageUrl: URL of the article's main image (if available)
                
                Focus on electrical safety, regulations, BS7671, industry news, training, and technical content.`,
                extractionSchema: {
                  type: "object",
                  properties: {
                    articles: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          title: { type: "string", description: "Article headline" },
                          description: { type: "string", description: "Article summary or excerpt" },
                          url: { type: "string", description: "Link to full article" },
                          date: { type: "string", description: "Publication date" },
                          imageUrl: { type: "string", description: "Article image URL" }
                        },
                        required: ["title"]
                      }
                    }
                  },
                  required: ["articles"]
                }
              }
            }),
          };

          const response = await fetch(url, options);
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ HTTP error for ${source.source}: ${response.status} ${response.statusText}`, errorText);
            continue;
          }

          const result = await response.json();
          console.log(`📊 Response for ${source.source}:`, result.success ? 'Success' : 'Failed');
          
          if (result.success && result.data?.extract?.articles) {
            const articles = result.data.extract.articles
              .filter(article => article.title && article.title.length > 10)
              .map(article => ({
                ...article,
                source_category: source.category,
                source_name: source.source,
                source_url: source.url
              }));
            
            allArticles.push(...articles);
            console.log(`✅ Found ${articles.length} articles from ${source.source}`);
          } else {
            console.warn(`⚠️ No articles found for ${source.source}`, result);
          }
          
          // Rate limiting delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
        } catch (error) {
          console.error(`❌ Error scraping ${source.source}:`, error);
        }
      }

      console.log(`📰 Total articles collected: ${allArticles.length}`);
      return allArticles;
    }

    const articles = await getNews();
    console.log(`📊 Total articles found: ${articles.length}`);

    if (articles.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'No articles found',
          articlesProcessed: 0 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Transform articles to match database schema
    const transformedArticles = await Promise.all(articles.map(async article => {
      // Create content hash for deduplication using Unicode-safe method
      const contentText = article.title + (article.description || article.excerpt || '');
      let contentHash;
      
      try {
        // Use crypto.subtle.digest for Unicode-safe hashing
        const encoder = new TextEncoder();
        const data = encoder.encode(contentText);
        const hashBuffer = await crypto.subtle.digest('SHA-1', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        contentHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 32);
      } catch (hashError) {
        console.warn('Hash generation failed, using fallback:', hashError);
        // Fallback: simple string hash
        let hash = 0;
        for (let i = 0; i < contentText.length; i++) {
          const char = contentText.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash; // Convert to 32bit integer
        }
        contentHash = Math.abs(hash).toString(16).substring(0, 32);
      }
      
      // Parse date safely
      let publishDate = new Date().toISOString().split('T')[0];
      if (article.date) {
        try {
          const parsed = new Date(article.date);
          if (!isNaN(parsed.getTime())) {
            publishDate = parsed.toISOString().split('T')[0];
          }
        } catch (e) {
          console.warn('Date parsing failed:', article.date);
        }
      }

      return {
        title: article.title?.substring(0, 255) || 'Untitled',
        summary: (article.description || article.excerpt || 'No summary available').substring(0, 500),
        content: article.description || article.excerpt || article.title || 'No content available',
        category: article.source_category || 'General',
        source_name: article.source_name || 'Unknown',
        regulatory_body: article.source_category === 'BS7671' ? 'IET' : (article.source_category === 'Safety' ? 'HSE' : 'Industry'),
        date_published: publishDate,
        content_hash: contentHash,
        external_url: article.url || article.source_url,
        image_url: article.imageUrl || null,
        is_active: true,
        view_count: 0,
        average_rating: 0
      };
    }));

    // Check for existing articles to avoid duplicates
    const existingHashes = await supabase
      .from('industry_news')
      .select('content_hash')
      .in('content_hash', transformedArticles.map(a => a.content_hash));

    const existingHashSet = new Set(
      existingHashes.data?.map(item => item.content_hash) || []
    );

    // Filter out articles that already exist
    const newArticles = transformedArticles.filter(
      article => !existingHashSet.has(article.content_hash)
    );

    console.log(`📥 New articles to insert: ${newArticles.length}`);

    let insertedCount = 0;
    if (newArticles.length > 0) {
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
        totalFound: articles.length,
        articlesInserted: insertedCount,
        sources: ['Electrical Times', 'Professional Electrician', 'Electrical Contracting News'],
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Error in Firecrawl news scraping function:', error);
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