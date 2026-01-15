# Elec-Mate Tools Marketplace Scraper

Production-ready web scraper for scraping electrical tools from 6 UK suppliers.

## Features

- 🛒 **6 Suppliers**: Screwfix, Toolstation, CEF, ElectricalDirect, RS Components, TLC Electrical
- 📦 **~25,000 Products**: Full catalog scraping with categories
- 🏷️ **Live Deals**: Real expiration dates, deal types (flash sale, clearance, etc.)
- 🎟️ **Coupon Codes**: From VoucherCodes.co.uk + supplier pages
- 🤖 **Anti-Detection**: Puppeteer stealth mode, user agent rotation
- ⏰ **Scheduled Scraping**: Automatic cron jobs
- 🐳 **Docker Ready**: Production Dockerfile included

## Quick Start

### 1. Apply Database Migration

Go to **[Supabase SQL Editor](https://supabase.com/dashboard/project/jtwygbeceundfgnkirof/sql/new)** and paste the contents of:
```
supabase/migrations/20260115120000_marketplace_tables.sql
```

### 2. Get Your Service Role Key

1. Go to **[Supabase API Settings](https://supabase.com/dashboard/project/jtwygbeceundfgnkirof/settings/api)**
2. Copy the **service_role** key (NOT the anon key)
3. Paste it in `.env`:

```bash
SUPABASE_SERVICE_ROLE_KEY=your_key_here
```

### 3. Install & Run

```bash
cd services/scraper
npm install
npm run dev
```

### 4. Run Your First Scrape

```bash
# Test with one supplier first
npm run scrape:screwfix

# Then scrape everything (~25,000 products, takes 20-30 mins)
npm run scrape:all

# Just deals and coupons (faster, ~5 mins)
npm run scrape:deals
npm run scrape:coupons
```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start server with hot reload |
| `npm start` | Production server |
| `npm run scrape:all` | Full scrape (~25,000 products) |
| `npm run scrape:deals` | Deals only from all suppliers |
| `npm run scrape:coupons` | Coupons from aggregators |
| `npm run scrape:screwfix` | Screwfix only |
| `npm run scrape:toolstation` | Toolstation only |
| `npm run scrape:cef` | CEF only |
| `npm run scrape:electrical-direct` | ElectricalDirect only |
| `npm run scrape:rs-components` | RS Components only |
| `npm run scrape:tlc-electrical` | TLC Electrical only |
| `npm run test:connection` | Test Supabase connection |

## Scraping Schedule

When `ENABLE_CRON=true`:

| Job | Schedule | Description |
|-----|----------|-------------|
| Deals | Every 4 hours | Scrapes deal pages, updates prices |
| Full Catalog | Sunday 2am | Complete product refresh |

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/suppliers` | GET | List available scrapers |
| `/scrape/:supplier` | POST | Trigger scrape for supplier |
| `/scrape-all` | POST | Trigger scrape for all suppliers |

## Deployment

### Railway (Recommended)

1. Push to GitHub
2. Create new project on [Railway](https://railway.app)
3. Connect your repo, select `services/scraper` as root
4. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ENABLE_CRON=true`
5. Deploy!

### Docker

```bash
docker-compose up -d
```

Or build manually:
```bash
docker build -t elec-mate-scraper .
docker run -d -p 3001:3001 \
  -e SUPABASE_URL=... \
  -e SUPABASE_SERVICE_ROLE_KEY=... \
  -e ENABLE_CRON=true \
  elec-mate-scraper
```

## Product Counts by Supplier

| Supplier | Estimated Products |
|----------|-------------------|
| Screwfix | 3,000+ |
| Toolstation | 2,000+ |
| CEF | 5,000+ |
| ElectricalDirect | 3,000+ |
| RS Components | 10,000+ |
| TLC Electrical | 2,000+ |
| **Total** | **~25,000** |

## Troubleshooting

### "Missing SUPABASE_SERVICE_ROLE_KEY"
Get it from: https://supabase.com/dashboard/project/jtwygbeceundfgnkirof/settings/api

### "Table marketplace_suppliers does not exist"
Apply the migration in Supabase SQL Editor.

### Puppeteer crashes
Ensure you have enough memory (2GB+ recommended for Docker).

### Rate limited by supplier
The scraper includes delays between requests. If issues persist, increase `rateLimit` in supplier configs.
