-- Add common job types to baseline pricing
INSERT INTO public.job_pricing_baseline (job_type, complexity_level, base_price, currency, unit, region) VALUES
('Light Switch', 'simple', 30, 'GBP', 'per item', 'Greater London'),
('Light Switch', 'simple', 25, 'GBP', 'per item', 'England'),
('Outdoor Socket', 'standard', 115, 'GBP', 'per item', 'Greater London'),
('Outdoor Socket', 'standard', 100, 'GBP', 'per item', 'England'),
('Cooker Point', 'standard', 160, 'GBP', 'per item', 'Greater London'),
('Cooker Point', 'standard', 140, 'GBP', 'per item', 'England'),
('EV Charger', 'complex', 600, 'GBP', 'per item', 'Greater London'),
('EV Charger', 'complex', 550, 'GBP', 'per item', 'England'),
('Smoke Alarm', 'simple', 85, 'GBP', 'per item', 'Greater London'),
('Smoke Alarm', 'simple', 70, 'GBP', 'per item', 'England'),
('Fault Finding', 'standard', 120, 'GBP', 'per hour', 'Greater London'),
('Fault Finding', 'standard', 100, 'GBP', 'per hour', 'England')
ON CONFLICT (job_type, complexity_level, region) DO NOTHING;