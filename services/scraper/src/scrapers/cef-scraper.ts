import { Page } from 'puppeteer';
import { BaseScraper, ScrapedProduct, ScrapedDeal, ScrapedCoupon } from './base-scraper.js';
import { SUPPLIERS } from '../config/suppliers.js';

/**
 * CEF (City Electrical Factors) Scraper
 * Large UK electrical wholesaler
 */

export class CEFScraper extends BaseScraper {
  constructor() {
    super(SUPPLIERS.cef);
  }

  /**
   * Scrape products from CEF
   */
  async scrapeProducts(category?: string): Promise<ScrapedProduct[]> {
    const products: ScrapedProduct[] = [];
    const page = await this.createPage();

    try {
      // CEF category URLs - expanded coverage
      const categoryUrls: Record<string, string[]> = {
        'hand-tools': [
          '/catalogue/products/hand-tools',
          '/catalogue/search?q=electricians+tools',
          '/catalogue/search?q=cable+cutters',
          '/catalogue/search?q=crimping+tools',
        ],
        'power-tools': [
          '/catalogue/products/power-tools',
          '/catalogue/search?q=drills',
          '/catalogue/search?q=sds+drill',
        ],
        'test-equipment': [
          '/catalogue/products/test-measurement',
          '/catalogue/search?q=multimeter',
          '/catalogue/search?q=insulation+tester',
          '/catalogue/search?q=loop+impedance',
          '/catalogue/search?q=fluke',
          '/catalogue/search?q=megger',
        ],
        'cables': [
          '/catalogue/products/cables-accessories',
          '/catalogue/search?q=twin+earth',
          '/catalogue/search?q=swa+cable',
          '/catalogue/search?q=flex',
        ],
        'consumer-units': [
          '/catalogue/search?q=consumer+unit',
          '/catalogue/search?q=mcb',
          '/catalogue/search?q=rcbo',
          '/catalogue/search?q=rcd',
        ],
        'lighting': [
          '/catalogue/products/lighting',
          '/catalogue/search?q=led+downlight',
          '/catalogue/search?q=emergency+lighting',
        ],
      };

      const categoriesToScrape = category
        ? { [category]: categoryUrls[category] || [] }
        : categoryUrls;

      for (const [categoryName, urls] of Object.entries(categoriesToScrape)) {
        for (const urlPath of urls) {
          const fullUrl = `${this.config.baseUrl}${urlPath}`;
          console.log(`Scraping CEF ${categoryName}: ${fullUrl}`);

          const categoryProducts = await this.scrapeProductPage(page, fullUrl, categoryName);
          products.push(...categoryProducts);

          await this.delay();
        }
      }
    } finally {
      await page.close();
    }

    console.log(`CEF: Scraped ${products.length} products total`);
    return products;
  }

  /**
   * Scrape a single product listing page
   */
  private async scrapeProductPage(
    page: Page,
    url: string,
    category: string
  ): Promise<ScrapedProduct[]> {
    const products: ScrapedProduct[] = [];

    const success = await this.navigateWithRetry(page, url);
    if (!success) return products;

    // Wait for products
    await this.waitForSelector(page, '.product-item, .product-card, [data-product-id]', 5000);
    await this.scrollToLoadAll(page);

    // Extract products
    const extractedProducts = await page.evaluate(() => {
      const cards = document.querySelectorAll('.product-item, .product-card, [data-product-id]');
      const items: Array<{
        sku: string;
        name: string;
        brand: string | null;
        currentPrice: string | null;
        regularPrice: string | null;
        imageUrl: string | null;
        productUrl: string | null;
        stockStatus: string;
      }> = [];

      cards.forEach((card) => {
        try {
          const nameEl = card.querySelector('.product-item-name, .product-title, h3, h4');
          const priceEl = card.querySelector('.price-box .price, .product-price, .price');
          const wasPriceEl = card.querySelector('.old-price .price, .was-price');
          const imageEl = card.querySelector('img') as HTMLImageElement | null;
          const linkEl = card.querySelector('a[href*="/product"], a.product-link') as HTMLAnchorElement | null;
          const skuEl = card.querySelector('[data-product-sku], .product-code');
          const stockEl = card.querySelector('.stock-status, .availability');

          let sku = skuEl?.textContent?.trim() ||
                    skuEl?.getAttribute('data-product-sku') ||
                    card.getAttribute('data-product-id') || '';

          // Extract from URL if needed
          if (!sku && linkEl?.href) {
            const match = linkEl.href.match(/\/product\/([^\/]+)/);
            if (match) sku = match[1];
          }

          const name = nameEl?.textContent?.trim() || '';

          if (name) {
            if (!sku) {
              sku = `CEF-${name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 20)}`;
            }

            items.push({
              sku,
              name,
              brand: null,
              currentPrice: priceEl?.textContent?.trim() || null,
              regularPrice: wasPriceEl?.textContent?.trim() || null,
              imageUrl: imageEl?.src || imageEl?.getAttribute('data-src') || null,
              productUrl: linkEl?.href || null,
              stockStatus: stockEl?.textContent?.trim() || 'Unknown',
            });
          }
        } catch (e) {
          console.error('Error extracting CEF product:', e);
        }
      });

      return items;
    });

    // Process extracted products
    for (const item of extractedProducts) {
      const currentPrice = this.parsePrice(item.currentPrice);
      const regularPrice = this.parsePrice(item.regularPrice);
      const isOnSale = regularPrice !== null && currentPrice !== null && regularPrice > currentPrice;
      const discount = this.calculateDiscount(currentPrice, regularPrice);

      // Extract brand from name
      const brands = ['Fluke', 'Megger', 'Chint', 'Hager', 'Schneider', 'ABB', 'Eaton', 'Legrand', 'MK', 'Click'];
      const brand = brands.find(b => item.name.toLowerCase().includes(b.toLowerCase())) || null;

      products.push({
        sku: item.sku,
        name: item.name,
        brand,
        category,
        subcategory: null,
        currentPrice,
        regularPrice: isOnSale ? regularPrice : null,
        isOnSale,
        discountPercentage: discount,
        description: null,
        highlights: [],
        imageUrl: item.imageUrl,
        productUrl: item.productUrl || `${this.config.baseUrl}/catalogue/search?q=${encodeURIComponent(item.name)}`,
        stockStatus: item.stockStatus || 'Unknown',
      });
    }

    console.log(`  CEF: Scraped ${products.length} products from ${url}`);
    return products;
  }

  /**
   * Scrape deals from CEF offers page
   */
  async scrapeDeals(): Promise<ScrapedDeal[]> {
    const deals: ScrapedDeal[] = [];

    if (!this.config.dealsUrl) return deals;

    const page = await this.createPage();

    try {
      const dealsUrl = `${this.config.baseUrl}${this.config.dealsUrl}`;
      console.log(`Scraping CEF deals: ${dealsUrl}`);

      const success = await this.navigateWithRetry(page, dealsUrl);
      if (!success) return deals;

      await this.waitForSelector(page, '.product-item, .offer-item', 5000);
      await this.scrollToLoadAll(page);

      const extractedDeals = await page.evaluate(() => {
        const cards = document.querySelectorAll('.product-item, .offer-item, [data-product-id]');
        const items: Array<{
          sku: string | null;
          name: string;
          currentPrice: string | null;
          regularPrice: string | null;
          productUrl: string | null;
          expiryText: string | null;
        }> = [];

        cards.forEach((card) => {
          const nameEl = card.querySelector('.product-item-name, .offer-title, h3');
          const priceEl = card.querySelector('.price-box .price, .offer-price');
          const wasPriceEl = card.querySelector('.old-price .price, .was-price');
          const linkEl = card.querySelector('a') as HTMLAnchorElement | null;
          const expiryEl = card.querySelector('.offer-expires, .deal-ends, [data-expires]');

          const name = nameEl?.textContent?.trim() || '';

          if (name) {
            items.push({
              sku: card.getAttribute('data-product-id'),
              name,
              currentPrice: priceEl?.textContent?.trim() || null,
              regularPrice: wasPriceEl?.textContent?.trim() || null,
              productUrl: linkEl?.href || null,
              expiryText: expiryEl?.textContent?.trim() || expiryEl?.getAttribute('data-expires') || null,
            });
          }
        });

        return items;
      });

      for (const item of extractedDeals) {
        const currentPrice = this.parsePrice(item.currentPrice);
        const regularPrice = this.parsePrice(item.regularPrice);

        if (currentPrice !== null) {
          const discount = regularPrice
            ? this.calculateDiscount(currentPrice, regularPrice) || 0
            : 0;

          // Try to parse real expiry date
          let expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Default 7 days
          if (item.expiryText) {
            const parsed = this.parseExpiryDate(item.expiryText);
            if (parsed) expiresAt = parsed;
          }

          deals.push({
            productSku: item.sku,
            title: item.name,
            description: null,
            originalPrice: regularPrice,
            dealPrice: currentPrice,
            discountPercentage: discount,
            dealType: 'weekly_deal',
            expiresAt,
            sourceUrl: item.productUrl || dealsUrl,
          });
        }
      }

      console.log(`CEF: Found ${deals.length} deals`);
    } finally {
      await page.close();
    }

    return deals;
  }

  /**
   * Parse expiry date from text
   */
  private parseExpiryDate(text: string): Date | null {
    // Try various formats
    // "Ends 31st January" or "Valid until 31/01/2025"
    const patterns = [
      /ends?\s+(\d{1,2})(st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december)/i,
      /valid\s+until\s+(\d{1,2})\/(\d{1,2})\/(\d{4})/i,
      /expires?\s+(\d{1,2})\/(\d{1,2})\/(\d{4})/i,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        try {
          // Handle month name format
          if (match[3] && isNaN(parseInt(match[3]))) {
            const months: Record<string, number> = {
              january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
              july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
            };
            const day = parseInt(match[1]);
            const month = months[match[3].toLowerCase()];
            const year = new Date().getFullYear();
            return new Date(year, month, day, 23, 59, 59);
          }
          // Handle DD/MM/YYYY format
          if (match[3] && !isNaN(parseInt(match[3]))) {
            const day = parseInt(match[1]);
            const month = parseInt(match[2]) - 1;
            const year = parseInt(match[3]);
            return new Date(year, month, day, 23, 59, 59);
          }
        } catch {
          continue;
        }
      }
    }

    return null;
  }

  /**
   * CEF doesn't have public coupons
   */
  async scrapeCoupons(): Promise<ScrapedCoupon[]> {
    return [];
  }
}
