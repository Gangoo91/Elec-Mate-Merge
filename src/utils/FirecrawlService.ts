import FirecrawlApp from '@mendable/firecrawl-js';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  url: string;
  date_published: string;
  regulatory_body: string;
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

  private static newsSources = [
    {
      name: 'IET Wiring Matters',
      url: 'https://electrical.theiet.org/wiring-matters',
      regulatoryBody: 'IET'
    },
    {
      name: 'HSE Electrical Safety',
      url: 'https://www.hse.gov.uk/electricity',
      regulatoryBody: 'HSE'
    },
    {
      name: 'GOV.UK Energy',
      url: 'https://www.gov.uk/government/organisations/department-for-energy-security-and-net-zero',
      regulatoryBody: 'GOV.UK'
    },
    {
      name: 'NICEIC Technical',
      url: 'https://www.niceic.com/find-an-installer',
      regulatoryBody: 'NICEIC'
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

  private static parseScrapedContent(scrapedData: any, source: { name: string; regulatoryBody: string }): Omit<NewsArticle, 'id'>[] {
    const articles: Omit<NewsArticle, 'id'>[] = [];
    
    try {
      const content = scrapedData.markdown || scrapedData.html || '';
      
      // Simple parsing - look for headings and content blocks
      const lines = content.split('\n');
      let currentTitle = '';
      let currentContent = '';
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        
        // Detect headings that might be article titles
        if (trimmedLine.match(/^#+\s+/) || trimmedLine.match(/^[A-Z][^.!?]*$/)) {
          // Save previous article if we have one
          if (currentTitle && currentContent) {
            articles.push({
              title: currentTitle.replace(/^#+\s*/, '').trim(),
              summary: this.generateSummary(currentContent),
              content: currentContent.trim(),
              url: scrapedData.url || '',
              date_published: new Date().toISOString(),
              regulatory_body: source.regulatoryBody,
              view_count: 0,
              is_active: true
            });
          }
          
          // Start new article
          currentTitle = trimmedLine;
          currentContent = '';
        } else if (trimmedLine.length > 0) {
          // Add content to current article
          currentContent += trimmedLine + ' ';
        }
      }
      
      // Don't forget the last article
      if (currentTitle && currentContent) {
        articles.push({
          title: currentTitle.replace(/^#+\s*/, '').trim(),
          summary: this.generateSummary(currentContent),
          content: currentContent.trim(),
          url: scrapedData.url || '',
          date_published: new Date().toISOString(),
          regulatory_body: source.regulatoryBody,
          view_count: 0,
          is_active: true
        });
      }
      
      // Filter out very short or invalid articles
      return articles.filter(article => 
        article.title.length > 10 && 
        article.content.length > 50 &&
        !article.title.toLowerCase().includes('cookie') &&
        !article.title.toLowerCase().includes('privacy')
      );
      
    } catch (error) {
      console.error('Error parsing scraped content:', error);
      return [];
    }
  }

  private static generateSummary(content: string): string {
    // Generate a summary from the first few sentences
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const summary = sentences.slice(0, 2).join('. ').trim();
    return summary.length > 150 ? summary.substring(0, 147) + '...' : summary + '.';
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