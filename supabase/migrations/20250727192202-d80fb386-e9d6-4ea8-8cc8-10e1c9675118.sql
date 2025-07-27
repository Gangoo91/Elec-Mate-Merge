-- First, remove portfolio categories from Level 2 qualifications that don't require portfolios
-- Remove categories for City & Guilds 2365-02 (Level 2)
DELETE FROM qualification_categories WHERE qualification_id = 'd16cf47a-9d95-4bb8-865e-ee8822822016';

-- Remove categories for EAL Level 2 (QLS-600/2356/5)
DELETE FROM qualification_categories WHERE qualification_id = '184ed060-5464-4f54-bdf1-66fb3e4ad12d';

-- Add the missing qualifications that require portfolios

-- 1. City & Guilds Level 3 Electrical Installation (2365-03) - already exists, keep its categories

-- 2. City & Guilds Level 3 Award in Initial Verification and Certification (2391-52)
-- Add categories for this qualification
INSERT INTO qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria) VALUES
('5c1b780c-c851-4735-94ba-b053b630abb7', 'Initial Verification Procedures', 'Skills in conducting initial verification of new electrical installations', 'search', 'hsl(210, 100%, 50%)', 3, 
ARRAY['Understand initial verification requirements', 'Apply testing procedures for new installations', 'Complete certification accurately'],
ARRAY['Demonstrates knowledge of initial verification procedures', 'Performs appropriate tests on new installations', 'Completes certificates with accuracy']);

INSERT INTO qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria) VALUES
('5c1b780c-c851-4735-94ba-b053b630abb7', 'Testing and Measurement', 'Advanced testing techniques and measurement skills', 'zap', 'hsl(45, 100%, 50%)', 4,
ARRAY['Use advanced test equipment', 'Interpret complex test results', 'Apply relevant testing standards'],
ARRAY['Selects appropriate test instruments', 'Accurately measures electrical parameters', 'Interprets results against standards']);

-- 3. EAL Level 3 Advanced Diploma - already has categories

-- 4. EAL Level 3 NVQ Diploma - needs categories
INSERT INTO qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria) VALUES
('4d6732ad-ff5a-47fa-884f-529f2f691b6f', 'Electrotechnical Installation', 'Installation of complex electrotechnical systems', 'wrench', 'hsl(120, 100%, 40%)', 5,
ARRAY['Install complex electrical systems', 'Apply advanced installation techniques', 'Follow industry standards'],
ARRAY['Demonstrates advanced installation skills', 'Applies appropriate techniques for complex systems', 'Ensures compliance with standards']);

INSERT INTO qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria) VALUES
('4d6732ad-ff5a-47fa-884f-529f2f691b6f', 'System Commissioning', 'Commissioning and testing of electrotechnical systems', 'play-circle', 'hsl(270, 100%, 50%)', 3,
ARRAY['Commission electrical systems', 'Perform system testing', 'Complete commissioning documentation'],
ARRAY['Successfully commissions electrical systems', 'Performs comprehensive system tests', 'Documents commissioning procedures']);

INSERT INTO qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria) VALUES
('4d6732ad-ff5a-47fa-884f-529f2f691b6f', 'Maintenance and Troubleshooting', 'Maintenance procedures and fault diagnosis', 'tool', 'hsl(15, 100%, 50%)', 4,
ARRAY['Perform preventive maintenance', 'Diagnose system faults', 'Implement corrective actions'],
ARRAY['Carries out effective maintenance procedures', 'Accurately diagnoses faults', 'Implements appropriate solutions']);

-- 5. MOET Level 3 - already has categories

-- Now add the remaining 4 new qualifications that require portfolios

-- 6. JTL Level 3 Electrical Installation
INSERT INTO qualifications (id, awarding_body, level, title, code, description) VALUES
(gen_random_uuid(), 'JTL', 'Level 3', 'JTL Level 3 Diploma in Electrical Installation', 'JTL-L3-EI', 'Advanced electrical installation qualification focused on practical skills and industry standards');

-- Get the ID for the JTL qualification we just inserted
WITH jtl_qual AS (
  SELECT id FROM qualifications WHERE code = 'JTL-L3-EI'
)
INSERT INTO qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria)
SELECT jtl_qual.id, 'Advanced Wiring Systems', 'Complex wiring and distribution systems', 'zap', 'hsl(220, 100%, 60%)', 4,
ARRAY['Install complex wiring systems', 'Apply cable management techniques', 'Follow BS 7671 requirements'],
ARRAY['Demonstrates advanced wiring skills', 'Applies appropriate cable management', 'Ensures compliance with regulations']
FROM jtl_qual;

WITH jtl_qual AS (
  SELECT id FROM qualifications WHERE code = 'JTL-L3-EI'
)
INSERT INTO qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria)
SELECT jtl_qual.id, 'Motor Control and Automation', 'Motor control circuits and automation systems', 'cpu', 'hsl(280, 100%, 50%)', 3,
ARRAY['Install motor control systems', 'Program basic automation', 'Troubleshoot control circuits'],
ARRAY['Successfully installs motor control systems', 'Demonstrates automation skills', 'Effectively troubleshoots control circuits']
FROM jtl_qual;

-- 7. SQA Level 3 Electrical Engineering
INSERT INTO qualifications (id, awarding_body, level, title, code, description) VALUES
(gen_random_uuid(), 'SQA', 'Level 3', 'SQA Higher National Certificate in Electrical Engineering', 'SQA-HNC-EE', 'Scottish qualification covering electrical engineering principles and applications');

WITH sqa_qual AS (
  SELECT id FROM qualifications WHERE code = 'SQA-HNC-EE'
)
INSERT INTO qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria)
SELECT sqa_qual.id, 'Electrical Engineering Principles', 'Advanced electrical engineering theory and applications', 'calculator', 'hsl(190, 100%, 50%)', 4,
ARRAY['Apply electrical engineering principles', 'Perform complex calculations', 'Analyse electrical systems'],
ARRAY['Demonstrates understanding of engineering principles', 'Accurately performs calculations', 'Effectively analyses systems']
FROM sqa_qual;

WITH sqa_qual AS (
  SELECT id FROM qualifications WHERE code = 'SQA-HNC-EE'
)
INSERT INTO qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria)
SELECT sqa_qual.id, 'Power Systems and Protection', 'Power generation, distribution and protection systems', 'shield', 'hsl(0, 100%, 50%)', 3,
ARRAY['Understand power systems', 'Apply protection principles', 'Design protection schemes'],
ARRAY['Demonstrates knowledge of power systems', 'Applies appropriate protection methods', 'Designs effective protection schemes']
FROM sqa_qual;

-- 8. NICEIC Level 3 Inspection and Testing
INSERT INTO qualifications (id, awarding_body, level, title, code, description) VALUES
(gen_random_uuid(), 'NICEIC', 'Level 3', 'NICEIC Level 3 Certificate in Inspection, Testing and Certification', 'NICEIC-L3-ITC', 'Specialist qualification in electrical inspection, testing and certification procedures');

WITH niceic_qual AS (
  SELECT id FROM qualifications WHERE code = 'NICEIC-L3-ITC'
)
INSERT INTO qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria)
SELECT niceic_qual.id, 'Advanced Inspection Techniques', 'Comprehensive inspection methodologies and procedures', 'eye', 'hsl(30, 100%, 50%)', 3,
ARRAY['Conduct detailed visual inspections', 'Identify potential hazards', 'Apply inspection standards'],
ARRAY['Performs thorough inspections', 'Accurately identifies defects', 'Applies relevant standards']
FROM niceic_qual;

WITH niceic_qual AS (
  SELECT id FROM qualifications WHERE code = 'NICEIC-L3-ITC'
)
INSERT INTO qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria)
SELECT niceic_qual.id, 'Certification and Documentation', 'Professional certification and documentation procedures', 'file-text', 'hsl(270, 100%, 50%)', 2,
ARRAY['Complete electrical certificates', 'Maintain documentation standards', 'Apply regulatory requirements'],
ARRAY['Accurately completes certificates', 'Maintains professional standards', 'Ensures regulatory compliance']
FROM niceic_qual;

-- 9. ECITB Level 3 Electrical Maintenance
INSERT INTO qualifications (id, awarding_body, level, title, code, description) VALUES
(gen_random_uuid(), 'ECITB', 'Level 3', 'ECITB Level 3 Certificate in Electrical Maintenance', 'ECITB-L3-EM', 'Industrial electrical maintenance qualification for engineering and construction industries');

WITH ecitb_qual AS (
  SELECT id FROM qualifications WHERE code = 'ECITB-L3-EM'
)
INSERT INTO qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria)
SELECT ecitb_qual.id, 'Industrial Electrical Systems', 'Maintenance of industrial electrical equipment and systems', 'factory', 'hsl(160, 100%, 40%)', 4,
ARRAY['Maintain industrial electrical systems', 'Apply industrial standards', 'Perform system upgrades'],
ARRAY['Effectively maintains industrial systems', 'Applies appropriate standards', 'Successfully implements upgrades']
FROM ecitb_qual;

WITH ecitb_qual AS (
  SELECT id FROM qualifications WHERE code = 'ECITB-L3-EM'
)
INSERT INTO qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria)
SELECT ecitb_qual.id, 'Preventive Maintenance Programs', 'Development and implementation of maintenance programs', 'calendar', 'hsl(120, 100%, 40%)', 3,
ARRAY['Develop maintenance schedules', 'Implement preventive programs', 'Monitor system performance'],
ARRAY['Creates effective maintenance schedules', 'Successfully implements programs', 'Monitors and improves performance']
FROM ecitb_qual;

-- Update qualifications table to add portfolio requirements flag
-- Add a column to indicate which qualifications require portfolios
ALTER TABLE qualifications ADD COLUMN IF NOT EXISTS requires_portfolio BOOLEAN DEFAULT false;

-- Update the qualifications that require portfolios
UPDATE qualifications SET requires_portfolio = true WHERE code IN (
  '2365-03',      -- City & Guilds Level 3 Electrical Installation
  '2391-52',      -- City & Guilds Level 3 Initial Verification
  'QLS-600/2357/7',  -- EAL Level 3 Advanced Diploma
  'QLS-600/1686/4',  -- EAL Level 3 NVQ Diploma
  'MOET-L3',         -- MOET Level 3
  'JTL-L3-EI',       -- JTL Level 3
  'SQA-HNC-EE',      -- SQA Level 3
  'NICEIC-L3-ITC',   -- NICEIC Level 3
  'ECITB-L3-EM'      -- ECITB Level 3
);