-- Complete removal of all existing course data
-- Step 1: Delete all qualification categories (removes foreign key dependencies)
DELETE FROM public.qualification_categories;

-- Step 2: Delete all qualifications 
DELETE FROM public.qualifications;

-- Step 3: Delete any related compliance data
DELETE FROM public.qualification_compliance;

-- Step 4: Delete any user qualification selections
DELETE FROM public.user_qualification_selections;