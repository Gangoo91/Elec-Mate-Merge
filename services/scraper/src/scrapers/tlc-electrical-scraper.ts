import { Page } from 'puppeteer';
import { BaseScraper, ScrapedProduct, ScrapedDeal, ScrapedCoupon } from './base-scraper.js';
import { SUPPLIERS } from '../config/suppliers.js';

/**
 * TLC Electrical Scraper
 * UK electrical wholesale supplier
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
      // TLC has section-based URLs
      const categoryUrls: Record<string, string[]> = {
        'test-equipment': [
          '/main/section_T.html',  // Test equipment
          '/Categories/1330/testmeters/',
          '/Categories/1340/insulation-testers/',
        ],
        'cables': [
          '/main/section_C.html',  // Cables
          '/Categories/1100/twin-earth-cable/',
          '/Categories/1110/flex/',
          '/Categories/1120/armoured-cable/',
        ],
        'consumer-units': [
          '/main/section_D.html',  // Distribution
          '/Categories/1200/consumer-units/',
          '/Categories/1210/mcbs/',
          '/Categories/1220/rcds/',
        ],
        'wiring-accessories': [
          '/main/section_W.html',  // Wiring accessories
          '/Categories/1400/switches-sockets/',
        ],
        'lighting': [
          '/main/section_L.html',  // Lighting
          '/Categories/1500/led-panels/',
          '/Categories/1510/downlights/',
        ],
        'containment': [
          '/main/section_B.html',  // Cable management
          '/Categories/1600/trunking/',
          '/Categories/1610/conduit/',
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

    await this.waitForSelector(page, '.product-item, .product-box, tr.product-row', 5000);
    await this.scrollToLoadAll(page);

    const extractedProducts = await page.evaluate(() => {
      // TLC might use table layout or grid
      const cards = document.querySelectorAll('.product-item, .product-box, tr.product-row, [data-product]');
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
          const nameEl = card.querySelector('.product-name, .product-title, td.name, h3, a[href*="/Products/"]');
          const priceEl = card.querySelector('.product-price, .price, td.price');
          const wasPriceEl = card.querySelector('.was-price, .old-price');
          const imageEl = card.querySelector('img') as HTMLImageElement | null;
          const linkEl = card.querySelector('a[href*="/Products/"], a.product-link') as HTMLAnchorElement | null;
          const skuEl = card.querySelector('.product-code, .sku, td.code');
          const stockEl = card.querySelector('.stock-level, .availability');

          let sku = skuEl?.textContent?.trim() || '';

          // Extract from URL
          if (!sku && linkEl?.href) {
            const match = linkEl.href.match(/\/Products\/(\d+)\//);
            if (match) sku = match[1];
          }

          const name = nameEl?.textContent?.trim() || '';

          if (name) {
            if (!sku) {
              sku = `TLC-${name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 20)}`;
            }

            items.push({
              sku,
              name,
              brand: null,
              currentPrice: priceEl?.textContent?.trim() || null,
              regularPrice: wasPriceEl?.textContent?.trim() || null,
              imageUrl: imageEl?.src || imageEl?.getAttribute('data-src') || null,
              productUrl: linkEl?.href || null,
              stockStatus: stockEl?.textContent?.trim() || 'In Stock',
            });
          }
        } catch (e) {
          console.error('Error extracting TLC product:', e);
        }
      });

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
