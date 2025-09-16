-- Add common job types to baseline pricing
INSERT INTO public.job_pricing_baseline (job_type, complexity_level, base_price, currency, unit) VALUES
('Light Switch', 'simple', 30, 'GBP', 'per item'),
('Outdoor Socket', 'standard', 115, 'GBP', 'per item'),
('Cooker Point', 'standard', 160, 'GBP', 'per item'),
('EV Charger', 'complex', 600, 'GBP', 'per item'),
('Smoke Alarm', 'simple', 85, 'GBP', 'per item');