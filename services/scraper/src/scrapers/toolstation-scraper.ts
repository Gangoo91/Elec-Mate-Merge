import { Page } from 'puppeteer';
import { BaseScraper, ScrapedProduct, ScrapedDeal, ScrapedCoupon } from './base-scraper.js';
import { SUPPLIERS } from '../config/suppliers.js';

/**
 * Toolstation Scraper
 * Scrapes products and deals from toolstation.com
 * Updated 2026-01-15 with working selectors
 */

export class ToolstationScraper extends BaseScraper {
  constructor() {
    super(SUPPLIERS.toolstation);
  }

  /**
   * Scrape products from all category pages
   */
  async scrapeProducts(category?: string): Promise<ScrapedProduct[]> {
    const products: ScrapedProduct[] = [];
    const page = await this.createPage();

    try {
      const categoriesToScrape = category
        ? { [category]: this.config.categoryUrls[category] || [] }
        : this.config.categoryUrls;

      for (const [categoryName, urls] of Object.entries(categoriesToScrape)) {
        for (const urlPath of urls) {
          const fullUrl = `${this.config.baseUrl}${urlPath}`;
          console.log(`Scraping ${categoryName}: ${fullUrl}`);

          const categoryProducts = await this.scrapeProductPage(page, fullUrl, categoryName);
          products.push(...categoryProducts);

          await this.delay();
        }
      }
    } finally {
      await page.close();
    }

    console.log(`Toolstation: Scraped ${products.length} products total`);
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

    // Wait for products to load
    await new Promise(r => setTimeout(r, 5000));
    await this.scrollToLoadAll(page);

    // Extract products using Toolstation's data-testid attributes
    const extractedProducts = await page.evaluate(() => {
      const items: Array<{
        sku: string;
        name: string;
        currentPrice: string | null;
        regularPrice: string | null;
        imageUrl: string | null;
        productUrl: string | null;
        brand: string | null;
      }> = [];

      // Find all product cards by data-testid
      const cards = document.querySelectorAll('[data-testid="product-card"]');

      cards.forEach((card) => {
        try {
          // Get product link and SKU
          const imageLink = card.querySelector('[data-testid="product-card-image-link"]') as HTMLAnchorElement;
          const reviewsLink = card.querySelector('[data-testid="product-card-reviews"]') as HTMLAnchorElement;

          if (!imageLink && !reviewsLink) return;

          // SKU from data-product-id attribute
          const sku = reviewsLink?.getAttribute('data-product-id') || '';
          if (!sku) return;

          // Name from title attribute or img alt
          const name = reviewsLink?.title ||
                       card.querySelector('img[src*="toolstation.com/images"]')?.getAttribute('alt') || '';
          if (!name || name.length < 3) return;

          // Product URL
          const productUrl = imageLink?.href || '';

          // Price - find span with £X.XX pattern
          const allSpans = card.querySelectorAll('span');
          let currentPrice: string | null = null;
          let regularPrice: string | null = null;

          allSpans.forEach((span) => {
            const text = span.textContent?.trim() || '';
            if (/^£\d+\.\d{2}$/.test(text)) {
              if (!currentPrice) {
                currentPrice = text;
              } else if (!regularPrice) {
                regularPrice = text;
              }
            }
          });

          // Check for was price
          const lineThrough = card.querySelector('.line-through, [class*="was"]');
          if (lineThrough) {
            const wasText = lineThrough.textContent?.trim() || '';
            const wasMatch = wasText.match(/£(\d+\.\d{2})/);
            if (wasMatch) {
              regularPrice = wasMatch[0];
            }
          }

          // Image - get product image (not brand logo)
          const imgs = card.querySelectorAll('img');
          let imageUrl: string | null = null;
          imgs.forEach((img) => {
            const src = img.src || '';
            if (src.includes('toolstation.com/images') && !imageUrl) {
              imageUrl = src;
            }
          });

          // Brand from product name (format: "Brand / Brand Product Name")
          const brandMatch = name.match(/^([^\/]+)\s*\//);
          const brand = brandMatch ? brandMatch[1].trim() : null;

          // Clean name (remove brand prefix if present)
          const cleanName = name.replace(/^[^\/]+\s*\/\s*/, '').trim();

          items.push({
            sku,
            name: cleanName || name,
            currentPrice,
            regularPrice,
            imageUrl,
            productUrl,
            brand,
          });
        } catch (e) {
          console.error('Error extracting product:', e);
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

      products.push({
        sku: item.sku,
        name: item.name,
        brand: item.brand,
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
        stockStatus: 'In Stock',
      });
    }

    console.log(`  Scraped ${products.length} products from ${url}`);
    return products;
  }

  /**
   * Scrape deals from Toolstation
   */
  async scrapeDeals(): Promise<ScrapedDeal[]> {
    const deals: ScrapedDeal[] = [];

    if (!this.config.dealsUrl) return deals;

    const page = await this.createPage();

    try {
      const dealsUrl = `${this.config.baseUrl}${this.config.dealsUrl}`;
      console.log(`Scraping Toolstation deals: ${dealsUrl}`);

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

        const cards = document.querySelectorAll('[data-testid="product-card"]');

        cards.forEach((card) => {
          const reviewsLink = card.querySelector('[data-testid="product-card-reviews"]') as HTMLAnchorElement;
          const imageLink = card.querySelector('[data-testid="product-card-image-link"]') as HTMLAnchorElement;

          const sku = reviewsLink?.getAttribute('data-product-id') || null;
          const name = reviewsLink?.title || '';
          if (!name) return;

          // Find prices
          const allSpans = card.querySelectorAll('span');
          let currentPrice: string | null = null;
          let regularPrice: string | null = null;

          allSpans.forEach((span) => {
            const text = span.textContent?.trim() || '';
            if (/^£\d+\.\d{2}$/.test(text)) {
              if (!currentPrice) currentPrice = text;
              else if (!regularPrice) regularPrice = text;
            }
          });

          items.push({
            sku,
            name: name.replace(/^[^\/]+\s*\/\s*/, '').trim() || name,
            currentPrice,
            regularPrice,
            productUrl: imageLink?.href || null,
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

      console.log(`Toolstation: Found ${deals.length} deals`);
    } finally {
      await page.close();
    }

    return deals;
  }

  /**
   * Scrape coupons (Toolstation doesn't have a public coupons page)
   */
  async scrapeCoupons(): Promise<ScrapedCoupon[]> {
    return [];
  }
}
