import { corsHeaders } from '../_shared/cors.ts';

interface ElectricalNewsSource {
  name: string;
  url: string;
  category: string;
  regulatoryBody: string;
  keywords: string[];
}

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  source_name: string;
  date_published: string;
  regulatory_body: string;
  view_count: number;
  average_rating: number;
  external_url: string;
}

const electricalNewsSources: ElectricalNewsSource[] = [
  {
    name: 'HSE Electrical Safety',
    url: 'https://www.hse.gov.uk/electricity/',
    category: 'Safety',
    regulatoryBody: 'HSE',
    keywords: ['electrical safety', 'accident', 'enforcement', 'guidance']
  },
  {
    name: 'IET BS7671 Updates',
    url: 'https://electrical.theiet.org/bs-7671/updates-to-18th-edition/',
    category: 'Regulation',
    regulatoryBody: 'IET',
    keywords: ['bs7671', 'amendment', 'regulation', 'wiring']
  },
  {
    name: 'Professional Electrician',
    url: 'https://www.electricianmagazine.co.uk/news/',
    category: 'Industry',
    regulatoryBody: 'Industry',
    keywords: ['electrician', 'industry', 'technology', 'training']
  },
  {
    name: 'Electrical Review News',
    url: 'https://www.electricalreview.co.uk/news/',
    category: 'Technology',
    regulatoryBody: 'Industry',
    keywords: ['electrical', 'technology', 'innovation', 'products']
  }
];

async function scrapeNewsSource(source: ElectricalNewsSource, apiKey: string): Promise<NewsArticle[]> {
  try {
    console.log(`Scraping ${source.name} from ${source.url}`);
    
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: source.url,
        formats: ['markdown', 'html'],
        extractorOptions: {
          mode: 'llm-extraction',
          extractionPrompt: `Extract electrical industry news articles with the following structure:
          - title: Article headline
          - summary: Brief 2-3 sentence summary
          - content: Full article content if available
          - date: Publication date
          - relevance: Score how relevant this is to electrical industry (1-10)
          Only include articles with relevance score 7 or higher.`,
        },
        waitFor: 3000,
        timeout: 30000
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Scraping failed');
    }

    return parseScrapedContent(data.data, source);
  } catch (error) {
    console.error(`Error scraping ${source.name}:`, error);
    return [];
  }
}

function parseScrapedContent(scrapedData: any, source: ElectricalNewsSource): NewsArticle[] {
  const articles: NewsArticle[] = [];
  
  try {
    const content = scrapedData.markdown || scrapedData.html || '';
    
    // Split content into sections based on common patterns
    const sections = content.split(/(?=News|Article|Press|Update|Alert|Published|Breaking)/gi);
    
    sections.forEach((section: string, index: number) => {
      const cleanSection = section.trim();
      if (cleanSection.length < 100) return;
      
      // Check for electrical relevance
      const hasRelevantKeywords = source.keywords.some(keyword => 
        cleanSection.toLowerCase().includes(keyword.toLowerCase())
      );
      
      if (!hasRelevantKeywords) return;
      
      // Extract title
      const lines = cleanSection.split('\n').filter(line => line.trim().length > 0);
      const titleLine = lines.find(line => 
        line.length > 10 && line.length < 200 && 
        !line.startsWith('http') && 
        !line.includes('cookie') &&
        !line.includes('navigation')
      );
      
      const title = titleLine ? 
        titleLine.replace(/^#+\s*|\*\*|\*|<[^>]*>/g, '').trim() : 
        `${source.name} Update ${index + 1}`;
      
      // Generate summary
      const sentences = cleanSection.split(/[.!?]+/).filter(s => s.trim().length > 30);
      const summary = sentences.slice(0, 2).join('. ').trim() + '.';
      
      // Extract date
      let publishedDate = new Date().toISOString();
      const dateMatch = cleanSection.match(/(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})/i);
      if (dateMatch) {
        const [, day, month, year] = dateMatch;
        publishedDate = new Date(`${month} ${day}, ${year}`).toISOString();
      }
      
      articles.push({
        id: `frontend-${Date.now()}-${index}`,
        title,
        summary: summary.length > 200 ? summary.substring(0, 197) + '...' : summary,
        content: cleanSection,
        category: source.category,
        source_name: source.name,
        date_published: publishedDate,
        regulatory_body: source.regulatoryBody,
        view_count: 0,
        average_rating: 0,
        external_url: source.url
      });
    });
    
    return articles.slice(0, 3); // Limit to 3 articles per source
    
  } catch (error) {
    console.error('Error parsing content:', error);
    return [];
  }
}

export default async function handler(req: Request) {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🔧 Frontend news scraper starting...');
    
    // Get Firecrawl API key from secrets
    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      throw new Error('FIRECRAWL_API_KEY not found in environment variables');
    }

    const allArticles: NewsArticle[] = [];
    const sourceResults: { source: string; success: boolean; articlesFound: number }[] = [];

    // Scrape each source
    for (const source of electricalNewsSources) {
      try {
        const articles = await scrapeNewsSource(source, apiKey);
        allArticles.push(...articles);
        sourceResults.push({
          source: source.name,
          success: true,
          articlesFound: articles.length
        });
        
        // Add delay between requests to be respectful
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Failed to scrape ${source.name}:`, error);
        sourceResults.push({
          source: source.name,
          success: false,
          articlesFound: 0
        });
      }
    }

    // Sort articles by date (newest first)
    allArticles.sort((a, b) => new Date(b.date_published).getTime() - new Date(a.date_published).getTime());

    console.log(`✅ Scraping completed. Found ${allArticles.length} total articles`);

    return new Response(
      JSON.stringify({
        success: true,
        articles: allArticles,
        totalArticles: allArticles.length,
        sourceResults,
        timestamp: new Date().toISOString(),
        message: `Successfully scraped ${allArticles.length} articles from ${sourceResults.filter(r => r.success).length} sources`
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('❌ Frontend news scraper error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        articles: [],
        totalArticles: 0
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
}