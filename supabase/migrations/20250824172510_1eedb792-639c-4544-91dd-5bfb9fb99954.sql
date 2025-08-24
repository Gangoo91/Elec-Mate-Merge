-- Clean test data from major_projects table
DELETE FROM public.major_projects 
WHERE title IN ('ggj', 'hjgj') 
   OR awarded_to IN ('hjgj', 'gj', 'b')
   OR summary IN ('b', 'hh')
   OR LENGTH(title) < 5
   OR title ~ '^[a-z]{1,5}$';