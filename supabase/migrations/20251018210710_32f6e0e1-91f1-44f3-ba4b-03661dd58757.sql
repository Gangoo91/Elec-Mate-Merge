-- Clean up duplicate RAMS documents
-- Keep only the most recent entry for each unique combination

DELETE FROM public.rams_documents a
USING public.rams_documents b
WHERE a.id < b.id 
  AND a.user_id = b.user_id
  AND a.project_name = b.project_name
  AND a.location = b.location
  AND a.date = b.date;