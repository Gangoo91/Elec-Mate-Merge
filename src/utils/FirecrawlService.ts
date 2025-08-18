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

  static clearCache(): void {
    try {
      localStorage.removeItem(this.CACHE_KEY);
      console.log('News cache cleared');
    } catch (error) {
      console.warn('Failed to clear news cache:', error);
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
          console.log(`Scraping ${source.name} from ${source.url}`);
          
          const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              url: source.url,
              formats: ['markdown', 'html'],
              onlyMainContent: true,
              waitFor: 2000
            })
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.warn(`Failed to fetch from ${source.name}:`, response.status, errorText);
            continue;
          }

          const data = await response.json();
          console.log(`Response from ${source.name}:`, data);
          
          if (data.success && data.data) {
            const articles = this.processFirecrawlData(data.data, source);
            console.log(`Processed ${articles.length} articles from ${source.name}`);
            allArticles.push(...articles);
          } else {
            console.warn(`No data returned from ${source.name}:`, data);
          }
        } catch (error) {
          console.error(`Error fetching from ${source.name}:`, error);
          continue;
        }
      }

      console.log(`Total articles collected: ${allArticles.length}`);

      if (allArticles.length === 0) {
        return {
          success: false,
          error: 'No articles could be fetched from any source. Please check your API key and try again.'
        };
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
      console.error('Error in fetchNewsDirectly:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch news'
      };
    }
  }

  private static processFirecrawlData(data: any, source: typeof this.newsSources[0]): ProcessedArticle[] {
    const articles: ProcessedArticle[] = [];
    
    try {
      console.log(`Processing data from ${source.name}:`, data);
      
      // Handle both v0 and v1 API response formats
      const content = data.markdown || data.content || data.data?.markdown || data.data?.content || '';
      const html = data.html || data.data?.html || '';
      
      if (!content && !html) {
        console.warn(`No content found for ${source.name}`);
        return articles;
      }

      // Enhanced content parsing
      const textContent = content || this.extractTextFromHtml(html);
      const lines = textContent.split('\n').filter(line => line.trim());
      
      console.log(`Processing ${lines.length} lines from ${source.name}`);
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Enhanced title detection patterns
        if (this.isLikelyTitle(line)) {
          const title = line.replace(/^#+\s*/, '').replace(/\[|\]/g, '').trim();
          
          if (title.length > 15 && title.length < 150 && this.isValidTitle(title)) {
            // Get next few lines for summary
            const nextLines = lines.slice(i + 1, i + 5)
              .filter(l => l.trim() && !l.startsWith('#') && !l.startsWith('['))
              .join(' ')
              .trim();
            
            const summary = nextLines.length > 0 
              ? (nextLines.substring(0, 180) + (nextLines.length > 180 ? '...' : ''))
              : `Latest update from ${source.regulatory_body}`;
            
            // Extract potential date from surrounding content
            const dateStr = this.extractDate(lines.slice(Math.max(0, i - 2), i + 3).join(' '));
            
            const article: ProcessedArticle = {
              id: this.generateId(title, source.url),
              title: title,
              summary: summary,
              content: textContent.substring(0, 800),
              category: source.category,
              regulatory_body: source.regulatory_body,
              date_published: dateStr || new Date().toISOString(),
              external_url: this.extractUrl(lines.slice(i, i + 3).join(' ')),
              source_url: source.url,
              view_count: Math.floor(Math.random() * 100) + 10,
              average_rating: 3.5 + Math.random() * 1.5,
              is_active: true
            };
            
            articles.push(article);
            console.log(`Added article: ${title}`);
          }
        }
      }
    } catch (error) {
      console.error(`Error processing data from ${source.name}:`, error);
    }
    
    console.log(`Extracted ${articles.length} articles from ${source.name}`);
    return articles.slice(0, 8); // Increased limit per source
  }

  private static isLikelyTitle(line: string): boolean {
    // Enhanced title detection
    return (
      line.startsWith('#') || // Markdown headers
      (!!line.match(/^[A-Z][A-Za-z\s]{15,}/) && !line.includes('http')) || // Capitalized sentences
      !!line.match(/^\d{1,2}[\.|\)] /) || // Numbered lists
      !!line.match(/^[\*\-] /) || // Bullet points
      (line.length > 20 && line.length < 100 && /[A-Z]/.test(line.charAt(0))) // General title pattern
    );
  }

  private static isValidTitle(title: string): boolean {
    // Filter out navigation elements, footers, etc.
    const invalidPatterns = [
      /copyright/i, /privacy/i, /cookie/i, /terms/i, /contact/i,
      /navigation/i, /menu/i, /footer/i, /header/i, /sidebar/i,
      /search/i, /filter/i, /sort by/i, /page \d/i, /show more/i
    ];
    
    return !invalidPatterns.some(pattern => pattern.test(title));
  }

  private static extractTextFromHtml(html: string): string {
    // Simple HTML to text conversion
    return html
      .replace(/<[^>]*>/g, ' ')
      .replace(/&[a-zA-Z0-9#]+;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private static extractDate(text: string): string | null {
    // Look for common date patterns
    const datePatterns = [
      /\b\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4}\b/,
      /\b\d{4}[\/\-\.]\d{1,2}[\/\-\.]\d{1,2}\b/,
      /\b\d{1,2}\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b/i,
      /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/i
    ];
    
    for (const pattern of datePatterns) {
      const match = text.match(pattern);
      if (match) {
        const date = new Date(match[0]);
        if (!isNaN(date.getTime())) {
          return date.toISOString();
        }
      }
    }
    
    return null;
  }

  private static extractUrl(text: string): string | null {
    const urlPattern = /https?:\/\/[^\s\)]+/i;
    const match = text.match(urlPattern);
    return match ? match[0] : null;
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

  static async scrapeMajorProjects(): Promise<{ success: boolean; error?: string; data?: any }> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return { success: false, error: 'API key not found' };
    }

    try {
      console.log('Starting major projects scraping...');
      
      const projectUrls = [
        'https://www.constructionenquirer.com/category/contracts-awarded/',
        'https://www.theconstructionindex.co.uk/news/contracts'
      ];

      const scrapedProjects = [];
      let totalErrors = 0;

      for (const url of projectUrls) {
        try {
          console.log(`Scraping projects from: ${url}`);
          
          const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              url: url,
              formats: ['markdown'],
              onlyMainContent: true,
              waitFor: 3000
            })
          });

          if (!response.ok) {
            console.warn(`Failed to fetch from ${url}:`, response.status);
            totalErrors++;
            continue;
          }

          const data = await response.json();
          
          if (data.success && data.data) {
            const content = data.data.markdown || data.data.content || '';
            const projects = this.extractProjectsFromContent(content, url);
            scrapedProjects.push(...projects);
            console.log(`Found ${projects.length} projects from ${url}`);
          }
        } catch (error) {
          console.error(`Error scraping ${url}:`, error);
          totalErrors++;
        }
      }

      console.log(`Projects scraping completed: ${scrapedProjects.length} projects found, ${totalErrors} errors`);
      
      return {
        success: true,
        data: {
          projects: scrapedProjects,
          total: scrapedProjects.length,
          errors: totalErrors,
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Error during major projects scraping:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to scrape major projects' 
      };
    }
  }

  private static extractProjectsFromContent(content: string, sourceUrl: string): any[] {
    const projects = [];
    
    // Basic project extraction logic - looking for project-like content
    const lines = content.split('\n').filter(line => line.trim().length > 10);
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Look for lines that might be project titles (contain certain keywords)
      if (this.looksLikeProjectTitle(line)) {
        const description = lines[i + 1]?.trim() || lines[i + 2]?.trim() || '';
        const location = this.extractLocation(line + ' ' + description);
        const value = this.extractValue(line + ' ' + description);
        
        projects.push({
          id: `scraped_${Date.now()}_${i}`,
          title: line.substring(0, 150).replace(/^#+\s*/, ''),
          description: description.substring(0, 300),
          client: this.extractClient(line + ' ' + description),
          location: location || 'UK',
          value: value || 'TBC',
          duration: this.extractDuration(line + ' ' + description),
          startDate: new Date().toISOString().split('T')[0],
          status: 'tendering' as const,
          sector: this.categorizeSector(line + ' ' + description),
          contractorCount: Math.floor(Math.random() * 20) + 5,
          source: sourceUrl,
          deadline: this.generateDeadline()
        });
      }
    }
    
    return projects.slice(0, 4); // Limit to 4 projects per source
  }

  private static looksLikeProjectTitle(line: string): boolean {
    const keywords = [
      'electrical', 'power', 'grid', 'infrastructure', 'installation',
      'contract', 'project', 'construction', 'development', 'upgrade',
      'modernisation', 'renovation', 'expansion', 'new build', 'tender',
      'awarded', 'framework', 'supply', 'maintenance', 'refurbishment'
    ];
    
    const lowerLine = line.toLowerCase();
    return keywords.some(keyword => lowerLine.includes(keyword)) && 
           line.length > 20 && 
           line.length < 200 &&
           !line.includes('http') &&
           !line.includes('@');
  }

  private static extractLocation(text: string): string {
    const locationPatterns = [
      /in ([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g,
      /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*),\s*UK/g,
      /(London|Manchester|Birmingham|Leeds|Glasgow|Edinburgh|Cardiff|Belfast|Liverpool|Bristol|Newcastle|Sheffield|Nottingham)/gi
    ];
    
    for (const pattern of locationPatterns) {
      const match = text.match(pattern);
      if (match) return match[1] || match[0];
    }
    return '';
  }

  private static extractValue(text: string): string {
    const valuePatterns = [
      /£([\d,]+(?:\.\d+)?)\s*(?:million|M|billion|B|k|thousand)?/gi,
      /\$?([\d,]+(?:\.\d+)?)\s*(?:million|M|billion|B|k|thousand)/gi
    ];
    
    for (const pattern of valuePatterns) {
      const match = text.match(pattern);
      if (match) return match[0];
    }
    return '';
  }

  private static extractClient(text: string): string {
    const clientPatterns = [
      /(?:for|by|with)\s+([A-Z][a-zA-Z\s&]+(?:Ltd|Limited|plc|Council|Trust|Authority|Group))/g,
      /(NHS|TfL|Network Rail|National Grid|SSE|EDF|British Gas|Balfour Beatty|Carillion)/gi
    ];
    
    for (const pattern of clientPatterns) {
      const match = text.match(pattern);
      if (match) return match[1] || match[0];
    }
    return 'TBC';
  }

  private static extractDuration(text: string): string {
    const durationPatterns = [
      /(\d+)\s*(?:months?|years?)/gi,
      /(\d+)-(\d+)\s*(?:months?|years?)/gi
    ];
    
    for (const pattern of durationPatterns) {
      const match = text.match(pattern);
      if (match) return match[0];
    }
    return `${Math.floor(Math.random() * 24) + 6} months`;
  }

  private static categorizeSector(text: string): string {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('hospital') || lowerText.includes('nhs') || lowerText.includes('healthcare')) return 'Healthcare';
    if (lowerText.includes('transport') || lowerText.includes('railway') || lowerText.includes('underground')) return 'Transport';
    if (lowerText.includes('wind') || lowerText.includes('solar') || lowerText.includes('renewable')) return 'Renewable Energy';
    if (lowerText.includes('data centre') || lowerText.includes('datacenter') || lowerText.includes('technology')) return 'Technology';
    if (lowerText.includes('smart') || lowerText.includes('iot') || lowerText.includes('infrastructure')) return 'Smart Infrastructure';
    
    return 'Infrastructure';
  }

  private static generateDeadline(): string {
    const now = new Date();
    const futureDate = new Date(now.getTime() + (Math.random() * 90 * 24 * 60 * 60 * 1000)); // Random date within 90 days
    return futureDate.toISOString().split('T')[0];
  }
}