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

        articles.push({
          title: `${title} - ${value}`,
          summary: `Major UK infrastructure contract: ${description.substring(0, 150)}...`,
          content,
          regulatory_body: 'UK Government - ContractsFinder',
          category: 'Major Projects',
          external_id: `contracts-${contract.ocid}-${Date.now()}`,
          source_url: 'https://www.contractsfinder.service.gov.uk/Search',
          external_url: `https://www.contractsfinder.service.gov.uk/Notice/${contract.ocid}`,
          date_published: publishDate
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

async function extractArticleLinks(rawContent: string, source: NewsSource): Promise<string[]> {
  console.log(`Extracting article links from ${source.name}`);
  
  const links: string[] = [];
  
  try {
    // Extract potential article URLs from the content using regex patterns
    const urlPatterns = [
      // HSE press releases
      /https?:\/\/press\.hse\.gov\.uk\/[^\s"'<>]+/gi,
      // IET news articles
      /https?:\/\/theiet\.org\/news\/[^\s"'<>]+/gi,
      // BS7671 specific articles
      /https?:\/\/electrical\.theiet\.org\/[^\s"'<>]+/gi,
      // Construction news projects
      /https?:\/\/constructionnews\.co\.uk\/projects\/[^\s"'<>]+/gi,
      // General article patterns
      /https?:\/\/[^\/\s"'<>]+\/(?:news|press|articles?|updates?)\/[^\s"'<>]+/gi
    ];
    
    // Apply all patterns to find URLs
    urlPatterns.forEach(pattern => {
      const matches = rawContent.match(pattern) || [];
      matches.forEach(url => {
        // Clean up the URL and validate
        const cleanUrl = url.replace(/['"<>]$/, '').trim();
        if (cleanUrl && !links.includes(cleanUrl) && 
            cleanUrl !== source.url && 
            !cleanUrl.includes('cookie') && 
            !cleanUrl.includes('privacy') &&
            cleanUrl.length > source.url.length + 5) {
          links.push(cleanUrl);
        }
      });
    });
    
    // For sources that might not have absolute URLs, try to construct them
    const relativePatterns = [
      /href="(\/[^"]*(?:news|press|article|update)[^"]*?)"/gi,
      /href='(\/[^']*(?:news|press|article|update)[^']*?)'/gi
    ];
    
    relativePatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(rawContent)) !== null) {
        const relativePath = match[1];
        if (relativePath && relativePath.length > 10) {
          const fullUrl = new URL(relativePath, source.url).toString();
          if (!links.includes(fullUrl) && fullUrl !== source.url) {
            links.push(fullUrl);
          }
        }
      }
    });
    
    console.log(`Found ${links.length} potential article links from ${source.name}`);
    return links.slice(0, 8); // Limit to prevent too many requests
    
  } catch (error) {
    console.error(`Error extracting links from ${source.name}:`, error);
    return [];
  }
}

async function scrapeIndividualArticle(url: string, source: NewsSource, firecrawl: FirecrawlApp): Promise<ProcessedArticle | null> {
  try {
    console.log(`Scraping individual article: ${url}`);
    
    const scrapeResponse = await firecrawl.scrapeUrl(url, {
      formats: ['markdown'],
      onlyMainContent: true,
      waitFor: 2000,
      timeout: 30000
    });

    if (!scrapeResponse.success || !scrapeResponse.data?.markdown) {
      console.warn(`Failed to scrape article: ${url}`);
      return null;
    }

    const content = scrapeResponse.data.markdown;
    
    // Basic validation
    if (content.length < 200) {
      console.warn(`Article too short: ${url}`);
      return null;
    }

    // Extract title (first meaningful heading)
    const lines = content.split('\n').filter(line => line.trim());
    const title = lines.find(line => 
      line.startsWith('#') && 
      line.length > 10 && 
      line.length < 150 &&
      !line.toLowerCase().includes('cookie')
    )?.replace(/^#+\s*/, '').trim() || 
    lines.find(line => 
      line.length > 10 && 
      line.length < 150 &&
      !line.toLowerCase().includes('navigation')
    )?.trim() || 
    `${source.category} Article`;

    // Generate summary from first paragraph
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 50);
    const summary = paragraphs[0]?.replace(/^#+\s*/, '').substring(0, 200).trim() + '...' || 
                   content.substring(0, 200).trim() + '...';

    return {
      title,
      summary,
      content,
      regulatory_body: source.regulatory_body,
      category: source.category,
      external_id: `article-${source.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      source_url: source.url,
      external_url: url, // This is the key - individual article URL
      date_published: new Date().toISOString()
    };

  } catch (error) {
    console.error(`Error scraping individual article ${url}:`, error);
    return null;
  }
}

async function scrapeAndProcessSource(source: NewsSource, firecrawl: FirecrawlApp): Promise<ProcessedArticle[]> {
  try {
    console.log(`Scraping ${source.name}...`);
    
    // First, scrape the main category page
    const scrapeResponse = await firecrawl.scrapeUrl(source.url, {
      formats: ['markdown', 'html'],
      onlyMainContent: true,
      waitFor: 3000,
      timeout: 45000
    });

    if (!scrapeResponse.success) {
      console.error(`Failed to scrape ${source.url}:`, scrapeResponse.error);
      return [];
    }

    const rawContent = scrapeResponse.data?.markdown || scrapeResponse.data?.html || '';
    
    // More lenient content check - but validate quality
    if (rawContent.length < 200) {
      console.warn(`Insufficient content from ${source.url}: ${rawContent.length} chars`);
      return [];
    }

    // Check for common error indicators
    const errorIndicators = [
      'page not found',
      '404 error',
      'access denied',
      'cookies are required',
      'javascript is required',
      'please enable javascript',
      'your browser is not supported'
    ];
    
    const hasErrors = errorIndicators.some(indicator => 
      rawContent.toLowerCase().includes(indicator.toLowerCase())
    );
    
    if (hasErrors) {
      console.warn(`Error page detected from ${source.url}`);
      return [];
    }

    // Ensure content has electrical relevance - enhanced with government terms
    const electricalKeywords = [
      'electrical', 'electricity', 'bs7671', 'wiring', 'regulation', 'safety',
      'cable', 'circuit', 'installation', 'testing', 'inspection', 'amendment',
      'compliance', 'certification', 'contractor', 'electrician', 'project',
      'tender', 'contract', 'infrastructure', 'construction', 'power', 'energy',
      'hse', 'iet', 'napit', 'niceic', 'select',
      // Government and policy terms
      'building safety', 'policy', 'legislation', 'building regulations',
      'part p', 'competent person scheme', 'approved document', 'building control',
      'planning permission', 'net zero', 'decarbonisation', 'green energy',
      'government tender', 'public sector', 'framework agreement'
    ];
    
    const hasElectricalContent = electricalKeywords.some(keyword => 
      rawContent.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (!hasElectricalContent) {
      console.warn(`No electrical content found from ${source.url}`);
      return [];
    }

    // Extract individual article links from the category page
    const articleLinks = await extractArticleLinks(rawContent, source);
    console.log(`Found ${articleLinks.length} article links from ${source.name}`);
    
    const allArticles: ProcessedArticle[] = [];
    
    // If we found article links, scrape them individually
    if (articleLinks.length > 0) {
      console.log(`Scraping ${articleLinks.length} individual articles from ${source.name}`);
      
      // Scrape individual articles with rate limiting
      for (let i = 0; i < articleLinks.length; i++) {
        const articleUrl = articleLinks[i];
        const article = await scrapeIndividualArticle(articleUrl, source, firecrawl);
        
        if (article) {
          allArticles.push(article);
        }
        
        // Rate limiting between individual scrapes
        if (i < articleLinks.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      console.log(`Successfully scraped ${allArticles.length} individual articles from ${source.name}`);
    }
    
    // If we didn't get enough individual articles, fall back to AI parsing of the category page
    if (allArticles.length < 2) {
      console.log(`Falling back to AI parsing for ${source.name} (got ${allArticles.length} individual articles)`);
      const fallbackArticles = await intelligentContentParsing(rawContent, source);
      
      // Merge results, preferring individual articles
      fallbackArticles.forEach(fallbackArticle => {
        if (!allArticles.some(existing => existing.title === fallbackArticle.title)) {
          allArticles.push(fallbackArticle);
        }
      });
    }
    
    console.log(`Total processed ${allArticles.length} articles from ${source.name}`);
    return allArticles.slice(0, 5); // Limit total articles per source

  } catch (error) {
    console.error(`Error processing ${source.name}:`, error);
    // Don't return empty array immediately - try basic fallback
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