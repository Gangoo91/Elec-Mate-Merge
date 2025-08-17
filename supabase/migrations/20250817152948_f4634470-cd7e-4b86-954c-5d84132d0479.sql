-- Seed regional_job_pricing with realistic UK data for major locations
INSERT INTO public.regional_job_pricing (region, county, job_type, job_category, min_price, max_price, average_price, complexity_level, data_source) VALUES
-- London and South East (Higher rates)
('London', 'Greater London', 'Socket Installation', 'electrical_installation', 80, 150, 115, 'standard', 'market_research'),
('London', 'Greater London', 'Consumer Unit Replacement', 'electrical_installation', 400, 800, 600, 'complex', 'market_research'),
('London', 'Greater London', 'Electric Shower Installation', 'electrical_installation', 200, 400, 300, 'standard', 'market_research'),
('London', 'Greater London', 'LED Downlight Installation', 'electrical_installation', 40, 80, 60, 'simple', 'market_research'),
('London', 'Greater London', 'EICR Certificate', 'electrical_testing', 150, 300, 225, 'standard', 'market_research'),
('South East', 'Surrey', 'Socket Installation', 'electrical_installation', 70, 130, 100, 'standard', 'market_research'),
('South East', 'Kent', 'Consumer Unit Replacement', 'electrical_installation', 350, 650, 500, 'complex', 'market_research'),
('South East', 'Essex', 'Electric Shower Installation', 'electrical_installation', 180, 350, 265, 'standard', 'market_research'),

-- North West (Manchester, Liverpool area)
('North West', 'Greater Manchester', 'Socket Installation', 'electrical_installation', 50, 100, 75, 'standard', 'market_research'),
('North West', 'Greater Manchester', 'Consumer Unit Replacement', 'electrical_installation', 300, 550, 425, 'complex', 'market_research'),
('North West', 'Merseyside', 'Electric Shower Installation', 'electrical_installation', 150, 280, 215, 'standard', 'market_research'),
('North West', 'Lancashire', 'EICR Certificate', 'electrical_testing', 120, 220, 170, 'standard', 'market_research'),

-- West Midlands (Birmingham area)
('West Midlands', 'West Midlands', 'Socket Installation', 'electrical_installation', 55, 110, 82, 'standard', 'market_research'),
('West Midlands', 'West Midlands', 'Consumer Unit Replacement', 'electrical_installation', 320, 580, 450, 'complex', 'market_research'),
('West Midlands', 'Warwickshire', 'Electric Shower Installation', 'electrical_installation', 160, 300, 230, 'standard', 'market_research'),

-- Yorkshire and The Humber
('Yorkshire and The Humber', 'West Yorkshire', 'Socket Installation', 'electrical_installation', 50, 95, 72, 'standard', 'market_research'),
('Yorkshire and The Humber', 'South Yorkshire', 'Consumer Unit Replacement', 'electrical_installation', 280, 520, 400, 'complex', 'market_research'),
('Yorkshire and The Humber', 'North Yorkshire', 'Electric Shower Installation', 'electrical_installation', 140, 270, 205, 'standard', 'market_research'),

-- Scotland
('Scotland', 'City of Edinburgh', 'Socket Installation', 'electrical_installation', 60, 120, 90, 'standard', 'market_research'),
('Scotland', 'Glasgow City', 'Consumer Unit Replacement', 'electrical_installation', 320, 600, 460, 'complex', 'market_research'),
('Scotland', 'Fife', 'Electric Shower Installation', 'electrical_installation', 150, 290, 220, 'standard', 'market_research'),

-- Wales
('Wales', 'Cardiff', 'Socket Installation', 'electrical_installation', 55, 105, 80, 'standard', 'market_research'),
('Wales', 'Swansea', 'Consumer Unit Replacement', 'electrical_installation', 300, 550, 425, 'complex', 'market_research'),

-- Northern Ireland
('Northern Ireland', 'Belfast', 'Socket Installation', 'electrical_installation', 50, 100, 75, 'standard', 'market_research'),
('Northern Ireland', 'Belfast', 'Consumer Unit Replacement', 'electrical_installation', 280, 520, 400, 'complex', 'market_research');

-- Update regional_multipliers with comprehensive UK county data
INSERT INTO public.regional_multipliers (region, county, multiplier, cost_of_living_index) VALUES
-- London and South East (Higher cost areas)
('London', 'Greater London', 1.35, 115.0),
('South East', 'Surrey', 1.25, 110.0),
('South East', 'Kent', 1.15, 105.0),
('South East', 'Essex', 1.20, 108.0),
('South East', 'Buckinghamshire', 1.30, 112.0),
('South East', 'Hertfordshire', 1.25, 110.0),
('South East', 'Sussex', 1.18, 106.0),

-- South West
('South West', 'Bristol', 1.10, 102.0),
('South West', 'Devon', 1.05, 98.0),
('South West', 'Cornwall', 1.00, 95.0),
('South West', 'Somerset', 1.02, 96.0),
('South West', 'Gloucestershire', 1.08, 100.0),

-- West Midlands
('West Midlands', 'West Midlands', 1.10, 102.0),
('West Midlands', 'Warwickshire', 1.08, 100.0),
('West Midlands', 'Worcestershire', 1.05, 98.0),
('West Midlands', 'Staffordshire', 1.02, 96.0),

-- East Midlands
('East Midlands', 'Nottinghamshire', 1.00, 95.0),
('East Midlands', 'Leicestershire', 1.02, 96.0),
('East Midlands', 'Derbyshire', 0.98, 93.0),
('East Midlands', 'Lincolnshire', 0.95, 90.0),

-- North West
('North West', 'Greater Manchester', 1.05, 98.0),
('North West', 'Merseyside', 1.00, 95.0),
('North West', 'Lancashire', 0.98, 93.0),
('North West', 'Cheshire', 1.12, 104.0),
('North West', 'Cumbria', 0.95, 90.0),

-- Yorkshire and The Humber
('Yorkshire and The Humber', 'West Yorkshire', 1.00, 95.0),
('Yorkshire and The Humber', 'South Yorkshire', 0.95, 90.0),
('Yorkshire and The Humber', 'North Yorkshire', 1.02, 96.0),
('Yorkshire and The Humber', 'East Riding of Yorkshire', 0.98, 93.0),

-- North East
('North East', 'Tyne and Wear', 0.90, 85.0),
('North East', 'County Durham', 0.88, 83.0),
('North East', 'Northumberland', 0.85, 80.0),

-- Scotland
('Scotland', 'City of Edinburgh', 1.15, 105.0),
('Scotland', 'Glasgow City', 1.08, 100.0),
('Scotland', 'Aberdeen City', 1.20, 108.0),
('Scotland', 'Fife', 1.00, 95.0),
('Scotland', 'Highland', 0.95, 90.0),
('Scotland', 'South Lanarkshire', 1.02, 96.0),

-- Wales
('Wales', 'Cardiff', 1.08, 100.0),
('Wales', 'Swansea', 1.00, 95.0),
('Wales', 'Newport', 1.05, 98.0),
('Wales', 'Rhondda Cynon Taff', 0.95, 90.0),
('Wales', 'Flintshire', 1.00, 95.0),

-- Northern Ireland
('Northern Ireland', 'Belfast', 1.00, 95.0),
('Northern Ireland', 'Lisburn and Castlereagh', 1.02, 96.0),
('Northern Ireland', 'Derry City and Strabane', 0.90, 85.0),
('Northern Ireland', 'Armagh City, Banbridge and Craigavon', 0.95, 90.0);

-- Add confidence score and freshness columns to regional_job_pricing
ALTER TABLE public.regional_job_pricing 
ADD COLUMN confidence_score INTEGER DEFAULT 75 CHECK (confidence_score >= 0 AND confidence_score <= 100),
ADD COLUMN data_age_days INTEGER GENERATED ALWAYS AS (EXTRACT(DAY FROM (now() - last_updated))) STORED;