import { Page } from 'puppeteer';
import { BaseScraper, ScrapedProduct, ScrapedDeal, ScrapedCoupon } from './base-scraper.js';
import { SUPPLIERS } from '../config/suppliers.js';

/**
 * Electric Center Scraper
 * Part of Sonepar Group - major UK electrical wholesaler
 * https://www.electric-center.com
 */

export class ElectricCenterScraper extends BaseScraper {
  constructor() {
    super(SUPPLIERS['electric-center']);
  }

  /**
   * Scrape products from Electric Center
   */
  async scrapeProducts(category?: string): Promise<ScrapedProduct[]> {
    const products: ScrapedProduct[] = [];
    const page = await this.createPage();

    try {
      const categoryUrls = this.config.categoryUrls;

      const categoriesToScrape = category
        ? { [category]: categoryUrls[category] || [] }
        : categoryUrls;

      for (const [categoryName, urls] of Object.entries(categoriesToScrape)) {
        for (const urlPath of urls) {
          const fullUrl = `${this.config.baseUrl}${urlPath}`;
          console.log(`Scraping Electric Center ${categoryName}: ${fullUrl}`);

          const categoryProducts = await this.scrapeProductPage(page, fullUrl, categoryName);
          products.push(...categoryProducts);

          await this.delay();
        }
      }
    } finally {
      await page.close();
    }

    console.log(`Electric Center: Scraped ${products.length} products total`);
    return products;
  }

  /**
   * Scrape a single product listing page
   * Electric Center uses a Sonepar e-commerce platform
   */
  private async scrapeProductPage(
    page: Page,
    url: string,
    category: string
  ): Promise<ScrapedProduct[]> {
    const products: ScrapedProduct[] = [];

    try {
      const success = await this.navigateWithRetry(page, url);
      if (!success) return products;
    } catch (e) {
      console.log(`  Electric Center: Navigation failed for ${url}`);
      return products;
    }

    // Wait for page to load
    await new Promise(r => setTimeout(r, 10000));

    // Try to wait for product content
    try {
      await page.waitForFunction(() => {
        return document.body.innerText.includes('£') ||
               document.querySelectorAll('[class*="product"]').length > 3;
      }, { timeout: 15000 });
    } catch {
      // Continue anyway
    }

    try {
      await this.scrollToLoadAll(page);
    } catch (e) {
      // Continue if scroll fails
    }

    // Extract products
    let extractedProducts: Array<{
      sku: string;
      name: string;
      currentPrice: string | null;
      regularPrice: string | null;
      imageUrl: string | null;
      productUrl: string | null;
      stockStatus: string;
      brand?: string | null;
    }> = [];

    try {
      extractedProducts = await page.evaluate(() => {
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

        // Method 1: Look for embedded JSON data
        const scripts = document.querySelectorAll('script');
        scripts.forEach((script) => {
          try {
            const content = script.textContent || '';
            if (content.includes('"products"') || content.includes('"sku"') || content.includes('"items"')) {
              const productMatches = content.matchAll(/"sku"\s*:\s*"([^"]+)"[^}]*"name"\s*:\s*"([^"]+)"[^}]*"price"\s*:?\s*"?([0-9.]+)"?/g);
              for (const match of productMatches) {
                const sku = match[1];
                if (!seenSkus.has(sku)) {
                  seenSkus.add(sku);
                  items.push({
                    sku,
                    name: match[2],
                    currentPrice: `£${match[3]}`,
                    regularPrice: null,
                    imageUrl: null,
                    productUrl: null,
                    stockStatus: 'Unknown',
                  });
                }
              }
            }
          } catch (e) {
            // Continue
          }
        });

        if (items.length > 0) return items;

        // Method 2: DOM-based extraction - look for product cards
        const cardSelectors = [
          '[class*="product-card"]',
          '[class*="ProductCard"]',
          '[class*="product-item"]',
          '[class*="product-tile"]',
          '[data-product]',
          'article[class*="product"]',
          '.product-box',
          '[class*="searchResult"]',
        ];

        for (const selector of cardSelectors) {
          const cards = document.querySelectorAll(selector);
          if (cards.length > 2) {
            cards.forEach((card) => {
              try {
                const link = card.querySelector('a[href*="/product/"], a[href*="/p/"]') as HTMLAnchorElement;

                const skuFromUrl = link?.href?.match(/\/([A-Z0-9-]+)(?:\?|$)/i);
                const sku = card.getAttribute('data-sku') ||
                           card.getAttribute('data-product-id') ||
                           card.getAttribute('data-productcode') ||
                           (skuFromUrl ? skuFromUrl[1] : `EC-${Math.random().toString(36).substr(2, 8)}`);

                if (seenSkus.has(sku)) return;
                seenSkus.add(sku);

                const nameEl = card.querySelector('h2, h3, h4, [class*="name"], [class*="title"], [class*="Name"]');
                const name = nameEl?.textContent?.trim() || link?.textContent?.trim() || '';
                if (!name || name.length < 3) return;

                const text = card.textContent || '';
                const priceMatches = text.match(/£([\d,]+\.?\d*)/g);

                const img = card.querySelector('img') as HTMLImageElement;

                let stockStatus = 'Unknown';
                const lowerText = text.toLowerCase();
                if (lowerText.includes('in stock')) stockStatus = 'In Stock';
                else if (lowerText.includes('out of stock')) stockStatus = 'Out of Stock';
                else if (lowerText.includes('available')) stockStatus = 'Available';

                items.push({
                  sku,
                  name,
                  currentPrice: priceMatches?.[0] || null,
                  regularPrice: priceMatches && priceMatches.length > 1 ? priceMatches[1] : null,
                  imageUrl: img?.src || img?.getAttribute('data-src') || null,
                  productUrl: link?.href || null,
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

        // Method 3: Find all product links and extract from nearby content
        const productLinks = document.querySelectorAll('a[href*="/product/"], a[href*="/p/"]');
        productLinks.forEach((link) => {
          try {
            const anchor = link as HTMLAnchorElement;
            const skuMatch = anchor.href.match(/\/([A-Z0-9-]{4,})(?:\?|$)/i);
            if (!skuMatch) return;

            const sku = skuMatch[1].toUpperCase();
            if (seenSkus.has(sku)) return;
            seenSkus.add(sku);

            let container = anchor.parentElement;
            for (let i = 0; i < 8 && container; i++) {
              if (container.textContent?.match(/£\d/)) break;
              container = container.parentElement;
            }

            const name = anchor.textContent?.trim() ||
                        container?.querySelector('h2, h3, h4')?.textContent?.trim() || '';
            if (!name || name.length < 3) return;

            const text = container?.textContent || '';
            const priceMatch = text.match(/£([\d,]+\.?\d*)/);

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
    } catch (e) {
      console.log(`  Electric Center: Extraction failed for ${url}`);
      return products;
    }

    for (const item of extractedProducts) {
      const currentPrice = this.parsePrice(item.currentPrice);
      const regularPrice = this.parsePrice(item.regularPrice);
      const isOnSale = regularPrice !== null && currentPrice !== null && regularPrice > currentPrice;
      const discount = this.calculateDiscount(currentPrice, regularPrice);

      const brands = ['Schneider', 'ABB', 'Hager', 'Chint', 'Eaton', 'Legrand', 'MK', 'Click', 'Honeywell', 'Scolmore', 'BG'];
      const brand = item.brand || brands.find(b => item.name.toLowerCase().includes(b.toLowerCase())) || null;

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

    console.log(`  Electric Center: Scraped ${products.length} products from ${url}`);
    return products;
  }

  /**
   * Scrape deals from Electric Center offers page
   */
  async scrapeDeals(): Promise<ScrapedDeal[]> {
    const deals: ScrapedDeal[] = [];

    if (!this.config.dealsUrl) return deals;

    const page = await this.createPage();

    try {
      const dealsUrl = `${this.config.baseUrl}${this.config.dealsUrl}`;
      console.log(`Scraping Electric Center deals: ${dealsUrl}`);

      const success = await this.navigateWithRetry(page, dealsUrl);
      if (!success) return deals;

      await new Promise(r => setTimeout(r, 10000));
      await this.scrollToLoadAll(page);

      const extractedDeals = await page.evaluate(() => {
        const cards = document.querySelectorAll('[class*="product"], [class*="offer"], article');
        const items: Array<{
          sku: string | null;
          name: string;
          currentPrice: string | null;
          regularPrice: string | null;
          productUrl: string | null;
        }> = [];

        cards.forEach((card) => {
          const nameEl = card.querySelector('h2, h3, h4, [class*="name"], [class*="title"]');
          const name = nameEl?.textContent?.trim() || '';

          if (name && name.length > 3) {
            const text = card.textContent || '';
            const priceMatches = text.match(/£([\d,]+\.?\d*)/g);
            const link = card.querySelector('a') as HTMLAnchorElement;

            items.push({
              sku: card.getAttribute('data-sku') || card.getAttribute('data-product-id'),
              name,
              currentPrice: priceMatches?.[0] || null,
              regularPrice: priceMatches && priceMatches.length > 1 ? priceMatches[1] : null,
              productUrl: link?.href || null,
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
            dealType: 'weekly_deal',
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            sourceUrl: item.productUrl || dealsUrl,
          });
        }
      }

      console.log(`Electric Center: Found ${deals.length} deals`);
    } finally {
      await page.close();
    }

    return deals;
  }

  /**
   * Electric Center doesn't have public coupons
   */
  async scrapeCoupons(): Promise<ScrapedCoupon[]> {
    return [];
  }
}
