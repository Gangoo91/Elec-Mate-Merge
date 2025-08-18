interface FirecrawlArticle {
  title: string;
  content: string;
  url: string;
  publishedDate?: string;
  description?: string;
}

interface FirecrawlResponse {
  success: boolean;
  data?: any[];
  error?: string;
}

interface ProcessedArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  regulatory_body: string;
  date_published: string;
  external_url: string | null;
  source_url: string | null;
  view_count: number;
  average_rating: number;
  is_active: boolean;
}

export class FirecrawlService {
  private static API_KEY_STORAGE_KEY = 'firecrawl_api_key';
  private static CACHE_KEY = 'industry_news_cache';
  private static CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

  private static newsSources = [
    {
      name: 'HSE',
      url: 'https://www.hse.gov.uk/news/',
      category: 'HSE',
      regulatory_body: 'HSE'
    },
    {
      name: 'BS7671',
      url: 'https://www.gov.uk/government/collections/bs-7671',
      category: 'BS7671',
      regulatory_body: 'BEIS'
    },
    {
      name: 'IET',
      url: 'https://www.theiet.org/news/',
      category: 'IET',
      regulatory_body: 'IET'
    },
    {
      name: 'Major Projects Just Awarded',
      url: 'https://www.constructionenquirer.com/category/contracts-awarded/',
      category: 'Major Projects',
      regulatory_body: 'Industry'
    },
    {
      name: 'Major Projects Just Awarded',
      url: 'https://www.theconstructionindex.co.uk/news/contracts',
      category: 'Major Projects',
      regulatory_body: 'Industry'
    }
  ];

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static getCachedNews(): ProcessedArticle[] | null {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > this.CACHE_DURATION;
      
      if (isExpired) {
        localStorage.removeItem(this.CACHE_KEY);
        return null;
      }

      return data;
    } catch {
      return null;
    }
  }

  static setCachedNews(articles: ProcessedArticle[]): void {
    try {
      const cacheData = {
        data: articles,
        timestamp: Date.now()
      };
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to cache news data:', error);
    }
  }

  static async fetchNewsDirectly(
    onProgress?: (message: string, current: number, total: number) => void
  ): Promise<{ success: boolean; articles?: ProcessedArticle[]; error?: string }> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      return {
        success: false,
        error: 'Firecrawl API key not configured. Please add your API key in settings.'
      };
    }

    try {
      const allArticles: ProcessedArticle[] = [];
      const total = this.newsSources.length;

      for (let i = 0; i < this.newsSources.length; i++) {
        const source = this.newsSources[i];
        
        if (onProgress) {
          onProgress(`Fetching from ${source.name}...`, i + 1, total);
        }

        try {
          const response = await fetch('https://api.firecrawl.dev/v0/scrape', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              url: source.url,
              formats: ['markdown'],
              onlyMainContent: true
            })
          });

          if (!response.ok) {
            console.warn(`Failed to fetch from ${source.name}:`, response.statusText);
            continue;
          }

          const data: FirecrawlResponse = await response.json();
          
          if (data.success && data.data) {
            const articles = this.processFirecrawlData(data.data, source);
            allArticles.push(...articles);
          }
        } catch (error) {
          console.warn(`Error fetching from ${source.name}:`, error);
          continue;
        }
      }

      // Remove duplicates and sort by date
      const uniqueArticles = this.removeDuplicates(allArticles);
      const sortedArticles = uniqueArticles.sort((a, b) => 
        new Date(b.date_published).getTime() - new Date(a.date_published).getTime()
      ).slice(0, 20); // Limit to 20 most recent

      // Cache the results
      this.setCachedNews(sortedArticles);

      return {
        success: true,
        articles: sortedArticles
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch news'
      };
    }
  }

  private static processFirecrawlData(data: any[], source: typeof this.newsSources[0]): ProcessedArticle[] {
    const articles: ProcessedArticle[] = [];
    
    try {
      // Process the scraped content to extract articles
      const content = data[0]?.markdown || data[0]?.content || '';
      
      // Simple content parsing - extract titles and links
      const lines = content.split('\n').filter(line => line.trim());
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Look for titles (markdown headers or lines with certain patterns)
        if (line.startsWith('#') || line.match(/^[A-Z].{20,}/)) {
          const title = line.replace(/^#+\s*/, '').trim();
          
          if (title.length > 10 && title.length < 200) {
            // Get next few lines for summary
            const nextLines = lines.slice(i + 1, i + 4).join(' ').trim();
            const summary = nextLines.substring(0, 200) + (nextLines.length > 200 ? '...' : '');
            
            const article: ProcessedArticle = {
              id: this.generateId(title, source.url),
              title: title,
              summary: summary || 'No summary available',
              content: content.substring(0, 500),
              category: source.category,
              regulatory_body: source.regulatory_body,
              date_published: new Date().toISOString(),
              external_url: null,
              source_url: source.url,
              view_count: Math.floor(Math.random() * 100),
              average_rating: 3 + Math.random() * 2,
              is_active: true
            };
            
            articles.push(article);
          }
        }
      }
    } catch (error) {
      console.warn(`Error processing data from ${source.name}:`, error);
    }
    
    return articles.slice(0, 5); // Limit per source
  }

  private static generateId(title: string, url: string): string {
    const combined = title + url;
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString();
  }

  private static removeDuplicates(articles: ProcessedArticle[]): ProcessedArticle[] {
    const seen = new Set();
    return articles.filter(article => {
      const key = article.title.toLowerCase().trim();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }
}