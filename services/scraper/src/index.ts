import 'dotenv/config';
import express from 'express';
import { CronJob } from 'cron';
import { ScrewfixScraper } from './scrapers/screwfix-scraper.js';
import { ToolstationScraper } from './scrapers/toolstation-scraper.js';
import { CEFScraper } from './scrapers/cef-scraper.js';
import { ElectricalDirectScraper } from './scrapers/electrical-direct-scraper.js';
import { RSComponentsScraper } from './scrapers/rs-components-scraper.js';
import { TLCElectricalScraper } from './scrapers/tlc-electrical-scraper.js';
import { EdmundsonScraper } from './scrapers/edmundson-scraper.js';
import { YesssScraper } from './scrapers/yesss-scraper.js';
import { ElectricCenterScraper } from './scrapers/electric-center-scraper.js';
import { RexelScraper } from './scrapers/rexel-scraper.js';
import { CouponAggregatorScraper } from './scrapers/coupon-aggregator-scraper.js';
import { DatabaseClient } from './database/supabase-client.js';
import { BaseScraper } from './scrapers/base-scraper.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Initialize database client
const db = new DatabaseClient();

// Scraper registry - all 10 suppliers + coupon aggregator
const scrapers: Record<string, () => BaseScraper> = {
  screwfix: () => new ScrewfixScraper(),
  toolstation: () => new ToolstationScraper(),
  cef: () => new CEFScraper(),
  'electrical-direct': () => new ElectricalDirectScraper(),
  'rs-components': () => new RSComponentsScraper(),
  'tlc-electrical': () => new TLCElectricalScraper(),
  edmundson: () => new EdmundsonScraper(),
  yesss: () => new YesssScraper(),
  'electric-center': () => new ElectricCenterScraper(),
  rexel: () => new RexelScraper(),
  'coupon-aggregator': () => new CouponAggregatorScraper(),
};

/**
 * Run a scraper for a specific supplier
 */
async function runScraper(supplierSlug: string, dealsOnly = false): Promise<{
  success: boolean;
  products: number;
  deals: number;
  coupons: number;
  errors: string[];
  duration: number;
}> {
  const scraperFactory = scrapers[supplierSlug];
  if (!scraperFactory) {
    return {
      success: false,
      products: 0,
      deals: 0,
      coupons: 0,
      errors: [`Unknown supplier: ${supplierSlug}`],
      duration: 0,
    };
  }

  console.log(`\n========================================`);
  console.log(`Starting scrape for ${supplierSlug}`);
  console.log(`Mode: ${dealsOnly ? 'Deals only' : 'Full catalog'}`);
  console.log(`Time: ${new Date().toISOString()}`);
  console.log(`========================================\n`);

  const jobId = await db.createScrapeJob(supplierSlug, dealsOnly ? 'deals_only' : 'full_catalog');

  const scraper = scraperFactory();
  let result;

  try {
    if (dealsOnly) {
      // Only scrape deals
      await scraper.init();
      const deals = await scraper.scrapeDeals();
      const coupons = await scraper.scrapeCoupons();
      await scraper.close();

      result = {
        products: [],
        deals,
        coupons,
        errors: [],
        duration: 0,
      };
    } else {
      // Full scrape
      result = await scraper.scrapeAll();
    }

    // Save to database
    if (result.products.length > 0) {
      await db.saveProducts(supplierSlug, result.products);
    }
    if (result.deals.length > 0) {
      await db.saveDeals(supplierSlug, result.deals);
    }
    if (result.coupons.length > 0) {
      await db.saveCoupons(supplierSlug, result.coupons);
    }

    // Update job status
    if (jobId) {
      await db.completeScrapeJob(jobId, result);
    }

    // Update supplier timestamp
    await db.updateSupplierLastScraped(supplierSlug);

    console.log(`\n========================================`);
    console.log(`Scrape completed for ${supplierSlug}`);
    console.log(`Products: ${result.products.length}`);
    console.log(`Deals: ${result.deals.length}`);
    console.log(`Coupons: ${result.coupons.length}`);
    console.log(`Errors: ${result.errors.length}`);
    console.log(`Duration: ${result.duration}ms`);
    console.log(`========================================\n`);

    return {
      success: true,
      products: result.products.length,
      deals: result.deals.length,
      coupons: result.coupons.length,
      errors: result.errors,
      duration: result.duration,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Scrape failed for ${supplierSlug}:`, errorMessage);

    return {
      success: false,
      products: 0,
      deals: 0,
      coupons: 0,
      errors: [errorMessage],
      duration: 0,
    };
  }
}

/**
 * Run all scrapers
 */
async function runAllScrapers(dealsOnly = false): Promise<void> {
  const supplierSlugs = Object.keys(scrapers);

  for (const slug of supplierSlugs) {
    await runScraper(slug, dealsOnly);
    // Wait between suppliers to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  // Clean up expired deals
  const deactivated = await db.deactivateExpiredDeals();
  console.log(`Deactivated ${deactivated} expired deals`);
}

// ============================================
// API ENDPOINTS
// ============================================

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Trigger scrape for specific supplier
app.post('/scrape/:supplier', async (req, res) => {
  const { supplier } = req.params;
  const { dealsOnly = false } = req.body;

  const result = await runScraper(supplier, dealsOnly);
  res.json(result);
});

// Trigger scrape for all suppliers
app.post('/scrape-all', async (req, res) => {
  const { dealsOnly = false } = req.body;

  // Run in background
  runAllScrapers(dealsOnly).catch(console.error);

  res.json({
    status: 'started',
    message: 'Scrape job started in background',
    suppliers: Object.keys(scrapers),
    dealsOnly,
  });
});

// Get available suppliers
app.get('/suppliers', (req, res) => {
  res.json({
    suppliers: Object.keys(scrapers),
  });
});

// ============================================
// CRON JOBS
// ============================================

// Deals scrape - every 4 hours
const dealsCron = new CronJob(
  '0 */4 * * *', // Every 4 hours
  async () => {
    console.log('Running scheduled deals scrape...');
    await runAllScrapers(true);
  },
  null,
  false,
  'Europe/London'
);

// Full catalog scrape - weekly on Sunday at 2am
const fullScrapeCron = new CronJob(
  '0 2 * * 0', // Sunday at 2am
  async () => {
    console.log('Running scheduled full catalog scrape...');
    await runAllScrapers(false);
  },
  null,
  false,
  'Europe/London'
);

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`Elec-Mate Scraper Service`);
  console.log(`========================================`);
  console.log(`Server running on port ${PORT}`);
  console.log(`Available suppliers: ${Object.keys(scrapers).join(', ')}`);
  console.log(`========================================\n`);

  // Start cron jobs
  if (process.env.ENABLE_CRON === 'true') {
    dealsCron.start();
    fullScrapeCron.start();
    console.log('Cron jobs started:');
    console.log('  - Deals: Every 4 hours');
    console.log('  - Full catalog: Weekly (Sunday 2am)');
  } else {
    console.log('Cron jobs disabled (set ENABLE_CRON=true to enable)');
  }
});

export { runScraper, runAllScrapers };
