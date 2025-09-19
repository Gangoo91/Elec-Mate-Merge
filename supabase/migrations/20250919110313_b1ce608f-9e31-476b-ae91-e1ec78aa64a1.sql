-- Fix job type mismatch and populate comprehensive pricing data

-- First, let's clear the existing data to start fresh
DELETE FROM regional_job_pricing;

-- Insert comprehensive pricing data for all job types and locations
INSERT INTO regional_job_pricing (region, job_type, job_category, min_price, max_price, average_price, currency, unit, complexity_level, data_source, confidence_score, created_at, updated_at) 
VALUES 
-- EV Charging jobs
('London', 'EV Charger Install (7kW)', 'EV Charging', 800, 1200, 1000, 'GBP', 'per job', 'standard', 'market_data', 85, now(), now()),
('London', 'EV Charger Install (22kW)', 'EV Charging', 1200, 1800, 1500, 'GBP', 'per job', 'complex', 'market_data', 85, now(), now()),
('London', 'EV Charger Install (50kW)', 'EV Charging', 2400, 3600, 3000, 'GBP', 'per job', 'advanced', 'market_data', 80, now(), now()),
('London', 'EV Infrastructure Survey', 'EV Charging', 600, 900, 750, 'GBP', 'per job', 'standard', 'market_data', 80, now(), now()),
('London', 'Commercial EV Setup', 'EV Charging', 1800, 3000, 2400, 'GBP', 'per job', 'advanced', 'market_data', 80, now(), now()),

-- Installation & Wiring
('London', 'Rewire Full House', 'Installation & Wiring', 3000, 8000, 5500, 'GBP', 'per job', 'advanced', 'market_data', 90, now(), now()),
('London', 'Rewire 3 Bed House', 'Installation & Wiring', 2400, 6000, 4200, 'GBP', 'per job', 'complex', 'market_data', 90, now(), now()),
('London', 'Kitchen Rewire', 'Installation & Wiring', 800, 1500, 1150, 'GBP', 'per job', 'standard', 'market_data', 85, now(), now()),
('London', 'Bathroom Rewire', 'Installation & Wiring', 600, 1200, 900, 'GBP', 'per job', 'standard', 'market_data', 85, now(), now()),
('London', 'Garage Electrics', 'Installation & Wiring', 450, 900, 675, 'GBP', 'per job', 'standard', 'market_data', 80, now(), now()),
('London', 'Shed/Outbuilding Wiring', 'Installation & Wiring', 360, 750, 555, 'GBP', 'per job', 'standard', 'market_data', 80, now(), now()),
('London', 'Garden Lighting Install', 'Installation & Wiring', 540, 1050, 795, 'GBP', 'per job', 'standard', 'market_data', 80, now(), now()),
('London', 'Security Lighting', 'Installation & Wiring', 480, 900, 690, 'GBP', 'per job', 'standard', 'market_data', 80, now(), now()),
('London', 'Socket Installation', 'Installation & Wiring', 240, 450, 345, 'GBP', 'per job', 'simple', 'market_data', 85, now(), now()),
('London', 'Additional Circuits', 'Installation & Wiring', 300, 600, 450, 'GBP', 'per job', 'standard', 'market_data', 85, now(), now()),

-- Consumer Units & Distribution
('London', 'Consumer Unit Replacement', 'Consumer Units & Distribution', 400, 800, 600, 'GBP', 'per job', 'standard', 'market_data', 90, now(), now()),
('London', 'Fuse Box Upgrade', 'Consumer Units & Distribution', 360, 750, 555, 'GBP', 'per job', 'standard', 'market_data', 85, now(), now()),
('London', 'Distribution Board Install', 'Consumer Units & Distribution', 600, 1200, 900, 'GBP', 'per job', 'complex', 'market_data', 80, now(), now()),
('London', 'MCB/RCD Replacement', 'Consumer Units & Distribution', 240, 360, 300, 'GBP', 'per job', 'simple', 'market_data', 85, now(), now()),
('London', 'Surge Protection Install', 'Consumer Units & Distribution', 300, 540, 420, 'GBP', 'per job', 'standard', 'market_data', 80, now(), now()),

-- Testing & Certification
('London', 'EICR Testing', 'Testing & Certification', 150, 350, 250, 'GBP', 'per job', 'standard', 'market_data', 90, now(), now()),
('London', 'PAT Testing', 'Testing & Certification', 75, 200, 137, 'GBP', 'per job', 'simple', 'market_data', 85, now(), now()),
('London', 'Electrical Safety Check', 'Testing & Certification', 120, 300, 210, 'GBP', 'per job', 'standard', 'market_data', 85, now(), now()),
('London', 'Part P Certification', 'Testing & Certification', 180, 360, 270, 'GBP', 'per job', 'standard', 'market_data', 85, now(), now()),
('London', 'Landlord Safety Certificate', 'Testing & Certification', 135, 300, 217, 'GBP', 'per job', 'standard', 'market_data', 85, now(), now()),

-- Emergency & Call-outs
('London', 'Emergency Call-out', 'Emergency & Call-outs', 360, 750, 555, 'GBP', 'per job', 'urgent', 'market_data', 80, now(), now()),
('London', 'Power Loss Investigation', 'Emergency & Call-outs', 300, 600, 450, 'GBP', 'per job', 'standard', 'market_data', 80, now(), now()),
('London', 'Trip Switch Repair', 'Emergency & Call-outs', 180, 360, 270, 'GBP', 'per job', 'simple', 'market_data', 85, now(), now()),
('London', 'Fault Finding', 'Emergency & Call-outs', 240, 480, 360, 'GBP', 'per job', 'standard', 'market_data', 80, now(), now()),
('London', 'RCD Testing/Repair', 'Emergency & Call-outs', 210, 420, 315, 'GBP', 'per job', 'standard', 'market_data', 80, now(), now()),

-- Smart Home & Technology
('London', 'Smart Home Setup', 'Smart Home & Technology', 600, 1200, 900, 'GBP', 'per job', 'complex', 'market_data', 75, now(), now()),
('London', 'Home Automation', 'Smart Home & Technology', 750, 1500, 1125, 'GBP', 'per job', 'complex', 'market_data', 75, now(), now()),
('London', 'Smart Meter Installation', 'Smart Home & Technology', 240, 450, 345, 'GBP', 'per job', 'standard', 'market_data', 85, now(), now()),
('London', 'WiFi Extender Setup', 'Smart Home & Technology', 180, 360, 270, 'GBP', 'per job', 'simple', 'market_data', 80, now(), now()),
('London', 'Data Cabling', 'Smart Home & Technology', 300, 600, 450, 'GBP', 'per job', 'standard', 'market_data', 80, now(), now()),

-- Commercial & Industrial
('London', 'Commercial Rewire', 'Commercial & Industrial', 1800, 3600, 2700, 'GBP', 'per job', 'advanced', 'market_data', 80, now(), now()),
('London', 'Industrial Installation', 'Commercial & Industrial', 2400, 4500, 3450, 'GBP', 'per job', 'advanced', 'market_data', 75, now(), now()),
('London', 'Office Electrics', 'Commercial & Industrial', 900, 1800, 1350, 'GBP', 'per job', 'complex', 'market_data', 80, now(), now()),
('London', 'Shop Fit Electrics', 'Commercial & Industrial', 750, 1500, 1125, 'GBP', 'per job', 'complex', 'market_data', 80, now(), now()),
('London', 'Warehouse Lighting', 'Commercial & Industrial', 1200, 2400, 1800, 'GBP', 'per job', 'complex', 'market_data', 80, now(), now()),

-- Maintenance & Repairs
('London', 'General Electrical Repair', 'Maintenance & Repairs', 240, 480, 360, 'GBP', 'per job', 'standard', 'market_data', 80, now(), now()),
('London', 'Socket Repair/Replace', 'Maintenance & Repairs', 150, 300, 225, 'GBP', 'per job', 'simple', 'market_data', 85, now(), now()),
('London', 'Light Fitting Repair', 'Maintenance & Repairs', 120, 240, 180, 'GBP', 'per job', 'simple', 'market_data', 85, now(), now()),
('London', 'Switch Replacement', 'Maintenance & Repairs', 90, 180, 135, 'GBP', 'per job', 'simple', 'market_data', 85, now(), now()),
('London', 'Cable Repair', 'Maintenance & Repairs', 180, 360, 270, 'GBP', 'per job', 'standard', 'market_data', 80, now(), now());

-- Now populate data for all other major regions with regional pricing adjustments
-- Birmingham (10% lower than London)
INSERT INTO regional_job_pricing (region, job_type, job_category, min_price, max_price, average_price, currency, unit, complexity_level, data_source, confidence_score, created_at, updated_at)
SELECT 'Birmingham', job_type, job_category,
       ROUND(min_price * 0.9), 
       ROUND(max_price * 0.9), 
       ROUND(average_price * 0.9), 
       currency, unit, complexity_level, data_source, confidence_score - 5,
       now(), now()
FROM regional_job_pricing WHERE region = 'London';

-- Manchester (15% lower than London)
INSERT INTO regional_job_pricing (region, job_type, job_category, min_price, max_price, average_price, currency, unit, complexity_level, data_source, confidence_score, created_at, updated_at)
SELECT 'Manchester', job_type, job_category,
       ROUND(min_price * 0.85), 
       ROUND(max_price * 0.85), 
       ROUND(average_price * 0.85), 
       currency, unit, complexity_level, data_source, confidence_score - 5,
       now(), now()
FROM regional_job_pricing WHERE region = 'London';

-- Glasgow (20% lower than London)
INSERT INTO regional_job_pricing (region, job_type, job_category, min_price, max_price, average_price, currency, unit, complexity_level, data_source, confidence_score, created_at, updated_at)
SELECT 'Glasgow', job_type, job_category,
       ROUND(min_price * 0.8), 
       ROUND(max_price * 0.8), 
       ROUND(average_price * 0.8), 
       currency, unit, complexity_level, data_source, confidence_score - 5,
       now(), now()
FROM regional_job_pricing WHERE region = 'London';

-- Edinburgh (5% lower than London)
INSERT INTO regional_job_pricing (region, job_type, job_category, min_price, max_price, average_price, currency, unit, complexity_level, data_source, confidence_score, created_at, updated_at)
SELECT 'Edinburgh', job_type, job_category,
       ROUND(min_price * 0.95), 
       ROUND(max_price * 0.95), 
       ROUND(average_price * 0.95), 
       currency, unit, complexity_level, data_source, confidence_score,
       now(), now()
FROM regional_job_pricing WHERE region = 'London';

-- Leeds (18% lower than London)
INSERT INTO regional_job_pricing (region, job_type, job_category, min_price, max_price, average_price, currency, unit, complexity_level, data_source, confidence_score, created_at, updated_at)
SELECT 'Leeds', job_type, job_category,
       ROUND(min_price * 0.82), 
       ROUND(max_price * 0.82), 
       ROUND(average_price * 0.82), 
       currency, unit, complexity_level, data_source, confidence_score - 5,
       now(), now()
FROM regional_job_pricing WHERE region = 'London';

-- Liverpool (22% lower than London)
INSERT INTO regional_job_pricing (region, job_type, job_category, min_price, max_price, average_price, currency, unit, complexity_level, data_source, confidence_score, created_at, updated_at)
SELECT 'Liverpool', job_type, job_category,
       ROUND(min_price * 0.78), 
       ROUND(max_price * 0.78), 
       ROUND(average_price * 0.78), 
       currency, unit, complexity_level, data_source, confidence_score - 5,
       now(), now()
FROM regional_job_pricing WHERE region = 'London';

-- Sheffield (25% lower than London)
INSERT INTO regional_job_pricing (region, job_type, job_category, min_price, max_price, average_price, currency, unit, complexity_level, data_source, confidence_score, created_at, updated_at)
SELECT 'Sheffield', job_type, job_category,
       ROUND(min_price * 0.75), 
       ROUND(max_price * 0.75), 
       ROUND(average_price * 0.75), 
       currency, unit, complexity_level, data_source, confidence_score - 10,
       now(), now()
FROM regional_job_pricing WHERE region = 'London';

-- Newcastle (28% lower than London)
INSERT INTO regional_job_pricing (region, job_type, job_category, min_price, max_price, average_price, currency, unit, complexity_level, data_source, confidence_score, created_at, updated_at)
SELECT 'Newcastle', job_type, job_category,
       ROUND(min_price * 0.72), 
       ROUND(max_price * 0.72), 
       ROUND(average_price * 0.72), 
       currency, unit, complexity_level, data_source, confidence_score - 10,
       now(), now()
FROM regional_job_pricing WHERE region = 'London';

-- Bristol (8% lower than London)
INSERT INTO regional_job_pricing (region, job_type, job_category, min_price, max_price, average_price, currency, unit, complexity_level, data_source, confidence_score, created_at, updated_at)
SELECT 'Bristol', job_type, job_category,
       ROUND(min_price * 0.92), 
       ROUND(max_price * 0.92), 
       ROUND(average_price * 0.92), 
       currency, unit, complexity_level, data_source, confidence_score,
       now(), now()
FROM regional_job_pricing WHERE region = 'London';

-- Cardiff (20% lower than London)
INSERT INTO regional_job_pricing (region, job_type, job_category, min_price, max_price, average_price, currency, unit, complexity_level, data_source, confidence_score, created_at, updated_at)
SELECT 'Cardiff', job_type, job_category,
       ROUND(min_price * 0.8), 
       ROUND(max_price * 0.8), 
       ROUND(average_price * 0.8), 
       currency, unit, complexity_level, data_source, confidence_score - 5,
       now(), now()
FROM regional_job_pricing WHERE region = 'London';