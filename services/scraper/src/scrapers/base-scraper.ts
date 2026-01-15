import puppeteer, { Browser, Page } from 'puppeteer';
import { SupplierConfig } from '../config/suppliers.js';

/**
 * Base Scraper Class
 * Abstract class that all supplier scrapers extend
 */

export interface ScrapedProduct {
  sku: string;
  name: string;
  brand: string | null;
  category: string;
  subcategory: string | null;
  currentPrice: number | null;
  regularPrice: number | null;
  isOnSale: boolean;
  discountPercentage: number | null;
  description: string | null;
  highlights: string[];
  imageUrl: string | null;
  productUrl: string;
  stockStatus: string;
}

export interface ScrapedDeal {
  productSku: string | null;
  title: string;
  description: string | null;
  originalPrice: number | null;
  dealPrice: number;
  discountPercentage: number;
  dealType: 'deal_of_day' | 'flash_sale' | 'clearance' | 'weekly_deal';
  expiresAt: Date | null;
  sourceUrl: string;
}

export interface ScrapedCoupon {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed' | 'free_delivery';
  discountValue: number;
  minimumSpend: number | null;
  validUntil: Date | null;
  sourceUrl: string;
}

export interface ScrapeResult {
  products: ScrapedProduct[];
  deals: ScrapedDeal[];
  coupons: ScrapedCoupon[];
  errors: string[];
  duration: number;
}

// User agents to rotate
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
];

export abstract class BaseScraper {
  protected browser: Browser | null = null;
  protected config: SupplierConfig;
  protected errors: string[] = [];

  constructor(config: SupplierConfig) {
    this.config = config;
  }

  /**
   * Initialize the browser
   */
  async init(): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920,1080',
      ],
    });
  }

  /**
   * Close the browser
   */
  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  /**
   * Create a new page with anti-detection measures
   */
  protected async createPage(): Promise<Page> {
    if (!this.browser) {
      throw new Error('Browser not initialized. Call init() first.');
    }

    const page = await this.browser.newPage();

    // Set random user agent
    const userAgent = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
    await page.setUserAgent(userAgent);

    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });

    // Set extra headers
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-GB,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    });

    // Block unnecessary resources for faster loading
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const resourceType = request.resourceType();
      if (['image', 'stylesheet', 'font', 'media'].includes(resourceType)) {
        request.abort();
      } else {
        request.continue();
      }
    });

    return page;
  }

  /**
   * Navigate to URL with retry logic
   */
  protected async navigateWithRetry(
    page: Page,
    url: string,
    maxRetries = 3
  ): Promise<boolean> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await page.goto(url, {
          waitUntil: 'domcontentloaded',
          timeout: 30000,
        });
        return true;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`Navigation attempt ${attempt} failed for ${url}: ${errorMessage}`);

        if (attempt === maxRetries) {
          this.errors.push(`Failed to navigate to ${url} after ${maxRetries} attempts: ${errorMessage}`);
          return false;
        }

        // Wait before retry with exponential backoff
        await this.delay(1000 * attempt);
      }
    }
    return false;
  }

  /**
   * Wait for selector with timeout
   */
  protected async waitForSelector(
    page: Page,
    selector: string,
    timeout = 10000
  ): Promise<boolean> {
    try {
      await page.waitForSelector(selector, { timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Scroll page to load lazy content
   */
  protected async scrollToLoadAll(page: Page): Promise<void> {
    await page.evaluate(async () => {
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

      let lastHeight = 0;
      let currentHeight = document.body.scrollHeight;

      while (lastHeight !== currentHeight) {
        lastHeight = currentHeight;
        window.scrollTo(0, currentHeight);
        await delay(500);
        currentHeight = document.body.scrollHeight;
      }

      // Scroll back to top
      window.scrollTo(0, 0);
    });
  }

  /**
   * Rate limiting delay
   */
  protected async delay(ms?: number): Promise<void> {
    const delayMs = ms ?? this.config.rateLimit;
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }

  /**
   * Parse price string to number
   */
  protected parsePrice(priceText: string | null): number | null {
    if (!priceText) return null;

    // Remove currency symbols and clean up
    const cleaned = priceText
      .replace(/[£$€]/g, '')
      .replace(/,/g, '')
      .replace(/\s+/g, '')
      .trim();

    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? null : parsed;
  }

  /**
   * Calculate discount percentage
   */
  protected calculateDiscount(
    currentPrice: number | null,
    regularPrice: number | null
  ): number | null {
    if (!currentPrice || !regularPrice || regularPrice <= currentPrice) {
      return null;
    }
    return Math.round(((regularPrice - currentPrice) / regularPrice) * 100);
  }

  /**
   * Extract text from element
   */
  protected async extractText(
    page: Page,
    selector: string
  ): Promise<string | null> {
    try {
      return await page.$eval(selector, (el) => el.textContent?.trim() || null);
    } catch {
      return null;
    }
  }

  /**
   * Extract attribute from element
   */
  protected async extractAttribute(
    page: Page,
    selector: string,
    attribute: string
  ): Promise<string | null> {
    try {
      return await page.$eval(
        selector,
        (el, attr) => el.getAttribute(attr),
        attribute
      );
    } catch {
      return null;
    }
  }

  /**
   * Abstract methods - must be implemented by subclasses
   */
  abstract scrapeProducts(category?: string): Promise<ScrapedProduct[]>;
  abstract scrapeDeals(): Promise<ScrapedDeal[]>;
  abstract scrapeCoupons(): Promise<ScrapedCoupon[]>;

  /**
   * Run full scrape
   */
  async scrapeAll(): Promise<ScrapeResult> {
    const startTime = Date.now();
    this.errors = [];

    await this.init();

    try {
      const [products, deals, coupons] = await Promise.all([
        this.scrapeProducts().catch(e => {
          this.errors.push(`Products scrape failed: ${e.message}`);
          return [];
        }),
        this.scrapeDeals().catch(e => {
          this.errors.push(`Deals scrape failed: ${e.message}`);
          return [];
        }),
        this.scrapeCoupons().catch(e => {
          this.errors.push(`Coupons scrape failed: ${e.message}`);
          return [];
        }),
      ]);

      return {
        products,
        deals,
        coupons,
        errors: this.errors,
        duration: Date.now() - startTime,
      };
    } finally {
      await this.close();
    }
  }
}
