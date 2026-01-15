import { Page } from 'puppeteer';
import { BaseScraper, ScrapedProduct, ScrapedDeal, ScrapedCoupon } from './base-scraper.js';
import { SUPPLIERS } from '../config/suppliers.js';

/**
 * RS Components Scraper
 * Large B2B supplier - huge product range (10,000+ electrical products)
 * Updated 2026-01-15 with working selectors
 */

export class RSComponentsScraper extends BaseScraper {
  constructor() {
    super(SUPPLIERS['rs-components']);
  }

  /**
   * Scrape products from RS Components
   */
  async scrapeProducts(category?: string): Promise<ScrapedProduct[]> {
    const products: ScrapedProduct[] = [];
    const page = await this.createPage();

    try {
      // RS Components has a huge catalog - expanded URLs
      const categoryUrls: Record<string, string[]> = {
        'test-equipment': [
          '/web/c/test-measurement/electrical-test-meters-accessories/',
          '/web/c/test-measurement/multimeters/',
          '/web/c/test-measurement/clamp-meters/',
          '/web/c/test-measurement/insulation-testers/',
          '/web/c/test-measurement/earth-resistance-testers/',
          '/web/c/test-measurement/electrical-installation-testers/',
        ],
        'hand-tools': [
          '/web/c/hand-tools/',
          '/web/c/hand-tools/screwdrivers/',
          '/web/c/hand-tools/pliers/',
          '/web/c/hand-tools/wire-strippers-cutters/',
          '/web/c/hand-tools/crimping-tools/',
        ],
        'power-tools': [
          '/web/c/power-tools/',
          '/web/c/power-tools/drills/',
          '/web/c/power-tools/impact-drivers/',
          '/web/c/power-tools/grinders/',
        ],
        'cables': [
          '/web/c/cables-wires/',
          '/web/c/cables-wires/single-core-cable/',
          '/web/c/cables-wires/multi-core-cable/',
          '/web/c/cables-wires/flexible-cable/',
        ],
        'circuit-protection': [
          '/web/c/circuit-protection/',
          '/web/c/circuit-protection/mcbs/',
          '/web/c/circuit-protection/rcds/',
          '/web/c/circuit-protection/fuses/',
        ],
        'connectors': [
          '/web/c/connectors/',
          '/web/c/connectors/terminal-blocks/',
          '/web/c/connectors/plugs-sockets/',
        ],
      };

      const categoriesToScrape = category
        ? { [category]: categoryUrls[category] || [] }
        : categoryUrls;

      for (const [categoryName, urls] of Object.entries(categoriesToScrape)) {
        for (const urlPath of urls) {
          const fullUrl = `${this.config.baseUrl}${urlPath}`;
          console.log(`Scraping RS Components ${categoryName}: ${fullUrl}`);

          const categoryProducts = await this.scrapeProductPage(page, fullUrl, categoryName);
          products.push(...categoryProducts);

          await this.delay();
        }
      }
    } finally {
      await page.close();
    }

    console.log(`RS Components: Scraped ${products.length} products total`);
    return products;
  }

  /**
   * Scrape a single product listing page
   * RS Components uses embedded JSON data in script tags (React hydration data)
   */
  private async scrapeProductPage(
    page: Page,
    url: string,
    category: string
  ): Promise<ScrapedProduct[]> {
    const products: ScrapedProduct[] = [];

    const success = await this.navigateWithRetry(page, url);
    if (!success) return products;

    // Wait for React hydration
    await new Promise(r => setTimeout(r, 8000));

    // Try to wait for products to render
    try {
      await page.waitForFunction(() => {
        return document.body.innerText.includes('£') ||
               document.querySelectorAll('a[href*="/web/p/"]').length > 3;
      }, { timeout: 15000 });
    } catch {
      // Continue anyway
    }

    await this.scrollToLoadAll(page);

    // Extract products - RS embeds JSON data in script tags
    const extractedProducts = await page.evaluate(() => {
      const items: Array<{
        sku: string;
        name: string;
        currentPrice: string | null;
        regularPrice: string | null;
        imageUrl: string | null;
        productUrl: string | null;
        stockStatus: string;
        brand?: string | null;
      }> = [];

      const seenSkus = new Set<string>();

      // Method 1: Extract from embedded JSON data (RS uses __NEXT_DATA__ or similar)
      const scripts = document.querySelectorAll('script');
      scripts.forEach((script) => {
        try {
          const content = script.textContent || '';
          // Look for product data patterns in JSON
          if (content.includes('"displayPrice"') || content.includes('"stockNumber"') || content.includes('"products"')) {
            // Try to find product arrays
            const productMatches = content.matchAll(/"stockNumber"\s*:\s*"?(\d+)"?\s*,[\s\S]*?"displayPrice"\s*:\s*"([^"]+)"[\s\S]*?"title"\s*:\s*"([^"]+)"/g);
            for (const match of productMatches) {
              const sku = match[1];
              if (!seenSkus.has(sku)) {
                seenSkus.add(sku);
                items.push({
                  sku,
                  name: match[3],
                  currentPrice: match[2],
                  regularPrice: null,
                  imageUrl: null,
                  productUrl: `https://uk.rs-online.com/web/p/${sku}`,
                  stockStatus: 'Unknown',
                });
              }
            }

            // Alternative format
            const altMatches = content.matchAll(/"id"\s*:\s*"?(\d{6,})"?[\s\S]*?"name"\s*:\s*"([^"]+)"[\s\S]*?"price"\s*:\s*"?([0-9.]+)"?/g);
            for (const match of altMatches) {
              const sku = match[1];
              if (!seenSkus.has(sku)) {
                seenSkus.add(sku);
                items.push({
                  sku,
                  name: match[2],
                  currentPrice: `£${match[3]}`,
                  regularPrice: null,
                  imageUrl: null,
                  productUrl: `https://uk.rs-online.com/web/p/${sku}`,
                  stockStatus: 'Unknown',
                });
              }
            }
          }
        } catch (e) {
          // JSON parse failed, continue
        }
      });

      if (items.length > 0) return items;

      // Method 2: DOM-based extraction
      // RS uses data-testid attributes and /web/p/ URL pattern
      const cardSelectors = [
        '[data-testid*="product"]',
        '[class*="product-card"]',
        '[class*="ProductCard"]',
        'article',
        '[class*="searchResult"]',
      ];

      for (const selector of cardSelectors) {
        const cards = document.querySelectorAll(selector);
        if (cards.length > 2) {
          cards.forEach((card) => {
            try {
              const link = card.querySelector('a[href*="/web/p/"]') as HTMLAnchorElement;
              if (!link?.href) return;

              const skuMatch = link.href.match(/\/web\/p\/[^\/]+\/(\d+)/);
              if (!skuMatch) return;

              const sku = skuMatch[1];
              if (seenSkus.has(sku)) return;
              seenSkus.add(sku);

              // Get name
              const nameEl = card.querySelector('h2, h3, h4, [class*="title"], [class*="name"], [class*="Title"]');
              const name = nameEl?.textContent?.trim() || link.textContent?.trim() || '';
              if (!name || name.length < 3) return;

              // Get price (RS format: "£XX.XX (exc. VAT)")
              const text = card.textContent || '';
              const priceMatch = text.match(/£(\d+\.?\d*)/);

              // Get stock status
              let stockStatus = 'Unknown';
              const lowerText = text.toLowerCase();
              if (lowerText.includes('in stock')) stockStatus = 'In Stock';
              else if (lowerText.includes('limited')) stockStatus = 'Limited Stock';
              else if (lowerText.includes('back order')) stockStatus = 'Back Order';
              else if (lowerText.includes('discontinued')) stockStatus = 'Discontinued';

              // Get image
              const img = card.querySelector('img') as HTMLImageElement;

              items.push({
                sku,
                name,
                currentPrice: priceMatch ? priceMatch[0] : null,
                regularPrice: null,
                imageUrl: img?.src || img?.getAttribute('data-src') || null,
                productUrl: link.href,
                stockStatus,
              });
            } catch (e) {
              // Continue
            }
          });
          if (items.length > 0) break;
        }
      }

      if (items.length > 0) return items;

      // Method 3: Find all /web/p/ links and extract from nearby content
      const productLinks = document.querySelectorAll('a[href*="/web/p/"]');
      productLinks.forEach((link) => {
        try {
          const anchor = link as HTMLAnchorElement;
          const skuMatch = anchor.href.match(/\/web\/p\/[^\/]+\/(\d+)/);
          if (!skuMatch) return;

          const sku = skuMatch[1];
          if (seenSkus.has(sku)) return;
          seenSkus.add(sku);

          // Find container
          let container = anchor.parentElement;
          for (let i = 0; i < 8 && container; i++) {
            if (container.textContent?.match(/£\d/)) break;
            container = container.parentElement;
          }

          const name = anchor.textContent?.trim() || anchor.title ||
                      container?.querySelector('h2, h3, h4')?.textContent?.trim() || '';
          if (!name || name.length < 3) return;

          const text = container?.textContent || '';
          const priceMatch = text.match(/£(\d+\.?\d*)/);

          items.push({
            sku,
            name,
            currentPrice: priceMatch ? priceMatch[0] : null,
            regularPrice: null,
            imageUrl: container?.querySelector('img')?.getAttribute('src') || null,
            productUrl: anchor.href,
            stockStatus: text.toLowerCase().includes('in stock') ? 'In Stock' : 'Unknown',
          });
        } catch (e) {
          // Continue
        }
      });

      return items;
    });

    for (const item of extractedProducts) {
      const currentPrice = this.parsePrice(item.currentPrice);
      const regularPrice = this.parsePrice(item.regularPrice);
      const isOnSale = regularPrice !== null && currentPrice !== null && regularPrice > currentPrice;
      const discount = this.calculateDiscount(currentPrice, regularPrice);

      // RS has lots of brands
      let brand = item.brand;
      if (!brand) {
        const brands = ['Fluke', 'Megger', 'Wago', 'Phoenix Contact', 'Schneider', 'ABB', 'Siemens', 'Bosch', 'DeWalt', 'Makita', 'Wera', 'Knipex', 'Stanley'];
        brand = brands.find(b => item.name.toLowerCase().includes(b.toLowerCase())) || null;
      }

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
        productUrl: item.productUrl || `${this.config.baseUrl}/web/p/${item.sku}`,
        stockStatus: item.stockStatus || 'Unknown',
      });
    }

    console.log(`  RS Components: Scraped ${products.length} products from ${url}`);
    return products;
  }

  /**
   * Scrape deals from RS Components offers page
   */
  async scrapeDeals(): Promise<ScrapedDeal[]> {
    const deals: ScrapedDeal[] = [];

    if (!this.config.dealsUrl) return deals;

    const page = await this.createPage();

    try {
      const dealsUrl = `${this.config.baseUrl}${this.config.dealsUrl}`;
      console.log(`Scraping RS Components deals: ${dealsUrl}`);

      const success = await this.navigateWithRetry(page, dealsUrl);
      if (!success) return deals;

      await this.waitForSelector(page, '.product-tile, .offer-tile', 5000);
      await this.scrollToLoadAll(page);

      const extractedDeals = await page.evaluate(() => {
        const cards = document.querySelectorAll('.product-tile, .offer-tile, [data-testid="product-tile"]');
        const items: Array<{
          sku: string | null;
          name: string;
          currentPrice: string | null;
          regularPrice: string | null;
          productUrl: string | null;
          expiryText: string | null;
        }> = [];

        cards.forEach((card) => {
          const nameEl = card.querySelector('.product-tile__name, .product-name, h3');
          const priceEl = card.querySelector('.price__current, .product-price');
          const wasPriceEl = card.querySelector('.price__was, .was-price');
          const linkEl = card.querySelector('a') as HTMLAnchorElement | null;
          const expiryEl = card.querySelector('.offer-ends, [data-expires]');

          const name = nameEl?.textContent?.trim() || '';

          if (name) {
            items.push({
              sku: card.getAttribute('data-stock-number'),
              name,
              currentPrice: priceEl?.textContent?.trim() || null,
              regularPrice: wasPriceEl?.textContent?.trim() || null,
              productUrl: linkEl?.href || null,
              expiryText: expiryEl?.textContent?.trim() || null,
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

          // RS deals are typically weekly
          let expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
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

      console.log(`RS Components: Found ${deals.length} deals`);
    } finally {
      await page.close();
    }

    return deals;
  }

  /**
   * Parse expiry date
   */
  private parseExpiryDate(text: string): Date | null {
    const patterns = [
      /ends?\s+(\d{1,2})(st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december)/i,
      /valid\s+until\s+(\d{1,2})\/(\d{1,2})\/(\d{4})/i,
      /(\d{1,2})\/(\d{1,2})\/(\d{4})/,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        try {
          if (match[3] && isNaN(parseInt(match[3]))) {
            const months: Record<string, number> = {
              january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
              july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
            };
            return new Date(new Date().getFullYear(), months[match[3].toLowerCase()], parseInt(match[1]), 23, 59, 59);
          }
          if (match[3] && !isNaN(parseInt(match[3]))) {
            return new Date(parseInt(match[3]), parseInt(match[2]) - 1, parseInt(match[1]), 23, 59, 59);
          }
        } catch {
          continue;
        }
      }
    }
    return null;
  }

  /**
   * RS Components doesn't have public coupons
   */
  async scrapeCoupons(): Promise<ScrapedCoupon[]> {
    return [];
  }
}
