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
              prompt: `You are extracting ONLY UK electrical and construction industry news articles. Be VERY strict.

=== CRITICAL: REJECT THESE IMMEDIATELY - DO NOT EXTRACT ===
- ANY mention of India, Indian cities (Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata, Pune, etc.)
- ANY mention of Indian companies (Tata, Reliance, Adani, Infosys, Wipro, L&T, Mahindra)
- ANY mention of Indian currency (crore, lakh, rupee, INR, ₹)
- ANY articles from Indian news sources (Times of India, Hindustan Times, Economic Times, NDTV, etc.)
- ANY mention of USA, Australia, China, Middle East, Asia Pacific, Singapore, Dubai
- Stock market, share prices, quarterly earnings, IPO, investor news
- Product advertisements, sponsored content, press releases

=== ONLY EXTRACT ARTICLES THAT ===
1. Are SPECIFICALLY about the UK electrical industry or UK construction
2. Mention UK locations (London, Manchester, Birmingham, Scotland, Wales, etc.)
3. Reference UK regulations (BS7671, 18th Edition, Part P, Building Regulations)
4. Mention UK bodies (NICEIC, NAPIT, IET, HSE, JIB, ECS)
5. Discuss UK projects, UK tenders, UK contracts
6. Use British spelling and £ GBP currency

=== EXTRACT THESE FIELDS ===
- title: Full article title exactly as written
- description: 2-3 sentence summary of the key points
- date: Publication date in ISO format (YYYY-MM-DD)
- visit_link: Direct URL to the article
- imageUrl: Article image URL if available

If in doubt about whether an article is UK-specific, DO NOT include it. We only want confirmed UK content.`,
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
            // === INDIA - Comprehensive blocking ===
            // Countries & Regions
            'india', 'indian', 'bharat', 'hindustan',
            // Major Cities (Top 50+)
            'mumbai', 'delhi', 'bangalore', 'bengaluru', 'hyderabad', 'chennai', 'kolkata',
            'pune', 'ahmedabad', 'jaipur', 'lucknow', 'kanpur', 'nagpur', 'indore',
            'thane', 'bhopal', 'visakhapatnam', 'vadodara', 'ghaziabad', 'ludhiana',
            'agra', 'nashik', 'faridabad', 'meerut', 'rajkot', 'varanasi', 'srinagar',
            'aurangabad', 'dhanbad', 'amritsar', 'allahabad', 'ranchi', 'howrah',
            'coimbatore', 'jabalpur', 'gwalior', 'vijayawada', 'jodhpur', 'madurai',
            'raipur', 'kota', 'guwahati', 'chandigarh', 'solapur', 'hubli', 'tiruchirappalli',
            'bareilly', 'moradabad', 'mysore', 'tiruppur', 'gurgaon', 'noida', 'greater noida',
            // States
            'maharashtra', 'uttar pradesh', 'karnataka', 'tamil nadu', 'telangana',
            'gujarat', 'rajasthan', 'west bengal', 'madhya pradesh', 'kerala',
            'andhra pradesh', 'punjab', 'haryana', 'bihar', 'odisha', 'jharkhand',
            // Indian Companies & Terms
            'tata', 'reliance', 'adani', 'infosys', 'wipro', 'hcl tech', 'bharti',
            'larsen & toubro', 'l&t', 'mahindra', 'bajaj', 'hdfc', 'icici',
            'nse india', 'bse india', 'sensex', 'nifty',
            'crore', 'lakh', 'rupee', 'inr', '₹',
            // Indian Regulatory/Industry
            'bureau of indian standards', 'bis certification', 'cpwd', 'pwd india',
            'indian electrical', 'cei india', 'central electricity',
            // Indian News Sources (block even if on UK sites)
            'times of india', 'hindustan times', 'economic times india', 'ndtv',
            'zee news', 'india today', 'the hindu', 'indian express', 'deccan',
            'livemint', 'moneycontrol', 'business standard india', 'firstpost',

            // === OTHER NON-UK REGIONS ===
            // USA
            'nec code', 'nfpa', 'ul listed', 'american', 'usa', 'us market', 'united states',
            'california', 'texas', 'florida', 'new york city', 'los angeles', 'chicago',
            // Other Countries
            'canadian', 'australian', 'australia', 'new zealand',
            'china', 'chinese', 'beijing', 'shanghai', 'shenzhen',
            'japan', 'japanese', 'tokyo',
            'asia pacific', 'apac', 'asian',
            'middle east', 'uae', 'saudi', 'qatar', 'dubai', 'abu dhabi',
            'africa', 'south africa', 'nigeria', 'kenya',
            'south america', 'mexico', 'brazil', 'argentina',
            'european union', 'eu market', 'eurozone',
            'germany', 'german', 'france', 'french', 'spain', 'italy', 'poland',
            'singapore', 'malaysia', 'indonesia', 'thailand', 'vietnam', 'philippines',

            // === FINANCIAL SPAM ===
            'stock market', 'share price', 'quarterly earnings', 'ipo', 'nasdaq', 'nyse',
            'stock exchange', 'market cap', 'trading volume', 'investor relations',
            'cryptocurrency', 'bitcoin', 'blockchain', 'crypto',
            'forex', 'currency trading',

            // === SPAM/ADS ===
            'advertisement', 'sponsored', 'press release distribution', 'paid content',
            'free shipping', 'buy now', 'discount code', 'promo', 'limited offer',
            'click here', 'subscribe now', 'sign up free',

            // === NON-UK REGULATORY ===
            'ieee', 'ansi', 'csa', 'saa', 'ul certification', 'etl listed',
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
            const url = (article.visit_link || article.url || '').toLowerCase();

            // FIRST: Hard reject if contains Indian/non-UK indicators in text
            const hardRejectTerms = [
              'india', 'indian', 'mumbai', 'delhi', 'bangalore', 'hyderabad', 'chennai',
              'kolkata', 'pune', 'crore', 'lakh', 'rupee', '₹', 'sensex', 'nifty',
              'tata', 'reliance', 'adani', 'infosys', 'wipro',
              'times of india', 'hindustan times', 'economic times',
            ];
            if (hardRejectTerms.some(term => text.includes(term))) {
              return false;
            }

            // Check URL for UK domain - this is a strong positive signal
            const isUKDomain = url.includes('.co.uk') || url.includes('.gov.uk') || url.includes('.org.uk');

            // Strong UK indicators - REQUIRE at least one for non-.co.uk sources
            const ukIndicators = [
              // UK Regulations & Standards
              'bs 7671', 'bs7671', '18th edition', 'wiring regulations', 'part p',
              'building regulations', 'approved document',
              // UK Bodies
              'iet', 'niceic', 'napit', 'elecsa', 'stroma', 'hse', 'ofgem',
              'ecs card', 'jib', 'competent person scheme',
              // UK Geographic (specific)
              'united kingdom', 'british', 'england', 'scotland', 'wales', 'northern ireland',
              // UK Cities (major)
              'london', 'manchester', 'birmingham', 'leeds', 'liverpool',
              'glasgow', 'edinburgh', 'cardiff', 'belfast', 'bristol',
              'sheffield', 'newcastle', 'nottingham', 'leicester', 'coventry',
              'bradford', 'southampton', 'portsmouth', 'reading', 'milton keynes',
              // UK-specific terms
              'uk electrician', 'uk electrical', 'uk construction', 'uk project',
              'british standard', 'uk government', 'uk tender', 'uk contract',
              'nhs', 'network rail', 'hs2', 'crossrail', 'thames', 'heathrow',
              // UK currency (positive indicator)
              '£', 'gbp', 'pound sterling',
            ];

            const hasUKIndicator = ukIndicators.some(ind => text.includes(ind));

            // For UK domains, we're more lenient
            if (isUKDomain) {
              return true; // Trust UK domains unless hard-rejected above
            }

            // For non-UK domains (like .com), REQUIRE a UK indicator
            return hasUKIndicator;
          };

            // Helper to detect source from URL
            const getSourceFromUrl = (url: string): { category: string; source: string } => {
              const urlLower = (url || '').toLowerCase();

              // Check against known UK sources
              if (urlLower.includes('electricaltimes.co.uk')) return { category: "Industry", source: "Electrical Times" };
              if (urlLower.includes('professional-electrician.com')) return { category: "Technical", source: "Professional Electrician" };
              if (urlLower.includes('electricalcontractingnews.com')) return { category: "Safety", source: "Electrical Contracting News" };
              if (urlLower.includes('constructionenquirer.com')) return { category: "Projects", source: "Construction Enquirer" };
              if (urlLower.includes('theconstructionindex.co.uk')) return { category: "Projects", source: "Construction Index" };
              if (urlLower.includes('building.co.uk')) return { category: "Projects", source: "Building" };
              if (urlLower.includes('bsria.com')) return { category: "Technical", source: "BSRIA" };
              if (urlLower.includes('voltimum.co.uk')) return { category: "Industry", source: "Voltimum UK" };
              if (urlLower.includes('iet.org')) return { category: "Technical", source: "IET" };
              if (urlLower.includes('niceic.com')) return { category: "Industry", source: "NICEIC" };
              if (urlLower.includes('napit.org')) return { category: "Industry", source: "NAPIT" };
              if (urlLower.includes('hse.gov.uk')) return { category: "Safety", source: "HSE" };

              // REJECT non-UK domains - comprehensive list
              const nonUkDomains = [
                // Indian domains & news
                '.in/', '.in?', '.co.in', '.org.in', '.net.in', '.gov.in',
                'thehindu', 'hindustantimes', 'indiatimes', 'timesofindia',
                'economictimes.com', 'livemint.com', 'moneycontrol.com',
                'ndtv.com', 'zeenews', 'indiatoday', 'indianexpress',
                'deccanherald', 'deccanchronicle', 'firstpost.com',
                'shiksha', 'jagranjosh', 'naukri.com', 'shine.com',
                'business-standard.com/india', 'financialexpress.com/india',
                // Other non-UK
                '.com.au', '.au/', '.us/', '.ca/', '.de/', '.fr/', '.jp/', '.cn/',
                '.com.sg', '.com.my', '.co.za', '.com.br', '.com.mx',
                '.ae/', '.sa/', '.qa/',
                // US news
                'reuters.com/world/us', 'apnews.com/hub/united-states',
              ];
              if (nonUkDomains.some(d => urlLower.includes(d))) {
                return { category: "REJECT", source: "REJECT" };
              }

              // Also reject if URL contains india-related paths
              const indianPaths = ['/india/', '/indian/', '/mumbai/', '/delhi/', '/bangalore/', '/asia/', '/apac/'];
              if (indianPaths.some(p => urlLower.includes(p))) {
                return { category: "REJECT", source: "REJECT" };
              }

              // Extract domain name as source for UK domains
              if (urlLower.includes('.co.uk') || urlLower.includes('.org.uk') || urlLower.includes('.gov.uk')) {
                const match = urlLower.match(/https?:\/\/(?:www\.)?([^\/\.]+)/);
                const domainName = match ? match[1].charAt(0).toUpperCase() + match[1].slice(1) : "UK News";
                return { category: "Industry", source: domainName };
              }

              return { category: "General", source: "Industry News" };
            };

            for (const result of status.data) {
            if (result.json && Array.isArray(result.json)) {
              // Get source from the scraped URL first
              const baseSourceInfo = getSourceFromUrl(result.url);

              const processedArticles = result.json
                .filter((article: any) => article.title && article.title.length > 10)
                .filter(isRelevantArticle)
                .filter(validateUKRelevance)
                .map((article: any) => {
                  // Get source from article URL if available, otherwise use base
                  const articleUrl = article.visit_link || article.url || result.url;
                  const sourceInfo = getSourceFromUrl(articleUrl);

                  // Skip rejected (non-UK) sources
                  if (sourceInfo.source === "REJECT") return null;

                  return {
                    title: article.title,
                    description: article.description,
                    url: articleUrl,
                    date: article.date,
                    imageUrl: article.imageUrl,
                    source_category: sourceInfo.category !== "General" ? sourceInfo.category : baseSourceInfo.category,
                    source_name: sourceInfo.source !== "Industry News" ? sourceInfo.source : baseSourceInfo.source,
                    source_url: result.url
                  };
                })
                .filter(Boolean);
              
              allArticles.push(...processedArticles);
              logger.info(`Processed articles from ${baseSourceInfo.source}`, { count: processedArticles.length });
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