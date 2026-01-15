import { Page } from 'puppeteer';
import { BaseScraper, ScrapedProduct, ScrapedDeal, ScrapedCoupon } from './base-scraper.js';
import { SUPPLIERS } from '../config/suppliers.js';

/**
 * Screwfix Scraper
 * Scrapes products and deals from screwfix.com
 * Updated 2026-01-15 with working selectors
 */

export class ScrewfixScraper extends BaseScraper {
  constructor() {
    super(SUPPLIERS.screwfix);
  }

  /**
   * Scrape products from all category pages
   */
  async scrapeProducts(category?: string): Promise<ScrapedProduct[]> {
    const products: ScrapedProduct[] = [];
    const page = await this.createPage();

    try {
      // Determine which categories to scrape
      const categoriesToScrape = category
        ? { [category]: this.config.categoryUrls[category] || [] }
        : this.config.categoryUrls;

      for (const [categoryName, urls] of Object.entries(categoriesToScrape)) {
        for (const urlPath of urls) {
          const fullUrl = `${this.config.baseUrl}${urlPath}`;
          console.log(`Scraping ${categoryName}: ${fullUrl}`);

          const categoryProducts = await this.scrapeProductPage(page, fullUrl, categoryName);
          products.push(...categoryProducts);

          // Rate limiting
          await this.delay();
        }
      }
    } finally {
      await page.close();
    }

    console.log(`Screwfix: Scraped ${products.length} products total`);
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

    // Wait for page to load
    await new Promise(r => setTimeout(r, 5000));

    // Scroll to load all content
    await this.scrollToLoadAll(page);

    // Extract products using direct page evaluation - Screwfix uses obfuscated classes
    const extractedProducts = await page.evaluate(() => {
      const items: Array<{
        sku: string;
        name: string;
        currentPrice: string | null;
        regularPrice: string | null;
        imageUrl: string | null;
        productUrl: string | null;
      }> = [];

      // Find all product links
      const productLinks = document.querySelectorAll('a[href*="/p/"]');
      const seenSkus = new Set<string>();

      productLinks.forEach((link) => {
        const anchor = link as HTMLAnchorElement;
        const href = anchor.href;

        // Extract SKU from URL (e.g., /p/product-name/956jj -> 956jj)
        const skuMatch = href.match(/\/p\/[^\/]+\/([a-z0-9]+)/i);
        if (!skuMatch) return;

        const sku = skuMatch[1].toUpperCase();
        if (seenSkus.has(sku)) return;
        seenSkus.add(sku);

        // Find parent container (go up until we find one with price info)
        let container = anchor.parentElement;
        for (let i = 0; i < 10 && container; i++) {
          const text = container.textContent || '';
          if (text.match(/£\d+\.\d{2}/)) {
            break;
          }
          container = container.parentElement;
        }

        if (!container) return;

        // Extract name from link text
        const nameEl = anchor.querySelector('span') || anchor;
        const name = nameEl.textContent?.trim() || '';
        if (!name || name.length < 3) return;

        // Extract prices from container text
        const containerText = container.textContent || '';
        const priceMatches = containerText.match(/£(\d+\.?\d*)/g);
        let currentPrice: string | null = null;
        let regularPrice: string | null = null;

        if (priceMatches && priceMatches.length > 0) {
          // First price is usually current price
          currentPrice = priceMatches[0];
          // If there's a second price, it might be the was price
          if (priceMatches.length > 1) {
            // Check if container has "was" text
            if (containerText.toLowerCase().includes('was')) {
              regularPrice = priceMatches[1];
            }
          }
        }

        // Find image
        const img = container.querySelector('img[src*="screwfix.com"]') as HTMLImageElement;
        const imageUrl = img?.src || null;

        items.push({
          sku,
          name,
          currentPrice,
          regularPrice,
          imageUrl,
          productUrl: href,
        });
      });

      return items;
    });

    // Process extracted products
    for (const item of extractedProducts) {
      const currentPrice = this.parsePrice(item.currentPrice);
      const regularPrice = this.parsePrice(item.regularPrice);
      const isOnSale = regularPrice !== null && currentPrice !== null && regularPrice > currentPrice;
      const discount = this.calculateDiscount(currentPrice, regularPrice);

      // Extract brand from product name
      const brands = ['DeWalt', 'Makita', 'Bosch', 'Milwaukee', 'Fluke', 'Stanley', 'Knipex', 'Wera', 'Bahco', 'Irwin', 'Magnusson', 'Forge Steel'];
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
        productUrl: item.productUrl || `${this.config.baseUrl}/p/${item.sku}`,
        stockStatus: 'Unknown',
      });
    }

    console.log(`  Scraped ${products.length} products from ${url}`);
    return products;
  }

  /**
   * Scrape deals from Screwfix
   */
  async scrapeDeals(): Promise<ScrapedDeal[]> {
    const deals: ScrapedDeal[] = [];

    if (!this.config.dealsUrl) return deals;

    const page = await this.createPage();

    try {
      const dealsUrl = `${this.config.baseUrl}${this.config.dealsUrl}`;
      console.log(`Scraping Screwfix deals: ${dealsUrl}`);

      const success = await this.navigateWithRetry(page, dealsUrl);
      if (!success) return deals;

      await new Promise(r => setTimeout(r, 5000));
      await this.scrollToLoadAll(page);

      const extractedDeals = await page.evaluate(() => {
        const items: Array<{
          sku: string | null;
          name: string;
          currentPrice: string | null;
          regularPrice: string | null;
          productUrl: string | null;
        }> = [];

        const productLinks = document.querySelectorAll('a[href*="/p/"]');
        const seenSkus = new Set<string>();

        productLinks.forEach((link) => {
          const anchor = link as HTMLAnchorElement;
          const href = anchor.href;

          const skuMatch = href.match(/\/p\/[^\/]+\/([a-z0-9]+)/i);
          const sku = skuMatch ? skuMatch[1].toUpperCase() : null;

          if (sku && seenSkus.has(sku)) return;
          if (sku) seenSkus.add(sku);

          let container = anchor.parentElement;
          for (let i = 0; i < 10 && container; i++) {
            if ((container.textContent || '').match(/£\d+/)) break;
            container = container.parentElement;
          }

          if (!container) return;

          const nameEl = anchor.querySelector('span') || anchor;
          const name = nameEl.textContent?.trim() || '';
          if (!name || name.length < 3) return;

          const containerText = container.textContent || '';
          const priceMatches = containerText.match(/£(\d+\.?\d*)/g);

          items.push({
            sku,
            name,
            currentPrice: priceMatches?.[0] || null,
            regularPrice: priceMatches?.[1] || null,
            productUrl: href,
          });
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
            dealType: 'deal_of_day',
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            sourceUrl: item.productUrl || dealsUrl,
          });
        }
      }

      console.log(`Screwfix: Found ${deals.length} deals`);
    } finally {
      await page.close();
    }

    return deals;
  }

  /**
   * Scrape coupons (Screwfix doesn't have a public coupons page)
   */
  async scrapeCoupons(): Promise<ScrapedCoupon[]> {
    return [];
  }
}
