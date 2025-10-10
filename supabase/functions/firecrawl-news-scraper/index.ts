import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve, createClient, corsHeaders } from "../_shared/deps.ts";
import { handleError, ValidationError } from "../_shared/errors.ts";
import { withRetry, RetryPresets } from "../_shared/retry.ts";
import { withTimeout, Timeouts } from "../_shared/timeout.ts";
import { createLogger, generateRequestId } from "../_shared/logger.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'firecrawl-news-scraper' });

  try {
    logger.info('Starting Firecrawl news scraping process');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');

    if (!firecrawlApiKey) {
      throw new ValidationError('FIRECRAWL_API_KEY not found');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    async function getNews() {
      logger.info('Starting news scraping with Firecrawl v2 batch API');
      
      const url = "https://api.firecrawl.dev/v2/batch/scrape";
      const urls = [
        "https://www.electricaltimes.co.uk/latest-news/",
        "https://professional-electrician.com/category/technical/",
        "https://electricalcontractingnews.com/category/safety-and-training/",
        "https://professional-electrician.com/category/18th-edition/",
        "https://www.electricaltimes.co.uk/category/electrical-safety/"
      ];

      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${firecrawlApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          urls: urls,
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
                    imageUrl: { type: "string" },
                  },
                },
              },
            },
          ],
        }),
      };

      try {
        logger.debug('Creating batch scraping job');
        const response = await withRetry(
          () => withTimeout(
            fetch(url, options),
            Timeouts.LONG,
            'Firecrawl batch job creation'
          ),
          RetryPresets.STANDARD
        );
        
        if (!response.ok) {
          const errorText = await response.text();
          logger.error('HTTP error creating batch job', { status: response.status, error: errorText });
          throw new Error(`Failed to create batch job: ${response.status} ${response.statusText}`);
        }

        const job = await response.json();
        logger.info("Batch job created", { jobId: job.id });

        if (!job.url) {
          throw new Error('No job URL returned from batch creation');
        }

        // Poll for completion
        let status;
        let pollCount = 0;
        const maxPolls = 60; // 5 minutes timeout
        
        logger.debug('Polling for batch job completion');
        
        do {
          await new Promise((r) => setTimeout(r, 5000)); // 5 second intervals
          
          const pollResponse = await withTimeout(
            fetch(job.url, {
              headers: { Authorization: `Bearer ${firecrawlApiKey}` },
            }),
            Timeouts.STANDARD,
            'Firecrawl batch job poll'
          );

          if (!pollResponse.ok) {
            logger.error('Error polling job status', { status: pollResponse.status });
            break;
          }

          status = await pollResponse.json();
          logger.debug(`Polling status (${pollCount + 1}/${maxPolls})`, { status: status.status });
          
          pollCount++;
          
          if (pollCount >= maxPolls) {
            logger.error('Batch job timeout after 5 minutes');
            throw new Error('Batch job timeout');
          }
          
        } while (status.status !== "completed" && status.status !== "failed");

        if (status.status === "failed") {
          logger.error('Batch job failed', { status });
          throw new Error('Batch job failed');
        }

        logger.info('Batch job completed successfully');
        
        // Process the results
        const allArticles = [];
        
        if (status.data && Array.isArray(status.data)) {
          const sourceMap = {
            "https://www.electricaltimes.co.uk/latest-news/": { category: "Industry", source: "Electrical Times" },
            "https://professional-electrician.com/category/technical/": { category: "Technical", source: "Professional Electrician" },
            "https://electricalcontractingnews.com/category/safety-and-training/": { category: "Safety", source: "Electrical Contracting News" },
            "https://professional-electrician.com/category/18th-edition/": { category: "BS7671", source: "Professional Electrician" },
            "https://www.electricaltimes.co.uk/category/electrical-safety/": { category: "Safety", source: "Electrical Times" }
          };

            for (const result of status.data) {
            if (result.json && Array.isArray(result.json)) {
              const sourceInfo = sourceMap[result.url as keyof typeof sourceMap] || { category: "General", source: "Unknown" };
              
              const processedArticles = result.json
                .filter((article: any) => article.title && article.title.length > 10)
                .map((article: any) => ({
                  title: article.title,
                  description: article.description,
                  url: article.visit_link || article.url,
                  date: article.date,
                  imageUrl: article.imageUrl,
                  source_category: sourceInfo.category,
                  source_name: sourceInfo.source,
                  source_url: result.url
                }));
              
              allArticles.push(...processedArticles);
              logger.info(`Processed articles from ${sourceInfo.source}`, { count: processedArticles.length });
            }
          }
        }

        logger.info('Total articles collected', { count: allArticles.length });
        return allArticles;
        
      } catch (error) {
        logger.error('Error in batch scraping', { error: error instanceof Error ? error.message : String(error) });
        throw error;
      }
    }

    const articles = await logger.time('News scraping', () => getNews());
    logger.info('Total articles found', { count: articles.length });

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

    logger.info('New articles to insert', { count: newArticles.length });

    let insertedCount = 0;
    if (newArticles.length > 0) {
      // Insert new articles in batches
      const batchSize = 10;
      for (let i = 0; i < newArticles.length; i += batchSize) {
        const batch = newArticles.slice(i, i + batchSize);
        const { error } = await withTimeout(
          supabase.from('industry_news').insert(batch),
          Timeouts.STANDARD,
          'Insert news batch'
        );

        if (error) {
          logger.error(`Error inserting batch ${i}-${i + batch.length}`, { error });
        } else {
          insertedCount += batch.length;
          logger.debug(`Inserted batch ${i}-${i + batch.length}`);
        }
      }
    }

    logger.info('News scraping completed', { insertedCount });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully scraped and inserted ${insertedCount} new articles`,
        totalFound: articles.length,
        articlesInserted: insertedCount,
        sources: ['Electrical Times', 'Professional Electrician', 'Electrical Contracting News'],
        timestamp: new Date().toISOString(),
        requestId
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    logger.error('Firecrawl news scraping error', { error: error instanceof Error ? error.message : String(error) });
    return handleError(error);
  }
});