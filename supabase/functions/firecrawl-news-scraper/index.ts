import { serve, createClient, corsHeaders } from "../_shared/deps.ts";
import { handleError, ValidationError } from "../_shared/errors.ts";
import { withRetry, RetryPresets } from "../_shared/retry.ts";
import { withTimeout, Timeouts } from "../_shared/timeout.ts";
import { createLogger, generateRequestId } from "../_shared/logger.ts";
import { startScraperRun } from "../_shared/scraper-health.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'firecrawl-news-scraper' });

  // Start health tracking
  const healthTracker = await startScraperRun('firecrawl-news-scraper', { requestId });

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
        // Existing electrical
        "https://www.electricaltimes.co.uk/latest-news/",
        "https://professional-electrician.com/category/technical/",
        "https://electricalcontractingnews.com/category/safety-and-training/",
        "https://professional-electrician.com/category/18th-edition/",
        "https://www.electricaltimes.co.uk/category/electrical-safety/",
        // UK Construction & Building
        "https://www.constructionenquirer.com/category/projects/",
        "https://www.theconstructionindex.co.uk/news",
        "https://www.building.co.uk/news",
        // UK Building Services & HVAC
        "https://www.bsria.com/uk/news/",
        // UK Electrical Trade Community
        "https://www.voltimum.co.uk/news",
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
              prompt: `You are extracting UK electrical and construction industry news articles.

STRICT REQUIREMENTS:
1. ONLY include articles about the UK electrical industry, UK construction projects, or UK building services
2. MUST be from UK publications or specifically about UK topics
3. Extract: full article title, complete description/summary (2-3 sentences), publication date, article URL, and any image URL

REJECT IMMEDIATELY:
- Any articles about USA, India, Australia, Asia, Middle East, Europe (non-UK)
- Stock market news, financial reports, quarterly earnings, IPO announcements
- Product advertisements, sponsored content, press release distributions
- Generic international news not specifically about UK

ACCEPT:
- UK electrical regulations (BS7671, 18th Edition, Part P, Building Regulations)
- UK electrician news, training, apprenticeships (NICEIC, NAPIT, ECS, JIB)
- UK construction projects, infrastructure, building contracts
- UK electrical safety, HSE guidance, fire safety
- UK renewable energy, EV charging, solar, heat pumps
- UK building services, M&E, HVAC

For each article, extract the complete title as written, a detailed summary capturing the key points, the exact publication date in ISO format, and the direct URL to the article.`,
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
            "https://www.electricaltimes.co.uk/category/electrical-safety/": { category: "Safety", source: "Electrical Times" },
            "https://www.constructionenquirer.com/category/projects/": { category: "Projects", source: "Construction Enquirer" },
            "https://www.theconstructionindex.co.uk/news": { category: "Projects", source: "Construction Index" },
            "https://www.building.co.uk/news": { category: "Projects", source: "Building" },
            "https://www.bsria.com/uk/news/": { category: "Technical", source: "BSRIA" },
            "https://www.voltimum.co.uk/news": { category: "Industry", source: "Voltimum UK" },
          };

          // UK Electrical Industry relevance keywords
          const UK_ELECTRICAL_KEYWORDS = [
            // Regulations & Standards
            'bs 7671', 'bs7671', '18th edition', 'wiring regulations', 'iee', 'iet',
            'part p', 'building regulations', 'hse', 'eicr', 'eic', 'mic',
            // Electrical terms
            'electrician', 'electrical', 'wiring', 'circuit', 'mcb', 'rcbo', 'rcd',
            'consumer unit', 'distribution board', 'cable', 'earthing', 'bonding',
            'socket', 'lighting', 'ev charger', 'ev charging', 'solar', 'pv',
            'battery storage', 'heat pump', 'immersion', 'shower', 'cooker',
            // UK Bodies & Orgs
            'niceic', 'napit', 'elecsa', 'stroma', 'competent person', 'ecs card',
            'jib', 'apprentice', 'apprenticeship', 'city & guilds', 'c&g',
            // Safety
            'electrical safety', 'fire safety', 'shock', 'arc fault', 'afdd',
            'electrical fire', 'installation', 'inspection', 'testing',
            // UK specific
            'uk', 'england', 'scotland', 'wales', 'northern ireland', 'british',
            // Construction & Infrastructure
            'construction', 'infrastructure', 'building project', 'tender', 'contract award',
            'nhs', 'school', 'hospital', 'housing', 'rail', 'hs2',
            'm&e', 'mechanical electrical', 'building services', 'data centre'
          ];

          // Words that indicate non-UK or non-electrical content
          const EXCLUSION_KEYWORDS = [
            // Non-UK geographic
            'nec code', 'nfpa', 'ul listed', 'american', 'usa', 'us market',
            'canadian', 'australian', 'india', 'asia pacific',
            'indian', 'asian', 'china', 'chinese', 'japan', 'japanese',
            'middle east', 'africa', 'south america', 'mexico', 'brazil',
            'european union', 'germany', 'france', 'united states',
            'mumbai', 'delhi', 'bangalore', 'singapore', 'dubai',
            // Financial spam
            'stock market', 'share price', 'quarterly earnings', 'ipo', 'nasdaq', 'nyse',
            'cryptocurrency', 'bitcoin', 'blockchain',
            'advertisement', 'sponsored', 'press release distribution',
            'free shipping', 'buy now', 'discount code', 'promo',
            // Non-UK regulatory
            'ieee', 'ansi', 'csa', 'saa',
          ];

          const isRelevantArticle = (article: any): boolean => {
            const text = `${article.title || ''} ${article.description || ''}`.toLowerCase();
            // Check for exclusion keywords first
            if (EXCLUSION_KEYWORDS.some(keyword => text.includes(keyword))) {
              return false;
            }
            // Must contain at least one UK electrical keyword
            return UK_ELECTRICAL_KEYWORDS.some(keyword => text.includes(keyword));
          };

          const validateUKRelevance = (article: any): boolean => {
            const text = `${article.title || ''} ${article.description || ''}`.toLowerCase();

            // Strong UK indicators
            const ukIndicators = [
              'bs 7671', 'bs7671', '18th edition', 'iet', 'niceic', 'napit', 'elecsa',
              'part p', 'building regulations', 'hse',
              'uk', 'united kingdom', 'british', 'england', 'scotland', 'wales',
              'northern ireland', 'london', 'manchester', 'birmingham', 'leeds',
              'liverpool', 'glasgow', 'edinburgh', 'cardiff', 'belfast'
            ];

            // Check URL for UK domain
            const url = (article.visit_link || article.url || '').toLowerCase();
            const isUKDomain = url.includes('.co.uk') || url.includes('.gov.uk') || url.includes('.org.uk');

            return ukIndicators.some(ind => text.includes(ind)) || isUKDomain;
          };

            for (const result of status.data) {
            if (result.json && Array.isArray(result.json)) {
              const sourceInfo = sourceMap[result.url as keyof typeof sourceMap] || { category: "General", source: "Unknown" };

              const processedArticles = result.json
                .filter((article: any) => article.title && article.title.length > 10)
                .filter(isRelevantArticle)
                .filter(validateUKRelevance)
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

    // Helper function to normalize titles for similarity comparison
    const normalizeTitle = (title: string): string => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // Remove punctuation
        .replace(/\s+/g, ' ')         // Normalize whitespace
        .trim()
        .split(' ')
        .filter(word => word.length > 2) // Remove short words
        .slice(0, 8)                      // Take first 8 significant words
        .join(' ');
    };

    // Check for existing articles to avoid duplicates (by hash)
    const existingHashes = await supabase
      .from('industry_news')
      .select('content_hash')
      .in('content_hash', transformedArticles.map(a => a.content_hash));

    const existingHashSet = new Set(
      existingHashes.data?.map(item => item.content_hash) || []
    );

    // Also check for similar titles in recent articles (last 7 days)
    const recentTitles = await supabase
      .from('industry_news')
      .select('title')
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

    const existingNormalizedTitles = new Set(
      (recentTitles.data || []).map(item => normalizeTitle(item.title))
    );

    // Track normalized titles in current batch to avoid batch duplicates
    const batchNormalizedTitles = new Set<string>();

    // Filter out articles that already exist (by hash or similar title)
    const newArticles = transformedArticles.filter(article => {
      // Skip if hash already exists
      if (existingHashSet.has(article.content_hash)) {
        return false;
      }

      // Skip if similar title exists in database
      const normalizedTitle = normalizeTitle(article.title);
      if (existingNormalizedTitles.has(normalizedTitle)) {
        logger.debug('Skipping similar title (exists in DB)', { title: article.title });
        return false;
      }

      // Skip if similar title already in this batch
      if (batchNormalizedTitles.has(normalizedTitle)) {
        logger.debug('Skipping similar title (batch duplicate)', { title: article.title });
        return false;
      }

      batchNormalizedTitles.add(normalizedTitle);
      return true;
    });

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

    // Log successful run
    await healthTracker.completeRun({
      itemsFound: articles.length,
      itemsInserted: insertedCount,
      itemsSkipped: articles.length - insertedCount
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully scraped and inserted ${insertedCount} new articles`,
        totalFound: articles.length,
        articlesInserted: insertedCount,
        sources: ['Electrical Times', 'Professional Electrician', 'Electrical Contracting News', 'Construction Enquirer', 'Construction Index', 'Building', 'BSRIA', 'Voltimum UK'],
        timestamp: new Date().toISOString(),
        requestId
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    // Log failed run
    await healthTracker.failRun(error instanceof Error ? error.message : String(error));

    logger.error('Firecrawl news scraping error', { error: error instanceof Error ? error.message : String(error) });
    return handleError(error);
  }
});