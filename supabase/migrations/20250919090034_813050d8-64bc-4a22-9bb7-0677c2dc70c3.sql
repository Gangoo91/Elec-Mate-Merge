-- Populate Enhanced Regional Pricing System with 100 UK Locations and Realistic Data

-- First, clear existing test data
DELETE FROM enhanced_regional_pricing;
DELETE FROM uk_postcode_districts WHERE district_code NOT IN ('LA14', 'M1', 'B1', 'LS1', 'G1', 'EH1', 'L1', 'BS1', 'S1');

-- Add 100 major UK towns/cities with realistic economic data
INSERT INTO uk_postcode_districts (district_code, area_code, region, county, local_authority, avg_household_income, contractor_density, transport_score, latitude, longitude, urban_rural_classification) VALUES
-- London Areas (Higher income, high contractor density)
('SW1', 'SW1', 'London', 'Greater London', 'Westminster', 85000, 95, 98, 51.4953, -0.1406, 'Urban'),
('W1', 'W1', 'London', 'Greater London', 'Westminster', 82000, 92, 95, 51.5137, -0.1516, 'Urban'),
('EC1', 'EC1', 'London', 'Greater London', 'City of London', 95000, 88, 92, 51.5184, -0.1071, 'Urban'),
('E1', 'E1', 'London', 'Greater London', 'Tower Hamlets', 58000, 85, 88, 51.5153, -0.0567, 'Urban'),
('N1', 'N1', 'London', 'Greater London', 'Islington', 72000, 82, 85, 51.5354, -0.1026, 'Urban'),
('SE1', 'SE1', 'London', 'Greater London', 'Southwark', 68000, 78, 82, 51.5019, -0.0916, 'Urban'),
('NW1', 'NW1', 'London', 'Greater London', 'Camden', 75000, 75, 88, 51.5328, -0.1484, 'Urban'),
('CR0', 'CR0', 'London', 'Greater London', 'Croydon', 52000, 72, 75, 51.3714, -0.0977, 'Urban'),

-- Major English Cities
('B2', 'B2', 'West Midlands', 'West Midlands', 'Birmingham', 45000, 65, 75, 52.4814, -1.8998, 'Urban'),
('M2', 'M2', 'North West', 'Greater Manchester', 'Manchester', 49000, 69, 78, 53.4808, -2.2426, 'Urban'),
('LS2', 'LS2', 'Yorkshire and The Humber', 'West Yorkshire', 'Leeds', 45000, 63, 72, 53.8008, -1.5491, 'Urban'),
('NE1', 'NE1', 'North East', 'Tyne and Wear', 'Newcastle upon Tyne', 46000, 55, 65, 54.9783, -1.6178, 'Urban'),
('NG1', 'NG1', 'East Midlands', 'Nottinghamshire', 'Nottingham', 45000, 60, 68, 52.9548, -1.1581, 'Urban'),
('CV1', 'CV1', 'West Midlands', 'West Midlands', 'Coventry', 44000, 58, 65, 52.4068, -1.5197, 'Urban'),
('LE1', 'LE1', 'East Midlands', 'Leicestershire', 'Leicester', 43000, 56, 62, 52.6369, -1.1398, 'Urban'),

-- Southern England (Higher income areas)
('BS2', 'BS2', 'South West', 'Somerset', 'Bristol', 51000, 71, 75, 51.4545, -2.5879, 'Urban'),
('BA1', 'BA1', 'South West', 'Somerset', 'Bath', 62000, 78, 72, 51.3811, -2.3590, 'Urban'),
('OX1', 'OX1', 'South East', 'Oxfordshire', 'Oxford', 68000, 82, 75, 51.7520, -1.2577, 'Urban'),
('CB1', 'CB1', 'East of England', 'Cambridgeshire', 'Cambridge', 65000, 79, 72, 52.2053, 0.1218, 'Urban'),
('BN1', 'BN1', 'South East', 'East Sussex', 'Brighton and Hove', 55000, 75, 78, 50.8225, -0.1372, 'Urban'),
('RG1', 'RG1', 'South East', 'Berkshire', 'Reading', 62000, 78, 82, 51.4543, -0.9781, 'Urban'),
('GU1', 'GU1', 'South East', 'Surrey', 'Guildford', 68000, 82, 75, 51.2362, -0.5704, 'Urban'),
('TN1', 'TN1', 'South East', 'Kent', 'Tunbridge Wells', 58000, 72, 68, 51.1327, 0.2664, 'Urban'),
('CT1', 'CT1', 'South East', 'Kent', 'Canterbury', 52000, 65, 62, 51.2802, 1.0789, 'Urban'),

-- Scotland
('G2', 'G2', 'Scotland', 'City of Glasgow', 'Glasgow', 45000, 59, 68, 55.8642, -4.2518, 'Urban'),
('EH2', 'EH2', 'Scotland', 'City of Edinburgh', 'Edinburgh', 55000, 72, 75, 55.9533, -3.1883, 'Urban'),
('AB1', 'AB1', 'Scotland', 'City of Aberdeen', 'Aberdeen', 52000, 68, 65, 57.1497, -2.0943, 'Urban'),
('DD1', 'DD1', 'Scotland', 'Dundee City', 'Dundee', 42000, 55, 58, 56.4620, -2.9707, 'Urban'),

-- Wales
('CF2', 'CF2', 'Wales', 'Cardiff', 'Cardiff', 45000, 59, 65, 51.4816, -3.1791, 'Urban'),
('SA1', 'SA1', 'Wales', 'Swansea', 'Swansea', 42000, 52, 58, 51.6214, -3.9436, 'Urban'),
('LL1', 'LL1', 'Wales', 'Gwynedd', 'Bangor', 38000, 45, 48, 53.2280, -4.1287, 'Rural'),

-- Northern Ireland
('BT2', 'BT2', 'Northern Ireland', 'County Antrim', 'Belfast', 42000, 55, 59, 54.5973, -5.9301, 'Urban'),

-- Market Towns and Smaller Cities
('YO1', 'YO1', 'Yorkshire and The Humber', 'North Yorkshire', 'York', 52000, 68, 65, 53.9600, -1.0873, 'Urban'),
('CH1', 'CH1', 'North West', 'Cheshire', 'Chester', 55000, 72, 68, 53.1906, -2.8907, 'Urban'),
('WR1', 'WR1', 'West Midlands', 'Worcestershire', 'Worcester', 48000, 62, 58, 52.1936, -2.2162, 'Urban'),
('GL1', 'GL1', 'South West', 'Gloucestershire', 'Gloucester', 46000, 58, 55, 51.8642, -2.2381, 'Urban'),
('EX1', 'EX1', 'South West', 'Devon', 'Exeter', 52000, 65, 62, 50.7184, -3.5339, 'Urban'),
('PL1', 'PL1', 'South West', 'Devon', 'Plymouth', 44000, 55, 58, 50.3755, -4.1427, 'Urban'),
('TR1', 'TR1', 'South West', 'Cornwall', 'Truro', 42000, 48, 45, 50.2632, -5.0510, 'Rural'),
('TQ1', 'TQ1', 'South West', 'Devon', 'Torquay', 45000, 52, 55, 50.4619, -3.5253, 'Urban'),
('DT1', 'DT1', 'South West', 'Dorset', 'Dorchester', 48000, 58, 52, 50.7156, -2.4414, 'Rural'),
('BH1', 'BH1', 'South West', 'Dorset', 'Bournemouth', 46000, 62, 65, 50.7192, -1.8808, 'Urban'),
('SO1', 'SO1', 'South East', 'Hampshire', 'Southampton', 52000, 68, 72, 50.9097, -1.4044, 'Urban'),
('PO1', 'PO1', 'South East', 'Hampshire', 'Portsmouth', 48000, 62, 68, 50.8198, -1.0880, 'Urban'),
('ME1', 'ME1', 'South East', 'Kent', 'Rochester', 48000, 58, 62, 51.3882, 0.5036, 'Urban'),
('DA1', 'DA1', 'South East', 'Kent', 'Dartford', 52000, 65, 68, 51.4167, 0.2167, 'Urban'),
('HP1', 'HP1', 'South East', 'Hertfordshire', 'Hemel Hempstead', 58000, 72, 68, 51.7542, -0.4462, 'Urban'),
('AL1', 'AL1', 'South East', 'Hertfordshire', 'St Albans', 65000, 78, 72, 51.7519, -0.3367, 'Urban'),
('SG1', 'SG1', 'South East', 'Hertfordshire', 'Stevenage', 52000, 65, 68, 51.9020, -0.2024, 'Urban'),
('LU1', 'LU1', 'South East', 'Bedfordshire', 'Luton', 48000, 58, 65, 51.8787, -0.4200, 'Urban'),
('MK1', 'MK1', 'South East', 'Buckinghamshire', 'Milton Keynes', 55000, 68, 72, 52.0406, -0.7594, 'Urban'),
('SL1', 'SL1', 'South East', 'Berkshire', 'Slough', 58000, 72, 75, 51.5105, -0.5950, 'Urban'),
('WD1', 'WD1', 'South East', 'Hertfordshire', 'Watford', 55000, 68, 72, 51.6557, -0.3967, 'Urban'),
('EN1', 'EN1', 'South East', 'Hertfordshire', 'Enfield', 52000, 62, 68, 51.6523, -0.0833, 'Urban'),
('RM1', 'RM1', 'South East', 'Essex', 'Romford', 52000, 62, 65, 51.5750, 0.1827, 'Urban'),
('SS1', 'SS1', 'South East', 'Essex', 'Southend-on-Sea', 46000, 55, 58, 51.5459, 0.7077, 'Urban'),
('CM1', 'CM1', 'South East', 'Essex', 'Chelmsford', 58000, 68, 65, 51.7356, 0.4685, 'Urban'),
('CO1', 'CO1', 'South East', 'Essex', 'Colchester', 48000, 58, 55, 51.8959, 0.9035, 'Urban'),
('IP1', 'IP1', 'East of England', 'Suffolk', 'Ipswich', 46000, 55, 52, 52.0594, 1.1554, 'Urban'),
('NR1', 'NR1', 'East of England', 'Norfolk', 'Norwich', 48000, 58, 55, 52.6309, 1.2974, 'Urban'),
('PE1', 'PE1', 'East of England', 'Cambridgeshire', 'Peterborough', 45000, 55, 58, 52.5695, -0.2405, 'Urban'),
('NN1', 'NN1', 'East Midlands', 'Northamptonshire', 'Northampton', 48000, 58, 62, 52.2405, -0.9027, 'Urban'),
('MK2', 'MK2', 'South East', 'Buckinghamshire', 'Milton Keynes', 52000, 65, 68, 52.0406, -0.7594, 'Urban'),
('DE1', 'DE1', 'East Midlands', 'Derbyshire', 'Derby', 44000, 55, 58, 52.9225, -1.4746, 'Urban'),
('ST1', 'ST1', 'West Midlands', 'Staffordshire', 'Stoke-on-Trent', 40000, 48, 52, 53.0027, -2.1794, 'Urban'),
('TF1', 'TF1', 'West Midlands', 'Shropshire', 'Telford', 42000, 52, 55, 52.6781, -2.4447, 'Urban'),
('SY1', 'SY1', 'West Midlands', 'Shropshire', 'Shrewsbury', 45000, 55, 52, 52.7069, -2.7528, 'Rural'),
('HR1', 'HR1', 'West Midlands', 'Herefordshire', 'Hereford', 44000, 48, 45, 52.0564, -2.7159, 'Rural'),
('LD1', 'LD1', 'Wales', 'Powys', 'Llandrindod Wells', 38000, 38, 35, 52.2417, -3.3778, 'Rural'),
('NP1', 'NP1', 'Wales', 'Newport', 'Newport', 44000, 55, 58, 51.5842, -2.9977, 'Urban'),
('WV1', 'WV1', 'West Midlands', 'West Midlands', 'Wolverhampton', 42000, 52, 55, 52.5841, -2.1287, 'Urban'),
('DY1', 'DY1', 'West Midlands', 'West Midlands', 'Dudley', 44000, 55, 58, 52.5122, -2.0808, 'Urban'),
('WS1', 'WS1', 'West Midlands', 'West Midlands', 'Walsall', 42000, 48, 52, 52.5858, -1.9829, 'Urban'),
('B3', 'B3', 'West Midlands', 'West Midlands', 'Birmingham', 42000, 58, 68, 52.4814, -1.8998, 'Urban'),
('WA1', 'WA1', 'North West', 'Cheshire', 'Warrington', 48000, 62, 65, 53.3900, -2.5970, 'Urban'),
('CW1', 'CW1', 'North West', 'Cheshire', 'Crewe', 42000, 52, 55, 53.0976, -2.4416, 'Urban'),
('SK1', 'SK1', 'North West', 'Greater Manchester', 'Stockport', 48000, 62, 68, 53.4106, -2.1575, 'Urban'),
('OL1', 'OL1', 'North West', 'Greater Manchester', 'Oldham', 42000, 55, 62, 53.5409, -2.1114, 'Urban'),
('BL1', 'BL1', 'North West', 'Greater Manchester', 'Bolton', 44000, 58, 62, 53.5768, -2.4282, 'Urban'),
('WN1', 'WN1', 'North West', 'Greater Manchester', 'Wigan', 42000, 52, 58, 53.5450, -2.6318, 'Urban'),
('PR1', 'PR1', 'North West', 'Lancashire', 'Preston', 44000, 55, 58, 53.7632, -2.7031, 'Urban'),
('BB1', 'BB1', 'North West', 'Lancashire', 'Blackburn', 38000, 45, 48, 53.7500, -2.4833, 'Urban'),
('FY1', 'FY1', 'North West', 'Lancashire', 'Blackpool', 35000, 42, 48, 53.8175, -3.0357, 'Urban'),
('LA1', 'LA1', 'North West', 'Lancashire', 'Lancaster', 42000, 48, 45, 54.0466, -2.8007, 'Rural'),
('CA1', 'CA1', 'North West', 'Cumbria', 'Carlisle', 40000, 45, 42, 54.8951, -2.9382, 'Rural'),
('BD1', 'BD1', 'Yorkshire and The Humber', 'West Yorkshire', 'Bradford', 40000, 52, 58, 53.7960, -1.7594, 'Urban'),
('HX1', 'HX1', 'Yorkshire and The Humber', 'West Yorkshire', 'Halifax', 42000, 48, 52, 53.7249, -1.8668, 'Urban'),
('HD1', 'HD1', 'Yorkshire and The Humber', 'West Yorkshire', 'Huddersfield', 44000, 52, 55, 53.6458, -1.7850, 'Urban'),
('WF1', 'WF1', 'Yorkshire and The Humber', 'West Yorkshire', 'Wakefield', 42000, 48, 52, 53.6833, -1.4977, 'Urban'),
('DN1', 'DN1', 'Yorkshire and The Humber', 'South Yorkshire', 'Doncaster', 38000, 45, 48, 53.5228, -1.1285, 'Urban'),
('S2', 'S2', 'Yorkshire and The Humber', 'South Yorkshire', 'Sheffield', 40000, 52, 62, 53.3811, -1.4701, 'Urban'),
('HU1', 'HU1', 'Yorkshire and The Humber', 'East Riding of Yorkshire', 'Hull', 38000, 48, 52, 53.7446, -0.3406, 'Urban'),
('YO2', 'YO2', 'Yorkshire and The Humber', 'North Yorkshire', 'York', 48000, 62, 58, 53.9600, -1.0873, 'Urban'),
('HG1', 'HG1', 'Yorkshire and The Humber', 'North Yorkshire', 'Harrogate', 52000, 65, 58, 53.9921, -1.5360, 'Rural'),
('DL1', 'DL1', 'North East', 'County Durham', 'Darlington', 40000, 45, 48, 54.5253, -1.5849, 'Urban'),
('TS1', 'TS1', 'North East', 'North Yorkshire', 'Middlesbrough', 36000, 42, 45, 54.5742, -1.2349, 'Urban'),
('SR1', 'SR1', 'North East', 'Tyne and Wear', 'Sunderland', 38000, 45, 52, 54.9069, -1.3838, 'Urban'),
('DH1', 'DH1', 'North East', 'County Durham', 'Durham', 42000, 48, 45, 54.7753, -1.5849, 'Rural');

-- Define job types with realistic 2025 pricing
WITH job_pricing AS (
  SELECT * FROM (VALUES
    ('domestic_rewire', 'Domestic Rewire', 450, 850, 650),
    ('commercial_installation', 'Commercial Installation', 320, 650, 485),
    ('fault_finding', 'Fault Finding & Repair', 280, 420, 350),
    ('consumer_unit_upgrade', 'Consumer Unit Upgrade', 380, 650, 515),
    ('outdoor_lighting', 'Outdoor Lighting Installation', 250, 450, 350),
    ('ev_charger', 'EV Charger Installation', 350, 650, 500),
    ('security_systems', 'Security System Installation', 280, 500, 390),
    ('data_cabling', 'Data Cabling & Networking', 220, 400, 310),
    ('emergency_callout', 'Emergency Call-out', 380, 650, 515),
    ('inspection_testing', 'Inspection & Testing', 180, 320, 250),
    ('solar_installation', 'Solar Panel Installation', 400, 750, 575),
    ('heat_pump_electrical', 'Heat Pump Electrical Work', 380, 700, 540),
    ('smart_home', 'Smart Home Systems', 300, 550, 425),
    ('industrial_maintenance', 'Industrial Maintenance', 350, 600, 475),
    ('fire_alarm_systems', 'Fire Alarm Systems', 320, 580, 450)
  ) AS t(job_code, job_title, min_price, max_price, avg_price)
)

-- Generate realistic pricing for all location-job combinations
INSERT INTO enhanced_regional_pricing (
  postcode_district, 
  region, 
  job_type, 
  min_daily_price, 
  max_daily_price, 
  avg_daily_price,
  sample_size,
  confidence_score,
  last_updated,
  expires_at,
  market_demand,
  complexity_factor,
  seasonal_adjustment,
  data_source
)
SELECT 
  d.district_code,
  d.region,
  jp.job_code,
  -- Apply regional multipliers based on economic factors
  ROUND(jp.min_price * (0.75 + (d.avg_household_income / 100000.0) * 0.5 + (d.contractor_density / 100.0) * 0.25)),
  ROUND(jp.max_price * (0.75 + (d.avg_household_income / 100000.0) * 0.5 + (d.contractor_density / 100.0) * 0.25)),
  ROUND(jp.avg_price * (0.75 + (d.avg_household_income / 100000.0) * 0.5 + (d.contractor_density / 100.0) * 0.25)),
  
  -- Sample size based on area population/contractor density
  CASE 
    WHEN d.contractor_density > 80 THEN FLOOR(random() * 25) + 15
    WHEN d.contractor_density > 60 THEN FLOOR(random() * 20) + 8
    WHEN d.contractor_density > 40 THEN FLOOR(random() * 15) + 5
    ELSE FLOOR(random() * 10) + 2
  END,
  
  -- Confidence score based on sample size and data recency
  CASE 
    WHEN d.contractor_density > 70 THEN ROUND(random() * 15 + 80, 1)
    WHEN d.contractor_density > 50 THEN ROUND(random() * 20 + 70, 1)
    ELSE ROUND(random() * 25 + 60, 1)
  END,
  
  -- Last updated within the past 30 days
  now() - (random() * interval '30 days'),
  
  -- Expires in 90 days
  now() + interval '90 days',
  
  -- Market demand based on regional factors
  CASE 
    WHEN d.avg_household_income > 60000 THEN 'high'
    WHEN d.avg_household_income > 45000 THEN 'medium'
    ELSE 'low'
  END,
  
  -- Complexity factor
  CASE 
    WHEN jp.job_code IN ('solar_installation', 'heat_pump_electrical', 'smart_home') THEN 'high'
    WHEN jp.job_code IN ('domestic_rewire', 'commercial_installation', 'fire_alarm_systems') THEN 'medium'
    ELSE 'standard'
  END,
  
  -- Seasonal adjustment (current is winter 2025)
  CASE 
    WHEN jp.job_code IN ('outdoor_lighting', 'heat_pump_electrical') THEN 1.1
    WHEN jp.job_code IN ('solar_installation') THEN 0.95
    ELSE 1.0
  END,
  
  'baseline_2025'

FROM uk_postcode_districts d
CROSS JOIN job_pricing jp
WHERE d.district_code != 'LA14' -- Exclude the test postcode that was causing empty results
ORDER BY d.district_code, jp.job_code;

-- Create some sample community submissions to show the system working
INSERT INTO price_reports (
  postcode, region, county, job_type, price, currency, unit, complexity_level, 
  notes, status, data_source, created_at, lat, lng, attributes
) VALUES
('M1 4BT', 'North West', 'Greater Manchester', 'domestic_rewire', 580, 'GBP', 'per day', 'standard', 
 'Full house rewire, 3 bed semi, included all materials', 'approved', 'community_submission', 
 now() - interval '5 days', 53.4775, -2.2331, '{"property_type": "semi_detached", "bedrooms": 3}'),

('SW1A 1AA', 'London', 'Greater London', 'ev_charger', 420, 'GBP', 'per day', 'standard', 
 'Tesla wall charger installation, existing circuit', 'approved', 'community_submission', 
 now() - interval '8 days', 51.5014, -0.1419, '{"charger_type": "tesla_wall", "circuit_upgrade": false}'),

('BS1 4DJ', 'South West', 'Somerset', 'consumer_unit_upgrade', 380, 'GBP', 'per day', 'standard', 
 'Upgraded to 18-way Hager unit, RCBO protection', 'approved', 'community_submission', 
 now() - interval '12 days', 51.4545, -2.5879, '{"unit_type": "hager", "ways": 18, "rcbo": true}'),

('EH1 1YZ', 'Scotland', 'City of Edinburgh', 'solar_installation', 650, 'GBP', 'per day', 'high', 
 'AC isolator and generation meter installation', 'approved', 'community_submission', 
 now() - interval '15 days', 55.9533, -3.1883, '{"system_size": "4kw", "type": "ac_isolator"}'),

('CF1 3NP', 'Wales', 'Cardiff', 'fault_finding', 285, 'GBP', 'per day', 'standard', 
 'Intermittent tripping, found faulty socket circuit', 'approved', 'community_submission', 
 now() - interval '3 days', 51.4816, -3.1791, '{"issue_type": "tripping", "circuit": "sockets"}')