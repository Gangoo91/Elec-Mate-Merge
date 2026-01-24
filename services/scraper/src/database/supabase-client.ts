import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ScrapedProduct, ScrapedDeal, ScrapedCoupon, ScrapeResult } from '../scrapers/base-scraper.js';

/**
 * Supabase Database Client
 * Handles saving scraped data to the database
 */

export class DatabaseClient {
  private supabase: SupabaseClient;
  private supplierCache: Map<string, string> = new Map();

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * Get supplier ID from slug
   */
  async getSupplierId(slug: string): Promise<string | null> {
    // Check cache first
    if (this.supplierCache.has(slug)) {
      return this.supplierCache.get(slug)!;
    }

    const { data, error } = await this.supabase
      .from('marketplace_suppliers')
      .select('id')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      console.error(`Failed to get supplier ID for ${slug}:`, error);
      return null;
    }

    this.supplierCache.set(slug, data.id);
    return data.id;
  }

  /**
   * Save scraped products to database
   */
  async saveProducts(
    supplierSlug: string,
    products: ScrapedProduct[]
  ): Promise<{ inserted: number; updated: number; errors: number }> {
    const supplierId = await this.getSupplierId(supplierSlug);
    if (!supplierId) {
      console.error(`Supplier not found: ${supplierSlug}`);
      return { inserted: 0, updated: 0, errors: products.length };
    }

    // Deduplicate products by SKU before processing
    // This prevents "ON CONFLICT DO UPDATE cannot affect row a second time" errors
    const uniqueProducts = new Map<string, ScrapedProduct>();
    for (const product of products) {
      const key = product.sku;
      if (!uniqueProducts.has(key)) {
        uniqueProducts.set(key, product);
      } else {
        // Keep the one with lower price (better deal)
        const existing = uniqueProducts.get(key)!;
        if (product.currentPrice && existing.currentPrice && product.currentPrice < existing.currentPrice) {
          uniqueProducts.set(key, product);
        }
      }
    }
    const deduplicatedProducts = Array.from(uniqueProducts.values());

    if (deduplicatedProducts.length < products.length) {
      console.log(`Deduplicated: ${products.length} -> ${deduplicatedProducts.length} products (removed ${products.length - deduplicatedProducts.length} duplicates)`);
    }

    let inserted = 0;
    let updated = 0;
    let errors = 0;

    // Process in batches of 50
    const batchSize = 50;
    for (let i = 0; i < deduplicatedProducts.length; i += batchSize) {
      const batch = deduplicatedProducts.slice(i, i + batchSize);

      const records = batch.map((p) => ({
        supplier_id: supplierId,
        sku: p.sku,
        name: p.name,
        brand: p.brand,
        category: p.category,
        subcategory: p.subcategory,
        current_price: p.currentPrice,
        regular_price: p.regularPrice,
        is_on_sale: p.isOnSale,
        discount_percentage: p.discountPercentage,
        description: p.description,
        highlights: p.highlights,
        image_url: p.imageUrl,
        product_url: p.productUrl,
        stock_status: p.stockStatus,
        scraped_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      }));

      const { error, data } = await this.supabase
        .from('marketplace_products')
        .upsert(records, {
          onConflict: 'supplier_id,sku',
          ignoreDuplicates: false,
        })
        .select('id');

      if (error) {
        console.error(`Batch insert error:`, error);
        errors += batch.length;
      } else {
        // Supabase upsert doesn't distinguish between insert/update
        // We'll count all as inserted for simplicity
        inserted += data?.length || 0;
      }
    }

    console.log(`Products saved: ${inserted} inserted/updated, ${errors} errors`);
    return { inserted, updated, errors };
  }

  /**
   * Save scraped deals to database
   */
  async saveDeals(
    supplierSlug: string,
    deals: ScrapedDeal[]
  ): Promise<{ inserted: number; errors: number }> {
    const supplierId = await this.getSupplierId(supplierSlug);
    if (!supplierId) {
      return { inserted: 0, errors: deals.length };
    }

    let inserted = 0;
    let errors = 0;

    for (const deal of deals) {
      // Try to find matching product
      let productId: string | null = null;
      if (deal.productSku) {
        const { data: product } = await this.supabase
          .from('marketplace_products')
          .select('id')
          .eq('supplier_id', supplierId)
          .eq('sku', deal.productSku)
          .single();
        productId = product?.id || null;
      }

      const { error } = await this.supabase
        .from('marketplace_deals')
        .insert({
          product_id: productId,
          supplier_id: supplierId,
          deal_type: deal.dealType,
          original_price: deal.originalPrice,
          deal_price: deal.dealPrice,
          discount_percentage: deal.discountPercentage,
          title: deal.title,
          description: deal.description,
          expires_at: deal.expiresAt?.toISOString() || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          source_url: deal.sourceUrl,
          is_active: true,
        });

      if (error) {
        console.error(`Deal insert error:`, error);
        errors++;
      } else {
        inserted++;
      }
    }

    console.log(`Deals saved: ${inserted} inserted, ${errors} errors`);
    return { inserted, errors };
  }

  /**
   * Save scraped coupons to database
   */
  async saveCoupons(
    supplierSlug: string,
    coupons: ScrapedCoupon[]
  ): Promise<{ inserted: number; errors: number }> {
    const supplierId = await this.getSupplierId(supplierSlug);
    if (!supplierId) {
      return { inserted: 0, errors: coupons.length };
    }

    let inserted = 0;
    let errors = 0;

    for (const coupon of coupons) {
      const { error } = await this.supabase
        .from('marketplace_coupon_codes')
        .upsert({
          supplier_id: supplierId,
          code: coupon.code,
          description: coupon.description,
          discount_type: coupon.discountType,
          discount_value: coupon.discountValue,
          minimum_spend: coupon.minimumSpend,
          valid_until: coupon.validUntil?.toISOString(),
          source_url: coupon.sourceUrl,
          scraped_at: new Date().toISOString(),
        }, {
          onConflict: 'supplier_id,code',
        });

      if (error) {
        console.error(`Coupon insert error:`, error);
        errors++;
      } else {
        inserted++;
      }
    }

    console.log(`Coupons saved: ${inserted} inserted, ${errors} errors`);
    return { inserted, errors };
  }

  /**
   * Create a scrape job record
   */
  async createScrapeJob(
    supplierSlug: string,
    jobType: 'full_catalog' | 'deals_only' | 'coupons_only' | 'incremental'
  ): Promise<string | null> {
    const supplierId = await this.getSupplierId(supplierSlug);
    if (!supplierId) return null;

    const { data, error } = await this.supabase
      .from('marketplace_scrape_jobs')
      .insert({
        supplier_id: supplierId,
        job_type: jobType,
        status: 'running',
        started_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (error) {
      console.error('Failed to create scrape job:', error);
      return null;
    }

    return data?.id || null;
  }

  /**
   * Update scrape job with results
   */
  async completeScrapeJob(
    jobId: string,
    result: ScrapeResult
  ): Promise<void> {
    const { error } = await this.supabase
      .from('marketplace_scrape_jobs')
      .update({
        status: result.errors.length > 0 ? 'completed' : 'completed',
        completed_at: new Date().toISOString(),
        products_found: result.products.length,
        deals_found: result.deals.length,
        coupons_found: result.coupons.length,
        errors: result.errors,
      })
      .eq('id', jobId);

    if (error) {
      console.error('Failed to complete scrape job:', error);
    }
  }

  /**
   * Update supplier last_scraped_at timestamp
   */
  async updateSupplierLastScraped(supplierSlug: string): Promise<void> {
    const { error } = await this.supabase
      .from('marketplace_suppliers')
      .update({ last_scraped_at: new Date().toISOString() })
      .eq('slug', supplierSlug);

    if (error) {
      console.error('Failed to update supplier timestamp:', error);
    }
  }

  /**
   * Deactivate expired deals
   */
  async deactivateExpiredDeals(): Promise<number> {
    const { data, error } = await this.supabase
      .from('marketplace_deals')
      .update({ is_active: false })
      .lt('expires_at', new Date().toISOString())
      .eq('is_active', true)
      .select('id');

    if (error) {
      console.error('Failed to deactivate expired deals:', error);
      return 0;
    }

    return data?.length || 0;
  }
}
