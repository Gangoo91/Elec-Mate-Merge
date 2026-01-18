-- Jobs weekly cache table for scraped job listings
CREATE TABLE IF NOT EXISTS jobs_weekly_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_number INTEGER NOT NULL,
  region TEXT NOT NULL,
  jobs_data JSONB NOT NULL,
  source TEXT NOT NULL, -- 'indeed', 'cv-library', 'reed', 'totaljobs', 'adzuna'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '7 days'
);

-- Index for fast lookups by region
CREATE INDEX IF NOT EXISTS idx_jobs_cache_region ON jobs_weekly_cache(region);

-- Index for cache expiry cleanup
CREATE INDEX IF NOT EXISTS idx_jobs_cache_expires ON jobs_weekly_cache(expires_at);

-- Index for source filtering
CREATE INDEX IF NOT EXISTS idx_jobs_cache_source ON jobs_weekly_cache(source);

-- Comment for documentation
COMMENT ON TABLE jobs_weekly_cache IS 'Cache for scraped electrical job listings from multiple job boards, refreshed weekly';
COMMENT ON COLUMN jobs_weekly_cache.jobs_data IS 'Array of job objects with title, company, location, salary, description, applyUrl, etc.';
COMMENT ON COLUMN jobs_weekly_cache.source IS 'The job board source: indeed, cv-library, reed, totaljobs, adzuna';
