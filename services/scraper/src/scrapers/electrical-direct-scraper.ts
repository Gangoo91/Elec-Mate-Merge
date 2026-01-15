import { Page } from 'puppeteer';
import { BaseScraper, ScrapedProduct, ScrapedDeal, ScrapedCoupon } from './base-scraper.js';
import { SUPPLIERS } from '../config/suppliers.js';

/**
 * ElectricalDirect Scraper
 * Has both deals AND coupons page
 */

export class ElectricalDirectScraper extends BaseScraper {
  constructor() {
    super(SUPPLIERS['electrical-direct']);
  }

  /**
   * Scrape products from ElectricalDirect
   */
  async scrapeProducts(category?: string): Promise<ScrapedProduct[]> {
    const products: ScrapedProduct[] = [];
    const page = await this.createPage();

    try {
      // Expanded category URLs
      const categoryUrls: Record<string, string[]> = {
        'test-equipment': [
          '/test-equipment',
          '/test-equipment/multimeters',
          '/test-equipment/insulation-testers',
          '/test-equipment/multifunction-testers',
          '/test-equipment/clamp-meters',
          '/test-equipment/voltage-testers',
        ],
        'cable-accessories': [
          '/cable-accessories',
          '/cable-accessories/cable-ties',
          '/cable-accessories/cable-glands',
          '/cable-accessories/junction-boxes',
        ],
        'consumer-units': [
          '/consumer-units-distribution',
          '/consumer-units-distribution/mcbs',
          '/consumer-units-distribution/rcbos',
          '/consumer-units-distribution/rcds',
        ],
        'lighting': [
          '/lighting',
          '/lighting/led-panels',
          '/lighting/downlights',
          '/lighting/emergency-lighting',
        ],
        'wiring-accessories': [
          '/wiring-accessories',
          '/wiring-accessories/switches-sockets',
          '/wiring-accessories/dimmer-switches',
        ],
      };

      const categoriesToScrape = category
        ? { [category]: categoryUrls[category] || [] }
        : categoryUrls;

      for (const [categoryName, urls] of Object.entries(categoriesToScrape)) {
        for (const urlPath of urls) {
          const fullUrl = `${this.config.baseUrl}${urlPath}`;
          console.log(`Scraping ElectricalDirect ${categoryName}: ${fullUrl}`);

          const categoryProducts = await this.scrapeProductPage(page, fullUrl, categoryName);
          products.push(...categoryProducts);

          await this.delay();
        }
      }
    } finally {
      await page.close();
    }

    console.log(`ElectricalDirect: Scraped ${products.length} products total`);
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

    await this.waitForSelector(page, '.product-item, .product-card', 5000);
    await this.scrollToLoadAll(page);

    const extractedProducts = await page.evaluate(() => {
      const cards = document.querySelectorAll('.product-item, .product-card, [data-product]');
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
          const nameEl = card.querySelector('.product-item-name, .product-name, h3');
          const priceEl = card.querySelector('.price, .product-price');
          const wasPriceEl = card.querySelector('.old-price, .was-price');
          const imageEl = card.querySelector('img') as HTMLImageElement | null;
          const linkEl = card.querySelector('a[href*="/product"], a.product-link') as HTMLAnchorElement | null;
          const skuEl = card.querySelector('[data-sku], .product-sku');
          const stockEl = card.querySelector('.stock, .availability');
          const brandEl = card.querySelector('.brand, .product-brand');

          let sku = skuEl?.textContent?.trim() ||
                    skuEl?.getAttribute('data-sku') ||
                    card.getAttribute('data-product') || '';

          const name = nameEl?.textContent?.trim() || '';

          if (name) {
            if (!sku) {
              sku = `ED-${name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 20)}`;
            }

            items.push({
              sku,
              name,
              brand: brandEl?.textContent?.trim() || null,
              currentPrice: priceEl?.textContent?.trim() || null,
              regularPrice: wasPriceEl?.textContent?.trim() || null,
              imageUrl: imageEl?.src || imageEl?.getAttribute('data-src') || null,
              productUrl: linkEl?.href || null,
              stockStatus: stockEl?.textContent?.trim() || 'Unknown',
            });
          }
        } catch (e) {
          console.error('Error extracting ElectricalDirect product:', e);
        }
      });

      return items;
    });

    for (const item of extractedProducts) {
      const currentPrice = this.parsePrice(item.currentPrice);
      const regularPrice = this.parsePrice(item.regularPrice);
      const isOnSale = regularPrice !== null && currentPrice !== null && regularPrice > currentPrice;
      const discount = this.calculateDiscount(currentPrice, regularPrice);

      // Extract brand
      let brand = item.brand;
      if (!brand) {
        const brands = ['Fluke', 'Megger', 'Kewtech', 'Martindale', 'Di-Log', 'Seaward', 'Robin'];
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
        productUrl: item.productUrl || `${this.config.baseUrl}/search?q=${encodeURIComponent(item.name)}`,
        stockStatus: item.stockStatus || 'Unknown',
      });
    }

    console.log(`  ElectricalDirect: Scraped ${products.length} products from ${url}`);
    return products;
  }

  /**
   * Scrape deals from ElectricalDirect
   */
  async scrapeDeals(): Promise<ScrapedDeal[]> {
    const deals: ScrapedDeal[] = [];

    if (!this.config.dealsUrl) return deals;

    const page = await this.createPage();

    try {
      const dealsUrl = `${this.config.baseUrl}${this.config.dealsUrl}`;
      console.log(`Scraping ElectricalDirect deals: ${dealsUrl}`);

      const success = await this.navigateWithRetry(page, dealsUrl);
      if (!success) return deals;

      await this.waitForSelector(page, '.product-item, .deal-item', 5000);
      await this.scrollToLoadAll(page);

      const extractedDeals = await page.evaluate(() => {
        const cards = document.querySelectorAll('.product-item, .deal-item, [data-product]');
        const items: Array<{
          sku: string | null;
          name: string;
          currentPrice: string | null;
          regularPrice: string | null;
          productUrl: string | null;
          expiryText: string | null;
          dealType: string | null;
        }> = [];

        cards.forEach((card) => {
          const nameEl = card.querySelector('.product-item-name, .deal-title, h3');
          const priceEl = card.querySelector('.price, .deal-price');
          const wasPriceEl = card.querySelector('.old-price, .was-price');
          const linkEl = card.querySelector('a') as HTMLAnchorElement | null;
          const expiryEl = card.querySelector('.deal-expires, .offer-ends, [data-expires]');
          const dealTypeEl = card.querySelector('.deal-type, .offer-badge');

          const name = nameEl?.textContent?.trim() || '';

          if (name) {
            items.push({
              sku: card.getAttribute('data-product'),
              name,
              currentPrice: priceEl?.textContent?.trim() || null,
              regularPrice: wasPriceEl?.textContent?.trim() || null,
              productUrl: linkEl?.href || null,
              expiryText: expiryEl?.textContent?.trim() || null,
              dealType: dealTypeEl?.textContent?.trim()?.toLowerCase() || null,
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

          // Detect deal type
          let dealType: 'deal_of_day' | 'flash_sale' | 'clearance' | 'weekly_deal' = 'weekly_deal';
          if (item.dealType) {
            if (item.dealType.includes('flash')) dealType = 'flash_sale';
            else if (item.dealType.includes('clearance')) dealType = 'clearance';
            else if (item.dealType.includes('day')) dealType = 'deal_of_day';
          }

          // Try to parse expiry
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
            dealType,
            expiresAt,
            sourceUrl: item.productUrl || dealsUrl,
          });
        }
      }

      console.log(`ElectricalDirect: Found ${deals.length} deals`);
    } finally {
      await page.close();
    }

    return deals;
  }

  /**
   * Parse expiry date from text
   */
  private parseExpiryDate(text: string): Date | null {
    const patterns = [
      /ends?\s+(\d{1,2})(st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december)/i,
      /valid\s+until\s+(\d{1,2})\/(\d{1,2})\/(\d{4})/i,
      /expires?\s+(\d{1,2})\/(\d{1,2})\/(\d{4})/i,
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
            const day = parseInt(match[1]);
            const month = months[match[3].toLowerCase()];
            const year = new Date().getFullYear();
            return new Date(year, month, day, 23, 59, 59);
          }
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
   * Scrape coupons from ElectricalDirect voucher codes page
   */
  async scrapeCoupons(): Promise<ScrapedCoupon[]> {
    const coupons: ScrapedCoupon[] = [];

    if (!this.config.couponsUrl) return coupons;

    const page = await this.createPage();

    try {
      const couponsUrl = `${this.config.baseUrl}${this.config.couponsUrl}`;
      console.log(`Scraping ElectricalDirect coupons: ${couponsUrl}`);

      const success = await this.navigateWithRetry(page, couponsUrl);
      if (!success) return coupons;

      await this.waitForSelector(page, '.voucher-code, .coupon-item, .promo-code', 5000);

      const extractedCoupons = await page.evaluate(() => {
        const items = document.querySelectorAll('.voucher-code, .coupon-item, .promo-code, [data-coupon]');
        const codes: Array<{
          code: string;
          description: string;
          discountText: string | null;
          minSpendText: string | null;
          expiryText: string | null;
        }> = [];

        items.forEach((item) => {
          const codeEl = item.querySelector('.code, .coupon-code, [data-code]');
          const descEl = item.querySelector('.description, .coupon-description, p');
          const discountEl = item.querySelector('.discount, .saving');
          const minSpendEl = item.querySelector('.min-spend, .terms');
          const expiryEl = item.querySelector('.expires, .valid-until');

          const code = codeEl?.textContent?.trim() || codeEl?.getAttribute('data-code') || '';
          const description = descEl?.textContent?.trim() || '';

          if (code) {
            codes.push({
              code,
              description,
              discountText: discountEl?.textContent?.trim() || null,
              minSpendText: minSpendEl?.textContent?.trim() || null,
              expiryText: expiryEl?.textContent?.trim() || null,
            });
          }
        });

        return codes;
      });

      for (const item of extractedCoupons) {
        const { discountType, discountValue } = this.parseDiscount(item.discountText);
        const minimumSpend = this.parseMinSpend(item.minSpendText);
        const validUntil = item.expiryText ? this.parseExpiryDate(item.expiryText) : null;

        coupons.push({
          code: item.code,
          description: item.description,
          discountType,
          discountValue,
          minimumSpend,
          validUntil,
          sourceUrl: `${this.config.baseUrl}${this.config.couponsUrl}`,
        });
      }

      console.log(`ElectricalDirect: Found ${coupons.length} coupons`);
    } finally {
      await page.close();
    }

    return coupons;
  }

  /**
   * Parse discount from text
   */
  private parseDiscount(text: string | null): { discountType: 'percentage' | 'fixed' | 'free_delivery'; discountValue: number } {
    if (!text) return { discountType: 'percentage', discountValue: 0 };

    // Check for free delivery
    if (text.toLowerCase().includes('free delivery') || text.toLowerCase().includes('free shipping')) {
      return { discountType: 'free_delivery', discountValue: 0 };
    }

    // Check for percentage
    const percentMatch = text.match(/(\d+)%/);
    if (percentMatch) {
      return { discountType: 'percentage', discountValue: parseInt(percentMatch[1]) };
    }

    // Check for fixed amount
    const fixedMatch = text.match(/£(\d+(?:\.\d{2})?)/);
    if (fixedMatch) {
      return { discountType: 'fixed', discountValue: parseFloat(fixedMatch[1]) };
    }

    return { discountType: 'percentage', discountValue: 0 };
  }

  /**
   * Parse minimum spend from text
   */
  private parseMinSpend(text: string | null): number | null {
    if (!text) return null;

    const match = text.match(/min(?:imum)?\s*(?:spend|order)?\s*£?(\d+(?:\.\d{2})?)/i);
    if (match) {
      return parseFloat(match[1]);
    }

    const simpleMatch = text.match(/£(\d+(?:\.\d{2})?)/);
    if (simpleMatch) {
      return parseFloat(simpleMatch[1]);
    }

    return null;
  }
}
