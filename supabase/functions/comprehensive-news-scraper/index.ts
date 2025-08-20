import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import FirecrawlApp from 'https://esm.sh/@mendable/firecrawl-js@1.29.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enhanced content quality filtering
function isQualityContent(title: string, content: string, url: string): boolean {
  const lowQualityIndicators = [
    'page not found', '404', 'error', 'access denied', 'not available',
    'coming soon', 'under construction', 'maintenance', 'temporarily unavailable',
    'cookies', 'privacy policy', 'terms of service', 'javascript required',
    'enable cookies', 'browser not supported', 'loading', 'please wait'
  ];
  
  const titleLower = title.toLowerCase();
  const contentLower = content.toLowerCase();
  
  // Check for low-quality indicators
  if (lowQualityIndicators.some(indicator => 
    titleLower.includes(indicator) || contentLower.includes(indicator)
  )) {
    return false;
  }
  
  // Check minimum content requirements
  if (title.trim().length < 10 || content.trim().length < 100) {
    return false;
  }
  
  // Check for navigation or boilerplate content
  if (contentLower.includes('skip to main content') || 
      contentLower.includes('breadcrumb') ||
      contentLower.includes('site navigation') ||
      (contentLower.includes('menu') && contentLower.includes('home'))) {
    return false;
  }
  
  return true;
}

// Generate stable external ID for articles
function generateExternalId(title: string, sourceUrl: string, category: string, timestamp?: string): string {
  const cleanTitle = title.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 50);
  const sourceIdentifier = new URL(sourceUrl).hostname.replace('www.', '');
  const timeStamp = timestamp ? new Date(timestamp).getTime() : Date.now();
  return `${sourceIdentifier}_${category}_${cleanTitle}_${timeStamp}`.toLowerCase();
}

// Generate content hash for duplicate detection using crypto API
async function generateContentHash(title: string, sourceUrl: string, content: string): Promise<string> {
  const combinedContent = title.trim() + '|' + sourceUrl + '|' + content.trim().substring(0, 1000);
  const encoder = new TextEncoder();
  const data = encoder.encode(combinedContent);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Check for existing articles to prevent duplicates
async function checkExistingArticles(supabase: any): Promise<Set<string>> {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const { data, error } = await supabase
      .from('industry_news')
      .select('external_id, content_hash, title')
      .gte('created_at', thirtyDaysAgo.toISOString());
    
    if (error) {
      console.error('Error fetching existing articles:', error);
      return new Set();
    }
    
    const existingIds = new Set<string>();
    data?.forEach(article => {
      if (article.external_id) existingIds.add(article.external_id);
      if (article.content_hash) existingIds.add(article.content_hash);
      // Also add title for basic duplicate checking
      if (article.title) existingIds.add(article.title.toLowerCase().trim());
    });
    
    console.log(`Found ${existingIds.size} existing article identifiers for duplicate checking`);
    return existingIds;
  } catch (error) {
    console.error('Error checking existing articles:', error);
    return new Set();
  }
}

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
  content_hash?: string;
}

interface NewsSource {
  name: string;
  url: string;
  category: 'HSE' | 'BS7671' | 'IET';
  regulatory_body: string;
}

const NEWS_SOURCES: NewsSource[] = [
  // HSE Updates - Using the exact URL requested
  {
    name: 'HSE Press Releases',
    url: 'https://press.hse.gov.uk/',
    category: 'HSE',
    regulatory_body: 'Health and Safety Executive'
  },
  
  // BS7671 Updates - Using the exact URL requested  
  {
    name: 'BS7671 Wiring Regulations',
    url: 'https://electrical.theiet.org/wiring-regulations/',
    category: 'BS7671',
    regulatory_body: 'Institution of Engineering and Technology'
  },
  
  // IET Updates - Using the exact URL requested
  {
    name: 'IET Technical Updates',
    url: 'https://electrical.theiet.org/',
    category: 'IET',
    regulatory_body: 'Institution of Engineering and Technology'
  }
];

// Major Projects (UK) - ContractsFinder API integration
async function fetchContractFinderProjects(): Promise<ProcessedArticle[]> {
  try {
    console.log('Fetching UK contracts from ContractsFinder API...');
    
    // ContractsFinder API endpoint for electrical/construction contracts
    const apiUrl = 'https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search' +
      '?keyword=electrical%20OR%20construction%20OR%20infrastructure%20OR%20power' +
      '&limit=10' +
      '&orderBy=publishedDate' +
      '&orderDirection=desc';
    
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Elec-Mate Industry News Scraper'
      }
    });

    if (!response.ok) {
      console.warn(`ContractsFinder API error: ${response.status}`);
      return [];
    }

    const data = await response.json();
    
    if (!data.releases || !Array.isArray(data.releases)) {
      console.warn('No valid contract data received');
      return [];
    }

    const articles: ProcessedArticle[] = [];
    
    for (const contract of data.releases.slice(0, 5)) {
      try {
        const tender = contract.tender || {};
        const title = tender.title || contract.ocid || 'UK Infrastructure Contract';
        const description = tender.description || contract.description || 'Major infrastructure contract awarded';
        const value = tender.value?.amount ? `£${(tender.value.amount / 1000000).toFixed(1)}M` : 'Value TBC';
        const publishDate = contract.date || tender.tenderPeriod?.startDate || new Date().toISOString();
        
        // Enhanced content with contract details
        const content = `
**Contract Title:** ${title}

**Description:** ${description}

**Contract Value:** ${value}

**Procurement Details:**
- Contract ID: ${contract.ocid}
- Publishing Date: ${new Date(publishDate).toLocaleDateString()}
- Status: ${tender.status || 'Active'}

**Electrical Scope:**
This major infrastructure project includes significant electrical installation and maintenance work, representing opportunities for UK electrical contractors and the broader construction industry.

**Why This Matters:**
Major public sector contracts like this drive innovation in electrical installation practices and often set new standards for safety and technical compliance across the industry.
        `.trim();

        const articleTitle = `${title} - ${value}`;
        const contractUrl = 'https://www.contractsfinder.service.gov.uk/Search';
        
        articles.push({
          title: articleTitle,
          summary: `Major UK infrastructure contract: ${description.substring(0, 150)}...`,
          content,
          regulatory_body: 'UK Government - ContractsFinder',
          category: 'Major Projects',
          external_id: generateExternalId(articleTitle, contractUrl, 'Major Projects', publishDate),
          source_url: contractUrl,
          external_url: `https://www.contractsfinder.service.gov.uk/Notice/${contract.ocid}`,
          date_published: publishDate,
          content_hash: await generateContentHash(articleTitle, contractUrl, content)
        });
      } catch (contractError) {
        console.warn('Error processing contract:', contractError);
      }
    }
    
    console.log(`Extracted ${articles.length} contracts from ContractsFinder`);
    return articles;
    
  } catch (error) {
    console.error('ContractsFinder API error:', error);
    return [];
  }
}

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

      // Convert AI response to ProcessedArticle format with quality filtering
      const processedArticles: ProcessedArticle[] = [];
      
      for (let index = 0; index < Math.min(parsedArticles.length, 4); index++) {
        const article = parsedArticles[index];
        if (article.relevance_score < 6) continue;
        
        const title = article.title || `${source.category} Update ${index + 1}`;
        const content = article.content || 'Content not available';
        
        // Apply quality filtering
        if (!isQualityContent(title, content, source.url)) {
          continue;
        }
        
        const publishDate = article.date_mentioned ? 
          new Date(article.date_mentioned).toISOString() : 
          new Date().toISOString();
        
        processedArticles.push({
          title,
          summary: article.summary || content.substring(0, 200) + '...',
          content,
          regulatory_body: source.regulatory_body,
          category: source.category,
          external_id: generateExternalId(title, source.url, source.category, publishDate),
          source_url: source.url,
          external_url: source.url,
          date_published: publishDate,
          content_hash: await generateContentHash(title, source.url, content)
        });
      }

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

async function basicContentParsing(rawContent: string, source: NewsSource): Promise<ProcessedArticle[]> {
  console.log(`Using basic parsing for ${source.name}`);
  
  const articles: ProcessedArticle[] = [];
  
  try {
    // Split content into sections based on source type
    let sections: string[] = [];
    
    if (source.category === 'HSE') {
      sections = rawContent.split(/(?=Press release|Safety alert|Enforcement notice|Improvement notice|News:|Update:)/gi);
    } else if (source.category === 'BS7671' || source.category === 'IET') {
      sections = rawContent.split(/(?=Amendment|Update|Regulation|BS\s*7671|Wiring|Edition|Guidance)/gi);
    } else {
      sections = rawContent.split(/\n\n+|\n---+\n/);
    }
    
    const relevantKeywords = [
      'electrical', 'electricity', 'bs7671', 'wiring', 'regulation', 'safety',
      'cable', 'circuit', 'installation', 'testing', 'inspection', 'amendment',
      'compliance', 'certification', 'contractor', 'electrician', 'project',
      'tender', 'contract', 'infrastructure', 'construction', 'power', 'energy'
    ];
    
    for (let index = 0; index < sections.length && articles.length < 3; index++) {
      const cleanSection = sections[index].trim();
      if (cleanSection.length < 200) continue;
      
      // Check relevance
      const hasRelevantContent = relevantKeywords.some(keyword =>
        cleanSection.toLowerCase().includes(keyword.toLowerCase())
      );
      
      if (!hasRelevantContent) continue;
      
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
      
      // Apply quality filtering before adding
      if (isQualityContent(title, cleanSection, source.url)) {
        const publishDate = new Date().toISOString();
        
        articles.push({
          title,
          summary,
          content: cleanSection,
          regulatory_body: source.regulatory_body,
          category: source.category,
          external_id: generateExternalId(title, source.url, source.category, publishDate),
          source_url: source.url,
          external_url: source.url,
          date_published: publishDate,
          content_hash: await generateContentHash(title, source.url, cleanSection)
        });
      }
    }
    
    return articles;
    
  } catch (error) {
    console.error(`Basic parsing error for ${source.name}:`, error);
    return [];
  }
}

async function scrapeAndProcessSource(source: NewsSource, firecrawl: FirecrawlApp): Promise<ProcessedArticle[]> {
  try {
    console.log(`Scraping ${source.name}...`);
    
    // First, scrape the main category page
    const scrapeResponse = await firecrawl.scrapeUrl(source.url, {
      formats: ['markdown'],
      onlyMainContent: true,
      waitFor: 2000,
      timeout: 30000
    });

    if (!scrapeResponse.success) {
      console.error(`Failed to scrape ${source.name}:`, scrapeResponse.error);
      return [];
    }

    const rawContent = scrapeResponse.markdown;
    if (!rawContent || rawContent.length < 500) {
      console.warn(`Insufficient content from ${source.name}`);
      return [];
    }

    console.log(`Scraped ${rawContent.length} characters from ${source.name}`);
    
    // Parse content intelligently
    const articles = await intelligentContentParsing(rawContent, source);
    
    console.log(`Processed ${articles.length} articles from ${source.name}`);
    return articles;

  } catch (error) {
    console.error(`Error scraping ${source.name}:`, error);
    return [];
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    console.log('Starting comprehensive news scraping...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration');
    }

    if (!firecrawlApiKey) {
      throw new Error('Missing Firecrawl API key');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const firecrawl = new FirecrawlApp({ apiKey: firecrawlApiKey });

    const allProcessedArticles: ProcessedArticle[] = [];
    let totalProcessed = 0;
    let totalInserted = 0;
    let totalErrors = 0;
    
    // Check existing articles for duplicate prevention
    console.log('Checking existing articles for duplicate prevention...');
    const existingArticles = await checkExistingArticles(supabase);

    // First, fetch UK Major Projects from ContractsFinder API
    console.log('Fetching Major Projects from ContractsFinder API...');
    try {
      const contractsArticles = await fetchContractFinderProjects();
      allProcessedArticles.push(...contractsArticles);
      totalProcessed += contractsArticles.length;
      console.log(`Added ${contractsArticles.length} contract articles`);
    } catch (contractError) {
      console.error('ContractsFinder fetch error:', contractError);
      totalErrors++;
    }

    // Process traditional news sources in batches to avoid overwhelming the API
    const batchSize = 2;
    for (let i = 0; i < NEWS_SOURCES.length; i += batchSize) {
      const batch = NEWS_SOURCES.slice(i, i + batchSize);
      console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(NEWS_SOURCES.length / batchSize)}`);
      
      // Process batch in parallel
      const batchPromises = batch.map(source => scrapeAndProcessSource(source, firecrawl));
      const batchResults = await Promise.all(batchPromises);
      
      // Flatten and add to results
      batchResults.forEach(articles => {
        allProcessedArticles.push(...articles);
        totalProcessed += articles.length;
      });
      
      // Rate limiting between batches
      if (i + batchSize < NEWS_SOURCES.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    // Filter out duplicates before insertion
    console.log(`Filtering ${allProcessedArticles.length} articles for duplicates...`);
    const uniqueArticles = allProcessedArticles.filter(article => {
      const isDuplicate = existingArticles.has(article.external_id) || 
                         (article.content_hash && existingArticles.has(article.content_hash)) ||
                         existingArticles.has(article.title.toLowerCase().trim());
      
      if (isDuplicate) {
        console.log(`Duplicate article filtered: ${article.title}`);
        return false;
      }
      
      // Add to existing set to prevent duplicates within this batch
      existingArticles.add(article.external_id);
      if (article.content_hash) existingArticles.add(article.content_hash);
      existingArticles.add(article.title.toLowerCase().trim());
      
      return true;
    });

    console.log(`Inserting ${uniqueArticles.length} unique articles into database (filtered ${allProcessedArticles.length - uniqueArticles.length} duplicates)...`);
    
    for (const article of uniqueArticles) {
      try {
        const { error: insertError } = await supabase
          .from('industry_news')
          .insert({
            title: article.title,
            summary: article.summary,
            content: article.content,
            category: article.category,
            regulatory_body: article.regulatory_body,
            external_id: article.external_id,
            source_url: article.source_url,
            external_url: article.external_url,
            date_published: article.date_published,
            source_name: article.regulatory_body,
            relevance_score: 8, // Default high relevance for scraped content
            content_quality: 7,   // Default good quality
            is_active: true,
            content_hash: article.content_hash
          });

        if (insertError) {
          // Check if it's a duplicate constraint error
          if (insertError.code === '23505') {
            console.log(`Duplicate constraint prevented insertion: ${article.title}`);
          } else {
            console.error('Insert error:', insertError);
            totalErrors++;
          }
        } else {
          totalInserted++;
        }
      } catch (insertError) {
        console.error('Database insert error:', insertError);
        totalErrors++;
      }
    }

    const executionTime = Date.now() - startTime;
    console.log(`Scraping complete: ${totalProcessed} processed, ${totalInserted} inserted, ${totalErrors} errors`);

    return new Response(
      JSON.stringify({
        success: true,
        articlesProcessed: totalProcessed,
        articlesInserted: totalInserted,
        errors: totalErrors,
        executionTime,
        timestamp: new Date().toISOString()
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
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});