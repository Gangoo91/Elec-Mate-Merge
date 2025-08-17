-- Create regional_job_pricing table with comprehensive UK data
CREATE TABLE IF NOT EXISTS public.regional_job_pricing (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  region text NOT NULL,
  county text,
  job_type text NOT NULL,
  job_category text NOT NULL,
  min_price numeric NOT NULL,
  max_price numeric NOT NULL,
  average_price numeric NOT NULL,
  currency text NOT NULL DEFAULT 'GBP',
  unit text NOT NULL DEFAULT 'per job',
  complexity_level text NOT NULL DEFAULT 'standard',
  data_source text DEFAULT 'manual',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  last_updated timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.regional_job_pricing ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can view regional job pricing" 
ON public.regional_job_pricing 
FOR SELECT 
USING (is_active = true);

-- Create updated_at trigger
CREATE TRIGGER update_regional_job_pricing_updated_at
BEFORE UPDATE ON public.regional_job_pricing
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert comprehensive UK regional pricing data
INSERT INTO public.regional_job_pricing (region, county, job_type, job_category, min_price, max_price, average_price, complexity_level, unit) VALUES
-- London and South East
('London', 'Greater London', 'Socket Installation', 'Installation', 80, 150, 115, 'standard', 'per socket'),
('London', 'Greater London', 'Consumer Unit Change', 'Installation', 600, 1200, 900, 'complex', 'per unit'),
('London', 'Greater London', 'Rewire 3-bed House', 'Installation', 4000, 8000, 6000, 'complex', 'per property'),
('London', 'Greater London', 'PAT Testing', 'Testing', 3, 8, 5, 'simple', 'per appliance'),
('London', 'Greater London', 'EICR Inspection', 'Testing', 200, 400, 300, 'standard', 'per property'),
('South East', 'Kent', 'Socket Installation', 'Installation', 60, 120, 90, 'standard', 'per socket'),
('South East', 'Surrey', 'Consumer Unit Change', 'Installation', 500, 1000, 750, 'complex', 'per unit'),
('South East', 'Essex', 'Rewire 3-bed House', 'Installation', 3500, 7000, 5250, 'complex', 'per property'),

-- North West
('North West', 'Greater Manchester', 'Socket Installation', 'Installation', 50, 100, 75, 'standard', 'per socket'),
('North West', 'Greater Manchester', 'Consumer Unit Change', 'Installation', 450, 900, 675, 'complex', 'per unit'),
('North West', 'Greater Manchester', 'Rewire 3-bed House', 'Installation', 3000, 6000, 4500, 'complex', 'per property'),
('North West', 'Lancashire', 'PAT Testing', 'Testing', 2, 6, 4, 'simple', 'per appliance'),
('North West', 'Merseyside', 'EICR Inspection', 'Testing', 150, 300, 225, 'standard', 'per property'),
('North West', 'Cumbria', 'Socket Installation', 'Installation', 45, 95, 70, 'standard', 'per socket'),

-- Midlands
('West Midlands', 'Birmingham', 'Socket Installation', 'Installation', 55, 110, 82.50, 'standard', 'per socket'),
('West Midlands', 'Warwickshire', 'Consumer Unit Change', 'Installation', 480, 950, 715, 'complex', 'per unit'),
('East Midlands', 'Nottinghamshire', 'Rewire 3-bed House', 'Installation', 3200, 6400, 4800, 'complex', 'per property'),
('East Midlands', 'Leicestershire', 'PAT Testing', 'Testing', 2.50, 6.50, 4.50, 'simple', 'per appliance'),

-- Yorkshire
('Yorkshire', 'West Yorkshire', 'Socket Installation', 'Installation', 50, 105, 77.50, 'standard', 'per socket'),
('Yorkshire', 'South Yorkshire', 'Consumer Unit Change', 'Installation', 460, 920, 690, 'complex', 'per unit'),
('Yorkshire', 'North Yorkshire', 'Rewire 3-bed House', 'Installation', 3100, 6200, 4650, 'complex', 'per property'),

-- North East
('North East', 'Tyne and Wear', 'Socket Installation', 'Installation', 45, 90, 67.50, 'standard', 'per socket'),
('North East', 'Durham', 'Consumer Unit Change', 'Installation', 420, 840, 630, 'complex', 'per unit'),
('North East', 'Northumberland', 'Rewire 3-bed House', 'Installation', 2800, 5600, 4200, 'complex', 'per property'),

-- South West
('South West', 'Devon', 'Socket Installation', 'Installation', 55, 115, 85, 'standard', 'per socket'),
('South West', 'Cornwall', 'Consumer Unit Change', 'Installation', 500, 1000, 750, 'complex', 'per unit'),
('South West', 'Somerset', 'Rewire 3-bed House', 'Installation', 3400, 6800, 5100, 'complex', 'per property'),

-- Wales
('Wales', 'Cardiff', 'Socket Installation', 'Installation', 50, 100, 75, 'standard', 'per socket'),
('Wales', 'Swansea', 'Consumer Unit Change', 'Installation', 450, 900, 675, 'complex', 'per unit'),
('Wales', 'Newport', 'Rewire 3-bed House', 'Installation', 3000, 6000, 4500, 'complex', 'per property'),

-- Scotland
('Scotland', 'Edinburgh', 'Socket Installation', 'Installation', 55, 110, 82.50, 'standard', 'per socket'),
('Scotland', 'Glasgow', 'Consumer Unit Change', 'Installation', 480, 960, 720, 'complex', 'per unit'),
('Scotland', 'Aberdeen', 'Rewire 3-bed House', 'Installation', 3300, 6600, 4950, 'complex', 'per property'),

-- Northern Ireland
('Northern Ireland', 'Belfast', 'Socket Installation', 'Installation', 50, 100, 75, 'standard', 'per socket'),
('Northern Ireland', 'Belfast', 'Consumer Unit Change', 'Installation', 450, 900, 675, 'complex', 'per unit'),
('Northern Ireland', 'Belfast', 'Rewire 3-bed House', 'Installation', 3000, 6000, 4500, 'complex', 'per property');