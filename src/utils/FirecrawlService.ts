import FirecrawlApp from '@mendable/firecrawl-js';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  url: string;
  date_published: string;
  regulatory_body: string;
  category: string;
  keywords: string[];
  view_count: number;
  is_active: boolean;
}

interface CrawlResult {
  success: boolean;
  data?: NewsArticle[];
  error?: string;
  articlesFound?: number;
}

export class FirecrawlService {
  private static API_KEY_STORAGE_KEY = 'firecrawl_api_key';
  private static CACHE_KEY = 'cached_news_articles';
  private static CACHE_TIMESTAMP_KEY = 'cached_news_timestamp';
  private static CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
  private static firecrawlApp: FirecrawlApp | null = null;

  // Static categories for filtering
  static readonly CATEGORIES = {
    HSE: 'HSE',
    BS7671: 'BS7671', 
    IET: 'IET',
    MAJOR_PROJECTS: 'Major Projects'
  } as const;

  private static newsSources = [
    {
      name: 'HSE Electrical Safety',
      url: 'https://www.hse.gov.uk/electricity/',
      regulatoryBody: 'HSE',
      category: 'HSE'
    },
    {
      name: 'HSE Latest News',
      url: 'https://www.hse.gov.uk/news/',
      regulatoryBody: 'HSE', 
      category: 'HSE'
    },
    {
      name: 'IET BS7671 Updates',
      url: 'https://electrical.theiet.org/bs-7671/updates-to-18th-edition/',
      regulatoryBody: 'IET',
      category: 'BS7671'
    },
    {
      name: 'BS7671 Amendments',
      url: 'https://electrical.theiet.org/bs-7671/',
      regulatoryBody: 'IET',
      category: 'BS7671'
    },
    {
      name: 'IET Wiring Matters',
      url: 'https://electrical.theiet.org/wiring-matters/',
      regulatoryBody: 'IET',
      category: 'IET'
    },
    {
      name: 'IET Technical Updates',
      url: 'https://electrical.theiet.org/wiring-regulations/guidance-notes/',
      regulatoryBody: 'IET',
      category: 'IET'
    },
    {
      name: 'UK Government Tenders',
      url: 'https://www.find-tender.service.gov.uk/Search/Results?keywords=electrical',
      regulatoryBody: 'Government',
      category: 'Major Projects'
    },
    {
      name: 'Construction News Projects',
      url: 'https://www.constructionnews.co.uk/sectors/infrastructure',
      regulatoryBody: 'Construction News',
      category: 'Major Projects'
    },
    {
      name: 'Infrastructure Projects',
      url: 'https://www.gov.uk/government/collections/infrastructure-and-projects-authority-annual-report',
      regulatoryBody: 'Government',
      category: 'Major Projects'
    }
  ];

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
    this.firecrawlApp = new FirecrawlApp({ apiKey });
    console.log('Firecrawl API key saved successfully');
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static removeApiKey(): void {
    localStorage.removeItem(this.API_KEY_STORAGE_KEY);
    this.firecrawlApp = null;
  }

  static async testApiKey(apiKey: string): Promise<boolean> {
    try {
      console.log('Testing Firecrawl API key...');
      const testApp = new FirecrawlApp({ apiKey });
      
      // Test with a simple scrape
      const testResult = await testApp.scrapeUrl('https://www.gov.uk', {
        formats: ['markdown']
      });
      
      return testResult.success;
    } catch (error) {
      console.error('Error testing API key:', error);
      return false;
    }
  }

  static getCachedArticles(): NewsArticle[] {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      const timestamp = localStorage.getItem(this.CACHE_TIMESTAMP_KEY);
      
      if (!cached || !timestamp) return [];
      
      const cacheAge = Date.now() - parseInt(timestamp);
      if (cacheAge > this.CACHE_DURATION) {
        // Cache expired
        localStorage.removeItem(this.CACHE_KEY);
        localStorage.removeItem(this.CACHE_TIMESTAMP_KEY);
        return [];
      }
      
      return JSON.parse(cached);
    } catch (error) {
      console.error('Error reading cached articles:', error);
      return [];
    }
  }

  static setCachedArticles(articles: NewsArticle[]): void {
    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(articles));
      localStorage.setItem(this.CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch (error) {
      console.error('Error caching articles:', error);
    }
  }

  static async fetchLiveNews(onProgress?: (progress: { current: number; total: number; source: string }) => void): Promise<CrawlResult> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return { success: false, error: 'API key not found. Please configure your Firecrawl API key.' };
    }

    try {
      if (!this.firecrawlApp) {
        this.firecrawlApp = new FirecrawlApp({ apiKey });
      }

      const allArticles: NewsArticle[] = [];
      let articleIdCounter = 1;

      for (let i = 0; i < this.newsSources.length; i++) {
        const source = this.newsSources[i];
        
        onProgress?.({
          current: i + 1,
          total: this.newsSources.length,
          source: source.name
        });

        try {
          console.log(`Scraping ${source.name}...`);
          
          const result = await this.firecrawlApp.scrapeUrl(source.url, {
            formats: ['markdown', 'html'],
            waitFor: 3000
          });

          if (result.success && result.markdown) {
            // Parse the scraped content to extract articles
            const articles = this.parseScrapedContent({ markdown: result.markdown, url: source.url }, source);
            allArticles.push(...articles.map(article => ({
              ...article,
              id: `crawl_${articleIdCounter++}_${Date.now()}`
            })));
          }
        } catch (sourceError) {
          console.warn(`Failed to scrape ${source.name}:`, sourceError);
          // Continue with other sources
        }
      }

      // Cache the results
      this.setCachedArticles(allArticles);

      return {
        success: true,
        data: allArticles,
        articlesFound: allArticles.length
      };

    } catch (error) {
      console.error('Error fetching live news:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch live news'
      };
    }
  }

  private static parseScrapedContent(scrapedData: any, source: { name: string; regulatoryBody: string; category: string }): Omit<NewsArticle, 'id'>[] {
    const articles: Omit<NewsArticle, 'id'>[] = [];
    
    try {
      const content = scrapedData.markdown || scrapedData.html || '';
      
      // Enhanced content parsing based on source type
      let contentSections: string[] = [];
      
      if (source.regulatoryBody === 'HSE') {
        // HSE-specific parsing for safety bulletins and updates
        contentSections = content.split(/(?=Press release|Safety alert|Enforcement notice|Improvement notice)/gi);
      } else if (source.regulatoryBody === 'IET') {
        // IET-specific parsing for regulations and technical updates
        contentSections = content.split(/(?=Amendment|Update|Regulation|BS\s*7671|Wiring)/gi);
      } else if (source.category === 'Major Projects') {
        // Project-specific parsing for tenders and awards
        contentSections = content.split(/(?=Contract|Tender|Award|Project|£\d+)/gi);
      } else {
        // Default parsing
        contentSections = content.split(/\n\n|\n---\n|<hr>|<article/gi);
      }
      
      contentSections.forEach((section: string, index: number) => {
        const cleanSection = section.trim();
        if (cleanSection.length < 150) return; // Skip very short sections
        
        // Enhanced title extraction
        const lines = cleanSection.split('\n');
        let title = '';
        
        // Look for specific patterns based on source
        if (source.regulatoryBody === 'HSE') {
          const hseTitleMatch = lines.find(line => 
            /press release|safety alert|enforcement|electrical/gi.test(line) && 
            line.length > 10 && line.length < 200
          );
          title = hseTitleMatch?.replace(/^#+\s*|\*\*|\*|<[^>]*>/g, '').trim() || 
                  `HSE Safety Update - ${index + 1}`;
        } else if (source.regulatoryBody === 'IET') {
          const ietTitleMatch = lines.find(line => 
            /bs\s*7671|amendment|regulation|update|wiring/gi.test(line) && 
            line.length > 10 && line.length < 200
          );
          title = ietTitleMatch?.replace(/^#+\s*|\*\*|\*|<[^>]*>/g, '').trim() || 
                  `BS7671/IET Update - ${index + 1}`;
        } else if (source.category === 'Major Projects') {
          const projectTitleMatch = lines.find(line => 
            /contract|tender|award|project|£/gi.test(line) && 
            line.length > 10 && line.length < 200
          );
          title = projectTitleMatch?.replace(/^#+\s*|\*\*|\*|<[^>]*>/g, '').trim() || 
                  `Major Project Update - ${index + 1}`;
        } else {
          const titleMatch = lines.find(line => 
            line.startsWith('#') || 
            line.startsWith('**') || 
            (line.length > 20 && line.length < 200)
          );
          title = titleMatch?.replace(/^#+\s*|\*\*|\*|<[^>]*>/g, '').trim() || 
                  `Update from ${source.name} - ${index + 1}`;
        }
        
        // Content validation - ensure relevance to electrical industry
        const electricalKeywords = [
          'electrical', 'electricity', 'bs7671', 'wiring', 'regulation', 'safety', 
          'cable', 'circuit', 'installation', 'testing', 'inspection', 'pat', 
          'emergency lighting', 'fire alarm', 'earthing', 'bonding', 'rcbo', 'rcd',
          'amendment', 'compliance', 'certification', 'qualified electrician',
          'contract', 'tender', 'infrastructure', 'construction', 'project'
        ];
        
        const hasRelevantContent = electricalKeywords.some(keyword => 
          cleanSection.toLowerCase().includes(keyword.toLowerCase())
        );
        
        // Skip irrelevant content
        if (!hasRelevantContent || 
            title.toLowerCase().includes('cookie') || 
            title.toLowerCase().includes('navigation') ||
            title.toLowerCase().includes('search') ||
            title.toLowerCase().includes('menu')) {
          return;
        }
        
        // Extract keywords from content
        const foundKeywords = electricalKeywords.filter(keyword => 
          cleanSection.toLowerCase().includes(keyword.toLowerCase())
        );
        
        const summary = this.generateSummary(cleanSection);
        
        // Enhanced date extraction
        let publishedDate = new Date().toISOString();
        const dateMatch = cleanSection.match(/(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})/i);
        if (dateMatch) {
          const [, day, month, year] = dateMatch;
          publishedDate = new Date(`${month} ${day}, ${year}`).toISOString();
        }
        
        articles.push({
          title,
          summary,
          content: cleanSection,
          url: scrapedData.url || '',
          date_published: publishedDate,
          regulatory_body: source.regulatoryBody,
          category: source.category,
          keywords: foundKeywords,
          view_count: 0,
          is_active: true
        });
      });
      
      // Sort by relevance (more keywords = higher relevance) and limit results
      return articles
        .sort((a, b) => b.keywords.length - a.keywords.length)
        .slice(0, 4); // Limit to 4 articles per source
      
    } catch (error) {
      console.error('Error parsing scraped content:', error);
      return [];
    }
  }

  private static generateSummary(content: string): string {
    // Clean content first
    const cleanContent = content
      .replace(/<[^>]*>/g, ' ') // Remove HTML tags
      .replace(/\*\*|\*|_|#/g, '') // Remove markdown
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    const sentences = cleanContent.split(/[.!?]+/).filter(s => s.trim().length > 30);
    
    // Prioritize sentences with electrical keywords
    const electricalKeywords = ['electrical', 'bs7671', 'safety', 'regulation', 'amendment', 'project', 'contract'];
    const relevantSentences = sentences.filter(sentence => 
      electricalKeywords.some(keyword => 
        sentence.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    
    const sentencesToUse = relevantSentences.length > 0 ? relevantSentences.slice(0, 2) : sentences.slice(0, 2);
    const summary = sentencesToUse.join('. ').trim();
    
    if (summary.length > 200) {
      return summary.substring(0, 197) + '...';
    }
    
    return summary + (summary.endsWith('.') ? '' : '.');
  }

  static isApiKeyConfigured(): boolean {
    return !!this.getApiKey();
  }

  static getCacheAge(): number {
    const timestamp = localStorage.getItem(this.CACHE_TIMESTAMP_KEY);
    if (!timestamp) return -1;
    return Date.now() - parseInt(timestamp);
  }

  static isCacheValid(): boolean {
    const age = this.getCacheAge();
    return age >= 0 && age < this.CACHE_DURATION;
  }
}