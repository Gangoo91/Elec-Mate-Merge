-- Create tables for live pricing data
CREATE TABLE IF NOT EXISTS public.commodity_prices (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metal_type text NOT NULL,
  price_per_kg numeric NOT NULL,
  currency text NOT NULL DEFAULT 'GBP',
  daily_change_percent numeric,
  last_updated timestamp with time zone NOT NULL DEFAULT now(),
  data_source text NOT NULL DEFAULT 'mock',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.supplier_price_snapshots (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  supplier_name text NOT NULL,
  category text NOT NULL,
  product_name text NOT NULL,
  price numeric NOT NULL,
  currency text NOT NULL DEFAULT 'GBP',
  unit text NOT NULL DEFAULT 'each',
  sku text,
  last_updated timestamp with time zone NOT NULL DEFAULT now(),
  data_source text NOT NULL DEFAULT 'scraped',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.job_pricing_baseline (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_type text NOT NULL,
  job_category text NOT NULL,
  complexity_level text NOT NULL DEFAULT 'standard',
  base_price numeric NOT NULL,
  estimated_hours numeric,
  currency text NOT NULL DEFAULT 'GBP',
  unit text NOT NULL DEFAULT 'per job',
  last_updated timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.regional_multipliers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  region text NOT NULL,
  county text,
  multiplier numeric NOT NULL DEFAULT 1.0,
  cost_of_living_index numeric,
  last_updated timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.commodity_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supplier_price_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_pricing_baseline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regional_multipliers ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view commodity prices" ON public.commodity_prices FOR SELECT USING (true);
CREATE POLICY "Anyone can view supplier prices" ON public.supplier_price_snapshots FOR SELECT USING (true);
CREATE POLICY "Anyone can view job baselines" ON public.job_pricing_baseline FOR SELECT USING (true);
CREATE POLICY "Anyone can view regional multipliers" ON public.regional_multipliers FOR SELECT USING (true);

-- Insert baseline job pricing data
INSERT INTO public.job_pricing_baseline (job_type, job_category, complexity_level, base_price, estimated_hours) VALUES
('Socket Installation', 'New Installation', 'standard', 75, 0.75),
('Socket Installation', 'New Installation', 'complex', 120, 1.25),
('Light Fitting', 'New Installation', 'standard', 85, 1.0),
('Light Fitting', 'New Installation', 'complex', 150, 1.75),
('Consumer Unit Change', 'Upgrades', 'standard', 450, 4.0),
('Consumer Unit Change', 'Upgrades', 'complex', 750, 6.0),
('EICR Testing', 'Testing', 'standard', 185, 2.5),
('EICR Testing', 'Testing', 'complex', 285, 4.0),
('Rewire Full House', 'Major Works', 'standard', 3500, 35.0),
('Rewire Full House', 'Major Works', 'complex', 5500, 55.0),
('Fault Finding', 'Repairs', 'standard', 125, 1.5),
('Fault Finding', 'Repairs', 'complex', 195, 2.5);

-- Insert regional multipliers
INSERT INTO public.regional_multipliers (region, county, multiplier, cost_of_living_index) VALUES
('London', 'Greater London', 1.45, 145),
('South East', 'Surrey', 1.35, 135),
('South East', 'Kent', 1.25, 125),
('South East', 'Essex', 1.20, 120),
('South West', 'Devon', 0.95, 95),
('South West', 'Cornwall', 0.85, 85),
('North West', 'Greater Manchester', 0.95, 95),
('North West', 'Lancashire', 0.90, 90),
('Yorkshire', 'West Yorkshire', 0.90, 90),
('Yorkshire', 'South Yorkshire', 0.85, 85),
('East Midlands', 'Nottinghamshire', 0.90, 90),
('West Midlands', 'Birmingham', 0.95, 95),
('North East', 'Tyne and Wear', 0.80, 80),
('Scotland', 'Edinburgh', 1.10, 110),
('Scotland', 'Glasgow', 1.05, 105),
('Wales', 'Cardiff', 0.95, 95),
('Northern Ireland', 'Belfast', 0.85, 85);

-- Insert mock commodity prices
INSERT INTO public.commodity_prices (metal_type, price_per_kg, daily_change_percent, data_source) VALUES
('Copper', 8.45, 1.2, 'mock_realistic'),
('Aluminium', 2.15, -0.8, 'mock_realistic'),
('Brass', 6.80, 0.5, 'mock_realistic'),
('Lead', 2.35, -0.3, 'mock_realistic'),
('Steel', 0.95, 2.1, 'mock_realistic');

-- Insert mock supplier prices
INSERT INTO public.supplier_price_snapshots (supplier_name, category, product_name, price, unit, sku) VALUES
('CEF', 'Cable', 'Twin & Earth 2.5mm (100m)', 89.50, '100m roll', 'TE25100'),
('CEF', 'Cable', 'Twin & Earth 1.5mm (100m)', 65.25, '100m roll', 'TE15100'),
('CEF', 'Cable', 'SWA 3 Core 2.5mm (50m)', 145.00, '50m roll', 'SWA3C25'),
('Screwfix', 'Equipment', 'Socket Outlet Double', 4.85, 'each', 'SO2G'),
('Screwfix', 'Equipment', 'Light Switch 1 Gang', 3.25, 'each', 'LS1G'),
('Toolstation', 'Equipment', 'Consumer Unit 8 Way', 125.00, 'each', 'CU8W'),
('Toolstation', 'Equipment', 'RCD 30mA 63A', 45.50, 'each', 'RCD3063');