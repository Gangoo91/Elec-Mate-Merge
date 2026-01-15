import { Page } from 'puppeteer';
import { BaseScraper, ScrapedProduct, ScrapedDeal, ScrapedCoupon } from './base-scraper.js';
import { SUPPLIERS } from '../config/suppliers.js';

/**
 * Screwfix Scraper
 * Scrapes products, deals from screwfix.com
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

    // Wait for products to load
    await this.waitForSelector(page, this.config.selectors.productCard, 5000);

    // Scroll to load lazy content
    await this.scrollToLoadAll(page);

    // Extract products
    const extractedProducts = await page.evaluate((selectors) => {
      const cards = document.querySelectorAll(selectors.productCard);
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
          const nameEl = card.querySelector(selectors.productName);
          const priceEl = card.querySelector(selectors.productPrice);
          const wasPriceEl = card.querySelector(selectors.originalPrice);
          const imageEl = card.querySelector(selectors.productImage) as HTMLImageElement | null;
          const linkEl = card.querySelector(selectors.productUrl) as HTMLAnchorElement | null;
          const skuEl = card.querySelector(selectors.productSku);
          const stockEl = card.querySelector(selectors.stockStatus);

          // Extract SKU from data attribute or URL
          let sku = skuEl?.getAttribute('data-product-code') ||
                    skuEl?.getAttribute('data-sku') ||
                    card.getAttribute('data-product-id') || '';

          if (!sku && linkEl?.href) {
            const match = linkEl.href.match(/\/p\/(\d+)/);
            if (match) sku = match[1];
          }

          const name = nameEl?.textContent?.trim() || '';

          if (name && sku) {
            items.push({
              sku,
              name,
              brand: null, // Will be extracted from name
              currentPrice: priceEl?.textContent?.trim() || null,
              regularPrice: wasPriceEl?.textContent?.trim() || null,
              imageUrl: imageEl?.src || imageEl?.getAttribute('data-src') || null,
              productUrl: linkEl?.href || null,
              stockStatus: stockEl?.textContent?.trim() || 'Unknown',
            });
          }
        } catch (e) {
          console.error('Error extracting product:', e);
        }
      });

      return items;
    }, this.config.selectors);

    // Process extracted products
    for (const item of extractedProducts) {
      const currentPrice = this.parsePrice(item.currentPrice);
      const regularPrice = this.parsePrice(item.regularPrice);
      const isOnSale = regularPrice !== null && currentPrice !== null && regularPrice > currentPrice;
      const discount = this.calculateDiscount(currentPrice, regularPrice);

      // Extract brand from product name (common brands)
      const brands = ['DeWalt', 'Makita', 'Bosch', 'Milwaukee', 'Fluke', 'Stanley', 'Knipex', 'Wera', 'Bahco', 'Irwin'];
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
        stockStatus: item.stockStatus || 'Unknown',
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

      await this.waitForSelector(page, this.config.selectors.productCard, 5000);
      await this.scrollToLoadAll(page);

      const extractedDeals = await page.evaluate((selectors) => {
        const cards = document.querySelectorAll(selectors.productCard);
        const items: Array<{
          sku: string | null;
          name: string;
          currentPrice: string | null;
          regularPrice: string | null;
          productUrl: string | null;
        }> = [];

        cards.forEach((card) => {
          const nameEl = card.querySelector(selectors.productName);
          const priceEl = card.querySelector(selectors.productPrice);
          const wasPriceEl = card.querySelector(selectors.originalPrice);
          const linkEl = card.querySelector(selectors.productUrl) as HTMLAnchorElement | null;

          const name = nameEl?.textContent?.trim() || '';
          const sku = card.getAttribute('data-product-id');

          if (name) {
            items.push({
              sku,
              name,
              currentPrice: priceEl?.textContent?.trim() || null,
              regularPrice: wasPriceEl?.textContent?.trim() || null,
              productUrl: linkEl?.href || null,
            });
          }
        });

        return items;
      }, this.config.selectors);

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
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
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
    // Screwfix doesn't have a public coupon page
    return [];
  }
}
