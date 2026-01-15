import { Page } from 'puppeteer';
import { BaseScraper, ScrapedCoupon } from './base-scraper.js';

/**
 * Coupon Aggregator Scraper
 * Scrapes coupon codes from aggregator sites like VoucherCodes.co.uk
 * for all electrical suppliers
 */

interface SupplierCouponConfig {
  name: string;
  slug: string;
  voucherCodesUrl: string | null;
  myVoucherCodesUrl: string | null;
}

const SUPPLIER_COUPON_SOURCES: SupplierCouponConfig[] = [
  {
    name: 'Screwfix',
    slug: 'screwfix',
    voucherCodesUrl: 'https://www.vouchercodes.co.uk/screwfix.com',
    myVoucherCodesUrl: 'https://www.myvouchercodes.co.uk/screwfix',
  },
  {
    name: 'Toolstation',
    slug: 'toolstation',
    voucherCodesUrl: 'https://www.vouchercodes.co.uk/toolstation.com',
    myVoucherCodesUrl: 'https://www.myvouchercodes.co.uk/toolstation',
  },
  {
    name: 'CEF',
    slug: 'cef',
    voucherCodesUrl: 'https://www.vouchercodes.co.uk/cef.co.uk',
    myVoucherCodesUrl: null,
  },
  {
    name: 'ElectricalDirect',
    slug: 'electrical-direct',
    voucherCodesUrl: 'https://www.vouchercodes.co.uk/electricaldirect.co.uk',
    myVoucherCodesUrl: null,
  },
  {
    name: 'RS Components',
    slug: 'rs-components',
    voucherCodesUrl: 'https://www.vouchercodes.co.uk/uk.rs-online.com',
    myVoucherCodesUrl: 'https://www.myvouchercodes.co.uk/rs-components',
  },
  {
    name: 'TLC Electrical',
    slug: 'tlc-electrical',
    voucherCodesUrl: 'https://www.vouchercodes.co.uk/tlc-direct.co.uk',
    myVoucherCodesUrl: null,
  },
];

// Fake config for BaseScraper compatibility
const AGGREGATOR_CONFIG = {
  name: 'Coupon Aggregator',
  slug: 'coupon-aggregator',
  baseUrl: 'https://www.vouchercodes.co.uk',
  categoryUrls: {},
  dealsUrl: null,
  couponsUrl: null,
  selectors: {
    productCard: '',
    productName: '',
    productPrice: '',
    originalPrice: '',
    productImage: '',
    productUrl: '',
    productSku: '',
    stockStatus: '',
    nextPage: '',
  },
  pagination: { type: 'query' as const, maxPages: 1 },
  rateLimit: 3000,  // Be polite to aggregator sites
};

export class CouponAggregatorScraper extends BaseScraper {
  constructor() {
    super(AGGREGATOR_CONFIG);
  }

  /**
   * Not used - this scraper only does coupons
   */
  async scrapeProducts(): Promise<never[]> {
    return [];
  }

  /**
   * Not used - this scraper only does coupons
   */
  async scrapeDeals(): Promise<never[]> {
    return [];
  }

  /**
   * Scrape coupons for all suppliers from aggregator sites
   */
  async scrapeCoupons(): Promise<ScrapedCoupon[]> {
    const allCoupons: ScrapedCoupon[] = [];
    const page = await this.createPage();

    try {
      for (const supplier of SUPPLIER_COUPON_SOURCES) {
        console.log(`\nScraping coupons for ${supplier.name}...`);

        // Try VoucherCodes.co.uk
        if (supplier.voucherCodesUrl) {
          const voucherCodesCoupons = await this.scrapeVoucherCodes(page, supplier);
          allCoupons.push(...voucherCodesCoupons);
          await this.delay();
        }

        // Try MyVoucherCodes.co.uk
        if (supplier.myVoucherCodesUrl) {
          const myVoucherCodesCoupons = await this.scrapeMyVoucherCodes(page, supplier);
          allCoupons.push(...myVoucherCodesCoupons);
          await this.delay();
        }
      }
    } finally {
      await page.close();
    }

    // Deduplicate coupons by code
    const uniqueCoupons = this.deduplicateCoupons(allCoupons);

    console.log(`\nTotal unique coupons found: ${uniqueCoupons.length}`);
    return uniqueCoupons;
  }

  /**
   * Scrape VoucherCodes.co.uk
   */
  private async scrapeVoucherCodes(
    page: Page,
    supplier: SupplierCouponConfig
  ): Promise<ScrapedCoupon[]> {
    const coupons: ScrapedCoupon[] = [];

    if (!supplier.voucherCodesUrl) return coupons;

    const success = await this.navigateWithRetry(page, supplier.voucherCodesUrl);
    if (!success) return coupons;

    await this.waitForSelector(page, '.offer, .voucher, [data-offer-type]', 5000);

    const extractedCoupons = await page.evaluate(() => {
      const offers = document.querySelectorAll('.offer, .voucher, [data-offer-type="code"]');
      const items: Array<{
        code: string | null;
        description: string;
        discountText: string | null;
        expiryText: string | null;
        isVerified: boolean;
      }> = [];

      offers.forEach((offer) => {
        // Look for actual code (not just "deal" offers)
        const codeEl = offer.querySelector('.code, .voucher-code, [data-clipboard-text], input[readonly]');
        const titleEl = offer.querySelector('.offer-title, .voucher-title, h3, h4');
        const discountEl = offer.querySelector('.discount, .saving, .offer-amount');
        const expiryEl = offer.querySelector('.expiry, .expires, .valid-until');
        const verifiedEl = offer.querySelector('.verified, .tested, [data-verified="true"]');

        // Get the code
        let code = codeEl?.textContent?.trim() ||
                   codeEl?.getAttribute('data-clipboard-text') ||
                   (codeEl as HTMLInputElement)?.value || null;

        // Clean up code (remove "Copy" text etc)
        if (code) {
          code = code.replace(/copy|click|reveal/gi, '').trim();
          if (code.length < 3 || code.length > 30) code = null;  // Invalid code
        }

        const description = titleEl?.textContent?.trim() || '';

        // Only add if we have a valid code
        if (code && description) {
          items.push({
            code,
            description,
            discountText: discountEl?.textContent?.trim() || null,
            expiryText: expiryEl?.textContent?.trim() || null,
            isVerified: !!verifiedEl,
          });
        }
      });

      return items;
    });

    for (const item of extractedCoupons) {
      if (!item.code) continue;

      const { discountType, discountValue } = this.parseDiscount(item.discountText || item.description);
      const validUntil = item.expiryText ? this.parseExpiryDate(item.expiryText) : null;

      coupons.push({
        code: item.code,
        description: item.description,
        discountType,
        discountValue,
        minimumSpend: this.parseMinSpend(item.description),
        validUntil,
        sourceUrl: supplier.voucherCodesUrl!,
      });
    }

    console.log(`  VoucherCodes: Found ${coupons.length} coupons for ${supplier.name}`);
    return coupons;
  }

  /**
   * Scrape MyVoucherCodes.co.uk
   */
  private async scrapeMyVoucherCodes(
    page: Page,
    supplier: SupplierCouponConfig
  ): Promise<ScrapedCoupon[]> {
    const coupons: ScrapedCoupon[] = [];

    if (!supplier.myVoucherCodesUrl) return coupons;

    const success = await this.navigateWithRetry(page, supplier.myVoucherCodesUrl);
    if (!success) return coupons;

    await this.waitForSelector(page, '.offer-item, .code-item, [data-code]', 5000);

    const extractedCoupons = await page.evaluate(() => {
      const offers = document.querySelectorAll('.offer-item, .code-item, [data-code]');
      const items: Array<{
        code: string | null;
        description: string;
        discountText: string | null;
        expiryText: string | null;
      }> = [];

      offers.forEach((offer) => {
        const codeEl = offer.querySelector('.code, [data-code], .promo-code');
        const titleEl = offer.querySelector('.title, .offer-title, h3');
        const discountEl = offer.querySelector('.discount, .saving');
        const expiryEl = offer.querySelector('.expiry, .valid');

        let code = codeEl?.textContent?.trim() ||
                   codeEl?.getAttribute('data-code') || null;

        if (code) {
          code = code.replace(/copy|click|get code/gi, '').trim();
          if (code.length < 3 || code.length > 30) code = null;
        }

        const description = titleEl?.textContent?.trim() || '';

        if (code && description) {
          items.push({
            code,
            description,
            discountText: discountEl?.textContent?.trim() || null,
            expiryText: expiryEl?.textContent?.trim() || null,
          });
        }
      });

      return items;
    });

    for (const item of extractedCoupons) {
      if (!item.code) continue;

      const { discountType, discountValue } = this.parseDiscount(item.discountText || item.description);
      const validUntil = item.expiryText ? this.parseExpiryDate(item.expiryText) : null;

      coupons.push({
        code: item.code,
        description: item.description,
        discountType,
        discountValue,
        minimumSpend: this.parseMinSpend(item.description),
        validUntil,
        sourceUrl: supplier.myVoucherCodesUrl!,
      });
    }

    console.log(`  MyVoucherCodes: Found ${coupons.length} coupons for ${supplier.name}`);
    return coupons;
  }

  /**
   * Parse discount from text
   */
  private parseDiscount(text: string): { discountType: 'percentage' | 'fixed' | 'free_delivery'; discountValue: number } {
    const lowerText = text.toLowerCase();

    if (lowerText.includes('free delivery') || lowerText.includes('free shipping')) {
      return { discountType: 'free_delivery', discountValue: 0 };
    }

    const percentMatch = text.match(/(\d+)%/);
    if (percentMatch) {
      return { discountType: 'percentage', discountValue: parseInt(percentMatch[1]) };
    }

    const fixedMatch = text.match(/£(\d+(?:\.\d{2})?)/);
    if (fixedMatch) {
      return { discountType: 'fixed', discountValue: parseFloat(fixedMatch[1]) };
    }

    return { discountType: 'percentage', discountValue: 0 };
  }

  /**
   * Parse minimum spend from text
   */
  private parseMinSpend(text: string): number | null {
    const match = text.match(/(?:min(?:imum)?|over|spend)\s*£?(\d+)/i);
    if (match) {
      return parseFloat(match[1]);
    }
    return null;
  }

  /**
   * Parse expiry date from text
   */
  private parseExpiryDate(text: string): Date | null {
    // "Expires 31/01/2025" or "Valid until January 31"
    const patterns = [
      /(\d{1,2})\/(\d{1,2})\/(\d{4})/,
      /(\d{1,2})\/(\d{1,2})\/(\d{2})/,
      /(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2})/i,
      /(\d{1,2})\s+(january|february|march|april|may|june|july|august|september|october|november|december)/i,
    ];

    const months: Record<string, number> = {
      january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
      july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
    };

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        try {
          // DD/MM/YYYY format
          if (match[3] && !isNaN(parseInt(match[1]))) {
            const day = parseInt(match[1]);
            const month = parseInt(match[2]) - 1;
            let year = parseInt(match[3]);
            if (year < 100) year += 2000;  // Handle YY format
            return new Date(year, month, day, 23, 59, 59);
          }
          // Month name format
          if (months[match[1]?.toLowerCase()]) {
            const month = months[match[1].toLowerCase()];
            const day = parseInt(match[2]);
            const year = new Date().getFullYear();
            return new Date(year, month, day, 23, 59, 59);
          }
          if (months[match[2]?.toLowerCase()]) {
            const month = months[match[2].toLowerCase()];
            const day = parseInt(match[1]);
            const year = new Date().getFullYear();
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
   * Deduplicate coupons by code (keep most recent/verified)
   */
  private deduplicateCoupons(coupons: ScrapedCoupon[]): ScrapedCoupon[] {
    const uniqueMap = new Map<string, ScrapedCoupon>();

    for (const coupon of coupons) {
      const key = coupon.code.toUpperCase();
      const existing = uniqueMap.get(key);

      // Keep if new or if this one has better data
      if (!existing ||
          (coupon.validUntil && !existing.validUntil) ||
          (coupon.discountValue > existing.discountValue)) {
        uniqueMap.set(key, coupon);
      }
    }

    return Array.from(uniqueMap.values());
  }

  /**
   * Get coupons for a specific supplier
   */
  async scrapeCouponsForSupplier(supplierSlug: string): Promise<ScrapedCoupon[]> {
    const supplier = SUPPLIER_COUPON_SOURCES.find(s => s.slug === supplierSlug);
    if (!supplier) return [];

    const page = await this.createPage();
    const coupons: ScrapedCoupon[] = [];

    try {
      if (supplier.voucherCodesUrl) {
        const voucherCodesCoupons = await this.scrapeVoucherCodes(page, supplier);
        coupons.push(...voucherCodesCoupons);
      }

      if (supplier.myVoucherCodesUrl) {
        await this.delay();
        const myVoucherCodesCoupons = await this.scrapeMyVoucherCodes(page, supplier);
        coupons.push(...myVoucherCodesCoupons);
      }
    } finally {
      await page.close();
    }

    return this.deduplicateCoupons(coupons);
  }
}
