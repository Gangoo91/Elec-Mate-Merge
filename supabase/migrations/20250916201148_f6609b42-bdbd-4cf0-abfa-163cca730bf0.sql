-- Add common job types to baseline pricing with job_category
INSERT INTO public.job_pricing_baseline (job_type, job_category, complexity_level, base_price, currency, unit) VALUES
('Light Switch', 'New Installation', 'simple', 30, 'GBP', 'per item'),
('Outdoor Socket', 'New Installation', 'standard', 115, 'GBP', 'per item'),
('Cooker Point', 'New Installation', 'standard', 160, 'GBP', 'per item'),
('EV Charger', 'New Installation', 'complex', 600, 'GBP', 'per item'),
('Smoke Alarm', 'Safety Installation', 'simple', 85, 'GBP', 'per item');