#!/usr/bin/env tsx
import 'dotenv/config';
import { ScrewfixScraper } from './scrapers/screwfix-scraper.js';
import { ToolstationScraper } from './scrapers/toolstation-scraper.js';
import { CEFScraper } from './scrapers/cef-scraper.js';
import { ElectricalDirectScraper } from './scrapers/electrical-direct-scraper.js';
import { RSComponentsScraper } from './scrapers/rs-components-scraper.js';
import { TLCElectricalScraper } from './scrapers/tlc-electrical-scraper.js';
import { CouponAggregatorScraper } from './scrapers/coupon-aggregator-scraper.js';
import { DatabaseClient } from './database/supabase-client.js';
import { BaseScraper } from './scrapers/base-scraper.js';

/**
 * CLI for running scrapers manually
 * Usage: tsx src/cli.ts <supplier|all|deals|coupons> [category]
 */

const scrapers: Record<string, () => BaseScraper> = {
  screwfix: () => new ScrewfixScraper(),
  toolstation: () => new ToolstationScraper(),
  cef: () => new CEFScraper(),
  'electrical-direct': () => new ElectricalDirectScraper(),
  'rs-components': () => new RSComponentsScraper(),
  'tlc-electrical': () => new TLCElectricalScraper(),
  'coupon-aggregator': () => new CouponAggregatorScraper(),
};

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];
  const category = args[1];

  if (!command) {
    console.log(`
Elec-Mate Scraper CLI
=====================

Usage:
  tsx src/cli.ts <command> [options]

Commands:
  screwfix [category]       Scrape Screwfix products
  toolstation [category]    Scrape Toolstation products
  cef [category]            Scrape CEF products
  electrical-direct [cat]   Scrape ElectricalDirect products
  rs-components [category]  Scrape RS Components products
  tlc-electrical [category] Scrape TLC Electrical products
  coupon-aggregator         Scrape coupons from aggregator sites
  all                       Scrape all suppliers
  deals                     Scrape deals only from all suppliers
  coupons                   Scrape coupons only (aggregator + suppliers)

Categories:
  hand-tools, power-tools, test-equipment, ppe, tool-storage,
  cables, consumer-units, lighting, wiring-accessories

Examples:
  tsx src/cli.ts screwfix                  # Full Screwfix scrape
  tsx src/cli.ts screwfix hand-tools       # Screwfix hand tools only
  tsx src/cli.ts cef                        # Full CEF scrape
  tsx src/cli.ts rs-components              # RS Components (10,000+ products)
  tsx src/cli.ts all                        # All suppliers (~25,000 products)
  tsx src/cli.ts deals                      # Deals only from all suppliers
  tsx src/cli.ts coupons                    # Coupons from all sources
`);
    process.exit(0);
  }

  const db = new DatabaseClient();

  if (command === 'all') {
    console.log('Running full scrape for all suppliers...\n');

    for (const [slug, factory] of Object.entries(scrapers)) {
      console.log(`\n--- Scraping ${slug} ---\n`);
      const scraper = factory();
      const result = await scraper.scrapeAll();

      if (result.products.length > 0) {
        await db.saveProducts(slug, result.products);
      }
      if (result.deals.length > 0) {
        await db.saveDeals(slug, result.deals);
      }
      if (result.coupons.length > 0) {
        await db.saveCoupons(slug, result.coupons);
      }

      console.log(`\nResults for ${slug}:`);
      console.log(`  Products: ${result.products.length}`);
      console.log(`  Deals: ${result.deals.length}`);
      console.log(`  Coupons: ${result.coupons.length}`);
      console.log(`  Errors: ${result.errors.length}`);
      console.log(`  Duration: ${result.duration}ms`);

      if (result.errors.length > 0) {
        console.log(`  Error details: ${result.errors.join(', ')}`);
      }

      await db.updateSupplierLastScraped(slug);
    }

    const deactivated = await db.deactivateExpiredDeals();
    console.log(`\nDeactivated ${deactivated} expired deals`);

  } else if (command === 'deals') {
    console.log('Running deals-only scrape for all suppliers...\n');

    for (const [slug, factory] of Object.entries(scrapers)) {
      console.log(`\n--- Scraping ${slug} deals ---\n`);
      const scraper = factory();

      await scraper.init();
      const deals = await scraper.scrapeDeals();
      const coupons = await scraper.scrapeCoupons();
      await scraper.close();

      if (deals.length > 0) {
        await db.saveDeals(slug, deals);
      }
      if (coupons.length > 0) {
        await db.saveCoupons(slug, coupons);
      }

      console.log(`\nResults for ${slug}:`);
      console.log(`  Deals: ${deals.length}`);
      console.log(`  Coupons: ${coupons.length}`);
    }

    const deactivated = await db.deactivateExpiredDeals();
    console.log(`\nDeactivated ${deactivated} expired deals`);

  } else if (command === 'coupons') {
    console.log('Running coupons-only scrape...\n');

    // First run the coupon aggregator (VoucherCodes, MyVoucherCodes)
    console.log('\n--- Running Coupon Aggregator ---\n');
    const aggregator = new CouponAggregatorScraper();
    await aggregator.init();
    const aggregatorCoupons = await aggregator.scrapeCoupons();
    await aggregator.close();

    if (aggregatorCoupons.length > 0) {
      // Group by supplier and save
      const couponsBySupplier = new Map<string, typeof aggregatorCoupons>();
      for (const coupon of aggregatorCoupons) {
        // Extract supplier from source URL
        const supplierMatch = coupon.sourceUrl.match(/vouchercodes\.co\.uk\/([^\/]+)|myvouchercodes\.co\.uk\/([^\/]+)/);
        const supplierHint = supplierMatch?.[1] || supplierMatch?.[2] || 'unknown';

        // Map to our supplier slugs
        let supplierSlug = 'unknown';
        if (supplierHint.includes('screwfix')) supplierSlug = 'screwfix';
        else if (supplierHint.includes('toolstation')) supplierSlug = 'toolstation';
        else if (supplierHint.includes('cef')) supplierSlug = 'cef';
        else if (supplierHint.includes('electrical')) supplierSlug = 'electrical-direct';
        else if (supplierHint.includes('rs')) supplierSlug = 'rs-components';
        else if (supplierHint.includes('tlc')) supplierSlug = 'tlc-electrical';

        if (!couponsBySupplier.has(supplierSlug)) {
          couponsBySupplier.set(supplierSlug, []);
        }
        couponsBySupplier.get(supplierSlug)!.push(coupon);
      }

      for (const [slug, coupons] of couponsBySupplier) {
        if (slug !== 'unknown') {
          await db.saveCoupons(slug, coupons);
          console.log(`  Saved ${coupons.length} coupons for ${slug}`);
        }
      }
    }
    console.log(`\nAggregator total: ${aggregatorCoupons.length} coupons`);

    // Then check supplier-specific coupon pages
    console.log('\n--- Checking supplier coupon pages ---\n');
    const suppliersWithCoupons = ['electrical-direct'];  // Only ED has a coupons page
    for (const slug of suppliersWithCoupons) {
      const factory = scrapers[slug];
      if (factory) {
        const scraper = factory();
        await scraper.init();
        const coupons = await scraper.scrapeCoupons();
        await scraper.close();

        if (coupons.length > 0) {
          await db.saveCoupons(slug, coupons);
        }
        console.log(`  ${slug}: ${coupons.length} coupons`);
      }
    }

  } else if (scrapers[command]) {
    const slug = command;
    console.log(`Running scrape for ${slug}...`);
    if (category) {
      console.log(`Category filter: ${category}`);
    }

    const scraper = scrapers[slug]();
    await scraper.init();

    const products = await scraper.scrapeProducts(category);
    const deals = await scraper.scrapeDeals();
    const coupons = await scraper.scrapeCoupons();

    await scraper.close();

    if (products.length > 0) {
      await db.saveProducts(slug, products);
    }
    if (deals.length > 0) {
      await db.saveDeals(slug, deals);
    }
    if (coupons.length > 0) {
      await db.saveCoupons(slug, coupons);
    }

    console.log(`\nResults:`);
    console.log(`  Products: ${products.length}`);
    console.log(`  Deals: ${deals.length}`);
    console.log(`  Coupons: ${coupons.length}`);

    await db.updateSupplierLastScraped(slug);

  } else {
    console.error(`Unknown command: ${command}`);
    console.log('Run without arguments for usage information.');
    process.exit(1);
  }

  console.log('\nDone!');
  process.exit(0);
}

main().catch((error) => {
  console.error('CLI error:', error);
  process.exit(1);
});
