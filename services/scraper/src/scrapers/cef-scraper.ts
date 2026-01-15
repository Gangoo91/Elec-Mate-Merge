import { Page } from 'puppeteer';
import { BaseScraper, ScrapedProduct, ScrapedDeal, ScrapedCoupon } from './base-scraper.js';
import { SUPPLIERS } from '../config/suppliers.js';

/**
 * CEF (City Electrical Factors) Scraper
 * Large UK electrical wholesaler
 * Updated 2026-01-15 with working selectors
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
   * Scrape a single product listing page using direct DOM queries
   * CEF uses a React/Next.js based site with dynamic content loading
   */
  private async scrapeProductPage(
    page: Page,
    url: string,
    category: string
  ): Promise<ScrapedProduct[]> {
    const products: ScrapedProduct[] = [];

    const success = await this.navigateWithRetry(page, url);
    if (!success) return products;

    // CEF is a heavy React site - wait longer for hydration
    await new Promise(r => setTimeout(r, 8000));

    // Try to wait for product content to appear
    try {
      await page.waitForFunction(() => {
        return document.body.innerText.includes('£') ||
               document.querySelectorAll('a[href*="/catalogue/"]').length > 5;
      }, { timeout: 10000 });
    } catch {
      // Continue anyway
    }

    await this.scrollToLoadAll(page);

    // Extract products using multiple methods
    const extractedProducts = await page.evaluate(() => {
      const items: Array<{
        sku: string;
        name: string;
        currentPrice: string | null;
        regularPrice: string | null;
        imageUrl: string | null;
        productUrl: string | null;
        stockStatus?: string;
      }> = [];

      const seenSkus = new Set<string>();

      // Method 1: Look for embedded JSON data in script tags (modern React sites)
      const scripts = document.querySelectorAll('script[type="application/json"], script:not([src])');
      scripts.forEach((script) => {
        try {
          const content = script.textContent || '';
          // Look for product data patterns
          if (content.includes('"products"') || content.includes('"items"') || content.includes('"sku"')) {
            // Try to find product arrays
            const productMatch = content.match(/"products"\s*:\s*(\[[\s\S]*?\])/);
            if (productMatch) {
              const products = JSON.parse(productMatch[1]);
              for (const p of products) {
                if (p.sku && !seenSkus.has(p.sku)) {
                  seenSkus.add(p.sku);
                  items.push({
                    sku: p.sku,
                    name: p.name || p.title || p.description || '',
                    currentPrice: p.price ? `£${p.price}` : null,
                    regularPrice: p.wasPrice ? `£${p.wasPrice}` : null,
                    imageUrl: p.image || p.imageUrl || null,
                    productUrl: p.url || null,
                  });
                }
              }
            }
          }
        } catch (e) {
          // JSON parse failed, continue
        }
      });

      if (items.length > 0) return items;

      // Method 2: Find product cards/tiles by common class patterns
      const cardSelectors = [
        '[class*="product-card"]',
        '[class*="product-tile"]',
        '[class*="ProductCard"]',
        '[class*="product-item"]',
        'article[class*="product"]',
        '[data-component="ProductCard"]',
        '[data-testid*="product"]',
      ];

      for (const selector of cardSelectors) {
        const cards = document.querySelectorAll(selector);
        if (cards.length > 0) {
          cards.forEach((card) => {
            try {
              // Find link to product
              const link = card.querySelector('a[href*="/catalogue/"], a[href*="/product/"], a[href*="/p/"]') as HTMLAnchorElement;
              if (!link?.href) return;

              // Extract SKU from URL or data attribute
              const skuFromUrl = link.href.match(/\/([A-Z0-9-]+)(?:\/|\?|$)/i);
              const sku = card.getAttribute('data-sku') ||
                         card.getAttribute('data-product-id') ||
                         (skuFromUrl ? skuFromUrl[1] : `CEF-${Math.random().toString(36).substr(2, 8)}`);

              if (seenSkus.has(sku)) return;
              seenSkus.add(sku);

              // Get name
              const nameEl = card.querySelector('h2, h3, h4, [class*="name"], [class*="title"], [class*="Name"], [class*="Title"]');
              const name = nameEl?.textContent?.trim() || link.textContent?.trim() || '';
              if (!name || name.length < 3) return;

              // Get price
              const text = card.textContent || '';
              const priceMatches = text.match(/£(\d+\.?\d*)/g);

              // Get image
              const img = card.querySelector('img') as HTMLImageElement;

              items.push({
                sku,
                name,
                currentPrice: priceMatches?.[0] || null,
                regularPrice: priceMatches && priceMatches.length > 1 ? priceMatches[1] : null,
                imageUrl: img?.src || img?.getAttribute('data-src') || null,
                productUrl: link.href,
              });
            } catch (e) {
              // Continue
            }
          });
          if (items.length > 0) break;
        }
      }

      if (items.length > 0) return items;

      // Method 3: Find all catalogue links and build products from nearby content
      const catalogueLinks = document.querySelectorAll('a[href*="/catalogue/"]');
      catalogueLinks.forEach((link) => {
        try {
          const anchor = link as HTMLAnchorElement;
          const href = anchor.href;

          // Skip navigation/category links
          if (href.includes('/categories') || href.includes('/search') || !href.match(/\/[A-Z0-9]{3,}/i)) return;

          const skuMatch = href.match(/\/([A-Z0-9]{4,})/i);
          if (!skuMatch) return;

          const sku = skuMatch[1].toUpperCase();
          if (seenSkus.has(sku)) return;
          seenSkus.add(sku);

          // Find containing element
          let container = anchor.parentElement;
          for (let i = 0; i < 8 && container; i++) {
            if (container.textContent?.match(/£\d/)) break;
            container = container.parentElement;
          }
          if (!container) container = anchor.parentElement;

          const name = anchor.textContent?.trim() ||
                      container?.querySelector('h2, h3, h4')?.textContent?.trim() || '';
          if (!name || name.length < 3) return;

          const text = container?.textContent || '';
          const priceMatch = text.match(/£(\d+\.?\d*)/);

          const img = container?.querySelector('img') as HTMLImageElement;

          items.push({
            sku,
            name,
            currentPrice: priceMatch ? priceMatch[0] : null,
            regularPrice: null,
            imageUrl: img?.src || null,
            productUrl: href,
          });
        } catch (e) {
          // Continue
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
