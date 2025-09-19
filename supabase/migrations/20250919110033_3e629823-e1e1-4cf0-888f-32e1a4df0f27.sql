-- Fix job type mismatch and populate comprehensive pricing data

-- First, let's clear the existing data to start fresh
DELETE FROM regional_job_pricing;

-- Insert comprehensive pricing data for all job types and locations
INSERT INTO regional_job_pricing (region, job_type, min_daily_price, max_daily_price, avg_daily_price, created_at, updated_at) 
VALUES 
-- EV Charging jobs
('London', 'EV Charger Install (7kW)', 280, 400, 340, now(), now()),
('London', 'EV Charger Install (22kW)', 400, 600, 500, now(), now()),
('London', 'EV Charger Install (50kW)', 800, 1200, 1000, now(), now()),
('London', 'EV Infrastructure Survey', 200, 300, 250, now(), now()),
('London', 'Commercial EV Setup', 600, 1000, 800, now(), now()),

-- Installation & Wiring
('London', 'Rewire Full House', 1000, 2667, 1833, now(), now()),
('London', 'Rewire 3 Bed House', 800, 2000, 1400, now(), now()),
('London', 'Kitchen Rewire', 267, 500, 383, now(), now()),
('London', 'Bathroom Rewire', 200, 400, 300, now(), now()),
('London', 'Garage Electrics', 150, 300, 225, now(), now()),
('London', 'Shed/Outbuilding Wiring', 120, 250, 185, now(), now()),
('London', 'Garden Lighting Install', 180, 350, 265, now(), now()),
('London', 'Security Lighting', 160, 300, 230, now(), now()),
('London', 'Socket Installation', 80, 150, 115, now(), now()),
('London', 'Additional Circuits', 100, 200, 150, now(), now()),

-- Consumer Units & Distribution
('London', 'Consumer Unit Replacement', 133, 267, 200, now(), now()),
('London', 'Fuse Box Upgrade', 120, 250, 185, now(), now()),
('London', 'Distribution Board Install', 200, 400, 300, now(), now()),
('London', 'MCB/RCD Replacement', 80, 120, 100, now(), now()),
('London', 'Surge Protection Install', 100, 180, 140, now(), now()),

-- Testing & Certification
('London', 'EICR Testing', 50, 117, 83, now(), now()),
('London', 'PAT Testing', 25, 67, 46, now(), now()),
('London', 'Electrical Safety Check', 40, 100, 70, now(), now()),
('London', 'Part P Certification', 60, 120, 90, now(), now()),
('London', 'Landlord Safety Certificate', 45, 100, 72, now(), now()),

-- Emergency & Call-outs
('London', 'Emergency Call-out', 120, 250, 185, now(), now()),
('London', 'Power Loss Investigation', 100, 200, 150, now(), now()),
('London', 'Trip Switch Repair', 60, 120, 90, now(), now()),
('London', 'Fault Finding', 80, 160, 120, now(), now()),
('London', 'RCD Testing/Repair', 70, 140, 105, now(), now()),

-- Smart Home & Technology
('London', 'Smart Home Setup', 200, 400, 300, now(), now()),
('London', 'Home Automation', 250, 500, 375, now(), now()),
('London', 'Smart Meter Installation', 80, 150, 115, now(), now()),
('London', 'WiFi Extender Setup', 60, 120, 90, now(), now()),
('London', 'Data Cabling', 100, 200, 150, now(), now()),

-- Commercial & Industrial
('London', 'Commercial Rewire', 600, 1200, 900, now(), now()),
('London', 'Industrial Installation', 800, 1500, 1150, now(), now()),
('London', 'Office Electrics', 300, 600, 450, now(), now()),
('London', 'Shop Fit Electrics', 250, 500, 375, now(), now()),
('London', 'Warehouse Lighting', 400, 800, 600, now(), now()),

-- Maintenance & Repairs
('London', 'General Electrical Repair', 80, 160, 120, now(), now()),
('London', 'Socket Repair/Replace', 50, 100, 75, now(), now()),
('London', 'Light Fitting Repair', 40, 80, 60, now(), now()),
('London', 'Switch Replacement', 30, 60, 45, now(), now()),
('London', 'Cable Repair', 60, 120, 90, now(), now());

-- Now populate data for all other regions with regional pricing adjustments
-- Birmingham (10% lower than London)
INSERT INTO regional_job_pricing (region, job_type, min_daily_price, max_daily_price, avg_daily_price, created_at, updated_at)
SELECT 'Birmingham', job_type, 
       ROUND(min_daily_price * 0.9), 
       ROUND(max_daily_price * 0.9), 
       ROUND(avg_daily_price * 0.9), 
       now(), now()
FROM regional_job_pricing WHERE region = 'London';

-- Manchester (15% lower than London)
INSERT INTO regional_job_pricing (region, job_type, min_daily_price, max_daily_price, avg_daily_price, created_at, updated_at)
SELECT 'Manchester', job_type, 
       ROUND(min_daily_price * 0.85), 
       ROUND(max_daily_price * 0.85), 
       ROUND(avg_daily_price * 0.85), 
       now(), now()
FROM regional_job_pricing WHERE region = 'London';

-- Glasgow (20% lower than London)
INSERT INTO regional_job_pricing (region, job_type, min_daily_price, max_daily_price, avg_daily_price, created_at, updated_at)
SELECT 'Glasgow', job_type, 
       ROUND(min_daily_price * 0.8), 
       ROUND(max_daily_price * 0.8), 
       ROUND(avg_daily_price * 0.8), 
       now(), now()
FROM regional_job_pricing WHERE region = 'London';

-- Edinburgh (5% lower than London)
INSERT INTO regional_job_pricing (region, job_type, min_daily_price, max_daily_price, avg_daily_price, created_at, updated_at)
SELECT 'Edinburgh', job_type, 
       ROUND(min_daily_price * 0.95), 
       ROUND(max_daily_price * 0.95), 
       ROUND(avg_daily_price * 0.95), 
       now(), now()
FROM regional_job_pricing WHERE region = 'London';

-- Leeds (18% lower than London)
INSERT INTO regional_job_pricing (region, job_type, min_daily_price, max_daily_price, avg_daily_price, created_at, updated_at)
SELECT 'Leeds', job_type, 
       ROUND(min_daily_price * 0.82), 
       ROUND(max_daily_price * 0.82), 
       ROUND(avg_daily_price * 0.82), 
       now(), now()
FROM regional_job_pricing WHERE region = 'London';

-- Liverpool (22% lower than London)
INSERT INTO regional_job_pricing (region, job_type, min_daily_price, max_daily_price, avg_daily_price, created_at, updated_at)
SELECT 'Liverpool', job_type, 
       ROUND(min_daily_price * 0.78), 
       ROUND(max_daily_price * 0.78), 
       ROUND(avg_daily_price * 0.78), 
       now(), now()
FROM regional_job_pricing WHERE region = 'London';

-- Sheffield (25% lower than London)
INSERT INTO regional_job_pricing (region, job_type, min_daily_price, max_daily_price, avg_daily_price, created_at, updated_at)
SELECT 'Sheffield', job_type, 
       ROUND(min_daily_price * 0.75), 
       ROUND(max_daily_price * 0.75), 
       ROUND(avg_daily_price * 0.75), 
       now(), now()
FROM regional_job_pricing WHERE region = 'London';

-- Newcastle (28% lower than London)
INSERT INTO regional_job_pricing (region, job_type, min_daily_price, max_daily_price, avg_daily_price, created_at, updated_at)
SELECT 'Newcastle', job_type, 
       ROUND(min_daily_price * 0.72), 
       ROUND(max_daily_price * 0.72), 
       ROUND(avg_daily_price * 0.72), 
       now(), now()
FROM regional_job_pricing WHERE region = 'London';

-- Bristol (8% lower than London)
INSERT INTO regional_job_pricing (region, job_type, min_daily_price, max_daily_price, avg_daily_price, created_at, updated_at)
SELECT 'Bristol', job_type, 
       ROUND(min_daily_price * 0.92), 
       ROUND(max_daily_price * 0.92), 
       ROUND(avg_daily_price * 0.92), 
       now(), now()
FROM regional_job_pricing WHERE region = 'London';

-- Cardiff (20% lower than London)
INSERT INTO regional_job_pricing (region, job_type, min_daily_price, max_daily_price, avg_daily_price, created_at, updated_at)
SELECT 'Cardiff', job_type, 
       ROUND(min_daily_price * 0.8), 
       ROUND(max_daily_price * 0.8), 
       ROUND(avg_daily_price * 0.8), 
       now(), now()
FROM regional_job_pricing WHERE region = 'London';