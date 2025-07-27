-- First, let's see the current qualifications to understand the structure
-- Remove all qualifications except City & Guilds and EAL that require portfolios

-- Delete all qualifications that are not City & Guilds or EAL
DELETE FROM public.qualifications 
WHERE awarding_body NOT IN ('City & Guilds', 'EAL');

-- Update all remaining qualifications to require portfolios
UPDATE public.qualifications 
SET requires_portfolio = true 
WHERE awarding_body IN ('City & Guilds', 'EAL');

-- Keep only the specific City & Guilds courses mentioned
-- Remove City & Guilds courses that are not in the specified list
DELETE FROM public.qualifications 
WHERE awarding_body = 'City & Guilds' 
AND title NOT IN (
  'Level 2 Diploma in Electrical Installations (Buildings and Structures)',
  'Level 3 Diploma in Electrical Installations (Buildings and Structures)', 
  'Level 2 Certificate in Electrical Science and Technology',
  'Level 3 Certificate in Electrical Science and Technology',
  'Level 2 Award in Safe Isolation of Electrical Supplies'
);

-- Ensure the specific City & Guilds courses have correct levels and codes
UPDATE public.qualifications 
SET level = 'Level 2', code = '2365'
WHERE awarding_body = 'City & Guilds' 
AND title = 'Level 2 Diploma in Electrical Installations (Buildings and Structures)';

UPDATE public.qualifications 
SET level = 'Level 3', code = '2365' 
WHERE awarding_body = 'City & Guilds'
AND title = 'Level 3 Diploma in Electrical Installations (Buildings and Structures)';

UPDATE public.qualifications 
SET level = 'Level 2', code = '2346'
WHERE awarding_body = 'City & Guilds'
AND title = 'Level 2 Certificate in Electrical Science and Technology';

UPDATE public.qualifications 
SET level = 'Level 3', code = '2346'
WHERE awarding_body = 'City & Guilds' 
AND title = 'Level 3 Certificate in Electrical Science and Technology';

UPDATE public.qualifications 
SET level = 'Level 2', code = '2391'
WHERE awarding_body = 'City & Guilds'
AND title = 'Level 2 Award in Safe Isolation of Electrical Supplies';

-- Clean up any orphaned qualification categories for removed qualifications
DELETE FROM public.qualification_categories 
WHERE qualification_id NOT IN (SELECT id FROM public.qualifications);

-- Clean up any orphaned user qualification selections for removed qualifications  
DELETE FROM public.user_qualification_selections 
WHERE qualification_id NOT IN (SELECT id FROM public.qualifications);

-- Clean up any orphaned qualification compliance records
DELETE FROM public.qualification_compliance 
WHERE qualification_id NOT IN (SELECT id FROM public.qualifications);

-- Clean up any orphaned qualification templates
DELETE FROM public.qualification_templates 
WHERE qualification_category_id NOT IN (SELECT id FROM public.qualification_categories);