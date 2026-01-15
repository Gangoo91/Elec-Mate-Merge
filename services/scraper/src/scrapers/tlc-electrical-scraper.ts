import { Page } from 'puppeteer';
import { BaseScraper, ScrapedProduct, ScrapedDeal, ScrapedCoupon } from './base-scraper.js';
import { SUPPLIERS } from '../config/suppliers.js';

/**
 * TLC Electrical (TLC Direct) Scraper
 * UK electrical wholesale supplier
 * Updated 2026-01-15 with working selectors
 */

export class TLCElectricalScraper extends BaseScraper {
  constructor() {
    super(SUPPLIERS['tlc-electrical']);
  }

  /**
   * Scrape products from TLC Electrical
   */
  async scrapeProducts(category?: string): Promise<ScrapedProduct[]> {
    const products: ScrapedProduct[] = [];
    const page = await this.createPage();

    try {
      // TLC Direct uses various URL patterns
      const categoryUrls: Record<string, string[]> = {
        'test-equipment': [
          '/Catalogue/Test_Equipment',
          '/Catalogue/Testers_Meters',
          '/Catalogue/Installation_Testers',
        ],
        'cables': [
          '/Catalogue/Cable',
          '/Catalogue/Twin_and_Earth',
          '/Catalogue/Flex',
          '/Catalogue/SWA_Cable',
        ],
        'consumer-units': [
          '/Catalogue/Consumer_Units',
          '/Catalogue/MCBs',
          '/Catalogue/RCDs',
          '/Catalogue/RCBOs',
        ],
        'wiring-accessories': [
          '/Catalogue/Wiring_Accessories',
          '/Catalogue/Switches_Sockets',
        ],
        'lighting': [
          '/Catalogue/Lighting',
          '/Catalogue/LED_Lighting',
          '/Catalogue/Emergency_Lighting',
        ],
        'containment': [
          '/Catalogue/Cable_Management',
          '/Catalogue/Trunking',
          '/Catalogue/Conduit',
        ],
      };

      const categoriesToScrape = category
        ? { [category]: categoryUrls[category] || [] }
        : categoryUrls;

      for (const [categoryName, urls] of Object.entries(categoriesToScrape)) {
        for (const urlPath of urls) {
          const fullUrl = `${this.config.baseUrl}${urlPath}`;
          console.log(`Scraping TLC ${categoryName}: ${fullUrl}`);

          const categoryProducts = await this.scrapeProductPage(page, fullUrl, categoryName);
          products.push(...categoryProducts);

          await this.delay();
        }
      }
    } finally {
      await page.close();
    }

    console.log(`TLC Electrical: Scraped ${products.length} products total`);
    return products;
  }

  /**
   * Scrape a single product listing page using direct DOM queries
   * TLC Direct uses traditional HTML (may have tables or divs)
   */
  private async scrapeProductPage(
    page: Page,
    url: string,
    category: string
  ): Promise<ScrapedProduct[]> {
    const products: ScrapedProduct[] = [];

    const success = await this.navigateWithRetry(page, url);
    if (!success) return products;

    // Wait for page to load
    await new Promise(r => setTimeout(r, 5000));
    await this.scrollToLoadAll(page);

    // Extract products using direct DOM queries
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

      // TLC uses /Products/ URL pattern
      const productLinks = document.querySelectorAll('a[href*="/Products/"], a[href*="/Product/"]');

      productLinks.forEach((link) => {
        try {
          const anchor = link as HTMLAnchorElement;
          const href = anchor.href;

          // Extract product code from URL
          const skuMatch = href.match(/\/Products?\/([^\/\?]+)/i);
          if (!skuMatch) return;

          let sku = skuMatch[1].toUpperCase();
          // Clean up SKU (remove HTML file extension if present)
          sku = sku.replace(/\.html?$/i, '');

          if (!sku || sku.length < 2) return;
          if (seenSkus.has(sku)) return;
          seenSkus.add(sku);

          // Find parent container with price
          let container = anchor.parentElement;
          for (let i = 0; i < 10 && container; i++) {
            const text = container.textContent || '';
            if (text.match(/£\d+\.\d{2}/)) break;
            container = container.parentElement;
          }

          if (!container) return;

          // Extract name from link or container
          let name = anchor.textContent?.trim() || '';
          if (!name || name.length < 3) {
            const nameEl = container.querySelector('h2, h3, h4, td, [class*="name"], [class*="title"], [class*="desc"]');
            name = nameEl?.textContent?.trim() || '';
          }
          if (!name || name.length < 3) return;

          // Extract prices
          const containerText = container.textContent || '';
          const priceMatches = containerText.match(/£(\d+\.?\d*)/g);
          let currentPrice: string | null = null;
          let regularPrice: string | null = null;

          if (priceMatches && priceMatches.length > 0) {
            currentPrice = priceMatches[0];
            if (priceMatches.length > 1) {
              const lowerText = containerText.toLowerCase();
              if (lowerText.includes('was') || lowerText.includes('rrp') || lowerText.includes('save')) {
                regularPrice = priceMatches[1];
              }
            }
          }

          // Find image
          const img = container.querySelector('img[src*="tlc-direct"], img[src*="product"], img[data-src]') as HTMLImageElement;
          const imageUrl = img?.src || img?.getAttribute('data-src') || null;

          items.push({
            sku,
            name,
            currentPrice,
            regularPrice,
            imageUrl,
            productUrl: href,
          });
        } catch (e) {
          // Continue on error
        }
      });

      // Fallback: Look for table rows or div containers
      if (items.length === 0) {
        // Try table rows (TLC sometimes uses tables)
        const rows = document.querySelectorAll('tr[class*="product"], tr[class*="item"], [class*="product-row"]');
        rows.forEach((row) => {
          try {
            const linkEl = row.querySelector('a') as HTMLAnchorElement;
            if (!linkEl?.href) return;

            const skuMatch = linkEl.href.match(/\/Products?\/([^\/\?]+)/i);
            const sku = skuMatch ? skuMatch[1].toUpperCase().replace(/\.html?$/i, '') :
                       `TLC-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

            if (seenSkus.has(sku)) return;
            seenSkus.add(sku);

            const cells = row.querySelectorAll('td');
            let name = '';
            cells.forEach((cell) => {
              const text = cell.textContent?.trim() || '';
              if (text.length > 5 && !text.match(/^£/) && !name) {
                name = text;
              }
            });

            if (!name) name = linkEl.textContent?.trim() || '';
            if (!name || name.length < 3) return;

            const text = row.textContent || '';
            const priceMatch = text.match(/£(\d+\.?\d*)/);

            const imgEl = row.querySelector('img') as HTMLImageElement;

            items.push({
              sku,
              name,
              currentPrice: priceMatch ? priceMatch[0] : null,
              regularPrice: null,
              imageUrl: imgEl?.src || imgEl?.getAttribute('data-src') || null,
              productUrl: linkEl.href,
            });
          } catch (e) {
            // Continue
          }
        });

        // Try generic product containers
        if (items.length === 0) {
          const containers = document.querySelectorAll('[class*="product"], [class*="item"]');
          containers.forEach((container) => {
            try {
              const linkEl = container.querySelector('a') as HTMLAnchorElement;
              if (!linkEl?.href || !linkEl.href.includes('tlc-direct')) return;

              const sku = `TLC-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
              if (seenSkus.has(sku)) return;
              seenSkus.add(sku);

              const nameEl = container.querySelector('h2, h3, h4, [class*="name"], [class*="title"]');
              const name = nameEl?.textContent?.trim() || linkEl.textContent?.trim() || '';
              if (!name || name.length < 3) return;

              const text = container.textContent || '';
              const priceMatch = text.match(/£(\d+\.?\d*)/);

              const imgEl = container.querySelector('img') as HTMLImageElement;

              items.push({
                sku,
                name,
                currentPrice: priceMatch ? priceMatch[0] : null,
                regularPrice: null,
                imageUrl: imgEl?.src || imgEl?.getAttribute('data-src') || null,
                productUrl: linkEl.href,
              });
            } catch (e) {
              // Continue
            }
          });
        }
      }

      return items;
    });

    for (const item of extractedProducts) {
      const currentPrice = this.parsePrice(item.currentPrice);
      const regularPrice = this.parsePrice(item.regularPrice);
      const isOnSale = regularPrice !== null && currentPrice !== null && regularPrice > currentPrice;
      const discount = this.calculateDiscount(currentPrice, regularPrice);

      // TLC brands
      const brands = ['Schneider', 'Hager', 'MK', 'Click', 'Chint', 'Legrand', 'Hamilton', 'BG'];
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
        productUrl: item.productUrl || `${this.config.baseUrl}/search?q=${encodeURIComponent(item.name)}`,
        stockStatus: item.stockStatus || 'Unknown',
      });
    }

    console.log(`  TLC: Scraped ${products.length} products from ${url}`);
    return products;
  }

  /**
   * Scrape deals from TLC sale page
   */
  async scrapeDeals(): Promise<ScrapedDeal[]> {
    const deals: ScrapedDeal[] = [];

    if (!this.config.dealsUrl) return deals;

    const page = await this.createPage();

    try {
      const dealsUrl = `${this.config.baseUrl}${this.config.dealsUrl}`;
      console.log(`Scraping TLC deals: ${dealsUrl}`);

      const success = await this.navigateWithRetry(page, dealsUrl);
      if (!success) return deals;

      await this.waitForSelector(page, '.product-item, .sale-item', 5000);
      await this.scrollToLoadAll(page);

      const extractedDeals = await page.evaluate(() => {
        const cards = document.querySelectorAll('.product-item, .sale-item, [data-product]');
        const items: Array<{
          sku: string | null;
          name: string;
          currentPrice: string | null;
          regularPrice: string | null;
          productUrl: string | null;
        }> = [];

        cards.forEach((card) => {
          const nameEl = card.querySelector('.product-name, .sale-title, h3');
          const priceEl = card.querySelector('.product-price, .sale-price');
          const wasPriceEl = card.querySelector('.was-price, .old-price');
          const linkEl = card.querySelector('a') as HTMLAnchorElement | null;

          const name = nameEl?.textContent?.trim() || '';

          if (name) {
            items.push({
              sku: null,
              name,
              currentPrice: priceEl?.textContent?.trim() || null,
              regularPrice: wasPriceEl?.textContent?.trim() || null,
              productUrl: linkEl?.href || null,
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

          deals.push({
            productSku: item.sku,
            title: item.name,
            description: null,
            originalPrice: regularPrice,
            dealPrice: currentPrice,
            discountPercentage: discount,
            dealType: 'clearance',  // TLC sale is usually clearance
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),  // 30 days for clearance
            sourceUrl: item.productUrl || dealsUrl,
          });
        }
      }

      console.log(`TLC: Found ${deals.length} deals`);
    } finally {
      await page.close();
    }

    return deals;
  }

  /**
   * TLC doesn't have public coupons
   */
  async scrapeCoupons(): Promise<ScrapedCoupon[]> {
    return [];
  }
}
