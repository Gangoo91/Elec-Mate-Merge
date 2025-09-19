-- Create comprehensive postcode districts table
CREATE TABLE public.uk_postcode_districts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  district_code TEXT NOT NULL UNIQUE, -- e.g., 'M1', 'SW1', 'B1'
  area_code TEXT NOT NULL, -- e.g., 'M', 'SW', 'B'
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL,
  region TEXT NOT NULL,
  county TEXT,
  local_authority TEXT,
  avg_household_income NUMERIC,
  contractor_density INTEGER DEFAULT 0,
  transport_score INTEGER DEFAULT 50, -- 0-100 accessibility score
  urban_rural_classification TEXT DEFAULT 'urban',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create enhanced pricing data sources table
CREATE TABLE public.pricing_data_sources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source_name TEXT NOT NULL,
  source_type TEXT NOT NULL, -- 'job_board', 'community', 'api', 'scraper'
  base_url TEXT,
  last_scraped_at TIMESTAMP WITH TIME ZONE,
  scrape_frequency_hours INTEGER DEFAULT 24,
  reliability_score INTEGER DEFAULT 50, -- 0-100
  is_active BOOLEAN NOT NULL DEFAULT true,
  api_config JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create enhanced regional pricing table with postcode granularity
CREATE TABLE public.enhanced_regional_pricing (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  postcode_district TEXT NOT NULL,
  job_type TEXT NOT NULL,
  job_category TEXT NOT NULL,
  min_price NUMERIC NOT NULL,
  max_price NUMERIC NOT NULL,
  avg_price NUMERIC NOT NULL,
  median_price NUMERIC,
  sample_size INTEGER DEFAULT 1,
  confidence_score INTEGER DEFAULT 50, -- 0-100
  currency TEXT NOT NULL DEFAULT 'GBP',
  unit TEXT NOT NULL DEFAULT 'per job',
  complexity_level TEXT NOT NULL DEFAULT 'standard',
  data_source_id UUID REFERENCES public.pricing_data_sources(id),
  raw_data JSONB DEFAULT '{}',
  market_factors JSONB DEFAULT '{}', -- fuel costs, material costs, demand indicators
  seasonal_adjustment NUMERIC DEFAULT 1.0,
  last_verified_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + interval '30 days'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create community pricing submissions table
CREATE TABLE public.community_pricing_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  postcode_district TEXT NOT NULL,
  job_type TEXT NOT NULL,
  actual_price NUMERIC NOT NULL,
  job_description TEXT,
  completion_date DATE NOT NULL,
  materials_cost NUMERIC,
  labour_hours NUMERIC,
  complexity_notes TEXT,
  verification_status TEXT DEFAULT 'pending', -- pending, approved, rejected
  verified_by UUID,
  verified_at TIMESTAMP WITH TIME ZONE,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create market insights cache table
CREATE TABLE public.market_insights_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  postcode_district TEXT NOT NULL,
  insights_data JSONB NOT NULL DEFAULT '{}',
  demand_indicators JSONB DEFAULT '{}',
  competition_analysis JSONB DEFAULT '{}',
  price_trends JSONB DEFAULT '{}',
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + interval '7 days'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_uk_postcode_districts_district_code ON public.uk_postcode_districts(district_code);
CREATE INDEX idx_uk_postcode_districts_region ON public.uk_postcode_districts(region);
CREATE INDEX idx_enhanced_regional_pricing_postcode_job ON public.enhanced_regional_pricing(postcode_district, job_type);
CREATE INDEX idx_enhanced_regional_pricing_expires ON public.enhanced_regional_pricing(expires_at);
CREATE INDEX idx_community_pricing_postcode ON public.community_pricing_submissions(postcode_district);
CREATE INDEX idx_market_insights_postcode ON public.market_insights_cache(postcode_district);

-- Enable RLS
ALTER TABLE public.uk_postcode_districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_data_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enhanced_regional_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_pricing_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_insights_cache ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Postcode districts are publicly readable" ON public.uk_postcode_districts FOR SELECT USING (true);
CREATE POLICY "Pricing data sources are publicly readable" ON public.pricing_data_sources FOR SELECT USING (true);
CREATE POLICY "Enhanced pricing is publicly readable" ON public.enhanced_regional_pricing FOR SELECT USING (true);
CREATE POLICY "Users can submit community pricing" ON public.community_pricing_submissions FOR INSERT WITH CHECK ((auth.uid() = user_id) OR (user_id IS NULL));
CREATE POLICY "Users can view their own submissions" ON public.community_pricing_submissions FOR SELECT USING ((auth.uid() = user_id) OR (user_id IS NULL));
CREATE POLICY "Market insights are publicly readable" ON public.market_insights_cache FOR SELECT USING (true);

-- Service role can manage all tables
CREATE POLICY "Service role can manage postcode districts" ON public.uk_postcode_districts FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage pricing sources" ON public.pricing_data_sources FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage enhanced pricing" ON public.enhanced_regional_pricing FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage community submissions" ON public.community_pricing_submissions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage market insights" ON public.market_insights_cache FOR ALL USING (auth.role() = 'service_role');

-- Insert initial UK postcode district data (sample for major cities)
INSERT INTO public.uk_postcode_districts (district_code, area_code, latitude, longitude, region, county, local_authority, avg_household_income, contractor_density, transport_score) VALUES
('M1', 'M', 53.4808, -2.2426, 'North West', 'Greater Manchester', 'Manchester', 25000, 85, 95),
('M2', 'M', 53.4547, -2.2432, 'North West', 'Greater Manchester', 'Manchester', 45000, 65, 90),
('SW1', 'SW', 51.4994, -0.1371, 'London', 'Greater London', 'Westminster', 85000, 120, 100),
('SW2', 'SW', 51.4515, -0.1241, 'London', 'Greater London', 'Lambeth', 55000, 95, 95),
('B1', 'B', 52.4862, -1.8904, 'West Midlands', 'West Midlands', 'Birmingham', 28000, 75, 85),
('B2', 'B', 52.4675, -1.8830, 'West Midlands', 'West Midlands', 'Birmingham', 35000, 70, 85),
('LS1', 'LS', 53.8008, -1.5491, 'Yorkshire and The Humber', 'West Yorkshire', 'Leeds', 32000, 60, 80),
('G1', 'G', 55.8612, -4.2505, 'Scotland', 'Glasgow City', 'Glasgow', 28000, 55, 75),
('E1', 'E', 51.5149, -0.0577, 'London', 'Greater London', 'Tower Hamlets', 42000, 90, 95);

-- Insert initial data sources
INSERT INTO public.pricing_data_sources (source_name, source_type, base_url, reliability_score) VALUES
('Reed Jobs API', 'api', 'https://www.reed.co.uk/api/', 90),
('Indeed Scraper', 'scraper', 'https://www.indeed.co.uk', 85),
('Checkatrade API', 'api', 'https://www.checkatrade.com', 80),
('Total Jobs API', 'api', 'https://www.totaljobs.com', 85),
('Community Submissions', 'community', NULL, 95),
('MyBuilder API', 'api', 'https://www.mybuilder.com', 75),
('TrustATrader Scraper', 'scraper', 'https://www.trustatrader.com', 70);

-- Create function to cleanup expired data
CREATE OR REPLACE FUNCTION public.cleanup_expired_pricing_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  DELETE FROM public.enhanced_regional_pricing 
  WHERE expires_at < now();
  
  DELETE FROM public.market_insights_cache 
  WHERE expires_at < now();
END;
$function$;

-- Create function to calculate postcode district from full postcode
CREATE OR REPLACE FUNCTION public.extract_postcode_district(full_postcode TEXT)
RETURNS TEXT
LANGUAGE plpgsql
IMMUTABLE
AS $function$
BEGIN
  -- Extract district from UK postcode (e.g., 'M1 4BT' -> 'M1')
  RETURN TRIM(SUBSTRING(UPPER(full_postcode) FROM '^([A-Z]{1,2}[0-9]{1,2}[A-Z]?)'));
END;
$function$;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_uk_postcode_districts_updated_at
  BEFORE UPDATE ON public.uk_postcode_districts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pricing_data_sources_updated_at
  BEFORE UPDATE ON public.pricing_data_sources
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_enhanced_regional_pricing_updated_at
  BEFORE UPDATE ON public.enhanced_regional_pricing
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_market_insights_cache_updated_at
  BEFORE UPDATE ON public.market_insights_cache
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();