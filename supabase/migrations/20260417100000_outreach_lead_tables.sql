-- Outreach lead-discovery tables
-- Fed by crawl4AI pipelines on the VPS. Separate from outreach_contacts
-- so that scraped/raw data can be reviewed & verified before being promoted
-- into the campaign pool.

-- ═══════════════════════════════════════════════════════════════
-- 1. EDUCATION LEADS — colleges, tutors, training centres
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS education_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Source / provenance
  source text NOT NULL,
  -- e.g. 'gov_uk_apprenticeships', 'roatp', 'niceic_training', 'college_staff_page',
  -- 'ofsted_register', 'colleges_scotland', 'manual'
  source_url text,
  source_id text,
  scraped_at timestamptz,

  -- Contact details
  email text,
  email_type text,          -- 'generic' (info@), 'department', 'tutor_direct'
  name text,
  role text,                -- 'Tutor', 'Head of Electrical', 'Apprenticeship Coordinator'
  phone text,

  -- Organisation
  organisation text NOT NULL,
  organisation_type text,
  -- 'fe_college', 'sixth_form', 'private_training_provider',
  -- 'apprenticeship_provider', 'university_fe', 'trade_body'
  website text,
  domain text,

  -- Location
  address_line_1 text,
  address_line_2 text,
  city text,
  postcode text,
  region text,
  country text DEFAULT 'england',   -- england, scotland, wales, northern_ireland

  -- Programme info
  offers_electrical_level_2 boolean,
  offers_electrical_level_3 boolean,
  offers_am2 boolean,
  offers_epa boolean,
  specialisms text[] DEFAULT '{}',
  -- e.g. ['electrical_installation', 'solar_pv', 'ev_charging', '18th_edition']

  -- Raw scrape payload for debugging / re-extraction
  raw_data jsonb,

  -- Quality signals
  confidence_score integer DEFAULT 50,       -- 0-100
  verification_status text DEFAULT 'unverified',
  -- 'unverified', 'mx_passed', 'email_verified', 'bounced', 'invalid'

  -- Review lifecycle
  status text DEFAULT 'new',
  -- 'new' → 'reviewed' → 'promoted' / 'rejected' / 'duplicate'
  promoted_to_contact_id uuid REFERENCES outreach_contacts(id) ON DELETE SET NULL,
  rejection_reason text,
  notes text,

  -- Metadata
  reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  -- Dedup keys
  CONSTRAINT education_leads_source_id_unique
    UNIQUE NULLS NOT DISTINCT (source, source_id)
);

CREATE INDEX IF NOT EXISTS idx_education_leads_status ON education_leads(status);
CREATE INDEX IF NOT EXISTS idx_education_leads_source ON education_leads(source);
CREATE INDEX IF NOT EXISTS idx_education_leads_email ON education_leads(lower(email))
  WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_education_leads_domain ON education_leads(domain)
  WHERE domain IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_education_leads_org_type
  ON education_leads(organisation_type);
CREATE INDEX IF NOT EXISTS idx_education_leads_country ON education_leads(country);

ALTER TABLE education_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "education_leads_admin_all" ON education_leads;
CREATE POLICY "education_leads_admin_all" ON education_leads
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND admin_role IS NOT NULL)
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND admin_role IS NOT NULL)
  );

-- ═══════════════════════════════════════════════════════════════
-- 2. BUSINESS LEADS — ltd companies, electrical contractors
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS business_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Source / provenance
  source text NOT NULL,
  -- 'companies_house', 'niceic_directory', 'napit_directory', 'eca_directory',
  -- 'select_directory', 'google_maps', 'crawl4ai_general', 'manual'
  source_url text,
  source_id text,
  scraped_at timestamptz,

  -- Company identity
  company_name text NOT NULL,
  trading_name text,
  company_number text,              -- Companies House UK company number
  sic_codes text[] DEFAULT '{}',    -- e.g. ['43210', '43220']
  company_status text,              -- active, dissolved, liquidation
  incorporation_date date,
  dissolution_date date,

  -- Contact details
  email text,
  email_type text,                  -- generic, director, estimating, accounts
  website text,
  domain text,
  phone text,

  -- Address
  address_line_1 text,
  address_line_2 text,
  city text,
  postcode text,
  region text,
  country text DEFAULT 'england',

  -- People
  director_names text[] DEFAULT '{}',
  director_emails text[] DEFAULT '{}',

  -- Size signals
  employee_estimate text,           -- '1-9', '10-49', '50-249', '250+'
  turnover_estimate text,
  offers_apprenticeships boolean,

  -- Accreditations (scraped from member directories)
  accreditations text[] DEFAULT '{}',
  -- e.g. ['niceic_approved', 'napit', 'eca_member', 'select_member']

  -- Raw scrape payload
  raw_data jsonb,

  -- Quality signals
  confidence_score integer DEFAULT 50,
  verification_status text DEFAULT 'unverified',

  -- Review lifecycle
  status text DEFAULT 'new',
  promoted_to_contact_id uuid REFERENCES outreach_contacts(id) ON DELETE SET NULL,
  rejection_reason text,
  notes text,

  -- Metadata
  reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  CONSTRAINT business_leads_source_id_unique
    UNIQUE NULLS NOT DISTINCT (source, source_id),
  CONSTRAINT business_leads_company_number_unique
    UNIQUE (company_number)
);

CREATE INDEX IF NOT EXISTS idx_business_leads_status ON business_leads(status);
CREATE INDEX IF NOT EXISTS idx_business_leads_source ON business_leads(source);
CREATE INDEX IF NOT EXISTS idx_business_leads_email ON business_leads(lower(email))
  WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_business_leads_domain ON business_leads(domain)
  WHERE domain IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_business_leads_company_number
  ON business_leads(company_number) WHERE company_number IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_business_leads_company_status
  ON business_leads(company_status);
CREATE INDEX IF NOT EXISTS idx_business_leads_postcode
  ON business_leads(upper(regexp_replace(postcode, '\s+', '', 'g')))
  WHERE postcode IS NOT NULL;

ALTER TABLE business_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "business_leads_admin_all" ON business_leads;
CREATE POLICY "business_leads_admin_all" ON business_leads
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND admin_role IS NOT NULL)
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND admin_role IS NOT NULL)
  );

-- ═══════════════════════════════════════════════════════════════
-- 3. Audit trail for scrape runs
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS outreach_scrape_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL,
  target_table text NOT NULL,       -- 'education_leads' | 'business_leads'
  status text DEFAULT 'running',    -- running, completed, failed
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  records_discovered integer DEFAULT 0,
  records_inserted integer DEFAULT 0,
  records_updated integer DEFAULT 0,
  records_skipped integer DEFAULT 0,
  errors_count integer DEFAULT 0,
  error_sample text,
  metadata jsonb,
  initiated_by text                 -- 'vps_cron', 'admin_manual', 'api_call'
);

CREATE INDEX IF NOT EXISTS idx_scrape_runs_source ON outreach_scrape_runs(source);
CREATE INDEX IF NOT EXISTS idx_scrape_runs_started ON outreach_scrape_runs(started_at DESC);

ALTER TABLE outreach_scrape_runs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "outreach_scrape_runs_admin_all" ON outreach_scrape_runs;
CREATE POLICY "outreach_scrape_runs_admin_all" ON outreach_scrape_runs
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND admin_role IS NOT NULL)
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND admin_role IS NOT NULL)
  );

-- ═══════════════════════════════════════════════════════════════
-- 4. Updated-at triggers
-- ═══════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION touch_leads_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_education_leads_touch ON education_leads;
CREATE TRIGGER trg_education_leads_touch
  BEFORE UPDATE ON education_leads
  FOR EACH ROW EXECUTE FUNCTION touch_leads_updated_at();

DROP TRIGGER IF EXISTS trg_business_leads_touch ON business_leads;
CREATE TRIGGER trg_business_leads_touch
  BEFORE UPDATE ON business_leads
  FOR EACH ROW EXECUTE FUNCTION touch_leads_updated_at();

-- ═══════════════════════════════════════════════════════════════
-- 5. Domain auto-extract trigger
-- ═══════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION extract_lead_domain()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.email IS NOT NULL AND (NEW.domain IS NULL OR NEW.domain = '') THEN
    NEW.domain = lower(split_part(NEW.email, '@', 2));
  ELSIF NEW.website IS NOT NULL AND (NEW.domain IS NULL OR NEW.domain = '') THEN
    NEW.domain = lower(regexp_replace(NEW.website, '^https?://(www\.)?', ''));
    NEW.domain = split_part(NEW.domain, '/', 1);
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_education_leads_domain ON education_leads;
CREATE TRIGGER trg_education_leads_domain
  BEFORE INSERT OR UPDATE ON education_leads
  FOR EACH ROW EXECUTE FUNCTION extract_lead_domain();

DROP TRIGGER IF EXISTS trg_business_leads_domain ON business_leads;
CREATE TRIGGER trg_business_leads_domain
  BEFORE INSERT OR UPDATE ON business_leads
  FOR EACH ROW EXECUTE FUNCTION extract_lead_domain();

-- ═══════════════════════════════════════════════════════════════
-- 6. Stats view for the admin Discovery tab
-- ═══════════════════════════════════════════════════════════════
CREATE OR REPLACE VIEW outreach_leads_overview AS
SELECT
  'education'::text AS pool,
  COUNT(*) FILTER (WHERE status = 'new') AS new_count,
  COUNT(*) FILTER (WHERE status = 'reviewed') AS reviewed_count,
  COUNT(*) FILTER (WHERE status = 'promoted') AS promoted_count,
  COUNT(*) FILTER (WHERE status = 'rejected') AS rejected_count,
  COUNT(*) FILTER (WHERE email IS NOT NULL) AS with_email_count,
  COUNT(*) FILTER (WHERE verification_status = 'email_verified') AS verified_count,
  COUNT(*) AS total
FROM education_leads
UNION ALL
SELECT
  'business'::text AS pool,
  COUNT(*) FILTER (WHERE status = 'new') AS new_count,
  COUNT(*) FILTER (WHERE status = 'reviewed') AS reviewed_count,
  COUNT(*) FILTER (WHERE status = 'promoted') AS promoted_count,
  COUNT(*) FILTER (WHERE status = 'rejected') AS rejected_count,
  COUNT(*) FILTER (WHERE email IS NOT NULL) AS with_email_count,
  COUNT(*) FILTER (WHERE verification_status = 'email_verified') AS verified_count,
  COUNT(*) AS total
FROM business_leads;
