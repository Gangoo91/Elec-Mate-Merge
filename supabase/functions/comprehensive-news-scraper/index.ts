import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import FirecrawlApp from 'https://esm.sh/@mendable/firecrawl-js@1.29.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enhanced content quality filtering - more permissive for regulatory content
function isQualityContent(title: string, content: string, url: string): boolean {
  const lowQualityIndicators = [
    'page not found', '404', 'error', 'access denied', 'not available',
    'coming soon', 'under construction', 'maintenance', 'temporarily unavailable',
    'javascript required', 'enable javascript', 'browser not supported'
  ];
  
  const titleLower = title.toLowerCase();
  const contentLower = content.toLowerCase();
  
  // Check for low-quality indicators
  if (lowQualityIndicators.some(indicator => 
    titleLower.includes(indicator) || contentLower.includes(indicator)
  )) {
    return false;
  }
  
  // More lenient minimum content requirements for regulatory content
  if (title.trim().length < 5 || content.trim().length < 50) {
    return false;
  }
  
  // Skip obvious navigation content but be more permissive
  if (contentLower.includes('skip to main content') && contentLower.length < 200) {
    return false;
  }
  
  // Allow content that contains regulatory keywords even if short
  const regulatoryKeywords = [
    'safety alert', 'enforcement notice', 'amendment', 'regulation', 'bs7671',
    'electrical safety', 'hazard', 'warning', 'recall', 'guidance'
  ];
  
  if (regulatoryKeywords.some(keyword => 
    titleLower.includes(keyword) || contentLower.includes(keyword)
  )) {
    return true;
  }
  
  return true; // Be more permissive overall
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

// RSS Feed parsing function
async function parseRSSFeed(url: string, source: NewsSource): Promise<ProcessedArticle[]> {
  try {
    console.log(`Parsing RSS feed for ${source.name}...`);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Elec-Mate Industry News Aggregator',
        'Accept': 'application/rss+xml, application/xml, text/xml'
      }
    });

    if (!response.ok) {
      console.error(`RSS fetch failed for ${source.name}: ${response.status}`);
      return [];
    }

    const xmlText = await response.text();
    console.log(`Fetched ${xmlText.length} characters from RSS feed`);
    
    // Parse RSS/Atom XML manually (simple regex-based parsing)
    const items: ProcessedArticle[] = [];
    
    // Match RSS items or Atom entries
    const itemMatches = xmlText.match(/<item[\s\S]*?<\/item>|<entry[\s\S]*?<\/entry>/gi);
    
    if (!itemMatches) {
      console.warn(`No RSS items found in ${source.name} feed`);
      return [];
    }

    for (let i = 0; i < Math.min(itemMatches.length, 5); i++) {
      const item = itemMatches[i];
      
      try {
        // Extract title
        const titleMatch = item.match(/<title[^>]*>(.*?)<\/title>/is);
        const title = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim() : `${source.category} Update ${i + 1}`;
        
        // Extract description/summary
        const descMatch = item.match(/<description[^>]*>(.*?)<\/description>|<summary[^>]*>(.*?)<\/summary>/is);
        const description = descMatch ? (descMatch[1] || descMatch[2]).replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').replace(/<[^>]*>/g, '').trim() : '';
        
        // Extract link
        const linkMatch = item.match(/<link[^>]*>(.*?)<\/link>|<link[^>]*href="([^"]*)"[^>]*\/>/is);
        const link = linkMatch ? (linkMatch[1] || linkMatch[2]).trim() : source.fallbackUrl || '';
        
        // Extract publication date
        const pubDateMatch = item.match(/<pubDate[^>]*>(.*?)<\/pubDate>|<published[^>]*>(.*?)<\/published>/is);
        const pubDate = pubDateMatch ? (pubDateMatch[1] || pubDateMatch[2]).trim() : new Date().toISOString();
        
        // Filter for electrical industry relevance
        const relevantKeywords = [
          'electrical', 'electricity', 'bs7671', 'wiring', 'regulation', 'safety',
          'cable', 'circuit', 'installation', 'testing', 'inspection', 'amendment',
          'compliance', 'certification', 'contractor', 'electrician', 'hazard',
          'shock', 'electrocution', 'fire', 'switchgear', 'distribution'
        ];
        
        const content = `${title} ${description}`.toLowerCase();
        const isRelevant = relevantKeywords.some(keyword => content.includes(keyword));
        
        if (!isRelevant) {
          console.log(`Skipping non-electrical article: ${title.substring(0, 50)}...`);
          continue;
        }
        
        if (!isQualityContent(title, description, link)) {
          continue;
        }
        
        const processedDate = new Date(pubDate).toISOString();
        const articleContent = `**${title}**\n\n${description}\n\nSource: ${source.regulatory_body}\nCategory: ${source.category}\nPublished: ${new Date(processedDate).toLocaleDateString()}`;
        
        items.push({
          title: title.substring(0, 150),
          summary: description.substring(0, 200) + (description.length > 200 ? '...' : ''),
          content: articleContent,
          regulatory_body: source.regulatory_body,
          category: source.category,
          external_id: generateExternalId(title, link, source.category, processedDate),
          source_url: source.fallbackUrl || '',
          external_url: link,
          date_published: processedDate,
          content_hash: await generateContentHash(title, link, articleContent)
        });
      } catch (itemError) {
        console.warn(`Error parsing RSS item ${i}:`, itemError);
      }
    }
    
    console.log(`Extracted ${items.length} relevant articles from RSS feed`);
    return items;
    
  } catch (error) {
    console.error(`RSS parsing error for ${source.name}:`, error);
    return [];
  }
}

interface NewsSource {
  name: string;
  searchQuery: string;
  category: 'HSE' | 'BS7671' | 'IET' | 'Safety' | 'Major Projects';
  regulatory_body: string;
  domainFilter?: string;
  fallbackUrl?: string;
  rssUrl?: string;
}

// Enhanced Firecrawl Search-based news sources with targeted queries
const SEARCH_SOURCES: NewsSource[] = [
  // HSE Updates - Target real safety alerts and enforcement
  {
    name: 'HSE Safety Alerts', 
    searchQuery: 'HSE update (Health and Safety Executive) news, electrical safety alert, enforcement notice',
    category: 'HSE',
    regulatory_body: 'Health and Safety Executive',
    fallbackUrl: 'https://www.hse.gov.uk/electricity/'
  },
  {
    name: 'HSE Press Releases',
    searchQuery: 'HSE electrical safety OR Health Safety Executive electrical OR HSE enforcement electrical',
    category: 'HSE',
    regulatory_body: 'Health and Safety Executive',
    fallbackUrl: 'https://press.hse.gov.uk/'
  },
  
  // BS7671 Updates - Target wiring regulations and amendments
  {
    name: 'BS7671 Updates',
    searchQuery: 'BS7671 updates, wiring regulations amendment, 18th edition electrical',
    category: 'BS7671',
    regulatory_body: 'Institution of Engineering and Technology',
    fallbackUrl: 'https://electrical.theiet.org/bs-7671/'
  },
  {
    name: 'IET Wiring Matters',
    searchQuery: 'IET wiring matters OR electrical installation standards OR BS7671 guidance',
    category: 'BS7671',
    regulatory_body: 'Institution of Engineering and Technology',
    fallbackUrl: 'https://electrical.theiet.org/wiring-matters/'
  },
  
  // IET Technical Updates
  {
    name: 'IET Engineering News',
    searchQuery: 'IET updates, electrical engineering news, Institution Engineering Technology',
    category: 'IET',
    regulatory_body: 'Institution of Engineering and Technology',
    fallbackUrl: 'https://eandt.theiet.org/news/'
  },
  
  // Major UK Projects
  {
    name: 'UK Major Projects',
    searchQuery: 'major UK work awarded projects recent news, electrical infrastructure contract',
    category: 'Major Projects',
    regulatory_body: 'UK Government Contracts',
    fallbackUrl: 'https://www.contractsfinder.service.gov.uk/Search'
  }
];

// Enhanced Firecrawl Search API integration matching the exact format from your example
async function searchWithFirecrawl(source: NewsSource, firecrawlApiKey: string): Promise<ProcessedArticle[]> {
  try {
    console.log(`Searching for: ${source.searchQuery}`);
    
    const payload = {
      query: source.searchQuery,
      sources: ["news"],
      limit: source.category === 'Major Projects' ? 8 : 10,
      scrapeOptions: {
        onlyMainContent: true,
        maxAge: 172800000, // 2 days in milliseconds
        parsers: ["pdf"],
        formats: []
      }
    };

    const response = await fetch('https://api.firecrawl.dev/v2/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error(`Firecrawl search failed for ${source.name}: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    console.log(`Firecrawl search returned status: ${data.status}, found ${data.news?.length || 0} news results for ${source.name}`);
    
    if (!data.news || !Array.isArray(data.news)) {
      console.warn(`No news results from Firecrawl for ${source.name}`);
      return [];
    }

    const articles: ProcessedArticle[] = [];
    
    for (let i = 0; i < Math.min(data.news.length, 5); i++) {
      const result = data.news[i];
      
      try {
        const title = result.title || `${source.category} Update ${i + 1}`;
        const description = result.snippet || '';
        const url = result.url || source.fallbackUrl || '';
        const publishDate = result.date ? new Date(result.date).toISOString() : new Date().toISOString();
        
        // Filter for electrical relevance - more permissive for HSE and regulatory sources
        const relevantKeywords = [
          'electrical', 'electricity', 'bs7671', 'wiring', 'regulation', 'safety',
          'cable', 'circuit', 'installation', 'testing', 'inspection', 'amendment',
          'compliance', 'certification', 'contractor', 'electrician', 'hazard',
          'shock', 'fire', 'switchgear', 'distribution', 'engineering', 'infrastructure',
          'hse', 'health', 'iet', 'construction', 'building'
        ];
        
        const textToCheck = `${title} ${description}`.toLowerCase();
        const isRelevant = relevantKeywords.some(keyword => textToCheck.includes(keyword)) || 
                          source.category === 'HSE' || 
                          source.category === 'BS7671' || 
                          source.category === 'IET';
        
        if (!isRelevant && source.category === 'Major Projects') {
          // For major projects, be more selective
          const projectKeywords = ['electrical', 'power', 'infrastructure', 'construction', 'engineering'];
          const isProjectRelevant = projectKeywords.some(keyword => textToCheck.includes(keyword));
          if (!isProjectRelevant) {
            console.log(`Skipping non-electrical project: ${title.substring(0, 50)}...`);
            continue;
          }
        }
        
        if (!isQualityContent(title, description, url)) {
          continue;
        }
        
        let enhancedContent: string;
        
        if (source.category === 'HSE') {
          enhancedContent = `**${title}**

${description}

**Health and Safety Executive Update**

This is an official HSE update relevant to the electrical industry. HSE provides crucial safety guidance, enforcement notices, and regulatory updates that directly impact electrical contractors, engineers, and safety professionals.

**Why This Matters:**
HSE updates help electrical professionals stay compliant with current safety regulations and learn from industry incidents to prevent future accidents.

**Source:** ${source.regulatory_body}
**Category:** ${source.category}
**Published:** ${new Date(publishDate).toLocaleDateString()}
**URL:** ${url}`;
        } else if (source.category === 'BS7671') {
          enhancedContent = `**${title}**

${description}

**BS7671 Wiring Regulations Update**

This update relates to the BS7671 Requirements for Electrical Installations (IET Wiring Regulations), the UK standard for electrical installation work.

**Why This Matters:**
BS7671 compliance is mandatory for all electrical installation work in the UK. Updates and amendments ensure electrical safety and legal compliance.

**Source:** ${source.regulatory_body}
**Category:** ${source.category}
**Published:** ${new Date(publishDate).toLocaleDateString()}
**URL:** ${url}`;
        } else if (source.category === 'IET') {
          enhancedContent = `**${title}**

${description}

**Institution of Engineering and Technology Update**

The IET provides professional development, technical guidance, and industry insights for electrical engineers and technicians.

**Why This Matters:**
IET updates keep electrical professionals informed about technological advances, industry standards, and professional development opportunities.

**Source:** ${source.regulatory_body}
**Category:** ${source.category}
**Published:** ${new Date(publishDate).toLocaleDateString()}
**URL:** ${url}`;
        } else {
          // Standard content formatting for Major Projects and Safety
          enhancedContent = `**${title}**

${description}

**Industry Update**

${description.length > 100 ? 'This update provides valuable insights for electrical industry professionals.' : 'Key information for the electrical industry.'}

**Source:** ${source.regulatory_body}
**Category:** ${source.category}
**Published:** ${new Date(publishDate).toLocaleDateString()}
**URL:** ${url}`;
        }
        
        articles.push({
          title: title.substring(0, 150),
          summary: description.substring(0, 200) + (description.length > 200 ? '...' : ''),
          content: enhancedContent,
          regulatory_body: source.regulatory_body,
          category: source.category,
          external_id: generateExternalId(title, url, source.category, publishDate),
          source_url: source.fallbackUrl || url,
          external_url: url,
          date_published: publishDate,
          content_hash: await generateContentHash(title, url, enhancedContent)
        });
        
      } catch (resultError) {
        console.warn(`Error processing search result ${i}:`, resultError);
      }
    }
    
    console.log(`Extracted ${articles.length} articles from Firecrawl search for ${source.name}`);
    return articles;
    
  } catch (error) {
    console.error(`Firecrawl search error for ${source.name}:`, error);
    return [];
  }
}

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
    
    const prompt = `Extract relevant UK electrical industry news from this content from ${source.name}:

${rawContent.substring(0, 6000)}

Find 2-4 electrical industry articles. Return ONLY valid JSON:

[
  {
    "title": "Clear article title",
    "summary": "Brief summary in 1-2 sentences", 
    "content": "Full article text with context",
    "category": "${source.category}",
    "keywords": ["electrical", "safety"],
    "relevance_score": 8,
    "date_mentioned": "2024-01-15 or null"
  }
]

Focus on: safety alerts, BS7671 updates, electrical regulations, industry warnings, technical guidance.
Ignore: navigation, cookies, unrelated content.
relevance_score: 6-10 (6=somewhat relevant, 10=very relevant)`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'user', content: prompt }
        ],
        max_tokens: 3000,
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      console.error(`OpenAI API error: ${response.status} ${response.statusText}`);
      return basicContentParsing(rawContent, source);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content?.trim();
    
    if (!aiResponse) {
      console.error('No response from OpenAI');
      return basicContentParsing(rawContent, source);
    }

    console.log('AI Response:', aiResponse.substring(0, 500));

    try {
      // Clean the AI response to handle markdown formatting
      let cleanResponse = aiResponse;
      if (cleanResponse.includes('```json')) {
        cleanResponse = cleanResponse.replace(/.*```json\s*/s, '').replace(/\s*```.*$/s, '');
      } else if (cleanResponse.includes('```')) {
        cleanResponse = cleanResponse.replace(/.*```\s*/s, '').replace(/\s*```.*$/s, '');
      }
      
      const parsedArticles = JSON.parse(cleanResponse);
      
      if (!Array.isArray(parsedArticles)) {
        console.error('AI response is not an array, got:', typeof parsedArticles);
        return basicContentParsing(rawContent, source);
      }

      // Convert AI response to ProcessedArticle format
      const processedArticles: ProcessedArticle[] = [];
      
      for (let index = 0; index < Math.min(parsedArticles.length, 4); index++) {
        const article = parsedArticles[index];
        
        // Skip low relevance articles
        if (article.relevance_score && article.relevance_score < 6) {
          console.log(`Skipping low relevance article: ${article.title}`);
          continue;
        }
        
        const title = article.title || `${source.category} Update ${index + 1}`;
        const content = article.content || article.summary || 'Content not available';
        
        // More lenient quality filtering for regulatory content
        if (title.length < 5 || content.length < 30) {
          console.log(`Skipping short article: ${title}`);
          continue;
        }
        
        let publishDate: string;
        try {
          publishDate = article.date_mentioned && article.date_mentioned !== 'null' ? 
            new Date(article.date_mentioned).toISOString() : 
            new Date().toISOString();
        } catch {
          publishDate = new Date().toISOString();
        }
        
        processedArticles.push({
          title: title.substring(0, 150),
          summary: (article.summary || content.substring(0, 200)) + '...',
          content,
          regulatory_body: source.regulatory_body,
          category: source.category,
          external_id: generateExternalId(title, source.fallbackUrl || '', source.category, publishDate),
          source_url: source.fallbackUrl || '',
          external_url: source.fallbackUrl || '',
          date_published: publishDate,
          content_hash: await generateContentHash(title, source.fallbackUrl || '', content)
        });
      }

      console.log(`AI extracted ${processedArticles.length} articles from ${source.name}`);
      return processedArticles;

    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.log('Raw AI Response:', aiResponse);
      console.log('Using fallback basic parsing...');
      return basicContentParsing(rawContent, source);
    }

  } catch (error) {
    console.error(`AI parsing error for ${source.name}:`, error);
    return basicContentParsing(rawContent, source);
  }
}

async function basicContentParsing(rawContent: string, source: NewsSource): Promise<ProcessedArticle[]> {
  console.log(`Using fallback basic parsing for ${source.name}`);
  
  const articles: ProcessedArticle[] = [];
  
  try {
    // Split content into sections based on source type
    let sections: string[] = [];
    
    if (source.category === 'HSE') {
      sections = rawContent.split(/(?=Press release|Safety alert|Enforcement notice|News|Alert|Warning)/gi);
    } else if (source.category === 'BS7671') {
      sections = rawContent.split(/(?=Amendment|Update|Regulation|BS\s*7671|Wiring|Edition|Guidance)/gi);
    } else if (source.category === 'IET') {
      sections = rawContent.split(/(?=News|Update|Article|Technology|Engineering|Professional)/gi);
    } else {
      sections = rawContent.split(/\n\n+|\n---+\n/);
    }
    
    const relevantKeywords = [
      'electrical', 'electricity', 'bs7671', 'wiring', 'regulation', 'safety',
      'cable', 'circuit', 'installation', 'testing', 'inspection', 'amendment',
      'compliance', 'certification', 'contractor', 'electrician', 'hazard',
      'shock', 'fire', 'switchgear', 'distribution', 'engineering'
    ];
    
    for (let index = 0; index < sections.length && articles.length < 3; index++) {
      const cleanSection = sections[index].trim();
      if (cleanSection.length < 100) continue; // More lenient
      
      // Check relevance
      const hasRelevantContent = relevantKeywords.some(keyword =>
        cleanSection.toLowerCase().includes(keyword.toLowerCase())
      );
      
      if (!hasRelevantContent) continue;
      
      // Extract title - more flexible
      const lines = cleanSection.split('\n').filter(line => line.trim().length > 0);
      let title = lines.find(line => 
        line.length > 5 && line.length < 200 &&
        !line.toLowerCase().includes('skip to') &&
        !line.toLowerCase().includes('cookie')
      )?.replace(/^#+\s*|\*\*|\*|<[^>]*>/g, '').trim();
      
      if (!title) {
        title = `${source.category} Industry Update ${index + 1}`;
      }
      
      // Generate summary
      const summary = cleanSection
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .substring(0, 150)
        .trim() + '...';
      
      const publishDate = new Date().toISOString();
      
      // Enhanced content with context
      const enhancedContent = `**${title}**\n\n${cleanSection}\n\n**Source:** ${source.regulatory_body}\n**Category:** ${source.category}\n**Published:** ${new Date().toLocaleDateString()}`;
      
      articles.push({
        title: title.substring(0, 150),
        summary,
        content: enhancedContent,
        regulatory_body: source.regulatory_body,
        category: source.category,
          external_id: generateExternalId(title, source.fallbackUrl || '', source.category, publishDate),
          source_url: source.fallbackUrl || '',
          external_url: source.fallbackUrl || '',
          date_published: publishDate,
          content_hash: await generateContentHash(title, source.fallbackUrl || '', enhancedContent)
      });
    }
    
    console.log(`Basic parsing extracted ${articles.length} articles from ${source.name}`);
    return articles;
    
  } catch (error) {
    console.error(`Basic parsing error for ${source.name}:`, error);
    return [];
  }
}

async function scrapeAndProcessSource(source: NewsSource, firecrawl: FirecrawlApp): Promise<ProcessedArticle[]> {
  try {
    console.log(`Processing ${source.name}...`);
    
    // Try RSS feed first if available
    if (source.rssUrl) {
      console.log(`Attempting RSS feed for ${source.name}`);
      const rssArticles = await parseRSSFeed(source.rssUrl, source);
      if (rssArticles.length > 0) {
        console.log(`Successfully got ${rssArticles.length} articles from RSS feed`);
        return rssArticles;
      }
      console.log(`RSS feed failed, falling back to web scraping`);
    }
    
    // Fallback to web scraping
    if (!source.fallbackUrl) {
      console.warn(`No fallback URL available for ${source.name}`);
      return [];
    }
    
    console.log(`Web scraping ${source.name}...`);
    const scrapeResponse = await firecrawl.scrapeUrl(source.fallbackUrl, {
      formats: ['markdown'],
      onlyMainContent: true,
      waitFor: 3000,
      timeout: 45000
    });

    if (!scrapeResponse.success) {
      console.error(`Failed to scrape ${source.name}:`, scrapeResponse.error);
      return [];
    }

    const rawContent = scrapeResponse.data?.markdown || scrapeResponse.data?.content || '';
    
    if (!rawContent || rawContent.length < 100) {
      console.warn(`No substantial content from ${source.name} (${rawContent.length} chars)`);
      return [];
    }

    console.log(`Scraped ${rawContent.length} characters from ${source.name}`);
    
    // Use intelligent parsing with AI
    return await intelligentContentParsing(rawContent, source);
    
  } catch (error) {
    console.error(`Error processing ${source.name}:`, error);
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

    // Process search-based news sources using Firecrawl Search API
    console.log('Starting Firecrawl Search API processing...');
    const batchSize = 2;
    for (let i = 0; i < SEARCH_SOURCES.length; i += batchSize) {
      const batch = SEARCH_SOURCES.slice(i, i + batchSize);
      console.log(`Processing search batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(SEARCH_SOURCES.length / batchSize)}`);
      
      // Process batch in parallel using Firecrawl Search
      const batchPromises = batch.map(source => {
        // First try Firecrawl Search API
        return searchWithFirecrawl(source, firecrawlApiKey).catch(async (searchError) => {
          console.error(`Search failed for ${source.name}, trying fallback:`, searchError);
          
          // Fallback to RSS feed or skip if search fails
          if (source.rssUrl) {
            console.log(`Trying RSS fallback for ${source.name}`);
            return parseRSSFeed(source.rssUrl, source);
          }
          
          return [];
        });
      });
      
      const batchResults = await Promise.all(batchPromises);
      
      // Flatten and add to results
      batchResults.forEach(articles => {
        allProcessedArticles.push(...articles);
        totalProcessed += articles.length;
      });
      
      // Rate limiting between batches to respect API limits
      if (i + batchSize < SEARCH_SOURCES.length) {
        await new Promise(resolve => setTimeout(resolve, 3000));
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