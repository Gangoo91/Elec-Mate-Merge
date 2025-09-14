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
      const url = "https://api.firecrawl.dev/v2/batch/scrape";
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${firecrawlApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          urls: [
            "https://www.electricaltimes.co.uk/latest-news/",
            "https://professional-electrician.com/category/technical/",
            "https://electricalcontractingnews.com/category/safety-and-training/",
            "https://professional-electrician.com/category/18th-edition/",
            "https://www.electricaltimes.co.uk/category/awards-news/",
          ],
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

      const response = await fetch(url, options);
      const job = await response.json();
      console.log("Batch job created:", job);

      let status;
      let attempts = 0;
      const maxAttempts = 24; // 2 minutes max (5s * 24)

      do {
        await new Promise((r) => setTimeout(r, 5000));
        const res = await fetch(job.url, {
          headers: { Authorization: `Bearer ${firecrawlApiKey}` },
        });

        status = await res.json();
        console.log("Polling status:", status.status);
        attempts++;
        
        if (attempts >= maxAttempts) {
          throw new Error('Timeout waiting for scraping job to complete');
        }
      } while (status.status !== "completed" && status.status !== "failed");

      if (status.status === "failed") {
        throw new Error('Scraping job failed');
      }

      return status.data?.map((article) => article.json).flat() || [];
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
      const contentText = article.title + (article.description || '');
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
      
      // Determine category and regulatory body based on source
      let category = 'General';
      let regulatory_body = 'Industry';
      let source_name = 'Unknown';
      
      if (article.visit_link?.includes('electricaltimes.co.uk')) {
        source_name = 'Electrical Times';
        if (article.visit_link.includes('awards')) {
          category = 'Industry';
        }
      } else if (article.visit_link?.includes('professional-electrician.com')) {
        source_name = 'Professional Electrician';
        if (article.visit_link.includes('technical')) {
          category = 'Technical';
        } else if (article.visit_link.includes('18th-edition')) {
          category = 'BS7671';
          regulatory_body = 'IET';
        }
      } else if (article.visit_link?.includes('electricalcontractingnews.com')) {
        source_name = 'Electrical Contracting News';
        if (article.visit_link.includes('safety')) {
          category = 'Safety';
          regulatory_body = 'HSE';
        }
      }

      return {
        title: article.title?.substring(0, 255) || 'Untitled',
        summary: article.description?.substring(0, 500) || 'No summary available',
        content: article.description || article.title || 'No content available',
        category,
        source_name,
        regulatory_body,
        date_published: article.date || new Date().toISOString().split('T')[0],
        content_hash: contentHash,
        external_url: article.visit_link,
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
        sources: ['Electrical Times', 'Professional Electrician', 'Electrical Contracting News']
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